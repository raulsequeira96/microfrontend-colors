# 🎨 Micro Frontend - Colors App

Aplicación de micro frontends usando Module Federation de Webpack, con soporte para desarrollo local y despliegue a Netlify.

## 🏗️ Arquitectura

- **HOST** (Puerto 3000): Aplicación principal que consume el ColorPicker
  - URL Producción: https://host-mf-colors-app.netlify.app/
  - URL Desarrollo: http://localhost:3000

- **ColorPicker MF** (Puerto 3001): Microfrontend que expone el componente ColorPicker
  - URL Producción: https://colorpicker-mf-colors-app.netlify.app/
  - URL Desarrollo: http://localhost:3001

## 🚀 Inicio Rápido

### Desarrollo Local

#### Windows
```bash
.\dev.bat
```

#### macOS/Linux
```bash
chmod +x dev.sh
./dev.sh
```

Esto creará los archivos `.env.local` necesarios y iniciará ambas apps en paralelo.

**URLs de desarrollo:**
- HOST: http://localhost:3000
- ColorPicker: http://localhost:3001

### Instalación Manual

```bash
# Instalar dependencias en ambas carpetas
cd host && npm install
cd ../mf-colorpicker && npm install

# Terminal 1: Iniciar ColorPicker
cd mf-colorpicker
npm start

# Terminal 2: Iniciar HOST
cd host
npm start
```

## 🔧 Variables de Entorno

### HOST (host/.env.local)

```env
# DESARROLLO
NODE_ENV=development
COLORPICKER_URL=http://localhost:3001/remoteEntry.js

# PRODUCCIÓN (por defecto)
# NODE_ENV=production
# COLORPICKER_URL=https://colorpicker-mf-colors-app.netlify.app/remoteEntry.js
```

### ColorPicker (mf-colorpicker/.env.local)

```env
# DESARROLLO
NODE_ENV=development
PORT=3001

# PRODUCCIÓN
# NODE_ENV=production
```

> **Nota:** Los archivos `.env.local` están en `.gitignore` para no compartir configuraciones locales.

## 📦 Scripts de Build

### HOST
```bash
npm run build          # Build producción
npm run build:dev      # Build desarrollo
npm run build:start    # Servir build en puerto 3000
npm start             # Dev server con HMR
npm start:live        # Dev server con auto-open
npm start:prod        # Dev server en modo producción
```

### ColorPicker
```bash
npm run build          # Build producción
npm run build:dev      # Build desarrollo
npm run build:start    # Servir build en puerto 3001
npm start             # Dev server con HMR
npm start:live        # Dev server con auto-open
npm start:prod        # Dev server en modo producción
```

## 🌐 Despliegue a Netlify

### Requisitos
- Dos repositorios en GitHub (o dos carpetas en el mismo repo)
- Cuenta en Netlify

### Pasos para Despliegue

#### 1. Crear sitios en Netlify

**Para HOST:**
```
Nombre del sitio: host-mf-colors-app
Repositorio: tu-repo (rama main)
Base directory: host
Build command: npm install && npm run build
Publish directory: dist
```

**Para ColorPicker:**
```
Nombre del sitio: colorpicker-mf-colors-app
Repositorio: tu-repo (rama main)
Base directory: mf-colorpicker
Build command: npm install && npm run build
Publish directory: dist
```

#### 2. Configurar Variables de Entorno en Netlify

**HOST:**
- NODE_ENV: `production`
- NODE_VERSION: `18`

**ColorPicker:**
- NODE_ENV: `production`
- NODE_VERSION: `18`

#### 3. Despliegue

El despliegue se activa automáticamente con cada `push` a `main`.

## 🔐 Configuración CORS

Los archivos `netlify.toml` de cada app incluyen:

- ✅ CORS completamente abierto (`Access-Control-Allow-Origin: *`)
- ✅ Todos los métodos HTTP permitidos
- ✅ Todos los headers permitidos
- ✅ Soporte para SPA (redirección a index.html)
- ✅ Cache inteligente para assets

**No hay restricciones CORS ni problemas de cross-origin** - perfectamente configurado para producción.

## 📋 URLs de Producción

### HOST App
```
https://host-mf-colors-app.netlify.app/
```

### ColorPicker MF
```
https://colorpicker-mf-colors-app.netlify.app/
```

### Remote Entry (Module Federation)
```
https://colorpicker-mf-colors-app.netlify.app/remoteEntry.js
```

## 🛠️ Troubleshooting

### Error: "mf_colorpicker is not available"
- Verifica que ColorPicker esté corriendo en puerto 3001
- Comprueba la URL en `process.env.COLORPICKER_URL`
- Revisa la consola del navegador para ver URLs de carga

### Error: CORS
- Todos los CORS están abiertos, verifica que no haya plugins/extensiones de navegador bloqueando
- En Netlify, los headers se aplican automáticamente desde `netlify.toml`

### Module Federation no carga
- Asegúrate de que ambas apps usan la misma versión de React (package.json)
- Verifica el archivo `remoteEntry.js` existe en el build

## 📚 Estructura de Carpetas

```
microfrontend-colors/
├── host/
│   ├── src/
│   ├── webpack.config.js
│   ├── package.json
│   ├── netlify.toml
│   └── .env.example
├── mf-colorpicker/
│   ├── src/
│   ├── webpack.config.js
│   ├── package.json
│   ├── netlify.toml
│   └── .env.example
├── dev.bat          # Script para Windows
└── dev.sh           # Script para Linux/macOS
```

## 🎓 Recursos

- [Module Federation Docs](https://webpack.js.org/concepts/module-federation/)
- [Netlify Docs](https://docs.netlify.com/)
- [React 19 Docs](https://react.dev/)

## 📝 Notas

- La app **NO maneja datos sensibles**, por lo que CORS está completamente abierto
- En desarrollo, usa `localhost` con puertos específicos
- En producción, usa Netlify con dominios personalizados
- Ambas apps comparten la misma versión de React para evitar problemas de contexto
