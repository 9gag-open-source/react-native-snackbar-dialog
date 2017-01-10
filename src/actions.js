export const ADD: string = 'SNACKBAR.ADD'
export const SHOW: string = 'SNACKBAR.SHOW'
export const DISMISS: string = 'SNACKBAR.DISMISS'

export function add (item) {
  return {
    type: ADD,
    payload: item
  }
}

export function show (item) {
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
