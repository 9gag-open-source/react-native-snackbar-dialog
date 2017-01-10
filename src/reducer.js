import {
  ADD,
  SHOW,
  DISMISS
} from './actions.js'

const INITIAL_STATE = {
  items: [],
  current: null
}

function transformProps (item) {
  const { title } = item
  const transformedItem = Object.assign({}, item)

  if (title) {
    transformedItem.children = title
  }

  return transformedItem
}

function show (state, payload) {
  return {
    ...state,
    current: transformProps(payload)
  }
}

function add (state, payload) {
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
    return {
      ...state,
      current: item
    }
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

export default function snackBarReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW: return show(state, action.payload)
    case ADD: return add(state, action.payload)
    case DISMISS: return dismiss(state)
    default: return state
  }
}
