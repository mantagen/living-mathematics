// @flow

import type { PostState } from './../types/types.js'

const initialState: PostState = {
  activeQuery: undefined,
  didInvalidate: false,
  isFetching: false,
  items: { },
  itemOrder: [],
  lastUpdated: undefined,
  selectedPost: undefined
}

import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_POST
} from '../actions/posts.js'

function posts (state: PostState = initialState, action: Object) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        activeQuery: action.fetchParams,
        isFetching: false,
        items: action.posts,
        itemOrder: action.order,
        lastUpdated: action.receivedAt
      })
    case SELECT_POST:
      return Object.assign({}, state, {
        selectedPost: action.id
      })
    default:
      return state
  }
}

export default posts
