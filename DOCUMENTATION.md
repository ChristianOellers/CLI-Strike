# CLI-Strike — Feature Documentation & Rebuild Guide

## What Is This?

**CLI-Strike** is a humorous, minimalist parody of Counter-Strike that runs entirely as a sequential question-and-answer game. The original version runs in the Node.js terminal using `inquirer` for interactive prompts. There is no actual graphics or real-time input — the "game" is a series of menu choices that play out a round narrative with a random win/lose outcome.

---

## How the Original Works

### Tech Stack (Legacy)
- **Runtime:** Node.js
- **UI:** `inquirer` v7 — terminal prompt library
- **Type checking:** Flow (not enforced, just annotated)
- **Entry point:** `src/app.js`
- **Config:** `src/config.js`

### Game Flow

```
START
  │
  ▼
[Phase 1 – Selection]
  ├── Choose side: "C0unt3r" or "T3rr0ristS"
  ├── Choose costume (color hex, side-specific options)
  └── Choose weapons (checkbox, side-specific loadout)
        C0unt3r:   M4, Shield, Pistol, Knife(default)
        T3rr0ristS: AK 47, MAC-10, Pistol, Knife(default)
  │
  ▼
[Phase 2 – Game Loop]  ← repeats every round
  ├── Move direction: Left / Right / Straight / Stay home
  ├── Jump? (yes/no)
  ├── Duck? (only if NOT jumping)
  ├── See enemy? (yes/no)
  └── Attack? (only if enemy seen): Yes / Yes Silenced / No / Knife
  │
  ▼
[Phase 3 – Outcome]  ← random 50/50
  ├── WIN path:
  │     ├── Reaction choice: "Great!" / "L0lz"
  │     └── Spray graffiti? yes/no
  │     score += 1
  └── LOSE path:
        └── Blame choice: "Aimb0t !!" / "Wallh@ck !1!11"
  │
  ▼
Print score → RESTART (loop back to Phase 2, same side/loadout)
```

### Score
- Increments by 1 per successful attack (random ≥ 0.5)
- Displayed in console before each new round
- Resets when the process is restarted

---

## Features (Complete List)

| Feature | Details |
|---|---|
| Side selection | C0unt3r or T3rr0ristS |
| Costume selection | 2 color hex options per side |
| Weapon loadout | Checkbox multi-select, side-specific, Knife pre-checked |
| Movement choice | 4 directional options per round |
| Jump / Duck | Conditional: duck only available if not jumping |
| Enemy encounter | Yes/No prompt |
| Attack options | 4 options, shown only if enemy seen |
| Random outcome | 50/50 Math.random() determines win or lose |
| Win reactions | 2 choices + graffiti prompt |
| Lose reactions | 2 "blaming hacks" choices |
| Score tracking | Accumulates across rounds, resets on restart |
| Auto-restart | Game loop repeats infinitely after each round |

---

## Rebuild Plan — Vue.js + HTML5/JS/CSS

### Target Stack
- **Vue 3** (CDN, no build step) — via `<script src="https://unpkg.com/vue@3/dist/vue.global.js">`
- **Plain HTML5 / CSS / JS** — single `index.html` entry point
- **No external libraries** beyond Vue 3

### Architecture

Single-page app, single `index.html`. All logic in a Vue 3 app instance.

**State machine phases** (mirrors the original flow):
1. `selection` — side, costume, weapons
2. `game_loop` — move, jump, duck, enemy, attack
3. `outcome` — win or lose reactions
4. Loops back to `game_loop` after outcome

**Vue Components (all inline in index.html):**
- `<App>` — root, owns all state
- `<PhaseSelection>` — side + conditional costume + weapon checkboxes
- `<PhaseGameLoop>` — movement + conditional jump/duck + enemy + attack
- `<PhaseOutcome>` — win/lose branch with reactions
- `<ScoreBar>` — persistent score display

### Key State Shape

```js
{
  phase: 'selection' | 'game_loop' | 'outcome',
  score: 0,
  player: {
    side: '',       // 'counter' | 'terrorist'
    costume: '',
    weapons: [],
  },
  round: {
    move: '',
    jump: false,
    duck: false,
    see_enemy: false,
    attack: '',
    outcome: null,  // 'win' | 'lose'
  }
}
```

### UI Style Direction
- Dark terminal/game aesthetic — dark background, monospace font, neon accent colors
- Minimal — no animations required, but phase transitions welcome
- Mobile-friendly is a bonus, not required

---

## Files

### Legacy (in `_legacy/`)
- `src/app.js` — main game loop
- `src/config.js` — all question/choice definitions
- `package.json` — Node.js deps (inquirer)
- `Dockerfile`, `codefresh.yml` — CI/CD artifacts

### New (in root)
- `index.html` — entire rebuilt app (Vue 3 CDN + inline CSS + JS)
- `DOCUMENTATION.md` — this file
