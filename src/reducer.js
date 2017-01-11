// @flow

import {
  ADD,
  SHOW,
  DISMISS
} from './actions.js'

import type {
  SnackItemType,
  StateType,
  ActionType
} from './type'

export const INITIAL_STATE = {
  items: [],
  current: null
}

export function transformProps (item: SnackItemType) {
  const { title } = item
  const transformedItem = Object.assign({}, item)

  if (title) {
    transformedItem.children = title
    delete transformedItem.title
  }

  return transformedItem
}

function show (state, payload: SnackItemType) {
  return {
    ...state,
    current: transformProps(payload)
  }
}

function add (state, payload: SnackItemType) {
  const item = transformProps(payload)

  if (!state.current && state.items.length) {
    const [current, ...items] = state.items

    return {
      ...state,
      items: items.concat([item]),
      current
    }
  }

  if (!state.current) {
    return show(state, payload)
  }

  return {
    ...state,
    items: state.items.concat([item])
  }
}

function dismiss (state) {
  if (!state.items.length) {
    return {
      ...state,
      current: null
    }
  }

  const [current, ...items] = state.items

  return {
    ...state,
    items,
    current
  }
}

export default function snackBarReducer (state: StateType = INITIAL_STATE, action: ActionType) {
  switch (action.type) {
    case SHOW: return show(state, action.payload)
    case ADD: return add(state, action.payload)
    case DISMISS: return dismiss(state)
    default: return state
  }
}
