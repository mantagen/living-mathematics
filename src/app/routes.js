import React from 'react'

import { Route } from 'react-router'

import App from './app'

import Contact from './routes/contact'
import Page from './routes/page'
import Posts from './routes/posts'
import Post from './routes/post'

export default (
  <Route component={App}>
    <Route path='/' slug={'home'} component={Page} />
    <Route path='contact' slug={'contact'} component={Contact} />
    <Route path=':slug' component={Page} />
    <Route path=':postType/all' component={Posts} />
    <Route path=':postType/:slug' component={Post} />
  </Route>
)
