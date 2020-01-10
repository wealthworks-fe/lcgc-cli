const chalk = require('chalk');

module.exports = {
  info: (msg) => {
    console.log(`${chalk.blue('[info]:')}`, msg);
  },
  error: (msg) => {
    console.log(`${chalk.red('[error]:')} ${msg}`);
  },
  success: (msg) => {
    console.log(`${chalk.green('[success]:')} ${msg}`);
  },
};
