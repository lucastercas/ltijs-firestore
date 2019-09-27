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

var crypto = require("crypto");

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

                if (!queryResult) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return", null);

              case 10:
                _context4.next = 12;
                return colRef.doc(primaryKey).create(data);

              case 12:
                return _context4.abrupt("return", _context4.sent);

              case 13:
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
    }()
  }, {
    key: "Encrypt",
    value: function () {
      var _Encrypt = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(data, secret) {
        var hash, key, iv, cipher, encrypted;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                hash = crypto.createHash("sha256");
                hash.update(secret);
                key = hash.digest().slice(0, 32);
                iv = crypto.randomBytes(16);
                cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
                encrypted = cipher.update(data);
                encrypted = Buffer.concat([encrypted, cipher["final"]()]);
                return _context8.abrupt("return", {
                  iv: iv.toString("hex"),
                  data: encrypted.toString("hex")
                });

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function Encrypt(_x18, _x19) {
        return _Encrypt.apply(this, arguments);
      }

      return Encrypt;
    }()
  }, {
    key: "Decrypt",
    value: function () {
      var _Decrypt = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(data, _iv, secret) {
        var hash, key, iv, encryptedText, decipher, decrypted;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                hash = crypto.createHash("sha256");
                hash.update(secret);
                key = hash.digest().slice(0, 32);
                iv = Buffer.from(_iv, "hex");
                encryptedText = Buffer.from(data, "hex");
                decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
                decrypted = decipher.update(encryptedText);
                decrypted = Buffer.concat([decrypted, decipher["final"]()]);
                return _context9.abrupt("return", decrypted.toString());

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function Decrypt(_x20, _x21, _x22) {
        return _Decrypt.apply(this, arguments);
      }

      return Decrypt;
    }()
  }, {
    key: "Close",
    value: function () {
      var _Close = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10() {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", true);

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function Close() {
        return _Close.apply(this, arguments);
      }

      return Close;
    }()
  }]);
  return Database;
}();

exports["default"] = Database;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EQi50cyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiY3J5cHRvIiwiRGF0YWJhc2UiLCJkYXRhYmFzZSIsImlkdG9rZW4iLCJjb250ZXh0dG9rZW4iLCJwbGF0Zm9ybSIsInB1YmxpY2tleSIsInByaXZhdGVrZXkiLCJhY2Nlc3N0b2tlbiIsIm5vbmNlIiwiYXBwIiwiYWRtaW4iLCJpbml0aWFsaXplQXBwIiwiY3JlZGVudGlhbCIsImNlcnQiLCJzZXJ2aWNlQWNjb3VudEZpbGUiLCJkYXRhYmFzZVVSTCIsImRiIiwiZmlyZXN0b3JlIiwiY29sUmVmIiwicXVlcnkiLCJrZXlzIiwiT2JqZWN0IiwibmV3UXVlcnkiLCJ3aGVyZSIsImkiLCJsZW5ndGgiLCJnZXQiLCJxdWVyeVNuYXAiLCJkb2NzIiwia2V5IiwicmVzdWx0Iiwic29tZSIsImRvYyIsImlkIiwiY29sbGVjdGlvbiIsImRhdGEiLCJkb2N1bWVudEtleSIsInByaW1hcnlLZXlzIiwiZm9yRWFjaCIsImNvbnNvbGUiLCJlcnJvciIsIkVOQ1JZUFRJT05LRVkiLCJpbmRleCIsInByaW1hcnlLZXkiLCJidWlsZFByaW1hcnlLZXkiLCJoYXNEb2N1bWVudCIsInF1ZXJ5UmVzdWx0IiwiY3JlYXRlIiwicXVlcnlDb2xsZWN0aW9uIiwibW9kaWZpY2F0aW9uIiwiZG9jUmVmIiwicmVmIiwidXBkYXRlIiwic2VjcmV0IiwiaGFzaCIsImNyZWF0ZUhhc2giLCJkaWdlc3QiLCJzbGljZSIsIml2IiwicmFuZG9tQnl0ZXMiLCJjaXBoZXIiLCJjcmVhdGVDaXBoZXJpdiIsImVuY3J5cHRlZCIsIkJ1ZmZlciIsImNvbmNhdCIsInRvU3RyaW5nIiwiX2l2IiwiZnJvbSIsImVuY3J5cHRlZFRleHQiLCJkZWNpcGhlciIsImNyZWF0ZURlY2lwaGVyaXYiLCJkZWNyeXB0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBOztBQVNBQSxPQUFPLENBQUMscUJBQUQsQ0FBUDs7QUFDQSxJQUFNQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXRCOztJQU9xQkUsUTs7O0FBV25COzs7Ozs7QUFNQSxvQkFBWUMsUUFBWixFQUFvQztBQUFBO0FBQUE7QUFBQSwwREFmakI7QUFDakJDLE1BQUFBLE9BQU8sRUFBRSxDQUFDLEtBQUQsRUFBUSxNQUFSLENBRFE7QUFFakJDLE1BQUFBLFlBQVksRUFBRSxDQUFDLE1BQUQsRUFBUyxNQUFULENBRkc7QUFHakJDLE1BQUFBLFFBQVEsRUFBRSxDQUFDLEtBQUQsQ0FITztBQUlqQkMsTUFBQUEsU0FBUyxFQUFFLENBQUMsS0FBRCxDQUpNO0FBS2pCQyxNQUFBQSxVQUFVLEVBQUUsQ0FBQyxLQUFELENBTEs7QUFNakJDLE1BQUFBLFdBQVcsRUFBRSxDQUFDLGFBQUQsQ0FOSTtBQU9qQkMsTUFBQUEsS0FBSyxFQUFFLENBQUMsT0FBRDtBQVBVLEtBZWlCO0FBQ2xDLFFBQU1DLEdBQUcsR0FBR0MsS0FBSyxDQUFDQyxhQUFOLENBQW9CO0FBQzlCQyxNQUFBQSxVQUFVLEVBQUVGLEtBQUssQ0FBQ0UsVUFBTixDQUFpQkMsSUFBakIsQ0FBc0JaLFFBQVEsQ0FBQ2Esa0JBQS9CLENBRGtCO0FBRTlCQyxNQUFBQSxXQUFXLEVBQUVkLFFBQVEsQ0FBQ2M7QUFGUSxLQUFwQixDQUFaO0FBSUEsU0FBS0MsRUFBTCxHQUFVUCxHQUFHLENBQUNRLFNBQUosRUFBVjtBQUNEOzs7Ozs7O29EQUdDQyxNLEVBQ0FDLEs7Ozs7OztBQUVNQyxnQkFBQUEsSSxHQUFPQyxNQUFNLENBQUNELElBQVAsQ0FBWUQsS0FBWixDO0FBQ1RHLGdCQUFBQSxRLEdBQWtCSixNQUFNLENBQUNLLEtBQVAsV0FBZ0JILElBQUksQ0FBQyxDQUFELENBQXBCLEdBQTJCLElBQTNCLFlBQW9DRCxLQUFLLENBQUNDLElBQUksQ0FBQyxDQUFELENBQUwsQ0FBekMsRSxFQUN0Qjs7QUFDQSxxQkFBU0ksQ0FBVCxHQUFhLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osSUFBSSxDQUFDSyxNQUF6QixFQUFpQ0QsQ0FBQyxFQUFsQyxFQUFzQztBQUNwQztBQUNBRixrQkFBQUEsUUFBUSxHQUFHQSxRQUFRLENBQUNDLEtBQVQsV0FBa0JILElBQUksQ0FBQ0ksQ0FBRCxDQUF0QixHQUE2QixJQUE3QixZQUFzQ0wsS0FBSyxDQUFDQyxJQUFJLENBQUNJLENBQUQsQ0FBTCxDQUEzQyxFQUFYO0FBQ0Q7Ozt1QkFDdUJGLFFBQVEsQ0FBQ0ksR0FBVCxFOzs7QUFBbEJDLGdCQUFBQSxTO2lEQUNDQSxTQUFTLENBQUNDLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFJakJWLE0sRUFDQVcsRzs7Ozs7Ozt1QkFFdUNYLE1BQU0sQ0FBQ1EsR0FBUCxFOzs7QUFBakNDLGdCQUFBQSxTO0FBQ0FDLGdCQUFBQSxJLEdBQWdDRCxTQUFTLENBQUNDLEk7QUFDMUNFLGdCQUFBQSxNLEdBQVNGLElBQUksQ0FBQ0csSUFBTCxDQUFVLFVBQUFDLEdBQUcsRUFBSTtBQUM5Qix5QkFBT0EsR0FBRyxDQUFDQyxFQUFKLEtBQVdKLEdBQWxCO0FBQ0QsaUJBRmMsQztrREFHUkMsTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQUdPSSxVLEVBQW9CQyxJLEVBQVc7QUFDN0MsVUFBSUMsV0FBbUIsR0FBRyxFQUExQjtBQUNBLFVBQU1DLFdBQVcsR0FBRyxLQUFLQSxXQUFMLENBQWlCSCxVQUFqQixDQUFwQjtBQUNBRyxNQUFBQSxXQUFXLENBQUNDLE9BQVosQ0FBb0IsVUFBQ1QsR0FBRCxFQUFpQjtBQUNuQyxZQUFJLEVBQUVBLEdBQUcsSUFBSU0sSUFBVCxDQUFKLEVBQW9CSSxPQUFPLENBQUNDLEtBQVIsZ0NBQXNDWCxHQUF0QztBQUNwQk8sUUFBQUEsV0FBVyxJQUFJRCxJQUFJLENBQUNOLEdBQUQsQ0FBbkI7QUFDRCxPQUhEO0FBSUEsYUFBT08sV0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJRDs7Ozs7Ozs7OztxREFLRUssYSxFQUNBUCxVLEVBQ0FDLEksRUFDQU8sSzs7Ozs7O0FBRU14QixnQkFBQUEsTSxHQUE4QixLQUFLRixFQUFMLENBQVFrQixVQUFSLENBQW1CQSxVQUFuQixDO0FBQ2hDSixnQkFBQUEsTSxHQUE2QixJO0FBQzNCYSxnQkFBQUEsVSxHQUFxQixLQUFLQyxlQUFMLENBQXFCVixVQUFyQixFQUFpQ0MsSUFBakMsQzs7dUJBRVEsS0FBS1UsV0FBTCxDQUFpQjNCLE1BQWpCLEVBQXlCeUIsVUFBekIsQzs7O0FBQTdCRyxnQkFBQUEsVzs7cUJBQ0ZBLFc7Ozs7O2tEQUNLLEk7Ozs7dUJBRU01QixNQUFNLENBQUNjLEdBQVAsQ0FBV1csVUFBWCxFQUF1QkksTUFBdkIsQ0FBOEJaLElBQTlCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFLZk0sYSxFQUNBUCxVLEVBQ0FmLEs7Ozs7OztBQUVNRCxnQkFBQUEsTSxHQUFTLEtBQUtGLEVBQUwsQ0FBUWtCLFVBQVIsQ0FBbUJBLFVBQW5CLEM7O3VCQUNvQyxLQUFLYyxlQUFMLENBQ2pEOUIsTUFEaUQsRUFFakRDLEtBRmlELEM7OztBQUE3QzJCLGdCQUFBQSxXO2tEQUlDQSxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cURBSVBMLGEsRUFDQVAsVSxFQUNBZixLLEVBQ0E4QixZOzs7Ozs7QUFFTS9CLGdCQUFBQSxNLEdBQVMsS0FBS0YsRUFBTCxDQUFRa0IsVUFBUixDQUFtQkEsVUFBbkIsQzs7dUJBQ29DLEtBQUtjLGVBQUwsQ0FDakQ5QixNQURpRCxFQUVqREMsS0FGaUQsQzs7O0FBQTdDMkIsZ0JBQUFBLFc7QUFJTkEsZ0JBQUFBLFdBQVcsQ0FBQ1IsT0FBWixDQUFvQixVQUFBTixHQUFHLEVBQUk7QUFDekIsc0JBQU1rQixNQUFNLEdBQUdsQixHQUFHLENBQUNtQixHQUFuQjtBQUNBRCxrQkFBQUEsTUFBTSxDQUFDRSxNQUFQLENBQWNILFlBQWQ7QUFDRCxpQkFIRDtrREFJTyxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cURBR0lmLFUsRUFBb0JmLEs7Ozs7OztBQUN6QkQsZ0JBQUFBLE0sR0FBOEIsS0FBS0YsRUFBTCxDQUFRa0IsVUFBUixDQUFtQkEsVUFBbkIsQzs7dUJBQ2UsS0FBS2MsZUFBTCxDQUNqRDlCLE1BRGlELEVBRWpEQyxLQUZpRCxDOzs7QUFBN0MyQixnQkFBQUEsVztBQUlOQSxnQkFBQUEsV0FBVyxDQUFDUixPQUFaLENBQW9CLFVBQUFOLEdBQUcsRUFBSTtBQUN6QixzQkFBTWtCLE1BQU0sR0FBR2xCLEdBQUcsQ0FBQ21CLEdBQW5CO0FBQ0FELGtCQUFBQSxNQUFNLFVBQU47QUFDRCxpQkFIRDtrREFJTyxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cURBR0tmLEksRUFBV2tCLE07Ozs7OztBQUNqQkMsZ0JBQUFBLEksR0FBT3ZELE1BQU0sQ0FBQ3dELFVBQVAsQ0FBa0IsUUFBbEIsQztBQUNiRCxnQkFBQUEsSUFBSSxDQUFDRixNQUFMLENBQVlDLE1BQVo7QUFDTXhCLGdCQUFBQSxHLEdBQU15QixJQUFJLENBQUNFLE1BQUwsR0FBY0MsS0FBZCxDQUFvQixDQUFwQixFQUF1QixFQUF2QixDO0FBQ05DLGdCQUFBQSxFLEdBQUszRCxNQUFNLENBQUM0RCxXQUFQLENBQW1CLEVBQW5CLEM7QUFDTEMsZ0JBQUFBLE0sR0FBUzdELE1BQU0sQ0FBQzhELGNBQVAsQ0FBc0IsYUFBdEIsRUFBcUNoQyxHQUFyQyxFQUEwQzZCLEVBQTFDLEM7QUFDWEksZ0JBQUFBLFMsR0FBWUYsTUFBTSxDQUFDUixNQUFQLENBQWNqQixJQUFkLEM7QUFDaEIyQixnQkFBQUEsU0FBUyxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxDQUFDRixTQUFELEVBQVlGLE1BQU0sU0FBTixFQUFaLENBQWQsQ0FBWjtrREFDTztBQUNMRixrQkFBQUEsRUFBRSxFQUFFQSxFQUFFLENBQUNPLFFBQUgsQ0FBWSxLQUFaLENBREM7QUFFTDlCLGtCQUFBQSxJQUFJLEVBQUUyQixTQUFTLENBQUNHLFFBQVYsQ0FBbUIsS0FBbkI7QUFGRCxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQUtLOUIsSSxFQUFXK0IsRyxFQUFhYixNOzs7Ozs7QUFDOUJDLGdCQUFBQSxJLEdBQU92RCxNQUFNLENBQUN3RCxVQUFQLENBQWtCLFFBQWxCLEM7QUFDYkQsZ0JBQUFBLElBQUksQ0FBQ0YsTUFBTCxDQUFZQyxNQUFaO0FBQ014QixnQkFBQUEsRyxHQUFNeUIsSUFBSSxDQUFDRSxNQUFMLEdBQWNDLEtBQWQsQ0FBb0IsQ0FBcEIsRUFBdUIsRUFBdkIsQztBQUNOQyxnQkFBQUEsRSxHQUFLSyxNQUFNLENBQUNJLElBQVAsQ0FBWUQsR0FBWixFQUFpQixLQUFqQixDO0FBQ0xFLGdCQUFBQSxhLEdBQWdCTCxNQUFNLENBQUNJLElBQVAsQ0FBWWhDLElBQVosRUFBa0IsS0FBbEIsQztBQUNoQmtDLGdCQUFBQSxRLEdBQVd0RSxNQUFNLENBQUN1RSxnQkFBUCxDQUNmLGFBRGUsRUFFZlAsTUFBTSxDQUFDSSxJQUFQLENBQVl0QyxHQUFaLENBRmUsRUFHZjZCLEVBSGUsQztBQUtiYSxnQkFBQUEsUyxHQUFZRixRQUFRLENBQUNqQixNQUFULENBQWdCZ0IsYUFBaEIsQztBQUNoQkcsZ0JBQUFBLFNBQVMsR0FBR1IsTUFBTSxDQUFDQyxNQUFQLENBQWMsQ0FBQ08sU0FBRCxFQUFZRixRQUFRLFNBQVIsRUFBWixDQUFkLENBQVo7a0RBQ09FLFNBQVMsQ0FBQ04sUUFBVixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttREFJQSxJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29sbGVjdGlvblJlZmVyZW5jZSxcbiAgUXVlcnksXG4gIFF1ZXJ5U25hcHNob3QsXG4gIFF1ZXJ5RG9jdW1lbnRTbmFwc2hvdCxcbiAgRG9jdW1lbnRSZWZlcmVuY2UsXG4gIFdyaXRlUmVzdWx0XG59IGZyb20gXCJAZ29vZ2xlLWNsb3VkL2ZpcmVzdG9yZVwiO1xuaW1wb3J0ICogYXMgYWRtaW4gZnJvbSBcImZpcmViYXNlLWFkbWluXCI7XG5pbXBvcnQge1xuICBDb250ZXh0VG9rZW4sXG4gIElkVG9rZW4sXG4gIFBsYXRmb3JtLFxuICBLZXksXG4gIEFjY2Vzc1Rva2VuLFxuICBOb25jZVxufSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XG5yZXF1aXJlKFwiQGZpcmViYXNlL2ZpcmVzdG9yZVwiKTtcbmNvbnN0IGNyeXB0byA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5cbmludGVyZmFjZSBEYXRhYmFzZUluZm8ge1xuICBzZXJ2aWNlQWNjb3VudEZpbGU6IHN0cmluZztcbiAgZGF0YWJhc2VVUkw6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWJhc2Uge1xuICBkYjogRmlyZWJhc2VGaXJlc3RvcmUuRmlyZXN0b3JlO1xuICBwcmltYXJ5S2V5czogYW55ID0ge1xuICAgIGlkdG9rZW46IFtcImlzc1wiLCBcInVzZXJcIl0sXG4gICAgY29udGV4dHRva2VuOiBbXCJwYXRoXCIsIFwidXNlclwiXSxcbiAgICBwbGF0Zm9ybTogW1widXJsXCJdLFxuICAgIHB1YmxpY2tleTogW1wia2lkXCJdLFxuICAgIHByaXZhdGVrZXk6IFtcImtpZFwiXSxcbiAgICBhY2Nlc3N0b2tlbjogW1wicGxhdGZvcm1VcmxcIl0sXG4gICAgbm9uY2U6IFtcIm5vbmNlXCJdXG4gIH07XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YWJhc2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFiYXNlLmRhdGFiYXNlVVJMXG4gICAqIEBwYXJhbSB7P30gZGF0YWJhc2Uuc2VydmljZUFjY291bnRGaWxlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkYXRhYmFzZTogRGF0YWJhc2VJbmZvKSB7XG4gICAgY29uc3QgYXBwID0gYWRtaW4uaW5pdGlhbGl6ZUFwcCh7XG4gICAgICBjcmVkZW50aWFsOiBhZG1pbi5jcmVkZW50aWFsLmNlcnQoZGF0YWJhc2Uuc2VydmljZUFjY291bnRGaWxlKSxcbiAgICAgIGRhdGFiYXNlVVJMOiBkYXRhYmFzZS5kYXRhYmFzZVVSTFxuICAgIH0pO1xuICAgIHRoaXMuZGIgPSBhcHAuZmlyZXN0b3JlKCk7XG4gIH1cblxuICBhc3luYyBxdWVyeUNvbGxlY3Rpb24oXG4gICAgY29sUmVmOiBDb2xsZWN0aW9uUmVmZXJlbmNlLFxuICAgIHF1ZXJ5OiBhbnlcbiAgKTogUHJvbWlzZTxRdWVyeURvY3VtZW50U25hcHNob3RbXT4ge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhxdWVyeSk7XG4gICAgbGV0IG5ld1F1ZXJ5OiBRdWVyeSA9IGNvbFJlZi53aGVyZShgJHtrZXlzWzBdfWAsIFwiPT1cIiwgYCR7cXVlcnlba2V5c1swXV19YCk7XG4gICAgLy8gY29uc29sZS5sb2coYCR7a2V5c1swXX1gLCBcIj09XCIsIGAke3F1ZXJ5W2tleXNbMF1dfWApO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gY29uc29sZS5sb2coYCR7a2V5c1sxXX1gLCBcIj09XCIsIGAke3F1ZXJ5W2tleXNbaV1dfWApO1xuICAgICAgbmV3UXVlcnkgPSBuZXdRdWVyeS53aGVyZShgJHtrZXlzW2ldfWAsIFwiPT1cIiwgYCR7cXVlcnlba2V5c1tpXV19YCk7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXJ5U25hcCA9IGF3YWl0IG5ld1F1ZXJ5LmdldCgpO1xuICAgIHJldHVybiBxdWVyeVNuYXAuZG9jcztcbiAgfVxuXG4gIGFzeW5jIGhhc0RvY3VtZW50KFxuICAgIGNvbFJlZjogQ29sbGVjdGlvblJlZmVyZW5jZSxcbiAgICBrZXk6IHN0cmluZ1xuICApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBxdWVyeVNuYXA6IFF1ZXJ5U25hcHNob3QgPSBhd2FpdCBjb2xSZWYuZ2V0KCk7XG4gICAgY29uc3QgZG9jczogUXVlcnlEb2N1bWVudFNuYXBzaG90W10gPSBxdWVyeVNuYXAuZG9jcztcbiAgICBjb25zdCByZXN1bHQgPSBkb2NzLnNvbWUoZG9jID0+IHtcbiAgICAgIHJldHVybiBkb2MuaWQgPT09IGtleTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgYnVpbGRQcmltYXJ5S2V5KGNvbGxlY3Rpb246IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgbGV0IGRvY3VtZW50S2V5OiBzdHJpbmcgPSBcIlwiO1xuICAgIGNvbnN0IHByaW1hcnlLZXlzID0gdGhpcy5wcmltYXJ5S2V5c1tjb2xsZWN0aW9uXTtcbiAgICBwcmltYXJ5S2V5cy5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCEoa2V5IGluIGRhdGEpKSBjb25zb2xlLmVycm9yKGBPYmplY3QgZG9udCBoYXZlIGtleSAke2tleX1gKTtcbiAgICAgIGRvY3VtZW50S2V5ICs9IGRhdGFba2V5XTtcbiAgICB9KTtcbiAgICByZXR1cm4gZG9jdW1lbnRLZXk7XG4gIH1cblxuICBhc3luYyBzZXR1cCgpIHt9XG5cbiAgLyogXG4gICAgVE9ETzogQ2hlY2sgaWYgZG9jdW1lbnQgd2l0aCB0aGlzIGRhdGEgYWxyZWFkeSBleGlzdHMgb24gZGF0YWJhc2UsIHRvIGF2b2lkIHJlcGxpY2F0aW9uIG9mIGRhdGEuXG4gICAgVG8gc29sdmUgdGhpcywgdGhlIG5hbWUgb2YgdGhlIGRvY3VtZW50IGNhbiBiZSB0aGUgcHJpbWFyeSBrZXkgb2YgdGhlIGRvY3VtZW50LlxuICAqL1xuICBhc3luYyBJbnNlcnQoXG4gICAgRU5DUllQVElPTktFWTogc3RyaW5nLFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBkYXRhOiBhbnksXG4gICAgaW5kZXg6IGFueVxuICApOiBQcm9taXNlPFdyaXRlUmVzdWx0IHwgbnVsbD4ge1xuICAgIGNvbnN0IGNvbFJlZjogQ29sbGVjdGlvblJlZmVyZW5jZSA9IHRoaXMuZGIuY29sbGVjdGlvbihjb2xsZWN0aW9uKTtcbiAgICBsZXQgcmVzdWx0OiBXcml0ZVJlc3VsdCB8IG51bGwgPSBudWxsO1xuICAgIGNvbnN0IHByaW1hcnlLZXk6IHN0cmluZyA9IHRoaXMuYnVpbGRQcmltYXJ5S2V5KGNvbGxlY3Rpb24sIGRhdGEpO1xuXG4gICAgY29uc3QgcXVlcnlSZXN1bHQ6IGJvb2xlYW4gPSBhd2FpdCB0aGlzLmhhc0RvY3VtZW50KGNvbFJlZiwgcHJpbWFyeUtleSk7XG4gICAgaWYgKHF1ZXJ5UmVzdWx0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGF3YWl0IGNvbFJlZi5kb2MocHJpbWFyeUtleSkuY3JlYXRlKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIEdldChcbiAgICBFTkNSWVBUSU9OS0VZOiBzdHJpbmcsXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHF1ZXJ5OiBhbnlcbiAgKTogUHJvbWlzZTxRdWVyeURvY3VtZW50U25hcHNob3RbXT4ge1xuICAgIGNvbnN0IGNvbFJlZiA9IHRoaXMuZGIuY29sbGVjdGlvbihjb2xsZWN0aW9uKTtcbiAgICBjb25zdCBxdWVyeVJlc3VsdDogUXVlcnlEb2N1bWVudFNuYXBzaG90W10gPSBhd2FpdCB0aGlzLnF1ZXJ5Q29sbGVjdGlvbihcbiAgICAgIGNvbFJlZixcbiAgICAgIHF1ZXJ5XG4gICAgKTtcbiAgICByZXR1cm4gcXVlcnlSZXN1bHQ7XG4gIH1cblxuICBhc3luYyBNb2RpZnkoXG4gICAgRU5DUllQVElPTktFWTogc3RyaW5nLFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBxdWVyeTogYW55LFxuICAgIG1vZGlmaWNhdGlvbjogYW55XG4gICkge1xuICAgIGNvbnN0IGNvbFJlZiA9IHRoaXMuZGIuY29sbGVjdGlvbihjb2xsZWN0aW9uKTtcbiAgICBjb25zdCBxdWVyeVJlc3VsdDogUXVlcnlEb2N1bWVudFNuYXBzaG90W10gPSBhd2FpdCB0aGlzLnF1ZXJ5Q29sbGVjdGlvbihcbiAgICAgIGNvbFJlZixcbiAgICAgIHF1ZXJ5XG4gICAgKTtcbiAgICBxdWVyeVJlc3VsdC5mb3JFYWNoKGRvYyA9PiB7XG4gICAgICBjb25zdCBkb2NSZWYgPSBkb2MucmVmO1xuICAgICAgZG9jUmVmLnVwZGF0ZShtb2RpZmljYXRpb24pO1xuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgRGVsZXRlKGNvbGxlY3Rpb246IHN0cmluZywgcXVlcnk6IGFueSkge1xuICAgIGNvbnN0IGNvbFJlZjogQ29sbGVjdGlvblJlZmVyZW5jZSA9IHRoaXMuZGIuY29sbGVjdGlvbihjb2xsZWN0aW9uKTtcbiAgICBjb25zdCBxdWVyeVJlc3VsdDogUXVlcnlEb2N1bWVudFNuYXBzaG90W10gPSBhd2FpdCB0aGlzLnF1ZXJ5Q29sbGVjdGlvbihcbiAgICAgIGNvbFJlZixcbiAgICAgIHF1ZXJ5XG4gICAgKTtcbiAgICBxdWVyeVJlc3VsdC5mb3JFYWNoKGRvYyA9PiB7XG4gICAgICBjb25zdCBkb2NSZWYgPSBkb2MucmVmO1xuICAgICAgZG9jUmVmLmRlbGV0ZSgpO1xuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgRW5jcnlwdChkYXRhOiBhbnksIHNlY3JldDogc3RyaW5nKSB7XG4gICAgY29uc3QgaGFzaCA9IGNyeXB0by5jcmVhdGVIYXNoKFwic2hhMjU2XCIpO1xuICAgIGhhc2gudXBkYXRlKHNlY3JldCk7XG4gICAgY29uc3Qga2V5ID0gaGFzaC5kaWdlc3QoKS5zbGljZSgwLCAzMik7XG4gICAgY29uc3QgaXYgPSBjcnlwdG8ucmFuZG9tQnl0ZXMoMTYpO1xuICAgIGNvbnN0IGNpcGhlciA9IGNyeXB0by5jcmVhdGVDaXBoZXJpdihcImFlcy0yNTYtY2JjXCIsIGtleSwgaXYpO1xuICAgIGxldCBlbmNyeXB0ZWQgPSBjaXBoZXIudXBkYXRlKGRhdGEpO1xuICAgIGVuY3J5cHRlZCA9IEJ1ZmZlci5jb25jYXQoW2VuY3J5cHRlZCwgY2lwaGVyLmZpbmFsKCldKTtcbiAgICByZXR1cm4ge1xuICAgICAgaXY6IGl2LnRvU3RyaW5nKFwiaGV4XCIpLFxuICAgICAgZGF0YTogZW5jcnlwdGVkLnRvU3RyaW5nKFwiaGV4XCIpXG4gICAgfTtcbiAgfVxuICBhc3luYyBEZWNyeXB0KGRhdGE6IGFueSwgX2l2OiBzdHJpbmcsIHNlY3JldDogc3RyaW5nKSB7XG4gICAgY29uc3QgaGFzaCA9IGNyeXB0by5jcmVhdGVIYXNoKFwic2hhMjU2XCIpO1xuICAgIGhhc2gudXBkYXRlKHNlY3JldCk7XG4gICAgY29uc3Qga2V5ID0gaGFzaC5kaWdlc3QoKS5zbGljZSgwLCAzMik7XG4gICAgY29uc3QgaXYgPSBCdWZmZXIuZnJvbShfaXYsIFwiaGV4XCIpO1xuICAgIGNvbnN0IGVuY3J5cHRlZFRleHQgPSBCdWZmZXIuZnJvbShkYXRhLCBcImhleFwiKTtcbiAgICBjb25zdCBkZWNpcGhlciA9IGNyeXB0by5jcmVhdGVEZWNpcGhlcml2KFxuICAgICAgXCJhZXMtMjU2LWNiY1wiLFxuICAgICAgQnVmZmVyLmZyb20oa2V5KSxcbiAgICAgIGl2XG4gICAgKTtcbiAgICBsZXQgZGVjcnlwdGVkID0gZGVjaXBoZXIudXBkYXRlKGVuY3J5cHRlZFRleHQpO1xuICAgIGRlY3J5cHRlZCA9IEJ1ZmZlci5jb25jYXQoW2RlY3J5cHRlZCwgZGVjaXBoZXIuZmluYWwoKV0pO1xuICAgIHJldHVybiBkZWNyeXB0ZWQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIGFzeW5jIENsb3NlKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=