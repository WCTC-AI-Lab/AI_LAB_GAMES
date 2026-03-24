---
description: Ship the user's work to dev — build, fix, commit, push, create PR to main
---

You are now the **principal engineer**. The user is done with their creative work. Your job is to make sure the codebase is solid and get it deployed. Do not ask the user to fix anything — fix it yourself.

## Important: Branch Workflow

- **ALL work must be on the `dev` branch.** Never work on `main` or other branches.
- **Always start fresh:** Pull the latest `dev` branch from origin before starting.
- If you're not on `dev`, switch to it immediately.

## Steps

### 1. Ensure we're on dev and up to date

- Run `git branch --show-current` to check current branch.
- If not on `dev`, run `git checkout dev`.
- Run `git pull origin dev` to get the latest changes from remote.
- If there are merge conflicts, resolve them (prefer remote changes if unsure).

### 2. Take a screenshot for the thumbnail

- Make sure the dev server is running (`cd frontend && npm run dev` in background if needed).
- Use the **browser-use subagent** (Task tool with `subagent_type: "browser-use"`) to:
  1. Navigate to the game's URL: `http://localhost:5173/games/{id}/index.html`
  2. Wait a moment for the game to load and render.
  3. Take a screenshot.
  4. Save it as `frontend/public/games/{id}/thumbnail.png`.
- If the browser-use subagent is not available or fails, check if the user has already provided a screenshot image in the conversation. If so, copy that image file to `frontend/public/games/{id}/thumbnail.png`.
- Update `games.json` to include `"thumbnail": "/games/{id}/thumbnail.png"` if not already set.

### 3. Give the game a proper name

Check `frontend/public/games/games.json` for the game being shipped.

**If the game's `name` is generic** (e.g. "My Game", "New Game", "my-game", or anything that doesn't describe what the game actually is):

1. Read the game's `index.html` to understand what it does.
2. Come up with a fun, descriptive name that captures the game's vibe (e.g. "Space Dodger", "Brick Blaster", "Snake Remix").
3. Update the `name` in `games.json`.
4. Update the `description` in `games.json` if it's still a placeholder.

**If the game's folder `id` is `my-game`** or equally generic:

1. Rename the folder to match the game's theme: e.g. `my-game` → `space-dodger`.
2. Copy files to the new folder: `frontend/public/games/{new-id}/`.
3. Update `games.json`: change `id`, `path`, and `thumbnail` to use the new slug.
4. Delete the old folder (or at minimum remove its entry from `games.json`).

### 4. Build & lint

- Run `cd frontend && npm run build`.
- If the build **fails**, read the errors, fix them yourself, and rebuild. Repeat until clean.
- Common fixes: TypeScript errors, missing imports, Kaplay API misuse in game HTML files.
- Do NOT ask the user to fix build errors. You are the engineer.

### 5. Review game files

- For any game HTML files that were modified (check `git diff --name-only`), quickly scan for:
  - Missing restart mechanism (Space/Enter to restart after game over)
  - Missing score display
  - Kaplay API misuse (e.g. `rect()` + `text()` on same object, accessing `dt` wrong)
  - Hardcoded CDN URLs (should use `../_lib/kaplay.js`)
- Fix any issues found. Do not bother the user with these.

### 6. Stage & commit

- Run `git add -A`.
- Write a clear, concise commit message summarizing what changed. Look at the diff to understand what the user built or modified.
- Format: `feat: <what changed>` or `fix: <what was fixed>` — keep it short.
- Commit.

### 7. Push to dev

- Run `git push origin dev`.
- If the push fails (e.g. behind remote), pull with rebase first: `git pull --rebase origin dev`, then push again.

### 8. Create PR from dev to main using GitHub MCP

- **GitHub MCP is available** — use it to create the pull request.
- Use the GitHub MCP tool to create a PR from `dev` → `main`.
- Repository: `jroberts-fellow/AI_LAB_GAMES` (from `git remote -v`)
- Title: "Deploy game updates"
- Body: "Updates from dev branch"
- Base branch: `main`
- Head branch: `dev`
- **Fallback options if GitHub MCP tools are not accessible:**
  - Try `gh pr create --base main --head dev --title "Deploy game updates" --body "Updates from dev branch"`.
  - If neither works, tell the user: "Pushed to dev. Create a PR from dev→main on GitHub to deploy to production."

### 9. Report back

- Tell the user: the game's final name, what was committed, whether any fixes were needed, and that it's pushed to dev.
- Mention that a PR from dev→main will deploy it to production.
- Keep it brief and encouraging. Remember, the user is not a developer.

## Important

- **You own the code quality.** If something is broken, fix it. Don't report it and wait.
- **Don't over-engineer.** If the game works and the build passes, ship it. Perfection is the enemy of fun.
- **Be fast.** The user just wants to see their game live.
