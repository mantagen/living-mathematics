'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _postActions = require('../actions/post-actions');

var _content = require('../components/content');

var _content2 = _interopRequireDefault(_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Post = function (_Component) {
  _inherits(Post, _Component);

  function Post() {
    _classCallCheck(this, Post);

    return _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).apply(this, arguments));
  }

  _createClass(Post, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          dispatch = _props.dispatch,
          _props$params = _props.params,
          postType = _props$params.postType,
          slug = _props$params.slug;

      var params = { postType: postType, query: { slug: slug } };
      dispatch((0, _postActions.selectPost)({ postType: postType, slug: slug }));
      dispatch((0, _postActions.fetchPostsIfNeeded)(params));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var prevSlug = prevProps.params.slug;
      var _props2 = this.props,
          dispatch = _props2.dispatch,
          _props2$params = _props2.params,
          postType = _props2$params.postType,
          newSlug = _props2$params.slug;

      var slugChanged = newSlug !== prevSlug;
      slugChanged && dispatch((0, _postActions.selectPost)({ postType: postType, slug: newSlug }));
      slugChanged && dispatch((0, _postActions.fetchPostsIfNeeded)({ postType: postType, query: { slug: newSlug } }));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_content2.default, this.props);
    }
  }]);

  return Post;
}(_react.Component);

Post.propTypes = {
  post: _react.PropTypes.object.isRequired,
  isFetching: _react.PropTypes.bool.isRequired,
  lastUpdated: _react.PropTypes.number,
  dispatch: _react.PropTypes.func.isRequired
};

function mapStateToProps(_ref) {
  var posts = _ref.posts;
  var error = posts.error,
      _posts$selectedPost = posts.selectedPost,
      postType = _posts$selectedPost.postType,
      slug = _posts$selectedPost.slug,
      postsByType = posts.postsByType,
      isFetching = posts.isFetching;

  var post = {};
  if (postsByType[postType]) {
    post = postsByType[postType][slug] || {};
  }

  return {
    error: error,
    isFetching: isFetching,
    post: post
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Post);