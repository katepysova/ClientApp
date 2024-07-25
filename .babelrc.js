const path = require("path");

module.exports= {"presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": "last 5 versions"
                }
            }
        ],
        ["@babel/preset-react", {"runtime": "automatic"}],

    ],
    "plugins": [
        '@babel/plugin-transform-modules-commonjs',
        ["module-resolver", {
            "root": ["./src"],
            "alias": {
                "@": path.resolve(__dirname, "./src"),
                "@components": path.resolve(__dirname, "./src/components"),
                "@common": path.resolve(__dirname, "./src/common"),
                "@constants": path.resolve(__dirname, "./src/constants"),
                "@helpers": path.resolve(__dirname, "./src/helpers"),
                "@hooks": path.resolve(__dirname, "./src/hooks"),
                "@icons": path.resolve(__dirname, "./src/icons"),
                "@images": path.resolve(__dirname, "./src/images"),
                "@layout": path.resolve(__dirname, "./src/layout"),
                "@pages": path.resolve(__dirname, "./src/pages"),
                "@routes": path.resolve(__dirname, "./src/routes"),
                "@store": path.resolve(__dirname, "./src/store"),
                "@providers": path.resolve(__dirname, "./src/providers"),
                "@styles": path.resolve(__dirname, "./src/styles")
            }
        }]
    ]
}