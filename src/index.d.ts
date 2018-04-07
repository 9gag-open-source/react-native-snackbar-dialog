import { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

type SnackPosition = 'bottom' | 'top';

export interface SnackBarOptions {
  title?: string;
  id?: string;

  // Button
  confirmText?: string;
  onConfirm?: (event: GestureResponderEvent) => void;
  cancelText?: string;
  onCancel?: (event: GestureResponderEvent) => void;

  // Style
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  buttonColor?: string;
  textColor?: string;
  position?: SnackPosition;

  // Behaviour
  onAutoDismiss?: () => void;
  fadeOutDuration?: number;
  duration?: number;
  isStatic?: boolean;
  tapToClose?: boolean;

  // Content
  renderContent?: () => ReactNode;
}

interface SnackBarManager {
  add: (title: string, options?: SnackBarOptions, callback?: () => void) => void;
  show: (title: string, options?: SnackBarOptions, callback?: () => void) => void;
  dismiss: (callback?: () => void) => void;
}

declare const SnackBarManager: SnackBarManager;

export default SnackBarManager;
