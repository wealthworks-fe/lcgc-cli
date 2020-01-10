const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ejs = require('ejs');
const log = require('./log');

/**
 * 使用 ejs 渲染模板，并生成到指定目录
 * @param {string} source 文件模板
 * @param {string} dest 目标地址
 * @param {object} context 文件模板数据
 */
exports.copyTpl = (source, dest, context = {}) => {
  ejs.renderFile(source, context, (err, str) => {
    if (err) {
      log.error(err);
      return;
    }
    const pathInfo = path.parse(dest);
    const destDir = path.resolve(process.cwd(), pathInfo.dir);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    if (fs.existsSync(dest)) {
      log.info(`文件已存在：${chalk.green(dest)}`);
      return;
    }
    fs.writeFile(path.resolve(dest), str, 'utf8', (err1) => {
      if (err1) {
        log.error(err1);
        return;
      }
      log.success(`create file ${chalk.green(dest)}`);
    });
  });
};

/**
 * 复制目录、子目录，及其中的文件
 * @param {string} src  要复制的目录
 * @param {string} dist  复制到目标目录
 */
function copyDir(src, dist, callback = () => {}) {
  if (fs.existsSync(dist)) {
    log.error(`目录已存在：${dist}`);
    return;
  }

  function subCopy(err, subSrc, subDist) {
    if (err) {
      callback(err);
    } else {
      fs.readdir(subSrc, (err1, filePaths) => {
        if (err1) {
          callback(err1);
        } else {
          filePaths.forEach((filePath) => {
            const fileSrc = `${subSrc}/${filePath}`;
            const fileDest = `${subDist}/${filePath}`;
            fs.stat(fileSrc, (err2, stat) => {
              if (err2) {
                callback(err2);
              } else if (stat.isFile()) {
                // 判断是文件还是目录
                fs.writeFileSync(fileDest, fs.readFileSync(fileSrc));
              } else if (stat.isDirectory()) {
                // 当是目录是，递归复制
                copyDir(fileSrc, fileDest, callback);
              }
            });
          });
        }
      });
    }
  }

  fs.access(dist, (err) => {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist, { recursive: true });
    }
    subCopy(null, src, dist);
  });
  log.success(`create dir ${dist}`);
}
exports.copyDir = copyDir;
