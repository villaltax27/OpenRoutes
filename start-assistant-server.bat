@echo off
setlocal
cd /d "%~dp0"

echo Starting OpenRoutes with the local voice assistant...
echo.
echo This opens the site from the Python backend, so /api/assistant can talk to Ollama.
echo Keep this window open while testing the assistant.
echo.

set "PYTHON_CMD="

where python >nul 2>nul
if not errorlevel 1 set "PYTHON_CMD=python"

if not defined PYTHON_CMD (
    where py >nul 2>nul
    if not errorlevel 1 set "PYTHON_CMD=py"
)

if not defined PYTHON_CMD (
    if exist "%LOCALAPPDATA%\Python\bin\python.exe" set "PYTHON_CMD=%LOCALAPPDATA%\Python\bin\python.exe"
)

if not defined PYTHON_CMD (
    if exist "%LOCALAPPDATA%\Programs\Python\Python314\python.exe" set "PYTHON_CMD=%LOCALAPPDATA%\Programs\Python\Python314\python.exe"
)

if not defined PYTHON_CMD (
    echo Python was not found from this window.
    echo Open CMD and run: python --version
    echo If Python works there, open this file from that same CMD.
    echo.
    pause
    exit /b 1
)

start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:5510'"

"%PYTHON_CMD%" backend\server.py --port 5510 --model gemma3:1b

if errorlevel 1 (
    echo.
    echo Python could not start the OpenRoutes assistant server.
    echo Try opening a new terminal and running:
    echo "%PYTHON_CMD%" backend\server.py --port 5510 --model gemma3:1b
    echo.
    pause
)
