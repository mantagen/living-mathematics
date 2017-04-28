'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _configureStore = require('./store/configure-store');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = window.__INITIAL_STATE__;

var store = (0, _configureStore2.default)(initialState);
var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouter.Router,
    { history: history },
    _routes2.default
  )
), document.getElementById('app-container'));