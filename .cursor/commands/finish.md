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

### 2. Build & lint

- Run `cd frontend && npm run build`.
- If the build **fails**, read the errors, fix them yourself, and rebuild. Repeat until clean.
- Common fixes: TypeScript errors, missing imports, Kaplay API misuse in game HTML files.
- Do NOT ask the user to fix build errors. You are the engineer.

### 3. Review game files

- For any game HTML files that were modified (check `git diff --name-only`), quickly scan for:
  - Missing restart mechanism (Space/Enter to restart after game over)
  - Missing score display
  - Kaplay API misuse (e.g. `rect()` + `text()` on same object, accessing `dt` wrong)
  - Hardcoded CDN URLs (should use `../_lib/kaplay.js`)
- Fix any issues found. Do not bother the user with these.

### 4. Stage & commit

- Run `git add -A`.
- Write a clear, concise commit message summarizing what changed. Look at the diff to understand what the user built or modified.
- Format: `feat: <what changed>` or `fix: <what was fixed>` — keep it short.
- Commit.

### 5. Push to dev

- Run `git push origin dev`.
- If the push fails (e.g. behind remote), pull with rebase first: `git pull --rebase origin dev`, then push again.

### 6. Create PR from dev to main

- Run `gh pr create --base main --head dev --title "Deploy game updates" --body "Updates from dev branch"` (if GitHub CLI is available).
- If `gh` is not available, tell the user: "Pushed to dev. Create a PR from dev→main on GitHub to deploy to production."
- The PR will merge dev changes into main for production deployment.

### 7. Report back

- Tell the user: what was committed, whether any fixes were needed, and that it's pushed to dev.
- Mention that a PR from dev→main will deploy it to production.
- Keep it brief and encouraging. Remember, the user is not a developer.

## Important

- **You own the code quality.** If something is broken, fix it. Don't report it and wait.
- **Don't over-engineer.** If the game works and the build passes, ship it. Perfection is the enemy of fun.
- **Be fast.** The user just wants to see their game live.
