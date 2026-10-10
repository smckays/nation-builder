# Nation Builder

**Play it:** https://nation-builders.netlify.app

A single-file narrative game about founding a nation and following one family across fifty years.

Three front ends share one engine:

- `tabletop.html` — the published version, a board game: the nation's tracks, the 50-year timeline and fault lines on the left, the family as pieces with speech bubbles on the right, choices as a hand of cards that preview their effects.
- `retro.html` — an 8-bit choose-your-own-adventure version: procedurally drawn pixel scenes, a typewriter dialog box, ▶ menus, pixel family portraits that age, and square-wave sound.
- `index.html` — the editorial, paper-and-woodcut version.
- `samples/` — single-screen style studies (broadsheet, storybook, tabletop).
- `engine.js` — all content (nations, families, questions, crises, consequence cards, fates) and rules. Edit writing or balance here.

Open any page in a browser. No build step.

## How it works

- **Founding (Year 1):** ten questions. Each choice moves six measures — prosperity, equality, belonging, legitimacy, institutions, cohesion — and sets flags.
- **Fault lines:** contradictions between founding choices (e.g. coerced labour + civil rights) are surfaced at ratification.
- **Crises in eras** (Years 8–24, 26–38): two crises each, drawn by weight from the nation's flags and geography. Some are forced by the founding (no land rules → the surveyors; coerced labour → the petition), and an era can take a third forced card.
- **Consequence cards:** choices whose aftermath promised something later come back as their own cards, citing the year of the choice (relief in the bad year → the second dry year; compulsory purchase after the flood → the railway line). Consequences of Era III choices land in **Era IV** (Years 39–48), which appears only when one is due.
- **Year 25 interlude and Year 50 epilogue:** a ledger of the nation, a fate for each family member computed from the measures and flags, and a verdict on the nation.

All family text uses role tokens (`{F}` `{M}` `{S}` `{D}`, `{fam}`, `[[landed||landless]]`), so any family fits any line. Keys 1–4 choose, Enter continues (retro also takes ↑/↓ and Space).

## Publishing

Every push to `main` deploys the tabletop version to https://nation-builders.netlify.app. Netlify is linked to this repo and reads its build settings from `netlify.toml`. GitHub holds the code only; nothing is published there.

The site is the tabletop version as an installable app: `tabletop.html` (served as `index.html`), `engine.js`, `manifest.webmanifest`, the service worker `sw.js` and `icons/`. The other versions stay in the repo but are not published.

## The app

- **Install:** in Chrome or Edge, use the Install button in the game's top bar (or the install icon in the address bar). On iPhone or iPad, open the site in Safari, tap Share, then **Add to Home Screen**. It opens full screen with its own icon.
- **Offline:** the service worker keeps a copy of the game on the device, so it opens without a connection. Each deploy stamps the cache with the commit (`__BUILD__` in `sw.js`), so updates arrive the next time the app opens online.
- **Auto-save:** the game and its undo history are saved in the browser's local storage on each device after every move, and reopening resumes the game. Saves stay on that device; they do not sync between devices.
- **Icons** are drawn in code; regenerate them with the Pillow script if the design changes.
