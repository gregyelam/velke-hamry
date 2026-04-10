# Velké Hamry Family Trip Planner

A single-page interactive dashboard for planning weekend family hikes near Velké Hamry, Jizerské hory (Jizera Mountains), Czech Republic. Family of 4 — two adults, kids aged 5 and 2.

## Layout

**Header:** "Velké Hamry — Kam vyrazit" with subtitle "Weekend trip planner for family hikes in Jizerské hory". Clean, minimal, sticky.

**Weather/Condition Filter Bar:** Row of toggle pills directly below the header:
- ☀️ Sunny — ❄️ Cold/Winter — 🌧️ Rainy — 💨 Windy — 👶 Stroller-friendly
- Selecting a condition dims cards that are poor fits and highlights the best matches. Multiple can be active.

**Interactive Map:** Leaflet or Mapbox map centered on Velké Hamry (50.7167N, 15.3167E), zoom ~11. Pins for each trail start point. Clicking a pin scrolls to / highlights the corresponding card below. Include a "home" pin for Velké Hamry itself.

**Trip Cards Grid:** 2-column responsive grid (stacks to 1 on mobile). One card per trail:

### Card 1 — Protržená přehrada ⭐ Best Pick
- **Start:** Desná (parking at valley entrance)
- **Distance:** 4–6 km round trip
- **Difficulty:** Easy–moderate
- **Stroller:** ❌ No (carrier recommended)
- **Best in:** ☀️ Sunny, mild weather
- **Avoid when:** 🌧️ Heavy rain (muddy trails)
- **What to expect:** Forest trail along Bílá Desná river to the historical dam ruins. Educational panels, wooden bridges, water features. Short segments perfect for stopping.
- **With kids:** Best ratio of adventure to effort. 5yo walks most of it, 2yo in carrier for steep parts.
- **Link:** Mapy.cz direct link button

### Card 2 — Jizerka (rašeliniště)
- **Start:** Jizerka village (central parking)
- **Distance:** 3–5 km
- **Difficulty:** Easy
- **Stroller:** ⚠️ Partial (boardwalks yes, trails no)
- **Best in:** ☀️ Sunny, calm day
- **Avoid when:** 💨 Windy (exposed, no shelter), ❄️ Cold (no cover)
- **What to expect:** Open peat bog landscape with wooden boardwalks. Safírový potok (Sapphire Creek) with rocks and water play.
- **With kids:** Zero-stress option. No real elevation. Bring layers — more exposed than it looks.
- **Link:** Mapy.cz direct link button

### Card 3 — Rozhledna Štěpánka
- **Start:** Kořenov / Příchovice (parking)
- **Distance:** 4–6 km
- **Difficulty:** Moderate (short climb)
- **Stroller:** ❌ No
- **Best in:** ☀️ Clear sky (views from tower)
- **Avoid when:** 🌧️ Rain, 💨 Strong wind (exposed tower top)
- **What to expect:** Forest paths with a short steep section. Reward at the top: stone lookout tower with panoramic views.
- **With kids:** Built-in motivation — "we're climbing the tower!" Expect to carry the 2yo for the uphill section.
- **Link:** Mapy.cz direct link button

### Card 4 — Přehrada Souš
- **Start:** Desná / dam entrance (parking)
- **Distance:** 2–4 km (flexible, out-and-back)
- **Difficulty:** Very easy
- **Stroller:** ✅ Yes — paved road, flat
- **Best in:** Any weather (paved surface)
- **Avoid when:** 💨 Windy (open water, no shelter)
- **What to expect:** Wide asphalt road around a reservoir. Used by cyclists and inline skaters. Flat and smooth throughout.
- **With kids:** Stroller-safe fallback. Bring a balance bike for the 5yo. More of a calm walk than an adventure — good for tired days.
- **Link:** Mapy.cz direct link button

## Weekend Planner Section

A horizontal 3-column strip (stacks vertically on mobile), one per day:

| **Pátek (Friday)** | **Sobota (Saturday)** | **Neděle (Sunday)** |
|---|---|---|
| Protržená přehrada | Liberec / Ještěd (city + cable car) | Jizerka (easy) OR Štěpánka (active) |
| Must-do, best trail | Change of pace, indoor backup | Pick based on energy level |

## Quick Tips Section

Grid of small tip cards with icons:
- 📱 **Offline mapy** — Download Mapy.cz offline, signal is unreliable in the mountains
- 🥪 **Svačina** — Pack food, there's nothing on the trails
- 🎒 **Krosna > kočár** — Child carrier beats stroller on 80% of trails
- 🔄 **Otočit se včas** — Turn back early = win. Don't push to finish at all costs

## Design Notes

- **Style:** Clean, warm, earthy palette (think muted greens, warm grays, terracotta accents — similar to a hiking app)
- **Mobile-first** — this will mostly be used on phones while on location
- **Czech + English mix** — trail names in Czech, UI labels in English
- **Each card should feel glanceable** — key info (distance, stroller, weather) scannable in 2 seconds, details on expand/scroll
- **Map markers** should use color-coded difficulty: green (easy), yellow (moderate)
- **Weather filter** is the key interactive element — visually dim non-matching cards (reduce opacity) rather than hiding them
