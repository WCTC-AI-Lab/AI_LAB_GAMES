---
description: Fork an existing game — copy it and remix it into something new
---

You are helping a non-technical user make a copy of an existing game so they can modify it without changing the original.

Keep things short and simple. Use the game sandbox rules.

## Important: Branch Workflow

- **ALL work must be on the `dev` branch.** Never work on `main` or other branches.
- **Always start fresh:** Pull the latest `dev` branch from origin before forking.
- If you're not on `dev`, switch to it immediately.

## Steps

### 0. Ensure we're on dev and up to date

- Run `git branch --show-current` to check current branch.
- If not on `dev`, run `git checkout dev`.
- Run `git pull origin dev` to get the latest changes from remote.
- If there are merge conflicts, resolve them (prefer remote changes if unsure).

### 1. Greet and set expectations

Say something like:

> Hey! We're going to make a copy of an existing game so you can remix it however you want — the original stays untouched.
>
> **Quick reminders:**
> 1. **Always click "Run" and let me keep going** — don't stop me while I'm working.
> 2. **Start simple, add one thing at a time.** Tell me one change, I'll do it, you refresh and check.
> 3. **If something looks wrong, just tell me** and I'll fix it.
>
> Which game do you want to start from?

### 2. Choose the source game

1. Open `frontend/public/games/games.json` and read the available `id` values.
2. List the games for the user so they can pick one.
3. Confirm the selected game.

### 3. Ask for a name for the new version

Ask what they want to call their remix. Slugify whatever they say (e.g. "crazy pong" → `crazy-pong`).

If they don't have a name yet, use `{original-id}-remix` as a temporary slug (it gets renamed when they `/finish`).

### 4. Copy the game files

- Create `frontend/public/games/{new-id}/` directory.
- Copy `frontend/public/games/{original-id}/index.html` → `frontend/public/games/{new-id}/index.html`.
- If the original has a `thumbnail.png`, copy that too.
- Add a **new** entry to `frontend/public/games/games.json` with:
  - `id`: the new slug
  - `name`: whatever the user said, or "{Original Name} Remix"
  - `description`: "Remix of {original description}"
  - `path`: `/games/{new-id}/index.html`
  - `thumbnail`: `/games/{new-id}/thumbnail.png` (if copied)
  - Keep the original's `author` and `tags`

### 5. Build and start the dev server

- Run `cd frontend && npm run build`. Fix errors if any.
- Run `cd frontend && npm run dev` in the background if not already running.

### 6. Open the new game in the Cursor browser

Put the direct link in chat so the user opens it in Cursor's built-in browser:

> Your copy is ready! **Click this link to open it right next to our chat:**
>
> http://localhost:5173/games/{new-id}/index.html
>
> It's an exact copy of {original name} right now. What do you want to change first?
>
> ⚠️ **Every time I make a change, you need to refresh that game page.** I'll remind you each time.

### 7. Iterate

- After every code change, always say: **"Refresh the game page to see the change."**
- Keep changes small. One thing at a time.
- Ask a simple follow-up question after each change.
- When they're happy, tell them to type **/finish** to ship it.
