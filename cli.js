#!/usr/bin/env node

process.env.UMI_PLUGINS = require.resolve("./plugin");

console.log("hello lcgc");

// 基于 umi 的命令进行封装
const umiBinPath = require.resolve("umi/bin/umi");

require("child_process").fork(umiBinPath, process.argv.slice(2), {
  stdio: "inherit"
});
