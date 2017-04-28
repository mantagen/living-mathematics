'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingMoon = function LoadingMoon() {
  return _react2.default.createElement('div', {
    className: 'loading loading_moon',
    'aria-hidden': 'true',
    role: 'progressbar',
    'aria-label': 'Loading\u2026'
  });
};

exports.default = LoadingMoon;