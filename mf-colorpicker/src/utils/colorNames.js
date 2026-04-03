/**
 * Utilidad de Nombres de Colores
 *
 * Proporciona funcionalidad para emparejar colores HEX con su color nombrado más cercano.
 * Usa distancia euclidiana en el espacio de color RGB para encontrar la coincidencia más cercana.
 */

import { hexToRgb } from './colorConverter';

/**
 * Base de datos de colores nombrados (Colores web-seguros y comunes)
 * Formato: { "NombreColor": "#HEX" }
 */
const NAMED_COLORS = {
  // Rojos
  "Indian Red": "#CD5C5C",
  "Light Coral": "#F08080",
  "Salmon": "#FA8072",
  "Dark Salmon": "#E9967A",
  "Light Salmon": "#FFA07A",
  "Crimson": "#DC143C",
  "Red": "#FF0000",
  "Fire Brick": "#B22222",
  "Dark Red": "#8B0000",

  // Rosados
  "Pink": "#FFC0CB",
  "Light Pink": "#FFB6C1",
  "Hot Pink": "#FF69B4",
  "Deep Pink": "#FF1493",
  "Medium Violet Red": "#C71585",
  "Pale Violet Red": "#DB7093",

  // Naranjas
  "Orange Red": "#FF4500",
  "Tomato": "#FF6347",
  "Orange": "#FFA500",
  "Dark Orange": "#FF8C00",
  "Coral": "#FF7F50",

  // Amarillos
  "Gold": "#FFD700",
  "Yellow": "#FFFF00",
  "Light Yellow": "#FFFFE0",
  "Lemon Chiffon": "#FFFACD",
  "Papaya Whip": "#FFEFD5",
  "Moccasin": "#FFE4B5",
  "Peach Puff": "#FFDAB9",
  "Pale Goldenrod": "#EEE8AA",
  "Khaki": "#F0E68C",
  "Dark Khaki": "#BDB76B",

  // Morados
  "Lavender": "#E6E6FA",
  "Thistle": "#D8BFD8",
  "Plum": "#DDA0DD",
  "Violet": "#EE82EE",
  "Orchid": "#DA70D6",
  "Fuchsia": "#FF00FF",
  "Magenta": "#FF00FF",
  "Medium Orchid": "#BA55D3",
  "Medium Purple": "#9370DB",
  "Rebecca Purple": "#663399",
  "Blue Violet": "#8A2BE2",
  "Dark Violet": "#9400D3",
  "Dark Orchid": "#9932CC",
  "Dark Magenta": "#8B008B",
  "Purple": "#800080",
  "Indigo": "#4B0082",
  "Slate Blue": "#6A5ACD",
  "Dark Slate Blue": "#483D8B",

  // Verdes
  "Green Yellow": "#ADFF2F",
  "Chartreuse": "#7FFF00",
  "Lawn Green": "#7CFC00",
  "Lime": "#00FF00",
  "Lime Green": "#32CD32",
  "Pale Green": "#98FB98",
  "Light Green": "#90EE90",
  "Medium Spring Green": "#00FA9A",
  "Spring Green": "#00FF7F",
  "Medium Sea Green": "#3CB371",
  "Sea Green": "#2E8B57",
  "Forest Green": "#228B22",
  "Green": "#008000",
  "Dark Green": "#006400",
  "Yellow Green": "#9ACD32",
  "Olive Drab": "#6B8E23",
  "Olive": "#808000",
  "Dark Olive Green": "#556B2F",
  "Medium Aquamarine": "#66CDAA",
  "Dark Sea Green": "#8FBC8F",

  // Cianes
  "Light Cyan": "#E0FFFF",
  "Cyan": "#00FFFF",
  "Aqua": "#00FFFF",
  "Aquamarine": "#7FFFD4",
  "Medium Turquoise": "#48D1CC",
  "Turquoise": "#40E0D0",
  "Dark Turquoise": "#00CED1",
  "Cadet Blue": "#5F9EA0",
  "Steel Blue": "#4682B4",
  "Light Steel Blue": "#B0C4DE",
  "Powder Blue": "#B0E0E6",
  "Light Blue": "#ADD8E6",
  "Sky Blue": "#87CEEB",
  "Light Sky Blue": "#87CEFA",
  "Deep Sky Blue": "#00BFFF",
  "Dodger Blue": "#1E90FF",
  "Cornflower Blue": "#6495ED",
  "Royal Blue": "#4169E1",
  "Blue": "#0000FF",
  "Medium Blue": "#0000CD",
  "Dark Blue": "#00008B",
  "Navy": "#000080",
  "Midnight Blue": "#191970",

  // Marrones
  "Cornsilk": "#FFF8DC",
  "Blanched Almond": "#FFEBCD",
  "Bisque": "#FFE4C4",
  "Navajo White": "#FFDEAD",
  "Wheat": "#F5DEB3",
  "Burly Wood": "#DEB887",
  "Tan": "#D2B48C",
  "Rosy Brown": "#BC8F8F",
  "Sandy Brown": "#F4A460",
  "Goldenrod": "#DAA520",
  "Dark Goldenrod": "#B8860B",
  "Peru": "#CD853F",
  "Chocolate": "#D2691E",
  "Saddle Brown": "#8B4513",
  "Sienna": "#A0522D",
  "Brown": "#A52A2A",
  "Maroon": "#800000",

  // Blancos
  "White": "#FFFFFF",
  "Snow": "#FFFAFA",
  "Honey Dew": "#F0FFF0",
  "Mint Cream": "#F5FFFA",
  "Azure": "#F0FFFF",
  "Alice Blue": "#F0F8FF",
  "Ghost White": "#F8F8FF",
  "White Smoke": "#F5F5F5",
  "Seashell": "#FFF5EE",
  "Beige": "#F5F5DC",
  "Old Lace": "#FDF5E6",
  "Floral White": "#FFFAF0",
  "Ivory": "#FFFFF0",
  "Antique White": "#FAEBD7",
  "Linen": "#FAF0E6",
  "Lavender Blush": "#FFF0F5",
  "Misty Rose": "#FFE4E1",

  // Grises
  "Gainsboro": "#DCDCDC",
  "Light Gray": "#D3D3D3",
  "Silver": "#C0C0C0",
  "Dark Gray": "#A9A9A9",
  "Gray": "#808080",
  "Dim Gray": "#696969",
  "Light Slate Gray": "#778899",
  "Slate Gray": "#708090",
  "Dark Slate Gray": "#2F4F4F",
  "Black": "#000000"
};

/**
 * Calcular distancia euclidiana entre dos colores en espacio RGB
 * Mientras menor sea la distancia, más similares son los colores
 *
 * @param {string} hex1 - Primer color en formato HEX
 * @param {string} hex2 - Segundo color en formato HEX
 * @returns {number} Valor de distancia (0 = idéntico, mayor = más diferente)
 */
const colorDistance = (hex1, hex2) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return Infinity;

  // Calcular distancia usando fórmula de distancia euclidiana 3D
  // √[(r2-r1)² + (g2-g1)² + (b2-b1)²]
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
};

/**
 * Encontrar el color nombrado más cercano al color HEX dado
 * Usa algoritmo de distancia euclidiana para encontrar la mejor coincidencia
 *
 * @param {string} hex - Color en formato HEX (ej., "#3498db")
 * @returns {string} Nombre del color más cercano
 *
 * @example
 * getColorName("#1E90FF") // Retorna: "Dodger Blue"
 * getColorName("#FF0000") // Retorna: "Red"
 */
export const getColorName = (hex) => {
  let minDistance = Infinity;
  let closestName = 'Color Personalizado';

  // Encontrar el color nombrado con distancia mínima
  for (const [name, namedHex] of Object.entries(NAMED_COLORS)) {
    const distance = colorDistance(hex, namedHex);

    if (distance < minDistance) {
      minDistance = distance;
      closestName = name;
    }
  }

  return closestName;
};

/**
 * Obtener todos los nombres de colores disponibles
 * @returns {Array<string>} Array de todos los nombres de colores en la base de datos
 */
export const getAllColorNames = () => {
  return Object.keys(NAMED_COLORS);
};

/**
 * Obtener valor HEX para un color nombrado
 * @param {string} name - Nombre del color
 * @returns {string|null} Valor HEX o null si no se encuentra
 */
export const getHexByName = (name) => {
  return NAMED_COLORS[name] || null;
};