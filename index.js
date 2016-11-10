var express = require('express') ,
    path = require( 'path' ) ,
    websocket = require( './websocket' ) ,
    _static_path = path.join( __dirname , 'public' ) ,
    app = express() ;
function log( txt ){
    console.log( 'wbfresh程序：' , txt ) ;
}

app.use( express.static( _static_path ) );

app.set( 'view engine' , 'pug' ) ;
app.set( 'views' , './views' ) ;

app.get( '/' , function (req, res) {
    res.render( 'index' ) ;
} ) ;

websocket( app ) ;
app.listen( 3000 , function () {
    log('开始监听3000端口') ;
} ) ;

