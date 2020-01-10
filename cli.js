#!/usr/bin/env node

const commander = require('commander');

const program = new commander.Command();

program.version('0.0.1');

program
  .command('init')
  .description('init project with template')
  .action(require('./commands/init'));

program
  .command('generate [type] [dest]')
  .alias('g')
  .description('generate normal page base code')
  .action((type, dest) => {
    // eslint-disable-next-line global-require
    require('./commands/generate')(type, dest);
  });

program.parse(process.argv);

// 未录入消息，默认输出 help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
