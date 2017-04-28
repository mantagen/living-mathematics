'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _routes = require('../app/routes');

var _routes2 = _interopRequireDefault(_routes);

var _configureStore = require('../app/store/configure-store');

var _configureStore2 = _interopRequireDefault(_configureStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _configureStore2.default)();

exports.default = function (request, reply) {
  var initialState = store.getState();

  (0, _reactRouter.match)({ routes: _routes2.default, location: request.url }, function (error, redirectLocation, renderProps) {
    if (error) {
      reply(error);
      return;
    }
    if (redirectLocation) {
      reply.redirect(redirectLocation);
      return;
    }

    var body = (0, _server.renderToString)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(_reactRouter.RouterContext, renderProps)
    ));

    reply.view('index.html', { body: body, initialState: JSON.stringify(initialState) });
  });
};