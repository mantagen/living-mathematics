'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postActions = require('../actions/post-actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  activeQuery: undefined,
  didInvalidate: false,
  error: undefined,
  isFetching: false,
  postsByType: {},
  lastUpdated: undefined,
  selectedPost: {
    postType: 'pages',
    slug: 'home'
  }
};

function posts() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _postActions.REQUEST_POSTS:
      {
        return Object.assign({}, state, {
          error: undefined,
          isFetching: true
        });
      }
    case _postActions.RECEIVE_POSTS:
      {
        var fetchParams = action.fetchParams,
            postType = action.fetchParams.postType,
            _posts = action.posts,
            receivedAt = action.receivedAt;

        var newPosts = Object.assign({}, state.postsByType[postType], _posts);
        return Object.assign({}, state, {
          activeQuery: fetchParams,
          isFetching: false,
          postsByType: Object.assign({}, state.postsByType, _defineProperty({}, postType, newPosts)),
          lastUpdated: receivedAt
        });
      }
    case _postActions.REQUEST_POSTS_FAILED:
      {
        return Object.assign({}, state, {
          isFetching: false,
          error: action.error
        });
      }
    case _postActions.SELECT_POST:
      {
        var _postType = action.postType,
            slug = action.slug;

        return Object.assign({}, state, {
          selectedPost: { postType: _postType, slug: slug }
        });
      }
    default:
      return state;
  }
}

exports.default = posts;