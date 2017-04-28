// @flow

import type { PostState } from './../types/types'

const initialState: PostState = {
  activeQuery: undefined,
  didInvalidate: false,
  error: undefined,
  isFetching: false,
  postsByType: {},
  lastUpdated: undefined,
  selectedPost: {
    postType: 'pages',
    slug: 'home'
  }
}

import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POSTS_FAILED,
  SELECT_POST
} from '../actions/post-actions'

function posts (state: PostState = initialState, action: Object) {
  switch (action.type) {
    case REQUEST_POSTS: {
      return Object.assign({}, state, {
        error: undefined,
        isFetching: true
      })
    }
    case RECEIVE_POSTS: {
      const { fetchParams, fetchParams: { postType }, posts, receivedAt } = action
      const newPosts = Object.assign({}, state.postsByType[postType], posts)
      return Object.assign({}, state, {
        activeQuery: fetchParams,
        isFetching: false,
        postsByType: Object.assign({}, state.postsByType, { [postType]: newPosts }),
        lastUpdated: receivedAt
      })
    }
    case REQUEST_POSTS_FAILED: {
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    }
    case SELECT_POST: {
      const { postType, slug } = action
      return Object.assign({}, state, {
        selectedPost: { postType, slug }
      })
    }
    default:
      return state
  }
}

export default posts
