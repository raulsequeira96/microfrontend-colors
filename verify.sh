#!/bin/bash
# Script de verificación rápida - Checklist antes de desplegar

set -e

echo "🔍 Verificando Configuración..."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_file() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✓${NC} Encontrado: $1"
    return 0
  else
    echo -e "${RED}✗${NC} FALTA: $1"
    return 1
  fi
}

check_dir() {
  if [ -d "$1" ]; then
    echo -e "${GREEN}✓${NC} Directorio OK: $1"
    return 0
  else
    echo -e "${RED}✗${NC} Directorio FALTA: $1"
    return 1
  fi
}

check_content() {
  if grep -q "$2" "$1"; then
    echo -e "${GREEN}✓${NC} Contenido encontrado en: $1"
    return 0
  else
    echo -e "${RED}✗${NC} Contenido NO encontrado en: $1"
    return 1
  fi
}

echo "📁 Directorios..."
check_dir "host"
check_dir "mf-colorpicker"

echo ""
echo "📦 Archivos de Configuración..."
check_file "host/package.json"
check_file "host/webpack.config.js"
check_file "host/netlify.toml"
check_file "host/.env.example"

check_file "mf-colorpicker/package.json"
check_file "mf-colorpicker/webpack.config.js"
check_file "mf-colorpicker/netlify.toml"
check_file "mf-colorpicker/.env.example"

echo ""
echo "📝 Archivos de Fuente..."
check_file "host/src/bootstrap.js"
check_file "host/src/index.js"
check_file "host/src/utils/federationDebug.js"
check_file "host/src/config.js"
check_file "mf-colorpicker/src/config.js"

echo ""
echo "🚀 Scripts de Despliegue..."
check_file "dev.bat"
check_file "dev.sh"
check_file "SETUP.md"
check_file "DEPLOYMENT.md"

echo ""
echo "🔧 Verificando Configuración Webpack..."
check_content "host/webpack.config.js" "require(\"dotenv\")"
check_content "host/webpack.config.js" "colorPickerUrl"
check_content "mf-colorpicker/webpack.config.js" "require(\"dotenv\")"

echo ""
echo "✅ Verificando Variables de Entorno..."
check_content "host/package.json" "NODE_ENV=production"
check_content "mf-colorpicker/package.json" "NODE_ENV=production"

echo ""
echo "🌐 Verificando Configuración Netlify..."
check_content "host/netlify.toml" "Access-Control-Allow-Origin"
check_content "mf-colorpicker/netlify.toml" "Access-Control-Allow-Origin"

echo ""
echo "✨ Verificación Completa!"
echo ""
echo "Próximos pasos:"
echo "1. npm install en host/ y mf-colorpicker/"
echo "2. npm start en ambas carpetas para probar en desarrollo"
echo "3. Crear repositorio en GitHub"
echo "4. Crear sitios en Netlify"
echo ""
echo "📖 Ver DEPLOYMENT.md para instrucciones detalladas"
