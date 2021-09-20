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

              hostContainer.innerHTML += "\n            <p>Many other pages can work as well, if they use the <a href=\"https://themeforest.net/item/madara-wordpress-theme-for-manga/20849828\" target=\"_blank\" rel=\"noopener\">Madara-Theme</a>.</p>\n        ";
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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

  function testGenkan() {
    var _ref2 = location.href.match(/https?:\/\/[^/]*\/comics\/(\d*)-[-\w\d]*/) || [],
        _ref3 = _slicedToArray(_ref2, 2),
        url = _ref3[0],
        id = _ref3[1];

    if (!url || !id) {
      return null;
    }

    if (/^\d$/.test(location.href.split('/').slice(-2).join('').replace('.'))) {
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
  } else if (document.documentElement.innerHTML.includes('Powered by Genkan.')) {
    result = testGenkan();
  } else if (window.location.host.includes('asurascans.com')) {
    result = testAsura();
  } else if (window.location.host.includes('leviatanscans.com') || window.location.host.includes('immortalupdates.com')) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2RiLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vaG9zdHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9pbXBvcnQuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9tZW51LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vcHJvZ3Jlc3MtYmFyLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vc2NoZWR1bGUuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3NvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi91cmxzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9ib29rbWFyay5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL2ludHJvLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9leHRlbnNpb24vc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL25vZGVfbW9kdWxlcy9zYXZlLWFzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21hbmdhY2hlY2tlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9wb3B1cC5qcyJdLCJuYW1lcyI6WyJBUEkiLCJiYXNlVXJsIiwicG9zdFNvdXJjZSIsInNvdXJjZSIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwiQWNjZXB0IiwidGhlbiIsInJlcyIsImpzb24iLCJjYXRjaCIsImVycm9yIiwidmFsaWQiLCJkYXRhIiwicGF5bG9hZCIsImFkZFNvdXJjZUZyb21VcmwiLCJ1cmwiLCJyZWFkVXJscyIsInNvdXJjZXMiLCJsaW1pdCIsImRhdGUiLCJhZGRTdWJzY3JpcHRpb25zIiwidG9waWNzIiwia2V5IiwiZGVsZXRlU3Vic2NyaXB0aW9ucyIsInJlYWRMaW5rIiwiY2hhbmdlZFNpbmNlIiwic3RhdHVzIiwicmVhZEhvc3RzIiwidXBkYXRlTGluayIsInVwZGF0ZVNldCIsImNyZWF0ZUxpbmsiLCJpbml0U2V0IiwiVXJscyIsInJlYWQiLCJTb3VyY2UiLCJpbnNlcnQiLCJmcm9tVXJsIiwiU3Vic2NyaXB0aW9uIiwic3Vic2NyaWJlIiwidW5zdWJzY3JpYmUiLCJMaW5rIiwidXBkYXRlIiwiSG9zdHMiLCJOQU1FU1BBQ0VTIiwiU1lOQyIsIkxPQ0FMIiwiY3JlYXRlREIiLCJzdG9yYWdlIiwid3JpdGUiLCJyZWFkU291cmNlcyIsInJlZ2lzdHJ5IiwicGFyc2UiLCJyZWR1Y2UiLCJQcm9taXNlIiwiYWxsIiwiY29uY2F0IiwicmVzb2x2ZSIsIndyaXRlU291cmNlcyIsInVwZGF0ZXMiLCJ4IiwiTWF0aCIsIm1heCIsImNlaWwiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJhZGRTb3VyY2UiLCJzb21lIiwibWFuZ2FJZCIsImRlbGV0ZVNvdXJjZSIsInNvdXJjZUlkIiwibmV3U291cmNlcyIsImZpbHRlciIsImlkIiwiaXNEaXJ0eSIsInVybHMiLCJnZXRGaWx0ZXJlZFNvcnRlZFVybHMiLCJoaWRkZW5DaGFwdGVycyIsImhpZGUiLCJoaWRkZW5DaGFwdGVyc1N0cmluZyIsInVybExpc3QiLCJjaGVja09sZCIsImNoYXB0ZXIiLCJjcmVhdGVkIiwiT2JqZWN0IiwidmFsdWVzIiwic29ydCIsInVybDEiLCJ1cmwyIiwiZGlmZiIsImFicyIsIlN0cmluZyIsImxvY2FsZUNvbXBhcmUiLCJvbGRVcmxzIiwibmV3VXJscyIsImhpZGVVcmwiLCJyZXN1bHQiLCJoaWRlQWxsVXJscyIsInRpbWVzdGFtcCIsIndyaXRlVXJscyIsImluaXQiLCJ0b2RheSIsIkRhdGUiLCJzZXRIb3VycyIsImdldFRpbWUiLCJzZXRNYXhPbGQiLCJtYXhPbGQiLCJnZXRNYXhPbGQiLCJzZXRMaW5rIiwibGluayIsImdldExpbmsiLCJnZXRIaWRlIiwid3JpdGVMb2NhbFNldHRpbmdzIiwic2V0dGluZ3MiLCJsb2NhbFNldHRpbmdzIiwiZ2V0TG9jYWxTZXR0aW5ncyIsImdldExpbmtEYXRhIiwibWFwIiwiTnVtYmVyIiwic2V0TGlua0RhdGEiLCJzdG9yZWRTb3VyY2VzIiwic3MiLCJoYXNDaGFuZ2VkU291cmNlcyIsImtleXMiLCJwcm9taXNlcyIsImhpZGRlbiIsImltcG9ydCIsImFkZCIsImRlbGV0ZSIsImxvY2FsIiwic2V0IiwiaGlkZUFsbCIsIm9uQ2hhbmdlIiwiYWRkTGlzdGVuZXIiLCJzZXRMb2NhbCIsInJlbmRlckhvc3RMaXN0IiwiX2RiIiwiYXBpIiwiaG9zdENvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhvc3RzIiwiaG9zdExpc3QiLCJzdGFibGUiLCJhIiwiYiIsIm5hbWUiLCJob3N0Iiwiam9pbiIsImlubmVySFRNTCIsInVuc3RhYmxlIiwiYWRkSW1wb3J0SGFuZGxlcnMiLCJkYiIsImltcG9ydEVsZW0iLCJnZXRFbGVtZW50QnlJZCIsImV4cG9ydEVsZW0iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZpbGUiLCJ0YXJnZXQiLCJmaWxlcyIsImZyIiwiRmlsZVJlYWRlciIsImNsZWFuIiwidGl0bGUiLCJyZWFkQXNUZXh0IiwiYmxvYiIsIkJsb2IiLCJ0eXBlIiwic2F2ZUFzIiwicmVnaXN0ZXJNZW51TGlzdGVuZXJzIiwiQXBpIiwiaW1wb3J0U2VjdGlvbiIsInBvcHVwVGl0bGUiLCJib29rbWFya3MiLCJjaGFwdGVycyIsImFkZFNlY3Rpb24iLCJzZXR0aW5nc1NlY3Rpb24iLCJwcm9ncmVzcyIsImludHJvIiwib3BlbkNoYXB0ZXJzIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5uZXJUZXh0Iiwib3BlblNldHRpbmdzIiwiZ2V0TGlua1F1ZXJ5IiwibGlua0lmVW5saW5rZWQiLCJsb2NrZWQiLCJyZXNpc3RlclByb2dyZXNzSGFuZGxlciIsInVwZGF0ZU5vdyIsIm1hcmtSZWZyZXNoZWQiLCJkYXRhc2V0IiwiYmVmb3JlIiwic2V0VGltZW91dCIsInVwZGF0ZVByb2dyZXNzIiwiX2xhc3RQaW5nIiwibmV4dFBpbmciLCJyZW1haW5pbmciLCJub3ciLCJzZWNvbmRzIiwicm91bmQiLCJjcmVhdGVTY2hlZHVsZSIsImlzQWN0aXZlIiwiaW50ZXJ2YWwiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwicHJvdG90eXBlIiwidXBkYXRlciIsImxhc3RQaW5nIiwiY2FsbENhbGxiYWNrIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsIm5ld0ludGVydmFsIiwiRXJyb3IiLCJzZXRDYWxsYmFjayIsImNiIiwic3RhcnQiLCJ0cmlnZ2VySW5zdGFudGx5Iiwic3RvcCIsImNsZWFySW50ZXJ2YWwiLCJsaW5rRmllbGRzIiwiZm9ybWF0S2V5IiwiZ2V0TGlua0hlbHBlcnMiLCJwdXNoTGlua1VwZGF0ZSIsImNoYW5nZXMiLCJjaGFuZ2VzZXQiLCJjaGFuZ2UiLCJpbmNsdWRlcyIsImZldGNoTGlua1VwZGF0ZSIsImxhc3RNb2RpZmllZCIsImlzVmFsaWRMaW5rS2V5IiwiY2xlYW5LZXkiLCJyZXBsYWNlQWxsIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJnZXQiLCJjdXJyZW50TGluayIsImxpbmtJbnB1dDEiLCJsaW5rSW5wdXQyIiwibGlua0lucHV0MyIsInZhbHVlIiwiY29ubmVjdFRvTGluayIsImxpbmtOdW1iZXJUZXh0IiwibGlua0xpbmsiLCJsaW5rTGlua1RleHQiLCJocmVmIiwiY29sb3IiLCJsaW5rTGlua1dhcm4iLCJ3YXJuTGlua0N1cnJlbnQiLCJ3YXJuTGlua05ldyIsImxpbmtFcnJvciIsImxpbmtQcm9ncmVzcyIsImxpbmtCdXR0b24iLCJkaXNhYmxlZCIsImxpbmtSZXN1bHQiLCJhZGRTZXR0aW5nc0hhbmRsZXJzIiwid3JpdGVTdGF0ZVRvRG9tIiwibGlua2luZ1NlY3Rpb24iLCJ1bmxpbmtTZWN0aW9uIiwidW5saW5rQnV0dG9uIiwibnVtYmVyIiwiZm9jdXMiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImxpbmtEYXRhIiwibmV3TGlua1Jlc3VsdCIsInVuZGVmaW5lZCIsInNvdXJjZVJlbmRlcmVyIiwiZXZlbnQiLCJjbG9zZXN0IiwiY29udGFpbnMiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJyZW5kZXJTb3VyY2VzIiwic291cmNlMSIsInNvdXJjZTIiLCJyZXBsYWNlIiwic3BsaXQiLCJyZW5kZXIiLCJ1cmxSZW5kZXJlciIsImxhdGVzdENoYXB0ZXJEYXRlIiwibGNkIiwiY2xvc2VzdEhpZGUiLCJjbG9zZXN0TGluayIsInByZXZlbnREZWZhdWx0Iiwib3BlbiIsImNsb3Nlc3RNb3JlIiwidG9wIiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsIm1heFNjcm9sbCIsInNjcm9sbEhlaWdodCIsIm9mZnNldEhlaWdodCIsInNjcm9sbFRvcCIsImNoZWNrVG9wQnV0dG9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY3JlYXRlVXJsUmVuZGVyZXIiLCJpc09sZCIsInRpbWVTdHJpbmciLCJwYWQiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJkYXRlU3RyaW5nIiwiZ2V0RGF0ZSIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJmdWxsRGF0ZSIsInRvSVNPU3RyaW5nIiwicmVuZGVyVXJscyIsIm5ld1Jvd3MiLCJvbGRSb3dzIiwic3RyaW5nIiwiZmFsbGJhY2siLCJubyIsImN1cnJlbnRTb3VyY2UiLCJib29rbWFyayIsImJvb2ttYXJrVHJhY2siLCJib29rbWFya1RpdGxlIiwiQVBJX0FERFJFU1MiLCJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwicmVxdWVzdCIsInRlc3RCb29rbWFyayIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsIndpbmRvd0lkIiwid2luZG93cyIsIldJTkRPV19JRF9DVVJSRU5UIiwic2NyaXB0aW5nIiwiZXhlY3V0ZVNjcmlwdCIsInRhYklkIiwiZnVuY3Rpb24iLCJ0ZXN0IiwiZGVjb2RlSFRNTEVudGl0aWVzIiwic3RyIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInRlc3RGYW5Gb3giLCJwYXRobmFtZSIsIm1hdGNoIiwib3JpZ2luIiwidGVzdEFzdXJhIiwiYnJlYWRjcnVtcExpbmsiLCJ0ZXN0TWFuZ2FkZXgiLCJ0ZXN0R2Vua2FuIiwidHJpbSIsImNvbnRlbnQiLCJ0ZXN0TGV2aWF0aGFuIiwiaGVhZGVyIiwidGl0bGVzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsInNjcmlwdCIsImhlYWRsaW5lIiwiZmluZCIsImgiLCJjaGlsZE5vZGVzIiwibm9kZSIsIm5vZGVUeXBlIiwidGl0bGUxIiwidGl0bGUyIiwidGVzdE1hZGFybyIsImlkcyIsIm1hbmdhIiwibWFuZ2FfaWQiLCJpZDEiLCJpZDIiLCJkb2N1bWVudEVsZW1lbnQiLCJjb25zb2xlIiwibG9nIiwic2VuZE1lc3NhZ2UiLCJpbml0SW50cm8iLCJib29rbWFya0ltYWdlIiwic3JjIiwiZ2V0VVJMIiwibmFtZXNwYWNlIiwia2V5UGFpcnMiLCJvbkNoYW5nZWQiLCJTb3VyY2VzIiwiaGFzT3duUHJvcGVydHkiLCJiaW5kIiwiY2FsbCIsIm5hdmlnYXRvciIsInNlcnZpY2VXb3JrZXIiLCJjb250cm9sbGVyIiwicG9zdE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTUEsR0FBRyxHQUFHLFNBQU5BLEdBQU0sR0FBa0I7QUFBQSxNQUFqQkMsT0FBaUIsdUVBQVAsRUFBTzs7QUFDakMsV0FBU0MsVUFBVCxDQUFxQkMsTUFBckIsRUFBNkI7QUFDekIsV0FBT0MsS0FBSyxXQUFJSCxPQUFKLG1CQUEyQjtBQUNuQ0ksWUFBTSxFQUFFLE1BRDJCO0FBRW5DQyxVQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlTCxNQUFmLENBRjZCO0FBR25DTSxhQUFPLEVBQUU7QUFDTEMsY0FBTSxFQUFFLGtCQURIO0FBRUwsd0JBQWdCO0FBRlg7QUFIMEIsS0FBM0IsQ0FBTCxDQVFGQyxJQVJFLENBUUcsVUFBQ0MsR0FBRDtBQUFBLGFBQVNBLEdBQUcsQ0FBQ0MsSUFBSixFQUFUO0FBQUEsS0FSSCxFQVNGQyxLQVRFLENBU0ksVUFBQ0MsS0FBRDtBQUFBLGFBQVk7QUFBRUMsYUFBSyxFQUFFLEtBQVQ7QUFBZ0JELGFBQUssRUFBTEE7QUFBaEIsT0FBWjtBQUFBLEtBVEosRUFVRkosSUFWRSxDQVVHLFVBQUNNLElBQUQ7QUFBQSxhQUFVQSxJQUFJLENBQUNDLE9BQWY7QUFBQSxLQVZILENBQVA7QUFXSDs7QUFFRCxXQUFTQyxnQkFBVCxDQUEyQkMsR0FBM0IsRUFBZ0M7QUFDNUIsV0FBT2hCLEtBQUssV0FBSUgsT0FBSiw4QkFBc0M7QUFDOUNJLFlBQU0sRUFBRSxNQURzQztBQUU5Q0MsVUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUFFWSxXQUFHLEVBQUhBO0FBQUYsT0FBZixDQUZ3QztBQUc5Q1gsYUFBTyxFQUFFO0FBQ0xDLGNBQU0sRUFBRSxrQkFESDtBQUVMLHdCQUFnQjtBQUZYO0FBSHFDLEtBQXRDLENBQUwsQ0FRRkMsSUFSRSxDQVFHLFVBQUNDLEdBQUQ7QUFBQSxhQUFTQSxHQUFHLENBQUNDLElBQUosRUFBVDtBQUFBLEtBUkgsRUFTRkMsS0FURSxDQVNJLFVBQUNDLEtBQUQ7QUFBQSxhQUFZO0FBQUVDLGFBQUssRUFBRSxLQUFUO0FBQWdCRCxhQUFLLEVBQUxBO0FBQWhCLE9BQVo7QUFBQSxLQVRKLENBQVA7QUFVSDs7QUFFRCxXQUFTTSxRQUFULEdBQXdEO0FBQUEsUUFBckNDLE9BQXFDLHVFQUEzQixFQUEyQjtBQUFBLFFBQXZCQyxLQUF1Qix1RUFBZixFQUFlO0FBQUEsUUFBWEMsSUFBVyx1RUFBSixFQUFJO0FBQ3BELFdBQU9wQixLQUFLLFdBQ0xILE9BREssc0JBRVI7QUFDSUksWUFBTSxFQUFFLE1BRFo7QUFFSUMsVUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUNqQmMsZUFBTyxFQUFQQSxPQURpQjtBQUVqQkUsWUFBSSxFQUFKQSxJQUZpQjtBQUdqQkQsYUFBSyxFQUFMQTtBQUhpQixPQUFmLENBRlY7QUFPSWQsYUFBTyxFQUFFO0FBQ0xDLGNBQU0sRUFBRSxrQkFESDtBQUVMLHdCQUFnQjtBQUZYO0FBUGIsS0FGUSxDQUFMLENBZUZDLElBZkUsQ0FlRyxVQUFDQyxHQUFEO0FBQUEsYUFBU0EsR0FBRyxDQUFDQyxJQUFKLEVBQVQ7QUFBQSxLQWZILEVBZ0JGRixJQWhCRSxDQWdCRyxVQUFDTSxJQUFEO0FBQUEsYUFBVUEsSUFBSSxDQUFDQyxPQUFMLElBQWdCLEVBQTFCO0FBQUEsS0FoQkgsQ0FBUDtBQWlCSDs7QUFFRCxXQUFTTyxnQkFBVCxHQUE2QztBQUFBLFFBQWxCQyxNQUFrQix1RUFBVCxFQUFTO0FBQUEsUUFBTEMsR0FBSztBQUN6QyxXQUFPdkIsS0FBSyxXQUFJSCxPQUFKLHlCQUFpQztBQUN6Q0ksWUFBTSxFQUFFLE1BRGlDO0FBRXpDQyxVQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQ2pCa0IsY0FBTSxFQUFOQSxNQURpQjtBQUVqQkMsV0FBRyxFQUFFQTtBQUZZLE9BQWYsQ0FGbUM7QUFNekNsQixhQUFPLEVBQUU7QUFDTEMsY0FBTSxFQUFFLGtCQURIO0FBRUwsd0JBQWdCO0FBRlg7QUFOZ0MsS0FBakMsQ0FBTCxDQVdGQyxJQVhFLENBV0csVUFBQ0MsR0FBRDtBQUFBLGFBQVNBLEdBQUcsQ0FBQ0MsSUFBSixFQUFUO0FBQUEsS0FYSCxFQVlGQyxLQVpFLENBWUksVUFBQ0MsS0FBRDtBQUFBLGFBQVk7QUFBRUMsYUFBSyxFQUFFLEtBQVQ7QUFBZ0JELGFBQUssRUFBTEE7QUFBaEIsT0FBWjtBQUFBLEtBWkosQ0FBUDtBQWFIOztBQUVELFdBQVNhLG1CQUFULEdBQWdEO0FBQUEsUUFBbEJGLE1BQWtCLHVFQUFULEVBQVM7QUFBQSxRQUFMQyxHQUFLO0FBQzVDLFdBQU92QixLQUFLLFdBQUlILE9BQUoseUJBQWlDO0FBQ3pDSSxZQUFNLEVBQUUsUUFEaUM7QUFFekNDLFVBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDakJrQixjQUFNLEVBQU5BLE1BRGlCO0FBRWpCQyxXQUFHLEVBQUVBO0FBRlksT0FBZixDQUZtQztBQU16Q2xCLGFBQU8sRUFBRTtBQUNMQyxjQUFNLEVBQUUsa0JBREg7QUFFTCx3QkFBZ0I7QUFGWDtBQU5nQyxLQUFqQyxDQUFMLENBV0ZDLElBWEUsQ0FXRyxVQUFDQyxHQUFEO0FBQUEsYUFBU0EsR0FBRyxDQUFDQyxJQUFKLEVBQVQ7QUFBQSxLQVhILEVBWUZDLEtBWkUsQ0FZSSxVQUFDQyxLQUFEO0FBQUEsYUFBWTtBQUFFQyxhQUFLLEVBQUUsS0FBVDtBQUFnQkQsYUFBSyxFQUFMQTtBQUFoQixPQUFaO0FBQUEsS0FaSixDQUFQO0FBYUg7O0FBRUQsV0FBU2MsUUFBVCxDQUFtQkYsR0FBbkIsRUFBd0JHLFlBQXhCLEVBQXNDO0FBQ2xDLFdBQU8xQixLQUFLLFdBQUlILE9BQUosd0JBQXlCMEIsR0FBekIsU0FBK0JHLFlBQVksMkJBQW9CQSxZQUFwQixJQUFxQyxFQUFoRixHQUFzRjtBQUM5RnpCLFlBQU0sRUFBRSxLQURzRjtBQUU5RkksYUFBTyxFQUFFO0FBQ0xDLGNBQU0sRUFBRSxrQkFESDtBQUVMLHdCQUFnQjtBQUZYO0FBRnFGLEtBQXRGLENBQUwsQ0FPRkMsSUFQRSxDQU9HLFVBQUNDLEdBQUQ7QUFBQSxhQUFTQSxHQUFHLENBQUNtQixNQUFKLEtBQWUsR0FBZixHQUFzQjtBQUFFZixhQUFLLEVBQUUsSUFBVDtBQUFlRSxlQUFPLEVBQUU7QUFBeEIsT0FBdEIsR0FBd0ROLEdBQUcsQ0FBQ0MsSUFBSixFQUFqRTtBQUFBLEtBUEgsRUFRRkMsS0FSRSxDQVFJLFVBQUNDLEtBQUQ7QUFBQSxhQUFZO0FBQUVDLGFBQUssRUFBRSxLQUFUO0FBQWdCRCxhQUFLLEVBQUxBO0FBQWhCLE9BQVo7QUFBQSxLQVJKLENBQVA7QUFTSDs7QUFFRCxXQUFTaUIsU0FBVCxHQUFzQjtBQUNsQixXQUFPNUIsS0FBSyxXQUFJSCxPQUFKLHlCQUFpQztBQUN6Q0ksWUFBTSxFQUFFLEtBRGlDO0FBRXpDSSxhQUFPLEVBQUU7QUFDTEMsY0FBTSxFQUFFLGtCQURIO0FBRUwsd0JBQWdCO0FBRlg7QUFGZ0MsS0FBakMsQ0FBTCxDQU9GQyxJQVBFLENBT0csVUFBQ0MsR0FBRDtBQUFBLGFBQVNBLEdBQUcsQ0FBQ21CLE1BQUosS0FBZSxHQUFmLEdBQXNCO0FBQUVmLGFBQUssRUFBRSxJQUFUO0FBQWVFLGVBQU8sRUFBRTtBQUF4QixPQUF0QixHQUF3RE4sR0FBRyxDQUFDQyxJQUFKLEVBQWpFO0FBQUEsS0FQSCxFQVFGQyxLQVJFLENBUUksVUFBQ0MsS0FBRDtBQUFBLGFBQVk7QUFBRUMsYUFBSyxFQUFFLEtBQVQ7QUFBZ0JELGFBQUssRUFBTEE7QUFBaEIsT0FBWjtBQUFBLEtBUkosQ0FBUDtBQVNIOztBQUVELFdBQVNrQixVQUFULENBQXFCTixHQUFyQixFQUEwQk8sU0FBMUIsRUFBcUM7QUFDakMsV0FBTzlCLEtBQUssV0FBSUgsT0FBSix3QkFBeUIwQixHQUF6QixHQUFnQztBQUN4Q3RCLFlBQU0sRUFBRSxLQURnQztBQUV4Q0MsVUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTBCLFNBQWYsQ0FGa0M7QUFHeEN6QixhQUFPLEVBQUU7QUFDTEMsY0FBTSxFQUFFLGtCQURIO0FBRUwsd0JBQWdCO0FBRlg7QUFIK0IsS0FBaEMsQ0FBTCxDQVFGQyxJQVJFLENBUUcsVUFBQ0MsR0FBRDtBQUFBLGFBQVNBLEdBQUcsQ0FBQ0MsSUFBSixFQUFUO0FBQUEsS0FSSCxFQVNGQyxLQVRFLENBU0ksVUFBQ0MsS0FBRDtBQUFBLGFBQVk7QUFBRUMsYUFBSyxFQUFFLEtBQVQ7QUFBZ0JELGFBQUssRUFBTEE7QUFBaEIsT0FBWjtBQUFBLEtBVEosQ0FBUDtBQVVIOztBQUVELFdBQVNvQixVQUFULENBQXFCQyxPQUFyQixFQUE4QjtBQUMxQixXQUFPaEMsS0FBSyxXQUFJSCxPQUFKLGlCQUF5QjtBQUNqQ0ksWUFBTSxFQUFFLE1BRHlCO0FBRWpDQyxVQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlNEIsT0FBZixDQUYyQjtBQUdqQzNCLGFBQU8sRUFBRTtBQUNMQyxjQUFNLEVBQUUsa0JBREg7QUFFTCx3QkFBZ0I7QUFGWDtBQUh3QixLQUF6QixDQUFMLENBUUZDLElBUkUsQ0FRRyxVQUFDQyxHQUFEO0FBQUEsYUFBU0EsR0FBRyxDQUFDQyxJQUFKLEVBQVQ7QUFBQSxLQVJILEVBU0ZDLEtBVEUsQ0FTSSxVQUFDQyxLQUFEO0FBQUEsYUFBWTtBQUFFQyxhQUFLLEVBQUUsS0FBVDtBQUFnQkQsYUFBSyxFQUFMQTtBQUFoQixPQUFaO0FBQUEsS0FUSixDQUFQO0FBVUg7O0FBRUQsU0FBTztBQUNIc0IsUUFBSSxFQUFFO0FBQ0ZDLFVBQUksRUFBRWpCO0FBREosS0FESDtBQUlIa0IsVUFBTSxFQUFFO0FBQ0pDLFlBQU0sRUFBRXRDLFVBREo7QUFFSnVDLGFBQU8sRUFBRXRCO0FBRkwsS0FKTDtBQVFIdUIsZ0JBQVksRUFBRTtBQUNWQyxlQUFTLEVBQUVsQixnQkFERDtBQUVWbUIsaUJBQVcsRUFBRWhCO0FBRkgsS0FSWDtBQVlIaUIsUUFBSSxFQUFFO0FBQ0ZMLFlBQU0sRUFBRUwsVUFETjtBQUVGVyxZQUFNLEVBQUViLFVBRk47QUFHRkssVUFBSSxFQUFFVDtBQUhKLEtBWkg7QUFpQkhrQixTQUFLLEVBQUU7QUFDSFQsVUFBSSxFQUFFTjtBQURIO0FBakJKLEdBQVA7QUFxQkgsQ0F2Sk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBUDtBQUVBLElBQU1nQixVQUFVLEdBQUc7QUFDZkMsTUFBSSxFQUFFLE1BRFM7QUFFZkMsT0FBSyxFQUFFO0FBRlEsQ0FBbkI7QUFLTyxTQUFTQyxRQUFULENBQW1CQyxPQUFuQixFQUE0QjtBQUFBLE1BQ3ZCZCxJQUR1QixHQUNQYyxPQURPLENBQ3ZCZCxJQUR1QjtBQUFBLE1BQ2pCZSxLQURpQixHQUNQRCxPQURPLENBQ2pCQyxLQURpQjs7QUFBQSxXQUdoQkMsV0FIZ0I7QUFBQTtBQUFBOztBQUFBO0FBQUEsMkVBRy9CO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUMrQmhCLElBQUksQ0FBQ1UsVUFBVSxDQUFDQyxJQUFaLEVBQWtCO0FBQUVNLHdCQUFRLEVBQUU7QUFBWixlQUFsQixDQURuQzs7QUFBQTtBQUFBO0FBQ1lBLHNCQURaLGVBQ1lBLFFBRFo7QUFBQSwrQ0FFV0MsNkNBQUssQ0FBQ0QsUUFBRCxFQUFXLENBQUMsV0FBRCxDQUFYLENBQUwsQ0FDRkUsTUFERSxDQUNLLFVBQUNuQyxPQUFELEVBQVVLLEdBQVYsRUFBa0I7QUFDdEIsdUJBQU8rQixPQUFPLENBQUNDLEdBQVIsQ0FBWSxDQUFDckMsT0FBRCxFQUFVZ0IsSUFBSSxDQUFDVSxVQUFVLENBQUNDLElBQVosc0JBQXFCdEIsR0FBckIsRUFBMkIsSUFBM0IsRUFBZCxDQUFaLEVBQ0ZoQixJQURFLENBQ0c7QUFBQTtBQUFBLHNCQUFFVyxPQUFGO0FBQUEsc0JBQVduQixNQUFYOztBQUFBLHlCQUF1Qm1CLE9BQU8sQ0FBQ3NDLE1BQVIsQ0FBZUosNkNBQUssQ0FBQ3JELE1BQU0sQ0FBQ3dCLEdBQUQsQ0FBUCxFQUFjLEVBQWQsQ0FBcEIsQ0FBdkI7QUFBQSxpQkFESCxDQUFQO0FBRUgsZUFKRSxFQUlBK0IsT0FBTyxDQUFDRyxPQUFSLENBQWdCLEVBQWhCLENBSkEsQ0FGWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUgrQjtBQUFBO0FBQUE7O0FBWS9CLFdBQVNDLFlBQVQsQ0FBdUJ4QyxPQUF2QixFQUFnQztBQUM1QixRQUFNaUMsUUFBUSxHQUFHLEVBQWpCO0FBQ0EsUUFBTVEsT0FBTyxHQUFHLEVBQWhCOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSUMsSUFBSSxDQUFDQyxHQUFMLENBQVMsQ0FBVCxFQUFZRCxJQUFJLENBQUNFLElBQUwsQ0FBVTdDLE9BQU8sQ0FBQzhDLE1BQVIsR0FBaUIsRUFBM0IsQ0FBWixDQUFyQixFQUFrRUosQ0FBQyxFQUFuRSxFQUF1RTtBQUNuRSxVQUFNckMsR0FBRyxxQkFBY3FDLENBQWQsQ0FBVDtBQUNBVCxjQUFRLENBQUNjLElBQVQsQ0FBYzFDLEdBQWQ7QUFDQW9DLGFBQU8sQ0FBQ3BDLEdBQUQsQ0FBUCxHQUFlcEIsSUFBSSxDQUFDQyxTQUFMLENBQWVjLE9BQU8sQ0FBQ2dELEtBQVIsQ0FBYyxDQUFDTixDQUFDLEdBQUcsQ0FBTCxJQUFVLEVBQXhCLEVBQTRCQSxDQUFDLEdBQUcsRUFBaEMsQ0FBZixDQUFmO0FBQ0g7O0FBQ0RELFdBQU8sQ0FBQ1IsUUFBUixHQUFtQmhELElBQUksQ0FBQ0MsU0FBTCxDQUFlK0MsUUFBZixDQUFuQjtBQUNBLFdBQU9GLEtBQUssQ0FBQ0wsVUFBVSxDQUFDQyxJQUFaLEVBQWtCYyxPQUFsQixDQUFaO0FBQ0g7O0FBdEI4QixXQXdCaEJRLFNBeEJnQjtBQUFBO0FBQUE7O0FBQUE7QUFBQSx5RUF3Qi9CLGtCQUEwQnBFLE1BQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQzBCbUQsV0FBVyxFQURyQzs7QUFBQTtBQUNVaEMscUJBRFY7O0FBQUEsa0JBRVNBLE9BQU8sQ0FBQ2tELElBQVIsQ0FBYTtBQUFBLG9CQUFFcEQsR0FBRixTQUFFQSxHQUFGO0FBQUEsb0JBQU9xRCxPQUFQLFNBQU9BLE9BQVA7QUFBQSx1QkFBb0J0RSxNQUFNLENBQUNpQixHQUFQLEtBQWVBLEdBQWYsSUFBc0JxRCxPQUFPLEtBQUt0RSxNQUFNLENBQUNzRSxPQUE3RDtBQUFBLGVBQWIsQ0FGVDtBQUFBO0FBQUE7QUFBQTs7QUFHUW5ELHFCQUFPLENBQUMrQyxJQUFSLENBQWFsRSxNQUFiO0FBSFI7QUFBQSxxQkFJYzJELFlBQVksQ0FBQ3hDLE9BQUQsQ0FKMUI7O0FBQUE7QUFBQSxnREFNV0EsT0FOWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQXhCK0I7QUFBQTtBQUFBOztBQUFBLFdBaUNoQm9ELFlBakNnQjtBQUFBO0FBQUE7O0FBQUE7QUFBQSw0RUFpQy9CLGtCQUE2QkMsUUFBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDMEJyQixXQUFXLEVBRHJDOztBQUFBO0FBQ1VoQyxxQkFEVjtBQUVVc0Qsd0JBRlYsR0FFdUJ0RCxPQUFPLENBQUN1RCxNQUFSLENBQWUsVUFBQzFFLE1BQUQ7QUFBQSx1QkFBWSxDQUFBQSxNQUFNLFNBQU4sSUFBQUEsTUFBTSxXQUFOLFlBQUFBLE1BQU0sQ0FBRTJFLEVBQVIsTUFBZUgsUUFBM0I7QUFBQSxlQUFmLENBRnZCO0FBQUE7QUFBQSxxQkFHVWIsWUFBWSxDQUFDYyxVQUFELENBSHRCOztBQUFBO0FBQUEsZ0RBS1dBLFVBTFg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FqQytCO0FBQUE7QUFBQTs7QUFBQSxXQXlDaEJHLE9BekNnQjtBQUFBO0FBQUE7O0FBQUE7QUFBQSx1RUF5Qy9CO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUNvQ3pDLElBQUksQ0FBQ1UsVUFBVSxDQUFDRSxLQUFaLEVBQW1CLENBQUMsTUFBRCxFQUFTLFNBQVQsQ0FBbkIsQ0FEeEM7O0FBQUE7QUFBQTtBQUNZOEIsa0JBRFosZ0JBQ1lBLElBRFo7QUFDa0IxRCxxQkFEbEIsZ0JBQ2tCQSxPQURsQjtBQUFBLGdEQUdXLENBQUMsQ0FBQzBELElBQUYsSUFBVSxDQUFDLENBQUMxRCxPQUh2Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQXpDK0I7QUFBQTtBQUFBOztBQUFBLFdBK0NoQjJELHFCQS9DZ0I7QUFBQTtBQUFBOztBQUFBO0FBQUEscUZBK0MvQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDaUUzQyxJQUFJLENBQUNVLFVBQVUsQ0FBQ0MsSUFBWixFQUFrQjtBQUFFaUMsOEJBQWMsRUFBRSxJQUFsQjtBQUF3QkMsb0JBQUksRUFBRTtBQUE5QixlQUFsQixDQURyRTs7QUFBQTtBQUFBO0FBQzRCQyxrQ0FENUIsZ0JBQ1lGLGNBRFo7QUFDa0RDLGtCQURsRCxnQkFDa0RBLElBRGxEO0FBQUE7QUFBQSxxQkFFMkI3QyxJQUFJLENBQUNVLFVBQVUsQ0FBQ0UsS0FBWixFQUFtQjtBQUFFOEIsb0JBQUksRUFBRTtBQUFSLGVBQW5CLENBRi9COztBQUFBO0FBQUE7QUFFWUEsa0JBRlosZ0JBRVlBLElBRlo7QUFJVUUsNEJBSlYsR0FJMkIxQiw2Q0FBSyxDQUFDNEIsb0JBQUQsRUFBdUIsRUFBdkIsQ0FKaEM7QUFLVUMscUJBTFYsR0FLb0I3Qiw2Q0FBSyxDQUFDd0IsSUFBRCxFQUFPLEVBQVAsQ0FMekI7O0FBT1VNLHNCQVBWLEdBT3FCLFNBQVhBLFFBQVcsQ0FBQ0MsT0FBRCxFQUFhO0FBQzFCLG9CQUFJSixJQUFJLElBQUlJLE9BQU8sQ0FBQ0MsT0FBUixHQUFrQkwsSUFBMUIsSUFBa0NELGNBQWMsQ0FBQ0ssT0FBTyxDQUFDVCxFQUFULENBQXBELEVBQWtFO0FBQzlELHlCQUFPLElBQVA7QUFDSDs7QUFDRCx1QkFBTyxLQUFQO0FBQ0gsZUFaTDs7QUFBQSxzQ0FjK0JXLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjTCxPQUFkLEVBQ3RCTSxJQURzQixDQUNqQixVQUFDQyxJQUFELEVBQU9DLElBQVAsRUFBZ0I7QUFDbEIsb0JBQU1DLElBQUksR0FBR0QsSUFBSSxDQUFDTCxPQUFMLEdBQWVJLElBQUksQ0FBQ0osT0FBakM7O0FBQ0Esb0JBQUl2QixJQUFJLENBQUM4QixHQUFMLENBQVNELElBQVQsSUFBaUIsR0FBckIsRUFBMEI7QUFDdEIseUJBQU9FLE1BQU0sQ0FBQ0osSUFBRCxDQUFOLENBQWFLLGFBQWIsQ0FBMkJKLElBQTNCLENBQVA7QUFDSDs7QUFDRCx1QkFBT0MsSUFBUDtBQUNILGVBUHNCLEVBUXRCckMsTUFSc0IsQ0FRZixpQkFBcUJyQyxHQUFyQixFQUE2QjtBQUFBO0FBQUEsb0JBQTNCOEUsT0FBMkI7QUFBQSxvQkFBbEJDLE9BQWtCOztBQUNqQyxvQkFBSWIsUUFBUSxDQUFDbEUsR0FBRCxDQUFaLEVBQW1CO0FBQ2Y4RSx5QkFBTyxDQUFDN0IsSUFBUixDQUFhakQsR0FBYjtBQUNILGlCQUZELE1BR0s7QUFDRCtFLHlCQUFPLENBQUM5QixJQUFSLENBQWFqRCxHQUFiO0FBQ0g7O0FBQ0QsdUJBQU8sQ0FBQzhFLE9BQUQsRUFBVUMsT0FBVixDQUFQO0FBQ0gsZUFoQnNCLEVBZ0JwQixDQUFDLEVBQUQsRUFBSyxFQUFMLENBaEJvQixDQWQvQixxRUFjV0QsT0FkWCw4QkFjb0JDLE9BZHBCO0FBQUEsZ0RBZ0NXO0FBQ0hELHVCQUFPLEVBQVBBLE9BREc7QUFFSEMsdUJBQU8sRUFBUEE7QUFGRyxlQWhDWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQS9DK0I7QUFBQTtBQUFBOztBQUFBLFdBcUZoQkMsT0FyRmdCO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHVFQXFGL0Isa0JBQXdCdEIsRUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDeUJ4QyxJQUFJLENBQUNVLFVBQVUsQ0FBQ0MsSUFBWixFQUFrQjtBQUFFaUMsOEJBQWMsRUFBRTtBQUFsQixlQUFsQixDQUQ3Qjs7QUFBQTtBQUNVbUIsb0JBRFY7QUFFVW5CLDRCQUZWLEdBRTJCMUIsNkNBQUssQ0FBQzZDLE1BQU0sQ0FBQ25CLGNBQVIsRUFBd0IsRUFBeEIsQ0FGaEM7QUFHSUEsNEJBQWMsQ0FBQ0osRUFBRCxDQUFkLEdBQXFCLElBQXJCO0FBSEosZ0RBSVd6QixLQUFLLENBQUNMLFVBQVUsQ0FBQ0MsSUFBWixFQUFrQjtBQUFFaUMsOEJBQWMsRUFBRTNFLElBQUksQ0FBQ0MsU0FBTCxDQUFlMEUsY0FBZjtBQUFsQixlQUFsQixDQUpoQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQXJGK0I7QUFBQTtBQUFBOztBQUFBLFdBNEZoQm9CLFdBNUZnQjtBQUFBO0FBQUE7O0FBQUE7QUFBQSwyRUE0Ri9CLGtCQUE0QkMsU0FBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdEQUNXbEQsS0FBSyxDQUFDTCxVQUFVLENBQUNDLElBQVosRUFBa0I7QUFBRWlDLDhCQUFjLEVBQUUsSUFBbEI7QUFBd0JDLG9CQUFJLEVBQUVvQjtBQUE5QixlQUFsQixDQURoQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQTVGK0I7QUFBQTtBQUFBOztBQWdHL0IsV0FBU0MsU0FBVCxDQUFvQnhCLElBQXBCLEVBQTBCO0FBQ3RCLFdBQU8zQixLQUFLLENBQUNMLFVBQVUsQ0FBQ0UsS0FBWixFQUFtQjtBQUFFOEIsVUFBSSxFQUFFekUsSUFBSSxDQUFDQyxTQUFMLENBQWV3RSxJQUFmO0FBQVIsS0FBbkIsQ0FBWjtBQUNIOztBQWxHOEIsV0FvR2hCeUIsSUFwR2dCO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG9FQW9HL0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQzJCbkUsSUFBSSxDQUFDVSxVQUFVLENBQUNDLElBQVosRUFBa0I7QUFBRWtDLG9CQUFJLEVBQUU7QUFBUixlQUFsQixDQUQvQjs7QUFBQTtBQUFBO0FBQ1lBLGtCQURaLGdCQUNZQSxJQURaOztBQUFBLGtCQUVTQSxJQUZUO0FBQUE7QUFBQTtBQUFBOztBQUdjdUIsbUJBSGQsR0FHc0IsSUFBSUMsSUFBSixFQUh0QjtBQUlRRCxtQkFBSyxDQUFDRSxRQUFOLENBQWUsQ0FBZixFQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QjtBQUpSO0FBQUEscUJBS2N2RCxLQUFLLENBQUNMLFVBQVUsQ0FBQ0MsSUFBWixFQUFrQjtBQUFFa0Msb0JBQUksRUFBRXVCLEtBQUssQ0FBQ0csT0FBTjtBQUFSLGVBQWxCLENBTG5COztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBcEcrQjtBQUFBO0FBQUE7O0FBQUEsV0E2R2hCQyxTQTdHZ0I7QUFBQTtBQUFBOztBQUFBO0FBQUEseUVBNkcvQixrQkFBMEJDLE1BQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUNVMUQsS0FBSyxDQUFDTCxVQUFVLENBQUNFLEtBQVosRUFBbUI7QUFBRTZELHNCQUFNLEVBQU5BO0FBQUYsZUFBbkIsQ0FEZjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQTdHK0I7QUFBQTtBQUFBOztBQUFBLFdBaUhoQkMsU0FqSGdCO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHlFQWlIL0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQzZCMUUsSUFBSSxDQUFDVSxVQUFVLENBQUNFLEtBQVosRUFBbUI7QUFBRTZELHNCQUFNLEVBQUU7QUFBVixlQUFuQixDQURqQzs7QUFBQTtBQUFBO0FBQ1lBLG9CQURaLGdCQUNZQSxNQURaO0FBQUEsaURBRVdBLE1BRlg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FqSCtCO0FBQUE7QUFBQTs7QUFBQSxXQXNIaEJFLE9BdEhnQjtBQUFBO0FBQUE7O0FBQUE7QUFBQSx1RUFzSC9CLG1CQUF3QkMsSUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ1U3RCxLQUFLLENBQUNMLFVBQVUsQ0FBQ0MsSUFBWixFQUFrQjtBQUFFaUUsb0JBQUksRUFBSkE7QUFBRixlQUFsQixDQURmOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBdEgrQjtBQUFBO0FBQUE7O0FBQUEsV0EwSGhCQyxPQTFIZ0I7QUFBQTtBQUFBOztBQUFBO0FBQUEsdUVBMEgvQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDMkI3RSxJQUFJLENBQUNVLFVBQVUsQ0FBQ0MsSUFBWixFQUFrQixDQUFDLE1BQUQsQ0FBbEIsQ0FEL0I7O0FBQUE7QUFBQTtBQUNZaUUsa0JBRFosZ0JBQ1lBLElBRFo7QUFBQSxpREFFV0EsSUFGWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQTFIK0I7QUFBQTtBQUFBOztBQUFBLFdBK0hoQkUsT0EvSGdCO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHVFQStIL0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQzJCOUUsSUFBSSxDQUFDVSxVQUFVLENBQUNDLElBQVosRUFBa0I7QUFBRWtDLG9CQUFJLEVBQUU7QUFBUixlQUFsQixDQUQvQjs7QUFBQTtBQUFBO0FBQ1lBLGtCQURaLGdCQUNZQSxJQURaO0FBQUEsaURBRVdBLElBRlg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0EvSCtCO0FBQUE7QUFBQTs7QUFBQSxXQW9JaEJrQyxrQkFwSWdCO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGtGQW9JL0IsbUJBQW1DQyxRQUFuQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaURBQ1dqRSxLQUFLLENBQUNMLFVBQVUsQ0FBQ0UsS0FBWixFQUFtQjtBQUFFcUUsNkJBQWEsRUFBRWhILElBQUksQ0FBQ0MsU0FBTCxDQUFlOEcsUUFBZjtBQUFqQixlQUFuQixDQURoQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQXBJK0I7QUFBQTtBQUFBOztBQUFBLFdBd0loQkUsZ0JBeElnQjtBQUFBO0FBQUE7O0FBQUE7QUFBQSxnRkF3SS9CO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUNvQ2xGLElBQUksQ0FBQ1UsVUFBVSxDQUFDRSxLQUFaLEVBQW1CO0FBQUVxRSw2QkFBYSxFQUFFO0FBQWpCLGVBQW5CLENBRHhDOztBQUFBO0FBQUE7QUFDWUEsMkJBRFosZ0JBQ1lBLGFBRFo7QUFBQSxpREFFVy9ELDZDQUFLLENBQUMrRCxhQUFELEVBQWdCLEVBQWhCLENBRmhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBeEkrQjtBQUFBO0FBQUE7O0FBQUEsV0E2SWhCRSxXQTdJZ0I7QUFBQTtBQUFBOztBQUFBO0FBQUEsMkVBNkkvQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDMEJuRSxXQUFXLEVBRHJDOztBQUFBO0FBQ1VoQyxxQkFEVjtBQUFBO0FBQUEscUJBRWlFZ0IsSUFBSSxDQUFDVSxVQUFVLENBQUNDLElBQVosRUFBa0I7QUFBRWlDLDhCQUFjLEVBQUUsSUFBbEI7QUFBd0JDLG9CQUFJLEVBQUU7QUFBOUIsZUFBbEIsQ0FGckU7O0FBQUE7QUFBQTtBQUU0QkMsa0NBRjVCLGlCQUVZRixjQUZaO0FBRWtEQyxrQkFGbEQsaUJBRWtEQSxJQUZsRDtBQUdVRCw0QkFIVixHQUcyQjFCLDZDQUFLLENBQUM0QixvQkFBRCxFQUF1QixFQUF2QixDQUhoQztBQUFBLGlEQUtXO0FBQ0g5RCx1QkFBTyxFQUFFQSxPQUFPLENBQUNvRyxHQUFSLENBQVksVUFBQ3ZILE1BQUQ7QUFBQSx5QkFBWUEsTUFBTSxDQUFDMkUsRUFBbkI7QUFBQSxpQkFBWixDQUROO0FBRUhJLDhCQUFjLEVBQWRBLGNBRkc7QUFHSEMsb0JBQUksRUFBRXdDLE1BQU0sQ0FBQ3hDLElBQUQ7QUFIVCxlQUxYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBN0krQjtBQUFBO0FBQUE7O0FBQUEsV0F5SmhCeUMsV0F6SmdCO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDJFQXlKL0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTZCdEcscUJBQTdCLFFBQTZCQSxPQUE3QixFQUFzQzRELGNBQXRDLFFBQXNDQSxjQUF0QyxFQUFzREMsSUFBdEQsUUFBc0RBLElBQXREO0FBQUE7QUFBQSxxQkFDaUM3QixXQUFXLEVBRDVDOztBQUFBO0FBQ1V1RSwyQkFEVixtQkFDZ0RwRSxNQURoRCxDQUN1RCxVQUFDcUUsRUFBRCxFQUFLM0gsTUFBTDtBQUFBLHVCQUFnQkEsTUFBTSxtQ0FBUTJILEVBQVIsMkJBQWEzSCxNQUFNLENBQUMyRSxFQUFwQixFQUF5QixJQUF6QixLQUFrQ2dELEVBQXhEO0FBQUEsZUFEdkQsRUFDbUgsRUFEbkg7QUFFVUMsK0JBRlYsR0FFOEJ0QyxNQUFNLENBQUN1QyxJQUFQLENBQVlILGFBQVosRUFBMkJ6RCxNQUEzQixLQUFzQzlDLE9BQU8sQ0FBQzhDLE1BQTlDLElBQ3RCOUMsT0FBTyxDQUFDa0QsSUFBUixDQUFhLFVBQUNyRSxNQUFEO0FBQUEsdUJBQVksQ0FBQzBILGFBQWEsQ0FBQzFILE1BQU0sQ0FBQzJFLEVBQVIsQ0FBMUI7QUFBQSxlQUFiLENBSFI7QUFJVW1ELHNCQUpWLEdBSXFCLENBQUN2RSxPQUFPLENBQUNHLE9BQVIsRUFBRCxDQUpyQjs7QUFLSSxrQkFBSWtFLGlCQUFKLEVBQXVCO0FBQ25CRSx3QkFBUSxDQUFDNUQsSUFBVCxDQUFjUCxZQUFZLENBQUN4QyxPQUFELENBQTFCO0FBQ0g7O0FBUEw7QUFBQSxxQkFReUJnQixJQUFJLENBQUNVLFVBQVUsQ0FBQ0MsSUFBWixFQUFrQjtBQUFFaUMsOEJBQWMsRUFBRSxJQUFsQjtBQUF3QkMsb0JBQUksRUFBRTtBQUE5QixlQUFsQixDQVI3Qjs7QUFBQTtBQVFVK0Msb0JBUlY7O0FBU0ksa0JBQUlBLE1BQU0sQ0FBQ2hELGNBQVAsS0FBMEIzRSxJQUFJLENBQUNDLFNBQUwsQ0FBZTBFLGNBQWYsQ0FBMUIsSUFBNERjLE1BQU0sQ0FBQ2tDLE1BQU0sQ0FBQy9DLElBQVIsQ0FBTixLQUF3QmEsTUFBTSxDQUFDYixJQUFELENBQTlGLEVBQXNHO0FBQ2xHOEMsd0JBQVEsQ0FBQzVELElBQVQsQ0FBY2hCLEtBQUssQ0FBQ0wsVUFBVSxDQUFDQyxJQUFaLEVBQWtCO0FBQ2pDaUMsZ0NBQWMsRUFBRTNFLElBQUksQ0FBQ0MsU0FBTCxDQUFlMEUsY0FBZixDQURpQjtBQUVqQ0Msc0JBQUksRUFBSkE7QUFGaUMsaUJBQWxCLENBQW5CO0FBSUg7O0FBZEw7QUFBQSxxQkFnQlV6QixPQUFPLENBQUNDLEdBQVIsQ0FBWXNFLFFBQVosQ0FoQlY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0F6SitCO0FBQUE7QUFBQTs7QUE0Sy9CeEIsTUFBSTtBQUVKLFNBQU87QUFDSG5GLFdBQU8sRUFBRTtBQUNMZ0IsVUFBSSxFQUFFZ0IsV0FERDtBQUVMNkUsWUFBTSxFQUFFckUsWUFGSDtBQUdMc0UsU0FBRyxFQUFFN0QsU0FIQTtBQUlMOEQsWUFBTSxFQUFFM0Q7QUFKSCxLQUROO0FBT0g0QyxZQUFRLEVBQUU7QUFDTmdCLFdBQUssRUFBRTtBQUNIaEcsWUFBSSxFQUFFa0YsZ0JBREg7QUFFSGUsV0FBRyxFQUFFbEI7QUFGRjtBQURELEtBUFA7QUFhSHRDLFdBQU8sRUFBUEEsT0FiRztBQWNIQyxRQUFJLEVBQUU7QUFDRjFDLFVBQUksRUFBRTJDLHFCQURKO0FBRUZFLFVBQUksRUFBRWlCLE9BRko7QUFHRm9DLGFBQU8sRUFBRWxDLFdBSFA7QUFJRjZCLFlBQU0sRUFBRTNCLFNBSk47QUFLRk0sZUFBUyxFQUFUQSxTQUxFO0FBTUZFLGVBQVMsRUFBVEEsU0FORTtBQU9GSSxhQUFPLEVBQVBBO0FBUEUsS0FkSDtBQXVCSHFCLFlBQVEsRUFBRXJGLE9BQU8sQ0FBQ3NGLFdBdkJmO0FBd0JIeEIsUUFBSSxFQUFFO0FBQ0ZxQixTQUFHLEVBQUV0QixPQURIO0FBRUYzRSxVQUFJLEVBQUU2RSxPQUZKO0FBR0ZtQixXQUFLLEVBQUViLFdBSEw7QUFJRmtCLGNBQVEsRUFBRWY7QUFKUjtBQXhCSCxHQUFQO0FBK0JILEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwTk0sU0FBZWdCLGNBQXRCO0FBQUE7QUFBQTs7OzRFQUFPLGlCQUErQkMsR0FBL0IsRUFBb0NDLEdBQXBDO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDSy9GLGlCQURMLEdBQ2UrRixHQURmLENBQ0svRixLQURMO0FBQUE7QUFBQSxtQkFFa0JBLEtBQUssQ0FBQ1QsSUFBTixFQUZsQjs7QUFBQTtBQUVHK0Qsa0JBRkg7QUFHRzBDLHlCQUhILEdBR21CQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FIbkI7O0FBSUgsZ0JBQUk1QyxNQUFNLENBQUNyRixLQUFYLEVBQWtCO0FBQ1JrSSxtQkFEUSxHQUNBN0MsTUFBTSxDQUFDbkYsT0FEUDtBQUdSaUksc0JBSFEsR0FHR0QsS0FBSyxDQUFDRSxNQUFOLENBQ1p6RCxJQURZLENBQ1AsVUFBQzBELENBQUQsRUFBSUMsQ0FBSjtBQUFBLHVCQUFVdEQsTUFBTSxDQUFDcUQsQ0FBRCxhQUFDQSxDQUFELHVCQUFDQSxDQUFDLENBQUVFLElBQUosQ0FBTixDQUFnQnRELGFBQWhCLENBQThCcUQsQ0FBOUIsYUFBOEJBLENBQTlCLHVCQUE4QkEsQ0FBQyxDQUFFQyxJQUFqQyxDQUFWO0FBQUEsZUFETyxFQUVaN0IsR0FGWSxDQUVSLFVBQUM4QixJQUFEO0FBQUEsMkNBQXNCQSxJQUFJLENBQUNwSSxHQUEzQixtREFBa0VvSSxJQUFJLENBQUNELElBQXZFO0FBQUEsZUFGUSxFQUUyRUUsSUFGM0UsQ0FFZ0YsaUJBRmhGLENBSEg7QUFNZFYsMkJBQWEsQ0FBQ1csU0FBZCwwRkFFNkJQLFFBRjdCOztBQUtBLGtCQUFJRCxLQUFLLENBQUNTLFFBQU4sQ0FBZXZGLE1BQW5CLEVBQTJCO0FBQ2pCK0UseUJBRGlCLEdBQ05ELEtBQUssQ0FBQ1MsUUFBTixDQUNaaEUsSUFEWSxDQUNQLFVBQUMwRCxDQUFELEVBQUlDLENBQUo7QUFBQSx5QkFBVXRELE1BQU0sQ0FBQ3FELENBQUQsYUFBQ0EsQ0FBRCx1QkFBQ0EsQ0FBQyxDQUFFRSxJQUFKLENBQU4sQ0FBZ0J0RCxhQUFoQixDQUE4QnFELENBQTlCLGFBQThCQSxDQUE5Qix1QkFBOEJBLENBQUMsQ0FBRUMsSUFBakMsQ0FBVjtBQUFBLGlCQURPLEVBRVo3QixHQUZZLENBRVIsVUFBQzhCLElBQUQ7QUFBQSw2Q0FBc0JBLElBQUksQ0FBQ3BJLEdBQTNCLG1EQUFrRW9JLElBQUksQ0FBQ0QsSUFBdkU7QUFBQSxpQkFGUSxFQUUyRUUsSUFGM0UsQ0FFZ0YsaUJBRmhGLENBRE07QUFJdkJWLDZCQUFhLENBQUNXLFNBQWQsOEpBRTZCUCxTQUY3QjtBQUlIOztBQUNESiwyQkFBYSxDQUFDVyxTQUFkO0FBR0g7O0FBM0JFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBUDtBQUNBO0FBRU8sU0FBU0UsaUJBQVQsQ0FBNEJDLEVBQTVCLEVBQWdDO0FBQ25DLE1BQU1DLFVBQVUsR0FBR2QsUUFBUSxDQUFDZSxjQUFULENBQXdCLFFBQXhCLENBQW5CO0FBQ0EsTUFBTUMsVUFBVSxHQUFHaEIsUUFBUSxDQUFDZSxjQUFULENBQXdCLFFBQXhCLENBQW5CO0FBRUFELFlBQVUsQ0FBQ0csZ0JBQVgsQ0FBNEIsUUFBNUIsRUFBc0MsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3pDLFFBQU1DLElBQUksR0FBR0QsQ0FBQyxDQUFDRSxNQUFGLENBQVNDLEtBQVQsQ0FBZSxDQUFmLENBQWI7QUFDQSxRQUFNQyxFQUFFLEdBQUcsSUFBSUMsVUFBSixFQUFYO0FBQ0FELE1BQUUsQ0FBQ0wsZ0JBQUgsQ0FBb0IsTUFBcEIsRUFBNEIsWUFBTTtBQUM5QixVQUFNM0ksT0FBTyxHQUFHa0MsNkNBQUssQ0FBQzhHLEVBQUUsQ0FBQ2pFLE1BQUosRUFBWSxFQUFaLENBQXJCO0FBQ0EsVUFBTW1FLEtBQUssR0FBR2xKLE9BQU8sQ0FBQ3VELE1BQVIsQ0FBZSxVQUFDMUUsTUFBRDtBQUFBLGVBQVksQ0FBQUEsTUFBTSxTQUFOLElBQUFBLE1BQU0sV0FBTixZQUFBQSxNQUFNLENBQUVzSyxLQUFSLEtBQWlCdEssTUFBTSxDQUFDaUIsR0FBeEIsSUFBK0JqQixNQUFNLENBQUNzRSxPQUFsRDtBQUFBLE9BQWYsQ0FBZDs7QUFDQSxVQUFJK0YsS0FBSyxDQUFDcEcsTUFBVixFQUFrQjtBQUNkeUYsVUFBRSxDQUFDdkksT0FBSCxDQUFXNkcsTUFBWCxDQUFrQnFDLEtBQWxCO0FBQ0g7O0FBQ0RWLGdCQUFVLENBQUNPLEtBQVgsR0FBbUIsSUFBbkI7QUFDSCxLQVBEO0FBUUFDLE1BQUUsQ0FBQ0ksVUFBSCxDQUFjUCxJQUFkO0FBQ0gsR0FaRDtBQWNBSCxZQUFVLENBQUNDLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLFlBQU07QUFDdkNKLE1BQUUsQ0FBQ3ZJLE9BQUgsQ0FBV2dCLElBQVgsR0FDSzNCLElBREwsQ0FDVSxVQUFDVyxPQUFELEVBQWE7QUFDZixVQUFNcUosSUFBSSxHQUFHLElBQUlDLElBQUosQ0FBUyxDQUFDckssSUFBSSxDQUFDQyxTQUFMLENBQWVjLE9BQWYsQ0FBRCxDQUFULEVBQW9DO0FBQUV1SixZQUFJLEVBQUU7QUFBUixPQUFwQyxDQUFiO0FBQ0FDLHNEQUFNLENBQUNILElBQUQsRUFBTyxnQkFBUCxDQUFOO0FBQ0gsS0FKTDtBQUtILEdBTkQ7QUFPSCxDOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUJEO0FBRU8sU0FBU0kscUJBQVQsQ0FBZ0NsQixFQUFoQyxFQUFvQ21CLEdBQXBDLEVBQXlDO0FBQzVDLE1BQU1DLGFBQWEsR0FBR2pDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixZQUF2QixDQUF0QjtBQUNBLE1BQU1pQyxVQUFVLEdBQUdsQyxRQUFRLENBQUNlLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBbkI7QUFDQSxNQUFNb0IsU0FBUyxHQUFHbkMsUUFBUSxDQUFDZSxjQUFULENBQXdCLEtBQXhCLENBQWxCO0FBQ0EsTUFBTS9FLElBQUksR0FBR2dFLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixNQUF4QixDQUFiO0FBQ0EsTUFBTXFCLFFBQVEsR0FBR3BDLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixVQUF4QixDQUFqQjtBQUNBLE1BQU1zQixVQUFVLEdBQUdyQyxRQUFRLENBQUNlLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBbkI7QUFDQSxNQUFNekksT0FBTyxHQUFHMEgsUUFBUSxDQUFDZSxjQUFULENBQXdCLFNBQXhCLENBQWhCO0FBQ0EsTUFBTXpDLFFBQVEsR0FBRzBCLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixVQUF4QixDQUFqQjtBQUNBLE1BQU11QixlQUFlLEdBQUd0QyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBeEI7QUFDQSxNQUFNc0MsUUFBUSxHQUFHdkMsUUFBUSxDQUFDQyxhQUFULENBQXVCLFdBQXZCLENBQWpCO0FBQ0EsTUFBTXVDLEtBQUssR0FBR3hDLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixPQUF4QixDQUFkOztBQUVBLE1BQU0wQixZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ3ZCNUIsTUFBRSxDQUFDdkksT0FBSCxDQUFXZ0IsSUFBWCxHQUNLM0IsSUFETCxDQUNVLFVBQUNXLE9BQUQsRUFBYTtBQUNma0ssV0FBSyxDQUFDRSxLQUFOLENBQVlDLE9BQVosR0FBc0JySyxPQUFPLENBQUM4QyxNQUFSLEdBQWlCLE1BQWpCLEdBQTBCLE1BQWhEO0FBQ0gsS0FITDtBQUlBOUMsV0FBTyxDQUFDb0ssS0FBUixDQUFjQyxPQUFkLEdBQXdCLE1BQXhCO0FBQ0FWLGlCQUFhLENBQUNTLEtBQWQsQ0FBb0JDLE9BQXBCLEdBQThCLE1BQTlCO0FBQ0FOLGNBQVUsQ0FBQ0ssS0FBWCxDQUFpQkMsT0FBakIsR0FBMkIsTUFBM0I7QUFDQUwsbUJBQWUsQ0FBQ0ksS0FBaEIsQ0FBc0JDLE9BQXRCLEdBQWdDLE1BQWhDO0FBQ0EzRyxRQUFJLENBQUMwRyxLQUFMLENBQVdDLE9BQVgsR0FBcUIsRUFBckI7QUFDQUosWUFBUSxDQUFDRyxLQUFULENBQWVDLE9BQWYsR0FBeUIsRUFBekI7QUFDQVAsWUFBUSxDQUFDTSxLQUFULENBQWVDLE9BQWYsR0FBeUIsTUFBekI7QUFDQXJFLFlBQVEsQ0FBQ29FLEtBQVQsQ0FBZUMsT0FBZixHQUF5QixFQUF6QjtBQUNBUixhQUFTLENBQUNPLEtBQVYsQ0FBZ0JDLE9BQWhCLEdBQTBCLEVBQTFCO0FBQ0FULGNBQVUsQ0FBQ1UsU0FBWCxHQUF1QixVQUF2QjtBQUNILEdBZkQ7O0FBaUJBLE1BQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQU07QUFDdkJMLFNBQUssQ0FBQ0UsS0FBTixDQUFZQyxPQUFaLEdBQXNCLE1BQXRCO0FBQ0FySyxXQUFPLENBQUNvSyxLQUFSLENBQWNDLE9BQWQsR0FBd0IsTUFBeEI7QUFDQVYsaUJBQWEsQ0FBQ1MsS0FBZCxDQUFvQkMsT0FBcEIsR0FBOEIsTUFBOUI7QUFDQU4sY0FBVSxDQUFDSyxLQUFYLENBQWlCQyxPQUFqQixHQUEyQixNQUEzQjtBQUNBSixZQUFRLENBQUNHLEtBQVQsQ0FBZUMsT0FBZixHQUF5QixNQUF6QjtBQUNBTCxtQkFBZSxDQUFDSSxLQUFoQixDQUFzQkMsT0FBdEIsR0FBZ0MsRUFBaEM7QUFDQTNHLFFBQUksQ0FBQzBHLEtBQUwsQ0FBV0MsT0FBWCxHQUFxQixNQUFyQjtBQUNBVCxjQUFVLENBQUNVLFNBQVgsR0FBdUIsVUFBdkI7QUFDQVQsYUFBUyxDQUFDTyxLQUFWLENBQWdCQyxPQUFoQixHQUEwQixFQUExQjtBQUNBUCxZQUFRLENBQUNNLEtBQVQsQ0FBZUMsT0FBZixHQUF5QixFQUF6QjtBQUNBckUsWUFBUSxDQUFDb0UsS0FBVCxDQUFlQyxPQUFmLEdBQXlCLE1BQXpCO0FBQ0gsR0FaRDs7QUFjQVAsVUFBUSxDQUFDbkIsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUN3QixZQUFuQztBQUVBTixXQUFTLENBQUNsQixnQkFBVixDQUEyQixPQUEzQixFQUFvQyxZQUFNO0FBQ3RDdUIsU0FBSyxDQUFDRSxLQUFOLENBQVlDLE9BQVosR0FBc0IsTUFBdEI7QUFDQXJLLFdBQU8sQ0FBQ29LLEtBQVIsQ0FBY0MsT0FBZCxHQUF3QixPQUF4QjtBQUNBVixpQkFBYSxDQUFDUyxLQUFkLENBQW9CQyxPQUFwQixHQUE4QixNQUE5QjtBQUNBTixjQUFVLENBQUNLLEtBQVgsQ0FBaUJDLE9BQWpCLEdBQTJCLE1BQTNCO0FBQ0FMLG1CQUFlLENBQUNJLEtBQWhCLENBQXNCQyxPQUF0QixHQUFnQyxNQUFoQztBQUNBSixZQUFRLENBQUNHLEtBQVQsQ0FBZUMsT0FBZixHQUF5QixNQUF6QjtBQUNBM0csUUFBSSxDQUFDMEcsS0FBTCxDQUFXQyxPQUFYLEdBQXFCLE1BQXJCO0FBQ0FULGNBQVUsQ0FBQ1UsU0FBWCxHQUF1QixXQUF2QjtBQUNBVCxhQUFTLENBQUNPLEtBQVYsQ0FBZ0JDLE9BQWhCLEdBQTBCLE1BQTFCO0FBQ0FQLFlBQVEsQ0FBQ00sS0FBVCxDQUFlQyxPQUFmLEdBQXlCLEVBQXpCO0FBQ0FyRSxZQUFRLENBQUNvRSxLQUFULENBQWVDLE9BQWYsR0FBeUIsRUFBekI7QUFDSCxHQVpEO0FBY0FyRSxVQUFRLENBQUMyQyxnQkFBVCxDQUEwQixPQUExQixFQUFtQzRCLFlBQW5DOztBQUVBLE1BQUlDLHVEQUFZLEVBQWhCLEVBQW9CO0FBQ2hCRCxnQkFBWTtBQUNaRSw2REFBYyxDQUFDbEMsRUFBRCxFQUFLbUIsR0FBTCxDQUFkO0FBQ0gsR0FIRCxNQUlLO0FBQ0RTLGdCQUFZO0FBQ2Y7QUFDSixDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFRCxJQUFNRixRQUFRLEdBQUd2QyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBakI7QUFFQSxJQUFJK0MsTUFBTSxHQUFHLEtBQWI7QUFFTyxJQUFNQyx1QkFBdUIsR0FBRyxTQUExQkEsdUJBQTBCLENBQUNDLFNBQUQsRUFBZTtBQUNsRFgsVUFBUSxDQUFDdEIsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBTTtBQUNyQ2lDLGFBQVM7QUFDVEMsaUJBQWE7QUFDaEIsR0FIRDtBQUlILENBTE07QUFPQSxJQUFNQSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU07QUFDL0JaLFVBQVEsQ0FBQzdCLFNBQVQsR0FBcUIsY0FBckI7QUFDQTZCLFVBQVEsQ0FBQ2EsT0FBVCxDQUFpQkMsTUFBakIsR0FBMEIsY0FBMUI7QUFDQUwsUUFBTSxHQUFHLElBQVQ7QUFDQU0sWUFBVSxDQUFDLFlBQU07QUFDYk4sVUFBTSxHQUFHLEtBQVQ7QUFDQVQsWUFBUSxDQUFDYSxPQUFULENBQWlCQyxNQUFqQixHQUEwQixnQkFBMUI7QUFDSCxHQUhTLEVBR1AsSUFITyxDQUFWO0FBSUgsQ0FSTTtBQVVBLElBQU1FLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsU0FBRCxFQUFZQyxRQUFaLEVBQXlCO0FBQ25ELE1BQUksQ0FBQ1QsTUFBTCxFQUFhO0FBQ1QsUUFBTVUsU0FBUyxHQUFHRCxRQUFRLEdBQUc5RixJQUFJLENBQUNnRyxHQUFMLEVBQTdCO0FBRUEsUUFBTUMsT0FBTyxHQUFHM0ksSUFBSSxDQUFDQyxHQUFMLENBQVNELElBQUksQ0FBQzRJLEtBQUwsQ0FBV0gsU0FBUyxHQUFHLElBQXZCLENBQVQsRUFBdUMsQ0FBdkMsQ0FBaEI7QUFFQW5CLFlBQVEsQ0FBQzdCLFNBQVQsNEJBQXVDa0QsT0FBdkM7QUFDSDtBQUNKLENBUk0sQzs7Ozs7Ozs7Ozs7Ozs7O0FDckJBLElBQU1FLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBcUY7QUFBQSxpRkFBUCxFQUFPO0FBQUEsMkJBQWxGQyxRQUFrRjtBQUFBLE1BQWxGQSxRQUFrRiw4QkFBdkUsS0FBdUU7QUFBQSwyQkFBaEVDLFFBQWdFO0FBQUEsTUFBaEVBLFFBQWdFLDhCQUFyRCxDQUFxRDtBQUFBLDJCQUFsREMsUUFBa0Q7QUFBQSxNQUFsREEsUUFBa0QsOEJBQXZDQyxRQUFRLENBQUNDLFNBQThCO0FBQUEsTUFBbkJDLE9BQW1CLFFBQW5CQSxPQUFtQjs7QUFDL0csTUFBSVgsUUFBUSxHQUFHLENBQWY7QUFDQSxNQUFJWSxRQUFRLEdBQUcsQ0FBZjs7QUFDQSxNQUFNQyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ3ZCLFFBQUliLFFBQVEsSUFBSUEsUUFBUSxJQUFJOUYsSUFBSSxDQUFDZ0csR0FBTCxFQUE1QixFQUF3QztBQUNwQ00sY0FBUTtBQUNSSSxjQUFRLEdBQUdaLFFBQVg7QUFDQUEsY0FBUSxHQUFHQSxRQUFRLEdBQUdPLFFBQVgsR0FBc0JyRyxJQUFJLENBQUNnRyxHQUFMLEVBQXRCLEdBQW1DRixRQUFRLEdBQUdPLFFBQTlDLEdBQXlEckcsSUFBSSxDQUFDZ0csR0FBTCxLQUFhSyxRQUFqRjtBQUNIOztBQUNELFdBQU9JLE9BQVAsS0FBbUIsVUFBbkIsSUFBaUNBLE9BQU8sQ0FBQ0MsUUFBRCxFQUFXWixRQUFYLENBQXhDO0FBQ0gsR0FQRDs7QUFTQSxNQUFJTSxRQUFRLElBQUlDLFFBQWhCLEVBQTBCO0FBQ3RCUCxZQUFRLEdBQUc5RixJQUFJLENBQUNnRyxHQUFMLEtBQWEsQ0FBeEI7QUFDQVcsZ0JBQVk7QUFDZjs7QUFFRCxNQUFJQyxLQUFLLEdBQUdDLFdBQVcsQ0FBQ0YsWUFBRCxFQUFlLEdBQWYsQ0FBdkI7QUFFQSxTQUFPO0FBQ0hFLGVBREcsdUJBQ1VDLFdBRFYsRUFDdUI7QUFDdEIsVUFBSSxPQUFPQSxXQUFQLEtBQXVCLFFBQTNCLEVBQXFDO0FBQ2pDLGNBQU0sSUFBSUMsS0FBSixDQUFVLGNBQVYsQ0FBTjtBQUNIOztBQUNEakIsY0FBUSxHQUFHQSxRQUFRLEdBQUdPLFFBQVgsR0FBc0JTLFdBQWpDO0FBQ0FULGNBQVEsR0FBR1MsV0FBWDtBQUNBSCxrQkFBWTtBQUNmLEtBUkU7QUFTSEssZUFURyx1QkFTVUMsRUFUVixFQVNjO0FBQ2JYLGNBQVEsR0FBR1csRUFBWDtBQUNILEtBWEU7QUFZSEMsU0FaRyxtQkFZTTtBQUNMWixjQUFRO0FBQ1JJLGNBQVEsR0FBRzFHLElBQUksQ0FBQ2dHLEdBQUwsRUFBWDtBQUNBRixjQUFRLEdBQUc5RixJQUFJLENBQUNnRyxHQUFMLEtBQWFLLFFBQXhCO0FBQ0FPLFdBQUssR0FBR0MsV0FBVyxDQUFDRixZQUFELEVBQWUsR0FBZixDQUFuQjtBQUNILEtBakJFO0FBa0JIUSxvQkFsQkcsOEJBa0JpQjtBQUNoQmIsY0FBUTtBQUNSSSxjQUFRLEdBQUcxRyxJQUFJLENBQUNnRyxHQUFMLEVBQVg7QUFDQUYsY0FBUSxHQUFHOUYsSUFBSSxDQUFDZ0csR0FBTCxLQUFhSyxRQUF4QjtBQUNBLGFBQU9JLE9BQVAsS0FBbUIsVUFBbkIsSUFBaUNBLE9BQU8sQ0FBQ0MsUUFBRCxFQUFXWixRQUFYLENBQXhDO0FBQ0gsS0F2QkU7QUF3QkhzQixRQXhCRyxrQkF3Qks7QUFDSkMsbUJBQWEsQ0FBQ1QsS0FBRCxDQUFiO0FBQ0FkLGNBQVEsR0FBRyxDQUFYO0FBQ0FZLGNBQVEsR0FBRyxDQUFYO0FBQ0g7QUE1QkUsR0FBUDtBQThCSCxDQWpETSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQVAsSUFBTVksVUFBVSxHQUFHLENBQUMsTUFBRCxFQUFTLGdCQUFULEVBQTJCLFNBQTNCLENBQW5COztBQUVBLFNBQVNDLFNBQVQsR0FBOEI7QUFBQSxNQUFWdk0sR0FBVSx1RUFBSixFQUFJO0FBQzFCLG1CQUFVQSxHQUFHLENBQUMyQyxLQUFKLENBQVUsQ0FBVixFQUFhLENBQWIsQ0FBVixjQUE2QjNDLEdBQUcsQ0FBQzJDLEtBQUosQ0FBVSxDQUFWLEVBQWEsRUFBYixDQUE3QixjQUFpRDNDLEdBQUcsQ0FBQzJDLEtBQUosQ0FBVSxFQUFWLEVBQWMsRUFBZCxDQUFqRDtBQUNIOztBQUVNLFNBQVM2SixjQUFULENBQXlCdEUsRUFBekIsRUFBNkJtQixHQUE3QixFQUFrQztBQUFBLFdBQ3RCb0QsY0FEc0I7QUFBQTtBQUFBOztBQUFBO0FBQUEsOEVBQ3JDLGlCQUErQkMsT0FBL0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1VDLHVCQURWLEdBQ3NCTCxVQUFVLENBQUNwSixNQUFYLENBQWtCLFVBQUNsRCxHQUFEO0FBQUEsdUJBQVM4RCxNQUFNLENBQUN1QyxJQUFQLENBQVlxRyxPQUFaLEVBQXFCN0osSUFBckIsQ0FBMEIsVUFBQytKLE1BQUQ7QUFBQSx5QkFBWUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCN00sR0FBaEIsQ0FBWjtBQUFBLGlCQUExQixDQUFUO0FBQUEsZUFBbEIsQ0FEdEI7O0FBQUEsbUJBR1EyTSxTQUFTLENBQUNsSyxNQUhsQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQUkyQnlGLEVBQUUsQ0FBQzNDLElBQUgsQ0FBUTVFLElBQVIsRUFKM0I7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSw0QkFJNkMsRUFKN0M7O0FBQUE7QUFJYzRFLGtCQUpkO0FBQUE7QUFBQSxxQkFLNEIyQyxFQUFFLENBQUMzQyxJQUFILENBQVFvQixLQUFSLEVBTDVCOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsNEJBSytDLEVBTC9DOztBQUFBO0FBS2NBLG1CQUxkO0FBTWN4RixvQkFOZCxHQU11QixFQU52Qjs7QUFPUSxrQkFBSXdMLFNBQVMsQ0FBQ0UsUUFBVixDQUFtQixNQUFuQixDQUFKLEVBQWdDO0FBQzVCMUwsc0JBQU0sQ0FBQ3FDLElBQVAsR0FBY21ELEtBQUssQ0FBQ25ELElBQXBCO0FBQ0g7O0FBQ0Qsa0JBQUltSixTQUFTLENBQUNFLFFBQVYsQ0FBbUIsZ0JBQW5CLENBQUosRUFBMEM7QUFDdEMxTCxzQkFBTSxDQUFDb0MsY0FBUCxHQUF3Qm9ELEtBQUssQ0FBQ3BELGNBQTlCO0FBQ0g7O0FBQ0Qsa0JBQUlvSixTQUFTLENBQUNFLFFBQVYsQ0FBbUIsU0FBbkIsQ0FBSixFQUFtQztBQUMvQjFMLHNCQUFNLENBQUN4QixPQUFQLEdBQWlCZ0gsS0FBSyxDQUFDaEgsT0FBdkI7QUFDSDs7QUFmVCxvQkFpQlltRSxNQUFNLENBQUN1QyxJQUFQLENBQVlsRixNQUFaLEVBQW9Cc0IsTUFBcEIsSUFBOEI4QyxJQUFJLENBQUN2RixHQWpCL0M7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxxQkFrQmtCcUosR0FBRyxDQUFDbkksSUFBSixDQUFTQyxNQUFULENBQWdCb0UsSUFBSSxDQUFDdkYsR0FBckIsRUFBMEJtQixNQUExQixFQUNEbkMsSUFEQyxDQUNJLFVBQUNDLEdBQUQ7QUFBQSx1QkFBU0EsR0FBRyxDQUFDSSxLQUFKLElBQWE2SSxFQUFFLENBQUMzQyxJQUFILENBQVFxQixHQUFSLENBQVk7QUFBRTVHLHFCQUFHLEVBQUVmLEdBQUcsQ0FBQ00sT0FBSixDQUFZUztBQUFuQixpQkFBWixDQUF0QjtBQUFBLGVBREosQ0FsQmxCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBRHFDO0FBQUE7QUFBQTs7QUFBQSxXQXlCdEI4TSxlQXpCc0I7QUFBQTtBQUFBOztBQUFBO0FBQUEsK0VBeUJyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUN1QjVFLEVBQUUsQ0FBQzNDLElBQUgsQ0FBUTVFLElBQVIsRUFEdkI7O0FBQUE7QUFDVTRFLGtCQURWOztBQUdJLGtCQUFJQSxJQUFKLEVBQVU7QUFDTjhELG1CQUFHLENBQUNuSSxJQUFKLENBQVNQLElBQVQsQ0FBYzRFLElBQUksQ0FBQ3ZGLEdBQW5CLEVBQXdCdUYsSUFBSSxDQUFDd0gsWUFBN0IsRUFDSy9OLElBREwsQ0FDVSxVQUFDQyxHQUFELEVBQVM7QUFDWCxzQkFBSUEsR0FBRyxDQUFDSSxLQUFKLElBQWFKLEdBQUcsQ0FBQ00sT0FBckIsRUFBOEI7QUFDMUIySSxzQkFBRSxDQUFDM0MsSUFBSCxDQUFReUIsUUFBUixDQUFpQi9ILEdBQUcsQ0FBQ00sT0FBckI7QUFDSDtBQUNKLGlCQUxMO0FBTUg7O0FBVkw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0F6QnFDO0FBQUE7QUFBQTs7QUFxQ3JDLFNBQU87QUFDSGtOLGtCQUFjLEVBQWRBLGNBREc7QUFFSEssbUJBQWUsRUFBZkE7QUFGRyxHQUFQO0FBSUg7O0FBRUQsU0FBU0UsY0FBVCxDQUF5QmhOLEdBQXpCLEVBQThCO0FBQzFCLE1BQUksT0FBT0EsR0FBUCxLQUFlLFFBQW5CLEVBQTZCO0FBQ3pCO0FBQ0g7O0FBRUQsTUFBTWlOLFFBQVEsR0FBR2pOLEdBQUcsQ0FBQ2tOLFVBQUosQ0FBZSxTQUFmLEVBQTBCLEVBQTFCLENBQWpCOztBQUNBLE1BQUlELFFBQVEsQ0FBQ3hLLE1BQVQsS0FBb0IsRUFBeEIsRUFBNEI7QUFDeEIsV0FBTyxJQUFQO0FBQ0g7QUFDSjs7QUFFTSxTQUFTMEgsWUFBVCxHQUF5QjtBQUM1QixNQUFNZ0QsU0FBUyxHQUFHLElBQUlDLGVBQUosQ0FBb0JDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsTUFBcEMsQ0FBbEI7O0FBRUEsTUFBSVAsY0FBYyxDQUFDRyxTQUFTLENBQUNLLEdBQVYsQ0FBYyxNQUFkLENBQUQsQ0FBbEIsRUFBMkM7QUFDdkMsV0FBT0wsU0FBUyxDQUFDSyxHQUFWLENBQWMsTUFBZCxFQUFzQk4sVUFBdEIsQ0FBaUMsU0FBakMsRUFBNEMsRUFBNUMsQ0FBUDtBQUNIO0FBQ0o7QUFFTSxTQUFlOUMsY0FBdEI7QUFBQTtBQUFBOzs7NEVBQU8sa0JBQStCbEMsRUFBL0IsRUFBbUNmLEdBQW5DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNHbkgsZUFESCxHQUNTbUssWUFBWSxFQURyQjs7QUFBQSxpQkFHQ25LLEdBSEQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtQkFJMkJrSSxFQUFFLENBQUMzQyxJQUFILENBQVE1RSxJQUFSLEVBSjNCOztBQUFBO0FBSU84TSx1QkFKUDs7QUFBQSxrQkFNSyxDQUFDQSxXQUFELElBQWdCLENBQUNBLFdBQVcsQ0FBQ3pOLEdBTmxDO0FBQUE7QUFBQTtBQUFBOztBQU9XME4sc0JBUFgsR0FPd0JyRyxRQUFRLENBQUNlLGNBQVQsQ0FBd0IsZUFBeEIsQ0FQeEI7QUFRV3VGLHNCQVJYLEdBUXdCdEcsUUFBUSxDQUFDZSxjQUFULENBQXdCLGVBQXhCLENBUnhCO0FBU1d3RixzQkFUWCxHQVN3QnZHLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixlQUF4QixDQVR4QjtBQVdLc0Ysc0JBQVUsQ0FBQ0csS0FBWCxHQUFtQjdOLEdBQUcsQ0FBQzJDLEtBQUosQ0FBVSxDQUFWLEVBQWEsQ0FBYixDQUFuQjtBQUNBZ0wsc0JBQVUsQ0FBQ0UsS0FBWCxHQUFtQjdOLEdBQUcsQ0FBQzJDLEtBQUosQ0FBVSxDQUFWLEVBQWEsRUFBYixDQUFuQjtBQUNBaUwsc0JBQVUsQ0FBQ0MsS0FBWCxHQUFtQjdOLEdBQUcsQ0FBQzJDLEtBQUosQ0FBVSxFQUFWLEVBQWMsRUFBZCxDQUFuQjtBQWJMO0FBQUEsbUJBY3dCbUwsYUFBYSxDQUFDOU4sR0FBRCxFQUFNbUgsR0FBTixFQUFXZSxFQUFYLENBZHJDOztBQUFBO0FBY1czQyxnQkFkWDs7QUFnQkssZ0JBQUlBLElBQUksSUFBSUEsSUFBSSxDQUFDdkYsR0FBakIsRUFBc0I7QUFDWitOLDRCQURZLEdBQ0sxRyxRQUFRLENBQUNlLGNBQVQsQ0FBd0IsU0FBeEIsQ0FETDtBQUVaNEYsc0JBRlksR0FFRDNHLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixXQUF4QixDQUZDO0FBR1o2RiwwQkFIWSxHQUdHNUcsUUFBUSxDQUFDZSxjQUFULENBQXdCLGdCQUF4QixDQUhIO0FBS2xCZixzQkFBUSxDQUFDZSxjQUFULENBQXdCLGNBQXhCLEVBQXdDMkIsS0FBeEMsQ0FBOENDLE9BQTlDLEdBQXdELE1BQXhEO0FBQ0EzQyxzQkFBUSxDQUFDZSxjQUFULENBQXdCLGdCQUF4QixFQUEwQzJCLEtBQTFDLENBQWdEQyxPQUFoRCxHQUEwRCxFQUExRDtBQUNBaUUsMEJBQVksQ0FBQ2xFLEtBQWIsQ0FBbUJDLE9BQW5CLEdBQTZCLEVBQTdCO0FBQ0FnRSxzQkFBUSxDQUFDakUsS0FBVCxDQUFlQyxPQUFmLEdBQXlCLEVBQXpCO0FBQ0FnRSxzQkFBUSxDQUFDL0QsU0FBVCw0Q0FBdUQxRSxJQUFJLENBQUN2RixHQUE1RDtBQUNBZ08sc0JBQVEsQ0FBQ0UsSUFBVCw0Q0FBa0QzSSxJQUFJLENBQUN2RixHQUF2RDtBQUNBK04sNEJBQWMsQ0FBQzlELFNBQWYsYUFBOEIxRSxJQUFJLENBQUN2RixHQUFMLENBQVMyQyxLQUFULENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUE5QixjQUFzRDRDLElBQUksQ0FBQ3ZGLEdBQUwsQ0FBUzJDLEtBQVQsQ0FBZSxDQUFmLEVBQWtCLEVBQWxCLENBQXRELGNBQStFNEMsSUFBSSxDQUFDdkYsR0FBTCxDQUFTMkMsS0FBVCxDQUFlLEVBQWYsQ0FBL0U7QUFDQW9MLDRCQUFjLENBQUNoRSxLQUFmLENBQXFCb0UsS0FBckIsR0FBNkIsU0FBN0I7QUFDSDs7QUE3Qk47QUFBQTs7QUFBQTtBQStCTSxnQkFBSTVCLFNBQVMsQ0FBQ2tCLFdBQVcsQ0FBQ3pOLEdBQWIsQ0FBVCxLQUErQnVNLFNBQVMsQ0FBQ3ZNLEdBQUQsQ0FBNUMsRUFBbUQ7QUFDOUNvTywwQkFEOEMsR0FDL0IvRyxRQUFRLENBQUNlLGNBQVQsQ0FBd0IsbUJBQXhCLENBRCtCO0FBRTlDaUcsNkJBRjhDLEdBRTVCaEgsUUFBUSxDQUFDZSxjQUFULENBQXdCLG1CQUF4QixDQUY0QjtBQUc5Q2tHLHlCQUg4QyxHQUdoQ2pILFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixlQUF4QixDQUhnQztBQUtwRGdHLDBCQUFZLENBQUNyRSxLQUFiLENBQW1CQyxPQUFuQixHQUE2QixNQUE3QjtBQUNBcUUsNkJBQWUsQ0FBQ3BFLFNBQWhCLEdBQTRCc0MsU0FBUyxDQUFDa0IsV0FBVyxDQUFDek4sR0FBYixDQUFyQztBQUNBc08seUJBQVcsQ0FBQ3JFLFNBQVosR0FBd0JzQyxTQUFTLENBQUN2TSxHQUFELENBQWpDO0FBQ0g7O0FBdkNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0EyQ1E4TixhOzs7OzsyRUFBZixrQkFBOEI5TixHQUE5QixFQUFtQ21ILEdBQW5DLEVBQXdDZSxFQUF4QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDWWhILGdCQURaLEdBQ3FCaUcsR0FEckIsQ0FDWWpHLElBRFo7QUFFVXFOLHFCQUZWLEdBRXNCbEgsUUFBUSxDQUFDZSxjQUFULENBQXdCLFlBQXhCLENBRnRCO0FBR1VvRyx3QkFIVixHQUd5Qm5ILFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixlQUF4QixDQUh6QjtBQUlVNUgsc0JBSlYsR0FJdUI2RyxRQUFRLENBQUNlLGNBQVQsQ0FBd0IsaUJBQXhCLENBSnZCO0FBS1VxRyxzQkFMVixHQUt1QnBILFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixhQUF4QixDQUx2QjtBQU1JbUcscUJBQVMsQ0FBQ3hFLEtBQVYsQ0FBZ0JDLE9BQWhCLEdBQTBCLE1BQTFCO0FBQ0F3RSx3QkFBWSxDQUFDekUsS0FBYixDQUFtQkMsT0FBbkIsR0FBNkIsT0FBN0I7QUFDQXhKLHNCQUFVLENBQUNrTyxRQUFYLEdBQXNCLElBQXRCO0FBQ0FELHNCQUFVLENBQUNDLFFBQVgsR0FBc0IsSUFBdEI7QUFUSjtBQUFBLG1CQVc2QnhOLElBQUksQ0FBQ1AsSUFBTCxDQUFVWCxHQUFWLENBWDdCOztBQUFBO0FBV1UyTyxzQkFYVjtBQVlJbk8sc0JBQVUsQ0FBQ2tPLFFBQVgsR0FBc0IsS0FBdEI7QUFDQUQsc0JBQVUsQ0FBQ0MsUUFBWCxHQUFzQixLQUF0QjtBQUNBRix3QkFBWSxDQUFDekUsS0FBYixDQUFtQkMsT0FBbkIsR0FBNkIsTUFBN0I7O0FBZEosa0JBZVEyRSxVQWZSLGFBZVFBLFVBZlIsZUFlUUEsVUFBVSxDQUFFdFAsS0FmcEI7QUFBQTtBQUFBO0FBQUE7O0FBZ0Jja0csZ0JBaEJkLEdBZ0JxQm9KLFVBQVUsQ0FBQ3BQLE9BaEJoQztBQUFBO0FBQUEsbUJBaUJjMkksRUFBRSxDQUFDM0MsSUFBSCxDQUFRcUIsR0FBUixDQUFZO0FBQUU1RyxpQkFBRyxFQUFFdUYsSUFBSSxDQUFDdkY7QUFBWixhQUFaLENBakJkOztBQUFBO0FBQUE7QUFBQSxtQkFrQmNrSSxFQUFFLENBQUMzQyxJQUFILENBQVF5QixRQUFSLENBQWlCekIsSUFBakIsQ0FsQmQ7O0FBQUE7QUFBQSw4Q0FvQmVBLElBcEJmOztBQUFBO0FBdUJRZ0oscUJBQVMsQ0FBQ3hFLEtBQVYsQ0FBZ0JDLE9BQWhCLEdBQTBCLE1BQTFCOztBQXZCUjtBQXlCVW9FLHdCQXpCVixHQXlCeUIvRyxRQUFRLENBQUNlLGNBQVQsQ0FBd0IsbUJBQXhCLENBekJ6Qjs7QUEyQkksZ0JBQUlnRyxZQUFKLEVBQWtCO0FBQ2RBLDBCQUFZLENBQUNyRSxLQUFiLENBQW1CQyxPQUFuQixHQUE2QixNQUE3QjtBQUNIOztBQTdCTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBZ0NPLFNBQWU0RSxtQkFBdEI7QUFBQTtBQUFBOzs7aUZBQU8sa0JBQW9DMUcsRUFBcEMsRUFBd0NmLEdBQXhDO0FBQUEsMktBZ0RNMEgsZUFoRE47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWdETUEsMkJBaEROLDZCQWdEdUJ0SixJQWhEdkIsRUFnRDZCO0FBQzVCdUosNEJBQWMsQ0FBQy9FLEtBQWYsQ0FBcUJDLE9BQXJCLEdBQStCekUsSUFBSSxHQUFHLE1BQUgsR0FBWSxFQUEvQztBQUNBd0osMkJBQWEsQ0FBQ2hGLEtBQWQsQ0FBb0JDLE9BQXBCLEdBQThCekUsSUFBSSxHQUFHLEVBQUgsR0FBUSxNQUExQzs7QUFDQSxrQkFBSTBJLFlBQUosRUFBa0I7QUFDZEEsNEJBQVksQ0FBQ2xFLEtBQWIsQ0FBbUJDLE9BQW5CLEdBQTZCekUsSUFBSSxHQUFHLEVBQUgsR0FBUSxNQUF6QztBQUNBeUksd0JBQVEsQ0FBQ2pFLEtBQVQsQ0FBZUMsT0FBZixHQUF5QnpFLElBQUksR0FBRyxFQUFILEdBQVEsTUFBckM7QUFDQXlJLHdCQUFRLENBQUMvRCxTQUFULEdBQXFCMUUsSUFBSSw0Q0FBcUNBLElBQUksQ0FBQ3ZGLEdBQTFDLElBQWtELEVBQTNFO0FBQ0FnTyx3QkFBUSxDQUFDRSxJQUFULEdBQWdCM0ksSUFBSSw0Q0FBcUNBLElBQUksQ0FBQ3ZGLEdBQTFDLElBQWtELEVBQXRFO0FBQ0g7O0FBQ0QrTiw0QkFBYyxDQUFDOUQsU0FBZixHQUEyQjFFLElBQUksR0FBR2dILFNBQVMsQ0FBQ2hILElBQUksQ0FBQ3ZGLEdBQU4sQ0FBWixHQUF5QixVQUF4RDtBQUNBK04sNEJBQWMsQ0FBQ2hFLEtBQWYsQ0FBcUJvRSxLQUFyQixHQUE2QjVJLElBQUksR0FBRyxTQUFILEdBQWUsU0FBaEQ7QUFDSCxhQTNERTs7QUFDS3JFLGdCQURMLEdBQ2NpRyxHQURkLENBQ0tqRyxJQURMO0FBR0dWLHNCQUhILEdBR2dCNkcsUUFBUSxDQUFDZSxjQUFULENBQXdCLGlCQUF4QixDQUhoQjtBQUlHOUgsc0JBSkgsR0FJZ0IrRyxRQUFRLENBQUNlLGNBQVQsQ0FBd0IsZ0JBQXhCLENBSmhCO0FBS0cyRiwwQkFMSCxHQUtvQjFHLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixTQUF4QixDQUxwQjtBQU1HNEYsb0JBTkgsR0FNYzNHLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixXQUF4QixDQU5kO0FBT0c2Rix3QkFQSCxHQU9rQjVHLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixnQkFBeEIsQ0FQbEI7QUFRRzBHLDBCQVJILEdBUW9CekgsUUFBUSxDQUFDZSxjQUFULENBQXdCLGNBQXhCLENBUnBCO0FBU0cyRyx5QkFUSCxHQVNtQjFILFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixnQkFBeEIsQ0FUbkI7QUFVRzRHLHdCQVZILEdBVWtCM0gsUUFBUSxDQUFDZSxjQUFULENBQXdCLGVBQXhCLENBVmxCO0FBV0dxRyxzQkFYSCxHQVdnQnBILFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixhQUF4QixDQVhoQjtBQVlHc0Ysc0JBWkgsR0FZZ0JyRyxRQUFRLENBQUNlLGNBQVQsQ0FBd0IsZUFBeEIsQ0FaaEI7QUFhR3VGLHNCQWJILEdBYWdCdEcsUUFBUSxDQUFDZSxjQUFULENBQXdCLGVBQXhCLENBYmhCO0FBY0d3RixzQkFkSCxHQWNnQnZHLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixlQUF4QixDQWRoQjtBQWdCSHNGLHNCQUFVLENBQUNwRixnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxZQUFNO0FBQ3ZDLGtCQUFNMkcsTUFBTSxHQUFHdkIsVUFBVSxDQUFDRyxLQUFYLENBQWlCWCxVQUFqQixDQUE0QixTQUE1QixFQUF1QyxFQUF2QyxFQUEyQ3ZLLEtBQTNDLENBQWlELENBQWpELEVBQW9ELEVBQXBELENBQWY7QUFDQStLLHdCQUFVLENBQUNHLEtBQVgsR0FBbUJvQixNQUFNLENBQUN0TSxLQUFQLENBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFuQjs7QUFDQSxrQkFBSXNNLE1BQU0sQ0FBQ3hNLE1BQVAsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJrTCwwQkFBVSxDQUFDRSxLQUFYLEdBQW1Cb0IsTUFBTSxDQUFDdE0sS0FBUCxDQUFhLENBQWIsRUFBZ0IsRUFBaEIsQ0FBbkI7QUFDSDs7QUFDRCxrQkFBSXNNLE1BQU0sQ0FBQ3hNLE1BQVAsR0FBZ0IsRUFBcEIsRUFBd0I7QUFDcEJtTCwwQkFBVSxDQUFDQyxLQUFYLEdBQW1Cb0IsTUFBTSxDQUFDdE0sS0FBUCxDQUFhLEVBQWIsQ0FBbkI7QUFDQWlMLDBCQUFVLENBQUNzQixLQUFYO0FBQ0F0QiwwQkFBVSxDQUFDdUIsaUJBQVgsQ0FBNkJGLE1BQU0sQ0FBQ3hNLE1BQVAsR0FBZ0IsRUFBN0MsRUFBaUR3TSxNQUFNLENBQUN4TSxNQUFQLEdBQWdCLEVBQWpFO0FBQ0gsZUFKRCxNQUtLLElBQUl3TSxNQUFNLENBQUN4TSxNQUFQLElBQWlCLENBQXJCLEVBQXdCO0FBQ3pCa0wsMEJBQVUsQ0FBQ3VCLEtBQVg7QUFDQXZCLDBCQUFVLENBQUN3QixpQkFBWCxDQUE2QkYsTUFBTSxDQUFDeE0sTUFBUCxHQUFnQixDQUE3QyxFQUFnRHdNLE1BQU0sQ0FBQ3hNLE1BQVAsR0FBZ0IsQ0FBaEU7QUFDSDtBQUNKLGFBZkQ7QUFnQkFrTCxzQkFBVSxDQUFDckYsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsWUFBTTtBQUN2QyxrQkFBTTJHLE1BQU0sR0FBR3RCLFVBQVUsQ0FBQ0UsS0FBWCxDQUFpQlgsVUFBakIsQ0FBNEIsU0FBNUIsRUFBdUMsRUFBdkMsRUFBMkN2SyxLQUEzQyxDQUFpRCxDQUFqRCxFQUFvRCxFQUFwRCxDQUFmO0FBQ0FnTCx3QkFBVSxDQUFDRSxLQUFYLEdBQW1Cb0IsTUFBTSxDQUFDdE0sS0FBUCxDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsQ0FBbkI7O0FBQ0Esa0JBQUlzTSxNQUFNLENBQUN4TSxNQUFQLElBQWlCLENBQXJCLEVBQXdCO0FBQ3BCbUwsMEJBQVUsQ0FBQ0MsS0FBWCxHQUFtQm9CLE1BQU0sQ0FBQ3RNLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLEVBQWhCLENBQW5CO0FBQ0FpTCwwQkFBVSxDQUFDc0IsS0FBWDtBQUNBdEIsMEJBQVUsQ0FBQ3VCLGlCQUFYLENBQTZCRixNQUFNLENBQUN4TSxNQUFQLEdBQWdCLENBQTdDLEVBQWdEd00sTUFBTSxDQUFDeE0sTUFBUCxHQUFnQixDQUFoRTtBQUNIO0FBQ0osYUFSRDtBQVNBbUwsc0JBQVUsQ0FBQ3RGLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLFlBQU07QUFDdkMsa0JBQU0yRyxNQUFNLEdBQUdyQixVQUFVLENBQUNDLEtBQVgsQ0FBaUJYLFVBQWpCLENBQTRCLFNBQTVCLEVBQXVDLEVBQXZDLEVBQTJDdkssS0FBM0MsQ0FBaUQsQ0FBakQsRUFBb0QsQ0FBcEQsQ0FBZjs7QUFDQSxrQkFBSWlMLFVBQVUsQ0FBQ0MsS0FBWCxLQUFxQm9CLE1BQU0sQ0FBQ3RNLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQWhCLENBQXpCLEVBQTZDO0FBQ3pDaUwsMEJBQVUsQ0FBQ0MsS0FBWCxHQUFtQm9CLE1BQU0sQ0FBQ3RNLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQWhCLENBQW5CO0FBQ0g7QUFDSixhQUxEO0FBekNHO0FBQUEsbUJBNkRnQnVGLEVBQUUsQ0FBQzNDLElBQUgsQ0FBUTVFLElBQVIsRUE3RGhCOztBQUFBO0FBNkRHNEUsZ0JBN0RIO0FBOERIc0osMkJBQWUsQ0FBQ3RKLElBQUQsQ0FBZjs7QUFFQSxnQkFBSWpGLFVBQUosRUFBZ0I7QUFDWkEsd0JBQVUsQ0FBQ2dJLGdCQUFYLENBQTRCLE9BQTVCLHVFQUFxQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDM0J0SSwyQkFEMkIsR0FDckJtSyxZQUFZLEVBRFM7QUFHakN1RCxrQ0FBVSxDQUFDRyxLQUFYLEdBQW1CN04sR0FBRyxDQUFDMkMsS0FBSixDQUFVLENBQVYsRUFBYSxDQUFiLENBQW5CO0FBQ0FnTCxrQ0FBVSxDQUFDRSxLQUFYLEdBQW1CN04sR0FBRyxDQUFDMkMsS0FBSixDQUFVLENBQVYsRUFBYSxFQUFiLENBQW5CO0FBQ0FpTCxrQ0FBVSxDQUFDQyxLQUFYLEdBQW1CN04sR0FBRyxDQUFDMkMsS0FBSixDQUFVLEVBQVYsRUFBYyxFQUFkLENBQW5CO0FBTGlDO0FBQUEsK0JBTTNCdUYsRUFBRSxDQUFDM0MsSUFBSCxDQUFRcUIsR0FBUixDQUFZLElBQVosQ0FOMkI7O0FBQUE7QUFPakNTLGdDQUFRLENBQUNlLGNBQVQsQ0FBd0IsbUJBQXhCLEVBQTZDMkIsS0FBN0MsQ0FBbURDLE9BQW5ELEdBQTZELE1BQTdEO0FBQ0E2RSx1Q0FBZTtBQVJrQjtBQUFBLCtCQVNaZixhQUFhLENBQUM5TixHQUFELEVBQU1tSCxHQUFOLEVBQVdlLEVBQVgsQ0FURDs7QUFBQTtBQVMzQnhELDhCQVQyQjs7QUFVakMsNEJBQUlBLE1BQUosRUFBWTtBQUNSbUsseUNBQWUsQ0FBQ25LLE1BQUQsQ0FBZjtBQUNBZ0osb0NBQVUsQ0FBQ0csS0FBWCxHQUFtQixFQUFuQjtBQUNBRixvQ0FBVSxDQUFDRSxLQUFYLEdBQW1CLEVBQW5CO0FBQ0FELG9DQUFVLENBQUNDLEtBQVgsR0FBbUIsRUFBbkI7QUFDSDs7QUFmZ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBckM7QUFpQkg7O0FBRURyTixzQkFBVSxDQUFDOEgsZ0JBQVgsQ0FBNEIsT0FBNUIsdUVBQXFDO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDM0I4RixrQ0FEMkIsR0FDWi9HLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixZQUF4QixDQURZOztBQUdqQywwQkFBSWdHLFlBQUosRUFBa0I7QUFDZEEsb0NBQVksQ0FBQ3JFLEtBQWIsQ0FBbUJDLE9BQW5CLEdBQTZCLE1BQTdCO0FBQ0g7O0FBTGdDO0FBQUEsNkJBTWQ5QixFQUFFLENBQUMzQyxJQUFILENBQVE1RSxJQUFSLEVBTmM7O0FBQUE7QUFNM0I0RSwwQkFOMkI7O0FBQUEsMEJBTzVCQSxJQVA0QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDZCQVFOMkMsRUFBRSxDQUFDM0MsSUFBSCxDQUFRb0IsS0FBUixFQVJNOztBQUFBO0FBUXZCeUksOEJBUnVCO0FBQUE7QUFBQSw2QkFTRGxPLElBQUksQ0FBQ0wsTUFBTCxDQUFZdU8sUUFBWixDQVRDOztBQUFBO0FBU3ZCQyxtQ0FUdUI7O0FBQUEsNEJBVXpCQSxhQVZ5QixhQVV6QkEsYUFWeUIsZUFVekJBLGFBQWEsQ0FBRWhRLEtBVlU7QUFBQTtBQUFBO0FBQUE7O0FBV25Ca0csMkJBWG1CLEdBV1o4SixhQUFhLENBQUM5UCxPQVhGO0FBQUE7QUFBQSw2QkFZbkIySSxFQUFFLENBQUMzQyxJQUFILENBQVFxQixHQUFSLENBQVk7QUFBRTVHLDJCQUFHLEVBQUV1RixLQUFJLENBQUN2RjtBQUFaLHVCQUFaLENBWm1COztBQUFBO0FBYXpCNk8scUNBQWUsQ0FBQ3RKLEtBQUQsQ0FBZjs7QUFieUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBckM7QUFpQkF5Six3QkFBWSxDQUFDMUcsZ0JBQWIsQ0FBOEIsT0FBOUIsdUVBQXVDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQ2hCSixFQUFFLENBQUMzQyxJQUFILENBQVE1RSxJQUFSLEVBRGdCOztBQUFBO0FBQzdCNEUsMEJBRDZCOztBQUFBLDJCQUUvQkEsSUFGK0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSw2QkFHekIyQyxFQUFFLENBQUMzQyxJQUFILENBQVFxQixHQUFSLENBQVksSUFBWixDQUh5Qjs7QUFBQTtBQUkvQmlJLHFDQUFlLENBQUNTLFNBQUQsQ0FBZjs7QUFKK0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBdkM7QUFPQWIsc0JBQVUsQ0FBQ25HLGdCQUFYLENBQTRCLE9BQTVCLHVFQUFxQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUNkSixFQUFFLENBQUMzQyxJQUFILENBQVE1RSxJQUFSLEVBRGM7O0FBQUE7QUFDM0I0RSwwQkFEMkI7O0FBQUEsMEJBRTVCQSxJQUY0QjtBQUFBO0FBQUE7QUFBQTs7QUFHdkJ2Rix5QkFIdUIsYUFHZDBOLFVBQVUsQ0FBQ0csS0FIRyxTQUdLRixVQUFVLENBQUNFLEtBSGhCLFNBR3dCRCxVQUFVLENBQUNDLEtBSG5DO0FBQUE7QUFBQSw2QkFJUkMsYUFBYSxDQUFDOU4sR0FBRCxFQUFNbUgsR0FBTixFQUFXZSxFQUFYLENBSkw7O0FBQUE7QUFJdkJ4RCw0QkFKdUI7O0FBSzdCLDBCQUFJQSxNQUFKLEVBQVk7QUFDUm1LLHVDQUFlLENBQUNuSyxNQUFELENBQWY7QUFDQWdKLGtDQUFVLENBQUNHLEtBQVgsR0FBbUIsRUFBbkI7QUFDQUYsa0NBQVUsQ0FBQ0UsS0FBWCxHQUFtQixFQUFuQjtBQUNBRCxrQ0FBVSxDQUFDQyxLQUFYLEdBQW1CLEVBQW5CO0FBQ0g7O0FBVjRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQXJDOztBQTVHRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSUEsU0FBUzBCLGNBQVQsQ0FBeUJySCxFQUF6QixFQUE2QjtBQUNoQyxNQUFNdkksT0FBTyxHQUFHMEgsUUFBUSxDQUFDZSxjQUFULENBQXdCLFNBQXhCLENBQWhCO0FBRUF6SSxTQUFPLENBQUMySSxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxVQUFDa0gsS0FBRCxFQUFXO0FBQ3pDLFFBQU1DLE9BQU8sR0FBR0QsS0FBSyxDQUFDL0csTUFBTixDQUFhZ0gsT0FBYixDQUFxQixxQkFBckIsQ0FBaEI7O0FBQ0EsUUFBSUEsT0FBTyxJQUFJQSxPQUFPLENBQUNoRixPQUFSLENBQWdCLElBQWhCLENBQVgsSUFBb0M5SyxPQUFPLENBQUMrUCxRQUFSLENBQWlCRCxPQUFqQixDQUF4QyxFQUFtRTtBQUMvRHZILFFBQUUsQ0FBQ3ZJLE9BQUgsQ0FBVytHLE1BQVgsQ0FBa0IrSSxPQUFPLENBQUNoRixPQUFSLENBQWdCLElBQWhCLENBQWxCO0FBQ0FnRixhQUFPLENBQUNFLFNBQVIsQ0FBa0JDLE1BQWxCLENBQXlCLFFBQXpCO0FBQ0g7QUFDSixHQU5EOztBQUhnQyxXQVdqQkMsYUFYaUI7QUFBQTtBQUFBOztBQUFBO0FBQUEsNkVBV2hDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ3VCM0gsRUFBRSxDQUFDdkksT0FBSCxDQUFXZ0IsSUFBWCxFQUR2Qjs7QUFBQTtBQUNVckIsa0JBRFY7QUFHSUsscUJBQU8sQ0FBQ29JLFNBQVIsR0FBb0J6SSxJQUFJLENBQ25CMEUsSUFEZSxDQUNWLFVBQUM4TCxPQUFELEVBQVVDLE9BQVY7QUFBQSx1QkFBc0IxTCxNQUFNLENBQUN5TCxPQUFPLENBQUNoSCxLQUFULENBQU4sQ0FBc0J4RSxhQUF0QixDQUFvQ3lMLE9BQXBDLGFBQW9DQSxPQUFwQyx1QkFBb0NBLE9BQU8sQ0FBRWpILEtBQTdDLENBQXRCO0FBQUEsZUFEVSxFQUVmL0MsR0FGZSxDQUVYLFVBQUN2SCxNQUFELEVBQVk7QUFDYixvQkFBSSxDQUFDQSxNQUFMLEVBQWE7QUFDVCx5QkFBTyxFQUFQO0FBQ0g7O0FBQ0Qsb0JBQU1pQixHQUFHLEdBQUc0RSxNQUFNLENBQUM3RixNQUFNLENBQUNpQixHQUFSLENBQU4sQ0FBbUJ1USxPQUFuQixDQUEyQixhQUEzQixFQUEwQyxFQUExQyxFQUE4Q0MsS0FBOUMsQ0FBb0QsR0FBcEQsRUFBeUQsQ0FBekQsRUFBNERBLEtBQTVELENBQWtFLEdBQWxFLEVBQXVFdE4sS0FBdkUsQ0FBNkUsQ0FBQyxDQUE5RSxFQUFpRm1GLElBQWpGLENBQXNGLEdBQXRGLENBQVo7QUFDQSwwSEFFc0N0SixNQUFNLENBQUNzSyxLQUY3QyxlQUV1RHJKLEdBRnZELG1FQUdrQ2pCLE1BQU0sQ0FBQ3NLLEtBSHpDLDRFQUlzQ3JKLEdBSnRDLHVIQU0rQ2pCLE1BQU0sQ0FBQzJFLEVBTnREO0FBU0gsZUFoQmUsRUFpQmYyRSxJQWpCZSxDQWlCVixJQWpCVSxDQUFwQjs7QUFISjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVhnQztBQUFBO0FBQUE7O0FBa0NoQyxTQUFPO0FBQ0hvSSxVQUFNLEVBQUU7QUFBQSxhQUFNTCxhQUFhLEVBQW5CO0FBQUE7QUFETCxHQUFQO0FBR0gsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0Q7QUFFTyxTQUFTTSxXQUFULENBQXNCakksRUFBdEIsRUFBMEI7QUFDN0IsTUFBTTdFLElBQUksR0FBR2dFLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixNQUF4QixDQUFiO0FBQ0EsTUFBTXlCLEtBQUssR0FBR3hDLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixPQUF4QixDQUFkOztBQUY2QixXQUlkNUUsSUFKYztBQUFBO0FBQUE7O0FBQUE7QUFBQSxvRUFJN0Isa0JBQXFCTCxFQUFyQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDdUMrRSxFQUFFLENBQUM3RSxJQUFILENBQVExQyxJQUFSLEVBRHZDOztBQUFBO0FBQUE7QUFDWTZELHFCQURaLHVCQUNZQSxPQURaO0FBQ3FCRCxxQkFEckIsdUJBQ3FCQSxPQURyQjs7QUFFSSxrQkFBSUMsT0FBTyxDQUFDL0IsTUFBUixJQUFrQixDQUFsQixLQUF3QixDQUFDK0IsT0FBTyxDQUFDLENBQUQsQ0FBUixJQUFlQSxPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdyQixFQUFYLEtBQWtCQSxFQUF6RCxDQUFKLEVBQWtFO0FBQ3hEaU4saUNBRHdELEdBQ3BDN0wsT0FBTyxDQUFDdEMsTUFBUixDQUFldUMsT0FBZixFQUNyQjFDLE1BRHFCLENBQ2QsVUFBQ3VPLEdBQUQsRUFBTTVRLEdBQU47QUFBQSx5QkFBY0EsR0FBRyxDQUFDb0UsT0FBSixHQUFjd00sR0FBZCxHQUFvQjVRLEdBQUcsQ0FBQ29FLE9BQXhCLEdBQWtDd00sR0FBaEQ7QUFBQSxpQkFEYyxFQUN1QyxDQUR2QyxDQURvQztBQUk5RG5JLGtCQUFFLENBQUM3RSxJQUFILENBQVF3RCxPQUFSLENBQWdCdUosaUJBQWlCLEdBQUcsQ0FBcEM7QUFDSCxlQUxELE1BTUs7QUFDRGxJLGtCQUFFLENBQUM3RSxJQUFILENBQVFHLElBQVIsQ0FBYUwsRUFBYjtBQUNIOztBQVZMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSjZCO0FBQUE7QUFBQTs7QUFpQjdCRSxNQUFJLENBQUNpRixnQkFBTCxDQUFzQixPQUF0QjtBQUFBLHVFQUErQixpQkFBT2tILEtBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3JCYyx5QkFEcUIsR0FDUGQsS0FBSyxDQUFDL0csTUFBTixDQUFhZ0gsT0FBYixDQUFxQixZQUFyQixDQURPOztBQUFBLG9CQUd2QmEsV0FBVyxJQUFJQSxXQUFXLENBQUM3RixPQUFaLENBQW9CLElBQXBCLENBQWYsSUFBNENwSCxJQUFJLENBQUNxTSxRQUFMLENBQWNZLFdBQWQsQ0FIckI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxxQkFJakI5TSxJQUFJLENBQUM4TSxXQUFXLENBQUM3RixPQUFaLENBQW9CLElBQXBCLENBQUQsQ0FKYTs7QUFBQTtBQU1yQjhGLHlCQU5xQixHQU1QZixLQUFLLENBQUMvRyxNQUFOLENBQWFnSCxPQUFiLENBQXFCLGdCQUFyQixDQU5POztBQUFBLG9CQU92QmMsV0FBVyxJQUFJQSxXQUFXLENBQUM5RixPQUFaLENBQW9CLElBQXBCLENBQWYsSUFBNENwSCxJQUFJLENBQUNxTSxRQUFMLENBQWNhLFdBQWQsQ0FQckI7QUFBQTtBQUFBO0FBQUE7O0FBUXZCZixtQkFBSyxDQUFDZ0IsY0FBTjtBQVJ1QjtBQUFBLHFCQVNqQmhOLElBQUksQ0FBQytNLFdBQVcsQ0FBQzlGLE9BQVosQ0FBb0IsSUFBcEIsQ0FBRCxDQVRhOztBQUFBO0FBVXZCNEMsb0JBQU0sQ0FBQ29ELElBQVAsQ0FBWUYsV0FBVyxDQUFDckMsSUFBeEIsRUFBOEIsUUFBOUI7O0FBVnVCO0FBWXJCd0MseUJBWnFCLEdBWVBsQixLQUFLLENBQUMvRyxNQUFOLENBQWFnSCxPQUFiLENBQXFCLG1CQUFyQixDQVpPOztBQUFBLG9CQWF2QmlCLFdBQVcsSUFBSXJOLElBQUksQ0FBQ3FNLFFBQUwsQ0FBY2dCLFdBQWQsQ0FiUTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQWNGeEksRUFBRSxDQUFDN0UsSUFBSCxDQUFRZ0MsU0FBUixFQWRFOztBQUFBO0FBY2pCRCxvQkFkaUI7QUFBQTtBQUFBLHFCQWVqQjhDLEVBQUUsQ0FBQzdFLElBQUgsQ0FBUThCLFNBQVIsQ0FBa0JDLE1BQU0sR0FBRyxHQUEzQixDQWZpQjs7QUFBQTtBQWlCckJ5QixxQkFqQnFCLEdBaUJYMkksS0FBSyxDQUFDL0csTUFBTixDQUFhZ0gsT0FBYixDQUFxQixXQUFyQixDQWpCVzs7QUFBQSxvQkFrQnZCNUksT0FBTyxJQUFJeEQsSUFBSSxDQUFDcU0sUUFBTCxDQUFjN0ksT0FBZCxDQWxCWTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQW1CakJxQixFQUFFLENBQUM3RSxJQUFILENBQVF3RCxPQUFSLENBQWdCN0IsSUFBSSxDQUFDZ0csR0FBTCxFQUFoQixDQW5CaUI7O0FBQUE7QUFxQnJCMkYsaUJBckJxQixHQXFCZm5CLEtBQUssQ0FBQy9HLE1BQU4sQ0FBYWdILE9BQWIsQ0FBcUIsTUFBckIsQ0FyQmU7O0FBc0IzQixrQkFBSWtCLEdBQUcsSUFBSXROLElBQUksQ0FBQ3FNLFFBQUwsQ0FBY2lCLEdBQWQsQ0FBWCxFQUErQjtBQUMzQnROLG9CQUFJLENBQUN1TixRQUFMLENBQWM7QUFBRUQscUJBQUcsRUFBRSxDQUFQO0FBQVVFLDBCQUFRLEVBQUU7QUFBcEIsaUJBQWQ7QUFDSDs7QUF4QjBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQS9COztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMkJBLE1BQUlDLFNBQVMsR0FBRyxDQUFoQjtBQUNBek4sTUFBSSxDQUFDaUYsZ0JBQUwsQ0FBc0IsUUFBdEIsdUVBQWdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUN0QnlJLHdCQURzQixHQUNQMU4sSUFBSSxDQUFDMk4sWUFBTCxHQUFvQjNOLElBQUksQ0FBQzROLFNBRGxCOztBQUFBLGtCQUV4QjVOLElBQUksQ0FBQzBOLFlBQUwsR0FBb0JBLFlBQXBCLElBQW9DLEVBQXBDLElBQTBDRCxTQUFTLEtBQUt6TixJQUFJLENBQUMwTixZQUZyQztBQUFBO0FBQUE7QUFBQTs7QUFHeEJELHFCQUFTLEdBQUd6TixJQUFJLENBQUMwTixZQUFqQjtBQUh3QjtBQUFBLG1CQUlIN0ksRUFBRSxDQUFDN0UsSUFBSCxDQUFRZ0MsU0FBUixFQUpHOztBQUFBO0FBSWxCRCxrQkFKa0I7QUFLeEI4QyxjQUFFLENBQUM3RSxJQUFILENBQVE4QixTQUFSLENBQWtCQyxNQUFNLEdBQUcsR0FBM0I7O0FBTHdCO0FBTzVCOEwsMEJBQWM7O0FBUGM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBaEM7O0FBVUEsV0FBU0EsY0FBVCxHQUEyQjtBQUN2QixRQUFJN04sSUFBSSxDQUFDNE4sU0FBTCxHQUFpQixDQUFqQixJQUFzQjVOLElBQUksQ0FBQzhOLHFCQUFMLEdBQTZCUixHQUE3QixLQUFxQ3ROLElBQUksQ0FBQ2lFLGFBQUwsQ0FBbUIsZUFBbkIsRUFBb0M2SixxQkFBcEMsR0FBNERSLEdBQTNILEVBQWdJO0FBQzVIdE4sVUFBSSxDQUFDaUUsYUFBTCxDQUFtQixvQkFBbkIsRUFBeUN5QyxLQUF6QyxDQUErQ0MsT0FBL0MsR0FBeUQsUUFBekQ7QUFDSCxLQUZELE1BR0s7QUFDRDNHLFVBQUksQ0FBQ2lFLGFBQUwsQ0FBbUIsb0JBQW5CLEVBQXlDeUMsS0FBekMsQ0FBK0NDLE9BQS9DLEdBQXlELE1BQXpEO0FBQ0g7QUFDSjs7QUFFRCxXQUFTb0gsaUJBQVQsQ0FBNEJDLEtBQTVCLEVBQW1DO0FBQy9CLFdBQU8sVUFBQ3pOLE9BQUQsRUFBYTtBQUNoQixVQUFNL0QsSUFBSSxHQUFHLElBQUltRixJQUFKLENBQVNwQixPQUFPLENBQUNDLE9BQWpCLENBQWI7QUFDQSxVQUFNeU4sVUFBVSxhQUFNQywyQ0FBRyxDQUFDMVIsSUFBSSxDQUFDMlIsUUFBTCxFQUFELENBQVQsY0FBOEJELDJDQUFHLENBQUMxUixJQUFJLENBQUM0UixVQUFMLEVBQUQsQ0FBakMsQ0FBaEI7QUFDQSxVQUFNQyxVQUFVLGFBQU1ILDJDQUFHLENBQUMxUixJQUFJLENBQUM4UixPQUFMLEVBQUQsQ0FBVCxjQUE2QkosMkNBQUcsQ0FBQzFSLElBQUksQ0FBQytSLFFBQUwsS0FBa0IsQ0FBbkIsQ0FBaEMsY0FBeUR2TixNQUFNLENBQUN4RSxJQUFJLENBQUNnUyxXQUFMLEVBQUQsQ0FBTixDQUEyQmxQLEtBQTNCLENBQWlDLENBQUMsQ0FBbEMsQ0FBekQsQ0FBaEI7QUFDQSxVQUFNbVAsUUFBUSxHQUFHalMsSUFBSSxDQUFDa1MsV0FBTCxHQUFtQjlCLEtBQW5CLENBQXlCLEdBQXpCLEVBQThCLENBQTlCLE1BQXFDLElBQUlqTCxJQUFKLEdBQVcrTSxXQUFYLEdBQXlCOUIsS0FBekIsQ0FBK0IsR0FBL0IsRUFBb0MsQ0FBcEMsQ0FBckMsR0FBOEVxQixVQUE5RSxHQUEyRkksVUFBNUc7QUFFQSx3REFDb0JMLEtBQUssR0FBRyxNQUFILEdBQVksTUFEckMsK0RBRWdDek4sT0FBTyxDQUFDbkUsR0FGeEMsNkRBRXdGbUUsT0FBTyxDQUFDVCxFQUZoRywwQ0FHY1MsT0FBTyxDQUFDa0YsS0FIdEIsd0JBR3lDbEYsT0FBTyxDQUFDQSxPQUhqRCxvSkFNMkM4TixVQU4zQyxjQU15REosVUFOekQsaUJBTTBFUSxRQU4xRSw2RUFPMENsTyxPQUFPLENBQUNULEVBUGxEO0FBVUgsS0FoQkQ7QUFpQkg7O0FBbEY0QixXQW9GZDZPLFVBcEZjO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDBFQW9GN0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ3lCOUosRUFBRSxDQUFDN0UsSUFBSCxDQUFRZ0MsU0FBUixFQUR6Qjs7QUFBQTtBQUNVRCxvQkFEVjtBQUFBO0FBQUEscUJBRTBCOEMsRUFBRSxDQUFDdkksT0FBSCxDQUFXZ0IsSUFBWCxFQUYxQjs7QUFBQTtBQUVVaEIscUJBRlY7QUFBQTtBQUFBLHFCQUd1Q3VJLEVBQUUsQ0FBQzdFLElBQUgsQ0FBUTFDLElBQVIsRUFIdkM7O0FBQUE7QUFBQTtBQUdZNkQscUJBSFosd0JBR1lBLE9BSFo7QUFHcUJELHFCQUhyQix3QkFHcUJBLE9BSHJCO0FBSVUwTixxQkFKVixHQUlvQnpOLE9BQU8sQ0FBQ3VCLEdBQVIsQ0FBWXFMLGlCQUFpQixDQUFDLEtBQUQsQ0FBN0IsQ0FKcEI7QUFLVWMscUJBTFYsR0FLb0IzTixPQUFPLENBQUN3QixHQUFSLENBQVlxTCxpQkFBaUIsQ0FBQyxJQUFELENBQTdCLENBTHBCOztBQU9JLGtCQUFJLENBQUN6UixPQUFPLENBQUM4QyxNQUFiLEVBQXFCO0FBQ2pCWSxvQkFBSSxDQUFDMEUsU0FBTCxHQUFpQixFQUFqQjtBQUNBOEIscUJBQUssQ0FBQ0UsS0FBTixDQUFZQyxPQUFaLEdBQXNCLE1BQXRCO0FBQ0gsZUFIRCxNQUlLLElBQUlpSSxPQUFPLENBQUN4UCxNQUFSLElBQWtCeVAsT0FBTyxDQUFDelAsTUFBOUIsRUFBc0M7QUFDdkNvSCxxQkFBSyxDQUFDRSxLQUFOLENBQVlDLE9BQVosR0FBc0IsTUFBdEI7QUFDQTNHLG9CQUFJLENBQUMwRSxTQUFMLEdBQWlCLEdBQ1o5RixNQURZLENBQ0xnUSxPQUFPLENBQUN4UCxNQUFSLEdBQWlCLDBGQUFqQixHQUE4RyxFQUR6RyxFQUVaUixNQUZZLENBRUxnUSxPQUZLLEVBR1poUSxNQUhZLENBR0wsd0ZBSEssRUFJWkEsTUFKWSxDQUlMaVEsT0FBTyxDQUFDdlAsS0FBUixDQUFjLENBQWQsRUFBaUJ5QyxNQUFqQixDQUpLLEVBS1puRCxNQUxZLENBS0xpUSxPQUFPLENBQUN6UCxNQUFSLElBQWtCMkMsTUFBbEIsR0FBMkIsQ0FBQyx1RUFBRCxDQUEzQixHQUF1RyxFQUxsRyxFQU1aMEMsSUFOWSxDQU1QLElBTk8sQ0FBakI7QUFPQVQsd0JBQVEsQ0FBQ3lCLEtBQVQsR0FBaUJtSixPQUFPLENBQUN4UCxNQUFSLGNBQXFCd1AsT0FBTyxDQUFDeFAsTUFBN0Isb0JBQW9ELFlBQXJFO0FBQ0F5Tyw4QkFBYztBQUNqQixlQVhJLE1BWUE7QUFDRHJILHFCQUFLLENBQUNFLEtBQU4sQ0FBWUMsT0FBWixHQUFzQixNQUF0QjtBQUNBM0csb0JBQUksQ0FBQzBFLFNBQUwsR0FBaUIsNkNBQWpCO0FBQ0FWLHdCQUFRLENBQUN5QixLQUFULEdBQWlCLFlBQWpCO0FBQ0g7O0FBM0JMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBcEY2QjtBQUFBO0FBQUE7O0FBa0g3QixTQUFPO0FBQ0hvSCxVQUFNLEVBQUU7QUFBQSxhQUFNOEIsVUFBVSxFQUFoQjtBQUFBO0FBREwsR0FBUDtBQUdILEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SE0sU0FBU25RLEtBQVQsQ0FBZ0JzUSxNQUFoQixFQUF3QkMsUUFBeEIsRUFBa0M7QUFDckMsTUFBSTtBQUNBLFdBQU94VCxJQUFJLENBQUNpRCxLQUFMLENBQVdzUSxNQUFYLENBQVA7QUFDSCxHQUZELENBR0EsT0FBTzVKLENBQVAsRUFBVTtBQUNOLFdBQU82SixRQUFQO0FBQ0g7QUFDSjtBQUVNLFNBQVNiLEdBQVQsQ0FBY2MsRUFBZCxFQUFrQjtBQUNyQixTQUFPLENBQUMsT0FBT0EsRUFBUixFQUFZMVAsS0FBWixDQUFrQixDQUFDLENBQW5CLENBQVA7QUFDSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWEQ7QUFDQTtBQUNBO0FBRUEsSUFBSTJQLGFBQWEsR0FBRyxJQUFwQjtBQUVBLElBQU1DLFFBQVEsR0FBR2xMLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixVQUF4QixDQUFqQjtBQUNBLElBQU1vSyxhQUFhLEdBQUduTCxRQUFRLENBQUNlLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQXRCO0FBQ0EsSUFBTXFLLGFBQWEsR0FBR3BMLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixnQkFBeEIsQ0FBdEI7O1dBRW1CL0osZ0RBQUcsQ0FBQ3FVLG1EQUFELEM7SUFBZDlSLE0sUUFBQUEsTTs7QUFFUjRSLGFBQWEsQ0FBQ2xLLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLFlBQU07QUFDMUNpSyxVQUFRLENBQUN4SSxLQUFULENBQWVDLE9BQWYsR0FBeUIsTUFBekI7QUFDQXlJLGVBQWEsQ0FBQ3hJLFNBQWQsR0FBMEIsRUFBMUI7QUFDQXJKLFFBQU0sQ0FBQ0MsTUFBUCxDQUFjeVIsYUFBZCxFQUNLdFQsSUFETCxDQUNVLFVBQUNSLE1BQUQ7QUFBQSxXQUFZQSxNQUFNLElBQUkwSixvREFBQSxDQUFlMUosTUFBZixDQUF0QjtBQUFBLEdBRFY7QUFFQThULGVBQWEsR0FBRyxJQUFoQjtBQUNILENBTkQ7QUFRQUssTUFBTSxDQUFDQyxPQUFQLENBQWVDLFNBQWYsQ0FBeUI5TCxXQUF6QjtBQUFBLHFFQUFxQyxpQkFBTytMLE9BQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQzdCQSxPQUFPLENBQUMzUCxFQUFSLElBQWMyUCxPQUFPLENBQUNoSyxLQUF0QixJQUErQmdLLE9BQU8sQ0FBQ3JULEdBRFY7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtQkFFUHlJLHFEQUFBLEVBRk87O0FBQUE7QUFFdkJ2SSxtQkFGdUI7O0FBQUEsZ0JBSXhCQSxPQUFPLENBQUNrRCxJQUFSLENBQWEsVUFBQ3JFLE1BQUQ7QUFBQSxxQkFBWUEsTUFBTSxDQUFDaUIsR0FBUCxLQUFlcVQsT0FBTyxDQUFDclQsR0FBdkIsSUFBOEI0RSxNQUFNLENBQUM3RixNQUFNLENBQUNzRSxPQUFSLENBQU4sS0FBMkJ1QixNQUFNLENBQUN5TyxPQUFPLENBQUMzUCxFQUFULENBQTNFO0FBQUEsYUFBYixDQUp3QjtBQUFBO0FBQUE7QUFBQTs7QUFLekJvUCxvQkFBUSxDQUFDeEksS0FBVCxDQUFlQyxPQUFmLEdBQXlCLE1BQXpCO0FBQ0F5SSx5QkFBYSxDQUFDeEksU0FBZCw2Q0FBNEQ2SSxPQUFPLENBQUNoSyxLQUFwRTtBQUNBd0oseUJBQWEsR0FBRztBQUNacEosa0JBQUksRUFBRTRKLE9BQU8sQ0FBQzVKLElBREY7QUFFWnBHLHFCQUFPLEVBQUVnUSxPQUFPLENBQUMzUCxFQUZMO0FBR1oyRixtQkFBSyxFQUFFZ0ssT0FBTyxDQUFDaEssS0FISDtBQUlackosaUJBQUcsRUFBRXFULE9BQU8sQ0FBQ3JUO0FBSkQsYUFBaEI7QUFQeUI7O0FBQUE7QUFpQmpDOFMsb0JBQVEsQ0FBQ3hJLEtBQVQsQ0FBZUMsT0FBZixHQUF5QixNQUF6QjtBQUNBeUkseUJBQWEsQ0FBQ3hJLFNBQWQsR0FBMEIsRUFBMUI7QUFDQXFJLHlCQUFhLEdBQUcsSUFBaEI7O0FBbkJpQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFyQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXNCTyxTQUFTUyxZQUFULEdBQXlCO0FBQzVCSixRQUFNLENBQUNLLElBQVAsQ0FBWUMsS0FBWixDQUNJO0FBQUVDLFVBQU0sRUFBRSxJQUFWO0FBQWdCQyxZQUFRLEVBQUVSLE1BQU0sQ0FBQ1MsT0FBUCxDQUFlQztBQUF6QyxHQURKLEVBRUksVUFBQ0wsSUFBRCxFQUFVO0FBQ04sUUFBSSxDQUFDQSxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVF2VCxHQUFSLENBQVlvTixRQUFaLENBQXFCLFdBQXJCLENBQUwsRUFBd0M7QUFDcEM4RixZQUFNLENBQUNXLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCO0FBQUU5SyxjQUFNLEVBQUU7QUFBRStLLGVBQUssRUFBRVIsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRN1A7QUFBakIsU0FBVjtBQUFpQ3NRLGdCQUFRLEVBQUVDO0FBQTNDLE9BQS9CO0FBQ0g7QUFDSixHQU5MO0FBUUg7O0FBRUQsU0FBU0EsSUFBVCxHQUFpQjtBQUNiLFdBQVNDLGtCQUFULENBQTZCQyxHQUE3QixFQUFrQztBQUM5QixRQUFJQSxHQUFHLElBQUksT0FBT0EsR0FBUCxLQUFlLFFBQTFCLEVBQW9DO0FBQ2hDLFVBQU1DLE9BQU8sR0FBR3hNLFFBQVEsQ0FBQ3lNLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQUYsU0FBRyxHQUFHQSxHQUFHLENBQUM1RCxPQUFKLENBQVksc0NBQVosRUFBb0QsRUFBcEQsQ0FBTjtBQUNBNEQsU0FBRyxHQUFHQSxHQUFHLENBQUM1RCxPQUFKLENBQVksdUNBQVosRUFBcUQsRUFBckQsQ0FBTjtBQUNBNkQsYUFBTyxDQUFDOUwsU0FBUixHQUFvQjZMLEdBQXBCO0FBQ0EsYUFBT0MsT0FBTyxDQUFDRSxXQUFmO0FBQ0g7O0FBQ0QsV0FBT0gsR0FBUDtBQUNIOztBQUNELFdBQVMvUixLQUFULENBQWdCc1EsTUFBaEIsRUFBd0JDLFFBQXhCLEVBQWtDO0FBQzlCLFFBQUk7QUFDQSxhQUFPeFQsSUFBSSxDQUFDaUQsS0FBTCxDQUFXc1EsTUFBWCxDQUFQO0FBQ0gsS0FGRCxDQUdBLE9BQU81SixDQUFQLEVBQVU7QUFDTixhQUFPNkosUUFBUDtBQUNIO0FBQ0o7O0FBRUQsV0FBUzRCLFVBQVQsR0FBdUI7QUFBQTs7QUFDbkIsUUFBTXZVLEdBQUcsNEJBQUc0TixNQUFNLENBQUNDLFFBQVAsQ0FBZ0IyRyxRQUFoQixDQUF5QkMsS0FBekIsQ0FBK0IsbUJBQS9CLENBQUgsMERBQUcsc0JBQXNELENBQXRELENBQVo7QUFDQSxRQUFNdE0sSUFBSSxHQUFHLDBCQUFBUCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsc0NBQXZCLGlGQUFnRTJDLFNBQWhFLGdDQUNUNUMsUUFBUSxDQUFDQyxhQUFULENBQXVCLCtCQUF2QixDQURTLDJEQUNULHVCQUF5RDJDLFNBRGhELENBQWI7QUFHQSxXQUFPO0FBQ0hmLFVBQUksRUFBRSxRQURIO0FBRUgvRixRQUFFLEVBQUUxRCxHQUFHLEdBQUdBLEdBQUcsQ0FBQ3dRLEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixDQUFILEdBQXVCLElBRjNCO0FBR0huSCxXQUFLLEVBQUVsQixJQUhKO0FBSUhuSSxTQUFHLEVBQUVBLEdBQUcsYUFBTTROLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQjZHLE1BQXRCLFNBQStCMVUsR0FBL0IsSUFBdUM7QUFKNUMsS0FBUDtBQU1IOztBQUVELFdBQVMyVSxTQUFULEdBQXNCO0FBQUE7O0FBQ2xCLFFBQU1DLGNBQWMsR0FBR2hOLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixzRkFBdkIsQ0FBdkI7QUFDQSxRQUFNN0gsR0FBRyxHQUFHNFUsY0FBYyxDQUFDbkcsSUFBM0I7QUFDQSxRQUFNdEcsSUFBSSw0QkFBR3lNLGNBQWMsQ0FBQy9NLGFBQWYsQ0FBNkIsTUFBN0IsQ0FBSCwwREFBRyxzQkFBc0MyQyxTQUFuRDtBQUVBLFdBQU87QUFDSGYsVUFBSSxFQUFFLE9BREg7QUFFSC9GLFFBQUUsRUFBRTFELEdBQUYsYUFBRUEsR0FBRix1QkFBRUEsR0FBRyxDQUFFd1EsS0FBTCxDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsQ0FGRDtBQUdIbkgsV0FBSyxFQUFFbEIsSUFISjtBQUlIbkksU0FBRyxFQUFIQTtBQUpHLEtBQVA7QUFNSDs7QUFFRCxXQUFTNlUsWUFBVCxHQUF5QjtBQUNyQixRQUFJLDRCQUE0QlosSUFBNUIsQ0FBaUNyRyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0IyRyxRQUFqRCxDQUFKLEVBQWdFO0FBQUE7O0FBQzVELFVBQU05USxFQUFFLDZCQUFHa0ssTUFBTSxDQUFDQyxRQUFQLENBQWdCMkcsUUFBaEIsQ0FBeUJoRSxLQUF6QixDQUErQixHQUEvQixDQUFILDJEQUFHLHVCQUFzQyxDQUF0QyxDQUFYO0FBQ0EsVUFBTXJJLElBQUksNkJBQUdQLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QiwyQkFBdkIsQ0FBSCwyREFBRyx1QkFBcUQyQyxTQUFsRTtBQUVBLGFBQU87QUFDSGYsWUFBSSxFQUFFLFVBREg7QUFFSC9GLFVBQUUsRUFBRkEsRUFGRztBQUdIMkYsYUFBSyxFQUFFbEIsSUFISjtBQUlIbkksV0FBRyxFQUFFMEQsRUFBRSw0Q0FBcUNBLEVBQXJDLElBQTRDO0FBSmhELE9BQVA7QUFNSCxLQVZELE1BV0ssSUFBSSx5QkFBeUJ1USxJQUF6QixDQUE4QnJHLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQjJHLFFBQTlDLENBQUosRUFBNkQ7QUFBQTs7QUFDOUQsVUFBTTFPLElBQUksR0FBRzhCLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixpQ0FBdkIsQ0FBYjs7QUFDQSxVQUFNTSxLQUFJLEdBQUdyQyxJQUFILGFBQUdBLElBQUgsdUJBQUdBLElBQUksQ0FBRTBFLFNBQW5COztBQUNBLFVBQU05RyxHQUFFLEdBQUdvQyxJQUFILGFBQUdBLElBQUgsMkNBQUdBLElBQUksQ0FBRTJJLElBQU4sQ0FBVytCLEtBQVgsQ0FBaUIsR0FBakIsQ0FBSCxxREFBRyxpQkFBd0IsQ0FBeEIsQ0FBWDs7QUFFQSxhQUFPO0FBQ0gvRyxZQUFJLEVBQUUsVUFESDtBQUVIL0YsVUFBRSxFQUFGQSxHQUZHO0FBR0gyRixhQUFLLEVBQUVsQixLQUhKO0FBSUhuSSxXQUFHLEVBQUUwRCxHQUFFLDRDQUFxQ0EsR0FBckMsSUFBNEM7QUFKaEQsT0FBUDtBQU1IO0FBQ0o7O0FBRUQsV0FBU29SLFVBQVQsR0FBdUI7QUFBQSxnQkFDRGpILFFBQVEsQ0FBQ1ksSUFBVCxDQUFjZ0csS0FBZCxDQUFvQiwwQ0FBcEIsS0FBbUUsRUFEbEU7QUFBQTtBQUFBLFFBQ1p6VSxHQURZO0FBQUEsUUFDUDBELEVBRE87O0FBR25CLFFBQUksQ0FBQzFELEdBQUQsSUFBUSxDQUFDMEQsRUFBYixFQUFpQjtBQUNiLGFBQU8sSUFBUDtBQUNIOztBQUVELFFBQUksT0FBT3VRLElBQVAsQ0FBWXBHLFFBQVEsQ0FBQ1ksSUFBVCxDQUFjK0IsS0FBZCxDQUFvQixHQUFwQixFQUF5QnROLEtBQXpCLENBQStCLENBQUMsQ0FBaEMsRUFBbUNtRixJQUFuQyxDQUF3QyxFQUF4QyxFQUE0Q2tJLE9BQTVDLENBQW9ELEdBQXBELENBQVosQ0FBSixFQUEyRTtBQUN2RSxVQUFNbEgsS0FBSyxHQUFHekIsUUFBUSxDQUFDQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDeU0sV0FBdEMsQ0FBa0RTLElBQWxELEVBQWQ7QUFDQSxhQUFPO0FBQ0h0TCxZQUFJLEVBQUUsUUFESDtBQUVIL0YsVUFBRSxFQUFGQSxFQUZHO0FBR0gyRixhQUFLLEVBQUxBLEtBSEc7QUFJSHJKLFdBQUcsRUFBSEE7QUFKRyxPQUFQO0FBTUgsS0FSRCxNQVNLO0FBQ0QsVUFBTXFKLE1BQUssR0FBR3pCLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1Qix5QkFBdkIsRUFBa0RtTixPQUFsRCxDQUEwREQsSUFBMUQsRUFBZDs7QUFDQSxhQUFPO0FBQ0h0TCxZQUFJLEVBQUUsUUFESDtBQUVIL0YsVUFBRSxFQUFGQSxFQUZHO0FBR0gyRixhQUFLLEVBQUxBLE1BSEc7QUFJSHJKLFdBQUcsRUFBSEE7QUFKRyxPQUFQO0FBTUg7QUFDSjs7QUFFRCxXQUFTaVYsYUFBVCxHQUEwQjtBQUFBOztBQUN0QixRQUFNQyxNQUFNLEdBQUd0TixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQWY7QUFDQSxRQUFNc04sTUFBTSxHQUFHLENBQ1hDLEtBQUssQ0FBQ0MsSUFBTixDQUFXek4sUUFBUSxDQUFDME4sZ0JBQVQsQ0FBMEIsb0NBQTFCLENBQVgsRUFDS2hQLEdBREwsQ0FDUyxVQUFDaVAsTUFBRDtBQUFBOztBQUFBLHVCQUFZblQsS0FBSyxDQUFDbVQsTUFBTSxDQUFDL0ssU0FBUixDQUFqQiwyQ0FBWSxPQUF5QmdMLFFBQXJDO0FBQUEsS0FEVCxFQUN3REMsSUFEeEQsQ0FDNkQsVUFBQ0MsQ0FBRDtBQUFBLGFBQU9BLENBQVA7QUFBQSxLQUQ3RCxDQURXLDJCQUdYOU4sUUFBUSxDQUFDZSxjQUFULENBQXdCLGlCQUF4QixDQUhXLG9GQUdYLHNCQUE0QzZCLFNBSGpDLDJEQUdYLHVCQUF1RGdHLEtBQXZELENBQTZELEtBQTdELEVBQW9FLENBQXBFLENBSFcsRUFJWDBFLE1BQU0sSUFBSUUsS0FBSyxDQUFDQyxJQUFOLENBQVdILE1BQU0sQ0FBQ1MsVUFBbEIsRUFBOEJ0VCxNQUE5QixDQUFxQyxVQUFDZ0gsS0FBRCxFQUFRdU0sSUFBUjtBQUFBLGFBQWlCdk0sS0FBSyxJQUFJdU0sSUFBSSxDQUFDQyxRQUFMLEtBQWtCLENBQWxCLEdBQXNCRCxJQUFJLENBQUN0QixXQUEzQixHQUF5QyxFQUE3QyxDQUF0QjtBQUFBLEtBQXJDLEVBQTZHLEVBQTdHLENBSkMsNEJBS1gxTSxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FMVywyREFLWCx1QkFBdUN3QixLQUw1QixFQU9WNUYsTUFQVSxDQU9ILFVBQUM0RixLQUFEO0FBQUEsYUFBV0EsS0FBWDtBQUFBLEtBUEcsRUFRVmhILE1BUlUsQ0FRSCxVQUFDaUUsR0FBRCxFQUFNK0MsS0FBTixFQUFnQjtBQUNwQixVQUFNRCxLQUFLLEdBQUc4SyxrQkFBa0IsQ0FBQzdLLEtBQUQsQ0FBbEIsQ0FBMEIwTCxJQUExQixFQUFkO0FBQ0F6TyxTQUFHLENBQUM4QyxLQUFELENBQUgsR0FBYSxPQUFPOUMsR0FBRyxDQUFDOEMsS0FBRCxDQUFWLEtBQXNCLFFBQXRCLEdBQWlDOUMsR0FBRyxDQUFDOEMsS0FBRCxDQUFILEdBQWEsQ0FBOUMsR0FBa0QsQ0FBL0Q7QUFDQSxhQUFPOUMsR0FBUDtBQUNILEtBWlUsRUFZUixFQVpRLENBQWY7QUFhQSxRQUFNK0MsS0FBSyxHQUFHaEYsTUFBTSxDQUFDdUMsSUFBUCxDQUFZdU8sTUFBWixFQUFvQjVRLElBQXBCLENBQXlCLFVBQUN1UixNQUFELEVBQVNDLE1BQVQ7QUFBQSxhQUFvQlosTUFBTSxDQUFDVyxNQUFELENBQU4sR0FBaUJYLE1BQU0sQ0FBQ1ksTUFBRCxDQUEzQztBQUFBLEtBQXpCLEVBQThFLENBQTlFLENBQWQ7QUFFQSxRQUFNbFgsT0FBTyxHQUFHK0ksUUFBUSxDQUFDaUcsUUFBVCxDQUFrQlksSUFBbEIsQ0FBdUIrQixLQUF2QixDQUE2QixTQUE3QixFQUF3QyxDQUF4QyxJQUE2QyxTQUE3RDtBQUNBLFFBQU05TSxFQUFFLEdBQUdrRSxRQUFRLENBQUNpRyxRQUFULENBQWtCWSxJQUFsQixDQUF1QjhCLE9BQXZCLENBQStCMVIsT0FBL0IsRUFBd0MsRUFBeEMsRUFBNEMyUixLQUE1QyxDQUFrRCxHQUFsRCxFQUF1RCxDQUF2RCxDQUFYO0FBQ0EsUUFBTXhRLEdBQUcsYUFBTW5CLE9BQU4sU0FBZ0I2RSxFQUFoQixDQUFUO0FBRUEsV0FBTztBQUNIK0YsVUFBSSxFQUFFLFdBREg7QUFFSC9GLFFBQUUsRUFBRkEsRUFGRztBQUdIMkYsV0FBSyxFQUFMQSxLQUhHO0FBSUhySixTQUFHLEVBQUhBO0FBSkcsS0FBUDtBQU1IOztBQUVELFdBQVNnVyxVQUFULEdBQXVCO0FBQUE7O0FBQ25CLGFBQVM1VCxLQUFULENBQWdCc1EsTUFBaEIsRUFBd0JDLFFBQXhCLEVBQWtDO0FBQzlCLFVBQUk7QUFDQSxlQUFPeFQsSUFBSSxDQUFDaUQsS0FBTCxDQUFXc1EsTUFBWCxDQUFQO0FBQ0gsT0FGRCxDQUdBLE9BQU81SixDQUFQLEVBQVU7QUFDTixlQUFPNkosUUFBUDtBQUNIO0FBQ0o7O0FBRUQsUUFBTXNELEdBQUcsR0FBRyxZQUNSckksTUFEUSw2REFDUixRQUFRc0ksS0FEQSxrREFDUixjQUFlQyxRQURQLDRCQUVSdk8sUUFBUSxDQUFDQyxhQUFULENBQXVCLGlCQUF2QixDQUZRLDJEQUVSLHVCQUEyQ3VHLEtBRm5DLDRCQUdSeEcsUUFBUSxDQUFDQyxhQUFULENBQXVCLHlCQUF2QixDQUhRLHFGQUdSLHVCQUFtRG1ELE9BSDNDLDJEQUdSLHVCQUE2RCxNQUE3RCxDQUhRLDRCQUlScEQsUUFBUSxDQUFDQyxhQUFULENBQXVCLG9CQUF2QixDQUpRLHFGQUlSLHVCQUE4Q21ELE9BSnRDLDJEQUlSLHVCQUF3RCxPQUF4RCxDQUpRLDRCQUtScEQsUUFBUSxDQUFDZSxjQUFULENBQXdCLHVCQUF4QixDQUxRLHFGQUtSLHVCQUFrRHFDLE9BTDFDLDJEQUtSLHVCQUE0RCxJQUE1RCxDQUxRLDRCQU1ScEQsUUFBUSxDQUFDZSxjQUFULENBQXdCLHdCQUF4QixDQU5RLHFGQU1SLHVCQUFtRHFDLE9BTjNDLDJEQU1SLHVCQUE2RCxJQUE3RCxDQU5RLDRCQU9ScEQsUUFBUSxDQUFDZSxjQUFULENBQXdCLHdCQUF4QixDQVBRLHFGQU9SLHVCQUFtRHFDLE9BUDNDLDJEQU9SLHVCQUE2RCxJQUE3RCxDQVBRLEVBU1B2SCxNQVRPLENBU0EsVUFBQzRGLEtBQUQ7QUFBQSxhQUFXQSxLQUFYO0FBQUEsS0FUQSxFQVVQaEgsTUFWTyxDQVVBLFVBQUNpRSxHQUFELEVBQU01QyxFQUFOLEVBQWE7QUFDakI0QyxTQUFHLENBQUM1QyxFQUFELENBQUgsR0FBVSxPQUFPNEMsR0FBRyxDQUFDNUMsRUFBRCxDQUFWLEtBQW1CLFFBQW5CLEdBQThCNEMsR0FBRyxDQUFDNUMsRUFBRCxDQUFILEdBQVUsQ0FBeEMsR0FBNEMsQ0FBdEQ7QUFDQSxhQUFPNEMsR0FBUDtBQUNILEtBYk8sRUFhTCxFQWJLLENBQVo7QUFjQSxRQUFNNUMsRUFBRSxHQUFHVyxNQUFNLENBQUN1QyxJQUFQLENBQVlxUCxHQUFaLEVBQWlCMVIsSUFBakIsQ0FBc0IsVUFBQzZSLEdBQUQsRUFBTUMsR0FBTjtBQUFBLGFBQWNKLEdBQUcsQ0FBQ0csR0FBRCxDQUFILEdBQVdILEdBQUcsQ0FBQ0ksR0FBRCxDQUE1QjtBQUFBLEtBQXRCLEVBQXlELENBQXpELENBQVg7QUFFQSxRQUFNbkIsTUFBTSxHQUFHdE4sUUFBUSxDQUFDQyxhQUFULENBQXVCLGdCQUF2QixDQUFmO0FBQ0EsUUFBTXNOLE1BQU0sR0FBRyxDQUNYQyxLQUFLLENBQUNDLElBQU4sQ0FBV3pOLFFBQVEsQ0FBQzBOLGdCQUFULENBQTBCLG9DQUExQixDQUFYLEVBQ0toUCxHQURMLENBQ1MsVUFBQ2lQLE1BQUQ7QUFBQTs7QUFBQSx3QkFBWW5ULEtBQUssQ0FBQ21ULE1BQU0sQ0FBQy9LLFNBQVIsQ0FBakIsNENBQVksUUFBeUJnTCxRQUFyQztBQUFBLEtBRFQsRUFDd0RDLElBRHhELENBQzZELFVBQUNDLENBQUQ7QUFBQSxhQUFPQSxDQUFQO0FBQUEsS0FEN0QsQ0FEVyw0QkFHWDlOLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixpQkFBeEIsQ0FIVyxzRkFHWCx1QkFBNEM2QixTQUhqQyw0REFHWCx3QkFBdURnRyxLQUF2RCxDQUE2RCxLQUE3RCxFQUFvRSxDQUFwRSxDQUhXLEVBSVgwRSxNQUFNLElBQUlFLEtBQUssQ0FBQ0MsSUFBTixDQUFXSCxNQUFNLENBQUNTLFVBQWxCLEVBQThCdFQsTUFBOUIsQ0FBcUMsVUFBQ2dILEtBQUQsRUFBUXVNLElBQVI7QUFBQSxhQUFpQnZNLEtBQUssSUFBSXVNLElBQUksQ0FBQ0MsUUFBTCxLQUFrQixDQUFsQixHQUFzQkQsSUFBSSxDQUFDdEIsV0FBM0IsR0FBeUMsRUFBN0MsQ0FBdEI7QUFBQSxLQUFyQyxFQUE2RyxFQUE3RyxDQUpDLDZCQUtYMU0sUUFBUSxDQUFDQyxhQUFULENBQXVCLGFBQXZCLENBTFcsNERBS1gsd0JBQXVDd0IsS0FMNUIsRUFPVjVGLE1BUFUsQ0FPSCxVQUFDNEYsS0FBRDtBQUFBLGFBQVdBLEtBQVg7QUFBQSxLQVBHLEVBUVZoSCxNQVJVLENBUUgsVUFBQ2lFLEdBQUQsRUFBTStDLEtBQU4sRUFBZ0I7QUFDcEIsVUFBTUQsS0FBSyxHQUFHOEssa0JBQWtCLENBQUM3SyxLQUFELENBQWxCLENBQTBCMEwsSUFBMUIsRUFBZDtBQUNBek8sU0FBRyxDQUFDOEMsS0FBRCxDQUFILEdBQWEsT0FBTzlDLEdBQUcsQ0FBQzhDLEtBQUQsQ0FBVixLQUFzQixRQUF0QixHQUFpQzlDLEdBQUcsQ0FBQzhDLEtBQUQsQ0FBSCxHQUFhLENBQTlDLEdBQWtELENBQS9EO0FBQ0EsYUFBTzlDLEdBQVA7QUFDSCxLQVpVLEVBWVIsRUFaUSxDQUFmO0FBYUEsUUFBSStDLEtBQUssR0FBR2hGLE1BQU0sQ0FBQ3VDLElBQVAsQ0FBWXVPLE1BQVosRUFBb0I1USxJQUFwQixDQUF5QixVQUFDdVIsTUFBRCxFQUFTQyxNQUFUO0FBQUEsYUFBb0JaLE1BQU0sQ0FBQ1csTUFBRCxDQUFOLEdBQWlCWCxNQUFNLENBQUNZLE1BQUQsQ0FBM0M7QUFBQSxLQUF6QixFQUE4RSxDQUE5RSxDQUFaO0FBRUEsUUFBSS9WLEdBQUcsR0FBRyxJQUFWOztBQUNBLHFCQUFJNEgsUUFBSiw0REFBSSxVQUFVaUcsUUFBZCwrQ0FBSSxtQkFBb0JZLElBQXhCLEVBQThCO0FBQUE7O0FBQzFCek8sU0FBRyw0QkFBRzRILFFBQVEsQ0FBQ2lHLFFBQVQsQ0FBa0JZLElBQWxCLENBQXVCZ0csS0FBdkIsQ0FBNkIsa0NBQTdCLENBQUgsMERBQUcsc0JBQW1FLENBQW5FLENBQU47QUFDSDs7QUFDRCxRQUFJN00sUUFBUSxDQUFDaUcsUUFBVCxDQUFrQlksSUFBbEIsQ0FBdUJyQixRQUF2QixDQUFnQyxpQkFBaEMsQ0FBSixFQUF3RDtBQUFBOztBQUNwRHBOLFNBQUcsNkJBQUc0SCxRQUFRLENBQUNpRyxRQUFULENBQWtCWSxJQUFsQixDQUF1QmdHLEtBQXZCLENBQTZCLHlCQUE3QixDQUFILDJEQUFHLHVCQUEwRCxDQUExRCxDQUFOO0FBQ0FwTCxXQUFLLEdBQUdBLEtBQUssQ0FBQ21ILEtBQU4sQ0FBWSxLQUFaLEVBQW1CLENBQW5CLENBQVI7QUFDSDs7QUFFRCxXQUFPO0FBQ0gvRyxVQUFJLEVBQUUsUUFESDtBQUVIL0YsUUFBRSxFQUFGQSxFQUZHO0FBR0gyRixXQUFLLEVBQUxBLEtBSEc7QUFJSHJKLFNBQUcsRUFBSEE7QUFKRyxLQUFQO0FBTUg7O0FBRUQsTUFBSWlGLE1BQUo7O0FBRUEsTUFBSTJJLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQnpGLElBQWhCLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3ZDbkQsVUFBTSxHQUFHc1AsVUFBVSxFQUFuQjtBQUNILEdBRkQsTUFHSyxJQUFJM00sUUFBUSxDQUFDME8sZUFBVCxDQUF5QmhPLFNBQXpCLENBQW1DOEUsUUFBbkMsQ0FBNEMsb0JBQTVDLENBQUosRUFBdUU7QUFDeEVuSSxVQUFNLEdBQUc2UCxVQUFVLEVBQW5CO0FBQ0gsR0FGSSxNQUdBLElBQUlsSCxNQUFNLENBQUNDLFFBQVAsQ0FBZ0J6RixJQUFoQixDQUFxQmdGLFFBQXJCLENBQThCLGdCQUE5QixDQUFKLEVBQXFEO0FBQ3REbkksVUFBTSxHQUFHMFAsU0FBUyxFQUFsQjtBQUNILEdBRkksTUFHQSxJQUFJL0csTUFBTSxDQUFDQyxRQUFQLENBQWdCekYsSUFBaEIsQ0FBcUJnRixRQUFyQixDQUE4QixtQkFBOUIsS0FBc0RRLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQnpGLElBQWhCLENBQXFCZ0YsUUFBckIsQ0FBOEIscUJBQTlCLENBQTFELEVBQWdIO0FBQ2pIbkksVUFBTSxHQUFHZ1EsYUFBYSxFQUF0QjtBQUNILEdBRkksTUFHQSxJQUFJckgsTUFBTSxDQUFDQyxRQUFQLENBQWdCekYsSUFBaEIsS0FBeUIsY0FBN0IsRUFBNkM7QUFDOUNuRCxVQUFNLEdBQUc0UCxZQUFZLEVBQXJCO0FBQ0gsR0FGSSxNQUdBO0FBQ0Q1UCxVQUFNLEdBQUcrUSxVQUFVLEVBQW5CO0FBQ0g7O0FBRURPLFNBQU8sQ0FBQ0MsR0FBUixDQUFZdlIsTUFBWjs7QUFFQSxNQUFJQSxNQUFKLEVBQVk7QUFDUmlPLFVBQU0sQ0FBQ0MsT0FBUCxDQUFlc0QsV0FBZixDQUEyQnhSLE1BQTNCO0FBQ0g7QUFDSixDOzs7Ozs7Ozs7Ozs7Ozs7QUMxUU0sSUFBTWdPLFdBQVcsR0FBRywyQkFBcEIsQyxDQUFnRCwyQjs7Ozs7Ozs7Ozs7Ozs7O0FDQWhELFNBQVN5RCxTQUFULEdBQXNCO0FBQ3pCLE1BQU1DLGFBQWEsR0FBRy9PLFFBQVEsQ0FBQ2UsY0FBVCxDQUF3QixnQkFBeEIsQ0FBdEI7QUFDQWdPLGVBQWEsQ0FBQ0MsR0FBZCxHQUFvQjFELE1BQU0sQ0FBQ0MsT0FBUCxDQUFlMEQsTUFBZixDQUFzQiw0QkFBdEIsQ0FBcEI7QUFDSCxDOzs7Ozs7Ozs7Ozs7Ozs7O0FDSEQ7O0FBRUEsU0FBUzNWLElBQVQsQ0FBZTRWLFNBQWYsRUFBMEJsUSxJQUExQixFQUFnQztBQUM1QixTQUFPLElBQUl0RSxPQUFKLENBQVksVUFBQ0csT0FBRDtBQUFBLFdBQWF5USxNQUFNLENBQUNsUixPQUFQLENBQWU4VSxTQUFmLEVBQTBCL0ksR0FBMUIsQ0FBOEJuSCxJQUE5QixFQUFvQ25FLE9BQXBDLENBQWI7QUFBQSxHQUFaLENBQVA7QUFDSDs7QUFFRCxTQUFTUixLQUFULENBQWdCNlUsU0FBaEIsRUFBMkJDLFFBQTNCLEVBQXFDO0FBQ2pDLFNBQU8sSUFBSXpVLE9BQUosQ0FBWSxVQUFDRyxPQUFEO0FBQUEsV0FBYXlRLE1BQU0sQ0FBQ2xSLE9BQVAsQ0FBZThVLFNBQWYsRUFBMEIzUCxHQUExQixDQUE4QjRQLFFBQTlCLEVBQXdDdFUsT0FBeEMsQ0FBYjtBQUFBLEdBQVosQ0FBUDtBQUNIOztBQUVELFNBQVM2RSxXQUFULENBQXNCdUUsUUFBdEIsRUFBZ0M7QUFDNUIsU0FBT3FILE1BQU0sQ0FBQ2xSLE9BQVAsQ0FBZWdWLFNBQWYsQ0FBeUIxUCxXQUF6QixDQUFxQ3VFLFFBQXJDLENBQVA7QUFDSDs7QUFFRCxJQUFNN0osT0FBTyxHQUFHO0FBQ1pkLE1BQUksRUFBSkEsSUFEWTtBQUNOZSxPQUFLLEVBQUxBLEtBRE07QUFDQ3FGLGFBQVcsRUFBWEE7QUFERCxDQUFoQjtBQUlPLElBQU1tQixFQUFFLEdBQUcxRyxvREFBUSxDQUFDQyxPQUFELENBQW5CLEM7Ozs7Ozs7Ozs7QUNsQlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsS0FBSztBQUNMLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBMEIsb0JBQW9CLENBQUU7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzdUJhOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQzs7QUFFRixpREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxhQUFhLGNBQWM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCx1RUFBdUUsa0JBQWtCO0FBQ3RKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzR0FBc0c7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwrQkFBK0IsaUNBQWlDO0FBQ2hFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0EsMkJBQTJCLGdCQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxVOzs7Ozs7VUN2UWY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNMEYsR0FBRyxHQUFHOUksaURBQUcsQ0FBQ3FVLG9EQUFELENBQWY7QUFFQXhLLHVEQUFBLENBQWtCLEdBQWxCO0FBRUEsSUFBTXhILElBQUksR0FBR3lQLHlEQUFXLENBQUNqSSx3Q0FBRCxDQUF4QjtBQUNBLElBQU13TyxPQUFPLEdBQUduSCwrREFBYyxDQUFDckgsd0NBQUQsQ0FBOUI7QUFFQUEsaURBQUEsQ0FBWSxVQUFDd0UsT0FBRCxFQUFhO0FBQ3JCLE1BQUksQ0FBQyxNQUFELEVBQVMsZ0JBQVQsRUFBMkIsTUFBM0IsRUFBbUM3SixJQUFuQyxDQUF3QzZKLE9BQU8sQ0FBQ2lLLGNBQVIsQ0FBdUJDLElBQXZCLENBQTRCbEssT0FBNUIsQ0FBeEMsQ0FBSixFQUFtRjtBQUMvRWhNLFFBQUksQ0FBQ3dQLE1BQUw7QUFDSDs7QUFDRCxNQUFJcE0sTUFBTSxDQUFDdUMsSUFBUCxDQUFZcUcsT0FBWixFQUFxQjdKLElBQXJCLENBQTBCLFVBQUMrSixNQUFEO0FBQUEsV0FBWUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCLFNBQWhCLENBQVo7QUFBQSxHQUExQixLQUFxRS9JLE1BQU0sQ0FBQzBILFNBQVAsQ0FBaUJtTCxjQUFqQixDQUFnQ0UsSUFBaEMsQ0FBcUNuSyxPQUFyQyxFQUE4QyxRQUE5QyxDQUF6RSxFQUFrSTtBQUM5SGdLLFdBQU8sQ0FBQ3hHLE1BQVI7QUFDSDtBQUNKLENBUEQ7QUFTQTRHLFNBQVMsQ0FBQ0MsYUFBVixDQUF3QkMsVUFBeEIsQ0FBbUNDLFdBQW5DLENBQStDLGdCQUEvQztBQUNBek0sbUVBQWE7QUFFYixJQUFNYSxRQUFRLEdBQUdGLGdFQUFjLENBQUM7QUFDNUJHLFVBQVEsRUFBRSxvQkFBTTtBQUNad0wsYUFBUyxDQUFDQyxhQUFWLENBQXdCQyxVQUF4QixDQUFtQ0MsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0F6TSx1RUFBYTtBQUNoQixHQUoyQjtBQUs1QmEsVUFBUSxFQUFFLEtBQUssSUFMYTtBQU01QkQsVUFBUSxFQUFFLElBTmtCO0FBTzVCSyxTQUFPLEVBQUViLGdFQUFjQTtBQVBLLENBQUQsQ0FBL0I7QUFVQXVMLGtEQUFTO0FBQ1Q3TCw2RUFBdUIsQ0FBQztBQUFBLFNBQU1lLFFBQVEsQ0FBQ2MsZ0JBQVQsRUFBTjtBQUFBLENBQUQsQ0FBdkI7QUFDQWxFLGlFQUFpQixDQUFDQyx3Q0FBRCxDQUFqQjtBQUNBMEcscUVBQW1CLENBQUMxRyx3Q0FBRCxFQUFLZixHQUFMLENBQW5CO0FBQ0FpQyxtRUFBcUIsQ0FBQ2xCLHdDQUFELEVBQUtmLEdBQUwsQ0FBckI7QUFDQUYsOERBQWMsQ0FBQ2lCLHdDQUFELEVBQUtmLEdBQUwsQ0FBZDtBQUVBekcsSUFBSSxDQUFDd1AsTUFBTDtBQUNBd0csT0FBTyxDQUFDeEcsTUFBUixHQUNLbFIsSUFETCxDQUNVK1QsbURBRFYsRSIsImZpbGUiOiJleHRlbnNpb24vcG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQVBJID0gKGJhc2VVcmwgPSAnJykgPT4ge1xyXG4gICAgZnVuY3Rpb24gcG9zdFNvdXJjZSAoc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9zb3VyY2VzYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc291cmNlKSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5wYXlsb2FkKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFNvdXJjZUZyb21VcmwgKHVybCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc291cmNlcy9hZGRGcm9tVXJsYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB1cmwgfSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkVXJscyAoc291cmNlcyA9IFtdLCBsaW1pdCA9ICcnLCBkYXRlID0gJycpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXHJcbiAgICAgICAgICAgIGAke2Jhc2VVcmx9L2FwaS91cmxzL2ZldGNoYCxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlcyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLnBheWxvYWQgfHwgW10pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkU3Vic2NyaXB0aW9ucyAodG9waWNzID0gW10sIGtleSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc3Vic2NyaXB0aW9uc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHRvcGljcyxcclxuICAgICAgICAgICAgICAgIGtleToga2V5XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlU3Vic2NyaXB0aW9ucyAodG9waWNzID0gW10sIGtleSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc3Vic2NyaXB0aW9uc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZGVsZXRlJyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdG9waWNzLFxyXG4gICAgICAgICAgICAgICAga2V5OiBrZXlcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkTGluayAoa2V5LCBjaGFuZ2VkU2luY2UpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL2xpbmtzLyR7a2V5fSR7Y2hhbmdlZFNpbmNlID8gYD9jaGFuZ2VkU2luY2U9JHtjaGFuZ2VkU2luY2V9YCA6ICcnfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuc3RhdHVzID09PSAzMDQgPyAoeyB2YWxpZDogdHJ1ZSwgcGF5bG9hZDogbnVsbCB9KSA6IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZEhvc3RzICgpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3NvdXJjZXMvaG9zdHNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnN0YXR1cyA9PT0gMzA0ID8gKHsgdmFsaWQ6IHRydWUsIHBheWxvYWQ6IG51bGwgfSkgOiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGtleSwgdXBkYXRlU2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rcy8ke2tleX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3B1dCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZVNldCksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVMaW5rIChpbml0U2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluaXRTZXQpLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBVcmxzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRVcmxzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTb3VyY2U6IHtcclxuICAgICAgICAgICAgaW5zZXJ0OiBwb3N0U291cmNlLFxyXG4gICAgICAgICAgICBmcm9tVXJsOiBhZGRTb3VyY2VGcm9tVXJsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTdWJzY3JpcHRpb246IHtcclxuICAgICAgICAgICAgc3Vic2NyaWJlOiBhZGRTdWJzY3JpcHRpb25zLFxyXG4gICAgICAgICAgICB1bnN1YnNjcmliZTogZGVsZXRlU3Vic2NyaXB0aW9uc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTGluazoge1xyXG4gICAgICAgICAgICBpbnNlcnQ6IGNyZWF0ZUxpbmssXHJcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlTGluayxcclxuICAgICAgICAgICAgcmVhZDogcmVhZExpbmtcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhvc3RzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRIb3N0c1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBwYXJzZSB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5jb25zdCBOQU1FU1BBQ0VTID0ge1xyXG4gICAgU1lOQzogJ3N5bmMnLFxyXG4gICAgTE9DQUw6ICdsb2NhbCdcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURCIChzdG9yYWdlKSB7XHJcbiAgICBjb25zdCB7IHJlYWQsIHdyaXRlIH0gPSBzdG9yYWdlXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVhZFNvdXJjZXMgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgcmVnaXN0cnkgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IHJlZ2lzdHJ5OiAnW1wic291cmNlcy0xXCJdJyB9KVxyXG4gICAgICAgIHJldHVybiBwYXJzZShyZWdpc3RyeSwgWydzb3VyY2VzLTEnXSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoc291cmNlcywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3NvdXJjZXMsIHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IFtrZXldOiAnW10nIH0pXSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoW3NvdXJjZXMsIHNvdXJjZV0pID0+IHNvdXJjZXMuY29uY2F0KHBhcnNlKHNvdXJjZVtrZXldLCBbXSkpKVxyXG4gICAgICAgICAgICB9LCBQcm9taXNlLnJlc29sdmUoW10pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyaXRlU291cmNlcyAoc291cmNlcykge1xyXG4gICAgICAgIGNvbnN0IHJlZ2lzdHJ5ID0gW11cclxuICAgICAgICBjb25zdCB1cGRhdGVzID0ge31cclxuICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSBNYXRoLm1heCgxLCBNYXRoLmNlaWwoc291cmNlcy5sZW5ndGggLyAyMCkpOyB4KyspIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYHNvdXJjZXMtJHt4fWBcclxuICAgICAgICAgICAgcmVnaXN0cnkucHVzaChrZXkpXHJcbiAgICAgICAgICAgIHVwZGF0ZXNba2V5XSA9IEpTT04uc3RyaW5naWZ5KHNvdXJjZXMuc2xpY2UoKHggLSAxKSAqIDIwLCB4ICogMjApKVxyXG4gICAgICAgIH1cclxuICAgICAgICB1cGRhdGVzLnJlZ2lzdHJ5ID0gSlNPTi5zdHJpbmdpZnkocmVnaXN0cnkpXHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgdXBkYXRlcylcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBhZGRTb3VyY2UgKHNvdXJjZSkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCByZWFkU291cmNlcygpXHJcbiAgICAgICAgaWYgKCFzb3VyY2VzLnNvbWUoKHt1cmwsIG1hbmdhSWR9KSA9PiBzb3VyY2UudXJsID09PSB1cmwgJiYgbWFuZ2FJZCA9PT0gc291cmNlLm1hbmdhSWQpKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaChzb3VyY2UpXHJcbiAgICAgICAgICAgIGF3YWl0IHdyaXRlU291cmNlcyhzb3VyY2VzKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc291cmNlc1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVNvdXJjZSAoc291cmNlSWQpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgcmVhZFNvdXJjZXMoKVxyXG4gICAgICAgIGNvbnN0IG5ld1NvdXJjZXMgPSBzb3VyY2VzLmZpbHRlcigoc291cmNlKSA9PiBzb3VyY2U/LmlkICE9PSBzb3VyY2VJZClcclxuICAgICAgICBhd2FpdCB3cml0ZVNvdXJjZXMobmV3U291cmNlcylcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1NvdXJjZXNcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBpc0RpcnR5ICgpIHtcclxuICAgICAgICBjb25zdCB7IHVybHMsIHNvdXJjZXMgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgWyd1cmxzJywgJ3NvdXJjZXMnXSlcclxuXHJcbiAgICAgICAgcmV0dXJuICEhdXJscyB8fCAhIXNvdXJjZXNcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRGaWx0ZXJlZFNvcnRlZFVybHMgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaGlkZGVuQ2hhcHRlcnM6IGhpZGRlbkNoYXB0ZXJzU3RyaW5nLCBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JywgaGlkZTogMCB9KVxyXG4gICAgICAgIGNvbnN0IHsgdXJscyB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLkxPQ0FMLCB7IHVybHM6ICdbXScgfSlcclxuXHJcbiAgICAgICAgY29uc3QgaGlkZGVuQ2hhcHRlcnMgPSBwYXJzZShoaWRkZW5DaGFwdGVyc1N0cmluZywge30pXHJcbiAgICAgICAgY29uc3QgdXJsTGlzdCA9IHBhcnNlKHVybHMsIFtdKVxyXG5cclxuICAgICAgICBjb25zdCBjaGVja09sZCA9IChjaGFwdGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoaWRlICYmIGNoYXB0ZXIuY3JlYXRlZCA8IGhpZGUgfHwgaGlkZGVuQ2hhcHRlcnNbY2hhcHRlci5pZF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBbb2xkVXJscywgbmV3VXJsc10gPSBPYmplY3QudmFsdWVzKHVybExpc3QpXHJcbiAgICAgICAgICAgIC5zb3J0KCh1cmwxLCB1cmwyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaWZmID0gdXJsMi5jcmVhdGVkIC0gdXJsMS5jcmVhdGVkXHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZikgPCA1MDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKHVybDEpLmxvY2FsZUNvbXBhcmUodXJsMilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBkaWZmXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKFtvbGRVcmxzLCBuZXdVcmxzXSwgdXJsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tPbGQodXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9sZFVybHMucHVzaCh1cmwpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdVcmxzLnB1c2godXJsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtvbGRVcmxzLCBuZXdVcmxzXVxyXG4gICAgICAgICAgICB9LCBbW10sIFtdXSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgb2xkVXJscyxcclxuICAgICAgICAgICAgbmV3VXJsc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBoaWRlVXJsIChpZCkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nIH0pXHJcbiAgICAgICAgY29uc3QgaGlkZGVuQ2hhcHRlcnMgPSBwYXJzZShyZXN1bHQuaGlkZGVuQ2hhcHRlcnMsIHt9KVxyXG4gICAgICAgIGhpZGRlbkNoYXB0ZXJzW2lkXSA9IHRydWVcclxuICAgICAgICByZXR1cm4gd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiBKU09OLnN0cmluZ2lmeShoaWRkZW5DaGFwdGVycykgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBoaWRlQWxsVXJscyAodGltZXN0YW1wKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JywgaGlkZTogdGltZXN0YW1wIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd3JpdGVVcmxzICh1cmxzKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuTE9DQUwsIHsgdXJsczogSlNPTi5zdHJpbmdpZnkodXJscykgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBpbml0ICgpIHtcclxuICAgICAgICBjb25zdCB7IGhpZGUgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGU6IGZhbHNlIH0pXHJcbiAgICAgICAgaWYgKCFoaWRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKVxyXG4gICAgICAgICAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKVxyXG4gICAgICAgICAgICBhd2FpdCB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZTogdG9kYXkuZ2V0VGltZSgpfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2V0TWF4T2xkIChtYXhPbGQpIHtcclxuICAgICAgICBhd2FpdCB3cml0ZShOQU1FU1BBQ0VTLkxPQ0FMLCB7IG1heE9sZCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldE1heE9sZCAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBtYXhPbGQgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgeyBtYXhPbGQ6IDI1IH0pXHJcbiAgICAgICAgcmV0dXJuIG1heE9sZFxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldExpbmsgKGxpbmspIHtcclxuICAgICAgICBhd2FpdCB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgbGluayB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldExpbmsgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbGluayB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIFsnbGluayddKVxyXG4gICAgICAgIHJldHVybiBsaW5rXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0SGlkZSAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRlOiAwIH0pXHJcbiAgICAgICAgcmV0dXJuIGhpZGVcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiB3cml0ZUxvY2FsU2V0dGluZ3MgKHNldHRpbmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuTE9DQUwsIHsgbG9jYWxTZXR0aW5nczogSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYWxTZXR0aW5ncyAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBsb2NhbFNldHRpbmdzIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIHsgbG9jYWxTZXR0aW5nczogJ3t9JyB9KVxyXG4gICAgICAgIHJldHVybiBwYXJzZShsb2NhbFNldHRpbmdzLCB7fSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRMaW5rRGF0YSAoKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IHJlYWRTb3VyY2VzKClcclxuICAgICAgICBjb25zdCB7IGhpZGRlbkNoYXB0ZXJzOiBoaWRkZW5DaGFwdGVyc1N0cmluZywgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IDAgfSlcclxuICAgICAgICBjb25zdCBoaWRkZW5DaGFwdGVycyA9IHBhcnNlKGhpZGRlbkNoYXB0ZXJzU3RyaW5nLCB7fSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc291cmNlczogc291cmNlcy5tYXAoKHNvdXJjZSkgPT4gc291cmNlLmlkKSxcclxuICAgICAgICAgICAgaGlkZGVuQ2hhcHRlcnMsXHJcbiAgICAgICAgICAgIGhpZGU6IE51bWJlcihoaWRlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBzZXRMaW5rRGF0YSAoe3NvdXJjZXMsIGhpZGRlbkNoYXB0ZXJzLCBoaWRlfSkge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlZFNvdXJjZXMgPSAoYXdhaXQgcmVhZFNvdXJjZXMoKSkucmVkdWNlKChzcywgc291cmNlKSA9PiBzb3VyY2UgPyAoey4uLnNzLCBbc291cmNlLmlkXTogdHJ1ZX0pIDogc3MsIHt9KVxyXG4gICAgICAgIGNvbnN0IGhhc0NoYW5nZWRTb3VyY2VzID0gT2JqZWN0LmtleXMoc3RvcmVkU291cmNlcykubGVuZ3RoICE9PSBzb3VyY2VzLmxlbmd0aCB8fFxyXG4gICAgICAgICAgICBzb3VyY2VzLnNvbWUoKHNvdXJjZSkgPT4gIXN0b3JlZFNvdXJjZXNbc291cmNlLmlkXSlcclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtQcm9taXNlLnJlc29sdmUoKV1cclxuICAgICAgICBpZiAoaGFzQ2hhbmdlZFNvdXJjZXMpIHtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh3cml0ZVNvdXJjZXMoc291cmNlcykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhpZGRlbiA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nLCBoaWRlOiAwIH0pXHJcbiAgICAgICAgaWYgKGhpZGRlbi5oaWRkZW5DaGFwdGVycyAhPT0gSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ2hhcHRlcnMpIHx8IFN0cmluZyhoaWRkZW4uaGlkZSkgIT09IFN0cmluZyhoaWRlKSkge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHdyaXRlKE5BTUVTUEFDRVMuU1lOQywge1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuQ2hhcHRlcnM6IEpTT04uc3RyaW5naWZ5KGhpZGRlbkNoYXB0ZXJzKSxcclxuICAgICAgICAgICAgICAgIGhpZGVcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcylcclxuICAgIH1cclxuXHJcbiAgICBpbml0KClcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNvdXJjZXM6IHtcclxuICAgICAgICAgICAgcmVhZDogcmVhZFNvdXJjZXMsXHJcbiAgICAgICAgICAgIGltcG9ydDogd3JpdGVTb3VyY2VzLFxyXG4gICAgICAgICAgICBhZGQ6IGFkZFNvdXJjZSxcclxuICAgICAgICAgICAgZGVsZXRlOiBkZWxldGVTb3VyY2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIGxvY2FsOiB7XHJcbiAgICAgICAgICAgICAgICByZWFkOiBnZXRMb2NhbFNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgc2V0OiB3cml0ZUxvY2FsU2V0dGluZ3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNEaXJ0eSxcclxuICAgICAgICB1cmxzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IGdldEZpbHRlcmVkU29ydGVkVXJscyxcclxuICAgICAgICAgICAgaGlkZTogaGlkZVVybCxcclxuICAgICAgICAgICAgaGlkZUFsbDogaGlkZUFsbFVybHMsXHJcbiAgICAgICAgICAgIGltcG9ydDogd3JpdGVVcmxzLFxyXG4gICAgICAgICAgICBzZXRNYXhPbGQsXHJcbiAgICAgICAgICAgIGdldE1heE9sZCxcclxuICAgICAgICAgICAgZ2V0SGlkZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DaGFuZ2U6IHN0b3JhZ2UuYWRkTGlzdGVuZXIsXHJcbiAgICAgICAgbGluazoge1xyXG4gICAgICAgICAgICBzZXQ6IHNldExpbmssXHJcbiAgICAgICAgICAgIHJlYWQ6IGdldExpbmssXHJcbiAgICAgICAgICAgIGxvY2FsOiBnZXRMaW5rRGF0YSxcclxuICAgICAgICAgICAgc2V0TG9jYWw6IHNldExpbmtEYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW5kZXJIb3N0TGlzdCAoX2RiLCBhcGkpIHtcclxuICAgIGNvbnN0IHsgSG9zdHMgfSA9IGFwaVxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSG9zdHMucmVhZCgpXHJcbiAgICBjb25zdCBob3N0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvc3RzJylcclxuICAgIGlmIChyZXN1bHQudmFsaWQpIHtcclxuICAgICAgICBjb25zdCBob3N0cyA9IHJlc3VsdC5wYXlsb2FkXHJcblxyXG4gICAgICAgIGNvbnN0IGhvc3RMaXN0ID0gaG9zdHMuc3RhYmxlXHJcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBTdHJpbmcoYT8ubmFtZSkubG9jYWxlQ29tcGFyZShiPy5uYW1lKSlcclxuICAgICAgICAgICAgLm1hcCgoaG9zdCkgPT4gYDxhIGhyZWY9XCIke2hvc3QudXJsfVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCI+JHtob3N0Lm5hbWV9PC9hPmApLmpvaW4oJzxzcGFuPiwgPC9zcGFuPicpXHJcbiAgICAgICAgaG9zdENvbnRhaW5lci5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxoNj5TdXBwb3J0ZWQgUGFnZXM8L2g2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluay1saXN0XCI+JHtob3N0TGlzdH08L2Rpdj5cclxuICAgICAgICBgXHJcblxyXG4gICAgICAgIGlmIChob3N0cy51bnN0YWJsZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgaG9zdExpc3QgPSBob3N0cy51bnN0YWJsZVxyXG4gICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IFN0cmluZyhhPy5uYW1lKS5sb2NhbGVDb21wYXJlKGI/Lm5hbWUpKVxyXG4gICAgICAgICAgICAgICAgLm1hcCgoaG9zdCkgPT4gYDxhIGhyZWY9XCIke2hvc3QudXJsfVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCI+JHtob3N0Lm5hbWV9PC9hPmApLmpvaW4oJzxzcGFuPiwgPC9zcGFuPicpXHJcbiAgICAgICAgICAgIGhvc3RDb250YWluZXIuaW5uZXJIVE1MICs9IGBcclxuICAgICAgICAgICAgICAgIDxwPlRoZXNlIFBhZ2VzIGhhZCBzb21lIHByb2JsZW1zIHJlY2VudGx5ICZuZGFzaDsgdGhleSBtaWdodCBvciBtaWdodCBub3Qgd29yazo8L3A+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluay1saXN0XCI+JHtob3N0TGlzdH08L2Rpdj5cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgIH1cclxuICAgICAgICBob3N0Q29udGFpbmVyLmlubmVySFRNTCArPSBgXHJcbiAgICAgICAgICAgIDxwPk1hbnkgb3RoZXIgcGFnZXMgY2FuIHdvcmsgYXMgd2VsbCwgaWYgdGhleSB1c2UgdGhlIDxhIGhyZWY9XCJodHRwczovL3RoZW1lZm9yZXN0Lm5ldC9pdGVtL21hZGFyYS13b3JkcHJlc3MtdGhlbWUtZm9yLW1hbmdhLzIwODQ5ODI4XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIj5NYWRhcmEtVGhlbWU8L2E+LjwvcD5cclxuICAgICAgICBgXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHNhdmVBcyBmcm9tICdzYXZlLWFzJ1xyXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkSW1wb3J0SGFuZGxlcnMgKGRiKSB7XHJcbiAgICBjb25zdCBpbXBvcnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltcG9ydCcpXHJcbiAgICBjb25zdCBleHBvcnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4cG9ydCcpXHJcblxyXG4gICAgaW1wb3J0RWxlbS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlc1swXVxyXG4gICAgICAgIGNvbnN0IGZyID0gbmV3IEZpbGVSZWFkZXIoKVxyXG4gICAgICAgIGZyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZXMgPSBwYXJzZShmci5yZXN1bHQsIFtdKVxyXG4gICAgICAgICAgICBjb25zdCBjbGVhbiA9IHNvdXJjZXMuZmlsdGVyKChzb3VyY2UpID0+IHNvdXJjZT8udGl0bGUgJiYgc291cmNlLnVybCAmJiBzb3VyY2UubWFuZ2FJZClcclxuICAgICAgICAgICAgaWYgKGNsZWFuLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZGIuc291cmNlcy5pbXBvcnQoY2xlYW4pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW1wb3J0RWxlbS5maWxlcyA9IG51bGxcclxuICAgICAgICB9KVxyXG4gICAgICAgIGZyLnJlYWRBc1RleHQoZmlsZSlcclxuICAgIH0pXHJcblxyXG4gICAgZXhwb3J0RWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkYi5zb3VyY2VzLnJlYWQoKVxyXG4gICAgICAgICAgICAudGhlbigoc291cmNlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShzb3VyY2VzKV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pXHJcbiAgICAgICAgICAgICAgICBzYXZlQXMoYmxvYiwgJ21hbmdhcG9sbC5qc29uJylcclxuICAgICAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IGdldExpbmtRdWVyeSwgbGlua0lmVW5saW5rZWQgfSBmcm9tICcuL3NldHRpbmdzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTWVudUxpc3RlbmVycyAoZGIsIEFwaSkge1xyXG4gICAgY29uc3QgaW1wb3J0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5pbXBvcnQnKVxyXG4gICAgY29uc3QgcG9wdXBUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cFRpdGxlJylcclxuICAgIGNvbnN0IGJvb2ttYXJrcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQnKVxyXG4gICAgY29uc3QgdXJscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmxzJylcclxuICAgIGNvbnN0IGNoYXB0ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXB0ZXJzJylcclxuICAgIGNvbnN0IGFkZFNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkU2VjdGlvbicpXHJcbiAgICBjb25zdCBzb3VyY2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZXMnKVxyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0dGluZ3MnKVxyXG4gICAgY29uc3Qgc2V0dGluZ3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzJylcclxuICAgIGNvbnN0IHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2dyZXNzJylcclxuICAgIGNvbnN0IGludHJvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvJylcclxuXHJcbiAgICBjb25zdCBvcGVuQ2hhcHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgICAgZGIuc291cmNlcy5yZWFkKClcclxuICAgICAgICAgICAgLnRoZW4oKHNvdXJjZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSBzb3VyY2VzLmxlbmd0aCA/ICdub25lJyA6ICdmbGV4J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIHNvdXJjZXMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGltcG9ydFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGFkZFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgdXJscy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBwcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBjaGFwdGVycy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgYm9va21hcmtzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHBvcHVwVGl0bGUuaW5uZXJUZXh0ID0gJ0NoYXB0ZXJzJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wZW5TZXR0aW5ncyA9ICgpID0+IHtcclxuICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc291cmNlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICB1cmxzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwb3B1cFRpdGxlLmlubmVyVGV4dCA9ICdTZXR0aW5ncydcclxuICAgICAgICBib29rbWFya3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgY2hhcHRlcnMuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgfVxyXG5cclxuICAgIGNoYXB0ZXJzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbkNoYXB0ZXJzKVxyXG5cclxuICAgIGJvb2ttYXJrcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc291cmNlcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgIGltcG9ydFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgIGFkZFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHVybHMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHBvcHVwVGl0bGUuaW5uZXJUZXh0ID0gJ0Jvb2ttYXJrcydcclxuICAgICAgICBib29rbWFya3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGNoYXB0ZXJzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgfSlcclxuXHJcbiAgICBzZXR0aW5ncy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5TZXR0aW5ncylcclxuXHJcbiAgICBpZiAoZ2V0TGlua1F1ZXJ5KCkpIHtcclxuICAgICAgICBvcGVuU2V0dGluZ3MoKVxyXG4gICAgICAgIGxpbmtJZlVubGlua2VkKGRiLCBBcGkpXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBvcGVuQ2hhcHRlcnMoKVxyXG4gICAgfVxyXG59XHJcbiIsImNvbnN0IHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2dyZXNzJylcclxuXHJcbmxldCBsb2NrZWQgPSBmYWxzZVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc2lzdGVyUHJvZ3Jlc3NIYW5kbGVyID0gKHVwZGF0ZU5vdykgPT4ge1xyXG4gICAgcHJvZ3Jlc3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdXBkYXRlTm93KClcclxuICAgICAgICBtYXJrUmVmcmVzaGVkKClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtYXJrUmVmcmVzaGVkID0gKCkgPT4ge1xyXG4gICAgcHJvZ3Jlc3MuaW5uZXJIVE1MID0gJyhSZWZyZXNoZWQhKSdcclxuICAgIHByb2dyZXNzLmRhdGFzZXQuYmVmb3JlID0gJyhSZWZyZXNoZWQhKSdcclxuICAgIGxvY2tlZCA9IHRydWVcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGxvY2tlZCA9IGZhbHNlXHJcbiAgICAgICAgcHJvZ3Jlc3MuZGF0YXNldC5iZWZvcmUgPSAnKFJlZnJlc2ggbm93ISknXHJcbiAgICB9LCAxNTAwKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlUHJvZ3Jlc3MgPSAoX2xhc3RQaW5nLCBuZXh0UGluZykgPT4ge1xyXG4gICAgaWYgKCFsb2NrZWQpIHtcclxuICAgICAgICBjb25zdCByZW1haW5pbmcgPSBuZXh0UGluZyAtIERhdGUubm93KClcclxuXHJcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IE1hdGgubWF4KE1hdGgucm91bmQocmVtYWluaW5nIC8gMTAwMCksIDApXHJcblxyXG4gICAgICAgIHByb2dyZXNzLmlubmVySFRNTCA9IGAoTmV4dCByZWZyZXNoOiAke3NlY29uZHN9cylgXHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVNjaGVkdWxlID0gKHsgaXNBY3RpdmUgPSBmYWxzZSwgaW50ZXJ2YWwgPSAwLCBjYWxsYmFjayA9IEZ1bmN0aW9uLnByb3RvdHlwZSwgdXBkYXRlciB9ID0ge30pID0+IHtcclxuICAgIGxldCBuZXh0UGluZyA9IDBcclxuICAgIGxldCBsYXN0UGluZyA9IDBcclxuICAgIGNvbnN0IGNhbGxDYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICBpZiAobmV4dFBpbmcgJiYgbmV4dFBpbmcgPD0gRGF0ZS5ub3coKSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgICAgICAgIGxhc3RQaW5nID0gbmV4dFBpbmdcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBuZXh0UGluZyArIGludGVydmFsID4gRGF0ZS5ub3coKSA/IG5leHRQaW5nICsgaW50ZXJ2YWwgOiBEYXRlLm5vdygpICsgaW50ZXJ2YWxcclxuICAgICAgICB9XHJcbiAgICAgICAgdHlwZW9mIHVwZGF0ZXIgPT09ICdmdW5jdGlvbicgJiYgdXBkYXRlcihsYXN0UGluZywgbmV4dFBpbmcpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzQWN0aXZlICYmIGludGVydmFsKSB7XHJcbiAgICAgICAgbmV4dFBpbmcgPSBEYXRlLm5vdygpIC0gMVxyXG4gICAgICAgIGNhbGxDYWxsYmFjaygpXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRpbWVyID0gc2V0SW50ZXJ2YWwoY2FsbENhbGxiYWNrLCAxMDApXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzZXRJbnRlcnZhbCAobmV3SW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdJbnRlcnZhbCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndXNlIGEgbnVtYmVyJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXh0UGluZyA9IG5leHRQaW5nIC0gaW50ZXJ2YWwgKyBuZXdJbnRlcnZhbFxyXG4gICAgICAgICAgICBpbnRlcnZhbCA9IG5ld0ludGVydmFsXHJcbiAgICAgICAgICAgIGNhbGxDYWxsYmFjaygpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRDYWxsYmFjayAoY2IpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sgPSBjYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RhcnQgKCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgICAgICAgIGxhc3RQaW5nID0gRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICBuZXh0UGluZyA9IERhdGUubm93KCkgKyBpbnRlcnZhbFxyXG4gICAgICAgICAgICB0aW1lciA9IHNldEludGVydmFsKGNhbGxDYWxsYmFjaywgMTAwKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHJpZ2dlckluc3RhbnRseSAoKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gRGF0ZS5ub3coKSArIGludGVydmFsXHJcbiAgICAgICAgICAgIHR5cGVvZiB1cGRhdGVyID09PSAnZnVuY3Rpb24nICYmIHVwZGF0ZXIobGFzdFBpbmcsIG5leHRQaW5nKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RvcCAoKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gMFxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiY29uc3QgbGlua0ZpZWxkcyA9IFsnaGlkZScsICdoaWRkZW5DaGFwdGVycycsICdzb3VyY2VzJ11cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdEtleSAoa2V5ID0gJycpIHtcclxuICAgIHJldHVybiBgJHtrZXkuc2xpY2UoMCwgNSl9LSR7a2V5LnNsaWNlKDUsIDEwKX0tJHtrZXkuc2xpY2UoMTAsIDE1KX1gXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW5rSGVscGVycyAoZGIsIEFwaSkge1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gcHVzaExpbmtVcGRhdGUgKGNoYW5nZXMpIHtcclxuICAgICAgICBjb25zdCBjaGFuZ2VzZXQgPSBsaW5rRmllbGRzLmZpbHRlcigoa2V5KSA9PiBPYmplY3Qua2V5cyhjaGFuZ2VzKS5zb21lKChjaGFuZ2UpID0+IGNoYW5nZS5pbmNsdWRlcyhrZXkpKSlcclxuXHJcbiAgICAgICAgaWYgKGNoYW5nZXNldC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpIHx8IHt9XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsID0gYXdhaXQgZGIubGluay5sb2NhbCgpIHx8IHt9XHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9IHt9XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzZXQuaW5jbHVkZXMoJ2hpZGUnKSkge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlLmhpZGUgPSBsb2NhbC5oaWRlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoYW5nZXNldC5pbmNsdWRlcygnaGlkZGVuQ2hhcHRlcnMnKSkge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlLmhpZGRlbkNoYXB0ZXJzID0gbG9jYWwuaGlkZGVuQ2hhcHRlcnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc2V0LmluY2x1ZGVzKCdzb3VyY2VzJykpIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZS5zb3VyY2VzID0gbG9jYWwuc291cmNlc1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXModXBkYXRlKS5sZW5ndGggJiYgbGluay5rZXkpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IEFwaS5MaW5rLnVwZGF0ZShsaW5rLmtleSwgdXBkYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy52YWxpZCAmJiBkYi5saW5rLnNldCh7IGtleTogcmVzLnBheWxvYWQua2V5IH0pKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoTGlua1VwZGF0ZSAoKSB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcblxyXG4gICAgICAgIGlmIChsaW5rKSB7XHJcbiAgICAgICAgICAgIEFwaS5MaW5rLnJlYWQobGluay5rZXksIGxpbmsubGFzdE1vZGlmaWVkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMudmFsaWQgJiYgcmVzLnBheWxvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGIubGluay5zZXRMb2NhbChyZXMucGF5bG9hZClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcHVzaExpbmtVcGRhdGUsXHJcbiAgICAgICAgZmV0Y2hMaW5rVXBkYXRlXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVmFsaWRMaW5rS2V5IChrZXkpIHtcclxuICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsZWFuS2V5ID0ga2V5LnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpXHJcbiAgICBpZiAoY2xlYW5LZXkubGVuZ3RoID09PSAxNSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW5rUXVlcnkgKCkge1xyXG4gICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKVxyXG5cclxuICAgIGlmIChpc1ZhbGlkTGlua0tleSh1cmxQYXJhbXMuZ2V0KCdsaW5rJykpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVybFBhcmFtcy5nZXQoJ2xpbmsnKS5yZXBsYWNlQWxsKC9bXlxcZF0qL2csICcnKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGlua0lmVW5saW5rZWQgKGRiLCBhcGkpIHtcclxuICAgIGNvbnN0IGtleSA9IGdldExpbmtRdWVyeSgpXHJcblxyXG4gICAgaWYgKGtleSkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRMaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuXHJcbiAgICAgICAgaWYgKCFjdXJyZW50TGluayB8fCAhY3VycmVudExpbmsua2V5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtJbnB1dDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMScpXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtJbnB1dDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMicpXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtJbnB1dDMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMycpXHJcblxyXG4gICAgICAgICAgICBsaW5rSW5wdXQxLnZhbHVlID0ga2V5LnNsaWNlKDAsIDUpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSBrZXkuc2xpY2UoNSwgMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBrZXkuc2xpY2UoMTAsIDE1KVxyXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgY29ubmVjdFRvTGluayhrZXksIGFwaSwgZGIpXHJcblxyXG4gICAgICAgICAgICBpZiAobGluayAmJiBsaW5rLmtleSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlua051bWJlclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1pZCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmsnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlua0xpbmtUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluay10ZXh0JylcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VubGluay1zZWN0aW9uJykuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rTGlua1RleHQuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rTGluay5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rLmlubmVyVGV4dCA9IGBodHRwczovL21hbmdhLmZvY2hsYWMuY29tP2xpbms9JHtsaW5rLmtleX1gXHJcbiAgICAgICAgICAgICAgICBsaW5rTGluay5ocmVmID0gYGh0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20/bGluaz0ke2xpbmsua2V5fWBcclxuICAgICAgICAgICAgICAgIGxpbmtOdW1iZXJUZXh0LmlubmVyVGV4dCA9IGAke2xpbmsua2V5LnNsaWNlKDAsIDUpfS0ke2xpbmsua2V5LnNsaWNlKDUsIDEwKX0tJHtsaW5rLmtleS5zbGljZSgxMCl9YFxyXG4gICAgICAgICAgICAgICAgbGlua051bWJlclRleHQuc3R5bGUuY29sb3IgPSAnIzAwMGMyMSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmb3JtYXRLZXkoY3VycmVudExpbmsua2V5KSAhPT0gZm9ybWF0S2V5KGtleSkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlua0xpbmtXYXJuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluay13YXJuaW5nJylcclxuICAgICAgICAgICAgY29uc3Qgd2FybkxpbmtDdXJyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dhcm4tY3VycmVudC1saW5rJylcclxuICAgICAgICAgICAgY29uc3Qgd2FybkxpbmtOZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2Fybi1uZXctbGluaycpXHJcblxyXG4gICAgICAgICAgICBsaW5rTGlua1dhcm4uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgICAgICB3YXJuTGlua0N1cnJlbnQuaW5uZXJUZXh0ID0gZm9ybWF0S2V5KGN1cnJlbnRMaW5rLmtleSlcclxuICAgICAgICAgICAgd2FybkxpbmtOZXcuaW5uZXJUZXh0ID0gZm9ybWF0S2V5KGtleSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RUb0xpbmsgKGtleSwgYXBpLCBkYikge1xyXG4gICAgY29uc3QgeyBMaW5rIH0gPSBhcGlcclxuICAgIGNvbnN0IGxpbmtFcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWVycm9yJylcclxuICAgIGNvbnN0IGxpbmtQcm9ncmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLXByb2dyZXNzJylcclxuICAgIGNvbnN0IGNyZWF0ZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWxpbmstYnV0dG9uJylcclxuICAgIGNvbnN0IGxpbmtCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1idXR0b24nKVxyXG4gICAgbGlua0Vycm9yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIGxpbmtQcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgY3JlYXRlTGluay5kaXNhYmxlZCA9IHRydWVcclxuICAgIGxpbmtCdXR0b24uZGlzYWJsZWQgPSB0cnVlXHJcblxyXG4gICAgY29uc3QgbGlua1Jlc3VsdCA9IGF3YWl0IExpbmsucmVhZChrZXkpXHJcbiAgICBjcmVhdGVMaW5rLmRpc2FibGVkID0gZmFsc2VcclxuICAgIGxpbmtCdXR0b24uZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgbGlua1Byb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIGlmIChsaW5rUmVzdWx0Py52YWxpZCkge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBsaW5rUmVzdWx0LnBheWxvYWRcclxuICAgICAgICBhd2FpdCBkYi5saW5rLnNldCh7IGtleTogbGluay5rZXkgfSlcclxuICAgICAgICBhd2FpdCBkYi5saW5rLnNldExvY2FsKGxpbmspXHJcblxyXG4gICAgICAgIHJldHVybiBsaW5rXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBsaW5rRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGlua0xpbmtXYXJuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluay13YXJuaW5nJylcclxuXHJcbiAgICBpZiAobGlua0xpbmtXYXJuKSB7XHJcbiAgICAgICAgbGlua0xpbmtXYXJuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNldHRpbmdzSGFuZGxlcnMgKGRiLCBhcGkpIHtcclxuICAgIGNvbnN0IHsgTGluayB9ID0gYXBpXHJcblxyXG4gICAgY29uc3QgY3JlYXRlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctbGluay1idXR0b24nKVxyXG4gICAgY29uc3QgdXBkYXRlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGRhdGUtbGlua2luZycpXHJcbiAgICBjb25zdCBsaW5rTnVtYmVyVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWlkJylcclxuICAgIGNvbnN0IGxpbmtMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluaycpXHJcbiAgICBjb25zdCBsaW5rTGlua1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXRleHQnKVxyXG4gICAgY29uc3QgbGlua2luZ1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1zZWN0aW9uJylcclxuICAgIGNvbnN0IHVubGlua1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5saW5rLXNlY3Rpb24nKVxyXG4gICAgY29uc3QgdW5saW5rQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VubGluay1idXR0b24nKVxyXG4gICAgY29uc3QgbGlua0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWJ1dHRvbicpXHJcbiAgICBjb25zdCBsaW5rSW5wdXQxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTEnKVxyXG4gICAgY29uc3QgbGlua0lucHV0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0yJylcclxuICAgIGNvbnN0IGxpbmtJbnB1dDMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMycpXHJcblxyXG4gICAgbGlua0lucHV0MS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBudW1iZXIgPSBsaW5rSW5wdXQxLnZhbHVlLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpLnNsaWNlKDAsIDE1KVxyXG4gICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSBudW1iZXIuc2xpY2UoMCwgNSlcclxuICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA+IDUpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IG51bWJlci5zbGljZSg1LCAxMClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG51bWJlci5sZW5ndGggPiAxMCkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gbnVtYmVyLnNsaWNlKDEwKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLmZvY3VzKClcclxuICAgICAgICAgICAgbGlua0lucHV0My5zZXRTZWxlY3Rpb25SYW5nZShudW1iZXIubGVuZ3RoIC0gMTAsIG51bWJlci5sZW5ndGggLSAxMClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobnVtYmVyLmxlbmd0aCA+PSA1KSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIuZm9jdXMoKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnNldFNlbGVjdGlvblJhbmdlKG51bWJlci5sZW5ndGggLSA1LCBudW1iZXIubGVuZ3RoIC0gNSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGlua0lucHV0Mi5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBudW1iZXIgPSBsaW5rSW5wdXQyLnZhbHVlLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpLnNsaWNlKDAsIDEwKVxyXG4gICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSBudW1iZXIuc2xpY2UoMCwgNSlcclxuICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA+PSA1KSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoNSwgMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuZm9jdXMoKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnNldFNlbGVjdGlvblJhbmdlKG51bWJlci5sZW5ndGggLSA1LCBudW1iZXIubGVuZ3RoIC0gNSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGlua0lucHV0My5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBudW1iZXIgPSBsaW5rSW5wdXQzLnZhbHVlLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgaWYgKGxpbmtJbnB1dDMudmFsdWUgIT09IG51bWJlci5zbGljZSgwLCA1KSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gbnVtYmVyLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBmdW5jdGlvbiB3cml0ZVN0YXRlVG9Eb20gKGxpbmspIHtcclxuICAgICAgICBsaW5raW5nU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICdub25lJyA6ICcnXHJcbiAgICAgICAgdW5saW5rU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICcnIDogJ25vbmUnXHJcbiAgICAgICAgaWYgKGxpbmtMaW5rVGV4dCkge1xyXG4gICAgICAgICAgICBsaW5rTGlua1RleHQuc3R5bGUuZGlzcGxheSA9IGxpbmsgPyAnJyA6ICdub25lJ1xyXG4gICAgICAgICAgICBsaW5rTGluay5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICcnIDogJ25vbmUnXHJcbiAgICAgICAgICAgIGxpbmtMaW5rLmlubmVyVGV4dCA9IGxpbmsgPyBgaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbT9saW5rPSR7bGluay5rZXl9YCA6ICcnXHJcbiAgICAgICAgICAgIGxpbmtMaW5rLmhyZWYgPSBsaW5rID8gYGh0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20/bGluaz0ke2xpbmsua2V5fWAgOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaW5rTnVtYmVyVGV4dC5pbm5lclRleHQgPSBsaW5rID8gZm9ybWF0S2V5KGxpbmsua2V5KSA6ICdVbmxpbmtlZCdcclxuICAgICAgICBsaW5rTnVtYmVyVGV4dC5zdHlsZS5jb2xvciA9IGxpbmsgPyAnIzAwMGMyMScgOiAnI2MzY2JkMidcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgIHdyaXRlU3RhdGVUb0RvbShsaW5rKVxyXG5cclxuICAgIGlmICh1cGRhdGVMaW5rKSB7XHJcbiAgICAgICAgdXBkYXRlTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gZ2V0TGlua1F1ZXJ5KClcclxuXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSBrZXkuc2xpY2UoMCwgNSlcclxuICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IGtleS5zbGljZSg1LCAxMClcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IGtleS5zbGljZSgxMCwgMTUpXHJcbiAgICAgICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0KG51bGwpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmstd2FybmluZycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKClcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29ubmVjdFRvTGluayhrZXksIGFwaSwgZGIpXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbShyZXN1bHQpXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQxLnZhbHVlID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlua0xpbmtXYXJuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstZXJyb3InKVxyXG5cclxuICAgICAgICBpZiAobGlua0xpbmtXYXJuKSB7XHJcbiAgICAgICAgICAgIGxpbmtMaW5rV2Fybi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rRGF0YSA9IGF3YWl0IGRiLmxpbmsubG9jYWwoKVxyXG4gICAgICAgICAgICBjb25zdCBuZXdMaW5rUmVzdWx0ID0gYXdhaXQgTGluay5pbnNlcnQobGlua0RhdGEpXHJcbiAgICAgICAgICAgIGlmIChuZXdMaW5rUmVzdWx0Py52YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluayA9IG5ld0xpbmtSZXN1bHQucGF5bG9hZFxyXG4gICAgICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXQoeyBrZXk6IGxpbmsua2V5IH0pXHJcbiAgICAgICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20obGluaylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICB1bmxpbmtCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICAgICAgaWYgKGxpbmspIHtcclxuICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXQobnVsbClcclxuICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKHVuZGVmaW5lZClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGlua0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7bGlua0lucHV0MS52YWx1ZX0ke2xpbmtJbnB1dDIudmFsdWV9JHtsaW5rSW5wdXQzLnZhbHVlfWBcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29ubmVjdFRvTGluayhrZXksIGFwaSwgZGIpXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbShyZXN1bHQpXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQxLnZhbHVlID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBzb3VyY2VSZW5kZXJlciAoZGIpIHtcclxuICAgIGNvbnN0IHNvdXJjZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291cmNlcycpXHJcblxyXG4gICAgc291cmNlcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsb3Nlc3QgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnJvdyAuYWN0aW9uLmRlbGV0ZScpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3QgJiYgY2xvc2VzdC5kYXRhc2V0WydpZCddICYmIHNvdXJjZXMuY29udGFpbnMoY2xvc2VzdCkpIHtcclxuICAgICAgICAgICAgZGIuc291cmNlcy5kZWxldGUoY2xvc2VzdC5kYXRhc2V0WydpZCddKVxyXG4gICAgICAgICAgICBjbG9zZXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGlvbicpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiByZW5kZXJTb3VyY2VzICgpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZGIuc291cmNlcy5yZWFkKClcclxuXHJcbiAgICAgICAgc291cmNlcy5pbm5lckhUTUwgPSBkYXRhXHJcbiAgICAgICAgICAgIC5zb3J0KChzb3VyY2UxLCBzb3VyY2UyKSA9PiBTdHJpbmcoc291cmNlMS50aXRsZSkubG9jYWxlQ29tcGFyZShzb3VyY2UyPy50aXRsZSkpXHJcbiAgICAgICAgICAgIC5tYXAoKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IFN0cmluZyhzb3VyY2UudXJsKS5yZXBsYWNlKC9odHRwcz86XFwvXFwvLywgJycpLnNwbGl0KCcvJylbMF0uc3BsaXQoJy4nKS5zbGljZSgtMikuam9pbignLicpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIGA8bGkgY2xhc3M9XCJyb3cgc291cmNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhXCIgdGl0bGU9XCIke2Ake3NvdXJjZS50aXRsZX0gKCR7dXJsfSlgfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPiR7c291cmNlLnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWFuZ2EtaWRcIj4oJHt1cmx9KTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVsZXRlIGFjdGlvblwiIGRhdGEtaWQ9XCIke3NvdXJjZS5pZH1cIj5EZWxldGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5gXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5qb2luKCdcXG4nKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyOiAoKSA9PiByZW5kZXJTb3VyY2VzKClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBwYWQgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVybFJlbmRlcmVyIChkYikge1xyXG4gICAgY29uc3QgdXJscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmxzJylcclxuICAgIGNvbnN0IGludHJvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvJylcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBoaWRlIChpZCkge1xyXG4gICAgICAgIGNvbnN0IHsgbmV3VXJscywgb2xkVXJscyB9ID0gYXdhaXQgZGIudXJscy5yZWFkKClcclxuICAgICAgICBpZiAobmV3VXJscy5sZW5ndGggPD0gMSAmJiAoIW5ld1VybHNbMF0gfHwgbmV3VXJsc1swXS5pZCA9PT0gaWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhdGVzdENoYXB0ZXJEYXRlID0gb2xkVXJscy5jb25jYXQobmV3VXJscylcclxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGxjZCwgdXJsKSA9PiB1cmwuY3JlYXRlZCA+IGxjZCA/IHVybC5jcmVhdGVkIDogbGNkLCAwKVxyXG5cclxuICAgICAgICAgICAgZGIudXJscy5oaWRlQWxsKGxhdGVzdENoYXB0ZXJEYXRlICsgMSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRiLnVybHMuaGlkZShpZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXJscy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsb3Nlc3RIaWRlID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5yb3cgLmhpZGUnKVxyXG5cclxuICAgICAgICBpZiAoY2xvc2VzdEhpZGUgJiYgY2xvc2VzdEhpZGUuZGF0YXNldFsnaWQnXSAmJiB1cmxzLmNvbnRhaW5zKGNsb3Nlc3RIaWRlKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBoaWRlKGNsb3Nlc3RIaWRlLmRhdGFzZXRbJ2lkJ10pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNsb3Nlc3RMaW5rID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5yb3cubmV3IC5saW5rJylcclxuICAgICAgICBpZiAoY2xvc2VzdExpbmsgJiYgY2xvc2VzdExpbmsuZGF0YXNldFsnaWQnXSAmJiB1cmxzLmNvbnRhaW5zKGNsb3Nlc3RMaW5rKSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIGF3YWl0IGhpZGUoY2xvc2VzdExpbmsuZGF0YXNldFsnaWQnXSlcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oY2xvc2VzdExpbmsuaHJlZiwgJ19ibGFuaycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNsb3Nlc3RNb3JlID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5hY3Rpb24ubG9hZC1tb3JlJylcclxuICAgICAgICBpZiAoY2xvc2VzdE1vcmUgJiYgdXJscy5jb250YWlucyhjbG9zZXN0TW9yZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgbWF4T2xkID0gYXdhaXQgZGIudXJscy5nZXRNYXhPbGQoKVxyXG4gICAgICAgICAgICBhd2FpdCBkYi51cmxzLnNldE1heE9sZChtYXhPbGQgKyAxMDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhpZGVBbGwgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmhpZGUtYWxsJylcclxuICAgICAgICBpZiAoaGlkZUFsbCAmJiB1cmxzLmNvbnRhaW5zKGhpZGVBbGwpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGRiLnVybHMuaGlkZUFsbChEYXRlLm5vdygpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b3AgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnRvcCcpXHJcbiAgICAgICAgaWYgKHRvcCAmJiB1cmxzLmNvbnRhaW5zKHRvcCkpIHtcclxuICAgICAgICAgICAgdXJscy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBsZXQgbWF4U2Nyb2xsID0gMFxyXG4gICAgdXJscy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gdXJscy5vZmZzZXRIZWlnaHQgKyB1cmxzLnNjcm9sbFRvcFxyXG4gICAgICAgIGlmICh1cmxzLnNjcm9sbEhlaWdodCAtIHNjcm9sbEhlaWdodCA8PSA1MCAmJiBtYXhTY3JvbGwgIT09IHVybHMuc2Nyb2xsSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIG1heFNjcm9sbCA9IHVybHMuc2Nyb2xsSGVpZ2h0XHJcbiAgICAgICAgICAgIGNvbnN0IG1heE9sZCA9IGF3YWl0IGRiLnVybHMuZ2V0TWF4T2xkKClcclxuICAgICAgICAgICAgZGIudXJscy5zZXRNYXhPbGQobWF4T2xkICsgMTAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjaGVja1RvcEJ1dHRvbigpXHJcbiAgICB9KVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrVG9wQnV0dG9uICgpIHtcclxuICAgICAgICBpZiAodXJscy5zY3JvbGxUb3AgPiAwICYmIHVybHMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID09PSB1cmxzLnF1ZXJ5U2VsZWN0b3IoJy5vbGQtY2hhcHRlcnMnKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApIHtcclxuICAgICAgICAgICAgdXJscy5xdWVyeVNlbGVjdG9yKCcub2xkLWNoYXB0ZXJzIC50b3AnKS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSdcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHVybHMucXVlcnlTZWxlY3RvcignLm9sZC1jaGFwdGVycyAudG9wJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVVcmxSZW5kZXJlciAoaXNPbGQpIHtcclxuICAgICAgICByZXR1cm4gKGNoYXB0ZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGNoYXB0ZXIuY3JlYXRlZClcclxuICAgICAgICAgICAgY29uc3QgdGltZVN0cmluZyA9IGAke3BhZChkYXRlLmdldEhvdXJzKCkpfToke3BhZChkYXRlLmdldE1pbnV0ZXMoKSl9YFxyXG4gICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gYCR7cGFkKGRhdGUuZ2V0RGF0ZSgpKX0uJHtwYWQoZGF0ZS5nZXRNb250aCgpICsgMSl9LiR7U3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSkuc2xpY2UoLTIpfWBcclxuICAgICAgICAgICAgY29uc3QgZnVsbERhdGUgPSBkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA9PT0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gPyB0aW1lU3RyaW5nIDogZGF0ZVN0cmluZ1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInJvdyR7aXNPbGQgPyAnIG9sZCcgOiAnIG5ldyd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsaW5rXCIgaHJlZj1cIiR7Y2hhcHRlci51cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIiBkYXRhLWlkPVwiJHtjaGFwdGVyLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2NoYXB0ZXIudGl0bGV9IC0gQ2hhcHRlciAke2NoYXB0ZXIuY2hhcHRlcn1cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRlLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRlXCIgdGl0bGU9XCIke2Ake2RhdGVTdHJpbmd9ICR7dGltZVN0cmluZ31gfVwiPiR7ZnVsbERhdGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhpZGVcIiBkYXRhLWlkPVwiJHtjaGFwdGVyLmlkfVwiPkhpZGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9saT5gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlbmRlclVybHMgKCkge1xyXG4gICAgICAgIGNvbnN0IG1heE9sZCA9IGF3YWl0IGRiLnVybHMuZ2V0TWF4T2xkKClcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgZGIuc291cmNlcy5yZWFkKClcclxuICAgICAgICBjb25zdCB7IG5ld1VybHMsIG9sZFVybHMgfSA9IGF3YWl0IGRiLnVybHMucmVhZCgpXHJcbiAgICAgICAgY29uc3QgbmV3Um93cyA9IG5ld1VybHMubWFwKGNyZWF0ZVVybFJlbmRlcmVyKGZhbHNlKSlcclxuICAgICAgICBjb25zdCBvbGRSb3dzID0gb2xkVXJscy5tYXAoY3JlYXRlVXJsUmVuZGVyZXIodHJ1ZSkpXHJcblxyXG4gICAgICAgIGlmICghc291cmNlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdXJscy5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG5ld1Jvd3MubGVuZ3RoIHx8IG9sZFJvd3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgdXJscy5pbm5lckhUTUwgPSBbXVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdChuZXdSb3dzLmxlbmd0aCA/ICc8bGkgY2xhc3M9XCJuZXctY2hhcHRlcnNcIj5OZXcgQ2hhcHRlcnMgPHNwYW4gY2xhc3M9XCJhY3Rpb24gaGlkZS1hbGxcIj5IaWRlIGFsbDwvc3Bhbj48L2xpPicgOiBbXSlcclxuICAgICAgICAgICAgICAgIC5jb25jYXQobmV3Um93cylcclxuICAgICAgICAgICAgICAgIC5jb25jYXQoJzxsaSBjbGFzcz1cIm9sZC1jaGFwdGVyc1wiPk9sZCBDaGFwdGVycyA8c3BhbiBjbGFzcz1cImFjdGlvbiB0b3BcIj5Ub3AgJiM4NTkzOzwvc3Bhbj48L2xpPicpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG9sZFJvd3Muc2xpY2UoMCwgbWF4T2xkKSlcclxuICAgICAgICAgICAgICAgIC5jb25jYXQob2xkUm93cy5sZW5ndGggPj0gbWF4T2xkID8gWyc8bGkgY2xhc3M9XCJhY3Rpb24gbG9hZC1tb3JlXCI+TG9hZCB1cCB0byAxMDAgbW9yZSBvbGQgY2hhcHRlcnMuLi48L2xpPiddIDogW10pXHJcbiAgICAgICAgICAgICAgICAuam9pbignXFxuJylcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBuZXdSb3dzLmxlbmd0aCA/IGAoJHtuZXdSb3dzLmxlbmd0aH0pIE1hbmdhIFBvbGxgIDogJ01hbmdhIFBvbGwnXHJcbiAgICAgICAgICAgIGNoZWNrVG9wQnV0dG9uKClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgdXJscy5pbm5lckhUTUwgPSAnPGxpIGNsYXNzPVwicm93XCI+Tm8gQ2hhcHRlcnMgYXZhaWxhYmxlLjwvbGk+J1xyXG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9ICdNYW5nYSBQb2xsJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcjogKCkgPT4gcmVuZGVyVXJscygpXHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHBhcnNlIChzdHJpbmcsIGZhbGxiYWNrKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZylcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYWQgKG5vKSB7XHJcbiAgICByZXR1cm4gKCcwMCcgKyBubykuc2xpY2UoLTIpXHJcbn1cclxuIiwiaW1wb3J0IHsgQVBJIH0gZnJvbSAnLi4vY29tbW9uL2FwaSdcclxuaW1wb3J0IHsgQVBJX0FERFJFU1MgfSBmcm9tICcuL2NvbnN0YW50cydcclxuaW1wb3J0IHsgZGIgfSBmcm9tICcuL3N0b3JhZ2UnXHJcblxyXG5sZXQgY3VycmVudFNvdXJjZSA9IG51bGxcclxuXHJcbmNvbnN0IGJvb2ttYXJrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvb2ttYXJrJylcclxuY29uc3QgYm9va21hcmtUcmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib29rbWFyay10cmFjaycpXHJcbmNvbnN0IGJvb2ttYXJrVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9va21hcmstdGl0bGUnKVxyXG5cclxuY29uc3QgeyBTb3VyY2UgfSA9IEFQSShBUElfQUREUkVTUylcclxuXHJcbmJvb2ttYXJrVHJhY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBib29rbWFyay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICBib29rbWFya1RpdGxlLmlubmVyVGV4dCA9ICcnXHJcbiAgICBTb3VyY2UuaW5zZXJ0KGN1cnJlbnRTb3VyY2UpXHJcbiAgICAgICAgLnRoZW4oKHNvdXJjZSkgPT4gc291cmNlICYmIGRiLnNvdXJjZXMuYWRkKHNvdXJjZSkpXHJcbiAgICBjdXJyZW50U291cmNlID0gbnVsbFxyXG59KVxyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGFzeW5jIChyZXF1ZXN0KSA9PiB7XHJcbiAgICBpZiAocmVxdWVzdC5pZCAmJiByZXF1ZXN0LnRpdGxlICYmIHJlcXVlc3QudXJsKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IGRiLnNvdXJjZXMucmVhZCgpXHJcblxyXG4gICAgICAgIGlmICghc291cmNlcy5zb21lKChzb3VyY2UpID0+IHNvdXJjZS51cmwgPT09IHJlcXVlc3QudXJsICYmIFN0cmluZyhzb3VyY2UubWFuZ2FJZCkgPT09IFN0cmluZyhyZXF1ZXN0LmlkKSkpIHtcclxuICAgICAgICAgICAgYm9va21hcmsuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgICAgICBib29rbWFya1RpdGxlLmlubmVyVGV4dCA9IGBEbyB5b3Ugd2FudCB0byBzdGFydCB0cmFja2luZyBcIiR7cmVxdWVzdC50aXRsZX1cIj9gXHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiByZXF1ZXN0LnR5cGUsXHJcbiAgICAgICAgICAgICAgICBtYW5nYUlkOiByZXF1ZXN0LmlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHJlcXVlc3QudGl0bGUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IHJlcXVlc3QudXJsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJvb2ttYXJrLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIGJvb2ttYXJrVGl0bGUuaW5uZXJUZXh0ID0gJydcclxuICAgIGN1cnJlbnRTb3VyY2UgPSBudWxsXHJcbn0pXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdEJvb2ttYXJrICgpIHtcclxuICAgIGNocm9tZS50YWJzLnF1ZXJ5KFxyXG4gICAgICAgIHsgYWN0aXZlOiB0cnVlLCB3aW5kb3dJZDogY2hyb21lLndpbmRvd3MuV0lORE9XX0lEX0NVUlJFTlQgfSxcclxuICAgICAgICAodGFicykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRhYnNbMF0udXJsLmluY2x1ZGVzKCdjaHJvbWU6Ly8nKSkge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHsgdGFyZ2V0OiB7IHRhYklkOiB0YWJzWzBdLmlkIH0sIGZ1bmN0aW9uOiB0ZXN0IH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRlc3QgKCkge1xyXG4gICAgZnVuY3Rpb24gZGVjb2RlSFRNTEVudGl0aWVzIChzdHIpIHtcclxuICAgICAgICBpZiAoc3RyICYmIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvPHNjcmlwdFtePl0qPihbXFxTXFxzXSo/KTxcXC9zY3JpcHQ+L2dtaSwgJycpXHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC88XFwvP1xcdyg/OlteXCInPl18XCJbXlwiXSpcInwnW14nXSonKSo+L2dtaSwgJycpXHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gc3RyXHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnRleHRDb250ZW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHJcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlIChzdHJpbmcsIGZhbGxiYWNrKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsbGJhY2tcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdEZhbkZveCAoKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKC9eXFwvbWFuZ2FcXC9bXi9dKlxcLy8pPy5bMF1cclxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlYWRlci1oZWFkZXItdGl0bGUtMSBhOmZpcnN0LWNoaWxkJyk/LmlubmVyVGV4dCB8fFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlsLWluZm8tcmlnaHQtdGl0bGUtZm9udCcpPy5pbm5lclRleHRcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ2ZhbmZveCcsXHJcbiAgICAgICAgICAgIGlkOiB1cmwgPyB1cmwuc3BsaXQoJy8nKVsyXSA6IG51bGwsXHJcbiAgICAgICAgICAgIHRpdGxlOiBuYW1lLFxyXG4gICAgICAgICAgICB1cmw6IHVybCA/IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHt1cmx9YCA6IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdEFzdXJhICgpIHtcclxuICAgICAgICBjb25zdCBicmVhZGNydW1wTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ29sW2l0ZW10eXBlPVwiaHR0cDovL3NjaGVtYS5vcmcvQnJlYWRjcnVtYkxpc3RcIl0gYVtpdGVtcHJvcD1cIml0ZW1cIl1baHJlZio9XCIvY29taWNzL1wiXScpXHJcbiAgICAgICAgY29uc3QgdXJsID0gYnJlYWRjcnVtcExpbmsuaHJlZlxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBicmVhZGNydW1wTGluay5xdWVyeVNlbGVjdG9yKCdzcGFuJyk/LmlubmVyVGV4dFxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnYXN1cmEnLFxyXG4gICAgICAgICAgICBpZDogdXJsPy5zcGxpdCgnLycpWzRdLFxyXG4gICAgICAgICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgICAgICAgdXJsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RNYW5nYWRleCAoKSB7XHJcbiAgICAgICAgaWYgKC90aXRsZVxcL1tcXGQtXFx3XSpcXC9bXFxkLVxcd10qLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKT8uWzJdXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFuZ2EtY29udGFpbmVyIC50aXRsZSBwJyk/LmlubmVyVGV4dFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdtYW5nYWRleCcsXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBpZCA/IGBodHRwczovL2FwaS5tYW5nYWRleC5vcmcvbWFuZ2EvJHtpZH1gIDogbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKC9jaGFwdGVyXFwvW1xcZC1cXHddKlxcL1xcZCovLnRlc3Qod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYS50ZXh0LXByaW1hcnlbaHJlZio9XCIvdGl0bGUvXCJdJylcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGxpbms/LmlubmVyVGV4dFxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGxpbms/LmhyZWYuc3BsaXQoJy8nKT8uWzRdXHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ21hbmdhZGV4JyxcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGlkID8gYGh0dHBzOi8vYXBpLm1hbmdhZGV4Lm9yZy9tYW5nYS8ke2lkfWAgOiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdEdlbmthbiAoKSB7XHJcbiAgICAgICAgY29uc3QgW3VybCwgaWRdID0gbG9jYXRpb24uaHJlZi5tYXRjaCgvaHR0cHM/OlxcL1xcL1teL10qXFwvY29taWNzXFwvKFxcZCopLVstXFx3XFxkXSovKSB8fCBbXVxyXG5cclxuICAgICAgICBpZiAoIXVybCB8fCAhaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgvXlxcZCQvLnRlc3QobG9jYXRpb24uaHJlZi5zcGxpdCgnLycpLnNsaWNlKC0yKS5qb2luKCcnKS5yZXBsYWNlKCcuJykpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRpbmcgaDYnKS50ZXh0Q29udGVudC50cmltKClcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdnZW5rYW4nLFxyXG4gICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgICAgIHVybFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbcHJvcGVydHkqPVwidGl0bGVcIl0nKS5jb250ZW50LnRyaW0oKVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dlbmthbicsXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgdXJsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdExldmlhdGhhbiAoKSB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtdGl0bGUgaDEnKVxyXG4gICAgICAgIGNvbnN0IHRpdGxlcyA9IFtcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cImFwcGxpY2F0aW9uL2xkK2pzb25cIl0nKSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKHNjcmlwdCkgPT4gcGFyc2Uoc2NyaXB0LmlubmVyVGV4dCk/LmhlYWRsaW5lKS5maW5kKChoKSA9PiBoKSxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXB0ZXItaGVhZGluZycpPy5pbm5lclRleHQ/LnNwbGl0KCcgLSAnKVswXSxcclxuICAgICAgICAgICAgaGVhZGVyICYmIEFycmF5LmZyb20oaGVhZGVyLmNoaWxkTm9kZXMpLnJlZHVjZSgodGl0bGUsIG5vZGUpID0+IHRpdGxlICsgKG5vZGUubm9kZVR5cGUgPT09IDMgPyBub2RlLnRleHRDb250ZW50IDogJycpLCAnJyksXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRlLXRpdGxlJyk/LnRpdGxlXHJcbiAgICAgICAgXVxyXG4gICAgICAgICAgICAuZmlsdGVyKCh0aXRsZSkgPT4gdGl0bGUpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKG1hcCwgdGl0bGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsZWFuID0gZGVjb2RlSFRNTEVudGl0aWVzKHRpdGxlKS50cmltKClcclxuICAgICAgICAgICAgICAgIG1hcFtjbGVhbl0gPSB0eXBlb2YgbWFwW2NsZWFuXSA9PT0gJ251bWJlcicgPyBtYXBbY2xlYW5dICsgMSA6IDFcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXBcclxuICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBPYmplY3Qua2V5cyh0aXRsZXMpLnNvcnQoKHRpdGxlMSwgdGl0bGUyKSA9PiB0aXRsZXNbdGl0bGUxXSAtIHRpdGxlc1t0aXRsZTJdKVswXVxyXG5cclxuICAgICAgICBjb25zdCBiYXNlVXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5zcGxpdCgnL21hbmdhLycpWzBdICsgJy9tYW5nYS8nXHJcbiAgICAgICAgY29uc3QgaWQgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoYmFzZVVybCwgJycpLnNwbGl0KCcvJylbMF1cclxuICAgICAgICBjb25zdCB1cmwgPSBgJHtiYXNlVXJsfSR7aWR9YFxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnbGV2aWF0aGFuJyxcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICB1cmxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdE1hZGFybyAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2UgKHN0cmluZywgZmFsbGJhY2spIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbGxiYWNrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlkcyA9IFtcclxuICAgICAgICAgICAgd2luZG93Py5tYW5nYT8ubWFuZ2FfaWQsXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRpbmctcG9zdC1pZCcpPy52YWx1ZSxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwLW1hbmdhLWFjdGlvbi1idXR0b24nKT8uZGF0YXNldD8uWydwb3N0J10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGFwdGVyLXNlbGVjdGlvbicpPy5kYXRhc2V0Py5bJ21hbmdhJ10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYW5nYS1jaGFwdGVycy1ob2xkZXInKT8uZGF0YXNldD8uWydpZCddLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuZ2EtcmVhZGluZy1uYXYtaGVhZCcpPy5kYXRhc2V0Py5bJ2lkJ10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYW5nYS1yZWFkaW5nLW5hdi1mb290Jyk/LmRhdGFzZXQ/LlsnaWQnXVxyXG4gICAgICAgIF1cclxuICAgICAgICAgICAgLmZpbHRlcigodGl0bGUpID0+IHRpdGxlKVxyXG4gICAgICAgICAgICAucmVkdWNlKChtYXAsIGlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtYXBbaWRdID0gdHlwZW9mIG1hcFtpZF0gPT09ICdudW1iZXInID8gbWFwW2lkXSArIDEgOiAxXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwXHJcbiAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgIGNvbnN0IGlkID0gT2JqZWN0LmtleXMoaWRzKS5zb3J0KChpZDEsIGlkMikgPT4gaWRzW2lkMV0gLSBpZHNbaWQyXSlbMF1cclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtdGl0bGUgaDEnKVxyXG4gICAgICAgIGNvbnN0IHRpdGxlcyA9IFtcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cImFwcGxpY2F0aW9uL2xkK2pzb25cIl0nKSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKHNjcmlwdCkgPT4gcGFyc2Uoc2NyaXB0LmlubmVyVGV4dCk/LmhlYWRsaW5lKS5maW5kKChoKSA9PiBoKSxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXB0ZXItaGVhZGluZycpPy5pbm5lclRleHQ/LnNwbGl0KCcgLSAnKVswXSxcclxuICAgICAgICAgICAgaGVhZGVyICYmIEFycmF5LmZyb20oaGVhZGVyLmNoaWxkTm9kZXMpLnJlZHVjZSgodGl0bGUsIG5vZGUpID0+IHRpdGxlICsgKG5vZGUubm9kZVR5cGUgPT09IDMgPyBub2RlLnRleHRDb250ZW50IDogJycpLCAnJyksXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRlLXRpdGxlJyk/LnRpdGxlXHJcbiAgICAgICAgXVxyXG4gICAgICAgICAgICAuZmlsdGVyKCh0aXRsZSkgPT4gdGl0bGUpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKG1hcCwgdGl0bGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsZWFuID0gZGVjb2RlSFRNTEVudGl0aWVzKHRpdGxlKS50cmltKClcclxuICAgICAgICAgICAgICAgIG1hcFtjbGVhbl0gPSB0eXBlb2YgbWFwW2NsZWFuXSA9PT0gJ251bWJlcicgPyBtYXBbY2xlYW5dICsgMSA6IDFcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXBcclxuICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgbGV0IHRpdGxlID0gT2JqZWN0LmtleXModGl0bGVzKS5zb3J0KCh0aXRsZTEsIHRpdGxlMikgPT4gdGl0bGVzW3RpdGxlMV0gLSB0aXRsZXNbdGl0bGUyXSlbMF1cclxuXHJcbiAgICAgICAgbGV0IHVybCA9IG51bGxcclxuICAgICAgICBpZiAoZG9jdW1lbnQ/LmxvY2F0aW9uPy5ocmVmKSB7XHJcbiAgICAgICAgICAgIHVybCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYubWF0Y2goL2h0dHBzPzpcXC9cXC9bXi9dKlxcL1teL10qXFwvW14vXSpcXC8vKT8uWzBdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKCdyZWFwZXJzY2Fucy5jb20nKSkge1xyXG4gICAgICAgICAgICB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLm1hdGNoKC9odHRwLipcXC9zZXJpZXNcXC9bXi9dKlxcLy8pPy5bMF1cclxuICAgICAgICAgICAgdGl0bGUgPSB0aXRsZS5zcGxpdCgnIOKAkyAnKVswXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ21hZGFyYScsXHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgdXJsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHRcclxuXHJcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QgPT09ICdmYW5mb3gubmV0Jykge1xyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RGYW5Gb3goKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmlubmVySFRNTC5pbmNsdWRlcygnUG93ZXJlZCBieSBHZW5rYW4uJykpIHtcclxuICAgICAgICByZXN1bHQgPSB0ZXN0R2Vua2FuKClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluY2x1ZGVzKCdhc3VyYXNjYW5zLmNvbScpKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gdGVzdEFzdXJhKClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluY2x1ZGVzKCdsZXZpYXRhbnNjYW5zLmNvbScpIHx8IHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluY2x1ZGVzKCdpbW1vcnRhbHVwZGF0ZXMuY29tJykpIHtcclxuICAgICAgICByZXN1bHQgPSB0ZXN0TGV2aWF0aGFuKClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09PSAnbWFuZ2FkZXgub3JnJykge1xyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RNYW5nYWRleCgpXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXN1bHQgPSB0ZXN0TWFkYXJvKClcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpXHJcblxyXG4gICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHJlc3VsdClcclxuICAgIH1cclxufVxyXG5cclxuIiwiZXhwb3J0IGNvbnN0IEFQSV9BRERSRVNTID0gJ2h0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20nIC8vICdodHRwOi8vbG9jYWxob3N0OjQzMjE0J1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gaW5pdEludHJvICgpIHtcclxuICAgIGNvbnN0IGJvb2ttYXJrSW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50cm8tYm9va21hcmsnKVxyXG4gICAgYm9va21hcmtJbWFnZS5zcmMgPSBjaHJvbWUucnVudGltZS5nZXRVUkwoJ2ltYWdlcy9ib29rbWFyay1zYW1wbGUucG5nJylcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVEQiB9IGZyb20gJy4uL2NvbW1vbi9kYidcclxuXHJcbmZ1bmN0aW9uIHJlYWQgKG5hbWVzcGFjZSwga2V5cykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBjaHJvbWUuc3RvcmFnZVtuYW1lc3BhY2VdLmdldChrZXlzLCByZXNvbHZlKSlcclxufVxyXG5cclxuZnVuY3Rpb24gd3JpdGUgKG5hbWVzcGFjZSwga2V5UGFpcnMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gY2hyb21lLnN0b3JhZ2VbbmFtZXNwYWNlXS5zZXQoa2V5UGFpcnMsIHJlc29sdmUpKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRMaXN0ZW5lciAoY2FsbGJhY2spIHtcclxuICAgIHJldHVybiBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoY2FsbGJhY2spXHJcbn1cclxuXHJcbmNvbnN0IHN0b3JhZ2UgPSB7XHJcbiAgICByZWFkLCB3cml0ZSwgYWRkTGlzdGVuZXJcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRiID0gY3JlYXRlREIoc3RvcmFnZSlcclxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qIEZpbGVTYXZlci5qc1xyXG4gKiBBIHNhdmVBcygpIEZpbGVTYXZlciBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxyXG4gKiBFUzZpZmllZCBieSBDb2xlIENoYW1iZXJsYWluLCBodHRwczovL2dpdGh1Yi5jb20vY2NoYW1iZXJsYWluXHJcbiAqXHJcbiAqIExpY2Vuc2U6IE1JVFxyXG4gKiAgIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxyXG4gKi9cblxuLypnbG9iYWwgc2VsZiAqL1xuLypqc2xpbnQgYml0d2lzZTogdHJ1ZSwgaW5kZW50OiA0LCBsYXhicmVhazogdHJ1ZSwgbGF4Y29tbWE6IHRydWUsIHNtYXJ0dGFiczogdHJ1ZSwgcGx1c3BsdXM6IHRydWUgKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9GaWxlU2F2ZXIuanMgKi9cblxudmFyIHNhdmVBcyA9IGV4cG9ydHMuc2F2ZUFzID0gd2luZG93LnNhdmVBcyB8fCBmdW5jdGlvbiAodmlldykge1xuICAvLyBJRSA8MTAgaXMgZXhwbGljaXRseSB1bnN1cHBvcnRlZFxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL01TSUUgWzEtOV1cXC4vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHJldHVybjtcbiAgdmFyIGRvYyA9IHZpZXcuZG9jdW1lbnQ7XG4gIC8vIG9ubHkgZ2V0IFVSTCB3aGVuIG5lY2Vzc2FyeSBpbiBjYXNlIEJsb2IuanMgaGFzbid0IG92ZXJyaWRkZW4gaXQgeWV0XG4gIHZhciBnZXRfVVJMID0gZnVuY3Rpb24gZ2V0X1VSTCgpIHtcbiAgICByZXR1cm4gdmlldy5VUkwgfHwgdmlldy53ZWJraXRVUkwgfHwgdmlldztcbiAgfTtcbiAgdmFyIHNhdmVfbGluayA9IGRvYy5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCAnYScpO1xuICB2YXIgY2FuX3VzZV9zYXZlX2xpbmsgPSAnZG93bmxvYWQnIGluIHNhdmVfbGluaztcbiAgdmFyIGNsaWNrID0gZnVuY3Rpb24gY2xpY2sobm9kZSkge1xuICAgIHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KCdjbGljaycpO1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH07XG4gIHZhciBpc19zYWZhcmkgPSAvVmVyc2lvblxcL1tcXGRcXC5dKy4qU2FmYXJpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICB2YXIgd2Via2l0X3JlcV9mcyA9IHZpZXcud2Via2l0UmVxdWVzdEZpbGVTeXN0ZW07XG4gIHZhciByZXFfZnMgPSB2aWV3LnJlcXVlc3RGaWxlU3lzdGVtIHx8IHdlYmtpdF9yZXFfZnMgfHwgdmlldy5tb3pSZXF1ZXN0RmlsZVN5c3RlbTtcbiAgdmFyIHRocm93X291dHNpZGUgPSBmdW5jdGlvbiB0aHJvd19vdXRzaWRlKGV4KSB7XG4gICAgKHZpZXcuc2V0SW1tZWRpYXRlIHx8IHZpZXcuc2V0VGltZW91dCkoZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgZXg7XG4gICAgfSwgMCk7XG4gIH07XG4gIHZhciBmb3JjZV9zYXZlYWJsZV90eXBlID0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XG4gIHZhciBmc19taW5fc2l6ZSA9IDA7XG4gIC8vIHRoZSBCbG9iIEFQSSBpcyBmdW5kYW1lbnRhbGx5IGJyb2tlbiBhcyB0aGVyZSBpcyBubyBcImRvd25sb2FkZmluaXNoZWRcIiBldmVudCB0byBzdWJzY3JpYmUgdG9cbiAgdmFyIGFyYml0cmFyeV9yZXZva2VfdGltZW91dCA9IDEwMDAgKiA0MDsgLy8gaW4gbXNcbiAgdmFyIHJldm9rZSA9IGZ1bmN0aW9uIHJldm9rZShmaWxlKSB7XG4gICAgdmFyIHJldm9rZXIgPSBmdW5jdGlvbiByZXZva2VyKCkge1xuICAgICAgaWYgKHR5cGVvZiBmaWxlID09PSAnc3RyaW5nJykgLy8gZmlsZSBpcyBhbiBvYmplY3QgVVJMXG4gICAgICAgIGdldF9VUkwoKS5yZXZva2VPYmplY3RVUkwoZmlsZSk7ZWxzZSAvLyBmaWxlIGlzIGEgRmlsZVxuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH07XG4gICAgLyogLy8gVGFrZSBub3RlIFczQzpcclxuICAgIHZhclxyXG4gICAgICB1cmkgPSB0eXBlb2YgZmlsZSA9PT0gXCJzdHJpbmdcIiA/IGZpbGUgOiBmaWxlLnRvVVJMKClcclxuICAgICwgcmV2b2tlciA9IGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgICAvLyBpZGVhbHkgRG93bmxvYWRGaW5pc2hlZEV2ZW50LmRhdGEgd291bGQgYmUgdGhlIFVSTCByZXF1ZXN0ZWRcclxuICAgICAgaWYgKGV2dC5kYXRhID09PSB1cmkpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGZpbGUgPT09IFwic3RyaW5nXCIpIHsgLy8gZmlsZSBpcyBhbiBvYmplY3QgVVJMXHJcbiAgICAgICAgICBnZXRfVVJMKCkucmV2b2tlT2JqZWN0VVJMKGZpbGUpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIGZpbGUgaXMgYSBGaWxlXHJcbiAgICAgICAgICBmaWxlLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKFwiZG93bmxvYWRmaW5pc2hlZFwiLCByZXZva2VyKTtcclxuICAgICovXG4gICAgc2V0VGltZW91dChyZXZva2VyLCBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQpO1xuICB9O1xuICB2YXIgZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaChmaWxlc2F2ZXIsIGV2ZW50X3R5cGVzLCBldmVudCkge1xuICAgIGV2ZW50X3R5cGVzID0gW10uY29uY2F0KGV2ZW50X3R5cGVzKTtcbiAgICB2YXIgaSA9IGV2ZW50X3R5cGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBmaWxlc2F2ZXJbJ29uJyArIGV2ZW50X3R5cGVzW2ldXTtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsaXN0ZW5lci5jYWxsKGZpbGVzYXZlciwgZXZlbnQgfHwgZmlsZXNhdmVyKTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICB0aHJvd19vdXRzaWRlKGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgdmFyIGF1dG9fYm9tID0gZnVuY3Rpb24gYXV0b19ib20oYmxvYikge1xuICAgIC8vIHByZXBlbmQgQk9NIGZvciBVVEYtOCBYTUwgYW5kIHRleHQvKiB0eXBlcyAoaW5jbHVkaW5nIEhUTUwpXG4gICAgaWYgKC9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGJsb2IudHlwZSkpIHJldHVybiBuZXcgQmxvYihbJ++7vycsIGJsb2JdLCB7IHR5cGU6IGJsb2IudHlwZSB9KTtcbiAgICByZXR1cm4gYmxvYjtcbiAgfTtcblxuICB2YXIgRmlsZVNhdmVyID0gZnVuY3Rpb24gRmlsZVNhdmVyKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZpbGVTYXZlcik7XG5cbiAgICBpZiAoIW5vX2F1dG9fYm9tKSBibG9iID0gYXV0b19ib20oYmxvYik7XG4gICAgLy8gRmlyc3QgdHJ5IGEuZG93bmxvYWQsIHRoZW4gd2ViIGZpbGVzeXN0ZW0sIHRoZW4gb2JqZWN0IFVSTHNcbiAgICB2YXIgZmlsZXNhdmVyID0gdGhpcyxcbiAgICAgICAgdHlwZSA9IGJsb2IudHlwZSxcbiAgICAgICAgYmxvYl9jaGFuZ2VkID0gZmFsc2UsXG4gICAgICAgIG9iamVjdF91cmwsXG4gICAgICAgIHRhcmdldF92aWV3LFxuICAgICAgICBkaXNwYXRjaF9hbGwgPSBmdW5jdGlvbiBkaXNwYXRjaF9hbGwoKSB7XG4gICAgICBkaXNwYXRjaChmaWxlc2F2ZXIsICd3cml0ZXN0YXJ0IHByb2dyZXNzIHdyaXRlIHdyaXRlZW5kJy5zcGxpdCgnICcpKTtcbiAgICB9XG4gICAgLy8gb24gYW55IGZpbGVzeXMgZXJyb3JzIHJldmVydCB0byBzYXZpbmcgd2l0aCBvYmplY3QgVVJMc1xuICAgICxcbiAgICAgICAgZnNfZXJyb3IgPSBmdW5jdGlvbiBmc19lcnJvcigpIHtcbiAgICAgIGlmICh0YXJnZXRfdmlldyAmJiBpc19zYWZhcmkgJiYgdHlwZW9mIEZpbGVSZWFkZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFNhZmFyaSBkb2Vzbid0IGFsbG93IGRvd25sb2FkaW5nIG9mIGJsb2IgdXJsc1xuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgYmFzZTY0RGF0YSA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICAgICAgdGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9ICdkYXRhOmF0dGFjaG1lbnQvZmlsZScgKyBiYXNlNjREYXRhLnNsaWNlKGJhc2U2NERhdGEuc2VhcmNoKC9bLDtdLykpO1xuICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5JTklUO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBkb24ndCBjcmVhdGUgbW9yZSBvYmplY3QgVVJMcyB0aGFuIG5lZWRlZFxuICAgICAgaWYgKGJsb2JfY2hhbmdlZCB8fCAhb2JqZWN0X3VybCkge1xuICAgICAgICBvYmplY3RfdXJsID0gZ2V0X1VSTCgpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIH1cbiAgICAgIGlmICh0YXJnZXRfdmlldykge1xuICAgICAgICB0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gb2JqZWN0X3VybDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXdfdGFiID0gdmlldy5vcGVuKG9iamVjdF91cmwsICdfYmxhbmsnKTtcbiAgICAgICAgaWYgKG5ld190YWIgPT09IHVuZGVmaW5lZCAmJiBpc19zYWZhcmkpIHtcbiAgICAgICAgICAvL0FwcGxlIGRvIG5vdCBhbGxvdyB3aW5kb3cub3Blbiwgc2VlIGh0dHA6Ly9iaXQubHkvMWtaZmZSSVxuICAgICAgICAgIHZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICBkaXNwYXRjaF9hbGwoKTtcbiAgICAgIHJldm9rZShvYmplY3RfdXJsKTtcbiAgICB9LFxuICAgICAgICBhYm9ydGFibGUgPSBmdW5jdGlvbiBhYm9ydGFibGUoZnVuYykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGZpbGVzYXZlci5yZWFkeVN0YXRlICE9PSBmaWxlc2F2ZXIuRE9ORSkge1xuICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcbiAgICAgICAgY3JlYXRlX2lmX25vdF9mb3VuZCA9IHsgY3JlYXRlOiB0cnVlLCBleGNsdXNpdmU6IGZhbHNlIH0sXG4gICAgICAgIHNsaWNlO1xuXG4gICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuSU5JVDtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIG5hbWUgPSAnZG93bmxvYWQnO1xuICAgIH1cbiAgICBpZiAoY2FuX3VzZV9zYXZlX2xpbmspIHtcbiAgICAgIG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNhdmVfbGluay5ocmVmID0gb2JqZWN0X3VybDtcbiAgICAgICAgc2F2ZV9saW5rLmRvd25sb2FkID0gbmFtZTtcbiAgICAgICAgY2xpY2soc2F2ZV9saW5rKTtcbiAgICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICAgIHJldm9rZShvYmplY3RfdXJsKTtcbiAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBPYmplY3QgYW5kIHdlYiBmaWxlc3lzdGVtIFVSTHMgaGF2ZSBhIHByb2JsZW0gc2F2aW5nIGluIEdvb2dsZSBDaHJvbWUgd2hlblxuICAgIC8vIHZpZXdlZCBpbiBhIHRhYiwgc28gSSBmb3JjZSBzYXZlIHdpdGggYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXG4gICAgLy8gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9OTExNThcbiAgICAvLyBVcGRhdGU6IEdvb2dsZSBlcnJhbnRseSBjbG9zZWQgOTExNTgsIEkgc3VibWl0dGVkIGl0IGFnYWluOlxuICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zODk2NDJcbiAgICBpZiAodmlldy5jaHJvbWUgJiYgdHlwZSAmJiB0eXBlICE9PSBmb3JjZV9zYXZlYWJsZV90eXBlKSB7XG4gICAgICBzbGljZSA9IGJsb2Iuc2xpY2UgfHwgYmxvYi53ZWJraXRTbGljZTtcbiAgICAgIGJsb2IgPSBzbGljZS5jYWxsKGJsb2IsIDAsIGJsb2Iuc2l6ZSwgZm9yY2Vfc2F2ZWFibGVfdHlwZSk7XG4gICAgICBibG9iX2NoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBTaW5jZSBJIGNhbid0IGJlIHN1cmUgdGhhdCB0aGUgZ3Vlc3NlZCBtZWRpYSB0eXBlIHdpbGwgdHJpZ2dlciBhIGRvd25sb2FkXG4gICAgLy8gaW4gV2ViS2l0LCBJIGFwcGVuZCAuZG93bmxvYWQgdG8gdGhlIGZpbGVuYW1lLlxuICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD02NTQ0MFxuICAgIGlmICh3ZWJraXRfcmVxX2ZzICYmIG5hbWUgIT09ICdkb3dubG9hZCcpIHtcbiAgICAgIG5hbWUgKz0gJy5kb3dubG9hZCc7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBmb3JjZV9zYXZlYWJsZV90eXBlIHx8IHdlYmtpdF9yZXFfZnMpIHtcbiAgICAgIHRhcmdldF92aWV3ID0gdmlldztcbiAgICB9XG4gICAgaWYgKCFyZXFfZnMpIHtcbiAgICAgIGZzX2Vycm9yKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZzX21pbl9zaXplICs9IGJsb2Iuc2l6ZTtcbiAgICByZXFfZnModmlldy5URU1QT1JBUlksIGZzX21pbl9zaXplLCBhYm9ydGFibGUoZnVuY3Rpb24gKGZzKSB7XG4gICAgICBmcy5yb290LmdldERpcmVjdG9yeSgnc2F2ZWQnLCBjcmVhdGVfaWZfbm90X2ZvdW5kLCBhYm9ydGFibGUoZnVuY3Rpb24gKGRpcikge1xuICAgICAgICB2YXIgc2F2ZSA9IGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgICAgICAgZGlyLmdldEZpbGUobmFtZSwgY3JlYXRlX2lmX25vdF9mb3VuZCwgYWJvcnRhYmxlKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgICAgICBmaWxlLmNyZWF0ZVdyaXRlcihhYm9ydGFibGUoZnVuY3Rpb24gKHdyaXRlcikge1xuICAgICAgICAgICAgICB3cml0ZXIub253cml0ZWVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSBmaWxlLnRvVVJMKCk7XG4gICAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChmaWxlc2F2ZXIsICd3cml0ZWVuZCcsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICByZXZva2UoZmlsZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHdyaXRlci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHdyaXRlci5lcnJvcjtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSAhPT0gZXJyb3IuQUJPUlRfRVJSKSB7XG4gICAgICAgICAgICAgICAgICBmc19lcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgJ3dyaXRlc3RhcnQgcHJvZ3Jlc3Mgd3JpdGUgYWJvcnQnLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB3cml0ZXJbJ29uJyArIGV2ZW50XSA9IGZpbGVzYXZlclsnb24nICsgZXZlbnRdO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3JpdGVyLndyaXRlKGJsb2IpO1xuICAgICAgICAgICAgICBmaWxlc2F2ZXIuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgd3JpdGVyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuV1JJVElORztcbiAgICAgICAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgICAgICAgfSksIGZzX2Vycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyLmdldEZpbGUobmFtZSwgeyBjcmVhdGU6IGZhbHNlIH0sIGFib3J0YWJsZShmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgIC8vIGRlbGV0ZSBmaWxlIGlmIGl0IGFscmVhZHkgZXhpc3RzXG4gICAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgICAgICBzYXZlKCk7XG4gICAgICAgIH0pLCBhYm9ydGFibGUoZnVuY3Rpb24gKGV4KSB7XG4gICAgICAgICAgaWYgKGV4LmNvZGUgPT09IGV4Lk5PVF9GT1VORF9FUlIpIHtcbiAgICAgICAgICAgIHNhdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnNfZXJyb3IoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgfSksIGZzX2Vycm9yKTtcbiAgfTtcblxuICB2YXIgRlNfcHJvdG8gPSBGaWxlU2F2ZXIucHJvdG90eXBlO1xuICB2YXIgc2F2ZUFzID0gZnVuY3Rpb24gc2F2ZUFzKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG4gICAgcmV0dXJuIG5ldyBGaWxlU2F2ZXIoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pO1xuICB9O1xuXG4gIC8vIElFIDEwKyAobmF0aXZlIHNhdmVBcylcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuICAgICAgaWYgKCFub19hdXRvX2JvbSkgYmxvYiA9IGF1dG9fYm9tKGJsb2IpO1xuICAgICAgcmV0dXJuIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGJsb2IsIG5hbWUgfHwgJ2Rvd25sb2FkJyk7XG4gICAgfTtcbiAgfVxuXG4gIEZTX3Byb3RvLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmaWxlc2F2ZXIgPSB0aGlzO1xuICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgZGlzcGF0Y2goZmlsZXNhdmVyLCAnYWJvcnQnKTtcbiAgfTtcbiAgRlNfcHJvdG8ucmVhZHlTdGF0ZSA9IEZTX3Byb3RvLklOSVQgPSAwO1xuICBGU19wcm90by5XUklUSU5HID0gMTtcbiAgRlNfcHJvdG8uRE9ORSA9IDI7XG5cbiAgRlNfcHJvdG8uZXJyb3IgPSBGU19wcm90by5vbndyaXRlc3RhcnQgPSBGU19wcm90by5vbnByb2dyZXNzID0gRlNfcHJvdG8ub253cml0ZSA9IEZTX3Byb3RvLm9uYWJvcnQgPSBGU19wcm90by5vbmVycm9yID0gRlNfcHJvdG8ub253cml0ZWVuZCA9IG51bGw7XG5cbiAgcmV0dXJuIHNhdmVBcztcbn0odHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgfHwgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93IHx8IHVuZGVmaW5lZC5jb250ZW50KTtcbi8vIGBzZWxmYCBpcyB1bmRlZmluZWQgaW4gRmlyZWZveCBmb3IgQW5kcm9pZCBjb250ZW50IHNjcmlwdCBjb250ZXh0XG4vLyB3aGlsZSBgdGhpc2AgaXMgbnNJQ29udGVudEZyYW1lTWVzc2FnZU1hbmFnZXJcbi8vIHdpdGggYW4gYXR0cmlidXRlIGBjb250ZW50YCB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSB3aW5kb3dcblxuZXhwb3J0cy5kZWZhdWx0ID0gc2F2ZUFzOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcydcbmltcG9ydCB7IHRlc3RCb29rbWFyayB9IGZyb20gJy4vYm9va21hcmsnXG5pbXBvcnQgeyBhZGRJbXBvcnRIYW5kbGVycyB9IGZyb20gJy4uL2NvbW1vbi9pbXBvcnQnXG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vc3RvcmFnZSdcbmltcG9ydCB7IHVybFJlbmRlcmVyIH0gZnJvbSAnLi4vY29tbW9uL3VybHMnXG5pbXBvcnQgeyBzb3VyY2VSZW5kZXJlciB9IGZyb20gJy4uL2NvbW1vbi9zb3VyY2VzJ1xuaW1wb3J0IHsgbWFya1JlZnJlc2hlZCwgcmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIsIHVwZGF0ZVByb2dyZXNzIH0gZnJvbSAnLi4vY29tbW9uL3Byb2dyZXNzLWJhcidcbmltcG9ydCB7IGNyZWF0ZVNjaGVkdWxlIH0gZnJvbSAnLi4vY29tbW9uL3NjaGVkdWxlJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZW51TGlzdGVuZXJzIH0gZnJvbSAnLi4vY29tbW9uL21lbnUnXG5pbXBvcnQgeyBhZGRTZXR0aW5nc0hhbmRsZXJzIH0gZnJvbSAnLi4vY29tbW9uL3NldHRpbmdzJ1xuaW1wb3J0IHsgQVBJIH0gZnJvbSAnLi4vY29tbW9uL2FwaSdcbmltcG9ydCB7IEFQSV9BRERSRVNTIH0gZnJvbSAnLi9jb25zdGFudHMnXG5pbXBvcnQgeyBpbml0SW50cm8gfSBmcm9tICcuL2ludHJvJ1xuaW1wb3J0IHsgcmVuZGVySG9zdExpc3QgfSBmcm9tICcuLi9jb21tb24vaG9zdHMnXG5cbmNvbnN0IGFwaSA9IEFQSShBUElfQUREUkVTUylcblxuZGIudXJscy5zZXRNYXhPbGQoMTAwKVxuXG5jb25zdCBVcmxzID0gdXJsUmVuZGVyZXIoZGIpXG5jb25zdCBTb3VyY2VzID0gc291cmNlUmVuZGVyZXIoZGIpXG5cbmRiLm9uQ2hhbmdlKChjaGFuZ2VzKSA9PiB7XG4gICAgaWYgKFsnaGlkZScsICdoaWRkZW5DaGFwdGVycycsICd1cmxzJ10uc29tZShjaGFuZ2VzLmhhc093blByb3BlcnR5LmJpbmQoY2hhbmdlcykpKSB7XG4gICAgICAgIFVybHMucmVuZGVyKClcbiAgICB9XG4gICAgaWYgKE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUoKGNoYW5nZSkgPT4gY2hhbmdlLmluY2x1ZGVzKCdzb3VyY2VzJykpIHx8IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjaGFuZ2VzLCAnbWF4T2xkJykpIHtcbiAgICAgICAgU291cmNlcy5yZW5kZXIoKVxuICAgIH1cbn0pXG5cbm5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIucG9zdE1lc3NhZ2UoJ0ZFVENIX0NIQVBURVJTJylcbm1hcmtSZWZyZXNoZWQoKVxuXG5jb25zdCBpbnRlcnZhbCA9IGNyZWF0ZVNjaGVkdWxlKHtcbiAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5jb250cm9sbGVyLnBvc3RNZXNzYWdlKCdGRVRDSF9DSEFQVEVSUycpXG4gICAgICAgIG1hcmtSZWZyZXNoZWQoKVxuICAgIH0sXG4gICAgaW50ZXJ2YWw6IDYwICogMTAwMCxcbiAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICB1cGRhdGVyOiB1cGRhdGVQcm9ncmVzc1xufSlcblxuaW5pdEludHJvKClcbnJlc2lzdGVyUHJvZ3Jlc3NIYW5kbGVyKCgpID0+IGludGVydmFsLnRyaWdnZXJJbnN0YW50bHkoKSlcbmFkZEltcG9ydEhhbmRsZXJzKGRiKVxuYWRkU2V0dGluZ3NIYW5kbGVycyhkYiwgYXBpKVxucmVnaXN0ZXJNZW51TGlzdGVuZXJzKGRiLCBhcGkpXG5yZW5kZXJIb3N0TGlzdChkYiwgYXBpKVxuXG5VcmxzLnJlbmRlcigpXG5Tb3VyY2VzLnJlbmRlcigpXG4gICAgLnRoZW4odGVzdEJvb2ttYXJrKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==