---
title: vue2+增加音效+自动播放
createTime: 2025/02/27 10:15:47
tags: 
  - vue2
  - 媒体
  - 前端
permalink: /article/2gnbms9u/
---
# 在 Vue 页面中使用音频及浏览器自动播放设置说明文档

## 简介
本说明文档主要介绍如何在 Vue 页面中添加 `audio` 元素，并实现音频的控制播放，同时针对 Chrome 和 Edge 浏览器，提供使视频（音频同理）不静音自动播放的设置方法。

## 核心功能
1. **在 Vue 页面添加音频元素**：通过在模板中使用 `audio` 标签引入音频文件。
2. **控制音频播放**：在 Vue 组件的脚本部分编写代码实现音频的播放控制。
3. **浏览器自动播放设置**：针对 Chrome 和 Edge 浏览器，提供特定的设置步骤，使音频能够不静音自动播放。

## 快速入门
### 代码名称及建议目录
1. **代码名称**：Vue 音频播放相关代码
2. **建议目录**：将音频文件与 Vue 文件放在同级目录，方便管理和引用。
![vue2+增加音效+自动播放1.png](image/vue2%2B%E5%A2%9E%E5%8A%A0%E9%9F%B3%E6%95%88%2B%E8%87%AA%E5%8A%A8%E6%92%AD%E6%94%BE1.png)
### 完整代码示例
1. **在 Vue 模板中添加 audio 元素**
```vue
<template>
  <div>
    <audio v-show="false" ref="audio" src="音频.mp3"></audio>
  </div>
</template>
```
这里使用 `v-show="false"` 隐藏音频元素，`ref="audio"` 为后续获取该元素做准备，`src="音频.mp3"` 指定音频文件路径。

2. **在 Vue 组件脚本中控制音频播放**
```vue
<script>
export default {
  methods: {
    playAudio() {
      const audio = this.$refs.audio;
      const audioSrc = require(`./音频.mp3`);
      if (audio) {
        audio.src = audioSrc;
        audio.load();
        try {
          audio.play();
        } catch (error) {
          console.error('音频播放失败:', error);
        }
      }
    }
  }
}
</script>
```
在上述代码中，`playAudio` 方法获取 `audio` 元素引用，通过 `require` 引入音频文件路径，设置 `src` 并加载音频，最后尝试播放音频，若失败则在控制台打印错误信息。

## 方法和事件
### 音频控制相关方法
| 方法名 | 说明 | 参数 | 返回值 |
| ---- | ---- | ---- | ---- |
| require | 在 Vue 项目中引入模块（此处用于引入音频文件） | 音频文件路径 | 音频文件路径的引用 |
| load | 加载音频资源，为播放做准备 | 无 | 无 |
| play | 开始播放音频 | 无 | 无 |

### 音频相关事件（可根据需求进一步完善监听逻辑）
| 事件名 | 说明 | 触发时机 |
| ---- | ---- | ---- |
| play | 当音频开始播放时触发 | 调用 `play` 方法且音频开始播放 |
| pause | 当音频暂停时触发 | 调用 `pause` 方法或用户手动暂停音频 |
| ended | 当音频播放结束时触发 | 音频播放到末尾 |

## 浏览器自动播放设置
### Chrome 浏览器设置
1. **网站设置**：找到浏览器地址栏右侧的锁形图标（网站安全设置图标），点击后会出现一系列设置选项。
   ![vue2+增加音效+自动播放2.png](image/vue2%2B%E5%A2%9E%E5%8A%A0%E9%9F%B3%E6%95%88%2B%E8%87%AA%E5%8A%A8%E6%92%AD%E6%94%BE2.png)
2. **声音设置**：在网站设置弹出框中，找到“声音”选项，将其设置为“允许”。
   ![vue2+增加音效+自动播放3.png](image/vue2%2B%E5%A2%9E%E5%8A%A0%E9%9F%B3%E6%95%88%2B%E8%87%AA%E5%8A%A8%E6%92%AD%E6%94%BE3.png)

### Microsoft Edge 浏览器设置
1. **打开设置**：点击浏览器右上角的三点菜单图标，选择“设置”选项。
  ![vue2+增加音效+自动播放4.png](image/vue2%2B%E5%A2%9E%E5%8A%A0%E9%9F%B3%E6%95%88%2B%E8%87%AA%E5%8A%A8%E6%92%AD%E6%94%BE4.png)
2. **选择 cookie 和网站权限**：在设置页面左侧菜单中，选择“cookie 和网站权限”，然后找到“媒体自动播放”设置项并点击进入。
   ![vue2+增加音效+自动播放5.png](image/vue2%2B%E5%A2%9E%E5%8A%A0%E9%9F%B3%E6%95%88%2B%E8%87%AA%E5%8A%A8%E6%92%AD%E6%94%BE5.png)
3. **设置为允许**：将媒体自动播放设置为“允许（推荐）”。若只想对某些特定网站允许自动播放，可在下方“允许的站点”中添加相应网址。设置完成后刷新页面使设置生效。
   ![vue2+增加音效+自动播放6.png](image/vue2%2B%E5%A2%9E%E5%8A%A0%E9%9F%B3%E6%95%88%2B%E8%87%AA%E5%8A%A8%E6%92%AD%E6%94%BE6.png)

## 最佳实践以及使用示例
1. **结合业务逻辑播放音频**：在实际应用中，可根据业务逻辑，例如用户完成某项操作、系统收到特定通知等场景下触发音频播放。
```vue
<script>
export default {
  methods: {
    handleUserAction() {
      // 用户完成某项操作后播放音频
      this.playAudio();
    },
    playAudio() {
      const audio = this.$refs.audio;
      const audioSrc = require(`./音频.mp3`);
      if (audio) {
        audio.src = audioSrc;
        audio.load();
        try {
          audio.play();
        } catch (error) {
          console.error('音频播放失败:', error);
        }
      }
    }
  }
}
</script>
```
2. **多个音频管理**：如果页面中有多个音频需求，可以使用数组来管理音频元素的引用和播放逻辑。
```vue
<template>
  <div>
    <audio v-for="(item, index) in audioList" :key="index" v-show="false" :ref="'audio' + index" :src="item.src"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audioList: [
        { src: '音频1.mp3' },
        { src: '音频2.mp3' }
      ]
    };
  },
  methods: {
    playAudio(index) {
      const audio = this.$refs[`audio${index}`];
      if (audio) {
        audio.load();
        try {
          audio.play();
        } catch (error) {
          console.error(`音频 ${index} 播放失败:`, error);
        }
      }
    }
  }
}
</script>
```

## 常见问题以及解决办法
1. **音频文件路径错误**：
    - **原因**：音频文件路径不正确，导致无法加载音频。
    - **解决办法**：确保音频文件与 Vue 文件在同级目录，并且路径引用正确。若使用相对路径，注意 `require` 语法的正确使用。例如，`require('./音频.mp3')` 中的 `./` 表示当前目录。
2. **音频播放失败**：
    - **原因**：可能是浏览器不支持音频格式，或者在某些浏览器中自动播放策略限制。
    - **解决办法**：检查音频文件格式是否为常见的浏览器支持格式，如 MP3、WAV 等。对于 Chrome 和 Edge 浏览器，按照上述设置步骤，确保自动播放设置正确。若音频格式不支持，可考虑转换音频格式。
3. **多个音频同时播放冲突**：
    - **原因**：在管理多个音频时，可能没有正确控制播放逻辑，导致多个音频同时播放。
    - **解决办法**：在播放新音频前，暂停其他正在播放的音频。例如，在 `playAudio` 方法中添加逻辑，先获取所有音频元素引用并暂停它们，然后再播放指定音频。
```vue
<script>
export default {
  methods: {
    playAudio(index) {
      // 暂停所有音频
      Object.keys(this.$refs).forEach(key => {
        if (key.startsWith('audio')) {
          this.$refs[key].pause();
        }
      });
      const audio = this.$refs[`audio${index}`];
      if (audio) {
        audio.load();
        try {
          audio.play();
        } catch (error) {
          console.error(`音频 ${index} 播放失败:`, error);
        }
      }
    }
  }
}
</script>
```