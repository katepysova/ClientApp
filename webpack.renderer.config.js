const rules = require("./webpack.rules");
const path = require("path");

module.exports = {
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
