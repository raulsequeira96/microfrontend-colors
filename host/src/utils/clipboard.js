/**
 * Utilidades de Portapapeles
 *
 * Proporciona funcionalidad de portapapeles multiplataforma con fallbacks.
 * Maneja tanto la API moderna de Clipboard como el método legacy execCommand.
 */

/**
 * Copiar texto al portapapeles
 * Usa la API moderna de Clipboard cuando esté disponible, usa execCommand como fallback para navegadores antiguos
 *
 * @param {string} text - Texto a copiar al portapapeles
 * @returns {Promise<boolean>} Verdadero si es exitoso, falso de lo contrario
 *
 * @example
 * const success = await copyToClipboard("#3498db");
 * if (success) {
 *   console.log("¡Color copiado!");
 * } else {
 *   console.log("La copia falló");
 * }
 */
export const copyToClipboard = async (text) => {
  // Método 1: API moderna de Clipboard
  // Requiere HTTPS o localhost, y permiso del usuario
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('API de Clipboard falló, intentando fallback:', err);
      // Continuar al método fallback
    }
  }

  // Método 2: Fallback legacy de execCommand
  // Funciona en más navegadores pero está deprecado
  try {
    // Crear elemento textarea temporal
    const textArea = document.createElement('textarea');

    // Establecer valor y estilos
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');

    // Agregar al DOM
    document.body.appendChild(textArea);

    // Seleccionar texto
    textArea.select();
    textArea.setSelectionRange(0, text.length);

    // Intentar copiar
    const successful = document.execCommand('copy');

    // Limpiar
    document.body.removeChild(textArea);

    return successful;
  } catch (err) {
    console.error('La copia fallback falló:', err);
    return false;
  }
};

/**
 * Verificar si la escritura al portapapeles es soportada
 *
 * @returns {boolean} Verdadero si la escritura al portapapeles es soportada
 */
export const isClipboardSupported = () => {
  return !!(
    (navigator.clipboard && window.isSecureContext) ||
    document.queryCommandSupported('copy')
  );
};

/**
 * Solicitar permisos de portapapeles (solo necesario para la API de Clipboard)
 * Nota: La mayoría de navegadores no requieren permiso explícito para escritura
 *
 * @returns {Promise<boolean>} Verdadero si el permiso es concedido o no es requerido
 */
export const requestClipboardPermission = async () => {
  // El permiso de la API de Clipboard es usualmente implícito en la interacción del usuario
  // Esta función es principalmente para prueba de futuro

  if (!navigator.permissions) {
    // API de Permissions no soportada, asumir permitido
    return true;
  }

  try {
    const result = await navigator.permissions.query({
      name: 'clipboard-write'
    });
    return result.state === 'granted' || result.state === 'prompt';
  } catch (err) {
    // Query de permiso no soportado para clipboard-write
    // Esto es normal en muchos navegadores
    return true;
  }
};