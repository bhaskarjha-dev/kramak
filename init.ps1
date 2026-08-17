# Kramak (क्रमक) — One-Command Project Bootstrapper (PowerShell)
# Usage:
#   iwr -useb https://raw.githubusercontent.com/bhaskarjha-dev/kramak/main/init.ps1 | iex
#   or: .\init.ps1

param (
    [string]$TargetDir = "."
)

$ErrorActionPreference = "Stop"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "   Kramak (क्रमक) Project Initializer" -ForegroundColor Cyan
Write-Host "   The missing SDLC for AI agents" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $TargetDir)) {
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}
Set-Location $TargetDir
$currentPath = (Get-Item .).FullName
Write-Host "[INFO] Target directory: $currentPath"

# Create directory structure
$dirs = @(
    ".kramak/spec",
    ".kramak/templates",
    ".agents/pipeline/queue",
    ".agents/pipeline/active",
    ".agents/pipeline/done",
    ".agents/pipeline/failed",
    ".agents/pipeline/plans"
)

foreach ($d in $dirs) {
    if (-not (Test-Path $d)) {
        New-Item -ItemType Directory -Path $d -Force | Out-Null
    }
    $keep = Join-Path $d ".gitkeep"
    if ($d -like ".agents/pipeline/*" -and -not (Test-Path $keep)) {
        New-Item -ItemType File -Path $keep -Force | Out-Null
    }
}

$KRAMAK_RAW = "https://raw.githubusercontent.com/bhaskarjha-dev/kramak/main"

if ((Test-Path "spec/PLANNER.md") -and (Test-Path "templates/state.json")) {
    Write-Host "[INFO] Copying local spec and template files..." -ForegroundColor Yellow
    Copy-Item -Path "spec/*" -Destination ".kramak/spec/" -Recurse -Force
    Copy-Item -Path "templates/*" -Destination ".kramak/templates/" -Recurse -Force
    Copy-Item -Path "templates/state.json" -Destination ".agents/pipeline/state.json" -Force
    Copy-Item -Path "templates/INBOX.md" -Destination ".agents/pipeline/INBOX.md" -Force
    Copy-Item -Path "templates/HUMAN-TASKS.md" -Destination ".agents/pipeline/HUMAN-TASKS.md" -Force
    Copy-Item -Path "templates/PLANNING-LOG.md" -Destination ".agents/pipeline/PLANNING-LOG.md" -Force
} else {
    Write-Host "[INFO] Fetching Kramak specifications..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri "$KRAMAK_RAW/spec/PLANNER.md" -OutFile ".kramak/spec/PLANNER.md"
    Invoke-WebRequest -Uri "$KRAMAK_RAW/spec/EXECUTOR.md" -OutFile ".kramak/spec/EXECUTOR.md"
    Invoke-WebRequest -Uri "$KRAMAK_RAW/spec/PRINCIPLES.md" -OutFile ".kramak/spec/PRINCIPLES.md"
    Invoke-WebRequest -Uri "$KRAMAK_RAW/spec/BOOTSTRAP.md" -OutFile ".kramak/spec/BOOTSTRAP.md"
    Invoke-WebRequest -Uri "$KRAMAK_RAW/spec/state.schema.json" -OutFile ".kramak/spec/state.schema.json"

    Invoke-WebRequest -Uri "$KRAMAK_RAW/templates/state.json" -OutFile ".kramak/templates/state.json"
    Invoke-WebRequest -Uri "$KRAMAK_RAW/templates/INBOX.md" -OutFile ".kramak/templates/INBOX.md"
    Invoke-WebRequest -Uri "$KRAMAK_RAW/templates/HUMAN-TASKS.md" -OutFile ".kramak/templates/HUMAN-TASKS.md"
    Invoke-WebRequest -Uri "$KRAMAK_RAW/templates/PLANNING-LOG.md" -OutFile ".kramak/templates/PLANNING-LOG.md"
    Invoke-WebRequest -Uri "$KRAMAK_RAW/templates/batch-plan.md" -OutFile ".kramak/templates/batch-plan.md"
    Invoke-WebRequest -Uri "$KRAMAK_RAW/templates/audit-report.md" -OutFile ".kramak/templates/audit-report.md"
    Invoke-WebRequest -Uri "$KRAMAK_RAW/templates/work-item-guided.md" -OutFile ".kramak/templates/work-item-guided.md"
    Invoke-WebRequest -Uri "$KRAMAK_RAW/templates/work-item-directed.md" -OutFile ".kramak/templates/work-item-directed.md"
    Invoke-WebRequest -Uri "$KRAMAK_RAW/templates/work-item-outcome.md" -OutFile ".kramak/templates/work-item-outcome.md"

    Copy-Item -Path ".kramak/templates/state.json" -Destination ".agents/pipeline/state.json" -Force
    Copy-Item -Path ".kramak/templates/INBOX.md" -Destination ".agents/pipeline/INBOX.md" -Force
    Copy-Item -Path ".kramak/templates/HUMAN-TASKS.md" -Destination ".agents/pipeline/HUMAN-TASKS.md" -Force
    Copy-Item -Path ".kramak/templates/PLANNING-LOG.md" -Destination ".agents/pipeline/PLANNING-LOG.md" -Force
}

# Check AGENTS.md
if (-not (Test-Path "AGENTS.md") -and -not (Test-Path ".agents/AGENTS.md")) {
    Write-Host "[INFO] Initializing AGENTS.md..." -ForegroundColor Yellow
    $agentsContent = @"
# Project Context

## Autonomous Development (Kramak)
When you receive the instruction "Start", "begin", "continue", or "go":
1. Read `.agents/pipeline/state.json`
   - If missing: read `.kramak/spec/BOOTSTRAP.md` and bootstrap
   - If present: follow procedure for `state.phase`:
     - `planning` -> Read `.kramak/spec/PLANNER.md`
     - `executing` -> Read `.kramak/spec/EXECUTOR.md`
     - `auditing` -> Read `.kramak/spec/EXECUTOR.md §STEP 8.5`
     - `waiting` -> Check `HUMAN-TASKS.md` & `INBOX.md`; if resolved or unblocked roadmap work exists, switch `phase` to `planning` and follow `PLANNER.md`; otherwise prompt user.
2. Before any work, read `.kramak/spec/PRINCIPLES.md` (non-negotiable).
3. Rules: Every token advances the project. Continuous state update. Grounded verification.
"@
    Set-Content -Path ".agents/AGENTS.md" -Value $agentsContent -Encoding utf8
}

# Git initialization check
if (-not (Test-Path ".git")) {
    Write-Host "[INFO] Initializing git repository..." -ForegroundColor Yellow
    git init | Out-Null
}

Write-Host ""
Write-Host "[SUCCESS] Kramak successfully initialized in $currentPath!" -ForegroundColor Green
Write-Host "Open your AI coding assistant (Cursor, Antigravity, Claude Code, Windsurf, Cline) and say 'Start'." -ForegroundColor Green
