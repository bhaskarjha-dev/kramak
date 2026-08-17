#!/usr/bin/env node

/**
 * Kramak Pipeline & State Validator
 * Zero-dependency verification script for Kramak SDLC integrity.
 * 
 * Usage:
 *   node scripts/validate.js
 *   node scripts/validate.js --path .agents/pipeline
 *   node scripts/validate.js --template
 *   node scripts/validate.js --help
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

function printHelp() {
  console.log(`
Kramak (क्रमक) Pipeline & State Validator

Usage:
  node scripts/validate.js [options]

Options:
  --path <dir>     Path to the .agents/pipeline directory (default: .agents/pipeline)
  --template       Validate the repository template directory (templates/)
  -h, --help       Show this help message and exit
  -v, --version    Show version and exit
`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  let pipelinePath = path.join(process.cwd(), '.agents', 'pipeline');
  let isTemplateCheck = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--help' || args[i] === '-h') {
      printHelp();
      process.exit(0);
    } else if (args[i] === '--version' || args[i] === '-v') {
      const versionFile = path.join(process.cwd(), 'VERSION');
      const version = fs.existsSync(versionFile) ? fs.readFileSync(versionFile, 'utf8').trim() : '1.0.0';
      console.log(`Kramak Validator v${version}`);
      process.exit(0);
    } else if (args[i] === '--path' && args[i + 1]) {
      pipelinePath = path.resolve(args[i + 1]);
      i++;
    } else if (args[i] === '--template') {
      pipelinePath = path.join(process.cwd(), 'templates');
      isTemplateCheck = true;
    }
  }

  return { pipelinePath, isTemplateCheck };
}

function validateSchemaContract(state) {
  const possibleSchemaPaths = [
    path.join(process.cwd(), 'spec', 'state.schema.json'),
    path.join(process.cwd(), '.kramak', 'spec', 'state.schema.json')
  ];

  let schemaPath = null;
  for (const p of possibleSchemaPaths) {
    if (fs.existsSync(p)) {
      schemaPath = p;
      break;
    }
  }

  if (!schemaPath) {
    logWarn('Could not locate state.schema.json for strict schema validation.');
    return;
  }

  try {
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const allowedKeys = Object.keys(schema.properties || {});
    const stateKeys = Object.keys(state);
    
    if (schema.additionalProperties === false) {
      for (const k of stateKeys) {
        if (!allowedKeys.includes(k)) {
          logError(`Schema violation: property "${k}" is not defined in state.schema.json.`);
        }
      }
    }

    // Nested schema validation
    if (state.metrics && typeof state.metrics === 'object') {
      const allowedMetricKeys = Object.keys(schema.properties.metrics.properties || {});
      for (const k of Object.keys(state.metrics)) {
        if (!allowedMetricKeys.includes(k)) {
          logError(`Schema violation: property "metrics.${k}" is not defined in state.schema.json.`);
        }
      }
      if (state.metrics.consecutiveFailures !== undefined && typeof state.metrics.consecutiveFailures !== 'number') {
        logError('"metrics.consecutiveFailures" must be a number.');
      }
      if (state.metrics.circuitBreakerTripped !== undefined && typeof state.metrics.circuitBreakerTripped !== 'boolean') {
        logError('"metrics.circuitBreakerTripped" must be a boolean.');
      }
    }

    if (state.toolchain && typeof state.toolchain === 'object') {
      const allowedToolchainKeys = Object.keys(schema.properties.toolchain.properties || {});
      for (const k of Object.keys(state.toolchain)) {
        if (!allowedToolchainKeys.includes(k)) {
          logError(`Schema violation: property "toolchain.${k}" is not defined in state.schema.json.`);
        }
      }
    }

    if (state.lastAudit && typeof state.lastAudit === 'object') {
      if (state.lastAudit.verdict && !['pass', 'pass-with-fixes', 'fail'].includes(state.lastAudit.verdict)) {
        logError(`Invalid lastAudit.verdict "${state.lastAudit.verdict}". Must be pass, pass-with-fixes, or fail.`);
      }
    }

    logPass('state.json adheres to state.schema.json property constraints.');
  } catch (err) {
    logWarn(`Could not validate against schema: ${err.message}`);
  }
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

  // Schema properties check
  validateSchemaContract(state);

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

  // Batch number check
  if (typeof state.batchNumber === 'number') {
    if (state.batchNumber < 0 || !Number.isInteger(state.batchNumber)) {
      logError(`"batchNumber" must be a non-negative integer.`);
    }
  }

  // Queue check
  if (!Array.isArray(state.queue)) {
    logError(`"queue" must be an array in state.json.`);
  }

  // Toolchain check
  if (state.toolchain) {
    if (state.toolchain.detected === false && !isTemplate) {
      logWarn('toolchain.detected is false. Run bootstrap or configure toolchain.checkCommands in state.json.');
    }
    if (Array.isArray(state.toolchain.checkCommands) && state.toolchain.checkCommands.length === 0 && !isTemplate) {
      logWarn('toolchain.checkCommands is empty. Verification gates will have no check commands to execute.');
    }
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
  const doneDir = path.join(pipelinePath, 'done');
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

  // Check done items
  if (fs.existsSync(doneDir) && Array.isArray(state.completed)) {
    const doneFiles = fs.readdirSync(doneDir).filter(f => f.endsWith('.md'));
    const completedIds = state.completed.map(item => typeof item === 'string' ? item : item.id);
    for (const wiId of completedIds) {
      if (wiId && !doneFiles.includes(`${wiId}.md`)) {
        logWarn(`state.completed lists "${wiId}", but "${wiId}.md" is not in done/ directory.`);
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
        // Strict failure category detection in diagnosis section
        const diagMatch = content.match(/## Failure Diagnosis[\s\S]*?(?:Category:|\*\*Category:\*\*)\s*`?([a-zA-Z0-9_-]+)`?/i);
        if (diagMatch && diagMatch[1]) {
          const category = diagMatch[1].trim();
          if (VALID_FAILURE_CATEGORIES.includes(category)) {
            logPass(`Failed item "${f}" has valid category: ${category}`);
          } else {
            logError(`Failed item "${f}" has invalid failure category "${category}". Must be one of: ${VALID_FAILURE_CATEGORIES.join(', ')}`);
          }
        } else {
          logWarn(`Failed item "${f}" does not clearly specify a recognized failure category in "## Failure Diagnosis".`);
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
