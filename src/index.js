/* @flow */

import React, { Component, PropTypes } from 'react'
import Timer from 'react-native-timer'

import {
  View,
  Animated,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  Easing,
  InteractionManager
} from 'react-native'

const DEFAULT_DURATION: number = 5000
const DEFAULT_FADEOUT_DURATION: number = 250
const INITIAL_POSITION: number = -180

const STYLE_BANNER_COLOR: string = '#000000'
const TEXT_COLOR_ACCENT: string = '#0088ff'

const TIMEOUT_ID: string = 'snackBar'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: INITIAL_POSITION,
    width
  },

  text: {
    padding: 24,
    fontSize: 16
  },

  inlineText: {
    fontSize: 16,
  },

  button: {
    fontSize: 16,
    fontWeight: '500'
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 18,
    marginBottom: 6
  },

  inlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18
  }
})

export default class SnackBar extends Component {
  static propTypes = {
    // Display message
    children: PropTypes.string.isRequired,

    // Primary and secondary buttons
    confirmText: PropTypes.string,
    onConfirm: PropTypes.func,
    cancelText: PropTypes.string,
    onCancel: PropTypes.func,
    
    // Style override
    style: PropTypes.object,
    backgroundColor: PropTypes.string,
    buttonColor: PropTypes.string,
    textColor: PropTypes.string,

    // Control the dismiss behaviour
    onDismiss: PropTypes.func,
    fadeOutDuration: PropTypes.number,
    duration: PropTypes.number,
    isStatic: PropTypes.bool
  }

  static defaultProps = {
    fadeOutDuration: DEFAULT_FADEOUT_DURATION,
    onConfirm: () => {},
    onCancel: () => {},
    onDismiss: () => {},
    duration: DEFAULT_DURATION,
    isStatic: false,

    // Default styles
    style: {},
    backgroundColor: STYLE_BANNER_COLOR,
    buttonColor: TEXT_COLOR_ACCENT,
    textColor: 'white'
  }

  constructor (props) {
    super(props)

    this.state = {
      transformOffsetY: new Animated.Value(0),
      transformOpacity: new Animated.Value(0)
    }
  }

  componentDidMount () {
    const { isStatic, duration } = this.props

    this.show(() => {
      if (isStatic) {
        return
      }

      InteractionManager.runAfterInteractions(() => {
        Timer.setTimeout(TIMEOUT_ID, () => {
          this.hide()
        }, duration)
      })
    })
  }

  componentWillUnmount () {
    this.hide()
  }

  show = (callback: () => {}) => {
    const {
      transformOpacity,
      transformOffsetY
    } = this.state

    const {
      fadeOutDuration
    } = this.props

    Animated.parallel([
      Animated.timing(transformOpacity, {
        toValue: 1,
        duration: fadeOutDuration,
        easing: Easing.inOut(Easing.quad)
      }),
      Animated.timing(transformOffsetY, {
        toValue: INITIAL_POSITION,
        duration: fadeOutDuration,
        easing: Easing.inOut(Easing.quad)
      })
    ]).start(callback)
  }

  hide = () => {
    const {
      transformOpacity,
      transformOffsetY
    } = this.state

    const {
      fadeOutDuration,
      onDismiss
    } = this.props

    Animated.parallel([
      Animated.timing(transformOpacity, {
        toValue: 0,
        duration: fadeOutDuration,
        easing: Easing.inOut(Easing.quad)

      }),
      Animated.timing(transformOffsetY, {
        toValue: INITIAL_POSITION * -1,
        easing: Easing.inOut(Easing.quad),
        duration: fadeOutDuration
      })
    ]).start(() => onDismiss())
  }

  renderButton = (text, onPress: () => {}, style) => {
    const { buttonColor } = this.props

    return (
      <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} onPress={onPress}>
        <Text style={[styles.button, style, { color: buttonColor }]}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  renderContent = () => {
    const {
      confirmText,
      onConfirm,
      cancelText,
      onCancel,
      children,
      textColor
    } = this.props

    const titleElement = <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    
    if (confirmText && cancelText) {
      const flatStyles = { fontSize: 14, marginHorizontal: 16 }

      return (
        <View>
          {titleElement}
          <View style={styles.actionRow}>
            { this.renderButton(cancelText, onCancel, flatStyles) }
            { this.renderButton(confirmText, onConfirm, flatStyles) }
          </View>
        </View>
      )
    }

    if (confirmText) {
      return (
        <View style={styles.inlineRow}>
          <Text style={[styles.inlineText, { color: textColor }]}>{children}</Text>
          { this.renderButton(confirmText, onConfirm) }
        </View>
      )
    }

    return titleElement
  }

  render () {
    const { style, backgroundColor } = this.props

    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: this.state.transformOpacity,
            transform: [{ translateY: this.state.transformOffsetY }],
            backgroundColor
          },
          style
        ]}
      >
        { this.renderContent() }
      </Animated.View>
    )
  }
}
