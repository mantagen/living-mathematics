'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postMap = exports.fileMap = exports.SELECT_POST = exports.REQUEST_POSTS_FAILED = exports.RECEIVE_POSTS = exports.REQUEST_POSTS = undefined;
exports.selectPost = selectPost;
exports.requestPosts = requestPosts;
exports.receivePosts = receivePosts;
exports.requestPostsFailed = requestPostsFailed;
exports.fetchPosts = fetchPosts;
exports.shouldFetchPosts = shouldFetchPosts;
exports.fetchPostsIfNeeded = fetchPostsIfNeeded;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _endpoints = require('./../api/endpoints');

var _responseHandler = require('./../api/response-handler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REQUEST_POSTS = exports.REQUEST_POSTS = 'REQUEST_POSTS';
var RECEIVE_POSTS = exports.RECEIVE_POSTS = 'RECEIVE_POSTS';
var REQUEST_POSTS_FAILED = exports.REQUEST_POSTS_FAILED = 'REQUEST_POSTS_FAILED';
var SELECT_POST = exports.SELECT_POST = 'SELECT_POST';

var fileMap = exports.fileMap = function fileMap(acf) {
  if (!acf) {
    return undefined;
  } else if (!acf.file) {
    return undefined;
  } else {
    var fnArr = acf.file.filename.split('.');
    return {
      id: acf.file.id,
      url: acf.file.url,
      ext: fnArr[fnArr.length - 1],
      description: acf.description
    };
  }
};

var postMap = exports.postMap = function postMap(post) {
  return {
    content: post.content ? post.content.rendered : '',
    id: post.id,
    date: post.date,
    file: fileMap(post.acf),
    link: post.link,
    slug: post.slug,
    snippet: post.excerpt ? post.excerpt.rendered : '',
    title: post.title.rendered,
    type: post.type
  };
};

function selectPost(identifier) {
  var postType = identifier.postType,
      slug = identifier.slug;

  return {
    type: SELECT_POST,
    postType: postType,
    slug: slug
  };
}

function requestPosts(fetchParams) {
  return {
    type: REQUEST_POSTS,
    fetchParams: fetchParams
  };
}

function receivePosts(fetchParams, json) {
  return {
    type: RECEIVE_POSTS,
    fetchParams: fetchParams,
    posts: json.filter(function (post) {
      return post.status === 'publish';
    }).reduce(function (accum, post) {
      accum[post.slug] = postMap(post);
      return accum;
    }, {}),
    receivedAt: Date.now()
  };
}

function requestPostsFailed() {
  return {
    type: REQUEST_POSTS_FAILED,
    error: 'There was a problem connecting, please try refreshing the page.'
  };
}

function fetchPosts(fetchParams) {
  return function (dispatch) {
    dispatch(requestPosts(fetchParams));
    return (0, _isomorphicFetch2.default)((0, _endpoints.fetchUrlify)(fetchParams)).then(_responseHandler.responseHandler).then(function (response) {
      return response.json();
    }).then(function (json) {
      return dispatch(receivePosts(fetchParams, json));
    }).catch(function (err) {
      return dispatch(requestPostsFailed(err));
    });
  };
}

function shouldFetchPosts(state, fetchParams) {
  var postType = fetchParams.postType,
      slug = fetchParams.query.slug;
  var items = state.postsByType[postType],
      activeQuery = state.activeQuery;

  if (!items) {
    return true;
  } else if (!Object.keys(items)[0]) {
    return true;
  } else if (items.hasOwnProperty(slug)) {
    return false;
    // note: order of fetchParams matters for below condition to have any use
  } else if (JSON.stringify(activeQuery) !== JSON.stringify(fetchParams)) {
    return true;
  } else if (state.isFetching) {
    return false;
  } else {
    return state.didInvalidate;
  }
}

function fetchPostsIfNeeded(fetchParams) {
  return function (dispatch, getState) {
    if (shouldFetchPosts(getState().posts, fetchParams)) {
      return dispatch(fetchPosts(fetchParams));
    }
  };
}