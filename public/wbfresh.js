/*
 * --------------------------------------------
 *
 * @version  1.0
 * @author   maotingfeng(hzmaotingfeng@corp.netease.com)
 * @date     2016-11-10 09:15:43
 * --------------------------------------------
 */
function wbfresh_connect(){
    var slice = Array.prototype.slice ,
        host = location.host ,
        url = 'ws://' + host ,                                  // 形如:'ws://192.168.1.105/'
        connection = new WebSocket( url , 'echo-protocol' ) ;
    connection.onopen = wsOpen ;
    connection.onclose = wsClose ;
    connection.onmessage = wsMessage ;
    connection.onerror = wsError ;
    function warn(){
        var args = slice.call( arguments ) ;
        args.unshift( 'wbfresh.js' ) ;
        console.warn.apply( null , args ) ;
    }
    function log(){
        var args = slice.call( arguments ) ;
        args.unshift( 'wbfresh.js' ) ;
        console.log.apply( null , args ) ;
    }
    function wsOpen( event ){
        log( '连接到:' + event.currentTarget.url ) ;
        //connection.send( 'socket111.html' ) ;
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
setTimeout( wbfresh_connect , 0 ) ;