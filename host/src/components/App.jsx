import { useState, useEffect } from 'react';
import ColorPicker from 'colorPicker/ColorPicker';
import ColorList from './ColorList';
import ArchitecturePanel from './ArchitecturePanel';
import { saveColor, loadColors, deleteColor, clearColors } from '../utils/colorStorage';

/**
 * Componente Principal de la App - Aplicación Host
 *
 * Orquesta toda la aplicación mediante:
 * - Manejo del estado de colores guardados
 * - Carga/guardado en localStorage
 * - Conectar ColorPicker (remoto) con ColorList (host)
 * - Mostrar el ArchitecturePanel educativo
 *
 * Este componente demuestra cómo una aplicación host consume
 * y coordina con microfrontends remotos.
 *
 * @component
 */
const App = () => {
  // Estado para el array de colores guardados
  const [savedColors, setSavedColors] = useState([]);

  /**
   * Cargar colores guardados desde localStorage al montar el componente
   */
  useEffect(() => {
    const colors = loadColors();
    setSavedColors(colors);
  }, []);

  /**
   * Manejar guardado de color desde ColorPicker
   * Llamado cuando el usuario hace clic en "Guardar Color" en el componente ColorPicker
   *
   * @param {string} color - Color en formato HEX desde ColorPicker
   */
  const handleColorSave = (color) => {
    // Guardar en localStorage y obtener array actualizado
    const updatedColors = saveColor(color);

    // Actualizar estado para activar re-renderizado
    setSavedColors(updatedColors);
  };

  /**
   * Manejar eliminación de color desde ColorList
   * Llamado cuando el usuario hace clic en el botón eliminar de una tarjeta de color
   *
   * @param {string} color - Color a eliminar en formato HEX
   */
  const handleColorDelete = (color) => {
    // Eliminar de localStorage y obtener array actualizado
    const updatedColors = deleteColor(color);

    // Actualizar estado
    setSavedColors(updatedColors);
  };

  /**
   * Manejar limpiar todos los colores desde ColorList
   * Llamado cuando el usuario hace clic en el botón "Limpiar Todo"
   */
  const handleClearAll = () => {
    // Limpiar todos de localStorage
    const updatedColors = clearColors();

    // Actualizar estado
    setSavedColors(updatedColors);
  };

  return (
    <>
      {/* Panel Educativo - Explica la arquitectura de Module Federation */}
      <ArchitecturePanel />

      {/* Encabezado Principal de la Aplicación */}
      <div className="app-header">
        <h1 className="app-title">
          <span className="app-icon">🎨</span>
          Color Picker - Demo de Module Federation
        </h1>
        <p className="app-subtitle">
          Una aplicación educativa demostrando arquitectura de microfrontends
        </p>
      </div>

      <div className="container">
        <div className="origin-legend" role="status" aria-label="Leyenda de origen de componentes">
          <span className="origin-chip origin-chip-host">HOST APP (PUERTO 3000)</span>
          <span className="origin-chip origin-chip-remote">MICROFRONTEND REMOTO (PUERTO 3001)</span>
        </div>
      </div>

      {/* Contenido Principal - Layout de Dos Columnas */}
      <div className="container main-container mt-4">
        <div className="row g-4">
          {/* Columna Izquierda: Lista de Colores Guardados (Componente Host) */}
          <div className="col-12 col-lg-4">
            <section className="component-zone host-zone" aria-label="Zona de componentes del host">
              <div className="zone-header">
                <span className="zone-header-dot" />
                Componente local del host
              </div>
              <ColorList
                colors={savedColors}
                onDelete={handleColorDelete}
                onClearAll={handleClearAll}
              />
            </section>
          </div>

          {/* Columna Derecha: ColorPicker (Componente Remoto del Microfrontend) */}
          <div className="col-12 col-lg-8">
            <section className="component-zone remote-zone" aria-label="Zona de componentes del microfrontend remoto">
              <div className="zone-header">
                <span className="zone-header-dot" />
                Componente cargado desde microfrontend remoto
              </div>
              <ColorPicker
                onColorSelect={handleColorSave}
                initialColor="#3498db"
                showSaveButton={true}
              />
            </section>
          </div>
        </div>
      </div>

      {/* Pie de página con información */}
      <footer className="app-footer">
        <p>
          💡 <strong>Tip:</strong> Esta aplicación usa <strong>Webpack Module Federation</strong> para
          cargar el ColorPicker de forma dinámica desde otro servidor (puerto 3001).
        </p>
        <p>
          <small>
            Construido con React 19 + Webpack 5 Module Federation
          </small>
        </p>
      </footer>
    </>
  );
};

export default App;