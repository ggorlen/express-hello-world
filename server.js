const express = require("express");
const Matter = require("matter-js");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

const frameRate = 1000 / 30;
const canvas = {width: 300, height: 200};
const boxes = 20;
const boxSize = 20;
const wallThickness = 20;
let online = 0;

const entities = {
  boxes: [...Array(boxes)].map(() => 
    Matter.Bodies.rectangle(
      Math.random() * canvas.width, 
      boxSize, 
      Math.random() * boxSize + boxSize,
      Math.random() * boxSize + boxSize,
    )
  ),
  walls: [
    Matter.Bodies.rectangle(
      canvas.width / 2, 0, 
      canvas.width, 
      wallThickness, 
      {isStatic: true}
    ),
    Matter.Bodies.rectangle(
      0, canvas.height / 2, 
      wallThickness, 
      canvas.height, 
      {isStatic: true}
    ),
    Matter.Bodies.rectangle(
      canvas.width, 
      canvas.width / 2, 
      wallThickness, 
      canvas.width, 
      {isStatic: true}
    ),
    Matter.Bodies.rectangle(
      canvas.width / 2, 
      canvas.height, 
      canvas.width, 
      wallThickness, 
      {isStatic: true}
    ),
  ]
};

const engine = Matter.Engine.create();
Matter.Composite.add(engine.world, Object.values(entities).flat());
const toVertices = e => e.vertices.map(({x, y}) => ({x, y}));

setInterval(() => {
  Matter.Engine.update(engine, frameRate);
  io.emit("update state", {
    boxes: entities.boxes.map(toVertices),
    walls: entities.walls.map(toVertices),
    online,
  });
}, frameRate);

io.on("connection", socket => {
  online++;
  socket.on("disconnect", () => --online);
  socket.on("register", cb => cb({canvas}));
  socket.on("player click", coordinates => {
    entities.boxes.forEach(box => {
      // https://stackoverflow.com/a/50472656/6243352
      const force = 0.01;
      const deltaVector = Matter.Vector.sub(box.position, coordinates);
      const normalizedDelta = Matter.Vector.normalise(deltaVector);
      const forceVector = Matter.Vector.mult(normalizedDelta, force);
      Matter.Body.applyForce(box, box.position, forceVector);
    });
  });
});

server.listen(process.env.PORT || 3000, () =>
  console.log("server listening on " + process.env.PORT)
);

