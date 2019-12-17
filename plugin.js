/**
 * 在这里注册命令工具需要的插件
 */
module.exports = (api, options = { mpa: {}, cdn: {} }) => {
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
