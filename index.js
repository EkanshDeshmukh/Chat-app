const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("a user connected !", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
  setInterval(() => {
    socket.emit("from server");
  }, 1000);
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
