const path = require("path");

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/main.js",
  // Put your normal webpack config below here
  output: {
    path: path.resolve(__dirname, ".webpack/main"),
    filename: "index.js"
  },
  module: {
    rules: require("./webpack.rules")
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: [".js", ".jsx", ".json"]
  },
  target: "electron-main",
  mode: "development",
};
