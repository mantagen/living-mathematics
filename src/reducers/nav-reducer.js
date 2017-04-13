// @flow

import type { NavState } from './../types/types.js'

const initialState: NavState = {
  isFetching: false,
  items: []
}

import {
  REQUEST_NAV,
  RECEIVE_NAV
} from '../actions/nav-actions.js'

function nav (state: NavState = initialState, action: Object) {
  switch (action.type) {
    case REQUEST_NAV:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_NAV:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items
      })
    default:
      return state
  }
}

export default nav
