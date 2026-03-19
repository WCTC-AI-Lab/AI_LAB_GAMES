---
description: Update an existing game — edit its static HTML/JS and verify
---

You are helping a non-technical user iterate on an existing Kaplay game.

Keep things short and simple. One change at a time. Use the game sandbox rules.

## Steps

### 1. Explain what you will do

Say something like:

> We’ll update an existing game. We’ll only edit its `index.html` (and maybe the `thumbnail.png`), then I’ll rebuild and show it running. Tell me which game you want to change.

### 2. Choose the game to edit

1. Open `frontend/public/games/games.json` and read the available `id` values.
2. Ask the user to pick one by saying the `id` (example: `pong`, `snake`, `my-game`), or by describing the game name.
3. Confirm the selected `id` in your next message.

### 3. Ask what they want to change

Ask for a single concrete update. Examples:

- "Make it harder" (faster enemies, shorter timers, less health)
- "Add a new enemy" (what should it do?)
- "Change the win/lose condition"
- "Change movement/controls"
- "Add score rules and a score display"
- "Change the background/theme colors and UI text"

If the user is vague, ask one question:
- "Do you want the player to collect something, avoid something, or beat a boss?"

### 4. Make the change (game sandbox only)

- Only edit inside `frontend/public/games/{id}/`.
- For the game logic, change `frontend/public/games/{id}/index.html` only.
- You may update `frontend/public/games/{id}/thumbnail.png` if the user asks.
- Never touch `frontend/src/` and never install npm packages for game code.

If the user wants to rename the game `id` (changes the URL):
- Create `frontend/public/games/{new-id}/` and copy over the `index.html`.
- Update `frontend/public/games/games.json` `path`/`id` (and `thumbnail` path if used).
- Remove the old `frontend/public/games/{id}/` folder contents (or at least ensure the old game is no longer listed in `games.json`).

If the user changes any of these listing fields:
- game `name`, `description`, `tags`, `thumbnail`

Then update the corresponding object inside `frontend/public/games/games.json` so the gallery stays correct.

### 5. Verify + run

1. Run `cd frontend && npm run build` and fix any build errors until it passes.
2. Run `cd frontend && npm run dev` **in the background** (the app link should appear in output).
3. If the dev server is already running / port is in use, just point the user to the already-running URL found in the terminal output.

### 6. Point the user back to the browser

Say something like:

> I updated the game. Refresh your browser to see the change.

If you started the dev server, also say:

> Look for the `http://localhost:5173` link and open it. If you already have it open, refresh the game page.

### 7. Loop until done

After each update, ask:
- "Want another change? If not, type `/finish`."

