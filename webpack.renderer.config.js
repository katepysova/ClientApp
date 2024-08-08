const Dotenv = require("dotenv-webpack");
const rules = require("./webpack.rules");
module.exports = {
  plugins: [new Dotenv()],
  module: {
    rules
  }
};
