import { useState, useEffect } from 'react';

/**
 * Componente ArchitecturePanel - Componente Host
 *
 * Panel educativo que explica la arquitectura de Webpack Module Federation.
 * Proporciona características de aprendizaje interactivo para entender microfrontends.
 *
 * Características:
 * - Acordeón colapsable con explicaciones detalladas
 * - Diagrama visual de arquitectura
 * - Toggle para mostrar/ocultar límites de componentes
 * - Enlaces a documentación
 * - Elementos de aprendizaje interactivo
 *
 * @component
 * @example
 * <ArchitecturePanel />
 */
const ArchitecturePanel = () => {
  // Estado para colapso del acordeón
  const [isOpen, setIsOpen] = useState(false);

  // Estado para visibilidad de límites de componentes
  const [showBoundaries, setShowBoundaries] = useState(true);

  /**
   * Alternar clase del body para mostrar/ocultar límites de componentes
   * Esto afecta todos los elementos .remote-component y .host-component
   */
  useEffect(() => {
    if (showBoundaries) {
      document.body.classList.remove('hide-boundaries');
    } else {
      document.body.classList.add('hide-boundaries');
    }

    // Limpieza al desmontar
    return () => {
      document.body.classList.remove('hide-boundaries');
    };
  }, [showBoundaries]);

  return (
    <div className="architecture-panel">
      {/* Botón toggle para el panel principal */}
      <button
        type="button"
        className={`architecture-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Aprender sobre la arquitectura"
      >
        <span className="toggle-icon">{isOpen ? '▼' : '▶'}</span>
        <span className="toggle-text">
          📚 {isOpen ? 'Ocultar' : 'Aprender sobre'} Module Federation
        </span>
      </button>

      {/* Contenido del panel principal - mostrado cuando está abierto */}
      {isOpen && (
        <div className="architecture-content fade-in">
          {/* Introducción */}
          <section className="arch-section">
            <h3 className="arch-title">
              <span className="arch-icon">🏗️</span>
              ¿Qué es Module Federation?
            </h3>
            <p className="arch-text">
              <strong>Module Federation</strong> es una característica de Webpack 5 que permite
              compartir código entre diferentes builds de Webpack en <strong>tiempo de ejecución</strong>.
              Esto permite crear arquitecturas de <strong>microfrontends</strong> verdaderamente
              independientes.
            </p>
          </section>

          {/* Diagrama de Arquitectura */}
          <section className="arch-section">
            <h3 className="arch-title">
              <span className="arch-icon">📊</span>
              Arquitectura de Esta Aplicación
            </h3>

            <div className="architecture-diagram">
              <pre className="diagram-code">
{`┌─────────────────────────────────────────┐
│      HOST Application (Puerto 3000)     │
│  ┌──────────────────────────────────┐   │
│  │  🟢 ColorList                    │   │
│  │  🟢 ArchitecturePanel            │   │
│  └──────────────────────────────────┘   │
│             ↓ imports                   │
│  ┌──────────────────────────────────┐   │
│  │  🔵 ColorPicker (Puerto 3001)    │   │
│  │     Cargado en Tiempo de         │   │
│  │     Ejecución vía                │   │
│  │     Module Federation            │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘`}
              </pre>
            </div>

            <div className="legend">
              <div className="legend-item">
                <span className="legend-badge remote">🔵</span>
                <span>Componente Remoto (Microfrontend)</span>
              </div>
              <div className="legend-item">
                <span className="legend-badge host">🟢</span>
                <span>Componente del Host</span>
              </div>
            </div>
          </section>

          {/* Cómo Funciona */}
          <section className="arch-section">
            <h3 className="arch-title">
              <span className="arch-icon">⚙️</span>
              ¿Cómo Funciona?
            </h3>

            <div className="how-it-works">
              <div className="step-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <strong>Build Independiente</strong>
                  <p>Cada microfrontend se construye de forma independiente</p>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <strong>Exposición</strong>
                  <p>El microfrontend expone componentes vía <code>exposes</code></p>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <strong>Consumo</strong>
                  <p>El host los importa vía <code>remotes</code></p>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">4</div>
                <div className="step-content">
                  <strong>Carga en Runtime</strong>
                  <p>Los componentes se cargan durante la ejecución, no en build time</p>
                </div>
              </div>
            </div>
          </section>

          {/* Beneficios */}
          <section className="arch-section">
            <h3 className="arch-title">
              <span className="arch-icon">✨</span>
              Beneficios de Microfrontends
            </h3>

            <ul className="benefits-list">
              <li>
                <strong>Independencia:</strong> Cada microfrontend puede desarrollarse,
                testearse y desplegarse independientemente
              </li>
              <li>
                <strong>Escalabilidad de Equipos:</strong> Diferentes equipos pueden
                trabajar en diferentes microfrontends sin conflictos
              </li>
              <li>
                <strong>Dependencias Compartidas:</strong> React se comparte como
                singleton para evitar duplicados
              </li>
              <li>
                <strong>Actualizaciones Independientes:</strong> Puedes actualizar un
                microfrontend sin afectar los demás
              </li>
            </ul>
          </section>

          {/* Toggle Interactivo */}
          <section className="arch-section highlight-section">
            <h3 className="arch-title">
              <span className="arch-icon">🔍</span>
              Explorar los Componentes
            </h3>

            <p className="arch-text">
              Usa este botón para mostrar u ocultar los <strong>indicadores visuales</strong> que
              marcan qué componentes pertenecen a cada microfrontend:
            </p>

            <div className="boundary-toggle">
              <button
                type="button"
                onClick={() => setShowBoundaries(!showBoundaries)}
                className={`btn ${showBoundaries ? 'btn-primary' : 'btn-outline-secondary'} boundary-toggle-btn`}
              >
                <span className="toggle-icon-small">
                  {showBoundaries ? '👁️' : '👁️‍🗨️'}
                </span>
                {showBoundaries ? 'Ocultar' : 'Mostrar'} Límites de Componentes
              </button>

              <div className="toggle-status">
                {showBoundaries ? (
                  <span className="status-badge status-on">
                    ✓ Límites Visibles
                  </span>
                ) : (
                  <span className="status-badge status-off">
                    ○ Límites Ocultos
                  </span>
                )}
              </div>
            </div>

            <p className="arch-hint">
              <small>
                💡 <strong>Tip:</strong> Con los límites visibles, verás bordes de colores
                y etiquetas identificando cada componente.
              </small>
            </p>
          </section>

          {/* Prueba por Ti Mismo */}
          <section className="arch-section">
            <h3 className="arch-title">
              <span className="arch-icon">🚀</span>
              Prueba por Ti Mismo
            </h3>

            <p className="arch-text">
              El ColorPicker puede ejecutarse tanto integrado en esta aplicación como
              de forma independiente:
            </p>

            <div className="try-links">
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className="try-link"
              >
                <span className="link-icon">🔗</span>
                Abrir ColorPicker Standalone (Puerto 3001)
              </a>

              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="try-link"
              >
                <span className="link-icon">🏠</span>
                Ver Host Application (Puerto 3000)
              </a>
            </div>
          </section>

          {/* Aprende Más */}
          <section className="arch-section">
            <h3 className="arch-title">
              <span className="arch-icon">📚</span>
              Aprende Más
            </h3>

            <ul className="learn-more-list">
              <li>
                <a
                  href="https://webpack.js.org/concepts/module-federation/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📖 Documentación Oficial de Module Federation
                </a>
              </li>
              <li>
                <a
                  href="https://martinfowler.com/articles/micro-frontends.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📖 Micro Frontends por Martin Fowler
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/webpack/webpack/tree/main/examples/module-federation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💻 Ejemplos de Webpack Module Federation
                </a>
              </li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default ArchitecturePanel;