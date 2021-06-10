"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var userModel = function userModel(dbConnect) {
  return {
    getUserById: function () {
      var _getUserById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", dbConnect.knexConnection('user').select('*').where('id', id));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getUserById(_x) {
        return _getUserById.apply(this, arguments);
      }

      return getUserById;
    }()
  };
};