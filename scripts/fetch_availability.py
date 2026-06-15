#!/usr/bin/env python3
"""
Scrape the public Previo pricelist for the INGOT apartment and write
site/availability.json with: booked dates + Previo's current nightly price
per date. The website turns these into a 'better than Previo' direct price
(Previo price minus the agency fee) and greys out booked dates.

Runs every ~4h via .github/workflows/availability.yml. Local: python3 scripts/fetch_availability.py
"""
import json, re, sys, datetime, os
from playwright.sync_api import sync_playwright

URL = "https://booking.previo.cz/pricelist/?hotId=789961&currency=CZK&lang=cs&showRoomType=995241"
OUT = os.path.join(os.path.dirname(__file__), "..", "site", "availability.json")
MONTH_STEPS = 12          # ~14 months of horizon (view shows 2 months)
DATE_RE = re.compile(r"(\d{1,2})\.\s*(\d{1,2})\.\s*(20\d{2})")
PRICE_RE = re.compile(r"(\d[\d\s ]*)\s*Kč")

def iso(d, m, y):
    try: return datetime.date(y, m, d).isoformat()
    except ValueError: return None

def parse_cells(page):
    return page.eval_on_selector_all(
        ".day",
        "els=>els.map(e=>({cls:e.className,txt:(e.textContent||'').replace(/\\s+/g,' ').trim()}))",
    )

def main():
    booked, prices, seen = set(), {}, set()
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        pg.goto(URL, wait_until="networkidle")
        pg.wait_for_timeout(2000)
        for _ in range(MONTH_STEPS + 1):
            for c in parse_cells(pg):
                m = DATE_RE.search(c["txt"])
                if not m:
                    continue
                d = iso(int(m.group(1)), int(m.group(2)), int(m.group(3)))
                if not d:
                    continue
                seen.add(d)
                if "_sold-out" in c["cls"] or "Obsazeno" in c["txt"]:
                    booked.add(d)
                    continue
                pm = [int(re.sub(r"[^\d]", "", x)) for x in PRICE_RE.findall(c["txt"])]
                pm = [v for v in pm if v > 0]
                if pm:
                    # a cell may show rack + current price; current is the lower one
                    prices[d] = min(pm)
            nxt = pg.query_selector('[data-cy="pricelist-nextMonth"]')
            if not nxt:
                break
            try:
                nxt.click()
                pg.wait_for_timeout(1300)
            except Exception:
                break
        b.close()

    if len(seen) < 20:
        print(f"ERROR: only {len(seen)} days scraped, refusing to overwrite", file=sys.stderr)
        sys.exit(1)

    data = {
        "updated": datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "booked": sorted(booked),
        "prices": {k: prices[k] for k in sorted(prices)},
    }
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    print(f"days seen={len(seen)} booked={len(booked)} priced={len(prices)} -> {os.path.relpath(OUT)}")

if __name__ == "__main__":
    main()
