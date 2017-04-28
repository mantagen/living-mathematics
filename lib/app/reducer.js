'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reduxForm = require('redux-form');

var _navReducer = require('./reducers/nav-reducer');

var _navReducer2 = _interopRequireDefault(_navReducer);

var _postReducer = require('./reducers/post-reducer');

var _postReducer2 = _interopRequireDefault(_postReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  form: _reduxForm.reducer,
  nav: _navReducer2.default,
  posts: _postReducer2.default,
  routing: _reactRouterRedux.routerReducer
});