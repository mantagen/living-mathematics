'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loggerMiddleware = (0, _reduxLogger.createLogger)();

function configureStore(preloadedState) {
  return (0, _redux.createStore)(_reducer2.default, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware));
}