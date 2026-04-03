# 🎨 Microfrontend Color Picker

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](README.es.md)

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Webpack](https://img.shields.io/badge/Webpack-5.105.4-8DD6F9?style=flat&logo=webpack&logoColor=white)](https://webpack.js.org/)
[![Module Federation](https://img.shields.io/badge/Module_Federation-5.0-FF6B6B?style=flat)](https://webpack.js.org/concepts/module-federation/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> An educational project demonstrating microfrontend architecture using Webpack Module Federation

## 📚 Table of Contents

- [About the Project](#-about-the-project)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Module Federation](#-module-federation)
- [Available Scripts](#-available-scripts)
- [Learning](#-learning)
- [License](#-license)

## 🎯 About the Project

This project is an educational application designed to demonstrate the implementation of a **microfrontend** architecture using **Webpack Module Federation**. The application consists of a color picker that is implemented as an independent microfrontend and consumed by a host application.

### Key Features

- ✅ Microfrontend architecture with Module Federation
- ✅ React 19 with the latest features
- ✅ Webpack 5 with optimized configuration
- ✅ Zero security vulnerabilities
- ✅ Hot Module Replacement (HMR) for development
- ✅ Optimized production build

## 🏗 Architecture

The project is divided into two independent applications:

```
┌─────────────────────────────────────────┐
│           HOST (Port 3000)              │
│  ┌───────────────────────────────────┐  │
│  │     Color List (Placeholder)      │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │   ┌─────────────────────────┐     │  │
│  │   │  MF-COLORPICKER (3001)  │     │  │
│  │   │  ┌──────────────────┐   │     │  │
│  │   │  │  Color Picker    │   │     │  │
│  │   │  │  Component       │   │     │  │
│  │   │  └──────────────────┘   │     │  │
│  │   └─────────────────────────┘     │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Microfrontends

1. **Host Application** (`host/`): Container application that consumes the microfrontend
2. **MF-ColorPicker** (`mf-colorpicker/`): Microfrontend that exposes the ColorPicker component

## 🛠 Technologies

### Core
- **React** 19.2.4 - UI library with the latest createRoot API
- **React-DOM** 19.2.4 - React rendering for the DOM

### Build Tools
- **Webpack** 5.105.4 - Module bundler with Module Federation
- **Webpack CLI** 6.0.1 - Command line interface for Webpack
- **Webpack Dev Server** 5.2.3 - Development server with HMR

### Transpilation
- **Babel Core** 7.26.0 - JavaScript transpiler
- **@babel/preset-env** 7.26.0 - Preset for browser compatibility
- **@babel/preset-react** 7.26.0 - Preset for JSX and React
- **babel-loader** 9.2.1 - Babel loader for Webpack

### Styling
- **CSS Loader** 7.1.2 - CSS file loading
- **Style Loader** 4.0.0 - CSS injection into the DOM
- **PostCSS** 8.4.49 - CSS transformation
- **Autoprefixer** 10.4.20 - Automatic CSS prefixes

## 📋 Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd microfrontend-colors
```

### 2. Install dependencies

```bash
# Install host dependencies
cd host
npm install

# Install microfrontend dependencies
cd ../mf-colorpicker
npm install
```

## 💻 Usage

### Development Mode

To run the application in development mode, you need to start both servers:

#### Terminal 1 - ColorPicker Microfrontend
```bash
cd mf-colorpicker
npm start
```
The microfrontend will be available at: `http://localhost:3001`

#### Terminal 2 - Host Application
```bash
cd host
npm start
```
The main application will be available at: `http://localhost:3000`

### Production Build

#### Build both projects
```bash
# Build the microfrontend
cd mf-colorpicker
npm run build

# Build the host
cd ../host
npm run build
```

Compiled files will be generated in the `dist/` folder of each project.

### Serve in Production

```bash
# Serve the microfrontend
cd mf-colorpicker
npm run build:start

# Serve the host (in another terminal)
cd host
npm run build:start
```

## 📁 Project Structure

```
microfrontend-colors/
├── host/                           # Host Application
│   ├── dist/                       # Production build
│   ├── src/
│   │   ├── App.jsx                 # Main component
│   │   ├── index.html              # HTML template
│   │   └── index.js                # Entry point
│   ├── .babelrc                    # Babel configuration
│   ├── package.json
│   └── webpack.config.js           # Webpack + Module Federation config
│
├── mf-colorpicker/                 # ColorPicker Microfrontend
│   ├── dist/                       # Production build
│   ├── src/
│   │   ├── components/
│   │   │   └── ColorPicker.jsx     # Exported component
│   │   ├── App.jsx                 # Standalone MF app
│   │   ├── index.css               # Styles
│   │   ├── index.html              # HTML template
│   │   └── index.js                # Entry point
│   ├── .babelrc                    # Babel configuration
│   ├── package.json
│   └── webpack.config.js           # Webpack + Module Federation config
│
├── README.md                       # This file
└── README.es.md                    # Spanish version
```

## 🔗 Module Federation

### What is Module Federation?

**Module Federation** is a Webpack 5 feature that allows sharing code between different Webpack builds at runtime. This enables truly independent microfrontend architectures.

### Host Configuration

```javascript
// host/webpack.config.js
new ModuleFederationPlugin({
  name: "host",
  filename: "remoteEntry.js",
  remotes: {
    colorPicker: "mf_colorpicker@http://localhost:3001/remoteEntry.js"
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true }
  }
})
```

### Remote Configuration (MF-ColorPicker)

```javascript
// mf-colorpicker/webpack.config.js
new ModuleFederationPlugin({
  name: "mf_colorpicker",
  filename: "remoteEntry.js",
  exposes: {
    "./ColorPicker": "./src/components/ColorPicker.jsx"
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true }
  }
})
```

### Consuming the Microfrontend

```javascript
// host/src/App.jsx
import ColorPicker from "colorPicker/ColorPicker";

const App = () => (
  <div>
    <ColorPicker />
  </div>
);
```

## 📜 Available Scripts

### Host & MF-ColorPicker (both projects)

| Script | Description |
|--------|-------------|
| `npm start` | Starts the development server |
| `npm run start:live` | Starts the server with live reload and auto-open |
| `npm run build` | Builds for production |
| `npm run build:dev` | Builds in development mode |
| `npm run build:start` | Builds and serves with npx serve |

## 📖 Learning

This project is ideal for learning:

### Microfrontend Concepts
- ✅ **Independence**: Each microfrontend can be developed, tested, and deployed independently
- ✅ **Shared Dependencies**: Share common dependencies (React, React-DOM) to avoid duplication
- ✅ **Runtime Integration**: Microfrontends integrate at runtime, not at build time
- ✅ **Team Scalability**: Different teams can work on different microfrontends

### Module Federation
- ✅ **Remotes**: Applications that expose modules
- ✅ **Hosts**: Applications that consume remote modules
- ✅ **Bidirectional**: A host can be a remote and vice versa
- ✅ **Singleton Sharing**: Share a single instance of React between applications

### React 19
- ✅ **createRoot API**: New rendering API
- ✅ **Automatic JSX Transform**: No need to import React
- ✅ **Concurrent Features**: Ready for concurrent features

### Webpack 5
- ✅ **Module Federation Plugin**: Configuration and usage
- ✅ **Dev Server**: HMR and proxy configuration
- ✅ **Production Optimization**: Minification and tree-shaking

## 🔒 Security

This project maintains **0 security vulnerabilities**:

```bash
# Check vulnerabilities
cd host && npm audit
cd mf-colorpicker && npm audit
```

Both projects are updated with the latest stable versions of all dependencies.

## 🤝 Contributing

This is an educational project. Contributions are welcome:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Notes

### Important Migrations

- ✅ **React 18 → React 19**: Complete rendering API migration
- ✅ **Babel 8**: Updated to babel-loader 9 and modern presets
- ✅ **Webpack Dev Server 5**: Updated with new configuration

### Hot Module Replacement (HMR)

The project is configured with HMR for a smooth development experience:
- Component changes are reflected instantly
- Application state is preserved between changes
- No need to manually refresh the browser

---

⭐️ If this project helped you learn about microfrontends, consider giving it a star!

## 📚 Additional Resources

- [Webpack Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [React 19 Documentation](https://react.dev/)
- [Microfrontends Pattern](https://martinfowler.com/articles/micro-frontends.html)
- [Webpack 5 Module Federation - YouTube](https://www.youtube.com/watch?v=3SD6iyG8Jnk)
