var toString = Object.prototype.toString;
var isArray = function (arr) {
    return toString.call(arr) === "[object Array]";
}
var isArrayLike = function (o) {
    return isArray(o)|| (typeof o =='object'&& typeof o.length =='number')
}
/**
 get value from `data` by full key path(like key='a.b.c')
 */
function getValue(data, key) {
    var ss = key.split('.')
    var tempObj = data[ ss[0] ];
    for (var i = 1; i < ss.length; i++) {
        if (tempObj == undefined) {
            return undefined
        }
        tempObj = tempObj[ss[i]]
    }
    return tempObj;
}
/*
 set value to `data` by key path,
 set the value in path to {} if necessary
 */
function setValueSafe(data,key,value){
    var ss = key.split('.')
    var tempObj = data;
    for (var i = 0; i < ss.length-1; i++) {
        tempObj = tempObj[ss[i]] = tempObj[ss[i]]||{}
    }
    tempObj[ss[i]]=value;
}
module.exports = {
    isArray:isArray,
    isArrayLike:isArrayLike,
    getValue:getValue,
    setValueSafe:setValueSafe
}