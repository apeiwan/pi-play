#!/usr/bin/env node
require('shelljs/global');
const minimist = require('minimist');
const options = minimist(process.argv.slice(2));
let {content} = options;
exec(`conventional-changelog -p angular ${content ==='file' ? '-i ./CHANGELOG.md -s -r 0' : ''} && git add CHANGELOG.md && cp ./CHANGELOG.md ./docs/changelog.md`)
