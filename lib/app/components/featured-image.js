'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeaturedImage = function FeaturedImage() {
  return _react2.default.createElement(
    'div',
    { className: 'featured-image' },
    _react2.default.createElement('img', { src: '/assets/img/home.jpg' })
  );
};

exports.default = FeaturedImage;