'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUrlify = exports.menuUrl = exports.WPQueryify = exports.trimDomainIfExists = exports.BASE_URL = exports.SITE_DOMAIN = undefined;

var _querystringBrowser = require('querystring-browser');

var _querystringBrowser2 = _interopRequireDefault(_querystringBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SITE_DOMAIN = exports.SITE_DOMAIN = 'http://livingmathematics.techniqueandquo.uk/wp';
var BASE_URL = exports.BASE_URL = 'http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp/v2';
var queryMapping = {
  category: 'filter[cat_name]',
  slug: 'filter[name]',
  searchTerm: 'search'
};

var trimDomainIfExists = exports.trimDomainIfExists = function trimDomainIfExists(url) {
  return url.split(SITE_DOMAIN)[1] || url;
};

var WPQueryify = exports.WPQueryify = function WPQueryify(query) {
  return keysMap(queryMapping)(query);
};

var keysMap = function keysMap(mapping) {
  return function (query) {
    return Object.keys(query).reduce(function (prev, curr) {
      if (query[curr]) {
        prev[mapping[curr]] = query[curr];
      }
      return prev;
    }, {});
  };
};

// for now menu id to be input manually to save second request being made
var menuId = 5;
var menuUrl = exports.menuUrl = 'http://livingmathematics.techniqueandquo.uk/wp/wp-json/wp-api-menus/v2/menus/' + menuId;

var fetchUrlify = exports.fetchUrlify = function fetchUrlify(params) {
  var id = params.id,
      _params$postType = params.postType,
      postType = _params$postType === undefined ? 'pages' : _params$postType,
      _params$query = params.query,
      query = _params$query === undefined ? {} : _params$query;

  if (id) {
    return BASE_URL + '/' + postType + '/' + id;
  }
  if (!Object.keys(query)[0]) {
    return BASE_URL + '/' + postType;
  }
  var queryObject = WPQueryify(query);
  var queryString = Object.keys(queryObject).reduce(function (prev, curr, i, arr) {
    prev = prev + curr + '=' + _querystringBrowser2.default.escape(queryObject[curr]) + (i < arr.length - 1 ? '&' : '');
    return prev;
  }, '');
  return BASE_URL + '/' + postType + '?' + queryString;
};