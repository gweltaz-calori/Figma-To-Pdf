"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _strategy = require("./strategy");

Object.defineProperty(exports, "Strategy", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_strategy).default;
  }
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
