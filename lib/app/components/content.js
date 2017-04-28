'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loadingMoon = require('./loading-moon');

var _loadingMoon2 = _interopRequireDefault(_loadingMoon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Content = function Content(_ref) {
  var _ref$post = _ref.post,
      id = _ref$post.id,
      title = _ref$post.title,
      content = _ref$post.content,
      error = _ref.error,
      isFetching = _ref.isFetching;
  return _react2.default.createElement(
    'section',
    null,
    isFetching && !id && _react2.default.createElement(_loadingMoon2.default, null),
    !isFetching && error && _react2.default.createElement(
      'h2',
      null,
      error
    ),
    !isFetching && !error && !id && _react2.default.createElement(
      'h2',
      null,
      'Could not find post.'
    ),
    title && _react2.default.createElement(
      'article',
      { style: { opacity: isFetching ? 0.5 : 1 } },
      _react2.default.createElement(
        'h1',
        { className: 'article__title' },
        title
      ),
      _react2.default.createElement('div', {
        className: 'article__content',
        dangerouslySetInnerHTML: { __html: content }
      })
    )
  );
};

exports.default = Content;