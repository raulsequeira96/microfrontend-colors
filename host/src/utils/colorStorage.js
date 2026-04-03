/**
 * Utilidades de Almacenamiento de Colores
 *
 * Proporciona funciones wrapper de localStorage para manejar colores guardados.
 * Maneja todas las operaciones de localStorage con manejo de errores apropiado.
 */

// Clave de localStorage para almacenar colores
const STORAGE_KEY = 'microfrontend_colorpicker_saved_colors';

// Número máximo de colores a almacenar (prevenir uso excesivo de almacenamiento)
const MAX_COLORS = 50;

/**
 * Guardar un color en localStorage
 * Previene duplicados y mantiene límite máximo
 *
 * @param {string} hex - Color en formato HEX (ej., "#3498db")
 * @returns {Array<string>} Array actualizado de todos los colores guardados
 *
 * @example
 * const colors = saveColor("#3498db");
 * console.log(colors); // ["#3498db", "#e74c3c", ...]
 */
export const saveColor = (hex) => {
  try {
    // Cargar colores existentes
    let colors = loadColors();

    // Convertir a mayúsculas para consistencia
    const normalizedHex = hex.toUpperCase();

    // Verificar si el color ya existe
    if (colors.includes(normalizedHex)) {
      // Mover al frente si ya existe
      colors = colors.filter(c => c !== normalizedHex);
      colors.unshift(normalizedHex);
    } else {
      // Agregar nuevo color al principio
      colors.unshift(normalizedHex);

      // Recortar al límite máximo
      if (colors.length > MAX_COLORS) {
        colors = colors.slice(0, MAX_COLORS);
      }
    }

    // Guardar en localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));

    return colors;
  } catch (error) {
    console.error('Error guardando color en localStorage:', error);
    // Retornar colores actuales incluso si el guardado falló
    return loadColors();
  }
};

/**
 * Cargar todos los colores guardados desde localStorage
 *
 * @returns {Array<string>} Array de strings de colores HEX
 *
 * @example
 * const colors = loadColors();
 * console.log(colors); // ["#3498db", "#e74c3c", "#2ecc71"]
 */
export const loadColors = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const colors = JSON.parse(stored);

    // Validar que es un array
    if (!Array.isArray(colors)) {
      console.warn('Formato de colores inválido en localStorage');
      return [];
    }

    return colors;
  } catch (error) {
    console.error('Error cargando colores desde localStorage:', error);
    return [];
  }
};

/**
 * Eliminar un color específico de localStorage
 *
 * @param {string} hex - Color a eliminar (formato HEX)
 * @returns {Array<string>} Array actualizado de colores restantes
 *
 * @example
 * const remaining = deleteColor("#3498db");
 * console.log(remaining); // ["#e74c3c", "#2ecc71"]
 */
export const deleteColor = (hex) => {
  try {
    let colors = loadColors();

    // Normalizar para comparación
    const normalizedHex = hex.toUpperCase();

    // Filtrar el color
    colors = colors.filter(color => color !== normalizedHex);

    // Guardar lista actualizada
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));

    return colors;
  } catch (error) {
    console.error('Error eliminando color de localStorage:', error);
    return loadColors();
  }
};

/**
 * Limpiar todos los colores guardados de localStorage
 *
 * @returns {Array<string>} Array vacío
 *
 * @example
 * const colors = clearColors();
 * console.log(colors); // []
 */
export const clearColors = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (error) {
    console.error('Error limpiando colores de localStorage:', error);
    return [];
  }
};

/**
 * Verificar si localStorage está disponible
 * Algunos navegadores bloquean localStorage en modo privado/incógnito
 *
 * @returns {boolean} Verdadero si localStorage está disponible
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Obtener número de colores guardados
 *
 * @returns {number} Conteo de colores guardados
 */
export const getColorCount = () => {
  return loadColors().length;
};