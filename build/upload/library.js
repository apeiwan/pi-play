#!/usr/bin/env node
require('shelljs/global');
const path = require('path');
const upload = require('./oss')
const ora = require('ora')
const consola = require('consola')
const prefix = process.env.OSS_FILE_PATH;

let tasks = [
  {
    task: function () {
      return upload({
        prefix: prefix + '/assets',
        dist: path.resolve(process.cwd(), 'assets')
      })
    },
    text: 'Upload OSS Assets File'
  },
  {
    task: function () {
      return upload({
        prefix: prefix,
        dist: path.resolve(process.cwd(), 'lib')
      })
    },
    text: 'Upload OSS Script File'
  }
]

async function uploadFiles() {
  for (let i = 0; i < tasks.length; i++) {
    const {task, text} = tasks[i];
    const spinner = ora(text).start();
    try {
      /* eslint-disable no-await-in-loop */
      await task();
      spinner.succeed(text);
    } catch (err) {
      spinner.fail(text);
      console.log(err);
      throw err;
    }
  }
  consola.success('Upload All File Successfully');
  consola.success(`CDN Url:`);
  consola.success(`Script：https://github-npm.apeiwan.com/${prefix}/pi-play.min.js`);
  consola.success(`Styles：https://github-npm.apeiwan.com/${prefix}/index.css`);
}

uploadFiles();
