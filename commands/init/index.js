const path = require('path');
const inquirer = require('inquirer');
const shell = require('shelljs');
const ora = require('ora');
const log = require('../../utils/log');

// 模板信息
const GITHUB_URLS = {
  mpa: 'https://git.lcgc.work/fe/template/umi-mpa-template.git',
};

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

    const spinner = ora(`下载项目脚手架模板：${GITHUB_URLS.mpa} `);
    spinner.start();
    // 下载模板
    if (shell.exec(gitArgs.join(' ')).code !== 0) {
      spinner.fail('Error: Git clone failed');
      shell.exit(1);
    }
    spinner.succeed('下载成功~');

    // 移出模板项目内的 git 记录
    shell.exec(`cd ${projectPath} && rm -rf .git && git init`);

    log.success('init project success ~');
    console.log();
    log.success(`cd ${answers.name}`);
    log.success('npm install');
    log.success('npm start');
  });
};
