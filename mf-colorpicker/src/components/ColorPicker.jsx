import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllFormats } from '../utils/colorConverter';
import { getColorName } from '../utils/colorNames';

/**
 * Componente ColorPicker - Microfrontend Remoto
 *
 * Un selector de color completamente funcional expuesto vía Webpack Module Federation.
 * Este componente puede ser:
 * 1. Importado por la aplicación host (localhost:3000)
 * 2. Ejecutado standalone (localhost:3001)
 *
 * Características:
 * - Selección de color en tiempo real con actualizaciones en vivo
 * - Visualización de múltiples formatos (HEX, RGB, HSL)
 * - Funcionalidad de clic-para-copiar para cada formato
 * - Aproximación de nombre del color
 * - Funcionalidad opcional de guardado vía callback
 *
 * @component
 * @example
 * <ColorPicker
 *   onColorSelect={(color) => console.log('Seleccionado:', color)}
 *   initialColor="#3498db"
 *   showSaveButton={true}
 * />
 */
const ColorPicker = ({
  onColorSelect,
  initialColor = '#3498db',
  showSaveButton = true
}) => {
  // Color seleccionado actual en formato HEX
  const [currentColor, setCurrentColor] = useState(initialColor);

  // Todos los formatos de color (HEX, RGB, HSL) como strings formateados
  const [colorFormats, setColorFormats] = useState(null);

  // Nombre aproximado del color (color nombrado más cercano)
  const [colorName, setColorName] = useState('');

  // Rastrea qué formato fue copiado recientemente (para retroalimentación visual)
  const [copiedFormat, setCopiedFormat] = useState(null);

  /**
   * Actualizar todos los formatos de color y nombre cuando cambia el color
   * Este efecto se ejecuta cada vez que cambia currentColor
   */
  useEffect(() => {
    // Obtener todos los formatos (HEX, RGB, HSL)
    const formats = getAllFormats(currentColor);

    // Obtener el color nombrado más cercano
    const name = getColorName(currentColor);

    setColorFormats(formats);
    setColorName(name);
  }, [currentColor]);

  /**
   * Manejar cambio del input de color desde el selector HTML5 nativo
   * Llamado cada vez que el usuario selecciona un nuevo color
   */
  const handleColorChange = (e) => {
    setCurrentColor(e.target.value);
  };

  /**
   * Copiar formato específico de color al portapapeles
   * Soporta tanto la API moderna de Clipboard como fallback para navegadores antiguos
   *
   * @param {string} format - Clave de formato ('hex', 'rgb', o 'hsl')
   * @param {string} value - El valor de color a copiar
   */
  const handleCopy = async (format, value) => {
    try {
      // Intentar primero con la API moderna de Clipboard (requiere HTTPS o localhost)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      // Mostrar retroalimentación visual
      setCopiedFormat(format);

      // Resetear retroalimentación después de 2 segundos
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error('Falló al copiar:', err);
    }
  };

  /**
   * Manejar clic del botón guardar
   * Llama al callback onColorSelect pasado desde el padre (host)
   */
  const handleSave = () => {
    if (onColorSelect) {
      onColorSelect(currentColor);
    }
  };

  return (
    <div className="color-picker-container remote-component">
      {/* Input principal de color - selector de color HTML5 nativo */}
      <input
        type="color"
        className="color-picker-input"
        value={currentColor}
        onChange={handleColorChange}
        aria-label="Seleccione un color"
        title="Seleccione un color..."
      />

      {/* Círculo de vista previa del color y nombre */}
      <div className="color-name-display text-center mt-3">
        <div
          className="color-preview-circle"
          style={{ backgroundColor: currentColor }}
          aria-label={`Vista previa del color: ${colorName}`}
        />
        <h4 className="mt-2 mb-0">{colorName}</h4>
      </div>

      {/* Visualización de formatos de color con botones de copiar */}
      {colorFormats && (
        <div className="color-formats mt-3">
          {Object.entries(colorFormats).map(([format, value]) => (
            <div key={format} className="color-format-row">
              <div className="format-info">
                <span className="format-label">{format.toUpperCase()}</span>
                <span className="color-value">{value}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(format, value)}
                className={`btn btn-sm ${copiedFormat === format ? 'btn-success' : 'btn-outline-primary'}`}
                aria-label={`Copiar valor ${format.toUpperCase()}`}
              >
                {copiedFormat === format ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Botón guardar (opcional, controlado por prop) */}
      {showSaveButton && (
        <button
          type="button"
          onClick={handleSave}
          className="btn btn-primary w-100 mt-3 save-color-btn"
          aria-label="Guardar color en la lista"
        >
          💾 Guardar Color
        </button>
      )}
    </div>
  );
};

// PropTypes para verificación de tipos y documentación
ColorPicker.propTypes = {
  /**
   * Función callback llamada cuando el usuario hace clic en "Guardar Color"
   * Recibe el color actual en formato HEX
   */
  onColorSelect: PropTypes.func,

  /**
   * Color inicial a mostrar cuando se monta el componente
   * Debe estar en formato HEX (ej., "#3498db")
   */
  initialColor: PropTypes.string,

  /**
   * Si mostrar el botón "Guardar Color"
   * Establecer en false para modo standalone o visualización de solo lectura
   */
  showSaveButton: PropTypes.bool
};

export default ColorPicker;