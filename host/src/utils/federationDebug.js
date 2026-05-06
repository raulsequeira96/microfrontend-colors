// Utilidad para manejo de errores en Module Federation
// Proporcionad feedback útil cuando hay problemas cargando remotes

export const setupFederationErrorHandler = () => {
  // Escuchar errores globales
  window.addEventListener("error", (event) => {
    if (
      event.message &&
      (event.message.includes("remoteEntry") ||
        event.message.includes("mf_colorpicker") ||
        event.message.includes("Module Federation"))
    ) {
      console.error("[Module Federation Error]", event);
      
      // Mostrar error en UI
      const errorDiv = document.createElement("div");
      errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 20px;
        border-radius: 8px;
        font-family: monospace;
        z-index: 9999;
        max-width: 400px;
      `;
      errorDiv.innerHTML = `
        <strong>⚠️ Error en Module Federation</strong><br/>
        ${event.message}
      `;
      document.body.appendChild(errorDiv);
      
      // Auto-remover después de 10 segundos
      setTimeout(() => errorDiv.remove(), 10000);
    }
  });

  // Escuchar rechazos de promesas no manejadas
  window.addEventListener("unhandledrejection", (event) => {
    if (
      event.reason &&
      (event.reason.message?.includes("remoteEntry") ||
        event.reason.message?.includes("mf_colorpicker"))
    ) {
      console.error("[Module Federation Rejection]", event.reason);
    }
  });
};

// Función para verificar disponibilidad de remotes
export const checkRemoteAvailability = async (remoteUrl) => {
  try {
    const response = await fetch(remoteUrl, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error(`[Remote Check] Error verificando ${remoteUrl}:`, error);
    return false;
  }
};

// Función para obtener información del remote
export const getRemoteInfo = (remoteName) => {
  if (window[`mf_${remoteName}`]) {
    return {
      available: true,
      name: remoteName,
      version: window[`mf_${remoteName}`].version || "unknown",
    };
  }
  return {
    available: false,
    name: remoteName,
    version: null,
  };
};
