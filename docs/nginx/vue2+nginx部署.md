---
title: vue2+nginx部署
createTime: 2025/02/26 13:41:29
tags:
 - vue2
 - nginx
permalink: /article/kke3osp0/
---
# Vue 项目中 vue.config.js 与 Nginx 配置文档

## 一、Vue 配置（vue.config.js）
### 1. 配置代码及注释
```javascript
// 从 '@vue/cli-service' 中导入 defineConfig 函数，该函数用于定义 Vue CLI 项目的配置
const {defineConfig} = require('@vue/cli-service')
// 导出配置对象，使用 defineConfig 函数进行配置
module.exports = defineConfig({
    // 允许转译依赖项，设置为 true 表示对项目中的依赖项进行 Babel 转译
    transpileDependencies: true,
    // 打包相关配置，publicPath 用于指定项目构建输出的目录路径，这里设置为 './' 表示相对路径
    publicPath: './',
    // 开发服务器配置
    devServer: {
        // 服务器监听的主机地址，'0.0.0.0' 表示监听所有可用的网络接口
        host: '0.0.0.0',
        // 服务器监听的端口号，设置为 8080
        port: 8080,
        // 代理配置，用于解决跨域问题或转发请求
        proxy: {
            // 代理路径前缀，当请求路径以 '/captures' 开头时，会进行代理处理
            '/captures': {
                // 目标代理服务器的地址，包括协议（http）、IP 地址和端口号
                target: 'http://192.168.1.150:18080', 
                // 是否改变请求的源，设置为 true 表示在请求头中修改 origin 字段，以实现跨域请求
                changeOrigin: true, 
            }
        }
    }
})
```
### 2. 配置属性说明
| 属性名 | 所属层级 | 类型 | 描述 |
| ---- | ---- | ---- | ---- |
| transpileDependencies | 根层级 | Boolean | 控制是否对项目依赖项进行 Babel 转译，true 表示进行转译 |
| publicPath | 根层级 | String | 项目构建输出的目录路径，设置为相对路径 './' |
| devServer | 根层级 | Object | 开发服务器相关配置对象 |
| host | devServer | String | 开发服务器监听的主机地址，'0.0.0.0' 监听所有可用网络接口 |
| port | devServer | Number | 开发服务器监听的端口号，这里是 8080 |
| proxy | devServer | Object | 代理配置对象，用于处理请求转发和跨域问题 |
| /captures | proxy | Object | 代理路径前缀为 '/captures' 的具体代理配置 |
| target | /captures | String | 目标代理服务器的地址，包含协议、IP 和端口 |
| changeOrigin | /captures | Boolean | 是否改变请求的源，true 表示修改请求头中的 origin 字段 |

### 3. 涉及方法说明
| 方法名 | 所属对象 | 描述 |
| ---- | ---- | ---- |
| defineConfig | @vue/cli-service | 用于定义 Vue CLI 项目配置的函数，接受一个配置对象作为参数并返回配置结果 |

## 二、Nginx 配置（nginx.conf）
### 1. 配置代码及注释
```nginx
# 设置 Nginx 工作进程的用户为 root
user  root;
# 设置 Nginx 工作进程的数量为 1
worker_processes  1;

# 以下是错误日志的配置，这里被注释掉了，可根据需要开启不同级别的错误日志记录
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

# 设置 Nginx 主进程的 PID 文件路径，这里被注释掉了
#pid        logs/nginx.pid;

# 事件模块配置
events {
    # 设置每个工作进程可以处理的最大连接数为 1024
    worker_connections  1024;
}

# HTTP 模块配置
http {
    # 包含 mime.types 文件，用于定义各种文件类型的 MIME 类型
    include       mime.types;
    # 设置默认的 MIME 类型为 application/octet-stream
    default_type  application/octet-stream;

    # 以下是日志格式和访问日志的配置，这里被注释掉了，可根据需要开启
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;

    # 开启 sendfile 功能，允许 Nginx 直接将文件发送到客户端，而不需要先将文件读取到服务器内存中
    sendfile        on;
    # 以下是 tcp_nopush 的配置，这里被注释掉了，可根据需要开启
    #tcp_nopush     on;

    # 以下是 keepalive_timeout 的配置，这里设置为 65 秒，可根据需要调整
    #keepalive_timeout  0;
    keepalive_timeout  65;

    # 以下是 gzip 压缩的配置，这里被注释掉了，可根据需要开启
    #gzip  on;

    # 服务器配置块，定义了一个服务器实例
    server {
        # 服务器监听的端口号为 80
        listen       80; 
        # 服务器的名称为 localhost
        server_name  localhost;

        # 以下是字符集的配置，这里被注释掉了
        #charset koi8-r;

        # 以下是访问日志的配置，这里被注释掉了，可根据需要开启
        #access_log  logs/host.access.log  main;
        # 处理根路径（'/'）的请求
        location / {
            # 设置项目文件的根目录为 /zckx/nginx/html/dist
            root    /zckx/nginx/html/dist; 
            # 设置默认的索引文件为 index.html
            index  index.html;
            # 尝试按照指定的顺序查找文件，如果文件不存在则返回 /index.html
            try_files $uri $uri/ /index.html;
        }
        # 处理以 /captures 开头的请求路径
        location /captures/ {
            # 将请求代理到目标地址 http://192.168.1.150:18080
            proxy_pass http://192.168.1.150:18080; 
        }

        # 处理以 /live 开头的请求路径
        location /live{
            # 添加响应头，允许所有来源的跨域请求
            add_header Access-Control-Allow-Origin *;
            # 定义 MIME 类型映射，指定 m3u8 和 ts 文件的 MIME 类型
            types {
                application/vnd.apple.mpegurl m3u8;
                video/mp2t ts;
            }
            # 设置别名，将请求的路径映射到 /tmp/hls 目录
            alias /tmp/hls;
            # 设置缓存过期时间为 -1，表示不缓存
            expires -1;
        }

        # 以下是 404 错误页面的配置，这里被注释掉了，可根据需要开启
        #error_page  404              /404.html;

        # 配置 500、502、503、504 错误页面为 /50x.html
        error_page   500 502 503 504  /50x.html;
        # 处理 /50x.html 的请求
        location = /50x.html {
            # 设置根目录为 html
            root   html;
        }

        # 以下是代理 PHP 脚本到 Apache 的配置，这里被注释掉了，可根据需要开启
        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # 以下是将 PHP 脚本传递给 FastCGI 服务器的配置，这里被注释掉了，可根据需要开启
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # 以下是禁止访问.htaccess 文件的配置，这里被注释掉了，可根据需要开启
        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }

    # 以下是另一个服务器配置示例，这里被注释掉了，可根据需要开启
    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

    # 以下是 HTTPS 服务器配置示例，这里被注释掉了，可根据需要开启
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

# RTMP 模块配置
rtmp {
    # RTMP 服务器配置块
    server {
        # 监听的端口号为 1935
        listen 1935;
        # 设置数据块大小为 4096 字节
        chunk_size 4096;
        # 应用配置块，名为 live
        application live {
            # 开启直播功能
            live on;
            # 开启 HLS 功能
            hls on;
            # 设置 HLS 切片文件的保存路径为 /tmp/hls
            hls_path /tmp/hls;
            # 设置 HLS 切片的时长为 4 秒
            hls_fragment 4;
            # 设置 HLS 播放列表的长度为 30 秒
            hls_playlist_length 30;
            # 关闭录制功能
            record off;
        }
    }
}
```
### 2. 配置属性说明
| 属性名 | 所属层级 | 类型 | 描述 |
| ---- | ---- | ---- | ---- |
| user | 根层级 | String | 设置 Nginx 工作进程的用户，这里为 'root' |
| worker_processes | 根层级 | Number | 设置 Nginx 工作进程的数量，这里为 1 |
| worker_connections | events | Number | 设置每个工作进程可以处理的最大连接数，这里为 1024 |
| include | http | String | 包含指定的文件，这里包含 'mime.types' 文件用于定义 MIME 类型 |
| default_type | http | String | 设置默认的 MIME 类型，这里为 'application/octet-stream' |
| sendfile | http | Directive（on/off） | 开启或关闭 sendfile 功能，这里设置为 'on' |
| keepalive_timeout | http | Number | 设置连接的保持活动时间，这里为 65 秒 |
| listen | server | Number | 服务器监听的端口号，这里主服务器监听 80 端口 |
| server_name | server | String | 服务器的名称，这里为 'localhost' |
| root | location（/） | String | 设置请求的根目录，这里为 '/zckx/nginx/html/dist' |
| index | location（/） | String | 设置默认的索引文件，这里为 'index.html' |
| try_files | location（/） | Directive | 尝试按顺序查找文件，找不到则返回指定文件 |
| proxy_pass | location（/captures/） | String | 将请求代理到指定的目标地址，这里为 'http://192.168.1.150:18080' |
| add_header | location（/live） | Directive | 添加响应头，这里添加了允许跨域的头信息 |
| types | location（/live） | Directive | 定义 MIME 类型映射 |
| alias | location（/live） | String | 设置请求路径的别名，这里为 '/tmp/hls' |
| expires | location（/live） | Directive | 设置缓存过期时间，这里为 -1 表示不缓存 |
| error_page | server | Directive | 配置错误页面，这里配置了 500、502、503、504 错误的页面 |
| listen | rtmp.server | Number | RTMP 服务器监听的端口号，这里为 1935 |
| chunk_size | rtmp.server | Number | 设置 RTMP 数据块的大小，这里为 4096 字节 |
| live | rtmp.server.application（live） | Directive（on/off） | 开启或关闭直播功能，这里设置为 'on' |
| hls | rtmp.server.application（live） | Directive（on/off） | 开启或关闭 HLS 功能，这里设置为 'on' |
| hls_path | rtmp.server.application（live） | String | 设置 HLS 切片文件的保存路径，这里为 '/tmp/hls' |
| hls_fragment | rtmp.server.application（live） | Number | 设置 HLS 切片的时长，这里为 4 秒 |
| hls_playlist_length | rtmp.server.application（live） | Number | 设置 HLS 播放列表的长度，这里为 30 秒 |
| record | rtmp.server.application（live） | Directive（on/off） | 开启或关闭录制功能，这里设置为 'off' |

### 3. 涉及方法（指令）说明
| 方法（指令）名 | 所属对象 | 描述 |
| ---- | ---- | ---- |
| include | Nginx 配置文件 | 包含指定的文件，用于引入外部的配置或 MIME 类型定义等 |
| sendfile | http 模块 | 控制是否开启 sendfile 功能，允许 Nginx 直接将文件发送到客户端 |
| keepalive_timeout | http 模块 | 设置连接的保持活动时间，超过该时间未活动的连接将被关闭 |
| proxy_pass | location 指令块 | 将请求代理到指定的目标服务器地址 |
| add_header | location 指令块 | 向响应中添加指定的 HTTP 头信息 |
| types | location 指令块 | 定义 MIME 类型映射，指定不同文件类型对应的 MIME 类型 |
| alias | location 指令块 | 设置请求路径的别名，用于映射到实际的文件或目录路径 |
| expires | location 指令块 | 设置缓存过期时间，控制客户端对资源的缓存策略 |
| error_page | server 指令块 | 配置错误页面，当服务器返回特定错误码时，将请求重定向到指定的错误页面 |

通过以上对 Vue 项目中 vue.config.js 和 Nginx 的配置说明，希望能帮助您更好地理解和使用这些配置来构建和部署项目。 