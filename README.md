# 命令行工具

基于 umi 进行封装的命令行工具，新增一些团队需要的功能。

- 📦 支持快速生成多页面的模板

## 如何使用

```bash
# 安装包
npm install --global @lcgc/cli

# 输出版本号则安装成功
lcgc --version
```

## 如何生成多页面模板

> 实现防线，参照 [umi-build-dev/src/plugins/commands/generate](https://github.com/umijs/umi/tree/db13052359/packages/umi-build-dev/src/plugins/commands/generate)

```bash
# 这样即可, 模板类型为 pug
lcgc g pug event/demo

# 把早期的配置，转成 .umirc.js 配置
lcgc g config

# 修改文件名
mv umirc.js .umirc.js
```
