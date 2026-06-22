#!/usr/bin/env node
'use strict';

/**
 * bem-wind — installs the BEM-Wind Claude skill into a .claude/skills directory.
 * Zero dependencies; pure Node (>=16.7 for fs.cpSync).
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const SKILL_NAME = 'bem-wind';
const SKILL_SRC = path.join(__dirname, '..', 'skill', SKILL_NAME);

function usage() {
  console.log(`bem-wind — install the BEM-Wind Claude skill

Usage:
  npx bem-wind add-skill [--global] [--force]

Options:
  -g, --global   Install into ~/.claude/skills (all projects)
                 instead of ./.claude/skills (current project)
  --force        Overwrite an existing install
  -h, --help     Show this help

After installing, ask Claude to style or convert a component,
or invoke the skill explicitly with /bem-wind.`);
}

function addSkill(args) {
  const global = args.includes('--global') || args.includes('-g');
  const force = args.includes('--force');

  if (!fs.existsSync(path.join(SKILL_SRC, 'SKILL.md'))) {
    console.error(`Error: bundled skill not found at ${SKILL_SRC}`);
    process.exit(1);
  }

  const baseDir = global
    ? path.join(os.homedir(), '.claude', 'skills')
    : path.join(process.cwd(), '.claude', 'skills');
  const target = path.join(baseDir, SKILL_NAME);

  if (fs.existsSync(target) && !force) {
    console.error(`Skill already installed at ${target}\nRe-run with --force to overwrite.`);
    process.exit(1);
  }

  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(baseDir, { recursive: true });
  fs.cpSync(SKILL_SRC, target, { recursive: true });

  console.log(`✓ Installed the BEM-Wind skill → ${target}`);
  console.log(
    global
      ? '  Active across all your projects. Invoke it with /bem-wind in Claude Code.'
      : '  Active in this project. Commit .claude/skills/bem-wind to share it with your team.'
  );
}

const argv = process.argv.slice(2);
const cmd = argv[0];

if (!cmd || cmd === '-h' || cmd === '--help' || cmd === 'help') {
  usage();
  process.exit(0);
}

if (cmd === 'add-skill') {
  addSkill(argv.slice(1));
} else {
  console.error(`Unknown command: ${cmd}\n`);
  usage();
  process.exit(1);
}
