# Design QA

## Comparison target

- Source visual truth: `/var/folders/_g/lrphnbxj46q6505ry9ycs8d40000gq/T/codex-clipboard-3443996d-3c21-4740-8bdb-91fcdff7ba82.png`
- Source pixels: `1024 × 1536` PNG.
- Implementation screenshot: `/Users/jmagalhaes/Documents/DevPersonal/Santiago Planner/caminho-santiago-planner/qa-roadbook-1536.png`
- Combined comparison: `/Users/jmagalhaes/Documents/DevPersonal/Santiago Planner/caminho-santiago-planner/qa-roadbook-comparison.png`
- Mobile implementation screenshot: `/Users/jmagalhaes/Documents/DevPersonal/Santiago Planner/caminho-santiago-planner/qa-roadbook-mobile-390.png`
- Expanded-stage evidence: `/Users/jmagalhaes/Documents/DevPersonal/Santiago Planner/caminho-santiago-planner/qa-roadbook-expanded-390.png`
- Implementation viewport: `1024 × 1536` CSS pixels for the supplied portrait reference and `390 × 844` CSS pixels for mobile.
- Density normalization: no resampling; source and implementation were compared at equal pixel dimensions.
- State: initial light roadbook, page at top, all itinerary rows present, OpenStreetMap tiles and embedded official route geometry loaded, no optional brand, quote or notes module present.

## Evidence

- Full-view comparison was performed using `qa-roadbook-comparison.png`, with the supplied reference on the left and the implementation on the right at equal `1024 × 1536` dimensions.
- Focused regions reviewed: editorial masthead, route summary metrics, continuous itinerary table, state labels, full-width map/budget modules and footer.
- Responsive evidence: `qa-roadbook-mobile-390.png` confirms the document reflows into one column and the page itself has no horizontal overflow. `qa-roadbook-expanded-390.png` confirms the selected stage expands inline with its own map and detail fields.

## Required fidelity surfaces

- Composition: passed. The application dashboard was converted into a single continuous roadbook with no sidebar, menus, tabs or dropdowns.
- Typography and hierarchy: passed. The condensed uppercase display title, neutral body text and compact metadata reproduce the reference's printed-roadbook character.
- Spacing and layout rhythm: passed. The lean header, metrics row, full-width itinerary and full-width map/budget modules keep a clean paper-like rhythm.
- Colors and states: passed. Pine green marks the now-closed itinerary and accommodation chain, with the existing state palette retained for future reopenings.
- Copy and content: passed. Visible planning text follows `roadbook.json.plan`: 3–9 October 2026, 7 walking stages, 7 nights, approximately 160 km of official GPS geometry from A Guarda, family arrival and the full accommodation chain marked closed.
- Map: passed. Leaflet renders the route waypoints with 10 markers, visible zoom controls, a direct OpenStreetMap link, visible attribution and the embedded official route geometry extracted from the Xunta KML. The Caminha → A Guarda connection remains explicitly marked as pending because the official source starts at A Guarda.
- Stage interaction: passed. Every itinerary row is keyboard/click actionable and expands an inline stage detail with distance, difficulty, accommodation, price, status, points and a dedicated Leaflet map. Missing accommodation links remain explicitly marked as undefined.
- Budget calculation: passed. Numeric category fields in `roadbook.json` produce the visible `620–970 €` total and the accommodation basis `40–90 € / noite × 7 noites`.
- Accessibility and responsive behaviour: passed for the implemented scope. Semantic table markup, labelled map link, keyboard row controls, mobile reflow and `scrollWidth === clientWidth` at `390px` were checked.

## Comparison history

1. Replaced the former multi-panel application dashboard with the requested document-style single page; removed sidebar navigation and application controls.
2. Reconciled the visual mock with the repository source of truth: retained the actual 3–9 October dates, 7 stages and ~164 km instead of mock-only 3–12 October values.
3. Kept stage status separate from accommodation status so closed stages do not imply that pending accommodation is reserved.
4. Verified the live map after loading Leaflet and public OpenStreetMap tiles; marker count, attribution and link were confirmed in the browser.
5. Removed the optional quote and notes panels at the user's request, then rebalanced the masthead and lower grid.
6. Removed the remaining brand block at the user's request so the route title becomes the sole masthead anchor.
7. Moved all visible roadbook content into `roadbook.json`; a temporary summary edit was reflected after reload and then reverted.
8. Added click/keyboard expansion for every stage, stage-specific maps and JSON-backed detail fields.
9. Removed the former table minimum width and hid secondary columns only on narrow mobile screens; the table no longer exposes a horizontal scrollbar.
10. Replaced static budget strings with numeric JSON categories and derived totals.
11. Added the official Xunta route geometry directly to `roadbook.json` and wired the main map and expandable stage maps to those coordinates, including partial stage cuts where needed.
12. Removed the runtime KML dependency and the temporary source file after embedding its coordinates.
13. Consolidated the plan, itinerary and accommodation data into the `plan` block of `roadbook.json`, making it the single planning source.
14. Final desktop/mobile comparison: no actionable P0/P1/P2 findings remain.
15. Reconfirmed stage distances from the embedded GPS polylines; primary route measurements now drive the visible table and stage details, with the Caminha → A Guarda gap called out explicitly.

## Tested interactions

- OpenStreetMap link resolves to `https://www.openstreetmap.org/copyright` without navigating during QA.
- Leaflet zoom controls render and the map loads provider tiles.
- The embedded official geometry renders one or more non-schematic route lines for every walking stage; the arrival row correctly renders no walking path.
- The itinerary table contains 8 rows: arrival plus the 7 walking stages.
- Clicking or pressing Enter/Space on a row reveals and hides its stage detail.
- No visible horizontal scrollbar is exposed at `970px` or `390px` after expansion; the document itself remains within the viewport width.
- The page contains no `nav`, `select` or menu role elements.

## Implementation checklist

- [x] Desktop/source comparison at equal `1024 × 1536` dimensions.
- [x] Mobile layout check at `390 × 844`.
- [x] Masthead, metrics, itinerary, status separation and supporting modules reviewed.
- [x] OpenStreetMap provider, attribution and 10 route markers checked.
- [x] JSON-driven rendering checked, including a live edit/reload smoke test.
- [x] Expandable stage detail and keyboard/click interaction checked.
- [x] Numeric budget calculation and derived total checked.
- [x] P0/P1/P2 visual issues fixed and rechecked.
- [x] Official route geometry embedded in JSON for the main map and expandable stage maps.
- [x] Planning, itinerary and accommodation data consolidated into the single JSON source.

## Follow-up polish

- Add the Portuguese-side Caminha → A Guarda geometry if an authoritative source for that crossing is selected.
- Preserve the explicit closed status of the current accommodation chain; only reopen a stay when the plan changes.

final result: passed
