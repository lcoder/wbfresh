/*
 * --------------------------------------------
 *
 * @version  1.0
 * @author   maotingfeng(hzmaotingfeng@corp.netease.com)
 * @date     2016-11-10 10:09:03
 * --------------------------------------------
 */
var WebSocketServer = require('websocket').server ;

var websocket = function( server ){
    var wsServer ;
    wsServer = new WebSocketServer( {
        httpServer: server ,
        autoAcceptConnections: false
    } ) ;
    function originIsAllowed(origin) {
        // put logic here to detect whether the specified origin is allowed.
        return true ;
    }
    wsServer.on('request', function(request) {
        console.log( '有请求来了' ) ;
        if ( !originIsAllowed( request.origin ) ) {
            // Make sure we only accept requests from an allowed origin
            request.reject() ;
            return ;
        }
        var connection = request.accept( 'echo-protocol', request.origin );
        console.log( request ) ;
        connection.on('message', function( message ) {
            if( message.type === 'utf8' ) {
                console.log('接收数据: ' + message.utf8Data );
                connection.sendUTF( message.utf8Data ) ;
            }
            else if (message.type === 'binary') {
                console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                connection.sendBytes(message.binaryData);
            }
        });
        connection.on('close', function(reasonCode, description) {
            console.log( '连接关闭' + connection.remoteAddress );
        });
    });
    console.log( 'websocket启动' );
}

module.exports = websocket ;