@echo off
setlocal
cd /d "%~dp0"

:: Check parameter
if /i "%~1"=="ANGULAR"  goto :Angular
if /i "%~1"=="REACT"    goto :React
if /i "%~1"=="VUE"      goto :Vue
if /i "%~1"=="SVELTE"   goto :Svelte
if "%~1" NEQ "" (
  echo Wrong parameter!
  echo Use: stop.bat [ANGULAR^|REACT^|VUE^|SVELTE]
  goto :End
)

:All
echo.
echo === STOP ALL ===
call :KillPort 4200 "Angular"
call :KillPort 5173 "React"
call :KillPort 5174 "Vue"
call :KillPort 5175 "Svelte"
goto :End

:Angular
call :KillPort 4200 "Angular"
goto :End

:React
call :KillPort 5173 "React"
goto :End

:Vue
call :KillPort 5174 "Vue"
goto :End

:Svelte
call :KillPort 5175 "Svelte"
goto :End


:: -------------------------------------------------
:: Function: Kill process listening on a port
:: Args:
::   %1 = port
::   %2 = label
:: -------------------------------------------------
:KillPort
set "PORT=%~1"
set "LABEL=%~2"

echo.
echo --- %LABEL% (port %PORT%) ---

set "FOUND=0"
for /f "tokens=5" %%P in ('netstat -aon ^| findstr /R /C:":%PORT% .*LISTENING"') do (
  set "FOUND=1"
  echo Killing PID %%P ...
  taskkill /F /PID %%P >nul 2>&1
)

if "%FOUND%"=="0" echo Nothing is listening on %PORT%.
goto :eof


:End
endlocal
exit /b
