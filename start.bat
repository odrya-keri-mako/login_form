@echo off
setlocal
cd /d "%~dp0"

:: Check parameter
if /i "%~1"=="ANGULAR"  goto :Angular
if /i "%~1"=="REACT"    goto :React
if /i "%~1"=="SVELTE"   goto :Svelte
if /i "%~1"=="VUE"      goto :Vue
if "%~1" NEQ "" (
  echo Wrong parameter!
  echo Use: start.bat [ANGULAR^|REACT^|SVELTE^|VUE]
  goto :End
)

:Angular
echo.
echo === Angular: start (4200) ===
call :DoStart "login-form-angular" "npm run start -- --open --port 4200" "Angular"
if "%~1" NEQ "" goto :End

:React
echo.
echo === React: start (5173) ===
call :DoStart "login-form-react" "npm run dev -- --host --port 5173 --open" "React"
if "%~1" NEQ "" goto :End

:Vue
echo.
echo === Vue: start (5174) ===
call :DoStart "login-form-vue" "npm run dev -- --host --port 5174 --open" "Vue"
if "%~1" NEQ "" goto :End

:Svelte
echo.
echo === Svelte: start (5175) ===
call :DoStart "login-form-svelte" "npm run dev -- --host --port 5175 --open" "Svelte"
if "%~1" NEQ "" goto :End

goto :End


:DoStart
set "APPDIR=%~1"
set "CMD=%~2"
set "TITLE=%~3"

if not exist "%APPDIR%\package.json" (
  echo [SKIP] %APPDIR% - package.json not found
  goto :eof
)

if not exist "%APPDIR%\node_modules\" (
  echo [WARN] %APPDIR% - node_modules missing. Run install.bat first.
)

pushd "%APPDIR%"
start "%TITLE%" cmd /k "%CMD%"
popd
goto :eof


:End
endlocal
exit /b
