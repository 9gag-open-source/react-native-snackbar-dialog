// @flow

export type SnackItemType = {
  title: string,

  // Button
  confirmText?: string,
  onConfirm?: Function,
  cancelText?: string,
  onCancel?: Function,

  // Style
  style?: Object,
  backgroundColor?: string,
  buttonColor?: string,
  textColor?: string,

  // Behaviour
  onAutoDismiss?: Function,
  fadeOutDuration?: number,
  duration?: number,
  isStatic?: boolean
}
