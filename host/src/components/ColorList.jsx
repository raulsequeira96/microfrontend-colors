import { useState } from 'react';
import PropTypes from 'prop-types';
import { copyToClipboard } from '../utils/clipboard';

/**
 * Componente ColorList - Componente Host
 *
 * Muestra una lista de colores guardados con funcionalidad de copiar y eliminar.
 * Los colores se persisten vía localStorage a través del componente padre.
 *
 * Características:
 * - Mostrar muestras de color con valores HEX
 * - Copiar colores individuales al portapapeles
 * - Eliminar colores individuales
 * - Limpiar todos los colores de una vez
 * - Estado vacío cuando no hay colores guardados
 *
 * @component
 * @example
 * <ColorList
 *   colors={["#3498db", "#e74c3c"]}
 *   onDelete={(color) => handleDelete(color)}
 *   onClearAll={() => handleClearAll()}
 * />
 */
const ColorList = ({ colors, onDelete, onClearAll }) => {
  // Rastrea qué color fue copiado recientemente (para retroalimentación visual)
  const [copiedColor, setCopiedColor] = useState(null);

  /**
   * Manejar clic del botón copiar
   * Copia color al portapapeles y muestra retroalimentación visual
   */
  const handleCopy = async (color) => {
    const success = await copyToClipboard(color);

    if (success) {
      // Mostrar retroalimentación de éxito
      setCopiedColor(color);

      // Resetear retroalimentación después de 2 segundos
      setTimeout(() => {
        setCopiedColor(null);
      }, 2000);
    } else {
      // Mostrar error (podría mejorarse con notificación toast)
      alert('No se pudo copiar al portapapeles');
    }
  };

  /**
   * Manejar clic del botón eliminar con confirmación
   */
  const handleDelete = (color) => {
    // Opcional: Pedir confirmación
    if (window.confirm(`¿Eliminar el color ${color}?`)) {
      onDelete(color);
    }
  };

  /**
   * Manejar botón limpiar todo con confirmación
   */
  const handleClearAll = () => {
    if (colors.length === 0) return;

    if (window.confirm(`¿Eliminar todos los ${colors.length} colores guardados?`)) {
      onClearAll();
    }
  };

  // Estado vacío - mostrar cuando no hay colores guardados
  if (colors.length === 0) {
    return (
      <div className="color-list-container host-component">
        <h4 className="list-title">
          <span className="title-icon">📋</span>
          Lista de Colores
        </h4>

        <div className="empty-state">
          <div className="empty-icon">🎨</div>
          <p className="empty-message">
            Aún no hay colores guardados.
          </p>
          <p className="empty-hint">
            Selecciona un color y haz clic en
            <strong> "💾 Guardar Color"</strong> para agregarlo aquí.
          </p>
        </div>
      </div>
    );
  }

  // Renderizado principal - lista de colores
  return (
    <div className="color-list-container host-component">
      {/* Encabezado con título y botón limpiar */}
      <div className="list-header">
        <h4 className="list-title">
          <span className="title-icon">📋</span>
          Lista de Colores
          <span className="color-count">({colors.length})</span>
        </h4>

        <button
          type="button"
          onClick={handleClearAll}
          className="btn btn-sm btn-outline-danger clear-all-btn"
          aria-label="Eliminar todos los colores"
        >
          🗑️ Limpiar Todo
        </button>
      </div>

      {/* Lista de tarjetas de colores */}
      <div className="color-list">
        {colors.map((color) => (
          <div
            key={color}
            className="color-card fade-in"
          >
            {/* Muestra de color */}
            <div
              className="color-swatch"
              style={{ backgroundColor: color }}
              aria-label={`Muestra de color ${color}`}
              title={color}
            />

            {/* Información y acciones del color */}
            <div className="color-card-content">
              <div className="color-info">
                <span className="color-hex">{color}</span>
              </div>

              <div className="color-actions">
                {/* Botón copiar */}
                <button
                  type="button"
                  onClick={() => handleCopy(color)}
                  className={`btn btn-sm ${
                    copiedColor === color
                      ? 'btn-success'
                      : 'btn-outline-primary'
                  } copy-btn`}
                  aria-label={`Copiar ${color}`}
                  title="Copiar al portapapeles"
                >
                  {copiedColor === color ? '✓' : '📋'}
                </button>

                {/* Botón eliminar */}
                <button
                  type="button"
                  onClick={() => handleDelete(color)}
                  className="btn btn-sm btn-outline-danger delete-btn"
                  aria-label={`Eliminar ${color}`}
                  title="Eliminar color"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pista informativa en la parte inferior */}
      <div className="list-footer">
        <small className="text-muted">
          💡 Haz clic en 📋 para copiar un color
        </small>
      </div>
    </div>
  );
};

// PropTypes para verificación de tipos
ColorList.propTypes = {
  /**
   * Array de strings HEX de colores a mostrar
   */
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,

  /**
   * Callback cuando se elimina un color
   * Recibe el string HEX del color
   */
  onDelete: PropTypes.func.isRequired,

  /**
   * Callback cuando se hace clic en el botón limpiar todo
   */
  onClearAll: PropTypes.func.isRequired
};

export default ColorList;