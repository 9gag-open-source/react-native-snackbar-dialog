Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactNativeRootSiblings=require('react-native-root-siblings');var _reactNativeRootSiblings2=_interopRequireDefault(_reactNativeRootSiblings);


var _SnackBar=require('./SnackBar');var _SnackBar2=_interopRequireDefault(_SnackBar);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var babelPluginFlowReactPropTypes_proptype_SnackItemType=require('./type').babelPluginFlowReactPropTypes_proptype_SnackItemType||require('react').PropTypes.any;var

SnackBarManager=function(){



function SnackBarManager(){_classCallCheck(this,SnackBarManager);
this.current=null;
this.queue=[];
}_createClass(SnackBarManager,[{key:'_hasQueue',value:function _hasQueue()

{
return Array.isArray(this.queue)&&this.queue.length;
}},{key:'_addCurrent',value:function _addCurrent(

props){
this.current=new _reactNativeRootSiblings2.default(_react2.default.createElement(_SnackBar2.default,_extends({},props,{onDismiss:this.dismiss})));
return this;
}},{key:'_updateCurrent',value:function _updateCurrent(

props){var isAnimated=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;
if(!this.current){
return this._addCurrent(props);
}

if(isAnimated){
return this.
_removeCurrent().
_addCurrent(props);
}

this.current.update(_react2.default.createElement(_SnackBar2.default,_extends({},props,{onDismiss:this.dismiss})));
return this;
}},{key:'_removeCurrent',value:function _removeCurrent()

{
if(!this.current){
return this;
}

this.current.destroy();
this.current=null;

return this;
}},{key:'get',value:function get()

{
return{
current:this.current,
queue:this.queue};

}},{key:'add',value:function add(

title,options){
var props=_extends({children:title},options);

if(this.current){
this.queue.push(props);
return;
}

this._addCurrent(props);
}},{key:'show',value:function show(

title,options){
this._updateCurrent(_extends({children:title},options));
}},{key:'dismiss',value:function dismiss()

{
this._removeCurrent();

if(!this._hasQueue()){
return;
}

var current=this.queue.shift();
this._addCurrent(current);
}}]);return SnackBarManager;}();exports.default=SnackBarManager;
//# sourceMappingURL=index.js.map