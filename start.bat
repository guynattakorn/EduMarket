@echo off
setlocal
title EduMarket Server
cd /d "%~dp0"

if exist "%ProgramFiles%\nodejs\node.exe" set "PATH=%ProgramFiles%\nodejs;%PATH%"
if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install Node.js LTS, then run this file again.
  pause
  exit /b 1
)

echo Starting EduMarket...
start "" "http://localhost:3000"
node server.js
if errorlevel 1 echo EduMarket stopped because the server encountered an error.
pause
