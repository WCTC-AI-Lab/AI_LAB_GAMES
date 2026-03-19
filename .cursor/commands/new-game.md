---
description: Start a new game — hello, rules, empty canvas, run the app
---

You are welcoming a **completely non-technical user**. They may use voice or type. Keep everything short and simple. No jargon.

## Important: Branch Workflow

- **ALL work must be on the `dev` branch.** Never work on `main` or other branches.
- **Always start fresh:** Pull the latest `dev` branch from origin before creating the game.
- If you're not on `dev`, switch to it immediately.

## Steps

### 0. Ensure we're on dev and up to date

- Run `git branch --show-current` to check current branch.
- If not on `dev`, run `git checkout dev`.
- Run `git pull origin dev` to get the latest changes from remote.
- If there are merge conflicts, resolve them (prefer remote changes if unsure).

### 1. Greet and explain the rules

Say something like (adjust to sound natural):

> Hi. You're making a game. Here's the only rule: **everything has to fit on one screen** — no scrolling, no levels, just one box. Think old-school arcade: Pong, Snake, Breakout. Tell me what you want and I'll build it.

### 2. Create a new empty game

- If they already said a name (e.g. "space shooter"), use that. Slugify: "space shooter" → `space-shooter`.
- If not, use `my-game`.
- Create `frontend/public/games/{id}/index.html`. Copy the structure from `snake/index.html` or `pong/index.html`: same `<!DOCTYPE>`, `<style>`, `body`/`canvas` CSS, and `<script src="../_lib/kaplay.js">`. Inside the script:
  - `kaplay({ width: 440, height: 440, background: [15, 23, 42], crisp: true });`
  - `scene("game", () => { add([text("Your game", { size: 24 }), pos(220, 220), anchor("center"), color(245,245,245)]); add([text("Score: 0", { size: 16 }), pos(20, 20), color(200,200,210)]); });`
  - `go("game");`
- Add the game to `frontend/public/games/games.json` (id, name, description, path, author, tags).

### 3. Verify and run the app

- Run `cd frontend && npm run build` first. If it fails, fix the errors and rebuild. Do not tell the user their game is ready until the build passes.
- Then run `cd frontend && npm run dev` **in the background**.
- If the dev server errors (e.g. port in use), say the app might already be running and they should look for a URL in another terminal.

### 4. Point them at the browser

Say something like:

> Your game is ready. **Look at the terminal** — you'll see a link like `http://localhost:5173`. **Ctrl+click it** (or Cmd+click on Mac) to open it. You'll see your game in the list. Tell me what you want — with your voice or by typing — and I'll change it. When you're happy, type **/finish** and I'll ship it.

### 5. Keep it light

- Don't overload them. One screen, one box, tell me what you want, /finish when done.
- If they ask "what can I make?", give 2–3 quick examples: "A game where you dodge stuff, or collect coins, or shoot aliens. What sounds fun?"
