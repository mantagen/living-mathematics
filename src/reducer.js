// @flow

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import nav from './reducers/nav-reducer.js'
import posts from './reducers/posts.js'

export default combineReducers({
  form,
  nav,
  posts,
  routing
})
