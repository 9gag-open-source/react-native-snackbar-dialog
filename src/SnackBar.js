// @flow

import React, { Component } from 'react'
import Timer from 'react-native-timer'
import type { SnackItemType } from './type'

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
    fontSize: 16
  },

  buttonContainer: {
    paddingHorizontal: 4
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
  },

  flat: {
    fontSize: 14,
    marginHorizontal: 16
  }
})

export default class SnackBar extends Component {
  state: {
    transformOffsetY: any,
    transformOpacity: any
  }

  props: SnackItemType

  static defaultProps = {
    // Behaviour
    fadeOutDuration: DEFAULT_FADEOUT_DURATION,
    duration: DEFAULT_DURATION,
    isStatic: false,

    // Functions
    onConfirm: Function,
    onCancel: Function,
    onAutoDismiss: Function,

    // Styles
    style: {},
    backgroundColor: STYLE_BANNER_COLOR,
    buttonColor: TEXT_COLOR_ACCENT,
    textColor: 'white'
  }

  constructor (props: SnackItemType) {
    super(props)

    this.state = {
      transformOffsetY: new Animated.Value(0),
      transformOpacity: new Animated.Value(0)
    }
  }

  componentDidMount () {
    this.show()
  }

  componentWillUnmount () {
    this.hide()
  }

  componentWillReceiveProps (nextProps: SnackItemType) {
    const {
      title,
      confirmText,
      cancelText
    } = this.props

    const isPropsChanged = (
      title !== nextProps.title ||
      confirmText !== nextProps.confirmText ||
      cancelText !== nextProps.cancelText
    )

    if (isPropsChanged) {
      this.hide()
      this.show()
    }
  }

  show = () => {
    const {
      transformOpacity,
      transformOffsetY
    } = this.state

    const {
      fadeOutDuration,
      isStatic,
      duration
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
    ]).start(() => {
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

  hide = () => {
    const {
      transformOpacity,
      transformOffsetY
    } = this.state

    const {
      fadeOutDuration,
      onAutoDismiss
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
    ]).start(() => { onAutoDismiss && onAutoDismiss() })
  }

  renderButton = (text: string, onPress: Function = () => {}, style?: Object) => {
    const { buttonColor } = this.props

    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
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
      title,
      textColor
    } = this.props

    const titleElement = <Text style={[styles.text, { color: textColor }]}>{title}</Text>

    if (confirmText && cancelText) {
      return (
        <View>
          {titleElement}
          <View style={styles.actionRow}>
            { this.renderButton(cancelText, onCancel, styles.flat) }
            { this.renderButton(confirmText, onConfirm, styles.flat) }
          </View>
        </View>
      )
    }

    if (confirmText) {
      return (
        <View style={styles.inlineRow}>
          <Text style={[styles.inlineText, { color: textColor }]}>{title}</Text>
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
