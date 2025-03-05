---
title: npm插件发布
createTime: 2025/03/05 10:48:20
tags: 
  - npm
permalink: /article/uope2gbp/
---
# npm 插件发布完整指南
通过本教程，开发者可快速掌握从零发布到持续维护的完整生命周期管理。建议在正式发布前使用 `npm pack` 命令生成本地测试包验证功能完整性。

# 一、环境准备
## 安装 Node.js (需包含 npm)
使用 `node -v` 验证版本 ≥14.x，使用 `npm -v` 查看 npm 版本。

## 注册 npm 账号
官网：https://www.npmjs.com/
推荐方式：使用 `npm adduser` 命令注册

# 二、项目初始化
## （一）创建项目目录
使用 `mkdir my-plugin && cd my-plugin` 创建并进入项目目录。

## （二）初始化 package.json
使用 `npm init -y` 快速生成配置文件。

关键字段说明
```json
{
    "name": "your-unique-package-name", // 全局唯一标识
    "version": "1.0.0", // 遵循语义化版本规范
    "main": "dist/index.js", // 入口文件路径
    "scripts": {
        "build": "webpack --mode production" // 推荐配置构建命令
    }
}
```

# 三、代码开发规范
## （一）创建核心功能文件
```javascript
// src/index.js
function helloPlugin() {
    console.log('Plugin activated!');
}
module.exports = helloPlugin; // 必须导出模块
```

## （二）配置编译工具（以 Webpack 为例）
```javascript
// webpack.config.js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

## 四、发布准备
（一）登录 npm 账号
使用 `npm login` 依次输入账号、密码、邮箱。

（二）处理镜像源（国内用户）
使用 `npm config set registry https://registry.npmjs.org/` 切换到官方源。

（三）版本号管理
遵循语义化版本：主版本号.次版本号.修订号
更新命令：`npm version patch|minor|major`

# 五、发布与维护
（一）执行发布命令
首次发布使用 `npm publish --access public`，首次发布需加 `--access` 参数。

（二）更新版本流程
使用 `npm version patch` 自动升级版本号，然后使用 `npm publish` 发布。

（三）撤销发布（24 小时内有效）
使用 `npm unpublish 包名 --force` 撤销发布。

# 六、最佳实践
（一）文档规范
必须包含：`README.md`（安装 / API / 示例）
推荐添加：`CHANGELOG.md` 记录版本变更

（二）质量保障
使用 `npm test` 执行配置的测试脚本，使用 `npm run lint` 进行代码规范检查。

（三）命名技巧
使用作用域包：`@username/plugin-name` 避免冲突
验证唯一性：通过 `npm search 包名` 验证

# 常见问题排查
| 问题现象 | 解决方案 |
| ---- | ---- |
| ERR! 403 Forbidden | 1. 检查包名是否重复；2. 确认登录状态，使用 `npm whoami` |
| ERR! 404 Not Found | 检查 registry 是否为官方源 |
| 版本冲突 | 使用 `npm view 包名 versions` 查看历史版本 |

# 其他补充
完整示例项目参考：https://github.com/example/npm-plugin-template
推荐工具：
- `np`：增强版发布工具
- `semantic-release`：自动化版本管理  