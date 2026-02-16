@echo off
setlocal
cd /d "%~dp0"

echo Installing dependencies...
echo.

:: Param mode
if /i "%~1"=="ANGULAR" goto ANGULAR
if /i "%~1"=="REACT"   goto REACT
if /i "%~1"=="SVELTE"  goto SVELTE
if /i "%~1"=="VUE"     goto VUE
if "%~1" NEQ "" (
  echo Wrong parameter!
  echo Use: install.bat [ANGULAR^|REACT^|SVELTE^|VUE]
  goto END
)

:: No param => install ALL
goto ALL


:ALL
call "%~f0" ANGULAR
call "%~f0" REACT
call "%~f0" SVELTE
call "%~f0" VUE
goto END


:ANGULAR
echo === login-form-angular ===
if exist "login-form-angular\" (
  pushd "login-form-angular"
  echo Running: npm install
  npm install
  popd
) else (
  echo [SKIP] folder not found
)
echo.
goto END


:REACT
echo === login-form-react ===
if exist "login-form-react\" (
  pushd "login-form-react"
  echo Running: npm install
  npm install
  popd
) else (
  echo [SKIP] folder not found
)
echo.
goto END


:SVELTE
echo === login-form-svelte ===
if exist "login-form-svelte\" (
  pushd "login-form-svelte"
  echo Running: npm install
  npm install
  popd
) else (
  echo [SKIP] folder not found
)
echo.
goto END


:VUE
echo === login-form-vue ===
if exist "login-form-vue\" (
  pushd "login-form-vue"
  echo Running: npm install
  npm install
  popd
) else (
  echo [SKIP] folder not found
)
echo.
goto END


:END
endlocal
exit /b
