# Camino Planning Rules

This repository is the persistent source of truth for planning the Caminho de Santiago trip. The complete publishable roadbook lives in `index.html`; all planning data is stored as JSON in its `<script type="application/json" id="roadbook-data">` block.

## Core rules

- Never recommend accommodation unless availability is validated for the exact requested date and occupancy.
- Validate the real location of accommodation relative to:
  - the official Camino route;
  - the town/city centre;
  - restaurants and basic services.
- Prefer private rooms.
- Prefer private bathrooms whenever possible.
- Normal accommodation budget: EUR 40-90 per night.
- Hostels/albergues should only be proposed if conditions are excellent or a private room is available.
- Daily luggage transfer is part of the plan.
- Follow the official Caminho Portugues da Costa route unless the user explicitly changes this decision.
- Prefer interesting towns/cities with good accommodation and food over perfectly equal stage distances.
- Do not silently replace a closed decision. Mark any proposed change explicitly.
- Whenever a decision is closed, update the `roadbook-data` JSON block in `index.html`; it is the single source of truth and visible roadbook.
- Keep confirmed decisions clearly separate from candidates and open questions.
- Use PT-PT for user-facing planning notes unless asked otherwise.

## Current planning priorities

1. Validate luggage transfer options for the final accommodation chain.
2. Later: transport logistics, packing list, credential, daily timings and budget.
