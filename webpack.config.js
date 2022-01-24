const path = require("path");
const webpack = require("webpack");
const liveServer = require("live-server");
const dev = process.env.NODE_ENV == "development";
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

if (dev) {
  liveServer.start({
    root: "./dist",
    file: "index.html",
    watch: ["./src"],
    open: false,
  });
}

const rulesForTypescript = {
  test: /\.tsx?$/,
  use: "ts-loader",
  exclude: /node_modules/,
};
const rulesForStyles = {
  test: /\.css$/,
  use: ["style-loader", { loader: "css-loader", options: { modules: true } }],
};

const rulesForAssets = {
  test: /\.(jpe?g|png|gif|svg)$/i,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        publicPath: "./assets",
        outputPath: "assets",
      },
    },
  ],
};

module.exports = {
  context: path.join(__dirname, "src"),
  watch: dev,
  entry: "./index.tsx",
  module: {
    rules: [rulesForAssets, rulesForStyles, rulesForTypescript],
  },
  resolve: {
    extensions: [".tsx", ".js", ".ts", ".png", ".gif", ".jpg", ".css"],
    modules: ["src", "node_modules"],
  },
  plugins: [
    new TsconfigPathsPlugin({
      baseUrl: "./src",
      extensions: [".ts", ".tsx", ".png", ".gif", ".jpg", ".css"],
      configFile: "tsconfig.json",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html",
      favicon: "./assets/huella.png",
    }),
    // new webpack.ProvidePlugin({
    //   process: "process/browser",
    // }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devtool: dev ? "inline-source-map" : "source-map",
};
