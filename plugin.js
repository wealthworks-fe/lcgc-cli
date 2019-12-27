/**
 * 在这里注册命令工具需要的插件
 */

module.exports = (api, options = {}) => {
  const { paths } = api;

  // 注册项目初始化命令
  api.registerCommand(
    'init',
    {
      description: 'init project with template',
    },
    (args) => {
      // eslint-disable-next-line
      require('./plugins/command/init')(api, args);
    },
  );

  // 扩展生成器插件注册
  api.registerPlugin({
    id: 'lcgc:command-generate',
    // eslint-disable-next-line
    apply: require('./plugins/generate'),
  });

  // 自动注册多页面插件
  api.registerPlugin({
    id: 'lcgc:mpa', // 插件名称随便，名字唯一即可
    // eslint-disable-next-line
    apply: require('umi-plugin-mpa-pug'),
    opts: {
      pagesPath: paths.pagesPath,
      ...options.mpa,
    },
  });

  // 如果有 cdn 配置，则注册 cdn 插件
  if (options.cdn) {
    // 注册七牛的插件
    api.registerPlugin({
      id: 'lcgc:cdn',
      // eslint-disable-next-line
      apply: require('umi-plugin-cdn'),
      opts: options.cdn,
    });
  }
};
