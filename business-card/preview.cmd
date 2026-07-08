@echo off
REM ─────────────────────────────────────────────────────────────
REM  Preview the BLD Business Card Builder in your browser.
REM  Double-click this file (or run it) to start a local server
REM  and open the card. Press Ctrl+C in the window to stop it.
REM  (Opening index.html directly via file:// does not render
REM   correctly, so we serve it over http://localhost.)
REM ─────────────────────────────────────────────────────────────
cd /d "%~dp0"
set PORT=8731
echo Starting preview server at http://localhost:%PORT%/index.html
echo Press Ctrl+C to stop.
start "" "http://localhost:%PORT%/index.html"
python -m http.server %PORT%
