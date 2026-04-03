/**
 * Configuración de Webpack - Microfrontend COLORPICKER
 *
 * Esta configuración establece un microfrontend REMOTO que EXPONE
 * el componente ColorPicker para ser consumido por la aplicación host.
 *
 * Conceptos Clave:
 * - Esta app actúa como "remoto" o "proveedor"
 * - Expone componentes que otras apps pueden importar
 * - Comparte React con el host para evitar carga duplicada
 * - Puede ejecutarse tanto standalone como parte del host
 */

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// Cargar dependencias desde package.json para manejo de versiones
const deps = require("./package.json").dependencies;

module.exports = {
  // Configuración de salida
  output: {
    /**
     * publicPath es CRÍTICO para Module Federation
     * Le dice a webpack dónde está hospedado ESTE microfrontend
     * El host usará esta ruta para cargar los componentes remotos
     *
     * IMPORTANTE: Esta URL debe ser accesible desde la aplicación host
     */
    // auto evita hardcodear localhost y permite abrir por IP de red
    publicPath: "auto",
  },

  // Configuración de resolución de archivos
  resolve: {
    // Extensiones que webpack intentará cuando importe archivos
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  // Configuración del servidor de desarrollo
  devServer: {
    port: 3001, // El microfrontend corre en puerto 3001 (diferente del host)
    historyApiFallback: true, // Soporte para React Router (enrutado SPA)
    allowedHosts: "all", // Permite acceder vía localhost e IP de red
  },

  // Reglas de procesamiento de módulos
  module: {
    rules: [
      {
        // Manejar archivos .mjs (módulos JavaScript)
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        // Manejar archivos CSS/SCSS
        test: /\.(css|s[ac]ss)$/i,
        use: [
          "style-loader",  // Inyecta CSS en el DOM
          "css-loader",    // Interpreta @import and url()
          "postcss-loader" // Procesa CSS con PostCSS
        ],
      },
      {
        // Manejar archivos TypeScript y JavaScript
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Transpila JS/TS moderno a código compatible con navegadores
        },
      },
    ],
  },

  // Plugins de Webpack
  plugins: [
    /**
     * PLUGIN DE MODULE FEDERATION
     *
     * Este plugin habilita que este microfrontend:
     * 1. Exponga componentes para que otras apps los consuman
     * 2. Corra standalone (localhost:3001)
     * 3. Comparta dependencias con apps consumidoras
     */
    new ModuleFederationPlugin({
      /**
       * NOMBRE: Identificador del microfrontend
       *
       * Este nombre es usado por las apps consumidoras para referenciar este remoto
       * Formato en host: <nombre>@<url>/remoteEntry.js
       *
       * Ejemplo: "mf_colorpicker@http://localhost:3001/remoteEntry.js"
       */
      name: "mf_colorpicker",

      /**
       * FILENAME: Punto de entrada para Module Federation
       *
       * Este archivo es generado por webpack y contiene:
       * - Metadatos sobre módulos expuestos
       * - Código de tiempo de ejecución para cargar módulos
       * - Configuración de dependencias compartidas
       *
       * El host cargará este archivo primero, luego cargará los módulos expuestos
       */
      filename: "remoteEntry.js",

      /**
       * REMOTES: Otros microfrontends que esta app consume
       *
       * Objeto vacío porque este microfrontend no consume ningún otro remoto
       * (Es un nodo "hoja" en el grafo de federación)
       *
       * Si este microfrontend necesitara importar de otro remoto, lo agregaríamos aquí
       */
      remotes: {},

      /**
       * EXPOSES: Componentes expuestos a aplicaciones consumidoras
       *
       * Formato: "./nombreExpuesto": "./rutaAlArchivo"
       * - nombreExpuesto: Cómo las apps consumidoras lo importarán
       * - rutaAlArchivo: Ruta real del archivo dentro de este microfrontend
       *
       * Ejemplo:
       *   En esta config: "./ColorPicker": "./src/components/ColorPicker.jsx"
       *
       *   En código del host: import ColorPicker from "colorPicker/ColorPicker"
       *                       (colorPicker es el alias, ColorPicker es el nombre expuesto)
       *
       * Puedes exponer múltiples componentes:
       *   "./ColorPicker": "./src/components/ColorPicker.jsx",
       *   "./ColorConverter": "./src/utils/colorConverter.js",
       *   etc.
       */
      exposes: {
        "./ColorPicker" : "./src/components/ColorPicker.jsx"
      },

      /**
       * SHARED: Dependencias compartidas entre este remoto y el host
       *
       * Por qué compartir es importante:
       * 1. Reduce el tamaño del bundle (no React duplicado)
       * 2. Asegura que el contexto de React funcione (solo una instancia de React)
       * 3. Previene conflictos de versiones
       *
       * singleton: true
       * - Solo UNA instancia de esta dependencia a través de todas las apps
       * - Crítico para React por su estado interno y contexto
       * - Si host y remoto tienen diferentes versiones de React, webpack:
       *   a) Advertirá sobre desajuste de versión
       *   b) Usará la primera versión cargada
       *
       * requiredVersion: deps.react
       * - Declara qué versión espera este microfrontend
       * - Ayuda a webpack a detectar problemas potenciales de compatibilidad
       * - Actúa como documentación para otros desarrolladores
       */
      shared: {
        // Compartir todas las dependencias de package.json
        // Esto incluye React, React-DOM, y cualquier otra biblioteca común
        ...deps,

        // Configuración de React (con singleton)
        react: {
          singleton: true,           // Solo una instancia permitida
          requiredVersion: deps.react, // Versión desde package.json
        },

        // Configuración de React-DOM (también singleton)
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },

        /**
         * NOTA: prop-types se comparte automáticamente vía ...deps
         * Otras bibliotecas pueden configurarse individualmente si es necesario
         *
         * Ejemplo de config avanzada:
         * "lodash": {
         *   singleton: false,  // Múltiples versiones permitidas
         *   requiredVersion: "^4.17.0",
         *   eager: false,      // Cargar bajo demanda
         * }
         */
      },
    }),

    /**
     * Plugin HTML de Webpack
     *
     * Genera un archivo HTML para modo standalone
     * Cuando visites http://localhost:3001, verás este microfrontend
     * corriendo independientemente con su propio wrapper App.jsx
     */
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};