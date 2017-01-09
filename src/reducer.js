import {
  ADD,
  SHOW,
  DISMISS
} from './actions.js'

const INITIAL_STATE = {
  items: [],
  current: null
}

function show (state, payload) {
  return {
    ...state,
    current: Object.assign({}, payload)
  }
}

function add (state, payload) {
  if (!state.current) {
    return {
      ...state,
      current: Object.assign({}, payload)
    }
  }

  return {
    ...state,
    items: state.items.concat([payload])
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
