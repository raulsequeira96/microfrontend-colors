# 🎨 Microfrontend Color Picker

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](README.es.md)

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Webpack](https://img.shields.io/badge/Webpack-5.105.4-8DD6F9?style=flat&logo=webpack&logoColor=white)](https://webpack.js.org/)
[![Module Federation](https://img.shields.io/badge/Module_Federation-5.0-FF6B6B?style=flat)](https://webpack.js.org/concepts/module-federation/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Un proyecto educativo de arquitectura de microfrontends utilizando Webpack Module Federation

## 📚 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Module Federation](#-module-federation)
- [Scripts Disponibles](#-scripts-disponibles)
- [Aprendizaje](#-aprendizaje)
- [Licencia](#-licencia)

## 🎯 Sobre el Proyecto

Este proyecto es una aplicación educativa diseñada para demostrar la implementación de una arquitectura de **microfrontends** utilizando **Webpack Module Federation**. La aplicación consiste en un selector de colores (color picker) que está implementado como un microfrontend independiente y consumido por una aplicación host.

### Características Principales

- ✅ Arquitectura de microfrontends con Module Federation
- ✅ React 19 con las últimas características
- ✅ Webpack 5 con configuración optimizada
- ✅ Zero vulnerabilidades de seguridad
- ✅ Hot Module Replacement (HMR) para desarrollo
- ✅ Build de producción optimizado

## 🏗 Arquitectura

El proyecto está dividido en dos aplicaciones independientes:

```
┌─────────────────────────────────────────┐
│           HOST (Puerto 3000)            │
│  ┌───────────────────────────────────┐  │
│  │     Lista de Colores (Placeholder)│  │
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

1. **Host Application** (`host/`): Aplicación contenedora que consume el microfrontend
2. **MF-ColorPicker** (`mf-colorpicker/`): Microfrontend que expone el componente ColorPicker

## 🛠 Tecnologías

### Core
- **React** 19.2.4 - Biblioteca de UI con la última API createRoot
- **React-DOM** 19.2.4 - Renderizado de React para el DOM

### Build Tools
- **Webpack** 5.105.4 - Module bundler con Module Federation
- **Webpack CLI** 6.0.1 - Command line interface para Webpack
- **Webpack Dev Server** 5.2.3 - Servidor de desarrollo con HMR

### Transpilación
- **Babel Core** 7.26.0 - Transpilador de JavaScript
- **@babel/preset-env** 7.26.0 - Preset para compatibilidad de navegadores
- **@babel/preset-react** 7.26.0 - Preset para JSX y React
- **babel-loader** 9.2.1 - Loader de Babel para Webpack

### Estilos
- **CSS Loader** 7.1.2 - Carga de archivos CSS
- **Style Loader** 4.0.0 - Inyección de CSS en el DOM
- **PostCSS** 8.4.49 - Transformación de CSS
- **Autoprefixer** 10.4.20 - Prefijos CSS automáticos

## 📋 Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd microfrontend-colors
```

### 2. Instalar dependencias

```bash
# Instalar dependencias del host
cd host
npm install

# Instalar dependencias del microfrontend
cd ../mf-colorpicker
npm install
```

## 💻 Uso

### Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo, necesitas levantar ambos servidores:

#### Terminal 1 - Microfrontend ColorPicker
```bash
cd mf-colorpicker
npm start
```
El microfrontend estará disponible en: `http://localhost:3001`

#### Terminal 2 - Host Application
```bash
cd host
npm start
```
La aplicación principal estará disponible en: `http://localhost:3000`

### Build de Producción

#### Construir ambos proyectos
```bash
# Build del microfrontend
cd mf-colorpicker
npm run build

# Build del host
cd ../host
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/` de cada proyecto.

### Servir en Producción

```bash
# Servir el microfrontend
cd mf-colorpicker
npm run build:start

# Servir el host (en otra terminal)
cd host
npm run build:start
```

## 📁 Estructura del Proyecto

```
microfrontend-colors/
├── host/                           # Aplicación Host
│   ├── dist/                       # Build de producción
│   ├── src/
│   │   ├── App.jsx                 # Componente principal
│   │   ├── index.html              # Template HTML
│   │   └── index.js                # Entry point
│   ├── .babelrc                    # Configuración de Babel
│   ├── package.json
│   └── webpack.config.js           # Configuración de Webpack + Module Federation
│
├── mf-colorpicker/                 # Microfrontend ColorPicker
│   ├── dist/                       # Build de producción
│   ├── src/
│   │   ├── components/
│   │   │   └── ColorPicker.jsx     # Componente exportado
│   │   ├── App.jsx                 # App standalone del MF
│   │   ├── index.css               # Estilos
│   │   ├── index.html              # Template HTML
│   │   └── index.js                # Entry point
│   ├── .babelrc                    # Configuración de Babel
│   ├── package.json
│   └── webpack.config.js           # Configuración de Webpack + Module Federation
│
├── README.md                       # English version
└── README.es.md                    # Este archivo
```

## 🔗 Module Federation

### ¿Qué es Module Federation?

**Module Federation** es una característica de Webpack 5 que permite compartir código entre diferentes builds de Webpack en tiempo de ejecución. Esto permite crear arquitecturas de microfrontends verdaderamente independientes.

### Configuración del Host

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

### Configuración del Remote (MF-ColorPicker)

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

### Consumiendo el Microfrontend

```javascript
// host/src/App.jsx
import ColorPicker from "colorPicker/ColorPicker";

const App = () => (
  <div>
    <ColorPicker />
  </div>
);
```

## 📜 Scripts Disponibles

### Host & MF-ColorPicker (ambos proyectos)

| Script | Descripción |
|--------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run start:live` | Inicia el servidor con live reload y auto-open |
| `npm run build` | Construye para producción |
| `npm run build:dev` | Construye en modo desarrollo |
| `npm run build:start` | Construye y sirve con npx serve |

## 📖 Aprendizaje

Este proyecto es ideal para aprender:

### Conceptos de Microfrontends
- ✅ **Independencia**: Cada microfrontend puede desarrollarse, testearse y desplegarse independientemente
- ✅ **Shared Dependencies**: Compartir dependencias comunes (React, React-DOM) para evitar duplicados
- ✅ **Runtime Integration**: Los microfrontends se integran en tiempo de ejecución, no en tiempo de build
- ✅ **Team Scalability**: Diferentes equipos pueden trabajar en diferentes microfrontends

### Module Federation
- ✅ **Remotes**: Aplicaciones que exponen módulos
- ✅ **Hosts**: Aplicaciones que consumen módulos remotos
- ✅ **Bidirectional**: Un host puede ser remote y viceversa
- ✅ **Singleton Sharing**: Compartir una única instancia de React entre aplicaciones

### React 19
- ✅ **createRoot API**: Nueva API de renderizado
- ✅ **Automatic JSX Transform**: No es necesario importar React
- ✅ **Concurrent Features**: Preparado para características concurrentes

### Webpack 5
- ✅ **Module Federation Plugin**: Configuración y uso
- ✅ **Dev Server**: Configuración de HMR y proxy
- ✅ **Production Optimization**: Minificación y tree-shaking

## 🔒 Seguridad

Este proyecto mantiene **0 vulnerabilidades** de seguridad:

```bash
# Verificar vulnerabilidades
cd host && npm audit
cd mf-colorpicker && npm audit
```

Ambos proyectos están actualizados con las últimas versiones estables de todas las dependencias.

## 🤝 Contribuciones

Este es un proyecto educativo. Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas de Desarrollo

### Migraciones Importantes

- ✅ **React 18 → React 19**: Migración completa del API de renderizado
- ✅ **Babel 8**: Actualizado a babel-loader 9 y presets modernos
- ✅ **Webpack Dev Server 5**: Actualizado con nueva configuración

### Hot Module Replacement (HMR)

El proyecto está configurado con HMR para una experiencia de desarrollo fluida:
- Los cambios en los componentes se reflejan instantáneamente
- El estado de la aplicación se preserva entre cambios
- No es necesario refrescar el navegador manualmente

---

⭐️ Si este proyecto te ayudó a aprender sobre microfrontends, considera darle una estrella!

## 📚 Recursos Adicionales

- [Webpack Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [React 19 Documentation](https://react.dev/)
- [Microfrontends Pattern](https://martinfowler.com/articles/micro-frontends.html)
- [Webpack 5 Module Federation - YouTube](https://www.youtube.com/watch?v=3SD6iyG8Jnk)
