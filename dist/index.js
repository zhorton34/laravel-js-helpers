'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = require('collect.js'),
    Collection = _require.Collection;
/**
 * Create a collection from the given value.
 *
 * @param  value
 * @return mixed
 */


var collect = function collect() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return new Collection(value);
};
/**
 * Determine if the given value is "blank".
 *
 * @param  value
 * @return boolean
 */


var blank = function blank(value) {
  if (typeof value === 'undefined') {
    return true;
  }

  if (value === null || value.trim() === '') {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (_typeof(value) === 'object') {
    return Object.keys(value).length === 0;
  }

  if (typeof value === 'function') {
    return false;
  }

  if (typeof value === 'boolean') {
    return false;
  }

  return true;
};
/**
 * Return the default value of the given value.
 *
 * @param  value
 * @return
 */


var value = function value(value) {
  return typeof value === 'function' ? value() : value;
};
/**
 * Determine if a value is "filled".
 *
 * @param  value
 * @return bool
 */


var filled = function filled(value) {
  return !blank(value);
};
/**
 * Set an item on an array or object using dot notation.
 *
 * @param  target
 * @param  path
 * @param  fallback
 * @return *
 */


var data_get = function data_get(target, path, fallback) {
  var segments = Array.isArray(path) ? path : path.split('.');

  var _segments = _slicedToArray(segments, 1),
      segment = _segments[0];

  var find = target;

  if (segment !== '*' && segments.length > 0) {
    if (find[segment] === null || typeof find[segment] === 'undefined') {
      find = typeof fallback === 'function' ? fallback() : fallback;
    } else {
      find = data_get(find[segment], segments.slice(1), fallback);
    }
  } else if (segment === '*') {
    var partial = segments.slice(path.indexOf('*') + 1, path.length);

    if (_typeof(find) === 'object') {
      find = Object.keys(find).reduce(function (build, property) {
        return _objectSpread(_objectSpread({}, build), {}, _defineProperty({}, property, data_get(find[property], partial, fallback)));
      }, {});
    } else {
      find = data_get(find, partial, fallback);
    }
  }
  /*-----------------------------------------------------------------------------
   |   Arrayable Requirements
   *-----------------------------------------------------------------------------
   |
   |   . All arrays are converted to objects
   |   . For Example
   |      #Code
   |        Code -> data_set({ list: ['one', 'two', 'three'], 'list.*', 'update', true });
   |
   |      #Input
   |         Input -> { list: ['one', 'two', 'three'] }
   |
   |      #During We Convert Arrays To "Indexed Objects"
   |         During -> { list: { '1': 'one', '2': 'two', '3': 'three' } }
   |
   |      #Before Output we convert "Indexed Objects" Back To Arrays
   |         From -> { list: { '1': 'update', '2': 'update', '3': 'update' } }
   |         Into -> { list: ['update', 'update', 'update'] }
   |
   |   . Arrays convert into "Indexed Objects", allowing for wildcard (*) capabilities
   |   . "Indexed Objects" are converted back into arrays before returning the updated target
   |
   */


  if (_typeof(find) === 'object') {
    if (Object.keys(find).length > 0) {
      var isArrayTransformable = Object.keys(find).every(function (index) {
        return index.match(/^(0|[1-9][0-9]*)$/);
      });
      return isArrayTransformable ? Object.values(find) : find;
    }
  } else {
    return find;
  }
};
/**
 * Fill in data where it's missing.
 *
 * @param  target
 * @param  key
 * @param  value
 * @return mixed
 */


var data_fill = function data_fill(target, key, value) {
  return data_set(target, key, value, false);
};
/**
 * Set an item on an array or object using dot notation.
 *
 * @param  target
 * @param  path
 * @param  value
 * @param  force
 * @return *
 */


var data_set = function data_set(target, path, value) {
  var force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var segments = Array.isArray(path) ? path : path.split('.');

  var _segments2 = _slicedToArray(segments, 1),
      segment = _segments2[0];

  if (segments.length === 0) {
    target = value;
  } else if (segments.length === 1 && !segments.includes('*')) {
    target[segment] = force ? value : target[segment] || value;
  } else if (segment !== '*') {
    if (!target[segment]) {
      target[segment] = {};
      target = data_set(target[segment], segments.slice(1), value, force);
    }

    var inner = data_set(target[segment], segments.slice(1), value, force);

    if (Array.isArray(target[segment])) {
      if (force && target[segment].length) {
        target[segment] = _toConsumableArray(target[segment]);
      } else {
        target[segment] = _toConsumableArray(inner);
      }
    } else {
      target[segment] = force ? _objectSpread(_objectSpread({}, target[segment]), inner) : _objectSpread(_objectSpread({}, inner), target[segment]);
    }
  } else if (segment === '*') {
    var partial = segments.slice(path.indexOf('*') + 1, path.length);

    if (_typeof(target) === 'object') {
      target = Object.keys(target).reduce(function (build, property) {
        return _objectSpread(_objectSpread({}, build), {}, _defineProperty({}, property, data_set(target[property], partial, value, force)));
      }, {});
    } else {
      target = data_set(target, partial, value, force);
    }
  }
  /*-----------------------------------------------------------------------------
   |   Arrayable Requirements
   *-----------------------------------------------------------------------------
   |
   |   . All arrays are converted to objects
   |   . For Example
   |      #Code
   |        Code -> data_set({ list: ['one', 'two', 'three'], 'list.*', 'update', true });
   |
   |      #Input
   |         Input -> { list: ['one', 'two', 'three'] }
   |
   |      #During We Convert Arrays To "Indexed Objects"
   |         During -> { list: { '1': 'one', '2': 'two', '3': 'three' } }
   |
   |      #Before Output we convert "Indexed Objects" Back To Arrays
   |         From -> { list: { '1': 'update', '2': 'update', '3': 'update' } }
   |         Into -> { list: ['update', 'update', 'update'] }
   |
   |   . Arrays convert into "Indexed Objects", allowing for wildcard (*) capabilities
   |   . "Indexed Objects" are converted back into arrays before returning the updated target
   |
   */


  var arrayable = [_typeof(target) === 'object', Object.keys(target).length, Object.keys(target).every(function (index) {
    return index.match(/^(0|[1-9][0-9]*)$/);
  })];

  if (arrayable.every(function (requirement) {
    return requirement === true;
  })) {
    return Object.values(target);
  }

  return target;
};
/**
 * Transform the given value if it is present.
 *
 * @param  value
 * @param  callback
 * @param  original
 * @return mixed|null|void
 */


var transform = function transform(value, callback) {
  var original = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (typeof callback !== 'function') {
    return console.error("transform's 2nd parameter needs to be a callback");
  }

  if (filled(value)) {
    return callback(value);
  }

  if (typeof original === 'function') {
    return original(value);
  }

  return original;
};

module.exports["default"] = {
  blank: blank,
  value: value,
  filled: filled,
  collect: collect,
  data_get: data_get,
  data_set: data_set,
  transform: transform,
  data_fill: data_fill
};
module.exports.blank = blank;
module.exports.value = value;
module.exports.filled = filled;
module.exports.collect = collect;
module.exports.data_get = data_get;
module.exports.data_set = data_set;
module.exports.transform = transform;
module.exports.data_fill = data_fill;