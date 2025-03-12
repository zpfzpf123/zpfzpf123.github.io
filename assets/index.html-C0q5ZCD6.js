import{_ as n,e as a,f as i,o as e}from"./app-CflHQ2lS.js";const l={};function p(t,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h2 id="一、vue-配置-vue-config-js" tabindex="-1"><a class="header-anchor" href="#一、vue-配置-vue-config-js"><span>一、Vue 配置（vue.config.js）</span></a></h2><h3 id="_1-配置代码及注释" tabindex="-1"><a class="header-anchor" href="#_1-配置代码及注释"><span>1. 配置代码及注释</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 从 &#39;@vue/cli-service&#39; 中导入 defineConfig 函数，该函数用于定义 Vue CLI 项目的配置</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">defineConfig</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> require</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">@vue/cli-service</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 导出配置对象，使用 defineConfig 函数进行配置</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">module</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">exports</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> defineConfig</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">({</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // 允许转译依赖项，设置为 true 表示对项目中的依赖项进行 Babel 转译</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">    transpileDependencies</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> true</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // 打包相关配置，publicPath 用于指定项目构建输出的目录路径，这里设置为 &#39;./&#39; 表示相对路径</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">    publicPath</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">./</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // 开发服务器配置</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">    devServer</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        // 服务器监听的主机地址，&#39;0.0.0.0&#39; 表示监听所有可用的网络接口</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">        host</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">0.0.0.0</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        // 服务器监听的端口号，设置为 8080</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">        port</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 8080</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        // 代理配置，用于解决跨域问题或转发请求</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">        proxy</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">            // 代理路径前缀，当请求路径以 &#39;/captures&#39; 开头时，会进行代理处理</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">            &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/captures</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">                // 目标代理服务器的地址，包括协议（http）、IP 地址和端口号</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">                target</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">http://192.168.1.150:18080</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">                // 是否改变请求的源，设置为 true 表示在请求头中修改 origin 字段，以实现跨域请求</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">                changeOrigin</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> true</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">            }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-配置属性说明" tabindex="-1"><a class="header-anchor" href="#_2-配置属性说明"><span>2. 配置属性说明</span></a></h3><table><thead><tr><th>属性名</th><th>所属层级</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>transpileDependencies</td><td>根层级</td><td>Boolean</td><td>控制是否对项目依赖项进行 Babel 转译，true 表示进行转译</td></tr><tr><td>publicPath</td><td>根层级</td><td>String</td><td>项目构建输出的目录路径，设置为相对路径 &#39;./&#39;</td></tr><tr><td>devServer</td><td>根层级</td><td>Object</td><td>开发服务器相关配置对象</td></tr><tr><td>host</td><td>devServer</td><td>String</td><td>开发服务器监听的主机地址，&#39;0.0.0.0&#39; 监听所有可用网络接口</td></tr><tr><td>port</td><td>devServer</td><td>Number</td><td>开发服务器监听的端口号，这里是 8080</td></tr><tr><td>proxy</td><td>devServer</td><td>Object</td><td>代理配置对象，用于处理请求转发和跨域问题</td></tr><tr><td>/captures</td><td>proxy</td><td>Object</td><td>代理路径前缀为 &#39;/captures&#39; 的具体代理配置</td></tr><tr><td>target</td><td>/captures</td><td>String</td><td>目标代理服务器的地址，包含协议、IP 和端口</td></tr><tr><td>changeOrigin</td><td>/captures</td><td>Boolean</td><td>是否改变请求的源，true 表示修改请求头中的 origin 字段</td></tr></tbody></table><h3 id="_3-涉及方法说明" tabindex="-1"><a class="header-anchor" href="#_3-涉及方法说明"><span>3. 涉及方法说明</span></a></h3><table><thead><tr><th>方法名</th><th>所属对象</th><th>描述</th></tr></thead><tbody><tr><td>defineConfig</td><td>@vue/cli-service</td><td>用于定义 Vue CLI 项目配置的函数，接受一个配置对象作为参数并返回配置结果</td></tr></tbody></table><h2 id="二、nginx-配置-nginx-conf" tabindex="-1"><a class="header-anchor" href="#二、nginx-配置-nginx-conf"><span>二、Nginx 配置（nginx.conf）</span></a></h2><h3 id="_1-配置代码及注释-1" tabindex="-1"><a class="header-anchor" href="#_1-配置代码及注释-1"><span>1. 配置代码及注释</span></a></h3><div class="language-nginx line-numbers-mode" data-ext="nginx" data-title="nginx"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span># 设置 Nginx 工作进程的用户为 root</span></span>
<span class="line"><span>user  root;</span></span>
<span class="line"><span># 设置 Nginx 工作进程的数量为 1</span></span>
<span class="line"><span>worker_processes  1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 以下是错误日志的配置，这里被注释掉了，可根据需要开启不同级别的错误日志记录</span></span>
<span class="line"><span>#error_log  logs/error.log;</span></span>
<span class="line"><span>#error_log  logs/error.log  notice;</span></span>
<span class="line"><span>#error_log  logs/error.log  info;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置 Nginx 主进程的 PID 文件路径，这里被注释掉了</span></span>
<span class="line"><span>#pid        logs/nginx.pid;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 事件模块配置</span></span>
<span class="line"><span>events {</span></span>
<span class="line"><span>    # 设置每个工作进程可以处理的最大连接数为 1024</span></span>
<span class="line"><span>    worker_connections  1024;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># HTTP 模块配置</span></span>
<span class="line"><span>http {</span></span>
<span class="line"><span>    # 包含 mime.types 文件，用于定义各种文件类型的 MIME 类型</span></span>
<span class="line"><span>    include       mime.types;</span></span>
<span class="line"><span>    # 设置默认的 MIME 类型为 application/octet-stream</span></span>
<span class="line"><span>    default_type  application/octet-stream;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 以下是日志格式和访问日志的配置，这里被注释掉了，可根据需要开启</span></span>
<span class="line"><span>    #log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span>    #                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span>    #                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span>
<span class="line"><span>    #access_log  logs/access.log  main;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 开启 sendfile 功能，允许 Nginx 直接将文件发送到客户端，而不需要先将文件读取到服务器内存中</span></span>
<span class="line"><span>    sendfile        on;</span></span>
<span class="line"><span>    # 以下是 tcp_nopush 的配置，这里被注释掉了，可根据需要开启</span></span>
<span class="line"><span>    #tcp_nopush     on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 以下是 keepalive_timeout 的配置，这里设置为 65 秒，可根据需要调整</span></span>
<span class="line"><span>    #keepalive_timeout  0;</span></span>
<span class="line"><span>    keepalive_timeout  65;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 以下是 gzip 压缩的配置，这里被注释掉了，可根据需要开启</span></span>
<span class="line"><span>    #gzip  on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 服务器配置块，定义了一个服务器实例</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        # 服务器监听的端口号为 80</span></span>
<span class="line"><span>        listen       80; </span></span>
<span class="line"><span>        # 服务器的名称为 localhost</span></span>
<span class="line"><span>        server_name  localhost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 以下是字符集的配置，这里被注释掉了</span></span>
<span class="line"><span>        #charset koi8-r;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 以下是访问日志的配置，这里被注释掉了，可根据需要开启</span></span>
<span class="line"><span>        #access_log  logs/host.access.log  main;</span></span>
<span class="line"><span>        # 处理根路径（&#39;/&#39;）的请求</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            # 设置项目文件的根目录为 /zckx/nginx/html/dist</span></span>
<span class="line"><span>            root    /zckx/nginx/html/dist; </span></span>
<span class="line"><span>            # 设置默认的索引文件为 index.html</span></span>
<span class="line"><span>            index  index.html;</span></span>
<span class="line"><span>            # 尝试按照指定的顺序查找文件，如果文件不存在则返回 /index.html</span></span>
<span class="line"><span>            try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        # 处理以 /captures 开头的请求路径</span></span>
<span class="line"><span>        location /captures/ {</span></span>
<span class="line"><span>            # 将请求代理到目标地址 http://192.168.1.150:18080</span></span>
<span class="line"><span>            proxy_pass http://192.168.1.150:18080; </span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 处理以 /live 开头的请求路径</span></span>
<span class="line"><span>        location /live{</span></span>
<span class="line"><span>            # 添加响应头，允许所有来源的跨域请求</span></span>
<span class="line"><span>            add_header Access-Control-Allow-Origin *;</span></span>
<span class="line"><span>            # 定义 MIME 类型映射，指定 m3u8 和 ts 文件的 MIME 类型</span></span>
<span class="line"><span>            types {</span></span>
<span class="line"><span>                application/vnd.apple.mpegurl m3u8;</span></span>
<span class="line"><span>                video/mp2t ts;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            # 设置别名，将请求的路径映射到 /tmp/hls 目录</span></span>
<span class="line"><span>            alias /tmp/hls;</span></span>
<span class="line"><span>            # 设置缓存过期时间为 -1，表示不缓存</span></span>
<span class="line"><span>            expires -1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 以下是 404 错误页面的配置，这里被注释掉了，可根据需要开启</span></span>
<span class="line"><span>        #error_page  404              /404.html;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 配置 500、502、503、504 错误页面为 /50x.html</span></span>
<span class="line"><span>        error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span>        # 处理 /50x.html 的请求</span></span>
<span class="line"><span>        location = /50x.html {</span></span>
<span class="line"><span>            # 设置根目录为 html</span></span>
<span class="line"><span>            root   html;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 以下是代理 PHP 脚本到 Apache 的配置，这里被注释掉了，可根据需要开启</span></span>
<span class="line"><span>        # proxy the PHP scripts to Apache listening on 127.0.0.1:80</span></span>
<span class="line"><span>        #</span></span>
<span class="line"><span>        #location ~ \\.php$ {</span></span>
<span class="line"><span>        #    proxy_pass   http://127.0.0.1;</span></span>
<span class="line"><span>        #}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 以下是将 PHP 脚本传递给 FastCGI 服务器的配置，这里被注释掉了，可根据需要开启</span></span>
<span class="line"><span>        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span></span>
<span class="line"><span>        #</span></span>
<span class="line"><span>        #location ~ \\.php$ {</span></span>
<span class="line"><span>        #    root           html;</span></span>
<span class="line"><span>        #    fastcgi_pass   127.0.0.1:9000;</span></span>
<span class="line"><span>        #    fastcgi_index  index.php;</span></span>
<span class="line"><span>        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span></span>
<span class="line"><span>        #    include        fastcgi_params;</span></span>
<span class="line"><span>        #}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 以下是禁止访问.htaccess 文件的配置，这里被注释掉了，可根据需要开启</span></span>
<span class="line"><span>        # deny access to .htaccess files, if Apache&#39;s document root</span></span>
<span class="line"><span>        # concurs with nginx&#39;s one</span></span>
<span class="line"><span>        #</span></span>
<span class="line"><span>        #location ~ /\\.ht {</span></span>
<span class="line"><span>        #    deny  all;</span></span>
<span class="line"><span>        #}</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 以下是另一个服务器配置示例，这里被注释掉了，可根据需要开启</span></span>
<span class="line"><span>    # another virtual host using mix of IP-, name-, and port-based configuration</span></span>
<span class="line"><span>    #</span></span>
<span class="line"><span>    #server {</span></span>
<span class="line"><span>    #    listen       8000;</span></span>
<span class="line"><span>    #    listen       somename:8080;</span></span>
<span class="line"><span>    #    server_name  somename  alias  another.alias;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    location / {</span></span>
<span class="line"><span>    #        root   html;</span></span>
<span class="line"><span>    #        index  index.html index.htm;</span></span>
<span class="line"><span>    #    }</span></span>
<span class="line"><span>    #}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 以下是 HTTPS 服务器配置示例，这里被注释掉了，可根据需要开启</span></span>
<span class="line"><span>    # HTTPS server</span></span>
<span class="line"><span>    #</span></span>
<span class="line"><span>    #server {</span></span>
<span class="line"><span>    #    listen       443 ssl;</span></span>
<span class="line"><span>    #    server_name  localhost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    ssl_certificate      cert.pem;</span></span>
<span class="line"><span>    #    ssl_certificate_key  cert.key;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span>    #    ssl_session_timeout  5m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    ssl_ciphers  HIGH:!aNULL:!MD5;</span></span>
<span class="line"><span>    #    ssl_prefer_server_ciphers  on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    location / {</span></span>
<span class="line"><span>    #        root   html;</span></span>
<span class="line"><span>    #        index  index.html index.htm;</span></span>
<span class="line"><span>    #    }</span></span>
<span class="line"><span>    #}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># RTMP 模块配置</span></span>
<span class="line"><span>rtmp {</span></span>
<span class="line"><span>    # RTMP 服务器配置块</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        # 监听的端口号为 1935</span></span>
<span class="line"><span>        listen 1935;</span></span>
<span class="line"><span>        # 设置数据块大小为 4096 字节</span></span>
<span class="line"><span>        chunk_size 4096;</span></span>
<span class="line"><span>        # 应用配置块，名为 live</span></span>
<span class="line"><span>        application live {</span></span>
<span class="line"><span>            # 开启直播功能</span></span>
<span class="line"><span>            live on;</span></span>
<span class="line"><span>            # 开启 HLS 功能</span></span>
<span class="line"><span>            hls on;</span></span>
<span class="line"><span>            # 设置 HLS 切片文件的保存路径为 /tmp/hls</span></span>
<span class="line"><span>            hls_path /tmp/hls;</span></span>
<span class="line"><span>            # 设置 HLS 切片的时长为 4 秒</span></span>
<span class="line"><span>            hls_fragment 4;</span></span>
<span class="line"><span>            # 设置 HLS 播放列表的长度为 30 秒</span></span>
<span class="line"><span>            hls_playlist_length 30;</span></span>
<span class="line"><span>            # 关闭录制功能</span></span>
<span class="line"><span>            record off;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-配置属性说明-1" tabindex="-1"><a class="header-anchor" href="#_2-配置属性说明-1"><span>2. 配置属性说明</span></a></h3><table><thead><tr><th>属性名</th><th>所属层级</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>user</td><td>根层级</td><td>String</td><td>设置 Nginx 工作进程的用户，这里为 &#39;root&#39;</td></tr><tr><td>worker_processes</td><td>根层级</td><td>Number</td><td>设置 Nginx 工作进程的数量，这里为 1</td></tr><tr><td>worker_connections</td><td>events</td><td>Number</td><td>设置每个工作进程可以处理的最大连接数，这里为 1024</td></tr><tr><td>include</td><td>http</td><td>String</td><td>包含指定的文件，这里包含 &#39;mime.types&#39; 文件用于定义 MIME 类型</td></tr><tr><td>default_type</td><td>http</td><td>String</td><td>设置默认的 MIME 类型，这里为 &#39;application/octet-stream&#39;</td></tr><tr><td>sendfile</td><td>http</td><td>Directive（on/off）</td><td>开启或关闭 sendfile 功能，这里设置为 &#39;on&#39;</td></tr><tr><td>keepalive_timeout</td><td>http</td><td>Number</td><td>设置连接的保持活动时间，这里为 65 秒</td></tr><tr><td>listen</td><td>server</td><td>Number</td><td>服务器监听的端口号，这里主服务器监听 80 端口</td></tr><tr><td>server_name</td><td>server</td><td>String</td><td>服务器的名称，这里为 &#39;localhost&#39;</td></tr><tr><td>root</td><td>location（/）</td><td>String</td><td>设置请求的根目录，这里为 &#39;/zckx/nginx/html/dist&#39;</td></tr><tr><td>index</td><td>location（/）</td><td>String</td><td>设置默认的索引文件，这里为 &#39;index.html&#39;</td></tr><tr><td>try_files</td><td>location（/）</td><td>Directive</td><td>尝试按顺序查找文件，找不到则返回指定文件</td></tr><tr><td>proxy_pass</td><td>location（/captures/）</td><td>String</td><td>将请求代理到指定的目标地址，这里为 &#39;http://192.168.1.150:18080&#39;</td></tr><tr><td>add_header</td><td>location（/live）</td><td>Directive</td><td>添加响应头，这里添加了允许跨域的头信息</td></tr><tr><td>types</td><td>location（/live）</td><td>Directive</td><td>定义 MIME 类型映射</td></tr><tr><td>alias</td><td>location（/live）</td><td>String</td><td>设置请求路径的别名，这里为 &#39;/tmp/hls&#39;</td></tr><tr><td>expires</td><td>location（/live）</td><td>Directive</td><td>设置缓存过期时间，这里为 -1 表示不缓存</td></tr><tr><td>error_page</td><td>server</td><td>Directive</td><td>配置错误页面，这里配置了 500、502、503、504 错误的页面</td></tr><tr><td>listen</td><td>rtmp.server</td><td>Number</td><td>RTMP 服务器监听的端口号，这里为 1935</td></tr><tr><td>chunk_size</td><td>rtmp.server</td><td>Number</td><td>设置 RTMP 数据块的大小，这里为 4096 字节</td></tr><tr><td>live</td><td>rtmp.server.application（live）</td><td>Directive（on/off）</td><td>开启或关闭直播功能，这里设置为 &#39;on&#39;</td></tr><tr><td>hls</td><td>rtmp.server.application（live）</td><td>Directive（on/off）</td><td>开启或关闭 HLS 功能，这里设置为 &#39;on&#39;</td></tr><tr><td>hls_path</td><td>rtmp.server.application（live）</td><td>String</td><td>设置 HLS 切片文件的保存路径，这里为 &#39;/tmp/hls&#39;</td></tr><tr><td>hls_fragment</td><td>rtmp.server.application（live）</td><td>Number</td><td>设置 HLS 切片的时长，这里为 4 秒</td></tr><tr><td>hls_playlist_length</td><td>rtmp.server.application（live）</td><td>Number</td><td>设置 HLS 播放列表的长度，这里为 30 秒</td></tr><tr><td>record</td><td>rtmp.server.application（live）</td><td>Directive（on/off）</td><td>开启或关闭录制功能，这里设置为 &#39;off&#39;</td></tr></tbody></table><h3 id="_3-涉及方法-指令-说明" tabindex="-1"><a class="header-anchor" href="#_3-涉及方法-指令-说明"><span>3. 涉及方法（指令）说明</span></a></h3><table><thead><tr><th>方法（指令）名</th><th>所属对象</th><th>描述</th></tr></thead><tbody><tr><td>include</td><td>Nginx 配置文件</td><td>包含指定的文件，用于引入外部的配置或 MIME 类型定义等</td></tr><tr><td>sendfile</td><td>http 模块</td><td>控制是否开启 sendfile 功能，允许 Nginx 直接将文件发送到客户端</td></tr><tr><td>keepalive_timeout</td><td>http 模块</td><td>设置连接的保持活动时间，超过该时间未活动的连接将被关闭</td></tr><tr><td>proxy_pass</td><td>location 指令块</td><td>将请求代理到指定的目标服务器地址</td></tr><tr><td>add_header</td><td>location 指令块</td><td>向响应中添加指定的 HTTP 头信息</td></tr><tr><td>types</td><td>location 指令块</td><td>定义 MIME 类型映射，指定不同文件类型对应的 MIME 类型</td></tr><tr><td>alias</td><td>location 指令块</td><td>设置请求路径的别名，用于映射到实际的文件或目录路径</td></tr><tr><td>expires</td><td>location 指令块</td><td>设置缓存过期时间，控制客户端对资源的缓存策略</td></tr><tr><td>error_page</td><td>server 指令块</td><td>配置错误页面，当服务器返回特定错误码时，将请求重定向到指定的错误页面</td></tr></tbody></table><p>通过以上对 Vue 项目中 vue.config.js 和 Nginx 的配置说明，希望能帮助您更好地理解和使用这些配置来构建和部署项目。</p>`,15)]))}const r=n(l,[["render",p],["__file","index.html.vue"]]),c=JSON.parse('{"path":"/article/kke3osp0/","title":"vue2+nginx部署","lang":"zh-CN","frontmatter":{"title":"vue2+nginx部署","createTime":"2025/02/26 13:41:29","tags":["vue2","nginx"],"permalink":"/article/kke3osp0/"},"headers":[],"readingTime":{"minutes":8.12,"words":2437},"git":{"updatedTime":1740731353000,"contributors":[{"name":"18582297328","username":"18582297328","email":"2622013323@qq.com","commits":1,"avatar":"https://avatars.githubusercontent.com/18582297328?v=4","url":"https://github.com/18582297328"}]},"filePathRelative":"nginx/vue2+nginx部署.md","categoryList":[{"id":"ee4340","sort":10012,"name":"nginx"}]}');export{r as comp,c as data};
