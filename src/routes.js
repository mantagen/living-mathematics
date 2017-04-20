import React from 'react'

import { Route } from 'react-router'

import App from './app.jsx'

import Contact from './routes/contact.jsx'
import Page from './routes/page.jsx'
import Posts from './routes/posts.jsx'
import Post from './routes/post.jsx'

export default (
  <Route component={App}>
    <Route path='/' slug={'home'} component={Page} />
    <Route path='about' slug={'about'} component={Page} />
    <Route path='contact' slug={'contact'} component={Contact} />
    <Route path=':postType' component={Posts} />
    <Route path=':postType/:id' component={Post} />
  </Route>
)
