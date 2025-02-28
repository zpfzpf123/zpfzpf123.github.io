---
title: vue大屏动态配置组件数量、每个组件的占比和位置代码示例
createTime: 2025/02/26 13:51:29
tags:
  - vue2
  - 前端
  - 大屏
permalink: /article/m7kukdok/
---
# Vue 大屏动态配置组件数量、占比和位置的组件使用说明文档

## 一、`BigScreen` 组件代码及注释
### 1. 模板部分
```html
<template>
  <!-- 定义大屏容器的类名为 big-screen -->
  <div class="big-screen">
    <!-- 使用 v-for 指令遍历 screenList 数组，item 为数组中的每个元素，index 为索引 -->
    <!-- :key 用于唯一标识每个元素，提高 Vue 渲染性能 -->
    <!-- :style 绑定 getStyle 方法的返回值，用于设置每个大屏组件的样式 -->
    <!-- 使用插槽，:name 绑定 item.name，以便在父组件中根据名称插入具体内容 -->
    <div v-for="(item, index) in screenList" :key="index" :style="getStyle(item)">
      <slot :name="item.name"></slot>
    </div>
  </div>
</template>
```
### 2. 脚本部分
```javascript
<script>
export default {
    // 组件名称为 BigScreen
    name: 'BigScreen',
    // 定义组件接收的属性
    props: {
        // screenList 属性，类型为数组
        // required: true 表示该属性是必需的
        // default: () => [] 设置默认值为空数组
        screenList: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    // 组件的方法
    methods: {
        // getStyle 方法，接受一个参数 item
        // 用于根据 item 中的信息生成样式对象
        getStyle(item) {
            return {
                // 设置元素的定位为绝对定位
                position: 'absolute',
                // 设置元素的左边距，根据 item.left 计算百分比
                left: `${item.left}%`,
                // 设置元素的上边距，根据 item.top 计算百分比
                top: `${item.top}%`,
                // 设置元素的宽度，根据 item.width 计算百分比
                width: `${item.width}%`,
                // 设置元素的高度，根据 item.height 计算百分比
                height: `${item.height}%`
            }
        }
    }
}
</script>
```
### 3. 样式部分
```css
<style>
// 定义大屏容器的样式
.big-screen {
    // 设置定位为相对定位，作为子元素绝对定位的参考
    position: relative;
    // 设置宽度为 100%，占满父容器宽度
    width: 100%;
    // 设置高度为 100%，占满父容器高度
    height: 100%;
}
</style>
```

## 二、`BigScreen` 组件属性说明
| 属性名 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| screenList | Array | 是 | [] | 一个数组，用于指定大屏组件的个数、每个组件的占比和位置信息，数组中的每个元素是一个对象，包含 `name`（组件名称）、`left`（左边距百分比）、`top`（上边距百分比）、`width`（宽度百分比）、`height`（高度百分比）等属性 |

## 三、`BigScreen` 组件方法说明
| 方法名 | 参数 | 返回值 | 描述 |
| ---- | ---- | ---- | ---- |
| getStyle | item（对象，包含 `left`、`top`、`width`、`height` 等属性） | 一个包含样式信息的对象（`position`、`left`、`top`、`width`、`height` 等样式属性） | 根据传入的 item 对象中的信息，生成一个用于设置大屏组件样式的对象，包括定位、边距和尺寸等样式 |

## 四、使用 `BigScreen` 组件的示例代码及说明
### 1. 示例模板部分
```html
<template>
  <!-- 设置父容器的高度为 100% -->
  <div style="height:100%">
    <!-- 使用 BigScreen 组件，并绑定 screenList 属性 -->
    <big-screen :screen-list="screenList">
      <!-- 使用插槽 #screen1，插入第一个大屏的内容 -->
      <template #screen1>
        <div>第一个大屏内容</div>
      </template>
      <!-- 使用插槽 #screen2，插入第二个大屏的内容 -->
      <template #screen2>
        <div>第二个大屏内容</div>
      </template>
    </big-screen>
  </div>
</template>
```
### 2. 示例脚本部分
```javascript
<script>
// 导入 BigScreen 组件
import BigScreen from './BigScreen.vue'

export default {
    // 父组件名称为 App
    name: 'App',
    // 注册 BigScreen 组件，使其在当前组件中可用
    components: {
        BigScreen
    },
    // 组件的数据属性
    data() {
        return {
            // screenList 数组，包含两个元素，分别描述两个大屏组件的信息
            screenList: [
                { name:'screen1', left: 0, top: 0, width: 50, height: 100 },
                { name:'screen2', left: 50, top: 0, width: 50, height: 100 }
            ]
        }
    }
}
</script>
```
在这个示例中，父组件使用了 `BigScreen` 组件，并传递了 `screenList` 属性，该属性包含了两个大屏组件的位置、大小和内容名称信息。同时，通过插槽 `#screen1` 和 `#screen2` 分别为两个大屏组件插入了具体的内容。 