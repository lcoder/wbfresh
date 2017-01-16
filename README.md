## 修改js、css、html文件，不需要手动刷新浏览器，使用wbfresh自动刷新浏览器。

<p style="text-algin:left;">[![NPM](https://nodei.co/npm/wbfresh.png)](https://nodei.co/npm/wbfresh/)</p>

使用方法：

1、安装wbresh模块

```javascript
$ npm install wbfresh --save
```

2、启动监听服务

```javascript
$ cd node_modules/wbfresh
$ node index -p {your_project_path} -o 4080 -d 0
```

> -p your_project_path 为你需要监听的路径，多个路径，用逗号分隔。路径可以是文件，目录（目录是递归监听的，子目录也适用）或者glob模式

> -o 指定监听服务器的端口，默认为4080

> -d 指定延迟刷新的时间，默认为300毫秒，指定为0，不延迟刷新

文本监听依赖[chokidar](https://github.com/paulmillr/chokidar)模块，所以路径规则，遵循此模块的路径监听规则就可以了。

3、若启动成功，则wbresh会输出如下的使用方法

```
wbfresh 监听已启动，请在需要刷新的html页面引入：
<script src="http://localhost:4080/wbfresh.js" id="__wbfresh__"></script>
```

在需要自动刷新的页面引入`wbfresh.js`javascript文件即可







###### 常见问题

- ```error
  events.js:160
        throw er; // Unhandled 'error' event
        ^

  Error: listen EADDRINUSE :::8080
      at Object.exports._errnoException (util.js:1026:11)
      at exports._exceptionWithHostPort (util.js:1049:20)
      at Server._listen2 (net.js:1257:14)
      at listen (net.js:1293:10)
      at Server.listen (net.js:1389:5)
  ```

  8080端口被占用，换一个没有被占用的端口。

- 可以到[github Issues](https://github.com/lcoder/wbfresh/issues)提问

