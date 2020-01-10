const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const randomColor = require('random-color');
const { copyTpl, copyDir } = require('../../utils/copy');
const log = require('../../utils/log');

const questions = [
  {
    type: 'list',
    name: 'type',
    message: '请选择生成的模板类型 ?',
    choices: ['page', 'spa-page', 'config'],
  },
  {
    type: 'confirm',
    name: 'typescript',
    message: '是否使用 TypeScript ?',
    default: false,
    when: result => result.type !== 'config',
  },
  {
    type: 'input',
    name: 'dest',
    message: '生成目录(当前目录开始算) ?',
    default: 'pages/index',
    when: result => result.type !== 'config',
  },
];

function obj2Arr(obj, ignoreKeys = []) {
  const arr = [];
  Object.keys(obj).forEach((key) => {
    if (ignoreKeys.indexOf(key) !== -1) return;
    arr.push({
      key,
      value: obj[key],
    });
  });
  return arr;
}

/**
 * 根据global-fe 的 config.js，生成新的 .umirc.js
 */
function generatorUmiConfigByOldConfig() {
  const configPath = path.resolve(process.cwd(), 'config.js');
  const isExist = fs.existsSync(configPath);

  if (isExist) {
    // eslint-disable-next-line import/no-dynamic-require , global-require
    const oldConfig = require(configPath);

    const aliasList = obj2Arr(oldConfig.alias, ['packages']);
    const chunks = obj2Arr(oldConfig.chunks);

    copyTpl(
      path.resolve(__dirname, './templates/config/umirc.js.tpl'),
      '.umirc.js',
      {
        inputPath: oldConfig.inputPath,
        proxy: JSON.stringify(oldConfig.proxy),
        alias: aliasList,
        chunks,
      },
    );

    copyTpl(path.resolve(__dirname, './templates/config/env.tpl'), '.env');
    copyTpl(
      path.resolve(__dirname, './templates/config/eslintrc.tpl'),
      '.eslintrc',
    );
    copyTpl(
      path.resolve(__dirname, './templates/config/package.json.tpl'),
      'package.json',
    );
  } else {
    log.error(`当前目录(${chalk.green(process.cwd())})不存在 config.js 配置`);
  }
}

module.exports = () => {
  inquirer.prompt(questions).then((result) => {
    const { type, typescript, dest = '' } = result;
    const jsxExt = typescript ? 'tsx' : 'jsx';

    const context = {
      name: path.basename(dest),
      color: randomColor().hexString(),
      isTypeScript: typescript,
      jsxExt,
    };

    // 日志换行
    console.log();

    switch (type) {
      case 'page':
        copyTpl(
          path.resolve(__dirname, './templates/page/page.js.tpl'),
          `${dest}.${context.jsxExt}`,
          context,
        );
        copyTpl(
          path.resolve(__dirname, './templates/page/page.less.tpl'),
          `${dest}.less`,
          context,
        );
        copyTpl(
          path.resolve(__dirname, './templates/page/page.pug.tpl'),
          `${dest}.pug`,
          context,
        );
        break;
      case 'spa-page':
        copyDir(path.resolve(__dirname, './templates/spa-page'), dest);
        break;
      case 'config':
        generatorUmiConfigByOldConfig(result);
        break;
      default:
        console.log('暂不支持该类型');
        break;
    }
  });
};
