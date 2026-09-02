#!/usr/bin/env bash
set -euo pipefail
PORT="${PORT:-8080}"
echo "Santiago Planner: http://localhost:${PORT}"
python3 -m http.server "$PORT"
