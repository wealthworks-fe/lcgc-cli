{
  "name": "umi-demo",
  "version": "1.0.0",
  "description": "项目介绍",
  "scripts": {
    "start": "umi dev",
    "build:dev": "cross-env UPLOAD_CDN=none umi build",
    "build": "umi build",
    "lint": "umi-lint --eslint pages",
    "precommit": "umi-lint --staged --eslint  --prettier --fix"
  },
  "dependencies": {
    "@lcgc/fe-package": "git+ssh://git@git.lcgc.work:fe/node-support/fe-package.git#0.2.0",
    "antd-mobile": "^2.3.1",
    "axios": "^0.19.0",
    "clipboard": "^2.0.4",
    "dayjs": "^1.8.17",
    "is_js": "^0.9.0",
    "lodash": "^4.17.15",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "reset-css": "^5.0.1"
  },
  "devDependencies": {
    "cross-env": "^6.0.3",
    "umi": "^2.12.5",
    "umi-lint": "^2.0.2",
    "umi-plugin-cdn": "^1.1.0",
    "umi-plugin-mpa-pug": "^0.3.0",
    "umi-plugin-react": "^1.14.8"
  },
  "keywords": [],
  "author": "zhongxia",
  "license": "ISC"
}
