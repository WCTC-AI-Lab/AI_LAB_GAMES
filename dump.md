I'm working on a little vibe-code project for an AI Lab I work at. The goal is to allow any person to walk into the lab, and be guided into being able to complete a small project or "adventure" in about 30 minutes. The first "adventure" is a simple video game that runs in the browser.



I set up a basic github repository with a static webapp and the ci-cd pipeline that auto deploys the main branch to production. I want to have one full commit to the main branch or something be the way that someone can make a full game and then deploy it so they can point to it.



A few ways to break it down:

- could have the workflow have the person commit to "Dev" which also deploys, but as a test so the main site doesn't break down if someone makes a mistake

- then I can manually PR into the main branch for the publicly accessible page



I want the user to use cursor to vibe-code it. To do this would probably require some very strict rules and skills and context engineering, as well as some distinct commands to organize a workflow. Also, as writing is kinda hard for some people (I'm rather pessimistic on the normal person's level of literacy) especially writing a lot to describe stuff, we might want to make it easy for the person to communicate with the cursor agent and get used to the loop of say stuff and try it out and iterate.



It also requires massively limiting the scope to simple games. I don't know much about game dev, so if there are like classes or topologies of games that would help me constrict it rigirously that would be useful. Some things I notice is that the earliest and easiest games, like pacman, pong, other stuff, had the entire "map" or setting of the game always fit in the bounds of the game screen. mario seemed to invent the platformer or the infinite scroll of movement to the right, which would be harder. AGARIO and some stuff like that is more of the first version but with a very large world and you just see your current location but can zoom in or out etc. Then there's a bunch of 3D games, like most games, where you're just an agent moving about in space and Minecraft was really the first big innovation with the UI and the voxel blocks that make the gameplay more abstract. Are there any classifications that would help the constraints here?



Also, the thought is to just create a website with a bunch of pages as games, or a base game page and a bunch of games as components and then a way to navigate like most game websites. Might also be a very simple way to store how many times each game is played (for later). In that case, I'd need to also design the UI/UX in a minimalist way.



The user experience would be to log onto one of the computers, see the user guide (a locally run app), open it, see a bunch of "adventures" (or just the video game one to start), click on it, then be instructed in a simple way with how to make a videogame. It would probably look like:

- First, put this browser window on one side of the screen (split screen)

- Then, open "cursor" and the AI-LAB-GAMES project specifically

- Open the Agent tab, and type "/game" to start the computer game adventure, which will be a cursor command that will introduce them to the idea, and do some basic setup in the agent, like asking for a name of the game, then making a new git branch that has its own name for that game

- Then it will describe the rules (these contraints on the video game, you can talk or type, start with something, I'll build it, then test and add stuff)

- It will make the basic empty game, run the npm run dev command to start the thing, and tell the user to open to the localhost url on the browser so they can see the came they're playing update as it changes.

- When they are done with their game, there should probably be a /cleanup command to check the code, lint/build test as much as possible, then commit and merge to the dev branch (only the agent needs to see this, the user doesn't)

- Then they wait a bit until the dev page is up and see if they can play their game

- Later, I'll PR the dev branch to main if the games don't break stuff



I need to be able to remove games that break the app.



Thoughts? Kid of just a brain dump.