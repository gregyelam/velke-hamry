# Previo - rezervační systém + dostupnost (integrace pro INGOT landing page)

**Zjištěno:** 4. 6. 2026 (přihlášení do agency.previo.app + reverse-engineering Muhu webu)

> Heslo k účtu NENÍ uloženo zde. Přístupy drží Martin (gregorm@hotmail.cz). Login vyžaduje e-mailové potvrzení nového zařízení (nebo zapnout 2FA).

## Klíčová ID

| Co | Hodnota |
|---|---|
| Property (hotId) | **789961** (MUHU Apartments) |
| Náš apartmán - Apartmán Jizera (roomType) | **995241** = INGOT |
| Agency partner ID (parId) | 5764805 (přístup Martin + Smeky) |
| Ostatní jednotky | Apartmán Smrk 995239, Apartmán Bukovec 993807 (5x) |
| Muhu web booking-engine instance (nová) | `booking.previo.app/?id=019cfbe0-d3f0-7106-a360-c04ba33507c4` |

## Co máme za přístup (agency.previo.app)

Účet je agentský, scoped na **Jizera (MUHU Apartments)**. Sekce:
- **Reservation** - vytvořit rezervaci ručně (přesně to, co chceme u leadů z IG / landing page).
- **Availability** - obsazenost po dnech.
- **Price** - ceník.
- **Revenue** - tržby.

Tím je vyřešený ruční model: lead z IG/landing page -> Martin/Smeky vytvoří rezervaci v agency portálu -> bez OTA provize (Booking/Airbnb).

## Embeddable booking engine (dostupnost + rezervace v jednom)

Veřejný Previo booking engine jde filtrovat jen na náš apartmán a vložit do webu jako iframe:

- **Rezervační formulář (jen Jizera):**
  `https://booking.previo.cz/?hotId=789961&currency=CZK&lang=cs&roomType=995241`
- **Kalendář obsazenosti + ceník (to, co bylo na screenshotu):**
  `https://booking.previo.cz/occupancy/?hotId=789961&currency=CZK&lang=cs&showRoomType=995241`
  `https://booking.previo.cz/pricelist/?hotId=789961&currency=CZK&lang=cs&showRoomType=995241`

Booking engine ukazuje živou dostupnost + ceny a bere rezervace přímo. Sám se prezentuje jako „Rezervujete přímo v ubytovacím zařízení bez prostředníka" + „Garance nejnižší ceny" - přesně náš no-OTA-fee narativ.

## API (alternativa pro plně custom web)

- REST API: `https://api.previo.app` (Basic Auth), docs `https://rest.apidocs.previo.app/`. Placený doplněk.
- XML / EQC API: dostupnost, ceny, rezervace. Placené. Kontakt info@previo.cz, lze zkušebně zdarma.
- Pro MVP není potřeba - stačí iframe booking engine výše.

## Otevřené komerční otázky (rozhodnutí Martin + Smeky)

- Rezervace přes veřejný booking engine vs. ruční zadání v agency portálu - která cesta reálně obchází fee správcovské firmy (ne jen OTA)? Booking engine routuje na property pod konfigurací správce; ruční agency rezervace zřejmě nese agency marži.
- Cena k zobrazení: nápad = ukazovat stejné ceny jako Muhu/Booking, ale nechat si marži (provider OK). Agency rate bývá net po provizní slevě -> rozdíl = naše marže.
