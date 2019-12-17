const { join, basename } = require("path");
const randomColor = require("random-color");
const assert = require("assert");
const chalk = require("chalk");

module.exports = api => {
  const { paths, config, log } = api;
  return class Generator extends api.Generator {
    constructor(args, options) {
      super(args, options);

      assert(
        typeof this.args[0] === "string",
        `
${chalk.underline.cyan("name")} should be supplied
Example: 
  umi g page users
        `.trim()
      );
      if (config.routes) {
        log.warn(
          `You should config the routes in config.routes manunally since ${chalk.red(
            "config.routes"
          )} exists`
        );
        console.log();
      }
    }

    writing() {
      const path = this.args[0].toString();
      const jsxExt = this.isTypeScript ? "tsx" : "jsx";
      const context = {
        name: basename(path),
        color: randomColor().hexString(),
        isTypeScript: this.isTypeScript,
        jsxExt
      };

      console.log(context);

      this.fs.copyTpl(
        this.templatePath("page.js.tpl"),
        join(paths.absPagesPath, `${path}.${jsxExt}`),
        context
      );
      this.fs.copyTpl(
        this.templatePath("page.less.tpl"),
        join(paths.absPagesPath, `${path}.less`),
        context
      );
      this.fs.copyTpl(
        this.templatePath("page.pug.tpl"),
        join(paths.absPagesPath, `${path}.pug`),
        context
      );
    }
  };
};
