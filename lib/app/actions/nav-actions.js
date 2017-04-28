'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RECEIVE_NAV = exports.REQUEST_NAV = undefined;
exports.requestNav = requestNav;
exports.receiveNav = receiveNav;
exports.fetchNav = fetchNav;
exports.shouldFetchNav = shouldFetchNav;
exports.fetchNavIfNeeded = fetchNavIfNeeded;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _endpoints = require('./../api/endpoints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REQUEST_NAV = exports.REQUEST_NAV = 'REQUEST_NAV';

var RECEIVE_NAV = exports.RECEIVE_NAV = 'RECEIVE_NAV';

function requestNav() {
  return {
    type: REQUEST_NAV
  };
}

function receiveNav(json) {
  return {
    type: RECEIVE_NAV,
    items: json.items.map(function (item) {
      return {
        link: (0, _endpoints.trimDomainIfExists)(item.url),
        title: item.title
      };
    })
  };
}

function fetchNav() {
  return function (dispatch) {
    dispatch(requestNav());
    return (0, _isomorphicFetch2.default)(_endpoints.menuUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      return dispatch(receiveNav(json));
    });
  };
}

function shouldFetchNav(state) {
  var items = state.items;

  return !items[0];
}

function fetchNavIfNeeded() {
  return function (dispatch, getState) {
    if (shouldFetchNav(getState().nav)) {
      return dispatch(fetchNav());
    }
  };
}