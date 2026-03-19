---
description: Update an existing game — edit its static HTML/JS and verify
---

You are helping a non-technical user iterate on an existing Kaplay game.

Keep things short and simple. One change at a time. Use the game sandbox rules.

## Important: Branch Workflow

- **ALL work must be on the `dev` branch.** Never work on `main` or other branches.
- **Always start fresh:** Pull the latest `dev` branch from origin before updating the game.
- If you're not on `dev`, switch to it immediately.

## Steps

### 0. Ensure we're on dev and up to date

- Run `git branch --show-current` to check current branch.
- If not on `dev`, run `git checkout dev`.
- Run `git pull origin dev` to get the latest changes from remote.
- If there are merge conflicts, resolve them (prefer remote changes if unsure).

### 1. Greet and set expectations

Say something like:

> Hey! We're going to update one of the existing games.
>
> **Quick reminders:**
> 1. **Always click "Run" and let me keep going** — don't stop me while I'm working.
> 2. **One change at a time** — tell me one thing to fix or add, I'll do it, you refresh and check.
> 3. **If something looks wrong, just tell me** and I'll fix it.
>
> Which game do you want to work on?

### 2. Choose the game to edit

1. Open `frontend/public/games/games.json` and read the available `id` values.
2. List the games for the user so they can pick one.
3. Confirm the selected `id` in your next message.

### 3. Open the game in the Cursor browser

- Make sure the dev server is running (`cd frontend && npm run dev` in background if needed).
- Put the direct game link in chat so the user opens it in Cursor's built-in browser (not an external browser):

> Click this link to open the game right next to our chat:
>
> http://localhost:5173/games/{id}/index.html
>
> ⚠️ **Every time I make a change, you need to refresh that game page.** I'll remind you each time.
>
> What do you want to change?

### 4. Ask what they want to change

Ask for a single concrete update. Examples:

- "Make it harder" (faster enemies, shorter timers, less health)
- "Add a new enemy" (what should it do?)
- "Change the win/lose condition"
- "Change movement/controls"
- "Add score rules and a score display"
- "Change the background/theme colors and UI text"

If the user is vague, ask one question:
- "Do you want the player to collect something, avoid something, or beat a boss?"

### 5. Make the change (game sandbox only)

- Only edit inside `frontend/public/games/{id}/`.
- For the game logic, change `frontend/public/games/{id}/index.html` only.
- You may update `frontend/public/games/{id}/thumbnail.png` if the user asks.
- Never touch `frontend/src/` and never install npm packages for game code.

If the user wants to rename the game `id` (changes the URL):
- Create `frontend/public/games/{new-id}/` and copy over the `index.html`.
- Update `frontend/public/games/games.json` `path`/`id` (and `thumbnail` path if used).
- Remove the old `frontend/public/games/{id}/` folder contents (or at least ensure the old game is no longer listed in `games.json`).

If the user changes any listing fields (name, description, tags, thumbnail), update `games.json` accordingly.

### 6. Verify

1. Run `cd frontend && npm run build` and fix any build errors until it passes.
2. Make sure the dev server is still running.

### 7. Tell the user to refresh

After **every** change, say something like:

> Done! **Refresh the game page** to see the change. [one-line description of what changed]

This is required every time. The iframe does not auto-refresh.

### 8. Loop until done

After each update, ask:
- "Want another change? If not, type `/finish` to ship it."
