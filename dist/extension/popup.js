/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/api.js":
/*!***************************!*\
  !*** ./src/common/api.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API": () => (/* binding */ API)
/* harmony export */ });
var API = function API() {
  var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  function postSource(source) {
    return fetch("".concat(baseUrl, "/api/sources"), {
      method: 'post',
      body: JSON.stringify(source),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).catch(function (error) {
      return {
        valid: false,
        error: error
      };
    }).then(function (data) {
      return data.payload;
    });
  }

  function addSourceFromUrl(url) {
    return fetch("".concat(baseUrl, "/api/sources/addFromUrl"), {
      method: 'post',
      body: JSON.stringify({
        url: url
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).catch(function (error) {
      return {
        valid: false,
        error: error
      };
    });
  }

  function readUrls() {
    var sources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    return fetch("".concat(baseUrl, "/api/urls/fetch"), {
      method: 'post',
      body: JSON.stringify({
        sources: sources,
        date: date,
        limit: limit
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      return data.payload || [];
    });
  }

  function addSubscriptions() {
    var topics = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var key = arguments.length > 1 ? arguments[1] : undefined;
    return fetch("".concat(baseUrl, "/api/subscriptions"), {
      method: 'post',
      body: JSON.stringify({
        topics: topics,
        key: key
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).catch(function (error) {
      return {
        valid: false,
        error: error
      };
    });
  }

  function deleteSubscriptions() {
    var topics = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var key = arguments.length > 1 ? arguments[1] : undefined;
    return fetch("".concat(baseUrl, "/api/subscriptions"), {
      method: 'delete',
      body: JSON.stringify({
        topics: topics,
        key: key
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).catch(function (error) {
      return {
        valid: false,
        error: error
      };
    });
  }

  function readLink(key, changedSince) {
    return fetch("".concat(baseUrl, "/api/links/").concat(key).concat(changedSince ? "?changedSince=".concat(changedSince) : ''), {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.status === 304 ? {
        valid: true,
        payload: null
      } : res.json();
    }).catch(function (error) {
      return {
        valid: false,
        error: error
      };
    });
  }

  function updateLink(key, updateSet) {
    return fetch("".concat(baseUrl, "/api/links/").concat(key), {
      method: 'put',
      body: JSON.stringify(updateSet),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).catch(function (error) {
      return {
        valid: false,
        error: error
      };
    });
  }

  function createLink(initSet) {
    return fetch("".concat(baseUrl, "/api/links"), {
      method: 'post',
      body: JSON.stringify(initSet),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).catch(function (error) {
      return {
        valid: false,
        error: error
      };
    });
  }

  return {
    Urls: {
      read: readUrls
    },
    Source: {
      insert: postSource,
      fromUrl: addSourceFromUrl
    },
    Subscription: {
      subscribe: addSubscriptions,
      unsubscribe: deleteSubscriptions
    },
    Link: {
      insert: createLink,
      update: updateLink,
      read: readLink
    }
  };
};

/***/ }),

/***/ "./src/common/db.js":
/*!**************************!*\
  !*** ./src/common/db.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDB": () => (/* binding */ createDB)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/common/utils.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var NAMESPACES = {
  SYNC: 'sync',
  LOCAL: 'local'
};
function createDB(storage) {
  var read = storage.read,
      write = storage.write;

  function readSources() {
    return _readSources.apply(this, arguments);
  }

  function _readSources() {
    _readSources = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$read, registry;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return read(NAMESPACES.SYNC, {
                registry: '["sources-1"]'
              });

            case 2:
              _yield$read = _context.sent;
              registry = _yield$read.registry;
              return _context.abrupt("return", (0,_utils__WEBPACK_IMPORTED_MODULE_0__.parse)(registry, ['sources-1']).reduce(function (sources, key) {
                return Promise.all([sources, read(NAMESPACES.SYNC, _defineProperty({}, key, '[]'))]).then(function (_ref2) {
                  var _ref3 = _slicedToArray(_ref2, 2),
                      sources = _ref3[0],
                      source = _ref3[1];

                  return sources.concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.parse)(source[key], []));
                });
              }, Promise.resolve([])));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _readSources.apply(this, arguments);
  }

  function writeSources(sources) {
    var registry = [];
    var updates = {};

    for (var x = 1; x <= Math.max(1, Math.ceil(sources.length / 20)); x++) {
      var key = "sources-".concat(x);
      registry.push(key);
      updates[key] = JSON.stringify(sources.slice((x - 1) * 20, x * 20));
    }

    updates.registry = JSON.stringify(registry);
    return write(NAMESPACES.SYNC, updates);
  }

  function addSource(_x) {
    return _addSource.apply(this, arguments);
  }

  function _addSource() {
    _addSource = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(source) {
      var sources;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return readSources();

            case 2:
              sources = _context2.sent;

              if (sources.some(function (_ref4) {
                var url = _ref4.url,
                    mangaId = _ref4.mangaId;
                return source.url === url && mangaId === source.mangaId;
              })) {
                _context2.next = 7;
                break;
              }

              sources.push(source);
              _context2.next = 7;
              return writeSources(sources);

            case 7:
              return _context2.abrupt("return", sources);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _addSource.apply(this, arguments);
  }

  function deleteSource(_x2) {
    return _deleteSource.apply(this, arguments);
  }

  function _deleteSource() {
    _deleteSource = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(sourceId) {
      var sources, newSources;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return readSources();

            case 2:
              sources = _context3.sent;
              newSources = sources.filter(function (source) {
                return (source === null || source === void 0 ? void 0 : source.id) !== sourceId;
              });
              _context3.next = 6;
              return writeSources(newSources);

            case 6:
              return _context3.abrupt("return", newSources);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _deleteSource.apply(this, arguments);
  }

  function isDirty() {
    return _isDirty.apply(this, arguments);
  }

  function _isDirty() {
    _isDirty = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _yield$read2, urls, sources;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return read(NAMESPACES.LOCAL, ['urls', 'sources']);

            case 2:
              _yield$read2 = _context4.sent;
              urls = _yield$read2.urls;
              sources = _yield$read2.sources;
              return _context4.abrupt("return", !!urls || !!sources);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _isDirty.apply(this, arguments);
  }

  function getFilteredSortedUrls() {
    return _getFilteredSortedUrls.apply(this, arguments);
  }

  function _getFilteredSortedUrls() {
    _getFilteredSortedUrls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _yield$read3, hiddenChaptersString, hide, _yield$read4, urls, hiddenChapters, urlList, checkOld, _Object$values$sort$r, _Object$values$sort$r2, oldUrls, newUrls;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return read(NAMESPACES.SYNC, {
                hiddenChapters: '{}',
                hide: 0
              });

            case 2:
              _yield$read3 = _context5.sent;
              hiddenChaptersString = _yield$read3.hiddenChapters;
              hide = _yield$read3.hide;
              _context5.next = 7;
              return read(NAMESPACES.LOCAL, {
                urls: '[]'
              });

            case 7:
              _yield$read4 = _context5.sent;
              urls = _yield$read4.urls;
              hiddenChapters = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.parse)(hiddenChaptersString, {});
              urlList = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.parse)(urls, []);

              checkOld = function checkOld(chapter) {
                if (hide && chapter.created < hide || hiddenChapters[chapter.id]) {
                  return true;
                }

                return false;
              };

              _Object$values$sort$r = Object.values(urlList).sort(function (url1, url2) {
                var diff = url2.created - url1.created;

                if (Math.abs(diff) < 500) {
                  return String(url1).localeCompare(url2);
                }

                return diff;
              }).reduce(function (_ref5, url) {
                var _ref6 = _slicedToArray(_ref5, 2),
                    oldUrls = _ref6[0],
                    newUrls = _ref6[1];

                if (checkOld(url)) {
                  oldUrls.push(url);
                } else {
                  newUrls.push(url);
                }

                return [oldUrls, newUrls];
              }, [[], []]), _Object$values$sort$r2 = _slicedToArray(_Object$values$sort$r, 2), oldUrls = _Object$values$sort$r2[0], newUrls = _Object$values$sort$r2[1];
              return _context5.abrupt("return", {
                oldUrls: oldUrls,
                newUrls: newUrls
              });

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _getFilteredSortedUrls.apply(this, arguments);
  }

  function hideUrl(_x3) {
    return _hideUrl.apply(this, arguments);
  }

  function _hideUrl() {
    _hideUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
      var result, hiddenChapters;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return read(NAMESPACES.SYNC, {
                hiddenChapters: '{}'
              });

            case 2:
              result = _context6.sent;
              hiddenChapters = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.parse)(result.hiddenChapters, {});
              hiddenChapters[id] = true;
              return _context6.abrupt("return", write(NAMESPACES.SYNC, {
                hiddenChapters: JSON.stringify(hiddenChapters)
              }));

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _hideUrl.apply(this, arguments);
  }

  function hideAllUrls(_x4) {
    return _hideAllUrls.apply(this, arguments);
  }

  function _hideAllUrls() {
    _hideAllUrls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(timestamp) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", write(NAMESPACES.SYNC, {
                hiddenChapters: '{}',
                hide: timestamp
              }));

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));
    return _hideAllUrls.apply(this, arguments);
  }

  function writeUrls(urls) {
    return write(NAMESPACES.LOCAL, {
      urls: JSON.stringify(urls)
    });
  }

  function init() {
    return _init.apply(this, arguments);
  }

  function _init() {
    _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var _yield$read5, hide, today;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return read(NAMESPACES.SYNC, {
                hide: false
              });

            case 2:
              _yield$read5 = _context8.sent;
              hide = _yield$read5.hide;

              if (hide) {
                _context8.next = 9;
                break;
              }

              today = new Date();
              today.setHours(0, 0, 0, 0);
              _context8.next = 9;
              return write(NAMESPACES.SYNC, {
                hide: today.getTime()
              });

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));
    return _init.apply(this, arguments);
  }

  function setMaxOld(_x5) {
    return _setMaxOld.apply(this, arguments);
  }

  function _setMaxOld() {
    _setMaxOld = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(maxOld) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return write(NAMESPACES.LOCAL, {
                maxOld: maxOld
              });

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));
    return _setMaxOld.apply(this, arguments);
  }

  function getMaxOld() {
    return _getMaxOld.apply(this, arguments);
  }

  function _getMaxOld() {
    _getMaxOld = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      var _yield$read6, maxOld;

      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return read(NAMESPACES.LOCAL, {
                maxOld: 25
              });

            case 2:
              _yield$read6 = _context10.sent;
              maxOld = _yield$read6.maxOld;
              return _context10.abrupt("return", maxOld);

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));
    return _getMaxOld.apply(this, arguments);
  }

  function setLink(_x6) {
    return _setLink.apply(this, arguments);
  }

  function _setLink() {
    _setLink = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(link) {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return write(NAMESPACES.SYNC, {
                link: link
              });

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));
    return _setLink.apply(this, arguments);
  }

  function getLink() {
    return _getLink.apply(this, arguments);
  }

  function _getLink() {
    _getLink = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var _yield$read7, link;

      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return read(NAMESPACES.SYNC, ['link']);

            case 2:
              _yield$read7 = _context12.sent;
              link = _yield$read7.link;
              return _context12.abrupt("return", link);

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));
    return _getLink.apply(this, arguments);
  }

  function getHide() {
    return _getHide.apply(this, arguments);
  }

  function _getHide() {
    _getHide = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
      var _yield$read8, hide;

      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return read(NAMESPACES.SYNC, {
                hide: 0
              });

            case 2:
              _yield$read8 = _context13.sent;
              hide = _yield$read8.hide;
              return _context13.abrupt("return", hide);

            case 5:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));
    return _getHide.apply(this, arguments);
  }

  function writeLocalSettings(_x7) {
    return _writeLocalSettings.apply(this, arguments);
  }

  function _writeLocalSettings() {
    _writeLocalSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(settings) {
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", write(NAMESPACES.LOCAL, {
                localSettings: JSON.stringify(settings)
              }));

            case 1:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));
    return _writeLocalSettings.apply(this, arguments);
  }

  function getLocalSettings() {
    return _getLocalSettings.apply(this, arguments);
  }

  function _getLocalSettings() {
    _getLocalSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
      var _yield$read9, localSettings;

      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return read(NAMESPACES.LOCAL, {
                localSettings: '{}'
              });

            case 2:
              _yield$read9 = _context15.sent;
              localSettings = _yield$read9.localSettings;
              return _context15.abrupt("return", (0,_utils__WEBPACK_IMPORTED_MODULE_0__.parse)(localSettings, {}));

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));
    return _getLocalSettings.apply(this, arguments);
  }

  function getLinkData() {
    return _getLinkData.apply(this, arguments);
  }

  function _getLinkData() {
    _getLinkData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
      var sources, _yield$read10, hiddenChaptersString, hide, hiddenChapters;

      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return readSources();

            case 2:
              sources = _context16.sent;
              _context16.next = 5;
              return read(NAMESPACES.SYNC, {
                hiddenChapters: '{}',
                hide: 0
              });

            case 5:
              _yield$read10 = _context16.sent;
              hiddenChaptersString = _yield$read10.hiddenChapters;
              hide = _yield$read10.hide;
              hiddenChapters = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.parse)(hiddenChaptersString, {});
              return _context16.abrupt("return", {
                sources: sources.map(function (source) {
                  return source.id;
                }),
                hiddenChapters: hiddenChapters,
                hide: Number(hide)
              });

            case 10:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));
    return _getLinkData.apply(this, arguments);
  }

  function setLinkData(_x8) {
    return _setLinkData.apply(this, arguments);
  }

  function _setLinkData() {
    _setLinkData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(_ref) {
      var sources, hiddenChapters, hide, storedSources, hasChangedSources, promises, hidden;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              sources = _ref.sources, hiddenChapters = _ref.hiddenChapters, hide = _ref.hide;
              _context17.next = 3;
              return readSources();

            case 3:
              storedSources = _context17.sent.reduce(function (ss, source) {
                return source ? _objectSpread(_objectSpread({}, ss), {}, _defineProperty({}, source.id, true)) : ss;
              }, {});
              hasChangedSources = Object.keys(storedSources).length !== sources.length || sources.some(function (source) {
                return !storedSources[source.id];
              });
              promises = [Promise.resolve()];

              if (hasChangedSources) {
                promises.push(writeSources(sources));
              }

              _context17.next = 9;
              return read(NAMESPACES.SYNC, {
                hiddenChapters: '{}',
                hide: 0
              });

            case 9:
              hidden = _context17.sent;

              if (hidden.hiddenChapters !== JSON.stringify(hiddenChapters) || String(hidden.hide) !== String(hide)) {
                promises.push(write(NAMESPACES.SYNC, {
                  hiddenChapters: JSON.stringify(hiddenChapters),
                  hide: hide
                }));
              }

              _context17.next = 13;
              return Promise.all(promises);

            case 13:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    }));
    return _setLinkData.apply(this, arguments);
  }

  init();
  return {
    sources: {
      read: readSources,
      import: writeSources,
      add: addSource,
      delete: deleteSource
    },
    settings: {
      local: {
        read: getLocalSettings,
        set: writeLocalSettings
      }
    },
    isDirty: isDirty,
    urls: {
      read: getFilteredSortedUrls,
      hide: hideUrl,
      hideAll: hideAllUrls,
      import: writeUrls,
      setMaxOld: setMaxOld,
      getMaxOld: getMaxOld,
      getHide: getHide
    },
    onChange: storage.addListener,
    link: {
      set: setLink,
      read: getLink,
      local: getLinkData,
      setLocal: setLinkData
    }
  };
}

/***/ }),

/***/ "./src/common/import.js":
/*!******************************!*\
  !*** ./src/common/import.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addImportHandlers": () => (/* binding */ addImportHandlers)
/* harmony export */ });
/* harmony import */ var save_as__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! save-as */ "./node_modules/save-as/lib/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/common/utils.js");


function addImportHandlers(db) {
  var importElem = document.getElementById('import');
  var exportElem = document.getElementById('export');
  importElem.addEventListener('change', function (e) {
    var file = e.target.files[0];
    var fr = new FileReader();
    fr.addEventListener('load', function () {
      var sources = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parse)(fr.result, []);
      var clean = sources.filter(function (source) {
        return (source === null || source === void 0 ? void 0 : source.title) && source.url && source.mangaId;
      });

      if (clean.length) {
        db.sources.import(clean);
      }

      importElem.files = null;
    });
    fr.readAsText(file);
  });
  exportElem.addEventListener('click', function () {
    db.sources.read().then(function (sources) {
      var blob = new Blob([JSON.stringify(sources)], {
        type: 'application/json'
      });
      (0,save_as__WEBPACK_IMPORTED_MODULE_0__.default)(blob, 'mangapoll.json');
    });
  });
}

/***/ }),

/***/ "./src/common/menu.js":
/*!****************************!*\
  !*** ./src/common/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerMenuListeners": () => (/* binding */ registerMenuListeners)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/common/settings.js");

function registerMenuListeners(db, Api) {
  var importSection = document.querySelector('div.import');
  var popupTitle = document.getElementById('popupTitle');
  var bookmarks = document.getElementById('add');
  var urls = document.getElementById('urls');
  var chapters = document.getElementById('chapters');
  var addSection = document.getElementById('addSection');
  var sources = document.getElementById('sources');
  var settings = document.getElementById('settings');
  var settingsSection = document.querySelector('.settings');
  var progress = document.querySelector('#progress');

  var openChapters = function openChapters() {
    sources.style.display = 'none';
    importSection.style.display = 'none';
    addSection.style.display = 'none';
    settingsSection.style.display = 'none';
    urls.style.display = '';
    progress.style.display = '';
    chapters.style.display = 'none';
    settings.style.display = '';
    bookmarks.style.display = '';
    popupTitle.innerText = 'Chapters';
  };

  var openSettings = function openSettings() {
    sources.style.display = 'none';
    importSection.style.display = 'none';
    addSection.style.display = 'none';
    progress.style.display = 'none';
    settingsSection.style.display = '';
    urls.style.display = 'none';
    popupTitle.innerText = 'Settings';
    bookmarks.style.display = '';
    chapters.style.display = '';
    settings.style.display = 'none';
  };

  chapters.addEventListener('click', openChapters);
  bookmarks.addEventListener('click', function () {
    sources.style.display = 'block';
    importSection.style.display = 'flex';
    addSection.style.display = 'flex';
    settingsSection.style.display = 'none';
    progress.style.display = 'none';
    urls.style.display = 'none';
    popupTitle.innerText = 'Bookmarks';
    bookmarks.style.display = 'none';
    chapters.style.display = '';
    settings.style.display = '';
  });
  settings.addEventListener('click', openSettings);

  if ((0,_settings__WEBPACK_IMPORTED_MODULE_0__.getLinkQuery)()) {
    openSettings();
    (0,_settings__WEBPACK_IMPORTED_MODULE_0__.linkIfUnlinked)(db, Api);
  } else {
    openChapters();
  }
}

/***/ }),

/***/ "./src/common/progress-bar.js":
/*!************************************!*\
  !*** ./src/common/progress-bar.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resisterProgressHandler": () => (/* binding */ resisterProgressHandler),
/* harmony export */   "markRefreshed": () => (/* binding */ markRefreshed),
/* harmony export */   "updateProgress": () => (/* binding */ updateProgress)
/* harmony export */ });
var progress = document.querySelector('#progress');
var locked = false;
var resisterProgressHandler = function resisterProgressHandler(updateNow) {
  progress.addEventListener('click', function () {
    updateNow();
    markRefreshed();
  });
};
var markRefreshed = function markRefreshed() {
  progress.innerHTML = '(Refreshed!)';
  progress.dataset.before = '(Refreshed!)';
  locked = true;
  setTimeout(function () {
    locked = false;
    progress.dataset.before = '(Refresh now!)';
  }, 1500);
};
var updateProgress = function updateProgress(_lastPing, nextPing) {
  if (!locked) {
    var remaining = nextPing - Date.now();
    var seconds = Math.max(Math.round(remaining / 1000), 0);
    progress.innerHTML = "(Next refresh: ".concat(seconds, "s)");
  }
};

/***/ }),

/***/ "./src/common/schedule.js":
/*!********************************!*\
  !*** ./src/common/schedule.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSchedule": () => (/* binding */ createSchedule)
/* harmony export */ });
var createSchedule = function createSchedule() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$isActive = _ref.isActive,
      isActive = _ref$isActive === void 0 ? false : _ref$isActive,
      _ref$interval = _ref.interval,
      interval = _ref$interval === void 0 ? 0 : _ref$interval,
      _ref$callback = _ref.callback,
      callback = _ref$callback === void 0 ? Function.prototype : _ref$callback,
      updater = _ref.updater;

  var nextPing = 0;
  var lastPing = 0;

  var callCallback = function callCallback() {
    if (nextPing && nextPing <= Date.now()) {
      callback();
      lastPing = nextPing;
      nextPing = nextPing + interval > Date.now() ? nextPing + interval : Date.now() + interval;
    }

    typeof updater === 'function' && updater(lastPing, nextPing);
  };

  if (isActive && interval) {
    nextPing = Date.now() - 1;
    callCallback();
  }

  var timer = setInterval(callCallback, 100);
  return {
    setInterval: function setInterval(newInterval) {
      if (typeof newInterval !== 'number') {
        throw new Error('use a number');
      }

      nextPing = nextPing - interval + newInterval;
      interval = newInterval;
      callCallback();
    },
    setCallback: function setCallback(cb) {
      callback = cb;
    },
    start: function start() {
      callback();
      lastPing = Date.now();
      nextPing = Date.now() + interval;
      timer = setInterval(callCallback, 100);
    },
    triggerInstantly: function triggerInstantly() {
      callback();
      lastPing = Date.now();
      nextPing = Date.now() + interval;
      typeof updater === 'function' && updater(lastPing, nextPing);
    },
    stop: function stop() {
      clearInterval(timer);
      nextPing = 0;
      lastPing = 0;
    }
  };
};

/***/ }),

/***/ "./src/common/settings.js":
/*!********************************!*\
  !*** ./src/common/settings.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLinkHelpers": () => (/* binding */ getLinkHelpers),
/* harmony export */   "getLinkQuery": () => (/* binding */ getLinkQuery),
/* harmony export */   "linkIfUnlinked": () => (/* binding */ linkIfUnlinked),
/* harmony export */   "addSettingsHandlers": () => (/* binding */ addSettingsHandlers)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var linkFields = ['hide', 'hiddenChapters', 'sources'];

function formatKey() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "".concat(key.slice(0, 5), "-").concat(key.slice(5, 10), "-").concat(key.slice(10, 15));
}

function getLinkHelpers(db, Api) {
  function pushLinkUpdate(_x) {
    return _pushLinkUpdate.apply(this, arguments);
  }

  function _pushLinkUpdate() {
    _pushLinkUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(changes) {
      var changeset, link, local, update;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              changeset = linkFields.filter(function (key) {
                return Object.keys(changes).some(function (change) {
                  return change.includes(key);
                });
              });

              if (!changeset.length) {
                _context.next = 21;
                break;
              }

              _context.next = 4;
              return db.link.read();

            case 4:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 7;
                break;
              }

              _context.t0 = {};

            case 7:
              link = _context.t0;
              _context.next = 10;
              return db.link.local();

            case 10:
              _context.t1 = _context.sent;

              if (_context.t1) {
                _context.next = 13;
                break;
              }

              _context.t1 = {};

            case 13:
              local = _context.t1;
              update = {};

              if (changeset.includes('hide')) {
                update.hide = local.hide;
              }

              if (changeset.includes('hiddenChapters')) {
                update.hiddenChapters = local.hiddenChapters;
              }

              if (changeset.includes('sources')) {
                update.sources = local.sources;
              }

              if (!(Object.keys(update).length && link.key)) {
                _context.next = 21;
                break;
              }

              _context.next = 21;
              return Api.Link.update(link.key, update).then(function (res) {
                return res.valid && db.link.set({
                  key: res.payload.key
                });
              });

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _pushLinkUpdate.apply(this, arguments);
  }

  function fetchLinkUpdate() {
    return _fetchLinkUpdate.apply(this, arguments);
  }

  function _fetchLinkUpdate() {
    _fetchLinkUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var link;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return db.link.read();

            case 2:
              link = _context2.sent;

              if (link) {
                Api.Link.read(link.key, link.lastModified).then(function (res) {
                  if (res.valid && res.payload) {
                    db.link.setLocal(res.payload);
                  }
                });
              }

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _fetchLinkUpdate.apply(this, arguments);
  }

  return {
    pushLinkUpdate: pushLinkUpdate,
    fetchLinkUpdate: fetchLinkUpdate
  };
}

function isValidLinkKey(key) {
  if (typeof key !== 'string') {
    return;
  }

  var cleanKey = key.replaceAll(/[^\d]*/g, '');

  if (cleanKey.length === 15) {
    return true;
  }
}

function getLinkQuery() {
  var urlParams = new URLSearchParams(window.location.search);

  if (isValidLinkKey(urlParams.get('link'))) {
    return urlParams.get('link').replaceAll(/[^\d]*/g, '');
  }
}
function linkIfUnlinked(_x2, _x3) {
  return _linkIfUnlinked.apply(this, arguments);
}

function _linkIfUnlinked() {
  _linkIfUnlinked = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(db, api) {
    var key, currentLink, linkInput1, linkInput2, linkInput3, link, linkNumberText, linkLink, linkLinkText, linkLinkWarn, warnLinkCurrent, warnLinkNew;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            key = getLinkQuery();

            if (!key) {
              _context3.next = 19;
              break;
            }

            _context3.next = 4;
            return db.link.read();

          case 4:
            currentLink = _context3.sent;

            if (!(!currentLink || !currentLink.key)) {
              _context3.next = 18;
              break;
            }

            linkInput1 = document.getElementById('link-number-1');
            linkInput2 = document.getElementById('link-number-2');
            linkInput3 = document.getElementById('link-number-3');
            linkInput1.value = key.slice(0, 5);
            linkInput2.value = key.slice(5, 10);
            linkInput3.value = key.slice(10, 15);
            _context3.next = 14;
            return connectToLink(key, api, db);

          case 14:
            link = _context3.sent;

            if (link && link.key) {
              linkNumberText = document.getElementById('link-id');
              linkLink = document.getElementById('link-link');
              linkLinkText = document.getElementById('link-link-text');
              document.getElementById('link-section').style.display = 'none';
              document.getElementById('unlink-section').style.display = '';
              linkLinkText.style.display = '';
              linkLink.style.display = '';
              linkLink.innerText = "https://manga.fochlac.com?link=".concat(link.key);
              linkLink.href = "https://manga.fochlac.com?link=".concat(link.key);
              linkNumberText.innerText = "".concat(link.key.slice(0, 5), "-").concat(link.key.slice(5, 10), "-").concat(link.key.slice(10));
              linkNumberText.style.color = '#000c21';
            }

            _context3.next = 19;
            break;

          case 18:
            if (formatKey(currentLink.key) !== formatKey(key)) {
              linkLinkWarn = document.getElementById('link-link-warning');
              warnLinkCurrent = document.getElementById('warn-current-link');
              warnLinkNew = document.getElementById('warn-new-link');
              linkLinkWarn.style.display = 'flex';
              warnLinkCurrent.innerText = formatKey(currentLink.key);
              warnLinkNew.innerText = formatKey(key);
            }

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _linkIfUnlinked.apply(this, arguments);
}

function connectToLink(_x4, _x5, _x6) {
  return _connectToLink.apply(this, arguments);
}

function _connectToLink() {
  _connectToLink = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(key, api, db) {
    var Link, linkError, linkProgress, createLink, linkButton, linkResult, link, linkLinkWarn;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            Link = api.Link;
            linkError = document.getElementById('link-error');
            linkProgress = document.getElementById('link-progress');
            createLink = document.getElementById('new-link-button');
            linkButton = document.getElementById('link-button');
            linkError.style.display = 'none';
            linkProgress.style.display = 'block';
            createLink.disabled = true;
            linkButton.disabled = true;
            _context4.next = 11;
            return Link.read(key);

          case 11:
            linkResult = _context4.sent;
            createLink.disabled = false;
            linkButton.disabled = false;
            linkProgress.style.display = 'none';

            if (!(linkResult !== null && linkResult !== void 0 && linkResult.valid)) {
              _context4.next = 24;
              break;
            }

            link = linkResult.payload;
            _context4.next = 19;
            return db.link.set({
              key: link.key
            });

          case 19:
            _context4.next = 21;
            return db.link.setLocal(link);

          case 21:
            return _context4.abrupt("return", link);

          case 24:
            linkError.style.display = 'flex';

          case 25:
            linkLinkWarn = document.getElementById('link-link-warning');

            if (linkLinkWarn) {
              linkLinkWarn.style.display = 'none';
            }

          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _connectToLink.apply(this, arguments);
}

function addSettingsHandlers(_x7, _x8) {
  return _addSettingsHandlers.apply(this, arguments);
}

function _addSettingsHandlers() {
  _addSettingsHandlers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(db, api) {
    var Link, createLink, updateLink, linkNumberText, linkLink, linkLinkText, linkingSection, unlinkSection, unlinkButton, linkButton, linkInput1, linkInput2, linkInput3, writeStateToDom, link;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            writeStateToDom = function _writeStateToDom(link) {
              linkingSection.style.display = link ? 'none' : '';
              unlinkSection.style.display = link ? '' : 'none';

              if (linkLinkText) {
                linkLinkText.style.display = link ? '' : 'none';
                linkLink.style.display = link ? '' : 'none';
                linkLink.innerText = link ? "https://manga.fochlac.com?link=".concat(link.key) : '';
                linkLink.href = link ? "https://manga.fochlac.com?link=".concat(link.key) : '';
              }

              linkNumberText.innerText = link ? formatKey(link.key) : 'Unlinked';
              linkNumberText.style.color = link ? '#000c21' : '#c3cbd2';
            };

            Link = api.Link;
            createLink = document.getElementById('new-link-button');
            updateLink = document.getElementById('update-linking');
            linkNumberText = document.getElementById('link-id');
            linkLink = document.getElementById('link-link');
            linkLinkText = document.getElementById('link-link-text');
            linkingSection = document.getElementById('link-section');
            unlinkSection = document.getElementById('unlink-section');
            unlinkButton = document.getElementById('unlink-button');
            linkButton = document.getElementById('link-button');
            linkInput1 = document.getElementById('link-number-1');
            linkInput2 = document.getElementById('link-number-2');
            linkInput3 = document.getElementById('link-number-3');
            linkInput1.addEventListener('keyup', function () {
              var number = linkInput1.value.replaceAll(/[^\d]*/g, '').slice(0, 15);
              linkInput1.value = number.slice(0, 5);

              if (number.length > 5) {
                linkInput2.value = number.slice(5, 10);
              }

              if (number.length > 10) {
                linkInput3.value = number.slice(10);
                linkInput3.focus();
                linkInput3.setSelectionRange(number.length - 10, number.length - 10);
              } else if (number.length >= 5) {
                linkInput2.focus();
                linkInput2.setSelectionRange(number.length - 5, number.length - 5);
              }
            });
            linkInput2.addEventListener('keyup', function () {
              var number = linkInput2.value.replaceAll(/[^\d]*/g, '').slice(0, 10);
              linkInput2.value = number.slice(0, 5);

              if (number.length >= 5) {
                linkInput3.value = number.slice(5, 10);
                linkInput3.focus();
                linkInput3.setSelectionRange(number.length - 5, number.length - 5);
              }
            });
            linkInput3.addEventListener('keyup', function () {
              var number = linkInput3.value.replaceAll(/[^\d]*/g, '').slice(0, 5);

              if (linkInput3.value !== number.slice(0, 5)) {
                linkInput3.value = number.slice(0, 5);
              }
            });
            _context9.next = 19;
            return db.link.read();

          case 19:
            link = _context9.sent;
            writeStateToDom(link);

            if (updateLink) {
              updateLink.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var key, result;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        key = getLinkQuery();
                        linkInput1.value = key.slice(0, 5);
                        linkInput2.value = key.slice(5, 10);
                        linkInput3.value = key.slice(10, 15);
                        _context5.next = 6;
                        return db.link.set(null);

                      case 6:
                        document.getElementById('link-link-warning').style.display = 'none';
                        writeStateToDom();
                        _context5.next = 10;
                        return connectToLink(key, api, db);

                      case 10:
                        result = _context5.sent;

                        if (result) {
                          writeStateToDom(result);
                          linkInput1.value = '';
                          linkInput2.value = '';
                          linkInput3.value = '';
                        }

                      case 12:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              })));
            }

            createLink.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              var linkLinkWarn, link, linkData, newLinkResult, _link;

              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      linkLinkWarn = document.getElementById('link-error');

                      if (linkLinkWarn) {
                        linkLinkWarn.style.display = 'none';
                      }

                      _context6.next = 4;
                      return db.link.read();

                    case 4:
                      link = _context6.sent;

                      if (link) {
                        _context6.next = 17;
                        break;
                      }

                      _context6.next = 8;
                      return db.link.local();

                    case 8:
                      linkData = _context6.sent;
                      _context6.next = 11;
                      return Link.insert(linkData);

                    case 11:
                      newLinkResult = _context6.sent;

                      if (!(newLinkResult !== null && newLinkResult !== void 0 && newLinkResult.valid)) {
                        _context6.next = 17;
                        break;
                      }

                      _link = newLinkResult.payload;
                      _context6.next = 16;
                      return db.link.set({
                        key: _link.key
                      });

                    case 16:
                      writeStateToDom(_link);

                    case 17:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            })));
            unlinkButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              var link;
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return db.link.read();

                    case 2:
                      link = _context7.sent;

                      if (!link) {
                        _context7.next = 7;
                        break;
                      }

                      _context7.next = 6;
                      return db.link.set(null);

                    case 6:
                      writeStateToDom(undefined);

                    case 7:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7);
            })));
            linkButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var link, key, result;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return db.link.read();

                    case 2:
                      link = _context8.sent;

                      if (link) {
                        _context8.next = 9;
                        break;
                      }

                      key = "".concat(linkInput1.value).concat(linkInput2.value).concat(linkInput3.value);
                      _context8.next = 7;
                      return connectToLink(key, api, db);

                    case 7:
                      result = _context8.sent;

                      if (result) {
                        writeStateToDom(result);
                        linkInput1.value = '';
                        linkInput2.value = '';
                        linkInput3.value = '';
                      }

                    case 9:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8);
            })));

          case 25:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _addSettingsHandlers.apply(this, arguments);
}

/***/ }),

/***/ "./src/common/sources.js":
/*!*******************************!*\
  !*** ./src/common/sources.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sourceRenderer": () => (/* binding */ sourceRenderer)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function sourceRenderer(db) {
  var sources = document.getElementById('sources');
  sources.addEventListener('click', function (event) {
    var closest = event.target.closest('.row .action.delete');

    if (closest && closest.dataset['id'] && sources.contains(closest)) {
      db.sources.delete(closest.dataset['id']);
      closest.classList.remove('action');
    }
  });

  function renderSources() {
    return _renderSources.apply(this, arguments);
  }

  function _renderSources() {
    _renderSources = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return db.sources.read();

            case 2:
              data = _context.sent;
              sources.innerHTML = data.sort(function (source1, source2) {
                return String(source1.title).localeCompare(source2 === null || source2 === void 0 ? void 0 : source2.title);
              }).map(function (source) {
                if (!source) {
                  return '';
                }

                var url = String(source.url).replace(/https?:\/\//, '').split('/')[0];
                return "<li class=\"row source\">\n                        <div class=\"data\" title=\"".concat("".concat(source.title, " (").concat(url, ")"), "\">\n                            <span class=\"title\">", source.title, "</span>\n                            <span class=\"manga-id\">(").concat(url, ")</span>\n                        </div>\n                        <span class=\"delete action\" data-id=\"").concat(source.id, "\">Delete</span>\n                    </li>");
              }).join('\n');

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _renderSources.apply(this, arguments);
  }

  return {
    render: function render() {
      return renderSources();
    }
  };
}

/***/ }),

/***/ "./src/common/urls.js":
/*!****************************!*\
  !*** ./src/common/urls.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlRenderer": () => (/* binding */ urlRenderer)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/common/utils.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


function urlRenderer(db) {
  var urls = document.getElementById('urls');
  var intro = document.getElementById('intro');

  function hide(_x) {
    return _hide.apply(this, arguments);
  }

  function _hide() {
    _hide = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
      var _yield$db$urls$read, newUrls, oldUrls, latestChapterDate;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return db.urls.read();

            case 2:
              _yield$db$urls$read = _context3.sent;
              newUrls = _yield$db$urls$read.newUrls;
              oldUrls = _yield$db$urls$read.oldUrls;

              if (newUrls.length <= 1 && (!newUrls[0] || newUrls[0].id === id)) {
                latestChapterDate = oldUrls.concat(newUrls).reduce(function (lcd, url) {
                  return url.created > lcd ? url.created : lcd;
                }, 0);
                db.urls.hideAll(latestChapterDate + 1);
              } else {
                db.urls.hide(id);
              }

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _hide.apply(this, arguments);
  }

  urls.addEventListener('click', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
      var closestHide, closestLink, closestMore, maxOld, hideAll, top;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              closestHide = event.target.closest('.row .hide');

              if (!(closestHide && closestHide.dataset['id'] && urls.contains(closestHide))) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return hide(closestHide.dataset['id']);

            case 4:
              closestLink = event.target.closest('.row.new .link');

              if (!(closestLink && closestLink.dataset['id'] && urls.contains(closestLink))) {
                _context.next = 10;
                break;
              }

              event.preventDefault();
              _context.next = 9;
              return hide(closestLink.dataset['id']);

            case 9:
              window.open(closestLink.href, '_blank');

            case 10:
              closestMore = event.target.closest('.action.load-more');

              if (!(closestMore && urls.contains(closestMore))) {
                _context.next = 17;
                break;
              }

              _context.next = 14;
              return db.urls.getMaxOld();

            case 14:
              maxOld = _context.sent;
              _context.next = 17;
              return db.urls.setMaxOld(maxOld + 100);

            case 17:
              hideAll = event.target.closest('.hide-all');

              if (!(hideAll && urls.contains(hideAll))) {
                _context.next = 21;
                break;
              }

              _context.next = 21;
              return db.urls.hideAll(Date.now());

            case 21:
              top = event.target.closest('.top');

              if (top && urls.contains(top)) {
                urls.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }());
  var maxScroll = 0;
  urls.addEventListener('scroll', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var scrollHeight, maxOld;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            scrollHeight = urls.offsetHeight + urls.scrollTop;

            if (!(urls.scrollHeight - scrollHeight <= 50 && maxScroll !== urls.scrollHeight)) {
              _context2.next = 7;
              break;
            }

            maxScroll = urls.scrollHeight;
            _context2.next = 5;
            return db.urls.getMaxOld();

          case 5:
            maxOld = _context2.sent;
            db.urls.setMaxOld(maxOld + 100);

          case 7:
            checkTopButton();

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));

  function checkTopButton() {
    if (urls.scrollTop > 0 && urls.getBoundingClientRect().top === urls.querySelector('.old-chapters').getBoundingClientRect().top) {
      urls.querySelector('.old-chapters .top').style.display = 'inline';
    } else {
      urls.querySelector('.old-chapters .top').style.display = 'none';
    }
  }

  function createUrlRenderer(isOld) {
    return function (chapter) {
      var date = new Date(chapter.created);
      var timeString = "".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getHours()), ":").concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getMinutes()));
      var dateString = "".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getDate()), ".").concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getMonth() + 1), ".").concat(String(date.getFullYear()).slice(-2));
      var fullDate = date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0] ? timeString : dateString;
      return "\n                <li class=\"row".concat(isOld ? ' old' : ' new', "\">\n                    <a class=\"link\" href=\"").concat(chapter.url, "\" target=\"_blank\" rel=\"noopener\" data-id=\"").concat(chapter.id, "\">\n                        ").concat(chapter.title, " - Chapter ").concat(chapter.chapter, "\n                    </a>\n                    <span class=\"date-wrapper\">\n                        <span class=\"date\" title=\"", "".concat(dateString, " ").concat(timeString), "\">").concat(fullDate, "</span>\n                        <span class=\"hide\" data-id=\"").concat(chapter.id, "\">Hide</span>\n                    </span>\n                </li>");
    };
  }

  function renderUrls() {
    return _renderUrls.apply(this, arguments);
  }

  function _renderUrls() {
    _renderUrls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var maxOld, sources, _yield$db$urls$read2, newUrls, oldUrls, newRows, oldRows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return db.urls.getMaxOld();

            case 2:
              maxOld = _context4.sent;
              _context4.next = 5;
              return db.sources.read();

            case 5:
              sources = _context4.sent;
              _context4.next = 8;
              return db.urls.read();

            case 8:
              _yield$db$urls$read2 = _context4.sent;
              newUrls = _yield$db$urls$read2.newUrls;
              oldUrls = _yield$db$urls$read2.oldUrls;
              newRows = newUrls.map(createUrlRenderer(false));
              oldRows = oldUrls.map(createUrlRenderer(true));

              if (!sources.length) {
                urls.innerHTML = '';
                intro.style.display = 'flex';
              } else if (newRows.length || oldRows.length) {
                intro.style.display = 'none';
                urls.innerHTML = [].concat(newRows.length ? '<li class="new-chapters">New Chapters <span class="action hide-all">Hide all</span></li>' : []).concat(newRows).concat('<li class="old-chapters">Old Chapters <span class="action top">Top &#8593;</span></li>').concat(oldRows.slice(0, maxOld)).concat(oldRows.length >= maxOld ? ['<li class="action load-more">Load up to 100 more old chapters...</li>'] : []).join('\n');
                document.title = newRows.length ? "(".concat(newRows.length, ") Manga Poll") : 'Manga Poll';
                checkTopButton();
              } else {
                intro.style.display = 'none';
                urls.innerHTML = '<li class="row">No Chapters available.</li>';
                document.title = 'Manga Poll';
              }

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _renderUrls.apply(this, arguments);
  }

  return {
    render: function render() {
      return renderUrls();
    }
  };
}

/***/ }),

/***/ "./src/common/utils.js":
/*!*****************************!*\
  !*** ./src/common/utils.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "pad": () => (/* binding */ pad)
/* harmony export */ });
function parse(string, fallback) {
  try {
    return JSON.parse(string);
  } catch (e) {
    return fallback;
  }
}
function pad(no) {
  return ('00' + no).slice(-2);
}

/***/ }),

/***/ "./src/extension/bookmark.js":
/*!***********************************!*\
  !*** ./src/extension/bookmark.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "testBookmark": () => (/* binding */ testBookmark)
/* harmony export */ });
/* harmony import */ var _common_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/api */ "./src/common/api.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/extension/constants.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/extension/storage.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var currentSource = null;
var bookmark = document.getElementById('bookmark');
var bookmarkTrack = document.getElementById('bookmark-track');
var bookmarkTitle = document.getElementById('bookmark-title');

var _API = (0,_common_api__WEBPACK_IMPORTED_MODULE_0__.API)(_constants__WEBPACK_IMPORTED_MODULE_1__.API_ADDRESS),
    Source = _API.Source;

bookmarkTrack.addEventListener('click', function () {
  bookmark.style.display = 'none';
  bookmarkTitle.innerText = '';
  Source.insert(currentSource).then(function (source) {
    return source && _storage__WEBPACK_IMPORTED_MODULE_2__.db.sources.add(source);
  });
  currentSource = null;
});
chrome.runtime.onMessage.addListener( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request) {
    var sources;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(request);

            if (!(request.id && request.title && request.url)) {
              _context.next = 10;
              break;
            }

            _context.next = 4;
            return _storage__WEBPACK_IMPORTED_MODULE_2__.db.sources.read();

          case 4:
            sources = _context.sent;

            if (sources.some(function (source) {
              return source.url === request.url && String(source.mangaId) === String(request.id);
            })) {
              _context.next = 10;
              break;
            }

            bookmark.style.display = 'flex';
            bookmarkTitle.innerText = "Do you want to start tracking \"".concat(request.title, "\"?");
            currentSource = {
              type: request.type,
              mangaId: request.id,
              title: request.title,
              url: request.url
            };
            return _context.abrupt("return");

          case 10:
            bookmark.style.display = 'none';
            bookmarkTitle.innerText = '';
            currentSource = null;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
function testBookmark() {
  chrome.tabs.query({
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT
  }, function (tabs) {
    if (!tabs[0].url.includes('chrome://')) {
      chrome.scripting.executeScript({
        target: {
          tabId: tabs[0].id
        },
        function: test
      });
    }
  });
}

function test() {
  function decodeHTMLEntities(str) {
    if (str && typeof str === 'string') {
      var element = document.createElement('div');
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      return element.textContent;
    }

    return str;
  }

  function testFanFox() {
    var _window$location$path, _document$querySelect, _document$querySelect2;

    var url = (_window$location$path = window.location.pathname.match(/^\/manga\/[^/]*\//)) === null || _window$location$path === void 0 ? void 0 : _window$location$path[0];
    var name = ((_document$querySelect = document.querySelector('.reader-header-title-1 a:first-child')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.innerText) || ((_document$querySelect2 = document.querySelector('.detail-info-right-title-font')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.innerText);
    return {
      type: 'fanfox',
      id: url ? url.split('/')[2] : null,
      title: name,
      url: url ? "".concat(window.location.origin).concat(url) : null
    };
  }

  function testMangadex() {
    if (/title\/[\d-\w]*\/[\d-\w]*/.test(window.location.pathname)) {
      var _window$location$path2, _document$querySelect3;

      var id = (_window$location$path2 = window.location.pathname.split('/')) === null || _window$location$path2 === void 0 ? void 0 : _window$location$path2[2];
      var name = (_document$querySelect3 = document.querySelector('.manga-container .title p')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.innerText;
      return {
        type: 'mangadex',
        id: id,
        title: name,
        url: id ? "https://api.mangadex.org/manga/".concat(id) : null
      };
    } else if (/chapter\/[\d-\w]*\/\d*/.test(window.location.pathname)) {
      var _link$href$split;

      var link = document.querySelector('a.text-primary[href*="/title/"]');

      var _name = link === null || link === void 0 ? void 0 : link.innerText;

      var _id = link === null || link === void 0 ? void 0 : (_link$href$split = link.href.split('/')) === null || _link$href$split === void 0 ? void 0 : _link$href$split[4];

      return {
        type: 'mangadex',
        id: _id,
        title: _name,
        url: _id ? "https://api.mangadex.org/manga/".concat(_id) : null
      };
    }
  }

  function testMadaro() {
    var _window, _window$manga, _document$querySelect4, _document$querySelect5, _document$querySelect6, _document$querySelect7, _document$querySelect8, _document$getElementB, _document$getElementB2, _document$getElementB3, _document$getElementB4, _document$getElementB5, _document$getElementB6, _document$getElementB7, _document$getElementB8, _document$querySelect9, _document, _document$location;

    function parse(string, fallback) {
      try {
        return JSON.parse(string);
      } catch (e) {
        return fallback;
      }
    }

    var ids = [(_window = window) === null || _window === void 0 ? void 0 : (_window$manga = _window.manga) === null || _window$manga === void 0 ? void 0 : _window$manga.manga_id, (_document$querySelect4 = document.querySelector('.rating-post-id')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.value, (_document$querySelect5 = document.querySelector('.wp-manga-action-button')) === null || _document$querySelect5 === void 0 ? void 0 : (_document$querySelect6 = _document$querySelect5.dataset) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6['post'], (_document$querySelect7 = document.querySelector('.chapter-selection')) === null || _document$querySelect7 === void 0 ? void 0 : (_document$querySelect8 = _document$querySelect7.dataset) === null || _document$querySelect8 === void 0 ? void 0 : _document$querySelect8['manga'], (_document$getElementB = document.getElementById('manga-chapters-holder')) === null || _document$getElementB === void 0 ? void 0 : (_document$getElementB2 = _document$getElementB.dataset) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2['id'], (_document$getElementB3 = document.getElementById('manga-reading-nav-head')) === null || _document$getElementB3 === void 0 ? void 0 : (_document$getElementB4 = _document$getElementB3.dataset) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4['id'], (_document$getElementB5 = document.getElementById('manga-reading-nav-foot')) === null || _document$getElementB5 === void 0 ? void 0 : (_document$getElementB6 = _document$getElementB5.dataset) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6['id']].filter(function (title) {
      return title;
    }).reduce(function (map, id) {
      map[id] = typeof map[id] === 'number' ? map[id] + 1 : 1;
      return map;
    }, {});
    var id = Object.keys(ids).sort(function (id1, id2) {
      return ids[id1] - ids[id2];
    })[0];
    var header = document.querySelector('.post-title h1');
    var titles = [Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(function (script) {
      var _parse;

      return (_parse = parse(script.innerText)) === null || _parse === void 0 ? void 0 : _parse.headline;
    }).find(function (h) {
      return h;
    }), (_document$getElementB7 = document.getElementById('chapter-heading')) === null || _document$getElementB7 === void 0 ? void 0 : (_document$getElementB8 = _document$getElementB7.innerText) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8.split(' - ')[0], header && Array.from(header.childNodes).reduce(function (title, node) {
      return title + (node.nodeType === 3 ? node.textContent : '');
    }, ''), (_document$querySelect9 = document.querySelector('.rate-title')) === null || _document$querySelect9 === void 0 ? void 0 : _document$querySelect9.title].filter(function (title) {
      return title;
    }).reduce(function (map, title) {
      var clean = decodeHTMLEntities(title).trim();
      map[clean] = typeof map[clean] === 'number' ? map[clean] + 1 : 1;
      return map;
    }, {});
    var title = Object.keys(titles).sort(function (title1, title2) {
      return titles[title1] - titles[title2];
    })[0];
    var url = null;

    if ((_document = document) !== null && _document !== void 0 && (_document$location = _document.location) !== null && _document$location !== void 0 && _document$location.href) {
      var _document$location$hr;

      url = (_document$location$hr = document.location.href.match(/https?:\/\/[^/]*\/[^/]*\/[^/]*\//)) === null || _document$location$hr === void 0 ? void 0 : _document$location$hr[0];
    }

    if (document.location.href.includes('leviatanscans.com')) {
      url = document.location.href.split('/').slice(0, 6).join('/') + '/ajax/chapters';
    }

    if (document.location.href.includes('reaperscans.com')) {
      var _document$location$hr2;

      url = (_document$location$hr2 = document.location.href.match(/http.*\/series\/[^/]*\//)) === null || _document$location$hr2 === void 0 ? void 0 : _document$location$hr2[0];
      title = title.split(' – ')[0];
    }

    return {
      type: 'madara',
      id: id,
      title: title,
      url: url
    };
  }

  var result;

  if (window.location.host === 'fanfox.net') {
    result = testFanFox();
  } else if (window.location.host === 'mangadex.org') {
    result = testMangadex();
  } else {
    result = testMadaro();
  }

  console.log(result);

  if (result) {
    chrome.runtime.sendMessage(result);
  }
}

/***/ }),

/***/ "./src/extension/constants.js":
/*!************************************!*\
  !*** ./src/extension/constants.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API_ADDRESS": () => (/* binding */ API_ADDRESS)
/* harmony export */ });
var API_ADDRESS = 'https://manga.fochlac.com'; // 'http://localhost:43214'

/***/ }),

/***/ "./src/extension/intro.js":
/*!********************************!*\
  !*** ./src/extension/intro.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initIntro": () => (/* binding */ initIntro)
/* harmony export */ });
function initIntro() {
  var bookmarkImage = document.getElementById('intro-bookmark');
  bookmarkImage.src = chrome.runtime.getURL('images/bookmark-sample.png');
}

/***/ }),

/***/ "./src/extension/storage.js":
/*!**********************************!*\
  !*** ./src/extension/storage.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "db": () => (/* binding */ db)
/* harmony export */ });
/* harmony import */ var _common_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/db */ "./src/common/db.js");


function read(namespace, keys) {
  return new Promise(function (resolve) {
    return chrome.storage[namespace].get(keys, resolve);
  });
}

function write(namespace, keyPairs) {
  return new Promise(function (resolve) {
    return chrome.storage[namespace].set(keyPairs, resolve);
  });
}

function addListener(callback) {
  return chrome.storage.onChanged.addListener(callback);
}

var storage = {
  read: read,
  write: write,
  addListener: addListener
};
var db = (0,_common_db__WEBPACK_IMPORTED_MODULE_0__.createDB)(storage);

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./node_modules/save-as/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/save-as/lib/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* FileSaver.js
 * A saveAs() FileSaver implementation.
 *
 * By Eli Grey, http://eligrey.com
 * ES6ified by Cole Chamberlain, https://github.com/cchamberlain
 *
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = exports.saveAs = window.saveAs || function (view) {
  // IE <10 is explicitly unsupported
  if (typeof navigator !== 'undefined' && /MSIE [1-9]\./.test(navigator.userAgent)) return;
  var doc = view.document;
  // only get URL when necessary in case Blob.js hasn't overridden it yet
  var get_URL = function get_URL() {
    return view.URL || view.webkitURL || view;
  };
  var save_link = doc.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  var can_use_save_link = 'download' in save_link;
  var click = function click(node) {
    var event = new MouseEvent('click');
    node.dispatchEvent(event);
  };
  var is_safari = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent);
  var webkit_req_fs = view.webkitRequestFileSystem;
  var req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem;
  var throw_outside = function throw_outside(ex) {
    (view.setImmediate || view.setTimeout)(function () {
      throw ex;
    }, 0);
  };
  var force_saveable_type = 'application/octet-stream';
  var fs_min_size = 0;
  // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
  var arbitrary_revoke_timeout = 1000 * 40; // in ms
  var revoke = function revoke(file) {
    var revoker = function revoker() {
      if (typeof file === 'string') // file is an object URL
        get_URL().revokeObjectURL(file);else // file is a File
        file.remove();
    };
    /* // Take note W3C:
    var
      uri = typeof file === "string" ? file : file.toURL()
    , revoker = function(evt) {
      // idealy DownloadFinishedEvent.data would be the URL requested
      if (evt.data === uri) {
        if (typeof file === "string") { // file is an object URL
          get_URL().revokeObjectURL(file);
        } else { // file is a File
          file.remove();
        }
      }
    }
    ;
    view.addEventListener("downloadfinished", revoker);
    */
    setTimeout(revoker, arbitrary_revoke_timeout);
  };
  var dispatch = function dispatch(filesaver, event_types, event) {
    event_types = [].concat(event_types);
    var i = event_types.length;
    while (i--) {
      var listener = filesaver['on' + event_types[i]];
      if (typeof listener === 'function') {
        try {
          listener.call(filesaver, event || filesaver);
        } catch (ex) {
          throw_outside(ex);
        }
      }
    }
  };
  var auto_bom = function auto_bom(blob) {
    // prepend BOM for UTF-8 XML and text/* types (including HTML)
    if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) return new Blob(['﻿', blob], { type: blob.type });
    return blob;
  };

  var FileSaver = function FileSaver(blob, name, no_auto_bom) {
    _classCallCheck(this, FileSaver);

    if (!no_auto_bom) blob = auto_bom(blob);
    // First try a.download, then web filesystem, then object URLs
    var filesaver = this,
        type = blob.type,
        blob_changed = false,
        object_url,
        target_view,
        dispatch_all = function dispatch_all() {
      dispatch(filesaver, 'writestart progress write writeend'.split(' '));
    }
    // on any filesys errors revert to saving with object URLs
    ,
        fs_error = function fs_error() {
      if (target_view && is_safari && typeof FileReader !== 'undefined') {
        // Safari doesn't allow downloading of blob urls
        var reader = new FileReader();
        reader.onloadend = function () {
          var base64Data = reader.result;
          target_view.location.href = 'data:attachment/file' + base64Data.slice(base64Data.search(/[,;]/));
          filesaver.readyState = filesaver.DONE;
          dispatch_all();
        };
        reader.readAsDataURL(blob);
        filesaver.readyState = filesaver.INIT;
        return;
      }
      // don't create more object URLs than needed
      if (blob_changed || !object_url) {
        object_url = get_URL().createObjectURL(blob);
      }
      if (target_view) {
        target_view.location.href = object_url;
      } else {
        var new_tab = view.open(object_url, '_blank');
        if (new_tab === undefined && is_safari) {
          //Apple do not allow window.open, see http://bit.ly/1kZffRI
          view.location.href = object_url;
        }
      }
      filesaver.readyState = filesaver.DONE;
      dispatch_all();
      revoke(object_url);
    },
        abortable = function abortable(func) {
      return function () {
        if (filesaver.readyState !== filesaver.DONE) {
          return func.apply(this, arguments);
        }
      };
    },
        create_if_not_found = { create: true, exclusive: false },
        slice;

    filesaver.readyState = filesaver.INIT;
    if (!name) {
      name = 'download';
    }
    if (can_use_save_link) {
      object_url = get_URL().createObjectURL(blob);
      setTimeout(function () {
        save_link.href = object_url;
        save_link.download = name;
        click(save_link);
        dispatch_all();
        revoke(object_url);
        filesaver.readyState = filesaver.DONE;
      });
      return;
    }
    // Object and web filesystem URLs have a problem saving in Google Chrome when
    // viewed in a tab, so I force save with application/octet-stream
    // http://code.google.com/p/chromium/issues/detail?id=91158
    // Update: Google errantly closed 91158, I submitted it again:
    // https://code.google.com/p/chromium/issues/detail?id=389642
    if (view.chrome && type && type !== force_saveable_type) {
      slice = blob.slice || blob.webkitSlice;
      blob = slice.call(blob, 0, blob.size, force_saveable_type);
      blob_changed = true;
    }
    // Since I can't be sure that the guessed media type will trigger a download
    // in WebKit, I append .download to the filename.
    // https://bugs.webkit.org/show_bug.cgi?id=65440
    if (webkit_req_fs && name !== 'download') {
      name += '.download';
    }
    if (type === force_saveable_type || webkit_req_fs) {
      target_view = view;
    }
    if (!req_fs) {
      fs_error();
      return;
    }
    fs_min_size += blob.size;
    req_fs(view.TEMPORARY, fs_min_size, abortable(function (fs) {
      fs.root.getDirectory('saved', create_if_not_found, abortable(function (dir) {
        var save = function save() {
          dir.getFile(name, create_if_not_found, abortable(function (file) {
            file.createWriter(abortable(function (writer) {
              writer.onwriteend = function (event) {
                target_view.location.href = file.toURL();
                filesaver.readyState = filesaver.DONE;
                dispatch(filesaver, 'writeend', event);
                revoke(file);
              };
              writer.onerror = function () {
                var error = writer.error;
                if (error.code !== error.ABORT_ERR) {
                  fs_error();
                }
              };
              'writestart progress write abort'.split(' ').forEach(function (event) {
                writer['on' + event] = filesaver['on' + event];
              });
              writer.write(blob);
              filesaver.abort = function () {
                writer.abort();
                filesaver.readyState = filesaver.DONE;
              };
              filesaver.readyState = filesaver.WRITING;
            }), fs_error);
          }), fs_error);
        };
        dir.getFile(name, { create: false }, abortable(function (file) {
          // delete file if it already exists
          file.remove();
          save();
        }), abortable(function (ex) {
          if (ex.code === ex.NOT_FOUND_ERR) {
            save();
          } else {
            fs_error();
          }
        }));
      }), fs_error);
    }), fs_error);
  };

  var FS_proto = FileSaver.prototype;
  var saveAs = function saveAs(blob, name, no_auto_bom) {
    return new FileSaver(blob, name, no_auto_bom);
  };

  // IE 10+ (native saveAs)
  if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
    return function (blob, name, no_auto_bom) {
      if (!no_auto_bom) blob = auto_bom(blob);
      return navigator.msSaveOrOpenBlob(blob, name || 'download');
    };
  }

  FS_proto.abort = function () {
    var filesaver = this;
    filesaver.readyState = filesaver.DONE;
    dispatch(filesaver, 'abort');
  };
  FS_proto.readyState = FS_proto.INIT = 0;
  FS_proto.WRITING = 1;
  FS_proto.DONE = 2;

  FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;

  return saveAs;
}(typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || undefined.content);
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

exports.default = saveAs;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./src/extension/popup.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bookmark */ "./src/extension/bookmark.js");
/* harmony import */ var _common_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/import */ "./src/common/import.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage */ "./src/extension/storage.js");
/* harmony import */ var _common_urls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/urls */ "./src/common/urls.js");
/* harmony import */ var _common_sources__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/sources */ "./src/common/sources.js");
/* harmony import */ var _common_progress_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/progress-bar */ "./src/common/progress-bar.js");
/* harmony import */ var _common_schedule__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/schedule */ "./src/common/schedule.js");
/* harmony import */ var _common_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/menu */ "./src/common/menu.js");
/* harmony import */ var _common_settings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/settings */ "./src/common/settings.js");
/* harmony import */ var _common_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/api */ "./src/common/api.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./constants */ "./src/extension/constants.js");
/* harmony import */ var _intro__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./intro */ "./src/extension/intro.js");













var api = (0,_common_api__WEBPACK_IMPORTED_MODULE_10__.API)(_constants__WEBPACK_IMPORTED_MODULE_11__.API_ADDRESS);
_storage__WEBPACK_IMPORTED_MODULE_3__.db.urls.setMaxOld(100);
var Links = (0,_common_settings__WEBPACK_IMPORTED_MODULE_9__.getLinkHelpers)(_storage__WEBPACK_IMPORTED_MODULE_3__.db, api);
var Urls = (0,_common_urls__WEBPACK_IMPORTED_MODULE_4__.urlRenderer)(_storage__WEBPACK_IMPORTED_MODULE_3__.db);
var Sources = (0,_common_sources__WEBPACK_IMPORTED_MODULE_5__.sourceRenderer)(_storage__WEBPACK_IMPORTED_MODULE_3__.db);
_storage__WEBPACK_IMPORTED_MODULE_3__.db.onChange(function (changes) {
  if (['hide', 'hiddenChapters', 'urls'].some(changes.hasOwnProperty.bind(changes))) {
    Urls.render();
  }

  if (Object.keys(changes).some(function (change) {
    return change.includes('sources');
  }) || Object.prototype.hasOwnProperty.call(changes, 'maxOld')) {
    Sources.render();
  }

  Links.pushLinkUpdate(changes);
});
navigator.serviceWorker.controller.postMessage('FETCH_CHAPTERS');
(0,_common_progress_bar__WEBPACK_IMPORTED_MODULE_6__.markRefreshed)();
var interval = (0,_common_schedule__WEBPACK_IMPORTED_MODULE_7__.createSchedule)({
  callback: function callback() {
    navigator.serviceWorker.controller.postMessage('FETCH_CHAPTERS');
    (0,_common_progress_bar__WEBPACK_IMPORTED_MODULE_6__.markRefreshed)();
  },
  interval: 60 * 1000,
  isActive: true,
  updater: _common_progress_bar__WEBPACK_IMPORTED_MODULE_6__.updateProgress
});
(0,_intro__WEBPACK_IMPORTED_MODULE_12__.initIntro)();
(0,_common_progress_bar__WEBPACK_IMPORTED_MODULE_6__.resisterProgressHandler)(function () {
  return interval.triggerInstantly();
});
(0,_common_import__WEBPACK_IMPORTED_MODULE_2__.addImportHandlers)(_storage__WEBPACK_IMPORTED_MODULE_3__.db);
(0,_common_settings__WEBPACK_IMPORTED_MODULE_9__.addSettingsHandlers)(_storage__WEBPACK_IMPORTED_MODULE_3__.db, api);
(0,_common_menu__WEBPACK_IMPORTED_MODULE_8__.registerMenuListeners)(_storage__WEBPACK_IMPORTED_MODULE_3__.db, api);
Urls.render();
Sources.render().then(_bookmark__WEBPACK_IMPORTED_MODULE_1__.testBookmark);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2RiLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vaW1wb3J0LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vbWVudS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3Byb2dyZXNzLWJhci5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3NjaGVkdWxlLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9zb3VyY2VzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vdXJscy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3V0aWxzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9leHRlbnNpb24vYm9va21hcmsuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9pbnRyby5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9ub2RlX21vZHVsZXMvc2F2ZS1hcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21hbmdhY2hlY2tlci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21hbmdhY2hlY2tlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21hbmdhY2hlY2tlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9leHRlbnNpb24vcG9wdXAuanMiXSwibmFtZXMiOlsiQVBJIiwiYmFzZVVybCIsInBvc3RTb3VyY2UiLCJzb3VyY2UiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZGVycyIsIkFjY2VwdCIsInRoZW4iLCJyZXMiLCJqc29uIiwiY2F0Y2giLCJlcnJvciIsInZhbGlkIiwiZGF0YSIsInBheWxvYWQiLCJhZGRTb3VyY2VGcm9tVXJsIiwidXJsIiwicmVhZFVybHMiLCJzb3VyY2VzIiwibGltaXQiLCJkYXRlIiwiYWRkU3Vic2NyaXB0aW9ucyIsInRvcGljcyIsImtleSIsImRlbGV0ZVN1YnNjcmlwdGlvbnMiLCJyZWFkTGluayIsImNoYW5nZWRTaW5jZSIsInN0YXR1cyIsInVwZGF0ZUxpbmsiLCJ1cGRhdGVTZXQiLCJjcmVhdGVMaW5rIiwiaW5pdFNldCIsIlVybHMiLCJyZWFkIiwiU291cmNlIiwiaW5zZXJ0IiwiZnJvbVVybCIsIlN1YnNjcmlwdGlvbiIsInN1YnNjcmliZSIsInVuc3Vic2NyaWJlIiwiTGluayIsInVwZGF0ZSIsIk5BTUVTUEFDRVMiLCJTWU5DIiwiTE9DQUwiLCJjcmVhdGVEQiIsInN0b3JhZ2UiLCJ3cml0ZSIsInJlYWRTb3VyY2VzIiwicmVnaXN0cnkiLCJwYXJzZSIsInJlZHVjZSIsIlByb21pc2UiLCJhbGwiLCJjb25jYXQiLCJyZXNvbHZlIiwid3JpdGVTb3VyY2VzIiwidXBkYXRlcyIsIngiLCJNYXRoIiwibWF4IiwiY2VpbCIsImxlbmd0aCIsInB1c2giLCJzbGljZSIsImFkZFNvdXJjZSIsInNvbWUiLCJtYW5nYUlkIiwiZGVsZXRlU291cmNlIiwic291cmNlSWQiLCJuZXdTb3VyY2VzIiwiZmlsdGVyIiwiaWQiLCJpc0RpcnR5IiwidXJscyIsImdldEZpbHRlcmVkU29ydGVkVXJscyIsImhpZGRlbkNoYXB0ZXJzIiwiaGlkZSIsImhpZGRlbkNoYXB0ZXJzU3RyaW5nIiwidXJsTGlzdCIsImNoZWNrT2xkIiwiY2hhcHRlciIsImNyZWF0ZWQiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzb3J0IiwidXJsMSIsInVybDIiLCJkaWZmIiwiYWJzIiwiU3RyaW5nIiwibG9jYWxlQ29tcGFyZSIsIm9sZFVybHMiLCJuZXdVcmxzIiwiaGlkZVVybCIsInJlc3VsdCIsImhpZGVBbGxVcmxzIiwidGltZXN0YW1wIiwid3JpdGVVcmxzIiwiaW5pdCIsInRvZGF5IiwiRGF0ZSIsInNldEhvdXJzIiwiZ2V0VGltZSIsInNldE1heE9sZCIsIm1heE9sZCIsImdldE1heE9sZCIsInNldExpbmsiLCJsaW5rIiwiZ2V0TGluayIsImdldEhpZGUiLCJ3cml0ZUxvY2FsU2V0dGluZ3MiLCJzZXR0aW5ncyIsImxvY2FsU2V0dGluZ3MiLCJnZXRMb2NhbFNldHRpbmdzIiwiZ2V0TGlua0RhdGEiLCJtYXAiLCJOdW1iZXIiLCJzZXRMaW5rRGF0YSIsInN0b3JlZFNvdXJjZXMiLCJzcyIsImhhc0NoYW5nZWRTb3VyY2VzIiwia2V5cyIsInByb21pc2VzIiwiaGlkZGVuIiwiaW1wb3J0IiwiYWRkIiwiZGVsZXRlIiwibG9jYWwiLCJzZXQiLCJoaWRlQWxsIiwib25DaGFuZ2UiLCJhZGRMaXN0ZW5lciIsInNldExvY2FsIiwiYWRkSW1wb3J0SGFuZGxlcnMiLCJkYiIsImltcG9ydEVsZW0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZXhwb3J0RWxlbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiZmlsZSIsInRhcmdldCIsImZpbGVzIiwiZnIiLCJGaWxlUmVhZGVyIiwiY2xlYW4iLCJ0aXRsZSIsInJlYWRBc1RleHQiLCJibG9iIiwiQmxvYiIsInR5cGUiLCJzYXZlQXMiLCJyZWdpc3Rlck1lbnVMaXN0ZW5lcnMiLCJBcGkiLCJpbXBvcnRTZWN0aW9uIiwicXVlcnlTZWxlY3RvciIsInBvcHVwVGl0bGUiLCJib29rbWFya3MiLCJjaGFwdGVycyIsImFkZFNlY3Rpb24iLCJzZXR0aW5nc1NlY3Rpb24iLCJwcm9ncmVzcyIsIm9wZW5DaGFwdGVycyIsInN0eWxlIiwiZGlzcGxheSIsImlubmVyVGV4dCIsIm9wZW5TZXR0aW5ncyIsImdldExpbmtRdWVyeSIsImxpbmtJZlVubGlua2VkIiwibG9ja2VkIiwicmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIiLCJ1cGRhdGVOb3ciLCJtYXJrUmVmcmVzaGVkIiwiaW5uZXJIVE1MIiwiZGF0YXNldCIsImJlZm9yZSIsInNldFRpbWVvdXQiLCJ1cGRhdGVQcm9ncmVzcyIsIl9sYXN0UGluZyIsIm5leHRQaW5nIiwicmVtYWluaW5nIiwibm93Iiwic2Vjb25kcyIsInJvdW5kIiwiY3JlYXRlU2NoZWR1bGUiLCJpc0FjdGl2ZSIsImludGVydmFsIiwiY2FsbGJhY2siLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsInVwZGF0ZXIiLCJsYXN0UGluZyIsImNhbGxDYWxsYmFjayIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJuZXdJbnRlcnZhbCIsIkVycm9yIiwic2V0Q2FsbGJhY2siLCJjYiIsInN0YXJ0IiwidHJpZ2dlckluc3RhbnRseSIsInN0b3AiLCJjbGVhckludGVydmFsIiwibGlua0ZpZWxkcyIsImZvcm1hdEtleSIsImdldExpbmtIZWxwZXJzIiwicHVzaExpbmtVcGRhdGUiLCJjaGFuZ2VzIiwiY2hhbmdlc2V0IiwiY2hhbmdlIiwiaW5jbHVkZXMiLCJmZXRjaExpbmtVcGRhdGUiLCJsYXN0TW9kaWZpZWQiLCJpc1ZhbGlkTGlua0tleSIsImNsZWFuS2V5IiwicmVwbGFjZUFsbCIsInVybFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwiZ2V0IiwiYXBpIiwiY3VycmVudExpbmsiLCJsaW5rSW5wdXQxIiwibGlua0lucHV0MiIsImxpbmtJbnB1dDMiLCJ2YWx1ZSIsImNvbm5lY3RUb0xpbmsiLCJsaW5rTnVtYmVyVGV4dCIsImxpbmtMaW5rIiwibGlua0xpbmtUZXh0IiwiaHJlZiIsImNvbG9yIiwibGlua0xpbmtXYXJuIiwid2FybkxpbmtDdXJyZW50Iiwid2FybkxpbmtOZXciLCJsaW5rRXJyb3IiLCJsaW5rUHJvZ3Jlc3MiLCJsaW5rQnV0dG9uIiwiZGlzYWJsZWQiLCJsaW5rUmVzdWx0IiwiYWRkU2V0dGluZ3NIYW5kbGVycyIsIndyaXRlU3RhdGVUb0RvbSIsImxpbmtpbmdTZWN0aW9uIiwidW5saW5rU2VjdGlvbiIsInVubGlua0J1dHRvbiIsIm51bWJlciIsImZvY3VzIiwic2V0U2VsZWN0aW9uUmFuZ2UiLCJsaW5rRGF0YSIsIm5ld0xpbmtSZXN1bHQiLCJ1bmRlZmluZWQiLCJzb3VyY2VSZW5kZXJlciIsImV2ZW50IiwiY2xvc2VzdCIsImNvbnRhaW5zIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicmVuZGVyU291cmNlcyIsInNvdXJjZTEiLCJzb3VyY2UyIiwicmVwbGFjZSIsInNwbGl0Iiwiam9pbiIsInJlbmRlciIsInVybFJlbmRlcmVyIiwiaW50cm8iLCJsYXRlc3RDaGFwdGVyRGF0ZSIsImxjZCIsImNsb3Nlc3RIaWRlIiwiY2xvc2VzdExpbmsiLCJwcmV2ZW50RGVmYXVsdCIsIm9wZW4iLCJjbG9zZXN0TW9yZSIsInRvcCIsInNjcm9sbFRvIiwiYmVoYXZpb3IiLCJtYXhTY3JvbGwiLCJzY3JvbGxIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJzY3JvbGxUb3AiLCJjaGVja1RvcEJ1dHRvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNyZWF0ZVVybFJlbmRlcmVyIiwiaXNPbGQiLCJ0aW1lU3RyaW5nIiwicGFkIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZGF0ZVN0cmluZyIsImdldERhdGUiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiZnVsbERhdGUiLCJ0b0lTT1N0cmluZyIsInJlbmRlclVybHMiLCJuZXdSb3dzIiwib2xkUm93cyIsInN0cmluZyIsImZhbGxiYWNrIiwibm8iLCJjdXJyZW50U291cmNlIiwiYm9va21hcmsiLCJib29rbWFya1RyYWNrIiwiYm9va21hcmtUaXRsZSIsIkFQSV9BRERSRVNTIiwiY2hyb21lIiwicnVudGltZSIsIm9uTWVzc2FnZSIsInJlcXVlc3QiLCJjb25zb2xlIiwibG9nIiwidGVzdEJvb2ttYXJrIiwidGFicyIsInF1ZXJ5IiwiYWN0aXZlIiwid2luZG93SWQiLCJ3aW5kb3dzIiwiV0lORE9XX0lEX0NVUlJFTlQiLCJzY3JpcHRpbmciLCJleGVjdXRlU2NyaXB0IiwidGFiSWQiLCJmdW5jdGlvbiIsInRlc3QiLCJkZWNvZGVIVE1MRW50aXRpZXMiLCJzdHIiLCJlbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwidGVzdEZhbkZveCIsInBhdGhuYW1lIiwibWF0Y2giLCJuYW1lIiwib3JpZ2luIiwidGVzdE1hbmdhZGV4IiwidGVzdE1hZGFybyIsImlkcyIsIm1hbmdhIiwibWFuZ2FfaWQiLCJpZDEiLCJpZDIiLCJoZWFkZXIiLCJ0aXRsZXMiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwic2NyaXB0IiwiaGVhZGxpbmUiLCJmaW5kIiwiaCIsImNoaWxkTm9kZXMiLCJub2RlIiwibm9kZVR5cGUiLCJ0cmltIiwidGl0bGUxIiwidGl0bGUyIiwiaG9zdCIsInNlbmRNZXNzYWdlIiwiaW5pdEludHJvIiwiYm9va21hcmtJbWFnZSIsInNyYyIsImdldFVSTCIsIm5hbWVzcGFjZSIsImtleVBhaXJzIiwib25DaGFuZ2VkIiwiTGlua3MiLCJTb3VyY2VzIiwiaGFzT3duUHJvcGVydHkiLCJiaW5kIiwiY2FsbCIsIm5hdmlnYXRvciIsInNlcnZpY2VXb3JrZXIiLCJjb250cm9sbGVyIiwicG9zdE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTUEsR0FBRyxHQUFHLFNBQU5BLEdBQU0sR0FBa0I7QUFBQSxNQUFqQkMsT0FBaUIsdUVBQVAsRUFBTzs7QUFDakMsV0FBU0MsVUFBVCxDQUFxQkMsTUFBckIsRUFBNkI7QUFDekIsV0FBT0MsS0FBSyxXQUFJSCxPQUFKLG1CQUEyQjtBQUNuQ0ksWUFBTSxFQUFFLE1BRDJCO0FBRW5DQyxVQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlTCxNQUFmLENBRjZCO0FBR25DTSxhQUFPLEVBQUU7QUFDTEMsY0FBTSxFQUFFLGtCQURIO0FBRUwsd0JBQWdCO0FBRlg7QUFIMEIsS0FBM0IsQ0FBTCxDQVFGQyxJQVJFLENBUUcsVUFBQ0MsR0FBRDtBQUFBLGFBQVNBLEdBQUcsQ0FBQ0MsSUFBSixFQUFUO0FBQUEsS0FSSCxFQVNGQyxLQVRFLENBU0ksVUFBQ0MsS0FBRDtBQUFBLGFBQVk7QUFBRUMsYUFBSyxFQUFFLEtBQVQ7QUFBZ0JELGFBQUssRUFBTEE7QUFBaEIsT0FBWjtBQUFBLEtBVEosRUFVRkosSUFWRSxDQVVHLFVBQUNNLElBQUQ7QUFBQSxhQUFVQSxJQUFJLENBQUNDLE9BQWY7QUFBQSxLQVZILENBQVA7QUFXSDs7QUFFRCxXQUFTQyxnQkFBVCxDQUEyQkMsR0FBM0IsRUFBZ0M7QUFDNUIsV0FBT2hCLEtBQUssV0FBSUgsT0FBSiw4QkFBc0M7QUFDOUNJLFlBQU0sRUFBRSxNQURzQztBQUU5Q0MsVUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUFFWSxXQUFHLEVBQUhBO0FBQUYsT0FBZixDQUZ3QztBQUc5Q1gsYUFBTyxFQUFFO0FBQ0xDLGNBQU0sRUFBRSxrQkFESDtBQUVMLHdCQUFnQjtBQUZYO0FBSHFDLEtBQXRDLENBQUwsQ0FRRkMsSUFSRSxDQVFHLFVBQUNDLEdBQUQ7QUFBQSxh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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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QUQsQ0FBakI7QUFDQTZHLHFFQUFtQixDQUFDN0csd0NBQUQsRUFBS3lGLEdBQUwsQ0FBbkI7QUFDQXRFLG1FQUFxQixDQUFDbkIsd0NBQUQsRUFBS3lGLEdBQUwsQ0FBckI7QUFFQWhNLElBQUksQ0FBQzJPLE1BQUw7QUFDQXNHLE9BQU8sQ0FBQ3RHLE1BQVIsR0FDS3BRLElBREwsQ0FDVW9ULG1EQURWLEUiLCJmaWxlIjoiZXh0ZW5zaW9uL3BvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEFQSSA9IChiYXNlVXJsID0gJycpID0+IHtcclxuICAgIGZ1bmN0aW9uIHBvc3RTb3VyY2UgKHNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc291cmNlc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNvdXJjZSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEucGF5bG9hZClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRTb3VyY2VGcm9tVXJsICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3NvdXJjZXMvYWRkRnJvbVVybGAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXJsIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZFVybHMgKHNvdXJjZXMgPSBbXSwgbGltaXQgPSAnJywgZGF0ZSA9ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFxyXG4gICAgICAgICAgICBgJHtiYXNlVXJsfS9hcGkvdXJscy9mZXRjaGAsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5wYXlsb2FkIHx8IFtdKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFN1YnNjcmlwdGlvbnMgKHRvcGljcyA9IFtdLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3N1YnNjcmlwdGlvbnNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB0b3BpY3MsXHJcbiAgICAgICAgICAgICAgICBrZXk6IGtleVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZVN1YnNjcmlwdGlvbnMgKHRvcGljcyA9IFtdLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3N1YnNjcmlwdGlvbnNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHRvcGljcyxcclxuICAgICAgICAgICAgICAgIGtleToga2V5XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZExpbmsgKGtleSwgY2hhbmdlZFNpbmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rcy8ke2tleX0ke2NoYW5nZWRTaW5jZSA/IGA/Y2hhbmdlZFNpbmNlPSR7Y2hhbmdlZFNpbmNlfWAgOiAnJ31gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnN0YXR1cyA9PT0gMzA0ID8gKHsgdmFsaWQ6IHRydWUsIHBheWxvYWQ6IG51bGwgfSkgOiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGtleSwgdXBkYXRlU2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rcy8ke2tleX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3B1dCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZVNldCksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVMaW5rIChpbml0U2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluaXRTZXQpLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBVcmxzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRVcmxzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTb3VyY2U6IHtcclxuICAgICAgICAgICAgaW5zZXJ0OiBwb3N0U291cmNlLFxyXG4gICAgICAgICAgICBmcm9tVXJsOiBhZGRTb3VyY2VGcm9tVXJsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTdWJzY3JpcHRpb246IHtcclxuICAgICAgICAgICAgc3Vic2NyaWJlOiBhZGRTdWJzY3JpcHRpb25zLFxyXG4gICAgICAgICAgICB1bnN1YnNjcmliZTogZGVsZXRlU3Vic2NyaXB0aW9uc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTGluazoge1xyXG4gICAgICAgICAgICBpbnNlcnQ6IGNyZWF0ZUxpbmssXHJcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlTGluayxcclxuICAgICAgICAgICAgcmVhZDogcmVhZExpbmtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcGFyc2UgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuY29uc3QgTkFNRVNQQUNFUyA9IHtcclxuICAgIFNZTkM6ICdzeW5jJyxcclxuICAgIExPQ0FMOiAnbG9jYWwnXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEQiAoc3RvcmFnZSkge1xyXG4gICAgY29uc3QgeyByZWFkLCB3cml0ZSB9ID0gc3RvcmFnZVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlYWRTb3VyY2VzICgpIHtcclxuICAgICAgICBjb25zdCB7IHJlZ2lzdHJ5IH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyByZWdpc3RyeTogJ1tcInNvdXJjZXMtMVwiXScgfSlcclxuICAgICAgICByZXR1cm4gcGFyc2UocmVnaXN0cnksIFsnc291cmNlcy0xJ10pXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHNvdXJjZXMsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtzb3VyY2VzLCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBba2V5XTogJ1tdJyB9KV0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKFtzb3VyY2VzLCBzb3VyY2VdKSA9PiBzb3VyY2VzLmNvbmNhdChwYXJzZShzb3VyY2Vba2V5XSwgW10pKSlcclxuICAgICAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKFtdKSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3cml0ZVNvdXJjZXMgKHNvdXJjZXMpIHtcclxuICAgICAgICBjb25zdCByZWdpc3RyeSA9IFtdXHJcbiAgICAgICAgY29uc3QgdXBkYXRlcyA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHNvdXJjZXMubGVuZ3RoIC8gMjApKTsgeCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGBzb3VyY2VzLSR7eH1gXHJcbiAgICAgICAgICAgIHJlZ2lzdHJ5LnB1c2goa2V5KVxyXG4gICAgICAgICAgICB1cGRhdGVzW2tleV0gPSBKU09OLnN0cmluZ2lmeShzb3VyY2VzLnNsaWNlKCh4IC0gMSkgKiAyMCwgeCAqIDIwKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdXBkYXRlcy5yZWdpc3RyeSA9IEpTT04uc3RyaW5naWZ5KHJlZ2lzdHJ5KVxyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHVwZGF0ZXMpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gYWRkU291cmNlIChzb3VyY2UpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgcmVhZFNvdXJjZXMoKVxyXG4gICAgICAgIGlmICghc291cmNlcy5zb21lKCh7dXJsLCBtYW5nYUlkfSkgPT4gc291cmNlLnVybCA9PT0gdXJsICYmIG1hbmdhSWQgPT09IHNvdXJjZS5tYW5nYUlkKSkge1xyXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goc291cmNlKVxyXG4gICAgICAgICAgICBhd2FpdCB3cml0ZVNvdXJjZXMoc291cmNlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZXNcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBkZWxldGVTb3VyY2UgKHNvdXJjZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IHJlYWRTb3VyY2VzKClcclxuICAgICAgICBjb25zdCBuZXdTb3VyY2VzID0gc291cmNlcy5maWx0ZXIoKHNvdXJjZSkgPT4gc291cmNlPy5pZCAhPT0gc291cmNlSWQpXHJcbiAgICAgICAgYXdhaXQgd3JpdGVTb3VyY2VzKG5ld1NvdXJjZXMpXHJcblxyXG4gICAgICAgIHJldHVybiBuZXdTb3VyY2VzXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaXNEaXJ0eSAoKSB7XHJcbiAgICAgICAgY29uc3QgeyB1cmxzLCBzb3VyY2VzIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIFsndXJscycsICdzb3VyY2VzJ10pXHJcblxyXG4gICAgICAgIHJldHVybiAhIXVybHMgfHwgISFzb3VyY2VzXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0RmlsdGVyZWRTb3J0ZWRVcmxzICgpIHtcclxuICAgICAgICBjb25zdCB7IGhpZGRlbkNoYXB0ZXJzOiBoaWRkZW5DaGFwdGVyc1N0cmluZywgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IDAgfSlcclxuICAgICAgICBjb25zdCB7IHVybHMgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgeyB1cmxzOiAnW10nIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UoaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIHt9KVxyXG4gICAgICAgIGNvbnN0IHVybExpc3QgPSBwYXJzZSh1cmxzLCBbXSlcclxuXHJcbiAgICAgICAgY29uc3QgY2hlY2tPbGQgPSAoY2hhcHRlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGlkZSAmJiBjaGFwdGVyLmNyZWF0ZWQgPCBoaWRlIHx8IGhpZGRlbkNoYXB0ZXJzW2NoYXB0ZXIuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgW29sZFVybHMsIG5ld1VybHNdID0gT2JqZWN0LnZhbHVlcyh1cmxMaXN0KVxyXG4gICAgICAgICAgICAuc29ydCgodXJsMSwgdXJsMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IHVybDIuY3JlYXRlZCAtIHVybDEuY3JlYXRlZFxyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpZmYpIDwgNTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh1cmwxKS5sb2NhbGVDb21wYXJlKHVybDIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlmZlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAucmVkdWNlKChbb2xkVXJscywgbmV3VXJsc10sIHVybCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrT2xkKHVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbGRVcmxzLnB1c2godXJsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VXJscy5wdXNoKHVybClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBbb2xkVXJscywgbmV3VXJsc11cclxuICAgICAgICAgICAgfSwgW1tdLCBbXV0pXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG9sZFVybHMsXHJcbiAgICAgICAgICAgIG5ld1VybHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZVVybCAoaWQpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JyB9KVxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UocmVzdWx0LmhpZGRlbkNoYXB0ZXJzLCB7fSlcclxuICAgICAgICBoaWRkZW5DaGFwdGVyc1tpZF0gPSB0cnVlXHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ2hhcHRlcnMpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZUFsbFVybHMgKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IHRpbWVzdGFtcCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyaXRlVXJscyAodXJscykge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLkxPQ0FMLCB7IHVybHM6IEpTT04uc3RyaW5naWZ5KHVybHMpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaW5pdCAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRlOiBmYWxzZSB9KVxyXG4gICAgICAgIGlmICghaGlkZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKClcclxuICAgICAgICAgICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMClcclxuICAgICAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGU6IHRvZGF5LmdldFRpbWUoKX0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldE1heE9sZCAobWF4T2xkKSB7XHJcbiAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5MT0NBTCwgeyBtYXhPbGQgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRNYXhPbGQgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbWF4T2xkIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIHsgbWF4T2xkOiAyNSB9KVxyXG4gICAgICAgIHJldHVybiBtYXhPbGRcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBzZXRMaW5rIChsaW5rKSB7XHJcbiAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGxpbmsgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRMaW5rICgpIHtcclxuICAgICAgICBjb25zdCB7IGxpbmsgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCBbJ2xpbmsnXSlcclxuICAgICAgICByZXR1cm4gbGlua1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEhpZGUgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZTogMCB9KVxyXG4gICAgICAgIHJldHVybiBoaWRlXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gd3JpdGVMb2NhbFNldHRpbmdzIChzZXR0aW5ncykge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLkxPQ0FMLCB7IGxvY2FsU2V0dGluZ3M6IEpTT04uc3RyaW5naWZ5KHNldHRpbmdzKSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldExvY2FsU2V0dGluZ3MgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbG9jYWxTZXR0aW5ncyB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLkxPQ0FMLCB7IGxvY2FsU2V0dGluZ3M6ICd7fScgfSlcclxuICAgICAgICByZXR1cm4gcGFyc2UobG9jYWxTZXR0aW5ncywge30pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TGlua0RhdGEgKCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCByZWFkU291cmNlcygpXHJcbiAgICAgICAgY29uc3QgeyBoaWRkZW5DaGFwdGVyczogaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIGhpZGUgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nLCBoaWRlOiAwIH0pXHJcbiAgICAgICAgY29uc3QgaGlkZGVuQ2hhcHRlcnMgPSBwYXJzZShoaWRkZW5DaGFwdGVyc1N0cmluZywge30pXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNvdXJjZXM6IHNvdXJjZXMubWFwKChzb3VyY2UpID0+IHNvdXJjZS5pZCksXHJcbiAgICAgICAgICAgIGhpZGRlbkNoYXB0ZXJzLFxyXG4gICAgICAgICAgICBoaWRlOiBOdW1iZXIoaGlkZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2V0TGlua0RhdGEgKHtzb3VyY2VzLCBoaWRkZW5DaGFwdGVycywgaGlkZX0pIHtcclxuICAgICAgICBjb25zdCBzdG9yZWRTb3VyY2VzID0gKGF3YWl0IHJlYWRTb3VyY2VzKCkpLnJlZHVjZSgoc3MsIHNvdXJjZSkgPT4gc291cmNlID8gKHsuLi5zcywgW3NvdXJjZS5pZF06IHRydWV9KSA6IHNzLCB7fSlcclxuICAgICAgICBjb25zdCBoYXNDaGFuZ2VkU291cmNlcyA9IE9iamVjdC5rZXlzKHN0b3JlZFNvdXJjZXMpLmxlbmd0aCAhPT0gc291cmNlcy5sZW5ndGggfHxcclxuICAgICAgICAgICAgc291cmNlcy5zb21lKChzb3VyY2UpID0+ICFzdG9yZWRTb3VyY2VzW3NvdXJjZS5pZF0pXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbUHJvbWlzZS5yZXNvbHZlKCldXHJcbiAgICAgICAgaWYgKGhhc0NoYW5nZWRTb3VyY2VzKSB7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2god3JpdGVTb3VyY2VzKHNvdXJjZXMpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoaWRkZW4gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JywgaGlkZTogMCB9KVxyXG4gICAgICAgIGlmIChoaWRkZW4uaGlkZGVuQ2hhcHRlcnMgIT09IEpTT04uc3RyaW5naWZ5KGhpZGRlbkNoYXB0ZXJzKSB8fCBTdHJpbmcoaGlkZGVuLmhpZGUpICE9PSBTdHJpbmcoaGlkZSkpIHtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHtcclxuICAgICAgICAgICAgICAgIGhpZGRlbkNoYXB0ZXJzOiBKU09OLnN0cmluZ2lmeShoaWRkZW5DaGFwdGVycyksXHJcbiAgICAgICAgICAgICAgICBoaWRlXHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzb3VyY2VzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRTb3VyY2VzLFxyXG4gICAgICAgICAgICBpbXBvcnQ6IHdyaXRlU291cmNlcyxcclxuICAgICAgICAgICAgYWRkOiBhZGRTb3VyY2UsXHJcbiAgICAgICAgICAgIGRlbGV0ZTogZGVsZXRlU291cmNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICBsb2NhbDoge1xyXG4gICAgICAgICAgICAgICAgcmVhZDogZ2V0TG9jYWxTZXR0aW5ncyxcclxuICAgICAgICAgICAgICAgIHNldDogd3JpdGVMb2NhbFNldHRpbmdzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzRGlydHksXHJcbiAgICAgICAgdXJsczoge1xyXG4gICAgICAgICAgICByZWFkOiBnZXRGaWx0ZXJlZFNvcnRlZFVybHMsXHJcbiAgICAgICAgICAgIGhpZGU6IGhpZGVVcmwsXHJcbiAgICAgICAgICAgIGhpZGVBbGw6IGhpZGVBbGxVcmxzLFxyXG4gICAgICAgICAgICBpbXBvcnQ6IHdyaXRlVXJscyxcclxuICAgICAgICAgICAgc2V0TWF4T2xkLFxyXG4gICAgICAgICAgICBnZXRNYXhPbGQsXHJcbiAgICAgICAgICAgIGdldEhpZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2hhbmdlOiBzdG9yYWdlLmFkZExpc3RlbmVyLFxyXG4gICAgICAgIGxpbms6IHtcclxuICAgICAgICAgICAgc2V0OiBzZXRMaW5rLFxyXG4gICAgICAgICAgICByZWFkOiBnZXRMaW5rLFxyXG4gICAgICAgICAgICBsb2NhbDogZ2V0TGlua0RhdGEsXHJcbiAgICAgICAgICAgIHNldExvY2FsOiBzZXRMaW5rRGF0YVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgc2F2ZUFzIGZyb20gJ3NhdmUtYXMnXHJcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRJbXBvcnRIYW5kbGVycyAoZGIpIHtcclxuICAgIGNvbnN0IGltcG9ydEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1wb3J0JylcclxuICAgIGNvbnN0IGV4cG9ydEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhwb3J0JylcclxuXHJcbiAgICBpbXBvcnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdXHJcbiAgICAgICAgY29uc3QgZnIgPSBuZXcgRmlsZVJlYWRlcigpXHJcbiAgICAgICAgZnIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlcyA9IHBhcnNlKGZyLnJlc3VsdCwgW10pXHJcbiAgICAgICAgICAgIGNvbnN0IGNsZWFuID0gc291cmNlcy5maWx0ZXIoKHNvdXJjZSkgPT4gc291cmNlPy50aXRsZSAmJiBzb3VyY2UudXJsICYmIHNvdXJjZS5tYW5nYUlkKVxyXG4gICAgICAgICAgICBpZiAoY2xlYW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBkYi5zb3VyY2VzLmltcG9ydChjbGVhbilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbXBvcnRFbGVtLmZpbGVzID0gbnVsbFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZnIucmVhZEFzVGV4dChmaWxlKVxyXG4gICAgfSlcclxuXHJcbiAgICBleHBvcnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGRiLnNvdXJjZXMucmVhZCgpXHJcbiAgICAgICAgICAgIC50aGVuKChzb3VyY2VzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KHNvdXJjZXMpXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vanNvbicgfSlcclxuICAgICAgICAgICAgICAgIHNhdmVBcyhibG9iLCAnbWFuZ2Fwb2xsLmpzb24nKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuIiwiaW1wb3J0IHsgZ2V0TGlua1F1ZXJ5LCBsaW5rSWZVbmxpbmtlZCB9IGZyb20gJy4vc2V0dGluZ3MnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJNZW51TGlzdGVuZXJzIChkYiwgQXBpKSB7XHJcbiAgICBjb25zdCBpbXBvcnRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmltcG9ydCcpXHJcbiAgICBjb25zdCBwb3B1cFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwVGl0bGUnKVxyXG4gICAgY29uc3QgYm9va21hcmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZCcpXHJcbiAgICBjb25zdCB1cmxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybHMnKVxyXG4gICAgY29uc3QgY2hhcHRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcHRlcnMnKVxyXG4gICAgY29uc3QgYWRkU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRTZWN0aW9uJylcclxuICAgIGNvbnN0IHNvdXJjZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291cmNlcycpXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXR0aW5ncycpXHJcbiAgICBjb25zdCBzZXR0aW5nc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MnKVxyXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZ3Jlc3MnKVxyXG5cclxuICAgIGNvbnN0IG9wZW5DaGFwdGVycyA9ICgpID0+IHtcclxuICAgICAgICBzb3VyY2VzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBpbXBvcnRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBhZGRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHVybHMuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgcHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgY2hhcHRlcnMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIGJvb2ttYXJrcy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBwb3B1cFRpdGxlLmlubmVyVGV4dCA9ICdDaGFwdGVycydcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcGVuU2V0dGluZ3MgPSAoKSA9PiB7XHJcbiAgICAgICAgc291cmNlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICB1cmxzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwb3B1cFRpdGxlLmlubmVyVGV4dCA9ICdTZXR0aW5ncydcclxuICAgICAgICBib29rbWFya3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgY2hhcHRlcnMuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgfVxyXG5cclxuICAgIGNoYXB0ZXJzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbkNoYXB0ZXJzKVxyXG5cclxuICAgIGJvb2ttYXJrcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBzb3VyY2VzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgdXJscy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcG9wdXBUaXRsZS5pbm5lclRleHQgPSAnQm9va21hcmtzJ1xyXG4gICAgICAgIGJvb2ttYXJrcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgY2hhcHRlcnMuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICB9KVxyXG5cclxuICAgIHNldHRpbmdzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblNldHRpbmdzKVxyXG5cclxuICAgIGlmIChnZXRMaW5rUXVlcnkoKSkge1xyXG4gICAgICAgIG9wZW5TZXR0aW5ncygpXHJcbiAgICAgICAgbGlua0lmVW5saW5rZWQoZGIsIEFwaSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG9wZW5DaGFwdGVycygpXHJcbiAgICB9XHJcbn1cclxuIiwiY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZ3Jlc3MnKVxyXG5cclxubGV0IGxvY2tlZCA9IGZhbHNlXHJcblxyXG5leHBvcnQgY29uc3QgcmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIgPSAodXBkYXRlTm93KSA9PiB7XHJcbiAgICBwcm9ncmVzcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB1cGRhdGVOb3coKVxyXG4gICAgICAgIG1hcmtSZWZyZXNoZWQoKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1hcmtSZWZyZXNoZWQgPSAoKSA9PiB7XHJcbiAgICBwcm9ncmVzcy5pbm5lckhUTUwgPSAnKFJlZnJlc2hlZCEpJ1xyXG4gICAgcHJvZ3Jlc3MuZGF0YXNldC5iZWZvcmUgPSAnKFJlZnJlc2hlZCEpJ1xyXG4gICAgbG9ja2VkID0gdHJ1ZVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbG9ja2VkID0gZmFsc2VcclxuICAgICAgICBwcm9ncmVzcy5kYXRhc2V0LmJlZm9yZSA9ICcoUmVmcmVzaCBub3chKSdcclxuICAgIH0sIDE1MDApXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVQcm9ncmVzcyA9IChfbGFzdFBpbmcsIG5leHRQaW5nKSA9PiB7XHJcbiAgICBpZiAoIWxvY2tlZCkge1xyXG4gICAgICAgIGNvbnN0IHJlbWFpbmluZyA9IG5leHRQaW5nIC0gRGF0ZS5ub3coKVxyXG5cclxuICAgICAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5tYXgoTWF0aC5yb3VuZChyZW1haW5pbmcgLyAxMDAwKSwgMClcclxuXHJcbiAgICAgICAgcHJvZ3Jlc3MuaW5uZXJIVE1MID0gYChOZXh0IHJlZnJlc2g6ICR7c2Vjb25kc31zKWBcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU2NoZWR1bGUgPSAoeyBpc0FjdGl2ZSA9IGZhbHNlLCBpbnRlcnZhbCA9IDAsIGNhbGxiYWNrID0gRnVuY3Rpb24ucHJvdG90eXBlLCB1cGRhdGVyIH0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IG5leHRQaW5nID0gMFxyXG4gICAgbGV0IGxhc3RQaW5nID0gMFxyXG4gICAgY29uc3QgY2FsbENhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChuZXh0UGluZyAmJiBuZXh0UGluZyA8PSBEYXRlLm5vdygpKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSBuZXh0UGluZ1xyXG4gICAgICAgICAgICBuZXh0UGluZyA9IG5leHRQaW5nICsgaW50ZXJ2YWwgPiBEYXRlLm5vdygpID8gbmV4dFBpbmcgKyBpbnRlcnZhbCA6IERhdGUubm93KCkgKyBpbnRlcnZhbFxyXG4gICAgICAgIH1cclxuICAgICAgICB0eXBlb2YgdXBkYXRlciA9PT0gJ2Z1bmN0aW9uJyAmJiB1cGRhdGVyKGxhc3RQaW5nLCBuZXh0UGluZylcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNBY3RpdmUgJiYgaW50ZXJ2YWwpIHtcclxuICAgICAgICBuZXh0UGluZyA9IERhdGUubm93KCkgLSAxXHJcbiAgICAgICAgY2FsbENhbGxiYWNrKClcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbChjYWxsQ2FsbGJhY2ssIDEwMClcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNldEludGVydmFsIChuZXdJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5ld0ludGVydmFsICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1c2UgYSBudW1iZXInKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gbmV4dFBpbmcgLSBpbnRlcnZhbCArIG5ld0ludGVydmFsXHJcbiAgICAgICAgICAgIGludGVydmFsID0gbmV3SW50ZXJ2YWxcclxuICAgICAgICAgICAgY2FsbENhbGxiYWNrKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldENhbGxiYWNrIChjYikge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gRGF0ZS5ub3coKSArIGludGVydmFsXHJcbiAgICAgICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoY2FsbENhbGxiYWNrLCAxMDApXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmlnZ2VySW5zdGFudGx5ICgpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IERhdGUubm93KClcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBEYXRlLm5vdygpICsgaW50ZXJ2YWxcclxuICAgICAgICAgICAgdHlwZW9mIHVwZGF0ZXIgPT09ICdmdW5jdGlvbicgJiYgdXBkYXRlcihsYXN0UGluZywgbmV4dFBpbmcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wICgpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSAwXHJcbiAgICAgICAgICAgIGxhc3RQaW5nID0gMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBsaW5rRmllbGRzID0gWydoaWRlJywgJ2hpZGRlbkNoYXB0ZXJzJywgJ3NvdXJjZXMnXVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0S2V5IChrZXkgPSAnJykge1xyXG4gICAgcmV0dXJuIGAke2tleS5zbGljZSgwLCA1KX0tJHtrZXkuc2xpY2UoNSwgMTApfS0ke2tleS5zbGljZSgxMCwgMTUpfWBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmtIZWxwZXJzIChkYiwgQXBpKSB7XHJcbiAgICBhc3luYyBmdW5jdGlvbiBwdXNoTGlua1VwZGF0ZSAoY2hhbmdlcykge1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZXNldCA9IGxpbmtGaWVsZHMuZmlsdGVyKChrZXkpID0+IE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUoKGNoYW5nZSkgPT4gY2hhbmdlLmluY2x1ZGVzKGtleSkpKVxyXG5cclxuICAgICAgICBpZiAoY2hhbmdlc2V0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKCkgfHwge31cclxuICAgICAgICAgICAgY29uc3QgbG9jYWwgPSBhd2FpdCBkYi5saW5rLmxvY2FsKCkgfHwge31cclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlID0ge31cclxuICAgICAgICAgICAgaWYgKGNoYW5nZXNldC5pbmNsdWRlcygnaGlkZScpKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUuaGlkZSA9IGxvY2FsLmhpZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc2V0LmluY2x1ZGVzKCdoaWRkZW5DaGFwdGVycycpKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUuaGlkZGVuQ2hhcHRlcnMgPSBsb2NhbC5oaWRkZW5DaGFwdGVyc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzZXQuaW5jbHVkZXMoJ3NvdXJjZXMnKSkge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlLnNvdXJjZXMgPSBsb2NhbC5zb3VyY2VzXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyh1cGRhdGUpLmxlbmd0aCAmJiBsaW5rLmtleSkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgQXBpLkxpbmsudXBkYXRlKGxpbmsua2V5LCB1cGRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnZhbGlkICYmIGRiLmxpbmsuc2V0KHsga2V5OiByZXMucGF5bG9hZC5rZXkgfSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hMaW5rVXBkYXRlICgpIHtcclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuXHJcbiAgICAgICAgaWYgKGxpbmspIHtcclxuICAgICAgICAgICAgQXBpLkxpbmsucmVhZChsaW5rLmtleSwgbGluay5sYXN0TW9kaWZpZWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy52YWxpZCAmJiByZXMucGF5bG9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5saW5rLnNldExvY2FsKHJlcy5wYXlsb2FkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwdXNoTGlua1VwZGF0ZSxcclxuICAgICAgICBmZXRjaExpbmtVcGRhdGVcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNWYWxpZExpbmtLZXkgKGtleSkge1xyXG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xlYW5LZXkgPSBrZXkucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJylcclxuICAgIGlmIChjbGVhbktleS5sZW5ndGggPT09IDE1KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmtRdWVyeSAoKSB7XHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpXHJcblxyXG4gICAgaWYgKGlzVmFsaWRMaW5rS2V5KHVybFBhcmFtcy5nZXQoJ2xpbmsnKSkpIHtcclxuICAgICAgICByZXR1cm4gdXJsUGFyYW1zLmdldCgnbGluaycpLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsaW5rSWZVbmxpbmtlZCAoZGIsIGFwaSkge1xyXG4gICAgY29uc3Qga2V5ID0gZ2V0TGlua1F1ZXJ5KClcclxuXHJcbiAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudExpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG5cclxuICAgICAgICBpZiAoIWN1cnJlbnRMaW5rIHx8ICFjdXJyZW50TGluay5rZXkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlua0lucHV0MSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0xJylcclxuICAgICAgICAgICAgY29uc3QgbGlua0lucHV0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0yJylcclxuICAgICAgICAgICAgY29uc3QgbGlua0lucHV0MyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0zJylcclxuXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSBrZXkuc2xpY2UoMCwgNSlcclxuICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IGtleS5zbGljZSg1LCAxMClcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IGtleS5zbGljZSgxMCwgMTUpXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBjb25uZWN0VG9MaW5rKGtleSwgYXBpLCBkYilcclxuXHJcbiAgICAgICAgICAgIGlmIChsaW5rICYmIGxpbmsua2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rTnVtYmVyVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWlkJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluaycpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rTGlua1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXRleHQnKVxyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5saW5rLXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rVGV4dC5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0xpbmsuaW5uZXJUZXh0ID0gYGh0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20/bGluaz0ke2xpbmsua2V5fWBcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rLmhyZWYgPSBgaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbT9saW5rPSR7bGluay5rZXl9YFxyXG4gICAgICAgICAgICAgICAgbGlua051bWJlclRleHQuaW5uZXJUZXh0ID0gYCR7bGluay5rZXkuc2xpY2UoMCwgNSl9LSR7bGluay5rZXkuc2xpY2UoNSwgMTApfS0ke2xpbmsua2V5LnNsaWNlKDEwKX1gXHJcbiAgICAgICAgICAgICAgICBsaW5rTnVtYmVyVGV4dC5zdHlsZS5jb2xvciA9ICcjMDAwYzIxJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZvcm1hdEtleShjdXJyZW50TGluay5rZXkpICE9PSBmb3JtYXRLZXkoa2V5KSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rTGlua1dhcm4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXdhcm5pbmcnKVxyXG4gICAgICAgICAgICBjb25zdCB3YXJuTGlua0N1cnJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2Fybi1jdXJyZW50LWxpbmsnKVxyXG4gICAgICAgICAgICBjb25zdCB3YXJuTGlua05ldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3YXJuLW5ldy1saW5rJylcclxuXHJcbiAgICAgICAgICAgIGxpbmtMaW5rV2Fybi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgICAgIHdhcm5MaW5rQ3VycmVudC5pbm5lclRleHQgPSBmb3JtYXRLZXkoY3VycmVudExpbmsua2V5KVxyXG4gICAgICAgICAgICB3YXJuTGlua05ldy5pbm5lclRleHQgPSBmb3JtYXRLZXkoa2V5KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY29ubmVjdFRvTGluayAoa2V5LCBhcGksIGRiKSB7XHJcbiAgICBjb25zdCB7IExpbmsgfSA9IGFwaVxyXG4gICAgY29uc3QgbGlua0Vycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstZXJyb3InKVxyXG4gICAgY29uc3QgbGlua1Byb2dyZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstcHJvZ3Jlc3MnKVxyXG4gICAgY29uc3QgY3JlYXRlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctbGluay1idXR0b24nKVxyXG4gICAgY29uc3QgbGlua0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWJ1dHRvbicpXHJcbiAgICBsaW5rRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgbGlua1Byb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICBjcmVhdGVMaW5rLmRpc2FibGVkID0gdHJ1ZVxyXG4gICAgbGlua0J1dHRvbi5kaXNhYmxlZCA9IHRydWVcclxuXHJcbiAgICBjb25zdCBsaW5rUmVzdWx0ID0gYXdhaXQgTGluay5yZWFkKGtleSlcclxuICAgIGNyZWF0ZUxpbmsuZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgbGlua0J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICBsaW5rUHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgaWYgKGxpbmtSZXN1bHQ/LnZhbGlkKSB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGxpbmtSZXN1bHQucGF5bG9hZFxyXG4gICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0KHsga2V5OiBsaW5rLmtleSB9KVxyXG4gICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0TG9jYWwobGluaylcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpbmtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxpbmtFcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICB9XHJcbiAgICBjb25zdCBsaW5rTGlua1dhcm4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXdhcm5pbmcnKVxyXG5cclxuICAgIGlmIChsaW5rTGlua1dhcm4pIHtcclxuICAgICAgICBsaW5rTGlua1dhcm4uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2V0dGluZ3NIYW5kbGVycyAoZGIsIGFwaSkge1xyXG4gICAgY29uc3QgeyBMaW5rIH0gPSBhcGlcclxuXHJcbiAgICBjb25zdCBjcmVhdGVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1saW5rLWJ1dHRvbicpXHJcbiAgICBjb25zdCB1cGRhdGVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwZGF0ZS1saW5raW5nJylcclxuICAgIGNvbnN0IGxpbmtOdW1iZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstaWQnKVxyXG4gICAgY29uc3QgbGlua0xpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rJylcclxuICAgIGNvbnN0IGxpbmtMaW5rVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmstdGV4dCcpXHJcbiAgICBjb25zdCBsaW5raW5nU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLXNlY3Rpb24nKVxyXG4gICAgY29uc3QgdW5saW5rU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bmxpbmstc2VjdGlvbicpXHJcbiAgICBjb25zdCB1bmxpbmtCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5saW5rLWJ1dHRvbicpXHJcbiAgICBjb25zdCBsaW5rQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstYnV0dG9uJylcclxuICAgIGNvbnN0IGxpbmtJbnB1dDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMScpXHJcbiAgICBjb25zdCBsaW5rSW5wdXQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTInKVxyXG4gICAgY29uc3QgbGlua0lucHV0MyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0zJylcclxuXHJcbiAgICBsaW5rSW5wdXQxLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDEudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgMTUpXHJcbiAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9IG51bWJlci5zbGljZSgwLCA1KVxyXG4gICAgICAgIGlmIChudW1iZXIubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gbnVtYmVyLnNsaWNlKDUsIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA+IDEwKSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuZm9jdXMoKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnNldFNlbGVjdGlvblJhbmdlKG51bWJlci5sZW5ndGggLSAxMCwgbnVtYmVyLmxlbmd0aCAtIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW1iZXIubGVuZ3RoID49IDUpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0Mi5mb2N1cygpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIuc2V0U2VsZWN0aW9uUmFuZ2UobnVtYmVyLmxlbmd0aCAtIDUsIG51bWJlci5sZW5ndGggLSA1KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rSW5wdXQyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDIudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgMTApXHJcbiAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IG51bWJlci5zbGljZSgwLCA1KVxyXG4gICAgICAgIGlmIChudW1iZXIubGVuZ3RoID49IDUpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IG51bWJlci5zbGljZSg1LCAxMClcclxuICAgICAgICAgICAgbGlua0lucHV0My5mb2N1cygpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuc2V0U2VsZWN0aW9uUmFuZ2UobnVtYmVyLmxlbmd0aCAtIDUsIG51bWJlci5sZW5ndGggLSA1KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rSW5wdXQzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDMudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgNSlcclxuICAgICAgICBpZiAobGlua0lucHV0My52YWx1ZSAhPT0gbnVtYmVyLnNsaWNlKDAsIDUpKSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoMCwgNSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyaXRlU3RhdGVUb0RvbSAobGluaykge1xyXG4gICAgICAgIGxpbmtpbmdTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJ25vbmUnIDogJydcclxuICAgICAgICB1bmxpbmtTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJycgOiAnbm9uZSdcclxuICAgICAgICBpZiAobGlua0xpbmtUZXh0KSB7XHJcbiAgICAgICAgICAgIGxpbmtMaW5rVGV4dC5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICcnIDogJ25vbmUnXHJcbiAgICAgICAgICAgIGxpbmtMaW5rLnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJycgOiAnbm9uZSdcclxuICAgICAgICAgICAgbGlua0xpbmsuaW5uZXJUZXh0ID0gbGluayA/IGBodHRwczovL21hbmdhLmZvY2hsYWMuY29tP2xpbms9JHtsaW5rLmtleX1gIDogJydcclxuICAgICAgICAgICAgbGlua0xpbmsuaHJlZiA9IGxpbmsgPyBgaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbT9saW5rPSR7bGluay5rZXl9YCA6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpbmtOdW1iZXJUZXh0LmlubmVyVGV4dCA9IGxpbmsgPyBmb3JtYXRLZXkobGluay5rZXkpIDogJ1VubGlua2VkJ1xyXG4gICAgICAgIGxpbmtOdW1iZXJUZXh0LnN0eWxlLmNvbG9yID0gbGluayA/ICcjMDAwYzIxJyA6ICcjYzNjYmQyJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgd3JpdGVTdGF0ZVRvRG9tKGxpbmspXHJcblxyXG4gICAgaWYgKHVwZGF0ZUxpbmspIHtcclxuICAgICAgICB1cGRhdGVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBnZXRMaW5rUXVlcnkoKVxyXG5cclxuICAgICAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9IGtleS5zbGljZSgwLCA1KVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0ga2V5LnNsaWNlKDUsIDEwKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0ga2V5LnNsaWNlKDEwLCAxNSlcclxuICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXQobnVsbClcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluay13YXJuaW5nJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20oKVxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb25uZWN0VG9MaW5rKGtleSwgYXBpLCBkYilcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKHJlc3VsdClcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rTGlua1dhcm4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1lcnJvcicpXHJcblxyXG4gICAgICAgIGlmIChsaW5rTGlua1dhcm4pIHtcclxuICAgICAgICAgICAgbGlua0xpbmtXYXJuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICAgICAgaWYgKCFsaW5rKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtEYXRhID0gYXdhaXQgZGIubGluay5sb2NhbCgpXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0xpbmtSZXN1bHQgPSBhd2FpdCBMaW5rLmluc2VydChsaW5rRGF0YSlcclxuICAgICAgICAgICAgaWYgKG5ld0xpbmtSZXN1bHQ/LnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gbmV3TGlua1Jlc3VsdC5wYXlsb2FkXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldCh7IGtleTogbGluay5rZXkgfSlcclxuICAgICAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbShsaW5rKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHVubGlua0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgICAgICBpZiAobGluaykge1xyXG4gICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldChudWxsKVxyXG4gICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20odW5kZWZpbmVkKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsaW5rSW5wdXQxLnZhbHVlfSR7bGlua0lucHV0Mi52YWx1ZX0ke2xpbmtJbnB1dDMudmFsdWV9YFxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb25uZWN0VG9MaW5rKGtleSwgYXBpLCBkYilcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKHJlc3VsdClcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNvdXJjZVJlbmRlcmVyIChkYikge1xyXG4gICAgY29uc3Qgc291cmNlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VyY2VzJylcclxuXHJcbiAgICBzb3VyY2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2xvc2VzdCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93IC5hY3Rpb24uZGVsZXRlJylcclxuICAgICAgICBpZiAoY2xvc2VzdCAmJiBjbG9zZXN0LmRhdGFzZXRbJ2lkJ10gJiYgc291cmNlcy5jb250YWlucyhjbG9zZXN0KSkge1xyXG4gICAgICAgICAgICBkYi5zb3VyY2VzLmRlbGV0ZShjbG9zZXN0LmRhdGFzZXRbJ2lkJ10pXHJcbiAgICAgICAgICAgIGNsb3Nlc3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aW9uJylcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlbmRlclNvdXJjZXMgKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkYi5zb3VyY2VzLnJlYWQoKVxyXG5cclxuICAgICAgICBzb3VyY2VzLmlubmVySFRNTCA9IGRhdGFcclxuICAgICAgICAgICAgLnNvcnQoKHNvdXJjZTEsIHNvdXJjZTIpID0+IFN0cmluZyhzb3VyY2UxLnRpdGxlKS5sb2NhbGVDb21wYXJlKHNvdXJjZTI/LnRpdGxlKSlcclxuICAgICAgICAgICAgLm1hcCgoc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gU3RyaW5nKHNvdXJjZS51cmwpLnJlcGxhY2UoL2h0dHBzPzpcXC9cXC8vLCAnJykuc3BsaXQoJy8nKVswXVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICBgPGxpIGNsYXNzPVwicm93IHNvdXJjZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YVwiIHRpdGxlPVwiJHtgJHtzb3VyY2UudGl0bGV9ICgke3VybH0pYH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGl0bGVcIj4ke3NvdXJjZS50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hbmdhLWlkXCI+KCR7dXJsfSk8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlbGV0ZSBhY3Rpb25cIiBkYXRhLWlkPVwiJHtzb3VyY2UuaWR9XCI+RGVsZXRlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+YFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuam9pbignXFxuJylcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcjogKCkgPT4gcmVuZGVyU291cmNlcygpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcGFkIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cmxSZW5kZXJlciAoZGIpIHtcclxuICAgIGNvbnN0IHVybHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJscycpXHJcbiAgICBjb25zdCBpbnRybyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRybycpXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZSAoaWQpIHtcclxuICAgICAgICBjb25zdCB7IG5ld1VybHMsIG9sZFVybHMgfSA9IGF3YWl0IGRiLnVybHMucmVhZCgpXHJcbiAgICAgICAgaWYgKG5ld1VybHMubGVuZ3RoIDw9IDEgJiYgKCFuZXdVcmxzWzBdIHx8IG5ld1VybHNbMF0uaWQgPT09IGlkKSkge1xyXG4gICAgICAgICAgICBjb25zdCBsYXRlc3RDaGFwdGVyRGF0ZSA9IG9sZFVybHMuY29uY2F0KG5ld1VybHMpXHJcbiAgICAgICAgICAgICAgICAucmVkdWNlKChsY2QsIHVybCkgPT4gdXJsLmNyZWF0ZWQgPiBsY2QgPyB1cmwuY3JlYXRlZCA6IGxjZCwgMClcclxuXHJcbiAgICAgICAgICAgIGRiLnVybHMuaGlkZUFsbChsYXRlc3RDaGFwdGVyRGF0ZSArIDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkYi51cmxzLmhpZGUoaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVybHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjbG9zZXN0SGlkZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93IC5oaWRlJylcclxuXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RIaWRlICYmIGNsb3Nlc3RIaWRlLmRhdGFzZXRbJ2lkJ10gJiYgdXJscy5jb250YWlucyhjbG9zZXN0SGlkZSkpIHtcclxuICAgICAgICAgICAgYXdhaXQgaGlkZShjbG9zZXN0SGlkZS5kYXRhc2V0WydpZCddKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbG9zZXN0TGluayA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93Lm5ldyAubGluaycpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RMaW5rICYmIGNsb3Nlc3RMaW5rLmRhdGFzZXRbJ2lkJ10gJiYgdXJscy5jb250YWlucyhjbG9zZXN0TGluaykpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBhd2FpdCBoaWRlKGNsb3Nlc3RMaW5rLmRhdGFzZXRbJ2lkJ10pXHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKGNsb3Nlc3RMaW5rLmhyZWYsICdfYmxhbmsnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbG9zZXN0TW9yZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuYWN0aW9uLmxvYWQtbW9yZScpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RNb3JlICYmIHVybHMuY29udGFpbnMoY2xvc2VzdE1vcmUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heE9sZCA9IGF3YWl0IGRiLnVybHMuZ2V0TWF4T2xkKClcclxuICAgICAgICAgICAgYXdhaXQgZGIudXJscy5zZXRNYXhPbGQobWF4T2xkICsgMTAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoaWRlQWxsID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5oaWRlLWFsbCcpXHJcbiAgICAgICAgaWYgKGhpZGVBbGwgJiYgdXJscy5jb250YWlucyhoaWRlQWxsKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBkYi51cmxzLmhpZGVBbGwoRGF0ZS5ub3coKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdG9wID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy50b3AnKVxyXG4gICAgICAgIGlmICh0b3AgJiYgdXJscy5jb250YWlucyh0b3ApKSB7XHJcbiAgICAgICAgICAgIHVybHMuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgbGV0IG1heFNjcm9sbCA9IDBcclxuICAgIHVybHMuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHVybHMub2Zmc2V0SGVpZ2h0ICsgdXJscy5zY3JvbGxUb3BcclxuICAgICAgICBpZiAodXJscy5zY3JvbGxIZWlnaHQgLSBzY3JvbGxIZWlnaHQgPD0gNTAgJiYgbWF4U2Nyb2xsICE9PSB1cmxzLnNjcm9sbEhlaWdodCkge1xyXG4gICAgICAgICAgICBtYXhTY3JvbGwgPSB1cmxzLnNjcm9sbEhlaWdodFxyXG4gICAgICAgICAgICBjb25zdCBtYXhPbGQgPSBhd2FpdCBkYi51cmxzLmdldE1heE9sZCgpXHJcbiAgICAgICAgICAgIGRiLnVybHMuc2V0TWF4T2xkKG1heE9sZCArIDEwMClcclxuICAgICAgICB9XHJcbiAgICAgICAgY2hlY2tUb3BCdXR0b24oKVxyXG4gICAgfSlcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1RvcEJ1dHRvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVybHMuc2Nyb2xsVG9wID4gMCAmJiB1cmxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA9PT0gdXJscy5xdWVyeVNlbGVjdG9yKCcub2xkLWNoYXB0ZXJzJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSB7XHJcbiAgICAgICAgICAgIHVybHMucXVlcnlTZWxlY3RvcignLm9sZC1jaGFwdGVycyAudG9wJykuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1cmxzLnF1ZXJ5U2VsZWN0b3IoJy5vbGQtY2hhcHRlcnMgLnRvcCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVXJsUmVuZGVyZXIgKGlzT2xkKSB7XHJcbiAgICAgICAgcmV0dXJuIChjaGFwdGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShjaGFwdGVyLmNyZWF0ZWQpXHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdHJpbmcgPSBgJHtwYWQoZGF0ZS5nZXRIb3VycygpKX06JHtwYWQoZGF0ZS5nZXRNaW51dGVzKCkpfWBcclxuICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGAke3BhZChkYXRlLmdldERhdGUoKSl9LiR7cGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpfS4ke1N0cmluZyhkYXRlLmdldEZ1bGxZZWFyKCkpLnNsaWNlKC0yKX1gXHJcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxEYXRlID0gZGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gPT09IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdID8gdGltZVN0cmluZyA6IGRhdGVTdHJpbmdcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJyb3cke2lzT2xkID8gJyBvbGQnIDogJyBuZXcnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGlua1wiIGhyZWY9XCIke2NoYXB0ZXIudXJsfVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCIgZGF0YS1pZD1cIiR7Y2hhcHRlci5pZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtjaGFwdGVyLnRpdGxlfSAtIENoYXB0ZXIgJHtjaGFwdGVyLmNoYXB0ZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0ZS13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0ZVwiIHRpdGxlPVwiJHtgJHtkYXRlU3RyaW5nfSAke3RpbWVTdHJpbmd9YH1cIj4ke2Z1bGxEYXRlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoaWRlXCIgZGF0YS1pZD1cIiR7Y2hhcHRlci5pZH1cIj5IaWRlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvbGk+YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiByZW5kZXJVcmxzICgpIHtcclxuICAgICAgICBjb25zdCBtYXhPbGQgPSBhd2FpdCBkYi51cmxzLmdldE1heE9sZCgpXHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IGRiLnNvdXJjZXMucmVhZCgpXHJcbiAgICAgICAgY29uc3QgeyBuZXdVcmxzLCBvbGRVcmxzIH0gPSBhd2FpdCBkYi51cmxzLnJlYWQoKVxyXG4gICAgICAgIGNvbnN0IG5ld1Jvd3MgPSBuZXdVcmxzLm1hcChjcmVhdGVVcmxSZW5kZXJlcihmYWxzZSkpXHJcbiAgICAgICAgY29uc3Qgb2xkUm93cyA9IG9sZFVybHMubWFwKGNyZWF0ZVVybFJlbmRlcmVyKHRydWUpKVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHVybHMuaW5uZXJIVE1MID0gJydcclxuICAgICAgICAgICAgaW50cm8uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChuZXdSb3dzLmxlbmd0aCB8fCBvbGRSb3dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIHVybHMuaW5uZXJIVE1MID0gW11cclxuICAgICAgICAgICAgICAgIC5jb25jYXQobmV3Um93cy5sZW5ndGggPyAnPGxpIGNsYXNzPVwibmV3LWNoYXB0ZXJzXCI+TmV3IENoYXB0ZXJzIDxzcGFuIGNsYXNzPVwiYWN0aW9uIGhpZGUtYWxsXCI+SGlkZSBhbGw8L3NwYW4+PC9saT4nIDogW10pXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG5ld1Jvd3MpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KCc8bGkgY2xhc3M9XCJvbGQtY2hhcHRlcnNcIj5PbGQgQ2hhcHRlcnMgPHNwYW4gY2xhc3M9XCJhY3Rpb24gdG9wXCI+VG9wICYjODU5Mzs8L3NwYW4+PC9saT4nKVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdChvbGRSb3dzLnNsaWNlKDAsIG1heE9sZCkpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG9sZFJvd3MubGVuZ3RoID49IG1heE9sZCA/IFsnPGxpIGNsYXNzPVwiYWN0aW9uIGxvYWQtbW9yZVwiPkxvYWQgdXAgdG8gMTAwIG1vcmUgb2xkIGNoYXB0ZXJzLi4uPC9saT4nXSA6IFtdKVxyXG4gICAgICAgICAgICAgICAgLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gbmV3Um93cy5sZW5ndGggPyBgKCR7bmV3Um93cy5sZW5ndGh9KSBNYW5nYSBQb2xsYCA6ICdNYW5nYSBQb2xsJ1xyXG4gICAgICAgICAgICBjaGVja1RvcEJ1dHRvbigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIHVybHMuaW5uZXJIVE1MID0gJzxsaSBjbGFzcz1cInJvd1wiPk5vIENoYXB0ZXJzIGF2YWlsYWJsZS48L2xpPidcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnTWFuZ2EgUG9sbCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXI6ICgpID0+IHJlbmRlclVybHMoKVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBwYXJzZSAoc3RyaW5nLCBmYWxsYmFjaykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHJpbmcpXHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxsYmFja1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFkIChubykge1xyXG4gICAgcmV0dXJuICgnMDAnICsgbm8pLnNsaWNlKC0yKVxyXG59XHJcbiIsImltcG9ydCB7IEFQSSB9IGZyb20gJy4uL2NvbW1vbi9hcGknXHJcbmltcG9ydCB7IEFQSV9BRERSRVNTIH0gZnJvbSAnLi9jb25zdGFudHMnXHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9zdG9yYWdlJ1xyXG5cclxubGV0IGN1cnJlbnRTb3VyY2UgPSBudWxsXHJcblxyXG5jb25zdCBib29rbWFyayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib29rbWFyaycpXHJcbmNvbnN0IGJvb2ttYXJrVHJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9va21hcmstdHJhY2snKVxyXG5jb25zdCBib29rbWFya1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvb2ttYXJrLXRpdGxlJylcclxuXHJcbmNvbnN0IHsgU291cmNlIH0gPSBBUEkoQVBJX0FERFJFU1MpXHJcblxyXG5ib29rbWFya1RyYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYm9va21hcmsuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgYm9va21hcmtUaXRsZS5pbm5lclRleHQgPSAnJ1xyXG4gICAgU291cmNlLmluc2VydChjdXJyZW50U291cmNlKVxyXG4gICAgICAgIC50aGVuKChzb3VyY2UpID0+IHNvdXJjZSAmJiBkYi5zb3VyY2VzLmFkZChzb3VyY2UpKVxyXG4gICAgY3VycmVudFNvdXJjZSA9IG51bGxcclxufSlcclxuXHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihhc3luYyAocmVxdWVzdCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2cocmVxdWVzdClcclxuICAgIGlmIChyZXF1ZXN0LmlkICYmIHJlcXVlc3QudGl0bGUgJiYgcmVxdWVzdC51cmwpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgZGIuc291cmNlcy5yZWFkKClcclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2VzLnNvbWUoKHNvdXJjZSkgPT4gc291cmNlLnVybCA9PT0gcmVxdWVzdC51cmwgJiYgU3RyaW5nKHNvdXJjZS5tYW5nYUlkKSA9PT0gU3RyaW5nKHJlcXVlc3QuaWQpKSkge1xyXG4gICAgICAgICAgICBib29rbWFyay5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgICAgIGJvb2ttYXJrVGl0bGUuaW5uZXJUZXh0ID0gYERvIHlvdSB3YW50IHRvIHN0YXJ0IHRyYWNraW5nIFwiJHtyZXF1ZXN0LnRpdGxlfVwiP2BcclxuICAgICAgICAgICAgY3VycmVudFNvdXJjZSA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IHJlcXVlc3QudHlwZSxcclxuICAgICAgICAgICAgICAgIG1hbmdhSWQ6IHJlcXVlc3QuaWQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogcmVxdWVzdC50aXRsZSxcclxuICAgICAgICAgICAgICAgIHVybDogcmVxdWVzdC51cmxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYm9va21hcmsuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgYm9va21hcmtUaXRsZS5pbm5lclRleHQgPSAnJ1xyXG4gICAgY3VycmVudFNvdXJjZSA9IG51bGxcclxufSlcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0Qm9va21hcmsgKCkge1xyXG4gICAgY2hyb21lLnRhYnMucXVlcnkoXHJcbiAgICAgICAgeyBhY3RpdmU6IHRydWUsIHdpbmRvd0lkOiBjaHJvbWUud2luZG93cy5XSU5ET1dfSURfQ1VSUkVOVCB9LFxyXG4gICAgICAgICh0YWJzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGFic1swXS51cmwuaW5jbHVkZXMoJ2Nocm9tZTovLycpKSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoeyB0YXJnZXQ6IHsgdGFiSWQ6IHRhYnNbMF0uaWQgfSwgZnVuY3Rpb246IHRlc3QgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIClcclxufVxyXG5cclxuZnVuY3Rpb24gdGVzdCAoKSB7XHJcbiAgICBmdW5jdGlvbiBkZWNvZGVIVE1MRW50aXRpZXMgKHN0cikge1xyXG4gICAgICAgIGlmIChzdHIgJiYgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC88c2NyaXB0W14+XSo+KFtcXFNcXHNdKj8pPFxcL3NjcmlwdD4vZ21pLCAnJylcclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoLzxcXC8/XFx3KD86W15cIic+XXxcIlteXCJdKlwifCdbXiddKicpKj4vZ21pLCAnJylcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBzdHJcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudGV4dENvbnRlbnRcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0clxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RGYW5Gb3ggKCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaCgvXlxcL21hbmdhXFwvW14vXSpcXC8vKT8uWzBdXHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWFkZXItaGVhZGVyLXRpdGxlLTEgYTpmaXJzdC1jaGlsZCcpPy5pbm5lclRleHQgfHxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldGFpbC1pbmZvLXJpZ2h0LXRpdGxlLWZvbnQnKT8uaW5uZXJUZXh0XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdmYW5mb3gnLFxyXG4gICAgICAgICAgICBpZDogdXJsID8gdXJsLnNwbGl0KCcvJylbMl0gOiBudWxsLFxyXG4gICAgICAgICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgICAgICAgdXJsOiB1cmwgPyBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7dXJsfWAgOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RNYW5nYWRleCAoKSB7XHJcbiAgICAgICAgaWYgKC90aXRsZVxcL1tcXGQtXFx3XSpcXC9bXFxkLVxcd10qLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKT8uWzJdXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFuZ2EtY29udGFpbmVyIC50aXRsZSBwJyk/LmlubmVyVGV4dFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdtYW5nYWRleCcsXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBpZCA/IGBodHRwczovL2FwaS5tYW5nYWRleC5vcmcvbWFuZ2EvJHtpZH1gIDogbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKC9jaGFwdGVyXFwvW1xcZC1cXHddKlxcL1xcZCovLnRlc3Qod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYS50ZXh0LXByaW1hcnlbaHJlZio9XCIvdGl0bGUvXCJdJylcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGxpbms/LmlubmVyVGV4dFxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGxpbms/LmhyZWYuc3BsaXQoJy8nKT8uWzRdXHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ21hbmdhZGV4JyxcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGlkID8gYGh0dHBzOi8vYXBpLm1hbmdhZGV4Lm9yZy9tYW5nYS8ke2lkfWAgOiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdE1hZGFybyAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2UgKHN0cmluZywgZmFsbGJhY2spIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbGxiYWNrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlkcyA9IFtcclxuICAgICAgICAgICAgd2luZG93Py5tYW5nYT8ubWFuZ2FfaWQsXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRpbmctcG9zdC1pZCcpPy52YWx1ZSxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwLW1hbmdhLWFjdGlvbi1idXR0b24nKT8uZGF0YXNldD8uWydwb3N0J10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGFwdGVyLXNlbGVjdGlvbicpPy5kYXRhc2V0Py5bJ21hbmdhJ10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYW5nYS1jaGFwdGVycy1ob2xkZXInKT8uZGF0YXNldD8uWydpZCddLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuZ2EtcmVhZGluZy1uYXYtaGVhZCcpPy5kYXRhc2V0Py5bJ2lkJ10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYW5nYS1yZWFkaW5nLW5hdi1mb290Jyk/LmRhdGFzZXQ/LlsnaWQnXVxyXG4gICAgICAgIF1cclxuICAgICAgICAgICAgLmZpbHRlcigodGl0bGUpID0+IHRpdGxlKVxyXG4gICAgICAgICAgICAucmVkdWNlKChtYXAsIGlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtYXBbaWRdID0gdHlwZW9mIG1hcFtpZF0gPT09ICdudW1iZXInID8gbWFwW2lkXSArIDEgOiAxXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwXHJcbiAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgIGNvbnN0IGlkID0gT2JqZWN0LmtleXMoaWRzKS5zb3J0KChpZDEsIGlkMikgPT4gaWRzW2lkMV0gLSBpZHNbaWQyXSlbMF1cclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtdGl0bGUgaDEnKVxyXG4gICAgICAgIGNvbnN0IHRpdGxlcyA9IFtcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cImFwcGxpY2F0aW9uL2xkK2pzb25cIl0nKSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKHNjcmlwdCkgPT4gcGFyc2Uoc2NyaXB0LmlubmVyVGV4dCk/LmhlYWRsaW5lKS5maW5kKChoKSA9PiBoKSxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXB0ZXItaGVhZGluZycpPy5pbm5lclRleHQ/LnNwbGl0KCcgLSAnKVswXSxcclxuICAgICAgICAgICAgaGVhZGVyICYmIEFycmF5LmZyb20oaGVhZGVyLmNoaWxkTm9kZXMpLnJlZHVjZSgodGl0bGUsIG5vZGUpID0+IHRpdGxlICsgKG5vZGUubm9kZVR5cGUgPT09IDMgPyBub2RlLnRleHRDb250ZW50IDogJycpLCAnJyksXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRlLXRpdGxlJyk/LnRpdGxlXHJcbiAgICAgICAgXVxyXG4gICAgICAgICAgICAuZmlsdGVyKCh0aXRsZSkgPT4gdGl0bGUpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKG1hcCwgdGl0bGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsZWFuID0gZGVjb2RlSFRNTEVudGl0aWVzKHRpdGxlKS50cmltKClcclxuICAgICAgICAgICAgICAgIG1hcFtjbGVhbl0gPSB0eXBlb2YgbWFwW2NsZWFuXSA9PT0gJ251bWJlcicgPyBtYXBbY2xlYW5dICsgMSA6IDFcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXBcclxuICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgbGV0IHRpdGxlID0gT2JqZWN0LmtleXModGl0bGVzKS5zb3J0KCh0aXRsZTEsIHRpdGxlMikgPT4gdGl0bGVzW3RpdGxlMV0gLSB0aXRsZXNbdGl0bGUyXSlbMF1cclxuXHJcbiAgICAgICAgbGV0IHVybCA9IG51bGxcclxuICAgICAgICBpZiAoZG9jdW1lbnQ/LmxvY2F0aW9uPy5ocmVmKSB7XHJcbiAgICAgICAgICAgIHVybCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYubWF0Y2goL2h0dHBzPzpcXC9cXC9bXi9dKlxcL1teL10qXFwvW14vXSpcXC8vKT8uWzBdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKCdsZXZpYXRhbnNjYW5zLmNvbScpKSB7XHJcbiAgICAgICAgICAgIHVybCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuc3BsaXQoJy8nKS5zbGljZSgwLCA2KS5qb2luKCcvJykgKyAnL2FqYXgvY2hhcHRlcnMnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKCdyZWFwZXJzY2Fucy5jb20nKSkge1xyXG4gICAgICAgICAgICB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLm1hdGNoKC9odHRwLipcXC9zZXJpZXNcXC9bXi9dKlxcLy8pPy5bMF1cclxuICAgICAgICAgICAgdGl0bGUgPSB0aXRsZS5zcGxpdCgnIOKAkyAnKVswXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ21hZGFyYScsXHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgdXJsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHRcclxuXHJcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QgPT09ICdmYW5mb3gubmV0Jykge1xyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RGYW5Gb3goKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QgPT09ICdtYW5nYWRleC5vcmcnKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gdGVzdE1hbmdhZGV4KClcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RNYWRhcm8oKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHJlc3VsdClcclxuICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShyZXN1bHQpXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImV4cG9ydCBjb25zdCBBUElfQUREUkVTUyA9ICdodHRwczovL21hbmdhLmZvY2hsYWMuY29tJyAvLyAnaHR0cDovL2xvY2FsaG9zdDo0MzIxNCdcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGluaXRJbnRybyAoKSB7XHJcbiAgICBjb25zdCBib29rbWFya0ltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvLWJvb2ttYXJrJylcclxuICAgIGJvb2ttYXJrSW1hZ2Uuc3JjID0gY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKCdpbWFnZXMvYm9va21hcmstc2FtcGxlLnBuZycpXHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlREIgfSBmcm9tICcuLi9jb21tb24vZGInXHJcblxyXG5mdW5jdGlvbiByZWFkIChuYW1lc3BhY2UsIGtleXMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gY2hyb21lLnN0b3JhZ2VbbmFtZXNwYWNlXS5nZXQoa2V5cywgcmVzb2x2ZSkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyaXRlIChuYW1lc3BhY2UsIGtleVBhaXJzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IGNocm9tZS5zdG9yYWdlW25hbWVzcGFjZV0uc2V0KGtleVBhaXJzLCByZXNvbHZlKSlcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTGlzdGVuZXIgKGNhbGxiYWNrKSB7XHJcbiAgICByZXR1cm4gY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKGNhbGxiYWNrKVxyXG59XHJcblxyXG5jb25zdCBzdG9yYWdlID0ge1xyXG4gICAgcmVhZCwgd3JpdGUsIGFkZExpc3RlbmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkYiA9IGNyZWF0ZURCKHN0b3JhZ2UpXHJcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKiBGaWxlU2F2ZXIuanNcclxuICogQSBzYXZlQXMoKSBGaWxlU2F2ZXIgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cclxuICogRVM2aWZpZWQgYnkgQ29sZSBDaGFtYmVybGFpbiwgaHR0cHM6Ly9naXRodWIuY29tL2NjaGFtYmVybGFpblxyXG4gKlxyXG4gKiBMaWNlbnNlOiBNSVRcclxuICogICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvRmlsZVNhdmVyLmpzL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcclxuICovXG5cbi8qZ2xvYmFsIHNlbGYgKi9cbi8qanNsaW50IGJpdHdpc2U6IHRydWUsIGluZGVudDogNCwgbGF4YnJlYWs6IHRydWUsIGxheGNvbW1hOiB0cnVlLCBzbWFydHRhYnM6IHRydWUsIHBsdXNwbHVzOiB0cnVlICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvRmlsZVNhdmVyLmpzICovXG5cbnZhciBzYXZlQXMgPSBleHBvcnRzLnNhdmVBcyA9IHdpbmRvdy5zYXZlQXMgfHwgZnVuY3Rpb24gKHZpZXcpIHtcbiAgLy8gSUUgPDEwIGlzIGV4cGxpY2l0bHkgdW5zdXBwb3J0ZWRcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9NU0lFIFsxLTldXFwuLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSByZXR1cm47XG4gIHZhciBkb2MgPSB2aWV3LmRvY3VtZW50O1xuICAvLyBvbmx5IGdldCBVUkwgd2hlbiBuZWNlc3NhcnkgaW4gY2FzZSBCbG9iLmpzIGhhc24ndCBvdmVycmlkZGVuIGl0IHlldFxuICB2YXIgZ2V0X1VSTCA9IGZ1bmN0aW9uIGdldF9VUkwoKSB7XG4gICAgcmV0dXJuIHZpZXcuVVJMIHx8IHZpZXcud2Via2l0VVJMIHx8IHZpZXc7XG4gIH07XG4gIHZhciBzYXZlX2xpbmsgPSBkb2MuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJywgJ2EnKTtcbiAgdmFyIGNhbl91c2Vfc2F2ZV9saW5rID0gJ2Rvd25sb2FkJyBpbiBzYXZlX2xpbms7XG4gIHZhciBjbGljayA9IGZ1bmN0aW9uIGNsaWNrKG5vZGUpIHtcbiAgICB2YXIgZXZlbnQgPSBuZXcgTW91c2VFdmVudCgnY2xpY2snKTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9O1xuICB2YXIgaXNfc2FmYXJpID0gL1ZlcnNpb25cXC9bXFxkXFwuXSsuKlNhZmFyaS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgdmFyIHdlYmtpdF9yZXFfZnMgPSB2aWV3LndlYmtpdFJlcXVlc3RGaWxlU3lzdGVtO1xuICB2YXIgcmVxX2ZzID0gdmlldy5yZXF1ZXN0RmlsZVN5c3RlbSB8fCB3ZWJraXRfcmVxX2ZzIHx8IHZpZXcubW96UmVxdWVzdEZpbGVTeXN0ZW07XG4gIHZhciB0aHJvd19vdXRzaWRlID0gZnVuY3Rpb24gdGhyb3dfb3V0c2lkZShleCkge1xuICAgICh2aWV3LnNldEltbWVkaWF0ZSB8fCB2aWV3LnNldFRpbWVvdXQpKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IGV4O1xuICAgIH0sIDApO1xuICB9O1xuICB2YXIgZm9yY2Vfc2F2ZWFibGVfdHlwZSA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xuICB2YXIgZnNfbWluX3NpemUgPSAwO1xuICAvLyB0aGUgQmxvYiBBUEkgaXMgZnVuZGFtZW50YWxseSBicm9rZW4gYXMgdGhlcmUgaXMgbm8gXCJkb3dubG9hZGZpbmlzaGVkXCIgZXZlbnQgdG8gc3Vic2NyaWJlIHRvXG4gIHZhciBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQgPSAxMDAwICogNDA7IC8vIGluIG1zXG4gIHZhciByZXZva2UgPSBmdW5jdGlvbiByZXZva2UoZmlsZSkge1xuICAgIHZhciByZXZva2VyID0gZnVuY3Rpb24gcmV2b2tlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycpIC8vIGZpbGUgaXMgYW4gb2JqZWN0IFVSTFxuICAgICAgICBnZXRfVVJMKCkucmV2b2tlT2JqZWN0VVJMKGZpbGUpO2Vsc2UgLy8gZmlsZSBpcyBhIEZpbGVcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9O1xuICAgIC8qIC8vIFRha2Ugbm90ZSBXM0M6XHJcbiAgICB2YXJcclxuICAgICAgdXJpID0gdHlwZW9mIGZpbGUgPT09IFwic3RyaW5nXCIgPyBmaWxlIDogZmlsZS50b1VSTCgpXHJcbiAgICAsIHJldm9rZXIgPSBmdW5jdGlvbihldnQpIHtcclxuICAgICAgLy8gaWRlYWx5IERvd25sb2FkRmluaXNoZWRFdmVudC5kYXRhIHdvdWxkIGJlIHRoZSBVUkwgcmVxdWVzdGVkXHJcbiAgICAgIGlmIChldnQuZGF0YSA9PT0gdXJpKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmaWxlID09PSBcInN0cmluZ1wiKSB7IC8vIGZpbGUgaXMgYW4gb2JqZWN0IFVSTFxyXG4gICAgICAgICAgZ2V0X1VSTCgpLnJldm9rZU9iamVjdFVSTChmaWxlKTtcclxuICAgICAgICB9IGVsc2UgeyAvLyBmaWxlIGlzIGEgRmlsZVxyXG4gICAgICAgICAgZmlsZS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIDtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcImRvd25sb2FkZmluaXNoZWRcIiwgcmV2b2tlcik7XHJcbiAgICAqL1xuICAgIHNldFRpbWVvdXQocmV2b2tlciwgYXJiaXRyYXJ5X3Jldm9rZV90aW1lb3V0KTtcbiAgfTtcbiAgdmFyIGRpc3BhdGNoID0gZnVuY3Rpb24gZGlzcGF0Y2goZmlsZXNhdmVyLCBldmVudF90eXBlcywgZXZlbnQpIHtcbiAgICBldmVudF90eXBlcyA9IFtdLmNvbmNhdChldmVudF90eXBlcyk7XG4gICAgdmFyIGkgPSBldmVudF90eXBlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdmFyIGxpc3RlbmVyID0gZmlsZXNhdmVyWydvbicgKyBldmVudF90eXBlc1tpXV07XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGlzdGVuZXIuY2FsbChmaWxlc2F2ZXIsIGV2ZW50IHx8IGZpbGVzYXZlcik7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgdGhyb3dfb3V0c2lkZShleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHZhciBhdXRvX2JvbSA9IGZ1bmN0aW9uIGF1dG9fYm9tKGJsb2IpIHtcbiAgICAvLyBwcmVwZW5kIEJPTSBmb3IgVVRGLTggWE1MIGFuZCB0ZXh0LyogdHlwZXMgKGluY2x1ZGluZyBIVE1MKVxuICAgIGlmICgvXlxccyooPzp0ZXh0XFwvXFxTKnxhcHBsaWNhdGlvblxcL3htbHxcXFMqXFwvXFxTKlxcK3htbClcXHMqOy4qY2hhcnNldFxccyo9XFxzKnV0Zi04L2kudGVzdChibG9iLnR5cGUpKSByZXR1cm4gbmV3IEJsb2IoWyfvu78nLCBibG9iXSwgeyB0eXBlOiBibG9iLnR5cGUgfSk7XG4gICAgcmV0dXJuIGJsb2I7XG4gIH07XG5cbiAgdmFyIEZpbGVTYXZlciA9IGZ1bmN0aW9uIEZpbGVTYXZlcihibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGaWxlU2F2ZXIpO1xuXG4gICAgaWYgKCFub19hdXRvX2JvbSkgYmxvYiA9IGF1dG9fYm9tKGJsb2IpO1xuICAgIC8vIEZpcnN0IHRyeSBhLmRvd25sb2FkLCB0aGVuIHdlYiBmaWxlc3lzdGVtLCB0aGVuIG9iamVjdCBVUkxzXG4gICAgdmFyIGZpbGVzYXZlciA9IHRoaXMsXG4gICAgICAgIHR5cGUgPSBibG9iLnR5cGUsXG4gICAgICAgIGJsb2JfY2hhbmdlZCA9IGZhbHNlLFxuICAgICAgICBvYmplY3RfdXJsLFxuICAgICAgICB0YXJnZXRfdmlldyxcbiAgICAgICAgZGlzcGF0Y2hfYWxsID0gZnVuY3Rpb24gZGlzcGF0Y2hfYWxsKCkge1xuICAgICAgZGlzcGF0Y2goZmlsZXNhdmVyLCAnd3JpdGVzdGFydCBwcm9ncmVzcyB3cml0ZSB3cml0ZWVuZCcuc3BsaXQoJyAnKSk7XG4gICAgfVxuICAgIC8vIG9uIGFueSBmaWxlc3lzIGVycm9ycyByZXZlcnQgdG8gc2F2aW5nIHdpdGggb2JqZWN0IFVSTHNcbiAgICAsXG4gICAgICAgIGZzX2Vycm9yID0gZnVuY3Rpb24gZnNfZXJyb3IoKSB7XG4gICAgICBpZiAodGFyZ2V0X3ZpZXcgJiYgaXNfc2FmYXJpICYmIHR5cGVvZiBGaWxlUmVhZGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBTYWZhcmkgZG9lc24ndCBhbGxvdyBkb3dubG9hZGluZyBvZiBibG9iIHVybHNcbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGJhc2U2NERhdGEgPSByZWFkZXIucmVzdWx0O1xuICAgICAgICAgIHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSAnZGF0YTphdHRhY2htZW50L2ZpbGUnICsgYmFzZTY0RGF0YS5zbGljZShiYXNlNjREYXRhLnNlYXJjaCgvWyw7XS8pKTtcbiAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgIGRpc3BhdGNoX2FsbCgpO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuSU5JVDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gZG9uJ3QgY3JlYXRlIG1vcmUgb2JqZWN0IFVSTHMgdGhhbiBuZWVkZWRcbiAgICAgIGlmIChibG9iX2NoYW5nZWQgfHwgIW9iamVjdF91cmwpIHtcbiAgICAgICAgb2JqZWN0X3VybCA9IGdldF9VUkwoKS5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0X3ZpZXcpIHtcbiAgICAgICAgdGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV3X3RhYiA9IHZpZXcub3BlbihvYmplY3RfdXJsLCAnX2JsYW5rJyk7XG4gICAgICAgIGlmIChuZXdfdGFiID09PSB1bmRlZmluZWQgJiYgaXNfc2FmYXJpKSB7XG4gICAgICAgICAgLy9BcHBsZSBkbyBub3QgYWxsb3cgd2luZG93Lm9wZW4sIHNlZSBodHRwOi8vYml0Lmx5LzFrWmZmUklcbiAgICAgICAgICB2aWV3LmxvY2F0aW9uLmhyZWYgPSBvYmplY3RfdXJsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICByZXZva2Uob2JqZWN0X3VybCk7XG4gICAgfSxcbiAgICAgICAgYWJvcnRhYmxlID0gZnVuY3Rpb24gYWJvcnRhYmxlKGZ1bmMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChmaWxlc2F2ZXIucmVhZHlTdGF0ZSAhPT0gZmlsZXNhdmVyLkRPTkUpIHtcbiAgICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG4gICAgICAgIGNyZWF0ZV9pZl9ub3RfZm91bmQgPSB7IGNyZWF0ZTogdHJ1ZSwgZXhjbHVzaXZlOiBmYWxzZSB9LFxuICAgICAgICBzbGljZTtcblxuICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICBuYW1lID0gJ2Rvd25sb2FkJztcbiAgICB9XG4gICAgaWYgKGNhbl91c2Vfc2F2ZV9saW5rKSB7XG4gICAgICBvYmplY3RfdXJsID0gZ2V0X1VSTCgpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzYXZlX2xpbmsuaHJlZiA9IG9iamVjdF91cmw7XG4gICAgICAgIHNhdmVfbGluay5kb3dubG9hZCA9IG5hbWU7XG4gICAgICAgIGNsaWNrKHNhdmVfbGluayk7XG4gICAgICAgIGRpc3BhdGNoX2FsbCgpO1xuICAgICAgICByZXZva2Uob2JqZWN0X3VybCk7XG4gICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gT2JqZWN0IGFuZCB3ZWIgZmlsZXN5c3RlbSBVUkxzIGhhdmUgYSBwcm9ibGVtIHNhdmluZyBpbiBHb29nbGUgQ2hyb21lIHdoZW5cbiAgICAvLyB2aWV3ZWQgaW4gYSB0YWIsIHNvIEkgZm9yY2Ugc2F2ZSB3aXRoIGFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVxuICAgIC8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTkxMTU4XG4gICAgLy8gVXBkYXRlOiBHb29nbGUgZXJyYW50bHkgY2xvc2VkIDkxMTU4LCBJIHN1Ym1pdHRlZCBpdCBhZ2FpbjpcbiAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9Mzg5NjQyXG4gICAgaWYgKHZpZXcuY2hyb21lICYmIHR5cGUgJiYgdHlwZSAhPT0gZm9yY2Vfc2F2ZWFibGVfdHlwZSkge1xuICAgICAgc2xpY2UgPSBibG9iLnNsaWNlIHx8IGJsb2Iud2Via2l0U2xpY2U7XG4gICAgICBibG9iID0gc2xpY2UuY2FsbChibG9iLCAwLCBibG9iLnNpemUsIGZvcmNlX3NhdmVhYmxlX3R5cGUpO1xuICAgICAgYmxvYl9jaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gU2luY2UgSSBjYW4ndCBiZSBzdXJlIHRoYXQgdGhlIGd1ZXNzZWQgbWVkaWEgdHlwZSB3aWxsIHRyaWdnZXIgYSBkb3dubG9hZFxuICAgIC8vIGluIFdlYktpdCwgSSBhcHBlbmQgLmRvd25sb2FkIHRvIHRoZSBmaWxlbmFtZS5cbiAgICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjU0NDBcbiAgICBpZiAod2Via2l0X3JlcV9mcyAmJiBuYW1lICE9PSAnZG93bmxvYWQnKSB7XG4gICAgICBuYW1lICs9ICcuZG93bmxvYWQnO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gZm9yY2Vfc2F2ZWFibGVfdHlwZSB8fCB3ZWJraXRfcmVxX2ZzKSB7XG4gICAgICB0YXJnZXRfdmlldyA9IHZpZXc7XG4gICAgfVxuICAgIGlmICghcmVxX2ZzKSB7XG4gICAgICBmc19lcnJvcigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmc19taW5fc2l6ZSArPSBibG9iLnNpemU7XG4gICAgcmVxX2ZzKHZpZXcuVEVNUE9SQVJZLCBmc19taW5fc2l6ZSwgYWJvcnRhYmxlKGZ1bmN0aW9uIChmcykge1xuICAgICAgZnMucm9vdC5nZXREaXJlY3RvcnkoJ3NhdmVkJywgY3JlYXRlX2lmX25vdF9mb3VuZCwgYWJvcnRhYmxlKGZ1bmN0aW9uIChkaXIpIHtcbiAgICAgICAgdmFyIHNhdmUgPSBmdW5jdGlvbiBzYXZlKCkge1xuICAgICAgICAgIGRpci5nZXRGaWxlKG5hbWUsIGNyZWF0ZV9pZl9ub3RfZm91bmQsIGFib3J0YWJsZShmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgICAgZmlsZS5jcmVhdGVXcml0ZXIoYWJvcnRhYmxlKGZ1bmN0aW9uICh3cml0ZXIpIHtcbiAgICAgICAgICAgICAgd3JpdGVyLm9ud3JpdGVlbmQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gZmlsZS50b1VSTCgpO1xuICAgICAgICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goZmlsZXNhdmVyLCAnd3JpdGVlbmQnLCBldmVudCk7XG4gICAgICAgICAgICAgICAgcmV2b2tlKGZpbGUpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB3cml0ZXIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB3cml0ZXIuZXJyb3I7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgIT09IGVycm9yLkFCT1JUX0VSUikge1xuICAgICAgICAgICAgICAgICAgZnNfZXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICd3cml0ZXN0YXJ0IHByb2dyZXNzIHdyaXRlIGFib3J0Jy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgd3JpdGVyWydvbicgKyBldmVudF0gPSBmaWxlc2F2ZXJbJ29uJyArIGV2ZW50XTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHdyaXRlci53cml0ZShibG9iKTtcbiAgICAgICAgICAgICAgZmlsZXNhdmVyLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHdyaXRlci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLldSSVRJTkc7XG4gICAgICAgICAgICB9KSwgZnNfZXJyb3IpO1xuICAgICAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGRpci5nZXRGaWxlKG5hbWUsIHsgY3JlYXRlOiBmYWxzZSB9LCBhYm9ydGFibGUoZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgICAvLyBkZWxldGUgZmlsZSBpZiBpdCBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgICAgICAgc2F2ZSgpO1xuICAgICAgICB9KSwgYWJvcnRhYmxlKGZ1bmN0aW9uIChleCkge1xuICAgICAgICAgIGlmIChleC5jb2RlID09PSBleC5OT1RfRk9VTkRfRVJSKSB7XG4gICAgICAgICAgICBzYXZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZzX2Vycm9yKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KSwgZnNfZXJyb3IpO1xuICAgIH0pLCBmc19lcnJvcik7XG4gIH07XG5cbiAgdmFyIEZTX3Byb3RvID0gRmlsZVNhdmVyLnByb3RvdHlwZTtcbiAgdmFyIHNhdmVBcyA9IGZ1bmN0aW9uIHNhdmVBcyhibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuICAgIHJldHVybiBuZXcgRmlsZVNhdmVyKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKTtcbiAgfTtcblxuICAvLyBJRSAxMCsgKG5hdGl2ZSBzYXZlQXMpXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcbiAgICAgIGlmICghbm9fYXV0b19ib20pIGJsb2IgPSBhdXRvX2JvbShibG9iKTtcbiAgICAgIHJldHVybiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihibG9iLCBuYW1lIHx8ICdkb3dubG9hZCcpO1xuICAgIH07XG4gIH1cblxuICBGU19wcm90by5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZmlsZXNhdmVyID0gdGhpcztcbiAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgIGRpc3BhdGNoKGZpbGVzYXZlciwgJ2Fib3J0Jyk7XG4gIH07XG4gIEZTX3Byb3RvLnJlYWR5U3RhdGUgPSBGU19wcm90by5JTklUID0gMDtcbiAgRlNfcHJvdG8uV1JJVElORyA9IDE7XG4gIEZTX3Byb3RvLkRPTkUgPSAyO1xuXG4gIEZTX3Byb3RvLmVycm9yID0gRlNfcHJvdG8ub253cml0ZXN0YXJ0ID0gRlNfcHJvdG8ub25wcm9ncmVzcyA9IEZTX3Byb3RvLm9ud3JpdGUgPSBGU19wcm90by5vbmFib3J0ID0gRlNfcHJvdG8ub25lcnJvciA9IEZTX3Byb3RvLm9ud3JpdGVlbmQgPSBudWxsO1xuXG4gIHJldHVybiBzYXZlQXM7XG59KHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmIHx8IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyB8fCB1bmRlZmluZWQuY29udGVudCk7XG4vLyBgc2VsZmAgaXMgdW5kZWZpbmVkIGluIEZpcmVmb3ggZm9yIEFuZHJvaWQgY29udGVudCBzY3JpcHQgY29udGV4dFxuLy8gd2hpbGUgYHRoaXNgIGlzIG5zSUNvbnRlbnRGcmFtZU1lc3NhZ2VNYW5hZ2VyXG4vLyB3aXRoIGFuIGF0dHJpYnV0ZSBgY29udGVudGAgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgd2luZG93XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHNhdmVBczsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICdyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMnXG5pbXBvcnQgeyB0ZXN0Qm9va21hcmsgfSBmcm9tICcuL2Jvb2ttYXJrJ1xuaW1wb3J0IHsgYWRkSW1wb3J0SGFuZGxlcnMgfSBmcm9tICcuLi9jb21tb24vaW1wb3J0J1xuaW1wb3J0IHsgZGIgfSBmcm9tICcuL3N0b3JhZ2UnXG5pbXBvcnQgeyB1cmxSZW5kZXJlciB9IGZyb20gJy4uL2NvbW1vbi91cmxzJ1xuaW1wb3J0IHsgc291cmNlUmVuZGVyZXIgfSBmcm9tICcuLi9jb21tb24vc291cmNlcydcbmltcG9ydCB7IG1hcmtSZWZyZXNoZWQsIHJlc2lzdGVyUHJvZ3Jlc3NIYW5kbGVyLCB1cGRhdGVQcm9ncmVzcyB9IGZyb20gJy4uL2NvbW1vbi9wcm9ncmVzcy1iYXInXG5pbXBvcnQgeyBjcmVhdGVTY2hlZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9zY2hlZHVsZSdcbmltcG9ydCB7IHJlZ2lzdGVyTWVudUxpc3RlbmVycyB9IGZyb20gJy4uL2NvbW1vbi9tZW51J1xuaW1wb3J0IHsgYWRkU2V0dGluZ3NIYW5kbGVycywgZ2V0TGlua0hlbHBlcnMgfSBmcm9tICcuLi9jb21tb24vc2V0dGluZ3MnXG5pbXBvcnQgeyBBUEkgfSBmcm9tICcuLi9jb21tb24vYXBpJ1xuaW1wb3J0IHsgQVBJX0FERFJFU1MgfSBmcm9tICcuL2NvbnN0YW50cydcbmltcG9ydCB7IGluaXRJbnRybyB9IGZyb20gJy4vaW50cm8nXG5cbmNvbnN0IGFwaSA9IEFQSShBUElfQUREUkVTUylcblxuZGIudXJscy5zZXRNYXhPbGQoMTAwKVxuXG5jb25zdCBMaW5rcyA9IGdldExpbmtIZWxwZXJzKGRiLCBhcGkpXG5jb25zdCBVcmxzID0gdXJsUmVuZGVyZXIoZGIpXG5jb25zdCBTb3VyY2VzID0gc291cmNlUmVuZGVyZXIoZGIpXG5cbmRiLm9uQ2hhbmdlKChjaGFuZ2VzKSA9PiB7XG4gICAgaWYgKFsnaGlkZScsICdoaWRkZW5DaGFwdGVycycsICd1cmxzJ10uc29tZShjaGFuZ2VzLmhhc093blByb3BlcnR5LmJpbmQoY2hhbmdlcykpKSB7XG4gICAgICAgIFVybHMucmVuZGVyKClcbiAgICB9XG4gICAgaWYgKE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUoKGNoYW5nZSkgPT4gY2hhbmdlLmluY2x1ZGVzKCdzb3VyY2VzJykpIHx8IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjaGFuZ2VzLCAnbWF4T2xkJykpIHtcbiAgICAgICAgU291cmNlcy5yZW5kZXIoKVxuICAgIH1cbiAgICBMaW5rcy5wdXNoTGlua1VwZGF0ZShjaGFuZ2VzKVxufSlcblxubmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuY29udHJvbGxlci5wb3N0TWVzc2FnZSgnRkVUQ0hfQ0hBUFRFUlMnKVxubWFya1JlZnJlc2hlZCgpXG5cbmNvbnN0IGludGVydmFsID0gY3JlYXRlU2NoZWR1bGUoe1xuICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIucG9zdE1lc3NhZ2UoJ0ZFVENIX0NIQVBURVJTJylcbiAgICAgICAgbWFya1JlZnJlc2hlZCgpXG4gICAgfSxcbiAgICBpbnRlcnZhbDogNjAgKiAxMDAwLFxuICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgIHVwZGF0ZXI6IHVwZGF0ZVByb2dyZXNzXG59KVxuXG5pbml0SW50cm8oKVxucmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIoKCkgPT4gaW50ZXJ2YWwudHJpZ2dlckluc3RhbnRseSgpKVxuYWRkSW1wb3J0SGFuZGxlcnMoZGIpXG5hZGRTZXR0aW5nc0hhbmRsZXJzKGRiLCBhcGkpXG5yZWdpc3Rlck1lbnVMaXN0ZW5lcnMoZGIsIGFwaSlcblxuVXJscy5yZW5kZXIoKVxuU291cmNlcy5yZW5kZXIoKVxuICAgIC50aGVuKHRlc3RCb29rbWFyaylcbiJdLCJzb3VyY2VSb290IjoiIn0=