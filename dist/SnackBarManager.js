Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeRootSiblings=require('react-native-root-siblings');var _reactNativeRootSiblings2=_interopRequireDefault(_reactNativeRootSiblings);


var _SnackBar=require('./SnackBar');var _SnackBar2=_interopRequireDefault(_SnackBar);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var babelPluginFlowReactPropTypes_proptype_SnackItemType=require('./type').babelPluginFlowReactPropTypes_proptype_SnackItemType||require('react').PropTypes.any;var

SnackBarManager=



function SnackBarManager(){var _this=this;_classCallCheck(this,SnackBarManager);this.




_setCurrent=function(props){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};
_this.current=new _reactNativeRootSiblings2.default(_react2.default.createElement(_SnackBar2.default,_extends({},props,{onAutoDismiss:_this.dismiss})),callback);
};this.

_removeCurrent=function(){var callback=arguments.length>0&&arguments[0]!==undefined?arguments[0]:function(){};
if(!_this.current){
callback();
return;
}

_this.current.destroy(function(){
_this.current=null;
callback();
});
};this.

get=function(){
return{
current:_this.current,
queue:_this.queue};

};this.

add=function(
title,
options)

{var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:function(){};
var props=_extends({title:title},options);

if(_this.current){
_this.queue.push(props);
callback();
return;
}

_this._setCurrent(props,callback);
};this.

show=function(
title,
options)

{var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:function(){};
var props=_extends({title:title},options);

if(_this.current){
_this.queue.unshift(props);
callback();
return;
}

_this._setCurrent(props,callback);
};this.

dismiss=function(){var callback=arguments.length>0&&arguments[0]!==undefined?arguments[0]:function(){};
_this._removeCurrent(function(){
if(!_this.queue.length){
callback();
return;
}

var current=_this.queue.shift();
_this._setCurrent(current,callback);
});
};this.current=null;this.queue=[];};exports.default=SnackBarManager;
//# sourceMappingURL=SnackBarManager.js.map