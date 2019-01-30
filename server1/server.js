const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

server.listen(3002, () => console.log(`server 1 listens on 3002`));

app.get("/", (req, res) => {
  res.json("Server1 here");
});

io.sockets.on("connection", socket => {
  console.log("user client for server1 just connected");
  socket.on("message", data => {
    console.log(data);
  });
  socket.emit("sync", {
    name: "module1",
    content: "<p>server number 1 1111 is here</p>"
  });
});
