@echo off
title EduMarket Share Online
echo ====================================================
echo Starting EduMarket Local Server...
echo ====================================================
start /B node server.js
timeout /t 2 >nul
echo.
echo ====================================================
echo Starting Public Online Tunnel for Friends...
echo ====================================================
node scripts/share.js
pause

