const path = require('path')
const fs = require('fs')

function obj2Arr(obj, ignoreKeys = []) {
  let arr = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && ignoreKeys.indexOf(key) === -1) {
      arr.push({
        key: key,
        value: obj[key]
      })
    }
  }
  return arr
}

module.exports = api => {
  const { paths, log } = api
  return class Generator extends api.Generator {
    constructor(args, options) {
      super(args, options)
    }

    writing() {
      let configPath = path.resolve(paths.cwd, 'config.js')
      let isExist = fs.existsSync(configPath)
      if (isExist) {
        let oldConfig = require(configPath)

        let aliasList = obj2Arr(oldConfig.alias, ['packages'])
        let chunks = obj2Arr(oldConfig.chunks)

        this.fs.copyTpl(
          this.templatePath('umirc.js.tpl'),
          path.join(paths.cwd, `umirc.js`),
          {
            inputPath: oldConfig.inputPath,
            proxy: JSON.stringify(oldConfig.proxy),
            alias: aliasList,
            chunks: chunks
          },
        )

        this.fs.copyTpl(
          this.templatePath('env.tpl'),
          path.join(paths.cwd, `.env`),
          {},
        )

        this.fs.copyTpl(
          this.templatePath('env.tpl'),
          path.join(paths.cwd, `.env`),
          {},
        )

        this.fs.copyTpl(
          this.templatePath('eslintrc.tpl'),
          path.join(paths.cwd, `.eslintrc`),
          {},
        )
      } else {
        log.error('当前目录不存在 config.js 配置')
      }
    }
  }
}
