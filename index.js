var server = require('http').createServer()
  , chokidar = require( 'chokidar' )
  , fs = require( 'fs' )
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer( {
        server: server ,
        verifyClient: function( info ){
            return true ;
        }
    } )
  , express = require('express')
  , app = express()
  , log = function( txt ){ console.log( 'wbfresh' , txt ) ; }
  , argvProcess = require( './argvProcess' )
  , _project_path = argvProcess.paths              // 监听项目路径的数组
  , port = argvProcess.port                        // 监听的端口
  , delay = argvProcess.delay ;                    // 延迟的毫秒数


if( _project_path.length <= 0 ){ return log( '请输出-p参数，指定需要监听的目录' ) ; }

app.set( 'view engine' , 'pug' ) ;
app.set( 'views' , './views' ) ;

app.use( express.static( './public' ) ) ;

app.get( [ '/' , '/index' ] , function (req, res) {
    res.render( 'index' ) ;
} ) ;

app.use( function (req, res) {
    res.sendStatus( 404 ) ;
} ) ;

var _$$WS = (function(){
    return {
            _arr: [] ,
            pushWS: function( ws ){
                var _arr = this._arr ,
                    _flag = true ;
                _arr.forEach( function( item , index ){
                    if( item === ws ){ _flag = false ; }
                } ) ;
                _flag ? _arr.push( ws ) : log( '已经存在此ws，添加失败' ) ;
            } ,
            removeWS: function( ws ){
                var _arr = this._arr ,
                    _flag = true ;
                _arr.forEach( function( item , index ){
                    if( item === ws ){
                        _arr.splice( index , 1 ) ;
                    }
                } ) ;
            } ,
            forEach: function( cb ){
                this._arr.forEach( cb || function(){ log( '请传入处理ws的函数' ) ; } ) ;
            }
        }
})() ;


chokidar.watch( _project_path , { ignored: /[\/\\]\./} ).on( 'change' , function( path ){
    _$$WS.forEach( function( ws , index ){
        if( delay ){
            setTimeout( wsSend.bind( ws , 'refresh' ) , delay ) ;
        }else{
            wsSend.bind( ws )( 'refresh' ) ;
        }
    } ) ;
} ) ;

function wsSend( txt ) {
    var ws = this ;
    if( ws ){
        ws.send( txt ) ;
    }else{
        log( '_$$WS闭包有bug，传入的ws竟然为空了' ) ;
    }
}

wss.on( 'connection' , function connection( ws ){
    var location = url.parse( ws.upgradeReq.url , true ) ;
    // you might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    log( '建立了ws连接' ) ;
    ws.on( 'message' , function incoming(message){
        log('接收到客户端的数据：%s', message);
    } ) ;
    ws.on( 'close' , function(){
        log( '客户端关闭了连接' ) ;
        _$$WS.removeWS( this ) ;
    } ) ;
    ws.on( 'error' , function(){
        log( 'ws发生了错误' ) ;
        _$$WS.removeWS( this ) ;
    } ) ;
    _$$WS.pushWS( ws ) ;
} ) ;

server.on( 'request', app ) ;

server.listen( port , function () {
    var tip = '监听已启动，请在需要刷新的html页面引入：\n<script src="${src}" id="__wbfresh__"></script>' ,
        src = 'http://localhost:' + server.address().port + '/wbfresh.js' ;
    log( tip.replace( '${src}' , src ) ) ;
} ) ;