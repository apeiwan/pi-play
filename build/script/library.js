#!/usr/bin/env node
require('shelljs/global');
const minimist = require('minimist');
const help = require('../help')
const pkg = require('../../package.json')
const config = require('../upload/config')
const MD5 = require('md5.js')
const dayjs = require('dayjs')
const options = minimist(process.argv.slice(2));
let {mode} = options;
let ossFilePath = `${config.name}/${mode}${mode === 'dist' ? '' : `/${mode === 'build' ? (dayjs().format('YYYYMMDDHHmmss')+new MD5().update(Math.random() + '').digest('hex')) : pkg.version}`}`;
exec(`rm -rf assets && ${help.crossEnv('OSS_FILE_PATH', ossFilePath)} && ${help.crossEnv('BUILD_MODE', mode)} && vant-cli build && node ./build/upload/library.js`)
