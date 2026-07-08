#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  Preview the BLD Business Card Builder in your browser.
#  Run:  ./preview.sh    (from Git Bash / macOS / Linux)
#  Press Ctrl+C to stop the server.
#  (Opening index.html via file:// does not render correctly,
#   so we serve it over http://localhost.)
# ─────────────────────────────────────────────────────────────
set -e
cd "$(dirname "$0")"
PORT=8731
URL="http://localhost:${PORT}/index.html"

echo "Starting preview server at ${URL}"
echo "Press Ctrl+C to stop."

# Open the browser shortly after the server comes up.
( sleep 1
  if command -v start >/dev/null 2>&1; then start "" "$URL"        # Git Bash / Windows
  elif command -v open  >/dev/null 2>&1; then open "$URL"          # macOS
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL"   # Linux
  fi ) &

exec python -m http.server "$PORT"
