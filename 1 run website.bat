@echo off
title Local Website Server

echo Starting website...
echo.

REM Start the development server in the current folder
start "" /B cmd /c "npm run dev"

REM Wait a few seconds for the server to start
timeout /t 5 /nobreak >nul

REM Open the website in the default browser
start "" "http://localhost:3000/"

echo.
echo Website started at:
echo http://localhost:3000/
echo.
pause