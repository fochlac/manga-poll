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
      var sources, hiddenChapters, hide;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              sources = _ref.sources, hiddenChapters = _ref.hiddenChapters, hide = _ref.hide;
              _context17.next = 3;
              return Promise.all([writeSources(sources), write(NAMESPACES.SYNC, {
                hiddenChapters: JSON.stringify(hiddenChapters),
                hide: hide
              })]);

            case 3:
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
  settings.addEventListener('click', function () {
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
var progress = document.querySelector('#progress');
var locked = false;
var resisterProgressHandler = function resisterProgressHandler(updateNow) {
  progress.addEventListener('click', function () {
    updateNow();
    progress.innerHTML = '(refreshed!)';
    locked = true;
    setTimeout(function () {
      locked = false;
    }, 1500);
  });
};
var updateProgress = function updateProgress(_lastPing, nextPing) {
  if (!locked) {
    var remaining = nextPing - Date.now();
    var seconds = Math.max(Math.round(remaining / 1000), 0);
    progress.innerHTML = "(next refresh: ".concat(seconds, "s)");
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
    var Link, createLink, linkNumberText, linkingSection, unlinkSection, unlinkButton, linkButton, linkInput1, linkInput2, linkInput3, writeStateToDom, link;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            writeStateToDom = function _writeStateToDom(link) {
              linkingSection.style.display = link ? 'none' : '';
              unlinkSection.style.display = link ? '' : 'none';
              linkNumberText.innerText = link ? "".concat(link.key.slice(0, 5), "-").concat(link.key.slice(5, 10), "-").concat(link.key.slice(10)) : 'Unlinked';
              linkNumberText.style.color = link ? '#000c21' : '#c3cbd2';
            };

            Link = api.Link;
            createLink = document.getElementById('new-link-button');
            linkNumberText = document.getElementById('link-id');
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
            _context6.next = 16;
            return db.link.read();

          case 16:
            link = _context6.sent;
            writeStateToDom(link);
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
                        _context3.next = 15;
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
                        _context3.next = 15;
                        break;
                      }

                      _link = newLinkResult.payload;
                      _context3.next = 14;
                      return db.link.set(_link);

                    case 14:
                      writeStateToDom(_link, true);

                    case 15:
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
                        _context4.next = 7;
                        break;
                      }

                      _context4.next = 6;
                      return db.link.set(null);

                    case 6:
                      writeStateToDom(undefined, true);

                    case 7:
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
                        _context5.next = 18;
                        break;
                      }

                      key = "".concat(linkInput1.value).concat(linkInput2.value).concat(linkInput3.value);
                      _context5.next = 7;
                      return Link.read(key);

                    case 7:
                      linkResult = _context5.sent;

                      if (!(linkResult !== null && linkResult !== void 0 && linkResult.valid)) {
                        _context5.next = 18;
                        break;
                      }

                      _link2 = linkResult.payload;
                      _context5.next = 12;
                      return db.link.set(_link2);

                    case 12:
                      _context5.next = 14;
                      return db.link.setLocal(_link2);

                    case 14:
                      writeStateToDom(_link2, true);
                      linkInput1.value = '';
                      linkInput2.value = '';
                      linkInput3.value = '';

                    case 18:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            })));

          case 21:
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
var interval = (0,_common_schedule__WEBPACK_IMPORTED_MODULE_7__.createSchedule)({
  callback: function callback() {
    return navigator.serviceWorker.controller.postMessage('FETCH_CHAPTERS');
  },
  interval: 30 * 1000,
  isActive: true,
  updater: _common_progress_bar__WEBPACK_IMPORTED_MODULE_6__.updateProgress
});
(0,_common_progress_bar__WEBPACK_IMPORTED_MODULE_6__.resisterProgressHandler)(function () {
  return interval.triggerInstantly();
});
(0,_common_import__WEBPACK_IMPORTED_MODULE_2__.addImportHandlers)(_storage__WEBPACK_IMPORTED_MODULE_3__.db);
(0,_common_settings__WEBPACK_IMPORTED_MODULE_9__.addSettingsHandlers)(_storage__WEBPACK_IMPORTED_MODULE_3__.db, api);
(0,_common_menu__WEBPACK_IMPORTED_MODULE_8__.registerMenuListeners)(_storage__WEBPACK_IMPORTED_MODULE_3__.db);
Urls.render();
Sources.render().then(_bookmark__WEBPACK_IMPORTED_MODULE_1__.testBookmark);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2RiLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vaW1wb3J0LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vbWVudS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3Byb2dyZXNzLWJhci5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3NjaGVkdWxlLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9zb3VyY2VzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vdXJscy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3V0aWxzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9leHRlbnNpb24vYm9va21hcmsuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9zdG9yYWdlLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vbm9kZV9tb2R1bGVzL3NhdmUtYXMvbGliL2luZGV4LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL3BvcHVwLmpzIl0sIm5hbWVzIjpbIkFQSSIsImJhc2VVcmwiLCJwb3N0U291cmNlIiwic291cmNlIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJBY2NlcHQiLCJ0aGVuIiwicmVzIiwianNvbiIsImNhdGNoIiwiZXJyb3IiLCJ2YWxpZCIsImRhdGEiLCJwYXlsb2FkIiwiYWRkU291cmNlRnJvbVVybCIsInVybCIsInJlYWRVcmxzIiwic291cmNlcyIsImxpbWl0IiwiZGF0ZSIsImFkZFN1YnNjcmlwdGlvbnMiLCJ0b3BpY3MiLCJrZXkiLCJkZWxldGVTdWJzY3JpcHRpb25zIiwicmVhZExpbmsiLCJjaGFuZ2VkU2luY2UiLCJzdGF0dXMiLCJ1cGRhdGVMaW5rIiwidXBkYXRlU2V0IiwiY3JlYXRlTGluayIsImluaXRTZXQiLCJVcmxzIiwicmVhZCIsIlNvdXJjZSIsImluc2VydCIsImZyb21VcmwiLCJTdWJzY3JpcHRpb24iLCJzdWJzY3JpYmUiLCJ1bnN1YnNjcmliZSIsIkxpbmsiLCJ1cGRhdGUiLCJOQU1FU1BBQ0VTIiwiU1lOQyIsIkxPQ0FMIiwiY3JlYXRlREIiLCJzdG9yYWdlIiwid3JpdGUiLCJyZWFkU291cmNlcyIsInJlZ2lzdHJ5IiwicGFyc2UiLCJyZWR1Y2UiLCJQcm9taXNlIiwiYWxsIiwiY29uY2F0IiwicmVzb2x2ZSIsIndyaXRlU291cmNlcyIsInVwZGF0ZXMiLCJ4IiwiTWF0aCIsIm1heCIsImNlaWwiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJhZGRTb3VyY2UiLCJzb21lIiwibWFuZ2FJZCIsImRlbGV0ZVNvdXJjZSIsInNvdXJjZUlkIiwibmV3U291cmNlcyIsImZpbHRlciIsImlkIiwiaXNEaXJ0eSIsInVybHMiLCJnZXRGaWx0ZXJlZFNvcnRlZFVybHMiLCJoaWRkZW5DaGFwdGVycyIsImhpZGUiLCJoaWRkZW5DaGFwdGVyc1N0cmluZyIsInVybExpc3QiLCJjaGVja09sZCIsImNoYXB0ZXIiLCJjcmVhdGVkIiwiT2JqZWN0IiwidmFsdWVzIiwic29ydCIsInVybDEiLCJ1cmwyIiwiZGlmZiIsImFicyIsIlN0cmluZyIsImxvY2FsZUNvbXBhcmUiLCJvbGRVcmxzIiwibmV3VXJscyIsImhpZGVVcmwiLCJyZXN1bHQiLCJoaWRlQWxsVXJscyIsInRpbWVzdGFtcCIsIndyaXRlVXJscyIsImluaXQiLCJ0b2RheSIsIkRhdGUiLCJzZXRIb3VycyIsImdldFRpbWUiLCJzZXRNYXhPbGQiLCJtYXhPbGQiLCJnZXRNYXhPbGQiLCJzZXRMaW5rIiwibGluayIsImdldExpbmsiLCJnZXRIaWRlIiwid3JpdGVMb2NhbFNldHRpbmdzIiwic2V0dGluZ3MiLCJsb2NhbFNldHRpbmdzIiwiZ2V0TG9jYWxTZXR0aW5ncyIsImdldExpbmtEYXRhIiwibWFwIiwiTnVtYmVyIiwic2V0TGlua0RhdGEiLCJpbXBvcnQiLCJhZGQiLCJkZWxldGUiLCJsb2NhbCIsInNldCIsImhpZGVBbGwiLCJvbkNoYW5nZSIsImFkZExpc3RlbmVyIiwic2V0TG9jYWwiLCJhZGRJbXBvcnRIYW5kbGVycyIsImRiIiwiaW1wb3J0RWxlbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJleHBvcnRFbGVtIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJmaWxlIiwidGFyZ2V0IiwiZmlsZXMiLCJmciIsIkZpbGVSZWFkZXIiLCJjbGVhbiIsInRpdGxlIiwicmVhZEFzVGV4dCIsImJsb2IiLCJCbG9iIiwidHlwZSIsInNhdmVBcyIsInJlZ2lzdGVyTWVudUxpc3RlbmVycyIsImltcG9ydFNlY3Rpb24iLCJxdWVyeVNlbGVjdG9yIiwicG9wdXBUaXRsZSIsImJvb2ttYXJrcyIsImNoYXB0ZXJzIiwiYWRkU2VjdGlvbiIsInNldHRpbmdzU2VjdGlvbiIsInByb2dyZXNzIiwib3BlbkNoYXB0ZXJzIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5uZXJUZXh0IiwibG9ja2VkIiwicmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIiLCJ1cGRhdGVOb3ciLCJpbm5lckhUTUwiLCJzZXRUaW1lb3V0IiwidXBkYXRlUHJvZ3Jlc3MiLCJfbGFzdFBpbmciLCJuZXh0UGluZyIsInJlbWFpbmluZyIsIm5vdyIsInNlY29uZHMiLCJyb3VuZCIsImNyZWF0ZVNjaGVkdWxlIiwiaXNBY3RpdmUiLCJpbnRlcnZhbCIsImNhbGxiYWNrIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJ1cGRhdGVyIiwibGFzdFBpbmciLCJjYWxsQ2FsbGJhY2siLCJ0aW1lciIsInNldEludGVydmFsIiwibmV3SW50ZXJ2YWwiLCJFcnJvciIsInNldENhbGxiYWNrIiwiY2IiLCJzdGFydCIsInRyaWdnZXJJbnN0YW50bHkiLCJzdG9wIiwiY2xlYXJJbnRlcnZhbCIsImxpbmtGaWVsZHMiLCJnZXRMaW5rSGVscGVycyIsIkFwaSIsInB1c2hMaW5rVXBkYXRlIiwiY2hhbmdlcyIsImNoYW5nZXNldCIsImtleXMiLCJjaGFuZ2UiLCJpbmNsdWRlcyIsImZldGNoTGlua1VwZGF0ZSIsImxhc3RNb2RpZmllZCIsImFkZFNldHRpbmdzSGFuZGxlcnMiLCJhcGkiLCJ3cml0ZVN0YXRlVG9Eb20iLCJsaW5raW5nU2VjdGlvbiIsInVubGlua1NlY3Rpb24iLCJsaW5rTnVtYmVyVGV4dCIsImNvbG9yIiwidW5saW5rQnV0dG9uIiwibGlua0J1dHRvbiIsImxpbmtJbnB1dDEiLCJsaW5rSW5wdXQyIiwibGlua0lucHV0MyIsIm51bWJlciIsInZhbHVlIiwicmVwbGFjZUFsbCIsImZvY3VzIiwic2V0U2VsZWN0aW9uUmFuZ2UiLCJsaW5rRGF0YSIsIm5ld0xpbmtSZXN1bHQiLCJ1bmRlZmluZWQiLCJsaW5rUmVzdWx0Iiwic291cmNlUmVuZGVyZXIiLCJldmVudCIsImNsb3Nlc3QiLCJkYXRhc2V0IiwiY29udGFpbnMiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJyZW5kZXJTb3VyY2VzIiwic291cmNlMSIsInNvdXJjZTIiLCJyZXBsYWNlIiwiam9pbiIsInJlbmRlciIsInVybFJlbmRlcmVyIiwibGF0ZXN0Q2hhcHRlckRhdGUiLCJsY2QiLCJjbG9zZXN0SGlkZSIsImNsb3Nlc3RMaW5rIiwicHJldmVudERlZmF1bHQiLCJ3aW5kb3ciLCJvcGVuIiwiaHJlZiIsImNsb3Nlc3RNb3JlIiwidG9wIiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsIm1heFNjcm9sbCIsInNjcm9sbEhlaWdodCIsIm9mZnNldEhlaWdodCIsInNjcm9sbFRvcCIsImNoZWNrVG9wQnV0dG9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY3JlYXRlVXJsUmVuZGVyZXIiLCJpc09sZCIsIm1hdGNoIiwidGltZVN0cmluZyIsInBhZCIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImRhdGVTdHJpbmciLCJnZXREYXRlIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsImZ1bGxEYXRlIiwidG9JU09TdHJpbmciLCJzcGxpdCIsInJlbmRlclVybHMiLCJuZXdSb3dzIiwib2xkUm93cyIsInN0cmluZyIsImZhbGxiYWNrIiwibm8iLCJjdXJyZW50U291cmNlIiwiYm9va21hcmsiLCJib29rbWFya1RyYWNrIiwiYm9va21hcmtUaXRsZSIsInRlc3RCb29rbWFyayIsImNocm9tZSIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsIndpbmRvd0lkIiwid2luZG93cyIsIldJTkRPV19JRF9DVVJSRU5UIiwic2NyaXB0aW5nIiwiZXhlY3V0ZVNjcmlwdCIsInRhYklkIiwiZnVuY3Rpb24iLCJ0ZXN0IiwiaWRzIiwibWFuZ2EiLCJtYW5nYV9pZCIsImlkMSIsImlkMiIsInRpdGxlcyIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzY3JpcHQiLCJoZWFkbGluZSIsImZpbmQiLCJoIiwidGl0bGUxIiwidGl0bGUyIiwicnVudGltZSIsInNlbmRNZXNzYWdlIiwibG9jYXRpb24iLCJvcmlnaW4iLCJvbk1lc3NhZ2UiLCJyZXF1ZXN0IiwibmFtZXNwYWNlIiwiZ2V0Iiwia2V5UGFpcnMiLCJvbkNoYW5nZWQiLCJMaW5rcyIsIlNvdXJjZXMiLCJoYXNPd25Qcm9wZXJ0eSIsImJpbmQiLCJjYWxsIiwibmF2aWdhdG9yIiwic2VydmljZVdvcmtlciIsImNvbnRyb2xsZXIiLCJwb3N0TWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTyxJQUFNQSxHQUFHLEdBQUcsU0FBTkEsR0FBTSxHQUFrQjtBQUFBLE1BQWpCQyxPQUFpQix1RUFBUCxFQUFPOztBQUNqQyxXQUFTQyxVQUFULENBQXFCQyxNQUFyQixFQUE2QjtBQUN6QixXQUFPQyxLQUFLLFdBQUlILE9BQUosbUJBQTJCO0FBQ25DSSxZQUFNLEVBQUUsTUFEMkI7QUFFbkNDLFVBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVMLE1BQWYsQ0FGNkI7QUFHbkNNLGFBQU8sRUFBRTtBQUNMQyxjQUFNLEVBQUUsa0JBREg7QUFFTCx3QkFBZ0I7QUFGWDtBQUgwQixLQUEzQixDQUFMLENBUUZDLElBUkUsQ0FRRyxVQUFDQyxHQUFEO0FBQUEsYUFBU0EsR0FBRyxDQUFDQyxJQUFKLEVBQVQ7QUFBQSxLQVJILEVBU0ZDLEtBVEUsQ0FTSSxVQUFDQyxLQUFEO0FBQUEsYUFBWTtBQUFFQyxhQUFLLEVBQUUsS0FBVDtBQUFnQkQsYUFBSyxFQUFMQTtBQUFoQixPQUFaO0FBQUEsS0FUSixFQVVGSixJQVZFLENBVUcsVUFBQ00sSUFBRDtBQUFBLGFBQVVBLElBQUksQ0FBQ0MsT0FBZjtBQUFBLEtBVkgsQ0FBUDtBQVdIOztBQUVELFdBQVNDLGdCQUFULENBQTJCQyxHQUEzQixFQUFnQztBQUM1QixXQUFPaEIsS0FBSyxXQUFJSCxPQUFKLDhCQUFzQztBQUM5Q0ksWUFBTSxFQUFFLE1B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O0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUU7QUFBQSxXQUFNbUosU0FBUyxDQUFDQyxhQUFWLENBQXdCQyxVQUF4QixDQUFtQ0MsV0FBbkMsQ0FBK0MsZ0JBQS9DLENBQU47QUFBQSxHQURrQjtBQUU1QnZKLFVBQVEsRUFBRSxLQUFLLElBRmE7QUFHNUJELFVBQVEsRUFBRSxJQUhrQjtBQUk1QkssU0FBTyxFQUFFYixnRUFBY0E7QUFKSyxDQUFELENBQS9CO0FBT0FKLDZFQUF1QixDQUFDO0FBQUEsU0FBTWEsUUFBUSxDQUFDYyxnQkFBVCxFQUFOO0FBQUEsQ0FBRCxDQUF2QjtBQUNBN0QsaUVBQWlCLENBQUNDLHdDQUFELENBQWpCO0FBQ0EwRSxxRUFBbUIsQ0FBQzFFLHdDQUFELEVBQUsyRSxHQUFMLENBQW5CO0FBQ0F4RCxtRUFBcUIsQ0FBQ25CLHdDQUFELENBQXJCO0FBRUFqRyxJQUFJLENBQUM0TSxNQUFMO0FBQ0FtRixPQUFPLENBQUNuRixNQUFSLEdBQ0tyTyxJQURMLENBQ1VpUixtREFEVixFIiwiZmlsZSI6ImV4dGVuc2lvbi9wb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUEkgPSAoYmFzZVVybCA9ICcnKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBwb3N0U291cmNlIChzb3VyY2UpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3NvdXJjZXNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzb3VyY2UpLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLnBheWxvYWQpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkU291cmNlRnJvbVVybCAodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9zb3VyY2VzL2FkZEZyb21VcmxgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHVybCB9KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWRVcmxzIChzb3VyY2VzID0gW10sIGxpbWl0ID0gJycsIGRhdGUgPSAnJykge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcclxuICAgICAgICAgICAgYCR7YmFzZVVybH0vYXBpL3VybHMvZmV0Y2hgLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXRcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEucGF5bG9hZCB8fCBbXSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRTdWJzY3JpcHRpb25zICh0b3BpY3MgPSBbXSwga2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9zdWJzY3JpcHRpb25zYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdG9waWNzLFxyXG4gICAgICAgICAgICAgICAga2V5OiBrZXlcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWxldGVTdWJzY3JpcHRpb25zICh0b3BpY3MgPSBbXSwga2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9zdWJzY3JpcHRpb25zYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB0b3BpY3MsXHJcbiAgICAgICAgICAgICAgICBrZXk6IGtleVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWRMaW5rIChrZXksIGNoYW5nZWRTaW5jZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvbGlua3MvJHtrZXl9JHtjaGFuZ2VkU2luY2UgPyBgP2NoYW5nZWRTaW5jZT0ke2NoYW5nZWRTaW5jZX1gIDogJyd9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5zdGF0dXMgPT09IDMwNCA/ICh7IHZhbGlkOiB0cnVlLCBwYXlsb2FkOiBudWxsIH0pIDogcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVMaW5rIChrZXksIHVwZGF0ZVNldCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvbGlua3MvJHtrZXl9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwdXQnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1cGRhdGVTZXQpLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTGluayAoaW5pdFNldCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvbGlua3NgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpbml0U2V0KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgVXJsczoge1xyXG4gICAgICAgICAgICByZWFkOiByZWFkVXJsc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU291cmNlOiB7XHJcbiAgICAgICAgICAgIGluc2VydDogcG9zdFNvdXJjZSxcclxuICAgICAgICAgICAgZnJvbVVybDogYWRkU291cmNlRnJvbVVybFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU3Vic2NyaXB0aW9uOiB7XHJcbiAgICAgICAgICAgIHN1YnNjcmliZTogYWRkU3Vic2NyaXB0aW9ucyxcclxuICAgICAgICAgICAgdW5zdWJzY3JpYmU6IGRlbGV0ZVN1YnNjcmlwdGlvbnNcclxuICAgICAgICB9LFxyXG4gICAgICAgIExpbms6IHtcclxuICAgICAgICAgICAgaW5zZXJ0OiBjcmVhdGVMaW5rLFxyXG4gICAgICAgICAgICB1cGRhdGU6IHVwZGF0ZUxpbmssXHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRMaW5rXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IHBhcnNlIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmNvbnN0IE5BTUVTUEFDRVMgPSB7XHJcbiAgICBTWU5DOiAnc3luYycsXHJcbiAgICBMT0NBTDogJ2xvY2FsJ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlREIgKHN0b3JhZ2UpIHtcclxuICAgIGNvbnN0IHsgcmVhZCwgd3JpdGUgfSA9IHN0b3JhZ2VcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiByZWFkU291cmNlcyAoKSB7XHJcbiAgICAgICAgY29uc3QgeyByZWdpc3RyeSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgcmVnaXN0cnk6ICdbXCJzb3VyY2VzLTFcIl0nIH0pXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlKHJlZ2lzdHJ5LCBbJ3NvdXJjZXMtMSddKVxyXG4gICAgICAgICAgICAucmVkdWNlKChzb3VyY2VzLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbc291cmNlcywgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgW2tleV06ICdbXScgfSldKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChbc291cmNlcywgc291cmNlXSkgPT4gc291cmNlcy5jb25jYXQocGFyc2Uoc291cmNlW2tleV0sIFtdKSkpXHJcbiAgICAgICAgICAgIH0sIFByb21pc2UucmVzb2x2ZShbXSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd3JpdGVTb3VyY2VzIChzb3VyY2VzKSB7XHJcbiAgICAgICAgY29uc3QgcmVnaXN0cnkgPSBbXVxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZXMgPSB7fVxyXG4gICAgICAgIGZvciAobGV0IHggPSAxOyB4IDw9IE1hdGgubWF4KDEsIE1hdGguY2VpbChzb3VyY2VzLmxlbmd0aCAvIDIwKSk7IHgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgc291cmNlcy0ke3h9YFxyXG4gICAgICAgICAgICByZWdpc3RyeS5wdXNoKGtleSlcclxuICAgICAgICAgICAgdXBkYXRlc1trZXldID0gSlNPTi5zdHJpbmdpZnkoc291cmNlcy5zbGljZSgoeCAtIDEpICogMjAsIHggKiAyMCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVwZGF0ZXMucmVnaXN0cnkgPSBKU09OLnN0cmluZ2lmeShyZWdpc3RyeSlcclxuICAgICAgICByZXR1cm4gd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB1cGRhdGVzKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGFkZFNvdXJjZSAoc291cmNlKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IHJlYWRTb3VyY2VzKClcclxuICAgICAgICBpZiAoIXNvdXJjZXMuc29tZSgoe3VybCwgbWFuZ2FJZH0pID0+IHNvdXJjZS51cmwgPT09IHVybCAmJiBtYW5nYUlkID09PSBzb3VyY2UubWFuZ2FJZCkpIHtcclxuICAgICAgICAgICAgc291cmNlcy5wdXNoKHNvdXJjZSlcclxuICAgICAgICAgICAgYXdhaXQgd3JpdGVTb3VyY2VzKHNvdXJjZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzb3VyY2VzXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZGVsZXRlU291cmNlIChzb3VyY2VJZCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCByZWFkU291cmNlcygpXHJcbiAgICAgICAgY29uc3QgbmV3U291cmNlcyA9IHNvdXJjZXMuZmlsdGVyKChzb3VyY2UpID0+IHNvdXJjZT8uaWQgIT09IHNvdXJjZUlkKVxyXG4gICAgICAgIGF3YWl0IHdyaXRlU291cmNlcyhuZXdTb3VyY2VzKVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3U291cmNlc1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGlzRGlydHkgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgdXJscywgc291cmNlcyB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLkxPQ0FMLCBbJ3VybHMnLCAnc291cmNlcyddKVxyXG5cclxuICAgICAgICByZXR1cm4gISF1cmxzIHx8ICEhc291cmNlc1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEZpbHRlcmVkU29ydGVkVXJscyAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBoaWRkZW5DaGFwdGVyczogaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIGhpZGUgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nLCBoaWRlOiAwIH0pXHJcbiAgICAgICAgY29uc3QgeyB1cmxzIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIHsgdXJsczogJ1tdJyB9KVxyXG5cclxuICAgICAgICBjb25zdCBoaWRkZW5DaGFwdGVycyA9IHBhcnNlKGhpZGRlbkNoYXB0ZXJzU3RyaW5nLCB7fSlcclxuICAgICAgICBjb25zdCB1cmxMaXN0ID0gcGFyc2UodXJscywgW10pXHJcblxyXG4gICAgICAgIGNvbnN0IGNoZWNrT2xkID0gKGNoYXB0ZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhpZGUgJiYgY2hhcHRlci5jcmVhdGVkIDwgaGlkZSB8fCBoaWRkZW5DaGFwdGVyc1tjaGFwdGVyLmlkXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IFtvbGRVcmxzLCBuZXdVcmxzXSA9IE9iamVjdC52YWx1ZXModXJsTGlzdClcclxuICAgICAgICAgICAgLnNvcnQoKHVybDEsIHVybDIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpZmYgPSB1cmwyLmNyZWF0ZWQgLSB1cmwxLmNyZWF0ZWRcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaWZmKSA8IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcodXJsMSkubG9jYWxlQ29tcGFyZSh1cmwyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpZmZcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoW29sZFVybHMsIG5ld1VybHNdLCB1cmwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja09sZCh1cmwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2xkVXJscy5wdXNoKHVybClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1VybHMucHVzaCh1cmwpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW29sZFVybHMsIG5ld1VybHNdXHJcbiAgICAgICAgICAgIH0sIFtbXSwgW11dKVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBvbGRVcmxzLFxyXG4gICAgICAgICAgICBuZXdVcmxzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGhpZGVVcmwgKGlkKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScgfSlcclxuICAgICAgICBjb25zdCBoaWRkZW5DaGFwdGVycyA9IHBhcnNlKHJlc3VsdC5oaWRkZW5DaGFwdGVycywge30pXHJcbiAgICAgICAgaGlkZGVuQ2hhcHRlcnNbaWRdID0gdHJ1ZVxyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6IEpTT04uc3RyaW5naWZ5KGhpZGRlbkNoYXB0ZXJzKSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGhpZGVBbGxVcmxzICh0aW1lc3RhbXApIHtcclxuICAgICAgICByZXR1cm4gd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nLCBoaWRlOiB0aW1lc3RhbXAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3cml0ZVVybHMgKHVybHMpIHtcclxuICAgICAgICByZXR1cm4gd3JpdGUoTkFNRVNQQUNFUy5MT0NBTCwgeyB1cmxzOiBKU09OLnN0cmluZ2lmeSh1cmxzKSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGluaXQgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZTogZmFsc2UgfSlcclxuICAgICAgICBpZiAoIWhpZGUpIHtcclxuICAgICAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApXHJcbiAgICAgICAgICAgIGF3YWl0IHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRlOiB0b2RheS5nZXRUaW1lKCl9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBzZXRNYXhPbGQgKG1heE9sZCkge1xyXG4gICAgICAgIGF3YWl0IHdyaXRlKE5BTUVTUEFDRVMuTE9DQUwsIHsgbWF4T2xkIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TWF4T2xkICgpIHtcclxuICAgICAgICBjb25zdCB7IG1heE9sZCB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLkxPQ0FMLCB7IG1heE9sZDogMjUgfSlcclxuICAgICAgICByZXR1cm4gbWF4T2xkXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2V0TGluayAobGluaykge1xyXG4gICAgICAgIGF3YWl0IHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgeyBsaW5rIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TGluayAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBsaW5rIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgWydsaW5rJ10pXHJcbiAgICAgICAgcmV0dXJuIGxpbmtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRIaWRlICgpIHtcclxuICAgICAgICBjb25zdCB7IGhpZGUgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGU6IDAgfSlcclxuICAgICAgICByZXR1cm4gaGlkZVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHdyaXRlTG9jYWxTZXR0aW5ncyAoc2V0dGluZ3MpIHtcclxuICAgICAgICByZXR1cm4gd3JpdGUoTkFNRVNQQUNFUy5MT0NBTCwgeyBsb2NhbFNldHRpbmdzOiBKU09OLnN0cmluZ2lmeShzZXR0aW5ncykgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRMb2NhbFNldHRpbmdzICgpIHtcclxuICAgICAgICBjb25zdCB7IGxvY2FsU2V0dGluZ3MgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgeyBsb2NhbFNldHRpbmdzOiAne30nIH0pXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlKGxvY2FsU2V0dGluZ3MsIHt9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldExpbmtEYXRhICgpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgcmVhZFNvdXJjZXMoKVxyXG4gICAgICAgIGNvbnN0IHsgaGlkZGVuQ2hhcHRlcnM6IGhpZGRlbkNoYXB0ZXJzU3RyaW5nLCBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JywgaGlkZTogMCB9KVxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UoaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIHt9KVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzb3VyY2VzOiBzb3VyY2VzLm1hcCgoc291cmNlKSA9PiBzb3VyY2UuaWQpLFxyXG4gICAgICAgICAgICBoaWRkZW5DaGFwdGVycyxcclxuICAgICAgICAgICAgaGlkZTogTnVtYmVyKGhpZGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldExpbmtEYXRhICh7c291cmNlcywgaGlkZGVuQ2hhcHRlcnMsIGhpZGV9KSB7XHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB3cml0ZVNvdXJjZXMoc291cmNlcyksXHJcbiAgICAgICAgICAgIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywge1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuQ2hhcHRlcnM6IEpTT04uc3RyaW5naWZ5KGhpZGRlbkNoYXB0ZXJzKSxcclxuICAgICAgICAgICAgICAgIGhpZGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdKVxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc291cmNlczoge1xyXG4gICAgICAgICAgICByZWFkOiByZWFkU291cmNlcyxcclxuICAgICAgICAgICAgaW1wb3J0OiB3cml0ZVNvdXJjZXMsXHJcbiAgICAgICAgICAgIGFkZDogYWRkU291cmNlLFxyXG4gICAgICAgICAgICBkZWxldGU6IGRlbGV0ZVNvdXJjZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgbG9jYWw6IHtcclxuICAgICAgICAgICAgICAgIHJlYWQ6IGdldExvY2FsU2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICBzZXQ6IHdyaXRlTG9jYWxTZXR0aW5nc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0RpcnR5LFxyXG4gICAgICAgIHVybHM6IHtcclxuICAgICAgICAgICAgcmVhZDogZ2V0RmlsdGVyZWRTb3J0ZWRVcmxzLFxyXG4gICAgICAgICAgICBoaWRlOiBoaWRlVXJsLFxyXG4gICAgICAgICAgICBoaWRlQWxsOiBoaWRlQWxsVXJscyxcclxuICAgICAgICAgICAgaW1wb3J0OiB3cml0ZVVybHMsXHJcbiAgICAgICAgICAgIHNldE1heE9sZCxcclxuICAgICAgICAgICAgZ2V0TWF4T2xkLFxyXG4gICAgICAgICAgICBnZXRIaWRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNoYW5nZTogc3RvcmFnZS5hZGRMaXN0ZW5lcixcclxuICAgICAgICBsaW5rOiB7XHJcbiAgICAgICAgICAgIHNldDogc2V0TGluayxcclxuICAgICAgICAgICAgcmVhZDogZ2V0TGluayxcclxuICAgICAgICAgICAgbG9jYWw6IGdldExpbmtEYXRhLFxyXG4gICAgICAgICAgICBzZXRMb2NhbDogc2V0TGlua0RhdGFcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHNhdmVBcyBmcm9tICdzYXZlLWFzJ1xyXG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkSW1wb3J0SGFuZGxlcnMgKGRiKSB7XHJcbiAgICBjb25zdCBpbXBvcnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltcG9ydCcpXHJcbiAgICBjb25zdCBleHBvcnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4cG9ydCcpXHJcblxyXG4gICAgaW1wb3J0RWxlbS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlc1swXVxyXG4gICAgICAgIGNvbnN0IGZyID0gbmV3IEZpbGVSZWFkZXIoKVxyXG4gICAgICAgIGZyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZXMgPSBwYXJzZShmci5yZXN1bHQsIFtdKVxyXG4gICAgICAgICAgICBjb25zdCBjbGVhbiA9IHNvdXJjZXMuZmlsdGVyKChzb3VyY2UpID0+IHNvdXJjZT8udGl0bGUgJiYgc291cmNlLnVybCAmJiBzb3VyY2UubWFuZ2FJZClcclxuICAgICAgICAgICAgaWYgKGNsZWFuLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZGIuc291cmNlcy5pbXBvcnQoY2xlYW4pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW1wb3J0RWxlbS5maWxlcyA9IG51bGxcclxuICAgICAgICB9KVxyXG4gICAgICAgIGZyLnJlYWRBc1RleHQoZmlsZSlcclxuICAgIH0pXHJcblxyXG4gICAgZXhwb3J0RWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkYi5zb3VyY2VzLnJlYWQoKVxyXG4gICAgICAgICAgICAudGhlbigoc291cmNlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShzb3VyY2VzKV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pXHJcbiAgICAgICAgICAgICAgICBzYXZlQXMoYmxvYiwgJ21hbmdhcG9sbC5qc29uJylcclxuICAgICAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbiIsImV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1lbnVMaXN0ZW5lcnMgKCkge1xyXG4gICAgY29uc3QgaW1wb3J0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5pbXBvcnQnKVxyXG4gICAgY29uc3QgcG9wdXBUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cFRpdGxlJylcclxuICAgIGNvbnN0IGJvb2ttYXJrcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQnKVxyXG4gICAgY29uc3QgdXJscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmxzJylcclxuICAgIGNvbnN0IGNoYXB0ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXB0ZXJzJylcclxuICAgIGNvbnN0IGFkZFNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkU2VjdGlvbicpXHJcbiAgICBjb25zdCBzb3VyY2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZXMnKVxyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0dGluZ3MnKVxyXG4gICAgY29uc3Qgc2V0dGluZ3NTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzJylcclxuICAgIGNvbnN0IHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2dyZXNzJylcclxuXHJcbiAgICBjb25zdCBvcGVuQ2hhcHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgICAgc291cmNlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB1cmxzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHByb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIGNoYXB0ZXJzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBib29rbWFya3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgcG9wdXBUaXRsZS5pbm5lclRleHQgPSAnQ2hhcHRlcnMnXHJcbiAgICB9XHJcblxyXG4gICAgY2hhcHRlcnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuQ2hhcHRlcnMpXHJcblxyXG4gICAgYm9va21hcmtzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHNvdXJjZXMuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgICAgICBpbXBvcnRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICBhZGRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHByb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB1cmxzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwb3B1cFRpdGxlLmlubmVyVGV4dCA9ICdCb29rbWFya3MnXHJcbiAgICAgICAgYm9va21hcmtzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBjaGFwdGVycy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgIH0pXHJcblxyXG4gICAgc2V0dGluZ3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgc291cmNlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICB1cmxzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwb3B1cFRpdGxlLmlubmVyVGV4dCA9ICdTZXR0aW5ncydcclxuICAgICAgICBib29rbWFya3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgY2hhcHRlcnMuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgfSlcclxuXHJcbiAgICBvcGVuQ2hhcHRlcnMoKVxyXG59XHJcbiIsImNvbnN0IHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2dyZXNzJylcclxuXHJcbmxldCBsb2NrZWQgPSBmYWxzZVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc2lzdGVyUHJvZ3Jlc3NIYW5kbGVyID0gKHVwZGF0ZU5vdykgPT4ge1xyXG4gICAgcHJvZ3Jlc3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdXBkYXRlTm93KClcclxuICAgICAgICBwcm9ncmVzcy5pbm5lckhUTUwgPSAnKHJlZnJlc2hlZCEpJ1xyXG4gICAgICAgIGxvY2tlZCA9IHRydWVcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgbG9ja2VkID0gZmFsc2VcclxuICAgICAgICB9LCAxNTAwKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVByb2dyZXNzID0gKF9sYXN0UGluZywgbmV4dFBpbmcpID0+IHtcclxuICAgIGlmICghbG9ja2VkKSB7XHJcbiAgICAgICAgY29uc3QgcmVtYWluaW5nID0gbmV4dFBpbmcgLSBEYXRlLm5vdygpXHJcblxyXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLm1heChNYXRoLnJvdW5kKHJlbWFpbmluZyAvIDEwMDApLCAwKVxyXG5cclxuICAgICAgICBwcm9ncmVzcy5pbm5lckhUTUwgPSBgKG5leHQgcmVmcmVzaDogJHtzZWNvbmRzfXMpYFxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTY2hlZHVsZSA9ICh7IGlzQWN0aXZlID0gZmFsc2UsIGludGVydmFsID0gMCwgY2FsbGJhY2sgPSBGdW5jdGlvbi5wcm90b3R5cGUsIHVwZGF0ZXIgfSA9IHt9KSA9PiB7XHJcbiAgICBsZXQgbmV4dFBpbmcgPSAwXHJcbiAgICBsZXQgbGFzdFBpbmcgPSAwXHJcbiAgICBjb25zdCBjYWxsQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKG5leHRQaW5nICYmIG5leHRQaW5nIDw9IERhdGUubm93KCkpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IG5leHRQaW5nXHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gbmV4dFBpbmcgKyBpbnRlcnZhbCA+IERhdGUubm93KCkgPyBuZXh0UGluZyArIGludGVydmFsIDogRGF0ZS5ub3coKSArIGludGVydmFsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR5cGVvZiB1cGRhdGVyID09PSAnZnVuY3Rpb24nICYmIHVwZGF0ZXIobGFzdFBpbmcsIG5leHRQaW5nKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0FjdGl2ZSAmJiBpbnRlcnZhbCkge1xyXG4gICAgICAgIG5leHRQaW5nID0gRGF0ZS5ub3coKSAtIDFcclxuICAgICAgICBjYWxsQ2FsbGJhY2soKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKGNhbGxDYWxsYmFjaywgMTAwKVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwgKG5ld0ludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3SW50ZXJ2YWwgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZSBhIG51bWJlcicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBuZXh0UGluZyAtIGludGVydmFsICsgbmV3SW50ZXJ2YWxcclxuICAgICAgICAgICAgaW50ZXJ2YWwgPSBuZXdJbnRlcnZhbFxyXG4gICAgICAgICAgICBjYWxsQ2FsbGJhY2soKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0Q2FsbGJhY2sgKGNiKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY2JcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IERhdGUubm93KClcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBEYXRlLm5vdygpICsgaW50ZXJ2YWxcclxuICAgICAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChjYWxsQ2FsbGJhY2ssIDEwMClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRyaWdnZXJJbnN0YW50bHkgKCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgICAgICAgIGxhc3RQaW5nID0gRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICBuZXh0UGluZyA9IERhdGUubm93KCkgKyBpbnRlcnZhbFxyXG4gICAgICAgICAgICB0eXBlb2YgdXBkYXRlciA9PT0gJ2Z1bmN0aW9uJyAmJiB1cGRhdGVyKGxhc3RQaW5nLCBuZXh0UGluZylcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0b3AgKCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxyXG4gICAgICAgICAgICBuZXh0UGluZyA9IDBcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImNvbnN0IGxpbmtGaWVsZHMgPSBbJ2hpZGUnLCAnaGlkZGVuQ2hhcHRlcnMnLCAnc291cmNlcyddXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlua0hlbHBlcnMgKGRiLCBBcGkpIHtcclxuICAgIGFzeW5jIGZ1bmN0aW9uIHB1c2hMaW5rVXBkYXRlIChjaGFuZ2VzKSB7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlc2V0ID0gbGlua0ZpZWxkcy5maWx0ZXIoKGtleSkgPT4gT2JqZWN0LmtleXMoY2hhbmdlcykuc29tZSgoY2hhbmdlKSA9PiBjaGFuZ2UuaW5jbHVkZXMoa2V5KSkpXHJcblxyXG4gICAgICAgIGlmIChjaGFuZ2VzZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgICAgICAgICBjb25zdCBsb2NhbCA9IGF3YWl0IGRiLmxpbmsubG9jYWwoKVxyXG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0ge31cclxuICAgICAgICAgICAgaWYgKGNoYW5nZXNldC5pbmNsdWRlcygnaGlkZScpICYmIFN0cmluZyhsaW5rLmhpZGUpICE9PSBTdHJpbmcobG9jYWwuaGlkZSkpIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZXMuaGlkZSA9IGxvY2FsLmhpZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VzZXQuaW5jbHVkZXMoJ2hpZGRlbkNoYXB0ZXJzJykgJiZcclxuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGxpbmsuaGlkZGVuQ2hhcHRlcnMpICE9PSBKU09OLnN0cmluZ2lmeShsb2NhbC5oaWRkZW5DaGFwdGVycylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLmhpZGRlbkNoYXB0ZXJzID0gbG9jYWwuaGlkZGVuQ2hhcHRlcnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc2V0LmluY2x1ZGVzKCdzb3VyY2VzJykgJiYgKFxyXG4gICAgICAgICAgICAgICAgbGluay5zb3VyY2VzPy5sZW5ndGggIT09IGxvY2FsLnNvdXJjZXMubGVuZ3RoIHx8XHJcbiAgICAgICAgICAgICAgICBsaW5rLnNvdXJjZXMuc29tZSgoc291cmNlKSA9PiBzb3VyY2UgJiYgIWxvY2FsLnNvdXJjZXMuaW5jbHVkZXMoc291cmNlLmlkKSlcclxuICAgICAgICAgICAgKSkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlcy5zb3VyY2VzID0gbG9jYWwuc291cmNlc1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoY2hhbmdlcykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBBcGkuTGluay51cGRhdGUobGluay5rZXksIGNoYW5nZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnZhbGlkICYmIGRiLmxpbmsuc2V0KHJlcy5wYXlsb2FkKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBmZXRjaExpbmtVcGRhdGUgKCkge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG5cclxuICAgICAgICBpZiAobGluaykge1xyXG4gICAgICAgICAgICBBcGkuTGluay5yZWFkKGxpbmsua2V5LCBsaW5rLmxhc3RNb2RpZmllZClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnZhbGlkICYmIHJlcy5wYXlsb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLmxpbmsuc2V0TG9jYWwocmVzLnBheWxvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLmxpbmsuc2V0KHJlcy5wYXlsb2FkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwdXNoTGlua1VwZGF0ZSxcclxuICAgICAgICBmZXRjaExpbmtVcGRhdGVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNldHRpbmdzSGFuZGxlcnMgKGRiLCBhcGkpIHtcclxuICAgIGNvbnN0IHsgTGluayB9ID0gYXBpXHJcblxyXG4gICAgY29uc3QgY3JlYXRlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctbGluay1idXR0b24nKVxyXG4gICAgY29uc3QgbGlua051bWJlclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1pZCcpXHJcbiAgICBjb25zdCBsaW5raW5nU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLXNlY3Rpb24nKVxyXG4gICAgY29uc3QgdW5saW5rU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bmxpbmstc2VjdGlvbicpXHJcbiAgICBjb25zdCB1bmxpbmtCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5saW5rLWJ1dHRvbicpXHJcbiAgICBjb25zdCBsaW5rQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstYnV0dG9uJylcclxuICAgIGNvbnN0IGxpbmtJbnB1dDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMScpXHJcbiAgICBjb25zdCBsaW5rSW5wdXQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTInKVxyXG4gICAgY29uc3QgbGlua0lucHV0MyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0zJylcclxuXHJcbiAgICBsaW5rSW5wdXQxLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDEudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgMTUpXHJcbiAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9IG51bWJlci5zbGljZSgwLCA1KVxyXG4gICAgICAgIGlmIChudW1iZXIubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gbnVtYmVyLnNsaWNlKDUsIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA+IDEwKSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuZm9jdXMoKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnNldFNlbGVjdGlvblJhbmdlKG51bWJlci5sZW5ndGggLSAxMCwgbnVtYmVyLmxlbmd0aCAtIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW1iZXIubGVuZ3RoID49IDUpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0Mi5mb2N1cygpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIuc2V0U2VsZWN0aW9uUmFuZ2UobnVtYmVyLmxlbmd0aCAtIDUsIG51bWJlci5sZW5ndGggLSA1KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rSW5wdXQyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDIudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgMTApXHJcbiAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IG51bWJlci5zbGljZSgwLCA1KVxyXG4gICAgICAgIGlmIChudW1iZXIubGVuZ3RoID49IDUpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IG51bWJlci5zbGljZSg1LCAxMClcclxuICAgICAgICAgICAgbGlua0lucHV0My5mb2N1cygpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuc2V0U2VsZWN0aW9uUmFuZ2UobnVtYmVyLmxlbmd0aCAtIDUsIG51bWJlci5sZW5ndGggLSA1KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rSW5wdXQzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IGxpbmtJbnB1dDMudmFsdWUucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJykuc2xpY2UoMCwgNSlcclxuICAgICAgICBpZiAobGlua0lucHV0My52YWx1ZSAhPT0gbnVtYmVyLnNsaWNlKDAsIDUpKSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoMCwgNSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyaXRlU3RhdGVUb0RvbSAobGluaykge1xyXG4gICAgICAgIGxpbmtpbmdTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJ25vbmUnIDogJydcclxuICAgICAgICB1bmxpbmtTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJycgOiAnbm9uZSdcclxuICAgICAgICBsaW5rTnVtYmVyVGV4dC5pbm5lclRleHQgPSBsaW5rID8gYCR7bGluay5rZXkuc2xpY2UoMCwgNSl9LSR7bGluay5rZXkuc2xpY2UoNSwgMTApfS0ke2xpbmsua2V5LnNsaWNlKDEwKX1gIDogJ1VubGlua2VkJ1xyXG4gICAgICAgIGxpbmtOdW1iZXJUZXh0LnN0eWxlLmNvbG9yID0gbGluayA/ICcjMDAwYzIxJyA6ICcjYzNjYmQyJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgd3JpdGVTdGF0ZVRvRG9tKGxpbmspXHJcblxyXG4gICAgY3JlYXRlTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgY29uc3QgbGlua0RhdGEgPSBhd2FpdCBkYi5saW5rLmxvY2FsKClcclxuICAgICAgICAgICAgY29uc3QgbmV3TGlua1Jlc3VsdCA9IGF3YWl0IExpbmsuaW5zZXJ0KGxpbmtEYXRhKVxyXG4gICAgICAgICAgICBpZiAobmV3TGlua1Jlc3VsdD8udmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBuZXdMaW5rUmVzdWx0LnBheWxvYWRcclxuICAgICAgICAgICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0KGxpbmspXHJcbiAgICAgICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20obGluaywgdHJ1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICB1bmxpbmtCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICAgICAgaWYgKGxpbmspIHtcclxuICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXQobnVsbClcclxuICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKHVuZGVmaW5lZCwgdHJ1ZSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGlua0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7bGlua0lucHV0MS52YWx1ZX0ke2xpbmtJbnB1dDIudmFsdWV9JHtsaW5rSW5wdXQzLnZhbHVlfWBcclxuICAgICAgICAgICAgY29uc3QgbGlua1Jlc3VsdCA9IGF3YWl0IExpbmsucmVhZChrZXkpXHJcbiAgICAgICAgICAgIGlmIChsaW5rUmVzdWx0Py52YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluayA9IGxpbmtSZXN1bHQucGF5bG9hZFxyXG4gICAgICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXQobGluaylcclxuICAgICAgICAgICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0TG9jYWwobGluaylcclxuICAgICAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbShsaW5rLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gc291cmNlUmVuZGVyZXIgKGRiKSB7XHJcbiAgICBjb25zdCBzb3VyY2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZXMnKVxyXG5cclxuICAgIHNvdXJjZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjbG9zZXN0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5yb3cgLmFjdGlvbi5kZWxldGUnKVxyXG4gICAgICAgIGlmIChjbG9zZXN0ICYmIGNsb3Nlc3QuZGF0YXNldFsnaWQnXSAmJiBzb3VyY2VzLmNvbnRhaW5zKGNsb3Nlc3QpKSB7XHJcbiAgICAgICAgICAgIGRiLnNvdXJjZXMuZGVsZXRlKGNsb3Nlc3QuZGF0YXNldFsnaWQnXSlcclxuICAgICAgICAgICAgY2xvc2VzdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3Rpb24nKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyU291cmNlcyAoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRiLnNvdXJjZXMucmVhZCgpXHJcblxyXG4gICAgICAgIHNvdXJjZXMuaW5uZXJIVE1MID0gZGF0YVxyXG4gICAgICAgICAgICAuc29ydCgoc291cmNlMSwgc291cmNlMikgPT4gU3RyaW5nKHNvdXJjZTEudGl0bGUpLmxvY2FsZUNvbXBhcmUoc291cmNlMj8udGl0bGUpKVxyXG4gICAgICAgICAgICAubWFwKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBTdHJpbmcoc291cmNlLnVybCkucmVwbGFjZSgnL3dwLWFkbWluL2FkbWluLWFqYXgucGhwJywgJycpLnJlcGxhY2UoL2h0dHBzPzpcXC9cXC8vLCAnJylcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgYDxsaSBjbGFzcz1cInJvdyBzb3VyY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFcIiB0aXRsZT1cIiR7YCR7c291cmNlLnRpdGxlfSAoJHt1cmx9KWB9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+JHtzb3VyY2UudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYW5nYS1pZFwiPigke3VybH0pPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWxldGUgYWN0aW9uXCIgZGF0YS1pZD1cIiR7c291cmNlLmlkfVwiPkRlbGV0ZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPmBcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmpvaW4oJ1xcbicpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXI6ICgpID0+IHJlbmRlclNvdXJjZXMoKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IHBhZCB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXJsUmVuZGVyZXIgKGRiKSB7XHJcbiAgICBjb25zdCB1cmxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybHMnKVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGhpZGUgKGlkKSB7XHJcbiAgICAgICAgY29uc3QgeyBuZXdVcmxzLCBvbGRVcmxzIH0gPSBhd2FpdCBkYi51cmxzLnJlYWQoKVxyXG4gICAgICAgIGlmIChuZXdVcmxzLmxlbmd0aCA8PSAxICYmICghbmV3VXJsc1swXSB8fCBuZXdVcmxzWzBdLmlkID09PSBpZCkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGF0ZXN0Q2hhcHRlckRhdGUgPSBvbGRVcmxzLmNvbmNhdChuZXdVcmxzKVxyXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgobGNkLCB1cmwpID0+IHVybC5jcmVhdGVkID4gbGNkID8gdXJsLmNyZWF0ZWQgOiBsY2QsIDApXHJcblxyXG4gICAgICAgICAgICBkYi51cmxzLmhpZGVBbGwobGF0ZXN0Q2hhcHRlckRhdGUgKyAxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGIudXJscy5oaWRlKGlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cmxzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2xvc2VzdEhpZGUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnJvdyAuaGlkZScpXHJcblxyXG4gICAgICAgIGlmIChjbG9zZXN0SGlkZSAmJiBjbG9zZXN0SGlkZS5kYXRhc2V0WydpZCddICYmIHVybHMuY29udGFpbnMoY2xvc2VzdEhpZGUpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGhpZGUoY2xvc2VzdEhpZGUuZGF0YXNldFsnaWQnXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2xvc2VzdExpbmsgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnJvdy5uZXcgLmxpbmsnKVxyXG4gICAgICAgIGlmIChjbG9zZXN0TGluayAmJiBjbG9zZXN0TGluay5kYXRhc2V0WydpZCddICYmIHVybHMuY29udGFpbnMoY2xvc2VzdExpbmspKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgYXdhaXQgaGlkZShjbG9zZXN0TGluay5kYXRhc2V0WydpZCddKVxyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihjbG9zZXN0TGluay5ocmVmLCAnX2JsYW5rJylcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2xvc2VzdE1vcmUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmFjdGlvbi5sb2FkLW1vcmUnKVxyXG4gICAgICAgIGlmIChjbG9zZXN0TW9yZSAmJiB1cmxzLmNvbnRhaW5zKGNsb3Nlc3RNb3JlKSkge1xyXG4gICAgICAgICAgICBjb25zdCBtYXhPbGQgPSBhd2FpdCBkYi51cmxzLmdldE1heE9sZCgpXHJcbiAgICAgICAgICAgIGF3YWl0IGRiLnVybHMuc2V0TWF4T2xkKG1heE9sZCArIDEwMClcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaGlkZUFsbCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuaGlkZS1hbGwnKVxyXG4gICAgICAgIGlmIChoaWRlQWxsICYmIHVybHMuY29udGFpbnMoaGlkZUFsbCkpIHtcclxuICAgICAgICAgICAgYXdhaXQgZGIudXJscy5oaWRlQWxsKERhdGUubm93KCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRvcCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudG9wJylcclxuICAgICAgICBpZiAodG9wICYmIHVybHMuY29udGFpbnModG9wKSkge1xyXG4gICAgICAgICAgICB1cmxzLnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogJ3Ntb290aCcgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGxldCBtYXhTY3JvbGwgPSAwXHJcbiAgICB1cmxzLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSB1cmxzLm9mZnNldEhlaWdodCArIHVybHMuc2Nyb2xsVG9wXHJcbiAgICAgICAgaWYgKHVybHMuc2Nyb2xsSGVpZ2h0IC0gc2Nyb2xsSGVpZ2h0IDw9IDUwICYmIG1heFNjcm9sbCAhPT0gdXJscy5zY3JvbGxIZWlnaHQpIHtcclxuICAgICAgICAgICAgbWF4U2Nyb2xsID0gdXJscy5zY3JvbGxIZWlnaHRcclxuICAgICAgICAgICAgY29uc3QgbWF4T2xkID0gYXdhaXQgZGIudXJscy5nZXRNYXhPbGQoKVxyXG4gICAgICAgICAgICBkYi51cmxzLnNldE1heE9sZChtYXhPbGQgKyAxMDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoZWNrVG9wQnV0dG9uKClcclxuICAgIH0pXHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tUb3BCdXR0b24gKCkge1xyXG4gICAgICAgIGlmICh1cmxzLnNjcm9sbFRvcCA+IDAgJiYgdXJscy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPT09IHVybHMucXVlcnlTZWxlY3RvcignLm9sZC1jaGFwdGVycycpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCkge1xyXG4gICAgICAgICAgICB1cmxzLnF1ZXJ5U2VsZWN0b3IoJy5vbGQtY2hhcHRlcnMgLnRvcCcpLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdXJscy5xdWVyeVNlbGVjdG9yKCcub2xkLWNoYXB0ZXJzIC50b3AnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVybFJlbmRlcmVyIChpc09sZCkge1xyXG4gICAgICAgIHJldHVybiAoY2hhcHRlcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoY2hhcHRlci5jcmVhdGVkKVxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBTdHJpbmcoY2hhcHRlci51cmwpLm1hdGNoKC9eaHR0cHM/OlxcL1xcLy4qXFwvKFteL10qaGFwdGVyW14vXFxkXSp8KShcXGQqKVteXFxkL10qW14vXSpcXC8kLykgfHwgW11cclxuICAgICAgICAgICAgY29uc3QgdGltZVN0cmluZyA9IGAke3BhZChkYXRlLmdldEhvdXJzKCkpfToke3BhZChkYXRlLmdldE1pbnV0ZXMoKSl9YFxyXG4gICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gYCR7cGFkKGRhdGUuZ2V0RGF0ZSgpKX0uJHtwYWQoZGF0ZS5nZXRNb250aCgpICsgMSl9LiR7U3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSkuc2xpY2UoLTIpfWBcclxuICAgICAgICAgICAgY29uc3QgZnVsbERhdGUgPSBkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA9PT0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gPyB0aW1lU3RyaW5nIDogZGF0ZVN0cmluZ1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInJvdyR7aXNPbGQgPyAnIG9sZCcgOiAnIG5ldyd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsaW5rXCIgaHJlZj1cIiR7Y2hhcHRlci51cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIiBkYXRhLWlkPVwiJHtjaGFwdGVyLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2NoYXB0ZXIudGl0bGV9IC0gQ2hhcHRlciAke3Jlc3VsdFsyXX1cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRlLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRlXCIgdGl0bGU9XCIke2Ake2RhdGVTdHJpbmd9ICR7dGltZVN0cmluZ31gfVwiPiR7ZnVsbERhdGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhpZGVcIiBkYXRhLWlkPVwiJHtjaGFwdGVyLmlkfVwiPkhpZGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9saT5gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlbmRlclVybHMgKCkge1xyXG4gICAgICAgIGNvbnN0IG1heE9sZCA9IGF3YWl0IGRiLnVybHMuZ2V0TWF4T2xkKClcclxuICAgICAgICBjb25zdCB7IG5ld1VybHMsIG9sZFVybHMgfSA9IGF3YWl0IGRiLnVybHMucmVhZCgpXHJcbiAgICAgICAgY29uc3QgbmV3Um93cyA9IG5ld1VybHMubWFwKGNyZWF0ZVVybFJlbmRlcmVyKGZhbHNlKSlcclxuICAgICAgICBjb25zdCBvbGRSb3dzID0gb2xkVXJscy5tYXAoY3JlYXRlVXJsUmVuZGVyZXIodHJ1ZSkpXHJcblxyXG4gICAgICAgIGlmIChuZXdSb3dzLmxlbmd0aCB8fCBvbGRSb3dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB1cmxzLmlubmVySFRNTCA9IFtdXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG5ld1Jvd3MubGVuZ3RoID8gJzxsaSBjbGFzcz1cIm5ldy1jaGFwdGVyc1wiPk5ldyBDaGFwdGVycyA8c3BhbiBjbGFzcz1cImFjdGlvbiBoaWRlLWFsbFwiPkhpZGUgYWxsPC9zcGFuPjwvbGk+JyA6IFtdKVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdChuZXdSb3dzKVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdCgnPGxpIGNsYXNzPVwib2xkLWNoYXB0ZXJzXCI+T2xkIENoYXB0ZXJzIDxzcGFuIGNsYXNzPVwiYWN0aW9uIHRvcFwiPlRvcCAmIzg1OTM7PC9zcGFuPjwvbGk+JylcclxuICAgICAgICAgICAgICAgIC5jb25jYXQob2xkUm93cy5zbGljZSgwLCBtYXhPbGQpKVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdChvbGRSb3dzLmxlbmd0aCA+PSBtYXhPbGQgPyBbJzxsaSBjbGFzcz1cImFjdGlvbiBsb2FkLW1vcmVcIj5Mb2FkIHVwIHRvIDEwMCBtb3JlIG9sZCBjaGFwdGVycy4uLjwvbGk+J10gOiBbXSlcclxuICAgICAgICAgICAgICAgIC5qb2luKCdcXG4nKVxyXG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IG5ld1Jvd3MubGVuZ3RoID8gYCgke25ld1Jvd3MubGVuZ3RofSkgTWFuZ2EgUG9sbGAgOiAnTWFuZ2EgUG9sbCdcclxuICAgICAgICAgICAgY2hlY2tUb3BCdXR0b24oKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdXJscy5pbm5lckhUTUwgPSAnPGxpIGNsYXNzPVwicm93XCI+Tm8gQ2hhcHRlcnMgYXZhaWxhYmxlLjwvbGk+J1xyXG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9ICdNYW5nYSBQb2xsJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcjogKCkgPT4gcmVuZGVyVXJscygpXHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHBhcnNlIChzdHJpbmcsIGZhbGxiYWNrKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZylcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYWQgKG5vKSB7XHJcbiAgICByZXR1cm4gKCcwMCcgKyBubykuc2xpY2UoLTIpXHJcbn1cclxuIiwiaW1wb3J0IHsgQVBJIH0gZnJvbSAnLi4vY29tbW9uL2FwaSdcclxuaW1wb3J0IHsgZGIgfSBmcm9tICcuL3N0b3JhZ2UnXHJcblxyXG5sZXQgY3VycmVudFNvdXJjZSA9IG51bGxcclxuXHJcbmNvbnN0IGJvb2ttYXJrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvb2ttYXJrJylcclxuY29uc3QgYm9va21hcmtUcmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib29rbWFyay10cmFjaycpXHJcbmNvbnN0IGJvb2ttYXJrVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9va21hcmstdGl0bGUnKVxyXG5cclxuY29uc3QgeyBTb3VyY2UgfSA9IEFQSSgnaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbScpXHJcblxyXG5ib29rbWFya1RyYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYm9va21hcmsuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgYm9va21hcmtUaXRsZS5pbm5lclRleHQgPSAnJ1xyXG4gICAgU291cmNlLmluc2VydChjdXJyZW50U291cmNlKVxyXG4gICAgICAgIC50aGVuKChzb3VyY2UpID0+IHNvdXJjZSAmJiBkYi5zb3VyY2VzLmFkZChzb3VyY2UpKVxyXG4gICAgY3VycmVudFNvdXJjZSA9IG51bGxcclxufSlcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0Qm9va21hcmsgKCkge1xyXG4gICAgY2hyb21lLnRhYnMucXVlcnkoXHJcbiAgICAgICAgeyBhY3RpdmU6IHRydWUsIHdpbmRvd0lkOiBjaHJvbWUud2luZG93cy5XSU5ET1dfSURfQ1VSUkVOVCB9LFxyXG4gICAgICAgICh0YWJzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGFic1swXS51cmwuaW5jbHVkZXMoJ2Nocm9tZTovLycpKSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoeyB0YXJnZXQ6IHsgdGFiSWQ6IHRhYnNbMF0uaWQgfSwgZnVuY3Rpb246IHRlc3QgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIClcclxufVxyXG5cclxuZnVuY3Rpb24gdGVzdCAoKSB7XHJcbiAgICBmdW5jdGlvbiBwYXJzZSAoc3RyaW5nLCBmYWxsYmFjaykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZylcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbGxiYWNrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlkcyA9IFtcclxuICAgICAgICB3aW5kb3c/Lm1hbmdhPy5tYW5nYV9pZCxcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0aW5nLXBvc3QtaWQnKT8udmFsdWUsXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwLW1hbmdhLWFjdGlvbi1idXR0b24nKT8uZGF0YXNldD8uWydwb3N0J10sXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYXB0ZXItc2VsZWN0aW9uJyk/LmRhdGFzZXQ/LlsnbWFuZ2EnXSxcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuZ2EtY2hhcHRlcnMtaG9sZGVyJyk/LmRhdGFzZXQ/LlsnaWQnXSxcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuZ2EtcmVhZGluZy1uYXYtaGVhZCcpPy5kYXRhc2V0Py5bJ2lkJ10sXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hbmdhLXJlYWRpbmctbmF2LWZvb3QnKT8uZGF0YXNldD8uWydpZCddXHJcbiAgICBdXHJcbiAgICAgICAgLmZpbHRlcigodGl0bGUpID0+IHRpdGxlKVxyXG4gICAgICAgIC5yZWR1Y2UoKG1hcCwgaWQpID0+IHtcclxuICAgICAgICAgICAgbWFwW2lkXSA9IHR5cGVvZiBtYXBbaWRdID09PSAnbnVtYmVyJyA/IG1hcFtpZF0gKyAxIDogMVxyXG4gICAgICAgICAgICByZXR1cm4gbWFwXHJcbiAgICAgICAgfSwge30pXHJcbiAgICBjb25zdCBpZCA9IE9iamVjdC5rZXlzKGlkcykuc29ydCgoaWQxLCBpZDIpID0+IGlkc1tpZDFdIC0gaWRzW2lkMl0pWzBdXHJcblxyXG4gICAgY29uc3QgdGl0bGVzID0gW1xyXG4gICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCJdJykpXHJcbiAgICAgICAgICAgIC5tYXAoKHNjcmlwdCkgPT4gcGFyc2Uoc2NyaXB0LmlubmVyVGV4dCk/LmhlYWRsaW5lKS5maW5kKChoKSA9PiBoKSxcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcHRlci1oZWFkaW5nJyk/LmlubmVyVGV4dD8uc3BsaXQoJyAtICcpWzBdLFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LXRpdGxlIGgxJyk/LmlubmVyVGV4dCxcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0ZS10aXRsZScpPy50aXRsZVxyXG4gICAgXVxyXG4gICAgICAgIC5maWx0ZXIoKHRpdGxlKSA9PiB0aXRsZSlcclxuICAgICAgICAucmVkdWNlKChtYXAsIHRpdGxlKSA9PiB7XHJcbiAgICAgICAgICAgIG1hcFt0aXRsZV0gPSB0eXBlb2YgbWFwW3RpdGxlXSA9PT0gJ251bWJlcicgPyBtYXBbdGl0bGVdICsgMSA6IDFcclxuICAgICAgICAgICAgcmV0dXJuIG1hcFxyXG4gICAgICAgIH0sIHt9KVxyXG4gICAgY29uc3QgdGl0bGUgPSBPYmplY3Qua2V5cyh0aXRsZXMpLnNvcnQoKHRpdGxlMSwgdGl0bGUyKSA9PiB0aXRsZXNbdGl0bGUxXSAtIHRpdGxlc1t0aXRsZTJdKVswXVxyXG5cclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgaWQsIHRpdGxlLCB1cmw6IGRvY3VtZW50Py5sb2NhdGlvbj8ub3JpZ2luID8gYCR7ZG9jdW1lbnQubG9jYXRpb24ub3JpZ2lufS93cC1hZG1pbi9hZG1pbi1hamF4LnBocGAgOiBudWxsIH0pXHJcbn1cclxuXHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihhc3luYyAocmVxdWVzdCkgPT4ge1xyXG4gICAgaWYgKHJlcXVlc3QuaWQgJiYgcmVxdWVzdC50aXRsZSAmJiByZXF1ZXN0LnVybCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCBkYi5zb3VyY2VzLnJlYWQoKVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZXMuc29tZSgoc291cmNlKSA9PiBzb3VyY2UudXJsID09PSByZXF1ZXN0LnVybCAmJiBTdHJpbmcoc291cmNlLm1hbmdhSWQpID09PSBTdHJpbmcocmVxdWVzdC5pZCkpKSB7XHJcbiAgICAgICAgICAgIGJvb2ttYXJrLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICAgICAgYm9va21hcmtUaXRsZS5pbm5lclRleHQgPSBgRG8geW91IHdhbnQgdG8gc3RhcnQgdHJhY2tpbmcgXCIke3JlcXVlc3QudGl0bGV9XCI/YFxyXG4gICAgICAgICAgICBjdXJyZW50U291cmNlID0ge1xyXG4gICAgICAgICAgICAgICAgbWFuZ2FJZDogcmVxdWVzdC5pZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiByZXF1ZXN0LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgdXJsOiByZXF1ZXN0LnVybFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBib29rbWFyay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICBib29rbWFya1RpdGxlLmlubmVyVGV4dCA9ICcnXHJcbiAgICBjdXJyZW50U291cmNlID0gbnVsbFxyXG59KVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVEQiB9IGZyb20gJy4uL2NvbW1vbi9kYidcclxuXHJcbmZ1bmN0aW9uIHJlYWQgKG5hbWVzcGFjZSwga2V5cykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBjaHJvbWUuc3RvcmFnZVtuYW1lc3BhY2VdLmdldChrZXlzLCByZXNvbHZlKSlcclxufVxyXG5cclxuZnVuY3Rpb24gd3JpdGUgKG5hbWVzcGFjZSwga2V5UGFpcnMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gY2hyb21lLnN0b3JhZ2VbbmFtZXNwYWNlXS5zZXQoa2V5UGFpcnMsIHJlc29sdmUpKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRMaXN0ZW5lciAoY2FsbGJhY2spIHtcclxuICAgIHJldHVybiBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoY2FsbGJhY2spXHJcbn1cclxuXHJcbmNvbnN0IHN0b3JhZ2UgPSB7XHJcbiAgICByZWFkLCB3cml0ZSwgYWRkTGlzdGVuZXJcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRiID0gY3JlYXRlREIoc3RvcmFnZSlcclxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qIEZpbGVTYXZlci5qc1xyXG4gKiBBIHNhdmVBcygpIEZpbGVTYXZlciBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxyXG4gKiBFUzZpZmllZCBieSBDb2xlIENoYW1iZXJsYWluLCBodHRwczovL2dpdGh1Yi5jb20vY2NoYW1iZXJsYWluXHJcbiAqXHJcbiAqIExpY2Vuc2U6IE1JVFxyXG4gKiAgIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxyXG4gKi9cblxuLypnbG9iYWwgc2VsZiAqL1xuLypqc2xpbnQgYml0d2lzZTogdHJ1ZSwgaW5kZW50OiA0LCBsYXhicmVhazogdHJ1ZSwgbGF4Y29tbWE6IHRydWUsIHNtYXJ0dGFiczogdHJ1ZSwgcGx1c3BsdXM6IHRydWUgKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9GaWxlU2F2ZXIuanMgKi9cblxudmFyIHNhdmVBcyA9IGV4cG9ydHMuc2F2ZUFzID0gd2luZG93LnNhdmVBcyB8fCBmdW5jdGlvbiAodmlldykge1xuICAvLyBJRSA8MTAgaXMgZXhwbGljaXRseSB1bnN1cHBvcnRlZFxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL01TSUUgWzEtOV1cXC4vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHJldHVybjtcbiAgdmFyIGRvYyA9IHZpZXcuZG9jdW1lbnQ7XG4gIC8vIG9ubHkgZ2V0IFVSTCB3aGVuIG5lY2Vzc2FyeSBpbiBjYXNlIEJsb2IuanMgaGFzbid0IG92ZXJyaWRkZW4gaXQgeWV0XG4gIHZhciBnZXRfVVJMID0gZnVuY3Rpb24gZ2V0X1VSTCgpIHtcbiAgICByZXR1cm4gdmlldy5VUkwgfHwgdmlldy53ZWJraXRVUkwgfHwgdmlldztcbiAgfTtcbiAgdmFyIHNhdmVfbGluayA9IGRvYy5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCAnYScpO1xuICB2YXIgY2FuX3VzZV9zYXZlX2xpbmsgPSAnZG93bmxvYWQnIGluIHNhdmVfbGluaztcbiAgdmFyIGNsaWNrID0gZnVuY3Rpb24gY2xpY2sobm9kZSkge1xuICAgIHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KCdjbGljaycpO1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH07XG4gIHZhciBpc19zYWZhcmkgPSAvVmVyc2lvblxcL1tcXGRcXC5dKy4qU2FmYXJpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICB2YXIgd2Via2l0X3JlcV9mcyA9IHZpZXcud2Via2l0UmVxdWVzdEZpbGVTeXN0ZW07XG4gIHZhciByZXFfZnMgPSB2aWV3LnJlcXVlc3RGaWxlU3lzdGVtIHx8IHdlYmtpdF9yZXFfZnMgfHwgdmlldy5tb3pSZXF1ZXN0RmlsZVN5c3RlbTtcbiAgdmFyIHRocm93X291dHNpZGUgPSBmdW5jdGlvbiB0aHJvd19vdXRzaWRlKGV4KSB7XG4gICAgKHZpZXcuc2V0SW1tZWRpYXRlIHx8IHZpZXcuc2V0VGltZW91dCkoZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgZXg7XG4gICAgfSwgMCk7XG4gIH07XG4gIHZhciBmb3JjZV9zYXZlYWJsZV90eXBlID0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XG4gIHZhciBmc19taW5fc2l6ZSA9IDA7XG4gIC8vIHRoZSBCbG9iIEFQSSBpcyBmdW5kYW1lbnRhbGx5IGJyb2tlbiBhcyB0aGVyZSBpcyBubyBcImRvd25sb2FkZmluaXNoZWRcIiBldmVudCB0byBzdWJzY3JpYmUgdG9cbiAgdmFyIGFyYml0cmFyeV9yZXZva2VfdGltZW91dCA9IDEwMDAgKiA0MDsgLy8gaW4gbXNcbiAgdmFyIHJldm9rZSA9IGZ1bmN0aW9uIHJldm9rZShmaWxlKSB7XG4gICAgdmFyIHJldm9rZXIgPSBmdW5jdGlvbiByZXZva2VyKCkge1xuICAgICAgaWYgKHR5cGVvZiBmaWxlID09PSAnc3RyaW5nJykgLy8gZmlsZSBpcyBhbiBvYmplY3QgVVJMXG4gICAgICAgIGdldF9VUkwoKS5yZXZva2VPYmplY3RVUkwoZmlsZSk7ZWxzZSAvLyBmaWxlIGlzIGEgRmlsZVxuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgIH07XG4gICAgLyogLy8gVGFrZSBub3RlIFczQzpcclxuICAgIHZhclxyXG4gICAgICB1cmkgPSB0eXBlb2YgZmlsZSA9PT0gXCJzdHJpbmdcIiA/IGZpbGUgOiBmaWxlLnRvVVJMKClcclxuICAgICwgcmV2b2tlciA9IGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgICAvLyBpZGVhbHkgRG93bmxvYWRGaW5pc2hlZEV2ZW50LmRhdGEgd291bGQgYmUgdGhlIFVSTCByZXF1ZXN0ZWRcclxuICAgICAgaWYgKGV2dC5kYXRhID09PSB1cmkpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGZpbGUgPT09IFwic3RyaW5nXCIpIHsgLy8gZmlsZSBpcyBhbiBvYmplY3QgVVJMXHJcbiAgICAgICAgICBnZXRfVVJMKCkucmV2b2tlT2JqZWN0VVJMKGZpbGUpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIGZpbGUgaXMgYSBGaWxlXHJcbiAgICAgICAgICBmaWxlLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgdmlldy5hZGRFdmVudExpc3RlbmVyKFwiZG93bmxvYWRmaW5pc2hlZFwiLCByZXZva2VyKTtcclxuICAgICovXG4gICAgc2V0VGltZW91dChyZXZva2VyLCBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQpO1xuICB9O1xuICB2YXIgZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaChmaWxlc2F2ZXIsIGV2ZW50X3R5cGVzLCBldmVudCkge1xuICAgIGV2ZW50X3R5cGVzID0gW10uY29uY2F0KGV2ZW50X3R5cGVzKTtcbiAgICB2YXIgaSA9IGV2ZW50X3R5cGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBmaWxlc2F2ZXJbJ29uJyArIGV2ZW50X3R5cGVzW2ldXTtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsaXN0ZW5lci5jYWxsKGZpbGVzYXZlciwgZXZlbnQgfHwgZmlsZXNhdmVyKTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICB0aHJvd19vdXRzaWRlKGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgdmFyIGF1dG9fYm9tID0gZnVuY3Rpb24gYXV0b19ib20oYmxvYikge1xuICAgIC8vIHByZXBlbmQgQk9NIGZvciBVVEYtOCBYTUwgYW5kIHRleHQvKiB0eXBlcyAoaW5jbHVkaW5nIEhUTUwpXG4gICAgaWYgKC9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGJsb2IudHlwZSkpIHJldHVybiBuZXcgQmxvYihbJ++7vycsIGJsb2JdLCB7IHR5cGU6IGJsb2IudHlwZSB9KTtcbiAgICByZXR1cm4gYmxvYjtcbiAgfTtcblxuICB2YXIgRmlsZVNhdmVyID0gZnVuY3Rpb24gRmlsZVNhdmVyKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZpbGVTYXZlcik7XG5cbiAgICBpZiAoIW5vX2F1dG9fYm9tKSBibG9iID0gYXV0b19ib20oYmxvYik7XG4gICAgLy8gRmlyc3QgdHJ5IGEuZG93bmxvYWQsIHRoZW4gd2ViIGZpbGVzeXN0ZW0sIHRoZW4gb2JqZWN0IFVSTHNcbiAgICB2YXIgZmlsZXNhdmVyID0gdGhpcyxcbiAgICAgICAgdHlwZSA9IGJsb2IudHlwZSxcbiAgICAgICAgYmxvYl9jaGFuZ2VkID0gZmFsc2UsXG4gICAgICAgIG9iamVjdF91cmwsXG4gICAgICAgIHRhcmdldF92aWV3LFxuICAgICAgICBkaXNwYXRjaF9hbGwgPSBmdW5jdGlvbiBkaXNwYXRjaF9hbGwoKSB7XG4gICAgICBkaXNwYXRjaChmaWxlc2F2ZXIsICd3cml0ZXN0YXJ0IHByb2dyZXNzIHdyaXRlIHdyaXRlZW5kJy5zcGxpdCgnICcpKTtcbiAgICB9XG4gICAgLy8gb24gYW55IGZpbGVzeXMgZXJyb3JzIHJldmVydCB0byBzYXZpbmcgd2l0aCBvYmplY3QgVVJMc1xuICAgICxcbiAgICAgICAgZnNfZXJyb3IgPSBmdW5jdGlvbiBmc19lcnJvcigpIHtcbiAgICAgIGlmICh0YXJnZXRfdmlldyAmJiBpc19zYWZhcmkgJiYgdHlwZW9mIEZpbGVSZWFkZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFNhZmFyaSBkb2Vzbid0IGFsbG93IGRvd25sb2FkaW5nIG9mIGJsb2IgdXJsc1xuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgYmFzZTY0RGF0YSA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICAgICAgdGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9ICdkYXRhOmF0dGFjaG1lbnQvZmlsZScgKyBiYXNlNjREYXRhLnNsaWNlKGJhc2U2NERhdGEuc2VhcmNoKC9bLDtdLykpO1xuICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5JTklUO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBkb24ndCBjcmVhdGUgbW9yZSBvYmplY3QgVVJMcyB0aGFuIG5lZWRlZFxuICAgICAgaWYgKGJsb2JfY2hhbmdlZCB8fCAhb2JqZWN0X3VybCkge1xuICAgICAgICBvYmplY3RfdXJsID0gZ2V0X1VSTCgpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIH1cbiAgICAgIGlmICh0YXJnZXRfdmlldykge1xuICAgICAgICB0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gb2JqZWN0X3VybDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXdfdGFiID0gdmlldy5vcGVuKG9iamVjdF91cmwsICdfYmxhbmsnKTtcbiAgICAgICAgaWYgKG5ld190YWIgPT09IHVuZGVmaW5lZCAmJiBpc19zYWZhcmkpIHtcbiAgICAgICAgICAvL0FwcGxlIGRvIG5vdCBhbGxvdyB3aW5kb3cub3Blbiwgc2VlIGh0dHA6Ly9iaXQubHkvMWtaZmZSSVxuICAgICAgICAgIHZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICBkaXNwYXRjaF9hbGwoKTtcbiAgICAgIHJldm9rZShvYmplY3RfdXJsKTtcbiAgICB9LFxuICAgICAgICBhYm9ydGFibGUgPSBmdW5jdGlvbiBhYm9ydGFibGUoZnVuYykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGZpbGVzYXZlci5yZWFkeVN0YXRlICE9PSBmaWxlc2F2ZXIuRE9ORSkge1xuICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcbiAgICAgICAgY3JlYXRlX2lmX25vdF9mb3VuZCA9IHsgY3JlYXRlOiB0cnVlLCBleGNsdXNpdmU6IGZhbHNlIH0sXG4gICAgICAgIHNsaWNlO1xuXG4gICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuSU5JVDtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIG5hbWUgPSAnZG93bmxvYWQnO1xuICAgIH1cbiAgICBpZiAoY2FuX3VzZV9zYXZlX2xpbmspIHtcbiAgICAgIG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNhdmVfbGluay5ocmVmID0gb2JqZWN0X3VybDtcbiAgICAgICAgc2F2ZV9saW5rLmRvd25sb2FkID0gbmFtZTtcbiAgICAgICAgY2xpY2soc2F2ZV9saW5rKTtcbiAgICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICAgIHJldm9rZShvYmplY3RfdXJsKTtcbiAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBPYmplY3QgYW5kIHdlYiBmaWxlc3lzdGVtIFVSTHMgaGF2ZSBhIHByb2JsZW0gc2F2aW5nIGluIEdvb2dsZSBDaHJvbWUgd2hlblxuICAgIC8vIHZpZXdlZCBpbiBhIHRhYiwgc28gSSBmb3JjZSBzYXZlIHdpdGggYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXG4gICAgLy8gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9OTExNThcbiAgICAvLyBVcGRhdGU6IEdvb2dsZSBlcnJhbnRseSBjbG9zZWQgOTExNTgsIEkgc3VibWl0dGVkIGl0IGFnYWluOlxuICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zODk2NDJcbiAgICBpZiAodmlldy5jaHJvbWUgJiYgdHlwZSAmJiB0eXBlICE9PSBmb3JjZV9zYXZlYWJsZV90eXBlKSB7XG4gICAgICBzbGljZSA9IGJsb2Iuc2xpY2UgfHwgYmxvYi53ZWJraXRTbGljZTtcbiAgICAgIGJsb2IgPSBzbGljZS5jYWxsKGJsb2IsIDAsIGJsb2Iuc2l6ZSwgZm9yY2Vfc2F2ZWFibGVfdHlwZSk7XG4gICAgICBibG9iX2NoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBTaW5jZSBJIGNhbid0IGJlIHN1cmUgdGhhdCB0aGUgZ3Vlc3NlZCBtZWRpYSB0eXBlIHdpbGwgdHJpZ2dlciBhIGRvd25sb2FkXG4gICAgLy8gaW4gV2ViS2l0LCBJIGFwcGVuZCAuZG93bmxvYWQgdG8gdGhlIGZpbGVuYW1lLlxuICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD02NTQ0MFxuICAgIGlmICh3ZWJraXRfcmVxX2ZzICYmIG5hbWUgIT09ICdkb3dubG9hZCcpIHtcbiAgICAgIG5hbWUgKz0gJy5kb3dubG9hZCc7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBmb3JjZV9zYXZlYWJsZV90eXBlIHx8IHdlYmtpdF9yZXFfZnMpIHtcbiAgICAgIHRhcmdldF92aWV3ID0gdmlldztcbiAgICB9XG4gICAgaWYgKCFyZXFfZnMpIHtcbiAgICAgIGZzX2Vycm9yKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZzX21pbl9zaXplICs9IGJsb2Iuc2l6ZTtcbiAgICByZXFfZnModmlldy5URU1QT1JBUlksIGZzX21pbl9zaXplLCBhYm9ydGFibGUoZnVuY3Rpb24gKGZzKSB7XG4gICAgICBmcy5yb290LmdldERpcmVjdG9yeSgnc2F2ZWQnLCBjcmVhdGVfaWZfbm90X2ZvdW5kLCBhYm9ydGFibGUoZnVuY3Rpb24gKGRpcikge1xuICAgICAgICB2YXIgc2F2ZSA9IGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgICAgICAgZGlyLmdldEZpbGUobmFtZSwgY3JlYXRlX2lmX25vdF9mb3VuZCwgYWJvcnRhYmxlKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgICAgICBmaWxlLmNyZWF0ZVdyaXRlcihhYm9ydGFibGUoZnVuY3Rpb24gKHdyaXRlcikge1xuICAgICAgICAgICAgICB3cml0ZXIub253cml0ZWVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSBmaWxlLnRvVVJMKCk7XG4gICAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChmaWxlc2F2ZXIsICd3cml0ZWVuZCcsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICByZXZva2UoZmlsZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHdyaXRlci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHdyaXRlci5lcnJvcjtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSAhPT0gZXJyb3IuQUJPUlRfRVJSKSB7XG4gICAgICAgICAgICAgICAgICBmc19lcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgJ3dyaXRlc3RhcnQgcHJvZ3Jlc3Mgd3JpdGUgYWJvcnQnLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB3cml0ZXJbJ29uJyArIGV2ZW50XSA9IGZpbGVzYXZlclsnb24nICsgZXZlbnRdO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3JpdGVyLndyaXRlKGJsb2IpO1xuICAgICAgICAgICAgICBmaWxlc2F2ZXIuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgd3JpdGVyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuV1JJVElORztcbiAgICAgICAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgICAgICAgfSksIGZzX2Vycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgZGlyLmdldEZpbGUobmFtZSwgeyBjcmVhdGU6IGZhbHNlIH0sIGFib3J0YWJsZShmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgIC8vIGRlbGV0ZSBmaWxlIGlmIGl0IGFscmVhZHkgZXhpc3RzXG4gICAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgICAgICBzYXZlKCk7XG4gICAgICAgIH0pLCBhYm9ydGFibGUoZnVuY3Rpb24gKGV4KSB7XG4gICAgICAgICAgaWYgKGV4LmNvZGUgPT09IGV4Lk5PVF9GT1VORF9FUlIpIHtcbiAgICAgICAgICAgIHNhdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnNfZXJyb3IoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgfSksIGZzX2Vycm9yKTtcbiAgfTtcblxuICB2YXIgRlNfcHJvdG8gPSBGaWxlU2F2ZXIucHJvdG90eXBlO1xuICB2YXIgc2F2ZUFzID0gZnVuY3Rpb24gc2F2ZUFzKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG4gICAgcmV0dXJuIG5ldyBGaWxlU2F2ZXIoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pO1xuICB9O1xuXG4gIC8vIElFIDEwKyAobmF0aXZlIHNhdmVBcylcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuICAgICAgaWYgKCFub19hdXRvX2JvbSkgYmxvYiA9IGF1dG9fYm9tKGJsb2IpO1xuICAgICAgcmV0dXJuIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGJsb2IsIG5hbWUgfHwgJ2Rvd25sb2FkJyk7XG4gICAgfTtcbiAgfVxuXG4gIEZTX3Byb3RvLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmaWxlc2F2ZXIgPSB0aGlzO1xuICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgZGlzcGF0Y2goZmlsZXNhdmVyLCAnYWJvcnQnKTtcbiAgfTtcbiAgRlNfcHJvdG8ucmVhZHlTdGF0ZSA9IEZTX3Byb3RvLklOSVQgPSAwO1xuICBGU19wcm90by5XUklUSU5HID0gMTtcbiAgRlNfcHJvdG8uRE9ORSA9IDI7XG5cbiAgRlNfcHJvdG8uZXJyb3IgPSBGU19wcm90by5vbndyaXRlc3RhcnQgPSBGU19wcm90by5vbnByb2dyZXNzID0gRlNfcHJvdG8ub253cml0ZSA9IEZTX3Byb3RvLm9uYWJvcnQgPSBGU19wcm90by5vbmVycm9yID0gRlNfcHJvdG8ub253cml0ZWVuZCA9IG51bGw7XG5cbiAgcmV0dXJuIHNhdmVBcztcbn0odHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgfHwgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93IHx8IHVuZGVmaW5lZC5jb250ZW50KTtcbi8vIGBzZWxmYCBpcyB1bmRlZmluZWQgaW4gRmlyZWZveCBmb3IgQW5kcm9pZCBjb250ZW50IHNjcmlwdCBjb250ZXh0XG4vLyB3aGlsZSBgdGhpc2AgaXMgbnNJQ29udGVudEZyYW1lTWVzc2FnZU1hbmFnZXJcbi8vIHdpdGggYW4gYXR0cmlidXRlIGBjb250ZW50YCB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSB3aW5kb3dcblxuZXhwb3J0cy5kZWZhdWx0ID0gc2F2ZUFzOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcydcbmltcG9ydCB7IHRlc3RCb29rbWFyayB9IGZyb20gJy4vYm9va21hcmsnXG5pbXBvcnQgeyBhZGRJbXBvcnRIYW5kbGVycyB9IGZyb20gJy4uL2NvbW1vbi9pbXBvcnQnXG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vc3RvcmFnZSdcbmltcG9ydCB7IHVybFJlbmRlcmVyIH0gZnJvbSAnLi4vY29tbW9uL3VybHMnXG5pbXBvcnQgeyBzb3VyY2VSZW5kZXJlciB9IGZyb20gJy4uL2NvbW1vbi9zb3VyY2VzJ1xuaW1wb3J0IHsgcmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIsIHVwZGF0ZVByb2dyZXNzIH0gZnJvbSAnLi4vY29tbW9uL3Byb2dyZXNzLWJhcidcbmltcG9ydCB7IGNyZWF0ZVNjaGVkdWxlIH0gZnJvbSAnLi4vY29tbW9uL3NjaGVkdWxlJ1xuaW1wb3J0IHsgcmVnaXN0ZXJNZW51TGlzdGVuZXJzIH0gZnJvbSAnLi4vY29tbW9uL21lbnUnXG5pbXBvcnQgeyBhZGRTZXR0aW5nc0hhbmRsZXJzLCBnZXRMaW5rSGVscGVycyB9IGZyb20gJy4uL2NvbW1vbi9zZXR0aW5ncydcbmltcG9ydCB7IEFQSSB9IGZyb20gJy4uL2NvbW1vbi9hcGknXG5cbmNvbnN0IGFwaSA9IEFQSSgnaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbScpXG5cbmRiLnVybHMuc2V0TWF4T2xkKDEwMClcblxuY29uc3QgTGlua3MgPSBnZXRMaW5rSGVscGVycyhkYiwgYXBpKVxuY29uc3QgVXJscyA9IHVybFJlbmRlcmVyKGRiKVxuY29uc3QgU291cmNlcyA9IHNvdXJjZVJlbmRlcmVyKGRiKVxuXG5kYi5vbkNoYW5nZSgoY2hhbmdlcykgPT4ge1xuICAgIGlmIChbJ2hpZGUnLCAnaGlkZGVuQ2hhcHRlcnMnLCAndXJscyddLnNvbWUoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eS5iaW5kKGNoYW5nZXMpKSkge1xuICAgICAgICBVcmxzLnJlbmRlcigpXG4gICAgfVxuICAgIGlmIChPYmplY3Qua2V5cyhjaGFuZ2VzKS5zb21lKChjaGFuZ2UpID0+IGNoYW5nZS5pbmNsdWRlcygnc291cmNlcycpKSB8fCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY2hhbmdlcywgJ21heE9sZCcpKSB7XG4gICAgICAgIFNvdXJjZXMucmVuZGVyKClcbiAgICB9XG4gICAgTGlua3MucHVzaExpbmtVcGRhdGUoY2hhbmdlcylcbn0pXG5cbm5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIucG9zdE1lc3NhZ2UoJ0ZFVENIX0NIQVBURVJTJylcblxuY29uc3QgaW50ZXJ2YWwgPSBjcmVhdGVTY2hlZHVsZSh7XG4gICAgY2FsbGJhY2s6ICgpID0+IG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIucG9zdE1lc3NhZ2UoJ0ZFVENIX0NIQVBURVJTJyksXG4gICAgaW50ZXJ2YWw6IDMwICogMTAwMCxcbiAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICB1cGRhdGVyOiB1cGRhdGVQcm9ncmVzc1xufSlcblxucmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIoKCkgPT4gaW50ZXJ2YWwudHJpZ2dlckluc3RhbnRseSgpKVxuYWRkSW1wb3J0SGFuZGxlcnMoZGIpXG5hZGRTZXR0aW5nc0hhbmRsZXJzKGRiLCBhcGkpXG5yZWdpc3Rlck1lbnVMaXN0ZW5lcnMoZGIpXG5cblVybHMucmVuZGVyKClcblNvdXJjZXMucmVuZGVyKClcbiAgICAudGhlbih0ZXN0Qm9va21hcmspXG4iXSwic291cmNlUm9vdCI6IiJ9