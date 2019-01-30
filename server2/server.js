const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

server.listen(3003, () => console.log(`server 2 listens on 3003`));

app.get("/", (req, res) => {
  res.json("Server2 here");
});

io.sockets.on("connection", socket => {
  console.log("user client for server 2 just connected");
  socket.on("message", data => {
    console.log(data);
  });
  socket.emit("sync", {
    name: "module2",
    content: "<p>server number 2 222 is here</p>"
  });
});
