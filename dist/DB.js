"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var admin = _interopRequireWildcard(require("firebase-admin"));

require("@firebase/firestore");

var Database =
/*#__PURE__*/
function () {
  /**
   *
   * @param {Object} database
   * @param {String} database.databaseURL
   * @param {?} database.serviceAccountFile
   */
  function Database(database) {
    (0, _classCallCheck2["default"])(this, Database);
    (0, _defineProperty2["default"])(this, "db", void 0);
    var app = admin.initializeApp({
      credential: admin.credential.cert(database.serviceAccountFile),
      databaseURL: database.databaseURL
    });
    this.db = app.firestore();
  }

  (0, _createClass2["default"])(Database, [{
    key: "queryCollection",
    value: function () {
      var _queryCollection = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(colRef, query) {
        var keys, newQuery, i, querySnap;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                keys = Object.keys(query);
                newQuery = colRef.where("".concat(keys[0]), "==", "".concat(query[keys[0]])); // console.log(`${keys[0]}`, "==", `${query[keys[0]]}`);

                for (i = 1; i < keys.length; i++) {
                  // console.log(`${keys[1]}`, "==", `${query[keys[i]]}`);
                  newQuery = newQuery.where("".concat(keys[i]), "==", "".concat(query[keys[i]]));
                }

                _context.next = 5;
                return newQuery.get();

              case 5:
                querySnap = _context.sent;
                return _context.abrupt("return", querySnap.docs);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function queryCollection(_x, _x2) {
        return _queryCollection.apply(this, arguments);
      }

      return queryCollection;
    }()
    /**
     * @description
     */

  }, {
    key: "setup",
    value: function () {
      var _setup = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function setup() {
        return _setup.apply(this, arguments);
      }

      return setup;
    }() // TODO: Check if document with this data already exists on database, to avoid replication of data

  }, {
    key: "Insert",
    value: function () {
      var _Insert = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(KEY, collection, data, index) {
        var colRef, document;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                colRef = this.db.collection(collection);
                _context3.next = 3;
                return colRef.add(data);

              case 3:
                document = _context3.sent;
                return _context3.abrupt("return", document);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function Insert(_x3, _x4, _x5, _x6) {
        return _Insert.apply(this, arguments);
      }

      return Insert;
    }()
  }, {
    key: "Get",
    value: function () {
      var _Get = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(KEY, collection, query) {
        var colRef, queryResult;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                colRef = this.db.collection(collection);
                _context4.next = 3;
                return this.queryCollection(colRef, query);

              case 3:
                queryResult = _context4.sent;
                return _context4.abrupt("return", queryResult);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function Get(_x7, _x8, _x9) {
        return _Get.apply(this, arguments);
      }

      return Get;
    }()
  }, {
    key: "Modify",
    value: function () {
      var _Modify = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(KEY, collection, query, modification) {
        var colRef;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                colRef = this.db.collection(collection);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function Modify(_x10, _x11, _x12, _x13) {
        return _Modify.apply(this, arguments);
      }

      return Modify;
    }() // async Delete(collection, query) {
    //   const docRef = this.db.doc(`lti/${document}`);
    //   const writeResult = await docRef.delete();
    //   return writeResult;
    // }
    // async Encrypt(data, secret) {
    //   // TODO
    // }
    // async Decrypt(data, _iv, secret) {
    //   // TODO
    // }
    // async Close() {
    //   // TODO: This is not needed for firestore
    // }

  }]);
  return Database;
}();

exports["default"] = Database;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EQi50cyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRGF0YWJhc2UiLCJkYXRhYmFzZSIsImFwcCIsImFkbWluIiwiaW5pdGlhbGl6ZUFwcCIsImNyZWRlbnRpYWwiLCJjZXJ0Iiwic2VydmljZUFjY291bnRGaWxlIiwiZGF0YWJhc2VVUkwiLCJkYiIsImZpcmVzdG9yZSIsImNvbFJlZiIsInF1ZXJ5Iiwia2V5cyIsIk9iamVjdCIsIm5ld1F1ZXJ5Iiwid2hlcmUiLCJpIiwibGVuZ3RoIiwiZ2V0IiwicXVlcnlTbmFwIiwiZG9jcyIsIktFWSIsImNvbGxlY3Rpb24iLCJkYXRhIiwiaW5kZXgiLCJhZGQiLCJkb2N1bWVudCIsInF1ZXJ5Q29sbGVjdGlvbiIsInF1ZXJ5UmVzdWx0IiwibW9kaWZpY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQTs7QUFTQUEsT0FBTyxDQUFDLHFCQUFELENBQVA7O0lBT3FCQyxROzs7QUFFbkI7Ozs7OztBQU1BLG9CQUFZQyxRQUFaLEVBQW9DO0FBQUE7QUFBQTtBQUNsQyxRQUFNQyxHQUFHLEdBQUdDLEtBQUssQ0FBQ0MsYUFBTixDQUFvQjtBQUM5QkMsTUFBQUEsVUFBVSxFQUFFRixLQUFLLENBQUNFLFVBQU4sQ0FBaUJDLElBQWpCLENBQXNCTCxRQUFRLENBQUNNLGtCQUEvQixDQURrQjtBQUU5QkMsTUFBQUEsV0FBVyxFQUFFUCxRQUFRLENBQUNPO0FBRlEsS0FBcEIsQ0FBWjtBQUlBLFNBQUtDLEVBQUwsR0FBVVAsR0FBRyxDQUFDUSxTQUFKLEVBQVY7QUFDRDs7Ozs7OztvREFHQ0MsTSxFQUNBQyxLOzs7Ozs7QUFFTUMsZ0JBQUFBLEksR0FBT0MsTUFBTSxDQUFDRCxJQUFQLENBQVlELEtBQVosQztBQUNURyxnQkFBQUEsUSxHQUFrQkosTUFBTSxDQUFDSyxLQUFQLFdBQWdCSCxJQUFJLENBQUMsQ0FBRCxDQUFwQixHQUEyQixJQUEzQixZQUFvQ0QsS0FBSyxDQUFDQyxJQUFJLENBQUMsQ0FBRCxDQUFMLENBQXpDLEUsRUFDdEI7O0FBQ0EscUJBQVNJLENBQVQsR0FBYSxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLElBQUksQ0FBQ0ssTUFBekIsRUFBaUNELENBQUMsRUFBbEMsRUFBc0M7QUFDcEM7QUFDQUYsa0JBQUFBLFFBQVEsR0FBR0EsUUFBUSxDQUFDQyxLQUFULFdBQWtCSCxJQUFJLENBQUNJLENBQUQsQ0FBdEIsR0FBNkIsSUFBN0IsWUFBc0NMLEtBQUssQ0FBQ0MsSUFBSSxDQUFDSSxDQUFELENBQUwsQ0FBM0MsRUFBWDtBQUNEOzs7dUJBQ3VCRixRQUFRLENBQUNJLEdBQVQsRTs7O0FBQWxCQyxnQkFBQUEsUztpREFDQ0EsU0FBUyxDQUFDQyxJOzs7Ozs7Ozs7Ozs7Ozs7O0FBR25COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUtBOzs7Ozs7O3FEQUVFQyxHLEVBQ0FDLFUsRUFDQUMsSSxFQUNBQyxLOzs7Ozs7QUFFTWQsZ0JBQUFBLE0sR0FBUyxLQUFLRixFQUFMLENBQVFjLFVBQVIsQ0FBbUJBLFVBQW5CLEM7O3VCQUMyQlosTUFBTSxDQUFDZSxHQUFQLENBQVdGLElBQVgsQzs7O0FBQXBDRyxnQkFBQUEsUTtrREFDQ0EsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQUlQTCxHLEVBQ0FDLFUsRUFDQVgsSzs7Ozs7O0FBRU1ELGdCQUFBQSxNLEdBQVMsS0FBS0YsRUFBTCxDQUFRYyxVQUFSLENBQW1CQSxVQUFuQixDOzt1QkFDb0MsS0FBS0ssZUFBTCxDQUNqRGpCLE1BRGlELEVBRWpEQyxLQUZpRCxDOzs7QUFBN0NpQixnQkFBQUEsVztrREFJQ0EsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQUdJUCxHLEVBQWFDLFUsRUFBb0JYLEssRUFBWWtCLFk7Ozs7OztBQUNsRG5CLGdCQUFBQSxNLEdBQVMsS0FBS0YsRUFBTCxDQUFRYyxVQUFSLENBQW1CQSxVQUFuQixDOzs7Ozs7Ozs7Ozs7Ozs7UUFHakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbGxlY3Rpb25SZWZlcmVuY2UsXG4gIFF1ZXJ5LFxuICBRdWVyeVNuYXBzaG90LFxuICBRdWVyeURvY3VtZW50U25hcHNob3QsXG4gIERvY3VtZW50UmVmZXJlbmNlXG59IGZyb20gXCJAZ29vZ2xlLWNsb3VkL2ZpcmVzdG9yZVwiO1xuaW1wb3J0ICogYXMgYWRtaW4gZnJvbSBcImZpcmViYXNlLWFkbWluXCI7XG5pbXBvcnQge1xuICBDb250ZXh0VG9rZW4sXG4gIElkVG9rZW4sXG4gIFBsYXRmb3JtLFxuICBLZXksXG4gIEFjY2Vzc1Rva2VuLFxuICBOb25jZVxufSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XG5yZXF1aXJlKFwiQGZpcmViYXNlL2ZpcmVzdG9yZVwiKTtcblxuaW50ZXJmYWNlIERhdGFiYXNlSW5mbyB7XG4gIHNlcnZpY2VBY2NvdW50RmlsZTogc3RyaW5nO1xuICBkYXRhYmFzZVVSTDogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhYmFzZSB7XG4gIGRiOiBGaXJlYmFzZUZpcmVzdG9yZS5GaXJlc3RvcmU7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YWJhc2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFiYXNlLmRhdGFiYXNlVVJMXG4gICAqIEBwYXJhbSB7P30gZGF0YWJhc2Uuc2VydmljZUFjY291bnRGaWxlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkYXRhYmFzZTogRGF0YWJhc2VJbmZvKSB7XG4gICAgY29uc3QgYXBwID0gYWRtaW4uaW5pdGlhbGl6ZUFwcCh7XG4gICAgICBjcmVkZW50aWFsOiBhZG1pbi5jcmVkZW50aWFsLmNlcnQoZGF0YWJhc2Uuc2VydmljZUFjY291bnRGaWxlKSxcbiAgICAgIGRhdGFiYXNlVVJMOiBkYXRhYmFzZS5kYXRhYmFzZVVSTFxuICAgIH0pO1xuICAgIHRoaXMuZGIgPSBhcHAuZmlyZXN0b3JlKCk7XG4gIH1cblxuICBhc3luYyBxdWVyeUNvbGxlY3Rpb24oXG4gICAgY29sUmVmOiBDb2xsZWN0aW9uUmVmZXJlbmNlLFxuICAgIHF1ZXJ5OiBhbnlcbiAgKTogUHJvbWlzZTxRdWVyeURvY3VtZW50U25hcHNob3RbXT4ge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhxdWVyeSk7XG4gICAgbGV0IG5ld1F1ZXJ5OiBRdWVyeSA9IGNvbFJlZi53aGVyZShgJHtrZXlzWzBdfWAsIFwiPT1cIiwgYCR7cXVlcnlba2V5c1swXV19YCk7XG4gICAgLy8gY29uc29sZS5sb2coYCR7a2V5c1swXX1gLCBcIj09XCIsIGAke3F1ZXJ5W2tleXNbMF1dfWApO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gY29uc29sZS5sb2coYCR7a2V5c1sxXX1gLCBcIj09XCIsIGAke3F1ZXJ5W2tleXNbaV1dfWApO1xuICAgICAgbmV3UXVlcnkgPSBuZXdRdWVyeS53aGVyZShgJHtrZXlzW2ldfWAsIFwiPT1cIiwgYCR7cXVlcnlba2V5c1tpXV19YCk7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXJ5U25hcCA9IGF3YWl0IG5ld1F1ZXJ5LmdldCgpO1xuICAgIHJldHVybiBxdWVyeVNuYXAuZG9jcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHNldHVwKCkge31cblxuICAvLyBUT0RPOiBDaGVjayBpZiBkb2N1bWVudCB3aXRoIHRoaXMgZGF0YSBhbHJlYWR5IGV4aXN0cyBvbiBkYXRhYmFzZSwgdG8gYXZvaWQgcmVwbGljYXRpb24gb2YgZGF0YVxuICBhc3luYyBJbnNlcnQoXG4gICAgS0VZOiBzdHJpbmcsXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIGRhdGE6IGFueSxcbiAgICBpbmRleDogYW55XG4gICk6IFByb21pc2U8RG9jdW1lbnRSZWZlcmVuY2U+IHtcbiAgICBjb25zdCBjb2xSZWYgPSB0aGlzLmRiLmNvbGxlY3Rpb24oY29sbGVjdGlvbik7XG4gICAgY29uc3QgZG9jdW1lbnQ6IERvY3VtZW50UmVmZXJlbmNlID0gYXdhaXQgY29sUmVmLmFkZChkYXRhKTtcbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cblxuICBhc3luYyBHZXQoXG4gICAgS0VZOiBzdHJpbmcsXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHF1ZXJ5OiBhbnlcbiAgKTogUHJvbWlzZTxRdWVyeURvY3VtZW50U25hcHNob3RbXT4ge1xuICAgIGNvbnN0IGNvbFJlZiA9IHRoaXMuZGIuY29sbGVjdGlvbihjb2xsZWN0aW9uKTtcbiAgICBjb25zdCBxdWVyeVJlc3VsdDogUXVlcnlEb2N1bWVudFNuYXBzaG90W10gPSBhd2FpdCB0aGlzLnF1ZXJ5Q29sbGVjdGlvbihcbiAgICAgIGNvbFJlZixcbiAgICAgIHF1ZXJ5XG4gICAgKTtcbiAgICByZXR1cm4gcXVlcnlSZXN1bHQ7XG4gIH1cblxuICBhc3luYyBNb2RpZnkoS0VZOiBzdHJpbmcsIGNvbGxlY3Rpb246IHN0cmluZywgcXVlcnk6IGFueSwgbW9kaWZpY2F0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBjb2xSZWYgPSB0aGlzLmRiLmNvbGxlY3Rpb24oY29sbGVjdGlvbik7XG4gIH1cblxuICAvLyBhc3luYyBEZWxldGUoY29sbGVjdGlvbiwgcXVlcnkpIHtcbiAgLy8gICBjb25zdCBkb2NSZWYgPSB0aGlzLmRiLmRvYyhgbHRpLyR7ZG9jdW1lbnR9YCk7XG4gIC8vICAgY29uc3Qgd3JpdGVSZXN1bHQgPSBhd2FpdCBkb2NSZWYuZGVsZXRlKCk7XG4gIC8vICAgcmV0dXJuIHdyaXRlUmVzdWx0O1xuICAvLyB9XG5cbiAgLy8gYXN5bmMgRW5jcnlwdChkYXRhLCBzZWNyZXQpIHtcbiAgLy8gICAvLyBUT0RPXG4gIC8vIH1cblxuICAvLyBhc3luYyBEZWNyeXB0KGRhdGEsIF9pdiwgc2VjcmV0KSB7XG4gIC8vICAgLy8gVE9ET1xuICAvLyB9XG5cbiAgLy8gYXN5bmMgQ2xvc2UoKSB7XG4gIC8vICAgLy8gVE9ETzogVGhpcyBpcyBub3QgbmVlZGVkIGZvciBmaXJlc3RvcmVcbiAgLy8gfVxufVxuIl19