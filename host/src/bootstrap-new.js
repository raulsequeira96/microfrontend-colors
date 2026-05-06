// Actualizar el bootstrap.js para usar la utilidad de debug

import { setupFederationErrorHandler } from "./utils/federationDebug";

// Configurar manejo de errores de federación
setupFederationErrorHandler();

// Log de configuración
console.log("[Bootstrap] Inicializando HOST...");
console.log(
  "[Bootstrap] ColorPicker URL:",
  process.env.COLORPICKER_URL || "https://colorpicker-mf-colors-app.netlify.app/remoteEntry.js"
);

import("./index");
