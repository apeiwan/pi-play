#!/usr/bin/env node
require('shelljs/global');
const path = require('path');
const config = require('./config')
const ora = require('ora')
const dist = path.resolve(process.cwd(), 'site');

const oraText = 'Upload Web Docs File';
const spinner = ora(oraText).start();
if (exec(`scp -r  ${dist}/** ${config.server.docs}`).code === 0) {
  spinner.succeed(oraText);
} else {
  spinner.fail(oraText);
}
