// @flow

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import posts from './reducers/posts.js'

export default combineReducers({
  posts,
  routing
})
