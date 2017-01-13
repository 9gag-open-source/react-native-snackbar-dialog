Object.defineProperty(exports,"__esModule",{value:true});exports.







add=add;exports.






show=show;exports.






dismiss=dismiss;var babelPluginFlowReactPropTypes_proptype_SnackItemType=require('./type').babelPluginFlowReactPropTypes_proptype_SnackItemType||require('react').PropTypes.any;var ADD=exports.ADD='SNACKBAR.ADD';var SHOW=exports.SHOW='SNACKBAR.SHOW';var DISMISS=exports.DISMISS='SNACKBAR.DISMISS';function add(item){return{type:ADD,payload:item};}function show(item){return{type:SHOW,payload:item};}function dismiss(){
return{
type:DISMISS};

}
//# sourceMappingURL=actions.js.map