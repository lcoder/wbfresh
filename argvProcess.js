/*
 * --------------------------------------------
 *
 * @version  1.0
 * @author   maotingfeng(hzmaotingfeng@corp.netease.com)
 * @date     2016-11-16 11:42:44
 * --------------------------------------------
 */
var _p_flag = '-p' ;        // 指定项目的标识符

function getProjectPaths(){
    var arguments = process.argv ,
        index = arguments.indexOf( _p_flag ) ,
        _p_origin = arguments[ index + 1 ] ;
    return index < 0 ? [] : _p_origin ? _p_origin.split( ',' ) : [] ;
}

module.exports = getProjectPaths ;