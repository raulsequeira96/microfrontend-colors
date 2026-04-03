/**
 * Utilidades de Conversión de Colores
 *
 * Proporciona funciones para convertir entre diferentes formatos de color:
 * - HEX (Hexadecimal) - ej., #3498db
 * - RGB (Rojo, Verde, Azul) - ej., rgb(52, 152, 219)
 * - HSL (Matiz, Saturación, Luminosidad) - ej., hsl(204, 70%, 53%)
 */

/**
 * Convertir color HEX a valores RGB
 * @param {string} hex - Código de color hexadecimal (ej., "#3498db" o "3498db")
 * @returns {object|null} Objeto con propiedades r, g, b (0-255) o null si es inválido
 *
 * @example
 * hexToRgb("#3498db") // Retorna: { r: 52, g: 152, b: 219 }
 */
export const hexToRgb = (hex) => {
  // Remover # si está presente y validar formato
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Convertir valores RGB a HSL
 * Usa la fórmula estándar de conversión RGB a HSL del W3C
 *
 * @param {number} r - Valor rojo (0-255)
 * @param {number} g - Valor verde (0-255)
 * @param {number} b - Valor azul (0-255)
 * @returns {object} Objeto con propiedades h (0-360), s (0-100), l (0-100)
 *
 * @example
 * rgbToHsl(52, 152, 219) // Retorna: { h: 204, s: 70, l: 53 }
 */
export const rgbToHsl = (r, g, b) => {
  // Normalizar valores RGB al rango 0-1
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    // Acromático (gris)
    h = s = 0;
  } else {
    const d = max - min;

    // Calcular saturación
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    // Calcular matiz
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
      default:
        h = 0;
    }
  }

  // Convertir a rangos estándar y redondear
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

/**
 * Formatear objeto RGB como string CSS rgb()
 * @param {object} rgb - Objeto con propiedades r, g, b
 * @returns {string} String CSS rgb()
 */
const formatRgb = (rgb) => {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};

/**
 * Formatear objeto HSL como string CSS hsl()
 * @param {object} hsl - Objeto con propiedades h, s, l
 * @returns {string} String CSS hsl()
 */
const formatHsl = (hsl) => {
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
};

/**
 * Obtener todos los formatos de color desde un color HEX
 * Función utilitaria principal que convierte un color HEX a todos los formatos soportados
 *
 * @param {string} hex - Código de color hexadecimal
 * @returns {object} Objeto con propiedades hex, rgb, hsl como strings formateados
 *
 * @example
 * getAllFormats("#3498db")
 * // Retorna:
 * // {
 * //   hex: "#3498db",
 * //   rgb: "rgb(52, 152, 219)",
 * //   hsl: "hsl(204, 70%, 53%)"
 * // }
 */
export const getAllFormats = (hex) => {
  // Asegurar que el hex tenga prefijo #
  const normalizedHex = hex.startsWith('#') ? hex : `#${hex}`;

  // Convertir a RGB
  const rgb = hexToRgb(normalizedHex);

  if (!rgb) {
    // Retornar default si hex inválido
    return {
      hex: normalizedHex,
      rgb: 'Color inválido',
      hsl: 'Color inválido'
    };
  }

  // Convertir RGB a HSL
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // Retornar todos los formatos como strings formateados
  return {
    hex: normalizedHex.toUpperCase(),
    rgb: formatRgb(rgb),
    hsl: formatHsl(hsl)
  };
};