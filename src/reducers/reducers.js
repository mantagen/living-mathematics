import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import {
  SELECT_CATEGORY,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions/posts.js'

function selectedCategory (state = 'blog', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}
function posts (state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByCategory (state = { }, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.category]: posts(state[action.category], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByCategory,
  selectedCategory,
  routing
})

export default rootReducer
