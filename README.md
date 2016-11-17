修改js、css、html文件，不需要手动刷新浏览器，使用wbfresh自动刷新浏览器。



使用方法：

1、安装wbresh模块

```javascript
$ npm install wbfresh --save
```

2、启动监听服务

```javascript
$ cd node_modules/wbfresh
$ node index -p {your_project_path} -o 4080
```

> -p your_project_path 为你需要监听的路径，多个路径，用逗号分隔。路径可以是文件，目录（目录是递归监听的，子目录也适用）或者glob模式

> -o 指定监听服务器的端口，默认为4080

文本监听依赖[chokidar](https://github.com/paulmillr/chokidar)模块，所以路径规则，遵循此模块的路径监听规则就可以了。

3、若启动成功，则wbresh会输出如下的使用方法

```
wbfresh 监听已启动，请在需要刷新的html页面引入：
<script src="http://localhost:4080/wbfresh.js" id="__wbfresh__"></script>
```

在需要自动刷新的页面引入`wbfresh.js`javascript文件即可