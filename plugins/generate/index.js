const { readdirSync } = require("fs");

module.exports = api => {
  // 遍历generators，注册模板代码生成
  readdirSync(`${__dirname}/generators`)
    .filter(file => !file.startsWith("."))
    .forEach(file => {
      api.registerGenerator(file, {
        // eslint-disable-next-line import/no-dynamic-require
        Generator: require(`./generators/${file}`)(api),
        resolved: `${__dirname}/generators/${file}/index`
      });
    });
};
