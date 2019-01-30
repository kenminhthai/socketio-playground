const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: ["webpack-hot-middleware/client?reload=true", "./src/main.js"]
  },
  output: {
    publicPath: "/",
    filename: "[name].js",
    path: path.resolve(__dirname, "./build"),
    hotUpdateChunkFilename: ".hot/[id].[hash].hot-update.js",
    hotUpdateMainFilename: ".hot/[hash].hot-update.json"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  node: {
    fs: "empty"
  },
  resolve: {
    modules: [__dirname, "node_modules"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    CopyWebpackPlugin([
      { from: path.resolve(__dirname, "./static/index.html") }
      // { from: path.resolve(__dirname, "static/style.css") },
      // { from: path.resolve(__dirname, "libs/system.js") },
      // { from: path.resolve(__dirname, "src/modules") }
    ]),
    new CleanWebpackPlugin(["build"])
  ],
  devtool: "inline-source-map",
  externals: [],
  devServer: {
    contentBase: "./build",
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    },
    // Proxy config for development purposes. In production, you would configure you webserver to do something similar.
    proxy: {
      "/ui.react.1": {
        target: "http://localhost:9001",
        pathRewrite: { "^/ui.react.1": "" }
      },
      "/ui.react.2": {
        target: "http://localhost:9002",
        pathRewrite: { "^/ui.react.2": "" }
      }
    }
  }
};
