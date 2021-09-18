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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2RiLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vaG9zdHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9pbXBvcnQuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9tZW51LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vcHJvZ3Jlc3MtYmFyLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vc2NoZWR1bGUuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3NvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi91cmxzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9ib29rbWFyay5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL2ludHJvLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9leHRlbnNpb24vc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL25vZGVfbW9kdWxlcy9zYXZlLWFzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21hbmdhY2hlY2tlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9wb3B1cC5qcyJdLCJuYW1lcyI6WyJBUEkiLCJiYXNlVXJsIiwicG9zdFNvdXJjZSIsInNvdXJjZSIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwiQWNjZXB0IiwidGhlbiIsInJlcyIsImpzb24iLCJjYXRjaCIsImVycm9yIiwidmFsaWQiLCJkYXRhIiwicGF5bG9hZCIsImFkZFNvdXJjZUZyb21VcmwiLCJ1cmwiLCJyZWFkVXJscyIsInNvdXJjZXMiLCJsaW1pdCIsImRhdGUiLCJhZGRTdWJzY3JpcHRpb25zIiwidG9waWNzIiwia2V5IiwiZGVsZXRlU3Vic2NyaXB0aW9ucyIsInJlYWRMaW5rIiwiY2hhbmdlZFNpbmNlIiwic3RhdHVzIiwicmVhZEhvc3RzIiwidXBkYXRlTGluayIsInVwZGF0ZVNldCIsImNyZWF0ZUxpbmsiLCJpbml0U2V0IiwiVXJscyIsInJlYWQiLCJTb3VyY2UiLCJpbnNlcnQiLCJmcm9tVXJsIiwiU3Vic2NyaXB0aW9uIiwic3Vic2NyaWJlIiwidW5zdWJzY3JpYmUiLCJMaW5rIiwidXBkYXRlIiwiSG9zdHMiLCJOQU1FU1BBQ0VTIiwiU1lOQyIsIkxPQ0FMIiwiY3JlYXRlREIiLCJzdG9yYWdlIiwid3JpdGUiLCJyZWFkU291cmNlcyIsInJlZ2lzdHJ5IiwicGFyc2UiLCJyZWR1Y2UiLCJQcm9taXNlIiwiYWxsIiwiY29uY2F0IiwicmVzb2x2ZSIsIndyaXRlU291cmNlcyIsInVwZGF0ZXMiLCJ4IiwiTWF0aCIsIm1heCIsImNlaWwiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJhZGRTb3VyY2UiLCJzb21lIiwibWFuZ2FJZCIsImRlbGV0ZVNvdXJjZSIsInNvdXJjZUlkIiwibmV3U291cmNlcyIsImZpbHRlciIsImlkIiwiaXNEaXJ0eSIsInVybHMiLCJnZXRGaWx0ZXJlZFNvcnRlZFVybHMiLCJoaWRkZW5DaGFwdGVycyIsImhpZGUiLCJoaWRkZW5DaGFwdGVyc1N0cmluZyIsInVybExpc3QiLCJjaGVja09sZCIsImNoYXB0ZXIiLCJjcmVhdGVkIiwiT2JqZWN0IiwidmFsdWVzIiwic29ydCIsInVybDEiLCJ1cmwyIiwiZGlmZiIsImFicyIsIlN0cmluZyIsImxvY2FsZUNvbXBhcmUiLCJvbGRVcmxzIiwibmV3VXJscyIsImhpZGVVcmwiLCJyZXN1bHQiLCJoaWRlQWxsVXJscyIsInRpbWVzdGFtcCIsIndyaXRlVXJscyIsImluaXQiLCJ0b2RheSIsIkRhdGUiLCJzZXRIb3VycyIsImdldFRpbWUiLCJzZXRNYXhPbGQiLCJtYXhPbGQiLCJnZXRNYXhPbGQiLCJzZXRMaW5rIiwibGluayIsImdldExpbmsiLCJnZXRIaWRlIiwid3JpdGVMb2NhbFNldHRpbmdzIiwic2V0dGluZ3MiLCJsb2NhbFNldHRpbmdzIiwiZ2V0TG9jYWxTZXR0aW5ncyIsImdldExpbmtEYXRhIiwibWFwIiwiTnVtYmVyIiwic2V0TGlua0RhdGEiLCJzdG9yZWRTb3VyY2VzIiwic3MiLCJoYXNDaGFuZ2VkU291cmNlcyIsImtleXMiLCJwcm9taXNlcyIsImhpZGRlbiIsImltcG9ydCIsImFkZCIsImRlbGV0ZSIsImxvY2FsIiwic2V0IiwiaGlkZUFsbCIsIm9uQ2hhbmdlIiwiYWRkTGlzdGVuZXIiLCJzZXRMb2NhbCIsInJlbmRlckhvc3RMaXN0IiwiX2RiIiwiYXBpIiwiaG9zdENvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhvc3RzIiwiaG9zdExpc3QiLCJzdGFibGUiLCJhIiwiYiIsIm5hbWUiLCJob3N0Iiwiam9pbiIsImlubmVySFRNTCIsInVuc3RhYmxlIiwiYWRkSW1wb3J0SGFuZGxlcnMiLCJkYiIsImltcG9ydEVsZW0iLCJnZXRFbGVtZW50QnlJZCIsImV4cG9ydEVsZW0iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZpbGUiLCJ0YXJnZXQiLCJmaWxlcyIsImZyIiwiRmlsZVJlYWRlciIsImNsZWFuIiwidGl0bGUiLCJyZWFkQXNUZXh0IiwiYmxvYiIsIkJsb2IiLCJ0eXBlIiwic2F2ZUFzIiwicmVnaXN0ZXJNZW51TGlzdGVuZXJzIiwiQXBpIiwiaW1wb3J0U2VjdGlvbiIsInBvcHVwVGl0bGUiLCJib29rbWFya3MiLCJjaGFwdGVycyIsImFkZFNlY3Rpb24iLCJzZXR0aW5nc1NlY3Rpb24iLCJwcm9ncmVzcyIsImludHJvIiwib3BlbkNoYXB0ZXJzIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5uZXJUZXh0Iiwib3BlblNldHRpbmdzIiwiZ2V0TGlua1F1ZXJ5IiwibGlua0lmVW5saW5rZWQiLCJsb2NrZWQiLCJyZXNpc3RlclByb2dyZXNzSGFuZGxlciIsInVwZGF0ZU5vdyIsIm1hcmtSZWZyZXNoZWQiLCJkYXRhc2V0IiwiYmVmb3JlIiwic2V0VGltZW91dCIsInVwZGF0ZVByb2dyZXNzIiwiX2xhc3RQaW5nIiwibmV4dFBpbmciLCJyZW1haW5pbmciLCJub3ciLCJzZWNvbmRzIiwicm91bmQiLCJjcmVhdGVTY2hlZHVsZSIsImlzQWN0aXZlIiwiaW50ZXJ2YWwiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwicHJvdG90eXBlIiwidXBkYXRlciIsImxhc3RQaW5nIiwiY2FsbENhbGxiYWNrIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsIm5ld0ludGVydmFsIiwiRXJyb3IiLCJzZXRDYWxsYmFjayIsImNiIiwic3RhcnQiLCJ0cmlnZ2VySW5zdGFudGx5Iiwic3RvcCIsImNsZWFySW50ZXJ2YWwiLCJsaW5rRmllbGRzIiwiZm9ybWF0S2V5IiwiZ2V0TGlua0hlbHBlcnMiLCJwdXNoTGlua1VwZGF0ZSIsImNoYW5nZXMiLCJjaGFuZ2VzZXQiLCJjaGFuZ2UiLCJpbmNsdWRlcyIsImZldGNoTGlua1VwZGF0ZSIsImxhc3RNb2RpZmllZCIsImlzVmFsaWRMaW5rS2V5IiwiY2xlYW5LZXkiLCJyZXBsYWNlQWxsIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJnZXQiLCJjdXJyZW50TGluayIsImxpbmtJbnB1dDEiLCJsaW5rSW5wdXQyIiwibGlua0lucHV0MyIsInZhbHVlIiwiY29ubmVjdFRvTGluayIsImxpbmtOdW1iZXJUZXh0IiwibGlua0xpbmsiLCJsaW5rTGlua1RleHQiLCJocmVmIiwiY29sb3IiLCJsaW5rTGlua1dhcm4iLCJ3YXJuTGlua0N1cnJlbnQiLCJ3YXJuTGlua05ldyIsImxpbmtFcnJvciIsImxpbmtQcm9ncmVzcyIsImxpbmtCdXR0b24iLCJkaXNhYmxlZCIsImxpbmtSZXN1bHQiLCJhZGRTZXR0aW5nc0hhbmRsZXJzIiwid3JpdGVTdGF0ZVRvRG9tIiwibGlua2luZ1NlY3Rpb24iLCJ1bmxpbmtTZWN0aW9uIiwidW5saW5rQnV0dG9uIiwibnVtYmVyIiwiZm9jdXMiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImxpbmtEYXRhIiwibmV3TGlua1Jlc3VsdCIsInVuZGVmaW5lZCIsInNvdXJjZVJlbmRlcmVyIiwiZXZlbnQiLCJjbG9zZXN0IiwiY29udGFpbnMiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJyZW5kZXJTb3VyY2VzIiwic291cmNlMSIsInNvdXJjZTIiLCJyZXBsYWNlIiwic3BsaXQiLCJyZW5kZXIiLCJ1cmxSZW5kZXJlciIsImxhdGVzdENoYXB0ZXJEYXRlIiwibGNkIiwiY2xvc2VzdEhpZGUiLCJjbG9zZXN0TGluayIsInByZXZlbnREZWZhdWx0Iiwib3BlbiIsImNsb3Nlc3RNb3JlIiwidG9wIiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsIm1heFNjcm9sbCIsInNjcm9sbEhlaWdodCIsIm9mZnNldEhlaWdodCIsInNjcm9sbFRvcCIsImNoZWNrVG9wQnV0dG9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY3JlYXRlVXJsUmVuZGVyZXIiLCJpc09sZCIsInRpbWVTdHJpbmciLCJwYWQiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJkYXRlU3RyaW5nIiwiZ2V0RGF0ZSIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJmdWxsRGF0ZSIsInRvSVNPU3RyaW5nIiwicmVuZGVyVXJscyIsIm5ld1Jvd3MiLCJvbGRSb3dzIiwic3RyaW5nIiwiZmFsbGJhY2siLCJubyIsImN1cnJlbnRTb3VyY2UiLCJib29rbWFyayIsImJvb2ttYXJrVHJhY2siLCJib29rbWFya1RpdGxlIiwiQVBJX0FERFJFU1MiLCJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwicmVxdWVzdCIsInRlc3RCb29rbWFyayIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsIndpbmRvd0lkIiwid2luZG93cyIsIldJTkRPV19JRF9DVVJSRU5UIiwic2NyaXB0aW5nIiwiZXhlY3V0ZVNjcmlwdCIsInRhYklkIiwiZnVuY3Rpb24iLCJ0ZXN0IiwiZGVjb2RlSFRNTEVudGl0aWVzIiwic3RyIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInRlc3RGYW5Gb3giLCJwYXRobmFtZSIsIm1hdGNoIiwib3JpZ2luIiwidGVzdEFzdXJhIiwiYnJlYWRjcnVtcExpbmsiLCJ0ZXN0TWFuZ2FkZXgiLCJ0ZXN0TGV2aWF0aGFuIiwiaGVhZGVyIiwidGl0bGVzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsInNjcmlwdCIsImhlYWRsaW5lIiwiZmluZCIsImgiLCJjaGlsZE5vZGVzIiwibm9kZSIsIm5vZGVUeXBlIiwidHJpbSIsInRpdGxlMSIsInRpdGxlMiIsInRlc3RNYWRhcm8iLCJpZHMiLCJtYW5nYSIsIm1hbmdhX2lkIiwiaWQxIiwiaWQyIiwiY29uc29sZSIsImxvZyIsInNlbmRNZXNzYWdlIiwiaW5pdEludHJvIiwiYm9va21hcmtJbWFnZSIsInNyYyIsImdldFVSTCIsIm5hbWVzcGFjZSIsImtleVBhaXJzIiwib25DaGFuZ2VkIiwiU291cmNlcyIsImhhc093blByb3BlcnR5IiwiYmluZCIsImNhbGwiLCJuYXZpZ2F0b3IiLCJzZXJ2aWNlV29ya2VyIiwiY29udHJvbGxlciIsInBvc3RNZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPLElBQU1BLEdBQUcsR0FBRyxTQUFOQSxHQUFNLEdBQWtCO0FBQUEsTUFBakJDLE9BQWlCLHVFQUFQLEVBQU87O0FBQ2pDLFdBQVNDLFVBQVQsQ0FBcUJDLE1BQXJCLEVBQTZCO0FBQ3pCLFdBQU9DLEtBQUssV0FBSUgsT0FBSixtQkFBMkI7QUFDbkNJLFlBQU0sRUFBRSxNQUQyQjtBQUVuQ0MsVUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUwsTUFBZixDQUY2QjtBQUduQ00sYUFBTyxFQUFFO0FBQ0xDLGNBQU0sRUFBRSxrQkFESDtBQUVMLHdCQUFnQjtBQUZYO0FBSDBCLEtBQTNCLENBQUwsQ0FRRkMsSUFSRSxDQVFHLFVBQUNDLEdBQUQ7QUFBQSxhQUFTQSxHQUFHLENBQUNDLElBQUosRUFBVDtBQUFBLEtBUkgsRUFTRkMsS0FURSxDQVNJLFVBQUNDLEtBQUQ7QUFBQSxhQUFZO0FBQUVDLGFBQUssRUFBRSxLQUFUO0FBQWdCRCxhQUFLLEVBQUxBO0FBQWhCLE9BQVo7QUFBQSxLQVRKLEVBVUZKLElBVkUsQ0FVRyxVQUFDTSxJQUFEO0FBQUEsYUFBVUEsSUFBSSxDQUFDQyxPQUFmO0FBQUEsS0FWSCxDQUFQO0FBV0g7O0FBRUQsV0FBU0MsZ0JBQVQsQ0FBMkJDLEdBQTNCLEVBQWdDO0FBQzVCLFdBQU9oQixLQUFLLFdBQUlILE9BQUosOEJBQXNDO0FBQzlDSSxZQUFN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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q2xCLHdDQUFELEVBQUtmLEdBQUwsQ0FBckI7QUFDQUYsOERBQWMsQ0FBQ2lCLHdDQUFELEVBQUtmLEdBQUwsQ0FBZDtBQUVBekcsSUFBSSxDQUFDd1AsTUFBTDtBQUNBcUcsT0FBTyxDQUFDckcsTUFBUixHQUNLbFIsSUFETCxDQUNVK1QsbURBRFYsRSIsImZpbGUiOiJleHRlbnNpb24vcG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQVBJID0gKGJhc2VVcmwgPSAnJykgPT4ge1xyXG4gICAgZnVuY3Rpb24gcG9zdFNvdXJjZSAoc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9zb3VyY2VzYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc291cmNlKSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5wYXlsb2FkKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFNvdXJjZUZyb21VcmwgKHVybCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc291cmNlcy9hZGRGcm9tVXJsYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB1cmwgfSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkVXJscyAoc291cmNlcyA9IFtdLCBsaW1pdCA9ICcnLCBkYXRlID0gJycpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXHJcbiAgICAgICAgICAgIGAke2Jhc2VVcmx9L2FwaS91cmxzL2ZldGNoYCxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlcyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLnBheWxvYWQgfHwgW10pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkU3Vic2NyaXB0aW9ucyAodG9waWNzID0gW10sIGtleSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc3Vic2NyaXB0aW9uc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHRvcGljcyxcclxuICAgICAgICAgICAgICAgIGtleToga2V5XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlU3Vic2NyaXB0aW9ucyAodG9waWNzID0gW10sIGtleSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc3Vic2NyaXB0aW9uc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZGVsZXRlJyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdG9waWNzLFxyXG4gICAgICAgICAgICAgICAga2V5OiBrZXlcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkTGluayAoa2V5LCBjaGFuZ2VkU2luY2UpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL2xpbmtzLyR7a2V5fSR7Y2hhbmdlZFNpbmNlID8gYD9jaGFuZ2VkU2luY2U9JHtjaGFuZ2VkU2luY2V9YCA6ICcnfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuc3RhdHVzID09PSAzMDQgPyAoeyB2YWxpZDogdHJ1ZSwgcGF5bG9hZDogbnVsbCB9KSA6IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZEhvc3RzICgpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3NvdXJjZXMvaG9zdHNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnN0YXR1cyA9PT0gMzA0ID8gKHsgdmFsaWQ6IHRydWUsIHBheWxvYWQ6IG51bGwgfSkgOiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGtleSwgdXBkYXRlU2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rcy8ke2tleX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3B1dCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZVNldCksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVMaW5rIChpbml0U2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluaXRTZXQpLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBVcmxzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRVcmxzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTb3VyY2U6IHtcclxuICAgICAgICAgICAgaW5zZXJ0OiBwb3N0U291cmNlLFxyXG4gICAgICAgICAgICBmcm9tVXJsOiBhZGRTb3VyY2VGcm9tVXJsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTdWJzY3JpcHRpb246IHtcclxuICAgICAgICAgICAgc3Vic2NyaWJlOiBhZGRTdWJzY3JpcHRpb25zLFxyXG4gICAgICAgICAgICB1bnN1YnNjcmliZTogZGVsZXRlU3Vic2NyaXB0aW9uc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTGluazoge1xyXG4gICAgICAgICAgICBpbnNlcnQ6IGNyZWF0ZUxpbmssXHJcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlTGluayxcclxuICAgICAgICAgICAgcmVhZDogcmVhZExpbmtcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhvc3RzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRIb3N0c1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBwYXJzZSB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5jb25zdCBOQU1FU1BBQ0VTID0ge1xyXG4gICAgU1lOQzogJ3N5bmMnLFxyXG4gICAgTE9DQUw6ICdsb2NhbCdcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURCIChzdG9yYWdlKSB7XHJcbiAgICBjb25zdCB7IHJlYWQsIHdyaXRlIH0gPSBzdG9yYWdlXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVhZFNvdXJjZXMgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgcmVnaXN0cnkgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IHJlZ2lzdHJ5OiAnW1wic291cmNlcy0xXCJdJyB9KVxyXG4gICAgICAgIHJldHVybiBwYXJzZShyZWdpc3RyeSwgWydzb3VyY2VzLTEnXSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoc291cmNlcywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3NvdXJjZXMsIHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IFtrZXldOiAnW10nIH0pXSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoW3NvdXJjZXMsIHNvdXJjZV0pID0+IHNvdXJjZXMuY29uY2F0KHBhcnNlKHNvdXJjZVtrZXldLCBbXSkpKVxyXG4gICAgICAgICAgICB9LCBQcm9taXNlLnJlc29sdmUoW10pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyaXRlU291cmNlcyAoc291cmNlcykge1xyXG4gICAgICAgIGNvbnN0IHJlZ2lzdHJ5ID0gW11cclxuICAgICAgICBjb25zdCB1cGRhdGVzID0ge31cclxuICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSBNYXRoLm1heCgxLCBNYXRoLmNlaWwoc291cmNlcy5sZW5ndGggLyAyMCkpOyB4KyspIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYHNvdXJjZXMtJHt4fWBcclxuICAgICAgICAgICAgcmVnaXN0cnkucHVzaChrZXkpXHJcbiAgICAgICAgICAgIHVwZGF0ZXNba2V5XSA9IEpTT04uc3RyaW5naWZ5KHNvdXJjZXMuc2xpY2UoKHggLSAxKSAqIDIwLCB4ICogMjApKVxyXG4gICAgICAgIH1cclxuICAgICAgICB1cGRhdGVzLnJlZ2lzdHJ5ID0gSlNPTi5zdHJpbmdpZnkocmVnaXN0cnkpXHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgdXBkYXRlcylcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBhZGRTb3VyY2UgKHNvdXJjZSkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCByZWFkU291cmNlcygpXHJcbiAgICAgICAgaWYgKCFzb3VyY2VzLnNvbWUoKHt1cmwsIG1hbmdhSWR9KSA9PiBzb3VyY2UudXJsID09PSB1cmwgJiYgbWFuZ2FJZCA9PT0gc291cmNlLm1hbmdhSWQpKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaChzb3VyY2UpXHJcbiAgICAgICAgICAgIGF3YWl0IHdyaXRlU291cmNlcyhzb3VyY2VzKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc291cmNlc1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVNvdXJjZSAoc291cmNlSWQpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgcmVhZFNvdXJjZXMoKVxyXG4gICAgICAgIGNvbnN0IG5ld1NvdXJjZXMgPSBzb3VyY2VzLmZpbHRlcigoc291cmNlKSA9PiBzb3VyY2U/LmlkICE9PSBzb3VyY2VJZClcclxuICAgICAgICBhd2FpdCB3cml0ZVNvdXJjZXMobmV3U291cmNlcylcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1NvdXJjZXNcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBpc0RpcnR5ICgpIHtcclxuICAgICAgICBjb25zdCB7IHVybHMsIHNvdXJjZXMgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgWyd1cmxzJywgJ3NvdXJjZXMnXSlcclxuXHJcbiAgICAgICAgcmV0dXJuICEhdXJscyB8fCAhIXNvdXJjZXNcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRGaWx0ZXJlZFNvcnRlZFVybHMgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaGlkZGVuQ2hhcHRlcnM6IGhpZGRlbkNoYXB0ZXJzU3RyaW5nLCBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JywgaGlkZTogMCB9KVxyXG4gICAgICAgIGNvbnN0IHsgdXJscyB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLkxPQ0FMLCB7IHVybHM6ICdbXScgfSlcclxuXHJcbiAgICAgICAgY29uc3QgaGlkZGVuQ2hhcHRlcnMgPSBwYXJzZShoaWRkZW5DaGFwdGVyc1N0cmluZywge30pXHJcbiAgICAgICAgY29uc3QgdXJsTGlzdCA9IHBhcnNlKHVybHMsIFtdKVxyXG5cclxuICAgICAgICBjb25zdCBjaGVja09sZCA9IChjaGFwdGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoaWRlICYmIGNoYXB0ZXIuY3JlYXRlZCA8IGhpZGUgfHwgaGlkZGVuQ2hhcHRlcnNbY2hhcHRlci5pZF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBbb2xkVXJscywgbmV3VXJsc10gPSBPYmplY3QudmFsdWVzKHVybExpc3QpXHJcbiAgICAgICAgICAgIC5zb3J0KCh1cmwxLCB1cmwyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaWZmID0gdXJsMi5jcmVhdGVkIC0gdXJsMS5jcmVhdGVkXHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZikgPCA1MDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKHVybDEpLmxvY2FsZUNvbXBhcmUodXJsMilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBkaWZmXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKFtvbGRVcmxzLCBuZXdVcmxzXSwgdXJsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tPbGQodXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9sZFVybHMucHVzaCh1cmwpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdVcmxzLnB1c2godXJsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtvbGRVcmxzLCBuZXdVcmxzXVxyXG4gICAgICAgICAgICB9LCBbW10sIFtdXSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgb2xkVXJscyxcclxuICAgICAgICAgICAgbmV3VXJsc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBoaWRlVXJsIChpZCkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nIH0pXHJcbiAgICAgICAgY29uc3QgaGlkZGVuQ2hhcHRlcnMgPSBwYXJzZShyZXN1bHQuaGlkZGVuQ2hhcHRlcnMsIHt9KVxyXG4gICAgICAgIGhpZGRlbkNoYXB0ZXJzW2lkXSA9IHRydWVcclxuICAgICAgICByZXR1cm4gd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiBKU09OLnN0cmluZ2lmeShoaWRkZW5DaGFwdGVycykgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBoaWRlQWxsVXJscyAodGltZXN0YW1wKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JywgaGlkZTogdGltZXN0YW1wIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd3JpdGVVcmxzICh1cmxzKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuTE9DQUwsIHsgdXJsczogSlNPTi5zdHJpbmdpZnkodXJscykgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBpbml0ICgpIHtcclxuICAgICAgICBjb25zdCB7IGhpZGUgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGU6IGZhbHNlIH0pXHJcbiAgICAgICAgaWYgKCFoaWRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKVxyXG4gICAgICAgICAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKVxyXG4gICAgICAgICAgICBhd2FpdCB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZTogdG9kYXkuZ2V0VGltZSgpfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2V0TWF4T2xkIChtYXhPbGQpIHtcclxuICAgICAgICBhd2FpdCB3cml0ZShOQU1FU1BBQ0VTLkxPQ0FMLCB7IG1heE9sZCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldE1heE9sZCAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBtYXhPbGQgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgeyBtYXhPbGQ6IDI1IH0pXHJcbiAgICAgICAgcmV0dXJuIG1heE9sZFxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldExpbmsgKGxpbmspIHtcclxuICAgICAgICBhd2FpdCB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgbGluayB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldExpbmsgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbGluayB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIFsnbGluayddKVxyXG4gICAgICAgIHJldHVybiBsaW5rXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0SGlkZSAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRlOiAwIH0pXHJcbiAgICAgICAgcmV0dXJuIGhpZGVcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiB3cml0ZUxvY2FsU2V0dGluZ3MgKHNldHRpbmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuTE9DQUwsIHsgbG9jYWxTZXR0aW5nczogSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYWxTZXR0aW5ncyAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBsb2NhbFNldHRpbmdzIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIHsgbG9jYWxTZXR0aW5nczogJ3t9JyB9KVxyXG4gICAgICAgIHJldHVybiBwYXJzZShsb2NhbFNldHRpbmdzLCB7fSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRMaW5rRGF0YSAoKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IHJlYWRTb3VyY2VzKClcclxuICAgICAgICBjb25zdCB7IGhpZGRlbkNoYXB0ZXJzOiBoaWRkZW5DaGFwdGVyc1N0cmluZywgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IDAgfSlcclxuICAgICAgICBjb25zdCBoaWRkZW5DaGFwdGVycyA9IHBhcnNlKGhpZGRlbkNoYXB0ZXJzU3RyaW5nLCB7fSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc291cmNlczogc291cmNlcy5tYXAoKHNvdXJjZSkgPT4gc291cmNlLmlkKSxcclxuICAgICAgICAgICAgaGlkZGVuQ2hhcHRlcnMsXHJcbiAgICAgICAgICAgIGhpZGU6IE51bWJlcihoaWRlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBzZXRMaW5rRGF0YSAoe3NvdXJjZXMsIGhpZGRlbkNoYXB0ZXJzLCBoaWRlfSkge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlZFNvdXJjZXMgPSAoYXdhaXQgcmVhZFNvdXJjZXMoKSkucmVkdWNlKChzcywgc291cmNlKSA9PiBzb3VyY2UgPyAoey4uLnNzLCBbc291cmNlLmlkXTogdHJ1ZX0pIDogc3MsIHt9KVxyXG4gICAgICAgIGNvbnN0IGhhc0NoYW5nZWRTb3VyY2VzID0gT2JqZWN0LmtleXMoc3RvcmVkU291cmNlcykubGVuZ3RoICE9PSBzb3VyY2VzLmxlbmd0aCB8fFxyXG4gICAgICAgICAgICBzb3VyY2VzLnNvbWUoKHNvdXJjZSkgPT4gIXN0b3JlZFNvdXJjZXNbc291cmNlLmlkXSlcclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtQcm9taXNlLnJlc29sdmUoKV1cclxuICAgICAgICBpZiAoaGFzQ2hhbmdlZFNvdXJjZXMpIHtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh3cml0ZVNvdXJjZXMoc291cmNlcykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhpZGRlbiA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nLCBoaWRlOiAwIH0pXHJcbiAgICAgICAgaWYgKGhpZGRlbi5oaWRkZW5DaGFwdGVycyAhPT0gSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ2hhcHRlcnMpIHx8IFN0cmluZyhoaWRkZW4uaGlkZSkgIT09IFN0cmluZyhoaWRlKSkge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHdyaXRlKE5BTUVTUEFDRVMuU1lOQywge1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuQ2hhcHRlcnM6IEpTT04uc3RyaW5naWZ5KGhpZGRlbkNoYXB0ZXJzKSxcclxuICAgICAgICAgICAgICAgIGhpZGVcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcylcclxuICAgIH1cclxuXHJcbiAgICBpbml0KClcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNvdXJjZXM6IHtcclxuICAgICAgICAgICAgcmVhZDogcmVhZFNvdXJjZXMsXHJcbiAgICAgICAgICAgIGltcG9ydDogd3JpdGVTb3VyY2VzLFxyXG4gICAgICAgICAgICBhZGQ6IGFkZFNvdXJjZSxcclxuICAgICAgICAgICAgZGVsZXRlOiBkZWxldGVTb3VyY2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIGxvY2FsOiB7XHJcbiAgICAgICAgICAgICAgICByZWFkOiBnZXRMb2NhbFNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgc2V0OiB3cml0ZUxvY2FsU2V0dGluZ3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNEaXJ0eSxcclxuICAgICAgICB1cmxzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IGdldEZpbHRlcmVkU29ydGVkVXJscyxcclxuICAgICAgICAgICAgaGlkZTogaGlkZVVybCxcclxuICAgICAgICAgICAgaGlkZUFsbDogaGlkZUFsbFVybHMsXHJcbiAgICAgICAgICAgIGltcG9ydDogd3JpdGVVcmxzLFxyXG4gICAgICAgICAgICBzZXRNYXhPbGQsXHJcbiAgICAgICAgICAgIGdldE1heE9sZCxcclxuICAgICAgICAgICAgZ2V0SGlkZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DaGFuZ2U6IHN0b3JhZ2UuYWRkTGlzdGVuZXIsXHJcbiAgICAgICAgbGluazoge1xyXG4gICAgICAgICAgICBzZXQ6IHNldExpbmssXHJcbiAgICAgICAgICAgIHJlYWQ6IGdldExpbmssXHJcbiAgICAgICAgICAgIGxvY2FsOiBnZXRMaW5rRGF0YSxcclxuICAgICAgICAgICAgc2V0TG9jYWw6IHNldExpbmtEYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW5kZXJIb3N0TGlzdCAoX2RiLCBhcGkpIHtcclxuICAgIGNvbnN0IHsgSG9zdHMgfSA9IGFwaVxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSG9zdHMucmVhZCgpXHJcbiAgICBjb25zdCBob3N0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvc3RzJylcclxuICAgIGlmIChyZXN1bHQudmFsaWQpIHtcclxuICAgICAgICBjb25zdCBob3N0cyA9IHJlc3VsdC5wYXlsb2FkXHJcblxyXG4gICAgICAgIGNvbnN0IGhvc3RMaXN0ID0gaG9zdHMuc3RhYmxlXHJcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBTdHJpbmcoYT8ubmFtZSkubG9jYWxlQ29tcGFyZShiPy5uYW1lKSlcclxuICAgICAgICAgICAgLm1hcCgoaG9zdCkgPT4gYDxhIGhyZWY9XCIke2hvc3QudXJsfVwiPiR7aG9zdC5uYW1lfTwvYT5gKS5qb2luKCc8c3Bhbj4sIDwvc3Bhbj4nKVxyXG4gICAgICAgIGhvc3RDb250YWluZXIuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8aDY+U3VwcG9ydGVkIFBhZ2VzPC9oNj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmstbGlzdFwiPiR7aG9zdExpc3R9PC9kaXY+XHJcbiAgICAgICAgYFxyXG5cclxuICAgICAgICBpZiAoaG9zdHMudW5zdGFibGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhvc3RMaXN0ID0gaG9zdHMudW5zdGFibGVcclxuICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBTdHJpbmcoYT8ubmFtZSkubG9jYWxlQ29tcGFyZShiPy5uYW1lKSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKGhvc3QpID0+IGA8YSBocmVmPVwiJHtob3N0LnVybH1cIj4ke2hvc3QubmFtZX08L2E+YCkuam9pbignPHNwYW4+LCA8L3NwYW4+JylcclxuICAgICAgICAgICAgaG9zdENvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPHA+VGhlc2UgUGFnZXMgaGFkIHNvbWUgcHJvYmxlbXMgcmVjZW50bHkgJm5kYXNoOyB0aGV5IG1pZ2h0IG9yIG1pZ2h0IG5vdCB3b3JrOjwvcD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5rLWxpc3RcIj4ke2hvc3RMaXN0fTwvZGl2PlxyXG4gICAgICAgICAgICBgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBzYXZlQXMgZnJvbSAnc2F2ZS1hcydcclxuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEltcG9ydEhhbmRsZXJzIChkYikge1xyXG4gICAgY29uc3QgaW1wb3J0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbXBvcnQnKVxyXG4gICAgY29uc3QgZXhwb3J0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleHBvcnQnKVxyXG5cclxuICAgIGltcG9ydEVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF1cclxuICAgICAgICBjb25zdCBmciA9IG5ldyBGaWxlUmVhZGVyKClcclxuICAgICAgICBmci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VzID0gcGFyc2UoZnIucmVzdWx0LCBbXSlcclxuICAgICAgICAgICAgY29uc3QgY2xlYW4gPSBzb3VyY2VzLmZpbHRlcigoc291cmNlKSA9PiBzb3VyY2U/LnRpdGxlICYmIHNvdXJjZS51cmwgJiYgc291cmNlLm1hbmdhSWQpXHJcbiAgICAgICAgICAgIGlmIChjbGVhbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGRiLnNvdXJjZXMuaW1wb3J0KGNsZWFuKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGltcG9ydEVsZW0uZmlsZXMgPSBudWxsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBmci5yZWFkQXNUZXh0KGZpbGUpXHJcbiAgICB9KVxyXG5cclxuICAgIGV4cG9ydEVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgZGIuc291cmNlcy5yZWFkKClcclxuICAgICAgICAgICAgLnRoZW4oKHNvdXJjZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoc291cmNlcyldLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KVxyXG4gICAgICAgICAgICAgICAgc2F2ZUFzKGJsb2IsICdtYW5nYXBvbGwuanNvbicpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBnZXRMaW5rUXVlcnksIGxpbmtJZlVubGlua2VkIH0gZnJvbSAnLi9zZXR0aW5ncydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1lbnVMaXN0ZW5lcnMgKGRiLCBBcGkpIHtcclxuICAgIGNvbnN0IGltcG9ydFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuaW1wb3J0JylcclxuICAgIGNvbnN0IHBvcHVwVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wdXBUaXRsZScpXHJcbiAgICBjb25zdCBib29rbWFya3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkJylcclxuICAgIGNvbnN0IHVybHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJscycpXHJcbiAgICBjb25zdCBjaGFwdGVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFwdGVycycpXHJcbiAgICBjb25zdCBhZGRTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFNlY3Rpb24nKVxyXG4gICAgY29uc3Qgc291cmNlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VyY2VzJylcclxuICAgIGNvbnN0IHNldHRpbmdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldHRpbmdzJylcclxuICAgIGNvbnN0IHNldHRpbmdzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncycpXHJcbiAgICBjb25zdCBwcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9ncmVzcycpXHJcbiAgICBjb25zdCBpbnRybyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRybycpXHJcblxyXG4gICAgY29uc3Qgb3BlbkNoYXB0ZXJzID0gKCkgPT4ge1xyXG4gICAgICAgIGRiLnNvdXJjZXMucmVhZCgpXHJcbiAgICAgICAgICAgIC50aGVuKChzb3VyY2VzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gc291cmNlcy5sZW5ndGggPyAnbm9uZScgOiAnZmxleCdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBzb3VyY2VzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBpbXBvcnRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBhZGRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHVybHMuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgcHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgY2hhcHRlcnMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIGJvb2ttYXJrcy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBwb3B1cFRpdGxlLmlubmVyVGV4dCA9ICdDaGFwdGVycydcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcGVuU2V0dGluZ3MgPSAoKSA9PiB7XHJcbiAgICAgICAgaW50cm8uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNvdXJjZXMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGltcG9ydFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGFkZFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHByb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgdXJscy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcG9wdXBUaXRsZS5pbm5lclRleHQgPSAnU2V0dGluZ3MnXHJcbiAgICAgICAgYm9va21hcmtzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIGNoYXB0ZXJzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIH1cclxuXHJcbiAgICBjaGFwdGVycy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5DaGFwdGVycylcclxuXHJcbiAgICBib29rbWFya3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaW50cm8uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNvdXJjZXMuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgICAgICBpbXBvcnRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICBhZGRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHByb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB1cmxzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwb3B1cFRpdGxlLmlubmVyVGV4dCA9ICdCb29rbWFya3MnXHJcbiAgICAgICAgYm9va21hcmtzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBjaGFwdGVycy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgIH0pXHJcblxyXG4gICAgc2V0dGluZ3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuU2V0dGluZ3MpXHJcblxyXG4gICAgaWYgKGdldExpbmtRdWVyeSgpKSB7XHJcbiAgICAgICAgb3BlblNldHRpbmdzKClcclxuICAgICAgICBsaW5rSWZVbmxpbmtlZChkYiwgQXBpKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgb3BlbkNoYXB0ZXJzKClcclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBwcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9ncmVzcycpXHJcblxyXG5sZXQgbG9ja2VkID0gZmFsc2VcclxuXHJcbmV4cG9ydCBjb25zdCByZXNpc3RlclByb2dyZXNzSGFuZGxlciA9ICh1cGRhdGVOb3cpID0+IHtcclxuICAgIHByb2dyZXNzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHVwZGF0ZU5vdygpXHJcbiAgICAgICAgbWFya1JlZnJlc2hlZCgpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWFya1JlZnJlc2hlZCA9ICgpID0+IHtcclxuICAgIHByb2dyZXNzLmlubmVySFRNTCA9ICcoUmVmcmVzaGVkISknXHJcbiAgICBwcm9ncmVzcy5kYXRhc2V0LmJlZm9yZSA9ICcoUmVmcmVzaGVkISknXHJcbiAgICBsb2NrZWQgPSB0cnVlXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBsb2NrZWQgPSBmYWxzZVxyXG4gICAgICAgIHByb2dyZXNzLmRhdGFzZXQuYmVmb3JlID0gJyhSZWZyZXNoIG5vdyEpJ1xyXG4gICAgfSwgMTUwMClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVByb2dyZXNzID0gKF9sYXN0UGluZywgbmV4dFBpbmcpID0+IHtcclxuICAgIGlmICghbG9ja2VkKSB7XHJcbiAgICAgICAgY29uc3QgcmVtYWluaW5nID0gbmV4dFBpbmcgLSBEYXRlLm5vdygpXHJcblxyXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLm1heChNYXRoLnJvdW5kKHJlbWFpbmluZyAvIDEwMDApLCAwKVxyXG5cclxuICAgICAgICBwcm9ncmVzcy5pbm5lckhUTUwgPSBgKE5leHQgcmVmcmVzaDogJHtzZWNvbmRzfXMpYFxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTY2hlZHVsZSA9ICh7IGlzQWN0aXZlID0gZmFsc2UsIGludGVydmFsID0gMCwgY2FsbGJhY2sgPSBGdW5jdGlvbi5wcm90b3R5cGUsIHVwZGF0ZXIgfSA9IHt9KSA9PiB7XHJcbiAgICBsZXQgbmV4dFBpbmcgPSAwXHJcbiAgICBsZXQgbGFzdFBpbmcgPSAwXHJcbiAgICBjb25zdCBjYWxsQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKG5leHRQaW5nICYmIG5leHRQaW5nIDw9IERhdGUubm93KCkpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IG5leHRQaW5nXHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gbmV4dFBpbmcgKyBpbnRlcnZhbCA+IERhdGUubm93KCkgPyBuZXh0UGluZyArIGludGVydmFsIDogRGF0ZS5ub3coKSArIGludGVydmFsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR5cGVvZiB1cGRhdGVyID09PSAnZnVuY3Rpb24nICYmIHVwZGF0ZXIobGFzdFBpbmcsIG5leHRQaW5nKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0FjdGl2ZSAmJiBpbnRlcnZhbCkge1xyXG4gICAgICAgIG5leHRQaW5nID0gRGF0ZS5ub3coKSAtIDFcclxuICAgICAgICBjYWxsQ2FsbGJhY2soKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKGNhbGxDYWxsYmFjaywgMTAwKVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwgKG5ld0ludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3SW50ZXJ2YWwgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZSBhIG51bWJlcicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBuZXh0UGluZyAtIGludGVydmFsICsgbmV3SW50ZXJ2YWxcclxuICAgICAgICAgICAgaW50ZXJ2YWwgPSBuZXdJbnRlcnZhbFxyXG4gICAgICAgICAgICBjYWxsQ2FsbGJhY2soKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0Q2FsbGJhY2sgKGNiKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY2JcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IERhdGUubm93KClcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBEYXRlLm5vdygpICsgaW50ZXJ2YWxcclxuICAgICAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChjYWxsQ2FsbGJhY2ssIDEwMClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRyaWdnZXJJbnN0YW50bHkgKCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgICAgICAgIGxhc3RQaW5nID0gRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICBuZXh0UGluZyA9IERhdGUubm93KCkgKyBpbnRlcnZhbFxyXG4gICAgICAgICAgICB0eXBlb2YgdXBkYXRlciA9PT0gJ2Z1bmN0aW9uJyAmJiB1cGRhdGVyKGxhc3RQaW5nLCBuZXh0UGluZylcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0b3AgKCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxyXG4gICAgICAgICAgICBuZXh0UGluZyA9IDBcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImNvbnN0IGxpbmtGaWVsZHMgPSBbJ2hpZGUnLCAnaGlkZGVuQ2hhcHRlcnMnLCAnc291cmNlcyddXHJcblxyXG5mdW5jdGlvbiBmb3JtYXRLZXkgKGtleSA9ICcnKSB7XHJcbiAgICByZXR1cm4gYCR7a2V5LnNsaWNlKDAsIDUpfS0ke2tleS5zbGljZSg1LCAxMCl9LSR7a2V5LnNsaWNlKDEwLCAxNSl9YFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlua0hlbHBlcnMgKGRiLCBBcGkpIHtcclxuICAgIGFzeW5jIGZ1bmN0aW9uIHB1c2hMaW5rVXBkYXRlIChjaGFuZ2VzKSB7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlc2V0ID0gbGlua0ZpZWxkcy5maWx0ZXIoKGtleSkgPT4gT2JqZWN0LmtleXMoY2hhbmdlcykuc29tZSgoY2hhbmdlKSA9PiBjaGFuZ2UuaW5jbHVkZXMoa2V5KSkpXHJcblxyXG4gICAgICAgIGlmIChjaGFuZ2VzZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKSB8fCB7fVxyXG4gICAgICAgICAgICBjb25zdCBsb2NhbCA9IGF3YWl0IGRiLmxpbmsubG9jYWwoKSB8fCB7fVxyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGUgPSB7fVxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc2V0LmluY2x1ZGVzKCdoaWRlJykpIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZS5oaWRlID0gbG9jYWwuaGlkZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzZXQuaW5jbHVkZXMoJ2hpZGRlbkNoYXB0ZXJzJykpIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZS5oaWRkZW5DaGFwdGVycyA9IGxvY2FsLmhpZGRlbkNoYXB0ZXJzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoYW5nZXNldC5pbmNsdWRlcygnc291cmNlcycpKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUuc291cmNlcyA9IGxvY2FsLnNvdXJjZXNcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHVwZGF0ZSkubGVuZ3RoICYmIGxpbmsua2V5KSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBBcGkuTGluay51cGRhdGUobGluay5rZXksIHVwZGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMudmFsaWQgJiYgZGIubGluay5zZXQoeyBrZXk6IHJlcy5wYXlsb2FkLmtleSB9KSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBmZXRjaExpbmtVcGRhdGUgKCkge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG5cclxuICAgICAgICBpZiAobGluaykge1xyXG4gICAgICAgICAgICBBcGkuTGluay5yZWFkKGxpbmsua2V5LCBsaW5rLmxhc3RNb2RpZmllZClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnZhbGlkICYmIHJlcy5wYXlsb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLmxpbmsuc2V0TG9jYWwocmVzLnBheWxvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHB1c2hMaW5rVXBkYXRlLFxyXG4gICAgICAgIGZldGNoTGlua1VwZGF0ZVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1ZhbGlkTGlua0tleSAoa2V5KSB7XHJcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbGVhbktleSA9IGtleS5yZXBsYWNlQWxsKC9bXlxcZF0qL2csICcnKVxyXG4gICAgaWYgKGNsZWFuS2V5Lmxlbmd0aCA9PT0gMTUpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlua1F1ZXJ5ICgpIHtcclxuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaClcclxuXHJcbiAgICBpZiAoaXNWYWxpZExpbmtLZXkodXJsUGFyYW1zLmdldCgnbGluaycpKSkge1xyXG4gICAgICAgIHJldHVybiB1cmxQYXJhbXMuZ2V0KCdsaW5rJykucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJylcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxpbmtJZlVubGlua2VkIChkYiwgYXBpKSB7XHJcbiAgICBjb25zdCBrZXkgPSBnZXRMaW5rUXVlcnkoKVxyXG5cclxuICAgIGlmIChrZXkpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50TGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcblxyXG4gICAgICAgIGlmICghY3VycmVudExpbmsgfHwgIWN1cnJlbnRMaW5rLmtleSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rSW5wdXQxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTEnKVxyXG4gICAgICAgICAgICBjb25zdCBsaW5rSW5wdXQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTInKVxyXG4gICAgICAgICAgICBjb25zdCBsaW5rSW5wdXQzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTMnKVxyXG5cclxuICAgICAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9IGtleS5zbGljZSgwLCA1KVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0ga2V5LnNsaWNlKDUsIDEwKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0ga2V5LnNsaWNlKDEwLCAxNSlcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGNvbm5lY3RUb0xpbmsoa2V5LCBhcGksIGRiKVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmsgJiYgbGluay5rZXkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtOdW1iZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstaWQnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlua0xpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtMaW5rVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmstdGV4dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bmxpbmstc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0xpbmtUZXh0LnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0xpbmsuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rTGluay5pbm5lclRleHQgPSBgaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbT9saW5rPSR7bGluay5rZXl9YFxyXG4gICAgICAgICAgICAgICAgbGlua0xpbmsuaHJlZiA9IGBodHRwczovL21hbmdhLmZvY2hsYWMuY29tP2xpbms9JHtsaW5rLmtleX1gXHJcbiAgICAgICAgICAgICAgICBsaW5rTnVtYmVyVGV4dC5pbm5lclRleHQgPSBgJHtsaW5rLmtleS5zbGljZSgwLCA1KX0tJHtsaW5rLmtleS5zbGljZSg1LCAxMCl9LSR7bGluay5rZXkuc2xpY2UoMTApfWBcclxuICAgICAgICAgICAgICAgIGxpbmtOdW1iZXJUZXh0LnN0eWxlLmNvbG9yID0gJyMwMDBjMjEnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZm9ybWF0S2V5KGN1cnJlbnRMaW5rLmtleSkgIT09IGZvcm1hdEtleShrZXkpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtMaW5rV2FybiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmstd2FybmluZycpXHJcbiAgICAgICAgICAgIGNvbnN0IHdhcm5MaW5rQ3VycmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3YXJuLWN1cnJlbnQtbGluaycpXHJcbiAgICAgICAgICAgIGNvbnN0IHdhcm5MaW5rTmV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dhcm4tbmV3LWxpbmsnKVxyXG5cclxuICAgICAgICAgICAgbGlua0xpbmtXYXJuLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICAgICAgd2FybkxpbmtDdXJyZW50LmlubmVyVGV4dCA9IGZvcm1hdEtleShjdXJyZW50TGluay5rZXkpXHJcbiAgICAgICAgICAgIHdhcm5MaW5rTmV3LmlubmVyVGV4dCA9IGZvcm1hdEtleShrZXkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjb25uZWN0VG9MaW5rIChrZXksIGFwaSwgZGIpIHtcclxuICAgIGNvbnN0IHsgTGluayB9ID0gYXBpXHJcbiAgICBjb25zdCBsaW5rRXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1lcnJvcicpXHJcbiAgICBjb25zdCBsaW5rUHJvZ3Jlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1wcm9ncmVzcycpXHJcbiAgICBjb25zdCBjcmVhdGVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1saW5rLWJ1dHRvbicpXHJcbiAgICBjb25zdCBsaW5rQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstYnV0dG9uJylcclxuICAgIGxpbmtFcnJvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICBsaW5rUHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgIGNyZWF0ZUxpbmsuZGlzYWJsZWQgPSB0cnVlXHJcbiAgICBsaW5rQnV0dG9uLmRpc2FibGVkID0gdHJ1ZVxyXG5cclxuICAgIGNvbnN0IGxpbmtSZXN1bHQgPSBhd2FpdCBMaW5rLnJlYWQoa2V5KVxyXG4gICAgY3JlYXRlTGluay5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICBsaW5rQnV0dG9uLmRpc2FibGVkID0gZmFsc2VcclxuICAgIGxpbmtQcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICBpZiAobGlua1Jlc3VsdD8udmFsaWQpIHtcclxuICAgICAgICBjb25zdCBsaW5rID0gbGlua1Jlc3VsdC5wYXlsb2FkXHJcbiAgICAgICAgYXdhaXQgZGIubGluay5zZXQoeyBrZXk6IGxpbmsua2V5IH0pXHJcbiAgICAgICAgYXdhaXQgZGIubGluay5zZXRMb2NhbChsaW5rKVxyXG5cclxuICAgICAgICByZXR1cm4gbGlua1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbGlua0Vycm9yLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgIH1cclxuICAgIGNvbnN0IGxpbmtMaW5rV2FybiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmstd2FybmluZycpXHJcblxyXG4gICAgaWYgKGxpbmtMaW5rV2Fybikge1xyXG4gICAgICAgIGxpbmtMaW5rV2Fybi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTZXR0aW5nc0hhbmRsZXJzIChkYiwgYXBpKSB7XHJcbiAgICBjb25zdCB7IExpbmsgfSA9IGFwaVxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWxpbmstYnV0dG9uJylcclxuICAgIGNvbnN0IHVwZGF0ZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlLWxpbmtpbmcnKVxyXG4gICAgY29uc3QgbGlua051bWJlclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1pZCcpXHJcbiAgICBjb25zdCBsaW5rTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmsnKVxyXG4gICAgY29uc3QgbGlua0xpbmtUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluay10ZXh0JylcclxuICAgIGNvbnN0IGxpbmtpbmdTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstc2VjdGlvbicpXHJcbiAgICBjb25zdCB1bmxpbmtTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VubGluay1zZWN0aW9uJylcclxuICAgIGNvbnN0IHVubGlua0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bmxpbmstYnV0dG9uJylcclxuICAgIGNvbnN0IGxpbmtCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1idXR0b24nKVxyXG4gICAgY29uc3QgbGlua0lucHV0MSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0xJylcclxuICAgIGNvbnN0IGxpbmtJbnB1dDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMicpXHJcbiAgICBjb25zdCBsaW5rSW5wdXQzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTMnKVxyXG5cclxuICAgIGxpbmtJbnB1dDEuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbnVtYmVyID0gbGlua0lucHV0MS52YWx1ZS5yZXBsYWNlQWxsKC9bXlxcZF0qL2csICcnKS5zbGljZSgwLCAxNSlcclxuICAgICAgICBsaW5rSW5wdXQxLnZhbHVlID0gbnVtYmVyLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgaWYgKG51bWJlci5sZW5ndGggPiA1KSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSBudW1iZXIuc2xpY2UoNSwgMTApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChudW1iZXIubGVuZ3RoID4gMTApIHtcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IG51bWJlci5zbGljZSgxMClcclxuICAgICAgICAgICAgbGlua0lucHV0My5mb2N1cygpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuc2V0U2VsZWN0aW9uUmFuZ2UobnVtYmVyLmxlbmd0aCAtIDEwLCBudW1iZXIubGVuZ3RoIC0gMTApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG51bWJlci5sZW5ndGggPj0gNSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLmZvY3VzKClcclxuICAgICAgICAgICAgbGlua0lucHV0Mi5zZXRTZWxlY3Rpb25SYW5nZShudW1iZXIubGVuZ3RoIC0gNSwgbnVtYmVyLmxlbmd0aCAtIDUpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGxpbmtJbnB1dDIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbnVtYmVyID0gbGlua0lucHV0Mi52YWx1ZS5yZXBsYWNlQWxsKC9bXlxcZF0qL2csICcnKS5zbGljZSgwLCAxMClcclxuICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gbnVtYmVyLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgaWYgKG51bWJlci5sZW5ndGggPj0gNSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gbnVtYmVyLnNsaWNlKDUsIDEwKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLmZvY3VzKClcclxuICAgICAgICAgICAgbGlua0lucHV0My5zZXRTZWxlY3Rpb25SYW5nZShudW1iZXIubGVuZ3RoIC0gNSwgbnVtYmVyLmxlbmd0aCAtIDUpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGxpbmtJbnB1dDMuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbnVtYmVyID0gbGlua0lucHV0My52YWx1ZS5yZXBsYWNlQWxsKC9bXlxcZF0qL2csICcnKS5zbGljZSgwLCA1KVxyXG4gICAgICAgIGlmIChsaW5rSW5wdXQzLnZhbHVlICE9PSBudW1iZXIuc2xpY2UoMCwgNSkpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IG51bWJlci5zbGljZSgwLCA1KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgZnVuY3Rpb24gd3JpdGVTdGF0ZVRvRG9tIChsaW5rKSB7XHJcbiAgICAgICAgbGlua2luZ1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9IGxpbmsgPyAnbm9uZScgOiAnJ1xyXG4gICAgICAgIHVubGlua1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9IGxpbmsgPyAnJyA6ICdub25lJ1xyXG4gICAgICAgIGlmIChsaW5rTGlua1RleHQpIHtcclxuICAgICAgICAgICAgbGlua0xpbmtUZXh0LnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJycgOiAnbm9uZSdcclxuICAgICAgICAgICAgbGlua0xpbmsuc3R5bGUuZGlzcGxheSA9IGxpbmsgPyAnJyA6ICdub25lJ1xyXG4gICAgICAgICAgICBsaW5rTGluay5pbm5lclRleHQgPSBsaW5rID8gYGh0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20/bGluaz0ke2xpbmsua2V5fWAgOiAnJ1xyXG4gICAgICAgICAgICBsaW5rTGluay5ocmVmID0gbGluayA/IGBodHRwczovL21hbmdhLmZvY2hsYWMuY29tP2xpbms9JHtsaW5rLmtleX1gIDogJydcclxuICAgICAgICB9XHJcbiAgICAgICAgbGlua051bWJlclRleHQuaW5uZXJUZXh0ID0gbGluayA/IGZvcm1hdEtleShsaW5rLmtleSkgOiAnVW5saW5rZWQnXHJcbiAgICAgICAgbGlua051bWJlclRleHQuc3R5bGUuY29sb3IgPSBsaW5rID8gJyMwMDBjMjEnIDogJyNjM2NiZDInXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICB3cml0ZVN0YXRlVG9Eb20obGluaylcclxuXHJcbiAgICBpZiAodXBkYXRlTGluaykge1xyXG4gICAgICAgIHVwZGF0ZUxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGdldExpbmtRdWVyeSgpXHJcblxyXG4gICAgICAgICAgICBsaW5rSW5wdXQxLnZhbHVlID0ga2V5LnNsaWNlKDAsIDUpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSBrZXkuc2xpY2UoNSwgMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBrZXkuc2xpY2UoMTAsIDE1KVxyXG4gICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldChudWxsKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXdhcm5pbmcnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbSgpXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3RUb0xpbmsoa2V5LCBhcGksIGRiKVxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20ocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmtMaW5rV2FybiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWVycm9yJylcclxuXHJcbiAgICAgICAgaWYgKGxpbmtMaW5rV2Fybikge1xyXG4gICAgICAgICAgICBsaW5rTGlua1dhcm4uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgY29uc3QgbGlua0RhdGEgPSBhd2FpdCBkYi5saW5rLmxvY2FsKClcclxuICAgICAgICAgICAgY29uc3QgbmV3TGlua1Jlc3VsdCA9IGF3YWl0IExpbmsuaW5zZXJ0KGxpbmtEYXRhKVxyXG4gICAgICAgICAgICBpZiAobmV3TGlua1Jlc3VsdD8udmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBuZXdMaW5rUmVzdWx0LnBheWxvYWRcclxuICAgICAgICAgICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0KHsga2V5OiBsaW5rLmtleSB9KVxyXG4gICAgICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKGxpbmspXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgdW5saW5rQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgICAgIGlmIChsaW5rKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0KG51bGwpXHJcbiAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbSh1bmRlZmluZWQpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGxpbmtCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICAgICAgaWYgKCFsaW5rKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2xpbmtJbnB1dDEudmFsdWV9JHtsaW5rSW5wdXQyLnZhbHVlfSR7bGlua0lucHV0My52YWx1ZX1gXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3RUb0xpbmsoa2V5LCBhcGksIGRiKVxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20ocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gc291cmNlUmVuZGVyZXIgKGRiKSB7XHJcbiAgICBjb25zdCBzb3VyY2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZXMnKVxyXG5cclxuICAgIHNvdXJjZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjbG9zZXN0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5yb3cgLmFjdGlvbi5kZWxldGUnKVxyXG4gICAgICAgIGlmIChjbG9zZXN0ICYmIGNsb3Nlc3QuZGF0YXNldFsnaWQnXSAmJiBzb3VyY2VzLmNvbnRhaW5zKGNsb3Nlc3QpKSB7XHJcbiAgICAgICAgICAgIGRiLnNvdXJjZXMuZGVsZXRlKGNsb3Nlc3QuZGF0YXNldFsnaWQnXSlcclxuICAgICAgICAgICAgY2xvc2VzdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3Rpb24nKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyU291cmNlcyAoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRiLnNvdXJjZXMucmVhZCgpXHJcblxyXG4gICAgICAgIHNvdXJjZXMuaW5uZXJIVE1MID0gZGF0YVxyXG4gICAgICAgICAgICAuc29ydCgoc291cmNlMSwgc291cmNlMikgPT4gU3RyaW5nKHNvdXJjZTEudGl0bGUpLmxvY2FsZUNvbXBhcmUoc291cmNlMj8udGl0bGUpKVxyXG4gICAgICAgICAgICAubWFwKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBTdHJpbmcoc291cmNlLnVybCkucmVwbGFjZSgvaHR0cHM/OlxcL1xcLy8sICcnKS5zcGxpdCgnLycpWzBdLnNwbGl0KCcuJykuc2xpY2UoLTIpLmpvaW4oJy4nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICBgPGxpIGNsYXNzPVwicm93IHNvdXJjZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YVwiIHRpdGxlPVwiJHtgJHtzb3VyY2UudGl0bGV9ICgke3VybH0pYH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGl0bGVcIj4ke3NvdXJjZS50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hbmdhLWlkXCI+KCR7dXJsfSk8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlbGV0ZSBhY3Rpb25cIiBkYXRhLWlkPVwiJHtzb3VyY2UuaWR9XCI+RGVsZXRlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+YFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuam9pbignXFxuJylcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcjogKCkgPT4gcmVuZGVyU291cmNlcygpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcGFkIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cmxSZW5kZXJlciAoZGIpIHtcclxuICAgIGNvbnN0IHVybHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJscycpXHJcbiAgICBjb25zdCBpbnRybyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRybycpXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZSAoaWQpIHtcclxuICAgICAgICBjb25zdCB7IG5ld1VybHMsIG9sZFVybHMgfSA9IGF3YWl0IGRiLnVybHMucmVhZCgpXHJcbiAgICAgICAgaWYgKG5ld1VybHMubGVuZ3RoIDw9IDEgJiYgKCFuZXdVcmxzWzBdIHx8IG5ld1VybHNbMF0uaWQgPT09IGlkKSkge1xyXG4gICAgICAgICAgICBjb25zdCBsYXRlc3RDaGFwdGVyRGF0ZSA9IG9sZFVybHMuY29uY2F0KG5ld1VybHMpXHJcbiAgICAgICAgICAgICAgICAucmVkdWNlKChsY2QsIHVybCkgPT4gdXJsLmNyZWF0ZWQgPiBsY2QgPyB1cmwuY3JlYXRlZCA6IGxjZCwgMClcclxuXHJcbiAgICAgICAgICAgIGRiLnVybHMuaGlkZUFsbChsYXRlc3RDaGFwdGVyRGF0ZSArIDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkYi51cmxzLmhpZGUoaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVybHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjbG9zZXN0SGlkZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93IC5oaWRlJylcclxuXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RIaWRlICYmIGNsb3Nlc3RIaWRlLmRhdGFzZXRbJ2lkJ10gJiYgdXJscy5jb250YWlucyhjbG9zZXN0SGlkZSkpIHtcclxuICAgICAgICAgICAgYXdhaXQgaGlkZShjbG9zZXN0SGlkZS5kYXRhc2V0WydpZCddKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbG9zZXN0TGluayA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93Lm5ldyAubGluaycpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RMaW5rICYmIGNsb3Nlc3RMaW5rLmRhdGFzZXRbJ2lkJ10gJiYgdXJscy5jb250YWlucyhjbG9zZXN0TGluaykpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBhd2FpdCBoaWRlKGNsb3Nlc3RMaW5rLmRhdGFzZXRbJ2lkJ10pXHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKGNsb3Nlc3RMaW5rLmhyZWYsICdfYmxhbmsnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbG9zZXN0TW9yZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuYWN0aW9uLmxvYWQtbW9yZScpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RNb3JlICYmIHVybHMuY29udGFpbnMoY2xvc2VzdE1vcmUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heE9sZCA9IGF3YWl0IGRiLnVybHMuZ2V0TWF4T2xkKClcclxuICAgICAgICAgICAgYXdhaXQgZGIudXJscy5zZXRNYXhPbGQobWF4T2xkICsgMTAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoaWRlQWxsID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5oaWRlLWFsbCcpXHJcbiAgICAgICAgaWYgKGhpZGVBbGwgJiYgdXJscy5jb250YWlucyhoaWRlQWxsKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBkYi51cmxzLmhpZGVBbGwoRGF0ZS5ub3coKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdG9wID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy50b3AnKVxyXG4gICAgICAgIGlmICh0b3AgJiYgdXJscy5jb250YWlucyh0b3ApKSB7XHJcbiAgICAgICAgICAgIHVybHMuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgbGV0IG1heFNjcm9sbCA9IDBcclxuICAgIHVybHMuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHVybHMub2Zmc2V0SGVpZ2h0ICsgdXJscy5zY3JvbGxUb3BcclxuICAgICAgICBpZiAodXJscy5zY3JvbGxIZWlnaHQgLSBzY3JvbGxIZWlnaHQgPD0gNTAgJiYgbWF4U2Nyb2xsICE9PSB1cmxzLnNjcm9sbEhlaWdodCkge1xyXG4gICAgICAgICAgICBtYXhTY3JvbGwgPSB1cmxzLnNjcm9sbEhlaWdodFxyXG4gICAgICAgICAgICBjb25zdCBtYXhPbGQgPSBhd2FpdCBkYi51cmxzLmdldE1heE9sZCgpXHJcbiAgICAgICAgICAgIGRiLnVybHMuc2V0TWF4T2xkKG1heE9sZCArIDEwMClcclxuICAgICAgICB9XHJcbiAgICAgICAgY2hlY2tUb3BCdXR0b24oKVxyXG4gICAgfSlcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1RvcEJ1dHRvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVybHMuc2Nyb2xsVG9wID4gMCAmJiB1cmxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA9PT0gdXJscy5xdWVyeVNlbGVjdG9yKCcub2xkLWNoYXB0ZXJzJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSB7XHJcbiAgICAgICAgICAgIHVybHMucXVlcnlTZWxlY3RvcignLm9sZC1jaGFwdGVycyAudG9wJykuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1cmxzLnF1ZXJ5U2VsZWN0b3IoJy5vbGQtY2hhcHRlcnMgLnRvcCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVXJsUmVuZGVyZXIgKGlzT2xkKSB7XHJcbiAgICAgICAgcmV0dXJuIChjaGFwdGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShjaGFwdGVyLmNyZWF0ZWQpXHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdHJpbmcgPSBgJHtwYWQoZGF0ZS5nZXRIb3VycygpKX06JHtwYWQoZGF0ZS5nZXRNaW51dGVzKCkpfWBcclxuICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGAke3BhZChkYXRlLmdldERhdGUoKSl9LiR7cGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpfS4ke1N0cmluZyhkYXRlLmdldEZ1bGxZZWFyKCkpLnNsaWNlKC0yKX1gXHJcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxEYXRlID0gZGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gPT09IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdID8gdGltZVN0cmluZyA6IGRhdGVTdHJpbmdcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJyb3cke2lzT2xkID8gJyBvbGQnIDogJyBuZXcnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGlua1wiIGhyZWY9XCIke2NoYXB0ZXIudXJsfVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCIgZGF0YS1pZD1cIiR7Y2hhcHRlci5pZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtjaGFwdGVyLnRpdGxlfSAtIENoYXB0ZXIgJHtjaGFwdGVyLmNoYXB0ZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0ZS13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0ZVwiIHRpdGxlPVwiJHtgJHtkYXRlU3RyaW5nfSAke3RpbWVTdHJpbmd9YH1cIj4ke2Z1bGxEYXRlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoaWRlXCIgZGF0YS1pZD1cIiR7Y2hhcHRlci5pZH1cIj5IaWRlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvbGk+YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiByZW5kZXJVcmxzICgpIHtcclxuICAgICAgICBjb25zdCBtYXhPbGQgPSBhd2FpdCBkYi51cmxzLmdldE1heE9sZCgpXHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IGRiLnNvdXJjZXMucmVhZCgpXHJcbiAgICAgICAgY29uc3QgeyBuZXdVcmxzLCBvbGRVcmxzIH0gPSBhd2FpdCBkYi51cmxzLnJlYWQoKVxyXG4gICAgICAgIGNvbnN0IG5ld1Jvd3MgPSBuZXdVcmxzLm1hcChjcmVhdGVVcmxSZW5kZXJlcihmYWxzZSkpXHJcbiAgICAgICAgY29uc3Qgb2xkUm93cyA9IG9sZFVybHMubWFwKGNyZWF0ZVVybFJlbmRlcmVyKHRydWUpKVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHVybHMuaW5uZXJIVE1MID0gJydcclxuICAgICAgICAgICAgaW50cm8uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChuZXdSb3dzLmxlbmd0aCB8fCBvbGRSb3dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIHVybHMuaW5uZXJIVE1MID0gW11cclxuICAgICAgICAgICAgICAgIC5jb25jYXQobmV3Um93cy5sZW5ndGggPyAnPGxpIGNsYXNzPVwibmV3LWNoYXB0ZXJzXCI+TmV3IENoYXB0ZXJzIDxzcGFuIGNsYXNzPVwiYWN0aW9uIGhpZGUtYWxsXCI+SGlkZSBhbGw8L3NwYW4+PC9saT4nIDogW10pXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG5ld1Jvd3MpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KCc8bGkgY2xhc3M9XCJvbGQtY2hhcHRlcnNcIj5PbGQgQ2hhcHRlcnMgPHNwYW4gY2xhc3M9XCJhY3Rpb24gdG9wXCI+VG9wICYjODU5Mzs8L3NwYW4+PC9saT4nKVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdChvbGRSb3dzLnNsaWNlKDAsIG1heE9sZCkpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG9sZFJvd3MubGVuZ3RoID49IG1heE9sZCA/IFsnPGxpIGNsYXNzPVwiYWN0aW9uIGxvYWQtbW9yZVwiPkxvYWQgdXAgdG8gMTAwIG1vcmUgb2xkIGNoYXB0ZXJzLi4uPC9saT4nXSA6IFtdKVxyXG4gICAgICAgICAgICAgICAgLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gbmV3Um93cy5sZW5ndGggPyBgKCR7bmV3Um93cy5sZW5ndGh9KSBNYW5nYSBQb2xsYCA6ICdNYW5nYSBQb2xsJ1xyXG4gICAgICAgICAgICBjaGVja1RvcEJ1dHRvbigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIHVybHMuaW5uZXJIVE1MID0gJzxsaSBjbGFzcz1cInJvd1wiPk5vIENoYXB0ZXJzIGF2YWlsYWJsZS48L2xpPidcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnTWFuZ2EgUG9sbCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXI6ICgpID0+IHJlbmRlclVybHMoKVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBwYXJzZSAoc3RyaW5nLCBmYWxsYmFjaykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHJpbmcpXHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxsYmFja1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFkIChubykge1xyXG4gICAgcmV0dXJuICgnMDAnICsgbm8pLnNsaWNlKC0yKVxyXG59XHJcbiIsImltcG9ydCB7IEFQSSB9IGZyb20gJy4uL2NvbW1vbi9hcGknXHJcbmltcG9ydCB7IEFQSV9BRERSRVNTIH0gZnJvbSAnLi9jb25zdGFudHMnXHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9zdG9yYWdlJ1xyXG5cclxubGV0IGN1cnJlbnRTb3VyY2UgPSBudWxsXHJcblxyXG5jb25zdCBib29rbWFyayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib29rbWFyaycpXHJcbmNvbnN0IGJvb2ttYXJrVHJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9va21hcmstdHJhY2snKVxyXG5jb25zdCBib29rbWFya1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvb2ttYXJrLXRpdGxlJylcclxuXHJcbmNvbnN0IHsgU291cmNlIH0gPSBBUEkoQVBJX0FERFJFU1MpXHJcblxyXG5ib29rbWFya1RyYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYm9va21hcmsuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgYm9va21hcmtUaXRsZS5pbm5lclRleHQgPSAnJ1xyXG4gICAgU291cmNlLmluc2VydChjdXJyZW50U291cmNlKVxyXG4gICAgICAgIC50aGVuKChzb3VyY2UpID0+IHNvdXJjZSAmJiBkYi5zb3VyY2VzLmFkZChzb3VyY2UpKVxyXG4gICAgY3VycmVudFNvdXJjZSA9IG51bGxcclxufSlcclxuXHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihhc3luYyAocmVxdWVzdCkgPT4ge1xyXG4gICAgaWYgKHJlcXVlc3QuaWQgJiYgcmVxdWVzdC50aXRsZSAmJiByZXF1ZXN0LnVybCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCBkYi5zb3VyY2VzLnJlYWQoKVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZXMuc29tZSgoc291cmNlKSA9PiBzb3VyY2UudXJsID09PSByZXF1ZXN0LnVybCAmJiBTdHJpbmcoc291cmNlLm1hbmdhSWQpID09PSBTdHJpbmcocmVxdWVzdC5pZCkpKSB7XHJcbiAgICAgICAgICAgIGJvb2ttYXJrLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICAgICAgYm9va21hcmtUaXRsZS5pbm5lclRleHQgPSBgRG8geW91IHdhbnQgdG8gc3RhcnQgdHJhY2tpbmcgXCIke3JlcXVlc3QudGl0bGV9XCI/YFxyXG4gICAgICAgICAgICBjdXJyZW50U291cmNlID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogcmVxdWVzdC50eXBlLFxyXG4gICAgICAgICAgICAgICAgbWFuZ2FJZDogcmVxdWVzdC5pZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiByZXF1ZXN0LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgdXJsOiByZXF1ZXN0LnVybFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBib29rbWFyay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICBib29rbWFya1RpdGxlLmlubmVyVGV4dCA9ICcnXHJcbiAgICBjdXJyZW50U291cmNlID0gbnVsbFxyXG59KVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RCb29rbWFyayAoKSB7XHJcbiAgICBjaHJvbWUudGFicy5xdWVyeShcclxuICAgICAgICB7IGFjdGl2ZTogdHJ1ZSwgd2luZG93SWQ6IGNocm9tZS53aW5kb3dzLldJTkRPV19JRF9DVVJSRU5UIH0sXHJcbiAgICAgICAgKHRhYnMpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0YWJzWzBdLnVybC5pbmNsdWRlcygnY2hyb21lOi8vJykpIHtcclxuICAgICAgICAgICAgICAgIGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7IHRhcmdldDogeyB0YWJJZDogdGFic1swXS5pZCB9LCBmdW5jdGlvbjogdGVzdCB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXN0ICgpIHtcclxuICAgIGZ1bmN0aW9uIGRlY29kZUhUTUxFbnRpdGllcyAoc3RyKSB7XHJcbiAgICAgICAgaWYgKHN0ciAmJiB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoLzxzY3JpcHRbXj5dKj4oW1xcU1xcc10qPyk8XFwvc2NyaXB0Pi9nbWksICcnKVxyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvPFxcLz9cXHcoPzpbXlwiJz5dfFwiW15cIl0qXCJ8J1teJ10qJykqPi9nbWksICcnKVxyXG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IHN0clxyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC50ZXh0Q29udGVudFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwYXJzZSAoc3RyaW5nLCBmYWxsYmFjaykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZylcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbGxiYWNrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RGYW5Gb3ggKCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaCgvXlxcL21hbmdhXFwvW14vXSpcXC8vKT8uWzBdXHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWFkZXItaGVhZGVyLXRpdGxlLTEgYTpmaXJzdC1jaGlsZCcpPy5pbm5lclRleHQgfHxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldGFpbC1pbmZvLXJpZ2h0LXRpdGxlLWZvbnQnKT8uaW5uZXJUZXh0XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdmYW5mb3gnLFxyXG4gICAgICAgICAgICBpZDogdXJsID8gdXJsLnNwbGl0KCcvJylbMl0gOiBudWxsLFxyXG4gICAgICAgICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgICAgICAgdXJsOiB1cmwgPyBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7dXJsfWAgOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RBc3VyYSAoKSB7XHJcbiAgICAgICAgY29uc3QgYnJlYWRjcnVtcExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdvbFtpdGVtdHlwZT1cImh0dHA6Ly9zY2hlbWEub3JnL0JyZWFkY3J1bWJMaXN0XCJdIGFbaXRlbXByb3A9XCJpdGVtXCJdW2hyZWYqPVwiL2NvbWljcy9cIl0nKVxyXG4gICAgICAgIGNvbnN0IHVybCA9IGJyZWFkY3J1bXBMaW5rLmhyZWZcclxuICAgICAgICBjb25zdCBuYW1lID0gYnJlYWRjcnVtcExpbmsucXVlcnlTZWxlY3Rvcignc3BhbicpPy5pbm5lclRleHRcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ2FzdXJhJyxcclxuICAgICAgICAgICAgaWQ6IHVybD8uc3BsaXQoJy8nKVs0XSxcclxuICAgICAgICAgICAgdGl0bGU6IG5hbWUsXHJcbiAgICAgICAgICAgIHVybFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0TWFuZ2FkZXggKCkge1xyXG4gICAgICAgIGlmICgvdGl0bGVcXC9bXFxkLVxcd10qXFwvW1xcZC1cXHddKi8udGVzdCh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk/LlsyXVxyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hbmdhLWNvbnRhaW5lciAudGl0bGUgcCcpPy5pbm5lclRleHRcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnbWFuZ2FkZXgnLFxyXG4gICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIHVybDogaWQgPyBgaHR0cHM6Ly9hcGkubWFuZ2FkZXgub3JnL21hbmdhLyR7aWR9YCA6IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgvY2hhcHRlclxcL1tcXGQtXFx3XSpcXC9cXGQqLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EudGV4dC1wcmltYXJ5W2hyZWYqPVwiL3RpdGxlL1wiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBsaW5rPy5pbm5lclRleHRcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBsaW5rPy5ocmVmLnNwbGl0KCcvJyk/Lls0XVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdtYW5nYWRleCcsXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBpZCA/IGBodHRwczovL2FwaS5tYW5nYWRleC5vcmcvbWFuZ2EvJHtpZH1gIDogbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RMZXZpYXRoYW4gKCkge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LXRpdGxlIGgxJylcclxuICAgICAgICBjb25zdCB0aXRsZXMgPSBbXHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCJdJykpXHJcbiAgICAgICAgICAgICAgICAubWFwKChzY3JpcHQpID0+IHBhcnNlKHNjcmlwdC5pbm5lclRleHQpPy5oZWFkbGluZSkuZmluZCgoaCkgPT4gaCksXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFwdGVyLWhlYWRpbmcnKT8uaW5uZXJUZXh0Py5zcGxpdCgnIC0gJylbMF0sXHJcbiAgICAgICAgICAgIGhlYWRlciAmJiBBcnJheS5mcm9tKGhlYWRlci5jaGlsZE5vZGVzKS5yZWR1Y2UoKHRpdGxlLCBub2RlKSA9PiB0aXRsZSArIChub2RlLm5vZGVUeXBlID09PSAzID8gbm9kZS50ZXh0Q29udGVudCA6ICcnKSwgJycpLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0ZS10aXRsZScpPy50aXRsZVxyXG4gICAgICAgIF1cclxuICAgICAgICAgICAgLmZpbHRlcigodGl0bGUpID0+IHRpdGxlKVxyXG4gICAgICAgICAgICAucmVkdWNlKChtYXAsIHRpdGxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhbiA9IGRlY29kZUhUTUxFbnRpdGllcyh0aXRsZSkudHJpbSgpXHJcbiAgICAgICAgICAgICAgICBtYXBbY2xlYW5dID0gdHlwZW9mIG1hcFtjbGVhbl0gPT09ICdudW1iZXInID8gbWFwW2NsZWFuXSArIDEgOiAxXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwXHJcbiAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gT2JqZWN0LmtleXModGl0bGVzKS5zb3J0KCh0aXRsZTEsIHRpdGxlMikgPT4gdGl0bGVzW3RpdGxlMV0gLSB0aXRsZXNbdGl0bGUyXSlbMF1cclxuXHJcbiAgICAgICAgY29uc3QgYmFzZVVybCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuc3BsaXQoJy9tYW5nYS8nKVswXSArICcvbWFuZ2EvJ1xyXG4gICAgICAgIGNvbnN0IGlkID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5yZXBsYWNlKGJhc2VVcmwsICcnKS5zcGxpdCgnLycpWzBdXHJcbiAgICAgICAgY29uc3QgdXJsID0gYCR7YmFzZVVybH0ke2lkfWBcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ2xldmlhdGhhbicsXHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgdXJsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RNYWRhcm8gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlIChzdHJpbmcsIGZhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHJpbmcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxsYmFja1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpZHMgPSBbXHJcbiAgICAgICAgICAgIHdpbmRvdz8ubWFuZ2E/Lm1hbmdhX2lkLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0aW5nLXBvc3QtaWQnKT8udmFsdWUsXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cC1tYW5nYS1hY3Rpb24tYnV0dG9uJyk/LmRhdGFzZXQ/LlsncG9zdCddLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhcHRlci1zZWxlY3Rpb24nKT8uZGF0YXNldD8uWydtYW5nYSddLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuZ2EtY2hhcHRlcnMtaG9sZGVyJyk/LmRhdGFzZXQ/LlsnaWQnXSxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hbmdhLXJlYWRpbmctbmF2LWhlYWQnKT8uZGF0YXNldD8uWydpZCddLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuZ2EtcmVhZGluZy1uYXYtZm9vdCcpPy5kYXRhc2V0Py5bJ2lkJ11cclxuICAgICAgICBdXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKHRpdGxlKSA9PiB0aXRsZSlcclxuICAgICAgICAgICAgLnJlZHVjZSgobWFwLCBpZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWFwW2lkXSA9IHR5cGVvZiBtYXBbaWRdID09PSAnbnVtYmVyJyA/IG1hcFtpZF0gKyAxIDogMVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcFxyXG4gICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICBjb25zdCBpZCA9IE9iamVjdC5rZXlzKGlkcykuc29ydCgoaWQxLCBpZDIpID0+IGlkc1tpZDFdIC0gaWRzW2lkMl0pWzBdXHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LXRpdGxlIGgxJylcclxuICAgICAgICBjb25zdCB0aXRsZXMgPSBbXHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCJdJykpXHJcbiAgICAgICAgICAgICAgICAubWFwKChzY3JpcHQpID0+IHBhcnNlKHNjcmlwdC5pbm5lclRleHQpPy5oZWFkbGluZSkuZmluZCgoaCkgPT4gaCksXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFwdGVyLWhlYWRpbmcnKT8uaW5uZXJUZXh0Py5zcGxpdCgnIC0gJylbMF0sXHJcbiAgICAgICAgICAgIGhlYWRlciAmJiBBcnJheS5mcm9tKGhlYWRlci5jaGlsZE5vZGVzKS5yZWR1Y2UoKHRpdGxlLCBub2RlKSA9PiB0aXRsZSArIChub2RlLm5vZGVUeXBlID09PSAzID8gbm9kZS50ZXh0Q29udGVudCA6ICcnKSwgJycpLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0ZS10aXRsZScpPy50aXRsZVxyXG4gICAgICAgIF1cclxuICAgICAgICAgICAgLmZpbHRlcigodGl0bGUpID0+IHRpdGxlKVxyXG4gICAgICAgICAgICAucmVkdWNlKChtYXAsIHRpdGxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhbiA9IGRlY29kZUhUTUxFbnRpdGllcyh0aXRsZSkudHJpbSgpXHJcbiAgICAgICAgICAgICAgICBtYXBbY2xlYW5dID0gdHlwZW9mIG1hcFtjbGVhbl0gPT09ICdudW1iZXInID8gbWFwW2NsZWFuXSArIDEgOiAxXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwXHJcbiAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgIGxldCB0aXRsZSA9IE9iamVjdC5rZXlzKHRpdGxlcykuc29ydCgodGl0bGUxLCB0aXRsZTIpID0+IHRpdGxlc1t0aXRsZTFdIC0gdGl0bGVzW3RpdGxlMl0pWzBdXHJcblxyXG4gICAgICAgIGxldCB1cmwgPSBudWxsXHJcbiAgICAgICAgaWYgKGRvY3VtZW50Py5sb2NhdGlvbj8uaHJlZikge1xyXG4gICAgICAgICAgICB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLm1hdGNoKC9odHRwcz86XFwvXFwvW14vXSpcXC9bXi9dKlxcL1teL10qXFwvLyk/LlswXVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24uaHJlZi5pbmNsdWRlcygncmVhcGVyc2NhbnMuY29tJykpIHtcclxuICAgICAgICAgICAgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5tYXRjaCgvaHR0cC4qXFwvc2VyaWVzXFwvW14vXSpcXC8vKT8uWzBdXHJcbiAgICAgICAgICAgIHRpdGxlID0gdGl0bGUuc3BsaXQoJyDigJMgJylbMF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdtYWRhcmEnLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgIHVybFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzdWx0XHJcblxyXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09PSAnZmFuZm94Lm5ldCcpIHtcclxuICAgICAgICByZXN1bHQgPSB0ZXN0RmFuRm94KClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluY2x1ZGVzKCdhc3VyYXNjYW5zLmNvbScpKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gdGVzdEFzdXJhKClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluY2x1ZGVzKCdsZXZpYXRhbnNjYW5zLmNvbScpIHx8IHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluY2x1ZGVzKCdpbW1vcnRhbHVwZGF0ZXMuY29tJykpIHtcclxuICAgICAgICByZXN1bHQgPSB0ZXN0TGV2aWF0aGFuKClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09PSAnbWFuZ2FkZXgub3JnJykge1xyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RNYW5nYWRleCgpXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXN1bHQgPSB0ZXN0TWFkYXJvKClcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpXHJcblxyXG4gICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHJlc3VsdClcclxuICAgIH1cclxufVxyXG5cclxuIiwiZXhwb3J0IGNvbnN0IEFQSV9BRERSRVNTID0gJ2h0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20nIC8vICdodHRwOi8vbG9jYWxob3N0OjQzMjE0J1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gaW5pdEludHJvICgpIHtcclxuICAgIGNvbnN0IGJvb2ttYXJrSW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50cm8tYm9va21hcmsnKVxyXG4gICAgYm9va21hcmtJbWFnZS5zcmMgPSBjaHJvbWUucnVudGltZS5nZXRVUkwoJ2ltYWdlcy9ib29rbWFyay1zYW1wbGUucG5nJylcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVEQiB9IGZyb20gJy4uL2NvbW1vbi9kYidcclxuXHJcbmZ1bmN0aW9uIHJlYWQgKG5hbWVzcGFjZSwga2V5cykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBjaHJvbWUuc3RvcmFnZVtuYW1lc3BhY2VdLmdldChrZXlzLCByZXNvbHZlKSlcclxufVxyXG5cclxuZnVuY3Rpb24gd3JpdGUgKG5hbWVzcGFjZSwga2V5UGFpcnMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gY2hyb21lLnN0b3JhZ2VbbmFtZXNwYWNlXS5zZXQoa2V5UGFpcnMsIHJlc29sdmUpKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRMaXN0ZW5lciAoY2FsbGJhY2spIHtcclxuICAgIHJldHVybiBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoY2FsbGJhY2spXHJcbn1cclxuXHJcbmNvbnN0IHN0b3JhZ2UgPSB7XHJcbiAgICByZWFkLCB3cml0ZSwgYWRkTGlzdGVuZXJcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRiID0gY3JlYXRlREIoc3RvcmFnZSlcclxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qIEZpbGVTYXZlci5qc1xyXG4gKiBBIHNhdmVBcygpIEZpbGVTYXZlciBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxyXG4gKiBFUzZpZmllZCBieSBDb2xlIENoYW1iZXJsYWluLCBodHRwczovL2dpdGh1Yi5jb20vY2NoYW1iZXJsYWluXHJcbiAqXHJcbiAqIExpY2Vuc2U6IE1JVFxyXG4gKiAgIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxyXG4gKi9cblxuLypnbG9iYWwgc2VsZiAqL1xuLypqc2xpbnQgYml0d2lzZTogdHJ1ZSwgaW5kZW50OiA0LCBsYXhicmVhazogdHJ1ZSwgbGF4Y29tbWE6IHRydWUsIHNtYXJ0dGFiczogdHJ1ZSwgcGx1c3BsdXM6IHRydWUgKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9GaWxlU2F2ZXIuanMgKi9cblxudmFyIHNhdmVBcyA9IGV4cG9ydHMuc2F2ZUFzID0gd2luZG93LnNhdmVBcyB8fCBmdW5jdGlvbiAodmlldykge1xuICAvLyBJRSA8MTAgaXMgZXhwbGljaXRseSB1bnN1cHBvcnRlZFxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL01TSUUgWzEtOV1cXC4vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHJldHVybjtcbiAgdmFyIGRvYyA9IHZpZXcuZG9jdW1lbnQ7XG4gIC8vIG9ubHkgZ2V0IFVSTCB3aGVuIG5lY2Vzc2FyeSBpbiBjYXNlIEJsb2IuanMgaGFzbid0IG92ZXJyaWRkZW4gaXQgeWV0XG4gIHZhciBnZXRfVVJMID0gZnVuY3Rpb24gZ2V0X1VSTCgpIHtcbiAgICByZXR1cm4gdmlldy5VUkwgfHwgdmlldy53ZWJraXRVUkwgfHwgdmlldztcbiAgfTtcbiAgdmFyIHNhdmVfbGluayA9IGRvYy5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCAnYScpO1xuICB2YXIgY2FuX3VzZV9zYXZlX2xpbmsgPSAnZG93bmxvYWQnIGluIHNhdmVfbGluaztcbiAgdmFyIGNsaWNrID0gZnVuY3Rpb24gY2xpY2sobm9kZSkge1xuICAgIHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KCdjbGljaycpO1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH07XG4gIHZhciBpc19zYWZhcmkgPSAvVmVyc2lvblxcL1tcXGRcXC5dKy4qU2FmYXJpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICB2YXIgd2Via2l0X3JlcV9mcyA9IHZpZXcud2Via2l0UmVxdWVzdEZpbGVTeXN0ZW07XG4gIHZhciByZXFfZnMgPSB2aWV3LnJlcXVlc3RGaWxlU3lzdGVtIHx8IHdlYmtpdF9yZXFfZnMgfHwgdmlldy5tb3pSZXF1ZXN0RmlsZVN5c3RlbTtcbiAgdmFyIHRocm93X291dHNpZGUgPSBmdW5jdGlvbiB0aHJvd19vdXRzaWRlKGV4KSB7XG4gICAgKHZpZXcuc2V0SW1tZWRpYXRlIHx8IHZpZXcuc2V0VGltZW91dCkoZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgZXg7XG4gICAgfSwgMCk7XG4gIH07XG4gIHZhciBmb3JjZV9zYXZlYWJsZV90eXBlID0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XG4gIHZhciBmc19taW5fc2l6ZSA9IDA7XG4gIC8vIHRoZSBCbG9iIEFQSSBpcyBmdW5kYW1lbnRhbGx5IGJyb2tlbiBhcyB0aGVyZSBpcyBubyBcImRvd25sb2FkZmluaXNoZWRcIiBldmVudCB0byBzdWJzY3JpYmUgdG9cbiAgdmFyIGFyYml0cmFyeV9yZXZva2VfdGltZW91dCA9IDEwMDAgKiA0MDsgLy8gaW4gbXNcbiAgdmFyIHJldm9rZSA9IGZ1bmN0aW9uIHJldm9rZShmaWxlKSB7XG4gICAgdmFyIHJldm9rZXIgPSBmdW5jdGlvbiByZXZva2VyKCkge1xuICAgICAgaWYgKHR5cGVvZiBmaWxlID09PSAnc3RyaW5nJykgLy8gZmlsZSBpcyBhbiBvYmplY3QgVVJMXG4gICAgICAgIGdldF9VUkwoKS5yZXZva2VPYmplY3RVUkwoZmlsZSk7ZWxzZSAvLyBmaWxlIGlzIGEgRmlsZVxuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH07XG4gICAgLyogLy8gVGFrZSBub3RlIFczQzpcclxuICAgIHZhclxyXG4gICAgICB1cmkgPSB0eXBlb2YgZmlsZSA9PT0gXCJzdHJpbmdcIiA/IGZpbGUgOiBmaWxlLnRvVVJMKClcclxuICAgICwgcmV2b2tlciA9IGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgICAvLyBpZGVhbHkgRG93bmxvYWRGaW5pc2hlZEV2ZW50LmRhdGEgd291bGQgYmUgdGhlIFVSTCByZXF1ZXN0ZWRcclxuICAgICAgaWYgKGV2dC5kYXRhID09PSB1cmkpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGZpbGUgPT09IFwic3RyaW5nXCIpIHsgLy8gZmlsZSBpcyBhbiBvYmplY3QgVVJMXHJcbiAgICAgICAgICBnZXRfVVJMKCkucmV2b2tlT2JqZWN0VVJMKGZpbGUpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIGZpbGUgaXMgYSBGaWxlXHJcbiAgICAgICAgICBmaWxlLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKFwiZG93bmxvYWRmaW5pc2hlZFwiLCByZXZva2VyKTtcclxuICAgICovXG4gICAgc2V0VGltZW91dChyZXZva2VyLCBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQpO1xuICB9O1xuICB2YXIgZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaChmaWxlc2F2ZXIsIGV2ZW50X3R5cGVzLCBldmVudCkge1xuICAgIGV2ZW50X3R5cGVzID0gW10uY29uY2F0KGV2ZW50X3R5cGVzKTtcbiAgICB2YXIgaSA9IGV2ZW50X3R5cGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBmaWxlc2F2ZXJbJ29uJyArIGV2ZW50X3R5cGVzW2ldXTtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsaXN0ZW5lci5jYWxsKGZpbGVzYXZlciwgZXZlbnQgfHwgZmlsZXNhdmVyKTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICB0aHJvd19vdXRzaWRlKGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgdmFyIGF1dG9fYm9tID0gZnVuY3Rpb24gYXV0b19ib20oYmxvYikge1xuICAgIC8vIHByZXBlbmQgQk9NIGZvciBVVEYtOCBYTUwgYW5kIHRleHQvKiB0eXBlcyAoaW5jbHVkaW5nIEhUTUwpXG4gICAgaWYgKC9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGJsb2IudHlwZSkpIHJldHVybiBuZXcgQmxvYihbJ++7vycsIGJsb2JdLCB7IHR5cGU6IGJsb2IudHlwZSB9KTtcbiAgICByZXR1cm4gYmxvYjtcbiAgfTtcblxuICB2YXIgRmlsZVNhdmVyID0gZnVuY3Rpb24gRmlsZVNhdmVyKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZpbGVTYXZlcik7XG5cbiAgICBpZiAoIW5vX2F1dG9fYm9tKSBibG9iID0gYXV0b19ib20oYmxvYik7XG4gICAgLy8gRmlyc3QgdHJ5IGEuZG93bmxvYWQsIHRoZW4gd2ViIGZpbGVzeXN0ZW0sIHRoZW4gb2JqZWN0IFVSTHNcbiAgICB2YXIgZmlsZXNhdmVyID0gdGhpcyxcbiAgICAgICAgdHlwZSA9IGJsb2IudHlwZSxcbiAgICAgICAgYmxvYl9jaGFuZ2VkID0gZmFsc2UsXG4gICAgICAgIG9iamVjdF91cmwsXG4gICAgICAgIHRhcmdldF92aWV3LFxuICAgICAgICBkaXNwYXRjaF9hbGwgPSBmdW5jdGlvbiBkaXNwYXRjaF9hbGwoKSB7XG4gICAgICBkaXNwYXRjaChmaWxlc2F2ZXIsICd3cml0ZXN0YXJ0IHByb2dyZXNzIHdyaXRlIHdyaXRlZW5kJy5zcGxpdCgnICcpKTtcbiAgICB9XG4gICAgLy8gb24gYW55IGZpbGVzeXMgZXJyb3JzIHJldmVydCB0byBzYXZpbmcgd2l0aCBvYmplY3QgVVJMc1xuICAgICxcbiAgICAgICAgZnNfZXJyb3IgPSBmdW5jdGlvbiBmc19lcnJvcigpIHtcbiAgICAgIGlmICh0YXJnZXRfdmlldyAmJiBpc19zYWZhcmkgJiYgdHlwZW9mIEZpbGVSZWFkZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFNhZmFyaSBkb2Vzbid0IGFsbG93IGRvd25sb2FkaW5nIG9mIGJsb2IgdXJsc1xuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgYmFzZTY0RGF0YSA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICAgICAgdGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9ICdkYXRhOmF0dGFjaG1lbnQvZmlsZScgKyBiYXNlNjREYXRhLnNsaWNlKGJhc2U2NERhdGEuc2VhcmNoKC9bLDtdLykpO1xuICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5JTklUO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBkb24ndCBjcmVhdGUgbW9yZSBvYmplY3QgVVJMcyB0aGFuIG5lZWRlZFxuICAgICAgaWYgKGJsb2JfY2hhbmdlZCB8fCAhb2JqZWN0X3VybCkge1xuICAgICAgICBvYmplY3RfdXJsID0gZ2V0X1VSTCgpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIH1cbiAgICAgIGlmICh0YXJnZXRfdmlldykge1xuICAgICAgICB0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gb2JqZWN0X3VybDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXdfdGFiID0gdmlldy5vcGVuKG9iamVjdF91cmwsICdfYmxhbmsnKTtcbiAgICAgICAgaWYgKG5ld190YWIgPT09IHVuZGVmaW5lZCAmJiBpc19zYWZhcmkpIHtcbiAgICAgICAgICAvL0FwcGxlIGRvIG5vdCBhbGxvdyB3aW5kb3cub3Blbiwgc2VlIGh0dHA6Ly9iaXQubHkvMWtaZmZSSVxuICAgICAgICAgIHZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICBkaXNwYXRjaF9hbGwoKTtcbiAgICAgIHJldm9rZShvYmplY3RfdXJsKTtcbiAgICB9LFxuICAgICAgICBhYm9ydGFibGUgPSBmdW5jdGlvbiBhYm9ydGFibGUoZnVuYykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGZpbGVzYXZlci5yZWFkeVN0YXRlICE9PSBmaWxlc2F2ZXIuRE9ORSkge1xuICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcbiAgICAgICAgY3JlYXRlX2lmX25vdF9mb3VuZCA9IHsgY3JlYXRlOiB0cnVlLCBleGNsdXNpdmU6IGZhbHNlIH0sXG4gICAgICAgIHNsaWNlO1xuXG4gICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuSU5JVDtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIG5hbWUgPSAnZG93bmxvYWQnO1xuICAgIH1cbiAgICBpZiAoY2FuX3VzZV9zYXZlX2xpbmspIHtcbiAgICAgIG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNhdmVfbGluay5ocmVmID0gb2JqZWN0X3VybDtcbiAgICAgICAgc2F2ZV9saW5rLmRvd25sb2FkID0gbmFtZTtcbiAgICAgICAgY2xpY2soc2F2ZV9saW5rKTtcbiAgICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICAgIHJldm9rZShvYmplY3RfdXJsKTtcbiAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBPYmplY3QgYW5kIHdlYiBmaWxlc3lzdGVtIFVSTHMgaGF2ZSBhIHByb2JsZW0gc2F2aW5nIGluIEdvb2dsZSBDaHJvbWUgd2hlblxuICAgIC8vIHZpZXdlZCBpbiBhIHRhYiwgc28gSSBmb3JjZSBzYXZlIHdpdGggYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXG4gICAgLy8gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9OTExNThcbiAgICAvLyBVcGRhdGU6IEdvb2dsZSBlcnJhbnRseSBjbG9zZWQgOTExNTgsIEkgc3VibWl0dGVkIGl0IGFnYWluOlxuICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zODk2NDJcbiAgICBpZiAodmlldy5jaHJvbWUgJiYgdHlwZSAmJiB0eXBlICE9PSBmb3JjZV9zYXZlYWJsZV90eXBlKSB7XG4gICAgICBzbGljZSA9IGJsb2Iuc2xpY2UgfHwgYmxvYi53ZWJraXRTbGljZTtcbiAgICAgIGJsb2IgPSBzbGljZS5jYWxsKGJsb2IsIDAsIGJsb2Iuc2l6ZSwgZm9yY2Vfc2F2ZWFibGVfdHlwZSk7XG4gICAgICBibG9iX2NoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBTaW5jZSBJIGNhbid0IGJlIHN1cmUgdGhhdCB0aGUgZ3Vlc3NlZCBtZWRpYSB0eXBlIHdpbGwgdHJpZ2dlciBhIGRvd25sb2FkXG4gICAgLy8gaW4gV2ViS2l0LCBJIGFwcGVuZCAuZG93bmxvYWQgdG8gdGhlIGZpbGVuYW1lLlxuICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD02NTQ0MFxuICAgIGlmICh3ZWJraXRfcmVxX2ZzICYmIG5hbWUgIT09ICdkb3dubG9hZCcpIHtcbiAgICAgIG5hbWUgKz0gJy5kb3dubG9hZCc7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBmb3JjZV9zYXZlYWJsZV90eXBlIHx8IHdlYmtpdF9yZXFfZnMpIHtcbiAgICAgIHRhcmdldF92aWV3ID0gdmlldztcbiAgICB9XG4gICAgaWYgKCFyZXFfZnMpIHtcbiAgICAgIGZzX2Vycm9yKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZzX21pbl9zaXplICs9IGJsb2Iuc2l6ZTtcbiAgICByZXFfZnModmlldy5URU1QT1JBUlksIGZzX21pbl9zaXplLCBhYm9ydGFibGUoZnVuY3Rpb24gKGZzKSB7XG4gICAgICBmcy5yb290LmdldERpcmVjdG9yeSgnc2F2ZWQnLCBjcmVhdGVfaWZfbm90X2ZvdW5kLCBhYm9ydGFibGUoZnVuY3Rpb24gKGRpcikge1xuICAgICAgICB2YXIgc2F2ZSA9IGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgICAgICAgZGlyLmdldEZpbGUobmFtZSwgY3JlYXRlX2lmX25vdF9mb3VuZCwgYWJvcnRhYmxlKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgICAgICBmaWxlLmNyZWF0ZVdyaXRlcihhYm9ydGFibGUoZnVuY3Rpb24gKHdyaXRlcikge1xuICAgICAgICAgICAgICB3cml0ZXIub253cml0ZWVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSBmaWxlLnRvVVJMKCk7XG4gICAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChmaWxlc2F2ZXIsICd3cml0ZWVuZCcsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICByZXZva2UoZmlsZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHdyaXRlci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHdyaXRlci5lcnJvcjtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSAhPT0gZXJyb3IuQUJPUlRfRVJSKSB7XG4gICAgICAgICAgICAgICAgICBmc19lcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgJ3dyaXRlc3RhcnQgcHJvZ3Jlc3Mgd3JpdGUgYWJvcnQnLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB3cml0ZXJbJ29uJyArIGV2ZW50XSA9IGZpbGVzYXZlclsnb24nICsgZXZlbnRdO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3JpdGVyLndyaXRlKGJsb2IpO1xuICAgICAgICAgICAgICBmaWxlc2F2ZXIuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgd3JpdGVyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuV1JJVElORztcbiAgICAgICAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgICAgICAgfSksIGZzX2Vycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyLmdldEZpbGUobmFtZSwgeyBjcmVhdGU6IGZhbHNlIH0sIGFib3J0YWJsZShmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgIC8vIGRlbGV0ZSBmaWxlIGlmIGl0IGFscmVhZHkgZXhpc3RzXG4gICAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgICAgICBzYXZlKCk7XG4gICAgICAgIH0pLCBhYm9ydGFibGUoZnVuY3Rpb24gKGV4KSB7XG4gICAgICAgICAgaWYgKGV4LmNvZGUgPT09IGV4Lk5PVF9GT1VORF9FUlIpIHtcbiAgICAgICAgICAgIHNhdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnNfZXJyb3IoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgfSksIGZzX2Vycm9yKTtcbiAgfTtcblxuICB2YXIgRlNfcHJvdG8gPSBGaWxlU2F2ZXIucHJvdG90eXBlO1xuICB2YXIgc2F2ZUFzID0gZnVuY3Rpb24gc2F2ZUFzKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG4gICAgcmV0dXJuIG5ldyBGaWxlU2F2ZXIoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pO1xuICB9O1xuXG4gIC8vIElFIDEwKyAobmF0aXZlIHNhdmVBcylcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuICAgICAgaWYgKCFub19hdXRvX2JvbSkgYmxvYiA9IGF1dG9fYm9tKGJsb2IpO1xuICAgICAgcmV0dXJuIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGJsb2IsIG5hbWUgfHwgJ2Rvd25sb2FkJyk7XG4gICAgfTtcbiAgfVxuXG4gIEZTX3Byb3RvLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmaWxlc2F2ZXIgPSB0aGlzO1xuICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgZGlzcGF0Y2goZmlsZXNhdmVyLCAnYWJvcnQnKTtcbiAgfTtcbiAgRlNfcHJvdG8ucmVhZHlTdGF0ZSA9IEZTX3Byb3RvLklOSVQgPSAwO1xuICBGU19wcm90by5XUklUSU5HID0gMTtcbiAgRlNfcHJvdG8uRE9ORSA9IDI7XG5cbiAgRlNfcHJvdG8uZXJyb3IgPSBGU19wcm90by5vbndyaXRlc3RhcnQgPSBGU19wcm90by5vbnByb2dyZXNzID0gRlNfcHJvdG8ub253cml0ZSA9IEZTX3Byb3RvLm9uYWJvcnQgPSBGU19wcm90by5vbmVycm9yID0gRlNfcHJvdG8ub253cml0ZWVuZCA9IG51bGw7XG5cbiAgcmV0dXJuIHNhdmVBcztcbn0odHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgfHwgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93IHx8IHVuZGVmaW5lZC5jb250ZW50KTtcbi8vIGBzZWxmYCBpcyB1bmRlZmluZWQgaW4gRmlyZWZveCBmb3IgQW5kcm9pZCBjb250ZW50IHNjcmlwdCBjb250ZXh0XG4vLyB3aGlsZSBgdGhpc2AgaXMgbnNJQ29udGVudEZyYW1lTWVzc2FnZU1hbmFnZXJcbi8vIHdpdGggYW4gYXR0cmlidXRlIGBjb250ZW50YCB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSB3aW5kb3dcblxuZXhwb3J0cy5kZWZhdWx0ID0gc2F2ZUFzOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcydcbmltcG9ydCB7IHRlc3RCb29rbWFyayB9IGZyb20gJy4vYm9va21hcmsnXG5pbXBvcnQgeyBhZGRJbXBvcnRIYW5kbGVycyB9IGZyb20gJy4uL2NvbW1vbi9pbXBvcnQnXG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vc3RvcmFnZSdcbmltcG9ydCB7IHVybFJlbmRlcmVyIH0gZnJvbSAnLi4vY29tbW9uL3VybHMnXG5pbXBvcnQgeyBzb3VyY2VSZW5kZXJlciB9IGZyb20gJy4uL2NvbW1vbi9zb3VyY2VzJ1xuaW1wb3J0IHsgbWFya1JlZnJlc2hlZCwgcmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIsIHVwZGF0ZVByb2dyZXNzIH0gZnJvbSAnLi4vY29tbW9uL3Byb2dyZXNzLWJhcidcbmltcG9ydCB7IGNyZWF0ZVNjaGVkdWxlIH0gZnJvbSAnLi4vY29tbW9uL3NjaGVkdWxlJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZW51TGlzdGVuZXJzIH0gZnJvbSAnLi4vY29tbW9uL21lbnUnXG5pbXBvcnQgeyBhZGRTZXR0aW5nc0hhbmRsZXJzIH0gZnJvbSAnLi4vY29tbW9uL3NldHRpbmdzJ1xuaW1wb3J0IHsgQVBJIH0gZnJvbSAnLi4vY29tbW9uL2FwaSdcbmltcG9ydCB7IEFQSV9BRERSRVNTIH0gZnJvbSAnLi9jb25zdGFudHMnXG5pbXBvcnQgeyBpbml0SW50cm8gfSBmcm9tICcuL2ludHJvJ1xuaW1wb3J0IHsgcmVuZGVySG9zdExpc3QgfSBmcm9tICcuLi9jb21tb24vaG9zdHMnXG5cbmNvbnN0IGFwaSA9IEFQSShBUElfQUREUkVTUylcblxuZGIudXJscy5zZXRNYXhPbGQoMTAwKVxuXG5jb25zdCBVcmxzID0gdXJsUmVuZGVyZXIoZGIpXG5jb25zdCBTb3VyY2VzID0gc291cmNlUmVuZGVyZXIoZGIpXG5cbmRiLm9uQ2hhbmdlKChjaGFuZ2VzKSA9PiB7XG4gICAgaWYgKFsnaGlkZScsICdoaWRkZW5DaGFwdGVycycsICd1cmxzJ10uc29tZShjaGFuZ2VzLmhhc093blByb3BlcnR5LmJpbmQoY2hhbmdlcykpKSB7XG4gICAgICAgIFVybHMucmVuZGVyKClcbiAgICB9XG4gICAgaWYgKE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUoKGNoYW5nZSkgPT4gY2hhbmdlLmluY2x1ZGVzKCdzb3VyY2VzJykpIHx8IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjaGFuZ2VzLCAnbWF4T2xkJykpIHtcbiAgICAgICAgU291cmNlcy5yZW5kZXIoKVxuICAgIH1cbn0pXG5cbm5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIucG9zdE1lc3NhZ2UoJ0ZFVENIX0NIQVBURVJTJylcbm1hcmtSZWZyZXNoZWQoKVxuXG5jb25zdCBpbnRlcnZhbCA9IGNyZWF0ZVNjaGVkdWxlKHtcbiAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5jb250cm9sbGVyLnBvc3RNZXNzYWdlKCdGRVRDSF9DSEFQVEVSUycpXG4gICAgICAgIG1hcmtSZWZyZXNoZWQoKVxuICAgIH0sXG4gICAgaW50ZXJ2YWw6IDYwICogMTAwMCxcbiAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICB1cGRhdGVyOiB1cGRhdGVQcm9ncmVzc1xufSlcblxuaW5pdEludHJvKClcbnJlc2lzdGVyUHJvZ3Jlc3NIYW5kbGVyKCgpID0+IGludGVydmFsLnRyaWdnZXJJbnN0YW50bHkoKSlcbmFkZEltcG9ydEhhbmRsZXJzKGRiKVxuYWRkU2V0dGluZ3NIYW5kbGVycyhkYiwgYXBpKVxucmVnaXN0ZXJNZW51TGlzdGVuZXJzKGRiLCBhcGkpXG5yZW5kZXJIb3N0TGlzdChkYiwgYXBpKVxuXG5VcmxzLnJlbmRlcigpXG5Tb3VyY2VzLnJlbmRlcigpXG4gICAgLnRoZW4odGVzdEJvb2ttYXJrKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==