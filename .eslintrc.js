module.exports = {
  root: true,
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["react", "import", "prettier", "module-resolver"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 8,
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true
    }
  },
  ignorePatterns: ["node_modules/"],
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "react/react-in-jsx-scope": 0,
    "react/jsx-uses-vars": "error",
    "no-console": "error",
    "module-resolver/use-alias": 2
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      "babel-module": {}
    }
  }
};
