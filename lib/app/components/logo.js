'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logo = function Logo() {
  return _react2.default.createElement(
    'div',
    { className: 'logo logo_trefoil' },
    _react2.default.createElement('img', { src: '/assets/img/mirror-trefoil.jpg' })
  );
};

exports.default = Logo;