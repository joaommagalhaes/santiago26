# Camino Roadbook — Static GitHub Pages Spec

## 1. Objective

Evolve the current Camino page into a **single static roadbook page** published on **GitHub Pages**.

This is **not an application**.

The page should behave as a polished, practical, read-only roadbook for desktop, mobile and print.

All trip content must live in a **structured JSON file**.  
The HTML/CSS/JS must be generic and render the roadbook from that JSON.

---

# 2. Core principles

- Static website.
- Hosted directly on GitHub Pages.
- No backend.
- No authentication.
- No database.
- No TypeScript.
- No React.
- No Angular.
- No Vue.
- No framework.
- No build step required.
- Vanilla JavaScript only.
- Data separated from presentation.
- All editable Camino content lives in JSON.
- Mobile-first enough to use while walking.
- Printable.
- Minimal and visually clean.
- Fast to load.
- Easy to maintain after the initial implementation.

---

# 3. Suggested repository structure

```text
/
├── index.html
├── styles.css
├── script.js
│
├── data/
│   └── camino.json
│
└── assets/
    ├── icons/
    ├── maps/
    ├── elevation/
    └── photos/
```

The preferred architecture is:

```text
camino.json
    ↓
script.js
    ↓
HTML rendering
    ↓
styles.css
```

`index.html` should mainly contain the page shell and semantic containers.

The stage content should **not** be manually duplicated in HTML.

---

# 4. Data source

The single source of truth is:

```text
/data/camino.json
```

The page loads it using:

```js
fetch("./data/camino.json")
```

The JSON must contain all relevant trip information:

- trip metadata;
- stages;
- accommodation;
- distances;
- timings;
- elevation;
- waypoints;
- food stops;
- water points;
- pharmacies;
- transport;
- luggage;
- warnings;
- alternative routes;
- escape points;
- reservations;
- costs;
- useful contacts;
- notes.

The UI should derive itself from this data.

If a field is absent or `null`, the corresponding UI element should simply not be rendered.

---

# 5. Proposed JSON structure

Example:

```json
{
  "trip": {
    "title": "Caminha → Santiago",
    "subtitle": "Caminho Português da Costa",
    "startDate": "2026-10-03",
    "endDate": "2026-10-09",
    "arrivalDate": "2026-10-02",
    "start": "Caminha",
    "finish": "Santiago de Compostela",
    "totalDistanceKm": 160,
    "stageCount": 7,
    "nightCount": 7,
    "officialGpsFrom": "A Guarda",
    "notes": [
      "Ligação Caminha → A Guarda ainda por validar."
    ]
  },

  "summary": {
    "accommodationsBooked": 7,
    "accommodationsTotal": 7,
    "luggageTransport": "confirmed",
    "estimatedAccommodationCost": null,
    "estimatedLuggageCost": null,
    "longestStageId": 4,
    "expectedArrival": "2026-10-09T14:30:00"
  },

  "arrival": {
    "date": "2026-10-02",
    "location": "Caminha",
    "accommodation": {
      "name": "Família",
      "location": "Caminha",
      "status": "confirmed"
    }
  },

  "stages": []
}
```

---

# 6. Stage structure

Each walking day is represented by one stage object.

Example:

```json
{
  "id": 1,
  "date": "2026-10-03",
  "weekday": "Sábado",

  "title": "Caminha → A Guarda → Oia → Viladesuso",

  "start": {
    "name": "Caminha",
    "lat": 41.876,
    "lng": -8.838
  },

  "finish": {
    "name": "Viladesuso",
    "lat": 42.050,
    "lng": -8.890
  },

  "distance": {
    "km": 15.9,
    "official": false,
    "note": "Distância oficial contabilizada desde A Guarda."
  },

  "duration": {
    "walkingMinutes": 250,
    "plannedDeparture": "07:30",
    "plannedArrival": "13:00"
  },

  "elevation": {
    "gainM": 310,
    "lossM": 180,
    "profileImage": "assets/elevation/stage-01.svg"
  },

  "difficulty": {
    "level": "moderate",
    "label": "Moderada",
    "note": null
  },

  "status": "closed",

  "route": {
    "gpx": "assets/maps/stage-01.gpx",
    "geojson": "assets/maps/stage-01.geojson",
    "official": false,
    "note": "Traçado oficial desde A Guarda; ligação Caminha → A Guarda por validar."
  },

  "accommodation": {
    "name": "Budiño de Serrasceca",
    "city": "Viladesuso",
    "address": null,
    "price": 85,
    "currency": "EUR",
    "checkIn": null,
    "phone": null,
    "bookingUrl": null,
    "mapsUrl": null,
    "reservationReference": null,
    "status": "confirmed",
    "notes": [
      "Escolhido em vez de dormir em Oia."
    ]
  },

  "luggage": {
    "enabled": true,
    "provider": null,
    "pickup": "Caminha",
    "dropoff": "Budiño de Serrasceca",
    "status": "confirmed",
    "phone": null,
    "reference": null
  },

  "timeline": [],

  "waypoints": [],

  "food": [],

  "water": [],

  "pharmacies": [],

  "escapePoints": [],

  "warnings": [
    {
      "type": "route",
      "text": "Confirmar ligação Caminha → A Guarda antes da partida."
    }
  ],

  "notes": [
    "Passagem por A Guarda e Oia."
  ]
}
```

---

# 7. Timeline

Each stage may contain a simple operational timeline.

Example:

```json
"timeline": [
  {
    "time": "07:30",
    "type": "start",
    "place": "Caminha",
    "label": "Saída"
  },
  {
    "time": "08:30",
    "type": "stop",
    "place": "A Guarda",
    "label": "Café / supermercado"
  },
  {
    "time": "10:30",
    "type": "stop",
    "place": "Oia",
    "label": "Água · WC · Café"
  },
  {
    "time": "13:00",
    "type": "finish",
    "place": "Viladesuso",
    "label": "Chegada"
  }
]
```

The UI should render this as a compact vertical or horizontal timeline depending on viewport size.

---

# 8. Waypoints

Waypoints are useful locations along a stage.

Suggested structure:

```json
"waypoints": [
  {
    "name": "A Guarda",
    "type": "town",
    "km": 4.2,
    "lat": 41.901,
    "lng": -8.874,
    "services": [
      "coffee",
      "supermarket",
      "wc"
    ],
    "notes": null
  }
]
```

Possible waypoint types:

```text
town
coffee
restaurant
water
supermarket
pharmacy
wc
viewpoint
church
transport
hotel
other
```

---

# 9. Food stops

Example:

```json
"food": [
  {
    "name": "Paragem em Oia",
    "type": "lunch",
    "km": 10.3,
    "recommendedTime": "10:30",
    "status": "suggested",
    "mapsUrl": null,
    "notes": "Boa oportunidade para comer antes do último troço."
  }
]
```

Types:

```text
breakfast
coffee
lunch
snack
dinner
```

Do not require all stages to have food entries.

---

# 10. Water

Example:

```json
"water": [
  {
    "name": "Fonte",
    "km": 8.4,
    "lat": null,
    "lng": null,
    "reliable": true,
    "notes": null
  }
]
```

This should be displayed compactly, not as large cards.

---

# 11. Pharmacies

Example:

```json
"pharmacies": [
  {
    "name": "Farmácia Example",
    "place": "Oia",
    "km": 10.2,
    "phone": null,
    "mapsUrl": null
  }
]
```

Only show the section when data exists.

---

# 12. Escape points / Plan B

Important for longer stages.

Example:

```json
"escapePoints": [
  {
    "km": 15.0,
    "place": "Redondela",
    "type": "train",
    "description": "Possibilidade de terminar aqui e seguir para Pontevedra de comboio.",
    "mapsUrl": null
  },
  {
    "km": 25.0,
    "place": "Arcade",
    "type": "taxi",
    "description": "Ponto simples para chamar táxi."
  }
]
```

Possible types:

```text
taxi
bus
train
shorter-route
pickup
other
```

This section should be particularly visible on long or difficult days.

---

# 13. Warnings

Warnings should be structured, not free-form HTML.

Example:

```json
"warnings": [
  {
    "type": "route",
    "severity": "medium",
    "text": "Ligação Caminha → A Guarda ainda por validar."
  },
  {
    "type": "water",
    "severity": "low",
    "text": "Poucos pontos de água no troço final."
  }
]
```

Possible warning types:

```text
route
weather
road
water
difficulty
transport
accommodation
other
```

Possible severities:

```text
low
medium
high
```

---

# 14. Overview

The top of the page should remain visually close to the current implementation.

Example:

```text
CAMINHA → SANTIAGO

3–9 outubro 2026
7 etapas · 7 noites · ~160 km
```

Below that, show a compact trip summary:

```text
✓ 7/7 alojamentos
✓ Transporte de bagagem
↗ Maior etapa: Vigo → Pontevedra · 34.1 km
◎ Chegada prevista: Santiago · 9 outubro
```

Avoid turning the header into a dense dashboard.

---

# 15. Stage overview table

Keep the existing stage table.

Suggested columns:

```text
DIA
DATA
ETAPA
KM
ALOJAMENTO
STATUS
```

Example:

```text
1
03 OUT.
Caminha → A Guarda → Oia → Viladesuso
~15.9 km
Budiño de Serrasceca
Fechado
```

Each row should link or scroll to the corresponding detailed stage section.

Example:

```text
#stage-1
#stage-2
#stage-3
```

Use native anchor navigation.

No SPA routing.

---

# 16. Detailed stage section

Every stage should have a dedicated section underneath the overview.

Recommended hierarchy:

```text
DIA 1

CAMINHA → VILADESUSO

15.9 km
~4h10
↑ 310 m
↓ 180 m
Moderada
```

Then:

```text
MAP
```

followed by:

```text
TIMELINE
```

then:

```text
ROUTE NOTES / WARNINGS
```

then:

```text
WAYPOINTS
```

then:

```text
FOOD / WATER / PHARMACY
```

then:

```text
PLAN B / ESCAPE POINTS
```

then:

```text
ACCOMMODATION
```

then:

```text
LUGGAGE
```

then:

```text
NOTES
```

Only render sections that have data.

---

# 17. Map

Use Leaflet + OpenStreetMap if a map is required.

Allowed via CDN.

Example architecture:

```text
stage.route.geojson
        ↓
Leaflet
        ↓
stage map
```

Each stage can have a small map.

The page should not require an external map service for core trip information.

The map is complementary.

If route data cannot be loaded, the rest of the stage must still work.

---

# 18. Elevation profile

Preferred solution:

Store a pre-generated image or SVG.

Example:

```json
"profileImage": "assets/elevation/stage-04.svg"
```

This keeps the site static and simple.

No need to calculate elevation in the browser.

Show:

```text
↑ 620 m
↓ 540 m
```

and underneath:

```text
[elevation profile]
```

---

# 19. Accommodation card

Accommodation information should be operational, not decorative.

Show where available:

```text
Budiño de Serrasceca

Viladesuso
85 €

Check-in: 15:00–20:00

Reserva: XXXXX
Telefone: +34 ...

[ABRIR MAPA]
[ABRIR RESERVA]
```

Do not show empty labels.

For example, if `phone` is null, there should not be a blank `Telefone:` row.

---

# 20. Luggage transport

Example:

```text
BAGAGEM

Caminha
↓
Budiño de Serrasceca

✓ Confirmado

Provider: ...
Telefone: ...
Reserva: ...
```

Useful because this is information that may need to be checked every morning.

---

# 21. Daily checklist

Optional section in JSON:

```json
"checklist": [
  "Água",
  "Credencial",
  "Powerbank",
  "Compeed",
  "Casaco de chuva",
  "Confirmar bagagem"
]
```

The page may render these as visual checkboxes.

The state does not need to persist.

This remains a static roadbook, not a stateful application.

---

# 22. Important contacts

At trip level:

```json
"contacts": [
  {
    "name": "Emergência",
    "type": "emergency",
    "phone": "112"
  },
  {
    "name": "Transporte de bagagem",
    "type": "luggage",
    "phone": null
  }
]
```

Possible information:

- 112;
- luggage provider;
- travel insurance;
- taxi numbers;
- accommodation contacts;
- emergency family contact.

Render these near the end of the roadbook and optionally expose a simple anchor from the top:

```text
#contacts
```

---

# 23. Costs

Trip-level budget section.

Example structure:

```json
"costs": {
  "accommodation": 520,
  "luggage": 70,
  "transport": null,
  "other": null,
  "currency": "EUR"
}
```

Render:

```text
CUSTOS

Alojamentos   520 €
Bagagem        70 €
──────────────────
Total         590 €
```

If costs are incomplete, label them as estimated.

---

# 24. Weather

Do **not** make the page dependent on a weather API.

This is a static roadbook.

If desired, allow a manual weather snapshot inside the JSON:

```json
"weather": {
  "summary": "Nublado com possibilidade de chuva",
  "minC": 16,
  "maxC": 21,
  "rainProbability": 40,
  "windKmh": 18
}
```

This can be updated shortly before the trip.

No API key should be required.

---

# 25. Sunrise / sunset

Also keep this static if used.

Example:

```json
"daylight": {
  "sunrise": "08:25",
  "sunset": "20:03"
}
```

Useful particularly for long stages.

---

# 26. Mobile behaviour

Mobile is important because the page may be used during the Camino.

On small screens:

- no horizontal page scrolling;
- stage summary remains readable;
- overview table may transform into stacked rows;
- maps use full available width;
- accommodation actions are easy to tap;
- typography remains compact;
- sections have clear visual separation;
- important information appears before descriptive information.

Recommended information priority:

```text
stage
distance
duration
difficulty
warnings
timeline
route
plan B
accommodation
luggage
extra notes
```

---

# 27. Desktop behaviour

Desktop should preserve the strong single-page report feeling of the current design.

Use generous horizontal space.

Possible layout for stage details:

```text
┌──────────────────────┬─────────────────────────────┐
│                      │ Distance · Duration         │
│                      │ Difficulty · Elevation      │
│        MAP           ├─────────────────────────────┤
│                      │ Timeline                    │
│                      ├─────────────────────────────┤
│                      │ Accommodation               │
└──────────────────────┴─────────────────────────────┘

Elevation profile

Warnings

Waypoints / food / water

Plan B

Notes
```

Avoid an app-dashboard aesthetic.

It should look like a premium printable travel document.

---

# 28. Print mode

Add dedicated print CSS:

```css
@media print {
  ...
}
```

Requirements:

- hide unnecessary interactive controls;
- remove map controls;
- preserve stage headings;
- avoid splitting accommodation cards across pages;
- avoid splitting warning blocks;
- use high-contrast text;
- remove decorative UI that wastes paper;
- ensure links remain readable.

Ideally each stage can naturally start on a new printed page:

```css
.stage {
  break-before: page;
}
```

The overview should remain the first page.

---

# 29. Navigation

Keep navigation simple.

At the top:

```text
Overview
1
2
3
4
5
6
7
Contacts
```

These are just anchor links:

```text
#overview
#stage-1
#stage-2
...
#contacts
```

Optional sticky navigation on desktop/mobile.

No router.

---

# 30. "Today" emphasis without app behaviour

Do not build a separate "Today Mode".

Instead, support an optional JSON field:

```json
"highlightStage": 4
```

If present, the corresponding stage may receive a subtle visual marker:

```text
HOJE
```

But the page remains one static roadbook.

This field can be manually changed before opening/publishing the page.

---

# 31. Rendering strategy

`script.js` should be small and straightforward.

Responsibilities:

1. fetch `camino.json`;
2. render trip header;
3. render summary;
4. render overview table;
5. render all stages;
6. initialise maps if route/map data exists;
7. skip absent optional fields.

Pseudo-flow:

```js
async function init() {
  const response = await fetch("./data/camino.json");
  const data = await response.json();

  renderHeader(data.trip, data.summary);
  renderOverview(data.stages);
  renderStages(data.stages);
  renderCosts(data.costs);
  renderContacts(data.contacts);
  initMaps(data.stages);
}

init();
```

Avoid a generic component framework.

Small rendering functions are enough.

---

# 32. Rendering rule

The UI must be data-driven.

Bad:

```html
<div>
  <strong>Budiño de Serrasceca</strong>
  <span>85 €</span>
</div>
```

Good:

```js
renderAccommodation(stage.accommodation)
```

with values loaded from JSON.

The HTML should not contain stage-specific trip data.

---

# 33. Error handling

If `camino.json` fails to load, show a readable message:

```text
Não foi possível carregar os dados do roadbook.
```

Log the technical error to the console.

Do not leave a blank page.

---

# 34. Accessibility

Basic requirements:

- semantic headings;
- sufficient contrast;
- buttons/links with accessible labels;
- maps must not be the only source of route information;
- icons should not be the only way to communicate status;
- external links should have meaningful text;
- keyboard-friendly navigation.

---

# 35. Visual direction

Keep the visual language of the existing page:

- off-white / white background;
- dark green accent;
- dark charcoal text;
- thin separators;
- restrained borders;
- small-radius cards;
- compact labels;
- strong typography;
- lots of whitespace;
- no gradients;
- no oversized cards;
- no unnecessary shadows;
- no generic SaaS dashboard look.

The final result should feel somewhere between:

```text
premium travel roadbook
+
editorial report
+
practical field guide
```

rather than:

```text
web application dashboard
```

---

# 36. Stage overview example

```text
DIA 4 · 06 OUT.

VIGO → PONTEVEDRA

34.1 km    ~8h15
↑ 620 m    ↓ 540 m
DIFÍCIL

07:15
Vigo
│
├── 15 km
│   Redondela
│   Café · água · comboio
│
├── 10 km
│   Arcade
│   Almoço · táxi
│
└── 9 km
    Pontevedra

⚠ DIA LONGO
Sair cedo.

PLANO B
Redondela → Pontevedra: comboio
Arcade → Pontevedra: táxi

HOTEL MADRID PONTEVEDRA
Check-in ...
Reserva ...
Telefone ...

BAGAGEM
✓ Confirmada
```

---

# 37. Implementation priorities

## V1 — Essential roadbook

Implement first:

- structured `camino.json`;
- generic data rendering;
- header;
- global summary;
- overview table;
- detailed stage sections;
- map;
- distance;
- duration;
- elevation gain/loss;
- difficulty;
- accommodation;
- luggage;
- notes;
- warnings;
- responsive layout;
- print CSS.

## V1.1 — Operational detail

Then add:

- timeline;
- waypoints;
- food;
- water;
- pharmacies;
- escape points;
- costs;
- useful contacts.

## V1.2 — Polish

Finally:

- elevation profile images;
- sticky anchor navigation;
- subtle stage highlighting;
- better map markers;
- print refinement;
- empty-data handling;
- visual details.

---

# 38. Non-goals

Do not implement:

- account/login;
- editing UI;
- CMS;
- backend;
- database;
- server-side code;
- TypeScript;
- framework;
- SPA routing;
- complex state management;
- live GPS tracking;
- reservation management;
- push notifications;
- dynamic weather APIs;
- admin panel.

The JSON file is the CMS.

Editing the roadbook means editing:

```text
data/camino.json
```

and committing the change to GitHub.

---

# 39. Final product

The desired result is a single URL such as:

```text
https://<user>.github.io/camino-2026/
```

Opening that URL should provide the complete roadbook.

It should work equally well as:

- trip overview before leaving;
- detailed reference during the Camino;
- accommodation/reservation reference;
- printable roadbook;
- archive of the trip afterwards.

The key architectural principle is:

> **HTML/CSS/JS define how the roadbook looks and behaves.  
> `camino.json` defines the trip.**

The page should remain generic enough that a future Camino can be created primarily by replacing the JSON data.
