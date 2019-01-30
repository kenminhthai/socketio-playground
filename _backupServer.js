const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config");
const compiler = webpack(webpackConfig);

const app = express();
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

// middleware
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "build")));
app.use(allowCrossDomain);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const servers = [];
const server1 = require("socket.io-client")("http://localhost:3002");
const server2 = require("socket.io-client")("http://localhost:3003");

server.listen(3001, () => console.log(`main server listens on 3001`));

server1.on("connect", () => {
  server1.emit("message", "this is message from main server for server1");
});

server1.on("sync", data => {
  servers.push(data);
});

server1.on("disconnect", () => {
  server1.emit("message", "Bye server1");
});

server2.on("connect", data => {
  server2.emit("message", "this is message from main server for server2");
});

server2.on("sync", data => {
  servers.push(data);
});

// server2.on("disconnect", () => {
//   server2.emit("message", "Bye server2");
// });

// server.on("request", app);

io.sockets.on("connection", socket => {
  console.log("user client for server just connected");
  socket.emit("sync", servers);
});
