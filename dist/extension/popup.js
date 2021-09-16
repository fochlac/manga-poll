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

  function readHosts() {
    return fetch("".concat(baseUrl, "/api/sources/hosts"), {
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
    },
    Hosts: {
      read: readHosts
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

/***/ "./src/common/hosts.js":
/*!*****************************!*\
  !*** ./src/common/hosts.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderHostList": () => (/* binding */ renderHostList)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function renderHostList(_x, _x2) {
  return _renderHostList.apply(this, arguments);
}

function _renderHostList() {
  _renderHostList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_db, api) {
    var Hosts, result, hostContainer, hosts, hostList, _hostList;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            Hosts = api.Hosts;
            _context.next = 3;
            return Hosts.read();

          case 3:
            result = _context.sent;
            hostContainer = document.querySelector('#hosts');

            if (result.valid) {
              hosts = result.payload;
              hostList = hosts.stable.sort(function (a, b) {
                return String(a === null || a === void 0 ? void 0 : a.name).localeCompare(b === null || b === void 0 ? void 0 : b.name);
              }).map(function (host) {
                return "<a href=\"".concat(host.url, "\">").concat(host.name, "</a>");
              }).join('<span>, </span>');
              hostContainer.innerHTML = "\n            <h6>Supported Pages</h6>\n            <div class=\"link-list\">".concat(hostList, "</div>\n        ");

              if (hosts.unstable.length) {
                _hostList = hosts.unstable.sort(function (a, b) {
                  return String(a === null || a === void 0 ? void 0 : a.name).localeCompare(b === null || b === void 0 ? void 0 : b.name);
                }).map(function (host) {
                  return "<a href=\"".concat(host.url, "\">").concat(host.name, "</a>");
                }).join('<span>, </span>');
                hostContainer.innerHTML += "\n                <p>These Pages had some problems recently &ndash; they might or might not work:</p>\n                <div class=\"link-list\">".concat(_hostList, "</div>\n            ");
              }
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _renderHostList.apply(this, arguments);
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
  var intro = document.getElementById('intro');

  var openChapters = function openChapters() {
    db.sources.read().then(function (sources) {
      intro.style.display = sources.length ? 'none' : 'flex';
    });
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
    intro.style.display = 'none';
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
    intro.style.display = 'none';
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
            if (!(request.id && request.title && request.url)) {
              _context.next = 9;
              break;
            }

            _context.next = 3;
            return _storage__WEBPACK_IMPORTED_MODULE_2__.db.sources.read();

          case 3:
            sources = _context.sent;

            if (sources.some(function (source) {
              return source.url === request.url && String(source.mangaId) === String(request.id);
            })) {
              _context.next = 9;
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

          case 9:
            bookmark.style.display = 'none';
            bookmarkTitle.innerText = '';
            currentSource = null;

          case 12:
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

  function parse(string, fallback) {
    try {
      return JSON.parse(string);
    } catch (e) {
      return fallback;
    }
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

  function testAsura() {
    var _breadcrumpLink$query;

    var breadcrumpLink = document.querySelector('ol[itemtype="http://schema.org/BreadcrumbList"] a[itemprop="item"][href*="/comics/"]');
    var url = breadcrumpLink.href;
    var name = (_breadcrumpLink$query = breadcrumpLink.querySelector('span')) === null || _breadcrumpLink$query === void 0 ? void 0 : _breadcrumpLink$query.innerText;
    return {
      type: 'asura',
      id: url === null || url === void 0 ? void 0 : url.split('/')[4],
      title: name,
      url: url
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

  function testLeviathan() {
    var _document$getElementB, _document$getElementB2, _document$querySelect4;

    var header = document.querySelector('.post-title h1');
    var titles = [Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(function (script) {
      var _parse;

      return (_parse = parse(script.innerText)) === null || _parse === void 0 ? void 0 : _parse.headline;
    }).find(function (h) {
      return h;
    }), (_document$getElementB = document.getElementById('chapter-heading')) === null || _document$getElementB === void 0 ? void 0 : (_document$getElementB2 = _document$getElementB.innerText) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.split(' - ')[0], header && Array.from(header.childNodes).reduce(function (title, node) {
      return title + (node.nodeType === 3 ? node.textContent : '');
    }, ''), (_document$querySelect4 = document.querySelector('.rate-title')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.title].filter(function (title) {
      return title;
    }).reduce(function (map, title) {
      var clean = decodeHTMLEntities(title).trim();
      map[clean] = typeof map[clean] === 'number' ? map[clean] + 1 : 1;
      return map;
    }, {});
    var title = Object.keys(titles).sort(function (title1, title2) {
      return titles[title1] - titles[title2];
    })[0];
    var url = document.location.href.split('/').slice(0, 6).join('/');
    return {
      type: 'leviathan',
      id: document.location.href.split('/')[5],
      title: title,
      url: url
    };
  }

  function testMadaro() {
    var _window, _window$manga, _document$querySelect5, _document$querySelect6, _document$querySelect7, _document$querySelect8, _document$querySelect9, _document$getElementB3, _document$getElementB4, _document$getElementB5, _document$getElementB6, _document$getElementB7, _document$getElementB8, _document$getElementB9, _document$getElementB10, _document$querySelect10, _document, _document$location;

    function parse(string, fallback) {
      try {
        return JSON.parse(string);
      } catch (e) {
        return fallback;
      }
    }

    var ids = [(_window = window) === null || _window === void 0 ? void 0 : (_window$manga = _window.manga) === null || _window$manga === void 0 ? void 0 : _window$manga.manga_id, (_document$querySelect5 = document.querySelector('.rating-post-id')) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.value, (_document$querySelect6 = document.querySelector('.wp-manga-action-button')) === null || _document$querySelect6 === void 0 ? void 0 : (_document$querySelect7 = _document$querySelect6.dataset) === null || _document$querySelect7 === void 0 ? void 0 : _document$querySelect7['post'], (_document$querySelect8 = document.querySelector('.chapter-selection')) === null || _document$querySelect8 === void 0 ? void 0 : (_document$querySelect9 = _document$querySelect8.dataset) === null || _document$querySelect9 === void 0 ? void 0 : _document$querySelect9['manga'], (_document$getElementB3 = document.getElementById('manga-chapters-holder')) === null || _document$getElementB3 === void 0 ? void 0 : (_document$getElementB4 = _document$getElementB3.dataset) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4['id'], (_document$getElementB5 = document.getElementById('manga-reading-nav-head')) === null || _document$getElementB5 === void 0 ? void 0 : (_document$getElementB6 = _document$getElementB5.dataset) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6['id'], (_document$getElementB7 = document.getElementById('manga-reading-nav-foot')) === null || _document$getElementB7 === void 0 ? void 0 : (_document$getElementB8 = _document$getElementB7.dataset) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8['id']].filter(function (title) {
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
      var _parse2;

      return (_parse2 = parse(script.innerText)) === null || _parse2 === void 0 ? void 0 : _parse2.headline;
    }).find(function (h) {
      return h;
    }), (_document$getElementB9 = document.getElementById('chapter-heading')) === null || _document$getElementB9 === void 0 ? void 0 : (_document$getElementB10 = _document$getElementB9.innerText) === null || _document$getElementB10 === void 0 ? void 0 : _document$getElementB10.split(' - ')[0], header && Array.from(header.childNodes).reduce(function (title, node) {
      return title + (node.nodeType === 3 ? node.textContent : '');
    }, ''), (_document$querySelect10 = document.querySelector('.rate-title')) === null || _document$querySelect10 === void 0 ? void 0 : _document$querySelect10.title].filter(function (title) {
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
  } else if (window.location.host.includes('asurascans.com')) {
    result = testAsura();
  } else if (window.location.host.includes('leviatanscans.com')) {
    result = testLeviathan();
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
/* harmony import */ var _common_hosts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../common/hosts */ "./src/common/hosts.js");














var api = (0,_common_api__WEBPACK_IMPORTED_MODULE_10__.API)(_constants__WEBPACK_IMPORTED_MODULE_11__.API_ADDRESS);
_storage__WEBPACK_IMPORTED_MODULE_3__.db.urls.setMaxOld(100);
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
(0,_common_hosts__WEBPACK_IMPORTED_MODULE_13__.renderHostList)(_storage__WEBPACK_IMPORTED_MODULE_3__.db, api);
Urls.render();
Sources.render().then(_bookmark__WEBPACK_IMPORTED_MODULE_1__.testBookmark);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2RiLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vaG9zdHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9pbXBvcnQuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9tZW51LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vcHJvZ3Jlc3MtYmFyLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vc2NoZWR1bGUuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3NvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi91cmxzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9ib29rbWFyay5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL2ludHJvLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9leHRlbnNpb24vc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL25vZGVfbW9kdWxlcy9zYXZlLWFzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21hbmdhY2hlY2tlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9wb3B1cC5qcyJdLCJuYW1lcyI6WyJBUEkiLCJiYXNlVXJsIiwicG9zdFNvdXJjZSIsInNvdXJjZSIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwiQWNjZXB0IiwidGhlbiIsInJlcyIsImpzb24iLCJjYXRjaCIsImVycm9yIiwidmFsaWQiLCJkYXRhIiwicGF5bG9hZCIsImFkZFNvdXJjZUZyb21VcmwiLCJ1cmwiLCJyZWFkVXJscyIsInNvdXJjZXMiLCJsaW1pdCIsImRhdGUiLCJhZGRTdWJzY3JpcHRpb25zIiwidG9waWNzIiwia2V5IiwiZGVsZXRlU3Vic2NyaXB0aW9ucyIsInJlYWRMaW5rIiwiY2hhbmdlZFNpbmNlIiwic3RhdHVzIiwicmVhZEhvc3RzIiwidXBkYXRlTGluayIsInVwZGF0ZVNldCIsImNyZWF0ZUxpbmsiLCJpbml0U2V0IiwiVXJscyIsInJlYWQiLCJTb3VyY2UiLCJpbnNlcnQiLCJmcm9tVXJsIiwiU3Vic2NyaXB0aW9uIiwic3Vic2NyaWJlIiwidW5zdWJzY3JpYmUiLCJMaW5rIiwidXBkYXRlIiwiSG9zdHMiLCJOQU1FU1BBQ0VTIiwiU1lOQyIsIkxPQ0FMIiwiY3JlYXRlREIiLCJzdG9yYWdlIiwid3JpdGUiLCJyZWFkU291cmNlcyIsInJlZ2lzdHJ5IiwicGFyc2UiLCJyZWR1Y2UiLCJQcm9taXNlIiwiYWxsIiwiY29uY2F0IiwicmVzb2x2ZSIsIndyaXRlU291cmNlcyIsInVwZGF0ZXMiLCJ4IiwiTWF0aCIsIm1heCIsImNlaWwiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJhZGRTb3VyY2UiLCJzb21lIiwibWFuZ2FJZCIsImRlbGV0ZVNvdXJjZSIsInNvdXJjZUlkIiwibmV3U291cmNlcyIsImZpbHRlciIsImlkIiwiaXNEaXJ0eSIsInVybHMiLCJnZXRGaWx0ZXJlZFNvcnRlZFVybHMiLCJoaWRkZW5DaGFwdGVycyIsImhpZGUiLCJoaWRkZW5DaGFwdGVyc1N0cmluZyIsInVybExpc3QiLCJjaGVja09sZCIsImNoYXB0ZXIiLCJjcmVhdGVkIiwiT2JqZWN0IiwidmFsdWVzIiwic29ydCIsInVybDEiLCJ1cmwyIiwiZGlmZiIsImFicyIsIlN0cmluZyIsImxvY2FsZUNvbXBhcmUiLCJvbGRVcmxzIiwibmV3VXJscyIsImhpZGVVcmwiLCJyZXN1bHQiLCJoaWRlQWxsVXJscyIsInRpbWVzdGFtcCIsIndyaXRlVXJscyIsImluaXQiLCJ0b2RheSIsIkRhdGUiLCJzZXRIb3VycyIsImdldFRpbWUiLCJzZXRNYXhPbGQiLCJtYXhPbGQiLCJnZXRNYXhPbGQiLCJzZXRMaW5rIiwibGluayIsImdldExpbmsiLCJnZXRIaWRlIiwid3JpdGVMb2NhbFNldHRpbmdzIiwic2V0dGluZ3MiLCJsb2NhbFNldHRpbmdzIiwiZ2V0TG9jYWxTZXR0aW5ncyIsImdldExpbmtEYXRhIiwibWFwIiwiTnVtYmVyIiwic2V0TGlua0RhdGEiLCJzdG9yZWRTb3VyY2VzIiwic3MiLCJoYXNDaGFuZ2VkU291cmNlcyIsImtleXMiLCJwcm9taXNlcyIsImhpZGRlbiIsImltcG9ydCIsImFkZCIsImRlbGV0ZSIsImxvY2FsIiwic2V0IiwiaGlkZUFsbCIsIm9uQ2hhbmdlIiwiYWRkTGlzdGVuZXIiLCJzZXRMb2NhbCIsInJlbmRlckhvc3RMaXN0IiwiX2RiIiwiYXBpIiwiaG9zdENvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhvc3RzIiwiaG9zdExpc3QiLCJzdGFibGUiLCJhIiwiYiIsIm5hbWUiLCJob3N0Iiwiam9pbiIsImlubmVySFRNTCIsInVuc3RhYmxlIiwiYWRkSW1wb3J0SGFuZGxlcnMiLCJkYiIsImltcG9ydEVsZW0iLCJnZXRFbGVtZW50QnlJZCIsImV4cG9ydEVsZW0iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZpbGUiLCJ0YXJnZXQiLCJmaWxlcyIsImZyIiwiRmlsZVJlYWRlciIsImNsZWFuIiwidGl0bGUiLCJyZWFkQXNUZXh0IiwiYmxvYiIsIkJsb2IiLCJ0eXBlIiwic2F2ZUFzIiwicmVnaXN0ZXJNZW51TGlzdGVuZXJzIiwiQXBpIiwiaW1wb3J0U2VjdGlvbiIsInBvcHVwVGl0bGUiLCJib29rbWFya3MiLCJjaGFwdGVycyIsImFkZFNlY3Rpb24iLCJzZXR0aW5nc1NlY3Rpb24iLCJwcm9ncmVzcyIsImludHJvIiwib3BlbkNoYXB0ZXJzIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5uZXJUZXh0Iiwib3BlblNldHRpbmdzIiwiZ2V0TGlua1F1ZXJ5IiwibGlua0lmVW5saW5rZWQiLCJsb2NrZWQiLCJyZXNpc3RlclByb2dyZXNzSGFuZGxlciIsInVwZGF0ZU5vdyIsIm1hcmtSZWZyZXNoZWQiLCJkYXRhc2V0IiwiYmVmb3JlIiwic2V0VGltZW91dCIsInVwZGF0ZVByb2dyZXNzIiwiX2xhc3RQaW5nIiwibmV4dFBpbmciLCJyZW1haW5pbmciLCJub3ciLCJzZWNvbmRzIiwicm91bmQiLCJjcmVhdGVTY2hlZHVsZSIsImlzQWN0aXZlIiwiaW50ZXJ2YWwiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwicHJvdG90eXBlIiwidXBkYXRlciIsImxhc3RQaW5nIiwiY2FsbENhbGxiYWNrIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsIm5ld0ludGVydmFsIiwiRXJyb3IiLCJzZXRDYWxsYmFjayIsImNiIiwic3RhcnQiLCJ0cmlnZ2VySW5zdGFudGx5Iiwic3RvcCIsImNsZWFySW50ZXJ2YWwiLCJsaW5rRmllbGRzIiwiZm9ybWF0S2V5IiwiZ2V0TGlua0hlbHBlcnMiLCJwdXNoTGlua1VwZGF0ZSIsImNoYW5nZXMiLCJjaGFuZ2VzZXQiLCJjaGFuZ2UiLCJpbmNsdWRlcyIsImZldGNoTGlua1VwZGF0ZSIsImxhc3RNb2RpZmllZCIsImlzVmFsaWRMaW5rS2V5IiwiY2xlYW5LZXkiLCJyZXBsYWNlQWxsIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJnZXQiLCJjdXJyZW50TGluayIsImxpbmtJbnB1dDEiLCJsaW5rSW5wdXQyIiwibGlua0lucHV0MyIsInZhbHVlIiwiY29ubmVjdFRvTGluayIsImxpbmtOdW1iZXJUZXh0IiwibGlua0xpbmsiLCJsaW5rTGlua1RleHQiLCJocmVmIiwiY29sb3IiLCJsaW5rTGlua1dhcm4iLCJ3YXJuTGlua0N1cnJlbnQiLCJ3YXJuTGlua05ldyIsImxpbmtFcnJvciIsImxpbmtQcm9ncmVzcyIsImxpbmtCdXR0b24iLCJkaXNhYmxlZCIsImxpbmtSZXN1bHQiLCJhZGRTZXR0aW5nc0hhbmRsZXJzIiwid3JpdGVTdGF0ZVRvRG9tIiwibGlua2luZ1NlY3Rpb24iLCJ1bmxpbmtTZWN0aW9uIiwidW5saW5rQnV0dG9uIiwibnVtYmVyIiwiZm9jdXMiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImxpbmtEYXRhIiwibmV3TGlua1Jlc3VsdCIsInVuZGVmaW5lZCIsInNvdXJjZVJlbmRlcmVyIiwiZXZlbnQiLCJjbG9zZXN0IiwiY29udGFpbnMiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJyZW5kZXJTb3VyY2VzIiwic291cmNlMSIsInNvdXJjZTIiLCJyZXBsYWNlIiwic3BsaXQiLCJyZW5kZXIiLCJ1cmxSZW5kZXJlciIsImxhdGVzdENoYXB0ZXJEYXRlIiwibGNkIiwiY2xvc2VzdEhpZGUiLCJjbG9zZXN0TGluayIsInByZXZlbnREZWZhdWx0Iiwib3BlbiIsImNsb3Nlc3RNb3JlIiwidG9wIiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsIm1heFNjcm9sbCIsInNjcm9sbEhlaWdodCIsIm9mZnNldEhlaWdodCIsInNjcm9sbFRvcCIsImNoZWNrVG9wQnV0dG9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY3JlYXRlVXJsUmVuZGVyZXIiLCJpc09sZCIsInRpbWVTdHJpbmciLCJwYWQiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJkYXRlU3RyaW5nIiwiZ2V0RGF0ZSIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJmdWxsRGF0ZSIsInRvSVNPU3RyaW5nIiwicmVuZGVyVXJscyIsIm5ld1Jvd3MiLCJvbGRSb3dzIiwic3RyaW5nIiwiZmFsbGJhY2siLCJubyIsImN1cnJlbnRTb3VyY2UiLCJib29rbWFyayIsImJvb2ttYXJrVHJhY2siLCJib29rbWFya1RpdGxlIiwiQVBJX0FERFJFU1MiLCJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwicmVxdWVzdCIsInRlc3RCb29rbWFyayIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsIndpbmRvd0lkIiwid2luZG93cyIsIldJTkRPV19JRF9DVVJSRU5UIiwic2NyaXB0aW5nIiwiZXhlY3V0ZVNjcmlwdCIsInRhYklkIiwiZnVuY3Rpb24iLCJ0ZXN0IiwiZGVjb2RlSFRNTEVudGl0aWVzIiwic3RyIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInRlc3RGYW5Gb3giLCJwYXRobmFtZSIsIm1hdGNoIiwib3JpZ2luIiwidGVzdEFzdXJhIiwiYnJlYWRjcnVtcExpbmsiLCJ0ZXN0TWFuZ2FkZXgiLCJ0ZXN0TGV2aWF0aGFuIiwiaGVhZGVyIiwidGl0bGVzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsInNjcmlwdCIsImhlYWRsaW5lIiwiZmluZCIsImgiLCJjaGlsZE5vZGVzIiwibm9kZSIsIm5vZGVUeXBlIiwidHJpbSIsInRpdGxlMSIsInRpdGxlMiIsInRlc3RNYWRhcm8iLCJpZHMiLCJtYW5nYSIsIm1hbmdhX2lkIiwiaWQxIiwiaWQyIiwiY29uc29sZSIsImxvZyIsInNlbmRNZXNzYWdlIiwiaW5pdEludHJvIiwiYm9va21hcmtJbWFnZSIsInNyYyIsImdldFVSTCIsIm5hbWVzcGFjZSIsImtleVBhaXJzIiwib25DaGFuZ2VkIiwiU291cmNlcyIsImhhc093blByb3BlcnR5IiwiYmluZCIsImNhbGwiLCJuYXZpZ2F0b3IiLCJzZXJ2aWNlV29ya2VyIiwiY29udHJvbGxlciIsInBvc3RNZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPLElBQU1BLEdBQUcsR0FBRyxTQUFOQSxHQUFNLEdBQWtCO0FBQUEsTUFBakJDLE9BQWlCLHVFQUFQLEVBQU87O0FBQ2pDLFdBQVNDLFVBQVQsQ0FBcUJDLE1BQXJCLEVBQTZCO0FBQ3pCLFdBQU9DLEtBQUssV0FBSUgsT0FBSixtQkFBMkI7QUFDbkNJLFlBQU0sRUFBRSxNQUQyQjtBQUVuQ0MsVUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUwsTUFBZixDQUY2QjtBQUduQ00sYUFBTyxFQUFFO0FBQ0xDLGNBQU0sRUFBRSxrQkFESDtBQUVMLHdCQUFnQjtBQUZYO0FBSDBCLEtBQTNCLENBQUwsQ0FRRkMsSUFSRSxDQVFHLFVBQUNDLEdBQUQ7QUFBQSxhQUFTQSxHQUFHLENBQUNDLElBQUosRUFBVDtBQUFBLEtBUkgsRUFTRkMsS0FURSxDQVNJLFVBQUNDLEtBQUQ7QUFBQSxhQUFZO0FBQUVDLGFBQUssRUFBRSxLQUFUO0FBQWdCRCxhQUFLLEVBQUxBO0FBQWhCLE9BQVo7QUFBQSxLQVRKLEVBVUZKLElBVkUsQ0FVRyxVQUFDTSxJQUFEO0FBQUEsYUFBVUEsSUFBSSxDQUFDQyxPQUFmO0FBQUEsS0FWSCxDQUFQO0FBV0g7O0FBRUQsV0FBU0MsZ0JBQVQsQ0FBMkJDLEdBQTNCLEVBQWdDO0FBQzVCLFdBQU9oQixLQUFLLFdBQUlILE9BQUosOEJBQXNDO0FBQzlDSSxZQUFN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Q0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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ID0gJycpID0+IHtcclxuICAgIGZ1bmN0aW9uIHBvc3RTb3VyY2UgKHNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc291cmNlc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNvdXJjZSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEucGF5bG9hZClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRTb3VyY2VGcm9tVXJsICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3NvdXJjZXMvYWRkRnJvbVVybGAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXJsIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZFVybHMgKHNvdXJjZXMgPSBbXSwgbGltaXQgPSAnJywgZGF0ZSA9ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFxyXG4gICAgICAgICAgICBgJHtiYXNlVXJsfS9hcGkvdXJscy9mZXRjaGAsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5wYXlsb2FkIHx8IFtdKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFN1YnNjcmlwdGlvbnMgKHRvcGljcyA9IFtdLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3N1YnNjcmlwdGlvbnNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB0b3BpY3MsXHJcbiAgICAgICAgICAgICAgICBrZXk6IGtleVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZVN1YnNjcmlwdGlvbnMgKHRvcGljcyA9IFtdLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3N1YnNjcmlwdGlvbnNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHRvcGljcyxcclxuICAgICAgICAgICAgICAgIGtleToga2V5XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZExpbmsgKGtleSwgY2hhbmdlZFNpbmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rcy8ke2tleX0ke2NoYW5nZWRTaW5jZSA/IGA/Y2hhbmdlZFNpbmNlPSR7Y2hhbmdlZFNpbmNlfWAgOiAnJ31gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnN0YXR1cyA9PT0gMzA0ID8gKHsgdmFsaWQ6IHRydWUsIHBheWxvYWQ6IG51bGwgfSkgOiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWRIb3N0cyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9zb3VyY2VzL2hvc3RzYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5zdGF0dXMgPT09IDMwNCA/ICh7IHZhbGlkOiB0cnVlLCBwYXlsb2FkOiBudWxsIH0pIDogcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVMaW5rIChrZXksIHVwZGF0ZVNldCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvbGlua3MvJHtrZXl9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwdXQnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1cGRhdGVTZXQpLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTGluayAoaW5pdFNldCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvbGlua3NgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbml0U2V0KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgVXJsczoge1xyXG4gICAgICAgICAgICByZWFkOiByZWFkVXJsc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU291cmNlOiB7XHJcbiAgICAgICAgICAgIGluc2VydDogcG9zdFNvdXJjZSxcclxuICAgICAgICAgICAgZnJvbVVybDogYWRkU291cmNlRnJvbVVybFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU3Vic2NyaXB0aW9uOiB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZTogYWRkU3Vic2NyaXB0aW9ucyxcclxuICAgICAgICAgICAgdW5zdWJzY3JpYmU6IGRlbGV0ZVN1YnNjcmlwdGlvbnNcclxuICAgICAgICB9LFxyXG4gICAgICAgIExpbms6IHtcclxuICAgICAgICAgICAgaW5zZXJ0OiBjcmVhdGVMaW5rLFxyXG4gICAgICAgICAgICB1cGRhdGU6IHVwZGF0ZUxpbmssXHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRMaW5rXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIb3N0czoge1xyXG4gICAgICAgICAgICByZWFkOiByZWFkSG9zdHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcGFyc2UgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuY29uc3QgTkFNRVNQQUNFUyA9IHtcclxuICAgIFNZTkM6ICdzeW5jJyxcclxuICAgIExPQ0FMOiAnbG9jYWwnXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEQiAoc3RvcmFnZSkge1xyXG4gICAgY29uc3QgeyByZWFkLCB3cml0ZSB9ID0gc3RvcmFnZVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlYWRTb3VyY2VzICgpIHtcclxuICAgICAgICBjb25zdCB7IHJlZ2lzdHJ5IH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyByZWdpc3RyeTogJ1tcInNvdXJjZXMtMVwiXScgfSlcclxuICAgICAgICByZXR1cm4gcGFyc2UocmVnaXN0cnksIFsnc291cmNlcy0xJ10pXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHNvdXJjZXMsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtzb3VyY2VzLCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBba2V5XTogJ1tdJyB9KV0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKFtzb3VyY2VzLCBzb3VyY2VdKSA9PiBzb3VyY2VzLmNvbmNhdChwYXJzZShzb3VyY2Vba2V5XSwgW10pKSlcclxuICAgICAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKFtdKSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3cml0ZVNvdXJjZXMgKHNvdXJjZXMpIHtcclxuICAgICAgICBjb25zdCByZWdpc3RyeSA9IFtdXHJcbiAgICAgICAgY29uc3QgdXBkYXRlcyA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHNvdXJjZXMubGVuZ3RoIC8gMjApKTsgeCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGBzb3VyY2VzLSR7eH1gXHJcbiAgICAgICAgICAgIHJlZ2lzdHJ5LnB1c2goa2V5KVxyXG4gICAgICAgICAgICB1cGRhdGVzW2tleV0gPSBKU09OLnN0cmluZ2lmeShzb3VyY2VzLnNsaWNlKCh4IC0gMSkgKiAyMCwgeCAqIDIwKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdXBkYXRlcy5yZWdpc3RyeSA9IEpTT04uc3RyaW5naWZ5KHJlZ2lzdHJ5KVxyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHVwZGF0ZXMpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gYWRkU291cmNlIChzb3VyY2UpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgcmVhZFNvdXJjZXMoKVxyXG4gICAgICAgIGlmICghc291cmNlcy5zb21lKCh7dXJsLCBtYW5nYUlkfSkgPT4gc291cmNlLnVybCA9PT0gdXJsICYmIG1hbmdhSWQgPT09IHNvdXJjZS5tYW5nYUlkKSkge1xyXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goc291cmNlKVxyXG4gICAgICAgICAgICBhd2FpdCB3cml0ZVNvdXJjZXMoc291cmNlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZXNcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBkZWxldGVTb3VyY2UgKHNvdXJjZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IHJlYWRTb3VyY2VzKClcclxuICAgICAgICBjb25zdCBuZXdTb3VyY2VzID0gc291cmNlcy5maWx0ZXIoKHNvdXJjZSkgPT4gc291cmNlPy5pZCAhPT0gc291cmNlSWQpXHJcbiAgICAgICAgYXdhaXQgd3JpdGVTb3VyY2VzKG5ld1NvdXJjZXMpXHJcblxyXG4gICAgICAgIHJldHVybiBuZXdTb3VyY2VzXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaXNEaXJ0eSAoKSB7XHJcbiAgICAgICAgY29uc3QgeyB1cmxzLCBzb3VyY2VzIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIFsndXJscycsICdzb3VyY2VzJ10pXHJcblxyXG4gICAgICAgIHJldHVybiAhIXVybHMgfHwgISFzb3VyY2VzXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0RmlsdGVyZWRTb3J0ZWRVcmxzICgpIHtcclxuICAgICAgICBjb25zdCB7IGhpZGRlbkNoYXB0ZXJzOiBoaWRkZW5DaGFwdGVyc1N0cmluZywgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IDAgfSlcclxuICAgICAgICBjb25zdCB7IHVybHMgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgeyB1cmxzOiAnW10nIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UoaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIHt9KVxyXG4gICAgICAgIGNvbnN0IHVybExpc3QgPSBwYXJzZSh1cmxzLCBbXSlcclxuXHJcbiAgICAgICAgY29uc3QgY2hlY2tPbGQgPSAoY2hhcHRlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGlkZSAmJiBjaGFwdGVyLmNyZWF0ZWQgPCBoaWRlIHx8IGhpZGRlbkNoYXB0ZXJzW2NoYXB0ZXIuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgW29sZFVybHMsIG5ld1VybHNdID0gT2JqZWN0LnZhbHVlcyh1cmxMaXN0KVxyXG4gICAgICAgICAgICAuc29ydCgodXJsMSwgdXJsMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IHVybDIuY3JlYXRlZCAtIHVybDEuY3JlYXRlZFxyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpZmYpIDwgNTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh1cmwxKS5sb2NhbGVDb21wYXJlKHVybDIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlmZlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAucmVkdWNlKChbb2xkVXJscywgbmV3VXJsc10sIHVybCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrT2xkKHVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbGRVcmxzLnB1c2godXJsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VXJscy5wdXNoKHVybClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBbb2xkVXJscywgbmV3VXJsc11cclxuICAgICAgICAgICAgfSwgW1tdLCBbXV0pXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG9sZFVybHMsXHJcbiAgICAgICAgICAgIG5ld1VybHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZVVybCAoaWQpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JyB9KVxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UocmVzdWx0LmhpZGRlbkNoYXB0ZXJzLCB7fSlcclxuICAgICAgICBoaWRkZW5DaGFwdGVyc1tpZF0gPSB0cnVlXHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ2hhcHRlcnMpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZUFsbFVybHMgKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IHRpbWVzdGFtcCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyaXRlVXJscyAodXJscykge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLkxPQ0FMLCB7IHVybHM6IEpTT04uc3RyaW5naWZ5KHVybHMpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaW5pdCAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRlOiBmYWxzZSB9KVxyXG4gICAgICAgIGlmICghaGlkZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKClcclxuICAgICAgICAgICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMClcclxuICAgICAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGU6IHRvZGF5LmdldFRpbWUoKX0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldE1heE9sZCAobWF4T2xkKSB7XHJcbiAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5MT0NBTCwgeyBtYXhPbGQgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRNYXhPbGQgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbWF4T2xkIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIHsgbWF4T2xkOiAyNSB9KVxyXG4gICAgICAgIHJldHVybiBtYXhPbGRcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBzZXRMaW5rIChsaW5rKSB7XHJcbiAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGxpbmsgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRMaW5rICgpIHtcclxuICAgICAgICBjb25zdCB7IGxpbmsgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCBbJ2xpbmsnXSlcclxuICAgICAgICByZXR1cm4gbGlua1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEhpZGUgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZTogMCB9KVxyXG4gICAgICAgIHJldHVybiBoaWRlXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gd3JpdGVMb2NhbFNldHRpbmdzIChzZXR0aW5ncykge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLkxPQ0FMLCB7IGxvY2FsU2V0dGluZ3M6IEpTT04uc3RyaW5naWZ5KHNldHRpbmdzKSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldExvY2FsU2V0dGluZ3MgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbG9jYWxTZXR0aW5ncyB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLkxPQ0FMLCB7IGxvY2FsU2V0dGluZ3M6ICd7fScgfSlcclxuICAgICAgICByZXR1cm4gcGFyc2UobG9jYWxTZXR0aW5ncywge30pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TGlua0RhdGEgKCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCByZWFkU291cmNlcygpXHJcbiAgICAgICAgY29uc3QgeyBoaWRkZW5DaGFwdGVyczogaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIGhpZGUgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nLCBoaWRlOiAwIH0pXHJcbiAgICAgICAgY29uc3QgaGlkZGVuQ2hhcHRlcnMgPSBwYXJzZShoaWRkZW5DaGFwdGVyc1N0cmluZywge30pXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNvdXJjZXM6IHNvdXJjZXMubWFwKChzb3VyY2UpID0+IHNvdXJjZS5pZCksXHJcbiAgICAgICAgICAgIGhpZGRlbkNoYXB0ZXJzLFxyXG4gICAgICAgICAgICBoaWRlOiBOdW1iZXIoaGlkZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2V0TGlua0RhdGEgKHtzb3VyY2VzLCBoaWRkZW5DaGFwdGVycywgaGlkZX0pIHtcclxuICAgICAgICBjb25zdCBzdG9yZWRTb3VyY2VzID0gKGF3YWl0IHJlYWRTb3VyY2VzKCkpLnJlZHVjZSgoc3MsIHNvdXJjZSkgPT4gc291cmNlID8gKHsuLi5zcywgW3NvdXJjZS5pZF06IHRydWV9KSA6IHNzLCB7fSlcclxuICAgICAgICBjb25zdCBoYXNDaGFuZ2VkU291cmNlcyA9IE9iamVjdC5rZXlzKHN0b3JlZFNvdXJjZXMpLmxlbmd0aCAhPT0gc291cmNlcy5sZW5ndGggfHxcclxuICAgICAgICAgICAgc291cmNlcy5zb21lKChzb3VyY2UpID0+ICFzdG9yZWRTb3VyY2VzW3NvdXJjZS5pZF0pXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbUHJvbWlzZS5yZXNvbHZlKCldXHJcbiAgICAgICAgaWYgKGhhc0NoYW5nZWRTb3VyY2VzKSB7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2god3JpdGVTb3VyY2VzKHNvdXJjZXMpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoaWRkZW4gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JywgaGlkZTogMCB9KVxyXG4gICAgICAgIGlmIChoaWRkZW4uaGlkZGVuQ2hhcHRlcnMgIT09IEpTT04uc3RyaW5naWZ5KGhpZGRlbkNoYXB0ZXJzKSB8fCBTdHJpbmcoaGlkZGVuLmhpZGUpICE9PSBTdHJpbmcoaGlkZSkpIHtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHtcclxuICAgICAgICAgICAgICAgIGhpZGRlbkNoYXB0ZXJzOiBKU09OLnN0cmluZ2lmeShoaWRkZW5DaGFwdGVycyksXHJcbiAgICAgICAgICAgICAgICBoaWRlXHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzb3VyY2VzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRTb3VyY2VzLFxyXG4gICAgICAgICAgICBpbXBvcnQ6IHdyaXRlU291cmNlcyxcclxuICAgICAgICAgICAgYWRkOiBhZGRTb3VyY2UsXHJcbiAgICAgICAgICAgIGRlbGV0ZTogZGVsZXRlU291cmNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICBsb2NhbDoge1xyXG4gICAgICAgICAgICAgICAgcmVhZDogZ2V0TG9jYWxTZXR0aW5ncyxcclxuICAgICAgICAgICAgICAgIHNldDogd3JpdGVMb2NhbFNldHRpbmdzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzRGlydHksXHJcbiAgICAgICAgdXJsczoge1xyXG4gICAgICAgICAgICByZWFkOiBnZXRGaWx0ZXJlZFNvcnRlZFVybHMsXHJcbiAgICAgICAgICAgIGhpZGU6IGhpZGVVcmwsXHJcbiAgICAgICAgICAgIGhpZGVBbGw6IGhpZGVBbGxVcmxzLFxyXG4gICAgICAgICAgICBpbXBvcnQ6IHdyaXRlVXJscyxcclxuICAgICAgICAgICAgc2V0TWF4T2xkLFxyXG4gICAgICAgICAgICBnZXRNYXhPbGQsXHJcbiAgICAgICAgICAgIGdldEhpZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2hhbmdlOiBzdG9yYWdlLmFkZExpc3RlbmVyLFxyXG4gICAgICAgIGxpbms6IHtcclxuICAgICAgICAgICAgc2V0OiBzZXRMaW5rLFxyXG4gICAgICAgICAgICByZWFkOiBnZXRMaW5rLFxyXG4gICAgICAgICAgICBsb2NhbDogZ2V0TGlua0RhdGEsXHJcbiAgICAgICAgICAgIHNldExvY2FsOiBzZXRMaW5rRGF0YVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVuZGVySG9zdExpc3QgKF9kYiwgYXBpKSB7XHJcbiAgICBjb25zdCB7IEhvc3RzIH0gPSBhcGlcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEhvc3RzLnJlYWQoKVxyXG4gICAgY29uc3QgaG9zdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob3N0cycpXHJcbiAgICBpZiAocmVzdWx0LnZhbGlkKSB7XHJcbiAgICAgICAgY29uc3QgaG9zdHMgPSByZXN1bHQucGF5bG9hZFxyXG5cclxuICAgICAgICBjb25zdCBob3N0TGlzdCA9IGhvc3RzLnN0YWJsZVxyXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gU3RyaW5nKGE/Lm5hbWUpLmxvY2FsZUNvbXBhcmUoYj8ubmFtZSkpXHJcbiAgICAgICAgICAgIC5tYXAoKGhvc3QpID0+IGA8YSBocmVmPVwiJHtob3N0LnVybH1cIj4ke2hvc3QubmFtZX08L2E+YCkuam9pbignPHNwYW4+LCA8L3NwYW4+JylcclxuICAgICAgICBob3N0Q29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGg2PlN1cHBvcnRlZCBQYWdlczwvaDY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5rLWxpc3RcIj4ke2hvc3RMaXN0fTwvZGl2PlxyXG4gICAgICAgIGBcclxuXHJcbiAgICAgICAgaWYgKGhvc3RzLnVuc3RhYmxlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBob3N0TGlzdCA9IGhvc3RzLnVuc3RhYmxlXHJcbiAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gU3RyaW5nKGE/Lm5hbWUpLmxvY2FsZUNvbXBhcmUoYj8ubmFtZSkpXHJcbiAgICAgICAgICAgICAgICAubWFwKChob3N0KSA9PiBgPGEgaHJlZj1cIiR7aG9zdC51cmx9XCI+JHtob3N0Lm5hbWV9PC9hPmApLmpvaW4oJzxzcGFuPiwgPC9zcGFuPicpXHJcbiAgICAgICAgICAgIGhvc3RDb250YWluZXIuaW5uZXJIVE1MICs9IGBcclxuICAgICAgICAgICAgICAgIDxwPlRoZXNlIFBhZ2VzIGhhZCBzb21lIHByb2JsZW1zIHJlY2VudGx5ICZuZGFzaDsgdGhleSBtaWdodCBvciBtaWdodCBub3Qgd29yazo8L3A+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluay1saXN0XCI+JHtob3N0TGlzdH08L2Rpdj5cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgc2F2ZUFzIGZyb20gJ3NhdmUtYXMnXHJcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRJbXBvcnRIYW5kbGVycyAoZGIpIHtcclxuICAgIGNvbnN0IGltcG9ydEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1wb3J0JylcclxuICAgIGNvbnN0IGV4cG9ydEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhwb3J0JylcclxuXHJcbiAgICBpbXBvcnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdXHJcbiAgICAgICAgY29uc3QgZnIgPSBuZXcgRmlsZVJlYWRlcigpXHJcbiAgICAgICAgZnIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlcyA9IHBhcnNlKGZyLnJlc3VsdCwgW10pXHJcbiAgICAgICAgICAgIGNvbnN0IGNsZWFuID0gc291cmNlcy5maWx0ZXIoKHNvdXJjZSkgPT4gc291cmNlPy50aXRsZSAmJiBzb3VyY2UudXJsICYmIHNvdXJjZS5tYW5nYUlkKVxyXG4gICAgICAgICAgICBpZiAoY2xlYW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBkYi5zb3VyY2VzLmltcG9ydChjbGVhbilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbXBvcnRFbGVtLmZpbGVzID0gbnVsbFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZnIucmVhZEFzVGV4dChmaWxlKVxyXG4gICAgfSlcclxuXHJcbiAgICBleHBvcnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGRiLnNvdXJjZXMucmVhZCgpXHJcbiAgICAgICAgICAgIC50aGVuKChzb3VyY2VzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KHNvdXJjZXMpXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vanNvbicgfSlcclxuICAgICAgICAgICAgICAgIHNhdmVBcyhibG9iLCAnbWFuZ2Fwb2xsLmpzb24nKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuIiwiaW1wb3J0IHsgZ2V0TGlua1F1ZXJ5LCBsaW5rSWZVbmxpbmtlZCB9IGZyb20gJy4vc2V0dGluZ3MnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJNZW51TGlzdGVuZXJzIChkYiwgQXBpKSB7XHJcbiAgICBjb25zdCBpbXBvcnRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmltcG9ydCcpXHJcbiAgICBjb25zdCBwb3B1cFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwVGl0bGUnKVxyXG4gICAgY29uc3QgYm9va21hcmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZCcpXHJcbiAgICBjb25zdCB1cmxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybHMnKVxyXG4gICAgY29uc3QgY2hhcHRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcHRlcnMnKVxyXG4gICAgY29uc3QgYWRkU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRTZWN0aW9uJylcclxuICAgIGNvbnN0IHNvdXJjZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291cmNlcycpXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXR0aW5ncycpXHJcbiAgICBjb25zdCBzZXR0aW5nc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MnKVxyXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZ3Jlc3MnKVxyXG4gICAgY29uc3QgaW50cm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50cm8nKVxyXG5cclxuICAgIGNvbnN0IG9wZW5DaGFwdGVycyA9ICgpID0+IHtcclxuICAgICAgICBkYi5zb3VyY2VzLnJlYWQoKVxyXG4gICAgICAgICAgICAudGhlbigoc291cmNlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaW50cm8uc3R5bGUuZGlzcGxheSA9IHNvdXJjZXMubGVuZ3RoID8gJ25vbmUnIDogJ2ZsZXgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgc291cmNlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB1cmxzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHByb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIGNoYXB0ZXJzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBib29rbWFya3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgcG9wdXBUaXRsZS5pbm5lclRleHQgPSAnQ2hhcHRlcnMnXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3BlblNldHRpbmdzID0gKCkgPT4ge1xyXG4gICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzb3VyY2VzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBpbXBvcnRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBhZGRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHVybHMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHBvcHVwVGl0bGUuaW5uZXJUZXh0ID0gJ1NldHRpbmdzJ1xyXG4gICAgICAgIGJvb2ttYXJrcy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBjaGFwdGVycy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICB9XHJcblxyXG4gICAgY2hhcHRlcnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuQ2hhcHRlcnMpXHJcblxyXG4gICAgYm9va21hcmtzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzb3VyY2VzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgdXJscy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcG9wdXBUaXRsZS5pbm5lclRleHQgPSAnQm9va21hcmtzJ1xyXG4gICAgICAgIGJvb2ttYXJrcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgY2hhcHRlcnMuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICB9KVxyXG5cclxuICAgIHNldHRpbmdzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblNldHRpbmdzKVxyXG5cclxuICAgIGlmIChnZXRMaW5rUXVlcnkoKSkge1xyXG4gICAgICAgIG9wZW5TZXR0aW5ncygpXHJcbiAgICAgICAgbGlua0lmVW5saW5rZWQoZGIsIEFwaSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG9wZW5DaGFwdGVycygpXHJcbiAgICB9XHJcbn1cclxuIiwiY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZ3Jlc3MnKVxyXG5cclxubGV0IGxvY2tlZCA9IGZhbHNlXHJcblxyXG5leHBvcnQgY29uc3QgcmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIgPSAodXBkYXRlTm93KSA9PiB7XHJcbiAgICBwcm9ncmVzcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB1cGRhdGVOb3coKVxyXG4gICAgICAgIG1hcmtSZWZyZXNoZWQoKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1hcmtSZWZyZXNoZWQgPSAoKSA9PiB7XHJcbiAgICBwcm9ncmVzcy5pbm5lckhUTUwgPSAnKFJlZnJlc2hlZCEpJ1xyXG4gICAgcHJvZ3Jlc3MuZGF0YXNldC5iZWZvcmUgPSAnKFJlZnJlc2hlZCEpJ1xyXG4gICAgbG9ja2VkID0gdHJ1ZVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbG9ja2VkID0gZmFsc2VcclxuICAgICAgICBwcm9ncmVzcy5kYXRhc2V0LmJlZm9yZSA9ICcoUmVmcmVzaCBub3chKSdcclxuICAgIH0sIDE1MDApXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVQcm9ncmVzcyA9IChfbGFzdFBpbmcsIG5leHRQaW5nKSA9PiB7XHJcbiAgICBpZiAoIWxvY2tlZCkge1xyXG4gICAgICAgIGNvbnN0IHJlbWFpbmluZyA9IG5leHRQaW5nIC0gRGF0ZS5ub3coKVxyXG5cclxuICAgICAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5tYXgoTWF0aC5yb3VuZChyZW1haW5pbmcgLyAxMDAwKSwgMClcclxuXHJcbiAgICAgICAgcHJvZ3Jlc3MuaW5uZXJIVE1MID0gYChOZXh0IHJlZnJlc2g6ICR7c2Vjb25kc31zKWBcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU2NoZWR1bGUgPSAoeyBpc0FjdGl2ZSA9IGZhbHNlLCBpbnRlcnZhbCA9IDAsIGNhbGxiYWNrID0gRnVuY3Rpb24ucHJvdG90eXBlLCB1cGRhdGVyIH0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IG5leHRQaW5nID0gMFxyXG4gICAgbGV0IGxhc3RQaW5nID0gMFxyXG4gICAgY29uc3QgY2FsbENhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChuZXh0UGluZyAmJiBuZXh0UGluZyA8PSBEYXRlLm5vdygpKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSBuZXh0UGluZ1xyXG4gICAgICAgICAgICBuZXh0UGluZyA9IG5leHRQaW5nICsgaW50ZXJ2YWwgPiBEYXRlLm5vdygpID8gbmV4dFBpbmcgKyBpbnRlcnZhbCA6IERhdGUubm93KCkgKyBpbnRlcnZhbFxyXG4gICAgICAgIH1cclxuICAgICAgICB0eXBlb2YgdXBkYXRlciA9PT0gJ2Z1bmN0aW9uJyAmJiB1cGRhdGVyKGxhc3RQaW5nLCBuZXh0UGluZylcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNBY3RpdmUgJiYgaW50ZXJ2YWwpIHtcclxuICAgICAgICBuZXh0UGluZyA9IERhdGUubm93KCkgLSAxXHJcbiAgICAgICAgY2FsbENhbGxiYWNrKClcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbChjYWxsQ2FsbGJhY2ssIDEwMClcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNldEludGVydmFsIChuZXdJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5ld0ludGVydmFsICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1c2UgYSBudW1iZXInKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gbmV4dFBpbmcgLSBpbnRlcnZhbCArIG5ld0ludGVydmFsXHJcbiAgICAgICAgICAgIGludGVydmFsID0gbmV3SW50ZXJ2YWxcclxuICAgICAgICAgICAgY2FsbENhbGxiYWNrKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldENhbGxiYWNrIChjYikge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gRGF0ZS5ub3coKSArIGludGVydmFsXHJcbiAgICAgICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoY2FsbENhbGxiYWNrLCAxMDApXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmlnZ2VySW5zdGFudGx5ICgpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IERhdGUubm93KClcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBEYXRlLm5vdygpICsgaW50ZXJ2YWxcclxuICAgICAgICAgICAgdHlwZW9mIHVwZGF0ZXIgPT09ICdmdW5jdGlvbicgJiYgdXBkYXRlcihsYXN0UGluZywgbmV4dFBpbmcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wICgpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSAwXHJcbiAgICAgICAgICAgIGxhc3RQaW5nID0gMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBsaW5rRmllbGRzID0gWydoaWRlJywgJ2hpZGRlbkNoYXB0ZXJzJywgJ3NvdXJjZXMnXVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0S2V5IChrZXkgPSAnJykge1xyXG4gICAgcmV0dXJuIGAke2tleS5zbGljZSgwLCA1KX0tJHtrZXkuc2xpY2UoNSwgMTApfS0ke2tleS5zbGljZSgxMCwgMTUpfWBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmtIZWxwZXJzIChkYiwgQXBpKSB7XHJcbiAgICBhc3luYyBmdW5jdGlvbiBwdXNoTGlua1VwZGF0ZSAoY2hhbmdlcykge1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZXNldCA9IGxpbmtGaWVsZHMuZmlsdGVyKChrZXkpID0+IE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUoKGNoYW5nZSkgPT4gY2hhbmdlLmluY2x1ZGVzKGtleSkpKVxyXG5cclxuICAgICAgICBpZiAoY2hhbmdlc2V0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKCkgfHwge31cclxuICAgICAgICAgICAgY29uc3QgbG9jYWwgPSBhd2FpdCBkYi5saW5rLmxvY2FsKCkgfHwge31cclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlID0ge31cclxuICAgICAgICAgICAgaWYgKGNoYW5nZXNldC5pbmNsdWRlcygnaGlkZScpKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUuaGlkZSA9IGxvY2FsLmhpZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc2V0LmluY2x1ZGVzKCdoaWRkZW5DaGFwdGVycycpKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUuaGlkZGVuQ2hhcHRlcnMgPSBsb2NhbC5oaWRkZW5DaGFwdGVyc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzZXQuaW5jbHVkZXMoJ3NvdXJjZXMnKSkge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlLnNvdXJjZXMgPSBsb2NhbC5zb3VyY2VzXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyh1cGRhdGUpLmxlbmd0aCAmJiBsaW5rLmtleSkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgQXBpLkxpbmsudXBkYXRlKGxpbmsua2V5LCB1cGRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnZhbGlkICYmIGRiLmxpbmsuc2V0KHsga2V5OiByZXMucGF5bG9hZC5rZXkgfSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hMaW5rVXBkYXRlICgpIHtcclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuXHJcbiAgICAgICAgaWYgKGxpbmspIHtcclxuICAgICAgICAgICAgQXBpLkxpbmsucmVhZChsaW5rLmtleSwgbGluay5sYXN0TW9kaWZpZWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy52YWxpZCAmJiByZXMucGF5bG9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5saW5rLnNldExvY2FsKHJlcy5wYXlsb2FkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwdXNoTGlua1VwZGF0ZSxcclxuICAgICAgICBmZXRjaExpbmtVcGRhdGVcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNWYWxpZExpbmtLZXkgKGtleSkge1xyXG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xlYW5LZXkgPSBrZXkucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJylcclxuICAgIGlmIChjbGVhbktleS5sZW5ndGggPT09IDE1KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmtRdWVyeSAoKSB7XHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpXHJcblxyXG4gICAgaWYgKGlzVmFsaWRMaW5rS2V5KHVybFBhcmFtcy5nZXQoJ2xpbmsnKSkpIHtcclxuICAgICAgICByZXR1cm4gdXJsUGFyYW1zLmdldCgnbGluaycpLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsaW5rSWZVbmxpbmtlZCAoZGIsIGFwaSkge1xyXG4gICAgY29uc3Qga2V5ID0gZ2V0TGlua1F1ZXJ5KClcclxuXHJcbiAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudExpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG5cclxuICAgICAgICBpZiAoIWN1cnJlbnRMaW5rIHx8ICFjdXJyZW50TGluay5rZXkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlua0lucHV0MSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0xJylcclxuICAgICAgICAgICAgY29uc3QgbGlua0lucHV0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0yJylcclxuICAgICAgICAgICAgY29uc3QgbGlua0lucHV0MyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0zJylcclxuXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSBrZXkuc2xpY2UoMCwgNSlcclxuICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IGtleS5zbGljZSg1LCAxMClcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IGtleS5zbGljZSgxMCwgMTUpXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBjb25uZWN0VG9MaW5rKGtleSwgYXBpLCBkYilcclxuXHJcbiAgICAgICAgICAgIGlmIChsaW5rICYmIGxpbmsua2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rTnVtYmVyVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWlkJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluaycpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rTGlua1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXRleHQnKVxyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5saW5rLXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rVGV4dC5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0xpbmsuaW5uZXJUZXh0ID0gYGh0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20/bGluaz0ke2xpbmsua2V5fWBcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rLmhyZWYgPSBgaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbT9saW5rPSR7bGluay5rZXl9YFxyXG4gICAgICAgICAgICAgICAgbGlua051bWJlclRleHQuaW5uZXJUZXh0ID0gYCR7bGluay5rZXkuc2xpY2UoMCwgNSl9LSR7bGluay5rZXkuc2xpY2UoNSwgMTApfS0ke2xpbmsua2V5LnNsaWNlKDEwKX1gXHJcbiAgICAgICAgICAgICAgICBsaW5rTnVtYmVyVGV4dC5zdHlsZS5jb2xvciA9ICcjMDAwYzIxJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZvcm1hdEtleShjdXJyZW50TGluay5rZXkpICE9PSBmb3JtYXRLZXkoa2V5KSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rTGlua1dhcm4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXdhcm5pbmcnKVxyXG4gICAgICAgICAgICBjb25zdCB3YXJuTGlua0N1cnJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2Fybi1jdXJyZW50LWxpbmsnKVxyXG4gICAgICAgICAgICBjb25zdCB3YXJuTGlua05ldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3YXJuLW5ldy1saW5rJylcclxuXHJcbiAgICAgICAgICAgIGxpbmtMaW5rV2Fybi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgICAgIHdhcm5MaW5rQ3VycmVudC5pbm5lclRleHQgPSBmb3JtYXRLZXkoY3VycmVudExpbmsua2V5KVxyXG4gICAgICAgICAgICB3YXJuTGlua05ldy5pbm5lclRleHQgPSBmb3JtYXRLZXkoa2V5KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY29ubmVjdFRvTGluayAoa2V5LCBhcGksIGRiKSB7XHJcbiAgICBjb25zdCB7IExpbmsgfSA9IGFwaVxyXG4gICAgY29uc3QgbGlua0Vycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstZXJyb3InKVxyXG4gICAgY29uc3QgbGlua1Byb2dyZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstcHJvZ3Jlc3MnKVxyXG4gICAgY29uc3QgY3JlYXRlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctbGluay1idXR0b24nKVxyXG4gICAgY29uc3QgbGlua0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWJ1dHRvbicpXHJcbiAgICBsaW5rRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgbGlua1Byb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICBjcmVhdGVMaW5rLmRpc2FibGVkID0gdHJ1ZVxyXG4gICAgbGlua0J1dHRvbi5kaXNhYmxlZCA9IHRydWVcclxuXHJcbiAgICBjb25zdCBsaW5rUmVzdWx0ID0gYXdhaXQgTGluay5yZWFkKGtleSlcclxuICAgIGNyZWF0ZUxpbmsuZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgbGlua0J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICBsaW5rUHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgaWYgKGxpbmtSZXN1bHQ/LnZhbGlkKSB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGxpbmtSZXN1bHQucGF5bG9hZFxyXG4gICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0KHsga2V5OiBsaW5rLmtleSB9KVxyXG4gICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0TG9jYWwobGluaylcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpbmtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxpbmtFcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICB9XHJcbiAgICBjb25zdCBsaW5rTGlua1dhcm4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXdhcm5pbmcnKVxyXG5cclxuICAgIGlmIChsaW5rTGlua1dhcm4pIHtcclxuICAgICAgICBsaW5rTGlua1dhcm4uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2V0dGluZ3NIYW5kbGVycyAoZGIsIGFwaSkge1xyXG4gICAgY29uc3QgeyBMaW5rIH0gPSBhcGlcclxuXHJcbiAgICBjb25zdCBjcmVhdGVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1saW5rLWJ1dHRvbicpXHJcbiAgICBjb25zdCB1cGRhdGVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwZGF0ZS1saW5raW5nJylcclxuICAgIGNvbnN0IGxpbmtOdW1iZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstaWQnKVxyXG4gICAgY29uc3QgbGlua0xpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rJylcclxuICAgIGNvbnN0IGxpbmtMaW5rVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmstdGV4dCcpXHJcbiAgICBjb25zdCBsaW5raW5nU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLXNlY3Rpb24nKVxyXG4gICAgY29uc3QgdW5saW5rU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bmxpbmstc2VjdGlvbicpXHJcbiAgICBjb25zdCB1bmxpbmtCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5saW5rLWJ1dHRvbicpXHJcbiAgICBjb25zdCBsaW5rQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstYnV0dG9uJylcclxuICAgIGNvbnN0IGxpbmtJbnB1dDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMScpXHJcbiAgICBjb25zdCBsaW5rSW5wdXQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTInKVxyXG4gICAgY29uc3QgbGlua0lucHV0MyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0zJylcclxuXHJcbiAgICBsaW5rSW5wdXQxLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDEudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgMTUpXHJcbiAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9IG51bWJlci5zbGljZSgwLCA1KVxyXG4gICAgICAgIGlmIChudW1iZXIubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gbnVtYmVyLnNsaWNlKDUsIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA+IDEwKSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuZm9jdXMoKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnNldFNlbGVjdGlvblJhbmdlKG51bWJlci5sZW5ndGggLSAxMCwgbnVtYmVyLmxlbmd0aCAtIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW1iZXIubGVuZ3RoID49IDUpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0Mi5mb2N1cygpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIuc2V0U2VsZWN0aW9uUmFuZ2UobnVtYmVyLmxlbmd0aCAtIDUsIG51bWJlci5sZW5ndGggLSA1KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rSW5wdXQyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDIudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgMTApXHJcbiAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IG51bWJlci5zbGljZSgwLCA1KVxyXG4gICAgICAgIGlmIChudW1iZXIubGVuZ3RoID49IDUpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IG51bWJlci5zbGljZSg1LCAxMClcclxuICAgICAgICAgICAgbGlua0lucHV0My5mb2N1cygpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuc2V0U2VsZWN0aW9uUmFuZ2UobnVtYmVyLmxlbmd0aCAtIDUsIG51bWJlci5sZW5ndGggLSA1KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rSW5wdXQzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDMudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgNSlcclxuICAgICAgICBpZiAobGlua0lucHV0My52YWx1ZSAhPT0gbnVtYmVyLnNsaWNlKDAsIDUpKSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoMCwgNSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyaXRlU3RhdGVUb0RvbSAobGluaykge1xyXG4gICAgICAgIGxpbmtpbmdTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJ25vbmUnIDogJydcclxuICAgICAgICB1bmxpbmtTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJycgOiAnbm9uZSdcclxuICAgICAgICBpZiAobGlua0xpbmtUZXh0KSB7XHJcbiAgICAgICAgICAgIGxpbmtMaW5rVGV4dC5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICcnIDogJ25vbmUnXHJcbiAgICAgICAgICAgIGxpbmtMaW5rLnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJycgOiAnbm9uZSdcclxuICAgICAgICAgICAgbGlua0xpbmsuaW5uZXJUZXh0ID0gbGluayA/IGBodHRwczovL21hbmdhLmZvY2hsYWMuY29tP2xpbms9JHtsaW5rLmtleX1gIDogJydcclxuICAgICAgICAgICAgbGlua0xpbmsuaHJlZiA9IGxpbmsgPyBgaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbT9saW5rPSR7bGluay5rZXl9YCA6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpbmtOdW1iZXJUZXh0LmlubmVyVGV4dCA9IGxpbmsgPyBmb3JtYXRLZXkobGluay5rZXkpIDogJ1VubGlua2VkJ1xyXG4gICAgICAgIGxpbmtOdW1iZXJUZXh0LnN0eWxlLmNvbG9yID0gbGluayA/ICcjMDAwYzIxJyA6ICcjYzNjYmQyJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgd3JpdGVTdGF0ZVRvRG9tKGxpbmspXHJcblxyXG4gICAgaWYgKHVwZGF0ZUxpbmspIHtcclxuICAgICAgICB1cGRhdGVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBnZXRMaW5rUXVlcnkoKVxyXG5cclxuICAgICAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9IGtleS5zbGljZSgwLCA1KVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0ga2V5LnNsaWNlKDUsIDEwKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0ga2V5LnNsaWNlKDEwLCAxNSlcclxuICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXQobnVsbClcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluay13YXJuaW5nJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20oKVxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb25uZWN0VG9MaW5rKGtleSwgYXBpLCBkYilcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKHJlc3VsdClcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rTGlua1dhcm4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1lcnJvcicpXHJcblxyXG4gICAgICAgIGlmIChsaW5rTGlua1dhcm4pIHtcclxuICAgICAgICAgICAgbGlua0xpbmtXYXJuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICAgICAgaWYgKCFsaW5rKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtEYXRhID0gYXdhaXQgZGIubGluay5sb2NhbCgpXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0xpbmtSZXN1bHQgPSBhd2FpdCBMaW5rLmluc2VydChsaW5rRGF0YSlcclxuICAgICAgICAgICAgaWYgKG5ld0xpbmtSZXN1bHQ/LnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gbmV3TGlua1Jlc3VsdC5wYXlsb2FkXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldCh7IGtleTogbGluay5rZXkgfSlcclxuICAgICAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbShsaW5rKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHVubGlua0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgICAgICBpZiAobGluaykge1xyXG4gICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldChudWxsKVxyXG4gICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20odW5kZWZpbmVkKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsaW5rSW5wdXQxLnZhbHVlfSR7bGlua0lucHV0Mi52YWx1ZX0ke2xpbmtJbnB1dDMudmFsdWV9YFxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb25uZWN0VG9MaW5rKGtleSwgYXBpLCBkYilcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKHJlc3VsdClcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNvdXJjZVJlbmRlcmVyIChkYikge1xyXG4gICAgY29uc3Qgc291cmNlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VyY2VzJylcclxuXHJcbiAgICBzb3VyY2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2xvc2VzdCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93IC5hY3Rpb24uZGVsZXRlJylcclxuICAgICAgICBpZiAoY2xvc2VzdCAmJiBjbG9zZXN0LmRhdGFzZXRbJ2lkJ10gJiYgc291cmNlcy5jb250YWlucyhjbG9zZXN0KSkge1xyXG4gICAgICAgICAgICBkYi5zb3VyY2VzLmRlbGV0ZShjbG9zZXN0LmRhdGFzZXRbJ2lkJ10pXHJcbiAgICAgICAgICAgIGNsb3Nlc3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aW9uJylcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlbmRlclNvdXJjZXMgKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkYi5zb3VyY2VzLnJlYWQoKVxyXG5cclxuICAgICAgICBzb3VyY2VzLmlubmVySFRNTCA9IGRhdGFcclxuICAgICAgICAgICAgLnNvcnQoKHNvdXJjZTEsIHNvdXJjZTIpID0+IFN0cmluZyhzb3VyY2UxLnRpdGxlKS5sb2NhbGVDb21wYXJlKHNvdXJjZTI/LnRpdGxlKSlcclxuICAgICAgICAgICAgLm1hcCgoc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gU3RyaW5nKHNvdXJjZS51cmwpLnJlcGxhY2UoL2h0dHBzPzpcXC9cXC8vLCAnJykuc3BsaXQoJy8nKVswXVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICBgPGxpIGNsYXNzPVwicm93IHNvdXJjZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YVwiIHRpdGxlPVwiJHtgJHtzb3VyY2UudGl0bGV9ICgke3VybH0pYH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGl0bGVcIj4ke3NvdXJjZS50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hbmdhLWlkXCI+KCR7dXJsfSk8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlbGV0ZSBhY3Rpb25cIiBkYXRhLWlkPVwiJHtzb3VyY2UuaWR9XCI+RGVsZXRlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+YFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuam9pbignXFxuJylcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcjogKCkgPT4gcmVuZGVyU291cmNlcygpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcGFkIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cmxSZW5kZXJlciAoZGIpIHtcclxuICAgIGNvbnN0IHVybHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJscycpXHJcbiAgICBjb25zdCBpbnRybyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRybycpXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZSAoaWQpIHtcclxuICAgICAgICBjb25zdCB7IG5ld1VybHMsIG9sZFVybHMgfSA9IGF3YWl0IGRiLnVybHMucmVhZCgpXHJcbiAgICAgICAgaWYgKG5ld1VybHMubGVuZ3RoIDw9IDEgJiYgKCFuZXdVcmxzWzBdIHx8IG5ld1VybHNbMF0uaWQgPT09IGlkKSkge1xyXG4gICAgICAgICAgICBjb25zdCBsYXRlc3RDaGFwdGVyRGF0ZSA9IG9sZFVybHMuY29uY2F0KG5ld1VybHMpXHJcbiAgICAgICAgICAgICAgICAucmVkdWNlKChsY2QsIHVybCkgPT4gdXJsLmNyZWF0ZWQgPiBsY2QgPyB1cmwuY3JlYXRlZCA6IGxjZCwgMClcclxuXHJcbiAgICAgICAgICAgIGRiLnVybHMuaGlkZUFsbChsYXRlc3RDaGFwdGVyRGF0ZSArIDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkYi51cmxzLmhpZGUoaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVybHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjbG9zZXN0SGlkZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93IC5oaWRlJylcclxuXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RIaWRlICYmIGNsb3Nlc3RIaWRlLmRhdGFzZXRbJ2lkJ10gJiYgdXJscy5jb250YWlucyhjbG9zZXN0SGlkZSkpIHtcclxuICAgICAgICAgICAgYXdhaXQgaGlkZShjbG9zZXN0SGlkZS5kYXRhc2V0WydpZCddKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbG9zZXN0TGluayA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93Lm5ldyAubGluaycpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RMaW5rICYmIGNsb3Nlc3RMaW5rLmRhdGFzZXRbJ2lkJ10gJiYgdXJscy5jb250YWlucyhjbG9zZXN0TGluaykpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBhd2FpdCBoaWRlKGNsb3Nlc3RMaW5rLmRhdGFzZXRbJ2lkJ10pXHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKGNsb3Nlc3RMaW5rLmhyZWYsICdfYmxhbmsnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbG9zZXN0TW9yZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuYWN0aW9uLmxvYWQtbW9yZScpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RNb3JlICYmIHVybHMuY29udGFpbnMoY2xvc2VzdE1vcmUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heE9sZCA9IGF3YWl0IGRiLnVybHMuZ2V0TWF4T2xkKClcclxuICAgICAgICAgICAgYXdhaXQgZGIudXJscy5zZXRNYXhPbGQobWF4T2xkICsgMTAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoaWRlQWxsID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5oaWRlLWFsbCcpXHJcbiAgICAgICAgaWYgKGhpZGVBbGwgJiYgdXJscy5jb250YWlucyhoaWRlQWxsKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBkYi51cmxzLmhpZGVBbGwoRGF0ZS5ub3coKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdG9wID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy50b3AnKVxyXG4gICAgICAgIGlmICh0b3AgJiYgdXJscy5jb250YWlucyh0b3ApKSB7XHJcbiAgICAgICAgICAgIHVybHMuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgbGV0IG1heFNjcm9sbCA9IDBcclxuICAgIHVybHMuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHVybHMub2Zmc2V0SGVpZ2h0ICsgdXJscy5zY3JvbGxUb3BcclxuICAgICAgICBpZiAodXJscy5zY3JvbGxIZWlnaHQgLSBzY3JvbGxIZWlnaHQgPD0gNTAgJiYgbWF4U2Nyb2xsICE9PSB1cmxzLnNjcm9sbEhlaWdodCkge1xyXG4gICAgICAgICAgICBtYXhTY3JvbGwgPSB1cmxzLnNjcm9sbEhlaWdodFxyXG4gICAgICAgICAgICBjb25zdCBtYXhPbGQgPSBhd2FpdCBkYi51cmxzLmdldE1heE9sZCgpXHJcbiAgICAgICAgICAgIGRiLnVybHMuc2V0TWF4T2xkKG1heE9sZCArIDEwMClcclxuICAgICAgICB9XHJcbiAgICAgICAgY2hlY2tUb3BCdXR0b24oKVxyXG4gICAgfSlcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1RvcEJ1dHRvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVybHMuc2Nyb2xsVG9wID4gMCAmJiB1cmxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA9PT0gdXJscy5xdWVyeVNlbGVjdG9yKCcub2xkLWNoYXB0ZXJzJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSB7XHJcbiAgICAgICAgICAgIHVybHMucXVlcnlTZWxlY3RvcignLm9sZC1jaGFwdGVycyAudG9wJykuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1cmxzLnF1ZXJ5U2VsZWN0b3IoJy5vbGQtY2hhcHRlcnMgLnRvcCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVXJsUmVuZGVyZXIgKGlzT2xkKSB7XHJcbiAgICAgICAgcmV0dXJuIChjaGFwdGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShjaGFwdGVyLmNyZWF0ZWQpXHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdHJpbmcgPSBgJHtwYWQoZGF0ZS5nZXRIb3VycygpKX06JHtwYWQoZGF0ZS5nZXRNaW51dGVzKCkpfWBcclxuICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGAke3BhZChkYXRlLmdldERhdGUoKSl9LiR7cGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpfS4ke1N0cmluZyhkYXRlLmdldEZ1bGxZZWFyKCkpLnNsaWNlKC0yKX1gXHJcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxEYXRlID0gZGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gPT09IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdID8gdGltZVN0cmluZyA6IGRhdGVTdHJpbmdcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJyb3cke2lzT2xkID8gJyBvbGQnIDogJyBuZXcnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGlua1wiIGhyZWY9XCIke2NoYXB0ZXIudXJsfVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCIgZGF0YS1pZD1cIiR7Y2hhcHRlci5pZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtjaGFwdGVyLnRpdGxlfSAtIENoYXB0ZXIgJHtjaGFwdGVyLmNoYXB0ZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0ZS13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0ZVwiIHRpdGxlPVwiJHtgJHtkYXRlU3RyaW5nfSAke3RpbWVTdHJpbmd9YH1cIj4ke2Z1bGxEYXRlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoaWRlXCIgZGF0YS1pZD1cIiR7Y2hhcHRlci5pZH1cIj5IaWRlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvbGk+YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiByZW5kZXJVcmxzICgpIHtcclxuICAgICAgICBjb25zdCBtYXhPbGQgPSBhd2FpdCBkYi51cmxzLmdldE1heE9sZCgpXHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IGRiLnNvdXJjZXMucmVhZCgpXHJcbiAgICAgICAgY29uc3QgeyBuZXdVcmxzLCBvbGRVcmxzIH0gPSBhd2FpdCBkYi51cmxzLnJlYWQoKVxyXG4gICAgICAgIGNvbnN0IG5ld1Jvd3MgPSBuZXdVcmxzLm1hcChjcmVhdGVVcmxSZW5kZXJlcihmYWxzZSkpXHJcbiAgICAgICAgY29uc3Qgb2xkUm93cyA9IG9sZFVybHMubWFwKGNyZWF0ZVVybFJlbmRlcmVyKHRydWUpKVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHVybHMuaW5uZXJIVE1MID0gJydcclxuICAgICAgICAgICAgaW50cm8uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChuZXdSb3dzLmxlbmd0aCB8fCBvbGRSb3dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIHVybHMuaW5uZXJIVE1MID0gW11cclxuICAgICAgICAgICAgICAgIC5jb25jYXQobmV3Um93cy5sZW5ndGggPyAnPGxpIGNsYXNzPVwibmV3LWNoYXB0ZXJzXCI+TmV3IENoYXB0ZXJzIDxzcGFuIGNsYXNzPVwiYWN0aW9uIGhpZGUtYWxsXCI+SGlkZSBhbGw8L3NwYW4+PC9saT4nIDogW10pXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG5ld1Jvd3MpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KCc8bGkgY2xhc3M9XCJvbGQtY2hhcHRlcnNcIj5PbGQgQ2hhcHRlcnMgPHNwYW4gY2xhc3M9XCJhY3Rpb24gdG9wXCI+VG9wICYjODU5Mzs8L3NwYW4+PC9saT4nKVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdChvbGRSb3dzLnNsaWNlKDAsIG1heE9sZCkpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG9sZFJvd3MubGVuZ3RoID49IG1heE9sZCA/IFsnPGxpIGNsYXNzPVwiYWN0aW9uIGxvYWQtbW9yZVwiPkxvYWQgdXAgdG8gMTAwIG1vcmUgb2xkIGNoYXB0ZXJzLi4uPC9saT4nXSA6IFtdKVxyXG4gICAgICAgICAgICAgICAgLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gbmV3Um93cy5sZW5ndGggPyBgKCR7bmV3Um93cy5sZW5ndGh9KSBNYW5nYSBQb2xsYCA6ICdNYW5nYSBQb2xsJ1xyXG4gICAgICAgICAgICBjaGVja1RvcEJ1dHRvbigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIHVybHMuaW5uZXJIVE1MID0gJzxsaSBjbGFzcz1cInJvd1wiPk5vIENoYXB0ZXJzIGF2YWlsYWJsZS48L2xpPidcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnTWFuZ2EgUG9sbCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXI6ICgpID0+IHJlbmRlclVybHMoKVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBwYXJzZSAoc3RyaW5nLCBmYWxsYmFjaykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHJpbmcpXHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxsYmFja1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFkIChubykge1xyXG4gICAgcmV0dXJuICgnMDAnICsgbm8pLnNsaWNlKC0yKVxyXG59XHJcbiIsImltcG9ydCB7IEFQSSB9IGZyb20gJy4uL2NvbW1vbi9hcGknXHJcbmltcG9ydCB7IEFQSV9BRERSRVNTIH0gZnJvbSAnLi9jb25zdGFudHMnXHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9zdG9yYWdlJ1xyXG5cclxubGV0IGN1cnJlbnRTb3VyY2UgPSBudWxsXHJcblxyXG5jb25zdCBib29rbWFyayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib29rbWFyaycpXHJcbmNvbnN0IGJvb2ttYXJrVHJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9va21hcmstdHJhY2snKVxyXG5jb25zdCBib29rbWFya1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvb2ttYXJrLXRpdGxlJylcclxuXHJcbmNvbnN0IHsgU291cmNlIH0gPSBBUEkoQVBJX0FERFJFU1MpXHJcblxyXG5ib29rbWFya1RyYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYm9va21hcmsuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgYm9va21hcmtUaXRsZS5pbm5lclRleHQgPSAnJ1xyXG4gICAgU291cmNlLmluc2VydChjdXJyZW50U291cmNlKVxyXG4gICAgICAgIC50aGVuKChzb3VyY2UpID0+IHNvdXJjZSAmJiBkYi5zb3VyY2VzLmFkZChzb3VyY2UpKVxyXG4gICAgY3VycmVudFNvdXJjZSA9IG51bGxcclxufSlcclxuXHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihhc3luYyAocmVxdWVzdCkgPT4ge1xyXG4gICAgaWYgKHJlcXVlc3QuaWQgJiYgcmVxdWVzdC50aXRsZSAmJiByZXF1ZXN0LnVybCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCBkYi5zb3VyY2VzLnJlYWQoKVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZXMuc29tZSgoc291cmNlKSA9PiBzb3VyY2UudXJsID09PSByZXF1ZXN0LnVybCAmJiBTdHJpbmcoc291cmNlLm1hbmdhSWQpID09PSBTdHJpbmcocmVxdWVzdC5pZCkpKSB7XHJcbiAgICAgICAgICAgIGJvb2ttYXJrLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICAgICAgYm9va21hcmtUaXRsZS5pbm5lclRleHQgPSBgRG8geW91IHdhbnQgdG8gc3RhcnQgdHJhY2tpbmcgXCIke3JlcXVlc3QudGl0bGV9XCI/YFxyXG4gICAgICAgICAgICBjdXJyZW50U291cmNlID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogcmVxdWVzdC50eXBlLFxyXG4gICAgICAgICAgICAgICAgbWFuZ2FJZDogcmVxdWVzdC5pZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiByZXF1ZXN0LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgdXJsOiByZXF1ZXN0LnVybFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBib29rbWFyay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICBib29rbWFya1RpdGxlLmlubmVyVGV4dCA9ICcnXHJcbiAgICBjdXJyZW50U291cmNlID0gbnVsbFxyXG59KVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RCb29rbWFyayAoKSB7XHJcbiAgICBjaHJvbWUudGFicy5xdWVyeShcclxuICAgICAgICB7IGFjdGl2ZTogdHJ1ZSwgd2luZG93SWQ6IGNocm9tZS53aW5kb3dzLldJTkRPV19JRF9DVVJSRU5UIH0sXHJcbiAgICAgICAgKHRhYnMpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0YWJzWzBdLnVybC5pbmNsdWRlcygnY2hyb21lOi8vJykpIHtcclxuICAgICAgICAgICAgICAgIGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7IHRhcmdldDogeyB0YWJJZDogdGFic1swXS5pZCB9LCBmdW5jdGlvbjogdGVzdCB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXN0ICgpIHtcclxuICAgIGZ1bmN0aW9uIGRlY29kZUhUTUxFbnRpdGllcyAoc3RyKSB7XHJcbiAgICAgICAgaWYgKHN0ciAmJiB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoLzxzY3JpcHRbXj5dKj4oW1xcU1xcc10qPyk8XFwvc2NyaXB0Pi9nbWksICcnKVxyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvPFxcLz9cXHcoPzpbXlwiJz5dfFwiW15cIl0qXCJ8J1teJ10qJykqPi9nbWksICcnKVxyXG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IHN0clxyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC50ZXh0Q29udGVudFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwYXJzZSAoc3RyaW5nLCBmYWxsYmFjaykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZylcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbGxiYWNrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RGYW5Gb3ggKCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaCgvXlxcL21hbmdhXFwvW14vXSpcXC8vKT8uWzBdXHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWFkZXItaGVhZGVyLXRpdGxlLTEgYTpmaXJzdC1jaGlsZCcpPy5pbm5lclRleHQgfHxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldGFpbC1pbmZvLXJpZ2h0LXRpdGxlLWZvbnQnKT8uaW5uZXJUZXh0XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdmYW5mb3gnLFxyXG4gICAgICAgICAgICBpZDogdXJsID8gdXJsLnNwbGl0KCcvJylbMl0gOiBudWxsLFxyXG4gICAgICAgICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgICAgICAgdXJsOiB1cmwgPyBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7dXJsfWAgOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RBc3VyYSAoKSB7XHJcbiAgICAgICAgY29uc3QgYnJlYWRjcnVtcExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdvbFtpdGVtdHlwZT1cImh0dHA6Ly9zY2hlbWEub3JnL0JyZWFkY3J1bWJMaXN0XCJdIGFbaXRlbXByb3A9XCJpdGVtXCJdW2hyZWYqPVwiL2NvbWljcy9cIl0nKVxyXG4gICAgICAgIGNvbnN0IHVybCA9IGJyZWFkY3J1bXBMaW5rLmhyZWZcclxuICAgICAgICBjb25zdCBuYW1lID0gYnJlYWRjcnVtcExpbmsucXVlcnlTZWxlY3Rvcignc3BhbicpPy5pbm5lclRleHRcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ2FzdXJhJyxcclxuICAgICAgICAgICAgaWQ6IHVybD8uc3BsaXQoJy8nKVs0XSxcclxuICAgICAgICAgICAgdGl0bGU6IG5hbWUsXHJcbiAgICAgICAgICAgIHVybFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0TWFuZ2FkZXggKCkge1xyXG4gICAgICAgIGlmICgvdGl0bGVcXC9bXFxkLVxcd10qXFwvW1xcZC1cXHddKi8udGVzdCh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk/LlsyXVxyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hbmdhLWNvbnRhaW5lciAudGl0bGUgcCcpPy5pbm5lclRleHRcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnbWFuZ2FkZXgnLFxyXG4gICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIHVybDogaWQgPyBgaHR0cHM6Ly9hcGkubWFuZ2FkZXgub3JnL21hbmdhLyR7aWR9YCA6IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgvY2hhcHRlclxcL1tcXGQtXFx3XSpcXC9cXGQqLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EudGV4dC1wcmltYXJ5W2hyZWYqPVwiL3RpdGxlL1wiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBsaW5rPy5pbm5lclRleHRcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBsaW5rPy5ocmVmLnNwbGl0KCcvJyk/Lls0XVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdtYW5nYWRleCcsXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBpZCA/IGBodHRwczovL2FwaS5tYW5nYWRleC5vcmcvbWFuZ2EvJHtpZH1gIDogbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RMZXZpYXRoYW4gKCkge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LXRpdGxlIGgxJylcclxuICAgICAgICBjb25zdCB0aXRsZXMgPSBbXHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCJdJykpXHJcbiAgICAgICAgICAgICAgICAubWFwKChzY3JpcHQpID0+IHBhcnNlKHNjcmlwdC5pbm5lclRleHQpPy5oZWFkbGluZSkuZmluZCgoaCkgPT4gaCksXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFwdGVyLWhlYWRpbmcnKT8uaW5uZXJUZXh0Py5zcGxpdCgnIC0gJylbMF0sXHJcbiAgICAgICAgICAgIGhlYWRlciAmJiBBcnJheS5mcm9tKGhlYWRlci5jaGlsZE5vZGVzKS5yZWR1Y2UoKHRpdGxlLCBub2RlKSA9PiB0aXRsZSArIChub2RlLm5vZGVUeXBlID09PSAzID8gbm9kZS50ZXh0Q29udGVudCA6ICcnKSwgJycpLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0ZS10aXRsZScpPy50aXRsZVxyXG4gICAgICAgIF1cclxuICAgICAgICAgICAgLmZpbHRlcigodGl0bGUpID0+IHRpdGxlKVxyXG4gICAgICAgICAgICAucmVkdWNlKChtYXAsIHRpdGxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhbiA9IGRlY29kZUhUTUxFbnRpdGllcyh0aXRsZSkudHJpbSgpXHJcbiAgICAgICAgICAgICAgICBtYXBbY2xlYW5dID0gdHlwZW9mIG1hcFtjbGVhbl0gPT09ICdudW1iZXInID8gbWFwW2NsZWFuXSArIDEgOiAxXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwXHJcbiAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gT2JqZWN0LmtleXModGl0bGVzKS5zb3J0KCh0aXRsZTEsIHRpdGxlMikgPT4gdGl0bGVzW3RpdGxlMV0gLSB0aXRsZXNbdGl0bGUyXSlbMF1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5zcGxpdCgnLycpLnNsaWNlKDAsIDYpLmpvaW4oJy8nKVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnbGV2aWF0aGFuJyxcclxuICAgICAgICAgICAgaWQ6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuc3BsaXQoJy8nKVs1XSxcclxuICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgIHVybFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0TWFkYXJvICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBwYXJzZSAoc3RyaW5nLCBmYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsbGJhY2tcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaWRzID0gW1xyXG4gICAgICAgICAgICB3aW5kb3c/Lm1hbmdhPy5tYW5nYV9pZCxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhdGluZy1wb3N0LWlkJyk/LnZhbHVlLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3AtbWFuZ2EtYWN0aW9uLWJ1dHRvbicpPy5kYXRhc2V0Py5bJ3Bvc3QnXSxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYXB0ZXItc2VsZWN0aW9uJyk/LmRhdGFzZXQ/LlsnbWFuZ2EnXSxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hbmdhLWNoYXB0ZXJzLWhvbGRlcicpPy5kYXRhc2V0Py5bJ2lkJ10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYW5nYS1yZWFkaW5nLW5hdi1oZWFkJyk/LmRhdGFzZXQ/LlsnaWQnXSxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hbmdhLXJlYWRpbmctbmF2LWZvb3QnKT8uZGF0YXNldD8uWydpZCddXHJcbiAgICAgICAgXVxyXG4gICAgICAgICAgICAuZmlsdGVyKCh0aXRsZSkgPT4gdGl0bGUpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKG1hcCwgaWQpID0+IHtcclxuICAgICAgICAgICAgICAgIG1hcFtpZF0gPSB0eXBlb2YgbWFwW2lkXSA9PT0gJ251bWJlcicgPyBtYXBbaWRdICsgMSA6IDFcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXBcclxuICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgY29uc3QgaWQgPSBPYmplY3Qua2V5cyhpZHMpLnNvcnQoKGlkMSwgaWQyKSA9PiBpZHNbaWQxXSAtIGlkc1tpZDJdKVswXVxyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC10aXRsZSBoMScpXHJcbiAgICAgICAgY29uc3QgdGl0bGVzID0gW1xyXG4gICAgICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwiYXBwbGljYXRpb24vbGQranNvblwiXScpKVxyXG4gICAgICAgICAgICAgICAgLm1hcCgoc2NyaXB0KSA9PiBwYXJzZShzY3JpcHQuaW5uZXJUZXh0KT8uaGVhZGxpbmUpLmZpbmQoKGgpID0+IGgpLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcHRlci1oZWFkaW5nJyk/LmlubmVyVGV4dD8uc3BsaXQoJyAtICcpWzBdLFxyXG4gICAgICAgICAgICBoZWFkZXIgJiYgQXJyYXkuZnJvbShoZWFkZXIuY2hpbGROb2RlcykucmVkdWNlKCh0aXRsZSwgbm9kZSkgPT4gdGl0bGUgKyAobm9kZS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUudGV4dENvbnRlbnQgOiAnJyksICcnKSxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhdGUtdGl0bGUnKT8udGl0bGVcclxuICAgICAgICBdXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKHRpdGxlKSA9PiB0aXRsZSlcclxuICAgICAgICAgICAgLnJlZHVjZSgobWFwLCB0aXRsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xlYW4gPSBkZWNvZGVIVE1MRW50aXRpZXModGl0bGUpLnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgbWFwW2NsZWFuXSA9IHR5cGVvZiBtYXBbY2xlYW5dID09PSAnbnVtYmVyJyA/IG1hcFtjbGVhbl0gKyAxIDogMVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcFxyXG4gICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICBsZXQgdGl0bGUgPSBPYmplY3Qua2V5cyh0aXRsZXMpLnNvcnQoKHRpdGxlMSwgdGl0bGUyKSA9PiB0aXRsZXNbdGl0bGUxXSAtIHRpdGxlc1t0aXRsZTJdKVswXVxyXG5cclxuICAgICAgICBsZXQgdXJsID0gbnVsbFxyXG4gICAgICAgIGlmIChkb2N1bWVudD8ubG9jYXRpb24/LmhyZWYpIHtcclxuICAgICAgICAgICAgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5tYXRjaCgvaHR0cHM/OlxcL1xcL1teL10qXFwvW14vXSpcXC9bXi9dKlxcLy8pPy5bMF1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoJ3JlYXBlcnNjYW5zLmNvbScpKSB7XHJcbiAgICAgICAgICAgIHVybCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYubWF0Y2goL2h0dHAuKlxcL3Nlcmllc1xcL1teL10qXFwvLyk/LlswXVxyXG4gICAgICAgICAgICB0aXRsZSA9IHRpdGxlLnNwbGl0KCcg4oCTICcpWzBdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnbWFkYXJhJyxcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICB1cmxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc3VsdFxyXG5cclxuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdCA9PT0gJ2ZhbmZveC5uZXQnKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gdGVzdEZhbkZveCgpXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdC5pbmNsdWRlcygnYXN1cmFzY2Fucy5jb20nKSkge1xyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RBc3VyYSgpXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdC5pbmNsdWRlcygnbGV2aWF0YW5zY2Fucy5jb20nKSkge1xyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RMZXZpYXRoYW4oKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QgPT09ICdtYW5nYWRleC5vcmcnKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gdGVzdE1hbmdhZGV4KClcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RNYWRhcm8oKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHJlc3VsdClcclxuXHJcbiAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVzdWx0KVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJleHBvcnQgY29uc3QgQVBJX0FERFJFU1MgPSAnaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbScgLy8gJ2h0dHA6Ly9sb2NhbGhvc3Q6NDMyMTQnXHJcbiIsImV4cG9ydCBmdW5jdGlvbiBpbml0SW50cm8gKCkge1xyXG4gICAgY29uc3QgYm9va21hcmtJbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRyby1ib29rbWFyaycpXHJcbiAgICBib29rbWFya0ltYWdlLnNyYyA9IGNocm9tZS5ydW50aW1lLmdldFVSTCgnaW1hZ2VzL2Jvb2ttYXJrLXNhbXBsZS5wbmcnKVxyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZURCIH0gZnJvbSAnLi4vY29tbW9uL2RiJ1xyXG5cclxuZnVuY3Rpb24gcmVhZCAobmFtZXNwYWNlLCBrZXlzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IGNocm9tZS5zdG9yYWdlW25hbWVzcGFjZV0uZ2V0KGtleXMsIHJlc29sdmUpKVxyXG59XHJcblxyXG5mdW5jdGlvbiB3cml0ZSAobmFtZXNwYWNlLCBrZXlQYWlycykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBjaHJvbWUuc3RvcmFnZVtuYW1lc3BhY2VdLnNldChrZXlQYWlycywgcmVzb2x2ZSkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZExpc3RlbmVyIChjYWxsYmFjaykge1xyXG4gICAgcmV0dXJuIGNocm9tZS5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihjYWxsYmFjaylcclxufVxyXG5cclxuY29uc3Qgc3RvcmFnZSA9IHtcclxuICAgIHJlYWQsIHdyaXRlLCBhZGRMaXN0ZW5lclxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGIgPSBjcmVhdGVEQihzdG9yYWdlKVxyXG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyogRmlsZVNhdmVyLmpzXHJcbiAqIEEgc2F2ZUFzKCkgRmlsZVNhdmVyIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXHJcbiAqIEVTNmlmaWVkIGJ5IENvbGUgQ2hhbWJlcmxhaW4sIGh0dHBzOi8vZ2l0aHViLmNvbS9jY2hhbWJlcmxhaW5cclxuICpcclxuICogTGljZW5zZTogTUlUXHJcbiAqICAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXHJcbiAqL1xuXG4vKmdsb2JhbCBzZWxmICovXG4vKmpzbGludCBiaXR3aXNlOiB0cnVlLCBpbmRlbnQ6IDQsIGxheGJyZWFrOiB0cnVlLCBsYXhjb21tYTogdHJ1ZSwgc21hcnR0YWJzOiB0cnVlLCBwbHVzcGx1czogdHJ1ZSAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvRmlsZVNhdmVyLmpzL2Jsb2IvbWFzdGVyL0ZpbGVTYXZlci5qcyAqL1xuXG52YXIgc2F2ZUFzID0gZXhwb3J0cy5zYXZlQXMgPSB3aW5kb3cuc2F2ZUFzIHx8IGZ1bmN0aW9uICh2aWV3KSB7XG4gIC8vIElFIDwxMCBpcyBleHBsaWNpdGx5IHVuc3VwcG9ydGVkXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvTVNJRSBbMS05XVxcLi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkgcmV0dXJuO1xuICB2YXIgZG9jID0gdmlldy5kb2N1bWVudDtcbiAgLy8gb25seSBnZXQgVVJMIHdoZW4gbmVjZXNzYXJ5IGluIGNhc2UgQmxvYi5qcyBoYXNuJ3Qgb3ZlcnJpZGRlbiBpdCB5ZXRcbiAgdmFyIGdldF9VUkwgPSBmdW5jdGlvbiBnZXRfVVJMKCkge1xuICAgIHJldHVybiB2aWV3LlVSTCB8fCB2aWV3LndlYmtpdFVSTCB8fCB2aWV3O1xuICB9O1xuICB2YXIgc2F2ZV9saW5rID0gZG9jLmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsICdhJyk7XG4gIHZhciBjYW5fdXNlX3NhdmVfbGluayA9ICdkb3dubG9hZCcgaW4gc2F2ZV9saW5rO1xuICB2YXIgY2xpY2sgPSBmdW5jdGlvbiBjbGljayhub2RlKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ2NsaWNrJyk7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfTtcbiAgdmFyIGlzX3NhZmFyaSA9IC9WZXJzaW9uXFwvW1xcZFxcLl0rLipTYWZhcmkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIHZhciB3ZWJraXRfcmVxX2ZzID0gdmlldy53ZWJraXRSZXF1ZXN0RmlsZVN5c3RlbTtcbiAgdmFyIHJlcV9mcyA9IHZpZXcucmVxdWVzdEZpbGVTeXN0ZW0gfHwgd2Via2l0X3JlcV9mcyB8fCB2aWV3Lm1velJlcXVlc3RGaWxlU3lzdGVtO1xuICB2YXIgdGhyb3dfb3V0c2lkZSA9IGZ1bmN0aW9uIHRocm93X291dHNpZGUoZXgpIHtcbiAgICAodmlldy5zZXRJbW1lZGlhdGUgfHwgdmlldy5zZXRUaW1lb3V0KShmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBleDtcbiAgICB9LCAwKTtcbiAgfTtcbiAgdmFyIGZvcmNlX3NhdmVhYmxlX3R5cGUgPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcbiAgdmFyIGZzX21pbl9zaXplID0gMDtcbiAgLy8gdGhlIEJsb2IgQVBJIGlzIGZ1bmRhbWVudGFsbHkgYnJva2VuIGFzIHRoZXJlIGlzIG5vIFwiZG93bmxvYWRmaW5pc2hlZFwiIGV2ZW50IHRvIHN1YnNjcmliZSB0b1xuICB2YXIgYXJiaXRyYXJ5X3Jldm9rZV90aW1lb3V0ID0gMTAwMCAqIDQwOyAvLyBpbiBtc1xuICB2YXIgcmV2b2tlID0gZnVuY3Rpb24gcmV2b2tlKGZpbGUpIHtcbiAgICB2YXIgcmV2b2tlciA9IGZ1bmN0aW9uIHJldm9rZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnKSAvLyBmaWxlIGlzIGFuIG9iamVjdCBVUkxcbiAgICAgICAgZ2V0X1VSTCgpLnJldm9rZU9iamVjdFVSTChmaWxlKTtlbHNlIC8vIGZpbGUgaXMgYSBGaWxlXG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfTtcbiAgICAvKiAvLyBUYWtlIG5vdGUgVzNDOlxyXG4gICAgdmFyXHJcbiAgICAgIHVyaSA9IHR5cGVvZiBmaWxlID09PSBcInN0cmluZ1wiID8gZmlsZSA6IGZpbGUudG9VUkwoKVxyXG4gICAgLCByZXZva2VyID0gZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICAgIC8vIGlkZWFseSBEb3dubG9hZEZpbmlzaGVkRXZlbnQuZGF0YSB3b3VsZCBiZSB0aGUgVVJMIHJlcXVlc3RlZFxyXG4gICAgICBpZiAoZXZ0LmRhdGEgPT09IHVyaSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmlsZSA9PT0gXCJzdHJpbmdcIikgeyAvLyBmaWxlIGlzIGFuIG9iamVjdCBVUkxcclxuICAgICAgICAgIGdldF9VUkwoKS5yZXZva2VPYmplY3RVUkwoZmlsZSk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gZmlsZSBpcyBhIEZpbGVcclxuICAgICAgICAgIGZpbGUucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJkb3dubG9hZGZpbmlzaGVkXCIsIHJldm9rZXIpO1xyXG4gICAgKi9cbiAgICBzZXRUaW1lb3V0KHJldm9rZXIsIGFyYml0cmFyeV9yZXZva2VfdGltZW91dCk7XG4gIH07XG4gIHZhciBkaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKGZpbGVzYXZlciwgZXZlbnRfdHlwZXMsIGV2ZW50KSB7XG4gICAgZXZlbnRfdHlwZXMgPSBbXS5jb25jYXQoZXZlbnRfdHlwZXMpO1xuICAgIHZhciBpID0gZXZlbnRfdHlwZXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGZpbGVzYXZlclsnb24nICsgZXZlbnRfdHlwZXNbaV1dO1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxpc3RlbmVyLmNhbGwoZmlsZXNhdmVyLCBldmVudCB8fCBmaWxlc2F2ZXIpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIHRocm93X291dHNpZGUoZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICB2YXIgYXV0b19ib20gPSBmdW5jdGlvbiBhdXRvX2JvbShibG9iKSB7XG4gICAgLy8gcHJlcGVuZCBCT00gZm9yIFVURi04IFhNTCBhbmQgdGV4dC8qIHR5cGVzIChpbmNsdWRpbmcgSFRNTClcbiAgICBpZiAoL15cXHMqKD86dGV4dFxcL1xcUyp8YXBwbGljYXRpb25cXC94bWx8XFxTKlxcL1xcUypcXCt4bWwpXFxzKjsuKmNoYXJzZXRcXHMqPVxccyp1dGYtOC9pLnRlc3QoYmxvYi50eXBlKSkgcmV0dXJuIG5ldyBCbG9iKFsn77u/JywgYmxvYl0sIHsgdHlwZTogYmxvYi50eXBlIH0pO1xuICAgIHJldHVybiBibG9iO1xuICB9O1xuXG4gIHZhciBGaWxlU2F2ZXIgPSBmdW5jdGlvbiBGaWxlU2F2ZXIoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmlsZVNhdmVyKTtcblxuICAgIGlmICghbm9fYXV0b19ib20pIGJsb2IgPSBhdXRvX2JvbShibG9iKTtcbiAgICAvLyBGaXJzdCB0cnkgYS5kb3dubG9hZCwgdGhlbiB3ZWIgZmlsZXN5c3RlbSwgdGhlbiBvYmplY3QgVVJMc1xuICAgIHZhciBmaWxlc2F2ZXIgPSB0aGlzLFxuICAgICAgICB0eXBlID0gYmxvYi50eXBlLFxuICAgICAgICBibG9iX2NoYW5nZWQgPSBmYWxzZSxcbiAgICAgICAgb2JqZWN0X3VybCxcbiAgICAgICAgdGFyZ2V0X3ZpZXcsXG4gICAgICAgIGRpc3BhdGNoX2FsbCA9IGZ1bmN0aW9uIGRpc3BhdGNoX2FsbCgpIHtcbiAgICAgIGRpc3BhdGNoKGZpbGVzYXZlciwgJ3dyaXRlc3RhcnQgcHJvZ3Jlc3Mgd3JpdGUgd3JpdGVlbmQnLnNwbGl0KCcgJykpO1xuICAgIH1cbiAgICAvLyBvbiBhbnkgZmlsZXN5cyBlcnJvcnMgcmV2ZXJ0IHRvIHNhdmluZyB3aXRoIG9iamVjdCBVUkxzXG4gICAgLFxuICAgICAgICBmc19lcnJvciA9IGZ1bmN0aW9uIGZzX2Vycm9yKCkge1xuICAgICAgaWYgKHRhcmdldF92aWV3ICYmIGlzX3NhZmFyaSAmJiB0eXBlb2YgRmlsZVJlYWRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gU2FmYXJpIGRvZXNuJ3QgYWxsb3cgZG93bmxvYWRpbmcgb2YgYmxvYiB1cmxzXG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBiYXNlNjREYXRhID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgICAgICB0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gJ2RhdGE6YXR0YWNobWVudC9maWxlJyArIGJhc2U2NERhdGEuc2xpY2UoYmFzZTY0RGF0YS5zZWFyY2goL1ssO10vKSk7XG4gICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgICAgICBkaXNwYXRjaF9hbGwoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG4gICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGRvbid0IGNyZWF0ZSBtb3JlIG9iamVjdCBVUkxzIHRoYW4gbmVlZGVkXG4gICAgICBpZiAoYmxvYl9jaGFuZ2VkIHx8ICFvYmplY3RfdXJsKSB7XG4gICAgICAgIG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldF92aWV3KSB7XG4gICAgICAgIHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSBvYmplY3RfdXJsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG5ld190YWIgPSB2aWV3Lm9wZW4ob2JqZWN0X3VybCwgJ19ibGFuaycpO1xuICAgICAgICBpZiAobmV3X3RhYiA9PT0gdW5kZWZpbmVkICYmIGlzX3NhZmFyaSkge1xuICAgICAgICAgIC8vQXBwbGUgZG8gbm90IGFsbG93IHdpbmRvdy5vcGVuLCBzZWUgaHR0cDovL2JpdC5seS8xa1pmZlJJXG4gICAgICAgICAgdmlldy5sb2NhdGlvbi5ocmVmID0gb2JqZWN0X3VybDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgIGRpc3BhdGNoX2FsbCgpO1xuICAgICAgcmV2b2tlKG9iamVjdF91cmwpO1xuICAgIH0sXG4gICAgICAgIGFib3J0YWJsZSA9IGZ1bmN0aW9uIGFib3J0YWJsZShmdW5jKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZmlsZXNhdmVyLnJlYWR5U3RhdGUgIT09IGZpbGVzYXZlci5ET05FKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuICAgICAgICBjcmVhdGVfaWZfbm90X2ZvdW5kID0geyBjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2UgfSxcbiAgICAgICAgc2xpY2U7XG5cbiAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5JTklUO1xuICAgIGlmICghbmFtZSkge1xuICAgICAgbmFtZSA9ICdkb3dubG9hZCc7XG4gICAgfVxuICAgIGlmIChjYW5fdXNlX3NhdmVfbGluaykge1xuICAgICAgb2JqZWN0X3VybCA9IGdldF9VUkwoKS5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2F2ZV9saW5rLmhyZWYgPSBvYmplY3RfdXJsO1xuICAgICAgICBzYXZlX2xpbmsuZG93bmxvYWQgPSBuYW1lO1xuICAgICAgICBjbGljayhzYXZlX2xpbmspO1xuICAgICAgICBkaXNwYXRjaF9hbGwoKTtcbiAgICAgICAgcmV2b2tlKG9iamVjdF91cmwpO1xuICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIE9iamVjdCBhbmQgd2ViIGZpbGVzeXN0ZW0gVVJMcyBoYXZlIGEgcHJvYmxlbSBzYXZpbmcgaW4gR29vZ2xlIENocm9tZSB3aGVuXG4gICAgLy8gdmlld2VkIGluIGEgdGFiLCBzbyBJIGZvcmNlIHNhdmUgd2l0aCBhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cbiAgICAvLyBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD05MTE1OFxuICAgIC8vIFVwZGF0ZTogR29vZ2xlIGVycmFudGx5IGNsb3NlZCA5MTE1OCwgSSBzdWJtaXR0ZWQgaXQgYWdhaW46XG4gICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM4OTY0MlxuICAgIGlmICh2aWV3LmNocm9tZSAmJiB0eXBlICYmIHR5cGUgIT09IGZvcmNlX3NhdmVhYmxlX3R5cGUpIHtcbiAgICAgIHNsaWNlID0gYmxvYi5zbGljZSB8fCBibG9iLndlYmtpdFNsaWNlO1xuICAgICAgYmxvYiA9IHNsaWNlLmNhbGwoYmxvYiwgMCwgYmxvYi5zaXplLCBmb3JjZV9zYXZlYWJsZV90eXBlKTtcbiAgICAgIGJsb2JfY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIC8vIFNpbmNlIEkgY2FuJ3QgYmUgc3VyZSB0aGF0IHRoZSBndWVzc2VkIG1lZGlhIHR5cGUgd2lsbCB0cmlnZ2VyIGEgZG93bmxvYWRcbiAgICAvLyBpbiBXZWJLaXQsIEkgYXBwZW5kIC5kb3dubG9hZCB0byB0aGUgZmlsZW5hbWUuXG4gICAgLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTY1NDQwXG4gICAgaWYgKHdlYmtpdF9yZXFfZnMgJiYgbmFtZSAhPT0gJ2Rvd25sb2FkJykge1xuICAgICAgbmFtZSArPSAnLmRvd25sb2FkJztcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IGZvcmNlX3NhdmVhYmxlX3R5cGUgfHwgd2Via2l0X3JlcV9mcykge1xuICAgICAgdGFyZ2V0X3ZpZXcgPSB2aWV3O1xuICAgIH1cbiAgICBpZiAoIXJlcV9mcykge1xuICAgICAgZnNfZXJyb3IoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZnNfbWluX3NpemUgKz0gYmxvYi5zaXplO1xuICAgIHJlcV9mcyh2aWV3LlRFTVBPUkFSWSwgZnNfbWluX3NpemUsIGFib3J0YWJsZShmdW5jdGlvbiAoZnMpIHtcbiAgICAgIGZzLnJvb3QuZ2V0RGlyZWN0b3J5KCdzYXZlZCcsIGNyZWF0ZV9pZl9ub3RfZm91bmQsIGFib3J0YWJsZShmdW5jdGlvbiAoZGlyKSB7XG4gICAgICAgIHZhciBzYXZlID0gZnVuY3Rpb24gc2F2ZSgpIHtcbiAgICAgICAgICBkaXIuZ2V0RmlsZShuYW1lLCBjcmVhdGVfaWZfbm90X2ZvdW5kLCBhYm9ydGFibGUoZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgICAgIGZpbGUuY3JlYXRlV3JpdGVyKGFib3J0YWJsZShmdW5jdGlvbiAod3JpdGVyKSB7XG4gICAgICAgICAgICAgIHdyaXRlci5vbndyaXRlZW5kID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IGZpbGUudG9VUkwoKTtcbiAgICAgICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGZpbGVzYXZlciwgJ3dyaXRlZW5kJywgZXZlbnQpO1xuICAgICAgICAgICAgICAgIHJldm9rZShmaWxlKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgd3JpdGVyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gd3JpdGVyLmVycm9yO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlICE9PSBlcnJvci5BQk9SVF9FUlIpIHtcbiAgICAgICAgICAgICAgICAgIGZzX2Vycm9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAnd3JpdGVzdGFydCBwcm9ncmVzcyB3cml0ZSBhYm9ydCcuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHdyaXRlclsnb24nICsgZXZlbnRdID0gZmlsZXNhdmVyWydvbicgKyBldmVudF07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB3cml0ZXIud3JpdGUoYmxvYik7XG4gICAgICAgICAgICAgIGZpbGVzYXZlci5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3cml0ZXIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5XUklUSU5HO1xuICAgICAgICAgICAgfSksIGZzX2Vycm9yKTtcbiAgICAgICAgICB9KSwgZnNfZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBkaXIuZ2V0RmlsZShuYW1lLCB7IGNyZWF0ZTogZmFsc2UgfSwgYWJvcnRhYmxlKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgICAgLy8gZGVsZXRlIGZpbGUgaWYgaXQgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgICAgIHNhdmUoKTtcbiAgICAgICAgfSksIGFib3J0YWJsZShmdW5jdGlvbiAoZXgpIHtcbiAgICAgICAgICBpZiAoZXguY29kZSA9PT0gZXguTk9UX0ZPVU5EX0VSUikge1xuICAgICAgICAgICAgc2F2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmc19lcnJvcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSksIGZzX2Vycm9yKTtcbiAgICB9KSwgZnNfZXJyb3IpO1xuICB9O1xuXG4gIHZhciBGU19wcm90byA9IEZpbGVTYXZlci5wcm90b3R5cGU7XG4gIHZhciBzYXZlQXMgPSBmdW5jdGlvbiBzYXZlQXMoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcbiAgICByZXR1cm4gbmV3IEZpbGVTYXZlcihibG9iLCBuYW1lLCBub19hdXRvX2JvbSk7XG4gIH07XG5cbiAgLy8gSUUgMTArIChuYXRpdmUgc2F2ZUFzKVxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG4gICAgICBpZiAoIW5vX2F1dG9fYm9tKSBibG9iID0gYXV0b19ib20oYmxvYik7XG4gICAgICByZXR1cm4gbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoYmxvYiwgbmFtZSB8fCAnZG93bmxvYWQnKTtcbiAgICB9O1xuICB9XG5cbiAgRlNfcHJvdG8uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpbGVzYXZlciA9IHRoaXM7XG4gICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICBkaXNwYXRjaChmaWxlc2F2ZXIsICdhYm9ydCcpO1xuICB9O1xuICBGU19wcm90by5yZWFkeVN0YXRlID0gRlNfcHJvdG8uSU5JVCA9IDA7XG4gIEZTX3Byb3RvLldSSVRJTkcgPSAxO1xuICBGU19wcm90by5ET05FID0gMjtcblxuICBGU19wcm90by5lcnJvciA9IEZTX3Byb3RvLm9ud3JpdGVzdGFydCA9IEZTX3Byb3RvLm9ucHJvZ3Jlc3MgPSBGU19wcm90by5vbndyaXRlID0gRlNfcHJvdG8ub25hYm9ydCA9IEZTX3Byb3RvLm9uZXJyb3IgPSBGU19wcm90by5vbndyaXRlZW5kID0gbnVsbDtcblxuICByZXR1cm4gc2F2ZUFzO1xufSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiB8fCB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgfHwgdW5kZWZpbmVkLmNvbnRlbnQpO1xuLy8gYHNlbGZgIGlzIHVuZGVmaW5lZCBpbiBGaXJlZm94IGZvciBBbmRyb2lkIGNvbnRlbnQgc2NyaXB0IGNvbnRleHRcbi8vIHdoaWxlIGB0aGlzYCBpcyBuc0lDb250ZW50RnJhbWVNZXNzYWdlTWFuYWdlclxuLy8gd2l0aCBhbiBhdHRyaWJ1dGUgYGNvbnRlbnRgIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHdpbmRvd1xuXG5leHBvcnRzLmRlZmF1bHQgPSBzYXZlQXM7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAncmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzJ1xuaW1wb3J0IHsgdGVzdEJvb2ttYXJrIH0gZnJvbSAnLi9ib29rbWFyaydcbmltcG9ydCB7IGFkZEltcG9ydEhhbmRsZXJzIH0gZnJvbSAnLi4vY29tbW9uL2ltcG9ydCdcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9zdG9yYWdlJ1xuaW1wb3J0IHsgdXJsUmVuZGVyZXIgfSBmcm9tICcuLi9jb21tb24vdXJscydcbmltcG9ydCB7IHNvdXJjZVJlbmRlcmVyIH0gZnJvbSAnLi4vY29tbW9uL3NvdXJjZXMnXG5pbXBvcnQgeyBtYXJrUmVmcmVzaGVkLCByZXNpc3RlclByb2dyZXNzSGFuZGxlciwgdXBkYXRlUHJvZ3Jlc3MgfSBmcm9tICcuLi9jb21tb24vcHJvZ3Jlc3MtYmFyJ1xuaW1wb3J0IHsgY3JlYXRlU2NoZWR1bGUgfSBmcm9tICcuLi9jb21tb24vc2NoZWR1bGUnXG5pbXBvcnQgeyByZWdpc3Rlck1lbnVMaXN0ZW5lcnMgfSBmcm9tICcuLi9jb21tb24vbWVudSdcbmltcG9ydCB7IGFkZFNldHRpbmdzSGFuZGxlcnMgfSBmcm9tICcuLi9jb21tb24vc2V0dGluZ3MnXG5pbXBvcnQgeyBBUEkgfSBmcm9tICcuLi9jb21tb24vYXBpJ1xuaW1wb3J0IHsgQVBJX0FERFJFU1MgfSBmcm9tICcuL2NvbnN0YW50cydcbmltcG9ydCB7IGluaXRJbnRybyB9IGZyb20gJy4vaW50cm8nXG5pbXBvcnQgeyByZW5kZXJIb3N0TGlzdCB9IGZyb20gJy4uL2NvbW1vbi9ob3N0cydcblxuY29uc3QgYXBpID0gQVBJKEFQSV9BRERSRVNTKVxuXG5kYi51cmxzLnNldE1heE9sZCgxMDApXG5cbmNvbnN0IFVybHMgPSB1cmxSZW5kZXJlcihkYilcbmNvbnN0IFNvdXJjZXMgPSBzb3VyY2VSZW5kZXJlcihkYilcblxuZGIub25DaGFuZ2UoKGNoYW5nZXMpID0+IHtcbiAgICBpZiAoWydoaWRlJywgJ2hpZGRlbkNoYXB0ZXJzJywgJ3VybHMnXS5zb21lKGNoYW5nZXMuaGFzT3duUHJvcGVydHkuYmluZChjaGFuZ2VzKSkpIHtcbiAgICAgICAgVXJscy5yZW5kZXIoKVxuICAgIH1cbiAgICBpZiAoT2JqZWN0LmtleXMoY2hhbmdlcykuc29tZSgoY2hhbmdlKSA9PiBjaGFuZ2UuaW5jbHVkZXMoJ3NvdXJjZXMnKSkgfHwgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNoYW5nZXMsICdtYXhPbGQnKSkge1xuICAgICAgICBTb3VyY2VzLnJlbmRlcigpXG4gICAgfVxufSlcblxubmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuY29udHJvbGxlci5wb3N0TWVzc2FnZSgnRkVUQ0hfQ0hBUFRFUlMnKVxubWFya1JlZnJlc2hlZCgpXG5cbmNvbnN0IGludGVydmFsID0gY3JlYXRlU2NoZWR1bGUoe1xuICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIucG9zdE1lc3NhZ2UoJ0ZFVENIX0NIQVBURVJTJylcbiAgICAgICAgbWFya1JlZnJlc2hlZCgpXG4gICAgfSxcbiAgICBpbnRlcnZhbDogNjAgKiAxMDAwLFxuICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgIHVwZGF0ZXI6IHVwZGF0ZVByb2dyZXNzXG59KVxuXG5pbml0SW50cm8oKVxucmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIoKCkgPT4gaW50ZXJ2YWwudHJpZ2dlckluc3RhbnRseSgpKVxuYWRkSW1wb3J0SGFuZGxlcnMoZGIpXG5hZGRTZXR0aW5nc0hhbmRsZXJzKGRiLCBhcGkpXG5yZWdpc3Rlck1lbnVMaXN0ZW5lcnMoZGIsIGFwaSlcbnJlbmRlckhvc3RMaXN0KGRiLCBhcGkpXG5cblVybHMucmVuZGVyKClcblNvdXJjZXMucmVuZGVyKClcbiAgICAudGhlbih0ZXN0Qm9va21hcmspXG4iXSwic291cmNlUm9vdCI6IiJ9