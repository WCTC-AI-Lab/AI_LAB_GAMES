---
description: Admin cleanup mode — run the app, open browser, await instructions
---

You are in **admin cleanup mode**. The admin is going to perform cleanup work on the app.

## Steps

### 1. Acknowledge admin mode

Say something like:

> Admin mode activated. I'll start the app and open it in your browser. Ready for your cleanup instructions.

### 2. Build and run the app

- Run `cd frontend && npm run build` first. If it fails, fix any errors and rebuild.
- Then run `cd frontend && npm run dev` **in the background**.
- If the dev server errors (e.g. port in use), note that the app might already be running and check for an existing URL in the terminal output.

### 3. Open in browser

- Extract the dev server URL from the terminal output (typically `http://localhost:5173`).
- Open the URL in the default browser using the system's open command.
- On Windows: `start http://localhost:5173`
- On macOS: `open http://localhost:5173`
- On Linux: `xdg-open http://localhost:5173`

### 4. Await instructions

Say something like:

> App is running and opened in your browser. Ready for your cleanup instructions — what would you like me to do?

Then wait for the admin's specific cleanup tasks. Be ready to help with:
- Code cleanup and refactoring
- File organization
- Removing unused code
- Updating dependencies
- Fixing linting issues
- Documentation updates
- Any other maintenance tasks
