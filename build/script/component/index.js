#!/usr/bin/env node
require('shelljs/global')
const inquirer = require('inquirer');
const fs = require('fs');
const {pascalCase, kebabCase} = require('case-anything');
const {renderFile} = require('template-file');
const ora = require('ora')

/**
 * 创建目录或文件
 * @param {string} str - 路径
 * @param {string=} data - 如果是创建文件，可以传递文件内容参数
 */
function create(str, data = '') {
  const path = [];
  const arr = str.split("/");
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    path.push(arr[i]);
    const filename = path.join("/");
    // 判断这个文件或文件夹是否存在
    const bln = fs.existsSync(filename);
    if (bln === false) {
      if (i < len - 1) {  // 一定是文件夹
        // console.log("计划创建 " + filename + " 文件夹");
        fs.mkdirSync(filename);
      } else {
        // 判断是文件还是文件夹
        if (arr[i].indexOf(".") > -1) {
          // 如果是文件
          // console.log("创建文件" + filename);
          fs.writeFileSync(filename, data);
        } else {
          // 如果是文件夹
          // console.log("创建文件夹" + filename);
          fs.mkdirSync(filename);
        }
      }
    }
  }
}


/**
 * 判断组件名称是否已存在
 * @param {string} name 组件名称
 * @returns {string|boolean}
 */
function nameValidate(name) {
  const nameList = fs.readdirSync('./src');
  const isExits = nameList.indexOf(name) !== -1;
  if (!name) {
    return '请输入组件名称！'
  } if (isExits) {
    return '该组件已存在，请重新输入！'
  }
  return true
}


;(async () => {
  try {
    let name; let viewportSize;let tips;
    name = await inquirer.prompt({
      type: 'input',
      name: 'value',
      message: '请输入要创建的组件名称(命名规则采用 kebab-case)：',
      validate: (value = '') => nameValidate(value),
    });
    tips = await inquirer.prompt({
      type: 'input',
      name: 'value',
      message: '请输入组件中文名称描述（例如：头部、文本框）：',
    });
    viewportSize = await inquirer.prompt({
      type: 'confirm',
      name: 'value',
      message: '该组件是否有样式？'
    });
    if (viewportSize.value) {
      viewportSize = await inquirer.prompt({
        type: 'list',
        name: 'value',
        message: '请选择组件样式的画布大小',
        choices: [
          {name: '375px', value: 375},
          {name: '750px', value: 750},
          {name: '1080px', value: 1080},
          {name: '1125px', value: 1125}]
      });
    }

    const data = {
      pascalCaseComponentName: pascalCase(name.value),
      kebabCaseComponentName: kebabCase(name.value),
      tips:tips.value,
      viewportSize: viewportSize.value,
    }

    const spinner = ora('create component template').start();

    const createComponentPath = `./src/${data.kebabCaseComponentName}`;

    // component readme.md
    const readme = await renderFile('./build/script/component/template/README.md', data);
    create(`${createComponentPath}/README.MD`, readme)

    // entry export index.js
    const entryJs = await renderFile('./build/script/component/template/index.js', data);
    create(`${createComponentPath}/index.js`, entryJs)

    // component main.vue
    const entryVue = await renderFile('./build/script/component/template/main.vue', data);
    create(`${createComponentPath}/main.vue`, entryVue)

    // img
    const imgJS = await renderFile('./build/script/component/template/img.js', data);
    create(`${createComponentPath}/img.js`, imgJS)

    // demo index.vue
    const demoVue = await renderFile('./build/script/component/template/demo/index.vue', data);
    create(`${createComponentPath}/demo/index.vue`, demoVue)

    // component static dir
    create(`./static/${data.kebabCaseComponentName}`)

    if (data.viewportSize !== false) {
      // component style scss
      const scssFile = await renderFile('./build/script/component/template/index.scss', data);
      create(`${createComponentPath}/index.scss`, scssFile)
    }

    spinner.succeed('create component template');

  } catch (err) {
    console.warn('err:', err)
  }
})();
