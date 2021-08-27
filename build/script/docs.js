#!/usr/bin/env node
require('shelljs/global');
const help = require('../help')

exec(`${help.crossEnv('COMPILE_MODE', 'docs')} && vant-cli build-site`)
