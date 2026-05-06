/**
 * Configuración de Entornos - ColorPicker MF
 * 
 * PRODUCCIÓN (defecto): Usa URLs de Netlify
 * DESARROLLO: Usa localhost
 */

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

export const config = {
  isDevelopment,
  isProduction,
  environment: isDevelopment ? 'development' : 'production',
  port: process.env.PORT || (isDevelopment ? 3001 : 443),
};

console.log(`[ColorPicker Config] Ambiente: ${config.environment}`);

export default config;
