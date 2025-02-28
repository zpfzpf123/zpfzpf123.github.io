---
title: zpf-elementui-vue2-plugin
createTime: 2025/02/28 13:30:10
permalink: /zpf-elementui-vue2-plugin/
---

## 介绍
二次封装elementui组件

## 安装教程

1.  安装elementui
```js
npm i element-ui -S
```
2.  安装zpf-element-vue2-plugin
```js
npm i zpf-elementui-plugin
```
3. 安装lodash
```js
npm i --save lodash
```
4.  引入zpf-element-vue2-plugin和elementui
```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import zpfPlugin from "zpf-elementui-plugin/src/index"
import 'zpf-elementui-plugin/src/styles/index.less';
Vue.use(zpfPlugin.install) //注入指令
Vue.use(zpfPlugin.installComponent)
```
5. 指令
```js
v-theme:dark //主题设置暗黑
v-waves //按钮增加波纹效果
```
## 组件文档
### `ElButtonPlus` 组件

#### 一、ElButtonPlus组件
`ElButtonPlus` 是一个基于 Element UI 的扩展按钮组件，它在原有的 `el-button` 基础上增加了工具提示、异步处理、节流和防抖等功能，同时支持自定义图标和主题。

#### 二、使用示例
```vue
<template>
  <div class="el-btn">
    <!-- 普通按钮 -->
    <ElButtonPlus type="primary" @click="handleClick">普通按钮</ElButtonPlus>

    <!-- 带前缀图标的按钮 -->
    <ElButtonPlus type="success" prefixIcon="el-icon-check" @click="handleClick">
      前缀图标按钮
    </ElButtonPlus>

    <!-- 带后缀图标的按钮 -->
    <ElButtonPlus type="warning" suffixIcon="el-icon-close" @click="handleClick">
      后缀图标按钮
    </ElButtonPlus>

    <!-- 带前后缀图标的按钮 -->
    <ElButtonPlus type="info" prefixIcon="el-icon-edit" suffixIcon="el-icon-share" @click="handleClick">
      前后缀图标按钮
    </ElButtonPlus>
    <!-- 使用 icon 属性添加图标 -->
    <el-button-plus icon="edit">icon 属性添加图标</el-button-plus>
    <!-- 同时使用 prefixIcon 和 icon -->
    <el-button-plus icon="delete" suffix-icon="el-icon-share">icon 属性添加图标1</el-button-plus>
    <!-- 防抖按钮 -->
    <ElButtonPlus type="danger" :debounceWait="1000" @click="handleClick">
      防抖按钮 (1秒)
    </ElButtonPlus>

    <!-- 节流按钮 -->
    <ElButtonPlus type="primary" :throttleWait="2000" @click="handleClick">
      节流按钮 (2秒)
    </ElButtonPlus>

    <!-- 带自定义插槽的按钮 -->
    <ElButtonPlus type="warning" @click="handleClick">
      <template #prefixIcon>
        <i class="el-icon-star-on"></i>
      </template>
      带自定义插槽的按钮
      <template #suffixIcon>
        <i class="el-icon-star-off"></i>
      </template>
    </ElButtonPlus>
    <!--异步模拟-->
    <ElButtonPlus type="primary" async @async-click="handleAsyncClick">
      异步按钮
    </ElButtonPlus>
    <!-- 插槽 -->
    <ElButtonPlus>
      <!-- 使用原生 default 插槽 -->
      自定义插槽内容
      <!-- 使用新增的 left-text 插槽 -->
      <template #left-text>
        <span>Before </span>
      </template>
      <!-- 使用新增的 right-icon 插槽 -->
      <template #right-icon>
        <i class="el-icon-arrow-right"></i>
      </template>
    </ElButtonPlus>
    <!-- 基本提示 -->
    <el-button-plus
        tooltip-content="刷新数据"
        tooltip-placement="top"
    >
      <i class="el-icon-refresh" slot="icon" />
      tooltip提示
    </el-button-plus>
    <el-button-plus v-waves type="primary">波纹按钮</el-button-plus>
  </div>
</template>
<script>
  import ElButtonPlus from "@/components/button/elButtonPlus.vue";

  export default {
    name: "elButtonDemo",
    components: {ElButtonPlus},
    methods: {
      handleClick() {
        console.log("按钮被点击了");
      },
      handleAsyncClick({event, done}) {
        setTimeout(() => {
          done();
          console.log("异步按钮被点击了");
        }, 2000);
      }
    }
  }
</script>

<style scoped lang="less">
  /* 自定义主题样式 */
  .btn-theme-dark {
    background-color: #333 !important;
    color: #fff !important;
  }

  .btn-theme-dark:hover {
    background-color: #555 !important;
  }

  .el-btn {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
</style>
```

#### 三、Props 属性说明

1. `tooltipContent`
当需要为按钮添加工具提示时，可使用 `tooltipContent` 属性。
```vue
<ElButtonPlus tooltipContent="这是一个工具提示">带工具提示的按钮</ElButtonPlus>
```

2. `tooltipPlacement`
若要改变工具提示的显示位置，可设置 `tooltipPlacement` 属性。
```vue
<ElButtonPlus tooltipContent="这是一个工具提示" tooltipPlacement="top">带顶部工具提示的按钮</ElButtonPlus>
```

3. `tooltipEffect`
通过 `tooltipEffect` 属性可以更改工具提示的主题样式。
```vue
<ElButtonPlus tooltipContent="这是一个工具提示" tooltipEffect="light">带浅色工具提示的按钮</ElButtonPlus>
```

4. `async`
当需要按钮具备异步处理功能时，将 `async` 属性设为 `true`。
```vue
<ElButtonPlus async @async-click="handleAsyncClick">异步按钮</ElButtonPlus>
```

5. `prefixIcon`
使用 `prefixIcon` 属性为按钮添加前缀图标。
```vue
<ElButtonPlus prefixIcon="el-icon-search">带前缀图标的按钮</ElButtonPlus>
```

6. `suffixIcon`
借助 `suffixIcon` 属性为按钮添加后缀图标。
```vue
<ElButtonPlus suffixIcon="el-icon-arrow-right">带后缀图标的按钮</ElButtonPlus>
```

7. `throttleWait`
若要对按钮点击进行节流处理，可设置 `throttleWait` 属性（`async` 需为 `true`）。
```vue
<ElButtonPlus async throttleWait="500" @async-click="handleAsyncClick">节流异步按钮</ElButtonPlus>
```

8. `debounceWait`
当需要对按钮点击进行防抖处理时，设置 `debounceWait` 属性（`async` 需为 `true`）。
```vue
<ElButtonPlus async debounceWait="500" @async-click="handleAsyncClick">防抖异步按钮</ElButtonPlus>
```


9. `icon`
通过 `icon` 属性为按钮添加图标。
```vue
<ElButtonPlus icon="edit">带图标的按钮</ElButtonPlus>
```

##### Props 属性表格
| 属性名 | 类型 | 默认值 | 可选值 | 说明 |
| ---- | ---- | ---- | ---- | ---- |
| `tooltipContent` | `String` | `''` | - | 工具提示的内容，当该属性有值时，按钮会包裹在 `el-tooltip` 组件中显示工具提示。 |
| `tooltipPlacement` | `String` | `'bottom'` | `'top'`, `'top-start'`, `'top-end'`, `'bottom'`, `'bottom-start'`, `'bottom-end'`, `'left'`, `'left-start'`, `'left-end'`, `'right'`, `'right-start'`, `'right-end'` | 工具提示的显示位置。 |
| `tooltipEffect` | `String` | `'dark'` | `'dark'`, `'light'` | 工具提示的主题样式。 |
| `async` | `Boolean` | `false` | - | 是否启用异步处理，当为 `true` 时，按钮点击会触发 `async-click` 事件，并显示加载状态。 |
| `prefixIcon` | `String` | `null` | - | 按钮前缀图标的类名。 |
| `suffixIcon` | `String` | `null` | - | 按钮后缀图标的类名。 |
| `throttleWait` | `Number` | `0` | - | 节流等待时间（毫秒），当 `async` 为 `true` 且 `throttleWait` 大于 0 时，按钮点击会进行节流处理。 |
| `debounceWait` | `Number` | `0` | - | 防抖等待时间（毫秒），当 `async` 为 `true` 且 `debounceWait` 大于 0 时，按钮点击会进行防抖处理。 |
| `icon` | `String` | `null` | - | 按钮图标的类名，会自动添加 `el-icon-` 前缀。 |

#### 四、方法说明

1. `_emitClick(e)`
触发 `click` 事件。
```javascript
methods: {
  handleClick(e) {
    this._emitClick(e);
  }
}
```

2. `debounceHandler(e)`
防抖处理函数，当 `async` 为 `true` 且 `debounceWait` 大于 0 时，按钮点击会调用该函数进行防抖处理。
```vue
<ElButtonPlus async debounceWait="500" @async-click="handleAsyncClick">防抖异步按钮</ElButtonPlus>
```

3. `throttleHandler(e)`
节流处理函数，当 `async` 为 `true` 且 `throttleWait` 大于 0 时，按钮点击会调用该函数进行节流处理。
```vue
<ElButtonPlus async throttleWait="500" @async-click="handleAsyncClick">节流异步按钮</ElButtonPlus>
```

4. `handleClick(e)`
按钮点击事件处理函数，根据 `async`、`debounceWait` 和 `throttleWait` 的值进行不同的处理。
```vue
<ElButtonPlus @click="handleClick">普通按钮</ElButtonPlus>
<ElButtonPlus async @async-click="handleAsyncClick">异步按钮</ElButtonPlus>
```

##### 方法表格
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| `_emitClick(e)` | 触发 `click` 事件。 | `e`：点击事件对象。 |
| `debounceHandler(e)` | 防抖处理函数，当 `async` 为 `true` 且 `debounceWait` 大于 0 时，按钮点击会调用该函数进行防抖处理。 | `e`：点击事件对象。 |
| `throttleHandler(e)` | 节流处理函数，当 `async` 为 `true` 且 `throttleWait` 大于 0 时，按钮点击会调用该函数进行节流处理。 | `e`：点击事件对象。 |
| `handleClick(e)` | 按钮点击事件处理函数，根据 `async`、`debounceWait` 和 `throttleWait` 的值进行不同的处理。 | `e`：点击事件对象。 |
#### 五、最终效果
![el-button-plus.png](https://github.com/zpfzpf123/images/blob/master/el-button-plus.png?raw=true)