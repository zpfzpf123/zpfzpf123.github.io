---
title: vue2+websocket
createTime: 2025/02/27 10:08:14
tags: 
  - vue2
  - websocket
  - 前端
permalink: /article/s8hmn15i/
---
# Vue2 WebSocket 插件封装方案使用说明文档

## 一、简介
本方案是基于 Vue2 的 WebSocket 插件完整封装，具备心跳检测、断线重连、全局注册等功能。该封装方案采用面向对象的编程方式，通过 `SocketClient` 类管理 WebSocket 连接，并实现了自动重连、心跳检测等机制。同时，使用全局单例模式，保证整个应用只有一个 WebSocket 连接，方便在多个组件中共享连接状态。

## 二、核心功能
### 2.1 自动重连机制
- 当网络异常断开后，会自动尝试重连。
- 支持设置最大重连次数，默认无限次。
- 重连间隔时间可配置。

### 2.2 智能心跳检测
- 实现双向心跳检测，发送心跳包并接收响应检测。
- 收到任何消息都会重置心跳计时器。
- 心跳间隔时间可配置。

### 2.3 全局单例管理
- 保证整个应用只有一个 WebSocket 连接。
- 通过 Vue 原型链全局访问。
- 支持多页面共享连接状态。

### 2.4 事件驱动架构
- 提供 `on/off` 事件监听接口。
- 支持 `connect`、`message`、`disconnect`、`error` 等标准事件。
- 方便扩展自定义事件。

### 2.5 配置灵活性
- 支持基础地址与路径参数分离。
- 全局默认配置与实例配置合并。
- TypeScript 友好，可自行添加类型声明。

## 三、快速入门
### 3.1 代码名称及建议目录
- **代码名称**：`websocket.js`
- **建议目录**：`src/utils/websocket.js`
  在上述生成的使用说明文档中，已经包含了 `websocket.js` 的完整代码，它在“快速入门”部分的“代码名称及建议目录”之后，对代码的使用步骤进行了详细说明，同时在“方法和事件”“最佳实践以及使用示例”等部分也结合该代码进行了进一步的阐述。以下是 `websocket.js` 的完整代码再次展示，方便你查看：

```js
/**
 * WebSocket 客户端封装类，用于管理 WebSocket 连接，包含重连和心跳机制等功能。
 * @param {String} baseUrl 基础地址（如：ws://your-domain.com ）
 * @param {String} path 路径参数（如：/socket/chat）
 * @param {Object} options 配置项
 * @param {Number} options.reconnectInterval  重连间隔（默认 3000ms）
 * @param {Number} options.heartbeatInterval  心跳间隔（默认 15000ms）
 * @param {Number} options.maxReconnectAttempts  最大重连次数（默认无限次）
 */
class SocketClient {
  constructor(baseUrl, path, options = {}) {
    // 合并配置参数，使用传入的配置覆盖默认配置
    this.config = {
      reconnectInterval: 3000, // 默认重连间隔为 3000 毫秒
      heartbeatInterval: 15000, // 默认心跳间隔为 15000 毫秒
      maxReconnectAttempts: Infinity, // 默认最大重连次数为无限次
     ...options
    };

    // WebSocket 连接状态
    this.status = {
      isConnected: false, // 表示当前是否已连接
      reconnectAttempts: 0, // 记录重连尝试次数
      manuallyClosed: false // 标识是否是手动关闭连接
    };

    // 构造完整 WebSocket URL，去除 baseUrl 末尾的斜杠和 path 开头的斜杠，确保 URL 格式正确
    this.wsUrl = `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

    // 事件监听器存储，使用 Map 容器，键为事件名称，值为存储回调函数的 Set
    this.listeners = new Map();

    // 初始化 WebSocket 连接
    this.initSocket();
  }

  // 初始化 WebSocket 连接
  initSocket() {
    // 创建 WebSocket 实例
    this.ws = new WebSocket(this.wsUrl);
    console.log('WebSocket  连接中...');
    // 绑定 WebSocket 的各种事件处理函数
    this.ws.onopen = () => this.handleOpen();  // 连接打开时处理
    this.ws.onmessage = (e) => this.handleMessage(e);  // 收到消息时处理
    this.ws.onclose = (e) => this.handleClose(e);  // 连接关闭时处理
    this.ws.onerror = (e) => this.handleError(e);  // 发生错误时处理
  }

  // 打开连接处理
  handleOpen() {
    // 标记连接状态为已连接
    this.status.isConnected = true;
    // 重置重连尝试次数为 0
    this.status.reconnectAttempts = 0;
    // 触发 'connect' 事件，通知所有监听该事件的回调函数
    this.emit('connect');
    // 启动心跳机制
    this.startHeartbeat();
  }

  // 消息处理
  handleMessage(e) {
    try {
      console.log(' 收到消息：', e.data);
      // 尝试将接收到的消息数据解析为 JSON 对象
      const data = JSON.parse(e.data);
      // 触发 'message' 事件，将解析后的数据作为参数传递给所有监听该事件的回调函数
      this.emit('message', data);
      // 收到消息后重置心跳计时
      this.resetHeartbeat();
    } catch (error) {
      // 若解析失败，触发 'error' 事件，传递解析失败的错误对象
      this.emit('error', new Error('消息解析失败'));
    }
  }

  // 关闭连接处理
  handleClose(e) {
    // 标记连接状态为未连接
    this.status.isConnected = false;
    // 停止心跳机制
    this.stopHeartbeat();

    if (!this.status.manuallyClosed) {
      // 若不是手动关闭连接，则尝试重连
      this.reconnect();
    }
    // 触发 'disconnect' 事件，将关闭事件对象作为参数传递给所有监听该事件的回调函数
    this.emit('disconnect', e);
  }

  // 错误处理
  handleError(e) {
    // 触发 'error' 事件，将错误事件对象作为参数传递给所有监听该事件的回调函数
    this.emit('error', e);
    // 发生错误时尝试重连
    this.reconnect();
  }

  // 心跳机制实现
  startHeartbeat() {
    // 每隔一定时间（heartbeatInterval）发送一次心跳消息
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: 'heartbeat', timestamp: Date.now() });
    }, this.config.heartbeatInterval);
  }

  resetHeartbeat() {
    // 清除之前的心跳定时器
    clearInterval(this.heartbeatTimer);
    // 重新启动心跳机制
    this.startHeartbeat();
  }

  stopHeartbeat() {
    // 清除心跳定时器，停止心跳机制
    clearInterval(this.heartbeatTimer);
  }

  // 断线重连机制
  reconnect() {
    if (this.status.reconnectAttempts >= this.config.maxReconnectAttempts) return;
    // 重连尝试次数加 1
    this.status.reconnectAttempts++;
    // 经过重连间隔时间后尝试重新连接
    setTimeout(() => {
      if (!this.status.isConnected &&!this.status.manuallyClosed) {
        this.initSocket();
      }
    }, this.config.reconnectInterval);
  }

  // 发送消息
  send(data) {
    if (this.status.isConnected) {
      // 若连接已建立，将数据转换为 JSON 字符串并发送
      this.ws.send(JSON.stringify(data));
    } else {
      // 若未连接，提示消息发送失败
      console.warn('WebSocket  未连接，消息发送失败');
    }
  }

  // 主动关闭连接
  close() {
    // 标记为手动关闭连接
    this.status.manuallyClosed = true;
    // 关闭 WebSocket 连接
    this.ws.close();
  }

  // 事件监听管理
  on(event, callback) {
    if (!this.listeners.has(event)) {
      // 若该事件还没有监听器集合，创建一个新的 Set 来存储回调函数
      this.listeners.set(event, new Set());
    }
    // 将回调函数添加到该事件的监听器集合中
    this.listeners.get(event).add(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      // 从该事件的监听器集合中移除指定的回调函数
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event,...args) {
    if (this.listeners.has(event)) {
      // 遍历该事件的所有回调函数并依次执行，传递相应的参数
      this.listeners.get(event).forEach(cb => cb(...args));
    }
  }
}

// 全局单例模式封装
let instance = null;

export default {
  install(Vue, options) {
    /**
     * 创建 SocketClient 实例，如果实例不存在则创建新实例，若已存在则返回现有实例。
     * @param {String} baseUrl 基础地址
     * @param {String} path 路径参数
     * @param {Object} opts 配置项
     * @returns {SocketClient} SocketClient 实例
     */
    const createInstance = (baseUrl, path, opts) => {
      if (!instance) {
        // 若实例不存在，创建新的 SocketClient 实例
        instance = new SocketClient(baseUrl, path, {...options,...opts });
        // 将实例挂载到 Vue 原型上，方便在组件中使用
        Vue.prototype.$socket = instance;
      }
      return instance;
    };

    // 在 Vue 原型上添加 $initWebSocket 方法，用于初始化 WebSocket 连接
    Vue.prototype.$initWebSocket = (baseUrl, path, opts) => {
      return createInstance(baseUrl, path, opts);
    };
  }
};
```

如果你还有其他疑问或需要进一步的帮助，请随时告诉我。
### 3.2 具体步骤

#### 3.2.1 全局注册插件
在 `main.js` 中进行全局注册，示例代码如下：
```javascript
// main.js
import Vue from 'vue'
// 引入封装的 WebSocket 插件
import WebSocketPlugin from './utils/websocket'

// 使用 Vue.use 方法注册插件，并传入默认配置
Vue.use(WebSocketPlugin, {
  // 默认重连间隔为 5000 毫秒
  reconnectInterval: 5000,
  // 默认心跳间隔为 20000 毫秒
  heartbeatInterval: 20000
})
```

#### 3.2.2 在组件中初始化连接
在组件中使用 `$initWebSocket` 方法初始化连接，并注册事件监听，示例代码如下：
```javascript
export default {
  mounted() {
    // 初始化连接，传入基础地址、路径参数和自定义配置
    this.$initWebSocket(
      'wss://api.example.com', 
      'chat/room123',
      {
        // 最大重连次数为 10 次
        maxReconnectAttempts: 10,
        // 心跳间隔为 15000 毫秒
        heartbeatInterval: 15000
      }
    )

    // 注册事件监听
    this.$socket.on('connect', this.handleConnect)
    this.$socket.on('message', this.handleMessage)
    this.$socket.on('disconnect', this.handleDisconnect)
  },

  methods: {
    handleConnect() {
      console.log('连接成功')
      // 连接成功后发送认证消息
      this.$socket.send({ type: 'auth', token: 'your_token' })
    },

    handleMessage(data) {
      // 处理业务消息 
      if (data.type === 'chat') {
        this.messages.push(data.content)
      }
    },

    handleDisconnect() {
      console.log('连接断开，尝试重连中...')
    }
  },

  beforeDestroy() {
    // 清理事件监听
    this.$socket.off('connect', this.handleConnect)
    this.$socket.off('message', this.handleMessage)
    this.$socket.off('disconnect', this.handleDisconnect)
    
    // 如需主动关闭连接
    // this.$socket.close()
  }
}
```

## 四、方法和事件

### 4.1 `SocketClient` 类的属性
| 属性名 | 类型 | 描述 |
| ---- | ---- | ---- |
| `config` | Object | 配置项，包含 `reconnectInterval`（重连间隔）、`heartbeatInterval`（心跳间隔）、`maxReconnectAttempts`（最大重连次数）等 |
| `status` | Object | 连接状态，包含 `isConnected`（是否已连接）、`reconnectAttempts`（重连尝试次数）、`manuallyClosed`（是否手动关闭连接）等 |
| `wsUrl` | String | 完整的 WebSocket 连接 URL |
| `listeners` | Map | 事件监听器存储，键为事件名称，值为存储回调函数的 Set |
| `ws` | WebSocket | WebSocket 实例 |
| `heartbeatTimer` | Number | 心跳定时器 ID |

### 4.2 `SocketClient` 类的方法
| 方法名 | 参数 | 描述 |
| ---- | ---- | ---- |
| `constructor(baseUrl, path, options)` | `baseUrl`：基础地址；`path`：路径参数；`options`：配置项 | 构造函数，初始化配置、状态、URL 等，并创建 WebSocket 连接 |
| `initSocket()` | 无 | 初始化 WebSocket 连接，绑定各种事件处理函数 |
| `handleOpen()` | 无 | 处理连接打开事件，标记连接状态、重置重连次数、触发 `connect` 事件并启动心跳机制 |
| `handleMessage(e)` | `e`：消息事件对象 | 处理接收到的消息，尝试解析为 JSON 并触发 `message` 事件，解析失败则触发 `error` 事件，同时重置心跳计时 |
| `handleClose(e)` | `e`：关闭事件对象 | 处理连接关闭事件，标记连接状态、停止心跳机制，若不是手动关闭则尝试重连，并触发 `disconnect` 事件 |
| `handleError(e)` | `e`：错误事件对象 | 处理错误事件，触发 `error` 事件并尝试重连 |
| `startHeartbeat()` | 无 | 启动心跳机制，每隔一定时间发送心跳消息 |
| `resetHeartbeat()` | 无 | 重置心跳计时，清除之前的定时器并重新启动心跳机制 |
| `stopHeartbeat()` | 无 | 停止心跳机制，清除心跳定时器 |
| `reconnect()` | 无 | 断线重连机制，若未达到最大重连次数，则在重连间隔时间后尝试重新连接 |
| `send(data)` | `data`：要发送的数据 | 发送消息，若连接已建立则将数据转换为 JSON 字符串发送，否则提示发送失败 |
| `close()` | 无 | 主动关闭连接，标记为手动关闭并关闭 WebSocket 连接 |
| `on(event, callback)` | `event`：事件名称；`callback`：回调函数 | 注册事件监听器 |
| `off(event, callback)` | `event`：事件名称；`callback`：回调函数 | 移除事件监听器 |
| `emit(event, ...args)` | `event`：事件名称；`...args`：传递给回调函数的参数 | 触发事件，执行所有监听该事件的回调函数 |

### 4.3 插件全局方法
| 方法名 | 参数 | 描述 |
| ---- | ---- | ---- |
| `$initWebSocket(baseUrl, path, opts)` | `baseUrl`：基础地址；`path`：路径参数；`opts`：配置项 | 初始化 WebSocket 连接，返回 `SocketClient` 实例 |

### 4.4 事件
| 事件名 | 描述 |
| ---- | ---- |
| `connect` | 连接成功时触发 |
| `message` | 收到消息时触发，回调函数参数为解析后的消息数据 |
| `disconnect` | 连接断开时触发，回调函数参数为关闭事件对象 |
| `error` | 发生错误时触发，回调函数参数为错误对象 |

## 五、最佳实践以及使用示例
### 5.1 发送消息示例
```javascript
this.$socket.send({ type: 'chat', content: 'Hello, World!' });
```

### 5.2 自定义事件监听示例
```javascript
// 注册自定义事件监听
this.$socket.on('customEvent', (data) => {
  console.log('收到自定义事件消息：', data);
});

// 触发自定义事件
this.$socket.emit('customEvent', { message: 'This is a custom event' });
```

## 六、常见问题以及解决办法
### 6.1 连接无法建立
- **可能原因**：基础地址或路径参数错误、服务器未启动、网络问题等。
- **解决办法**：检查基础地址和路径参数是否正确，确保服务器已启动并正常运行，检查网络连接是否正常。

### 6.2 消息发送失败
- **可能原因**：WebSocket 未连接。
- **解决办法**：确保在连接成功后再发送消息，可在 `connect` 事件回调中发送消息。

### 6.3 重连失败
- **可能原因**：达到最大重连次数、服务器异常等。
- **解决办法**：检查最大重连次数配置，若服务器异常，需联系服务器管理员进行排查。

## 七、扩展建议
### 7.1 消息队列增强
在 `send` 方法中添加消息队列，当连接未建立时将消息存入队列，连接成功后再发送队列中的消息，示例代码如下：
```javascript
// 在 SocketClient 类中添加 messageQueue 属性
constructor(baseUrl, path, options = {}) {
  // ...原有逻辑
  this.messageQueue = []; // 消息队列
}

// 修改 send 方法
send(data) {
  if (this.status.isConnected) {
    this.ws.send(JSON.stringify(data));
  } else {
    this.messageQueue.push(data);
    if (this.messageQueue.length > 100) {
      this.messageQueue.shift();
    }
  }
}

// 修改 handleOpen 方法
handleOpen() {
  // ...原有逻辑
  this.flushMessageQueue();
}

// 添加 flushMessageQueue 方法
flushMessageQueue() {
  while (this.messageQueue.length > 0) {
    this.ws.send(JSON.stringify(this.messageQueue.shift()));
  }
}
```

### 7.2 连接状态管理
添加状态枚举，方便管理连接状态，示例代码如下：
```javascript
// 添加状态枚举
const STATUS = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
};

// 在 SocketClient 类的 status 属性中添加 readyState
constructor(baseUrl, path, options = {}) {
  // ...原有逻辑
  this.status = {
    isConnected: false,
    reconnectAttempts: 0,
    manuallyClosed: false,
    readyState: null // 连接状态
  };
}

// 修改 handleOpen 方法
handleOpen() {
  // ...原有逻辑
  this.status.readyState = STATUS.OPEN;
}
```

### 7.3 鉴权集成
在构造函数中添加鉴权逻辑，将鉴权信息添加到 URL 中，示例代码如下：
```javascript
constructor(baseUrl, path, options = {}) {
  // ...原有逻辑
  if (options.authToken) {
    this.wsUrl += `?token=${encodeURIComponent(options.authToken)}`;
  }
}
```