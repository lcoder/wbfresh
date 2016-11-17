/*
 * --------------------------------------------
 *
 * @version  1.0
 * @author   maotingfeng(hzmaotingfeng@corp.netease.com)
 * @date     2016-11-16 11:42:44
 * --------------------------------------------
 */
var _p_flag = '-p' ;        // 指定项目的标识符
var _port_flag = '-o' ,     // 指定端口号
    _port_default = 4080 ;  // 默认端口号


var argv = process.argv ;


function getProjectPaths(){
    var index = argv.indexOf( _p_flag ) ,
        _p_origin = argv[ index + 1 ] ;
    return index < 0 ? [] : _p_origin ? _p_origin.split( ',' ) : [] ;
}

function getPort(){
    var index = argv.indexOf( _port_flag ) ,
        _port = argv[ index + 1 ] ;
    return index < 0 ? _port_default : _port ? transformPort( _port ) : _port_default ;
}
function transformPort( port ){
    port = Number( port ) ;
    return isNaN( port ) ? _port_default : port ;
}

module.exports = {
    paths: getProjectPaths() ,
    port: getPort()
} ;