@echo off
REM Script para desarrollo local en Windows

echo Creando archivos .env.local si no existen...

if not exist "host\.env.local" (
  (
    echo NODE_ENV=development
    echo COLORPICKER_URL=http://localhost:3001/remoteEntry.js
  ) > "host\.env.local"
  echo. ✓ Creado host\.env.local
)

if not exist "mf-colorpicker\.env.local" (
  (
    echo NODE_ENV=development
    echo PORT=3001
  ) > "mf-colorpicker\.env.local"
  echo. ✓ Creado mf-colorpicker\.env.local
)

echo.
echo 🚀 Iniciando desarrollo local...
echo 📱 HOST: http://localhost:3000
echo 🎨 COLORPICKER: http://localhost:3001
echo.

REM Iniciar ambas apps en paralelo
start cmd /k "cd mf-colorpicker && npm start"
timeout /t 2
start cmd /k "cd host && npm start"
