const Dotenv = require("dotenv-webpack");
const rules = require("./webpack.rules");
const path = require("path");

module.exports = {
  plugins: [new Dotenv()],
  module: {
    rules
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      '@': path.resolve(__dirname, 'src'), 
    }
  },
};
