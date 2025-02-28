---
title: uniapp存储和获取文件
createTime: 2025/02/26 11:12:30
tags:
  - uniapp
  - 前端
permalink: /article/syvyxvwi/
---
## 文件读取模块
### 函数定义
```javascript
/
 * 读取本地文件内容
 * @param {string} fileName - 目标文件名（需包含扩展名）
 * @param {Function} callback - 带结果回调函数（参数：data, error）
 */
fetchFileData(fileName, callback) {
    plus.io.requestFileSystem(
        plus.io.PUBLIC_DOWNLOADS, // 文件系统中的根目录
        fs => {
            // 创建或打开文件, fs.root是根目录操作对象,直接fs表示当前操作对象
            fs.root.getFile(fileName, {
                create: true // 文件不存在则创建
            }, fileEntry => {
                // 文件在手机中的路径
                console.log('文件在手机中的路径', fileEntry.fullPath)
                fileEntry.file(function(file) {
                    var fileReader = new plus.io.FileReader();
                    console.log("getFile:" + JSON.stringify(file));
                    fileReader.readAsText(file, "utf-8")
                    fileReader.onloadend = function(res) { //读取文件内容成功后的回调事件
                        //res.target.result读取到的文件内容信息
                        console.log('最后读取文件内容是=======', res.target.result)
                        callback(res.target.result)
                    }
                });
            }, e => {
                console.log('报错111', "getFile failed: " + e.message);
            });
        },

        e => {
            console.log('报错222', e.message);
        }
    );
}
```

### 参数说明
   | 参数 | 类型 | 必填 | 说明 |
   |------|------|-----|-----|
   | fileName | string | 是 | 支持相对路径，默认在PUBLIC_DOWNLOADS目录操作 |
   | callback | function | 是 | 接收(data, error)两个参数 |

### 使用示例
```javascript
fetchFileData('config.json', (data, error) => {
  if (!error) {
    try {
      const config = JSON.parse(data);
      console.log('加载配置成功:', config);
    } catch(e) {
      console.error('JSON解析失败:', e);
    }
  } else {
    console.error('文件读取失败:', error);
  }
});
```

## 文件存储模块
### 函数定义
```javascript
/
 * 存储数据到本地文件
 * @param {string} fileName - 目标文件名（需包含扩展名） 
 * @param {Object|string} fileInfo - 支持JSON对象或字符串格式
 * @param {Function} callback - 操作结果回调（参数：success, error）
 */
saveFile(fileName, fileInfo, callback) {
    // 请求本地文件系统对象
    plus.io.requestFileSystem(
        plus.io.PUBLIC_DOWNLOADS, // 文件系统中的根目录
        fs => {
            // 创建或打开文件, fs.root是根目录操作对象,直接fs表示当前操作对象
            fs.root.getFile(fileName, {
                create: true // 文件不存在则创建
            }, fileEntry => {
                // 文件在手机中的路径
                console.log('最后文件在手机中的路径========', fileEntry.fullPath)
                fileEntry.createWriter(writer => {
                    // 写入文件成功完成的回调函数
                    writer.onwrite = e => {
                        console.log("写入数据成功");
                        callback(true)
                    };
                    // 写入数据
                    writer.write(JSON.stringify(fileInfo));
                })
            }, e => {
                callback(false)
                console.log('报错111', "getFile failed: " + e.message);
            });
        },
        e => {
            console.log('报错222', e.message);
            callback(false)
        }
    );
}
```

### 开发注意事项
#### 数据类型处理：
- 自动转换JSON对象为字符串
- 文本数据建议直接传入字符串
- 二进制数据需转换为ArrayBuffer

#### 错误处理规范：
```javascript
// 在回调中处理三级错误状态
callback(success, {
  code: e.code,
  message: e.message,
  stack: e.stack
});
```

### 最佳实践
#### 性能优化
- 大文件操作建议：
  ```javascript
  // 分块读取示例
  const CHUNK_SIZE = 1024 * 1024;
  let offset = 0;
  
  function readChunk() {
    fileReader.readAsArrayBuffer(file.slice(offset, offset + CHUNK_SIZE));
  }
  ```

#### 安全防护
- 文件校验机制：
```javascript
// 写入前校验
function validateContent(content) {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB限制
  return typeof content === 'string' 
    && content.length < MAX_SIZE;
}
```

## 常见问题排查
### 权限问题
```javascript
// 在manifest.json中配置
{
  "permissions": {
    "File": {
      "description": "文件存储权限"
    }
  }
}
```

### 路径对照表
   | 系统目录 | 对应路径 |
   |---------|---------|
   | PUBLIC_DOWNLOADS | /storage/emulated/0/Download/ |
   | PRIVATE_DOCUMENTS | /data/data/[包名]/documents/ |

## 扩展功能建议
### 文件监控
```javascript
// 监听文件变化
const watcher = fileEntry.createWatcher(events => {
  console.log('文件修改事件:', events);
});
watcher.start();
```

### 版本控制
```javascript
// 添加版本标记
function backupFile(fileName) {
  const timestamp = new Date().toISOString().replace(/[:.]/g,'-');
  const backupName = `${fileName}.bak_${timestamp}`;
  fs.root.copyTo(fileEntry, backupName);
}
```

本指南已涵盖文件操作的核心流程，建议配合以下扩展资源使用：
1. 官方API文档链接：
2. 性能测试工具推荐：Android Profiler / Xcode Instruments
3. 调试技巧：`adb shell ls /storage/emulated/0/Download` 验证文件生成

> 注：所有文件操作建议封装为独立Service模块，配合Vuex/Pinia进行状态管理，实现读写操作与UI组件的解耦。