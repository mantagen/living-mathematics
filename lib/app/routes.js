'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _contact = require('./routes/contact');

var _contact2 = _interopRequireDefault(_contact);

var _page = require('./routes/page');

var _page2 = _interopRequireDefault(_page);

var _posts = require('./routes/posts');

var _posts2 = _interopRequireDefault(_posts);

var _post = require('./routes/post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { component: _app2.default },
  _react2.default.createElement(_reactRouter.Route, { path: '/', slug: 'home', component: _page2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'contact', slug: 'contact', component: _contact2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: ':slug', component: _page2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: ':postType/all', component: _posts2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: ':postType/:slug', component: _post2.default })
);