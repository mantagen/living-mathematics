'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reduxForm = require('redux-form');

var _contactForm = require('../components/contact-form');

var _contactForm2 = _interopRequireDefault(_contactForm);

var _responseHandler = require('../api/response-handler');

var _responseHandler2 = _interopRequireDefault(_responseHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContactPage = function (_React$Component) {
  _inherits(ContactPage, _React$Component);

  function ContactPage() {
    _classCallCheck(this, ContactPage);

    var _this = _possibleConstructorReturn(this, (ContactPage.__proto__ || Object.getPrototypeOf(ContactPage)).call(this));

    _this.state = {
      messageSent: false
    };
    return _this;
  }

  _createClass(ContactPage, [{
    key: 'submit',
    value: function submit(values) {
      var _this2 = this;

      return (0, _isomorphicFetch2.default)('http://localhost:1212/contact0', {
        method: 'post',
        body: JSON.stringify(values)
      }).then(_responseHandler2.default).then(function () {
        _this2.setState({
          messageSent: true
        });
      }).catch(function (err) {
        throw new _reduxForm.SubmissionError({ _error: err.message });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_contactForm2.default, { onSubmit: this.submit, messageSent: this.state.messageSent });
    }
  }]);

  return ContactPage;
}(_react2.default.Component);

exports.default = ContactPage;