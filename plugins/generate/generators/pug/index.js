const { join, basename } = require('path')
const randomColor = require('random-color')
const assert = require('assert')
const chalk = require('chalk')

module.exports = api => {
  const { paths, log } = api

  return class Generator extends api.Generator {
    constructor(args, options) {
      super(args, options)

      assert(
        typeof this.args[0] === 'string',
        `
${chalk.underline.cyan('name')} should be supplied
Example: 
  umi g pug users
        `.trim(),
      )
    }

    writing() {
      const path = this.args[0].toString()
      const jsxExt = this.isTypeScript ? 'tsx' : 'jsx'
      const context = {
        name: basename(path),
        color: randomColor().hexString(),
        isTypeScript: this.isTypeScript,
        jsxExt
      }

      this.fs.copyTpl(
        this.templatePath('page.js.tpl'),
        join(paths.absPagesPath, `${path}.${jsxExt}`),
        context,
      )
      this.fs.copyTpl(
        this.templatePath('page.less.tpl'),
        join(paths.absPagesPath, `${path}.less`),
        context,
      )
      this.fs.copyTpl(
        this.templatePath('page.pug.tpl'),
        join(paths.absPagesPath, `${path}.pug`),
        context,
      )

      log.warn('Ignore the warning message above，because pug is a mpa page')
      if (api.restart) {
        api.restart('add new pages, restart dev server')
      } else {
        log.warn('api.restart is not exist, must restart dev server')
      }
    }
  }
}
