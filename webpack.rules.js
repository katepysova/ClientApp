const path = require("path");

module.exports = [
  {
    test: /native_modules[/\\].+\.node$/,
    use: "node-loader"
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@vercel/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules"
      }
    }
  },
  {
    test: /\.css$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }]
  },
  {
    test: /\.(png|svg|jpg|jpeg|webp)$/,
    exclude: /icons/,
    type: "asset/resource"
  },
  {
    test: /\.jsx?$/,
    use: {
      loader: "babel-loader",
      options: {
        exclude: /node-modules/,
        presets: ["@babel/preset-react", "react-app"]
      }
    }
  },
  {
    test: /\.s[ac]ss$/i,
    use: ["style-loader", "css-loader", "sass-loader"]
  },
  {
    test: /\.svg$/,
    include: path.join(__dirname, "./src/icons"),
    use: [
      {
        loader: "svg-sprite-loader",
        options: {
          spriteFilename: () => "sprite.svg",
          symbolId: (filePath) => path.basename(filePath)
        }
      }
    ]
  }
];
