import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configure-store.js'

import App from './app.jsx'

import About from './routes/about.jsx'
import Contact from './routes/contact.jsx'
import Page from './routes/page.jsx'
import Posts from './routes/posts.jsx'
import Post from './routes/post.jsx'
import NoMatch from './routes/no-match.jsx'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path='/' slug={'home'} component={Page} />
        <Route path='about' slug={'about'} component={Page} />
        <Route path='contact' slug={'contact'} component={Page} />
        <Route path=':postType' component={Posts} />
        <Route path=':postType/:id' component={Post} />
      </Route>
    </Router>
  </Provider>
  ),
  document.getElementById('app-container')
)
