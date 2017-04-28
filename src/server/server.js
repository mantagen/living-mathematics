import Hapi from 'hapi'
import Path from 'path'
import Inert from 'inert'
import Vision from 'vision'

import reactRender from './react-render'
import { send } from './services/nodemail'

// Create a server with a host and port
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '../../assets')
      }
    }
  }
})
server.connection({
  host: process.env.host || 'localhost',
  port: process.env.PORT || 1212
})

const logger = (request, reply) => {
  console.log(request.method.toUpperCase() + ': ' + request.url.path)
  reply.continue()
}
server.ext('onRequest', logger)

server.register([Vision, Inert], (err) => {
  if (err) throw err

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views'
  })
  server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  })
  server.route({
    method: 'POST',
    path: '/contact',
    handler: function (request, reply) {
      const { payload } = request
      send(JSON.parse(payload), (err) => {
        if (err) {
          reply({ status: 'not ok' }).code(503)
        } else {
          reply({ status: 'ok' })
        }
      })
    }
  })
  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: reactRender
  })
})

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
