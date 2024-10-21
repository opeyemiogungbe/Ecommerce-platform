'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomClient = require('react-dom/client');

var _reactDomClient2 = _interopRequireDefault(_reactDomClient);

require('./index.css');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _reportWebVitals = require('./reportWebVitals');

var _reportWebVitals2 = _interopRequireDefault(_reportWebVitals);

var root = _reactDomClient2['default'].createRoot(document.getElementById('root'));
root.render(_react2['default'].createElement(
  _react2['default'].StrictMode,
  null,
  _react2['default'].createElement(_App2['default'], null)
));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, _reportWebVitals2['default'])();