#!/usr/bin/env node

/**
 * Kramak Pipeline & State Validator
 * Zero-dependency verification script for Kramak SDLC integrity.
 * 
 * Usage:
 *   node scripts/validate.js
 *   node scripts/validate.js --path .agents/pipeline
 *   node scripts/validate.js --template
 */

const fs = require('fs');
const path = require('path');

const VALID_PHASES = ['planning', 'executing', 'auditing', 'waiting'];
const VALID_PRODUCT_PHASES = ['BUILD', 'SHIP', 'ITERATE', 'GROWTH', ''];
const VALID_FAILURE_CATEGORIES = [
  'code-drift',
  'verification-fail',
  'scope-exceeded',
  'dependency-missing',
  'ambiguous-spec',
  'tool-error'
];

let errorCount = 0;
let warningCount = 0;

function logError(msg) {
  console.error(`❌ [ERROR] ${msg}`);
  errorCount++;
}

function logWarn(msg) {
  console.warn(`⚠️  [WARN]  ${msg}`);
  warningCount++;
}

function logPass(msg) {
  console.log(`✅ [PASS]  ${msg}`);
}

function logInfo(msg) {
  console.log(`ℹ️  [INFO]  ${msg}`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  let pipelinePath = path.join(process.cwd(), '.agents', 'pipeline');
  let isTemplateCheck = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--path' && args[i + 1]) {
      pipelinePath = path.resolve(args[i + 1]);
      i++;
    } else if (args[i] === '--template') {
      pipelinePath = path.join(process.cwd(), 'templates');
      isTemplateCheck = true;
    }
  }

  return { pipelinePath, isTemplateCheck };
}

function validateStateJson(stateFile, isTemplate) {
  logInfo(`Validating state file: ${stateFile}`);

  if (!fs.existsSync(stateFile)) {
    logError(`state.json not found at ${stateFile}`);
    return null;
  }

  let state;
  try {
    const raw = fs.readFileSync(stateFile, 'utf8');
    state = JSON.parse(raw);
    logPass('state.json is valid JSON.');
  } catch (err) {
    logError(`state.json JSON syntax error: ${err.message}`);
    return null;
  }

  // Required root fields
  const requiredFields = ['version', 'phase', 'nextAction', 'currentBranch', 'batchNumber', 'queue', 'metrics'];
  for (const field of requiredFields) {
    if (state[field] === undefined) {
      logError(`Missing required field in state.json: "${field}"`);
    }
  }

  // Phase enum check
  if (state.phase && !VALID_PHASES.includes(state.phase)) {
    logError(`Invalid phase "${state.phase}". Must be one of: ${VALID_PHASES.join(', ')}`);
  } else if (state.phase) {
    logPass(`Valid pipeline phase: "${state.phase}"`);
  }

  // ProductPhase enum check
  if (state.productPhase !== undefined && !VALID_PRODUCT_PHASES.includes(state.productPhase)) {
    logError(`Invalid productPhase "${state.productPhase}". Must be one of: ${VALID_PRODUCT_PHASES.map(p => `"${p}"`).join(', ')}`);
  }

  // Queue check
  if (!Array.isArray(state.queue)) {
    logError(`"queue" must be an array in state.json.`);
  }

  // Metrics check
  if (!state.metrics || typeof state.metrics.totalCompleted !== 'number' || typeof state.metrics.totalFailed !== 'number') {
    logError(`"metrics" must contain totalCompleted (number) and totalFailed (number).`);
  } else {
    logPass(`Metrics structure valid (Completed: ${state.metrics.totalCompleted}, Failed: ${state.metrics.totalFailed})`);
  }

  return state;
}

function validateDirectories(pipelinePath) {
  logInfo(`Checking pipeline directories at ${pipelinePath}`);
  const dirs = ['queue', 'active', 'done', 'failed', 'plans'];
  for (const d of dirs) {
    const dirPath = path.join(pipelinePath, d);
    if (!fs.existsSync(dirPath)) {
      logError(`Missing required directory: ${d}/`);
    } else if (!fs.statSync(dirPath).isDirectory()) {
      logError(`Path ${d} is not a directory.`);
    } else {
      logPass(`Directory exists: ${d}/`);
    }
  }
}

function validateFilesystemReconciliation(pipelinePath, state) {
  if (!state) return;

  logInfo('Checking filesystem reconciliation with state.json...');

  const queueDir = path.join(pipelinePath, 'queue');
  const activeDir = path.join(pipelinePath, 'active');
  const failedDir = path.join(pipelinePath, 'failed');

  // Check active item
  if (fs.existsSync(activeDir)) {
    const activeFiles = fs.readdirSync(activeDir).filter(f => f.endsWith('.md'));
    if (state.active) {
      const expectedFile = `${state.active}.md`;
      if (!activeFiles.includes(expectedFile)) {
        logError(`state.active is "${state.active}", but file "${expectedFile}" does not exist in active/!`);
      } else {
        logPass(`Active work item reconciled: ${expectedFile}`);
      }
    } else {
      if (activeFiles.length > 0) {
        logError(`state.active is null, but active/ contains unclosed files: ${activeFiles.join(', ')}`);
      }
    }
  }

  // Check queue items
  if (fs.existsSync(queueDir) && Array.isArray(state.queue)) {
    const queueFiles = fs.readdirSync(queueDir).filter(f => f.endsWith('.md'));
    
    // Check if every queue ID in state has a file
    for (const wiId of state.queue) {
      const expectedFile = `${wiId}.md`;
      if (!queueFiles.includes(expectedFile)) {
        logError(`state.queue lists "${wiId}", but file "${expectedFile}" is missing from queue/!`);
      }
    }

    // Check if every file in queue/ is in state.queue
    for (const file of queueFiles) {
      const wiId = path.basename(file, '.md');
      if (!state.queue.includes(wiId)) {
        logWarn(`File "${file}" exists in queue/ but is NOT in state.queue array.`);
      }
    }
  }

  // Check failed items
  if (fs.existsSync(failedDir)) {
    const failedFiles = fs.readdirSync(failedDir).filter(f => f.endsWith('.md'));
    for (const f of failedFiles) {
      const content = fs.readFileSync(path.join(failedDir, f), 'utf8');
      if (!content.includes('## Failure Diagnosis')) {
        logError(`Failed work item "${f}" is missing mandatory "## Failure Diagnosis" section!`);
      } else {
        // Check failure category
        let hasCategory = false;
        for (const cat of VALID_FAILURE_CATEGORIES) {
          if (content.includes(cat)) {
            hasCategory = true;
            break;
          }
        }
        if (!hasCategory) {
          logWarn(`Failed item "${f}" does not clearly specify a recognized failure category.`);
        }
      }
    }
  }
}

function run() {
  console.log('=============================================');
  console.log('   Kramak (क्रमक) Pipeline & State Validator');
  console.log('=============================================\n');

  const { pipelinePath, isTemplateCheck } = parseArgs();
  const stateFile = path.join(pipelinePath, 'state.json');

  const state = validateStateJson(stateFile, isTemplateCheck);
  validateDirectories(pipelinePath);
  
  if (!isTemplateCheck) {
    validateFilesystemReconciliation(pipelinePath, state);
  }

  console.log('\n---------------------------------------------');
  if (errorCount === 0) {
    console.log(`🎉 Pipeline validation SUCCESSFUL! (${warningCount} warning${warningCount === 1 ? '' : 's'})`);
    process.exit(0);
  } else {
    console.error(`💥 Validation FAILED with ${errorCount} error${errorCount === 1 ? '' : 's'} and ${warningCount} warning${warningCount === 1 ? '' : 's'}.`);
    process.exit(1);
  }
}

run();
