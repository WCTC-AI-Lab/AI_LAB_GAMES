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

### 1. Greet and set expectations

Say something like (adjust to sound natural):

> Hey! You're about to make a game. Here's how this works:
>
> **The only rule:** everything fits on one screen — no scrolling, no levels, just one box. Think old-school arcade.
>
> **Three tips to have the most fun:**
>
> 1. **Always click "Run" and let me keep going.** When you see permission prompts or "allow" buttons, just click them. Let me cook.
> 2. **Start simple, add one thing at a time.** You do NOT need a complete idea. Start with something like:
>    - *"A guy that walks around on the ground"*
>    - *"A rocket ship that goes up and down with gravity"*
>    - *"A tank that drives around from above"*
>    - *"Start with Pac-Man and add weird stuff to it"*
>    Then just tell me one new idea whenever you think of it.
> 3. **If something looks wrong, just say so.** Tell me "the player falls through the floor" or "it's too fast" and I'll fix it right away.
>
> The loop is: **I build → you look → you tell me what's next → repeat.**
>
> Ready? What do you want to make?

### 2. Create a new game — copy the template (DO NOT write code from scratch)

- If they already said a name or concept (e.g. "space shooter"), slugify it: "space shooter" → `space-shooter`.
- If not, use `my-game` as a temporary slug (it gets renamed when they `/finish`).
- **FAST PATH — use a shell command to copy the template:**
  ```
  cp "frontend/public/games/_template/index.html" "frontend/public/games/{id}/index.html"
  ```
  This is one shell command. Do NOT rewrite the file contents from scratch.
- The template already has: 800×520 canvas and an **empty** game scene (no player or movement until you add it).
- Add the game to `frontend/public/games/games.json` (id, name, description, path, author, tags).
- If the kid told you a concept (space shooter, dinosaur, etc.), do ONE small tweak to the copied file to reflect it — e.g. change the player color or the title text. Keep it minimal; iterate from there.

### 3. Build and start the dev server

- Run `cd frontend && npm run build` first. If it fails, fix the errors and rebuild. Do not tell the user their game is ready until the build passes.
- Then run `cd frontend && npm run dev` **in the background**.
- If the dev server errors (e.g. port in use), check for an already-running dev server in the terminal output and use that URL.

### 4. Open the game for the user

- Get the dev server URL (typically `http://localhost:5173`).
- The game's direct URL is: `http://localhost:5173/games/{id}/index.html`
- Put the URL in your chat message as a **markdown link** so it's clickable.
- **CRITICAL FORMATTING:** Use markdown link syntax: `[Click here to open your game](http://localhost:5173/games/{id}/index.html)`. Do NOT use backticks around the URL, do NOT put it in a code block. It MUST be a markdown link or it won't be clickable.
- Say something like:

> Your game is ready!
>
> [Click here to open your game](http://localhost:5173/games/{id}/index.html)
>
> ⚠️ **Every time I make a change, you need to refresh the game page** (F5 or Ctrl+R). I'll remind you each time.
>
> What should we add first?

### 5. Iterate

- After every code change, always say: **"Refresh the game page to see the change."** Every. Single. Time. The iframe doesn't auto-refresh.
- Keep changes small. One thing at a time.
- Ask a simple follow-up question after each change to keep the loop going.
- Celebrate small wins: "Nice — your character moves now! What should happen next?"
- If something breaks, fix it immediately and explain in one sentence what went wrong.
- When they're happy, tell them to type **/finish** and you'll ship it.
