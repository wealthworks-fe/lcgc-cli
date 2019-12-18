/**
 * 在这里注册命令工具需要的插件
 */
const DEFAULT_CONFIG = {
  hash: true, // 生成的文件名加上 hash
  disableCSSModules: true, // 不使用 CSS Module 否则需要改代码
  treeShaking: true,
  targets: {
    browsers: [
      'last 2 versions',
      'Firefox ESR',
      '> 1%',
      'ie >= 9',
      'iOS >= 8',
      'Android >= 4'
    ]
  }
}

module.exports = (api, options = {}) => {
  let { log, paths } = api

  // 修改 umi 默认配置
  api.modifyDefaultConfig(memo => {
    return {
      ...DEFAULT_CONFIG,
      ...memo
    }
  })

  // 生成器插件注册
  api.registerPlugin({
    id: 'lcgc:command-generate',
    apply: require('./plugins/generate')
  })

  // 自动注册多页面插件
  log.info(
    `auto register plugin => [umi-plugin-mpa-pug] and pagesPath default 'pages'`,
  )
  api.registerPlugin({
    id: 'lcgc:mpa', // 插件名称随便，名字唯一即可
    apply: require('umi-plugin-mpa-pug'),
    opts: {
      pagesPath: paths.pagesPath,
      ...options.mpa
    }
  })

  // 如果有 cdn 配置，则注册 cdn 插件
  if (options.cdn) {
    log.info(`auto register plugin => [umi-plugin-cdn]`)
    // 注册七牛的插件
    api.registerPlugin({
      id: 'lcgc:cdn',
      apply: require('umi-plugin-cdn'),
      opts: options.cdn
    })
  }
}
