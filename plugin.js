/**
 * 在这里注册命令工具需要的插件
 */
const DEFAULT_CONFIG = {
  hash: true, // 生成的文件名加上 hash
  disableCSSModules: true, //不使用 CSS Module 否则需要改代码
  treeShaking: true,
  targets: {
    browsers: [
      "last 2 versions",
      "Firefox ESR",
      "> 1%",
      "ie >= 9",
      "iOS >= 8",
      "Android >= 4"
    ]
  }
};

module.exports = (api, options = { mpa: {}, cdn: {} }) => {
  let { config } = api;
  // 增加一些默认配置
  config = Object.assign(DEFAULT_CONFIG, config);

  // 生成器插件注册
  api.registerPlugin({
    id: "lcgc:generate",
    apply: require("./plugins/generate"),
    opts: options.generate
  });

  // 注册插件
  api.registerPlugin({
    id: "lcgc:mpa", // 插件名称随便，名字唯一即可
    apply: require("umi-plugin-mpa-pug"),
    opts: {
      pagesPath: "pages",
      ...options.mpa
    }
  });

  // 注册七牛的插件
  api.registerPlugin({
    id: "lcgc:cdn",
    apply: require("umi-plugin-cdn"),
    opts: options.cdn
  });
};
