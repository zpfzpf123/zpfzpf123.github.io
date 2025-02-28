---
title:  vue2+mqtt.js封装
createTime: 2025/02/26 13:48:16
tags:
  - vue2
  - mqtt
  - 前端
permalink: /article/l06dvvcn/
---
# 使用 MQTT.js 的 Vue.js 插件使用说明文档

## 一、插件概述
这是一个使用 MQTT.js 的 Vue.js 插件，允许在 Vue.js 应用中全局使用 MQTT.js。

## 二、安装
首先，需要在项目中安装 MQTT.js，通过 npm 安装的命令如下：
```
npm install mqtt --save
```

## 三、封装插件
### 插件代码及注释
```javascript
// 导入 mqtt 库，使用 * as mqtt 的方式导入所有内容并命名为 mqtt
import * as mqtt from 'mqtt'

// 导出一个插件对象，该对象包含 install 方法用于安装插件
export default {
    install(Vue) {
        // 在 Vue 的原型上添加一个名为 $mqtt 的方法，使得在 Vue 组件中可以使用 this.$mqtt 调用
        Vue.prototype.$mqtt = (url, topics, option) => {
            // 设置 MQTT 客户端的选项，合并默认选项和传入的 option
            // 其中默认选项 reconnectPeriod 表示如果连接断开，客户端将在 1 秒后尝试重新连接
            const options = {
                reconnectPeriod: 1000, 
                ...option
            }

            // 创建一个新的 MQTT 客户端并连接到指定的服务器，传入服务器 URL 和选项
            const client = mqtt.connect(url, options)

            // 当客户端连接到服务器时的回调函数，打印连接成功消息并订阅主题
            client.on('connect', () => {
                console.log('MQTT client connected')
                // 如果 topics 存在，则遍历并订阅每个主题
                topics && topics.forEach(topic => client.subscribe(topic))
            })

            // 当客户端遇到错误时的回调函数，打印错误消息
            client.on('error', (error) => {
                console.error('MQTT client encountered an error:', error)
            })

            // 当客户端正在尝试重新连接时的回调函数，打印重新连接消息
            client.on('reconnect', () => {
                console.log('MQTT client is attempting to reconnect')
            })

            // 返回一个对象，包含在 Vue 组件中可使用的方法
            return {
                // 收到消息时的回调函数，设置当收到消息时执行的回调
                message: (callback) => {
                    client.on('message', (topic, message) => {
                        callback(topic, message.toString())
                    })
                },
                // 发送消息的方法，向指定主题发送消息并在发送后执行回调
                publish: function(topic, message, callback) {
                    client.publish(topic, message)
                    callback()
                },

                // 关闭客户端的方法，关闭客户端并在关闭后执行回调
                end: callback => {
                    client.end()
                    callback()
                }
            }
        }
    }
}
```
将上述代码保存为 `mqttPlugin.js` 文件，并放在项目的 `src/plugins` 目录下。

## 四、插件使用
### 1. `$mqtt` 方法参数说明
| 参数名 | 类型 | 描述 |
| ---- | ---- | ---- |
| url | String | MQTT 服务器的 URL |
| topics | Array | 一个数组，包含想要订阅的主题 |
| option | Object | 一个对象，包含 MQTT 客户端的选项，会和默认选项合并，默认选项有 `reconnectPeriod: 1000`（连接断开时 1 秒后尝试重连） |

### 2. `$mqtt` 方法返回对象的方法说明
| 方法名 | 参数 | 描述 |
| ---- | ---- | ---- |
| message | callback（Function，接受 topic 和 message 两个参数，topic 为主题，message 为消息内容字符串格式） | 设置一个回调函数，当收到任何主题的消息时，该回调函数会被调用 |
| publish | topic（String，目标主题）<br> message（String，要发送的消息）<br> callback（Function，发送消息后的回调函数） | 向指定主题发送一个消息，然后调用回调函数 |
| end | callback（Function，关闭客户端后的回调函数） | 关闭 MQTT 客户端，然后调用回调函数 |

## 五、使用示例
### 示例代码
```html
<template>
  <div>
    <button @click="connect">Connect</button>
    <button @click="sendMessage">Send Message</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            mqttClient: null
        }
    },
    methods: {
        connect() {
            // 使用 $mqtt 方法创建 MQTT 客户端并连接到指定服务器，订阅 topic1 和 topic2
            this.mqttClient = this.$mqtt('mqtt://test.mosquitto.org', ['topic1', 'topic2'])

            // 设置收到消息时的回调函数，打印收到的消息
            this.mqttClient.message((topic, message) => {
                console.log(`Received message on ${topic}: ${message}`)
            })
        },
        sendMessage() {
            // 使用 publish 方法向 topic1 发送消息，并在发送后打印消息发送成功的日志
            this.mqttClient.publish('topic1', 'Hello, MQTT!', () => {
                console.log('Message sent')
            })
        },
        disconnect() {
            // 使用 end 方法关闭 MQTT 客户端，并在关闭后打印客户端断开连接的日志
            this.mqttClient.end(() => {
                console.log('MQTT client disconnected')
            })
        }
    },
    beforeDestroy() {
        // 在组件销毁时调用 disconnect 方法关闭 MQTT 客户端
        this.disconnect()
    },
}
</script>
```
在这个示例中，点击 “Connect” 按钮创建新的 MQTT 客户端并连接到服务器；点击 “Send Message” 按钮向 `topic1` 发送消息；在组件销毁时（离开当前页面路由）断开 MQTT 客户端的连接。 