export const ADD: string = 'ADD'
export const SHOW: string = 'SHOW'
export const DISMISS: string = 'DISMISS'

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
