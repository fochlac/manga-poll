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
                return "<a href=\"".concat(host.url, "\" target=\"_blank\" rel=\"noopener\">").concat(host.name, "</a>");
              }).join('<span>, </span>');
              hostContainer.innerHTML = "\n            <h6>Supported Pages</h6>\n            <div class=\"link-list\">".concat(hostList, "</div>\n        ");

              if (hosts.unstable.length) {
                _hostList = hosts.unstable.sort(function (a, b) {
                  return String(a === null || a === void 0 ? void 0 : a.name).localeCompare(b === null || b === void 0 ? void 0 : b.name);
                }).map(function (host) {
                  return "<a href=\"".concat(host.url, "\" target=\"_blank\" rel=\"noopener\">").concat(host.name, "</a>");
                }).join('<span>, </span>');
                hostContainer.innerHTML += "\n                <p>These Pages had some problems recently &ndash; they might or might not work:</p>\n                <div class=\"link-list\">".concat(_hostList, "</div>\n            ");
              }

              hostContainer.innerHTML += "\n            <p>\n                <span>Many other pages can work as well, if they use the </span>\n                <a href=\"https://themeforest.net/item/madara-wordpress-theme-for-manga/20849828\" target=\"_blank\" rel=\"noopener\">Madara-</a>\n                <span> or </span>\n                <a href=\"https://themesia.com/mangastream-wordpress-theme/\" target=\"_blank\" rel=\"noopener\">MangaStream-Theme</a>\n                <span> or are built using the </span>\n                <a href=\"https://genkan.io/groups\" target=\"_blank\" rel=\"noopener\">Genkan Reader</a><span>.</span>\n            </p>\n        ";
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  _addSettingsHandlers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(db, api) {
    var Link, createLink, updateLink, linkNumberText, linkLink, linkLinkText, linkingSection, unlinkSection, unlinkButton, linkButton, linkInput1, linkInput2, linkInput3, writeStateToDom, link, darkModeInput, settings;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
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
              linkNumberText.classList[link ? 'add' : 'remove']('linked');
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
            _context10.next = 19;
            return db.link.read();

          case 19:
            link = _context10.sent;
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
            darkModeInput = document.querySelector('#darkmode-toggle');
            _context10.next = 28;
            return db.settings.local.read();

          case 28:
            settings = _context10.sent;

            if (settings.dark) {
              darkModeInput.checked = true;
              document.querySelector('html').classList.add('dark');
            }

            darkModeInput.addEventListener('change', /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(e) {
                var settings;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return db.settings.local.read();

                      case 2:
                        settings = _context9.sent;

                        if (e.target.checked) {
                          document.querySelector('html').classList.add('dark');
                        } else {
                          document.querySelector('html').classList.remove('dark');
                        }

                        db.settings.local.set(_objectSpread(_objectSpread({}, settings), {}, {
                          dark: e.target.checked
                        }));

                      case 5:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x9) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 31:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
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

                var url = String(source.url).replace(/https?:\/\//, '').split('/')[0].split('.').slice(-2).join('.');
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
  bookmark.classList.remove('error');
  bookmark.classList.add('progress');
  Source.insert(currentSource).then(function (source) {
    return source && _storage__WEBPACK_IMPORTED_MODULE_2__.db.sources.add(source);
  }).then(function () {
    bookmark.style.display = 'none';
    bookmarkTitle.innerText = '';
    currentSource = null;
  }).catch(function () {
    bookmark.classList.add('error');
    bookmark.classList.remove('progress');
    bookmarkTrack.innerText = 'Retry';
    bookmarkTitle.innerText = 'Unable to create bookmark, please retry later and if it keeps failing, send an email with the time + url to "info@fochlac.com".';
  });
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
              return source.url.split('/')[2] === request.url.split('/')[2] && String(source.mangaId) === String(request.id);
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

  function testMangastream() {
    var _document$querySelect3, _document$querySelect4, _breadcrumpLink$query;

    var breadcrumpLink = (_document$querySelect3 = document.querySelector('ol[itemtype="http://schema.org/BreadcrumbList"] meta[itemprop="position"][content="2"]')) === null || _document$querySelect3 === void 0 ? void 0 : (_document$querySelect4 = _document$querySelect3.closest('li')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.querySelector('a');

    if (!breadcrumpLink) {
      return null;
    }

    var url = breadcrumpLink.href;
    var name = (_breadcrumpLink$query = breadcrumpLink.querySelector('span')) === null || _breadcrumpLink$query === void 0 ? void 0 : _breadcrumpLink$query.innerText;
    return {
      type: 'mangastream',
      id: url === null || url === void 0 ? void 0 : url.split('/')[4],
      title: name,
      url: url
    };
  }

  function testMangadex() {
    if (/title\/[\d-\w]*\/[\d-\w]*/.test(window.location.pathname)) {
      var _window$location$path2, _document$querySelect5;

      var id = (_window$location$path2 = window.location.pathname.split('/')) === null || _window$location$path2 === void 0 ? void 0 : _window$location$path2[2];
      var name = (_document$querySelect5 = document.querySelector('.manga-container .title p')) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.innerText;
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

  function testGenkan() {
    var result = location.href.match(/https?:\/\/[^/]*\/comics\/(\d*)-[-\w\d]*/) || [];
    var url = result[0];
    var id = result[1];

    if (!url || !id) {
      return null;
    }

    if (/^\d+$/.test(location.href.split('/').slice(-2).join('').replace('.', '').trim())) {
      var title = document.querySelector('.heading h6').textContent.trim();
      return {
        type: 'genkan',
        id: id,
        title: title,
        url: url
      };
    } else {
      var _title = document.querySelector('meta[property*="title"]').content.trim();

      return {
        type: 'genkan',
        id: id,
        title: _title,
        url: url
      };
    }
  }

  function testLeviathan() {
    var _document$getElementB, _document$getElementB2, _document$querySelect6;

    var header = document.querySelector('.post-title h1');
    var titles = [Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(function (script) {
      var _parse;

      return (_parse = parse(script.innerText)) === null || _parse === void 0 ? void 0 : _parse.headline;
    }).find(function (h) {
      return h;
    }), (_document$getElementB = document.getElementById('chapter-heading')) === null || _document$getElementB === void 0 ? void 0 : (_document$getElementB2 = _document$getElementB.innerText) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.split(' - ')[0], header && Array.from(header.childNodes).reduce(function (title, node) {
      return title + (node.nodeType === 3 ? node.textContent : '');
    }, ''), (_document$querySelect6 = document.querySelector('.rate-title')) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.title].filter(function (title) {
      return title;
    }).reduce(function (map, title) {
      var clean = decodeHTMLEntities(title).trim();
      map[clean] = typeof map[clean] === 'number' ? map[clean] + 1 : 1;
      return map;
    }, {});
    var title = Object.keys(titles).sort(function (title1, title2) {
      return titles[title1] - titles[title2];
    })[0];
    var baseUrl = document.location.href.split('/manga/')[0] + '/manga/';
    var id = document.location.href.replace(baseUrl, '').split('/')[0];
    var url = "".concat(baseUrl).concat(id);
    return {
      type: 'leviathan',
      id: id,
      title: title,
      url: url
    };
  }

  function testMadara() {
    var _window, _window$manga, _document$querySelect7, _document$querySelect8, _document$querySelect9, _document$querySelect10, _document$querySelect11, _document$getElementB3, _document$getElementB4, _document$querySelect12, _document$querySelect13, _document$getElementB5, _document$getElementB6, _document$getElementB7, _document$getElementB8, _document$getElementB9, _document$getElementB10, _document$querySelect14, _document, _document$location;

    function parse(string, fallback) {
      try {
        return JSON.parse(string);
      } catch (e) {
        return fallback;
      }
    }

    var ids = [(_window = window) === null || _window === void 0 ? void 0 : (_window$manga = _window.manga) === null || _window$manga === void 0 ? void 0 : _window$manga.manga_id, (_document$querySelect7 = document.querySelector('.rating-post-id')) === null || _document$querySelect7 === void 0 ? void 0 : _document$querySelect7.value, (_document$querySelect8 = document.querySelector('.wp-manga-action-button')) === null || _document$querySelect8 === void 0 ? void 0 : (_document$querySelect9 = _document$querySelect8.dataset) === null || _document$querySelect9 === void 0 ? void 0 : _document$querySelect9['post'], (_document$querySelect10 = document.querySelector('.chapter-selection')) === null || _document$querySelect10 === void 0 ? void 0 : (_document$querySelect11 = _document$querySelect10.dataset) === null || _document$querySelect11 === void 0 ? void 0 : _document$querySelect11['manga'], (_document$getElementB3 = document.getElementById('manga-chapters-holder')) === null || _document$getElementB3 === void 0 ? void 0 : (_document$getElementB4 = _document$getElementB3.dataset) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4['id'], (_document$querySelect12 = document.querySelector('.bookmark')) === null || _document$querySelect12 === void 0 ? void 0 : (_document$querySelect13 = _document$querySelect12.dataset) === null || _document$querySelect13 === void 0 ? void 0 : _document$querySelect13['id'], (_document$getElementB5 = document.getElementById('manga-reading-nav-head')) === null || _document$getElementB5 === void 0 ? void 0 : (_document$getElementB6 = _document$getElementB5.dataset) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6['id'], (_document$getElementB7 = document.getElementById('manga-reading-nav-foot')) === null || _document$getElementB7 === void 0 ? void 0 : (_document$getElementB8 = _document$getElementB7.dataset) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8['id']].filter(function (title) {
      return title;
    }).reduce(function (map, id) {
      map[id] = typeof map[id] === 'number' ? map[id] + 1 : 1;
      return map;
    }, {});
    var id = Object.keys(ids).sort(function (id1, id2) {
      return ids[id1] - ids[id2];
    })[0];
    var header = document.querySelector('.post-title h1') || document.querySelector('h1.entry-title');
    var titles = [Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(function (script) {
      var _parse2;

      return (_parse2 = parse(script.innerText)) === null || _parse2 === void 0 ? void 0 : _parse2.headline;
    }).find(function (h) {
      return h;
    }), (_document$getElementB9 = document.getElementById('chapter-heading')) === null || _document$getElementB9 === void 0 ? void 0 : (_document$getElementB10 = _document$getElementB9.innerText) === null || _document$getElementB10 === void 0 ? void 0 : _document$getElementB10.split(' - ')[0], header && Array.from(header.childNodes).reduce(function (title, node) {
      return title + (node.nodeType === 3 ? node.textContent : '');
    }, ''), (_document$querySelect14 = document.querySelector('.rate-title')) === null || _document$querySelect14 === void 0 ? void 0 : _document$querySelect14.title].filter(function (title) {
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
    console.log('fanfox');
    result = testFanFox();
  } else if (document.documentElement.innerHTML.includes('Powered by Genkan.')) {
    console.log('genkan');
    result = testGenkan();
  } else if (document.documentElement.innerHTML.includes('ts-breadcrumb bixbox')) {
    console.log('mangastream');
    result = testMangastream();
  } else if (window.location.host.includes('leviatanscans.com') || window.location.host.includes('immortalupdates.com')) {
    console.log('leviathan');
    result = testLeviathan();
  } else if (window.location.host === 'mangadex.org') {
    console.log('mangadex');
    result = testMangadex();
  } else {
    console.log('madara');
    result = testMadara();
  }

  console.log(result);

  if (result) {
    chrome.runtime.sendMessage(result);
  }
}

window.triggerTest = function () {
  return testBookmark();
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2RiLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vaG9zdHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9pbXBvcnQuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9tZW51LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vcHJvZ3Jlc3MtYmFyLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vc2NoZWR1bGUuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3NvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi91cmxzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9ib29rbWFyay5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL2ludHJvLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9leHRlbnNpb24vc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL25vZGVfbW9kdWxlcy9zYXZlLWFzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21hbmdhY2hlY2tlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9wb3B1cC5qcyJdLCJuYW1lcyI6WyJBUEkiLCJiYXNlVXJsIiwicG9zdFNvdXJjZSIsInNvdXJjZSIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwiQWNjZXB0IiwidGhlbiIsInJlcyIsImpzb24iLCJjYXRjaCIsImVycm9yIiwidmFsaWQiLCJkYXRhIiwicGF5bG9hZCIsImFkZFNvdXJjZUZyb21VcmwiLCJ1cmwiLCJyZWFkVXJscyIsInNvdXJjZXMiLCJsaW1pdCIsImRhdGUiLCJhZGRTdWJzY3JpcHRpb25zIiwidG9waWNzIiwia2V5IiwiZGVsZXRlU3Vic2NyaXB0aW9ucyIsInJlYWRMaW5rIiwiY2hhbmdlZFNpbmNlIiwic3RhdHVzIiwicmVhZEhvc3RzIiwidXBkYXRlTGluayIsInVwZGF0ZVNldCIsImNyZWF0ZUxpbmsiLCJpbml0U2V0IiwiVXJscyIsInJlYWQiLCJTb3VyY2UiLCJpbnNlcnQiLCJmcm9tVXJsIiwiU3Vic2NyaXB0aW9uIiwic3Vic2NyaWJlIiwidW5zdWJzY3JpYmUiLCJMaW5rIiwidXBkYXRlIiwiSG9zdHMiLCJOQU1FU1BBQ0VTIiwiU1lOQyIsIkxPQ0FMIiwiY3JlYXRlREIiLCJzdG9yYWdlIiwid3JpdGUiLCJyZWFkU291cmNlcyIsInJlZ2lzdHJ5IiwicGFyc2UiLCJyZWR1Y2UiLCJQcm9taXNlIiwiYWxsIiwiY29uY2F0IiwicmVzb2x2ZSIsIndyaXRlU291cmNlcyIsInVwZGF0ZXMiLCJ4IiwiTWF0aCIsIm1heCIsImNlaWwiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJhZGRTb3VyY2UiLCJzb21lIiwibWFuZ2FJZCIsImRlbGV0ZVNvdXJjZSIsInNvdXJjZUlkIiwibmV3U291cmNlcyIsImZpbHRlciIsImlkIiwiaXNEaXJ0eSIsInVybHMiLCJnZXRGaWx0ZXJlZFNvcnRlZFVybHMiLCJoaWRkZW5DaGFwdGVycyIsImhpZGUiLCJoaWRkZW5DaGFwdGVyc1N0cmluZyIsInVybExpc3QiLCJjaGVja09sZCIsImNoYXB0ZXIiLCJjcmVhdGVkIiwiT2JqZWN0IiwidmFsdWVzIiwic29ydCIsInVybDEiLCJ1cmwyIiwiZGlmZiIsImFicyIsIlN0cmluZyIsImxvY2FsZUNvbXBhcmUiLCJvbGRVcmxzIiwibmV3VXJscyIsImhpZGVVcmwiLCJyZXN1bHQiLCJoaWRlQWxsVXJscyIsInRpbWVzdGFtcCIsIndyaXRlVXJscyIsImluaXQiLCJ0b2RheSIsIkRhdGUiLCJzZXRIb3VycyIsImdldFRpbWUiLCJzZXRNYXhPbGQiLCJtYXhPbGQiLCJnZXRNYXhPbGQiLCJzZXRMaW5rIiwibGluayIsImdldExpbmsiLCJnZXRIaWRlIiwid3JpdGVMb2NhbFNldHRpbmdzIiwic2V0dGluZ3MiLCJsb2NhbFNldHRpbmdzIiwiZ2V0TG9jYWxTZXR0aW5ncyIsImdldExpbmtEYXRhIiwibWFwIiwiTnVtYmVyIiwic2V0TGlua0RhdGEiLCJzdG9yZWRTb3VyY2VzIiwic3MiLCJoYXNDaGFuZ2VkU291cmNlcyIsImtleXMiLCJwcm9taXNlcyIsImhpZGRlbiIsImltcG9ydCIsImFkZCIsImRlbGV0ZSIsImxvY2FsIiwic2V0IiwiaGlkZUFsbCIsIm9uQ2hhbmdlIiwiYWRkTGlzdGVuZXIiLCJzZXRMb2NhbCIsInJlbmRlckhvc3RMaXN0IiwiX2RiIiwiYXBpIiwiaG9zdENvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhvc3RzIiwiaG9zdExpc3QiLCJzdGFibGUiLCJhIiwiYiIsIm5hbWUiLCJob3N0Iiwiam9pbiIsImlubmVySFRNTCIsInVuc3RhYmxlIiwiYWRkSW1wb3J0SGFuZGxlcnMiLCJkYiIsImltcG9ydEVsZW0iLCJnZXRFbGVtZW50QnlJZCIsImV4cG9ydEVsZW0iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZpbGUiLCJ0YXJnZXQiLCJmaWxlcyIsImZyIiwiRmlsZVJlYWRlciIsImNsZWFuIiwidGl0bGUiLCJyZWFkQXNUZXh0IiwiYmxvYiIsIkJsb2IiLCJ0eXBlIiwic2F2ZUFzIiwicmVnaXN0ZXJNZW51TGlzdGVuZXJzIiwiQXBpIiwiaW1wb3J0U2VjdGlvbiIsInBvcHVwVGl0bGUiLCJib29rbWFya3MiLCJjaGFwdGVycyIsImFkZFNlY3Rpb24iLCJzZXR0aW5nc1NlY3Rpb24iLCJwcm9ncmVzcyIsImludHJvIiwib3BlbkNoYXB0ZXJzIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5uZXJUZXh0Iiwib3BlblNldHRpbmdzIiwiZ2V0TGlua1F1ZXJ5IiwibGlua0lmVW5saW5rZWQiLCJsb2NrZWQiLCJyZXNpc3RlclByb2dyZXNzSGFuZGxlciIsInVwZGF0ZU5vdyIsIm1hcmtSZWZyZXNoZWQiLCJkYXRhc2V0IiwiYmVmb3JlIiwic2V0VGltZW91dCIsInVwZGF0ZVByb2dyZXNzIiwiX2xhc3RQaW5nIiwibmV4dFBpbmciLCJyZW1haW5pbmciLCJub3ciLCJzZWNvbmRzIiwicm91bmQiLCJjcmVhdGVTY2hlZHVsZSIsImlzQWN0aXZlIiwiaW50ZXJ2YWwiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwicHJvdG90eXBlIiwidXBkYXRlciIsImxhc3RQaW5nIiwiY2FsbENhbGxiYWNrIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsIm5ld0ludGVydmFsIiwiRXJyb3IiLCJzZXRDYWxsYmFjayIsImNiIiwic3RhcnQiLCJ0cmlnZ2VySW5zdGFudGx5Iiwic3RvcCIsImNsZWFySW50ZXJ2YWwiLCJsaW5rRmllbGRzIiwiZm9ybWF0S2V5IiwiZ2V0TGlua0hlbHBlcnMiLCJwdXNoTGlua1VwZGF0ZSIsImNoYW5nZXMiLCJjaGFuZ2VzZXQiLCJjaGFuZ2UiLCJpbmNsdWRlcyIsImZldGNoTGlua1VwZGF0ZSIsImxhc3RNb2RpZmllZCIsImlzVmFsaWRMaW5rS2V5IiwiY2xlYW5LZXkiLCJyZXBsYWNlQWxsIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJnZXQiLCJjdXJyZW50TGluayIsImxpbmtJbnB1dDEiLCJsaW5rSW5wdXQyIiwibGlua0lucHV0MyIsInZhbHVlIiwiY29ubmVjdFRvTGluayIsImxpbmtOdW1iZXJUZXh0IiwibGlua0xpbmsiLCJsaW5rTGlua1RleHQiLCJocmVmIiwiY29sb3IiLCJsaW5rTGlua1dhcm4iLCJ3YXJuTGlua0N1cnJlbnQiLCJ3YXJuTGlua05ldyIsImxpbmtFcnJvciIsImxpbmtQcm9ncmVzcyIsImxpbmtCdXR0b24iLCJkaXNhYmxlZCIsImxpbmtSZXN1bHQiLCJhZGRTZXR0aW5nc0hhbmRsZXJzIiwid3JpdGVTdGF0ZVRvRG9tIiwibGlua2luZ1NlY3Rpb24iLCJ1bmxpbmtTZWN0aW9uIiwiY2xhc3NMaXN0IiwidW5saW5rQnV0dG9uIiwibnVtYmVyIiwiZm9jdXMiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImxpbmtEYXRhIiwibmV3TGlua1Jlc3VsdCIsInVuZGVmaW5lZCIsImRhcmtNb2RlSW5wdXQiLCJkYXJrIiwiY2hlY2tlZCIsInJlbW92ZSIsInNvdXJjZVJlbmRlcmVyIiwiZXZlbnQiLCJjbG9zZXN0IiwiY29udGFpbnMiLCJyZW5kZXJTb3VyY2VzIiwic291cmNlMSIsInNvdXJjZTIiLCJyZXBsYWNlIiwic3BsaXQiLCJyZW5kZXIiLCJ1cmxSZW5kZXJlciIsImxhdGVzdENoYXB0ZXJEYXRlIiwibGNkIiwiY2xvc2VzdEhpZGUiLCJjbG9zZXN0TGluayIsInByZXZlbnREZWZhdWx0Iiwib3BlbiIsImNsb3Nlc3RNb3JlIiwidG9wIiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsIm1heFNjcm9sbCIsInNjcm9sbEhlaWdodCIsIm9mZnNldEhlaWdodCIsInNjcm9sbFRvcCIsImNoZWNrVG9wQnV0dG9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY3JlYXRlVXJsUmVuZGVyZXIiLCJpc09sZCIsInRpbWVTdHJpbmciLCJwYWQiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJkYXRlU3RyaW5nIiwiZ2V0RGF0ZSIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJmdWxsRGF0ZSIsInRvSVNPU3RyaW5nIiwicmVuZGVyVXJscyIsIm5ld1Jvd3MiLCJvbGRSb3dzIiwic3RyaW5nIiwiZmFsbGJhY2siLCJubyIsImN1cnJlbnRTb3VyY2UiLCJib29rbWFyayIsImJvb2ttYXJrVHJhY2siLCJib29rbWFya1RpdGxlIiwiQVBJX0FERFJFU1MiLCJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwicmVxdWVzdCIsInRlc3RCb29rbWFyayIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsIndpbmRvd0lkIiwid2luZG93cyIsIldJTkRPV19JRF9DVVJSRU5UIiwic2NyaXB0aW5nIiwiZXhlY3V0ZVNjcmlwdCIsInRhYklkIiwiZnVuY3Rpb24iLCJ0ZXN0IiwiZGVjb2RlSFRNTEVudGl0aWVzIiwic3RyIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInRlc3RGYW5Gb3giLCJwYXRobmFtZSIsIm1hdGNoIiwib3JpZ2luIiwidGVzdE1hbmdhc3RyZWFtIiwiYnJlYWRjcnVtcExpbmsiLCJ0ZXN0TWFuZ2FkZXgiLCJ0ZXN0R2Vua2FuIiwidHJpbSIsImNvbnRlbnQiLCJ0ZXN0TGV2aWF0aGFuIiwiaGVhZGVyIiwidGl0bGVzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsInNjcmlwdCIsImhlYWRsaW5lIiwiZmluZCIsImgiLCJjaGlsZE5vZGVzIiwibm9kZSIsIm5vZGVUeXBlIiwidGl0bGUxIiwidGl0bGUyIiwidGVzdE1hZGFyYSIsImlkcyIsIm1hbmdhIiwibWFuZ2FfaWQiLCJpZDEiLCJpZDIiLCJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnRFbGVtZW50Iiwic2VuZE1lc3NhZ2UiLCJ0cmlnZ2VyVGVzdCIsImluaXRJbnRybyIsImJvb2ttYXJrSW1hZ2UiLCJzcmMiLCJnZXRVUkwiLCJuYW1lc3BhY2UiLCJrZXlQYWlycyIsIm9uQ2hhbmdlZCIsIlNvdXJjZXMiLCJoYXNPd25Qcm9wZXJ0eSIsImJpbmQiLCJjYWxsIiwibmF2aWdhdG9yIiwic2VydmljZVdvcmtlciIsImNvbnRyb2xsZXIiLCJwb3N0TWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTyxJQUFNQSxHQUFHLEdBQUcsU0FBTkEsR0FBTSxHQUFrQjtBQUFBLE1BQWpCQyxPQUFpQix1RUFBUCxFQUFPOztBQUNqQyxXQUFTQyxVQUFULENBQXFCQyxNQUFyQixFQUE2QjtBQUN6QixXQUFPQyxLQUFLLFdBQUlILE9BQUosbUJBQTJCO0FBQ25DSSxZQUFNLEVBQUUsTUFEMkI7QUFFbkNDLFVBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVMLE1BQWYsQ0FGNkI7QUFHbkNNLGFBQU8sRUFBRTtBQUNMQyxjQUFNLEVBQUUsa0JBREg7QUFFTCx3QkFBZ0I7QUFGWDtBQUgwQixLQUEzQixDQUFMLENBUUZDLElBUkUsQ0FRRyxVQUFDQyxHQUFEO0FBQUEsYUFBU0EsR0FBRyxDQUFDQyxJQUFKLEVBQVQ7QUFBQSxLQVJILEVBU0ZDLEtBVEUsQ0FTSSxVQUFDQyxLQUFEO0FBQUEsYUFBWTtBQUFFQyxhQUFLLEVBQUUsS0FBVDtBQUFnQkQsYUFBSyxFQUFMQTtBQUFoQixPQUFaO0FBQUEsS0FUSixFQVVGSixJQVZFLENBVUcsVUFBQ00sSUFBRDtBQUFBLGFBQVVBLElBQUksQ0FBQ0MsT0FBZjtBQUFBLEtBVkgs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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DLGNBQWM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLGtCQUFrQjtBQUNuRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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RUFBRWIsZ0VBQWNBO0FBUEssQ0FBRCxDQUEvQjtBQVVBMkwsa0RBQVM7QUFDVGpNLDZFQUF1QixDQUFDO0FBQUEsU0FBTWUsUUFBUSxDQUFDYyxnQkFBVCxFQUFOO0FBQUEsQ0FBRCxDQUF2QjtBQUNBbEUsaUVBQWlCLENBQUNDLHdDQUFELENBQWpCO0FBQ0EwRyxxRUFBbUIsQ0FBQzFHLHdDQUFELEVBQUtmLEdBQUwsQ0FBbkI7QUFDQWlDLG1FQUFxQixDQUFDbEIsd0NBQUQsRUFBS2YsR0FBTCxDQUFyQjtBQUNBRiw4REFBYyxDQUFDaUIsd0NBQUQsRUFBS2YsR0FBTCxDQUFkO0FBRUF6RyxJQUFJLENBQUMyUCxNQUFMO0FBQ0F5RyxPQUFPLENBQUN6RyxNQUFSLEdBQ0tyUixJQURMLENBQ1VrVSxtREFEVixFIiwiZmlsZSI6ImV4dGVuc2lvbi9wb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUEkgPSAoYmFzZVVybCA9ICcnKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBwb3N0U291cmNlIChzb3VyY2UpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3NvdXJjZXNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzb3VyY2UpLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLnBheWxvYWQpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkU291cmNlRnJvbVVybCAodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9zb3VyY2VzL2FkZEZyb21VcmxgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHVybCB9KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWRVcmxzIChzb3VyY2VzID0gW10sIGxpbWl0ID0gJycsIGRhdGUgPSAnJykge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcclxuICAgICAgICAgICAgYCR7YmFzZVVybH0vYXBpL3VybHMvZmV0Y2hgLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXRcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEucGF5bG9hZCB8fCBbXSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRTdWJzY3JpcHRpb25zICh0b3BpY3MgPSBbXSwga2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9zdWJzY3JpcHRpb25zYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdG9waWNzLFxyXG4gICAgICAgICAgICAgICAga2V5OiBrZXlcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWxldGVTdWJzY3JpcHRpb25zICh0b3BpY3MgPSBbXSwga2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9zdWJzY3JpcHRpb25zYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB0b3BpY3MsXHJcbiAgICAgICAgICAgICAgICBrZXk6IGtleVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWRMaW5rIChrZXksIGNoYW5nZWRTaW5jZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvbGlua3MvJHtrZXl9JHtjaGFuZ2VkU2luY2UgPyBgP2NoYW5nZWRTaW5jZT0ke2NoYW5nZWRTaW5jZX1gIDogJyd9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5zdGF0dXMgPT09IDMwNCA/ICh7IHZhbGlkOiB0cnVlLCBwYXlsb2FkOiBudWxsIH0pIDogcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkSG9zdHMgKCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc291cmNlcy9ob3N0c2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuc3RhdHVzID09PSAzMDQgPyAoeyB2YWxpZDogdHJ1ZSwgcGF5bG9hZDogbnVsbCB9KSA6IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlTGluayAoa2V5LCB1cGRhdGVTZXQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL2xpbmtzLyR7a2V5fWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncHV0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXBkYXRlU2V0KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxpbmsgKGluaXRTZXQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL2xpbmtzYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5pdFNldCksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFVybHM6IHtcclxuICAgICAgICAgICAgcmVhZDogcmVhZFVybHNcclxuICAgICAgICB9LFxyXG4gICAgICAgIFNvdXJjZToge1xyXG4gICAgICAgICAgICBpbnNlcnQ6IHBvc3RTb3VyY2UsXHJcbiAgICAgICAgICAgIGZyb21Vcmw6IGFkZFNvdXJjZUZyb21VcmxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFN1YnNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICBzdWJzY3JpYmU6IGFkZFN1YnNjcmlwdGlvbnMsXHJcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlOiBkZWxldGVTdWJzY3JpcHRpb25zXHJcbiAgICAgICAgfSxcclxuICAgICAgICBMaW5rOiB7XHJcbiAgICAgICAgICAgIGluc2VydDogY3JlYXRlTGluayxcclxuICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGVMaW5rLFxyXG4gICAgICAgICAgICByZWFkOiByZWFkTGlua1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSG9zdHM6IHtcclxuICAgICAgICAgICAgcmVhZDogcmVhZEhvc3RzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IHBhcnNlIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmNvbnN0IE5BTUVTUEFDRVMgPSB7XHJcbiAgICBTWU5DOiAnc3luYycsXHJcbiAgICBMT0NBTDogJ2xvY2FsJ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlREIgKHN0b3JhZ2UpIHtcclxuICAgIGNvbnN0IHsgcmVhZCwgd3JpdGUgfSA9IHN0b3JhZ2VcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiByZWFkU291cmNlcyAoKSB7XHJcbiAgICAgICAgY29uc3QgeyByZWdpc3RyeSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgcmVnaXN0cnk6ICdbXCJzb3VyY2VzLTFcIl0nIH0pXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlKHJlZ2lzdHJ5LCBbJ3NvdXJjZXMtMSddKVxyXG4gICAgICAgICAgICAucmVkdWNlKChzb3VyY2VzLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbc291cmNlcywgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgW2tleV06ICdbXScgfSldKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChbc291cmNlcywgc291cmNlXSkgPT4gc291cmNlcy5jb25jYXQocGFyc2Uoc291cmNlW2tleV0sIFtdKSkpXHJcbiAgICAgICAgICAgIH0sIFByb21pc2UucmVzb2x2ZShbXSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd3JpdGVTb3VyY2VzIChzb3VyY2VzKSB7XHJcbiAgICAgICAgY29uc3QgcmVnaXN0cnkgPSBbXVxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZXMgPSB7fVxyXG4gICAgICAgIGZvciAobGV0IHggPSAxOyB4IDw9IE1hdGgubWF4KDEsIE1hdGguY2VpbChzb3VyY2VzLmxlbmd0aCAvIDIwKSk7IHgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgc291cmNlcy0ke3h9YFxyXG4gICAgICAgICAgICByZWdpc3RyeS5wdXNoKGtleSlcclxuICAgICAgICAgICAgdXBkYXRlc1trZXldID0gSlNPTi5zdHJpbmdpZnkoc291cmNlcy5zbGljZSgoeCAtIDEpICogMjAsIHggKiAyMCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVwZGF0ZXMucmVnaXN0cnkgPSBKU09OLnN0cmluZ2lmeShyZWdpc3RyeSlcclxuICAgICAgICByZXR1cm4gd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB1cGRhdGVzKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGFkZFNvdXJjZSAoc291cmNlKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IHJlYWRTb3VyY2VzKClcclxuICAgICAgICBpZiAoIXNvdXJjZXMuc29tZSgoe3VybCwgbWFuZ2FJZH0pID0+IHNvdXJjZS51cmwgPT09IHVybCAmJiBtYW5nYUlkID09PSBzb3VyY2UubWFuZ2FJZCkpIHtcclxuICAgICAgICAgICAgc291cmNlcy5wdXNoKHNvdXJjZSlcclxuICAgICAgICAgICAgYXdhaXQgd3JpdGVTb3VyY2VzKHNvdXJjZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzb3VyY2VzXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZGVsZXRlU291cmNlIChzb3VyY2VJZCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCByZWFkU291cmNlcygpXHJcbiAgICAgICAgY29uc3QgbmV3U291cmNlcyA9IHNvdXJjZXMuZmlsdGVyKChzb3VyY2UpID0+IHNvdXJjZT8uaWQgIT09IHNvdXJjZUlkKVxyXG4gICAgICAgIGF3YWl0IHdyaXRlU291cmNlcyhuZXdTb3VyY2VzKVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3U291cmNlc1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGlzRGlydHkgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgdXJscywgc291cmNlcyB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLkxPQ0FMLCBbJ3VybHMnLCAnc291cmNlcyddKVxyXG5cclxuICAgICAgICByZXR1cm4gISF1cmxzIHx8ICEhc291cmNlc1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEZpbHRlcmVkU29ydGVkVXJscyAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBoaWRkZW5DaGFwdGVyczogaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIGhpZGUgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nLCBoaWRlOiAwIH0pXHJcbiAgICAgICAgY29uc3QgeyB1cmxzIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIHsgdXJsczogJ1tdJyB9KVxyXG5cclxuICAgICAgICBjb25zdCBoaWRkZW5DaGFwdGVycyA9IHBhcnNlKGhpZGRlbkNoYXB0ZXJzU3RyaW5nLCB7fSlcclxuICAgICAgICBjb25zdCB1cmxMaXN0ID0gcGFyc2UodXJscywgW10pXHJcblxyXG4gICAgICAgIGNvbnN0IGNoZWNrT2xkID0gKGNoYXB0ZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhpZGUgJiYgY2hhcHRlci5jcmVhdGVkIDwgaGlkZSB8fCBoaWRkZW5DaGFwdGVyc1tjaGFwdGVyLmlkXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IFtvbGRVcmxzLCBuZXdVcmxzXSA9IE9iamVjdC52YWx1ZXModXJsTGlzdClcclxuICAgICAgICAgICAgLnNvcnQoKHVybDEsIHVybDIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpZmYgPSB1cmwyLmNyZWF0ZWQgLSB1cmwxLmNyZWF0ZWRcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaWZmKSA8IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcodXJsMSkubG9jYWxlQ29tcGFyZSh1cmwyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpZmZcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoW29sZFVybHMsIG5ld1VybHNdLCB1cmwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja09sZCh1cmwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2xkVXJscy5wdXNoKHVybClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1VybHMucHVzaCh1cmwpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW29sZFVybHMsIG5ld1VybHNdXHJcbiAgICAgICAgICAgIH0sIFtbXSwgW11dKVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBvbGRVcmxzLFxyXG4gICAgICAgICAgICBuZXdVcmxzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGhpZGVVcmwgKGlkKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScgfSlcclxuICAgICAgICBjb25zdCBoaWRkZW5DaGFwdGVycyA9IHBhcnNlKHJlc3VsdC5oaWRkZW5DaGFwdGVycywge30pXHJcbiAgICAgICAgaGlkZGVuQ2hhcHRlcnNbaWRdID0gdHJ1ZVxyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6IEpTT04uc3RyaW5naWZ5KGhpZGRlbkNoYXB0ZXJzKSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGhpZGVBbGxVcmxzICh0aW1lc3RhbXApIHtcclxuICAgICAgICByZXR1cm4gd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nLCBoaWRlOiB0aW1lc3RhbXAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3cml0ZVVybHMgKHVybHMpIHtcclxuICAgICAgICByZXR1cm4gd3JpdGUoTkFNRVNQQUNFUy5MT0NBTCwgeyB1cmxzOiBKU09OLnN0cmluZ2lmeSh1cmxzKSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGluaXQgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZTogZmFsc2UgfSlcclxuICAgICAgICBpZiAoIWhpZGUpIHtcclxuICAgICAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApXHJcbiAgICAgICAgICAgIGF3YWl0IHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRlOiB0b2RheS5nZXRUaW1lKCl9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBzZXRNYXhPbGQgKG1heE9sZCkge1xyXG4gICAgICAgIGF3YWl0IHdyaXRlKE5BTUVTUEFDRVMuTE9DQUwsIHsgbWF4T2xkIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TWF4T2xkICgpIHtcclxuICAgICAgICBjb25zdCB7IG1heE9sZCB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLkxPQ0FMLCB7IG1heE9sZDogMjUgfSlcclxuICAgICAgICByZXR1cm4gbWF4T2xkXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2V0TGluayAobGluaykge1xyXG4gICAgICAgIGF3YWl0IHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgeyBsaW5rIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TGluayAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBsaW5rIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgWydsaW5rJ10pXHJcbiAgICAgICAgcmV0dXJuIGxpbmtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRIaWRlICgpIHtcclxuICAgICAgICBjb25zdCB7IGhpZGUgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGU6IDAgfSlcclxuICAgICAgICByZXR1cm4gaGlkZVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHdyaXRlTG9jYWxTZXR0aW5ncyAoc2V0dGluZ3MpIHtcclxuICAgICAgICByZXR1cm4gd3JpdGUoTkFNRVNQQUNFUy5MT0NBTCwgeyBsb2NhbFNldHRpbmdzOiBKU09OLnN0cmluZ2lmeShzZXR0aW5ncykgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRMb2NhbFNldHRpbmdzICgpIHtcclxuICAgICAgICBjb25zdCB7IGxvY2FsU2V0dGluZ3MgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgeyBsb2NhbFNldHRpbmdzOiAne30nIH0pXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlKGxvY2FsU2V0dGluZ3MsIHt9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldExpbmtEYXRhICgpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgcmVhZFNvdXJjZXMoKVxyXG4gICAgICAgIGNvbnN0IHsgaGlkZGVuQ2hhcHRlcnM6IGhpZGRlbkNoYXB0ZXJzU3RyaW5nLCBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JywgaGlkZTogMCB9KVxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UoaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIHt9KVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzb3VyY2VzOiBzb3VyY2VzLm1hcCgoc291cmNlKSA9PiBzb3VyY2UuaWQpLFxyXG4gICAgICAgICAgICBoaWRkZW5DaGFwdGVycyxcclxuICAgICAgICAgICAgaGlkZTogTnVtYmVyKGhpZGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldExpbmtEYXRhICh7c291cmNlcywgaGlkZGVuQ2hhcHRlcnMsIGhpZGV9KSB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmVkU291cmNlcyA9IChhd2FpdCByZWFkU291cmNlcygpKS5yZWR1Y2UoKHNzLCBzb3VyY2UpID0+IHNvdXJjZSA/ICh7Li4uc3MsIFtzb3VyY2UuaWRdOiB0cnVlfSkgOiBzcywge30pXHJcbiAgICAgICAgY29uc3QgaGFzQ2hhbmdlZFNvdXJjZXMgPSBPYmplY3Qua2V5cyhzdG9yZWRTb3VyY2VzKS5sZW5ndGggIT09IHNvdXJjZXMubGVuZ3RoIHx8XHJcbiAgICAgICAgICAgIHNvdXJjZXMuc29tZSgoc291cmNlKSA9PiAhc3RvcmVkU291cmNlc1tzb3VyY2UuaWRdKVxyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW1Byb21pc2UucmVzb2x2ZSgpXVxyXG4gICAgICAgIGlmIChoYXNDaGFuZ2VkU291cmNlcykge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHdyaXRlU291cmNlcyhzb3VyY2VzKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaGlkZGVuID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IDAgfSlcclxuICAgICAgICBpZiAoaGlkZGVuLmhpZGRlbkNoYXB0ZXJzICE9PSBKU09OLnN0cmluZ2lmeShoaWRkZW5DaGFwdGVycykgfHwgU3RyaW5nKGhpZGRlbi5oaWRlKSAhPT0gU3RyaW5nKGhpZGUpKSB7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2god3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5DaGFwdGVyczogSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ2hhcHRlcnMpLFxyXG4gICAgICAgICAgICAgICAgaGlkZVxyXG4gICAgICAgICAgICB9KSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKVxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc291cmNlczoge1xyXG4gICAgICAgICAgICByZWFkOiByZWFkU291cmNlcyxcclxuICAgICAgICAgICAgaW1wb3J0OiB3cml0ZVNvdXJjZXMsXHJcbiAgICAgICAgICAgIGFkZDogYWRkU291cmNlLFxyXG4gICAgICAgICAgICBkZWxldGU6IGRlbGV0ZVNvdXJjZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgbG9jYWw6IHtcclxuICAgICAgICAgICAgICAgIHJlYWQ6IGdldExvY2FsU2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBzZXQ6IHdyaXRlTG9jYWxTZXR0aW5nc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0RpcnR5LFxyXG4gICAgICAgIHVybHM6IHtcclxuICAgICAgICAgICAgcmVhZDogZ2V0RmlsdGVyZWRTb3J0ZWRVcmxzLFxyXG4gICAgICAgICAgICBoaWRlOiBoaWRlVXJsLFxyXG4gICAgICAgICAgICBoaWRlQWxsOiBoaWRlQWxsVXJscyxcclxuICAgICAgICAgICAgaW1wb3J0OiB3cml0ZVVybHMsXHJcbiAgICAgICAgICAgIHNldE1heE9sZCxcclxuICAgICAgICAgICAgZ2V0TWF4T2xkLFxyXG4gICAgICAgICAgICBnZXRIaWRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNoYW5nZTogc3RvcmFnZS5hZGRMaXN0ZW5lcixcclxuICAgICAgICBsaW5rOiB7XHJcbiAgICAgICAgICAgIHNldDogc2V0TGluayxcclxuICAgICAgICAgICAgcmVhZDogZ2V0TGluayxcclxuICAgICAgICAgICAgbG9jYWw6IGdldExpbmtEYXRhLFxyXG4gICAgICAgICAgICBzZXRMb2NhbDogc2V0TGlua0RhdGFcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbmRlckhvc3RMaXN0IChfZGIsIGFwaSkge1xyXG4gICAgY29uc3QgeyBIb3N0cyB9ID0gYXBpXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBIb3N0cy5yZWFkKClcclxuICAgIGNvbnN0IGhvc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG9zdHMnKVxyXG4gICAgaWYgKHJlc3VsdC52YWxpZCkge1xyXG4gICAgICAgIGNvbnN0IGhvc3RzID0gcmVzdWx0LnBheWxvYWRcclxuXHJcbiAgICAgICAgY29uc3QgaG9zdExpc3QgPSBob3N0cy5zdGFibGVcclxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IFN0cmluZyhhPy5uYW1lKS5sb2NhbGVDb21wYXJlKGI/Lm5hbWUpKVxyXG4gICAgICAgICAgICAubWFwKChob3N0KSA9PiBgPGEgaHJlZj1cIiR7aG9zdC51cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIj4ke2hvc3QubmFtZX08L2E+YCkuam9pbignPHNwYW4+LCA8L3NwYW4+JylcclxuICAgICAgICBob3N0Q29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGg2PlN1cHBvcnRlZCBQYWdlczwvaDY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5rLWxpc3RcIj4ke2hvc3RMaXN0fTwvZGl2PlxyXG4gICAgICAgIGBcclxuXHJcbiAgICAgICAgaWYgKGhvc3RzLnVuc3RhYmxlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBob3N0TGlzdCA9IGhvc3RzLnVuc3RhYmxlXHJcbiAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gU3RyaW5nKGE/Lm5hbWUpLmxvY2FsZUNvbXBhcmUoYj8ubmFtZSkpXHJcbiAgICAgICAgICAgICAgICAubWFwKChob3N0KSA9PiBgPGEgaHJlZj1cIiR7aG9zdC51cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIj4ke2hvc3QubmFtZX08L2E+YCkuam9pbignPHNwYW4+LCA8L3NwYW4+JylcclxuICAgICAgICAgICAgaG9zdENvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPHA+VGhlc2UgUGFnZXMgaGFkIHNvbWUgcHJvYmxlbXMgcmVjZW50bHkgJm5kYXNoOyB0aGV5IG1pZ2h0IG9yIG1pZ2h0IG5vdCB3b3JrOjwvcD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5rLWxpc3RcIj4ke2hvc3RMaXN0fTwvZGl2PlxyXG4gICAgICAgICAgICBgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGhvc3RDb250YWluZXIuaW5uZXJIVE1MICs9IGBcclxuICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5NYW55IG90aGVyIHBhZ2VzIGNhbiB3b3JrIGFzIHdlbGwsIGlmIHRoZXkgdXNlIHRoZSA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly90aGVtZWZvcmVzdC5uZXQvaXRlbS9tYWRhcmEtd29yZHByZXNzLXRoZW1lLWZvci1tYW5nYS8yMDg0OTgyOFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCI+TWFkYXJhLTwvYT5cclxuICAgICAgICAgICAgICAgIDxzcGFuPiBvciA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly90aGVtZXNpYS5jb20vbWFuZ2FzdHJlYW0td29yZHByZXNzLXRoZW1lL1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCI+TWFuZ2FTdHJlYW0tVGhlbWU8L2E+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj4gb3IgYXJlIGJ1aWx0IHVzaW5nIHRoZSA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9nZW5rYW4uaW8vZ3JvdXBzXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIj5HZW5rYW4gUmVhZGVyPC9hPjxzcGFuPi48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICBgXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHNhdmVBcyBmcm9tICdzYXZlLWFzJ1xyXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkSW1wb3J0SGFuZGxlcnMgKGRiKSB7XHJcbiAgICBjb25zdCBpbXBvcnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltcG9ydCcpXHJcbiAgICBjb25zdCBleHBvcnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4cG9ydCcpXHJcblxyXG4gICAgaW1wb3J0RWxlbS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlc1swXVxyXG4gICAgICAgIGNvbnN0IGZyID0gbmV3IEZpbGVSZWFkZXIoKVxyXG4gICAgICAgIGZyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZXMgPSBwYXJzZShmci5yZXN1bHQsIFtdKVxyXG4gICAgICAgICAgICBjb25zdCBjbGVhbiA9IHNvdXJjZXMuZmlsdGVyKChzb3VyY2UpID0+IHNvdXJjZT8udGl0bGUgJiYgc291cmNlLnVybCAmJiBzb3VyY2UubWFuZ2FJZClcclxuICAgICAgICAgICAgaWYgKGNsZWFuLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZGIuc291cmNlcy5pbXBvcnQoY2xlYW4pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW1wb3J0RWxlbS5maWxlcyA9IG51bGxcclxuICAgICAgICB9KVxyXG4gICAgICAgIGZyLnJlYWRBc1RleHQoZmlsZSlcclxuICAgIH0pXHJcblxyXG4gICAgZXhwb3J0RWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkYi5zb3VyY2VzLnJlYWQoKVxyXG4gICAgICAgICAgICAudGhlbigoc291cmNlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShzb3VyY2VzKV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pXHJcbiAgICAgICAgICAgICAgICBzYXZlQXMoYmxvYiwgJ21hbmdhcG9sbC5qc29uJylcclxuICAgICAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IGdldExpbmtRdWVyeSwgbGlua0lmVW5saW5rZWQgfSBmcm9tICcuL3NldHRpbmdzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTWVudUxpc3RlbmVycyAoZGIsIEFwaSkge1xyXG4gICAgY29uc3QgaW1wb3J0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5pbXBvcnQnKVxyXG4gICAgY29uc3QgcG9wdXBUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cFRpdGxlJylcclxuICAgIGNvbnN0IGJvb2ttYXJrcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQnKVxyXG4gICAgY29uc3QgdXJscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmxzJylcclxuICAgIGNvbnN0IGNoYXB0ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXB0ZXJzJylcclxuICAgIGNvbnN0IGFkZFNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkU2VjdGlvbicpXHJcbiAgICBjb25zdCBzb3VyY2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZXMnKVxyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0dGluZ3MnKVxyXG4gICAgY29uc3Qgc2V0dGluZ3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzJylcclxuICAgIGNvbnN0IHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2dyZXNzJylcclxuICAgIGNvbnN0IGludHJvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvJylcclxuXHJcbiAgICBjb25zdCBvcGVuQ2hhcHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgICAgZGIuc291cmNlcy5yZWFkKClcclxuICAgICAgICAgICAgLnRoZW4oKHNvdXJjZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSBzb3VyY2VzLmxlbmd0aCA/ICdub25lJyA6ICdmbGV4J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIHNvdXJjZXMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGltcG9ydFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGFkZFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgdXJscy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBwcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBjaGFwdGVycy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgYm9va21hcmtzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHBvcHVwVGl0bGUuaW5uZXJUZXh0ID0gJ0NoYXB0ZXJzJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wZW5TZXR0aW5ncyA9ICgpID0+IHtcclxuICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc291cmNlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICB1cmxzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwb3B1cFRpdGxlLmlubmVyVGV4dCA9ICdTZXR0aW5ncydcclxuICAgICAgICBib29rbWFya3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgY2hhcHRlcnMuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgfVxyXG5cclxuICAgIGNoYXB0ZXJzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbkNoYXB0ZXJzKVxyXG5cclxuICAgIGJvb2ttYXJrcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc291cmNlcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIGltcG9ydFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgIGFkZFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHVybHMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHBvcHVwVGl0bGUuaW5uZXJUZXh0ID0gJ0Jvb2ttYXJrcydcclxuICAgICAgICBib29rbWFya3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGNoYXB0ZXJzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgfSlcclxuXHJcbiAgICBzZXR0aW5ncy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5TZXR0aW5ncylcclxuXHJcbiAgICBpZiAoZ2V0TGlua1F1ZXJ5KCkpIHtcclxuICAgICAgICBvcGVuU2V0dGluZ3MoKVxyXG4gICAgICAgIGxpbmtJZlVubGlua2VkKGRiLCBBcGkpXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBvcGVuQ2hhcHRlcnMoKVxyXG4gICAgfVxyXG59XHJcbiIsImNvbnN0IHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2dyZXNzJylcclxuXHJcbmxldCBsb2NrZWQgPSBmYWxzZVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc2lzdGVyUHJvZ3Jlc3NIYW5kbGVyID0gKHVwZGF0ZU5vdykgPT4ge1xyXG4gICAgcHJvZ3Jlc3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdXBkYXRlTm93KClcclxuICAgICAgICBtYXJrUmVmcmVzaGVkKClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtYXJrUmVmcmVzaGVkID0gKCkgPT4ge1xyXG4gICAgcHJvZ3Jlc3MuaW5uZXJIVE1MID0gJyhSZWZyZXNoZWQhKSdcclxuICAgIHByb2dyZXNzLmRhdGFzZXQuYmVmb3JlID0gJyhSZWZyZXNoZWQhKSdcclxuICAgIGxvY2tlZCA9IHRydWVcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGxvY2tlZCA9IGZhbHNlXHJcbiAgICAgICAgcHJvZ3Jlc3MuZGF0YXNldC5iZWZvcmUgPSAnKFJlZnJlc2ggbm93ISknXHJcbiAgICB9LCAxNTAwKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlUHJvZ3Jlc3MgPSAoX2xhc3RQaW5nLCBuZXh0UGluZykgPT4ge1xyXG4gICAgaWYgKCFsb2NrZWQpIHtcclxuICAgICAgICBjb25zdCByZW1haW5pbmcgPSBuZXh0UGluZyAtIERhdGUubm93KClcclxuXHJcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IE1hdGgubWF4KE1hdGgucm91bmQocmVtYWluaW5nIC8gMTAwMCksIDApXHJcblxyXG4gICAgICAgIHByb2dyZXNzLmlubmVySFRNTCA9IGAoTmV4dCByZWZyZXNoOiAke3NlY29uZHN9cylgXHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVNjaGVkdWxlID0gKHsgaXNBY3RpdmUgPSBmYWxzZSwgaW50ZXJ2YWwgPSAwLCBjYWxsYmFjayA9IEZ1bmN0aW9uLnByb3RvdHlwZSwgdXBkYXRlciB9ID0ge30pID0+IHtcclxuICAgIGxldCBuZXh0UGluZyA9IDBcclxuICAgIGxldCBsYXN0UGluZyA9IDBcclxuICAgIGNvbnN0IGNhbGxDYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICBpZiAobmV4dFBpbmcgJiYgbmV4dFBpbmcgPD0gRGF0ZS5ub3coKSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgICAgICAgIGxhc3RQaW5nID0gbmV4dFBpbmdcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBuZXh0UGluZyArIGludGVydmFsID4gRGF0ZS5ub3coKSA/IG5leHRQaW5nICsgaW50ZXJ2YWwgOiBEYXRlLm5vdygpICsgaW50ZXJ2YWxcclxuICAgICAgICB9XHJcbiAgICAgICAgdHlwZW9mIHVwZGF0ZXIgPT09ICdmdW5jdGlvbicgJiYgdXBkYXRlcihsYXN0UGluZywgbmV4dFBpbmcpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzQWN0aXZlICYmIGludGVydmFsKSB7XHJcbiAgICAgICAgbmV4dFBpbmcgPSBEYXRlLm5vdygpIC0gMVxyXG4gICAgICAgIGNhbGxDYWxsYmFjaygpXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRpbWVyID0gc2V0SW50ZXJ2YWwoY2FsbENhbGxiYWNrLCAxMDApXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzZXRJbnRlcnZhbCAobmV3SW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdJbnRlcnZhbCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndXNlIGEgbnVtYmVyJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXh0UGluZyA9IG5leHRQaW5nIC0gaW50ZXJ2YWwgKyBuZXdJbnRlcnZhbFxyXG4gICAgICAgICAgICBpbnRlcnZhbCA9IG5ld0ludGVydmFsXHJcbiAgICAgICAgICAgIGNhbGxDYWxsYmFjaygpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRDYWxsYmFjayAoY2IpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sgPSBjYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RhcnQgKCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgICAgICAgIGxhc3RQaW5nID0gRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICBuZXh0UGluZyA9IERhdGUubm93KCkgKyBpbnRlcnZhbFxyXG4gICAgICAgICAgICB0aW1lciA9IHNldEludGVydmFsKGNhbGxDYWxsYmFjaywgMTAwKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHJpZ2dlckluc3RhbnRseSAoKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gRGF0ZS5ub3coKSArIGludGVydmFsXHJcbiAgICAgICAgICAgIHR5cGVvZiB1cGRhdGVyID09PSAnZnVuY3Rpb24nICYmIHVwZGF0ZXIobGFzdFBpbmcsIG5leHRQaW5nKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RvcCAoKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gMFxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiY29uc3QgbGlua0ZpZWxkcyA9IFsnaGlkZScsICdoaWRkZW5DaGFwdGVycycsICdzb3VyY2VzJ11cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdEtleSAoa2V5ID0gJycpIHtcclxuICAgIHJldHVybiBgJHtrZXkuc2xpY2UoMCwgNSl9LSR7a2V5LnNsaWNlKDUsIDEwKX0tJHtrZXkuc2xpY2UoMTAsIDE1KX1gXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW5rSGVscGVycyAoZGIsIEFwaSkge1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gcHVzaExpbmtVcGRhdGUgKGNoYW5nZXMpIHtcclxuICAgICAgICBjb25zdCBjaGFuZ2VzZXQgPSBsaW5rRmllbGRzLmZpbHRlcigoa2V5KSA9PiBPYmplY3Qua2V5cyhjaGFuZ2VzKS5zb21lKChjaGFuZ2UpID0+IGNoYW5nZS5pbmNsdWRlcyhrZXkpKSlcclxuXHJcbiAgICAgICAgaWYgKGNoYW5nZXNldC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpIHx8IHt9XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsID0gYXdhaXQgZGIubGluay5sb2NhbCgpIHx8IHt9XHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9IHt9XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzZXQuaW5jbHVkZXMoJ2hpZGUnKSkge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlLmhpZGUgPSBsb2NhbC5oaWRlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoYW5nZXNldC5pbmNsdWRlcygnaGlkZGVuQ2hhcHRlcnMnKSkge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlLmhpZGRlbkNoYXB0ZXJzID0gbG9jYWwuaGlkZGVuQ2hhcHRlcnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc2V0LmluY2x1ZGVzKCdzb3VyY2VzJykpIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZS5zb3VyY2VzID0gbG9jYWwuc291cmNlc1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXModXBkYXRlKS5sZW5ndGggJiYgbGluay5rZXkpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IEFwaS5MaW5rLnVwZGF0ZShsaW5rLmtleSwgdXBkYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy52YWxpZCAmJiBkYi5saW5rLnNldCh7IGtleTogcmVzLnBheWxvYWQua2V5IH0pKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoTGlua1VwZGF0ZSAoKSB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcblxyXG4gICAgICAgIGlmIChsaW5rKSB7XHJcbiAgICAgICAgICAgIEFwaS5MaW5rLnJlYWQobGluay5rZXksIGxpbmsubGFzdE1vZGlmaWVkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMudmFsaWQgJiYgcmVzLnBheWxvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGIubGluay5zZXRMb2NhbChyZXMucGF5bG9hZClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcHVzaExpbmtVcGRhdGUsXHJcbiAgICAgICAgZmV0Y2hMaW5rVXBkYXRlXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVmFsaWRMaW5rS2V5IChrZXkpIHtcclxuICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsZWFuS2V5ID0ga2V5LnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpXHJcbiAgICBpZiAoY2xlYW5LZXkubGVuZ3RoID09PSAxNSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW5rUXVlcnkgKCkge1xyXG4gICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKVxyXG5cclxuICAgIGlmIChpc1ZhbGlkTGlua0tleSh1cmxQYXJhbXMuZ2V0KCdsaW5rJykpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVybFBhcmFtcy5nZXQoJ2xpbmsnKS5yZXBsYWNlQWxsKC9bXlxcZF0qL2csICcnKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGlua0lmVW5saW5rZWQgKGRiLCBhcGkpIHtcclxuICAgIGNvbnN0IGtleSA9IGdldExpbmtRdWVyeSgpXHJcblxyXG4gICAgaWYgKGtleSkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRMaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuXHJcbiAgICAgICAgaWYgKCFjdXJyZW50TGluayB8fCAhY3VycmVudExpbmsua2V5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtJbnB1dDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMScpXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtJbnB1dDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMicpXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtJbnB1dDMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMycpXHJcblxyXG4gICAgICAgICAgICBsaW5rSW5wdXQxLnZhbHVlID0ga2V5LnNsaWNlKDAsIDUpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSBrZXkuc2xpY2UoNSwgMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBrZXkuc2xpY2UoMTAsIDE1KVxyXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgY29ubmVjdFRvTGluayhrZXksIGFwaSwgZGIpXHJcblxyXG4gICAgICAgICAgICBpZiAobGluayAmJiBsaW5rLmtleSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlua051bWJlclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1pZCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmsnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlua0xpbmtUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluay10ZXh0JylcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VubGluay1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rTGlua1RleHQuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rTGluay5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rLmlubmVyVGV4dCA9IGBodHRwczovL21hbmdhLmZvY2hsYWMuY29tP2xpbms9JHtsaW5rLmtleX1gXHJcbiAgICAgICAgICAgICAgICBsaW5rTGluay5ocmVmID0gYGh0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20/bGluaz0ke2xpbmsua2V5fWBcclxuICAgICAgICAgICAgICAgIGxpbmtOdW1iZXJUZXh0LmlubmVyVGV4dCA9IGAke2xpbmsua2V5LnNsaWNlKDAsIDUpfS0ke2xpbmsua2V5LnNsaWNlKDUsIDEwKX0tJHtsaW5rLmtleS5zbGljZSgxMCl9YFxyXG4gICAgICAgICAgICAgICAgbGlua051bWJlclRleHQuc3R5bGUuY29sb3IgPSAnIzAwMGMyMSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmb3JtYXRLZXkoY3VycmVudExpbmsua2V5KSAhPT0gZm9ybWF0S2V5KGtleSkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlua0xpbmtXYXJuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluay13YXJuaW5nJylcclxuICAgICAgICAgICAgY29uc3Qgd2FybkxpbmtDdXJyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dhcm4tY3VycmVudC1saW5rJylcclxuICAgICAgICAgICAgY29uc3Qgd2FybkxpbmtOZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2Fybi1uZXctbGluaycpXHJcblxyXG4gICAgICAgICAgICBsaW5rTGlua1dhcm4uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgICAgICB3YXJuTGlua0N1cnJlbnQuaW5uZXJUZXh0ID0gZm9ybWF0S2V5KGN1cnJlbnRMaW5rLmtleSlcclxuICAgICAgICAgICAgd2FybkxpbmtOZXcuaW5uZXJUZXh0ID0gZm9ybWF0S2V5KGtleSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RUb0xpbmsgKGtleSwgYXBpLCBkYikge1xyXG4gICAgY29uc3QgeyBMaW5rIH0gPSBhcGlcclxuICAgIGNvbnN0IGxpbmtFcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWVycm9yJylcclxuICAgIGNvbnN0IGxpbmtQcm9ncmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLXByb2dyZXNzJylcclxuICAgIGNvbnN0IGNyZWF0ZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWxpbmstYnV0dG9uJylcclxuICAgIGNvbnN0IGxpbmtCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1idXR0b24nKVxyXG4gICAgbGlua0Vycm9yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIGxpbmtQcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgY3JlYXRlTGluay5kaXNhYmxlZCA9IHRydWVcclxuICAgIGxpbmtCdXR0b24uZGlzYWJsZWQgPSB0cnVlXHJcblxyXG4gICAgY29uc3QgbGlua1Jlc3VsdCA9IGF3YWl0IExpbmsucmVhZChrZXkpXHJcbiAgICBjcmVhdGVMaW5rLmRpc2FibGVkID0gZmFsc2VcclxuICAgIGxpbmtCdXR0b24uZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgbGlua1Byb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIGlmIChsaW5rUmVzdWx0Py52YWxpZCkge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBsaW5rUmVzdWx0LnBheWxvYWRcclxuICAgICAgICBhd2FpdCBkYi5saW5rLnNldCh7IGtleTogbGluay5rZXkgfSlcclxuICAgICAgICBhd2FpdCBkYi5saW5rLnNldExvY2FsKGxpbmspXHJcblxyXG4gICAgICAgIHJldHVybiBsaW5rXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBsaW5rRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGlua0xpbmtXYXJuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluay13YXJuaW5nJylcclxuXHJcbiAgICBpZiAobGlua0xpbmtXYXJuKSB7XHJcbiAgICAgICAgbGlua0xpbmtXYXJuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNldHRpbmdzSGFuZGxlcnMgKGRiLCBhcGkpIHtcclxuICAgIGNvbnN0IHsgTGluayB9ID0gYXBpXHJcblxyXG4gICAgY29uc3QgY3JlYXRlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctbGluay1idXR0b24nKVxyXG4gICAgY29uc3QgdXBkYXRlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGRhdGUtbGlua2luZycpXHJcbiAgICBjb25zdCBsaW5rTnVtYmVyVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWlkJylcclxuICAgIGNvbnN0IGxpbmtMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluaycpXHJcbiAgICBjb25zdCBsaW5rTGlua1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXRleHQnKVxyXG4gICAgY29uc3QgbGlua2luZ1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1zZWN0aW9uJylcclxuICAgIGNvbnN0IHVubGlua1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5saW5rLXNlY3Rpb24nKVxyXG4gICAgY29uc3QgdW5saW5rQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VubGluay1idXR0b24nKVxyXG4gICAgY29uc3QgbGlua0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWJ1dHRvbicpXHJcbiAgICBjb25zdCBsaW5rSW5wdXQxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTEnKVxyXG4gICAgY29uc3QgbGlua0lucHV0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0yJylcclxuICAgIGNvbnN0IGxpbmtJbnB1dDMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMycpXHJcblxyXG4gICAgbGlua0lucHV0MS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBudW1iZXIgPSBsaW5rSW5wdXQxLnZhbHVlLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpLnNsaWNlKDAsIDE1KVxyXG4gICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSBudW1iZXIuc2xpY2UoMCwgNSlcclxuICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA+IDUpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IG51bWJlci5zbGljZSg1LCAxMClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG51bWJlci5sZW5ndGggPiAxMCkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gbnVtYmVyLnNsaWNlKDEwKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLmZvY3VzKClcclxuICAgICAgICAgICAgbGlua0lucHV0My5zZXRTZWxlY3Rpb25SYW5nZShudW1iZXIubGVuZ3RoIC0gMTAsIG51bWJlci5sZW5ndGggLSAxMClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobnVtYmVyLmxlbmd0aCA+PSA1KSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIuZm9jdXMoKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnNldFNlbGVjdGlvblJhbmdlKG51bWJlci5sZW5ndGggLSA1LCBudW1iZXIubGVuZ3RoIC0gNSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGlua0lucHV0Mi5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBudW1iZXIgPSBsaW5rSW5wdXQyLnZhbHVlLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpLnNsaWNlKDAsIDEwKVxyXG4gICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSBudW1iZXIuc2xpY2UoMCwgNSlcclxuICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA+PSA1KSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoNSwgMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuZm9jdXMoKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnNldFNlbGVjdGlvblJhbmdlKG51bWJlci5sZW5ndGggLSA1LCBudW1iZXIubGVuZ3RoIC0gNSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGlua0lucHV0My5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBudW1iZXIgPSBsaW5rSW5wdXQzLnZhbHVlLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgaWYgKGxpbmtJbnB1dDMudmFsdWUgIT09IG51bWJlci5zbGljZSgwLCA1KSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gbnVtYmVyLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBmdW5jdGlvbiB3cml0ZVN0YXRlVG9Eb20gKGxpbmspIHtcclxuICAgICAgICBsaW5raW5nU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICdub25lJyA6ICcnXHJcbiAgICAgICAgdW5saW5rU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICcnIDogJ25vbmUnXHJcbiAgICAgICAgaWYgKGxpbmtMaW5rVGV4dCkge1xyXG4gICAgICAgICAgICBsaW5rTGlua1RleHQuc3R5bGUuZGlzcGxheSA9IGxpbmsgPyAnJyA6ICdub25lJ1xyXG4gICAgICAgICAgICBsaW5rTGluay5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICcnIDogJ25vbmUnXHJcbiAgICAgICAgICAgIGxpbmtMaW5rLmlubmVyVGV4dCA9IGxpbmsgPyBgaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbT9saW5rPSR7bGluay5rZXl9YCA6ICcnXHJcbiAgICAgICAgICAgIGxpbmtMaW5rLmhyZWYgPSBsaW5rID8gYGh0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20/bGluaz0ke2xpbmsua2V5fWAgOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaW5rTnVtYmVyVGV4dC5pbm5lclRleHQgPSBsaW5rID8gZm9ybWF0S2V5KGxpbmsua2V5KSA6ICdVbmxpbmtlZCdcclxuICAgICAgICBsaW5rTnVtYmVyVGV4dC5jbGFzc0xpc3RbbGluayA/ICdhZGQnIDogJ3JlbW92ZSddKCdsaW5rZWQnKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgd3JpdGVTdGF0ZVRvRG9tKGxpbmspXHJcblxyXG4gICAgaWYgKHVwZGF0ZUxpbmspIHtcclxuICAgICAgICB1cGRhdGVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBnZXRMaW5rUXVlcnkoKVxyXG5cclxuICAgICAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9IGtleS5zbGljZSgwLCA1KVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0ga2V5LnNsaWNlKDUsIDEwKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0ga2V5LnNsaWNlKDEwLCAxNSlcclxuICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXQobnVsbClcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluay13YXJuaW5nJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20oKVxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb25uZWN0VG9MaW5rKGtleSwgYXBpLCBkYilcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKHJlc3VsdClcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rTGlua1dhcm4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1lcnJvcicpXHJcblxyXG4gICAgICAgIGlmIChsaW5rTGlua1dhcm4pIHtcclxuICAgICAgICAgICAgbGlua0xpbmtXYXJuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICAgICAgaWYgKCFsaW5rKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtEYXRhID0gYXdhaXQgZGIubGluay5sb2NhbCgpXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0xpbmtSZXN1bHQgPSBhd2FpdCBMaW5rLmluc2VydChsaW5rRGF0YSlcclxuICAgICAgICAgICAgaWYgKG5ld0xpbmtSZXN1bHQ/LnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gbmV3TGlua1Jlc3VsdC5wYXlsb2FkXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldCh7IGtleTogbGluay5rZXkgfSlcclxuICAgICAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbShsaW5rKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHVubGlua0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgICAgICBpZiAobGluaykge1xyXG4gICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldChudWxsKVxyXG4gICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20odW5kZWZpbmVkKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsaW5rSW5wdXQxLnZhbHVlfSR7bGlua0lucHV0Mi52YWx1ZX0ke2xpbmtJbnB1dDMudmFsdWV9YFxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb25uZWN0VG9MaW5rKGtleSwgYXBpLCBkYilcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKHJlc3VsdClcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgZGFya01vZGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXJrbW9kZS10b2dnbGUnKVxyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBkYi5zZXR0aW5ncy5sb2NhbC5yZWFkKClcclxuICAgIGlmIChzZXR0aW5ncy5kYXJrKSB7XHJcbiAgICAgICAgZGFya01vZGVJbnB1dC5jaGVja2VkID0gdHJ1ZVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5jbGFzc0xpc3QuYWRkKCdkYXJrJylcclxuICAgIH1cclxuICAgIGRhcmtNb2RlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGRiLnNldHRpbmdzLmxvY2FsLnJlYWQoKVxyXG5cclxuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykuY2xhc3NMaXN0LmFkZCgnZGFyaycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykuY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYi5zZXR0aW5ncy5sb2NhbC5zZXQoe1xyXG4gICAgICAgICAgICAuLi5zZXR0aW5ncyxcclxuICAgICAgICAgICAgZGFyazogZS50YXJnZXQuY2hlY2tlZFxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBzb3VyY2VSZW5kZXJlciAoZGIpIHtcclxuICAgIGNvbnN0IHNvdXJjZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291cmNlcycpXHJcblxyXG4gICAgc291cmNlcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsb3Nlc3QgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnJvdyAuYWN0aW9uLmRlbGV0ZScpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3QgJiYgY2xvc2VzdC5kYXRhc2V0WydpZCddICYmIHNvdXJjZXMuY29udGFpbnMoY2xvc2VzdCkpIHtcclxuICAgICAgICAgICAgZGIuc291cmNlcy5kZWxldGUoY2xvc2VzdC5kYXRhc2V0WydpZCddKVxyXG4gICAgICAgICAgICBjbG9zZXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGlvbicpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiByZW5kZXJTb3VyY2VzICgpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZGIuc291cmNlcy5yZWFkKClcclxuXHJcbiAgICAgICAgc291cmNlcy5pbm5lckhUTUwgPSBkYXRhXHJcbiAgICAgICAgICAgIC5zb3J0KChzb3VyY2UxLCBzb3VyY2UyKSA9PiBTdHJpbmcoc291cmNlMS50aXRsZSkubG9jYWxlQ29tcGFyZShzb3VyY2UyPy50aXRsZSkpXHJcbiAgICAgICAgICAgIC5tYXAoKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IFN0cmluZyhzb3VyY2UudXJsKS5yZXBsYWNlKC9odHRwcz86XFwvXFwvLywgJycpLnNwbGl0KCcvJylbMF0uc3BsaXQoJy4nKS5zbGljZSgtMikuam9pbignLicpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIGA8bGkgY2xhc3M9XCJyb3cgc291cmNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhXCIgdGl0bGU9XCIke2Ake3NvdXJjZS50aXRsZX0gKCR7dXJsfSlgfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPiR7c291cmNlLnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWFuZ2EtaWRcIj4oJHt1cmx9KTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVsZXRlIGFjdGlvblwiIGRhdGEtaWQ9XCIke3NvdXJjZS5pZH1cIj5EZWxldGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5gXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5qb2luKCdcXG4nKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyOiAoKSA9PiByZW5kZXJTb3VyY2VzKClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBwYWQgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVybFJlbmRlcmVyIChkYikge1xyXG4gICAgY29uc3QgdXJscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmxzJylcclxuICAgIGNvbnN0IGludHJvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvJylcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBoaWRlIChpZCkge1xyXG4gICAgICAgIGNvbnN0IHsgbmV3VXJscywgb2xkVXJscyB9ID0gYXdhaXQgZGIudXJscy5yZWFkKClcclxuICAgICAgICBpZiAobmV3VXJscy5sZW5ndGggPD0gMSAmJiAoIW5ld1VybHNbMF0gfHwgbmV3VXJsc1swXS5pZCA9PT0gaWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhdGVzdENoYXB0ZXJEYXRlID0gb2xkVXJscy5jb25jYXQobmV3VXJscylcclxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGxjZCwgdXJsKSA9PiB1cmwuY3JlYXRlZCA+IGxjZCA/IHVybC5jcmVhdGVkIDogbGNkLCAwKVxyXG5cclxuICAgICAgICAgICAgZGIudXJscy5oaWRlQWxsKGxhdGVzdENoYXB0ZXJEYXRlICsgMSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRiLnVybHMuaGlkZShpZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXJscy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsb3Nlc3RIaWRlID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5yb3cgLmhpZGUnKVxyXG5cclxuICAgICAgICBpZiAoY2xvc2VzdEhpZGUgJiYgY2xvc2VzdEhpZGUuZGF0YXNldFsnaWQnXSAmJiB1cmxzLmNvbnRhaW5zKGNsb3Nlc3RIaWRlKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBoaWRlKGNsb3Nlc3RIaWRlLmRhdGFzZXRbJ2lkJ10pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNsb3Nlc3RMaW5rID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5yb3cubmV3IC5saW5rJylcclxuICAgICAgICBpZiAoY2xvc2VzdExpbmsgJiYgY2xvc2VzdExpbmsuZGF0YXNldFsnaWQnXSAmJiB1cmxzLmNvbnRhaW5zKGNsb3Nlc3RMaW5rKSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIGF3YWl0IGhpZGUoY2xvc2VzdExpbmsuZGF0YXNldFsnaWQnXSlcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oY2xvc2VzdExpbmsuaHJlZiwgJ19ibGFuaycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNsb3Nlc3RNb3JlID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5hY3Rpb24ubG9hZC1tb3JlJylcclxuICAgICAgICBpZiAoY2xvc2VzdE1vcmUgJiYgdXJscy5jb250YWlucyhjbG9zZXN0TW9yZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgbWF4T2xkID0gYXdhaXQgZGIudXJscy5nZXRNYXhPbGQoKVxyXG4gICAgICAgICAgICBhd2FpdCBkYi51cmxzLnNldE1heE9sZChtYXhPbGQgKyAxMDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhpZGVBbGwgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmhpZGUtYWxsJylcclxuICAgICAgICBpZiAoaGlkZUFsbCAmJiB1cmxzLmNvbnRhaW5zKGhpZGVBbGwpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGRiLnVybHMuaGlkZUFsbChEYXRlLm5vdygpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b3AgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnRvcCcpXHJcbiAgICAgICAgaWYgKHRvcCAmJiB1cmxzLmNvbnRhaW5zKHRvcCkpIHtcclxuICAgICAgICAgICAgdXJscy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBsZXQgbWF4U2Nyb2xsID0gMFxyXG4gICAgdXJscy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gdXJscy5vZmZzZXRIZWlnaHQgKyB1cmxzLnNjcm9sbFRvcFxyXG4gICAgICAgIGlmICh1cmxzLnNjcm9sbEhlaWdodCAtIHNjcm9sbEhlaWdodCA8PSA1MCAmJiBtYXhTY3JvbGwgIT09IHVybHMuc2Nyb2xsSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIG1heFNjcm9sbCA9IHVybHMuc2Nyb2xsSGVpZ2h0XHJcbiAgICAgICAgICAgIGNvbnN0IG1heE9sZCA9IGF3YWl0IGRiLnVybHMuZ2V0TWF4T2xkKClcclxuICAgICAgICAgICAgZGIudXJscy5zZXRNYXhPbGQobWF4T2xkICsgMTAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjaGVja1RvcEJ1dHRvbigpXHJcbiAgICB9KVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrVG9wQnV0dG9uICgpIHtcclxuICAgICAgICBpZiAodXJscy5zY3JvbGxUb3AgPiAwICYmIHVybHMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID09PSB1cmxzLnF1ZXJ5U2VsZWN0b3IoJy5vbGQtY2hhcHRlcnMnKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApIHtcclxuICAgICAgICAgICAgdXJscy5xdWVyeVNlbGVjdG9yKCcub2xkLWNoYXB0ZXJzIC50b3AnKS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSdcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHVybHMucXVlcnlTZWxlY3RvcignLm9sZC1jaGFwdGVycyAudG9wJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVVcmxSZW5kZXJlciAoaXNPbGQpIHtcclxuICAgICAgICByZXR1cm4gKGNoYXB0ZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGNoYXB0ZXIuY3JlYXRlZClcclxuICAgICAgICAgICAgY29uc3QgdGltZVN0cmluZyA9IGAke3BhZChkYXRlLmdldEhvdXJzKCkpfToke3BhZChkYXRlLmdldE1pbnV0ZXMoKSl9YFxyXG4gICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gYCR7cGFkKGRhdGUuZ2V0RGF0ZSgpKX0uJHtwYWQoZGF0ZS5nZXRNb250aCgpICsgMSl9LiR7U3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSkuc2xpY2UoLTIpfWBcclxuICAgICAgICAgICAgY29uc3QgZnVsbERhdGUgPSBkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA9PT0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gPyB0aW1lU3RyaW5nIDogZGF0ZVN0cmluZ1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInJvdyR7aXNPbGQgPyAnIG9sZCcgOiAnIG5ldyd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsaW5rXCIgaHJlZj1cIiR7Y2hhcHRlci51cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIiBkYXRhLWlkPVwiJHtjaGFwdGVyLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2NoYXB0ZXIudGl0bGV9IC0gQ2hhcHRlciAke2NoYXB0ZXIuY2hhcHRlcn1cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRlLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRlXCIgdGl0bGU9XCIke2Ake2RhdGVTdHJpbmd9ICR7dGltZVN0cmluZ31gfVwiPiR7ZnVsbERhdGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhpZGVcIiBkYXRhLWlkPVwiJHtjaGFwdGVyLmlkfVwiPkhpZGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9saT5gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlbmRlclVybHMgKCkge1xyXG4gICAgICAgIGNvbnN0IG1heE9sZCA9IGF3YWl0IGRiLnVybHMuZ2V0TWF4T2xkKClcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgZGIuc291cmNlcy5yZWFkKClcclxuICAgICAgICBjb25zdCB7IG5ld1VybHMsIG9sZFVybHMgfSA9IGF3YWl0IGRiLnVybHMucmVhZCgpXHJcbiAgICAgICAgY29uc3QgbmV3Um93cyA9IG5ld1VybHMubWFwKGNyZWF0ZVVybFJlbmRlcmVyKGZhbHNlKSlcclxuICAgICAgICBjb25zdCBvbGRSb3dzID0gb2xkVXJscy5tYXAoY3JlYXRlVXJsUmVuZGVyZXIodHJ1ZSkpXHJcblxyXG4gICAgICAgIGlmICghc291cmNlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdXJscy5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG5ld1Jvd3MubGVuZ3RoIHx8IG9sZFJvd3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgdXJscy5pbm5lckhUTUwgPSBbXVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdChuZXdSb3dzLmxlbmd0aCA/ICc8bGkgY2xhc3M9XCJuZXctY2hhcHRlcnNcIj5OZXcgQ2hhcHRlcnMgPHNwYW4gY2xhc3M9XCJhY3Rpb24gaGlkZS1hbGxcIj5IaWRlIGFsbDwvc3Bhbj48L2xpPicgOiBbXSlcclxuICAgICAgICAgICAgICAgIC5jb25jYXQobmV3Um93cylcclxuICAgICAgICAgICAgICAgIC5jb25jYXQoJzxsaSBjbGFzcz1cIm9sZC1jaGFwdGVyc1wiPk9sZCBDaGFwdGVycyA8c3BhbiBjbGFzcz1cImFjdGlvbiB0b3BcIj5Ub3AgJiM4NTkzOzwvc3Bhbj48L2xpPicpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG9sZFJvd3Muc2xpY2UoMCwgbWF4T2xkKSlcclxuICAgICAgICAgICAgICAgIC5jb25jYXQob2xkUm93cy5sZW5ndGggPj0gbWF4T2xkID8gWyc8bGkgY2xhc3M9XCJhY3Rpb24gbG9hZC1tb3JlXCI+TG9hZCB1cCB0byAxMDAgbW9yZSBvbGQgY2hhcHRlcnMuLi48L2xpPiddIDogW10pXHJcbiAgICAgICAgICAgICAgICAuam9pbignXFxuJylcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBuZXdSb3dzLmxlbmd0aCA/IGAoJHtuZXdSb3dzLmxlbmd0aH0pIE1hbmdhIFBvbGxgIDogJ01hbmdhIFBvbGwnXHJcbiAgICAgICAgICAgIGNoZWNrVG9wQnV0dG9uKClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgdXJscy5pbm5lckhUTUwgPSAnPGxpIGNsYXNzPVwicm93XCI+Tm8gQ2hhcHRlcnMgYXZhaWxhYmxlLjwvbGk+J1xyXG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9ICdNYW5nYSBQb2xsJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcjogKCkgPT4gcmVuZGVyVXJscygpXHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHBhcnNlIChzdHJpbmcsIGZhbGxiYWNrKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZylcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYWQgKG5vKSB7XHJcbiAgICByZXR1cm4gKCcwMCcgKyBubykuc2xpY2UoLTIpXHJcbn1cclxuIiwiaW1wb3J0IHsgQVBJIH0gZnJvbSAnLi4vY29tbW9uL2FwaSdcclxuaW1wb3J0IHsgQVBJX0FERFJFU1MgfSBmcm9tICcuL2NvbnN0YW50cydcclxuaW1wb3J0IHsgZGIgfSBmcm9tICcuL3N0b3JhZ2UnXHJcblxyXG5sZXQgY3VycmVudFNvdXJjZSA9IG51bGxcclxuXHJcbmNvbnN0IGJvb2ttYXJrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvb2ttYXJrJylcclxuY29uc3QgYm9va21hcmtUcmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib29rbWFyay10cmFjaycpXHJcbmNvbnN0IGJvb2ttYXJrVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9va21hcmstdGl0bGUnKVxyXG5cclxuY29uc3QgeyBTb3VyY2UgfSA9IEFQSShBUElfQUREUkVTUylcclxuXHJcbmJvb2ttYXJrVHJhY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBib29rbWFyay5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpXHJcbiAgICBib29rbWFyay5jbGFzc0xpc3QuYWRkKCdwcm9ncmVzcycpXHJcbiAgICBTb3VyY2UuaW5zZXJ0KGN1cnJlbnRTb3VyY2UpXHJcbiAgICAgICAgLnRoZW4oKHNvdXJjZSkgPT4gc291cmNlICYmIGRiLnNvdXJjZXMuYWRkKHNvdXJjZSkpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBib29rbWFyay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIGJvb2ttYXJrVGl0bGUuaW5uZXJUZXh0ID0gJydcclxuICAgICAgICAgICAgY3VycmVudFNvdXJjZSA9IG51bGxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGJvb2ttYXJrLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJylcclxuICAgICAgICAgICAgYm9va21hcmsuY2xhc3NMaXN0LnJlbW92ZSgncHJvZ3Jlc3MnKVxyXG4gICAgICAgICAgICBib29rbWFya1RyYWNrLmlubmVyVGV4dCA9ICdSZXRyeSdcclxuICAgICAgICAgICAgYm9va21hcmtUaXRsZS5pbm5lclRleHQgPSAnVW5hYmxlIHRvIGNyZWF0ZSBib29rbWFyaywgcGxlYXNlIHJldHJ5IGxhdGVyIGFuZCBpZiBpdCBrZWVwcyBmYWlsaW5nLCBzZW5kIGFuIGVtYWlsIHdpdGggdGhlIHRpbWUgKyB1cmwgdG8gXCJpbmZvQGZvY2hsYWMuY29tXCIuJ1xyXG4gICAgICAgIH0pXHJcbn0pXHJcblxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoYXN5bmMgKHJlcXVlc3QpID0+IHtcclxuICAgIGlmIChyZXF1ZXN0LmlkICYmIHJlcXVlc3QudGl0bGUgJiYgcmVxdWVzdC51cmwpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgZGIuc291cmNlcy5yZWFkKClcclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2VzLnNvbWUoKHNvdXJjZSkgPT4gc291cmNlLnVybC5zcGxpdCgnLycpWzJdID09PSByZXF1ZXN0LnVybC5zcGxpdCgnLycpWzJdICYmIFN0cmluZyhzb3VyY2UubWFuZ2FJZCkgPT09IFN0cmluZyhyZXF1ZXN0LmlkKSkpIHtcclxuICAgICAgICAgICAgYm9va21hcmsuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgICAgICBib29rbWFya1RpdGxlLmlubmVyVGV4dCA9IGBEbyB5b3Ugd2FudCB0byBzdGFydCB0cmFja2luZyBcIiR7cmVxdWVzdC50aXRsZX1cIj9gXHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiByZXF1ZXN0LnR5cGUsXHJcbiAgICAgICAgICAgICAgICBtYW5nYUlkOiByZXF1ZXN0LmlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHJlcXVlc3QudGl0bGUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IHJlcXVlc3QudXJsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJvb2ttYXJrLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIGJvb2ttYXJrVGl0bGUuaW5uZXJUZXh0ID0gJydcclxuICAgIGN1cnJlbnRTb3VyY2UgPSBudWxsXHJcbn0pXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdEJvb2ttYXJrICgpIHtcclxuICAgIGNocm9tZS50YWJzLnF1ZXJ5KFxyXG4gICAgICAgIHsgYWN0aXZlOiB0cnVlLCB3aW5kb3dJZDogY2hyb21lLndpbmRvd3MuV0lORE9XX0lEX0NVUlJFTlQgfSxcclxuICAgICAgICAodGFicykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRhYnNbMF0udXJsLmluY2x1ZGVzKCdjaHJvbWU6Ly8nKSkge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHsgdGFyZ2V0OiB7IHRhYklkOiB0YWJzWzBdLmlkIH0sIGZ1bmN0aW9uOiB0ZXN0IH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRlc3QgKCkge1xyXG4gICAgZnVuY3Rpb24gZGVjb2RlSFRNTEVudGl0aWVzIChzdHIpIHtcclxuICAgICAgICBpZiAoc3RyICYmIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvPHNjcmlwdFtePl0qPihbXFxTXFxzXSo/KTxcXC9zY3JpcHQ+L2dtaSwgJycpXHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC88XFwvP1xcdyg/OlteXCInPl18XCJbXlwiXSpcInwnW14nXSonKSo+L2dtaSwgJycpXHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gc3RyXHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnRleHRDb250ZW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHJcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlIChzdHJpbmcsIGZhbGxiYWNrKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsbGJhY2tcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdEZhbkZveCAoKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKC9eXFwvbWFuZ2FcXC9bXi9dKlxcLy8pPy5bMF1cclxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlYWRlci1oZWFkZXItdGl0bGUtMSBhOmZpcnN0LWNoaWxkJyk/LmlubmVyVGV4dCB8fFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlsLWluZm8tcmlnaHQtdGl0bGUtZm9udCcpPy5pbm5lclRleHRcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ2ZhbmZveCcsXHJcbiAgICAgICAgICAgIGlkOiB1cmwgPyB1cmwuc3BsaXQoJy8nKVsyXSA6IG51bGwsXHJcbiAgICAgICAgICAgIHRpdGxlOiBuYW1lLFxyXG4gICAgICAgICAgICB1cmw6IHVybCA/IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHt1cmx9YCA6IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdE1hbmdhc3RyZWFtICgpIHtcclxuICAgICAgICBjb25zdCBicmVhZGNydW1wTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ29sW2l0ZW10eXBlPVwiaHR0cDovL3NjaGVtYS5vcmcvQnJlYWRjcnVtYkxpc3RcIl0gbWV0YVtpdGVtcHJvcD1cInBvc2l0aW9uXCJdW2NvbnRlbnQ9XCIyXCJdJylcclxuICAgICAgICAgICAgPy5jbG9zZXN0KCdsaScpXHJcbiAgICAgICAgICAgID8ucXVlcnlTZWxlY3RvcignYScpXHJcblxyXG4gICAgICAgIGlmICghYnJlYWRjcnVtcExpbmspIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdXJsID0gYnJlYWRjcnVtcExpbmsuaHJlZlxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBicmVhZGNydW1wTGluay5xdWVyeVNlbGVjdG9yKCdzcGFuJyk/LmlubmVyVGV4dFxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnbWFuZ2FzdHJlYW0nLFxyXG4gICAgICAgICAgICBpZDogdXJsPy5zcGxpdCgnLycpWzRdLFxyXG4gICAgICAgICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgICAgICAgdXJsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RNYW5nYWRleCAoKSB7XHJcbiAgICAgICAgaWYgKC90aXRsZVxcL1tcXGQtXFx3XSpcXC9bXFxkLVxcd10qLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKT8uWzJdXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFuZ2EtY29udGFpbmVyIC50aXRsZSBwJyk/LmlubmVyVGV4dFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdtYW5nYWRleCcsXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBpZCA/IGBodHRwczovL2FwaS5tYW5nYWRleC5vcmcvbWFuZ2EvJHtpZH1gIDogbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKC9jaGFwdGVyXFwvW1xcZC1cXHddKlxcL1xcZCovLnRlc3Qod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYS50ZXh0LXByaW1hcnlbaHJlZio9XCIvdGl0bGUvXCJdJylcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGxpbms/LmlubmVyVGV4dFxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGxpbms/LmhyZWYuc3BsaXQoJy8nKT8uWzRdXHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ21hbmdhZGV4JyxcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGlkID8gYGh0dHBzOi8vYXBpLm1hbmdhZGV4Lm9yZy9tYW5nYS8ke2lkfWAgOiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdEdlbmthbiAoKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbG9jYXRpb24uaHJlZi5tYXRjaCgvaHR0cHM/OlxcL1xcL1teL10qXFwvY29taWNzXFwvKFxcZCopLVstXFx3XFxkXSovKSB8fCBbXVxyXG4gICAgICAgIGNvbnN0IHVybCA9IHJlc3VsdFswXVxyXG4gICAgICAgIGNvbnN0IGlkID0gcmVzdWx0WzFdXHJcblxyXG4gICAgICAgIGlmICghdXJsIHx8ICFpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKC9eXFxkKyQvLnRlc3QobG9jYXRpb24uaHJlZi5zcGxpdCgnLycpLnNsaWNlKC0yKS5qb2luKCcnKS5yZXBsYWNlKCcuJywgJycpLnRyaW0oKSkpIHtcclxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGluZyBoNicpLnRleHRDb250ZW50LnRyaW0oKVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dlbmthbicsXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgdXJsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtwcm9wZXJ0eSo9XCJ0aXRsZVwiXScpLmNvbnRlbnQudHJpbSgpXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZ2Vua2FuJyxcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgICAgICB1cmxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0TGV2aWF0aGFuICgpIHtcclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC10aXRsZSBoMScpXHJcbiAgICAgICAgY29uc3QgdGl0bGVzID0gW1xyXG4gICAgICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwiYXBwbGljYXRpb24vbGQranNvblwiXScpKVxyXG4gICAgICAgICAgICAgICAgLm1hcCgoc2NyaXB0KSA9PiBwYXJzZShzY3JpcHQuaW5uZXJUZXh0KT8uaGVhZGxpbmUpLmZpbmQoKGgpID0+IGgpLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcHRlci1oZWFkaW5nJyk/LmlubmVyVGV4dD8uc3BsaXQoJyAtICcpWzBdLFxyXG4gICAgICAgICAgICBoZWFkZXIgJiYgQXJyYXkuZnJvbShoZWFkZXIuY2hpbGROb2RlcykucmVkdWNlKCh0aXRsZSwgbm9kZSkgPT4gdGl0bGUgKyAobm9kZS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUudGV4dENvbnRlbnQgOiAnJyksICcnKSxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhdGUtdGl0bGUnKT8udGl0bGVcclxuICAgICAgICBdXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKHRpdGxlKSA9PiB0aXRsZSlcclxuICAgICAgICAgICAgLnJlZHVjZSgobWFwLCB0aXRsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xlYW4gPSBkZWNvZGVIVE1MRW50aXRpZXModGl0bGUpLnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgbWFwW2NsZWFuXSA9IHR5cGVvZiBtYXBbY2xlYW5dID09PSAnbnVtYmVyJyA/IG1hcFtjbGVhbl0gKyAxIDogMVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcFxyXG4gICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICBjb25zdCB0aXRsZSA9IE9iamVjdC5rZXlzKHRpdGxlcykuc29ydCgodGl0bGUxLCB0aXRsZTIpID0+IHRpdGxlc1t0aXRsZTFdIC0gdGl0bGVzW3RpdGxlMl0pWzBdXHJcblxyXG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnNwbGl0KCcvbWFuZ2EvJylbMF0gKyAnL21hbmdhLydcclxuICAgICAgICBjb25zdCBpZCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYucmVwbGFjZShiYXNlVXJsLCAnJykuc3BsaXQoJy8nKVswXVxyXG4gICAgICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVcmx9JHtpZH1gXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdsZXZpYXRoYW4nLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgIHVybFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0TWFkYXJhICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBwYXJzZSAoc3RyaW5nLCBmYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsbGJhY2tcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaWRzID0gW1xyXG4gICAgICAgICAgICB3aW5kb3c/Lm1hbmdhPy5tYW5nYV9pZCxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhdGluZy1wb3N0LWlkJyk/LnZhbHVlLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3AtbWFuZ2EtYWN0aW9uLWJ1dHRvbicpPy5kYXRhc2V0Py5bJ3Bvc3QnXSxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYXB0ZXItc2VsZWN0aW9uJyk/LmRhdGFzZXQ/LlsnbWFuZ2EnXSxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hbmdhLWNoYXB0ZXJzLWhvbGRlcicpPy5kYXRhc2V0Py5bJ2lkJ10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib29rbWFyaycpPy5kYXRhc2V0Py5bJ2lkJ10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYW5nYS1yZWFkaW5nLW5hdi1oZWFkJyk/LmRhdGFzZXQ/LlsnaWQnXSxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hbmdhLXJlYWRpbmctbmF2LWZvb3QnKT8uZGF0YXNldD8uWydpZCddXHJcbiAgICAgICAgXVxyXG4gICAgICAgICAgICAuZmlsdGVyKCh0aXRsZSkgPT4gdGl0bGUpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKG1hcCwgaWQpID0+IHtcclxuICAgICAgICAgICAgICAgIG1hcFtpZF0gPSB0eXBlb2YgbWFwW2lkXSA9PT0gJ251bWJlcicgPyBtYXBbaWRdICsgMSA6IDFcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXBcclxuICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgY29uc3QgaWQgPSBPYmplY3Qua2V5cyhpZHMpLnNvcnQoKGlkMSwgaWQyKSA9PiBpZHNbaWQxXSAtIGlkc1tpZDJdKVswXVxyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC10aXRsZSBoMScpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxLmVudHJ5LXRpdGxlJylcclxuICAgICAgICBjb25zdCB0aXRsZXMgPSBbXHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCJdJykpXHJcbiAgICAgICAgICAgICAgICAubWFwKChzY3JpcHQpID0+IHBhcnNlKHNjcmlwdC5pbm5lclRleHQpPy5oZWFkbGluZSkuZmluZCgoaCkgPT4gaCksXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFwdGVyLWhlYWRpbmcnKT8uaW5uZXJUZXh0Py5zcGxpdCgnIC0gJylbMF0sXHJcbiAgICAgICAgICAgIGhlYWRlciAmJiBBcnJheS5mcm9tKGhlYWRlci5jaGlsZE5vZGVzKS5yZWR1Y2UoKHRpdGxlLCBub2RlKSA9PiB0aXRsZSArIChub2RlLm5vZGVUeXBlID09PSAzID8gbm9kZS50ZXh0Q29udGVudCA6ICcnKSwgJycpLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0ZS10aXRsZScpPy50aXRsZVxyXG4gICAgICAgIF1cclxuICAgICAgICAgICAgLmZpbHRlcigodGl0bGUpID0+IHRpdGxlKVxyXG4gICAgICAgICAgICAucmVkdWNlKChtYXAsIHRpdGxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhbiA9IGRlY29kZUhUTUxFbnRpdGllcyh0aXRsZSkudHJpbSgpXHJcbiAgICAgICAgICAgICAgICBtYXBbY2xlYW5dID0gdHlwZW9mIG1hcFtjbGVhbl0gPT09ICdudW1iZXInID8gbWFwW2NsZWFuXSArIDEgOiAxXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwXHJcbiAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgIGxldCB0aXRsZSA9IE9iamVjdC5rZXlzKHRpdGxlcykuc29ydCgodGl0bGUxLCB0aXRsZTIpID0+IHRpdGxlc1t0aXRsZTFdIC0gdGl0bGVzW3RpdGxlMl0pWzBdXHJcblxyXG4gICAgICAgIGxldCB1cmwgPSBudWxsXHJcbiAgICAgICAgaWYgKGRvY3VtZW50Py5sb2NhdGlvbj8uaHJlZikge1xyXG4gICAgICAgICAgICB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLm1hdGNoKC9odHRwcz86XFwvXFwvW14vXSpcXC9bXi9dKlxcL1teL10qXFwvLyk/LlswXVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24uaHJlZi5pbmNsdWRlcygncmVhcGVyc2NhbnMuY29tJykpIHtcclxuICAgICAgICAgICAgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5tYXRjaCgvaHR0cC4qXFwvc2VyaWVzXFwvW14vXSpcXC8vKT8uWzBdXHJcbiAgICAgICAgICAgIHRpdGxlID0gdGl0bGUuc3BsaXQoJyDigJMgJylbMF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdtYWRhcmEnLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgIHVybFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzdWx0XHJcblxyXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09PSAnZmFuZm94Lm5ldCcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZmFuZm94JylcclxuICAgICAgICByZXN1bHQgPSB0ZXN0RmFuRm94KClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUwuaW5jbHVkZXMoJ1Bvd2VyZWQgYnkgR2Vua2FuLicpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dlbmthbicpXHJcbiAgICAgICAgcmVzdWx0ID0gdGVzdEdlbmthbigpXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MLmluY2x1ZGVzKCd0cy1icmVhZGNydW1iIGJpeGJveCcpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hbmdhc3RyZWFtJylcclxuICAgICAgICByZXN1bHQgPSB0ZXN0TWFuZ2FzdHJlYW0oKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QuaW5jbHVkZXMoJ2xldmlhdGFuc2NhbnMuY29tJykgfHwgd2luZG93LmxvY2F0aW9uLmhvc3QuaW5jbHVkZXMoJ2ltbW9ydGFsdXBkYXRlcy5jb20nKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdsZXZpYXRoYW4nKVxyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RMZXZpYXRoYW4oKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QgPT09ICdtYW5nYWRleC5vcmcnKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hbmdhZGV4JylcclxuICAgICAgICByZXN1bHQgPSB0ZXN0TWFuZ2FkZXgoKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hZGFyYScpXHJcbiAgICAgICAgcmVzdWx0ID0gdGVzdE1hZGFyYSgpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2cocmVzdWx0KVxyXG5cclxuICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShyZXN1bHQpXHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy50cmlnZ2VyVGVzdCA9ICgpID0+IHRlc3RCb29rbWFyaygpXHJcbiIsImV4cG9ydCBjb25zdCBBUElfQUREUkVTUyA9ICdodHRwczovL21hbmdhLmZvY2hsYWMuY29tJyAvLyAnaHR0cDovL2xvY2FsaG9zdDo0MzIxNCdcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGluaXRJbnRybyAoKSB7XHJcbiAgICBjb25zdCBib29rbWFya0ltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvLWJvb2ttYXJrJylcclxuICAgIGJvb2ttYXJrSW1hZ2Uuc3JjID0gY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKCdpbWFnZXMvYm9va21hcmstc2FtcGxlLnBuZycpXHJcbn1cclxuIiwiaW1wb3J0IHsgY3JlYXRlREIgfSBmcm9tICcuLi9jb21tb24vZGInXHJcblxyXG5mdW5jdGlvbiByZWFkIChuYW1lc3BhY2UsIGtleXMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gY2hyb21lLnN0b3JhZ2VbbmFtZXNwYWNlXS5nZXQoa2V5cywgcmVzb2x2ZSkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyaXRlIChuYW1lc3BhY2UsIGtleVBhaXJzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IGNocm9tZS5zdG9yYWdlW25hbWVzcGFjZV0uc2V0KGtleVBhaXJzLCByZXNvbHZlKSlcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTGlzdGVuZXIgKGNhbGxiYWNrKSB7XHJcbiAgICByZXR1cm4gY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKGNhbGxiYWNrKVxyXG59XHJcblxyXG5jb25zdCBzdG9yYWdlID0ge1xyXG4gICAgcmVhZCwgd3JpdGUsIGFkZExpc3RlbmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkYiA9IGNyZWF0ZURCKHN0b3JhZ2UpXHJcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKiBGaWxlU2F2ZXIuanNcclxuICogQSBzYXZlQXMoKSBGaWxlU2F2ZXIgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cclxuICogRVM2aWZpZWQgYnkgQ29sZSBDaGFtYmVybGFpbiwgaHR0cHM6Ly9naXRodWIuY29tL2NjaGFtYmVybGFpblxyXG4gKlxyXG4gKiBMaWNlbnNlOiBNSVRcclxuICogICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvRmlsZVNhdmVyLmpzL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcclxuICovXG5cbi8qZ2xvYmFsIHNlbGYgKi9cbi8qanNsaW50IGJpdHdpc2U6IHRydWUsIGluZGVudDogNCwgbGF4YnJlYWs6IHRydWUsIGxheGNvbW1hOiB0cnVlLCBzbWFydHRhYnM6IHRydWUsIHBsdXNwbHVzOiB0cnVlICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvRmlsZVNhdmVyLmpzICovXG5cbnZhciBzYXZlQXMgPSBleHBvcnRzLnNhdmVBcyA9IHdpbmRvdy5zYXZlQXMgfHwgZnVuY3Rpb24gKHZpZXcpIHtcbiAgLy8gSUUgPDEwIGlzIGV4cGxpY2l0bHkgdW5zdXBwb3J0ZWRcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9NU0lFIFsxLTldXFwuLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSByZXR1cm47XG4gIHZhciBkb2MgPSB2aWV3LmRvY3VtZW50O1xuICAvLyBvbmx5IGdldCBVUkwgd2hlbiBuZWNlc3NhcnkgaW4gY2FzZSBCbG9iLmpzIGhhc24ndCBvdmVycmlkZGVuIGl0IHlldFxuICB2YXIgZ2V0X1VSTCA9IGZ1bmN0aW9uIGdldF9VUkwoKSB7XG4gICAgcmV0dXJuIHZpZXcuVVJMIHx8IHZpZXcud2Via2l0VVJMIHx8IHZpZXc7XG4gIH07XG4gIHZhciBzYXZlX2xpbmsgPSBkb2MuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJywgJ2EnKTtcbiAgdmFyIGNhbl91c2Vfc2F2ZV9saW5rID0gJ2Rvd25sb2FkJyBpbiBzYXZlX2xpbms7XG4gIHZhciBjbGljayA9IGZ1bmN0aW9uIGNsaWNrKG5vZGUpIHtcbiAgICB2YXIgZXZlbnQgPSBuZXcgTW91c2VFdmVudCgnY2xpY2snKTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9O1xuICB2YXIgaXNfc2FmYXJpID0gL1ZlcnNpb25cXC9bXFxkXFwuXSsuKlNhZmFyaS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgdmFyIHdlYmtpdF9yZXFfZnMgPSB2aWV3LndlYmtpdFJlcXVlc3RGaWxlU3lzdGVtO1xuICB2YXIgcmVxX2ZzID0gdmlldy5yZXF1ZXN0RmlsZVN5c3RlbSB8fCB3ZWJraXRfcmVxX2ZzIHx8IHZpZXcubW96UmVxdWVzdEZpbGVTeXN0ZW07XG4gIHZhciB0aHJvd19vdXRzaWRlID0gZnVuY3Rpb24gdGhyb3dfb3V0c2lkZShleCkge1xuICAgICh2aWV3LnNldEltbWVkaWF0ZSB8fCB2aWV3LnNldFRpbWVvdXQpKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IGV4O1xuICAgIH0sIDApO1xuICB9O1xuICB2YXIgZm9yY2Vfc2F2ZWFibGVfdHlwZSA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xuICB2YXIgZnNfbWluX3NpemUgPSAwO1xuICAvLyB0aGUgQmxvYiBBUEkgaXMgZnVuZGFtZW50YWxseSBicm9rZW4gYXMgdGhlcmUgaXMgbm8gXCJkb3dubG9hZGZpbmlzaGVkXCIgZXZlbnQgdG8gc3Vic2NyaWJlIHRvXG4gIHZhciBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQgPSAxMDAwICogNDA7IC8vIGluIG1zXG4gIHZhciByZXZva2UgPSBmdW5jdGlvbiByZXZva2UoZmlsZSkge1xuICAgIHZhciByZXZva2VyID0gZnVuY3Rpb24gcmV2b2tlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycpIC8vIGZpbGUgaXMgYW4gb2JqZWN0IFVSTFxuICAgICAgICBnZXRfVVJMKCkucmV2b2tlT2JqZWN0VVJMKGZpbGUpO2Vsc2UgLy8gZmlsZSBpcyBhIEZpbGVcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9O1xuICAgIC8qIC8vIFRha2Ugbm90ZSBXM0M6XHJcbiAgICB2YXJcclxuICAgICAgdXJpID0gdHlwZW9mIGZpbGUgPT09IFwic3RyaW5nXCIgPyBmaWxlIDogZmlsZS50b1VSTCgpXHJcbiAgICAsIHJldm9rZXIgPSBmdW5jdGlvbihldnQpIHtcclxuICAgICAgLy8gaWRlYWx5IERvd25sb2FkRmluaXNoZWRFdmVudC5kYXRhIHdvdWxkIGJlIHRoZSBVUkwgcmVxdWVzdGVkXHJcbiAgICAgIGlmIChldnQuZGF0YSA9PT0gdXJpKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmaWxlID09PSBcInN0cmluZ1wiKSB7IC8vIGZpbGUgaXMgYW4gb2JqZWN0IFVSTFxyXG4gICAgICAgICAgZ2V0X1VSTCgpLnJldm9rZU9iamVjdFVSTChmaWxlKTtcclxuICAgICAgICB9IGVsc2UgeyAvLyBmaWxlIGlzIGEgRmlsZVxyXG4gICAgICAgICAgZmlsZS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIDtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcImRvd25sb2FkZmluaXNoZWRcIiwgcmV2b2tlcik7XHJcbiAgICAqL1xuICAgIHNldFRpbWVvdXQocmV2b2tlciwgYXJiaXRyYXJ5X3Jldm9rZV90aW1lb3V0KTtcbiAgfTtcbiAgdmFyIGRpc3BhdGNoID0gZnVuY3Rpb24gZGlzcGF0Y2goZmlsZXNhdmVyLCBldmVudF90eXBlcywgZXZlbnQpIHtcbiAgICBldmVudF90eXBlcyA9IFtdLmNvbmNhdChldmVudF90eXBlcyk7XG4gICAgdmFyIGkgPSBldmVudF90eXBlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdmFyIGxpc3RlbmVyID0gZmlsZXNhdmVyWydvbicgKyBldmVudF90eXBlc1tpXV07XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGlzdGVuZXIuY2FsbChmaWxlc2F2ZXIsIGV2ZW50IHx8IGZpbGVzYXZlcik7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgdGhyb3dfb3V0c2lkZShleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHZhciBhdXRvX2JvbSA9IGZ1bmN0aW9uIGF1dG9fYm9tKGJsb2IpIHtcbiAgICAvLyBwcmVwZW5kIEJPTSBmb3IgVVRGLTggWE1MIGFuZCB0ZXh0LyogdHlwZXMgKGluY2x1ZGluZyBIVE1MKVxuICAgIGlmICgvXlxccyooPzp0ZXh0XFwvXFxTKnxhcHBsaWNhdGlvblxcL3htbHxcXFMqXFwvXFxTKlxcK3htbClcXHMqOy4qY2hhcnNldFxccyo9XFxzKnV0Zi04L2kudGVzdChibG9iLnR5cGUpKSByZXR1cm4gbmV3IEJsb2IoWyfvu78nLCBibG9iXSwgeyB0eXBlOiBibG9iLnR5cGUgfSk7XG4gICAgcmV0dXJuIGJsb2I7XG4gIH07XG5cbiAgdmFyIEZpbGVTYXZlciA9IGZ1bmN0aW9uIEZpbGVTYXZlcihibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGaWxlU2F2ZXIpO1xuXG4gICAgaWYgKCFub19hdXRvX2JvbSkgYmxvYiA9IGF1dG9fYm9tKGJsb2IpO1xuICAgIC8vIEZpcnN0IHRyeSBhLmRvd25sb2FkLCB0aGVuIHdlYiBmaWxlc3lzdGVtLCB0aGVuIG9iamVjdCBVUkxzXG4gICAgdmFyIGZpbGVzYXZlciA9IHRoaXMsXG4gICAgICAgIHR5cGUgPSBibG9iLnR5cGUsXG4gICAgICAgIGJsb2JfY2hhbmdlZCA9IGZhbHNlLFxuICAgICAgICBvYmplY3RfdXJsLFxuICAgICAgICB0YXJnZXRfdmlldyxcbiAgICAgICAgZGlzcGF0Y2hfYWxsID0gZnVuY3Rpb24gZGlzcGF0Y2hfYWxsKCkge1xuICAgICAgZGlzcGF0Y2goZmlsZXNhdmVyLCAnd3JpdGVzdGFydCBwcm9ncmVzcyB3cml0ZSB3cml0ZWVuZCcuc3BsaXQoJyAnKSk7XG4gICAgfVxuICAgIC8vIG9uIGFueSBmaWxlc3lzIGVycm9ycyByZXZlcnQgdG8gc2F2aW5nIHdpdGggb2JqZWN0IFVSTHNcbiAgICAsXG4gICAgICAgIGZzX2Vycm9yID0gZnVuY3Rpb24gZnNfZXJyb3IoKSB7XG4gICAgICBpZiAodGFyZ2V0X3ZpZXcgJiYgaXNfc2FmYXJpICYmIHR5cGVvZiBGaWxlUmVhZGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBTYWZhcmkgZG9lc24ndCBhbGxvdyBkb3dubG9hZGluZyBvZiBibG9iIHVybHNcbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGJhc2U2NERhdGEgPSByZWFkZXIucmVzdWx0O1xuICAgICAgICAgIHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSAnZGF0YTphdHRhY2htZW50L2ZpbGUnICsgYmFzZTY0RGF0YS5zbGljZShiYXNlNjREYXRhLnNlYXJjaCgvWyw7XS8pKTtcbiAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgIGRpc3BhdGNoX2FsbCgpO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuSU5JVDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gZG9uJ3QgY3JlYXRlIG1vcmUgb2JqZWN0IFVSTHMgdGhhbiBuZWVkZWRcbiAgICAgIGlmIChibG9iX2NoYW5nZWQgfHwgIW9iamVjdF91cmwpIHtcbiAgICAgICAgb2JqZWN0X3VybCA9IGdldF9VUkwoKS5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0X3ZpZXcpIHtcbiAgICAgICAgdGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV3X3RhYiA9IHZpZXcub3BlbihvYmplY3RfdXJsLCAnX2JsYW5rJyk7XG4gICAgICAgIGlmIChuZXdfdGFiID09PSB1bmRlZmluZWQgJiYgaXNfc2FmYXJpKSB7XG4gICAgICAgICAgLy9BcHBsZSBkbyBub3QgYWxsb3cgd2luZG93Lm9wZW4sIHNlZSBodHRwOi8vYml0Lmx5LzFrWmZmUklcbiAgICAgICAgICB2aWV3LmxvY2F0aW9uLmhyZWYgPSBvYmplY3RfdXJsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICByZXZva2Uob2JqZWN0X3VybCk7XG4gICAgfSxcbiAgICAgICAgYWJvcnRhYmxlID0gZnVuY3Rpb24gYWJvcnRhYmxlKGZ1bmMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChmaWxlc2F2ZXIucmVhZHlTdGF0ZSAhPT0gZmlsZXNhdmVyLkRPTkUpIHtcbiAgICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG4gICAgICAgIGNyZWF0ZV9pZl9ub3RfZm91bmQgPSB7IGNyZWF0ZTogdHJ1ZSwgZXhjbHVzaXZlOiBmYWxzZSB9LFxuICAgICAgICBzbGljZTtcblxuICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICBuYW1lID0gJ2Rvd25sb2FkJztcbiAgICB9XG4gICAgaWYgKGNhbl91c2Vfc2F2ZV9saW5rKSB7XG4gICAgICBvYmplY3RfdXJsID0gZ2V0X1VSTCgpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzYXZlX2xpbmsuaHJlZiA9IG9iamVjdF91cmw7XG4gICAgICAgIHNhdmVfbGluay5kb3dubG9hZCA9IG5hbWU7XG4gICAgICAgIGNsaWNrKHNhdmVfbGluayk7XG4gICAgICAgIGRpc3BhdGNoX2FsbCgpO1xuICAgICAgICByZXZva2Uob2JqZWN0X3VybCk7XG4gICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gT2JqZWN0IGFuZCB3ZWIgZmlsZXN5c3RlbSBVUkxzIGhhdmUgYSBwcm9ibGVtIHNhdmluZyBpbiBHb29nbGUgQ2hyb21lIHdoZW5cbiAgICAvLyB2aWV3ZWQgaW4gYSB0YWIsIHNvIEkgZm9yY2Ugc2F2ZSB3aXRoIGFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVxuICAgIC8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTkxMTU4XG4gICAgLy8gVXBkYXRlOiBHb29nbGUgZXJyYW50bHkgY2xvc2VkIDkxMTU4LCBJIHN1Ym1pdHRlZCBpdCBhZ2FpbjpcbiAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9Mzg5NjQyXG4gICAgaWYgKHZpZXcuY2hyb21lICYmIHR5cGUgJiYgdHlwZSAhPT0gZm9yY2Vfc2F2ZWFibGVfdHlwZSkge1xuICAgICAgc2xpY2UgPSBibG9iLnNsaWNlIHx8IGJsb2Iud2Via2l0U2xpY2U7XG4gICAgICBibG9iID0gc2xpY2UuY2FsbChibG9iLCAwLCBibG9iLnNpemUsIGZvcmNlX3NhdmVhYmxlX3R5cGUpO1xuICAgICAgYmxvYl9jaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gU2luY2UgSSBjYW4ndCBiZSBzdXJlIHRoYXQgdGhlIGd1ZXNzZWQgbWVkaWEgdHlwZSB3aWxsIHRyaWdnZXIgYSBkb3dubG9hZFxuICAgIC8vIGluIFdlYktpdCwgSSBhcHBlbmQgLmRvd25sb2FkIHRvIHRoZSBmaWxlbmFtZS5cbiAgICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjU0NDBcbiAgICBpZiAod2Via2l0X3JlcV9mcyAmJiBuYW1lICE9PSAnZG93bmxvYWQnKSB7XG4gICAgICBuYW1lICs9ICcuZG93bmxvYWQnO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gZm9yY2Vfc2F2ZWFibGVfdHlwZSB8fCB3ZWJraXRfcmVxX2ZzKSB7XG4gICAgICB0YXJnZXRfdmlldyA9IHZpZXc7XG4gICAgfVxuICAgIGlmICghcmVxX2ZzKSB7XG4gICAgICBmc19lcnJvcigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmc19taW5fc2l6ZSArPSBibG9iLnNpemU7XG4gICAgcmVxX2ZzKHZpZXcuVEVNUE9SQVJZLCBmc19taW5fc2l6ZSwgYWJvcnRhYmxlKGZ1bmN0aW9uIChmcykge1xuICAgICAgZnMucm9vdC5nZXREaXJlY3RvcnkoJ3NhdmVkJywgY3JlYXRlX2lmX25vdF9mb3VuZCwgYWJvcnRhYmxlKGZ1bmN0aW9uIChkaXIpIHtcbiAgICAgICAgdmFyIHNhdmUgPSBmdW5jdGlvbiBzYXZlKCkge1xuICAgICAgICAgIGRpci5nZXRGaWxlKG5hbWUsIGNyZWF0ZV9pZl9ub3RfZm91bmQsIGFib3J0YWJsZShmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgICAgZmlsZS5jcmVhdGVXcml0ZXIoYWJvcnRhYmxlKGZ1bmN0aW9uICh3cml0ZXIpIHtcbiAgICAgICAgICAgICAgd3JpdGVyLm9ud3JpdGVlbmQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gZmlsZS50b1VSTCgpO1xuICAgICAgICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goZmlsZXNhdmVyLCAnd3JpdGVlbmQnLCBldmVudCk7XG4gICAgICAgICAgICAgICAgcmV2b2tlKGZpbGUpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB3cml0ZXIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB3cml0ZXIuZXJyb3I7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgIT09IGVycm9yLkFCT1JUX0VSUikge1xuICAgICAgICAgICAgICAgICAgZnNfZXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICd3cml0ZXN0YXJ0IHByb2dyZXNzIHdyaXRlIGFib3J0Jy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgd3JpdGVyWydvbicgKyBldmVudF0gPSBmaWxlc2F2ZXJbJ29uJyArIGV2ZW50XTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHdyaXRlci53cml0ZShibG9iKTtcbiAgICAgICAgICAgICAgZmlsZXNhdmVyLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHdyaXRlci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLldSSVRJTkc7XG4gICAgICAgICAgICB9KSwgZnNfZXJyb3IpO1xuICAgICAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGRpci5nZXRGaWxlKG5hbWUsIHsgY3JlYXRlOiBmYWxzZSB9LCBhYm9ydGFibGUoZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgICAvLyBkZWxldGUgZmlsZSBpZiBpdCBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgICAgICAgc2F2ZSgpO1xuICAgICAgICB9KSwgYWJvcnRhYmxlKGZ1bmN0aW9uIChleCkge1xuICAgICAgICAgIGlmIChleC5jb2RlID09PSBleC5OT1RfRk9VTkRfRVJSKSB7XG4gICAgICAgICAgICBzYXZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZzX2Vycm9yKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KSwgZnNfZXJyb3IpO1xuICAgIH0pLCBmc19lcnJvcik7XG4gIH07XG5cbiAgdmFyIEZTX3Byb3RvID0gRmlsZVNhdmVyLnByb3RvdHlwZTtcbiAgdmFyIHNhdmVBcyA9IGZ1bmN0aW9uIHNhdmVBcyhibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuICAgIHJldHVybiBuZXcgRmlsZVNhdmVyKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKTtcbiAgfTtcblxuICAvLyBJRSAxMCsgKG5hdGl2ZSBzYXZlQXMpXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcbiAgICAgIGlmICghbm9fYXV0b19ib20pIGJsb2IgPSBhdXRvX2JvbShibG9iKTtcbiAgICAgIHJldHVybiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihibG9iLCBuYW1lIHx8ICdkb3dubG9hZCcpO1xuICAgIH07XG4gIH1cblxuICBGU19wcm90by5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZmlsZXNhdmVyID0gdGhpcztcbiAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgIGRpc3BhdGNoKGZpbGVzYXZlciwgJ2Fib3J0Jyk7XG4gIH07XG4gIEZTX3Byb3RvLnJlYWR5U3RhdGUgPSBGU19wcm90by5JTklUID0gMDtcbiAgRlNfcHJvdG8uV1JJVElORyA9IDE7XG4gIEZTX3Byb3RvLkRPTkUgPSAyO1xuXG4gIEZTX3Byb3RvLmVycm9yID0gRlNfcHJvdG8ub253cml0ZXN0YXJ0ID0gRlNfcHJvdG8ub25wcm9ncmVzcyA9IEZTX3Byb3RvLm9ud3JpdGUgPSBGU19wcm90by5vbmFib3J0ID0gRlNfcHJvdG8ub25lcnJvciA9IEZTX3Byb3RvLm9ud3JpdGVlbmQgPSBudWxsO1xuXG4gIHJldHVybiBzYXZlQXM7XG59KHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmIHx8IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyB8fCB1bmRlZmluZWQuY29udGVudCk7XG4vLyBgc2VsZmAgaXMgdW5kZWZpbmVkIGluIEZpcmVmb3ggZm9yIEFuZHJvaWQgY29udGVudCBzY3JpcHQgY29udGV4dFxuLy8gd2hpbGUgYHRoaXNgIGlzIG5zSUNvbnRlbnRGcmFtZU1lc3NhZ2VNYW5hZ2VyXG4vLyB3aXRoIGFuIGF0dHJpYnV0ZSBgY29udGVudGAgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgd2luZG93XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHNhdmVBczsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICdyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMnXG5pbXBvcnQgeyB0ZXN0Qm9va21hcmsgfSBmcm9tICcuL2Jvb2ttYXJrJ1xuaW1wb3J0IHsgYWRkSW1wb3J0SGFuZGxlcnMgfSBmcm9tICcuLi9jb21tb24vaW1wb3J0J1xuaW1wb3J0IHsgZGIgfSBmcm9tICcuL3N0b3JhZ2UnXG5pbXBvcnQgeyB1cmxSZW5kZXJlciB9IGZyb20gJy4uL2NvbW1vbi91cmxzJ1xuaW1wb3J0IHsgc291cmNlUmVuZGVyZXIgfSBmcm9tICcuLi9jb21tb24vc291cmNlcydcbmltcG9ydCB7IG1hcmtSZWZyZXNoZWQsIHJlc2lzdGVyUHJvZ3Jlc3NIYW5kbGVyLCB1cGRhdGVQcm9ncmVzcyB9IGZyb20gJy4uL2NvbW1vbi9wcm9ncmVzcy1iYXInXG5pbXBvcnQgeyBjcmVhdGVTY2hlZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9zY2hlZHVsZSdcbmltcG9ydCB7IHJlZ2lzdGVyTWVudUxpc3RlbmVycyB9IGZyb20gJy4uL2NvbW1vbi9tZW51J1xuaW1wb3J0IHsgYWRkU2V0dGluZ3NIYW5kbGVycyB9IGZyb20gJy4uL2NvbW1vbi9zZXR0aW5ncydcbmltcG9ydCB7IEFQSSB9IGZyb20gJy4uL2NvbW1vbi9hcGknXG5pbXBvcnQgeyBBUElfQUREUkVTUyB9IGZyb20gJy4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgaW5pdEludHJvIH0gZnJvbSAnLi9pbnRybydcbmltcG9ydCB7IHJlbmRlckhvc3RMaXN0IH0gZnJvbSAnLi4vY29tbW9uL2hvc3RzJ1xuXG5jb25zdCBhcGkgPSBBUEkoQVBJX0FERFJFU1MpXG5cbmRiLnVybHMuc2V0TWF4T2xkKDEwMClcblxuY29uc3QgVXJscyA9IHVybFJlbmRlcmVyKGRiKVxuY29uc3QgU291cmNlcyA9IHNvdXJjZVJlbmRlcmVyKGRiKVxuXG5kYi5vbkNoYW5nZSgoY2hhbmdlcykgPT4ge1xuICAgIGlmIChbJ2hpZGUnLCAnaGlkZGVuQ2hhcHRlcnMnLCAndXJscyddLnNvbWUoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eS5iaW5kKGNoYW5nZXMpKSkge1xuICAgICAgICBVcmxzLnJlbmRlcigpXG4gICAgfVxuICAgIGlmIChPYmplY3Qua2V5cyhjaGFuZ2VzKS5zb21lKChjaGFuZ2UpID0+IGNoYW5nZS5pbmNsdWRlcygnc291cmNlcycpKSB8fCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY2hhbmdlcywgJ21heE9sZCcpKSB7XG4gICAgICAgIFNvdXJjZXMucmVuZGVyKClcbiAgICB9XG59KVxuXG5uYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5jb250cm9sbGVyLnBvc3RNZXNzYWdlKCdGRVRDSF9DSEFQVEVSUycpXG5tYXJrUmVmcmVzaGVkKClcblxuY29uc3QgaW50ZXJ2YWwgPSBjcmVhdGVTY2hlZHVsZSh7XG4gICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuY29udHJvbGxlci5wb3N0TWVzc2FnZSgnRkVUQ0hfQ0hBUFRFUlMnKVxuICAgICAgICBtYXJrUmVmcmVzaGVkKClcbiAgICB9LFxuICAgIGludGVydmFsOiA2MCAqIDEwMDAsXG4gICAgaXNBY3RpdmU6IHRydWUsXG4gICAgdXBkYXRlcjogdXBkYXRlUHJvZ3Jlc3Ncbn0pXG5cbmluaXRJbnRybygpXG5yZXNpc3RlclByb2dyZXNzSGFuZGxlcigoKSA9PiBpbnRlcnZhbC50cmlnZ2VySW5zdGFudGx5KCkpXG5hZGRJbXBvcnRIYW5kbGVycyhkYilcbmFkZFNldHRpbmdzSGFuZGxlcnMoZGIsIGFwaSlcbnJlZ2lzdGVyTWVudUxpc3RlbmVycyhkYiwgYXBpKVxucmVuZGVySG9zdExpc3QoZGIsIGFwaSlcblxuVXJscy5yZW5kZXIoKVxuU291cmNlcy5yZW5kZXIoKVxuICAgIC50aGVuKHRlc3RCb29rbWFyaylcbiJdLCJzb3VyY2VSb290IjoiIn0=