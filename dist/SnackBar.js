Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeTimer=require('react-native-timer');var _reactNativeTimer2=_interopRequireDefault(_reactNativeTimer);


var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var babelPluginFlowReactPropTypes_proptype_SnackItemType=require('./type').babelPluginFlowReactPropTypes_proptype_SnackItemType||require('react').PropTypes.any;










var DEFAULT_DURATION=5000;
var DEFAULT_FADEOUT_DURATION=250;
var INITIAL_POSITION=-180;

var STYLE_BANNER_COLOR='#000000';
var TEXT_COLOR_ACCENT='#0088ff';

var TIMEOUT_ID='snackBar';var _Dimensions$get=

_reactNative.Dimensions.get('window'),width=_Dimensions$get.width;

var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
position:'absolute',
bottom:INITIAL_POSITION,
width:width},


text:{
padding:24,
fontSize:16},


inlineText:{
fontSize:16},


buttonContainer:{
paddingHorizontal:4},


button:{
fontSize:16,
fontWeight:'500'},


actionRow:{
flexDirection:'row',
justifyContent:'flex-end',
padding:18,
marginBottom:6},


inlineRow:{
flexDirection:'row',
justifyContent:'space-between',
padding:18},


flat:{
fontSize:14,
marginHorizontal:16}});var



SnackBar=function(_Component){_inherits(SnackBar,_Component);

























function SnackBar(props){_classCallCheck(this,SnackBar);var _this=_possibleConstructorReturn(this,(SnackBar.__proto__||Object.getPrototypeOf(SnackBar)).call(this,
props));_this.


































show=function(){var _this$state=



_this.state,transformOpacity=_this$state.transformOpacity,transformOffsetY=_this$state.transformOffsetY;var _this$props=





_this.props,fadeOutDuration=_this$props.fadeOutDuration,isStatic=_this$props.isStatic,duration=_this$props.duration;

_reactNative.Animated.parallel([
_reactNative.Animated.timing(transformOpacity,{
toValue:1,
duration:fadeOutDuration,
easing:_reactNative.Easing.inOut(_reactNative.Easing.quad)}),

_reactNative.Animated.timing(transformOffsetY,{
toValue:INITIAL_POSITION,
duration:fadeOutDuration,
easing:_reactNative.Easing.inOut(_reactNative.Easing.quad)})]).

start(function(){
if(isStatic){
return;
}

_reactNative.InteractionManager.runAfterInteractions(function(){
_reactNativeTimer2.default.setTimeout(TIMEOUT_ID,function(){
_this.hide();
},duration);
});
});
};_this.

hide=function(){var _this$state2=



_this.state,transformOpacity=_this$state2.transformOpacity,transformOffsetY=_this$state2.transformOffsetY;var _this$props2=




_this.props,fadeOutDuration=_this$props2.fadeOutDuration,onAutoDismiss=_this$props2.onAutoDismiss;

_reactNative.Animated.parallel([
_reactNative.Animated.timing(transformOpacity,{
toValue:0,
duration:fadeOutDuration,
easing:_reactNative.Easing.inOut(_reactNative.Easing.quad)}),


_reactNative.Animated.timing(transformOffsetY,{
toValue:INITIAL_POSITION*-1,
easing:_reactNative.Easing.inOut(_reactNative.Easing.quad),
duration:fadeOutDuration})]).

start(function(){onAutoDismiss&&onAutoDismiss();});
};_this.

renderButton=function(text){var onPress=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};var style=arguments[2];var
buttonColor=_this.props.buttonColor;

return(
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.buttonContainer,onPress:onPress},
_react2.default.createElement(_reactNative.Text,{style:[styles.button,style,{color:buttonColor}]},
text)));



};_this.

renderContent=function(){var _this$props3=







_this.props,confirmText=_this$props3.confirmText,onConfirm=_this$props3.onConfirm,cancelText=_this$props3.cancelText,onCancel=_this$props3.onCancel,title=_this$props3.title,textColor=_this$props3.textColor;

var titleElement=_react2.default.createElement(_reactNative.Text,{style:[styles.text,{color:textColor}]},title);

if(confirmText&&cancelText){
return(
_react2.default.createElement(_reactNative.View,null,
titleElement,
_react2.default.createElement(_reactNative.View,{style:styles.actionRow},
_this.renderButton(cancelText,onCancel,styles.flat),
_this.renderButton(confirmText,onConfirm,styles.flat))));



}

if(confirmText){
return(
_react2.default.createElement(_reactNative.View,{style:styles.inlineRow},
_react2.default.createElement(_reactNative.Text,{style:[styles.inlineText,{color:textColor}]},title),
_this.renderButton(confirmText,onConfirm)));


}

return titleElement;
};_this.state={transformOffsetY:new _reactNative.Animated.Value(0),transformOpacity:new _reactNative.Animated.Value(0)};return _this;}_createClass(SnackBar,[{key:'componentDidMount',value:function componentDidMount(){this.show();}},{key:'componentWillUnmount',value:function componentWillUnmount(){this.hide();}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){var _props=this.props,title=_props.title,confirmText=_props.confirmText,cancelText=_props.cancelText;var isPropsChanged=title!==nextProps.title||confirmText!==nextProps.confirmText||cancelText!==nextProps.cancelText;if(isPropsChanged){this.hide();this.show();}}},{key:'render',value:function render()

{var _props2=
this.props,style=_props2.style,backgroundColor=_props2.backgroundColor;

return(
_react2.default.createElement(_reactNative.Animated.View,{
style:[
styles.container,
{
opacity:this.state.transformOpacity,
transform:[{translateY:this.state.transformOffsetY}],
backgroundColor:backgroundColor},

style]},


this.renderContent()));


}}]);return SnackBar;}(_react.Component);SnackBar.defaultProps={fadeOutDuration:DEFAULT_FADEOUT_DURATION,duration:DEFAULT_DURATION,isStatic:false,onConfirm:Function,onCancel:Function,onAutoDismiss:Function,style:{},backgroundColor:STYLE_BANNER_COLOR,buttonColor:TEXT_COLOR_ACCENT,textColor:'white'};exports.default=SnackBar;
//# sourceMappingURL=SnackBar.js.map