AI Lab: 30-Minute Vibe-Coding Game Adventure

This document outlines the architecture, constraints, and Cursor agent configuration required to facilitate a foolproof, 30-minute game development loop for absolute beginners.

1. Architectural Foundation: The iFrame Sandbox & Vite

To protect the main application from user-generated errors and fatal loops, all user games are treated as isolated, static assets.

How it works with Vite:

The main lab website (Arcade/Gallery) is built with Vite (React, Vue, or Vanilla).

User games are saved directly into the /public/games/{game-name}/ directory.

Vite automatically serves everything in the /public folder as static, unbundled assets.

The main website simply renders an iframe: <iframe src="/games/{game-name}/index.html"></iframe>.

Result: No complex bundling, no broken main builds, and instantaneous hot-reloading (the user just refreshes their browser page to see the updated iframe).

2. Game Engine & Topology

Constraint: Single-Screen 2D Canvas Game. No scrolling cameras, no complex 3D math, no multi-level state machines.

Engine Recommendation: Kaboom.js (via CDN)
While Vanilla HTML5 Canvas is great, Kaboom.js (or Kaplay) is the closest thing JavaScript has to PyGame for beginners. It is specifically designed to be highly readable, text-based, and extremely easy for LLMs to generate.

Zero Build Step: The user's index.html just imports the library via <script src="https://unpkg.com/kaboom@3000.0.1/dist/kaboom.js"></script>.

Readable Syntax: Adding a player character is as simple as add([sprite("hero"), pos(80, 40)]).

3. Project Structure

This structure ensures the AI knows exactly where to put things without breaking the core app.

ai-lab-arcade/
├── .cursorrules           # The brain of the workflow
├── package.json           
├── src/                   # Main Vite App (Gallery, UI, Firebase logic)
│   ├── App.jsx
│   └── components/
│       └── GameCard.jsx   # Renders the <iframe>
└── public/
    └── games/             # The Sandbox directory
        ├── user-game-1/
        │   └── index.html # Entire game lives here (HTML, CSS, Kaboom JS)
        └── user-game-2/
            └── index.html


4. Cursor Agent Configuration (.cursorrules)

To make the vibe-coding process seamless for non-technical users, we define strict Rules, Skills, and Commands for the Cursor agent.

A. Rules (Core Constraints)

These are absolute boundaries the AI must never cross.

The Sandbox Rule: All game code must exist entirely within a single index.html file inside /public/games/<game-name>/. NEVER modify the /src/ directory unless explicitly asked by the lab administrator.

The Single-Screen Rule: The game world must fit entirely within the standard canvas window. No scrolling cameras, no infinite maps.

The CDN Rule: Do not install npm packages for games. Use Kaboom.js via CDN or Vanilla HTML5 Canvas.

The Communication Rule: The user is a beginner. Ask short, simple, binary, or single-variable questions to guide iteration. Do not dump large walls of explanation unless requested.

B. Skills (AI Design Patterns)

These are patterns the AI should rely on when the user asks for generic features.

Skill: Basic Movement: When asked to make something move, default to WASD and Arrow key bindings.

Skill: Collision Detection: Use simple bounding-box (AABB) logic or Kaboom's built-in onCollide() methods.

Skill: Game Loop/State: Always include a simple score counter and a "Game Over" state that allows the user to press "R" or click to restart.

Skill: Asset Generation: Use simple colored rectangles, circles, or Unicode emojis (🍕, 👾, 🚀) as game sprites. Do not attempt to load external image URLs to avoid CORS/broken link issues.

C. Commands (Workflow Automation)

The user will trigger these specific words in the Cursor chat to progress through the adventure.

/game <NameOfGame>

Agent Behavior:

Greet the user enthusiastically.

Run git checkout -b game-<NameOfGame> dev to isolate their work.

Create the folder /public/games/<NameOfGame>/.

Scaffold a basic boilerplate index.html using Kaboom.js (a canvas, a colored background, and a single movable shape/emoji).

Instruct the user to split their screen and navigate to http://localhost:5173/games/<NameOfGame>/index.html.

Ask: "I've set up a basic character. What should the objective of our game be?"

/iterate

Agent Behavior:

Acknowledge the user's plain-text or voice request.

Write the necessary logic updates in the index.html file.

Say: "I've updated the code! Refresh your browser on the right to try it out. Should we make it faster, add enemies, or change the colors?"

/cleanup

Agent Behavior:

Perform a final code check: Ensure there are no infinite while loops and the <script> tag is properly closed.

Run git add public/games/<NameOfGame>/*.

Run git commit -m "feat: complete <NameOfGame>".

Run git push origin game-<NameOfGame>.

Run a script or command to PR/Merge this into the dev branch.

Say: "Congratulations! Your game has been submitted to the lab's servers. You can view the live gallery in a few minutes to see it published!"