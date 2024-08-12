# PowerLeaf - Laptop Energy Well-being

A cross-platform desktop [React](https://react.dev/) application build with [Electron Forge](https://www.electronforge.io/).

## Installation

### Prerequisites

Make sure you have following installed on your machine:

- [Node.js](https://nodejs.org/en)

Use the package manager [npm](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager) to install dependencies from the **package.json** file.

```bash
npm install
```

## Usage

To start the application in the development mode, use:

```bash
npm run start
```

This will open the application with live reloading enabled.

### Running in Production Mode

#### Package

This will creat an executable bundle for a target operating system. By default, running the Package step will only create a packaged application for your machine's platform and architecture.

```bash
npm run package
```

```bash
npm run package:mac
```

```bash
npm run package:win
```

After the Package step, your packaged application will be available in the ***/out/*** directory.

#### Make

Forge's Make step takes the bundled executable output from the previous Package step and creates "distributables" from it.

```bash
npm run make
```

The output of the **make** command is typically found in the ***/out/make*** directory. It contains the installers and zip files that can be distributed to users.

#### Publish

Forge's Publish step takes the distributable build artifacts from the Make step and uploads for distribution to your app's end users (e.g. to GitHub Releases or AWS S3 static storage). Publishing is an optional step in the Electron Forge pipeline, since the artifacts from the Make step are already in their final format.

```bash
npm run publish
```

### Rebuild

[Electron Rebuild](https://www.npmjs.com/package/@electron/rebuild) executable rebuilds native Node.js modules against the version of Node.js that your Electron project is using.

Running rebuild to fix **sqlite3** module error, if occurs.

```bash
npm run rebuild
```

### Lint

#### Eslint

Run [eslint](https://eslint.org/) to analyze and fix your .js, .jsx code problems.

```bash
npm run lint:fix
```

#### Stylelint

Run [stylelint](https://stylelint.io/) to analyze and fix your .css, .scss errors.

```bash
npm run stylelint:fix
```

#### Eslint + Stylelint

Run eslint and stylelint together.

```bash
npm run format
```

### Git pre-commit hook

Install [Husky](https://typicode.github.io/husky/]) pre-commit hook.

```bash
npm run prepare
```
