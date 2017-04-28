'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _loadingMoon = require('../components/loading-moon');

var _loadingMoon2 = _interopRequireDefault(_loadingMoon);

var _textarea = require('../components/textarea');

var _textarea2 = _interopRequireDefault(_textarea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactForm = function ContactForm(props) {
  var error = props.error,
      handleSubmit = props.handleSubmit,
      pristine = props.pristine,
      submitting = props.submitting,
      messageSent = props.messageSent;


  return _react2.default.createElement(
    'div',
    null,
    messageSent ? _react2.default.createElement(
      'div',
      null,
      'Thank you, you\'re message has been sent.'
    ) : _react2.default.createElement(
      'form',
      { className: 'form form--contact', onSubmit: handleSubmit },
      _react2.default.createElement(
        'div',
        { className: 'form__group' },
        _react2.default.createElement(
          'label',
          { className: 'form__label', htmlFor: 'name' },
          'Name'
        ),
        _react2.default.createElement(_reduxForm.Field, { name: 'name', type: 'text', component: 'input' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'form__group' },
        _react2.default.createElement(
          'label',
          { className: 'form__label', htmlFor: 'email' },
          'Email'
        ),
        _react2.default.createElement(_reduxForm.Field, { name: 'email', type: 'email', component: 'input' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'form__group' },
        _react2.default.createElement(
          'label',
          { className: 'form__label', htmlFor: 'message' },
          'Your message'
        ),
        _react2.default.createElement(_reduxForm.Field, { name: 'message', component: _textarea2.default })
      ),
      _react2.default.createElement(
        'button',
        {
          className: 'form__submit',
          type: 'submit',
          disabled: pristine || submitting
        },
        submitting ? _react2.default.createElement(
          'div',
          { className: 'form__sending' },
          _react2.default.createElement(_loadingMoon2.default, null)
        ) : _react2.default.createElement(
          'div',
          { className: 'form__font--reset' },
          'Send'
        )
      ),
      error && _react2.default.createElement(
        'div',
        { className: 'form__error' },
        'Error: ',
        error
      )
    )
  );
};

// Decorate the form component
exports.default = (0, _reduxForm.reduxForm)({
  form: 'contact' // a unique name for this form
})(ContactForm);