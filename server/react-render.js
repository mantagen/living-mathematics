'use strict'

import React from 'react'
import { renderToString as Render } from 'react-dom/server'
import { RouterContext, match as Match } from 'react-router'
import { Provider } from 'react-redux'
import Routes from '../src/routes.js'
import CreateStore from '../src/store/configure-store.js'

const store = CreateStore()

export default (request, reply) => {
  const initialState = store.getState()

  Match({ routes: Routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      reply(error)
      return
    }
    if (redirectLocation) {
      reply.redirect(redirectLocation)
      return
    }

    const body = Render(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    )

    reply.view('index.html', { body, initialState: JSON.stringify(initialState) })
  })
}
