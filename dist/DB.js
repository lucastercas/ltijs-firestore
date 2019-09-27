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
    (0, _defineProperty2["default"])(this, "primaryKeys", {
      idtoken: ["iss", "user"],
      contexttoken: ["path", "user"],
      platform: ["url"],
      publickey: ["kid"],
      privatekey: ["kid"],
      accesstoken: ["platformUrl"],
      nonce: ["nonce"]
    });
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
  }, {
    key: "hasDocument",
    value: function () {
      var _hasDocument = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(colRef, key) {
        var querySnap, docs, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return colRef.get();

              case 2:
                querySnap = _context2.sent;
                docs = querySnap.docs;
                result = docs.some(function (doc) {
                  return doc.id === key;
                });
                return _context2.abrupt("return", result);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function hasDocument(_x3, _x4) {
        return _hasDocument.apply(this, arguments);
      }

      return hasDocument;
    }()
  }, {
    key: "buildPrimaryKey",
    value: function buildPrimaryKey(collection, data) {
      var documentKey = "";
      var primaryKeys = this.primaryKeys[collection];
      primaryKeys.forEach(function (key) {
        if (!(key in data)) console.error("Object dont have key ".concat(key));
        documentKey += data[key];
      });
      return documentKey;
    }
  }, {
    key: "setup",
    value: function () {
      var _setup = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function setup() {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
    /* 
      TODO: Check if document with this data already exists on database, to avoid replication of data.
      To solve this, the name of the document can be the primary key of the document.
    */

  }, {
    key: "Insert",
    value: function () {
      var _Insert = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(ENCRYPTIONKEY, collection, data, index) {
        var colRef, result, primaryKey, queryResult;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                colRef = this.db.collection(collection);
                result = null;
                primaryKey = this.buildPrimaryKey(collection, data);
                _context4.next = 5;
                return this.hasDocument(colRef, primaryKey);

              case 5:
                queryResult = _context4.sent;
                console.log("Result: ", queryResult);

                if (!queryResult) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt("return", null);

              case 11:
                _context4.next = 13;
                return colRef.doc(primaryKey).create(data);

              case 13:
                return _context4.abrupt("return", _context4.sent);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function Insert(_x5, _x6, _x7, _x8) {
        return _Insert.apply(this, arguments);
      }

      return Insert;
    }()
  }, {
    key: "Get",
    value: function () {
      var _Get = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(ENCRYPTIONKEY, collection, query) {
        var colRef, queryResult;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                colRef = this.db.collection(collection);
                _context5.next = 3;
                return this.queryCollection(colRef, query);

              case 3:
                queryResult = _context5.sent;
                return _context5.abrupt("return", queryResult);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function Get(_x9, _x10, _x11) {
        return _Get.apply(this, arguments);
      }

      return Get;
    }()
  }, {
    key: "Modify",
    value: function () {
      var _Modify = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(ENCRYPTIONKEY, collection, query, modification) {
        var colRef, queryResult;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                colRef = this.db.collection(collection);
                _context6.next = 3;
                return this.queryCollection(colRef, query);

              case 3:
                queryResult = _context6.sent;
                queryResult.forEach(function (doc) {
                  var docRef = doc.ref;
                  docRef.update(modification);
                });
                return _context6.abrupt("return", true);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function Modify(_x12, _x13, _x14, _x15) {
        return _Modify.apply(this, arguments);
      }

      return Modify;
    }()
  }, {
    key: "Delete",
    value: function () {
      var _Delete = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(collection, query) {
        var colRef, queryResult;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                colRef = this.db.collection(collection);
                _context7.next = 3;
                return this.queryCollection(colRef, query);

              case 3:
                queryResult = _context7.sent;
                queryResult.forEach(function (doc) {
                  var docRef = doc.ref;
                  docRef["delete"]();
                });
                return _context7.abrupt("return", true);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function Delete(_x16, _x17) {
        return _Delete.apply(this, arguments);
      }

      return Delete;
    }() // async Encrypt(data, secret) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EQi50cyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRGF0YWJhc2UiLCJkYXRhYmFzZSIsImlkdG9rZW4iLCJjb250ZXh0dG9rZW4iLCJwbGF0Zm9ybSIsInB1YmxpY2tleSIsInByaXZhdGVrZXkiLCJhY2Nlc3N0b2tlbiIsIm5vbmNlIiwiYXBwIiwiYWRtaW4iLCJpbml0aWFsaXplQXBwIiwiY3JlZGVudGlhbCIsImNlcnQiLCJzZXJ2aWNlQWNjb3VudEZpbGUiLCJkYXRhYmFzZVVSTCIsImRiIiwiZmlyZXN0b3JlIiwiY29sUmVmIiwicXVlcnkiLCJrZXlzIiwiT2JqZWN0IiwibmV3UXVlcnkiLCJ3aGVyZSIsImkiLCJsZW5ndGgiLCJnZXQiLCJxdWVyeVNuYXAiLCJkb2NzIiwia2V5IiwicmVzdWx0Iiwic29tZSIsImRvYyIsImlkIiwiY29sbGVjdGlvbiIsImRhdGEiLCJkb2N1bWVudEtleSIsInByaW1hcnlLZXlzIiwiZm9yRWFjaCIsImNvbnNvbGUiLCJlcnJvciIsIkVOQ1JZUFRJT05LRVkiLCJpbmRleCIsInByaW1hcnlLZXkiLCJidWlsZFByaW1hcnlLZXkiLCJoYXNEb2N1bWVudCIsInF1ZXJ5UmVzdWx0IiwibG9nIiwiY3JlYXRlIiwicXVlcnlDb2xsZWN0aW9uIiwibW9kaWZpY2F0aW9uIiwiZG9jUmVmIiwicmVmIiwidXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQTs7QUFTQUEsT0FBTyxDQUFDLHFCQUFELENBQVA7O0lBT3FCQyxROzs7QUFXbkI7Ozs7OztBQU1BLG9CQUFZQyxRQUFaLEVBQW9DO0FBQUE7QUFBQTtBQUFBLDBEQWZqQjtBQUNqQkMsTUFBQUEsT0FBTyxFQUFFLENBQUMsS0FBRCxFQUFRLE1BQVIsQ0FEUTtBQUVqQkMsTUFBQUEsWUFBWSxFQUFFLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FGRztBQUdqQkMsTUFBQUEsUUFBUSxFQUFFLENBQUMsS0FBRCxDQUhPO0FBSWpCQyxNQUFB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SU8sSTs7Ozs7Ozs7Ozs7Ozs7O1FBR1Q7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29sbGVjdGlvblJlZmVyZW5jZSxcbiAgUXVlcnksXG4gIFF1ZXJ5U25hcHNob3QsXG4gIFF1ZXJ5RG9jdW1lbnRTbmFwc2hvdCxcbiAgRG9jdW1lbnRSZWZlcmVuY2UsXG4gIFdyaXRlUmVzdWx0XG59IGZyb20gXCJAZ29vZ2xlLWNsb3VkL2ZpcmVzdG9yZVwiO1xuaW1wb3J0ICogYXMgYWRtaW4gZnJvbSBcImZpcmViYXNlLWFkbWluXCI7XG5pbXBvcnQge1xuICBDb250ZXh0VG9rZW4sXG4gIElkVG9rZW4sXG4gIFBsYXRmb3JtLFxuICBLZXksXG4gIEFjY2Vzc1Rva2VuLFxuICBOb25jZVxufSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XG5yZXF1aXJlKFwiQGZpcmViYXNlL2ZpcmVzdG9yZVwiKTtcblxuaW50ZXJmYWNlIERhdGFiYXNlSW5mbyB7XG4gIHNlcnZpY2VBY2NvdW50RmlsZTogc3RyaW5nO1xuICBkYXRhYmFzZVVSTDogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhYmFzZSB7XG4gIGRiOiBGaXJlYmFzZUZpcmVzdG9yZS5GaXJlc3RvcmU7XG4gIHByaW1hcnlLZXlzOiBhbnkgPSB7XG4gICAgaWR0b2tlbjogW1wiaXNzXCIsIFwidXNlclwiXSxcbiAgICBjb250ZXh0dG9rZW46IFtcInBhdGhcIiwgXCJ1c2VyXCJdLFxuICAgIHBsYXRmb3JtOiBbXCJ1cmxcIl0sXG4gICAgcHVibGlja2V5OiBbXCJraWRcIl0sXG4gICAgcHJpdmF0ZWtleTogW1wia2lkXCJdLFxuICAgIGFjY2Vzc3Rva2VuOiBbXCJwbGF0Zm9ybVVybFwiXSxcbiAgICBub25jZTogW1wibm9uY2VcIl1cbiAgfTtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhYmFzZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YWJhc2UuZGF0YWJhc2VVUkxcbiAgICogQHBhcmFtIHs/fSBkYXRhYmFzZS5zZXJ2aWNlQWNjb3VudEZpbGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGRhdGFiYXNlOiBEYXRhYmFzZUluZm8pIHtcbiAgICBjb25zdCBhcHAgPSBhZG1pbi5pbml0aWFsaXplQXBwKHtcbiAgICAgIGNyZWRlbnRpYWw6IGFkbWluLmNyZWRlbnRpYWwuY2VydChkYXRhYmFzZS5zZXJ2aWNlQWNjb3VudEZpbGUpLFxuICAgICAgZGF0YWJhc2VVUkw6IGRhdGFiYXNlLmRhdGFiYXNlVVJMXG4gICAgfSk7XG4gICAgdGhpcy5kYiA9IGFwcC5maXJlc3RvcmUoKTtcbiAgfVxuXG4gIGFzeW5jIHF1ZXJ5Q29sbGVjdGlvbihcbiAgICBjb2xSZWY6IENvbGxlY3Rpb25SZWZlcmVuY2UsXG4gICAgcXVlcnk6IGFueVxuICApOiBQcm9taXNlPFF1ZXJ5RG9jdW1lbnRTbmFwc2hvdFtdPiB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5KTtcbiAgICBsZXQgbmV3UXVlcnk6IFF1ZXJ5ID0gY29sUmVmLndoZXJlKGAke2tleXNbMF19YCwgXCI9PVwiLCBgJHtxdWVyeVtrZXlzWzBdXX1gKTtcbiAgICAvLyBjb25zb2xlLmxvZyhgJHtrZXlzWzBdfWAsIFwiPT1cIiwgYCR7cXVlcnlba2V5c1swXV19YCk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhgJHtrZXlzWzFdfWAsIFwiPT1cIiwgYCR7cXVlcnlba2V5c1tpXV19YCk7XG4gICAgICBuZXdRdWVyeSA9IG5ld1F1ZXJ5LndoZXJlKGAke2tleXNbaV19YCwgXCI9PVwiLCBgJHtxdWVyeVtrZXlzW2ldXX1gKTtcbiAgICB9XG4gICAgY29uc3QgcXVlcnlTbmFwID0gYXdhaXQgbmV3UXVlcnkuZ2V0KCk7XG4gICAgcmV0dXJuIHF1ZXJ5U25hcC5kb2NzO1xuICB9XG5cbiAgYXN5bmMgaGFzRG9jdW1lbnQoXG4gICAgY29sUmVmOiBDb2xsZWN0aW9uUmVmZXJlbmNlLFxuICAgIGtleTogc3RyaW5nXG4gICk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHF1ZXJ5U25hcDogUXVlcnlTbmFwc2hvdCA9IGF3YWl0IGNvbFJlZi5nZXQoKTtcbiAgICBjb25zdCBkb2NzOiBRdWVyeURvY3VtZW50U25hcHNob3RbXSA9IHF1ZXJ5U25hcC5kb2NzO1xuICAgIGNvbnN0IHJlc3VsdCA9IGRvY3Muc29tZShkb2MgPT4ge1xuICAgICAgcmV0dXJuIGRvYy5pZCA9PT0ga2V5O1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBidWlsZFByaW1hcnlLZXkoY29sbGVjdGlvbjogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICBsZXQgZG9jdW1lbnRLZXk6IHN0cmluZyA9IFwiXCI7XG4gICAgY29uc3QgcHJpbWFyeUtleXMgPSB0aGlzLnByaW1hcnlLZXlzW2NvbGxlY3Rpb25dO1xuICAgIHByaW1hcnlLZXlzLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoIShrZXkgaW4gZGF0YSkpIGNvbnNvbGUuZXJyb3IoYE9iamVjdCBkb250IGhhdmUga2V5ICR7a2V5fWApO1xuICAgICAgZG9jdW1lbnRLZXkgKz0gZGF0YVtrZXldO1xuICAgIH0pO1xuICAgIHJldHVybiBkb2N1bWVudEtleTtcbiAgfVxuXG4gIGFzeW5jIHNldHVwKCkge31cblxuICAvKiBcbiAgICBUT0RPOiBDaGVjayBpZiBkb2N1bWVudCB3aXRoIHRoaXMgZGF0YSBhbHJlYWR5IGV4aXN0cyBvbiBkYXRhYmFzZSwgdG8gYXZvaWQgcmVwbGljYXRpb24gb2YgZGF0YS5cbiAgICBUbyBzb2x2ZSB0aGlzLCB0aGUgbmFtZSBvZiB0aGUgZG9jdW1lbnQgY2FuIGJlIHRoZSBwcmltYXJ5IGtleSBvZiB0aGUgZG9jdW1lbnQuXG4gICovXG4gIGFzeW5jIEluc2VydChcbiAgICBFTkNSWVBUSU9OS0VZOiBzdHJpbmcsXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIGRhdGE6IGFueSxcbiAgICBpbmRleDogYW55XG4gICk6IFByb21pc2U8V3JpdGVSZXN1bHQgfCBudWxsPiB7XG4gICAgY29uc3QgY29sUmVmOiBDb2xsZWN0aW9uUmVmZXJlbmNlID0gdGhpcy5kYi5jb2xsZWN0aW9uKGNvbGxlY3Rpb24pO1xuICAgIGxldCByZXN1bHQ6IFdyaXRlUmVzdWx0IHwgbnVsbCA9IG51bGw7XG4gICAgY29uc3QgcHJpbWFyeUtleTogc3RyaW5nID0gdGhpcy5idWlsZFByaW1hcnlLZXkoY29sbGVjdGlvbiwgZGF0YSk7XG5cbiAgICBjb25zdCBxdWVyeVJlc3VsdDogYm9vbGVhbiA9IGF3YWl0IHRoaXMuaGFzRG9jdW1lbnQoY29sUmVmLCBwcmltYXJ5S2V5KTtcbiAgICBjb25zb2xlLmxvZyhcIlJlc3VsdDogXCIsIHF1ZXJ5UmVzdWx0KTtcbiAgICBpZiAocXVlcnlSZXN1bHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYXdhaXQgY29sUmVmLmRvYyhwcmltYXJ5S2V5KS5jcmVhdGUoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgR2V0KFxuICAgIEVOQ1JZUFRJT05LRVk6IHN0cmluZyxcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgcXVlcnk6IGFueVxuICApOiBQcm9taXNlPFF1ZXJ5RG9jdW1lbnRTbmFwc2hvdFtdPiB7XG4gICAgY29uc3QgY29sUmVmID0gdGhpcy5kYi5jb2xsZWN0aW9uKGNvbGxlY3Rpb24pO1xuICAgIGNvbnN0IHF1ZXJ5UmVzdWx0OiBRdWVyeURvY3VtZW50U25hcHNob3RbXSA9IGF3YWl0IHRoaXMucXVlcnlDb2xsZWN0aW9uKFxuICAgICAgY29sUmVmLFxuICAgICAgcXVlcnlcbiAgICApO1xuICAgIHJldHVybiBxdWVyeVJlc3VsdDtcbiAgfVxuXG4gIGFzeW5jIE1vZGlmeShcbiAgICBFTkNSWVBUSU9OS0VZOiBzdHJpbmcsXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHF1ZXJ5OiBhbnksXG4gICAgbW9kaWZpY2F0aW9uOiBhbnlcbiAgKSB7XG4gICAgY29uc3QgY29sUmVmID0gdGhpcy5kYi5jb2xsZWN0aW9uKGNvbGxlY3Rpb24pO1xuICAgIGNvbnN0IHF1ZXJ5UmVzdWx0OiBRdWVyeURvY3VtZW50U25hcHNob3RbXSA9IGF3YWl0IHRoaXMucXVlcnlDb2xsZWN0aW9uKFxuICAgICAgY29sUmVmLFxuICAgICAgcXVlcnlcbiAgICApO1xuICAgIHF1ZXJ5UmVzdWx0LmZvckVhY2goZG9jID0+IHtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGRvYy5yZWY7XG4gICAgICBkb2NSZWYudXBkYXRlKG1vZGlmaWNhdGlvbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBEZWxldGUoY29sbGVjdGlvbjogc3RyaW5nLCBxdWVyeTogYW55KSB7XG4gICAgY29uc3QgY29sUmVmOiBDb2xsZWN0aW9uUmVmZXJlbmNlID0gdGhpcy5kYi5jb2xsZWN0aW9uKGNvbGxlY3Rpb24pO1xuICAgIGNvbnN0IHF1ZXJ5UmVzdWx0OiBRdWVyeURvY3VtZW50U25hcHNob3RbXSA9IGF3YWl0IHRoaXMucXVlcnlDb2xsZWN0aW9uKFxuICAgICAgY29sUmVmLFxuICAgICAgcXVlcnlcbiAgICApO1xuICAgIHF1ZXJ5UmVzdWx0LmZvckVhY2goZG9jID0+IHtcbiAgICAgIGNvbnN0IGRvY1JlZiA9IGRvYy5yZWY7XG4gICAgICBkb2NSZWYuZGVsZXRlKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBhc3luYyBFbmNyeXB0KGRhdGEsIHNlY3JldCkge1xuICAvLyAgIC8vIFRPRE9cbiAgLy8gfVxuXG4gIC8vIGFzeW5jIERlY3J5cHQoZGF0YSwgX2l2LCBzZWNyZXQpIHtcbiAgLy8gICAvLyBUT0RPXG4gIC8vIH1cblxuICAvLyBhc3luYyBDbG9zZSgpIHtcbiAgLy8gICAvLyBUT0RPOiBUaGlzIGlzIG5vdCBuZWVkZWQgZm9yIGZpcmVzdG9yZVxuICAvLyB9XG59XG4iXX0=