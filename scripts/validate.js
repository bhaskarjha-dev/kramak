#!/usr/bin/env node

/**
 * Kramak (क्रमक) — Validator Deprecation Notice
 * 
 * In Kramak v1.1 (EditorConfig model, D-009), all tooling and CLI utilities
 * have moved to the standalone companion package `kramak-cli` to maintain
 * zero runtime dependencies in the core specification repository.
 */

console.log('validate.js has moved to the kramak-cli companion package.');
console.log('Install: npx kramak-cli validate');
console.log('Manual validation: see docs/GETTING-STARTED.md');

process.exit(0);
