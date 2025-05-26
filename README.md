# README

This is the [Express](https://expressjs.com) [Hello world](https://expressjs.com/en/starter/hello-world.html) example on [Render](https://render.com).

The app in this repo is deployed at [https://express.onrender.com](https://express.onrender.com).

## Deployment

See https://render.com/docs/deploy-node-express-app or follow the steps below:

Create a new web service with the following values:
  * Build Command: `yarn`
  * Start Command: `node app.js`

That's it! Your web service will be live on your Render URL as soon as the build finishes.

# matterjs-socketio

A proof of concept running [matter.js](https://brm.io/matter-js/) on the server to support a multiplayer game with [socket.io](https://socket.io/).

See <https://stackoverflow.com/questions/61164289/running-matter-js-on-a-node-server/62687244#62687244>

Consider a game loop like:
- <https://github.com/timetocode/node-game-loop>
- <https://github.com/tangmi/node-gameloop>
- <http://gameprogrammingpatterns.com/game-loop.html>
- <https://gafferongames.com/post/fix_your_timestep>

