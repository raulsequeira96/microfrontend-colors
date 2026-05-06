#!/bin/bash
# Script para desarrollo local con ambas apps

# Instalar dotenv-cli globalmente si no está instalado
# npm install -g dotenv-cli

# Crear archivos .env.local si no existen
if [ ! -f host/.env.local ]; then
  cat > host/.env.local << 'EOF'
NODE_ENV=development
COLORPICKER_URL=http://localhost:3001/remoteEntry.js
EOF
  echo "✓ Creado host/.env.local"
fi

if [ ! -f mf-colorpicker/.env.local ]; then
  cat > mf-colorpicker/.env.local << 'EOF'
NODE_ENV=development
PORT=3001
EOF
  echo "✓ Creado mf-colorpicker/.env.local"
fi

echo ""
echo "🚀 Iniciando desarrollo local..."
echo "📱 HOST: http://localhost:3000"
echo "🎨 COLORPICKER: http://localhost:3001"
echo ""

# Iniciar ambas apps en paralelo
(cd mf-colorpicker && npm start) &
COLORPICKER_PID=$!

sleep 2

(cd host && npm start) &
HOST_PID=$!

# Esperar a que ambas terminen
wait $COLORPICKER_PID $HOST_PID
