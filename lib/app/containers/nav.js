'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _navActions = require('./../actions/nav-actions');

var _loadingMoon = require('./../components/loading-moon');

var _loadingMoon2 = _interopRequireDefault(_loadingMoon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = function (_Component) {
  _inherits(Nav, _Component);

  function Nav() {
    _classCallCheck(this, Nav);

    return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).apply(this, arguments));
  }

  _createClass(Nav, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var dispatch = this.props.dispatch;

      dispatch((0, _navActions.fetchNavIfNeeded)());
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isFetching = _props.isFetching,
          navItems = _props.navItems;

      return _react2.default.createElement(
        'nav',
        null,
        _react2.default.createElement(
          'ul',
          { className: 'nav' },
          isFetching ? _react2.default.createElement(
            'div',
            { className: 'nav__loading' },
            _react2.default.createElement(_loadingMoon2.default, null)
          ) : navItems.map(navItem)
        )
      );
    }
  }]);

  return Nav;
}(_react.Component);

Nav.propTypes = {
  navItems: _react.PropTypes.array.isRequired,
  dispatch: _react.PropTypes.func.isRequired
};

var navItem = function navItem(_ref, index) {
  var link = _ref.link,
      title = _ref.title;
  return _react2.default.createElement(
    'li',
    { className: 'nav__item', key: 'nav__item--' + index },
    _react2.default.createElement(
      _reactRouter.Link,
      {
        to: link,
        className: 'nav__link',
        activeClassName: 'nav__link--active'
      },
      title
    )
  );
};

function mapStateToProps(_ref2) {
  var nav = _ref2.nav;

  var _ref3 = nav || {
    isFetching: true,
    items: []
  },
      isFetching = _ref3.isFetching,
      items = _ref3.items;

  return {
    isFetching: isFetching,
    navItems: items
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Nav);