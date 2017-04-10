import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configure-store.js'

import App from './app.jsx'

import About from './routes/about.jsx'
import Contact from './routes/contact.jsx'
import Posts from './routes/posts.jsx'
import Post from './routes/post.jsx'
import NoMatch from './routes/no-match.jsx'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='about' component={About}/>
        <Route path='contact' component={Contact}/>
        <Route path='blog' component={Posts} postType='posts'/>
        <Route path='archive' component={Posts} postType='archive'/>
        <Route path='post/:id' component={Post}/>
        <Route path='*' component={NoMatch}/>
      </Route>
    </Router>
  </Provider>
  ),
  document.getElementById('app-container')
)
