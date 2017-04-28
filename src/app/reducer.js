// @flow

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import nav from './reducers/nav-reducer'
import posts from './reducers/post-reducer'

export default combineReducers({
  form,
  nav,
  posts,
  routing
})
