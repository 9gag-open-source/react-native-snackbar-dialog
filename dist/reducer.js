Object.defineProperty(exports,"__esModule",{value:true});exports.INITIAL_STATE=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.


















transformProps=transformProps;exports.default=


























































snackBarReducer;var _actions=require('./actions.js');function _toArray(arr){return Array.isArray(arr)?arr:Array.from(arr);}var babelPluginFlowReactPropTypes_proptype_ActionType=require('./type').babelPluginFlowReactPropTypes_proptype_ActionType||require('react').PropTypes.any;var babelPluginFlowReactPropTypes_proptype_StateType=require('./type').babelPluginFlowReactPropTypes_proptype_StateType||require('react').PropTypes.any;var babelPluginFlowReactPropTypes_proptype_SnackItemType=require('./type').babelPluginFlowReactPropTypes_proptype_SnackItemType||require('react').PropTypes.any;var INITIAL_STATE=exports.INITIAL_STATE={items:[],current:null};function transformProps(item){var title=item.title;var transformedItem=_extends({},item);if(title){transformedItem.children=title;delete transformedItem.title;}return transformedItem;}function show(state,payload){return _extends({},state,{current:transformProps(payload)});}function add(state,payload){var item=transformProps(payload);if(!state.current&&state.items.length){var _state$items=_toArray(state.items),current=_state$items[0],items=_state$items.slice(1);return _extends({},state,{items:items.concat([item]),current:current});}if(!state.current){return show(state,payload);}return _extends({},state,{items:state.items.concat([item])});}function dismiss(state){if(!state.items.length){return _extends({},state,{current:null});}var _state$items2=_toArray(state.items),current=_state$items2[0],items=_state$items2.slice(1);return _extends({},state,{items:items,current:current});}function snackBarReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:INITIAL_STATE;var action=arguments[1];
switch(action.type){
case _actions.SHOW:return show(state,action.payload);
case _actions.ADD:return add(state,action.payload);
case _actions.DISMISS:return dismiss(state);
default:return state;}

}
//# sourceMappingURL=reducer.js.map