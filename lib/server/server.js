'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _reactRender = require('./react-render');

var _reactRender2 = _interopRequireDefault(_reactRender);

var _nodemail = require('./services/nodemail');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a server with a host and port
var server = new _hapi2.default.Server({
  connections: {
    routes: {
      files: {
        relativeTo: _path2.default.join(__dirname, '../../assets')
      }
    }
  }
});
server.connection({
  host: 'localhost',
  port: 1212
});

var logger = function logger(request, reply) {
  console.log(request.method.toUpperCase() + ': ' + request.url.path);
  reply.continue();
};
server.ext('onRequest', logger);

server.register([_vision2.default, _inert2.default], function (err) {
  if (err) throw err;

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views'
  });
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
  });
  server.route({
    method: 'POST',
    path: '/contact',
    handler: function handler(request, reply) {
      var payload = request.payload;

      (0, _nodemail.send)(JSON.parse(payload), function (err) {
        if (err) {
          reply({ status: 'not ok' }).code(503);
        } else {
          reply({ status: 'ok' });
        }
      });
    }
  });
  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: _reactRender2.default
  });
});

// Start the server
server.start(function (err) {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});