#!/usr/bin/env sh
# Kramak (क्रमक) — One-Command Project Bootstrapper
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/bhaskarjha-dev/kramak/main/init.sh | sh
#   or: ./init.sh

set -e

echo "============================================="
echo "   Kramak (क्रमक) Project Initializer"
echo "   The missing SDLC for AI agents"
echo "============================================="
echo ""

TARGET_DIR="${1:-.}"
cd "$TARGET_DIR"

echo "📂 Target directory: $(pwd)"

# Create Kramak spec directory
mkdir -p .kramak/spec
mkdir -p .agents/pipeline/queue
mkdir -p .agents/pipeline/active
mkdir -p .agents/pipeline/done
mkdir -p .agents/pipeline/failed
mkdir -p .agents/pipeline/plans

# Touch gitkeeps
touch .agents/pipeline/queue/.gitkeep
touch .agents/pipeline/active/.gitkeep
touch .agents/pipeline/done/.gitkeep
touch .agents/pipeline/failed/.gitkeep
touch .agents/pipeline/plans/.gitkeep

KRAMAK_REPO_RAW="https://raw.githubusercontent.com/bhaskarjha-dev/kramak/main"

# Download or copy spec files if not local
if [ -d "spec" ] && [ -f "spec/PLANNER.md" ]; then
  echo "📋 Copying local spec files..."
  cp -r spec/* .kramak/spec/
  cp templates/state.json .agents/pipeline/state.json
  cp templates/INBOX.md .agents/pipeline/INBOX.md
  cp templates/HUMAN-TASKS.md .agents/pipeline/HUMAN-TASKS.md
  cp templates/PLANNING-LOG.md .agents/pipeline/PLANNING-LOG.md
else
  echo "🌐 Fetching Kramak specifications..."
  curl -fsSL "$KRAMAK_REPO_RAW/spec/PLANNER.md" -o .kramak/spec/PLANNER.md
  curl -fsSL "$KRAMAK_REPO_RAW/spec/EXECUTOR.md" -o .kramak/spec/EXECUTOR.md
  curl -fsSL "$KRAMAK_REPO_RAW/spec/PRINCIPLES.md" -o .kramak/spec/PRINCIPLES.md
  curl -fsSL "$KRAMAK_REPO_RAW/spec/BOOTSTRAP.md" -o .kramak/spec/BOOTSTRAP.md
  curl -fsSL "$KRAMAK_REPO_RAW/spec/state.schema.json" -o .kramak/spec/state.schema.json

  curl -fsSL "$KRAMAK_REPO_RAW/templates/state.json" -o .agents/pipeline/state.json
  curl -fsSL "$KRAMAK_REPO_RAW/templates/INBOX.md" -o .agents/pipeline/INBOX.md
  curl -fsSL "$KRAMAK_REPO_RAW/templates/HUMAN-TASKS.md" -o .agents/pipeline/HUMAN-TASKS.md
  curl -fsSL "$KRAMAK_REPO_RAW/templates/PLANNING-LOG.md" -o .agents/pipeline/PLANNING-LOG.md
fi

# Initialize AGENTS.md if missing
if [ ! -f "AGENTS.md" ] && [ ! -f ".agents/AGENTS.md" ]; then
  echo "📝 Initializing AGENTS.md..."
  cat << 'EOF' > .agents/AGENTS.md
# Project Context

## Autonomous Development (Kramak)
When you receive the instruction "Start", "begin", "continue", or "go":
1. Read `.agents/pipeline/state.json`
   - If missing: read `.kramak/spec/BOOTSTRAP.md` and bootstrap
   - If present: follow procedure for `state.phase`:
     - `planning` -> Read `.kramak/spec/PLANNER.md`
     - `executing` -> Read `.kramak/spec/EXECUTOR.md`
     - `auditing` -> Read `.kramak/spec/EXECUTOR.md §STEP 8.5`
2. Before any work, read `.kramak/spec/PRINCIPLES.md` (non-negotiable).
3. Rules: Every token advances the project. Continuous state update. Grounded verification.
EOF
fi

# Git initialization check
if [ ! -d ".git" ]; then
  echo "🔧 Initializing git repository..."
  git init
fi

echo ""
echo "✅ Kramak successfully initialized in $(pwd)!"
echo "👉 Open your AI coding assistant (Cursor, Antigravity, Claude Code, Windsurf, Cline) and say 'Start'."
