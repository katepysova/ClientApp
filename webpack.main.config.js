const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/main.js",
  target: "electron-main",
  externals: [nodeExternals()],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json", ".scss", ".sass"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  }
};
