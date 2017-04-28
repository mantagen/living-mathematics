import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configure-store.js'
import Routes from './routes.js'

const initialState = window.__INITIAL_STATE__

const store = configureStore(initialState)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      { Routes }
    </Router>
  </Provider>
  ),
  document.getElementById('app-container')
)
