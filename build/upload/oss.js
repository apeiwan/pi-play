#!/usr/bin/env node
require('shelljs/global');
const OSS = require('ali-oss');
const fs = require('fs');
const config = require('./config')

const ossConfig = config.oss;

module.exports = function (params) {
  const {prefix, dist} = params;

  const client = new OSS({
    region: ossConfig.REGION, // bucket所在的区域， 默认oss-cn-hangzhou。
    accessKeyId: ossConfig.ACCESSKEYID,
    accessKeySecret: ossConfig.ACCESSKEYSECRET,
    bucket: ossConfig.BUCKET,
  });

  const putOSSAry = [];

  function addFileToOSSSync(src, dist) {
    const docs = fs.readdirSync(src);
    docs.forEach(function (doc) {
      const _src = src + '/' + doc;
      const _dist = dist + '/' + doc;
      const st = fs.statSync(_src);
      if (st.isFile() && doc !== '.DS_Store') {
        putOSSAry.push(client.put(_dist, _src))
      }
      // 如果是目录则递归调用自身
      else if (st.isDirectory()) {
        addFileToOSSSync(_src, _dist);
      }
    })
  }

  addFileToOSSSync(dist, prefix);


  return putOSSAry;
}

