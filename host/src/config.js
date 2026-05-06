/**
 * Configuración de Entornos
 * 
 * PRODUCCIÓN (defecto): Usa URLs de Netlify
 * DESARROLLO: Usa localhost con puertos configurables vía variables de entorno
 */

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

// URLs del entorno
const COLORPICKER_URL = isDevelopment
  ? (process.env.COLORPICKER_URL || 'http://localhost:3001/remoteEntry.js')
  : (process.env.COLORPICKER_URL || 'https://colorpicker-mf-colors-app.netlify.app/remoteEntry.js');

export const config = {
  isDevelopment,
  isProduction,
  colorPickerUrl: COLORPICKER_URL,
  environment: isDevelopment ? 'development' : 'production',
};

console.log(`[Config] Ambiente: ${config.environment}`);
console.log(`[Config] ColorPicker URL: ${config.colorPickerUrl}`);

export default config;
