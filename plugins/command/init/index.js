const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const shell = require('shelljs');

const GITHUB_URLS = {
  mpa: 'https://git.lcgc.work/fe/template/umi-mpa-template.git',
};

function log(...args) {
  console.log(`${chalk.gray('>')}`, ...args);
}

function success(str) {
  console.log(`${chalk.gray('>')} ${chalk.green(`${str}`)}`);
}

const questions = [
  {
    type: 'input',
    name: 'name',
    message: '请输入项目名称 ?',
    default: 'demo',
  },
];

module.exports = () => {
  // 不存在 git 则报错
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }

  inquirer.prompt(questions).then(async (answers) => {
    const projectPath = path.resolve(answers.name);
    const gitArgs = ['git', 'clone', GITHUB_URLS.mpa, '--depth=1'];
    gitArgs.push(answers.name);

    // 下载模板
    log(`${gitArgs.join(' ')}`);
    if (shell.exec(gitArgs.join(' ')).code !== 0) {
      log('Error: Git clone failed');
      shell.exit(1);
    }

    // 移出模板项目内的 git 记录
    shell.exec(`cd ${projectPath} && rm -rf .git && git init`);

    success('init project success ~');
    console.log();
    success(`cd ${answers.name}`);
    success('npm install');
    success('npm start');
  });
};
