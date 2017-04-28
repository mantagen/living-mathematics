'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostListItem = function PostListItem(_ref) {
  var link = _ref.link,
      title = _ref.title,
      file = _ref.file,
      id = _ref.id,
      slug = _ref.slug,
      snippet = _ref.snippet,
      type = _ref.type;

  snippet = snippet || file && file.description;

  return _react2.default.createElement(
    'li',
    { className: 'article-listItem' },
    _react2.default.createElement(
      _reactRouter.Link,
      { to: file ? file.url : '/' + type + '/' + slug, target: file && '_blank' },
      _react2.default.createElement(
        'h2',
        { className: 'article-listItem__title' },
        title,
        file && _react2.default.createElement(
          'span',
          { className: 'article-listItem__filetype' },
          file.ext
        )
      ),
      _react2.default.createElement('div', {
        className: 'article-listItem__snippet',
        dangerouslySetInnerHTML: { __html: snippet }
      })
    )
  );
};

PostListItem.propTypes = {
  link: _react.PropTypes.string.isRequired,
  slug: _react.PropTypes.string.isRequired,
  title: _react.PropTypes.string.isRequired,
  snippet: _react.PropTypes.string.isRequired,
  file: _react.PropTypes.object,
  type: _react.PropTypes.string
};

exports.default = PostListItem;