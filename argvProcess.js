/*
 * --------------------------------------------
 *
 * @version  1.0
 * @author   maotingfeng(mtingfeng@gmail.com)
 * @date     2016-11-16 11:42:44
 * --------------------------------------------
 */
var _p_flag = '-p' ;        // 指定项目的标识符
var _port_flag = '-o' ,     // 指定端口号的标识符
    _default_port = 4080 ,  // 默认端口号
    _delay_flag = '-d' ,    // 指定延迟的标识符
    _default_delay = 300 ;    // 默认延迟时间 ， 0为不延迟


var argv = process.argv ;

// 获取监听的路径
function getProjectPaths(){
    var index = argv.indexOf( _p_flag ) ,
        _p_origin = argv[ index + 1 ] ;
    return index < 0 ? [] : _p_origin ? _p_origin.split( ',' ) : [] ;
}
// 获取端口号
function getPort(){
    var index = argv.indexOf( _port_flag ) ,
        _port = argv[ index + 1 ] ;
    return index < 0 ? _default_port : _port ? transformNumber( _port , _default_port ) : _default_port ;
}
function transformNumber( port , _default ){
    port = Number( port ) ;
    return isNaN( port ) ? _default : port ;
}
// 获取延迟刷新的时间 毫秒
function getAggregateTimeout(){
    var index = argv.indexOf( _delay_flag ) ,
        _delay = argv[ index + 1 ] ,
        transform = transformNumber( _delay , _default_delay ) ;
    return index < 0 ? _default_delay : _delay ? ( transform < 0 ? 0 : transform ) : _default_delay ;
}

module.exports = {
    paths: getProjectPaths() ,
    port: getPort() ,
    delay: getAggregateTimeout()
} ;