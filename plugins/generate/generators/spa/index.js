const { join, basename } = require('path');
const randomColor = require('random-color');
const assert = require('assert');
const chalk = require('chalk');

module.exports = (api) => {
  const { paths, log } = api;

  return class Generator extends api.Generator {
    constructor(args, options) {
      super(args, options);

      assert(
        typeof this.args[0] === 'string',
        `
${chalk.underline.cyan('name')} should be supplied
Example:
  umi g spa course
        `.trim(),
      );
    }

    writing() {
      const path = this.args[0].toString();
      const jsxExt = this.isTypeScript ? 'tsx' : 'jsx';
      const context = {
        name: basename(path),
        color: randomColor().hexString(),
        isTypeScript: this.isTypeScript,
        jsxExt,
      };

      this.fs.copyTpl(
        this.templatePath('index.jsx.tpl'),
        join(paths.absSrcPath, `${path}/index.${jsxExt}`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('index.less.tpl'),
        join(paths.absSrcPath, `${path}/index.less`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('index.pug.tpl'),
        join(paths.absSrcPath, `${path}/index.pug`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('api.js.tpl'),
        join(paths.absSrcPath, `${path}/api.js`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('page/about/index.js.tpl'),
        join(paths.absSrcPath, `${path}/page/about/index.js`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('page/about/index.less.tpl'),
        join(paths.absSrcPath, `${path}/page/about/index.less`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('page/home/index.js.tpl'),
        join(paths.absSrcPath, `${path}/page/home/index.js`),
        context,
      );
      this.fs.copyTpl(
        this.templatePath('page/home/index.less.tpl'),
        join(paths.absSrcPath, `${path}/page/home/index.less`),
        context,
      );

      if (api.restart) {
        api.restart('add new pages, restart dev server');
      } else {
        log.warn('api.restart is not exist, must restart dev server');
      }
    }
  };
};
