#!/usr/bin/env node

/**
 * =============================================================================
 * Punjab's Attire — Zero-Dependency Modular HTML Compiler
 * =============================================================================
 * Combines modular HTML components in src/ into a single high-performance,
 * SEO-optimized index.html at the project root for GitHub Pages.
 *
 * Usage:
 *   node scripts/build.js          # Compile once
 *   node scripts/build.js --watch  # Watch src/ for changes and recompile live
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const TEMPLATE_FILE = path.join(SRC_DIR, 'index.html');
const OUTPUT_FILE = path.join(ROOT_DIR, 'index.html');

// Regex matches: <!-- include components/header.html -->
// Captures leading whitespace for proper indentation preservation
const INCLUDE_REGEX = /^([ \t]*)<!--\s*include\s+([^\s]+)\s*-->/gm;

function resolveIncludes(content, baseDir, depth = 0) {
    if (depth > 10) {
        throw new Error('Maximum include depth exceeded (circular include detected)');
    }

    return content.replace(INCLUDE_REGEX, (match, indent, relativePath) => {
        const filePath = path.join(baseDir, relativePath);

        if (!fs.existsSync(filePath)) {
            console.error(`\x1b[31m[Error] Included component not found:\x1b[0m ${filePath}`);
            return `<!-- Error: Component "${relativePath}" not found -->`;
        }

        let componentContent = fs.readFileSync(filePath, 'utf-8');

        // Indent lines to match the include statement's indentation
        if (indent) {
            componentContent = componentContent
                .split('\n')
                .map((line) => (line.trim() ? indent + line : ''))
                .join('\n');
        }

        // Recursively resolve any nested includes
        return resolveIncludes(componentContent, path.dirname(filePath), depth + 1);
    });
}

function build() {
    const startTime = process.hrtime.bigint();

    try {
        if (!fs.existsSync(TEMPLATE_FILE)) {
            throw new Error(`Master template not found at ${TEMPLATE_FILE}`);
        }

        const template = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
        const compiled = resolveIncludes(template, SRC_DIR);

        fs.writeFileSync(OUTPUT_FILE, compiled, 'utf-8');

        const endTime = process.hrtime.bigint();
        const durationMs = (Number(endTime - startTime) / 1e6).toFixed(2);
        const timestamp = new Date().toLocaleTimeString();

        console.log(`\x1b[32m✔ [${timestamp}] Built index.html successfully (${durationMs}ms)\x1b[0m`);
    } catch (err) {
        console.error(`\x1b[31m✖ Build failed:\x1b[0m`, err.message);
    }
}

// Watch mode
if (process.argv.includes('--watch') || process.argv.includes('-w')) {
    console.log(`\x1b[36m👀 Watching src/ for changes... Press Ctrl+C to stop.\x1b[0m`);
    build();

    let debounceTimer = null;
    fs.watch(SRC_DIR, { recursive: true }, (eventType, filename) => {
        if (!filename || filename.startsWith('.')) return;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            console.log(`\x1b[33m⚡ File changed:\x1b[0m ${filename} — rebuilding...`);
            build();
        }, 100);
    });
} else {
    build();
}
