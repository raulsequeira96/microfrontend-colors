@echo off
REM Script de verificación rápida - Checklist antes de desplegar

echo.
echo 🔍 Verificando Configuración...
echo.

setlocal enabledelayedexpansion

REM Función para verificar archivos
set "check_count=0"
set "pass_count=0"

echo 📁 Directorios...
if exist "host\" (
  echo  ✓ Directorio OK: host
  set /a pass_count+=1
) else (
  echo  ✗ Directorio FALTA: host
)
set /a check_count+=1

if exist "mf-colorpicker\" (
  echo  ✓ Directorio OK: mf-colorpicker
  set /a pass_count+=1
) else (
  echo  ✗ Directorio FALTA: mf-colorpicker
)
set /a check_count+=1

echo.
echo 📦 Archivos de Configuración...

for %%F in (
  "host\package.json"
  "host\webpack.config.js"
  "host\netlify.toml"
  "host\.env.example"
  "mf-colorpicker\package.json"
  "mf-colorpicker\webpack.config.js"
  "mf-colorpicker\netlify.toml"
  "mf-colorpicker\.env.example"
) do (
  if exist %%F (
    echo  ✓ Encontrado: %%F
    set /a pass_count+=1
  ) else (
    echo  ✗ FALTA: %%F
  )
  set /a check_count+=1
)

echo.
echo 📝 Archivos de Fuente...

for %%F in (
  "host\src\bootstrap.js"
  "host\src\index.js"
  "host\src\utils\federationDebug.js"
  "host\src\config.js"
  "mf-colorpicker\src\config.js"
) do (
  if exist %%F (
    echo  ✓ Encontrado: %%F
    set /a pass_count+=1
  ) else (
    echo  ✗ FALTA: %%F
  )
  set /a check_count+=1
)

echo.
echo 🚀 Scripts de Despliegue...

for %%F in (
  "dev.bat"
  "dev.sh"
  "SETUP.md"
  "DEPLOYMENT.md"
) do (
  if exist %%F (
    echo  ✓ Encontrado: %%F
    set /a pass_count+=1
  ) else (
    echo  ✗ FALTA: %%F
  )
  set /a check_count+=1
)

echo.
echo ✨ Verificación Completada
echo    Archivos OK: !pass_count!/!check_count!
echo.
echo Próximos pasos:
echo 1. npm install en host\ y mf-colorpicker\
echo 2. npm start en ambas carpetas para probar en desarrollo
echo 3. Crear repositorio en GitHub
echo 4. Crear sitios en Netlify
echo.
echo 📖 Ver DEPLOYMENT.md para instrucciones detalladas
echo.
