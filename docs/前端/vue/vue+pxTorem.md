---
title: vue+pxTorem
createTime: 2025/02/26 14:56:45
tags:
  - vue2
  - 前端
  - 屏幕自适应
permalink: /article/q9yehoxv/
---
# Vue 项目中 pxToRem 使用说明文档

## 简介
在 Vue 项目里，pxToRem 可助力将像素单位自动转换为 rem 单位，以此实现自适应设计。借助 postcss - pxtorem 插件和动态调整根元素字体大小，能让页面元素依据屏幕尺寸自适应缩放。

## 核心功能
- **自动化转换**：自动把 CSS 里的 px 单位转换为 rem 单位，减少手动计算工作量。
- **自适应布局**：通过动态调整根元素的字体大小，使页面布局能适配不同屏幕尺寸。

## 快速入门

### Vue 2.x
#### 3.1.1 安装插件
安装 `postcss - pxtorem` 插件，此为 PostCSS 插件，用于把 px 单位转换为 rem 单位。使用 npm 进行安装：
```bash
npm install postcss-pxtorem --save-dev
```

#### 3.1.2 配置插件
在 `vue.config.js` 文件中添加配置，以下是完整示例代码：
```javascript
// 引入等比适配插件
const pxToRem = require('postcss-pxtorem');

// 配置基本大小
const postcss = pxToRem({
  rootValue: 36, // 表示根元素字体大小
  propList: ['*'], // 可以从px更改为rem的属性, 通配符 * 表示启用所有属性
  selectorBlackList: ['.norem'] // 过滤掉.norem开头的 class ，不进行rem转换
});

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [postcss]
        },
      }
    }
  },
};
```

#### 3.1.3 动态修改 rem 对应值
创建 `rem.js` 文件，在其中设置基本大小和 rem 函数，再在 `main.js` 中引入。以下是 `rem.js` 的完整示例：
```javascript
// rem.js
(function (doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        // 这里是将屏幕宽度分成10份，1份就是1rem
        // 如果设计稿是750px，那么这里可以设置为75
        // 如果设计稿是640px，可以设置为64
        // 以此类推
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```
在 `main.js` 中引入 `rem.js`：
```javascript
import './path/to/rem.js'; // 确保路径正确
```

#### 3.1.4 使用 pxToRem
在 CSS 里正常使用 px 单位，构建项目时，`postcss - pxtorem` 插件会自动把 px 单位转换为 rem 单位。

### Vue 3.x
#### 3.2.1 安装插件
同样使用 npm 安装 `postcss - pxtorem` 插件：
```bash
npm install postcss-pxtorem --save-dev
```

#### 3.2.2 配置插件
在项目根目录下创建或编辑 `postcss.config.js` 文件，添加如下配置：
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16, // 设计稿的基准大小，通常是设计稿宽度的1/10
      propList: ['*'], // 可以从px更改为rem的属性
      selectorBlackList: ['.norem'] // 过滤掉.norem开头的class，不进行rem转换
    }
  }
};
```

#### 3.2.3 在 Vue 组件中使用 px 单位
在 Vue 组件的 `<style>` 标签里正常使用 px 单位，构建项目时，插件会自动转换。

#### 3.2.4 动态设置根元素字体大小
创建 `rem.js` 文件，内容如下：
```javascript
// rem.js
(function(doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
      };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```

#### 3.2.5 引入 rem.js 到主文件
在入口文件（通常是 `main.js` 或 `main.ts`）中导入 `rem.js` 文件：
```javascript
// main.js 或 main.ts
import './path/to/rem.js'; // 确保路径正确
```

## 方法和事件

### postcss - pxtorem 插件属性
| 属性名 | 类型 | 描述 |
| ---- | ---- | ---- |
| `rootValue` | `number` | 根元素字体大小，作为 px 转换为 rem 的基准值。 |
| `propList` | `string[]` | 可从 px 转换为 rem 的属性列表，`*` 表示所有属性。 |
| `selectorBlackList` | `string[]` | 过滤掉不进行 rem 转换的选择器列表。 |

### rem.js 方法
| 方法名 | 参数 | 返回值 | 描述 |
| ---- | ---- | ---- | ---- |
| `recalc` | 无 | 无 | 根据屏幕宽度动态计算并设置根元素的字体大小。 |

### rem.js 事件
| 事件名 | 触发条件 | 描述 |
| ---- | ---- | ---- |
| `resizeEvt` | 窗口大小改变或屏幕方向改变 | 调用 `recalc` 方法重新计算根元素字体大小。 |
| `DOMContentLoaded` | 文档加载完成 | 调用 `recalc` 方法设置初始的根元素字体大小。 |

## 最佳实践以及使用示例

### 4.1 设计稿为 750px 的 Vue 2.x 项目
在 `vue.config.js` 中设置 `rootValue` 为 36，`rem.js` 里以 750px 为基准计算根元素字体大小。在 CSS 中正常使用 px 单位，如：
```css
/* 在 Vue 组件的 <style> 标签中 */
.box {
  width: 200px;
  height: 100px;
}
```
构建项目后，`postcss - pxtorem` 会自动将其转换为 rem 单位。

### 4.2 设计稿为 1920px 的 Vue 3.x 项目
在 `postcss.config.js` 中设置 `rootValue` 为 16，`rem.js` 里以 1920px 为基准计算根元素字体大小。同样在 CSS 中正常使用 px 单位：
```css
/* 在 Vue 组件的 <style> 标签中 */
.container {
  width: 800px;
  padding: 20px;
}
```
构建时自动转换为 rem 单位。

## 常见问题以及解决办法

### 5.1 转换后的尺寸与预期不符
#### 问题原因
`rootValue` 设置不正确，或者 `rem.js` 中计算根元素字体大小的基准值与设计稿不一致。
#### 解决办法
检查 `rootValue` 是否与设计稿的基准大小匹配，同时确保 `rem.js` 中的计算逻辑正确。

### 5.2 部分元素未进行 rem 转换
#### 问题原因
元素的选择器可能在 `selectorBlackList` 中，或者 `propList` 未包含该元素使用的属性。
#### 解决办法
检查 `selectorBlackList` 和 `propList` 的配置，确保元素的选择器不在黑名单中，且属性在可转换列表里。

### 5.3 旧浏览器不支持 rem 单位
#### 问题原因
rem 单位在一些旧浏览器中存在兼容性问题。
#### 解决办法
可以考虑使用 `px` 和 `rem` 双单位，或者使用 CSS 预处理器（如 Sass、Less）结合媒体查询来实现自适应布局。 