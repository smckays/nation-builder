# Nation Builder

A single-file narrative game about founding a nation and following one family across fifty years.

Two front ends share one engine:

- `index.html` — the editorial, paper-and-woodcut version.
- `retro.html` — an 8-bit choose-your-own-adventure version: procedurally drawn pixel scenes, a typewriter dialog box, ▶ menus, pixel family portraits that age, and square-wave sound.
- `tabletop.html` — a board-game version: the nation's tracks, the 50-year timeline and fault lines on the left, the family as pieces with speech bubbles on the right, choices as a hand of cards that preview their effects.
- `samples/` — single-screen style studies (broadsheet, storybook, tabletop).
- `engine.js` — all content (nations, families, questions, crises, fates) and rules. Edit writing or balance here.

Open either page in a browser. No build step.

## How it works

- **Founding (Year 1):** ten questions. Each choice moves six hidden measures — prosperity, equality, belonging, legitimacy, institutions, cohesion — and sets flags.
- **Fault lines:** contradictions between founding choices (e.g. coerced labour + civil rights) are surfaced at ratification.
- **Two eras of crises** (Years 8–24, 27–38): two crises each, drawn by weight from the nation's flags and geography. Some are forced by the founding (no land rules → the surveyors; coerced labour → the petition), and some by earlier crisis responses (a burned petition → the rising; a border war → the soldier's debt).
- **Year 25 interlude and Year 50 epilogue:** a ledger of the nation, a fate for each family member computed from the measures and flags, and a verdict on the nation.

All family text uses role tokens (`{F}` `{M}` `{S}` `{D}`, `{fam}`, `[[landed||landless]]`), so any family fits any line. Keys 1–4 choose, Enter continues (retro also takes ↑/↓ and Space).
