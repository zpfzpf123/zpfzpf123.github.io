---
title: vue2+Datav实现表格上下无缝滚动
createTime: 2025/02/26 13:54:27
tags:
  - vue2
  - 前端
  - 滚动表格
permalink: /article/gvsot4uv/
---
# 使用 DataV 组件的 Vue.js 项目配置及使用说明文档

## 一、组件引入与注册
### 1. 安装 DataV 组件
在 Vue 项目中引入 DataV 组件，通过 npm 进行安装，命令如下：
```
npm install @jiaminghi/data-view
```
### 2. 在 main.js 中注册为全局组件
```javascript
// 导入 @jiaminghi/data-view 组件库，dataV 为导入的对象
import dataV from '@jiaminghi/data-view'
// 使用 Vue.use() 方法将 dataV 组件库中的所有组件注册为全局组件
// 这样在整个 Vue 项目中都可以直接使用 DataV 组件
Vue.use(dataV)
```

## 二、使用 DataV 组件的 Vue 文件代码
### 1. 模板（template）部分
```html
<template>
  <!-- 定义一个 div 元素，作为容器，id 为 the-homework-table -->
  <div id="the-homework-table">
    <!-- 使用 DataV 组件中的 dv-scroll-board 组件 -->
    <!-- :config 绑定了名为 config 的数据属性，用于配置 dv-scroll-board 组件 -->
    <!-- style 属性设置了组件的宽度和高度为 100%，使其占满父容器 -->
    <dv-scroll-board
      :config="config"
      style="width: 100%; height: 100%"
    />
  </div>
</template>
```
### 2. 脚本（script）部分
```javascript
<script>
export default {
    // 定义组件的数据属性
    data() {
        return {
            // config 对象，用于配置 dv-scroll-board 组件
            config: {
                // header 数组，定义表格的表头内容，这里只有一个元素 "时间"
                header: [
                    "时间",
                ],
                // data 数组，包含表格的行数据，这里有多个相同时间的行数据示例
                data: [
                    [
                        "2022/11/3 07:45:30",
                    ],
                    [
                        "2022/11/3 07:45:30",
                    ],
                    [
                        "2022/11/3 07:45:30",
                    ],
                    [
                        "2022/11/3 07:45:30",
                    ],
                    [
                        "2022/11/3 07:45:30",
                    ],
                    [
                        "2022/11/3 07:45:30",
                    ],
                    [
                        "2022/11/3 07:45:30",
                    ],
                    [
                        "2022/11/3 07:45:30",
                    ],
                    [
                        "2022/11/3 07:45:30",
                    ],
                    [
                        "2022/11/3 07:45:30",
                    ],
                    [
                        "2022/11/3 07:45:30",
                    ],
                ],
                // index 属性设置为 true，表示在表格中增加序号显示
                index: true,
                // rowNum 属性设置为 10，表示当表格行数超过 10 行时启动无缝滚动
                rowNum: 10,
            },
        };
    },
};
</script>
```
### 3. 样式（style）部分
```css
<style lang="less" scoped>
// 选择 id 为 the-homework-table 的元素，设置其宽度和高度为 100%
#the-homework-table {
    width: 100%;
    height: 100%;
}
// 使用深度选择器 /deep/，选择 dv-scroll-board 组件的 header 元素，设置字体大小为 25px
/deep/ .dv-scroll-board .header {
    font-size: 25px;
}
// 使用深度选择器 /deep/，选择 dv-scroll-board 组件的 rows 下的 row-item 元素，设置字体大小为 24px
/deep/ .dv-scroll-board .rows .row-item {
    font-size: 24px;
}
// 使用深度选择器 /deep/，选择 dv-scroll-board 组件的 rows 下的 ceil 元素，设置文本居中对齐
/deep/ .dv-scroll-board .rows .ceil {
    text-align: center;
}
// 使用深度选择器 /deep/，选择 dv-scroll-board 组件的 header 下的 header-item 元素，设置文本居中对齐
/deep/ .dv-scroll-board .header .header-item {
    text-align: center;
}
</style>
```

## 三、组件属性说明
| 属性名 | 所属组件 | 类型 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| config | dv-scroll-board | Object | 无 | 用于配置 dv-scroll-board 组件的对象，包含 `header`（表头数组）、`data`（数据数组）、`index`（是否显示序号，布尔值）、`rowNum`（超过多少行启动无缝滚动，数字）等属性 |
| index | config 对象（用于 dv-scroll-board 组件配置） | Boolean | 无 | 表示是否在表格中增加序号显示，设置为 `true` 时显示序号 |
| rowNum | config 对象（用于 dv-scroll-board 组件配置） | Number | 无 | 表示当表格行数超过该数值时启动无缝滚动，这里设置为 `10` |

## 四、组件方法说明
在当前提供的代码中，未涉及到 dv-scroll-board 组件的自定义方法调用，主要是通过配置属性来实现组件的功能展示。如果 DataV 组件库中 dv-scroll-board 组件有其他默认方法，可参考其官方文档进行了解和使用。

以上是关于在 Vue 项目中使用 DataV 组件的详细说明，希望能帮助你更好地理解和应用该组件。 