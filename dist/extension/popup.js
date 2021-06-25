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

  function setEnabled(_x7) {
    return _setEnabled.apply(this, arguments);
  }

  function _setEnabled() {
    _setEnabled = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(linkEnabled) {
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return write(NAMESPACES.SYNC, {
                linkEnabled: linkEnabled
              });

            case 2:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));
    return _setEnabled.apply(this, arguments);
  }

  function getEnabled() {
    return _getEnabled.apply(this, arguments);
  }

  function _getEnabled() {
    _getEnabled = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      var _yield$read8, linkEnabled;

      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return read(NAMESPACES.SYNC, ['linkEnabled']);

            case 2:
              _yield$read8 = _context14.sent;
              linkEnabled = _yield$read8.linkEnabled;
              return _context14.abrupt("return", linkEnabled);

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));
    return _getEnabled.apply(this, arguments);
  }

  function getHide() {
    return _getHide.apply(this, arguments);
  }

  function _getHide() {
    _getHide = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
      var _yield$read9, hide;

      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return read(NAMESPACES.SYNC, {
                hide: 0
              });

            case 2:
              _yield$read9 = _context15.sent;
              hide = _yield$read9.hide;
              return _context15.abrupt("return", hide);

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));
    return _getHide.apply(this, arguments);
  }

  function writeLocalSettings(_x8) {
    return _writeLocalSettings.apply(this, arguments);
  }

  function _writeLocalSettings() {
    _writeLocalSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(settings) {
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", write(NAMESPACES.LOCAL, {
                localSettings: JSON.stringify(settings)
              }));

            case 1:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));
    return _writeLocalSettings.apply(this, arguments);
  }

  function getLocalSettings() {
    return _getLocalSettings.apply(this, arguments);
  }

  function _getLocalSettings() {
    _getLocalSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
      var _yield$read10, localSettings;

      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return read(NAMESPACES.LOCAL, {
                localSettings: '{}'
              });

            case 2:
              _yield$read10 = _context17.sent;
              localSettings = _yield$read10.localSettings;
              return _context17.abrupt("return", (0,_utils__WEBPACK_IMPORTED_MODULE_0__.parse)(localSettings, {}));

            case 5:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    }));
    return _getLocalSettings.apply(this, arguments);
  }

  function getLinkData() {
    return _getLinkData.apply(this, arguments);
  }

  function _getLinkData() {
    _getLinkData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
      var sources, _yield$read11, hiddenChaptersString, hide, hiddenChapters;

      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return readSources();

            case 2:
              sources = _context18.sent;
              _context18.next = 5;
              return read(NAMESPACES.SYNC, {
                hiddenChapters: '{}',
                hide: 0
              });

            case 5:
              _yield$read11 = _context18.sent;
              hiddenChaptersString = _yield$read11.hiddenChapters;
              hide = _yield$read11.hide;
              hiddenChapters = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.parse)(hiddenChaptersString, {});
              return _context18.abrupt("return", {
                sources: sources.map(function (source) {
                  return source.id;
                }),
                hiddenChapters: hiddenChapters,
                hide: Number(hide)
              });

            case 10:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));
    return _getLinkData.apply(this, arguments);
  }

  function setLinkData(_x9) {
    return _setLinkData.apply(this, arguments);
  }

  function _setLinkData() {
    _setLinkData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(_ref) {
      var sources, hiddenChapters, hide;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              sources = _ref.sources, hiddenChapters = _ref.hiddenChapters, hide = _ref.hide;
              _context19.next = 3;
              return Promise.all([writeSources(sources), write(NAMESPACES.SYNC, {
                hiddenChapters: JSON.stringify(hiddenChapters),
                hide: hide
              })]);

            case 3:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
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
      setLocal: setLinkData,
      getEnabled: getEnabled,
      setEnabled: setEnabled
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
function registerMenuListeners() {
  var importSection = document.querySelector('div.import');
  var popupTitle = document.getElementById('popupTitle');
  var bookmarks = document.getElementById('add');
  var urls = document.getElementById('urls');
  var chapters = document.getElementById('chapters');
  var addSection = document.getElementById('addSection');
  var sources = document.getElementById('sources');
  var settings = document.getElementById('settings');
  var settingsSection = document.querySelector('.settings');

  var openChapters = function openChapters() {
    sources.style.display = 'none';
    importSection.style.display = 'none';
    addSection.style.display = 'none';
    settingsSection.style.display = 'none';
    urls.style.display = '';
    chapters.style.display = 'none';
    settings.style.display = '';
    bookmarks.style.display = '';
    popupTitle.innerText = 'Chapters';
  };

  chapters.addEventListener('click', openChapters);
  bookmarks.addEventListener('click', function () {
    sources.style.display = 'block';
    importSection.style.display = 'flex';
    addSection.style.display = 'flex';
    settingsSection.style.display = 'none';
    urls.style.display = 'none';
    popupTitle.innerText = 'Bookmarks';
    bookmarks.style.display = 'none';
    chapters.style.display = '';
    settings.style.display = '';
  });
  settings.addEventListener('click', function () {
    sources.style.display = 'none';
    importSection.style.display = 'none';
    addSection.style.display = 'none';
    settingsSection.style.display = '';
    urls.style.display = 'none';
    popupTitle.innerText = 'Settings';
    bookmarks.style.display = '';
    chapters.style.display = '';
    settings.style.display = 'none';
  });
  openChapters();
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
/* harmony export */   "updateProgress": () => (/* binding */ updateProgress)
/* harmony export */ });
var progress = document.querySelector('#scheduler > .scheduler-bar');
var refresh = document.querySelector('#refresh');
var resisterProgressHandler = function resisterProgressHandler(updateNow) {
  refresh.addEventListener('click', updateNow);
};
var updateProgress = function updateProgress(lastPing, nextPing) {
  var diff = nextPing - lastPing;
  var remaining = Date.now() - lastPing;
  var percentage = Math.round(remaining / diff * 1000) / 10;
  progress.style.width = "".concat(percentage, "%");
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
/* harmony export */   "addSettingsHandlers": () => (/* binding */ addSettingsHandlers)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var linkFields = ['hide', 'hiddenChapters', 'sources'];
function getLinkHelpers(db, Api) {
  function pushLinkUpdate(_x) {
    return _pushLinkUpdate.apply(this, arguments);
  }

  function _pushLinkUpdate() {
    _pushLinkUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(changes) {
      var changeset, _link$sources, link, local, _changes;

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
                _context.next = 13;
                break;
              }

              _context.next = 4;
              return db.link.read();

            case 4:
              link = _context.sent;
              _context.next = 7;
              return db.link.local();

            case 7:
              local = _context.sent;
              _changes = {};

              if (changeset.includes('hide') && String(link.hide) !== String(local.hide)) {
                _changes.hide = local.hide;
              }

              if (changeset.includes('hiddenChapters') && JSON.stringify(link.hiddenChapters) !== JSON.stringify(local.hiddenChapters)) {
                _changes.hiddenChapters = local.hiddenChapters;
              }

              if (changeset.includes('sources') && (((_link$sources = link.sources) === null || _link$sources === void 0 ? void 0 : _link$sources.length) !== local.sources.length || link.sources.some(function (source) {
                return source && !local.sources.includes(source.id);
              }))) {
                _changes.sources = local.sources;
              }

              if (Object.keys(_changes).length) {
                Api.Link.update(link.key, _changes).then(function (res) {
                  return res.valid && db.link.set(res.payload);
                });
              }

            case 13:
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
                    db.link.set(res.payload);
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
function addSettingsHandlers(_x2, _x3) {
  return _addSettingsHandlers.apply(this, arguments);
}

function _addSettingsHandlers() {
  _addSettingsHandlers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(db, api) {
    var Link, createLink, linkNumberText, linkingSection, unlinkSection, unlinkButton, linkButton, linkInput1, linkInput2, linkInput3, writeStateToDom, link, enabled;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            writeStateToDom = function _writeStateToDom(link, enabled) {
              linkingSection.style.display = link ? 'none' : '';
              unlinkSection.style.display = link ? '' : 'none'; // linkingToggle.disabled = !link
              // linkingToggle.checked = enabled

              linkNumberText.innerText = link ? "".concat(link.key.slice(0, 5), "-").concat(link.key.slice(5, 10), "-").concat(link.key.slice(10)) : 'Unlinked';
              linkNumberText.style.color = link ? '#000c21' : '#c3cbd2';
            };

            Link = api.Link;
            createLink = document.getElementById('new-link-button');
            linkNumberText = document.getElementById('link-id');
            linkingSection = document.getElementById('link-section');
            unlinkSection = document.getElementById('unlink-section');
            unlinkButton = document.getElementById('unlink-button');
            linkButton = document.getElementById('link-button'); // const linkingToggle = document.getElementById('link-toggle')

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
              } else if (number.length > 5) {
                linkInput2.focus();
                linkInput2.setSelectionRange(number.length - 5, number.length - 5);
              }
            });
            linkInput2.addEventListener('keyup', function () {
              var number = linkInput2.value.replaceAll(/[^\d]*/g, '').slice(0, 10);
              linkInput2.value = number.slice(0, 5);

              if (number.length > 5) {
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
            _context6.next = 16;
            return db.link.read();

          case 16:
            link = _context6.sent;
            _context6.next = 19;
            return db.link.getEnabled();

          case 19:
            enabled = _context6.sent;
            writeStateToDom(link, enabled);
            createLink.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var link, linkData, newLinkResult, _link;

              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return db.link.read();

                    case 2:
                      link = _context3.sent;

                      if (link) {
                        _context3.next = 17;
                        break;
                      }

                      _context3.next = 6;
                      return db.link.local();

                    case 6:
                      linkData = _context3.sent;
                      _context3.next = 9;
                      return Link.insert(linkData);

                    case 9:
                      newLinkResult = _context3.sent;

                      if (!(newLinkResult !== null && newLinkResult !== void 0 && newLinkResult.valid)) {
                        _context3.next = 17;
                        break;
                      }

                      _link = newLinkResult.payload;
                      _context3.next = 14;
                      return db.link.set(_link);

                    case 14:
                      _context3.next = 16;
                      return db.link.setEnabled(true);

                    case 16:
                      writeStateToDom(_link, true);

                    case 17:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            })));
            unlinkButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var link;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return db.link.read();

                    case 2:
                      link = _context4.sent;

                      if (!link) {
                        _context4.next = 9;
                        break;
                      }

                      _context4.next = 6;
                      return db.link.set(null);

                    case 6:
                      _context4.next = 8;
                      return db.link.setEnabled(false);

                    case 8:
                      writeStateToDom(undefined, true);

                    case 9:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            })));
            linkButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              var link, key, linkResult, _link2;

              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return db.link.read();

                    case 2:
                      link = _context5.sent;

                      if (link) {
                        _context5.next = 20;
                        break;
                      }

                      key = "".concat(linkInput1.value).concat(linkInput2.value).concat(linkInput3.value);
                      _context5.next = 7;
                      return Link.read(key);

                    case 7:
                      linkResult = _context5.sent;

                      if (!(linkResult !== null && linkResult !== void 0 && linkResult.valid)) {
                        _context5.next = 20;
                        break;
                      }

                      _link2 = linkResult.payload;
                      _context5.next = 12;
                      return db.link.set(_link2);

                    case 12:
                      _context5.next = 14;
                      return db.link.setEnabled(true);

                    case 14:
                      _context5.next = 16;
                      return db.link.setLocal(_link2);

                    case 16:
                      writeStateToDom(_link2, true);
                      linkInput1.value = '';
                      linkInput2.value = '';
                      linkInput3.value = '';

                    case 20:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            }))); // linkingToggle.addEventListener('change', async (e) => {
            //     db.link.setEnabled(e.target.checked)
            // })

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
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

                var url = String(source.url).replace('/wp-admin/admin-ajax.php', '').replace(/https?:\/\//, '');
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

  function hide(_x) {
    return _hide.apply(this, arguments);
  }

  function _hide() {
    _hide = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
      var _yield$db$urls$read, newUrls;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return db.urls.read();

            case 2:
              _yield$db$urls$read = _context3.sent;
              newUrls = _yield$db$urls$read.newUrls;

              if (newUrls.length <= 1 && (!newUrls[0] || newUrls[0].id === id)) {
                db.urls.hideAll(Date.now());
              } else {
                db.urls.hide(id);
              }

            case 5:
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
      var result = String(chapter.url).match(/^https?:\/\/.*\/([^/]*hapter[^/\d]*|)(\d*)[^\d/]*[^/]*\/$/) || [];
      var timeString = "".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getHours()), ":").concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getMinutes()));
      var dateString = "".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getDate()), ".").concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getMonth() + 1), ".").concat(String(date.getFullYear()).slice(-2));
      var fullDate = date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0] ? timeString : dateString;
      return "\n                <li class=\"row".concat(isOld ? ' old' : ' new', "\">\n                    <a class=\"link\" href=\"").concat(chapter.url, "\" target=\"_blank\" rel=\"noopener\" data-id=\"").concat(chapter.id, "\">\n                        ").concat(chapter.title, " - Chapter ").concat(result[2], "\n                    </a>\n                    <span class=\"date-wrapper\">\n                        <span class=\"date\" title=\"", "".concat(dateString, " ").concat(timeString), "\">").concat(fullDate, "</span>\n                        <span class=\"hide\" data-id=\"").concat(chapter.id, "\">Hide</span>\n                    </span>\n                </li>");
    };
  }

  function renderUrls() {
    return _renderUrls.apply(this, arguments);
  }

  function _renderUrls() {
    _renderUrls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var maxOld, _yield$db$urls$read2, newUrls, oldUrls, newRows, oldRows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return db.urls.getMaxOld();

            case 2:
              maxOld = _context4.sent;
              _context4.next = 5;
              return db.urls.read();

            case 5:
              _yield$db$urls$read2 = _context4.sent;
              newUrls = _yield$db$urls$read2.newUrls;
              oldUrls = _yield$db$urls$read2.oldUrls;
              newRows = newUrls.map(createUrlRenderer(false));
              oldRows = oldUrls.map(createUrlRenderer(true));

              if (newRows.length || oldRows.length) {
                urls.innerHTML = [].concat(newRows.length ? '<li class="new-chapters">New Chapters <span class="action hide-all">Hide all</span></li>' : []).concat(newRows).concat('<li class="old-chapters">Old Chapters <span class="action top">Top &#8593;</span></li>').concat(oldRows.slice(0, maxOld)).concat(oldRows.length >= maxOld ? ['<li class="action load-more">Load up to 100 more old chapters...</li>'] : []).join('\n');
                document.title = newRows.length ? "(".concat(newRows.length, ") Manga Poll") : 'Manga Poll';
                checkTopButton();
              } else {
                urls.innerHTML = '<li class="row">No Chapters available.</li>';
                document.title = 'Manga Poll';
              }

            case 11:
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
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/extension/storage.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var currentSource = null;
var bookmark = document.getElementById('bookmark');
var bookmarkTrack = document.getElementById('bookmark-track');
var bookmarkTitle = document.getElementById('bookmark-title');

var _API = (0,_common_api__WEBPACK_IMPORTED_MODULE_0__.API)('https://manga.fochlac.com'),
    Source = _API.Source;

bookmarkTrack.addEventListener('click', function () {
  bookmark.style.display = 'none';
  bookmarkTitle.innerText = '';
  Source.insert(currentSource).then(function (source) {
    return source && _storage__WEBPACK_IMPORTED_MODULE_1__.db.sources.add(source);
  });
  currentSource = null;
});
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
  var _window, _window$manga, _document$querySelect, _document$querySelect2, _document$querySelect3, _document$querySelect4, _document$querySelect5, _document$getElementB, _document$getElementB2, _document$getElementB3, _document$getElementB4, _document$getElementB5, _document$getElementB6, _document$getElementB7, _document$getElementB8, _document$querySelect6, _document$querySelect7, _document, _document$location;

  function parse(string, fallback) {
    try {
      return JSON.parse(string);
    } catch (e) {
      return fallback;
    }
  }

  var ids = [(_window = window) === null || _window === void 0 ? void 0 : (_window$manga = _window.manga) === null || _window$manga === void 0 ? void 0 : _window$manga.manga_id, (_document$querySelect = document.querySelector('.rating-post-id')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value, (_document$querySelect2 = document.querySelector('.wp-manga-action-button')) === null || _document$querySelect2 === void 0 ? void 0 : (_document$querySelect3 = _document$querySelect2.dataset) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3['post'], (_document$querySelect4 = document.querySelector('.chapter-selection')) === null || _document$querySelect4 === void 0 ? void 0 : (_document$querySelect5 = _document$querySelect4.dataset) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5['manga'], (_document$getElementB = document.getElementById('manga-chapters-holder')) === null || _document$getElementB === void 0 ? void 0 : (_document$getElementB2 = _document$getElementB.dataset) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2['id'], (_document$getElementB3 = document.getElementById('manga-reading-nav-head')) === null || _document$getElementB3 === void 0 ? void 0 : (_document$getElementB4 = _document$getElementB3.dataset) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4['id'], (_document$getElementB5 = document.getElementById('manga-reading-nav-foot')) === null || _document$getElementB5 === void 0 ? void 0 : (_document$getElementB6 = _document$getElementB5.dataset) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6['id']].filter(function (title) {
    return title;
  }).reduce(function (map, id) {
    map[id] = typeof map[id] === 'number' ? map[id] + 1 : 1;
    return map;
  }, {});
  var id = Object.keys(ids).sort(function (id1, id2) {
    return ids[id1] - ids[id2];
  })[0];
  var titles = [Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(function (script) {
    var _parse;

    return (_parse = parse(script.innerText)) === null || _parse === void 0 ? void 0 : _parse.headline;
  }).find(function (h) {
    return h;
  }), (_document$getElementB7 = document.getElementById('chapter-heading')) === null || _document$getElementB7 === void 0 ? void 0 : (_document$getElementB8 = _document$getElementB7.innerText) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8.split(' - ')[0], (_document$querySelect6 = document.querySelector('.post-title h1')) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.innerText, (_document$querySelect7 = document.querySelector('.rate-title')) === null || _document$querySelect7 === void 0 ? void 0 : _document$querySelect7.title].filter(function (title) {
    return title;
  }).reduce(function (map, title) {
    map[title] = typeof map[title] === 'number' ? map[title] + 1 : 1;
    return map;
  }, {});
  var title = Object.keys(titles).sort(function (title1, title2) {
    return titles[title1] - titles[title2];
  })[0];
  chrome.runtime.sendMessage({
    id: id,
    title: title,
    url: (_document = document) !== null && _document !== void 0 && (_document$location = _document.location) !== null && _document$location !== void 0 && _document$location.origin ? "".concat(document.location.origin, "/wp-admin/admin-ajax.php") : null
  });
}

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
            return _storage__WEBPACK_IMPORTED_MODULE_1__.db.sources.read();

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











var api = (0,_common_api__WEBPACK_IMPORTED_MODULE_10__.API)('https://manga.fochlac.com');
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
(0,_common_schedule__WEBPACK_IMPORTED_MODULE_7__.createSchedule)({
  callback: function callback() {
    return navigator.serviceWorker.controller.postMessage('FETCH_CHAPTERS');
  },
  interval: 30 * 1000,
  isActive: true,
  updater: _common_progress_bar__WEBPACK_IMPORTED_MODULE_6__.updateProgress
});
(0,_common_import__WEBPACK_IMPORTED_MODULE_2__.addImportHandlers)(_storage__WEBPACK_IMPORTED_MODULE_3__.db);
(0,_common_settings__WEBPACK_IMPORTED_MODULE_9__.addSettingsHandlers)(_storage__WEBPACK_IMPORTED_MODULE_3__.db, api);
(0,_common_menu__WEBPACK_IMPORTED_MODULE_8__.registerMenuListeners)(_storage__WEBPACK_IMPORTED_MODULE_3__.db);
Urls.render();
Sources.render().then(_bookmark__WEBPACK_IMPORTED_MODULE_1__.testBookmark);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2RiLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vaW1wb3J0LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vbWVudS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3Byb2dyZXNzLWJhci5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3NjaGVkdWxlLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9zb3VyY2VzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vdXJscy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3V0aWxzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9leHRlbnNpb24vYm9va21hcmsuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9zdG9yYWdlLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vbm9kZV9tb2R1bGVzL3NhdmUtYXMvbGliL2luZGV4LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL3BvcHVwLmpzIl0sIm5hbWVzIjpbIkFQSSIsImJhc2VVcmwiLCJwb3N0U291cmNlIiwic291cmNlIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJBY2NlcHQiLCJ0aGVuIiwicmVzIiwianNvbiIsImNhdGNoIiwiZXJyb3IiLCJ2YWxpZCIsImRhdGEiLCJwYXlsb2FkIiwiYWRkU291cmNlRnJvbVVybCIsInVybCIsInJlYWRVcmxzIiwic291cmNlcyIsImxpbWl0IiwiZGF0ZSIsImFkZFN1YnNjcmlwdGlvbnMiLCJ0b3BpY3MiLCJrZXkiLCJkZWxldGVTdWJzY3JpcHRpb25zIiwicmVhZExpbmsiLCJjaGFuZ2VkU2luY2UiLCJzdGF0dXMiLCJ1cGRhdGVMaW5rIiwidXBkYXRlU2V0IiwiY3JlYXRlTGluayIsImluaXRTZXQiLCJVcmxzIiwicmVhZCIsIlNvdXJjZSIsImluc2VydCIsImZyb21VcmwiLCJTdWJzY3JpcHRpb24iLCJzdWJzY3JpYmUiLCJ1bnN1YnNjcmliZSIsIkxpbmsiLCJ1cGRhdGUiLCJOQU1FU1BBQ0VTIiwiU1lOQyIsIkxPQ0FMIiwiY3JlYXRlREIiLCJzdG9yYWdlIiwid3JpdGUiLCJyZWFkU291cmNlcyIsInJlZ2lzdHJ5IiwicGFyc2UiLCJyZWR1Y2UiLCJQcm9taXNlIiwiYWxsIiwiY29uY2F0IiwicmVzb2x2ZSIsIndyaXRlU291cmNlcyIsInVwZGF0ZXMiLCJ4IiwiTWF0aCIsIm1heCIsImNlaWwiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJhZGRTb3VyY2UiLCJzb21lIiwibWFuZ2FJZCIsImRlbGV0ZVNvdXJjZSIsInNvdXJjZUlkIiwibmV3U291cmNlcyIsImZpbHRlciIsImlkIiwiaXNEaXJ0eSIsInVybHMiLCJnZXRGaWx0ZXJlZFNvcnRlZFVybHMiLCJoaWRkZW5DaGFwdGVycyIsImhpZGUiLCJoaWRkZW5DaGFwdGVyc1N0cmluZyIsInVybExpc3QiLCJjaGVja09sZCIsImNoYXB0ZXIiLCJjcmVhdGVkIiwiT2JqZWN0IiwidmFsdWVzIiwic29ydCIsInVybDEiLCJ1cmwyIiwiZGlmZiIsImFicyIsIlN0cmluZyIsImxvY2FsZUNvbXBhcmUiLCJvbGRVcmxzIiwibmV3VXJscyIsImhpZGVVcmwiLCJyZXN1bHQiLCJoaWRlQWxsVXJscyIsInRpbWVzdGFtcCIsIndyaXRlVXJscyIsImluaXQiLCJ0b2RheSIsIkRhdGUiLCJzZXRIb3VycyIsImdldFRpbWUiLCJzZXRNYXhPbGQiLCJtYXhPbGQiLCJnZXRNYXhPbGQiLCJzZXRMaW5rIiwibGluayIsImdldExpbmsiLCJzZXRFbmFibGVkIiwibGlua0VuYWJsZWQiLCJnZXRFbmFibGVkIiwiZ2V0SGlkZSIsIndyaXRlTG9jYWxTZXR0aW5ncyIsInNldHRpbmdzIiwibG9jYWxTZXR0aW5ncyIsImdldExvY2FsU2V0dGluZ3MiLCJnZXRMaW5rRGF0YSIsIm1hcCIsIk51bWJlciIsInNldExpbmtEYXRhIiwiaW1wb3J0IiwiYWRkIiwiZGVsZXRlIiwibG9jYWwiLCJzZXQiLCJoaWRlQWxsIiwib25DaGFuZ2UiLCJhZGRMaXN0ZW5lciIsInNldExvY2FsIiwiYWRkSW1wb3J0SGFuZGxlcnMiLCJkYiIsImltcG9ydEVsZW0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZXhwb3J0RWxlbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiZmlsZSIsInRhcmdldCIsImZpbGVzIiwiZnIiLCJGaWxlUmVhZGVyIiwiY2xlYW4iLCJ0aXRsZSIsInJlYWRBc1RleHQiLCJibG9iIiwiQmxvYiIsInR5cGUiLCJzYXZlQXMiLCJyZWdpc3Rlck1lbnVMaXN0ZW5lcnMiLCJpbXBvcnRTZWN0aW9uIiwicXVlcnlTZWxlY3RvciIsInBvcHVwVGl0bGUiLCJib29rbWFya3MiLCJjaGFwdGVycyIsImFkZFNlY3Rpb24iLCJzZXR0aW5nc1NlY3Rpb24iLCJvcGVuQ2hhcHRlcnMiLCJzdHlsZSIsImRpc3BsYXkiLCJpbm5lclRleHQiLCJwcm9ncmVzcyIsInJlZnJlc2giLCJyZXNpc3RlclByb2dyZXNzSGFuZGxlciIsInVwZGF0ZU5vdyIsInVwZGF0ZVByb2dyZXNzIiwibGFzdFBpbmciLCJuZXh0UGluZyIsInJlbWFpbmluZyIsIm5vdyIsInBlcmNlbnRhZ2UiLCJyb3VuZCIsIndpZHRoIiwiY3JlYXRlU2NoZWR1bGUiLCJpc0FjdGl2ZSIsImludGVydmFsIiwiY2FsbGJhY2siLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsInVwZGF0ZXIiLCJjYWxsQ2FsbGJhY2siLCJ0aW1lciIsInNldEludGVydmFsIiwibmV3SW50ZXJ2YWwiLCJFcnJvciIsInNldENhbGxiYWNrIiwiY2IiLCJzdGFydCIsInRyaWdnZXJJbnN0YW50bHkiLCJzdG9wIiwiY2xlYXJJbnRlcnZhbCIsImxpbmtGaWVsZHMiLCJnZXRMaW5rSGVscGVycyIsIkFwaSIsInB1c2hMaW5rVXBkYXRlIiwiY2hhbmdlcyIsImNoYW5nZXNldCIsImtleXMiLCJjaGFuZ2UiLCJpbmNsdWRlcyIsImZldGNoTGlua1VwZGF0ZSIsImxhc3RNb2RpZmllZCIsImFkZFNldHRpbmdzSGFuZGxlcnMiLCJhcGkiLCJ3cml0ZVN0YXRlVG9Eb20iLCJlbmFibGVkIiwibGlua2luZ1NlY3Rpb24iLCJ1bmxpbmtTZWN0aW9uIiwibGlua051bWJlclRleHQiLCJjb2xvciIsInVubGlua0J1dHRvbiIsImxpbmtCdXR0b24iLCJsaW5rSW5wdXQxIiwibGlua0lucHV0MiIsImxpbmtJbnB1dDMiLCJudW1iZXIiLCJ2YWx1ZSIsInJlcGxhY2VBbGwiLCJmb2N1cyIsInNldFNlbGVjdGlvblJhbmdlIiwibGlua0RhdGEiLCJuZXdMaW5rUmVzdWx0IiwidW5kZWZpbmVkIiwibGlua1Jlc3VsdCIsInNvdXJjZVJlbmRlcmVyIiwiZXZlbnQiLCJjbG9zZXN0IiwiZGF0YXNldCIsImNvbnRhaW5zIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicmVuZGVyU291cmNlcyIsImlubmVySFRNTCIsInNvdXJjZTEiLCJzb3VyY2UyIiwicmVwbGFjZSIsImpvaW4iLCJyZW5kZXIiLCJ1cmxSZW5kZXJlciIsImNsb3Nlc3RIaWRlIiwiY2xvc2VzdExpbmsiLCJwcmV2ZW50RGVmYXVsdCIsIndpbmRvdyIsIm9wZW4iLCJocmVmIiwiY2xvc2VzdE1vcmUiLCJ0b3AiLCJzY3JvbGxUbyIsImJlaGF2aW9yIiwibWF4U2Nyb2xsIiwic2Nyb2xsSGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic2Nyb2xsVG9wIiwiY2hlY2tUb3BCdXR0b24iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjcmVhdGVVcmxSZW5kZXJlciIsImlzT2xkIiwibWF0Y2giLCJ0aW1lU3RyaW5nIiwicGFkIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZGF0ZVN0cmluZyIsImdldERhdGUiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiZnVsbERhdGUiLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwicmVuZGVyVXJscyIsIm5ld1Jvd3MiLCJvbGRSb3dzIiwic3RyaW5nIiwiZmFsbGJhY2siLCJubyIsImN1cnJlbnRTb3VyY2UiLCJib29rbWFyayIsImJvb2ttYXJrVHJhY2siLCJib29rbWFya1RpdGxlIiwidGVzdEJvb2ttYXJrIiwiY2hyb21lIiwidGFicyIsInF1ZXJ5IiwiYWN0aXZlIiwid2luZG93SWQiLCJ3aW5kb3dzIiwiV0lORE9XX0lEX0NVUlJFTlQiLCJzY3JpcHRpbmciLCJleGVjdXRlU2NyaXB0IiwidGFiSWQiLCJmdW5jdGlvbiIsInRlc3QiLCJpZHMiLCJtYW5nYSIsIm1hbmdhX2lkIiwiaWQxIiwiaWQyIiwidGl0bGVzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsInNjcmlwdCIsImhlYWRsaW5lIiwiZmluZCIsImgiLCJ0aXRsZTEiLCJ0aXRsZTIiLCJydW50aW1lIiwic2VuZE1lc3NhZ2UiLCJsb2NhdGlvbiIsIm9yaWdpbiIsIm9uTWVzc2FnZSIsInJlcXVlc3QiLCJuYW1lc3BhY2UiLCJnZXQiLCJrZXlQYWlycyIsIm9uQ2hhbmdlZCIsIkxpbmtzIiwiU291cmNlcyIsImhhc093blByb3BlcnR5IiwiYmluZCIsImNhbGwiLCJuYXZpZ2F0b3IiLCJzZXJ2aWNlV29ya2VyIiwiY29udHJvbGxlciIsInBvc3RNZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPLElBQU1BLEdBQUcsR0FBRyxTQUFOQSxHQUFNLEdBQWtCO0FBQUEsTUFBakJDLE9BQWlCLHVFQUFQLEVBQU87O0FBQ2pDLFdBQVNDLFVBQVQsQ0FBcUJDLE1BQXJCLEVBQTZCO0FBQ3pCLFdBQU9DLEtBQUssV0FBSUgsT0FBSixtQkFBMkI7QUFDbkNJLFlBQU0sRUFBRSxNQUQyQjtBQUVuQ0MsVUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUwsTUFBZixDQUY2QjtBQUduQ00sYUFBTyxFQUFFO0FBQ0xDLGNBQU0sRUFBRSxrQkFESDtBQUVMLHdCQUFnQjtBQUZYO0FBSDBCLEtBQTNCLENBQUwsQ0FRRkMsSUFSRSxDQVFHLFVBQUNDLEdBQUQ7QUFBQSxhQUFTQSxHQUFHLENBQUNDLElBQUosRUFBVDtBQUFBLEtBUkgsRUFTRkMsS0FURSxDQVNJLFVBQUNDLEtBQUQ7QUFBQSxhQUFZO0FBQUVDLGFBQUssRUFBRSxLQUFUO0FBQWdCRCxhQUFLLEVBQUxBO0FBQWhCLE9BQVo7QUFBQSxLQVRKLEVBVUZKLElBVkUsQ0FVRyxVQUFDTSxJQUFEO0FBQUEsYUFBVUEsSUFBSSxDQUFDQyxPQUFmO0FBQUEsS0FWSCxDQUFQO0FBV0g7O0FBRUQsV0FBU0MsZ0JBQVQsQ0FBMkJDLEdBQTNCLEVBQWdDO0FBQzVCLFdBQU9oQixLQUFLLFdBQUlILE9BQUosOEJBQXNDO0FBQzlDSSxZ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UCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LE9BQVosRUFBcUJuSSxJQUFyQixDQUEwQixVQUFDc0ksTUFBRDtBQUFBLFdBQVlBLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQixTQUFoQixDQUFaO0FBQUEsR0FBMUIsS0FBcUV0SCxNQUFNLENBQUNpRyxTQUFQLENBQWlCNkksY0FBakIsQ0FBZ0NFLElBQWhDLENBQXFDOUgsT0FBckMsRUFBOEMsUUFBOUMsQ0FBekUsRUFBa0k7QUFDOUgySCxXQUFPLENBQUNqRixNQUFSO0FBQ0g7O0FBQ0RnRixPQUFLLENBQUMzSCxjQUFOLENBQXFCQyxPQUFyQjtBQUNILENBUkQ7QUFVQStILFNBQVMsQ0FBQ0MsYUFBVixDQUF3QkMsVUFBeEIsQ0FBbUNDLFdBQW5DLENBQStDLGdCQUEvQztBQUVBeEosZ0VBQWMsQ0FBQztBQUNYRyxVQUFRLEVBQUU7QUFBQSxXQUFNa0osU0FBUyxDQUFDQyxhQUFWLENBQXdCQyxVQUF4QixDQUFtQ0MsV0FBbkMsQ0FBK0MsZ0JBQS9DLENBQU47QUFBQSxHQURDO0FBRVh0SixVQUFRLEVBQUUsS0FBSyxJQUZKO0FBR1hELFVBQVEsRUFBRSxJQUhDO0FBSVhLLFNBQU8sRUFBRWQsZ0VBQWNBO0FBSlosQ0FBRCxDQUFkO0FBT0FwQyxpRUFBaUIsQ0FBQ0Msd0NBQUQsQ0FBakI7QUFDQXdFLHFFQUFtQixDQUFDeEUsd0NBQUQsRUFBS3lFLEdBQUwsQ0FBbkI7QUFDQXRELG1FQUFxQixDQUFDbkIsd0NBQUQsQ0FBckI7QUFFQXBHLElBQUksQ0FBQytNLE1BQUw7QUFDQWlGLE9BQU8sQ0FBQ2pGLE1BQVIsR0FDS3hPLElBREwsQ0FDVWtSLG1EQURWLEUiLCJmaWxlIjoiZXh0ZW5zaW9uL3BvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEFQSSA9IChiYXNlVXJsID0gJycpID0+IHtcclxuICAgIGZ1bmN0aW9uIHBvc3RTb3VyY2UgKHNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc291cmNlc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNvdXJjZSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEucGF5bG9hZClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRTb3VyY2VGcm9tVXJsICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3NvdXJjZXMvYWRkRnJvbVVybGAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXJsIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZFVybHMgKHNvdXJjZXMgPSBbXSwgbGltaXQgPSAnJywgZGF0ZSA9ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFxyXG4gICAgICAgICAgICBgJHtiYXNlVXJsfS9hcGkvdXJscy9mZXRjaGAsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5wYXlsb2FkIHx8IFtdKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFN1YnNjcmlwdGlvbnMgKHRvcGljcyA9IFtdLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3N1YnNjcmlwdGlvbnNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB0b3BpY3MsXHJcbiAgICAgICAgICAgICAgICBrZXk6IGtleVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZVN1YnNjcmlwdGlvbnMgKHRvcGljcyA9IFtdLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3N1YnNjcmlwdGlvbnNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHRvcGljcyxcclxuICAgICAgICAgICAgICAgIGtleToga2V5XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZExpbmsgKGtleSwgY2hhbmdlZFNpbmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rcy8ke2tleX0ke2NoYW5nZWRTaW5jZSA/IGA/Y2hhbmdlZFNpbmNlPSR7Y2hhbmdlZFNpbmNlfWAgOiAnJ31gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnN0YXR1cyA9PT0gMzA0ID8gKHsgdmFsaWQ6IHRydWUsIHBheWxvYWQ6IG51bGwgfSkgOiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGtleSwgdXBkYXRlU2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rcy8ke2tleX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3B1dCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZVNldCksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVMaW5rIChpbml0U2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluaXRTZXQpLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBVcmxzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRVcmxzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTb3VyY2U6IHtcclxuICAgICAgICAgICAgaW5zZXJ0OiBwb3N0U291cmNlLFxyXG4gICAgICAgICAgICBmcm9tVXJsOiBhZGRTb3VyY2VGcm9tVXJsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTdWJzY3JpcHRpb246IHtcclxuICAgICAgICAgICAgc3Vic2NyaWJlOiBhZGRTdWJzY3JpcHRpb25zLFxyXG4gICAgICAgICAgICB1bnN1YnNjcmliZTogZGVsZXRlU3Vic2NyaXB0aW9uc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTGluazoge1xyXG4gICAgICAgICAgICBpbnNlcnQ6IGNyZWF0ZUxpbmssXHJcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlTGluayxcclxuICAgICAgICAgICAgcmVhZDogcmVhZExpbmtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcGFyc2UgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuY29uc3QgTkFNRVNQQUNFUyA9IHtcclxuICAgIFNZTkM6ICdzeW5jJyxcclxuICAgIExPQ0FMOiAnbG9jYWwnXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEQiAoc3RvcmFnZSkge1xyXG4gICAgY29uc3QgeyByZWFkLCB3cml0ZSB9ID0gc3RvcmFnZVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlYWRTb3VyY2VzICgpIHtcclxuICAgICAgICBjb25zdCB7IHJlZ2lzdHJ5IH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyByZWdpc3RyeTogJ1tcInNvdXJjZXMtMVwiXScgfSlcclxuICAgICAgICByZXR1cm4gcGFyc2UocmVnaXN0cnksIFsnc291cmNlcy0xJ10pXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHNvdXJjZXMsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtzb3VyY2VzLCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBba2V5XTogJ1tdJyB9KV0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKFtzb3VyY2VzLCBzb3VyY2VdKSA9PiBzb3VyY2VzLmNvbmNhdChwYXJzZShzb3VyY2Vba2V5XSwgW10pKSlcclxuICAgICAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKFtdKSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3cml0ZVNvdXJjZXMgKHNvdXJjZXMpIHtcclxuICAgICAgICBjb25zdCByZWdpc3RyeSA9IFtdXHJcbiAgICAgICAgY29uc3QgdXBkYXRlcyA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHNvdXJjZXMubGVuZ3RoIC8gMjApKTsgeCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGBzb3VyY2VzLSR7eH1gXHJcbiAgICAgICAgICAgIHJlZ2lzdHJ5LnB1c2goa2V5KVxyXG4gICAgICAgICAgICB1cGRhdGVzW2tleV0gPSBKU09OLnN0cmluZ2lmeShzb3VyY2VzLnNsaWNlKCh4IC0gMSkgKiAyMCwgeCAqIDIwKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdXBkYXRlcy5yZWdpc3RyeSA9IEpTT04uc3RyaW5naWZ5KHJlZ2lzdHJ5KVxyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHVwZGF0ZXMpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gYWRkU291cmNlIChzb3VyY2UpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgcmVhZFNvdXJjZXMoKVxyXG4gICAgICAgIGlmICghc291cmNlcy5zb21lKCh7dXJsLCBtYW5nYUlkfSkgPT4gc291cmNlLnVybCA9PT0gdXJsICYmIG1hbmdhSWQgPT09IHNvdXJjZS5tYW5nYUlkKSkge1xyXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goc291cmNlKVxyXG4gICAgICAgICAgICBhd2FpdCB3cml0ZVNvdXJjZXMoc291cmNlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZXNcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBkZWxldGVTb3VyY2UgKHNvdXJjZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IHJlYWRTb3VyY2VzKClcclxuICAgICAgICBjb25zdCBuZXdTb3VyY2VzID0gc291cmNlcy5maWx0ZXIoKHNvdXJjZSkgPT4gc291cmNlPy5pZCAhPT0gc291cmNlSWQpXHJcbiAgICAgICAgYXdhaXQgd3JpdGVTb3VyY2VzKG5ld1NvdXJjZXMpXHJcblxyXG4gICAgICAgIHJldHVybiBuZXdTb3VyY2VzXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaXNEaXJ0eSAoKSB7XHJcbiAgICAgICAgY29uc3QgeyB1cmxzLCBzb3VyY2VzIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIFsndXJscycsICdzb3VyY2VzJ10pXHJcblxyXG4gICAgICAgIHJldHVybiAhIXVybHMgfHwgISFzb3VyY2VzXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0RmlsdGVyZWRTb3J0ZWRVcmxzICgpIHtcclxuICAgICAgICBjb25zdCB7IGhpZGRlbkNoYXB0ZXJzOiBoaWRkZW5DaGFwdGVyc1N0cmluZywgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IDAgfSlcclxuICAgICAgICBjb25zdCB7IHVybHMgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgeyB1cmxzOiAnW10nIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UoaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIHt9KVxyXG4gICAgICAgIGNvbnN0IHVybExpc3QgPSBwYXJzZSh1cmxzLCBbXSlcclxuXHJcbiAgICAgICAgY29uc3QgY2hlY2tPbGQgPSAoY2hhcHRlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGlkZSAmJiBjaGFwdGVyLmNyZWF0ZWQgPCBoaWRlIHx8IGhpZGRlbkNoYXB0ZXJzW2NoYXB0ZXIuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgW29sZFVybHMsIG5ld1VybHNdID0gT2JqZWN0LnZhbHVlcyh1cmxMaXN0KVxyXG4gICAgICAgICAgICAuc29ydCgodXJsMSwgdXJsMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IHVybDIuY3JlYXRlZCAtIHVybDEuY3JlYXRlZFxyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpZmYpIDwgNTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh1cmwxKS5sb2NhbGVDb21wYXJlKHVybDIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlmZlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAucmVkdWNlKChbb2xkVXJscywgbmV3VXJsc10sIHVybCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrT2xkKHVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbGRVcmxzLnB1c2godXJsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VXJscy5wdXNoKHVybClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBbb2xkVXJscywgbmV3VXJsc11cclxuICAgICAgICAgICAgfSwgW1tdLCBbXV0pXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG9sZFVybHMsXHJcbiAgICAgICAgICAgIG5ld1VybHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZVVybCAoaWQpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JyB9KVxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UocmVzdWx0LmhpZGRlbkNoYXB0ZXJzLCB7fSlcclxuICAgICAgICBoaWRkZW5DaGFwdGVyc1tpZF0gPSB0cnVlXHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ2hhcHRlcnMpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZUFsbFVybHMgKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IHRpbWVzdGFtcCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyaXRlVXJscyAodXJscykge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLkxPQ0FMLCB7IHVybHM6IEpTT04uc3RyaW5naWZ5KHVybHMpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaW5pdCAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRlOiBmYWxzZSB9KVxyXG4gICAgICAgIGlmICghaGlkZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKClcclxuICAgICAgICAgICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMClcclxuICAgICAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGU6IHRvZGF5LmdldFRpbWUoKX0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldE1heE9sZCAobWF4T2xkKSB7XHJcbiAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5MT0NBTCwgeyBtYXhPbGQgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRNYXhPbGQgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbWF4T2xkIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIHsgbWF4T2xkOiAyNSB9KVxyXG4gICAgICAgIHJldHVybiBtYXhPbGRcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBzZXRMaW5rIChsaW5rKSB7XHJcbiAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGxpbmsgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRMaW5rICgpIHtcclxuICAgICAgICBjb25zdCB7IGxpbmsgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCBbJ2xpbmsnXSlcclxuICAgICAgICByZXR1cm4gbGlua1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldEVuYWJsZWQgKGxpbmtFbmFibGVkKSB7XHJcbiAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGxpbmtFbmFibGVkIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0RW5hYmxlZCAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBsaW5rRW5hYmxlZCB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIFsnbGlua0VuYWJsZWQnXSlcclxuICAgICAgICByZXR1cm4gbGlua0VuYWJsZWRcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRIaWRlICgpIHtcclxuICAgICAgICBjb25zdCB7IGhpZGUgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGU6IDAgfSlcclxuICAgICAgICByZXR1cm4gaGlkZVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHdyaXRlTG9jYWxTZXR0aW5ncyAoc2V0dGluZ3MpIHtcclxuICAgICAgICByZXR1cm4gd3JpdGUoTkFNRVNQQUNFUy5MT0NBTCwgeyBsb2NhbFNldHRpbmdzOiBKU09OLnN0cmluZ2lmeShzZXR0aW5ncykgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRMb2NhbFNldHRpbmdzICgpIHtcclxuICAgICAgICBjb25zdCB7IGxvY2FsU2V0dGluZ3MgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgeyBsb2NhbFNldHRpbmdzOiAne30nIH0pXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlKGxvY2FsU2V0dGluZ3MsIHt9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldExpbmtEYXRhICgpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgcmVhZFNvdXJjZXMoKVxyXG4gICAgICAgIGNvbnN0IHsgaGlkZGVuQ2hhcHRlcnM6IGhpZGRlbkNoYXB0ZXJzU3RyaW5nLCBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JywgaGlkZTogMCB9KVxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UoaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIHt9KVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzb3VyY2VzOiBzb3VyY2VzLm1hcCgoc291cmNlKSA9PiBzb3VyY2UuaWQpLFxyXG4gICAgICAgICAgICBoaWRkZW5DaGFwdGVycyxcclxuICAgICAgICAgICAgaGlkZTogTnVtYmVyKGhpZGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldExpbmtEYXRhICh7c291cmNlcywgaGlkZGVuQ2hhcHRlcnMsIGhpZGV9KSB7XHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB3cml0ZVNvdXJjZXMoc291cmNlcyksXHJcbiAgICAgICAgICAgIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywge1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuQ2hhcHRlcnM6IEpTT04uc3RyaW5naWZ5KGhpZGRlbkNoYXB0ZXJzKSxcclxuICAgICAgICAgICAgICAgIGhpZGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdKVxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc291cmNlczoge1xyXG4gICAgICAgICAgICByZWFkOiByZWFkU291cmNlcyxcclxuICAgICAgICAgICAgaW1wb3J0OiB3cml0ZVNvdXJjZXMsXHJcbiAgICAgICAgICAgIGFkZDogYWRkU291cmNlLFxyXG4gICAgICAgICAgICBkZWxldGU6IGRlbGV0ZVNvdXJjZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgbG9jYWw6IHtcclxuICAgICAgICAgICAgICAgIHJlYWQ6IGdldExvY2FsU2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBzZXQ6IHdyaXRlTG9jYWxTZXR0aW5nc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0RpcnR5LFxyXG4gICAgICAgIHVybHM6IHtcclxuICAgICAgICAgICAgcmVhZDogZ2V0RmlsdGVyZWRTb3J0ZWRVcmxzLFxyXG4gICAgICAgICAgICBoaWRlOiBoaWRlVXJsLFxyXG4gICAgICAgICAgICBoaWRlQWxsOiBoaWRlQWxsVXJscyxcclxuICAgICAgICAgICAgaW1wb3J0OiB3cml0ZVVybHMsXHJcbiAgICAgICAgICAgIHNldE1heE9sZCxcclxuICAgICAgICAgICAgZ2V0TWF4T2xkLFxyXG4gICAgICAgICAgICBnZXRIaWRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNoYW5nZTogc3RvcmFnZS5hZGRMaXN0ZW5lcixcclxuICAgICAgICBsaW5rOiB7XHJcbiAgICAgICAgICAgIHNldDogc2V0TGluayxcclxuICAgICAgICAgICAgcmVhZDogZ2V0TGluayxcclxuICAgICAgICAgICAgbG9jYWw6IGdldExpbmtEYXRhLFxyXG4gICAgICAgICAgICBzZXRMb2NhbDogc2V0TGlua0RhdGEsXHJcbiAgICAgICAgICAgIGdldEVuYWJsZWQsXHJcbiAgICAgICAgICAgIHNldEVuYWJsZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHNhdmVBcyBmcm9tICdzYXZlLWFzJ1xyXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkSW1wb3J0SGFuZGxlcnMgKGRiKSB7XHJcbiAgICBjb25zdCBpbXBvcnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltcG9ydCcpXHJcbiAgICBjb25zdCBleHBvcnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4cG9ydCcpXHJcblxyXG4gICAgaW1wb3J0RWxlbS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlc1swXVxyXG4gICAgICAgIGNvbnN0IGZyID0gbmV3IEZpbGVSZWFkZXIoKVxyXG4gICAgICAgIGZyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZXMgPSBwYXJzZShmci5yZXN1bHQsIFtdKVxyXG4gICAgICAgICAgICBjb25zdCBjbGVhbiA9IHNvdXJjZXMuZmlsdGVyKChzb3VyY2UpID0+IHNvdXJjZT8udGl0bGUgJiYgc291cmNlLnVybCAmJiBzb3VyY2UubWFuZ2FJZClcclxuICAgICAgICAgICAgaWYgKGNsZWFuLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZGIuc291cmNlcy5pbXBvcnQoY2xlYW4pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW1wb3J0RWxlbS5maWxlcyA9IG51bGxcclxuICAgICAgICB9KVxyXG4gICAgICAgIGZyLnJlYWRBc1RleHQoZmlsZSlcclxuICAgIH0pXHJcblxyXG4gICAgZXhwb3J0RWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkYi5zb3VyY2VzLnJlYWQoKVxyXG4gICAgICAgICAgICAudGhlbigoc291cmNlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShzb3VyY2VzKV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pXHJcbiAgICAgICAgICAgICAgICBzYXZlQXMoYmxvYiwgJ21hbmdhcG9sbC5qc29uJylcclxuICAgICAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbiIsImV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1lbnVMaXN0ZW5lcnMgKCkge1xyXG4gICAgY29uc3QgaW1wb3J0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5pbXBvcnQnKVxyXG4gICAgY29uc3QgcG9wdXBUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cFRpdGxlJylcclxuICAgIGNvbnN0IGJvb2ttYXJrcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQnKVxyXG4gICAgY29uc3QgdXJscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmxzJylcclxuICAgIGNvbnN0IGNoYXB0ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXB0ZXJzJylcclxuICAgIGNvbnN0IGFkZFNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkU2VjdGlvbicpXHJcbiAgICBjb25zdCBzb3VyY2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZXMnKVxyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0dGluZ3MnKVxyXG4gICAgY29uc3Qgc2V0dGluZ3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzJylcclxuXHJcbiAgICBjb25zdCBvcGVuQ2hhcHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgICAgc291cmNlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB1cmxzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIGNoYXB0ZXJzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBib29rbWFya3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgcG9wdXBUaXRsZS5pbm5lclRleHQgPSAnQ2hhcHRlcnMnXHJcbiAgICB9XHJcblxyXG4gICAgY2hhcHRlcnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuQ2hhcHRlcnMpXHJcblxyXG4gICAgYm9va21hcmtzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHNvdXJjZXMuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgICAgICBpbXBvcnRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICBhZGRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHVybHMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHBvcHVwVGl0bGUuaW5uZXJUZXh0ID0gJ0Jvb2ttYXJrcydcclxuICAgICAgICBib29rbWFya3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGNoYXB0ZXJzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgfSlcclxuXHJcbiAgICBzZXR0aW5ncy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBzb3VyY2VzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBpbXBvcnRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBhZGRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgdXJscy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcG9wdXBUaXRsZS5pbm5lclRleHQgPSAnU2V0dGluZ3MnXHJcbiAgICAgICAgYm9va21hcmtzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIGNoYXB0ZXJzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIH0pXHJcblxyXG4gICAgb3BlbkNoYXB0ZXJzKClcclxufVxyXG4iLCJjb25zdCBwcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY2hlZHVsZXIgPiAuc2NoZWR1bGVyLWJhcicpXHJcbmNvbnN0IHJlZnJlc2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVmcmVzaCcpXHJcblxyXG5leHBvcnQgY29uc3QgcmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIgPSAodXBkYXRlTm93KSA9PiB7XHJcbiAgICByZWZyZXNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdXBkYXRlTm93KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlUHJvZ3Jlc3MgPSAobGFzdFBpbmcsIG5leHRQaW5nKSA9PiB7XHJcbiAgICBjb25zdCBkaWZmID0gbmV4dFBpbmcgLSBsYXN0UGluZ1xyXG4gICAgY29uc3QgcmVtYWluaW5nID0gRGF0ZS5ub3coKSAtIGxhc3RQaW5nXHJcblxyXG4gICAgY29uc3QgcGVyY2VudGFnZSA9IE1hdGgucm91bmQocmVtYWluaW5nIC8gZGlmZiAqIDEwMDApIC8gMTBcclxuXHJcbiAgICBwcm9ncmVzcy5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnRhZ2V9JWBcclxufVxyXG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU2NoZWR1bGUgPSAoeyBpc0FjdGl2ZSA9IGZhbHNlLCBpbnRlcnZhbCA9IDAsIGNhbGxiYWNrID0gRnVuY3Rpb24ucHJvdG90eXBlLCB1cGRhdGVyIH0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IG5leHRQaW5nID0gMFxyXG4gICAgbGV0IGxhc3RQaW5nID0gMFxyXG4gICAgY29uc3QgY2FsbENhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChuZXh0UGluZyAmJiBuZXh0UGluZyA8PSBEYXRlLm5vdygpKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSBuZXh0UGluZ1xyXG4gICAgICAgICAgICBuZXh0UGluZyA9IG5leHRQaW5nICsgaW50ZXJ2YWwgPiBEYXRlLm5vdygpID8gbmV4dFBpbmcgKyBpbnRlcnZhbCA6IERhdGUubm93KCkgKyBpbnRlcnZhbFxyXG4gICAgICAgIH1cclxuICAgICAgICB0eXBlb2YgdXBkYXRlciA9PT0gJ2Z1bmN0aW9uJyAmJiB1cGRhdGVyKGxhc3RQaW5nLCBuZXh0UGluZylcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNBY3RpdmUgJiYgaW50ZXJ2YWwpIHtcclxuICAgICAgICBuZXh0UGluZyA9IERhdGUubm93KCkgLSAxXHJcbiAgICAgICAgY2FsbENhbGxiYWNrKClcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbChjYWxsQ2FsbGJhY2ssIDEwMClcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNldEludGVydmFsIChuZXdJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5ld0ludGVydmFsICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1c2UgYSBudW1iZXInKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gbmV4dFBpbmcgLSBpbnRlcnZhbCArIG5ld0ludGVydmFsXHJcbiAgICAgICAgICAgIGludGVydmFsID0gbmV3SW50ZXJ2YWxcclxuICAgICAgICAgICAgY2FsbENhbGxiYWNrKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldENhbGxiYWNrIChjYikge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gRGF0ZS5ub3coKSArIGludGVydmFsXHJcbiAgICAgICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoY2FsbENhbGxiYWNrLCAxMDApXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmlnZ2VySW5zdGFudGx5ICgpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IERhdGUubm93KClcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBEYXRlLm5vdygpICsgaW50ZXJ2YWxcclxuICAgICAgICAgICAgdHlwZW9mIHVwZGF0ZXIgPT09ICdmdW5jdGlvbicgJiYgdXBkYXRlcihsYXN0UGluZywgbmV4dFBpbmcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wICgpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSAwXHJcbiAgICAgICAgICAgIGxhc3RQaW5nID0gMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBsaW5rRmllbGRzID0gWydoaWRlJywgJ2hpZGRlbkNoYXB0ZXJzJywgJ3NvdXJjZXMnXVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmtIZWxwZXJzIChkYiwgQXBpKSB7XHJcbiAgICBhc3luYyBmdW5jdGlvbiBwdXNoTGlua1VwZGF0ZSAoY2hhbmdlcykge1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZXNldCA9IGxpbmtGaWVsZHMuZmlsdGVyKChrZXkpID0+IE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUoKGNoYW5nZSkgPT4gY2hhbmdlLmluY2x1ZGVzKGtleSkpKVxyXG5cclxuICAgICAgICBpZiAoY2hhbmdlc2V0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgICAgICAgICAgY29uc3QgbG9jYWwgPSBhd2FpdCBkYi5saW5rLmxvY2FsKClcclxuICAgICAgICAgICAgY29uc3QgY2hhbmdlcyA9IHt9XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzZXQuaW5jbHVkZXMoJ2hpZGUnKSAmJiBTdHJpbmcobGluay5oaWRlKSAhPT0gU3RyaW5nKGxvY2FsLmhpZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLmhpZGUgPSBsb2NhbC5oaWRlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlc2V0LmluY2x1ZGVzKCdoaWRkZW5DaGFwdGVycycpICYmXHJcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShsaW5rLmhpZGRlbkNoYXB0ZXJzKSAhPT0gSlNPTi5zdHJpbmdpZnkobG9jYWwuaGlkZGVuQ2hhcHRlcnMpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlcy5oaWRkZW5DaGFwdGVycyA9IGxvY2FsLmhpZGRlbkNoYXB0ZXJzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoYW5nZXNldC5pbmNsdWRlcygnc291cmNlcycpICYmIChcclxuICAgICAgICAgICAgICAgIGxpbmsuc291cmNlcz8ubGVuZ3RoICE9PSBsb2NhbC5zb3VyY2VzLmxlbmd0aCB8fFxyXG4gICAgICAgICAgICAgICAgbGluay5zb3VyY2VzLnNvbWUoKHNvdXJjZSkgPT4gc291cmNlICYmICFsb2NhbC5zb3VyY2VzLmluY2x1ZGVzKHNvdXJjZS5pZCkpXHJcbiAgICAgICAgICAgICkpIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZXMuc291cmNlcyA9IGxvY2FsLnNvdXJjZXNcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNoYW5nZXMpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgQXBpLkxpbmsudXBkYXRlKGxpbmsua2V5LCBjaGFuZ2VzKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy52YWxpZCAmJiBkYi5saW5rLnNldChyZXMucGF5bG9hZCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hMaW5rVXBkYXRlICgpIHtcclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuXHJcbiAgICAgICAgaWYgKGxpbmspIHtcclxuICAgICAgICAgICAgQXBpLkxpbmsucmVhZChsaW5rLmtleSwgbGluay5sYXN0TW9kaWZpZWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy52YWxpZCAmJiByZXMucGF5bG9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5saW5rLnNldExvY2FsKHJlcy5wYXlsb2FkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5saW5rLnNldChyZXMucGF5bG9hZClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcHVzaExpbmtVcGRhdGUsXHJcbiAgICAgICAgZmV0Y2hMaW5rVXBkYXRlXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTZXR0aW5nc0hhbmRsZXJzIChkYiwgYXBpKSB7XHJcbiAgICBjb25zdCB7IExpbmsgfSA9IGFwaVxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWxpbmstYnV0dG9uJylcclxuICAgIGNvbnN0IGxpbmtOdW1iZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstaWQnKVxyXG4gICAgY29uc3QgbGlua2luZ1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1zZWN0aW9uJylcclxuICAgIGNvbnN0IHVubGlua1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5saW5rLXNlY3Rpb24nKVxyXG4gICAgY29uc3QgdW5saW5rQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VubGluay1idXR0b24nKVxyXG4gICAgY29uc3QgbGlua0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWJ1dHRvbicpXHJcbiAgICAvLyBjb25zdCBsaW5raW5nVG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstdG9nZ2xlJylcclxuICAgIGNvbnN0IGxpbmtJbnB1dDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMScpXHJcbiAgICBjb25zdCBsaW5rSW5wdXQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTInKVxyXG4gICAgY29uc3QgbGlua0lucHV0MyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0zJylcclxuXHJcbiAgICBsaW5rSW5wdXQxLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDEudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgMTUpXHJcbiAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9IG51bWJlci5zbGljZSgwLCA1KVxyXG4gICAgICAgIGlmIChudW1iZXIubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gbnVtYmVyLnNsaWNlKDUsIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA+IDEwKSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuZm9jdXMoKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnNldFNlbGVjdGlvblJhbmdlKG51bWJlci5sZW5ndGggLSAxMCwgbnVtYmVyLmxlbmd0aCAtIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW1iZXIubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLmZvY3VzKClcclxuICAgICAgICAgICAgbGlua0lucHV0Mi5zZXRTZWxlY3Rpb25SYW5nZShudW1iZXIubGVuZ3RoIC0gNSwgbnVtYmVyLmxlbmd0aCAtIDUpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGxpbmtJbnB1dDIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbnVtYmVyID0gbGlua0lucHV0Mi52YWx1ZS5yZXBsYWNlQWxsKC9bXlxcZF0qL2csICcnKS5zbGljZSgwLCAxMClcclxuICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gbnVtYmVyLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgaWYgKG51bWJlci5sZW5ndGggPiA1KSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoNSwgMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuZm9jdXMoKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnNldFNlbGVjdGlvblJhbmdlKG51bWJlci5sZW5ndGggLSA1LCBudW1iZXIubGVuZ3RoIC0gNSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGlua0lucHV0My5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBudW1iZXIgPSBsaW5rSW5wdXQzLnZhbHVlLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgaWYgKGxpbmtJbnB1dDMudmFsdWUgIT09IG51bWJlci5zbGljZSgwLCA1KSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gbnVtYmVyLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBmdW5jdGlvbiB3cml0ZVN0YXRlVG9Eb20gKGxpbmssIGVuYWJsZWQpIHtcclxuICAgICAgICBsaW5raW5nU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICdub25lJyA6ICcnXHJcbiAgICAgICAgdW5saW5rU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICcnIDogJ25vbmUnXHJcbiAgICAgICAgLy8gbGlua2luZ1RvZ2dsZS5kaXNhYmxlZCA9ICFsaW5rXHJcbiAgICAgICAgLy8gbGlua2luZ1RvZ2dsZS5jaGVja2VkID0gZW5hYmxlZFxyXG4gICAgICAgIGxpbmtOdW1iZXJUZXh0LmlubmVyVGV4dCA9IGxpbmsgPyBgJHtsaW5rLmtleS5zbGljZSgwLCA1KX0tJHtsaW5rLmtleS5zbGljZSg1LCAxMCl9LSR7bGluay5rZXkuc2xpY2UoMTApfWAgOiAnVW5saW5rZWQnXHJcbiAgICAgICAgbGlua051bWJlclRleHQuc3R5bGUuY29sb3IgPSBsaW5rID8gJyMwMDBjMjEnIDogJyNjM2NiZDInXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICBjb25zdCBlbmFibGVkID0gYXdhaXQgZGIubGluay5nZXRFbmFibGVkKClcclxuICAgIHdyaXRlU3RhdGVUb0RvbShsaW5rLCBlbmFibGVkKVxyXG5cclxuICAgIGNyZWF0ZUxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICAgICAgaWYgKCFsaW5rKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtEYXRhID0gYXdhaXQgZGIubGluay5sb2NhbCgpXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0xpbmtSZXN1bHQgPSBhd2FpdCBMaW5rLmluc2VydChsaW5rRGF0YSlcclxuICAgICAgICAgICAgaWYgKG5ld0xpbmtSZXN1bHQ/LnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gbmV3TGlua1Jlc3VsdC5wYXlsb2FkXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldChsaW5rKVxyXG4gICAgICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXRFbmFibGVkKHRydWUpXHJcbiAgICAgICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20obGluaywgdHJ1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICB1bmxpbmtCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICAgICAgaWYgKGxpbmspIHtcclxuICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXQobnVsbClcclxuICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXRFbmFibGVkKGZhbHNlKVxyXG4gICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20odW5kZWZpbmVkLCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsaW5rSW5wdXQxLnZhbHVlfSR7bGlua0lucHV0Mi52YWx1ZX0ke2xpbmtJbnB1dDMudmFsdWV9YFxyXG4gICAgICAgICAgICBjb25zdCBsaW5rUmVzdWx0ID0gYXdhaXQgTGluay5yZWFkKGtleSlcclxuICAgICAgICAgICAgaWYgKGxpbmtSZXN1bHQ/LnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gbGlua1Jlc3VsdC5wYXlsb2FkXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldChsaW5rKVxyXG4gICAgICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXRFbmFibGVkKHRydWUpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldExvY2FsKGxpbmspXHJcbiAgICAgICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20obGluaywgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgLy8gbGlua2luZ1RvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgLy8gICAgIGRiLmxpbmsuc2V0RW5hYmxlZChlLnRhcmdldC5jaGVja2VkKVxyXG4gICAgLy8gfSlcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gc291cmNlUmVuZGVyZXIgKGRiKSB7XHJcbiAgICBjb25zdCBzb3VyY2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZXMnKVxyXG5cclxuICAgIHNvdXJjZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjbG9zZXN0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5yb3cgLmFjdGlvbi5kZWxldGUnKVxyXG4gICAgICAgIGlmIChjbG9zZXN0ICYmIGNsb3Nlc3QuZGF0YXNldFsnaWQnXSAmJiBzb3VyY2VzLmNvbnRhaW5zKGNsb3Nlc3QpKSB7XHJcbiAgICAgICAgICAgIGRiLnNvdXJjZXMuZGVsZXRlKGNsb3Nlc3QuZGF0YXNldFsnaWQnXSlcclxuICAgICAgICAgICAgY2xvc2VzdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3Rpb24nKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyU291cmNlcyAoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRiLnNvdXJjZXMucmVhZCgpXHJcblxyXG4gICAgICAgIHNvdXJjZXMuaW5uZXJIVE1MID0gZGF0YVxyXG4gICAgICAgICAgICAuc29ydCgoc291cmNlMSwgc291cmNlMikgPT4gU3RyaW5nKHNvdXJjZTEudGl0bGUpLmxvY2FsZUNvbXBhcmUoc291cmNlMj8udGl0bGUpKVxyXG4gICAgICAgICAgICAubWFwKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBTdHJpbmcoc291cmNlLnVybCkucmVwbGFjZSgnL3dwLWFkbWluL2FkbWluLWFqYXgucGhwJywgJycpLnJlcGxhY2UoL2h0dHBzPzpcXC9cXC8vLCAnJylcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgYDxsaSBjbGFzcz1cInJvdyBzb3VyY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFcIiB0aXRsZT1cIiR7YCR7c291cmNlLnRpdGxlfSAoJHt1cmx9KWB9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+JHtzb3VyY2UudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYW5nYS1pZFwiPigke3VybH0pPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWxldGUgYWN0aW9uXCIgZGF0YS1pZD1cIiR7c291cmNlLmlkfVwiPkRlbGV0ZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPmBcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmpvaW4oJ1xcbicpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXI6ICgpID0+IHJlbmRlclNvdXJjZXMoKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IHBhZCB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXJsUmVuZGVyZXIgKGRiKSB7XHJcbiAgICBjb25zdCB1cmxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybHMnKVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGhpZGUgKGlkKSB7XHJcbiAgICAgICAgY29uc3QgeyBuZXdVcmxzIH0gPSBhd2FpdCBkYi51cmxzLnJlYWQoKVxyXG4gICAgICAgIGlmIChuZXdVcmxzLmxlbmd0aCA8PSAxICYmICghbmV3VXJsc1swXSB8fCBuZXdVcmxzWzBdLmlkID09PSBpZCkpIHtcclxuICAgICAgICAgICAgZGIudXJscy5oaWRlQWxsKERhdGUubm93KCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkYi51cmxzLmhpZGUoaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVybHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjbG9zZXN0SGlkZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93IC5oaWRlJylcclxuXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RIaWRlICYmIGNsb3Nlc3RIaWRlLmRhdGFzZXRbJ2lkJ10gJiYgdXJscy5jb250YWlucyhjbG9zZXN0SGlkZSkpIHtcclxuICAgICAgICAgICAgYXdhaXQgaGlkZShjbG9zZXN0SGlkZS5kYXRhc2V0WydpZCddKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbG9zZXN0TGluayA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93Lm5ldyAubGluaycpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RMaW5rICYmIGNsb3Nlc3RMaW5rLmRhdGFzZXRbJ2lkJ10gJiYgdXJscy5jb250YWlucyhjbG9zZXN0TGluaykpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBhd2FpdCBoaWRlKGNsb3Nlc3RMaW5rLmRhdGFzZXRbJ2lkJ10pXHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKGNsb3Nlc3RMaW5rLmhyZWYsICdfYmxhbmsnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbG9zZXN0TW9yZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuYWN0aW9uLmxvYWQtbW9yZScpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RNb3JlICYmIHVybHMuY29udGFpbnMoY2xvc2VzdE1vcmUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heE9sZCA9IGF3YWl0IGRiLnVybHMuZ2V0TWF4T2xkKClcclxuICAgICAgICAgICAgYXdhaXQgZGIudXJscy5zZXRNYXhPbGQobWF4T2xkICsgMTAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoaWRlQWxsID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5oaWRlLWFsbCcpXHJcbiAgICAgICAgaWYgKGhpZGVBbGwgJiYgdXJscy5jb250YWlucyhoaWRlQWxsKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBkYi51cmxzLmhpZGVBbGwoRGF0ZS5ub3coKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdG9wID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy50b3AnKVxyXG4gICAgICAgIGlmICh0b3AgJiYgdXJscy5jb250YWlucyh0b3ApKSB7XHJcbiAgICAgICAgICAgIHVybHMuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgbGV0IG1heFNjcm9sbCA9IDBcclxuICAgIHVybHMuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHVybHMub2Zmc2V0SGVpZ2h0ICsgdXJscy5zY3JvbGxUb3BcclxuICAgICAgICBpZiAodXJscy5zY3JvbGxIZWlnaHQgLSBzY3JvbGxIZWlnaHQgPD0gNTAgJiYgbWF4U2Nyb2xsICE9PSB1cmxzLnNjcm9sbEhlaWdodCkge1xyXG4gICAgICAgICAgICBtYXhTY3JvbGwgPSB1cmxzLnNjcm9sbEhlaWdodFxyXG4gICAgICAgICAgICBjb25zdCBtYXhPbGQgPSBhd2FpdCBkYi51cmxzLmdldE1heE9sZCgpXHJcbiAgICAgICAgICAgIGRiLnVybHMuc2V0TWF4T2xkKG1heE9sZCArIDEwMClcclxuICAgICAgICB9XHJcbiAgICAgICAgY2hlY2tUb3BCdXR0b24oKVxyXG4gICAgfSlcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1RvcEJ1dHRvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVybHMuc2Nyb2xsVG9wID4gMCAmJiB1cmxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA9PT0gdXJscy5xdWVyeVNlbGVjdG9yKCcub2xkLWNoYXB0ZXJzJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSB7XHJcbiAgICAgICAgICAgIHVybHMucXVlcnlTZWxlY3RvcignLm9sZC1jaGFwdGVycyAudG9wJykuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1cmxzLnF1ZXJ5U2VsZWN0b3IoJy5vbGQtY2hhcHRlcnMgLnRvcCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVXJsUmVuZGVyZXIgKGlzT2xkKSB7XHJcbiAgICAgICAgcmV0dXJuIChjaGFwdGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShjaGFwdGVyLmNyZWF0ZWQpXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFN0cmluZyhjaGFwdGVyLnVybCkubWF0Y2goL15odHRwcz86XFwvXFwvLipcXC8oW14vXSpoYXB0ZXJbXi9cXGRdKnwpKFxcZCopW15cXGQvXSpbXi9dKlxcLyQvKSB8fCBbXVxyXG4gICAgICAgICAgICBjb25zdCB0aW1lU3RyaW5nID0gYCR7cGFkKGRhdGUuZ2V0SG91cnMoKSl9OiR7cGFkKGRhdGUuZ2V0TWludXRlcygpKX1gXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBgJHtwYWQoZGF0ZS5nZXREYXRlKCkpfS4ke3BhZChkYXRlLmdldE1vbnRoKCkgKyAxKX0uJHtTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKS5zbGljZSgtMil9YFxyXG4gICAgICAgICAgICBjb25zdCBmdWxsRGF0ZSA9IGRhdGUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdID09PSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA/IHRpbWVTdHJpbmcgOiBkYXRlU3RyaW5nXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicm93JHtpc09sZCA/ICcgb2xkJyA6ICcgbmV3J31cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxpbmtcIiBocmVmPVwiJHtjaGFwdGVyLnVybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lclwiIGRhdGEtaWQ9XCIke2NoYXB0ZXIuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7Y2hhcHRlci50aXRsZX0gLSBDaGFwdGVyICR7cmVzdWx0WzJdfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGUtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGVcIiB0aXRsZT1cIiR7YCR7ZGF0ZVN0cmluZ30gJHt0aW1lU3RyaW5nfWB9XCI+JHtmdWxsRGF0ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGlkZVwiIGRhdGEtaWQ9XCIke2NoYXB0ZXIuaWR9XCI+SGlkZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2xpPmBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyVXJscyAoKSB7XHJcbiAgICAgICAgY29uc3QgbWF4T2xkID0gYXdhaXQgZGIudXJscy5nZXRNYXhPbGQoKVxyXG4gICAgICAgIGNvbnN0IHsgbmV3VXJscywgb2xkVXJscyB9ID0gYXdhaXQgZGIudXJscy5yZWFkKClcclxuICAgICAgICBjb25zdCBuZXdSb3dzID0gbmV3VXJscy5tYXAoY3JlYXRlVXJsUmVuZGVyZXIoZmFsc2UpKVxyXG4gICAgICAgIGNvbnN0IG9sZFJvd3MgPSBvbGRVcmxzLm1hcChjcmVhdGVVcmxSZW5kZXJlcih0cnVlKSlcclxuXHJcbiAgICAgICAgaWYgKG5ld1Jvd3MubGVuZ3RoIHx8IG9sZFJvd3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHVybHMuaW5uZXJIVE1MID0gW11cclxuICAgICAgICAgICAgICAgIC5jb25jYXQobmV3Um93cy5sZW5ndGggPyAnPGxpIGNsYXNzPVwibmV3LWNoYXB0ZXJzXCI+TmV3IENoYXB0ZXJzIDxzcGFuIGNsYXNzPVwiYWN0aW9uIGhpZGUtYWxsXCI+SGlkZSBhbGw8L3NwYW4+PC9saT4nIDogW10pXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG5ld1Jvd3MpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KCc8bGkgY2xhc3M9XCJvbGQtY2hhcHRlcnNcIj5PbGQgQ2hhcHRlcnMgPHNwYW4gY2xhc3M9XCJhY3Rpb24gdG9wXCI+VG9wICYjODU5Mzs8L3NwYW4+PC9saT4nKVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdChvbGRSb3dzLnNsaWNlKDAsIG1heE9sZCkpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG9sZFJvd3MubGVuZ3RoID49IG1heE9sZCA/IFsnPGxpIGNsYXNzPVwiYWN0aW9uIGxvYWQtbW9yZVwiPkxvYWQgdXAgdG8gMTAwIG1vcmUgb2xkIGNoYXB0ZXJzLi4uPC9saT4nXSA6IFtdKVxyXG4gICAgICAgICAgICAgICAgLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gbmV3Um93cy5sZW5ndGggPyBgKCR7bmV3Um93cy5sZW5ndGh9KSBNYW5nYSBQb2xsYCA6ICdNYW5nYSBQb2xsJ1xyXG4gICAgICAgICAgICBjaGVja1RvcEJ1dHRvbigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1cmxzLmlubmVySFRNTCA9ICc8bGkgY2xhc3M9XCJyb3dcIj5ObyBDaGFwdGVycyBhdmFpbGFibGUuPC9saT4nXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gJ01hbmdhIFBvbGwnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyOiAoKSA9PiByZW5kZXJVcmxzKClcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gcGFyc2UgKHN0cmluZywgZmFsbGJhY2spIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nKVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gZmFsbGJhY2tcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhZCAobm8pIHtcclxuICAgIHJldHVybiAoJzAwJyArIG5vKS5zbGljZSgtMilcclxufVxyXG4iLCJpbXBvcnQgeyBBUEkgfSBmcm9tICcuLi9jb21tb24vYXBpJ1xyXG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vc3RvcmFnZSdcclxuXHJcbmxldCBjdXJyZW50U291cmNlID0gbnVsbFxyXG5cclxuY29uc3QgYm9va21hcmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9va21hcmsnKVxyXG5jb25zdCBib29rbWFya1RyYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvb2ttYXJrLXRyYWNrJylcclxuY29uc3QgYm9va21hcmtUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib29rbWFyay10aXRsZScpXHJcblxyXG5jb25zdCB7IFNvdXJjZSB9ID0gQVBJKCdodHRwczovL21hbmdhLmZvY2hsYWMuY29tJylcclxuXHJcbmJvb2ttYXJrVHJhY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBib29rbWFyay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICBib29rbWFya1RpdGxlLmlubmVyVGV4dCA9ICcnXHJcbiAgICBTb3VyY2UuaW5zZXJ0KGN1cnJlbnRTb3VyY2UpXHJcbiAgICAgICAgLnRoZW4oKHNvdXJjZSkgPT4gc291cmNlICYmIGRiLnNvdXJjZXMuYWRkKHNvdXJjZSkpXHJcbiAgICBjdXJyZW50U291cmNlID0gbnVsbFxyXG59KVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RCb29rbWFyayAoKSB7XHJcbiAgICBjaHJvbWUudGFicy5xdWVyeShcclxuICAgICAgICB7IGFjdGl2ZTogdHJ1ZSwgd2luZG93SWQ6IGNocm9tZS53aW5kb3dzLldJTkRPV19JRF9DVVJSRU5UIH0sXHJcbiAgICAgICAgKHRhYnMpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0YWJzWzBdLnVybC5pbmNsdWRlcygnY2hyb21lOi8vJykpIHtcclxuICAgICAgICAgICAgICAgIGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7IHRhcmdldDogeyB0YWJJZDogdGFic1swXS5pZCB9LCBmdW5jdGlvbjogdGVzdCB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXN0ICgpIHtcclxuICAgIGZ1bmN0aW9uIHBhcnNlIChzdHJpbmcsIGZhbGxiYWNrKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsbGJhY2tcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWRzID0gW1xyXG4gICAgICAgIHdpbmRvdz8ubWFuZ2E/Lm1hbmdhX2lkLFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRpbmctcG9zdC1pZCcpPy52YWx1ZSxcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3AtbWFuZ2EtYWN0aW9uLWJ1dHRvbicpPy5kYXRhc2V0Py5bJ3Bvc3QnXSxcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhcHRlci1zZWxlY3Rpb24nKT8uZGF0YXNldD8uWydtYW5nYSddLFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYW5nYS1jaGFwdGVycy1ob2xkZXInKT8uZGF0YXNldD8uWydpZCddLFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYW5nYS1yZWFkaW5nLW5hdi1oZWFkJyk/LmRhdGFzZXQ/LlsnaWQnXSxcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuZ2EtcmVhZGluZy1uYXYtZm9vdCcpPy5kYXRhc2V0Py5bJ2lkJ11cclxuICAgIF1cclxuICAgICAgICAuZmlsdGVyKCh0aXRsZSkgPT4gdGl0bGUpXHJcbiAgICAgICAgLnJlZHVjZSgobWFwLCBpZCkgPT4ge1xyXG4gICAgICAgICAgICBtYXBbaWRdID0gdHlwZW9mIG1hcFtpZF0gPT09ICdudW1iZXInID8gbWFwW2lkXSArIDEgOiAxXHJcbiAgICAgICAgICAgIHJldHVybiBtYXBcclxuICAgICAgICB9LCB7fSlcclxuICAgIGNvbnN0IGlkID0gT2JqZWN0LmtleXMoaWRzKS5zb3J0KChpZDEsIGlkMikgPT4gaWRzW2lkMV0gLSBpZHNbaWQyXSlbMF1cclxuXHJcbiAgICBjb25zdCB0aXRsZXMgPSBbXHJcbiAgICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cImFwcGxpY2F0aW9uL2xkK2pzb25cIl0nKSlcclxuICAgICAgICAgICAgLm1hcCgoc2NyaXB0KSA9PiBwYXJzZShzY3JpcHQuaW5uZXJUZXh0KT8uaGVhZGxpbmUpLmZpbmQoKGgpID0+IGgpLFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFwdGVyLWhlYWRpbmcnKT8uaW5uZXJUZXh0Py5zcGxpdCgnIC0gJylbMF0sXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtdGl0bGUgaDEnKT8uaW5uZXJUZXh0LFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRlLXRpdGxlJyk/LnRpdGxlXHJcbiAgICBdXHJcbiAgICAgICAgLmZpbHRlcigodGl0bGUpID0+IHRpdGxlKVxyXG4gICAgICAgIC5yZWR1Y2UoKG1hcCwgdGl0bGUpID0+IHtcclxuICAgICAgICAgICAgbWFwW3RpdGxlXSA9IHR5cGVvZiBtYXBbdGl0bGVdID09PSAnbnVtYmVyJyA/IG1hcFt0aXRsZV0gKyAxIDogMVxyXG4gICAgICAgICAgICByZXR1cm4gbWFwXHJcbiAgICAgICAgfSwge30pXHJcbiAgICBjb25zdCB0aXRsZSA9IE9iamVjdC5rZXlzKHRpdGxlcykuc29ydCgodGl0bGUxLCB0aXRsZTIpID0+IHRpdGxlc1t0aXRsZTFdIC0gdGl0bGVzW3RpdGxlMl0pWzBdXHJcblxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBpZCwgdGl0bGUsIHVybDogZG9jdW1lbnQ/LmxvY2F0aW9uPy5vcmlnaW4gPyBgJHtkb2N1bWVudC5sb2NhdGlvbi5vcmlnaW59L3dwLWFkbWluL2FkbWluLWFqYXgucGhwYCA6IG51bGwgfSlcclxufVxyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGFzeW5jIChyZXF1ZXN0KSA9PiB7XHJcbiAgICBpZiAocmVxdWVzdC5pZCAmJiByZXF1ZXN0LnRpdGxlICYmIHJlcXVlc3QudXJsKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IGRiLnNvdXJjZXMucmVhZCgpXHJcblxyXG4gICAgICAgIGlmICghc291cmNlcy5zb21lKChzb3VyY2UpID0+IHNvdXJjZS51cmwgPT09IHJlcXVlc3QudXJsICYmIFN0cmluZyhzb3VyY2UubWFuZ2FJZCkgPT09IFN0cmluZyhyZXF1ZXN0LmlkKSkpIHtcclxuICAgICAgICAgICAgYm9va21hcmsuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgICAgICBib29rbWFya1RpdGxlLmlubmVyVGV4dCA9IGBEbyB5b3Ugd2FudCB0byBzdGFydCB0cmFja2luZyBcIiR7cmVxdWVzdC50aXRsZX1cIj9gXHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UgPSB7XHJcbiAgICAgICAgICAgICAgICBtYW5nYUlkOiByZXF1ZXN0LmlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHJlcXVlc3QudGl0bGUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IHJlcXVlc3QudXJsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJvb2ttYXJrLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIGJvb2ttYXJrVGl0bGUuaW5uZXJUZXh0ID0gJydcclxuICAgIGN1cnJlbnRTb3VyY2UgPSBudWxsXHJcbn0pXHJcbiIsImltcG9ydCB7IGNyZWF0ZURCIH0gZnJvbSAnLi4vY29tbW9uL2RiJ1xyXG5cclxuZnVuY3Rpb24gcmVhZCAobmFtZXNwYWNlLCBrZXlzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IGNocm9tZS5zdG9yYWdlW25hbWVzcGFjZV0uZ2V0KGtleXMsIHJlc29sdmUpKVxyXG59XHJcblxyXG5mdW5jdGlvbiB3cml0ZSAobmFtZXNwYWNlLCBrZXlQYWlycykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBjaHJvbWUuc3RvcmFnZVtuYW1lc3BhY2VdLnNldChrZXlQYWlycywgcmVzb2x2ZSkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZExpc3RlbmVyIChjYWxsYmFjaykge1xyXG4gICAgcmV0dXJuIGNocm9tZS5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihjYWxsYmFjaylcclxufVxyXG5cclxuY29uc3Qgc3RvcmFnZSA9IHtcclxuICAgIHJlYWQsIHdyaXRlLCBhZGRMaXN0ZW5lclxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGIgPSBjcmVhdGVEQihzdG9yYWdlKVxyXG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyogRmlsZVNhdmVyLmpzXHJcbiAqIEEgc2F2ZUFzKCkgRmlsZVNhdmVyIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXHJcbiAqIEVTNmlmaWVkIGJ5IENvbGUgQ2hhbWJlcmxhaW4sIGh0dHBzOi8vZ2l0aHViLmNvbS9jY2hhbWJlcmxhaW5cclxuICpcclxuICogTGljZW5zZTogTUlUXHJcbiAqICAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXHJcbiAqL1xuXG4vKmdsb2JhbCBzZWxmICovXG4vKmpzbGludCBiaXR3aXNlOiB0cnVlLCBpbmRlbnQ6IDQsIGxheGJyZWFrOiB0cnVlLCBsYXhjb21tYTogdHJ1ZSwgc21hcnR0YWJzOiB0cnVlLCBwbHVzcGx1czogdHJ1ZSAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvRmlsZVNhdmVyLmpzL2Jsb2IvbWFzdGVyL0ZpbGVTYXZlci5qcyAqL1xuXG52YXIgc2F2ZUFzID0gZXhwb3J0cy5zYXZlQXMgPSB3aW5kb3cuc2F2ZUFzIHx8IGZ1bmN0aW9uICh2aWV3KSB7XG4gIC8vIElFIDwxMCBpcyBleHBsaWNpdGx5IHVuc3VwcG9ydGVkXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvTVNJRSBbMS05XVxcLi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkgcmV0dXJuO1xuICB2YXIgZG9jID0gdmlldy5kb2N1bWVudDtcbiAgLy8gb25seSBnZXQgVVJMIHdoZW4gbmVjZXNzYXJ5IGluIGNhc2UgQmxvYi5qcyBoYXNuJ3Qgb3ZlcnJpZGRlbiBpdCB5ZXRcbiAgdmFyIGdldF9VUkwgPSBmdW5jdGlvbiBnZXRfVVJMKCkge1xuICAgIHJldHVybiB2aWV3LlVSTCB8fCB2aWV3LndlYmtpdFVSTCB8fCB2aWV3O1xuICB9O1xuICB2YXIgc2F2ZV9saW5rID0gZG9jLmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsICdhJyk7XG4gIHZhciBjYW5fdXNlX3NhdmVfbGluayA9ICdkb3dubG9hZCcgaW4gc2F2ZV9saW5rO1xuICB2YXIgY2xpY2sgPSBmdW5jdGlvbiBjbGljayhub2RlKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ2NsaWNrJyk7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfTtcbiAgdmFyIGlzX3NhZmFyaSA9IC9WZXJzaW9uXFwvW1xcZFxcLl0rLipTYWZhcmkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIHZhciB3ZWJraXRfcmVxX2ZzID0gdmlldy53ZWJraXRSZXF1ZXN0RmlsZVN5c3RlbTtcbiAgdmFyIHJlcV9mcyA9IHZpZXcucmVxdWVzdEZpbGVTeXN0ZW0gfHwgd2Via2l0X3JlcV9mcyB8fCB2aWV3Lm1velJlcXVlc3RGaWxlU3lzdGVtO1xuICB2YXIgdGhyb3dfb3V0c2lkZSA9IGZ1bmN0aW9uIHRocm93X291dHNpZGUoZXgpIHtcbiAgICAodmlldy5zZXRJbW1lZGlhdGUgfHwgdmlldy5zZXRUaW1lb3V0KShmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBleDtcbiAgICB9LCAwKTtcbiAgfTtcbiAgdmFyIGZvcmNlX3NhdmVhYmxlX3R5cGUgPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcbiAgdmFyIGZzX21pbl9zaXplID0gMDtcbiAgLy8gdGhlIEJsb2IgQVBJIGlzIGZ1bmRhbWVudGFsbHkgYnJva2VuIGFzIHRoZXJlIGlzIG5vIFwiZG93bmxvYWRmaW5pc2hlZFwiIGV2ZW50IHRvIHN1YnNjcmliZSB0b1xuICB2YXIgYXJiaXRyYXJ5X3Jldm9rZV90aW1lb3V0ID0gMTAwMCAqIDQwOyAvLyBpbiBtc1xuICB2YXIgcmV2b2tlID0gZnVuY3Rpb24gcmV2b2tlKGZpbGUpIHtcbiAgICB2YXIgcmV2b2tlciA9IGZ1bmN0aW9uIHJldm9rZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnKSAvLyBmaWxlIGlzIGFuIG9iamVjdCBVUkxcbiAgICAgICAgZ2V0X1VSTCgpLnJldm9rZU9iamVjdFVSTChmaWxlKTtlbHNlIC8vIGZpbGUgaXMgYSBGaWxlXG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfTtcbiAgICAvKiAvLyBUYWtlIG5vdGUgVzNDOlxyXG4gICAgdmFyXHJcbiAgICAgIHVyaSA9IHR5cGVvZiBmaWxlID09PSBcInN0cmluZ1wiID8gZmlsZSA6IGZpbGUudG9VUkwoKVxyXG4gICAgLCByZXZva2VyID0gZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICAgIC8vIGlkZWFseSBEb3dubG9hZEZpbmlzaGVkRXZlbnQuZGF0YSB3b3VsZCBiZSB0aGUgVVJMIHJlcXVlc3RlZFxyXG4gICAgICBpZiAoZXZ0LmRhdGEgPT09IHVyaSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmlsZSA9PT0gXCJzdHJpbmdcIikgeyAvLyBmaWxlIGlzIGFuIG9iamVjdCBVUkxcclxuICAgICAgICAgIGdldF9VUkwoKS5yZXZva2VPYmplY3RVUkwoZmlsZSk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gZmlsZSBpcyBhIEZpbGVcclxuICAgICAgICAgIGZpbGUucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJkb3dubG9hZGZpbmlzaGVkXCIsIHJldm9rZXIpO1xyXG4gICAgKi9cbiAgICBzZXRUaW1lb3V0KHJldm9rZXIsIGFyYml0cmFyeV9yZXZva2VfdGltZW91dCk7XG4gIH07XG4gIHZhciBkaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKGZpbGVzYXZlciwgZXZlbnRfdHlwZXMsIGV2ZW50KSB7XG4gICAgZXZlbnRfdHlwZXMgPSBbXS5jb25jYXQoZXZlbnRfdHlwZXMpO1xuICAgIHZhciBpID0gZXZlbnRfdHlwZXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGZpbGVzYXZlclsnb24nICsgZXZlbnRfdHlwZXNbaV1dO1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxpc3RlbmVyLmNhbGwoZmlsZXNhdmVyLCBldmVudCB8fCBmaWxlc2F2ZXIpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIHRocm93X291dHNpZGUoZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICB2YXIgYXV0b19ib20gPSBmdW5jdGlvbiBhdXRvX2JvbShibG9iKSB7XG4gICAgLy8gcHJlcGVuZCBCT00gZm9yIFVURi04IFhNTCBhbmQgdGV4dC8qIHR5cGVzIChpbmNsdWRpbmcgSFRNTClcbiAgICBpZiAoL15cXHMqKD86dGV4dFxcL1xcUyp8YXBwbGljYXRpb25cXC94bWx8XFxTKlxcL1xcUypcXCt4bWwpXFxzKjsuKmNoYXJzZXRcXHMqPVxccyp1dGYtOC9pLnRlc3QoYmxvYi50eXBlKSkgcmV0dXJuIG5ldyBCbG9iKFsn77u/JywgYmxvYl0sIHsgdHlwZTogYmxvYi50eXBlIH0pO1xuICAgIHJldHVybiBibG9iO1xuICB9O1xuXG4gIHZhciBGaWxlU2F2ZXIgPSBmdW5jdGlvbiBGaWxlU2F2ZXIoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmlsZVNhdmVyKTtcblxuICAgIGlmICghbm9fYXV0b19ib20pIGJsb2IgPSBhdXRvX2JvbShibG9iKTtcbiAgICAvLyBGaXJzdCB0cnkgYS5kb3dubG9hZCwgdGhlbiB3ZWIgZmlsZXN5c3RlbSwgdGhlbiBvYmplY3QgVVJMc1xuICAgIHZhciBmaWxlc2F2ZXIgPSB0aGlzLFxuICAgICAgICB0eXBlID0gYmxvYi50eXBlLFxuICAgICAgICBibG9iX2NoYW5nZWQgPSBmYWxzZSxcbiAgICAgICAgb2JqZWN0X3VybCxcbiAgICAgICAgdGFyZ2V0X3ZpZXcsXG4gICAgICAgIGRpc3BhdGNoX2FsbCA9IGZ1bmN0aW9uIGRpc3BhdGNoX2FsbCgpIHtcbiAgICAgIGRpc3BhdGNoKGZpbGVzYXZlciwgJ3dyaXRlc3RhcnQgcHJvZ3Jlc3Mgd3JpdGUgd3JpdGVlbmQnLnNwbGl0KCcgJykpO1xuICAgIH1cbiAgICAvLyBvbiBhbnkgZmlsZXN5cyBlcnJvcnMgcmV2ZXJ0IHRvIHNhdmluZyB3aXRoIG9iamVjdCBVUkxzXG4gICAgLFxuICAgICAgICBmc19lcnJvciA9IGZ1bmN0aW9uIGZzX2Vycm9yKCkge1xuICAgICAgaWYgKHRhcmdldF92aWV3ICYmIGlzX3NhZmFyaSAmJiB0eXBlb2YgRmlsZVJlYWRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gU2FmYXJpIGRvZXNuJ3QgYWxsb3cgZG93bmxvYWRpbmcgb2YgYmxvYiB1cmxzXG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBiYXNlNjREYXRhID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgICAgICB0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gJ2RhdGE6YXR0YWNobWVudC9maWxlJyArIGJhc2U2NERhdGEuc2xpY2UoYmFzZTY0RGF0YS5zZWFyY2goL1ssO10vKSk7XG4gICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgICAgICBkaXNwYXRjaF9hbGwoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG4gICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGRvbid0IGNyZWF0ZSBtb3JlIG9iamVjdCBVUkxzIHRoYW4gbmVlZGVkXG4gICAgICBpZiAoYmxvYl9jaGFuZ2VkIHx8ICFvYmplY3RfdXJsKSB7XG4gICAgICAgIG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldF92aWV3KSB7XG4gICAgICAgIHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSBvYmplY3RfdXJsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG5ld190YWIgPSB2aWV3Lm9wZW4ob2JqZWN0X3VybCwgJ19ibGFuaycpO1xuICAgICAgICBpZiAobmV3X3RhYiA9PT0gdW5kZWZpbmVkICYmIGlzX3NhZmFyaSkge1xuICAgICAgICAgIC8vQXBwbGUgZG8gbm90IGFsbG93IHdpbmRvdy5vcGVuLCBzZWUgaHR0cDovL2JpdC5seS8xa1pmZlJJXG4gICAgICAgICAgdmlldy5sb2NhdGlvbi5ocmVmID0gb2JqZWN0X3VybDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgIGRpc3BhdGNoX2FsbCgpO1xuICAgICAgcmV2b2tlKG9iamVjdF91cmwpO1xuICAgIH0sXG4gICAgICAgIGFib3J0YWJsZSA9IGZ1bmN0aW9uIGFib3J0YWJsZShmdW5jKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZmlsZXNhdmVyLnJlYWR5U3RhdGUgIT09IGZpbGVzYXZlci5ET05FKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuICAgICAgICBjcmVhdGVfaWZfbm90X2ZvdW5kID0geyBjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2UgfSxcbiAgICAgICAgc2xpY2U7XG5cbiAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5JTklUO1xuICAgIGlmICghbmFtZSkge1xuICAgICAgbmFtZSA9ICdkb3dubG9hZCc7XG4gICAgfVxuICAgIGlmIChjYW5fdXNlX3NhdmVfbGluaykge1xuICAgICAgb2JqZWN0X3VybCA9IGdldF9VUkwoKS5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2F2ZV9saW5rLmhyZWYgPSBvYmplY3RfdXJsO1xuICAgICAgICBzYXZlX2xpbmsuZG93bmxvYWQgPSBuYW1lO1xuICAgICAgICBjbGljayhzYXZlX2xpbmspO1xuICAgICAgICBkaXNwYXRjaF9hbGwoKTtcbiAgICAgICAgcmV2b2tlKG9iamVjdF91cmwpO1xuICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIE9iamVjdCBhbmQgd2ViIGZpbGVzeXN0ZW0gVVJMcyBoYXZlIGEgcHJvYmxlbSBzYXZpbmcgaW4gR29vZ2xlIENocm9tZSB3aGVuXG4gICAgLy8gdmlld2VkIGluIGEgdGFiLCBzbyBJIGZvcmNlIHNhdmUgd2l0aCBhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cbiAgICAvLyBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD05MTE1OFxuICAgIC8vIFVwZGF0ZTogR29vZ2xlIGVycmFudGx5IGNsb3NlZCA5MTE1OCwgSSBzdWJtaXR0ZWQgaXQgYWdhaW46XG4gICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM4OTY0MlxuICAgIGlmICh2aWV3LmNocm9tZSAmJiB0eXBlICYmIHR5cGUgIT09IGZvcmNlX3NhdmVhYmxlX3R5cGUpIHtcbiAgICAgIHNsaWNlID0gYmxvYi5zbGljZSB8fCBibG9iLndlYmtpdFNsaWNlO1xuICAgICAgYmxvYiA9IHNsaWNlLmNhbGwoYmxvYiwgMCwgYmxvYi5zaXplLCBmb3JjZV9zYXZlYWJsZV90eXBlKTtcbiAgICAgIGJsb2JfY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIC8vIFNpbmNlIEkgY2FuJ3QgYmUgc3VyZSB0aGF0IHRoZSBndWVzc2VkIG1lZGlhIHR5cGUgd2lsbCB0cmlnZ2VyIGEgZG93bmxvYWRcbiAgICAvLyBpbiBXZWJLaXQsIEkgYXBwZW5kIC5kb3dubG9hZCB0byB0aGUgZmlsZW5hbWUuXG4gICAgLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTY1NDQwXG4gICAgaWYgKHdlYmtpdF9yZXFfZnMgJiYgbmFtZSAhPT0gJ2Rvd25sb2FkJykge1xuICAgICAgbmFtZSArPSAnLmRvd25sb2FkJztcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IGZvcmNlX3NhdmVhYmxlX3R5cGUgfHwgd2Via2l0X3JlcV9mcykge1xuICAgICAgdGFyZ2V0X3ZpZXcgPSB2aWV3O1xuICAgIH1cbiAgICBpZiAoIXJlcV9mcykge1xuICAgICAgZnNfZXJyb3IoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZnNfbWluX3NpemUgKz0gYmxvYi5zaXplO1xuICAgIHJlcV9mcyh2aWV3LlRFTVBPUkFSWSwgZnNfbWluX3NpemUsIGFib3J0YWJsZShmdW5jdGlvbiAoZnMpIHtcbiAgICAgIGZzLnJvb3QuZ2V0RGlyZWN0b3J5KCdzYXZlZCcsIGNyZWF0ZV9pZl9ub3RfZm91bmQsIGFib3J0YWJsZShmdW5jdGlvbiAoZGlyKSB7XG4gICAgICAgIHZhciBzYXZlID0gZnVuY3Rpb24gc2F2ZSgpIHtcbiAgICAgICAgICBkaXIuZ2V0RmlsZShuYW1lLCBjcmVhdGVfaWZfbm90X2ZvdW5kLCBhYm9ydGFibGUoZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgICAgIGZpbGUuY3JlYXRlV3JpdGVyKGFib3J0YWJsZShmdW5jdGlvbiAod3JpdGVyKSB7XG4gICAgICAgICAgICAgIHdyaXRlci5vbndyaXRlZW5kID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IGZpbGUudG9VUkwoKTtcbiAgICAgICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGZpbGVzYXZlciwgJ3dyaXRlZW5kJywgZXZlbnQpO1xuICAgICAgICAgICAgICAgIHJldm9rZShmaWxlKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgd3JpdGVyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gd3JpdGVyLmVycm9yO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlICE9PSBlcnJvci5BQk9SVF9FUlIpIHtcbiAgICAgICAgICAgICAgICAgIGZzX2Vycm9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAnd3JpdGVzdGFydCBwcm9ncmVzcyB3cml0ZSBhYm9ydCcuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHdyaXRlclsnb24nICsgZXZlbnRdID0gZmlsZXNhdmVyWydvbicgKyBldmVudF07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB3cml0ZXIud3JpdGUoYmxvYik7XG4gICAgICAgICAgICAgIGZpbGVzYXZlci5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3cml0ZXIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5XUklUSU5HO1xuICAgICAgICAgICAgfSksIGZzX2Vycm9yKTtcbiAgICAgICAgICB9KSwgZnNfZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBkaXIuZ2V0RmlsZShuYW1lLCB7IGNyZWF0ZTogZmFsc2UgfSwgYWJvcnRhYmxlKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgICAgLy8gZGVsZXRlIGZpbGUgaWYgaXQgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgICAgIHNhdmUoKTtcbiAgICAgICAgfSksIGFib3J0YWJsZShmdW5jdGlvbiAoZXgpIHtcbiAgICAgICAgICBpZiAoZXguY29kZSA9PT0gZXguTk9UX0ZPVU5EX0VSUikge1xuICAgICAgICAgICAgc2F2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmc19lcnJvcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSksIGZzX2Vycm9yKTtcbiAgICB9KSwgZnNfZXJyb3IpO1xuICB9O1xuXG4gIHZhciBGU19wcm90byA9IEZpbGVTYXZlci5wcm90b3R5cGU7XG4gIHZhciBzYXZlQXMgPSBmdW5jdGlvbiBzYXZlQXMoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcbiAgICByZXR1cm4gbmV3IEZpbGVTYXZlcihibG9iLCBuYW1lLCBub19hdXRvX2JvbSk7XG4gIH07XG5cbiAgLy8gSUUgMTArIChuYXRpdmUgc2F2ZUFzKVxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG4gICAgICBpZiAoIW5vX2F1dG9fYm9tKSBibG9iID0gYXV0b19ib20oYmxvYik7XG4gICAgICByZXR1cm4gbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoYmxvYiwgbmFtZSB8fCAnZG93bmxvYWQnKTtcbiAgICB9O1xuICB9XG5cbiAgRlNfcHJvdG8uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpbGVzYXZlciA9IHRoaXM7XG4gICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICBkaXNwYXRjaChmaWxlc2F2ZXIsICdhYm9ydCcpO1xuICB9O1xuICBGU19wcm90by5yZWFkeVN0YXRlID0gRlNfcHJvdG8uSU5JVCA9IDA7XG4gIEZTX3Byb3RvLldSSVRJTkcgPSAxO1xuICBGU19wcm90by5ET05FID0gMjtcblxuICBGU19wcm90by5lcnJvciA9IEZTX3Byb3RvLm9ud3JpdGVzdGFydCA9IEZTX3Byb3RvLm9ucHJvZ3Jlc3MgPSBGU19wcm90by5vbndyaXRlID0gRlNfcHJvdG8ub25hYm9ydCA9IEZTX3Byb3RvLm9uZXJyb3IgPSBGU19wcm90by5vbndyaXRlZW5kID0gbnVsbDtcblxuICByZXR1cm4gc2F2ZUFzO1xufSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiB8fCB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgfHwgdW5kZWZpbmVkLmNvbnRlbnQpO1xuLy8gYHNlbGZgIGlzIHVuZGVmaW5lZCBpbiBGaXJlZm94IGZvciBBbmRyb2lkIGNvbnRlbnQgc2NyaXB0IGNvbnRleHRcbi8vIHdoaWxlIGB0aGlzYCBpcyBuc0lDb250ZW50RnJhbWVNZXNzYWdlTWFuYWdlclxuLy8gd2l0aCBhbiBhdHRyaWJ1dGUgYGNvbnRlbnRgIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHdpbmRvd1xuXG5leHBvcnRzLmRlZmF1bHQgPSBzYXZlQXM7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAncmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzJ1xuaW1wb3J0IHsgdGVzdEJvb2ttYXJrIH0gZnJvbSAnLi9ib29rbWFyaydcbmltcG9ydCB7IGFkZEltcG9ydEhhbmRsZXJzIH0gZnJvbSAnLi4vY29tbW9uL2ltcG9ydCdcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9zdG9yYWdlJ1xuaW1wb3J0IHsgdXJsUmVuZGVyZXIgfSBmcm9tICcuLi9jb21tb24vdXJscydcbmltcG9ydCB7IHNvdXJjZVJlbmRlcmVyIH0gZnJvbSAnLi4vY29tbW9uL3NvdXJjZXMnXG5pbXBvcnQgeyB1cGRhdGVQcm9ncmVzcyB9IGZyb20gJy4uL2NvbW1vbi9wcm9ncmVzcy1iYXInXG5pbXBvcnQgeyBjcmVhdGVTY2hlZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9zY2hlZHVsZSdcbmltcG9ydCB7IHJlZ2lzdGVyTWVudUxpc3RlbmVycyB9IGZyb20gJy4uL2NvbW1vbi9tZW51J1xuaW1wb3J0IHsgYWRkU2V0dGluZ3NIYW5kbGVycywgZ2V0TGlua0hlbHBlcnMgfSBmcm9tICcuLi9jb21tb24vc2V0dGluZ3MnXG5pbXBvcnQgeyBBUEkgfSBmcm9tICcuLi9jb21tb24vYXBpJ1xuXG5jb25zdCBhcGkgPSBBUEkoJ2h0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20nKVxuXG5kYi51cmxzLnNldE1heE9sZCgxMDApXG5cbmNvbnN0IExpbmtzID0gZ2V0TGlua0hlbHBlcnMoZGIsIGFwaSlcbmNvbnN0IFVybHMgPSB1cmxSZW5kZXJlcihkYilcbmNvbnN0IFNvdXJjZXMgPSBzb3VyY2VSZW5kZXJlcihkYilcblxuZGIub25DaGFuZ2UoKGNoYW5nZXMpID0+IHtcbiAgICBpZiAoWydoaWRlJywgJ2hpZGRlbkNoYXB0ZXJzJywgJ3VybHMnXS5zb21lKGNoYW5nZXMuaGFzT3duUHJvcGVydHkuYmluZChjaGFuZ2VzKSkpIHtcbiAgICAgICAgVXJscy5yZW5kZXIoKVxuICAgIH1cbiAgICBpZiAoT2JqZWN0LmtleXMoY2hhbmdlcykuc29tZSgoY2hhbmdlKSA9PiBjaGFuZ2UuaW5jbHVkZXMoJ3NvdXJjZXMnKSkgfHwgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNoYW5nZXMsICdtYXhPbGQnKSkge1xuICAgICAgICBTb3VyY2VzLnJlbmRlcigpXG4gICAgfVxuICAgIExpbmtzLnB1c2hMaW5rVXBkYXRlKGNoYW5nZXMpXG59KVxuXG5uYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5jb250cm9sbGVyLnBvc3RNZXNzYWdlKCdGRVRDSF9DSEFQVEVSUycpXG5cbmNyZWF0ZVNjaGVkdWxlKHtcbiAgICBjYWxsYmFjazogKCkgPT4gbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuY29udHJvbGxlci5wb3N0TWVzc2FnZSgnRkVUQ0hfQ0hBUFRFUlMnKSxcbiAgICBpbnRlcnZhbDogMzAgKiAxMDAwLFxuICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgIHVwZGF0ZXI6IHVwZGF0ZVByb2dyZXNzXG59KVxuXG5hZGRJbXBvcnRIYW5kbGVycyhkYilcbmFkZFNldHRpbmdzSGFuZGxlcnMoZGIsIGFwaSlcbnJlZ2lzdGVyTWVudUxpc3RlbmVycyhkYilcblxuVXJscy5yZW5kZXIoKVxuU291cmNlcy5yZW5kZXIoKVxuICAgIC50aGVuKHRlc3RCb29rbWFyaylcbiJdLCJzb3VyY2VSb290IjoiIn0=