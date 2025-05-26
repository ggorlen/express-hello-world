(() => {
  const canvas = document.querySelector("#game");
  const onlineEl = document.querySelector("#online");
  const ctx = canvas.getContext("2d");
  const socket = io();
  
  const draw = (body, ctx) => {
    ctx.beginPath();
    body.forEach(e => ctx.lineTo(e.x, e.y));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };
  
  socket.once("connect", () => {
    console.log("connected");
    socket.emit("register", res => {
      canvas.width = res.canvas.width;
      canvas.height = res.canvas.height;
    });
  });
  
  socket.on("update state", ({boxes, walls, online}) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#111";
    ctx.strokeStyle = "#111";
    walls.forEach(wall => draw(wall, ctx));
    ctx.fillStyle = "#aaa";
    boxes.forEach(box => draw(box, ctx));
    onlineEl.textContent = online;
  });
  
  document.addEventListener("mousedown", e => {
    socket.emit("player click", {x: e.offsetX, y: e.offsetY}); 
  });
})();
