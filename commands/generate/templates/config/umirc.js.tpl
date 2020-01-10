/**
 * 需要把绝对地址替换成相对地址
 * '/LCGC/npm-package/lcgc-cli/example/pages/common' => path.resolve(__dirname, './common')
 */
module.exports = {
  alias: {
    'packages': '@lcgc/fe-package/lib',
    <% alias.forEach(function(item){ %>
      '<%= item.key %>' : '<%= item.value %>',
    <% }); %>
  },
  proxy: <%- proxy %>,
  plugins: [
    [
      'umi-plugin-mpa-pug',
      {
        selectEntry:true,
        prefixPath: '',
        pagesPath: '<%- inputPath %>',
        commonChunks: {
          <% chunks.forEach(function(item){ %>
            "<%= item.key %>" : "<%= item.value %>",
          <% }); %>
        },
      },
    ],
    [
      'umi-plugin-react',
      {
        antd: true,
        dll: false, // 多页面生成 DLL，如何注入到 HTML 文件中，还需要研究下
        dynamicImport: {
          webpackChunkName: true,
        },
      },
    ],
    [
      'umi-plugin-cdn',
      {
        cdn: 'aliyun', // qiniu
        publicPath: process.env.PUBLIC_PATH,
        config: {
          accessKey: process.env.ALIYUN_AK,
          secretKey: process.env.ALIYUN_SK,
          bucket: process.env.ALIYUN_BUCKET,
          region: process.env.ALIYUN_REGION,
          exclude: /\.html$/,
        },
      },
    ],
  ],
};
