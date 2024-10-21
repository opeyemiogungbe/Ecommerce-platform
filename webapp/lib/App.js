'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function App() {
  var _useState = (0, _react.useState)([]);

  var _useState2 = _slicedToArray(_useState, 2);

  var products = _useState2[0];
  var setProducts = _useState2[1];

  (0, _react.useEffect)(function () {
    _axios2['default'].get('http://localhost:3000/products').then(function (response) {
      return setProducts(response.data);
    })['catch'](function (error) {
      return console.error('Error fetching products', error);
    });
  }, []);

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      'Product List'
    ),
    React.createElement(
      'ul',
      null,
      products.map(function (product) {
        return React.createElement(
          'li',
          { key: product.id },
          product.name
        );
      })
    )
  );
}

exports['default'] = App;
module.exports = exports['default'];