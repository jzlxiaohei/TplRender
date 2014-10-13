var utils = require('./utils');
var Stack =require('./stack')
var regex_placeholder = /\{\{([\w|\.]+)\}\}/g;
function renderTemplate(str, data) {
    return str.replace(regex_placeholder, function (match, key) {
        var replaceValue = utils.getValue(data, key);
        if (!replaceValue) replaceValue = match;
        return replaceValue;
    })
}
function doIfDirective(ele,data){
    var expr = ele.getAttribute('z-if');
    ele.removeAttribute('z-if');
    var cond = utils.getValue(data,expr);
    if(!cond){
        ele.parentNode.removeChild(ele);
    }
    return cond;
}
function doRepeatDirective(data,ele,key){
    var dataArr =  utils.getValue(data,key)
    if(!utils.isArray(dataArr)){
        console.error(key+' in z-repeat should be array')
        return undefined;
    }
    return new DdRepeat(ele,dataArr);
}
function initDom(){
    var ele = this.$$ele;
    var data = this.$$data;
    var stack = new Stack();
    stack.push(ele)
    while(!stack.isEmpty()){
        var node = stack.pop();
        switch (node.nodeType) {
            case 2:
                node.value = renderTemplate(node.value,data)
                break;
            case 3:
                node.nodeValue = renderTemplate(node.nodeValue,data)
                break;
            case 1:
                if(node.hasAttribute('z-repeat')){
                    var key =  node.getAttribute('z-repeat');
                    node.removeAttribute('z-repeat')
                    utils.setValueSafe(this,key,doRepeatDirective(data,node,key))
                    break;
                }
                if(node.hasAttribute('z-if')){
                    if(!doIfDirective(node,data)){
                        break;
                    }
                }
                stack.push(node.childNodes);
                stack.push(node.attributes);
                break;
        }
    }
}
var DdObject = function (ele, data) {
    this.$$ele = ele;
    this.$$data = data;
    initDom.call(this);
}
function DdRepeat(ele,dataArr){
    this.$$parentNode = ele.parentNode;
    this.$$ele = ele;
    var fragment = document.createDocumentFragment();
    this.$$parentNode.removeChild(ele)
    var cloneNode;
    this.$$DdObjArr = [];
    this.dataArr = dataArr;
    for(var i=0;i<dataArr.length;i++){
        cloneNode = ele.cloneNode(true);
        this.$$DdObjArr.push(new DdObject(cloneNode,dataArr[i]))
        fragment.appendChild(cloneNode);
    }
    this.$$parentNode.appendChild(fragment)
}

DdRepeat.prototype={
    $insertBefore:function(index,item){
        var cloneNode = this.$$ele.cloneNode(true);
        var refNode = this.$$DdObjArr[index].$$ele;
        this.dataArr.splice(index,0,item)
        this.$$DdObjArr.splice(index,0,new DdObject(cloneNode,item));
        this.$$parentNode.insertBefore(cloneNode,refNode)
    },
    $push:function(item){
        //this.dataArr.push(item);
        var cloneNode = this.$$ele.cloneNode(true);
        this.$$DdObjArr.push(new DdObject(cloneNode,item));
        this.dataArr.push(item);
        this.$$parentNode.appendChild(cloneNode);
    },
    $remove:function(index){
        var removeItem = this.$$DdObjArr[index]
        var el =  removeItem.$$ele;
        this.dataArr.splice(index,1)
        this.$$DdObjArr.splice(index,1);
        this.$$parentNode.removeChild(el)
        return {
            ele:el,
            data:removeItem.$$data
        }
    },
    $removeByFilter:function(filter,all){
        var items = this.$$DdObjArr;
        var resultItems = [];
        if (typeof filter == 'function') {
            for (var i = 0; i < items.length; i++) {
                var item = items[i]
                if (filter(item.$$ele, item.$$data)) {
                    var rItem = this.$remove.call(this, i, key, value);
                    resultItems.push(rItem)
                    if (!all)return rItem;
                }
            }
        } else {
            //filter is HtmlElement
            for (var i = 0; i < items.length; i++) {
                if (filter == items[i].$$ele) {
                    var rItem = this.$remove.call(this, i, key, value);
                    resultItems.push(rItem)
                    if (!all)return rItem;
                }
            }
        }
        return resultItems
    }
}
module.exports = function(ele,data){
    return new DdObject(ele,data);
}

