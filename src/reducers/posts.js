// @flow

import type { State } from './../types/types.js'

const initialState: State = {
  activeQuery: undefined,
  didInvalidate: false,
  isFetching: false,
  items: { },
  postIdsBySlug: { },
  postsByCategory: { blog: [] },
  selectedCategory: 'blog',
  selectedPost: undefined
}

import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_POST,
  SELECT_CATEGORY
} from '../actions/posts.js'

function posts (state: State = initialState, action: Object) {
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
        lastUpdated: action.receivedAt,
        postsByCategory: Object.assign({}, state.postsByCategory, {
          [action.fetchParams.query.category]: Object.keys(action.posts)
        })
      })
    case SELECT_POST:
      return Object.assign({}, state, {
        selectedPost: action.id
      })
    case SELECT_CATEGORY:
      return Object.assign({}, state, {
        selectedCategory: action.category
      })
    default:
      return state
  }
}

export default posts
