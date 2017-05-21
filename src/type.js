// @flow

type SnackPosition = 'bottom' | 'top';

export type SnackItemType = {
  title: string,
  id?: string, // Once ID is specified, duplicated item won't be added to the queue

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
  position?: SnackPosition,

  // Behaviour
  onAutoDismiss?: Function,
  fadeOutDuration?: number,
  duration?: number,
  isStatic?: boolean,
  tapToClose?: boolean,
  
  // Content
  renderContent?: Function
}
