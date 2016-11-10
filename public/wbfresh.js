/*
 * --------------------------------------------
 *
 * @version  1.0
 * @author   maotingfeng(hzmaotingfeng@corp.netease.com)
 * @date     2016-11-10 09:15:43
 * --------------------------------------------
 */
function connect(){
    var host = location.host ,
        url = 'ws://' + host ,                                  // 形如:'ws://192.168.1.105/'
        connection = new WebSocket( url , 'echo-protocol' ) ;
    connection.onopen = wsOpen ;
    connection.onclose = wsClose ;
    connection.onmessage = wsMessage ;
    connection.onerror = wsError ;
    function wsOpen( event ){
        console.log( '连接到:' + event.currentTarget.url ) ;
        //connection.send( 'socket111.html' ) ;
    }
    function wsClose(){
        console.log( '连接关闭' ) ;
    }
    function wsMessage( event ){
        console.log( '接收到数据:' + event.data );
    }
    function wsError( event ){
        console.log( '错误:' + event.data ) ;
    }
}
setTimeout( connect , 0 ) ;