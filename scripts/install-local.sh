#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${HOME}/.cursor/plugins/local/superkreator"

mkdir -p "${HOME}/.cursor/plugins/local"
rm -rf "${DEST}"
mkdir -p "${DEST}"

# Copy plugin contents (no nested .git)
rsync -a \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.DS_Store' \
  "${ROOT}/" "${DEST}/"

echo "Installed SuperKreator plugin → ${DEST}"
echo "Reload Cursor (Developer: Reload Window), then set SUPERKREATOR_API_KEY under Plugins → Configure."
