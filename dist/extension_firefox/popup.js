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
                _context.next = 9;
                break;
              }

              _context.next = 8;
              return hide(closestLink.dataset['id']);

            case 8:
              window.open(closestLink.href, '_blank');

            case 9:
              closestMore = event.target.closest('.action.load-more');

              if (!(closestMore && urls.contains(closestMore))) {
                _context.next = 16;
                break;
              }

              _context.next = 13;
              return db.urls.getMaxOld();

            case 13:
              maxOld = _context.sent;
              _context.next = 16;
              return db.urls.setMaxOld(maxOld + 100);

            case 16:
              hideAll = event.target.closest('.hide-all');

              if (!(hideAll && urls.contains(hideAll))) {
                _context.next = 20;
                break;
              }

              _context.next = 20;
              return db.urls.hideAll(Date.now());

            case 20:
              top = event.target.closest('.top');

              if (top && urls.contains(top)) {
                urls.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }

            case 22:
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
                document.title = newRows.length ? "(".concat(newRows.length, ") Manga Scout") : 'Manga Scout';
                checkTopButton();
              } else {
                intro.style.display = 'none';
                urls.innerHTML = '<li class="row">No Chapters available.</li>';
                document.title = 'Manga Scout';
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




var controller = chrome || browser;
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
controller.runtime.onMessage.addListener( /*#__PURE__*/function () {
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
  controller.tabs.query({
    active: true,
    windowId: controller.windows.WINDOW_ID_CURRENT
  }, function (tabs) {
    if (tabs[0].url.includes('http://') || tabs[0].url.includes('https://')) {
      controller.scripting.executeScript({
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
    controller.runtime.sendMessage(result);
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
  var _chrome, _browser;

  var runtime = ((_chrome = chrome) === null || _chrome === void 0 ? void 0 : _chrome.runtime) || ((_browser = browser) === null || _browser === void 0 ? void 0 : _browser.runtime);
  var bookmarkImage = document.getElementById('intro-bookmark');
  bookmarkImage.src = runtime.getURL('images/bookmark-sample.png');
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
var _chrome, _browser;


var browserStorage = ((_chrome = chrome) === null || _chrome === void 0 ? void 0 : _chrome.storage) || ((_browser = browser) === null || _browser === void 0 ? void 0 : _browser.storage);

function read(namespace, keys) {
  return new Promise(function (resolve) {
    return browserStorage[namespace].get(keys, resolve);
  });
}

function write(namespace, keyPairs) {
  return new Promise(function (resolve) {
    return browserStorage[namespace].set(keyPairs, resolve);
  });
}

function addListener(callback) {
  return browserStorage.onChanged.addListener(callback);
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
/*!***********************************!*\
  !*** ./src/extension_ff/popup.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _extension_bookmark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../extension/bookmark */ "./src/extension/bookmark.js");
/* harmony import */ var _common_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/import */ "./src/common/import.js");
/* harmony import */ var _extension_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../extension/storage */ "./src/extension/storage.js");
/* harmony import */ var _common_urls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/urls */ "./src/common/urls.js");
/* harmony import */ var _common_sources__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/sources */ "./src/common/sources.js");
/* harmony import */ var _common_progress_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/progress-bar */ "./src/common/progress-bar.js");
/* harmony import */ var _common_schedule__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/schedule */ "./src/common/schedule.js");
/* harmony import */ var _common_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/menu */ "./src/common/menu.js");
/* harmony import */ var _common_settings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/settings */ "./src/common/settings.js");
/* harmony import */ var _common_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/api */ "./src/common/api.js");
/* harmony import */ var _extension_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../extension/constants */ "./src/extension/constants.js");
/* harmony import */ var _extension_intro__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../extension/intro */ "./src/extension/intro.js");
/* harmony import */ var _common_hosts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../common/hosts */ "./src/common/hosts.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }















var api = (0,_common_api__WEBPACK_IMPORTED_MODULE_10__.API)(_extension_constants__WEBPACK_IMPORTED_MODULE_11__.API_ADDRESS);
var Links = (0,_common_settings__WEBPACK_IMPORTED_MODULE_9__.getLinkHelpers)(_extension_storage__WEBPACK_IMPORTED_MODULE_3__.db, api);

function fetchUrls() {
  return _fetchUrls.apply(this, arguments);
}

function _fetchUrls() {
  _fetchUrls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var maxOld, hide, sources;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Links.fetchLinkUpdate();

          case 2:
            _context.next = 4;
            return _extension_storage__WEBPACK_IMPORTED_MODULE_3__.db.urls.getMaxOld();

          case 4:
            maxOld = _context.sent;
            _context.next = 7;
            return _extension_storage__WEBPACK_IMPORTED_MODULE_3__.db.urls.getHide();

          case 7:
            hide = _context.sent;
            _context.next = 10;
            return _extension_storage__WEBPACK_IMPORTED_MODULE_3__.db.sources.read();

          case 10:
            sources = _context.sent;
            _context.next = 13;
            return api.Urls.read(sources.map(function (source) {
              return source.id;
            }), maxOld, hide).then(_extension_storage__WEBPACK_IMPORTED_MODULE_3__.db.urls.import);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchUrls.apply(this, arguments);
}

_extension_storage__WEBPACK_IMPORTED_MODULE_3__.db.urls.setMaxOld(100);
var Urls = (0,_common_urls__WEBPACK_IMPORTED_MODULE_4__.urlRenderer)(_extension_storage__WEBPACK_IMPORTED_MODULE_3__.db);
var Sources = (0,_common_sources__WEBPACK_IMPORTED_MODULE_5__.sourceRenderer)(_extension_storage__WEBPACK_IMPORTED_MODULE_3__.db);
_extension_storage__WEBPACK_IMPORTED_MODULE_3__.db.onChange(function (changes) {
  if (['hide', 'hiddenChapters', 'urls'].some(changes.hasOwnProperty.bind(changes))) {
    Urls.render();
  }

  if (Object.keys(changes).some(function (change) {
    return change.includes('sources');
  }) || Object.prototype.hasOwnProperty.call(changes, 'maxOld')) {
    Sources.render();
  }
});
fetchUrls();
(0,_common_progress_bar__WEBPACK_IMPORTED_MODULE_6__.markRefreshed)();
var interval = (0,_common_schedule__WEBPACK_IMPORTED_MODULE_7__.createSchedule)({
  callback: function callback() {
    fetchUrls();
    (0,_common_progress_bar__WEBPACK_IMPORTED_MODULE_6__.markRefreshed)();
  },
  interval: 60 * 1000,
  isActive: true,
  updater: _common_progress_bar__WEBPACK_IMPORTED_MODULE_6__.updateProgress
});
(0,_extension_intro__WEBPACK_IMPORTED_MODULE_12__.initIntro)();
(0,_common_progress_bar__WEBPACK_IMPORTED_MODULE_6__.resisterProgressHandler)(function () {
  return interval.triggerInstantly();
});
(0,_common_import__WEBPACK_IMPORTED_MODULE_2__.addImportHandlers)(_extension_storage__WEBPACK_IMPORTED_MODULE_3__.db);
(0,_common_settings__WEBPACK_IMPORTED_MODULE_9__.addSettingsHandlers)(_extension_storage__WEBPACK_IMPORTED_MODULE_3__.db, api);
(0,_common_menu__WEBPACK_IMPORTED_MODULE_8__.registerMenuListeners)(_extension_storage__WEBPACK_IMPORTED_MODULE_3__.db, api);
(0,_common_hosts__WEBPACK_IMPORTED_MODULE_13__.renderHostList)(_extension_storage__WEBPACK_IMPORTED_MODULE_3__.db, api);
Urls.render();
Sources.render().then(_extension_bookmark__WEBPACK_IMPORTED_MODULE_1__.testBookmark);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2RiLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vaG9zdHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9pbXBvcnQuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9tZW51LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vcHJvZ3Jlc3MtYmFyLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vc2NoZWR1bGUuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3NvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi91cmxzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9ib29rbWFyay5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL2ludHJvLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9leHRlbnNpb24vc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL25vZGVfbW9kdWxlcy9zYXZlLWFzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21hbmdhY2hlY2tlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbl9mZi9wb3B1cC5qcyJdLCJuYW1lcyI6WyJBUEkiLCJiYXNlVXJsIiwicG9zdFNvdXJjZSIsInNvdXJjZSIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwiQWNjZXB0IiwidGhlbiIsInJlcyIsImpzb24iLCJjYXRjaCIsImVycm9yIiwidmFsaWQiLCJkYXRhIiwicGF5bG9hZCIsImFkZFNvdXJjZUZyb21VcmwiLCJ1cmwiLCJyZWFkVXJscyIsInNvdXJjZXMiLCJsaW1pdCIsImRhdGUiLCJhZGRTdWJzY3JpcHRpb25zIiwidG9waWNzIiwia2V5IiwiZGVsZXRlU3Vic2NyaXB0aW9ucyIsInJlYWRMaW5rIiwiY2hhbmdlZFNpbmNlIiwic3RhdHVzIiwicmVhZEhvc3RzIiwidXBkYXRlTGluayIsInVwZGF0ZVNldCIsImNyZWF0ZUxpbmsiLCJpbml0U2V0IiwiVXJscyIsInJlYWQiLCJTb3VyY2UiLCJpbnNlcnQiLCJmcm9tVXJsIiwiU3Vic2NyaXB0aW9uIiwic3Vic2NyaWJlIiwidW5zdWJzY3JpYmUiLCJMaW5rIiwidXBkYXRlIiwiSG9zdHMiLCJOQU1FU1BBQ0VTIiwiU1lOQyIsIkxPQ0FMIiwiY3JlYXRlREIiLCJzdG9yYWdlIiwid3JpdGUiLCJyZWFkU291cmNlcyIsInJlZ2lzdHJ5IiwicGFyc2UiLCJyZWR1Y2UiLCJQcm9taXNlIiwiYWxsIiwiY29uY2F0IiwicmVzb2x2ZSIsIndyaXRlU291cmNlcyIsInVwZGF0ZXMiLCJ4IiwiTWF0aCIsIm1heCIsImNlaWwiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJhZGRTb3VyY2UiLCJzb21lIiwibWFuZ2FJZCIsImRlbGV0ZVNvdXJjZSIsInNvdXJjZUlkIiwibmV3U291cmNlcyIsImZpbHRlciIsImlkIiwiaXNEaXJ0eSIsInVybHMiLCJnZXRGaWx0ZXJlZFNvcnRlZFVybHMiLCJoaWRkZW5DaGFwdGVycyIsImhpZGUiLCJoaWRkZW5DaGFwdGVyc1N0cmluZyIsInVybExpc3QiLCJjaGVja09sZCIsImNoYXB0ZXIiLCJjcmVhdGVkIiwiT2JqZWN0IiwidmFsdWVzIiwic29ydCIsInVybDEiLCJ1cmwyIiwiZGlmZiIsImFicyIsIlN0cmluZyIsImxvY2FsZUNvbXBhcmUiLCJvbGRVcmxzIiwibmV3VXJscyIsImhpZGVVcmwiLCJyZXN1bHQiLCJoaWRlQWxsVXJscyIsInRpbWVzdGFtcCIsIndyaXRlVXJscyIsImluaXQiLCJ0b2RheSIsIkRhdGUiLCJzZXRIb3VycyIsImdldFRpbWUiLCJzZXRNYXhPbGQiLCJtYXhPbGQiLCJnZXRNYXhPbGQiLCJzZXRMaW5rIiwibGluayIsImdldExpbmsiLCJnZXRIaWRlIiwid3JpdGVMb2NhbFNldHRpbmdzIiwic2V0dGluZ3MiLCJsb2NhbFNldHRpbmdzIiwiZ2V0TG9jYWxTZXR0aW5ncyIsImdldExpbmtEYXRhIiwibWFwIiwiTnVtYmVyIiwic2V0TGlua0RhdGEiLCJzdG9yZWRTb3VyY2VzIiwic3MiLCJoYXNDaGFuZ2VkU291cmNlcyIsImtleXMiLCJwcm9taXNlcyIsImhpZGRlbiIsImltcG9ydCIsImFkZCIsImRlbGV0ZSIsImxvY2FsIiwic2V0IiwiaGlkZUFsbCIsIm9uQ2hhbmdlIiwiYWRkTGlzdGVuZXIiLCJzZXRMb2NhbCIsInJlbmRlckhvc3RMaXN0IiwiX2RiIiwiYXBpIiwiaG9zdENvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhvc3RzIiwiaG9zdExpc3QiLCJzdGFibGUiLCJhIiwiYiIsIm5hbWUiLCJob3N0Iiwiam9pbiIsImlubmVySFRNTCIsInVuc3RhYmxlIiwiYWRkSW1wb3J0SGFuZGxlcnMiLCJkYiIsImltcG9ydEVsZW0iLCJnZXRFbGVtZW50QnlJZCIsImV4cG9ydEVsZW0iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZpbGUiLCJ0YXJnZXQiLCJmaWxlcyIsImZyIiwiRmlsZVJlYWRlciIsImNsZWFuIiwidGl0bGUiLCJyZWFkQXNUZXh0IiwiYmxvYiIsIkJsb2IiLCJ0eXBlIiwic2F2ZUFzIiwicmVnaXN0ZXJNZW51TGlzdGVuZXJzIiwiQXBpIiwiaW1wb3J0U2VjdGlvbiIsInBvcHVwVGl0bGUiLCJib29rbWFya3MiLCJjaGFwdGVycyIsImFkZFNlY3Rpb24iLCJzZXR0aW5nc1NlY3Rpb24iLCJwcm9ncmVzcyIsImludHJvIiwib3BlbkNoYXB0ZXJzIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5uZXJUZXh0Iiwib3BlblNldHRpbmdzIiwiZ2V0TGlua1F1ZXJ5IiwibGlua0lmVW5saW5rZWQiLCJsb2NrZWQiLCJyZXNpc3RlclByb2dyZXNzSGFuZGxlciIsInVwZGF0ZU5vdyIsIm1hcmtSZWZyZXNoZWQiLCJkYXRhc2V0IiwiYmVmb3JlIiwic2V0VGltZW91dCIsInVwZGF0ZVByb2dyZXNzIiwiX2xhc3RQaW5nIiwibmV4dFBpbmciLCJyZW1haW5pbmciLCJub3ciLCJzZWNvbmRzIiwicm91bmQiLCJjcmVhdGVTY2hlZHVsZSIsImlzQWN0aXZlIiwiaW50ZXJ2YWwiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwicHJvdG90eXBlIiwidXBkYXRlciIsImxhc3RQaW5nIiwiY2FsbENhbGxiYWNrIiwidGltZXIiLCJzZXRJbnRlcnZhbCIsIm5ld0ludGVydmFsIiwiRXJyb3IiLCJzZXRDYWxsYmFjayIsImNiIiwic3RhcnQiLCJ0cmlnZ2VySW5zdGFudGx5Iiwic3RvcCIsImNsZWFySW50ZXJ2YWwiLCJsaW5rRmllbGRzIiwiZm9ybWF0S2V5IiwiZ2V0TGlua0hlbHBlcnMiLCJwdXNoTGlua1VwZGF0ZSIsImNoYW5nZXMiLCJjaGFuZ2VzZXQiLCJjaGFuZ2UiLCJpbmNsdWRlcyIsImZldGNoTGlua1VwZGF0ZSIsImxhc3RNb2RpZmllZCIsImlzVmFsaWRMaW5rS2V5IiwiY2xlYW5LZXkiLCJyZXBsYWNlQWxsIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJnZXQiLCJjdXJyZW50TGluayIsImxpbmtJbnB1dDEiLCJsaW5rSW5wdXQyIiwibGlua0lucHV0MyIsInZhbHVlIiwiY29ubmVjdFRvTGluayIsImxpbmtOdW1iZXJUZXh0IiwibGlua0xpbmsiLCJsaW5rTGlua1RleHQiLCJocmVmIiwiY29sb3IiLCJsaW5rTGlua1dhcm4iLCJ3YXJuTGlua0N1cnJlbnQiLCJ3YXJuTGlua05ldyIsImxpbmtFcnJvciIsImxpbmtQcm9ncmVzcyIsImxpbmtCdXR0b24iLCJkaXNhYmxlZCIsImxpbmtSZXN1bHQiLCJhZGRTZXR0aW5nc0hhbmRsZXJzIiwid3JpdGVTdGF0ZVRvRG9tIiwibGlua2luZ1NlY3Rpb24iLCJ1bmxpbmtTZWN0aW9uIiwiY2xhc3NMaXN0IiwidW5saW5rQnV0dG9uIiwibnVtYmVyIiwiZm9jdXMiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImxpbmtEYXRhIiwibmV3TGlua1Jlc3VsdCIsInVuZGVmaW5lZCIsImRhcmtNb2RlSW5wdXQiLCJkYXJrIiwiY2hlY2tlZCIsInJlbW92ZSIsInNvdXJjZVJlbmRlcmVyIiwiZXZlbnQiLCJjbG9zZXN0IiwiY29udGFpbnMiLCJyZW5kZXJTb3VyY2VzIiwic291cmNlMSIsInNvdXJjZTIiLCJyZXBsYWNlIiwic3BsaXQiLCJyZW5kZXIiLCJ1cmxSZW5kZXJlciIsImxhdGVzdENoYXB0ZXJEYXRlIiwibGNkIiwiY2xvc2VzdEhpZGUiLCJjbG9zZXN0TGluayIsIm9wZW4iLCJjbG9zZXN0TW9yZSIsInRvcCIsInNjcm9sbFRvIiwiYmVoYXZpb3IiLCJtYXhTY3JvbGwiLCJzY3JvbGxIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJzY3JvbGxUb3AiLCJjaGVja1RvcEJ1dHRvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNyZWF0ZVVybFJlbmRlcmVyIiwiaXNPbGQiLCJ0aW1lU3RyaW5nIiwicGFkIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZGF0ZVN0cmluZyIsImdldERhdGUiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiZnVsbERhdGUiLCJ0b0lTT1N0cmluZyIsInJlbmRlclVybHMiLCJuZXdSb3dzIiwib2xkUm93cyIsInN0cmluZyIsImZhbGxiYWNrIiwibm8iLCJjb250cm9sbGVyIiwiY2hyb21lIiwiYnJvd3NlciIsImN1cnJlbnRTb3VyY2UiLCJib29rbWFyayIsImJvb2ttYXJrVHJhY2siLCJib29rbWFya1RpdGxlIiwiQVBJX0FERFJFU1MiLCJydW50aW1lIiwib25NZXNzYWdlIiwicmVxdWVzdCIsInRlc3RCb29rbWFyayIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsIndpbmRvd0lkIiwid2luZG93cyIsIldJTkRPV19JRF9DVVJSRU5UIiwic2NyaXB0aW5nIiwiZXhlY3V0ZVNjcmlwdCIsInRhYklkIiwiZnVuY3Rpb24iLCJ0ZXN0IiwiZGVjb2RlSFRNTEVudGl0aWVzIiwic3RyIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInRlc3RGYW5Gb3giLCJwYXRobmFtZSIsIm1hdGNoIiwib3JpZ2luIiwidGVzdE1hbmdhc3RyZWFtIiwiYnJlYWRjcnVtcExpbmsiLCJ0ZXN0TWFuZ2FkZXgiLCJ0ZXN0R2Vua2FuIiwidHJpbSIsImNvbnRlbnQiLCJ0ZXN0TGV2aWF0aGFuIiwiaGVhZGVyIiwidGl0bGVzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsInNjcmlwdCIsImhlYWRsaW5lIiwiZmluZCIsImgiLCJjaGlsZE5vZGVzIiwibm9kZSIsIm5vZGVUeXBlIiwidGl0bGUxIiwidGl0bGUyIiwidGVzdE1hZGFyYSIsImlkcyIsIm1hbmdhIiwibWFuZ2FfaWQiLCJpZDEiLCJpZDIiLCJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnRFbGVtZW50Iiwic2VuZE1lc3NhZ2UiLCJ0cmlnZ2VyVGVzdCIsImluaXRJbnRybyIsImJvb2ttYXJrSW1hZ2UiLCJzcmMiLCJnZXRVUkwiLCJicm93c2VyU3RvcmFnZSIsIm5hbWVzcGFjZSIsImtleVBhaXJzIiwib25DaGFuZ2VkIiwiTGlua3MiLCJmZXRjaFVybHMiLCJTb3VyY2VzIiwiaGFzT3duUHJvcGVydHkiLCJiaW5kIiwiY2FsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTyxJQUFNQSxHQUFHLEdBQUcsU0FBTkEsR0FBTSxHQUFrQjtBQUFBLE1BQWpCQyxPQUFpQix1RUFBUCxFQUFPOztBQUNqQyxXQUFTQyxVQUFULENBQXFCQyxNQUFyQixFQUE2QjtBQUN6QixXQUFPQyxLQUFLLFdBQUlILE9BQUosbUJBQTJCO0FBQ25DSSxZQUFNLEVBQUUsTUFEMkI7QUFFbkNDLFVBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVMLE1BQWYsQ0FGNkI7QUFHbkNNLGFBQU8sRUFBRTtBQUNMQyxjQUFNLEVBQUUsa0JBREg7QUFFTCx3QkFBZ0I7QUFGWDtBQUgwQixLQUEzQixDQUFMLENBUUZDLElBUkUsQ0FRRyxVQUFDQyxHQUFEO0FBQUEsYUFBU0EsR0FBRyxDQUFDQyxJQUFKLEVBQVQ7QUFBQSxLQVJILEVBU0ZDLEtBVEUsQ0FTSSxVQUFDQyxLQUFEO0FBQUEsYUFBWTtBQUFFQyxhQUFLLEVBQUUsS0FBVDtBQUFnQkQsYUFBSyxFQUFMQTtBQUFoQixPQUFaO0FBQUEsS0FUSixFQVVGSixJQVZFLENBVUcsVUFBQ00sSUFBRDtBQUFBLGFBQVVBLElBQUksQ0FBQ0MsT0FBZjtBQUFBLEtBVkgsQ0FBUDtBQVdI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Q0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNB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aUIsa0RBQUQsRUFBS2YsR0FBTCxDQUFkO0FBRUF6RyxJQUFJLENBQUMyUCxNQUFMO0FBQ0E2RyxPQUFPLENBQUM3RyxNQUFSLEdBQ0tyUixJQURMLENBQ1VtVSw2REFEVixFIiwiZmlsZSI6ImV4dGVuc2lvbl9maXJlZm94L3BvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEFQSSA9IChiYXNlVXJsID0gJycpID0+IHtcclxuICAgIGZ1bmN0aW9uIHBvc3RTb3VyY2UgKHNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc291cmNlc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNvdXJjZSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEucGF5bG9hZClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRTb3VyY2VGcm9tVXJsICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3NvdXJjZXMvYWRkRnJvbVVybGAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXJsIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZFVybHMgKHNvdXJjZXMgPSBbXSwgbGltaXQgPSAnJywgZGF0ZSA9ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFxyXG4gICAgICAgICAgICBgJHtiYXNlVXJsfS9hcGkvdXJscy9mZXRjaGAsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5wYXlsb2FkIHx8IFtdKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFN1YnNjcmlwdGlvbnMgKHRvcGljcyA9IFtdLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3N1YnNjcmlwdGlvbnNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB0b3BpY3MsXHJcbiAgICAgICAgICAgICAgICBrZXk6IGtleVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZVN1YnNjcmlwdGlvbnMgKHRvcGljcyA9IFtdLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3N1YnNjcmlwdGlvbnNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHRvcGljcyxcclxuICAgICAgICAgICAgICAgIGtleToga2V5XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZExpbmsgKGtleSwgY2hhbmdlZFNpbmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rcy8ke2tleX0ke2NoYW5nZWRTaW5jZSA/IGA/Y2hhbmdlZFNpbmNlPSR7Y2hhbmdlZFNpbmNlfWAgOiAnJ31gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnN0YXR1cyA9PT0gMzA0ID8gKHsgdmFsaWQ6IHRydWUsIHBheWxvYWQ6IG51bGwgfSkgOiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWRIb3N0cyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9zb3VyY2VzL2hvc3RzYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5zdGF0dXMgPT09IDMwNCA/ICh7IHZhbGlkOiB0cnVlLCBwYXlsb2FkOiBudWxsIH0pIDogcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVMaW5rIChrZXksIHVwZGF0ZVNldCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvbGlua3MvJHtrZXl9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwdXQnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1cGRhdGVTZXQpLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTGluayAoaW5pdFNldCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvbGlua3NgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbml0U2V0KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgVXJsczoge1xyXG4gICAgICAgICAgICByZWFkOiByZWFkVXJsc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU291cmNlOiB7XHJcbiAgICAgICAgICAgIGluc2VydDogcG9zdFNvdXJjZSxcclxuICAgICAgICAgICAgZnJvbVVybDogYWRkU291cmNlRnJvbVVybFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU3Vic2NyaXB0aW9uOiB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZTogYWRkU3Vic2NyaXB0aW9ucyxcclxuICAgICAgICAgICAgdW5zdWJzY3JpYmU6IGRlbGV0ZVN1YnNjcmlwdGlvbnNcclxuICAgICAgICB9LFxyXG4gICAgICAgIExpbms6IHtcclxuICAgICAgICAgICAgaW5zZXJ0OiBjcmVhdGVMaW5rLFxyXG4gICAgICAgICAgICB1cGRhdGU6IHVwZGF0ZUxpbmssXHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRMaW5rXHJcbiAgICAgICAgfSxcclxuICAgICAgICBIb3N0czoge1xyXG4gICAgICAgICAgICByZWFkOiByZWFkSG9zdHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcGFyc2UgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuY29uc3QgTkFNRVNQQUNFUyA9IHtcclxuICAgIFNZTkM6ICdzeW5jJyxcclxuICAgIExPQ0FMOiAnbG9jYWwnXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEQiAoc3RvcmFnZSkge1xyXG4gICAgY29uc3QgeyByZWFkLCB3cml0ZSB9ID0gc3RvcmFnZVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlYWRTb3VyY2VzICgpIHtcclxuICAgICAgICBjb25zdCB7IHJlZ2lzdHJ5IH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyByZWdpc3RyeTogJ1tcInNvdXJjZXMtMVwiXScgfSlcclxuICAgICAgICByZXR1cm4gcGFyc2UocmVnaXN0cnksIFsnc291cmNlcy0xJ10pXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHNvdXJjZXMsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtzb3VyY2VzLCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBba2V5XTogJ1tdJyB9KV0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKFtzb3VyY2VzLCBzb3VyY2VdKSA9PiBzb3VyY2VzLmNvbmNhdChwYXJzZShzb3VyY2Vba2V5XSwgW10pKSlcclxuICAgICAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKFtdKSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3cml0ZVNvdXJjZXMgKHNvdXJjZXMpIHtcclxuICAgICAgICBjb25zdCByZWdpc3RyeSA9IFtdXHJcbiAgICAgICAgY29uc3QgdXBkYXRlcyA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHNvdXJjZXMubGVuZ3RoIC8gMjApKTsgeCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGBzb3VyY2VzLSR7eH1gXHJcbiAgICAgICAgICAgIHJlZ2lzdHJ5LnB1c2goa2V5KVxyXG4gICAgICAgICAgICB1cGRhdGVzW2tleV0gPSBKU09OLnN0cmluZ2lmeShzb3VyY2VzLnNsaWNlKCh4IC0gMSkgKiAyMCwgeCAqIDIwKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdXBkYXRlcy5yZWdpc3RyeSA9IEpTT04uc3RyaW5naWZ5KHJlZ2lzdHJ5KVxyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHVwZGF0ZXMpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gYWRkU291cmNlIChzb3VyY2UpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgcmVhZFNvdXJjZXMoKVxyXG4gICAgICAgIGlmICghc291cmNlcy5zb21lKCh7dXJsLCBtYW5nYUlkfSkgPT4gc291cmNlLnVybCA9PT0gdXJsICYmIG1hbmdhSWQgPT09IHNvdXJjZS5tYW5nYUlkKSkge1xyXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goc291cmNlKVxyXG4gICAgICAgICAgICBhd2FpdCB3cml0ZVNvdXJjZXMoc291cmNlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZXNcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBkZWxldGVTb3VyY2UgKHNvdXJjZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IHJlYWRTb3VyY2VzKClcclxuICAgICAgICBjb25zdCBuZXdTb3VyY2VzID0gc291cmNlcy5maWx0ZXIoKHNvdXJjZSkgPT4gc291cmNlPy5pZCAhPT0gc291cmNlSWQpXHJcbiAgICAgICAgYXdhaXQgd3JpdGVTb3VyY2VzKG5ld1NvdXJjZXMpXHJcblxyXG4gICAgICAgIHJldHVybiBuZXdTb3VyY2VzXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaXNEaXJ0eSAoKSB7XHJcbiAgICAgICAgY29uc3QgeyB1cmxzLCBzb3VyY2VzIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIFsndXJscycsICdzb3VyY2VzJ10pXHJcblxyXG4gICAgICAgIHJldHVybiAhIXVybHMgfHwgISFzb3VyY2VzXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0RmlsdGVyZWRTb3J0ZWRVcmxzICgpIHtcclxuICAgICAgICBjb25zdCB7IGhpZGRlbkNoYXB0ZXJzOiBoaWRkZW5DaGFwdGVyc1N0cmluZywgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IDAgfSlcclxuICAgICAgICBjb25zdCB7IHVybHMgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgeyB1cmxzOiAnW10nIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UoaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIHt9KVxyXG4gICAgICAgIGNvbnN0IHVybExpc3QgPSBwYXJzZSh1cmxzLCBbXSlcclxuXHJcbiAgICAgICAgY29uc3QgY2hlY2tPbGQgPSAoY2hhcHRlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGlkZSAmJiBjaGFwdGVyLmNyZWF0ZWQgPCBoaWRlIHx8IGhpZGRlbkNoYXB0ZXJzW2NoYXB0ZXIuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgW29sZFVybHMsIG5ld1VybHNdID0gT2JqZWN0LnZhbHVlcyh1cmxMaXN0KVxyXG4gICAgICAgICAgICAuc29ydCgodXJsMSwgdXJsMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IHVybDIuY3JlYXRlZCAtIHVybDEuY3JlYXRlZFxyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpZmYpIDwgNTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh1cmwxKS5sb2NhbGVDb21wYXJlKHVybDIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlmZlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAucmVkdWNlKChbb2xkVXJscywgbmV3VXJsc10sIHVybCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrT2xkKHVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbGRVcmxzLnB1c2godXJsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VXJscy5wdXNoKHVybClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBbb2xkVXJscywgbmV3VXJsc11cclxuICAgICAgICAgICAgfSwgW1tdLCBbXV0pXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG9sZFVybHMsXHJcbiAgICAgICAgICAgIG5ld1VybHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZVVybCAoaWQpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JyB9KVxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UocmVzdWx0LmhpZGRlbkNoYXB0ZXJzLCB7fSlcclxuICAgICAgICBoaWRkZW5DaGFwdGVyc1tpZF0gPSB0cnVlXHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ2hhcHRlcnMpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZUFsbFVybHMgKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IHRpbWVzdGFtcCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyaXRlVXJscyAodXJscykge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLkxPQ0FMLCB7IHVybHM6IEpTT04uc3RyaW5naWZ5KHVybHMpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaW5pdCAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRlOiBmYWxzZSB9KVxyXG4gICAgICAgIGlmICghaGlkZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKClcclxuICAgICAgICAgICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMClcclxuICAgICAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGU6IHRvZGF5LmdldFRpbWUoKX0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldE1heE9sZCAobWF4T2xkKSB7XHJcbiAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5MT0NBTCwgeyBtYXhPbGQgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRNYXhPbGQgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbWF4T2xkIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIHsgbWF4T2xkOiAyNSB9KVxyXG4gICAgICAgIHJldHVybiBtYXhPbGRcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBzZXRMaW5rIChsaW5rKSB7XHJcbiAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGxpbmsgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRMaW5rICgpIHtcclxuICAgICAgICBjb25zdCB7IGxpbmsgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCBbJ2xpbmsnXSlcclxuICAgICAgICByZXR1cm4gbGlua1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEhpZGUgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZTogMCB9KVxyXG4gICAgICAgIHJldHVybiBoaWRlXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gd3JpdGVMb2NhbFNldHRpbmdzIChzZXR0aW5ncykge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLkxPQ0FMLCB7IGxvY2FsU2V0dGluZ3M6IEpTT04uc3RyaW5naWZ5KHNldHRpbmdzKSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldExvY2FsU2V0dGluZ3MgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbG9jYWxTZXR0aW5ncyB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLkxPQ0FMLCB7IGxvY2FsU2V0dGluZ3M6ICd7fScgfSlcclxuICAgICAgICByZXR1cm4gcGFyc2UobG9jYWxTZXR0aW5ncywge30pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TGlua0RhdGEgKCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCByZWFkU291cmNlcygpXHJcbiAgICAgICAgY29uc3QgeyBoaWRkZW5DaGFwdGVyczogaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIGhpZGUgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nLCBoaWRlOiAwIH0pXHJcbiAgICAgICAgY29uc3QgaGlkZGVuQ2hhcHRlcnMgPSBwYXJzZShoaWRkZW5DaGFwdGVyc1N0cmluZywge30pXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNvdXJjZXM6IHNvdXJjZXMubWFwKChzb3VyY2UpID0+IHNvdXJjZS5pZCksXHJcbiAgICAgICAgICAgIGhpZGRlbkNoYXB0ZXJzLFxyXG4gICAgICAgICAgICBoaWRlOiBOdW1iZXIoaGlkZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2V0TGlua0RhdGEgKHtzb3VyY2VzLCBoaWRkZW5DaGFwdGVycywgaGlkZX0pIHtcclxuICAgICAgICBjb25zdCBzdG9yZWRTb3VyY2VzID0gKGF3YWl0IHJlYWRTb3VyY2VzKCkpLnJlZHVjZSgoc3MsIHNvdXJjZSkgPT4gc291cmNlID8gKHsuLi5zcywgW3NvdXJjZS5pZF06IHRydWV9KSA6IHNzLCB7fSlcclxuICAgICAgICBjb25zdCBoYXNDaGFuZ2VkU291cmNlcyA9IE9iamVjdC5rZXlzKHN0b3JlZFNvdXJjZXMpLmxlbmd0aCAhPT0gc291cmNlcy5sZW5ndGggfHxcclxuICAgICAgICAgICAgc291cmNlcy5zb21lKChzb3VyY2UpID0+ICFzdG9yZWRTb3VyY2VzW3NvdXJjZS5pZF0pXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbUHJvbWlzZS5yZXNvbHZlKCldXHJcbiAgICAgICAgaWYgKGhhc0NoYW5nZWRTb3VyY2VzKSB7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2god3JpdGVTb3VyY2VzKHNvdXJjZXMpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoaWRkZW4gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JywgaGlkZTogMCB9KVxyXG4gICAgICAgIGlmIChoaWRkZW4uaGlkZGVuQ2hhcHRlcnMgIT09IEpTT04uc3RyaW5naWZ5KGhpZGRlbkNoYXB0ZXJzKSB8fCBTdHJpbmcoaGlkZGVuLmhpZGUpICE9PSBTdHJpbmcoaGlkZSkpIHtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHtcclxuICAgICAgICAgICAgICAgIGhpZGRlbkNoYXB0ZXJzOiBKU09OLnN0cmluZ2lmeShoaWRkZW5DaGFwdGVycyksXHJcbiAgICAgICAgICAgICAgICBoaWRlXHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzb3VyY2VzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRTb3VyY2VzLFxyXG4gICAgICAgICAgICBpbXBvcnQ6IHdyaXRlU291cmNlcyxcclxuICAgICAgICAgICAgYWRkOiBhZGRTb3VyY2UsXHJcbiAgICAgICAgICAgIGRlbGV0ZTogZGVsZXRlU291cmNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICBsb2NhbDoge1xyXG4gICAgICAgICAgICAgICAgcmVhZDogZ2V0TG9jYWxTZXR0aW5ncyxcclxuICAgICAgICAgICAgICAgIHNldDogd3JpdGVMb2NhbFNldHRpbmdzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzRGlydHksXHJcbiAgICAgICAgdXJsczoge1xyXG4gICAgICAgICAgICByZWFkOiBnZXRGaWx0ZXJlZFNvcnRlZFVybHMsXHJcbiAgICAgICAgICAgIGhpZGU6IGhpZGVVcmwsXHJcbiAgICAgICAgICAgIGhpZGVBbGw6IGhpZGVBbGxVcmxzLFxyXG4gICAgICAgICAgICBpbXBvcnQ6IHdyaXRlVXJscyxcclxuICAgICAgICAgICAgc2V0TWF4T2xkLFxyXG4gICAgICAgICAgICBnZXRNYXhPbGQsXHJcbiAgICAgICAgICAgIGdldEhpZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2hhbmdlOiBzdG9yYWdlLmFkZExpc3RlbmVyLFxyXG4gICAgICAgIGxpbms6IHtcclxuICAgICAgICAgICAgc2V0OiBzZXRMaW5rLFxyXG4gICAgICAgICAgICByZWFkOiBnZXRMaW5rLFxyXG4gICAgICAgICAgICBsb2NhbDogZ2V0TGlua0RhdGEsXHJcbiAgICAgICAgICAgIHNldExvY2FsOiBzZXRMaW5rRGF0YVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVuZGVySG9zdExpc3QgKF9kYiwgYXBpKSB7XHJcbiAgICBjb25zdCB7IEhvc3RzIH0gPSBhcGlcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEhvc3RzLnJlYWQoKVxyXG4gICAgY29uc3QgaG9zdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob3N0cycpXHJcbiAgICBpZiAocmVzdWx0LnZhbGlkKSB7XHJcbiAgICAgICAgY29uc3QgaG9zdHMgPSByZXN1bHQucGF5bG9hZFxyXG5cclxuICAgICAgICBjb25zdCBob3N0TGlzdCA9IGhvc3RzLnN0YWJsZVxyXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gU3RyaW5nKGE/Lm5hbWUpLmxvY2FsZUNvbXBhcmUoYj8ubmFtZSkpXHJcbiAgICAgICAgICAgIC5tYXAoKGhvc3QpID0+IGA8YSBocmVmPVwiJHtob3N0LnVybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lclwiPiR7aG9zdC5uYW1lfTwvYT5gKS5qb2luKCc8c3Bhbj4sIDwvc3Bhbj4nKVxyXG4gICAgICAgIGhvc3RDb250YWluZXIuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8aDY+U3VwcG9ydGVkIFBhZ2VzPC9oNj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmstbGlzdFwiPiR7aG9zdExpc3R9PC9kaXY+XHJcbiAgICAgICAgYFxyXG5cclxuICAgICAgICBpZiAoaG9zdHMudW5zdGFibGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhvc3RMaXN0ID0gaG9zdHMudW5zdGFibGVcclxuICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBTdHJpbmcoYT8ubmFtZSkubG9jYWxlQ29tcGFyZShiPy5uYW1lKSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKGhvc3QpID0+IGA8YSBocmVmPVwiJHtob3N0LnVybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lclwiPiR7aG9zdC5uYW1lfTwvYT5gKS5qb2luKCc8c3Bhbj4sIDwvc3Bhbj4nKVxyXG4gICAgICAgICAgICBob3N0Q29udGFpbmVyLmlubmVySFRNTCArPSBgXHJcbiAgICAgICAgICAgICAgICA8cD5UaGVzZSBQYWdlcyBoYWQgc29tZSBwcm9ibGVtcyByZWNlbnRseSAmbmRhc2g7IHRoZXkgbWlnaHQgb3IgbWlnaHQgbm90IHdvcms6PC9wPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmstbGlzdFwiPiR7aG9zdExpc3R9PC9kaXY+XHJcbiAgICAgICAgICAgIGBcclxuICAgICAgICB9XHJcbiAgICAgICAgaG9zdENvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgIDxzcGFuPk1hbnkgb3RoZXIgcGFnZXMgY2FuIHdvcmsgYXMgd2VsbCwgaWYgdGhleSB1c2UgdGhlIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3RoZW1lZm9yZXN0Lm5ldC9pdGVtL21hZGFyYS13b3JkcHJlc3MtdGhlbWUtZm9yLW1hbmdhLzIwODQ5ODI4XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIj5NYWRhcmEtPC9hPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+IG9yIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3RoZW1lc2lhLmNvbS9tYW5nYXN0cmVhbS13b3JkcHJlc3MtdGhlbWUvXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIj5NYW5nYVN0cmVhbS1UaGVtZTwvYT5cclxuICAgICAgICAgICAgICAgIDxzcGFuPiBvciBhcmUgYnVpbHQgdXNpbmcgdGhlIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2dlbmthbi5pby9ncm91cHNcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lclwiPkdlbmthbiBSZWFkZXI8L2E+PHNwYW4+Ljwvc3Bhbj5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgIGBcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgc2F2ZUFzIGZyb20gJ3NhdmUtYXMnXHJcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRJbXBvcnRIYW5kbGVycyAoZGIpIHtcclxuICAgIGNvbnN0IGltcG9ydEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1wb3J0JylcclxuICAgIGNvbnN0IGV4cG9ydEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhwb3J0JylcclxuXHJcbiAgICBpbXBvcnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdXHJcbiAgICAgICAgY29uc3QgZnIgPSBuZXcgRmlsZVJlYWRlcigpXHJcbiAgICAgICAgZnIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlcyA9IHBhcnNlKGZyLnJlc3VsdCwgW10pXHJcbiAgICAgICAgICAgIGNvbnN0IGNsZWFuID0gc291cmNlcy5maWx0ZXIoKHNvdXJjZSkgPT4gc291cmNlPy50aXRsZSAmJiBzb3VyY2UudXJsICYmIHNvdXJjZS5tYW5nYUlkKVxyXG4gICAgICAgICAgICBpZiAoY2xlYW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBkYi5zb3VyY2VzLmltcG9ydChjbGVhbilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbXBvcnRFbGVtLmZpbGVzID0gbnVsbFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZnIucmVhZEFzVGV4dChmaWxlKVxyXG4gICAgfSlcclxuXHJcbiAgICBleHBvcnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGRiLnNvdXJjZXMucmVhZCgpXHJcbiAgICAgICAgICAgIC50aGVuKChzb3VyY2VzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KHNvdXJjZXMpXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vanNvbicgfSlcclxuICAgICAgICAgICAgICAgIHNhdmVBcyhibG9iLCAnbWFuZ2Fwb2xsLmpzb24nKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuIiwiaW1wb3J0IHsgZ2V0TGlua1F1ZXJ5LCBsaW5rSWZVbmxpbmtlZCB9IGZyb20gJy4vc2V0dGluZ3MnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJNZW51TGlzdGVuZXJzIChkYiwgQXBpKSB7XHJcbiAgICBjb25zdCBpbXBvcnRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmltcG9ydCcpXHJcbiAgICBjb25zdCBwb3B1cFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwVGl0bGUnKVxyXG4gICAgY29uc3QgYm9va21hcmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZCcpXHJcbiAgICBjb25zdCB1cmxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybHMnKVxyXG4gICAgY29uc3QgY2hhcHRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcHRlcnMnKVxyXG4gICAgY29uc3QgYWRkU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRTZWN0aW9uJylcclxuICAgIGNvbnN0IHNvdXJjZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291cmNlcycpXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXR0aW5ncycpXHJcbiAgICBjb25zdCBzZXR0aW5nc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MnKVxyXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZ3Jlc3MnKVxyXG4gICAgY29uc3QgaW50cm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50cm8nKVxyXG5cclxuICAgIGNvbnN0IG9wZW5DaGFwdGVycyA9ICgpID0+IHtcclxuICAgICAgICBkYi5zb3VyY2VzLnJlYWQoKVxyXG4gICAgICAgICAgICAudGhlbigoc291cmNlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaW50cm8uc3R5bGUuZGlzcGxheSA9IHNvdXJjZXMubGVuZ3RoID8gJ25vbmUnIDogJ2ZsZXgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgc291cmNlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB1cmxzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHByb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIGNoYXB0ZXJzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBib29rbWFya3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgcG9wdXBUaXRsZS5pbm5lclRleHQgPSAnQ2hhcHRlcnMnXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3BlblNldHRpbmdzID0gKCkgPT4ge1xyXG4gICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzb3VyY2VzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBpbXBvcnRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBhZGRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHVybHMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHBvcHVwVGl0bGUuaW5uZXJUZXh0ID0gJ1NldHRpbmdzJ1xyXG4gICAgICAgIGJvb2ttYXJrcy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBjaGFwdGVycy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICB9XHJcblxyXG4gICAgY2hhcHRlcnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuQ2hhcHRlcnMpXHJcblxyXG4gICAgYm9va21hcmtzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzb3VyY2VzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgdXJscy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcG9wdXBUaXRsZS5pbm5lclRleHQgPSAnQm9va21hcmtzJ1xyXG4gICAgICAgIGJvb2ttYXJrcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgY2hhcHRlcnMuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICB9KVxyXG5cclxuICAgIHNldHRpbmdzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblNldHRpbmdzKVxyXG5cclxuICAgIGlmIChnZXRMaW5rUXVlcnkoKSkge1xyXG4gICAgICAgIG9wZW5TZXR0aW5ncygpXHJcbiAgICAgICAgbGlua0lmVW5saW5rZWQoZGIsIEFwaSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG9wZW5DaGFwdGVycygpXHJcbiAgICB9XHJcbn1cclxuIiwiY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZ3Jlc3MnKVxyXG5cclxubGV0IGxvY2tlZCA9IGZhbHNlXHJcblxyXG5leHBvcnQgY29uc3QgcmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIgPSAodXBkYXRlTm93KSA9PiB7XHJcbiAgICBwcm9ncmVzcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB1cGRhdGVOb3coKVxyXG4gICAgICAgIG1hcmtSZWZyZXNoZWQoKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1hcmtSZWZyZXNoZWQgPSAoKSA9PiB7XHJcbiAgICBwcm9ncmVzcy5pbm5lckhUTUwgPSAnKFJlZnJlc2hlZCEpJ1xyXG4gICAgcHJvZ3Jlc3MuZGF0YXNldC5iZWZvcmUgPSAnKFJlZnJlc2hlZCEpJ1xyXG4gICAgbG9ja2VkID0gdHJ1ZVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbG9ja2VkID0gZmFsc2VcclxuICAgICAgICBwcm9ncmVzcy5kYXRhc2V0LmJlZm9yZSA9ICcoUmVmcmVzaCBub3chKSdcclxuICAgIH0sIDE1MDApXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVQcm9ncmVzcyA9IChfbGFzdFBpbmcsIG5leHRQaW5nKSA9PiB7XHJcbiAgICBpZiAoIWxvY2tlZCkge1xyXG4gICAgICAgIGNvbnN0IHJlbWFpbmluZyA9IG5leHRQaW5nIC0gRGF0ZS5ub3coKVxyXG5cclxuICAgICAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5tYXgoTWF0aC5yb3VuZChyZW1haW5pbmcgLyAxMDAwKSwgMClcclxuXHJcbiAgICAgICAgcHJvZ3Jlc3MuaW5uZXJIVE1MID0gYChOZXh0IHJlZnJlc2g6ICR7c2Vjb25kc31zKWBcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU2NoZWR1bGUgPSAoeyBpc0FjdGl2ZSA9IGZhbHNlLCBpbnRlcnZhbCA9IDAsIGNhbGxiYWNrID0gRnVuY3Rpb24ucHJvdG90eXBlLCB1cGRhdGVyIH0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IG5leHRQaW5nID0gMFxyXG4gICAgbGV0IGxhc3RQaW5nID0gMFxyXG4gICAgY29uc3QgY2FsbENhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChuZXh0UGluZyAmJiBuZXh0UGluZyA8PSBEYXRlLm5vdygpKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSBuZXh0UGluZ1xyXG4gICAgICAgICAgICBuZXh0UGluZyA9IG5leHRQaW5nICsgaW50ZXJ2YWwgPiBEYXRlLm5vdygpID8gbmV4dFBpbmcgKyBpbnRlcnZhbCA6IERhdGUubm93KCkgKyBpbnRlcnZhbFxyXG4gICAgICAgIH1cclxuICAgICAgICB0eXBlb2YgdXBkYXRlciA9PT0gJ2Z1bmN0aW9uJyAmJiB1cGRhdGVyKGxhc3RQaW5nLCBuZXh0UGluZylcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNBY3RpdmUgJiYgaW50ZXJ2YWwpIHtcclxuICAgICAgICBuZXh0UGluZyA9IERhdGUubm93KCkgLSAxXHJcbiAgICAgICAgY2FsbENhbGxiYWNrKClcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbChjYWxsQ2FsbGJhY2ssIDEwMClcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNldEludGVydmFsIChuZXdJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5ld0ludGVydmFsICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1c2UgYSBudW1iZXInKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gbmV4dFBpbmcgLSBpbnRlcnZhbCArIG5ld0ludGVydmFsXHJcbiAgICAgICAgICAgIGludGVydmFsID0gbmV3SW50ZXJ2YWxcclxuICAgICAgICAgICAgY2FsbENhbGxiYWNrKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldENhbGxiYWNrIChjYikge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gRGF0ZS5ub3coKSArIGludGVydmFsXHJcbiAgICAgICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoY2FsbENhbGxiYWNrLCAxMDApXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmlnZ2VySW5zdGFudGx5ICgpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IERhdGUubm93KClcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBEYXRlLm5vdygpICsgaW50ZXJ2YWxcclxuICAgICAgICAgICAgdHlwZW9mIHVwZGF0ZXIgPT09ICdmdW5jdGlvbicgJiYgdXBkYXRlcihsYXN0UGluZywgbmV4dFBpbmcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wICgpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSAwXHJcbiAgICAgICAgICAgIGxhc3RQaW5nID0gMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBsaW5rRmllbGRzID0gWydoaWRlJywgJ2hpZGRlbkNoYXB0ZXJzJywgJ3NvdXJjZXMnXVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0S2V5IChrZXkgPSAnJykge1xyXG4gICAgcmV0dXJuIGAke2tleS5zbGljZSgwLCA1KX0tJHtrZXkuc2xpY2UoNSwgMTApfS0ke2tleS5zbGljZSgxMCwgMTUpfWBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmtIZWxwZXJzIChkYiwgQXBpKSB7XHJcbiAgICBhc3luYyBmdW5jdGlvbiBwdXNoTGlua1VwZGF0ZSAoY2hhbmdlcykge1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZXNldCA9IGxpbmtGaWVsZHMuZmlsdGVyKChrZXkpID0+IE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUoKGNoYW5nZSkgPT4gY2hhbmdlLmluY2x1ZGVzKGtleSkpKVxyXG5cclxuICAgICAgICBpZiAoY2hhbmdlc2V0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKCkgfHwge31cclxuICAgICAgICAgICAgY29uc3QgbG9jYWwgPSBhd2FpdCBkYi5saW5rLmxvY2FsKCkgfHwge31cclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlID0ge31cclxuICAgICAgICAgICAgaWYgKGNoYW5nZXNldC5pbmNsdWRlcygnaGlkZScpKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUuaGlkZSA9IGxvY2FsLmhpZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc2V0LmluY2x1ZGVzKCdoaWRkZW5DaGFwdGVycycpKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUuaGlkZGVuQ2hhcHRlcnMgPSBsb2NhbC5oaWRkZW5DaGFwdGVyc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzZXQuaW5jbHVkZXMoJ3NvdXJjZXMnKSkge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlLnNvdXJjZXMgPSBsb2NhbC5zb3VyY2VzXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyh1cGRhdGUpLmxlbmd0aCAmJiBsaW5rLmtleSkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgQXBpLkxpbmsudXBkYXRlKGxpbmsua2V5LCB1cGRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnZhbGlkICYmIGRiLmxpbmsuc2V0KHsga2V5OiByZXMucGF5bG9hZC5rZXkgfSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hMaW5rVXBkYXRlICgpIHtcclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuXHJcbiAgICAgICAgaWYgKGxpbmspIHtcclxuICAgICAgICAgICAgQXBpLkxpbmsucmVhZChsaW5rLmtleSwgbGluay5sYXN0TW9kaWZpZWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy52YWxpZCAmJiByZXMucGF5bG9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5saW5rLnNldExvY2FsKHJlcy5wYXlsb2FkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwdXNoTGlua1VwZGF0ZSxcclxuICAgICAgICBmZXRjaExpbmtVcGRhdGVcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNWYWxpZExpbmtLZXkgKGtleSkge1xyXG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xlYW5LZXkgPSBrZXkucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJylcclxuICAgIGlmIChjbGVhbktleS5sZW5ndGggPT09IDE1KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmtRdWVyeSAoKSB7XHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpXHJcblxyXG4gICAgaWYgKGlzVmFsaWRMaW5rS2V5KHVybFBhcmFtcy5nZXQoJ2xpbmsnKSkpIHtcclxuICAgICAgICByZXR1cm4gdXJsUGFyYW1zLmdldCgnbGluaycpLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsaW5rSWZVbmxpbmtlZCAoZGIsIGFwaSkge1xyXG4gICAgY29uc3Qga2V5ID0gZ2V0TGlua1F1ZXJ5KClcclxuXHJcbiAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudExpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG5cclxuICAgICAgICBpZiAoIWN1cnJlbnRMaW5rIHx8ICFjdXJyZW50TGluay5rZXkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlua0lucHV0MSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0xJylcclxuICAgICAgICAgICAgY29uc3QgbGlua0lucHV0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0yJylcclxuICAgICAgICAgICAgY29uc3QgbGlua0lucHV0MyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0zJylcclxuXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSBrZXkuc2xpY2UoMCwgNSlcclxuICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IGtleS5zbGljZSg1LCAxMClcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IGtleS5zbGljZSgxMCwgMTUpXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBjb25uZWN0VG9MaW5rKGtleSwgYXBpLCBkYilcclxuXHJcbiAgICAgICAgICAgIGlmIChsaW5rICYmIGxpbmsua2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rTnVtYmVyVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWlkJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluaycpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rTGlua1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXRleHQnKVxyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5saW5rLXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rVGV4dC5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0xpbmsuaW5uZXJUZXh0ID0gYGh0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20/bGluaz0ke2xpbmsua2V5fWBcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rLmhyZWYgPSBgaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbT9saW5rPSR7bGluay5rZXl9YFxyXG4gICAgICAgICAgICAgICAgbGlua051bWJlclRleHQuaW5uZXJUZXh0ID0gYCR7bGluay5rZXkuc2xpY2UoMCwgNSl9LSR7bGluay5rZXkuc2xpY2UoNSwgMTApfS0ke2xpbmsua2V5LnNsaWNlKDEwKX1gXHJcbiAgICAgICAgICAgICAgICBsaW5rTnVtYmVyVGV4dC5zdHlsZS5jb2xvciA9ICcjMDAwYzIxJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZvcm1hdEtleShjdXJyZW50TGluay5rZXkpICE9PSBmb3JtYXRLZXkoa2V5KSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rTGlua1dhcm4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXdhcm5pbmcnKVxyXG4gICAgICAgICAgICBjb25zdCB3YXJuTGlua0N1cnJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2Fybi1jdXJyZW50LWxpbmsnKVxyXG4gICAgICAgICAgICBjb25zdCB3YXJuTGlua05ldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3YXJuLW5ldy1saW5rJylcclxuXHJcbiAgICAgICAgICAgIGxpbmtMaW5rV2Fybi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgICAgIHdhcm5MaW5rQ3VycmVudC5pbm5lclRleHQgPSBmb3JtYXRLZXkoY3VycmVudExpbmsua2V5KVxyXG4gICAgICAgICAgICB3YXJuTGlua05ldy5pbm5lclRleHQgPSBmb3JtYXRLZXkoa2V5KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY29ubmVjdFRvTGluayAoa2V5LCBhcGksIGRiKSB7XHJcbiAgICBjb25zdCB7IExpbmsgfSA9IGFwaVxyXG4gICAgY29uc3QgbGlua0Vycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstZXJyb3InKVxyXG4gICAgY29uc3QgbGlua1Byb2dyZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstcHJvZ3Jlc3MnKVxyXG4gICAgY29uc3QgY3JlYXRlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctbGluay1idXR0b24nKVxyXG4gICAgY29uc3QgbGlua0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWJ1dHRvbicpXHJcbiAgICBsaW5rRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgbGlua1Byb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICBjcmVhdGVMaW5rLmRpc2FibGVkID0gdHJ1ZVxyXG4gICAgbGlua0J1dHRvbi5kaXNhYmxlZCA9IHRydWVcclxuXHJcbiAgICBjb25zdCBsaW5rUmVzdWx0ID0gYXdhaXQgTGluay5yZWFkKGtleSlcclxuICAgIGNyZWF0ZUxpbmsuZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgbGlua0J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICBsaW5rUHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgaWYgKGxpbmtSZXN1bHQ/LnZhbGlkKSB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGxpbmtSZXN1bHQucGF5bG9hZFxyXG4gICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0KHsga2V5OiBsaW5rLmtleSB9KVxyXG4gICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0TG9jYWwobGluaylcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpbmtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxpbmtFcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICB9XHJcbiAgICBjb25zdCBsaW5rTGlua1dhcm4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXdhcm5pbmcnKVxyXG5cclxuICAgIGlmIChsaW5rTGlua1dhcm4pIHtcclxuICAgICAgICBsaW5rTGlua1dhcm4uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2V0dGluZ3NIYW5kbGVycyAoZGIsIGFwaSkge1xyXG4gICAgY29uc3QgeyBMaW5rIH0gPSBhcGlcclxuXHJcbiAgICBjb25zdCBjcmVhdGVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1saW5rLWJ1dHRvbicpXHJcbiAgICBjb25zdCB1cGRhdGVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwZGF0ZS1saW5raW5nJylcclxuICAgIGNvbnN0IGxpbmtOdW1iZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstaWQnKVxyXG4gICAgY29uc3QgbGlua0xpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rJylcclxuICAgIGNvbnN0IGxpbmtMaW5rVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmstdGV4dCcpXHJcbiAgICBjb25zdCBsaW5raW5nU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLXNlY3Rpb24nKVxyXG4gICAgY29uc3QgdW5saW5rU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bmxpbmstc2VjdGlvbicpXHJcbiAgICBjb25zdCB1bmxpbmtCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5saW5rLWJ1dHRvbicpXHJcbiAgICBjb25zdCBsaW5rQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstYnV0dG9uJylcclxuICAgIGNvbnN0IGxpbmtJbnB1dDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMScpXHJcbiAgICBjb25zdCBsaW5rSW5wdXQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTInKVxyXG4gICAgY29uc3QgbGlua0lucHV0MyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0zJylcclxuXHJcbiAgICBsaW5rSW5wdXQxLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDEudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgMTUpXHJcbiAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9IG51bWJlci5zbGljZSgwLCA1KVxyXG4gICAgICAgIGlmIChudW1iZXIubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gbnVtYmVyLnNsaWNlKDUsIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA+IDEwKSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuZm9jdXMoKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnNldFNlbGVjdGlvblJhbmdlKG51bWJlci5sZW5ndGggLSAxMCwgbnVtYmVyLmxlbmd0aCAtIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW1iZXIubGVuZ3RoID49IDUpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0Mi5mb2N1cygpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIuc2V0U2VsZWN0aW9uUmFuZ2UobnVtYmVyLmxlbmd0aCAtIDUsIG51bWJlci5sZW5ndGggLSA1KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rSW5wdXQyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDIudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgMTApXHJcbiAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IG51bWJlci5zbGljZSgwLCA1KVxyXG4gICAgICAgIGlmIChudW1iZXIubGVuZ3RoID49IDUpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IG51bWJlci5zbGljZSg1LCAxMClcclxuICAgICAgICAgICAgbGlua0lucHV0My5mb2N1cygpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuc2V0U2VsZWN0aW9uUmFuZ2UobnVtYmVyLmxlbmd0aCAtIDUsIG51bWJlci5sZW5ndGggLSA1KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rSW5wdXQzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDMudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgNSlcclxuICAgICAgICBpZiAobGlua0lucHV0My52YWx1ZSAhPT0gbnVtYmVyLnNsaWNlKDAsIDUpKSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoMCwgNSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyaXRlU3RhdGVUb0RvbSAobGluaykge1xyXG4gICAgICAgIGxpbmtpbmdTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJ25vbmUnIDogJydcclxuICAgICAgICB1bmxpbmtTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJycgOiAnbm9uZSdcclxuICAgICAgICBpZiAobGlua0xpbmtUZXh0KSB7XHJcbiAgICAgICAgICAgIGxpbmtMaW5rVGV4dC5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICcnIDogJ25vbmUnXHJcbiAgICAgICAgICAgIGxpbmtMaW5rLnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJycgOiAnbm9uZSdcclxuICAgICAgICAgICAgbGlua0xpbmsuaW5uZXJUZXh0ID0gbGluayA/IGBodHRwczovL21hbmdhLmZvY2hsYWMuY29tP2xpbms9JHtsaW5rLmtleX1gIDogJydcclxuICAgICAgICAgICAgbGlua0xpbmsuaHJlZiA9IGxpbmsgPyBgaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbT9saW5rPSR7bGluay5rZXl9YCA6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpbmtOdW1iZXJUZXh0LmlubmVyVGV4dCA9IGxpbmsgPyBmb3JtYXRLZXkobGluay5rZXkpIDogJ1VubGlua2VkJ1xyXG4gICAgICAgIGxpbmtOdW1iZXJUZXh0LmNsYXNzTGlzdFtsaW5rID8gJ2FkZCcgOiAncmVtb3ZlJ10oJ2xpbmtlZCcpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICB3cml0ZVN0YXRlVG9Eb20obGluaylcclxuXHJcbiAgICBpZiAodXBkYXRlTGluaykge1xyXG4gICAgICAgIHVwZGF0ZUxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGdldExpbmtRdWVyeSgpXHJcblxyXG4gICAgICAgICAgICBsaW5rSW5wdXQxLnZhbHVlID0ga2V5LnNsaWNlKDAsIDUpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSBrZXkuc2xpY2UoNSwgMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBrZXkuc2xpY2UoMTAsIDE1KVxyXG4gICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldChudWxsKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXdhcm5pbmcnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbSgpXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3RUb0xpbmsoa2V5LCBhcGksIGRiKVxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20ocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmtMaW5rV2FybiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWVycm9yJylcclxuXHJcbiAgICAgICAgaWYgKGxpbmtMaW5rV2Fybikge1xyXG4gICAgICAgICAgICBsaW5rTGlua1dhcm4uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgY29uc3QgbGlua0RhdGEgPSBhd2FpdCBkYi5saW5rLmxvY2FsKClcclxuICAgICAgICAgICAgY29uc3QgbmV3TGlua1Jlc3VsdCA9IGF3YWl0IExpbmsuaW5zZXJ0KGxpbmtEYXRhKVxyXG4gICAgICAgICAgICBpZiAobmV3TGlua1Jlc3VsdD8udmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBuZXdMaW5rUmVzdWx0LnBheWxvYWRcclxuICAgICAgICAgICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0KHsga2V5OiBsaW5rLmtleSB9KVxyXG4gICAgICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKGxpbmspXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgdW5saW5rQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgICAgIGlmIChsaW5rKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0KG51bGwpXHJcbiAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbSh1bmRlZmluZWQpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGxpbmtCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICAgICAgaWYgKCFsaW5rKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2xpbmtJbnB1dDEudmFsdWV9JHtsaW5rSW5wdXQyLnZhbHVlfSR7bGlua0lucHV0My52YWx1ZX1gXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3RUb0xpbmsoa2V5LCBhcGksIGRiKVxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20ocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBkYXJrTW9kZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rhcmttb2RlLXRvZ2dsZScpXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGRiLnNldHRpbmdzLmxvY2FsLnJlYWQoKVxyXG4gICAgaWYgKHNldHRpbmdzLmRhcmspIHtcclxuICAgICAgICBkYXJrTW9kZUlucHV0LmNoZWNrZWQgPSB0cnVlXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmNsYXNzTGlzdC5hZGQoJ2RhcmsnKVxyXG4gICAgfVxyXG4gICAgZGFya01vZGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZGIuc2V0dGluZ3MubG9jYWwucmVhZCgpXHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5jbGFzc0xpc3QuYWRkKCdkYXJrJylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRiLnNldHRpbmdzLmxvY2FsLnNldCh7XHJcbiAgICAgICAgICAgIC4uLnNldHRpbmdzLFxyXG4gICAgICAgICAgICBkYXJrOiBlLnRhcmdldC5jaGVja2VkXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNvdXJjZVJlbmRlcmVyIChkYikge1xyXG4gICAgY29uc3Qgc291cmNlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VyY2VzJylcclxuXHJcbiAgICBzb3VyY2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2xvc2VzdCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93IC5hY3Rpb24uZGVsZXRlJylcclxuICAgICAgICBpZiAoY2xvc2VzdCAmJiBjbG9zZXN0LmRhdGFzZXRbJ2lkJ10gJiYgc291cmNlcy5jb250YWlucyhjbG9zZXN0KSkge1xyXG4gICAgICAgICAgICBkYi5zb3VyY2VzLmRlbGV0ZShjbG9zZXN0LmRhdGFzZXRbJ2lkJ10pXHJcbiAgICAgICAgICAgIGNsb3Nlc3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aW9uJylcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlbmRlclNvdXJjZXMgKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkYi5zb3VyY2VzLnJlYWQoKVxyXG5cclxuICAgICAgICBzb3VyY2VzLmlubmVySFRNTCA9IGRhdGFcclxuICAgICAgICAgICAgLnNvcnQoKHNvdXJjZTEsIHNvdXJjZTIpID0+IFN0cmluZyhzb3VyY2UxLnRpdGxlKS5sb2NhbGVDb21wYXJlKHNvdXJjZTI/LnRpdGxlKSlcclxuICAgICAgICAgICAgLm1hcCgoc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gU3RyaW5nKHNvdXJjZS51cmwpLnJlcGxhY2UoL2h0dHBzPzpcXC9cXC8vLCAnJykuc3BsaXQoJy8nKVswXS5zcGxpdCgnLicpLnNsaWNlKC0yKS5qb2luKCcuJylcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgYDxsaSBjbGFzcz1cInJvdyBzb3VyY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFcIiB0aXRsZT1cIiR7YCR7c291cmNlLnRpdGxlfSAoJHt1cmx9KWB9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+JHtzb3VyY2UudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYW5nYS1pZFwiPigke3VybH0pPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWxldGUgYWN0aW9uXCIgZGF0YS1pZD1cIiR7c291cmNlLmlkfVwiPkRlbGV0ZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPmBcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmpvaW4oJ1xcbicpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXI6ICgpID0+IHJlbmRlclNvdXJjZXMoKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IHBhZCB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXJsUmVuZGVyZXIgKGRiKSB7XHJcbiAgICBjb25zdCB1cmxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybHMnKVxyXG4gICAgY29uc3QgaW50cm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50cm8nKVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGhpZGUgKGlkKSB7XHJcbiAgICAgICAgY29uc3QgeyBuZXdVcmxzLCBvbGRVcmxzIH0gPSBhd2FpdCBkYi51cmxzLnJlYWQoKVxyXG4gICAgICAgIGlmIChuZXdVcmxzLmxlbmd0aCA8PSAxICYmICghbmV3VXJsc1swXSB8fCBuZXdVcmxzWzBdLmlkID09PSBpZCkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGF0ZXN0Q2hhcHRlckRhdGUgPSBvbGRVcmxzLmNvbmNhdChuZXdVcmxzKVxyXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgobGNkLCB1cmwpID0+IHVybC5jcmVhdGVkID4gbGNkID8gdXJsLmNyZWF0ZWQgOiBsY2QsIDApXHJcblxyXG4gICAgICAgICAgICBkYi51cmxzLmhpZGVBbGwobGF0ZXN0Q2hhcHRlckRhdGUgKyAxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGIudXJscy5oaWRlKGlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cmxzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2xvc2VzdEhpZGUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnJvdyAuaGlkZScpXHJcblxyXG4gICAgICAgIGlmIChjbG9zZXN0SGlkZSAmJiBjbG9zZXN0SGlkZS5kYXRhc2V0WydpZCddICYmIHVybHMuY29udGFpbnMoY2xvc2VzdEhpZGUpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGhpZGUoY2xvc2VzdEhpZGUuZGF0YXNldFsnaWQnXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2xvc2VzdExpbmsgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnJvdy5uZXcgLmxpbmsnKVxyXG4gICAgICAgIGlmIChjbG9zZXN0TGluayAmJiBjbG9zZXN0TGluay5kYXRhc2V0WydpZCddICYmIHVybHMuY29udGFpbnMoY2xvc2VzdExpbmspKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGhpZGUoY2xvc2VzdExpbmsuZGF0YXNldFsnaWQnXSlcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oY2xvc2VzdExpbmsuaHJlZiwgJ19ibGFuaycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNsb3Nlc3RNb3JlID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5hY3Rpb24ubG9hZC1tb3JlJylcclxuICAgICAgICBpZiAoY2xvc2VzdE1vcmUgJiYgdXJscy5jb250YWlucyhjbG9zZXN0TW9yZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgbWF4T2xkID0gYXdhaXQgZGIudXJscy5nZXRNYXhPbGQoKVxyXG4gICAgICAgICAgICBhd2FpdCBkYi51cmxzLnNldE1heE9sZChtYXhPbGQgKyAxMDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhpZGVBbGwgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmhpZGUtYWxsJylcclxuICAgICAgICBpZiAoaGlkZUFsbCAmJiB1cmxzLmNvbnRhaW5zKGhpZGVBbGwpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGRiLnVybHMuaGlkZUFsbChEYXRlLm5vdygpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b3AgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnRvcCcpXHJcbiAgICAgICAgaWYgKHRvcCAmJiB1cmxzLmNvbnRhaW5zKHRvcCkpIHtcclxuICAgICAgICAgICAgdXJscy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBsZXQgbWF4U2Nyb2xsID0gMFxyXG4gICAgdXJscy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gdXJscy5vZmZzZXRIZWlnaHQgKyB1cmxzLnNjcm9sbFRvcFxyXG4gICAgICAgIGlmICh1cmxzLnNjcm9sbEhlaWdodCAtIHNjcm9sbEhlaWdodCA8PSA1MCAmJiBtYXhTY3JvbGwgIT09IHVybHMuc2Nyb2xsSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIG1heFNjcm9sbCA9IHVybHMuc2Nyb2xsSGVpZ2h0XHJcbiAgICAgICAgICAgIGNvbnN0IG1heE9sZCA9IGF3YWl0IGRiLnVybHMuZ2V0TWF4T2xkKClcclxuICAgICAgICAgICAgZGIudXJscy5zZXRNYXhPbGQobWF4T2xkICsgMTAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjaGVja1RvcEJ1dHRvbigpXHJcbiAgICB9KVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrVG9wQnV0dG9uICgpIHtcclxuICAgICAgICBpZiAodXJscy5zY3JvbGxUb3AgPiAwICYmIHVybHMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID09PSB1cmxzLnF1ZXJ5U2VsZWN0b3IoJy5vbGQtY2hhcHRlcnMnKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApIHtcclxuICAgICAgICAgICAgdXJscy5xdWVyeVNlbGVjdG9yKCcub2xkLWNoYXB0ZXJzIC50b3AnKS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSdcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHVybHMucXVlcnlTZWxlY3RvcignLm9sZC1jaGFwdGVycyAudG9wJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVVcmxSZW5kZXJlciAoaXNPbGQpIHtcclxuICAgICAgICByZXR1cm4gKGNoYXB0ZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGNoYXB0ZXIuY3JlYXRlZClcclxuICAgICAgICAgICAgY29uc3QgdGltZVN0cmluZyA9IGAke3BhZChkYXRlLmdldEhvdXJzKCkpfToke3BhZChkYXRlLmdldE1pbnV0ZXMoKSl9YFxyXG4gICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gYCR7cGFkKGRhdGUuZ2V0RGF0ZSgpKX0uJHtwYWQoZGF0ZS5nZXRNb250aCgpICsgMSl9LiR7U3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSkuc2xpY2UoLTIpfWBcclxuICAgICAgICAgICAgY29uc3QgZnVsbERhdGUgPSBkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA9PT0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gPyB0aW1lU3RyaW5nIDogZGF0ZVN0cmluZ1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInJvdyR7aXNPbGQgPyAnIG9sZCcgOiAnIG5ldyd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsaW5rXCIgaHJlZj1cIiR7Y2hhcHRlci51cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIiBkYXRhLWlkPVwiJHtjaGFwdGVyLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2NoYXB0ZXIudGl0bGV9IC0gQ2hhcHRlciAke2NoYXB0ZXIuY2hhcHRlcn1cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRlLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRlXCIgdGl0bGU9XCIke2Ake2RhdGVTdHJpbmd9ICR7dGltZVN0cmluZ31gfVwiPiR7ZnVsbERhdGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhpZGVcIiBkYXRhLWlkPVwiJHtjaGFwdGVyLmlkfVwiPkhpZGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9saT5gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlbmRlclVybHMgKCkge1xyXG4gICAgICAgIGNvbnN0IG1heE9sZCA9IGF3YWl0IGRiLnVybHMuZ2V0TWF4T2xkKClcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgZGIuc291cmNlcy5yZWFkKClcclxuICAgICAgICBjb25zdCB7IG5ld1VybHMsIG9sZFVybHMgfSA9IGF3YWl0IGRiLnVybHMucmVhZCgpXHJcbiAgICAgICAgY29uc3QgbmV3Um93cyA9IG5ld1VybHMubWFwKGNyZWF0ZVVybFJlbmRlcmVyKGZhbHNlKSlcclxuICAgICAgICBjb25zdCBvbGRSb3dzID0gb2xkVXJscy5tYXAoY3JlYXRlVXJsUmVuZGVyZXIodHJ1ZSkpXHJcblxyXG4gICAgICAgIGlmICghc291cmNlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdXJscy5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgICAgICBpbnRyby5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG5ld1Jvd3MubGVuZ3RoIHx8IG9sZFJvd3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGludHJvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgdXJscy5pbm5lckhUTUwgPSBbXVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdChuZXdSb3dzLmxlbmd0aCA/ICc8bGkgY2xhc3M9XCJuZXctY2hhcHRlcnNcIj5OZXcgQ2hhcHRlcnMgPHNwYW4gY2xhc3M9XCJhY3Rpb24gaGlkZS1hbGxcIj5IaWRlIGFsbDwvc3Bhbj48L2xpPicgOiBbXSlcclxuICAgICAgICAgICAgICAgIC5jb25jYXQobmV3Um93cylcclxuICAgICAgICAgICAgICAgIC5jb25jYXQoJzxsaSBjbGFzcz1cIm9sZC1jaGFwdGVyc1wiPk9sZCBDaGFwdGVycyA8c3BhbiBjbGFzcz1cImFjdGlvbiB0b3BcIj5Ub3AgJiM4NTkzOzwvc3Bhbj48L2xpPicpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG9sZFJvd3Muc2xpY2UoMCwgbWF4T2xkKSlcclxuICAgICAgICAgICAgICAgIC5jb25jYXQob2xkUm93cy5sZW5ndGggPj0gbWF4T2xkID8gWyc8bGkgY2xhc3M9XCJhY3Rpb24gbG9hZC1tb3JlXCI+TG9hZCB1cCB0byAxMDAgbW9yZSBvbGQgY2hhcHRlcnMuLi48L2xpPiddIDogW10pXHJcbiAgICAgICAgICAgICAgICAuam9pbignXFxuJylcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBuZXdSb3dzLmxlbmd0aCA/IGAoJHtuZXdSb3dzLmxlbmd0aH0pIE1hbmdhIFNjb3V0YCA6ICdNYW5nYSBTY291dCdcclxuICAgICAgICAgICAgY2hlY2tUb3BCdXR0b24oKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaW50cm8uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICB1cmxzLmlubmVySFRNTCA9ICc8bGkgY2xhc3M9XCJyb3dcIj5ObyBDaGFwdGVycyBhdmFpbGFibGUuPC9saT4nXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gJ01hbmdhIFNjb3V0J1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcjogKCkgPT4gcmVuZGVyVXJscygpXHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHBhcnNlIChzdHJpbmcsIGZhbGxiYWNrKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZylcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYWQgKG5vKSB7XHJcbiAgICByZXR1cm4gKCcwMCcgKyBubykuc2xpY2UoLTIpXHJcbn1cclxuIiwiaW1wb3J0IHsgQVBJIH0gZnJvbSAnLi4vY29tbW9uL2FwaSdcclxuaW1wb3J0IHsgQVBJX0FERFJFU1MgfSBmcm9tICcuL2NvbnN0YW50cydcclxuaW1wb3J0IHsgZGIgfSBmcm9tICcuL3N0b3JhZ2UnXHJcblxyXG5jb25zdCBjb250cm9sbGVyID0gY2hyb21lIHx8IGJyb3dzZXJcclxuXHJcbmxldCBjdXJyZW50U291cmNlID0gbnVsbFxyXG5cclxuY29uc3QgYm9va21hcmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9va21hcmsnKVxyXG5jb25zdCBib29rbWFya1RyYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvb2ttYXJrLXRyYWNrJylcclxuY29uc3QgYm9va21hcmtUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib29rbWFyay10aXRsZScpXHJcblxyXG5jb25zdCB7IFNvdXJjZSB9ID0gQVBJKEFQSV9BRERSRVNTKVxyXG5cclxuYm9va21hcmtUcmFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGJvb2ttYXJrLmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJylcclxuICAgIGJvb2ttYXJrLmNsYXNzTGlzdC5hZGQoJ3Byb2dyZXNzJylcclxuICAgIFNvdXJjZS5pbnNlcnQoY3VycmVudFNvdXJjZSlcclxuICAgICAgICAudGhlbigoc291cmNlKSA9PiBzb3VyY2UgJiYgZGIuc291cmNlcy5hZGQoc291cmNlKSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGJvb2ttYXJrLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgYm9va21hcmtUaXRsZS5pbm5lclRleHQgPSAnJ1xyXG4gICAgICAgICAgICBjdXJyZW50U291cmNlID0gbnVsbFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgYm9va21hcmsuY2xhc3NMaXN0LmFkZCgnZXJyb3InKVxyXG4gICAgICAgICAgICBib29rbWFyay5jbGFzc0xpc3QucmVtb3ZlKCdwcm9ncmVzcycpXHJcbiAgICAgICAgICAgIGJvb2ttYXJrVHJhY2suaW5uZXJUZXh0ID0gJ1JldHJ5J1xyXG4gICAgICAgICAgICBib29rbWFya1RpdGxlLmlubmVyVGV4dCA9ICdVbmFibGUgdG8gY3JlYXRlIGJvb2ttYXJrLCBwbGVhc2UgcmV0cnkgbGF0ZXIgYW5kIGlmIGl0IGtlZXBzIGZhaWxpbmcsIHNlbmQgYW4gZW1haWwgd2l0aCB0aGUgdGltZSArIHVybCB0byBcImluZm9AZm9jaGxhYy5jb21cIi4nXHJcbiAgICAgICAgfSlcclxufSlcclxuXHJcbmNvbnRyb2xsZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoYXN5bmMgKHJlcXVlc3QpID0+IHtcclxuICAgIGlmIChyZXF1ZXN0LmlkICYmIHJlcXVlc3QudGl0bGUgJiYgcmVxdWVzdC51cmwpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgZGIuc291cmNlcy5yZWFkKClcclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2VzLnNvbWUoKHNvdXJjZSkgPT4gc291cmNlLnVybC5zcGxpdCgnLycpWzJdID09PSByZXF1ZXN0LnVybC5zcGxpdCgnLycpWzJdICYmIFN0cmluZyhzb3VyY2UubWFuZ2FJZCkgPT09IFN0cmluZyhyZXF1ZXN0LmlkKSkpIHtcclxuICAgICAgICAgICAgYm9va21hcmsuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgICAgICBib29rbWFya1RpdGxlLmlubmVyVGV4dCA9IGBEbyB5b3Ugd2FudCB0byBzdGFydCB0cmFja2luZyBcIiR7cmVxdWVzdC50aXRsZX1cIj9gXHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiByZXF1ZXN0LnR5cGUsXHJcbiAgICAgICAgICAgICAgICBtYW5nYUlkOiByZXF1ZXN0LmlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHJlcXVlc3QudGl0bGUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IHJlcXVlc3QudXJsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJvb2ttYXJrLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIGJvb2ttYXJrVGl0bGUuaW5uZXJUZXh0ID0gJydcclxuICAgIGN1cnJlbnRTb3VyY2UgPSBudWxsXHJcbn0pXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdEJvb2ttYXJrICgpIHtcclxuICAgIGNvbnRyb2xsZXIudGFicy5xdWVyeShcclxuICAgICAgICB7IGFjdGl2ZTogdHJ1ZSwgd2luZG93SWQ6IGNvbnRyb2xsZXIud2luZG93cy5XSU5ET1dfSURfQ1VSUkVOVCB9LFxyXG4gICAgICAgICh0YWJzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0YWJzWzBdLnVybC5pbmNsdWRlcygnaHR0cDovLycpIHx8IHRhYnNbMF0udXJsLmluY2x1ZGVzKCdodHRwczovLycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHsgdGFyZ2V0OiB7IHRhYklkOiB0YWJzWzBdLmlkIH0sIGZ1bmN0aW9uOiB0ZXN0IH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRlc3QgKCkge1xyXG4gICAgZnVuY3Rpb24gZGVjb2RlSFRNTEVudGl0aWVzIChzdHIpIHtcclxuICAgICAgICBpZiAoc3RyICYmIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvPHNjcmlwdFtePl0qPihbXFxTXFxzXSo/KTxcXC9zY3JpcHQ+L2dtaSwgJycpXHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC88XFwvP1xcdyg/OlteXCInPl18XCJbXlwiXSpcInwnW14nXSonKSo+L2dtaSwgJycpXHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gc3RyXHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnRleHRDb250ZW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHJcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlIChzdHJpbmcsIGZhbGxiYWNrKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsbGJhY2tcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdEZhbkZveCAoKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKC9eXFwvbWFuZ2FcXC9bXi9dKlxcLy8pPy5bMF1cclxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlYWRlci1oZWFkZXItdGl0bGUtMSBhOmZpcnN0LWNoaWxkJyk/LmlubmVyVGV4dCB8fFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlsLWluZm8tcmlnaHQtdGl0bGUtZm9udCcpPy5pbm5lclRleHRcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ2ZhbmZveCcsXHJcbiAgICAgICAgICAgIGlkOiB1cmwgPyB1cmwuc3BsaXQoJy8nKVsyXSA6IG51bGwsXHJcbiAgICAgICAgICAgIHRpdGxlOiBuYW1lLFxyXG4gICAgICAgICAgICB1cmw6IHVybCA/IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHt1cmx9YCA6IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdE1hbmdhc3RyZWFtICgpIHtcclxuICAgICAgICBjb25zdCBicmVhZGNydW1wTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ29sW2l0ZW10eXBlPVwiaHR0cDovL3NjaGVtYS5vcmcvQnJlYWRjcnVtYkxpc3RcIl0gbWV0YVtpdGVtcHJvcD1cInBvc2l0aW9uXCJdW2NvbnRlbnQ9XCIyXCJdJylcclxuICAgICAgICAgICAgPy5jbG9zZXN0KCdsaScpXHJcbiAgICAgICAgICAgID8ucXVlcnlTZWxlY3RvcignYScpXHJcblxyXG4gICAgICAgIGlmICghYnJlYWRjcnVtcExpbmspIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdXJsID0gYnJlYWRjcnVtcExpbmsuaHJlZlxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBicmVhZGNydW1wTGluay5xdWVyeVNlbGVjdG9yKCdzcGFuJyk/LmlubmVyVGV4dFxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnbWFuZ2FzdHJlYW0nLFxyXG4gICAgICAgICAgICBpZDogdXJsPy5zcGxpdCgnLycpWzRdLFxyXG4gICAgICAgICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgICAgICAgdXJsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RNYW5nYWRleCAoKSB7XHJcbiAgICAgICAgaWYgKC90aXRsZVxcL1tcXGQtXFx3XSpcXC9bXFxkLVxcd10qLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKT8uWzJdXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFuZ2EtY29udGFpbmVyIC50aXRsZSBwJyk/LmlubmVyVGV4dFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdtYW5nYWRleCcsXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBpZCA/IGBodHRwczovL2FwaS5tYW5nYWRleC5vcmcvbWFuZ2EvJHtpZH1gIDogbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKC9jaGFwdGVyXFwvW1xcZC1cXHddKlxcL1xcZCovLnRlc3Qod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYS50ZXh0LXByaW1hcnlbaHJlZio9XCIvdGl0bGUvXCJdJylcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGxpbms/LmlubmVyVGV4dFxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGxpbms/LmhyZWYuc3BsaXQoJy8nKT8uWzRdXHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ21hbmdhZGV4JyxcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGlkID8gYGh0dHBzOi8vYXBpLm1hbmdhZGV4Lm9yZy9tYW5nYS8ke2lkfWAgOiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdEdlbmthbiAoKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbG9jYXRpb24uaHJlZi5tYXRjaCgvaHR0cHM/OlxcL1xcL1teL10qXFwvY29taWNzXFwvKFxcZCopLVstXFx3XFxkXSovKSB8fCBbXVxyXG4gICAgICAgIGNvbnN0IHVybCA9IHJlc3VsdFswXVxyXG4gICAgICAgIGNvbnN0IGlkID0gcmVzdWx0WzFdXHJcblxyXG4gICAgICAgIGlmICghdXJsIHx8ICFpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKC9eXFxkKyQvLnRlc3QobG9jYXRpb24uaHJlZi5zcGxpdCgnLycpLnNsaWNlKC0yKS5qb2luKCcnKS5yZXBsYWNlKCcuJywgJycpLnRyaW0oKSkpIHtcclxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGluZyBoNicpLnRleHRDb250ZW50LnRyaW0oKVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dlbmthbicsXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgdXJsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtwcm9wZXJ0eSo9XCJ0aXRsZVwiXScpLmNvbnRlbnQudHJpbSgpXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZ2Vua2FuJyxcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgICAgICB1cmxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0TGV2aWF0aGFuICgpIHtcclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC10aXRsZSBoMScpXHJcbiAgICAgICAgY29uc3QgdGl0bGVzID0gW1xyXG4gICAgICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwiYXBwbGljYXRpb24vbGQranNvblwiXScpKVxyXG4gICAgICAgICAgICAgICAgLm1hcCgoc2NyaXB0KSA9PiBwYXJzZShzY3JpcHQuaW5uZXJUZXh0KT8uaGVhZGxpbmUpLmZpbmQoKGgpID0+IGgpLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcHRlci1oZWFkaW5nJyk/LmlubmVyVGV4dD8uc3BsaXQoJyAtICcpWzBdLFxyXG4gICAgICAgICAgICBoZWFkZXIgJiYgQXJyYXkuZnJvbShoZWFkZXIuY2hpbGROb2RlcykucmVkdWNlKCh0aXRsZSwgbm9kZSkgPT4gdGl0bGUgKyAobm9kZS5ub2RlVHlwZSA9PT0gMyA/IG5vZGUudGV4dENvbnRlbnQgOiAnJyksICcnKSxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhdGUtdGl0bGUnKT8udGl0bGVcclxuICAgICAgICBdXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKHRpdGxlKSA9PiB0aXRsZSlcclxuICAgICAgICAgICAgLnJlZHVjZSgobWFwLCB0aXRsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xlYW4gPSBkZWNvZGVIVE1MRW50aXRpZXModGl0bGUpLnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgbWFwW2NsZWFuXSA9IHR5cGVvZiBtYXBbY2xlYW5dID09PSAnbnVtYmVyJyA/IG1hcFtjbGVhbl0gKyAxIDogMVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcFxyXG4gICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICBjb25zdCB0aXRsZSA9IE9iamVjdC5rZXlzKHRpdGxlcykuc29ydCgodGl0bGUxLCB0aXRsZTIpID0+IHRpdGxlc1t0aXRsZTFdIC0gdGl0bGVzW3RpdGxlMl0pWzBdXHJcblxyXG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnNwbGl0KCcvbWFuZ2EvJylbMF0gKyAnL21hbmdhLydcclxuICAgICAgICBjb25zdCBpZCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYucmVwbGFjZShiYXNlVXJsLCAnJykuc3BsaXQoJy8nKVswXVxyXG4gICAgICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVcmx9JHtpZH1gXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdsZXZpYXRoYW4nLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgIHVybFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0TWFkYXJhICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBwYXJzZSAoc3RyaW5nLCBmYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsbGJhY2tcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaWRzID0gW1xyXG4gICAgICAgICAgICB3aW5kb3c/Lm1hbmdhPy5tYW5nYV9pZCxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhdGluZy1wb3N0LWlkJyk/LnZhbHVlLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3AtbWFuZ2EtYWN0aW9uLWJ1dHRvbicpPy5kYXRhc2V0Py5bJ3Bvc3QnXSxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYXB0ZXItc2VsZWN0aW9uJyk/LmRhdGFzZXQ/LlsnbWFuZ2EnXSxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hbmdhLWNoYXB0ZXJzLWhvbGRlcicpPy5kYXRhc2V0Py5bJ2lkJ10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib29rbWFyaycpPy5kYXRhc2V0Py5bJ2lkJ10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYW5nYS1yZWFkaW5nLW5hdi1oZWFkJyk/LmRhdGFzZXQ/LlsnaWQnXSxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hbmdhLXJlYWRpbmctbmF2LWZvb3QnKT8uZGF0YXNldD8uWydpZCddXHJcbiAgICAgICAgXVxyXG4gICAgICAgICAgICAuZmlsdGVyKCh0aXRsZSkgPT4gdGl0bGUpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKG1hcCwgaWQpID0+IHtcclxuICAgICAgICAgICAgICAgIG1hcFtpZF0gPSB0eXBlb2YgbWFwW2lkXSA9PT0gJ251bWJlcicgPyBtYXBbaWRdICsgMSA6IDFcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXBcclxuICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgY29uc3QgaWQgPSBPYmplY3Qua2V5cyhpZHMpLnNvcnQoKGlkMSwgaWQyKSA9PiBpZHNbaWQxXSAtIGlkc1tpZDJdKVswXVxyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC10aXRsZSBoMScpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxLmVudHJ5LXRpdGxlJylcclxuICAgICAgICBjb25zdCB0aXRsZXMgPSBbXHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCJdJykpXHJcbiAgICAgICAgICAgICAgICAubWFwKChzY3JpcHQpID0+IHBhcnNlKHNjcmlwdC5pbm5lclRleHQpPy5oZWFkbGluZSkuZmluZCgoaCkgPT4gaCksXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFwdGVyLWhlYWRpbmcnKT8uaW5uZXJUZXh0Py5zcGxpdCgnIC0gJylbMF0sXHJcbiAgICAgICAgICAgIGhlYWRlciAmJiBBcnJheS5mcm9tKGhlYWRlci5jaGlsZE5vZGVzKS5yZWR1Y2UoKHRpdGxlLCBub2RlKSA9PiB0aXRsZSArIChub2RlLm5vZGVUeXBlID09PSAzID8gbm9kZS50ZXh0Q29udGVudCA6ICcnKSwgJycpLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0ZS10aXRsZScpPy50aXRsZVxyXG4gICAgICAgIF1cclxuICAgICAgICAgICAgLmZpbHRlcigodGl0bGUpID0+IHRpdGxlKVxyXG4gICAgICAgICAgICAucmVkdWNlKChtYXAsIHRpdGxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhbiA9IGRlY29kZUhUTUxFbnRpdGllcyh0aXRsZSkudHJpbSgpXHJcbiAgICAgICAgICAgICAgICBtYXBbY2xlYW5dID0gdHlwZW9mIG1hcFtjbGVhbl0gPT09ICdudW1iZXInID8gbWFwW2NsZWFuXSArIDEgOiAxXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwXHJcbiAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgIGxldCB0aXRsZSA9IE9iamVjdC5rZXlzKHRpdGxlcykuc29ydCgodGl0bGUxLCB0aXRsZTIpID0+IHRpdGxlc1t0aXRsZTFdIC0gdGl0bGVzW3RpdGxlMl0pWzBdXHJcblxyXG4gICAgICAgIGxldCB1cmwgPSBudWxsXHJcbiAgICAgICAgaWYgKGRvY3VtZW50Py5sb2NhdGlvbj8uaHJlZikge1xyXG4gICAgICAgICAgICB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLm1hdGNoKC9odHRwcz86XFwvXFwvW14vXSpcXC9bXi9dKlxcL1teL10qXFwvLyk/LlswXVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24uaHJlZi5pbmNsdWRlcygncmVhcGVyc2NhbnMuY29tJykpIHtcclxuICAgICAgICAgICAgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5tYXRjaCgvaHR0cC4qXFwvc2VyaWVzXFwvW14vXSpcXC8vKT8uWzBdXHJcbiAgICAgICAgICAgIHRpdGxlID0gdGl0bGUuc3BsaXQoJyDigJMgJylbMF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdtYWRhcmEnLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgIHVybFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzdWx0XHJcblxyXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09PSAnZmFuZm94Lm5ldCcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZmFuZm94JylcclxuICAgICAgICByZXN1bHQgPSB0ZXN0RmFuRm94KClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUwuaW5jbHVkZXMoJ1Bvd2VyZWQgYnkgR2Vua2FuLicpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dlbmthbicpXHJcbiAgICAgICAgcmVzdWx0ID0gdGVzdEdlbmthbigpXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MLmluY2x1ZGVzKCd0cy1icmVhZGNydW1iIGJpeGJveCcpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hbmdhc3RyZWFtJylcclxuICAgICAgICByZXN1bHQgPSB0ZXN0TWFuZ2FzdHJlYW0oKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QuaW5jbHVkZXMoJ2xldmlhdGFuc2NhbnMuY29tJykgfHwgd2luZG93LmxvY2F0aW9uLmhvc3QuaW5jbHVkZXMoJ2ltbW9ydGFsdXBkYXRlcy5jb20nKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdsZXZpYXRoYW4nKVxyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RMZXZpYXRoYW4oKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QgPT09ICdtYW5nYWRleC5vcmcnKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hbmdhZGV4JylcclxuICAgICAgICByZXN1bHQgPSB0ZXN0TWFuZ2FkZXgoKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21hZGFyYScpXHJcbiAgICAgICAgcmVzdWx0ID0gdGVzdE1hZGFyYSgpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2cocmVzdWx0KVxyXG5cclxuICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICBjb250cm9sbGVyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVzdWx0KVxyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cudHJpZ2dlclRlc3QgPSAoKSA9PiB0ZXN0Qm9va21hcmsoKVxyXG4iLCJleHBvcnQgY29uc3QgQVBJX0FERFJFU1MgPSAnaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbScgLy8gJ2h0dHA6Ly9sb2NhbGhvc3Q6NDMyMTQnXHJcbiIsImV4cG9ydCBmdW5jdGlvbiBpbml0SW50cm8gKCkge1xyXG4gICAgY29uc3QgcnVudGltZSA9IGNocm9tZT8ucnVudGltZSB8fCBicm93c2VyPy5ydW50aW1lXHJcbiAgICBjb25zdCBib29rbWFya0ltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvLWJvb2ttYXJrJylcclxuICAgIGJvb2ttYXJrSW1hZ2Uuc3JjID0gcnVudGltZS5nZXRVUkwoJ2ltYWdlcy9ib29rbWFyay1zYW1wbGUucG5nJylcclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVEQiB9IGZyb20gJy4uL2NvbW1vbi9kYidcclxuXHJcbmNvbnN0IGJyb3dzZXJTdG9yYWdlID0gY2hyb21lPy5zdG9yYWdlIHx8IGJyb3dzZXI/LnN0b3JhZ2VcclxuXHJcbmZ1bmN0aW9uIHJlYWQgKG5hbWVzcGFjZSwga2V5cykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBicm93c2VyU3RvcmFnZVtuYW1lc3BhY2VdLmdldChrZXlzLCByZXNvbHZlKSlcclxufVxyXG5cclxuZnVuY3Rpb24gd3JpdGUgKG5hbWVzcGFjZSwga2V5UGFpcnMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gYnJvd3NlclN0b3JhZ2VbbmFtZXNwYWNlXS5zZXQoa2V5UGFpcnMsIHJlc29sdmUpKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRMaXN0ZW5lciAoY2FsbGJhY2spIHtcclxuICAgIHJldHVybiBicm93c2VyU3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoY2FsbGJhY2spXHJcbn1cclxuXHJcbmNvbnN0IHN0b3JhZ2UgPSB7XHJcbiAgICByZWFkLCB3cml0ZSwgYWRkTGlzdGVuZXJcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRiID0gY3JlYXRlREIoc3RvcmFnZSlcclxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qIEZpbGVTYXZlci5qc1xyXG4gKiBBIHNhdmVBcygpIEZpbGVTYXZlciBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxyXG4gKiBFUzZpZmllZCBieSBDb2xlIENoYW1iZXJsYWluLCBodHRwczovL2dpdGh1Yi5jb20vY2NoYW1iZXJsYWluXHJcbiAqXHJcbiAqIExpY2Vuc2U6IE1JVFxyXG4gKiAgIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxyXG4gKi9cblxuLypnbG9iYWwgc2VsZiAqL1xuLypqc2xpbnQgYml0d2lzZTogdHJ1ZSwgaW5kZW50OiA0LCBsYXhicmVhazogdHJ1ZSwgbGF4Y29tbWE6IHRydWUsIHNtYXJ0dGFiczogdHJ1ZSwgcGx1c3BsdXM6IHRydWUgKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9GaWxlU2F2ZXIuanMgKi9cblxudmFyIHNhdmVBcyA9IGV4cG9ydHMuc2F2ZUFzID0gd2luZG93LnNhdmVBcyB8fCBmdW5jdGlvbiAodmlldykge1xuICAvLyBJRSA8MTAgaXMgZXhwbGljaXRseSB1bnN1cHBvcnRlZFxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL01TSUUgWzEtOV1cXC4vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHJldHVybjtcbiAgdmFyIGRvYyA9IHZpZXcuZG9jdW1lbnQ7XG4gIC8vIG9ubHkgZ2V0IFVSTCB3aGVuIG5lY2Vzc2FyeSBpbiBjYXNlIEJsb2IuanMgaGFzbid0IG92ZXJyaWRkZW4gaXQgeWV0XG4gIHZhciBnZXRfVVJMID0gZnVuY3Rpb24gZ2V0X1VSTCgpIHtcbiAgICByZXR1cm4gdmlldy5VUkwgfHwgdmlldy53ZWJraXRVUkwgfHwgdmlldztcbiAgfTtcbiAgdmFyIHNhdmVfbGluayA9IGRvYy5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCAnYScpO1xuICB2YXIgY2FuX3VzZV9zYXZlX2xpbmsgPSAnZG93bmxvYWQnIGluIHNhdmVfbGluaztcbiAgdmFyIGNsaWNrID0gZnVuY3Rpb24gY2xpY2sobm9kZSkge1xuICAgIHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KCdjbGljaycpO1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH07XG4gIHZhciBpc19zYWZhcmkgPSAvVmVyc2lvblxcL1tcXGRcXC5dKy4qU2FmYXJpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICB2YXIgd2Via2l0X3JlcV9mcyA9IHZpZXcud2Via2l0UmVxdWVzdEZpbGVTeXN0ZW07XG4gIHZhciByZXFfZnMgPSB2aWV3LnJlcXVlc3RGaWxlU3lzdGVtIHx8IHdlYmtpdF9yZXFfZnMgfHwgdmlldy5tb3pSZXF1ZXN0RmlsZVN5c3RlbTtcbiAgdmFyIHRocm93X291dHNpZGUgPSBmdW5jdGlvbiB0aHJvd19vdXRzaWRlKGV4KSB7XG4gICAgKHZpZXcuc2V0SW1tZWRpYXRlIHx8IHZpZXcuc2V0VGltZW91dCkoZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgZXg7XG4gICAgfSwgMCk7XG4gIH07XG4gIHZhciBmb3JjZV9zYXZlYWJsZV90eXBlID0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XG4gIHZhciBmc19taW5fc2l6ZSA9IDA7XG4gIC8vIHRoZSBCbG9iIEFQSSBpcyBmdW5kYW1lbnRhbGx5IGJyb2tlbiBhcyB0aGVyZSBpcyBubyBcImRvd25sb2FkZmluaXNoZWRcIiBldmVudCB0byBzdWJzY3JpYmUgdG9cbiAgdmFyIGFyYml0cmFyeV9yZXZva2VfdGltZW91dCA9IDEwMDAgKiA0MDsgLy8gaW4gbXNcbiAgdmFyIHJldm9rZSA9IGZ1bmN0aW9uIHJldm9rZShmaWxlKSB7XG4gICAgdmFyIHJldm9rZXIgPSBmdW5jdGlvbiByZXZva2VyKCkge1xuICAgICAgaWYgKHR5cGVvZiBmaWxlID09PSAnc3RyaW5nJykgLy8gZmlsZSBpcyBhbiBvYmplY3QgVVJMXG4gICAgICAgIGdldF9VUkwoKS5yZXZva2VPYmplY3RVUkwoZmlsZSk7ZWxzZSAvLyBmaWxlIGlzIGEgRmlsZVxuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH07XG4gICAgLyogLy8gVGFrZSBub3RlIFczQzpcclxuICAgIHZhclxyXG4gICAgICB1cmkgPSB0eXBlb2YgZmlsZSA9PT0gXCJzdHJpbmdcIiA/IGZpbGUgOiBmaWxlLnRvVVJMKClcclxuICAgICwgcmV2b2tlciA9IGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgICAvLyBpZGVhbHkgRG93bmxvYWRGaW5pc2hlZEV2ZW50LmRhdGEgd291bGQgYmUgdGhlIFVSTCByZXF1ZXN0ZWRcclxuICAgICAgaWYgKGV2dC5kYXRhID09PSB1cmkpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGZpbGUgPT09IFwic3RyaW5nXCIpIHsgLy8gZmlsZSBpcyBhbiBvYmplY3QgVVJMXHJcbiAgICAgICAgICBnZXRfVVJMKCkucmV2b2tlT2JqZWN0VVJMKGZpbGUpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIGZpbGUgaXMgYSBGaWxlXHJcbiAgICAgICAgICBmaWxlLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKFwiZG93bmxvYWRmaW5pc2hlZFwiLCByZXZva2VyKTtcclxuICAgICovXG4gICAgc2V0VGltZW91dChyZXZva2VyLCBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQpO1xuICB9O1xuICB2YXIgZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaChmaWxlc2F2ZXIsIGV2ZW50X3R5cGVzLCBldmVudCkge1xuICAgIGV2ZW50X3R5cGVzID0gW10uY29uY2F0KGV2ZW50X3R5cGVzKTtcbiAgICB2YXIgaSA9IGV2ZW50X3R5cGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBmaWxlc2F2ZXJbJ29uJyArIGV2ZW50X3R5cGVzW2ldXTtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsaXN0ZW5lci5jYWxsKGZpbGVzYXZlciwgZXZlbnQgfHwgZmlsZXNhdmVyKTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICB0aHJvd19vdXRzaWRlKGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgdmFyIGF1dG9fYm9tID0gZnVuY3Rpb24gYXV0b19ib20oYmxvYikge1xuICAgIC8vIHByZXBlbmQgQk9NIGZvciBVVEYtOCBYTUwgYW5kIHRleHQvKiB0eXBlcyAoaW5jbHVkaW5nIEhUTUwpXG4gICAgaWYgKC9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGJsb2IudHlwZSkpIHJldHVybiBuZXcgQmxvYihbJ++7vycsIGJsb2JdLCB7IHR5cGU6IGJsb2IudHlwZSB9KTtcbiAgICByZXR1cm4gYmxvYjtcbiAgfTtcblxuICB2YXIgRmlsZVNhdmVyID0gZnVuY3Rpb24gRmlsZVNhdmVyKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZpbGVTYXZlcik7XG5cbiAgICBpZiAoIW5vX2F1dG9fYm9tKSBibG9iID0gYXV0b19ib20oYmxvYik7XG4gICAgLy8gRmlyc3QgdHJ5IGEuZG93bmxvYWQsIHRoZW4gd2ViIGZpbGVzeXN0ZW0sIHRoZW4gb2JqZWN0IFVSTHNcbiAgICB2YXIgZmlsZXNhdmVyID0gdGhpcyxcbiAgICAgICAgdHlwZSA9IGJsb2IudHlwZSxcbiAgICAgICAgYmxvYl9jaGFuZ2VkID0gZmFsc2UsXG4gICAgICAgIG9iamVjdF91cmwsXG4gICAgICAgIHRhcmdldF92aWV3LFxuICAgICAgICBkaXNwYXRjaF9hbGwgPSBmdW5jdGlvbiBkaXNwYXRjaF9hbGwoKSB7XG4gICAgICBkaXNwYXRjaChmaWxlc2F2ZXIsICd3cml0ZXN0YXJ0IHByb2dyZXNzIHdyaXRlIHdyaXRlZW5kJy5zcGxpdCgnICcpKTtcbiAgICB9XG4gICAgLy8gb24gYW55IGZpbGVzeXMgZXJyb3JzIHJldmVydCB0byBzYXZpbmcgd2l0aCBvYmplY3QgVVJMc1xuICAgICxcbiAgICAgICAgZnNfZXJyb3IgPSBmdW5jdGlvbiBmc19lcnJvcigpIHtcbiAgICAgIGlmICh0YXJnZXRfdmlldyAmJiBpc19zYWZhcmkgJiYgdHlwZW9mIEZpbGVSZWFkZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFNhZmFyaSBkb2Vzbid0IGFsbG93IGRvd25sb2FkaW5nIG9mIGJsb2IgdXJsc1xuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgYmFzZTY0RGF0YSA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICAgICAgdGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9ICdkYXRhOmF0dGFjaG1lbnQvZmlsZScgKyBiYXNlNjREYXRhLnNsaWNlKGJhc2U2NERhdGEuc2VhcmNoKC9bLDtdLykpO1xuICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5JTklUO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBkb24ndCBjcmVhdGUgbW9yZSBvYmplY3QgVVJMcyB0aGFuIG5lZWRlZFxuICAgICAgaWYgKGJsb2JfY2hhbmdlZCB8fCAhb2JqZWN0X3VybCkge1xuICAgICAgICBvYmplY3RfdXJsID0gZ2V0X1VSTCgpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIH1cbiAgICAgIGlmICh0YXJnZXRfdmlldykge1xuICAgICAgICB0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gb2JqZWN0X3VybDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXdfdGFiID0gdmlldy5vcGVuKG9iamVjdF91cmwsICdfYmxhbmsnKTtcbiAgICAgICAgaWYgKG5ld190YWIgPT09IHVuZGVmaW5lZCAmJiBpc19zYWZhcmkpIHtcbiAgICAgICAgICAvL0FwcGxlIGRvIG5vdCBhbGxvdyB3aW5kb3cub3Blbiwgc2VlIGh0dHA6Ly9iaXQubHkvMWtaZmZSSVxuICAgICAgICAgIHZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICBkaXNwYXRjaF9hbGwoKTtcbiAgICAgIHJldm9rZShvYmplY3RfdXJsKTtcbiAgICB9LFxuICAgICAgICBhYm9ydGFibGUgPSBmdW5jdGlvbiBhYm9ydGFibGUoZnVuYykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGZpbGVzYXZlci5yZWFkeVN0YXRlICE9PSBmaWxlc2F2ZXIuRE9ORSkge1xuICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcbiAgICAgICAgY3JlYXRlX2lmX25vdF9mb3VuZCA9IHsgY3JlYXRlOiB0cnVlLCBleGNsdXNpdmU6IGZhbHNlIH0sXG4gICAgICAgIHNsaWNlO1xuXG4gICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuSU5JVDtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIG5hbWUgPSAnZG93bmxvYWQnO1xuICAgIH1cbiAgICBpZiAoY2FuX3VzZV9zYXZlX2xpbmspIHtcbiAgICAgIG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNhdmVfbGluay5ocmVmID0gb2JqZWN0X3VybDtcbiAgICAgICAgc2F2ZV9saW5rLmRvd25sb2FkID0gbmFtZTtcbiAgICAgICAgY2xpY2soc2F2ZV9saW5rKTtcbiAgICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICAgIHJldm9rZShvYmplY3RfdXJsKTtcbiAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBPYmplY3QgYW5kIHdlYiBmaWxlc3lzdGVtIFVSTHMgaGF2ZSBhIHByb2JsZW0gc2F2aW5nIGluIEdvb2dsZSBDaHJvbWUgd2hlblxuICAgIC8vIHZpZXdlZCBpbiBhIHRhYiwgc28gSSBmb3JjZSBzYXZlIHdpdGggYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXG4gICAgLy8gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9OTExNThcbiAgICAvLyBVcGRhdGU6IEdvb2dsZSBlcnJhbnRseSBjbG9zZWQgOTExNTgsIEkgc3VibWl0dGVkIGl0IGFnYWluOlxuICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zODk2NDJcbiAgICBpZiAodmlldy5jaHJvbWUgJiYgdHlwZSAmJiB0eXBlICE9PSBmb3JjZV9zYXZlYWJsZV90eXBlKSB7XG4gICAgICBzbGljZSA9IGJsb2Iuc2xpY2UgfHwgYmxvYi53ZWJraXRTbGljZTtcbiAgICAgIGJsb2IgPSBzbGljZS5jYWxsKGJsb2IsIDAsIGJsb2Iuc2l6ZSwgZm9yY2Vfc2F2ZWFibGVfdHlwZSk7XG4gICAgICBibG9iX2NoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBTaW5jZSBJIGNhbid0IGJlIHN1cmUgdGhhdCB0aGUgZ3Vlc3NlZCBtZWRpYSB0eXBlIHdpbGwgdHJpZ2dlciBhIGRvd25sb2FkXG4gICAgLy8gaW4gV2ViS2l0LCBJIGFwcGVuZCAuZG93bmxvYWQgdG8gdGhlIGZpbGVuYW1lLlxuICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD02NTQ0MFxuICAgIGlmICh3ZWJraXRfcmVxX2ZzICYmIG5hbWUgIT09ICdkb3dubG9hZCcpIHtcbiAgICAgIG5hbWUgKz0gJy5kb3dubG9hZCc7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBmb3JjZV9zYXZlYWJsZV90eXBlIHx8IHdlYmtpdF9yZXFfZnMpIHtcbiAgICAgIHRhcmdldF92aWV3ID0gdmlldztcbiAgICB9XG4gICAgaWYgKCFyZXFfZnMpIHtcbiAgICAgIGZzX2Vycm9yKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZzX21pbl9zaXplICs9IGJsb2Iuc2l6ZTtcbiAgICByZXFfZnModmlldy5URU1QT1JBUlksIGZzX21pbl9zaXplLCBhYm9ydGFibGUoZnVuY3Rpb24gKGZzKSB7XG4gICAgICBmcy5yb290LmdldERpcmVjdG9yeSgnc2F2ZWQnLCBjcmVhdGVfaWZfbm90X2ZvdW5kLCBhYm9ydGFibGUoZnVuY3Rpb24gKGRpcikge1xuICAgICAgICB2YXIgc2F2ZSA9IGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgICAgICAgZGlyLmdldEZpbGUobmFtZSwgY3JlYXRlX2lmX25vdF9mb3VuZCwgYWJvcnRhYmxlKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgICAgICBmaWxlLmNyZWF0ZVdyaXRlcihhYm9ydGFibGUoZnVuY3Rpb24gKHdyaXRlcikge1xuICAgICAgICAgICAgICB3cml0ZXIub253cml0ZWVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSBmaWxlLnRvVVJMKCk7XG4gICAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChmaWxlc2F2ZXIsICd3cml0ZWVuZCcsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICByZXZva2UoZmlsZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHdyaXRlci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHdyaXRlci5lcnJvcjtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSAhPT0gZXJyb3IuQUJPUlRfRVJSKSB7XG4gICAgICAgICAgICAgICAgICBmc19lcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgJ3dyaXRlc3RhcnQgcHJvZ3Jlc3Mgd3JpdGUgYWJvcnQnLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB3cml0ZXJbJ29uJyArIGV2ZW50XSA9IGZpbGVzYXZlclsnb24nICsgZXZlbnRdO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3JpdGVyLndyaXRlKGJsb2IpO1xuICAgICAgICAgICAgICBmaWxlc2F2ZXIuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgd3JpdGVyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuV1JJVElORztcbiAgICAgICAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgICAgICAgfSksIGZzX2Vycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyLmdldEZpbGUobmFtZSwgeyBjcmVhdGU6IGZhbHNlIH0sIGFib3J0YWJsZShmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgIC8vIGRlbGV0ZSBmaWxlIGlmIGl0IGFscmVhZHkgZXhpc3RzXG4gICAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgICAgICBzYXZlKCk7XG4gICAgICAgIH0pLCBhYm9ydGFibGUoZnVuY3Rpb24gKGV4KSB7XG4gICAgICAgICAgaWYgKGV4LmNvZGUgPT09IGV4Lk5PVF9GT1VORF9FUlIpIHtcbiAgICAgICAgICAgIHNhdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnNfZXJyb3IoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgfSksIGZzX2Vycm9yKTtcbiAgfTtcblxuICB2YXIgRlNfcHJvdG8gPSBGaWxlU2F2ZXIucHJvdG90eXBlO1xuICB2YXIgc2F2ZUFzID0gZnVuY3Rpb24gc2F2ZUFzKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG4gICAgcmV0dXJuIG5ldyBGaWxlU2F2ZXIoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pO1xuICB9O1xuXG4gIC8vIElFIDEwKyAobmF0aXZlIHNhdmVBcylcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuICAgICAgaWYgKCFub19hdXRvX2JvbSkgYmxvYiA9IGF1dG9fYm9tKGJsb2IpO1xuICAgICAgcmV0dXJuIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGJsb2IsIG5hbWUgfHwgJ2Rvd25sb2FkJyk7XG4gICAgfTtcbiAgfVxuXG4gIEZTX3Byb3RvLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmaWxlc2F2ZXIgPSB0aGlzO1xuICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgZGlzcGF0Y2goZmlsZXNhdmVyLCAnYWJvcnQnKTtcbiAgfTtcbiAgRlNfcHJvdG8ucmVhZHlTdGF0ZSA9IEZTX3Byb3RvLklOSVQgPSAwO1xuICBGU19wcm90by5XUklUSU5HID0gMTtcbiAgRlNfcHJvdG8uRE9ORSA9IDI7XG5cbiAgRlNfcHJvdG8uZXJyb3IgPSBGU19wcm90by5vbndyaXRlc3RhcnQgPSBGU19wcm90by5vbnByb2dyZXNzID0gRlNfcHJvdG8ub253cml0ZSA9IEZTX3Byb3RvLm9uYWJvcnQgPSBGU19wcm90by5vbmVycm9yID0gRlNfcHJvdG8ub253cml0ZWVuZCA9IG51bGw7XG5cbiAgcmV0dXJuIHNhdmVBcztcbn0odHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgfHwgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93IHx8IHVuZGVmaW5lZC5jb250ZW50KTtcbi8vIGBzZWxmYCBpcyB1bmRlZmluZWQgaW4gRmlyZWZveCBmb3IgQW5kcm9pZCBjb250ZW50IHNjcmlwdCBjb250ZXh0XG4vLyB3aGlsZSBgdGhpc2AgaXMgbnNJQ29udGVudEZyYW1lTWVzc2FnZU1hbmFnZXJcbi8vIHdpdGggYW4gYXR0cmlidXRlIGBjb250ZW50YCB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSB3aW5kb3dcblxuZXhwb3J0cy5kZWZhdWx0ID0gc2F2ZUFzOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcydcbmltcG9ydCB7IHRlc3RCb29rbWFyayB9IGZyb20gJy4uL2V4dGVuc2lvbi9ib29rbWFyaydcbmltcG9ydCB7IGFkZEltcG9ydEhhbmRsZXJzIH0gZnJvbSAnLi4vY29tbW9uL2ltcG9ydCdcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi4vZXh0ZW5zaW9uL3N0b3JhZ2UnXG5pbXBvcnQgeyB1cmxSZW5kZXJlciB9IGZyb20gJy4uL2NvbW1vbi91cmxzJ1xuaW1wb3J0IHsgc291cmNlUmVuZGVyZXIgfSBmcm9tICcuLi9jb21tb24vc291cmNlcydcbmltcG9ydCB7IG1hcmtSZWZyZXNoZWQsIHJlc2lzdGVyUHJvZ3Jlc3NIYW5kbGVyLCB1cGRhdGVQcm9ncmVzcyB9IGZyb20gJy4uL2NvbW1vbi9wcm9ncmVzcy1iYXInXG5pbXBvcnQgeyBjcmVhdGVTY2hlZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9zY2hlZHVsZSdcbmltcG9ydCB7IHJlZ2lzdGVyTWVudUxpc3RlbmVycyB9IGZyb20gJy4uL2NvbW1vbi9tZW51J1xuaW1wb3J0IHsgYWRkU2V0dGluZ3NIYW5kbGVycywgZ2V0TGlua0hlbHBlcnMgfSBmcm9tICcuLi9jb21tb24vc2V0dGluZ3MnXG5pbXBvcnQgeyBBUEkgfSBmcm9tICcuLi9jb21tb24vYXBpJ1xuaW1wb3J0IHsgQVBJX0FERFJFU1MgfSBmcm9tICcuLi9leHRlbnNpb24vY29uc3RhbnRzJ1xuaW1wb3J0IHsgaW5pdEludHJvIH0gZnJvbSAnLi4vZXh0ZW5zaW9uL2ludHJvJ1xuaW1wb3J0IHsgcmVuZGVySG9zdExpc3QgfSBmcm9tICcuLi9jb21tb24vaG9zdHMnXG5cbmNvbnN0IGFwaSA9IEFQSShBUElfQUREUkVTUylcblxuY29uc3QgTGlua3MgPSBnZXRMaW5rSGVscGVycyhkYiwgYXBpKVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFVybHMgKCkge1xuICAgIGF3YWl0IExpbmtzLmZldGNoTGlua1VwZGF0ZSgpXG4gICAgY29uc3QgbWF4T2xkID0gYXdhaXQgZGIudXJscy5nZXRNYXhPbGQoKVxuICAgIGNvbnN0IGhpZGUgPSBhd2FpdCBkYi51cmxzLmdldEhpZGUoKVxuICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCBkYi5zb3VyY2VzLnJlYWQoKVxuICAgIGF3YWl0IGFwaS5VcmxzLnJlYWQoc291cmNlcy5tYXAoKHNvdXJjZSkgPT4gc291cmNlLmlkKSwgbWF4T2xkLCBoaWRlKVxuICAgICAgICAudGhlbihkYi51cmxzLmltcG9ydClcbn1cblxuZGIudXJscy5zZXRNYXhPbGQoMTAwKVxuXG5jb25zdCBVcmxzID0gdXJsUmVuZGVyZXIoZGIpXG5jb25zdCBTb3VyY2VzID0gc291cmNlUmVuZGVyZXIoZGIpXG5cbmRiLm9uQ2hhbmdlKChjaGFuZ2VzKSA9PiB7XG4gICAgaWYgKFsnaGlkZScsICdoaWRkZW5DaGFwdGVycycsICd1cmxzJ10uc29tZShjaGFuZ2VzLmhhc093blByb3BlcnR5LmJpbmQoY2hhbmdlcykpKSB7XG4gICAgICAgIFVybHMucmVuZGVyKClcbiAgICB9XG4gICAgaWYgKE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUoKGNoYW5nZSkgPT4gY2hhbmdlLmluY2x1ZGVzKCdzb3VyY2VzJykpIHx8IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjaGFuZ2VzLCAnbWF4T2xkJykpIHtcbiAgICAgICAgU291cmNlcy5yZW5kZXIoKVxuICAgIH1cbn0pXG5cbmZldGNoVXJscygpXG5tYXJrUmVmcmVzaGVkKClcblxuY29uc3QgaW50ZXJ2YWwgPSBjcmVhdGVTY2hlZHVsZSh7XG4gICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgZmV0Y2hVcmxzKClcbiAgICAgICAgbWFya1JlZnJlc2hlZCgpXG4gICAgfSxcbiAgICBpbnRlcnZhbDogNjAgKiAxMDAwLFxuICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgIHVwZGF0ZXI6IHVwZGF0ZVByb2dyZXNzXG59KVxuXG5pbml0SW50cm8oKVxucmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIoKCkgPT4gaW50ZXJ2YWwudHJpZ2dlckluc3RhbnRseSgpKVxuYWRkSW1wb3J0SGFuZGxlcnMoZGIpXG5hZGRTZXR0aW5nc0hhbmRsZXJzKGRiLCBhcGkpXG5yZWdpc3Rlck1lbnVMaXN0ZW5lcnMoZGIsIGFwaSlcbnJlbmRlckhvc3RMaXN0KGRiLCBhcGkpXG5cblVybHMucmVuZGVyKClcblNvdXJjZXMucmVuZGVyKClcbiAgICAudGhlbih0ZXN0Qm9va21hcmspXG4iXSwic291cmNlUm9vdCI6IiJ9