'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _testingLibraryReact = require('@testing-library/react');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

// Adjust the path if necessary

test('renders learn react link', function () {
  (0, _testingLibraryReact.render)(React.createElement(_App2['default'], null));
  var linkElement = _testingLibraryReact.screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});