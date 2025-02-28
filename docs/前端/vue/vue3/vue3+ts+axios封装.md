---
title:  vue3+ts+axios封装
createTime: 2025/02/26 14:19:16
tags:
  - vue3
  - 前端
  - axios
permalink: /article/sh8iw8jw/
---
# Vue 3 + TypeScript 封装 Axios 使用说明文档

## 简介
在 Vue 3 和 TypeScript 项目中，为了更高效地管理 HTTP 请求，我们对 Axios 进行了封装。通过创建 `AxiosService` 类，将 Axios 实例、请求拦截、响应拦截以及常用的 HTTP 请求方法整合在一起，提高了代码的复用性和可维护性。

## 核心功能
### 2.1 请求封装
提供了常见 HTTP 请求方法的封装，如 GET、POST、PUT、DELETE 等，方便在项目中使用。

### 2.2 拦截器管理
设置了请求和响应拦截器，可处理通用逻辑，如添加认证头、处理响应数据、自动刷新 token 以及处理全局错误。

### 2.3 类型支持
使用 TypeScript 泛型，为请求和响应数据提供类型检查和自动完成功能，增强代码的健壮性。

## 快速入门
### 3.1 代码名称
`AxiosService.ts`

### 3.2 建议目录
建议将 `AxiosService.ts` 文件存放在项目的 `services` 目录下，目录结构示例如下：
```
src
├── services
│   └── AxiosService.ts
└── ...
```

### 3.3 完整代码示例
```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 定义接口以扩展 AxiosResponse
interface CustomAxiosResponse<T> extends AxiosResponse {
  data: T;
}

// 创建一个服务类
class AxiosService {
  private instance: AxiosInstance;

  constructor() {
    // 创建 axios 实例
    this.instance = axios.create({
      baseURL: '你的 API 基础 URL',
      // 其他配置...
    });

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 在这里添加例如 token 等请求头信息
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: CustomAxiosResponse<any>) => {
        // 在这里处理响应数据，例如转换格式
        return response.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // 封装 GET 请求
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T, CustomAxiosResponse<T>>(url, config);
  }

  // 封装 POST 请求
  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post<T, CustomAxiosResponse<T>>(url, data, config);
  }

  // 封装 PUT 请求
  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put<T, CustomAxiosResponse<T>>(url, data, config);
  }

  // 封装 DELETE 请求
  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete<T, CustomAxiosResponse<T>>(url, config);
  }
}

// 使用封装好的 AxiosService
const axiosService = new AxiosService();

export default axiosService;
```

## 方法和事件
### 4.1 `AxiosService` 类属性
| 属性名 | 类型 | 描述 |
| ---- | ---- | ---- |
| `instance` | `AxiosInstance` | 内部使用的 Axios 实例，用于发送 HTTP 请求。 |

### 4.2 `AxiosService` 类方法
| 方法名 | 参数 | 返回值 | 描述 |
| ---- | ---- | ---- | ---- |
| `get<T>(url: string, config?: AxiosRequestConfig)` | `url`：请求的 URL<br>`config`：可选的请求配置对象 | `Promise<T>` | 发送 GET 请求 |
| `post<T>(url: string, data?: any, config?: AxiosRequestConfig)` | `url`：请求的 URL<br>`data`：可选的请求数据<br>`config`：可选的请求配置对象 | `Promise<T>` | 发送 POST 请求 |
| `put<T>(url: string, data?: any, config?: AxiosRequestConfig)` | `url`：请求的 URL<br>`data`：可选的请求数据<br>`config`：可选的请求配置对象 | `Promise<T>` | 发送 PUT 请求 |
| `delete<T>(url: string, config?: AxiosRequestConfig)` | `url`：请求的 URL<br>`config`：可选的请求配置对象 | `Promise<T>` | 发送 DELETE 请求 |

## 最佳实践以及使用示例
### 5.1 在 Vue 组件中使用 `AxiosService` 发送 GET 请求
```vue
<template>
  <!-- 组件模板 -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axiosService from '@/services/AxiosService'; // 假设你的服务文件位于 services 文件夹

export default defineComponent({
  name: 'ExampleComponent',

  methods: {
    async fetchData() {
      try {
        // 发送 GET 请求到指定的 API 路径
        const response = await axiosService.get<{ message: string }>('/path/to/your/api');
        console.log(response.message);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  },

  mounted() {
    // 在组件挂载时调用 fetchData 方法
    this.fetchData();
  }
});
</script>
```

### 5.2 在 Vue 组件中使用 `AxiosService` 发送 POST 请求
```typescript
async createData() {
  try {
    // 定义要发送的数据
    const postData = { name: 'New Item', price: 100 };
    // 发送 POST 请求到指定的 API 路径
    const response = await axiosService.post<{ id: number }>('/path/to/your/api', postData);
    console.log('Created new item with ID:', response.id);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
```

## 常见问题以及解决办法
### 6.1 请求拦截器中添加 token 失败
#### 问题原因
可能是 token 获取失败或者请求头设置不正确。

#### 解决办法
检查 token 的获取逻辑，确保 token 存在且正确。同时，检查请求头的设置，确保 `Authorization` 字段的格式正确。

示例代码：
```typescript
this.instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token'); // 从本地存储中获取 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

### 6.2 响应拦截器中处理错误时，无法正确区分错误类型
#### 问题原因
错误处理逻辑不完善，没有正确判断 `error.response` 对象是否存在。

#### 解决办法
在处理错误时，先检查 `error.response` 对象是否存在，再根据状态码进行相应的处理。

示例代码：
```typescript
this.instance.interceptors.response.use(
  (response: CustomAxiosResponse<any>) => {
    // 如果响应中的 token 即将过期，自动刷新 token
    if (response.headers['x-refresh-token']) {
      // 假设有一个 refreshToken 方法可以调用
      refreshToken(response.headers['x-refresh-token']);
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      // 处理全局的 HTTP 错误，例如 401 或 500 等
      if (error.response.status === 401) {
        // 假设有一个 handleUnauthorized 方法可以调用
        handleUnauthorized();
      } else if (error.response.status >= 500) {
        // 假设有一个 handleServerError 方法可以调用
        handleServerError();
      }
    }
    return Promise.reject(error);
  }
);
```