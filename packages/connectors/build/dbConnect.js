"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

require("core-js/modules/es.object.define-property.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es.array.is-array.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.keys.js");

var _knex = _interopRequireDefault(require("knex"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

var createKnexConnection = function createKnexConnection() {
  return (0, _knex["default"])({
    client: 'pg',
    connection: connectionConfig,
    postProcessResponse: function postProcessResponse(result, queryContext) {
      var newResult = result.rows ? result.rows : result;

      if (Array.isArray(newResult)) {
        newResult = newResult.map(function (row) {
          return convertKeysMiddleware(row);
        });

        if (queryContext && (queryContext.limit === 1 || queryContext.limit === '1')) {
          var _newResult = newResult;

          var _newResult2 = (0, _slicedToArray2["default"])(_newResult, 1);

          newResult = _newResult2[0];
        }
      } else {
        newResult = convertKeysMiddleware(result);
      }

      return newResult;
    }
  });
};

var snakeToCamel = function snakeToCamel(s) {
  return s.replace(/(_\w)/g, function (c) {
    return c[1].toUpperCase();
  });
};

var convertKeysMiddleware = function convertKeysMiddleware(data) {
  if (data) {
    return Object.keys(data).reduce(function (previous, key) {
      return _objectSpread(_objectSpread({}, previous), {}, (0, _defineProperty2["default"])({}, snakeToCamel(key), data[key]));
    }, {});
  }

  return null;
};

var knexConnection = createKnexConnection();
var _default = {
  knexConnection: knexConnection
};
exports["default"] = _default;