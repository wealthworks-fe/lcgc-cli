const path = require('path');
const fs = require('fs');

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

module.exports = (api) => {
  const { paths, log } = api;
  return class Generator extends api.Generator {
    writing() {
      const configPath = path.resolve(paths.cwd, 'config.js');
      const isExist = fs.existsSync(configPath);
      if (isExist) {
        // eslint-disable-next-line import/no-dynamic-require , global-require
        const oldConfig = require(configPath);

        const aliasList = obj2Arr(oldConfig.alias, ['packages']);
        const chunks = obj2Arr(oldConfig.chunks);

        this.fs.copyTpl(
          this.templatePath('umirc.js.tpl'),
          path.join(paths.cwd, 'umirc.js'),
          {
            inputPath: oldConfig.inputPath,
            proxy: JSON.stringify(oldConfig.proxy),
            alias: aliasList,
            chunks,
          },
        );

        this.fs.copyTpl(
          this.templatePath('env.tpl'),
          path.join(paths.cwd, '.env'),
          {},
        );

        this.fs.copyTpl(
          this.templatePath('env.tpl'),
          path.join(paths.cwd, '.env'),
          {},
        );

        this.fs.copyTpl(
          this.templatePath('eslintrc.tpl'),
          path.join(paths.cwd, '.eslintrc'),
          {},
        );
      } else {
        log.error('当前目录不存在 config.js 配置');
      }
    }
  };
};
