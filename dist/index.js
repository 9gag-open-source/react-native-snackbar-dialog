Object.defineProperty(exports,"__esModule",{value:true});var _this=this;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactNativeRootSiblings=require('react-native-root-siblings');var _reactNativeRootSiblings2=_interopRequireDefault(_reactNativeRootSiblings);

var _SnackBar=require('./SnackBar');var _SnackBar2=_interopRequireDefault(_SnackBar);
var _storage=require('./utils/storage');var _storage2=_interopRequireDefault(_storage);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toArray(arr){return Array.isArray(arr)?arr:Array.from(arr);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

SnackBar=function SnackBar(){_classCallCheck(this,SnackBar);};SnackBar.
add=function _callee(props){var currentElement;return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.prev=0;_context.next=3;return regeneratorRuntime.awrap(

_storage2.default.getCurrent());case 3:currentElement=_context.sent;if(!

currentElement){_context.next=8;break;}_context.next=7;return regeneratorRuntime.awrap(
_storage2.default.addToQueue(props));case 7:return _context.abrupt('return');case 8:_context.next=10;return regeneratorRuntime.awrap(



_storage2.default.setCurrent(new _reactNativeRootSiblings2.default(_react2.default.createElement(_SnackBar2.default,_extends({},props,{onDismiss:dismiss})))));case 10:_context.next=15;break;case 12:_context.prev=12;_context.t0=_context['catch'](0);

console.warn(_context.t0);case 15:case'end':return _context.stop();}}},null,_this,[[0,12]]);};SnackBar.



show=function _callee2(props){var newElement,currentElement;return regeneratorRuntime.async(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.prev=0;

newElement=_react2.default.createElement(_SnackBar2.default,_extends({},props,{onDismiss:dismiss}));_context2.next=4;return regeneratorRuntime.awrap(
_storage2.default.getCurrent());case 4:currentElement=_context2.sent;if(!

currentElement){_context2.next=8;break;}
currentElement.update(newElement);return _context2.abrupt('return');case 8:_context2.next=10;return regeneratorRuntime.awrap(



_storage2.default.setCurrent(new _reactNativeRootSiblings2.default(newElement)));case 10:_context2.next=15;break;case 12:_context2.prev=12;_context2.t0=_context2['catch'](0);

console.warn(_context2.t0);case 15:case'end':return _context2.stop();}}},null,_this,[[0,12]]);};SnackBar.



dismiss=function _callee3(){var currentElement,queue,hasQueue,_queue,currentProps,items;return regeneratorRuntime.async(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.prev=0;_context3.next=3;return regeneratorRuntime.awrap(

_storage2.default.getCurrent());case 3:currentElement=_context3.sent;if(!

currentElement){_context3.next=8;break;}
currentElement.destroy();_context3.next=8;return regeneratorRuntime.awrap(
_storage2.default.removeCurrent());case 8:_context3.next=10;return regeneratorRuntime.awrap(


_storage2.default.getItems());case 10:queue=_context3.sent;
hasQueue=Array.isArray(queue)&&queue.length;if(

hasQueue){_context3.next=14;break;}return _context3.abrupt('return');case 14:_queue=_toArray(



queue),currentProps=_queue[0],items=_queue.slice(1);_context3.next=17;return regeneratorRuntime.awrap(
_storage2.default.setCurrent(new _reactNativeRootSiblings2.default(_react2.default.createElement(_SnackBar2.default,_extends({},currentProps,{onDismiss:dismiss})))));case 17:_context3.t0=

items.length;if(!_context3.t0){_context3.next=21;break;}_context3.next=21;return regeneratorRuntime.awrap(_storage2.default.setQueue(items));case 21:_context3.next=26;break;case 23:_context3.prev=23;_context3.t1=_context3['catch'](0);

console.warn(_context3.t1);case 26:case'end':return _context3.stop();}}},null,_this,[[0,23]]);};exports.default=SnackBar;
//# sourceMappingURL=index.js.map