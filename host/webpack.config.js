/**
 * Configuración de Webpack - Aplicación HOST
 *
 * Esta configuración establece la aplicación HOST que CONSUME
 * el microfrontend ColorPicker vía Module Federation.
 *
 * Conceptos Clave:
 * - Esta app actúa como "consumidor" o "host"
 * - Importa componentes remotos en tiempo de ejecución
 * - Comparte React con el remoto para evitar carga duplicada
 */

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// Cargar dependencias desde package.json para manejo de versiones
const deps = require("./package.json").dependencies;

module.exports = {
  // Configuración de salida
  output: {
    // publicPath es CRÍTICO para Module Federation
    // Le dice a webpack dónde está hospedada esta app
    // Debe coincidir con la URL real donde corre la app
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
    port: 3000, // El host corre en puerto 3000
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
          "css-loader",    // Interpreta @import y url() como import/require()
          "postcss-loader" // Procesa CSS con PostCSS (autoprefixer, etc.)
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
     * ¡Aquí es donde ocurre la magia! Este plugin habilita:
     * 1. Consumir componentes remotos de otras apps
     * 2. Compartir dependencias entre apps
     * 3. Federación en tiempo de ejecución (cargar código dinámicamente)
     */
    new ModuleFederationPlugin({
      /**
       * NOMBRE: Identificador de la aplicación
       * Usado internamente por Module Federation para identificar este contenedor
       */
      name: "host",

      /**
       * FILENAME: Archivo de punto de entrada para Module Federation
       * Este archivo es generado por webpack y contiene la lógica de federación
       * No es usado por consumidores del host, pero es requerido en la config
       */
      filename: "remoteEntry.js",

      /**
       * REMOTES: Apps/módulos que este host va a consumir
       *
       * Formato: "nombreLocal": "nombreRemoto@URLRemota"
       * - nombreLocal: Cómo lo importarás en código (ej. "import X from 'colorPicker/Component'")
       * - nombreRemoto: El "name" definido en el webpack config remoto ("mf_colorpicker")
       * - URLRemota: Dónde está hospedado el remoto (http://localhost:3001/remoteEntry.js)
       *
       * Ejemplo de uso en código:
       *   import ColorPicker from "colorPicker/ColorPicker";
       */
      remotes: {
        colorPicker: `promise new Promise((resolve, reject) => {
          const remoteHost = window.location.hostname || "localhost";
          const remoteUrl = "http://" + remoteHost + ":3001/remoteEntry.js";
          const script = document.createElement("script");
          script.src = remoteUrl;
          script.onload = () => {
            if (!window.mf_colorpicker) {
              reject(new Error("Remote mf_colorpicker no disponible en " + remoteUrl));
              return;
            }

            const proxy = {
              get: (request) => window.mf_colorpicker.get(request),
              init: (arg) => {
                try {
                  return window.mf_colorpicker.init(arg);
                } catch (e) {
                  return undefined;
                }
              },
            };
            resolve(proxy);
          };
          script.onerror = () => reject(new Error("Error cargando remoteEntry: " + remoteUrl));
          document.head.appendChild(script);
        })`
      },

      /**
       * EXPOSES: Módulos que esta app expone (si los hay)
       * El host no expone nada en este caso, solo consume
       * Pero la config es requerida, así que la dejamos como objeto vacío
       */
      exposes: {},

      /**
       * SHARED: Dependencias compartidas entre host y remotos
       *
       * ¡Esto es CRÍTICO para evitar dependencias duplicadas!
       *
       * ¿Por qué compartir React?
       * - React usa estado interno y contexto
       * - Si host y remoto cargan copias separadas de React, el contexto se rompe
       * - Compartir asegura que solo UNA instancia de React exista
       *
       * singleton: true
       * - Fuerza una sola instancia a través de todos los módulos federados
       * - Si las versiones no coinciden, webpack advertirá pero usará una versión
       *
       * requiredVersion: deps.react
       * - Especifica qué versión espera esta app
       * - Ayuda a webpack a detectar desajustes de versión
       */
      shared: {
        // Compartir todas las dependencias de package.json
        ...deps,

        // React DEBE ser singleton para funcionar correctamente
        react: {
          singleton: true,           // Solo una instancia permitida
          requiredVersion: deps.react, // Versión desde package.json
        },

        // React-DOM también debe ser singleton
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),

    /**
     * Plugin HTML de Webpack
     * Genera un archivo HTML que incluye los bundles de webpack
     * Usa src/index.html como plantilla
     */
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};