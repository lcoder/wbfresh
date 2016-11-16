var server = require('http').createServer()
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
  , port = 4080
  , log = function( txt ){ console.log( 'wbfresh' , txt ) ; } ;

app.set( 'view engine' , 'pug' ) ;
app.set( 'views' , './views' ) ;

app.use( express.static( './public' ) ) ;

app.use( function (req, res) {
    res.render( 'index' ) ;
} ) ;

wss.on('connection', function connection( ws ){
    var location = url.parse( ws.upgradeReq.url , true ) ;
    // you might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    ws.on('message', function incoming(message){
        console.log('received: %s', message);
    } ) ;
    //ws.send( 'refresh' ) ;

} ) ;

server.on( 'request', app ) ;
server.listen( port , function () {
    log( server.address().port ) ;
} );