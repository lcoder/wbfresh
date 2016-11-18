/*
 * --------------------------------------------
 * 自动刷新客户端脚本
 * @version  1.0
 * @author   maotingfeng(hzmaotingfeng@corp.netease.com)
 * @date     2016-11-10 09:15:43
 * --------------------------------------------
 */
function wbfresh_connect( config ){

    var slice = Array.prototype.slice ,
        host = location.host ,
        //url = 'ws://' + host ,                                  // 形如:'ws://192.168.1.105/'
        url = config.wsURI ,
        isLog = config.log ,
        connection = new WebSocket( url , 'echo-protocol' ) ;
    log( 'wbfresh服务器地址：' , url ) ;

    function warn(){
        var args = slice.call( arguments ) ;
        args.unshift( 'wbfresh.js' ) ;
        isLog ? console.warn.apply( null , args ) : '' ;
    }
    function log(){
        var args = slice.call( arguments ) ;
        args.unshift( 'wbfresh.js' ) ;
        isLog ? console.log.apply( null , args ) : '' ;
    }
    connection.onopen = wsOpen ;
    connection.onclose = wsClose ;
    connection.onmessage = wsMessage ;
    connection.onerror = wsError ;

    function wsOpen( event ){
        log( '连接到:' + event.currentTarget.url ) ;
        // setTimeout( function(){
        //     connection.send( '请给我用户登陆的信息' ) ;
        // } , 3000 ) ;
    }
    function wsClose(){
        warn( '连接关闭' ) ;
    }
    function wsMessage( event ){
        var _data = event.data ;
        if( _data == 'refresh' ){
            location.reload() ;
        }else{
            log( '接收到数据:' + event.data );
        }
    }
    function wsError( event ){
        warn( event.data ) ;
    }
}
setTimeout( wbfresh_connect , 0 , (function(){
    var thisScript = document.currentScript ? document.currentScript : document.getElementById( '__wbfresh__' ) ;
    if( thisScript ){

    }else{
        console.warn( '查找wbfresh的script节点失败' ) ;
        return {} ;
    }
    var thisScriptAtts = thisScript.attributes ;
        src = thisScript.src ,
        baseURI = /http:\/\/.+\//g.exec( src )[0] ;
    var query_index = src.indexOf( '?' ) ,
        query =  query_index < 0 ? '' : src.substring( query_index ) ,
        isLog = query.indexOf( 'log' ) < 0 ? true : false ;
    return { wsURI: baseURI.replace( 'http' , 'ws' ) , log: isLog } ;
})() ) ;