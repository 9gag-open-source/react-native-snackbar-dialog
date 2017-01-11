// @flow

import type { SnackItemType } from './type'

export const ADD: string = 'SNACKBAR.ADD'
export const SHOW: string = 'SNACKBAR.SHOW'
export const DISMISS: string = 'SNACKBAR.DISMISS'

export function add (item: SnackItemType) {
  return {
    type: ADD,
    payload: item
  }
}

export function show (item: SnackItemType) {
  return {
    type: SHOW,
    payload: item
  }
}

export function dismiss () {
  return {
    type: DISMISS
  }
}
