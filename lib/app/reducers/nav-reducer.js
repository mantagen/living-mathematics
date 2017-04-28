'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _navActions = require('../actions/nav-actions');

var initialState = {
  isFetching: false,
  items: []
};

function nav() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _navActions.REQUEST_NAV:
      return Object.assign({}, state, {
        isFetching: true
      });
    case _navActions.RECEIVE_NAV:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items
      });
    default:
      return state;
  }
}

exports.default = nav;