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
  progress.innerHTML = '(refreshed!)';
  locked = true;
  setTimeout(function () {
    locked = false;
  }, 1500);
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
                _context.next = 19;
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

              if (Object.keys(_changes).length && link.key) {
                Api.Link.update(link.key, _changes).then(function (res) {
                  return res.valid && db.link.set(res.payload);
                });
              }

            case 19:
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
            return db.link.set(link);

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
                      return db.link.set(_link);

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
    return {
      type: 'madaro',
      id: id,
      title: title,
      url: (_document = document) !== null && _document !== void 0 && (_document$location = _document.location) !== null && _document$location !== void 0 && _document$location.origin ? "".concat(document.location.origin, "/wp-admin/admin-ajax.php") : null
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2RiLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vaW1wb3J0LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vbWVudS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3Byb2dyZXNzLWJhci5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3NjaGVkdWxlLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9zb3VyY2VzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vdXJscy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3V0aWxzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9leHRlbnNpb24vYm9va21hcmsuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9zdG9yYWdlLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vbm9kZV9tb2R1bGVzL3NhdmUtYXMvbGliL2luZGV4LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL3BvcHVwLmpzIl0sIm5hbWVzIjpbIkFQSSIsImJhc2VVcmwiLCJwb3N0U291cmNlIiwic291cmNlIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJBY2NlcHQiLCJ0aGVuIiwicmVzIiwianNvbiIsImNhdGNoIiwiZXJyb3IiLCJ2YWxpZCIsImRhdGEiLCJwYXlsb2FkIiwiYWRkU291cmNlRnJvbVVybCIsInVybCIsInJlYWRVcmxzIiwic291cmNlcyIsImxpbWl0IiwiZGF0ZSIsImFkZFN1YnNjcmlwdGlvbnMiLCJ0b3BpY3MiLCJrZXkiLCJkZWxldGVTdWJzY3JpcHRpb25zIiwicmVhZExpbmsiLCJjaGFuZ2VkU2luY2UiLCJzdGF0dXMiLCJ1cGRhdGVMaW5rIiwidXBkYXRlU2V0IiwiY3JlYXRlTGluayIsImluaXRTZXQiLCJVcmxzIiwicmVhZCIsIlNvdXJjZSIsImluc2VydCIsImZyb21VcmwiLCJTdWJzY3JpcHRpb24iLCJzdWJzY3JpYmUiLCJ1bnN1YnNjcmliZSIsIkxpbmsiLCJ1cGRhdGUiLCJOQU1FU1BBQ0VTIiwiU1lOQyIsIkxPQ0FMIiwiY3JlYXRlREIiLCJzdG9yYWdlIiwid3JpdGUiLCJyZWFkU291cmNlcyIsInJlZ2lzdHJ5IiwicGFyc2UiLCJyZWR1Y2UiLCJQcm9taXNlIiwiYWxsIiwiY29uY2F0IiwicmVzb2x2ZSIsIndyaXRlU291cmNlcyIsInVwZGF0ZXMiLCJ4IiwiTWF0aCIsIm1heCIsImNlaWwiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJhZGRTb3VyY2UiLCJzb21lIiwibWFuZ2FJZCIsImRlbGV0ZVNvdXJjZSIsInNvdXJjZUlkIiwibmV3U291cmNlcyIsImZpbHRlciIsImlkIiwiaXNEaXJ0eSIsInVybHMiLCJnZXRGaWx0ZXJlZFNvcnRlZFVybHMiLCJoaWRkZW5DaGFwdGVycyIsImhpZGUiLCJoaWRkZW5DaGFwdGVyc1N0cmluZyIsInVybExpc3QiLCJjaGVja09sZCIsImNoYXB0ZXIiLCJjcmVhdGVkIiwiT2JqZWN0IiwidmFsdWVzIiwic29ydCIsInVybDEiLCJ1cmwyIiwiZGlmZiIsImFicyIsIlN0cmluZyIsImxvY2FsZUNvbXBhcmUiLCJvbGRVcmxzIiwibmV3VXJscyIsImhpZGVVcmwiLCJyZXN1bHQiLCJoaWRlQWxsVXJscyIsInRpbWVzdGFtcCIsIndyaXRlVXJscyIsImluaXQiLCJ0b2RheSIsIkRhdGUiLCJzZXRIb3VycyIsImdldFRpbWUiLCJzZXRNYXhPbGQiLCJtYXhPbGQiLCJnZXRNYXhPbGQiLCJzZXRMaW5rIiwibGluayIsImdldExpbmsiLCJnZXRIaWRlIiwid3JpdGVMb2NhbFNldHRpbmdzIiwic2V0dGluZ3MiLCJsb2NhbFNldHRpbmdzIiwiZ2V0TG9jYWxTZXR0aW5ncyIsImdldExpbmtEYXRhIiwibWFwIiwiTnVtYmVyIiwic2V0TGlua0RhdGEiLCJpbXBvcnQiLCJhZGQiLCJkZWxldGUiLCJsb2NhbCIsInNldCIsImhpZGVBbGwiLCJvbkNoYW5nZSIsImFkZExpc3RlbmVyIiwic2V0TG9jYWwiLCJhZGRJbXBvcnRIYW5kbGVycyIsImRiIiwiaW1wb3J0RWxlbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJleHBvcnRFbGVtIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJmaWxlIiwidGFyZ2V0IiwiZmlsZXMiLCJmciIsIkZpbGVSZWFkZXIiLCJjbGVhbiIsInRpdGxlIiwicmVhZEFzVGV4dCIsImJsb2IiLCJCbG9iIiwidHlwZSIsInNhdmVBcyIsInJlZ2lzdGVyTWVudUxpc3RlbmVycyIsIkFwaSIsImltcG9ydFNlY3Rpb24iLCJxdWVyeVNlbGVjdG9yIiwicG9wdXBUaXRsZSIsImJvb2ttYXJrcyIsImNoYXB0ZXJzIiwiYWRkU2VjdGlvbiIsInNldHRpbmdzU2VjdGlvbiIsInByb2dyZXNzIiwib3BlbkNoYXB0ZXJzIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5uZXJUZXh0Iiwib3BlblNldHRpbmdzIiwiZ2V0TGlua1F1ZXJ5IiwibGlua0lmVW5saW5rZWQiLCJsb2NrZWQiLCJyZXNpc3RlclByb2dyZXNzSGFuZGxlciIsInVwZGF0ZU5vdyIsIm1hcmtSZWZyZXNoZWQiLCJpbm5lckhUTUwiLCJzZXRUaW1lb3V0IiwidXBkYXRlUHJvZ3Jlc3MiLCJfbGFzdFBpbmciLCJuZXh0UGluZyIsInJlbWFpbmluZyIsIm5vdyIsInNlY29uZHMiLCJyb3VuZCIsImNyZWF0ZVNjaGVkdWxlIiwiaXNBY3RpdmUiLCJpbnRlcnZhbCIsImNhbGxiYWNrIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJ1cGRhdGVyIiwibGFzdFBpbmciLCJjYWxsQ2FsbGJhY2siLCJ0aW1lciIsInNldEludGVydmFsIiwibmV3SW50ZXJ2YWwiLCJFcnJvciIsInNldENhbGxiYWNrIiwiY2IiLCJzdGFydCIsInRyaWdnZXJJbnN0YW50bHkiLCJzdG9wIiwiY2xlYXJJbnRlcnZhbCIsImxpbmtGaWVsZHMiLCJmb3JtYXRLZXkiLCJnZXRMaW5rSGVscGVycyIsInB1c2hMaW5rVXBkYXRlIiwiY2hhbmdlcyIsImNoYW5nZXNldCIsImtleXMiLCJjaGFuZ2UiLCJpbmNsdWRlcyIsImZldGNoTGlua1VwZGF0ZSIsImxhc3RNb2RpZmllZCIsImlzVmFsaWRMaW5rS2V5IiwiY2xlYW5LZXkiLCJyZXBsYWNlQWxsIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJnZXQiLCJhcGkiLCJjdXJyZW50TGluayIsImxpbmtJbnB1dDEiLCJsaW5rSW5wdXQyIiwibGlua0lucHV0MyIsInZhbHVlIiwiY29ubmVjdFRvTGluayIsImxpbmtOdW1iZXJUZXh0IiwibGlua0xpbmsiLCJsaW5rTGlua1RleHQiLCJocmVmIiwiY29sb3IiLCJsaW5rTGlua1dhcm4iLCJ3YXJuTGlua0N1cnJlbnQiLCJ3YXJuTGlua05ldyIsImxpbmtFcnJvciIsImxpbmtQcm9ncmVzcyIsImxpbmtCdXR0b24iLCJkaXNhYmxlZCIsImxpbmtSZXN1bHQiLCJhZGRTZXR0aW5nc0hhbmRsZXJzIiwid3JpdGVTdGF0ZVRvRG9tIiwibGlua2luZ1NlY3Rpb24iLCJ1bmxpbmtTZWN0aW9uIiwidW5saW5rQnV0dG9uIiwibnVtYmVyIiwiZm9jdXMiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImxpbmtEYXRhIiwibmV3TGlua1Jlc3VsdCIsInVuZGVmaW5lZCIsInNvdXJjZVJlbmRlcmVyIiwiZXZlbnQiLCJjbG9zZXN0IiwiZGF0YXNldCIsImNvbnRhaW5zIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicmVuZGVyU291cmNlcyIsInNvdXJjZTEiLCJzb3VyY2UyIiwicmVwbGFjZSIsInNwbGl0Iiwiam9pbiIsInJlbmRlciIsInVybFJlbmRlcmVyIiwibGF0ZXN0Q2hhcHRlckRhdGUiLCJsY2QiLCJjbG9zZXN0SGlkZSIsImNsb3Nlc3RMaW5rIiwicHJldmVudERlZmF1bHQiLCJvcGVuIiwiY2xvc2VzdE1vcmUiLCJ0b3AiLCJzY3JvbGxUbyIsImJlaGF2aW9yIiwibWF4U2Nyb2xsIiwic2Nyb2xsSGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic2Nyb2xsVG9wIiwiY2hlY2tUb3BCdXR0b24iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjcmVhdGVVcmxSZW5kZXJlciIsImlzT2xkIiwidGltZVN0cmluZyIsInBhZCIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImRhdGVTdHJpbmciLCJnZXREYXRlIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsImZ1bGxEYXRlIiwidG9JU09TdHJpbmciLCJyZW5kZXJVcmxzIiwibmV3Um93cyIsIm9sZFJvd3MiLCJzdHJpbmciLCJmYWxsYmFjayIsIm5vIiwiY3VycmVudFNvdXJjZSIsImJvb2ttYXJrIiwiYm9va21hcmtUcmFjayIsImJvb2ttYXJrVGl0bGUiLCJBUElfQUREUkVTUyIsImNocm9tZSIsInJ1bnRpbWUiLCJvbk1lc3NhZ2UiLCJyZXF1ZXN0IiwiY29uc29sZSIsImxvZyIsInRlc3RCb29rbWFyayIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsIndpbmRvd0lkIiwid2luZG93cyIsIldJTkRPV19JRF9DVVJSRU5UIiwic2NyaXB0aW5nIiwiZXhlY3V0ZVNjcmlwdCIsInRhYklkIiwiZnVuY3Rpb24iLCJ0ZXN0IiwiZGVjb2RlSFRNTEVudGl0aWVzIiwic3RyIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInRlc3RGYW5Gb3giLCJwYXRobmFtZSIsIm1hdGNoIiwibmFtZSIsIm9yaWdpbiIsInRlc3RNYW5nYWRleCIsInRlc3RNYWRhcm8iLCJpZHMiLCJtYW5nYSIsIm1hbmdhX2lkIiwiaWQxIiwiaWQyIiwiaGVhZGVyIiwidGl0bGVzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsInNjcmlwdCIsImhlYWRsaW5lIiwiZmluZCIsImgiLCJjaGlsZE5vZGVzIiwibm9kZSIsIm5vZGVUeXBlIiwidHJpbSIsInRpdGxlMSIsInRpdGxlMiIsImhvc3QiLCJzZW5kTWVzc2FnZSIsIm5hbWVzcGFjZSIsImtleVBhaXJzIiwib25DaGFuZ2VkIiwiTGlua3MiLCJTb3VyY2VzIiwiaGFzT3duUHJvcGVydHkiLCJiaW5kIiwiY2FsbCIsIm5hdmlnYXRvciIsInNlcnZpY2VXb3JrZXIiLCJjb250cm9sbGVyIiwicG9zdE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTUEsR0FBRyxHQUFHLFNBQU5BLEdBQU0sR0FBa0I7QUFBQSxNQUFqQkMsT0FBaUIsdUVBQVAsRUFBTzs7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFB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cG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQVBJID0gKGJhc2VVcmwgPSAnJykgPT4ge1xyXG4gICAgZnVuY3Rpb24gcG9zdFNvdXJjZSAoc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9zb3VyY2VzYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc291cmNlKSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5wYXlsb2FkKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFNvdXJjZUZyb21VcmwgKHVybCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc291cmNlcy9hZGRGcm9tVXJsYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB1cmwgfSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkVXJscyAoc291cmNlcyA9IFtdLCBsaW1pdCA9ICcnLCBkYXRlID0gJycpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXHJcbiAgICAgICAgICAgIGAke2Jhc2VVcmx9L2FwaS91cmxzL2ZldGNoYCxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlcyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLnBheWxvYWQgfHwgW10pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkU3Vic2NyaXB0aW9ucyAodG9waWNzID0gW10sIGtleSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc3Vic2NyaXB0aW9uc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHRvcGljcyxcclxuICAgICAgICAgICAgICAgIGtleToga2V5XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlU3Vic2NyaXB0aW9ucyAodG9waWNzID0gW10sIGtleSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc3Vic2NyaXB0aW9uc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZGVsZXRlJyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdG9waWNzLFxyXG4gICAgICAgICAgICAgICAga2V5OiBrZXlcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkTGluayAoa2V5LCBjaGFuZ2VkU2luY2UpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL2xpbmtzLyR7a2V5fSR7Y2hhbmdlZFNpbmNlID8gYD9jaGFuZ2VkU2luY2U9JHtjaGFuZ2VkU2luY2V9YCA6ICcnfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuc3RhdHVzID09PSAzMDQgPyAoeyB2YWxpZDogdHJ1ZSwgcGF5bG9hZDogbnVsbCB9KSA6IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlTGluayAoa2V5LCB1cGRhdGVTZXQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL2xpbmtzLyR7a2V5fWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncHV0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXBkYXRlU2V0KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxpbmsgKGluaXRTZXQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL2xpbmtzYCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaW5pdFNldCksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFVybHM6IHtcclxuICAgICAgICAgICAgcmVhZDogcmVhZFVybHNcclxuICAgICAgICB9LFxyXG4gICAgICAgIFNvdXJjZToge1xyXG4gICAgICAgICAgICBpbnNlcnQ6IHBvc3RTb3VyY2UsXHJcbiAgICAgICAgICAgIGZyb21Vcmw6IGFkZFNvdXJjZUZyb21VcmxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFN1YnNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICBzdWJzY3JpYmU6IGFkZFN1YnNjcmlwdGlvbnMsXHJcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlOiBkZWxldGVTdWJzY3JpcHRpb25zXHJcbiAgICAgICAgfSxcclxuICAgICAgICBMaW5rOiB7XHJcbiAgICAgICAgICAgIGluc2VydDogY3JlYXRlTGluayxcclxuICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGVMaW5rLFxyXG4gICAgICAgICAgICByZWFkOiByZWFkTGlua1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBwYXJzZSB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5jb25zdCBOQU1FU1BBQ0VTID0ge1xyXG4gICAgU1lOQzogJ3N5bmMnLFxyXG4gICAgTE9DQUw6ICdsb2NhbCdcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURCIChzdG9yYWdlKSB7XHJcbiAgICBjb25zdCB7IHJlYWQsIHdyaXRlIH0gPSBzdG9yYWdlXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVhZFNvdXJjZXMgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgcmVnaXN0cnkgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IHJlZ2lzdHJ5OiAnW1wic291cmNlcy0xXCJdJyB9KVxyXG4gICAgICAgIHJldHVybiBwYXJzZShyZWdpc3RyeSwgWydzb3VyY2VzLTEnXSlcclxuICAgICAgICAgICAgLnJlZHVjZSgoc291cmNlcywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3NvdXJjZXMsIHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IFtrZXldOiAnW10nIH0pXSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoW3NvdXJjZXMsIHNvdXJjZV0pID0+IHNvdXJjZXMuY29uY2F0KHBhcnNlKHNvdXJjZVtrZXldLCBbXSkpKVxyXG4gICAgICAgICAgICB9LCBQcm9taXNlLnJlc29sdmUoW10pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyaXRlU291cmNlcyAoc291cmNlcykge1xyXG4gICAgICAgIGNvbnN0IHJlZ2lzdHJ5ID0gW11cclxuICAgICAgICBjb25zdCB1cGRhdGVzID0ge31cclxuICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSBNYXRoLm1heCgxLCBNYXRoLmNlaWwoc291cmNlcy5sZW5ndGggLyAyMCkpOyB4KyspIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYHNvdXJjZXMtJHt4fWBcclxuICAgICAgICAgICAgcmVnaXN0cnkucHVzaChrZXkpXHJcbiAgICAgICAgICAgIHVwZGF0ZXNba2V5XSA9IEpTT04uc3RyaW5naWZ5KHNvdXJjZXMuc2xpY2UoKHggLSAxKSAqIDIwLCB4ICogMjApKVxyXG4gICAgICAgIH1cclxuICAgICAgICB1cGRhdGVzLnJlZ2lzdHJ5ID0gSlNPTi5zdHJpbmdpZnkocmVnaXN0cnkpXHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgdXBkYXRlcylcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBhZGRTb3VyY2UgKHNvdXJjZSkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCByZWFkU291cmNlcygpXHJcbiAgICAgICAgaWYgKCFzb3VyY2VzLnNvbWUoKHt1cmwsIG1hbmdhSWR9KSA9PiBzb3VyY2UudXJsID09PSB1cmwgJiYgbWFuZ2FJZCA9PT0gc291cmNlLm1hbmdhSWQpKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaChzb3VyY2UpXHJcbiAgICAgICAgICAgIGF3YWl0IHdyaXRlU291cmNlcyhzb3VyY2VzKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc291cmNlc1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVNvdXJjZSAoc291cmNlSWQpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgcmVhZFNvdXJjZXMoKVxyXG4gICAgICAgIGNvbnN0IG5ld1NvdXJjZXMgPSBzb3VyY2VzLmZpbHRlcigoc291cmNlKSA9PiBzb3VyY2U/LmlkICE9PSBzb3VyY2VJZClcclxuICAgICAgICBhd2FpdCB3cml0ZVNvdXJjZXMobmV3U291cmNlcylcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1NvdXJjZXNcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBpc0RpcnR5ICgpIHtcclxuICAgICAgICBjb25zdCB7IHVybHMsIHNvdXJjZXMgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgWyd1cmxzJywgJ3NvdXJjZXMnXSlcclxuXHJcbiAgICAgICAgcmV0dXJuICEhdXJscyB8fCAhIXNvdXJjZXNcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRGaWx0ZXJlZFNvcnRlZFVybHMgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaGlkZGVuQ2hhcHRlcnM6IGhpZGRlbkNoYXB0ZXJzU3RyaW5nLCBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JywgaGlkZTogMCB9KVxyXG4gICAgICAgIGNvbnN0IHsgdXJscyB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLkxPQ0FMLCB7IHVybHM6ICdbXScgfSlcclxuXHJcbiAgICAgICAgY29uc3QgaGlkZGVuQ2hhcHRlcnMgPSBwYXJzZShoaWRkZW5DaGFwdGVyc1N0cmluZywge30pXHJcbiAgICAgICAgY29uc3QgdXJsTGlzdCA9IHBhcnNlKHVybHMsIFtdKVxyXG5cclxuICAgICAgICBjb25zdCBjaGVja09sZCA9IChjaGFwdGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoaWRlICYmIGNoYXB0ZXIuY3JlYXRlZCA8IGhpZGUgfHwgaGlkZGVuQ2hhcHRlcnNbY2hhcHRlci5pZF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBbb2xkVXJscywgbmV3VXJsc10gPSBPYmplY3QudmFsdWVzKHVybExpc3QpXHJcbiAgICAgICAgICAgIC5zb3J0KCh1cmwxLCB1cmwyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaWZmID0gdXJsMi5jcmVhdGVkIC0gdXJsMS5jcmVhdGVkXHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZikgPCA1MDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKHVybDEpLmxvY2FsZUNvbXBhcmUodXJsMilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBkaWZmXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKFtvbGRVcmxzLCBuZXdVcmxzXSwgdXJsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tPbGQodXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9sZFVybHMucHVzaCh1cmwpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdVcmxzLnB1c2godXJsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtvbGRVcmxzLCBuZXdVcmxzXVxyXG4gICAgICAgICAgICB9LCBbW10sIFtdXSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgb2xkVXJscyxcclxuICAgICAgICAgICAgbmV3VXJsc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBoaWRlVXJsIChpZCkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nIH0pXHJcbiAgICAgICAgY29uc3QgaGlkZGVuQ2hhcHRlcnMgPSBwYXJzZShyZXN1bHQuaGlkZGVuQ2hhcHRlcnMsIHt9KVxyXG4gICAgICAgIGhpZGRlbkNoYXB0ZXJzW2lkXSA9IHRydWVcclxuICAgICAgICByZXR1cm4gd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiBKU09OLnN0cmluZ2lmeShoaWRkZW5DaGFwdGVycykgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBoaWRlQWxsVXJscyAodGltZXN0YW1wKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JywgaGlkZTogdGltZXN0YW1wIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd3JpdGVVcmxzICh1cmxzKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuTE9DQUwsIHsgdXJsczogSlNPTi5zdHJpbmdpZnkodXJscykgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBpbml0ICgpIHtcclxuICAgICAgICBjb25zdCB7IGhpZGUgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGU6IGZhbHNlIH0pXHJcbiAgICAgICAgaWYgKCFoaWRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKVxyXG4gICAgICAgICAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKVxyXG4gICAgICAgICAgICBhd2FpdCB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZTogdG9kYXkuZ2V0VGltZSgpfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2V0TWF4T2xkIChtYXhPbGQpIHtcclxuICAgICAgICBhd2FpdCB3cml0ZShOQU1FU1BBQ0VTLkxPQ0FMLCB7IG1heE9sZCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldE1heE9sZCAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBtYXhPbGQgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgeyBtYXhPbGQ6IDI1IH0pXHJcbiAgICAgICAgcmV0dXJuIG1heE9sZFxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldExpbmsgKGxpbmspIHtcclxuICAgICAgICBhd2FpdCB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgbGluayB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldExpbmsgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbGluayB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIFsnbGluayddKVxyXG4gICAgICAgIHJldHVybiBsaW5rXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0SGlkZSAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRlOiAwIH0pXHJcbiAgICAgICAgcmV0dXJuIGhpZGVcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiB3cml0ZUxvY2FsU2V0dGluZ3MgKHNldHRpbmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuTE9DQUwsIHsgbG9jYWxTZXR0aW5nczogSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYWxTZXR0aW5ncyAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBsb2NhbFNldHRpbmdzIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIHsgbG9jYWxTZXR0aW5nczogJ3t9JyB9KVxyXG4gICAgICAgIHJldHVybiBwYXJzZShsb2NhbFNldHRpbmdzLCB7fSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRMaW5rRGF0YSAoKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IHJlYWRTb3VyY2VzKClcclxuICAgICAgICBjb25zdCB7IGhpZGRlbkNoYXB0ZXJzOiBoaWRkZW5DaGFwdGVyc1N0cmluZywgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IDAgfSlcclxuICAgICAgICBjb25zdCBoaWRkZW5DaGFwdGVycyA9IHBhcnNlKGhpZGRlbkNoYXB0ZXJzU3RyaW5nLCB7fSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc291cmNlczogc291cmNlcy5tYXAoKHNvdXJjZSkgPT4gc291cmNlLmlkKSxcclxuICAgICAgICAgICAgaGlkZGVuQ2hhcHRlcnMsXHJcbiAgICAgICAgICAgIGhpZGU6IE51bWJlcihoaWRlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBzZXRMaW5rRGF0YSAoe3NvdXJjZXMsIGhpZGRlbkNoYXB0ZXJzLCBoaWRlfSkge1xyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgd3JpdGVTb3VyY2VzKHNvdXJjZXMpLFxyXG4gICAgICAgICAgICB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHtcclxuICAgICAgICAgICAgICAgIGhpZGRlbkNoYXB0ZXJzOiBKU09OLnN0cmluZ2lmeShoaWRkZW5DaGFwdGVycyksXHJcbiAgICAgICAgICAgICAgICBoaWRlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgXSlcclxuICAgIH1cclxuXHJcbiAgICBpbml0KClcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNvdXJjZXM6IHtcclxuICAgICAgICAgICAgcmVhZDogcmVhZFNvdXJjZXMsXHJcbiAgICAgICAgICAgIGltcG9ydDogd3JpdGVTb3VyY2VzLFxyXG4gICAgICAgICAgICBhZGQ6IGFkZFNvdXJjZSxcclxuICAgICAgICAgICAgZGVsZXRlOiBkZWxldGVTb3VyY2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIGxvY2FsOiB7XHJcbiAgICAgICAgICAgICAgICByZWFkOiBnZXRMb2NhbFNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgc2V0OiB3cml0ZUxvY2FsU2V0dGluZ3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNEaXJ0eSxcclxuICAgICAgICB1cmxzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IGdldEZpbHRlcmVkU29ydGVkVXJscyxcclxuICAgICAgICAgICAgaGlkZTogaGlkZVVybCxcclxuICAgICAgICAgICAgaGlkZUFsbDogaGlkZUFsbFVybHMsXHJcbiAgICAgICAgICAgIGltcG9ydDogd3JpdGVVcmxzLFxyXG4gICAgICAgICAgICBzZXRNYXhPbGQsXHJcbiAgICAgICAgICAgIGdldE1heE9sZCxcclxuICAgICAgICAgICAgZ2V0SGlkZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DaGFuZ2U6IHN0b3JhZ2UuYWRkTGlzdGVuZXIsXHJcbiAgICAgICAgbGluazoge1xyXG4gICAgICAgICAgICBzZXQ6IHNldExpbmssXHJcbiAgICAgICAgICAgIHJlYWQ6IGdldExpbmssXHJcbiAgICAgICAgICAgIGxvY2FsOiBnZXRMaW5rRGF0YSxcclxuICAgICAgICAgICAgc2V0TG9jYWw6IHNldExpbmtEYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBzYXZlQXMgZnJvbSAnc2F2ZS1hcydcclxuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEltcG9ydEhhbmRsZXJzIChkYikge1xyXG4gICAgY29uc3QgaW1wb3J0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbXBvcnQnKVxyXG4gICAgY29uc3QgZXhwb3J0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleHBvcnQnKVxyXG5cclxuICAgIGltcG9ydEVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF1cclxuICAgICAgICBjb25zdCBmciA9IG5ldyBGaWxlUmVhZGVyKClcclxuICAgICAgICBmci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VzID0gcGFyc2UoZnIucmVzdWx0LCBbXSlcclxuICAgICAgICAgICAgY29uc3QgY2xlYW4gPSBzb3VyY2VzLmZpbHRlcigoc291cmNlKSA9PiBzb3VyY2U/LnRpdGxlICYmIHNvdXJjZS51cmwgJiYgc291cmNlLm1hbmdhSWQpXHJcbiAgICAgICAgICAgIGlmIChjbGVhbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGRiLnNvdXJjZXMuaW1wb3J0KGNsZWFuKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGltcG9ydEVsZW0uZmlsZXMgPSBudWxsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBmci5yZWFkQXNUZXh0KGZpbGUpXHJcbiAgICB9KVxyXG5cclxuICAgIGV4cG9ydEVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgZGIuc291cmNlcy5yZWFkKClcclxuICAgICAgICAgICAgLnRoZW4oKHNvdXJjZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoc291cmNlcyldLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KVxyXG4gICAgICAgICAgICAgICAgc2F2ZUFzKGJsb2IsICdtYW5nYXBvbGwuanNvbicpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBnZXRMaW5rUXVlcnksIGxpbmtJZlVubGlua2VkIH0gZnJvbSAnLi9zZXR0aW5ncydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1lbnVMaXN0ZW5lcnMgKGRiLCBBcGkpIHtcclxuICAgIGNvbnN0IGltcG9ydFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuaW1wb3J0JylcclxuICAgIGNvbnN0IHBvcHVwVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wdXBUaXRsZScpXHJcbiAgICBjb25zdCBib29rbWFya3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkJylcclxuICAgIGNvbnN0IHVybHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJscycpXHJcbiAgICBjb25zdCBjaGFwdGVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFwdGVycycpXHJcbiAgICBjb25zdCBhZGRTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFNlY3Rpb24nKVxyXG4gICAgY29uc3Qgc291cmNlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VyY2VzJylcclxuICAgIGNvbnN0IHNldHRpbmdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldHRpbmdzJylcclxuICAgIGNvbnN0IHNldHRpbmdzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncycpXHJcbiAgICBjb25zdCBwcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9ncmVzcycpXHJcblxyXG4gICAgY29uc3Qgb3BlbkNoYXB0ZXJzID0gKCkgPT4ge1xyXG4gICAgICAgIHNvdXJjZXMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGltcG9ydFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGFkZFNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgdXJscy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBwcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBjaGFwdGVycy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgYm9va21hcmtzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHBvcHVwVGl0bGUuaW5uZXJUZXh0ID0gJ0NoYXB0ZXJzJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wZW5TZXR0aW5ncyA9ICgpID0+IHtcclxuICAgICAgICBzb3VyY2VzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBpbXBvcnRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBhZGRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIHVybHMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHBvcHVwVGl0bGUuaW5uZXJUZXh0ID0gJ1NldHRpbmdzJ1xyXG4gICAgICAgIGJvb2ttYXJrcy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBjaGFwdGVycy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICB9XHJcblxyXG4gICAgY2hhcHRlcnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuQ2hhcHRlcnMpXHJcblxyXG4gICAgYm9va21hcmtzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHNvdXJjZXMuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgICAgICBpbXBvcnRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICBhZGRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHByb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB1cmxzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwb3B1cFRpdGxlLmlubmVyVGV4dCA9ICdCb29rbWFya3MnXHJcbiAgICAgICAgYm9va21hcmtzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBjaGFwdGVycy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgIH0pXHJcblxyXG4gICAgc2V0dGluZ3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuU2V0dGluZ3MpXHJcblxyXG4gICAgaWYgKGdldExpbmtRdWVyeSgpKSB7XHJcbiAgICAgICAgb3BlblNldHRpbmdzKClcclxuICAgICAgICBsaW5rSWZVbmxpbmtlZChkYiwgQXBpKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgb3BlbkNoYXB0ZXJzKClcclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBwcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9ncmVzcycpXHJcblxyXG5sZXQgbG9ja2VkID0gZmFsc2VcclxuXHJcbmV4cG9ydCBjb25zdCByZXNpc3RlclByb2dyZXNzSGFuZGxlciA9ICh1cGRhdGVOb3cpID0+IHtcclxuICAgIHByb2dyZXNzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHVwZGF0ZU5vdygpXHJcbiAgICAgICAgbWFya1JlZnJlc2hlZCgpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWFya1JlZnJlc2hlZCA9ICgpID0+IHtcclxuICAgIHByb2dyZXNzLmlubmVySFRNTCA9ICcocmVmcmVzaGVkISknXHJcbiAgICBsb2NrZWQgPSB0cnVlXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBsb2NrZWQgPSBmYWxzZVxyXG4gICAgfSwgMTUwMClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVByb2dyZXNzID0gKF9sYXN0UGluZywgbmV4dFBpbmcpID0+IHtcclxuICAgIGlmICghbG9ja2VkKSB7XHJcbiAgICAgICAgY29uc3QgcmVtYWluaW5nID0gbmV4dFBpbmcgLSBEYXRlLm5vdygpXHJcblxyXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLm1heChNYXRoLnJvdW5kKHJlbWFpbmluZyAvIDEwMDApLCAwKVxyXG5cclxuICAgICAgICBwcm9ncmVzcy5pbm5lckhUTUwgPSBgKG5leHQgcmVmcmVzaDogJHtzZWNvbmRzfXMpYFxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTY2hlZHVsZSA9ICh7IGlzQWN0aXZlID0gZmFsc2UsIGludGVydmFsID0gMCwgY2FsbGJhY2sgPSBGdW5jdGlvbi5wcm90b3R5cGUsIHVwZGF0ZXIgfSA9IHt9KSA9PiB7XHJcbiAgICBsZXQgbmV4dFBpbmcgPSAwXHJcbiAgICBsZXQgbGFzdFBpbmcgPSAwXHJcbiAgICBjb25zdCBjYWxsQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKG5leHRQaW5nICYmIG5leHRQaW5nIDw9IERhdGUubm93KCkpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IG5leHRQaW5nXHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gbmV4dFBpbmcgKyBpbnRlcnZhbCA+IERhdGUubm93KCkgPyBuZXh0UGluZyArIGludGVydmFsIDogRGF0ZS5ub3coKSArIGludGVydmFsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR5cGVvZiB1cGRhdGVyID09PSAnZnVuY3Rpb24nICYmIHVwZGF0ZXIobGFzdFBpbmcsIG5leHRQaW5nKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0FjdGl2ZSAmJiBpbnRlcnZhbCkge1xyXG4gICAgICAgIG5leHRQaW5nID0gRGF0ZS5ub3coKSAtIDFcclxuICAgICAgICBjYWxsQ2FsbGJhY2soKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKGNhbGxDYWxsYmFjaywgMTAwKVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwgKG5ld0ludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3SW50ZXJ2YWwgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZSBhIG51bWJlcicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBuZXh0UGluZyAtIGludGVydmFsICsgbmV3SW50ZXJ2YWxcclxuICAgICAgICAgICAgaW50ZXJ2YWwgPSBuZXdJbnRlcnZhbFxyXG4gICAgICAgICAgICBjYWxsQ2FsbGJhY2soKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0Q2FsbGJhY2sgKGNiKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY2JcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IERhdGUubm93KClcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBEYXRlLm5vdygpICsgaW50ZXJ2YWxcclxuICAgICAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChjYWxsQ2FsbGJhY2ssIDEwMClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRyaWdnZXJJbnN0YW50bHkgKCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgICAgICAgIGxhc3RQaW5nID0gRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICBuZXh0UGluZyA9IERhdGUubm93KCkgKyBpbnRlcnZhbFxyXG4gICAgICAgICAgICB0eXBlb2YgdXBkYXRlciA9PT0gJ2Z1bmN0aW9uJyAmJiB1cGRhdGVyKGxhc3RQaW5nLCBuZXh0UGluZylcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0b3AgKCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxyXG4gICAgICAgICAgICBuZXh0UGluZyA9IDBcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImNvbnN0IGxpbmtGaWVsZHMgPSBbJ2hpZGUnLCAnaGlkZGVuQ2hhcHRlcnMnLCAnc291cmNlcyddXHJcblxyXG5mdW5jdGlvbiBmb3JtYXRLZXkgKGtleSA9ICcnKSB7XHJcbiAgICByZXR1cm4gYCR7a2V5LnNsaWNlKDAsIDUpfS0ke2tleS5zbGljZSg1LCAxMCl9LSR7a2V5LnNsaWNlKDEwLCAxNSl9YFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlua0hlbHBlcnMgKGRiLCBBcGkpIHtcclxuICAgIGFzeW5jIGZ1bmN0aW9uIHB1c2hMaW5rVXBkYXRlIChjaGFuZ2VzKSB7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlc2V0ID0gbGlua0ZpZWxkcy5maWx0ZXIoKGtleSkgPT4gT2JqZWN0LmtleXMoY2hhbmdlcykuc29tZSgoY2hhbmdlKSA9PiBjaGFuZ2UuaW5jbHVkZXMoa2V5KSkpXHJcblxyXG4gICAgICAgIGlmIChjaGFuZ2VzZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKSB8fCB7fVxyXG4gICAgICAgICAgICBjb25zdCBsb2NhbCA9IGF3YWl0IGRiLmxpbmsubG9jYWwoKSB8fCB7fVxyXG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0ge31cclxuICAgICAgICAgICAgaWYgKGNoYW5nZXNldC5pbmNsdWRlcygnaGlkZScpICYmIFN0cmluZyhsaW5rLmhpZGUpICE9PSBTdHJpbmcobG9jYWwuaGlkZSkpIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZXMuaGlkZSA9IGxvY2FsLmhpZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VzZXQuaW5jbHVkZXMoJ2hpZGRlbkNoYXB0ZXJzJykgJiZcclxuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGxpbmsuaGlkZGVuQ2hhcHRlcnMpICE9PSBKU09OLnN0cmluZ2lmeShsb2NhbC5oaWRkZW5DaGFwdGVycylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLmhpZGRlbkNoYXB0ZXJzID0gbG9jYWwuaGlkZGVuQ2hhcHRlcnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc2V0LmluY2x1ZGVzKCdzb3VyY2VzJykgJiYgKFxyXG4gICAgICAgICAgICAgICAgbGluay5zb3VyY2VzPy5sZW5ndGggIT09IGxvY2FsLnNvdXJjZXMubGVuZ3RoIHx8XHJcbiAgICAgICAgICAgICAgICBsaW5rLnNvdXJjZXMuc29tZSgoc291cmNlKSA9PiBzb3VyY2UgJiYgIWxvY2FsLnNvdXJjZXMuaW5jbHVkZXMoc291cmNlLmlkKSlcclxuICAgICAgICAgICAgKSkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlcy5zb3VyY2VzID0gbG9jYWwuc291cmNlc1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoY2hhbmdlcykubGVuZ3RoICYmIGxpbmsua2V5KSB7XHJcbiAgICAgICAgICAgICAgICBBcGkuTGluay51cGRhdGUobGluay5rZXksIGNoYW5nZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnZhbGlkICYmIGRiLmxpbmsuc2V0KHJlcy5wYXlsb2FkKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBmZXRjaExpbmtVcGRhdGUgKCkge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG5cclxuICAgICAgICBpZiAobGluaykge1xyXG4gICAgICAgICAgICBBcGkuTGluay5yZWFkKGxpbmsua2V5LCBsaW5rLmxhc3RNb2RpZmllZClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnZhbGlkICYmIHJlcy5wYXlsb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLmxpbmsuc2V0TG9jYWwocmVzLnBheWxvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLmxpbmsuc2V0KHJlcy5wYXlsb2FkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwdXNoTGlua1VwZGF0ZSxcclxuICAgICAgICBmZXRjaExpbmtVcGRhdGVcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNWYWxpZExpbmtLZXkgKGtleSkge1xyXG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xlYW5LZXkgPSBrZXkucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJylcclxuICAgIGlmIChjbGVhbktleS5sZW5ndGggPT09IDE1KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmtRdWVyeSAoKSB7XHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpXHJcblxyXG4gICAgaWYgKGlzVmFsaWRMaW5rS2V5KHVybFBhcmFtcy5nZXQoJ2xpbmsnKSkpIHtcclxuICAgICAgICByZXR1cm4gdXJsUGFyYW1zLmdldCgnbGluaycpLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsaW5rSWZVbmxpbmtlZCAoZGIsIGFwaSkge1xyXG4gICAgY29uc3Qga2V5ID0gZ2V0TGlua1F1ZXJ5KClcclxuXHJcbiAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudExpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG5cclxuICAgICAgICBpZiAoIWN1cnJlbnRMaW5rIHx8ICFjdXJyZW50TGluay5rZXkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlua0lucHV0MSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0xJylcclxuICAgICAgICAgICAgY29uc3QgbGlua0lucHV0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0yJylcclxuICAgICAgICAgICAgY29uc3QgbGlua0lucHV0MyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0zJylcclxuXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSBrZXkuc2xpY2UoMCwgNSlcclxuICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IGtleS5zbGljZSg1LCAxMClcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IGtleS5zbGljZSgxMCwgMTUpXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBjb25uZWN0VG9MaW5rKGtleSwgYXBpLCBkYilcclxuXHJcbiAgICAgICAgICAgIGlmIChsaW5rICYmIGxpbmsua2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rTnVtYmVyVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWlkJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluaycpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rTGlua1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXRleHQnKVxyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5saW5rLXNlY3Rpb24nKS5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rVGV4dC5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0xpbmsuaW5uZXJUZXh0ID0gYGh0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20/bGluaz0ke2xpbmsua2V5fWBcclxuICAgICAgICAgICAgICAgIGxpbmtMaW5rLmhyZWYgPSBgaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbT9saW5rPSR7bGluay5rZXl9YFxyXG4gICAgICAgICAgICAgICAgbGlua051bWJlclRleHQuaW5uZXJUZXh0ID0gYCR7bGluay5rZXkuc2xpY2UoMCwgNSl9LSR7bGluay5rZXkuc2xpY2UoNSwgMTApfS0ke2xpbmsua2V5LnNsaWNlKDEwKX1gXHJcbiAgICAgICAgICAgICAgICBsaW5rTnVtYmVyVGV4dC5zdHlsZS5jb2xvciA9ICcjMDAwYzIxJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZvcm1hdEtleShjdXJyZW50TGluay5rZXkpICE9PSBmb3JtYXRLZXkoa2V5KSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rTGlua1dhcm4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXdhcm5pbmcnKVxyXG4gICAgICAgICAgICBjb25zdCB3YXJuTGlua0N1cnJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2Fybi1jdXJyZW50LWxpbmsnKVxyXG4gICAgICAgICAgICBjb25zdCB3YXJuTGlua05ldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3YXJuLW5ldy1saW5rJylcclxuXHJcbiAgICAgICAgICAgIGxpbmtMaW5rV2Fybi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgICAgIHdhcm5MaW5rQ3VycmVudC5pbm5lclRleHQgPSBmb3JtYXRLZXkoY3VycmVudExpbmsua2V5KVxyXG4gICAgICAgICAgICB3YXJuTGlua05ldy5pbm5lclRleHQgPSBmb3JtYXRLZXkoa2V5KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY29ubmVjdFRvTGluayAoa2V5LCBhcGksIGRiKSB7XHJcbiAgICBjb25zdCB7IExpbmsgfSA9IGFwaVxyXG4gICAgY29uc3QgbGlua0Vycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstZXJyb3InKVxyXG4gICAgY29uc3QgbGlua1Byb2dyZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstcHJvZ3Jlc3MnKVxyXG4gICAgY29uc3QgY3JlYXRlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctbGluay1idXR0b24nKVxyXG4gICAgY29uc3QgbGlua0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWJ1dHRvbicpXHJcbiAgICBsaW5rRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgbGlua1Byb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICBjcmVhdGVMaW5rLmRpc2FibGVkID0gdHJ1ZVxyXG4gICAgbGlua0J1dHRvbi5kaXNhYmxlZCA9IHRydWVcclxuXHJcbiAgICBjb25zdCBsaW5rUmVzdWx0ID0gYXdhaXQgTGluay5yZWFkKGtleSlcclxuICAgIGNyZWF0ZUxpbmsuZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgbGlua0J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICBsaW5rUHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgaWYgKGxpbmtSZXN1bHQ/LnZhbGlkKSB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGxpbmtSZXN1bHQucGF5bG9hZFxyXG4gICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0KGxpbmspXHJcbiAgICAgICAgYXdhaXQgZGIubGluay5zZXRMb2NhbChsaW5rKVxyXG5cclxuICAgICAgICByZXR1cm4gbGlua1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbGlua0Vycm9yLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgIH1cclxuICAgIGNvbnN0IGxpbmtMaW5rV2FybiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmstd2FybmluZycpXHJcblxyXG4gICAgaWYgKGxpbmtMaW5rV2Fybikge1xyXG4gICAgICAgIGxpbmtMaW5rV2Fybi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTZXR0aW5nc0hhbmRsZXJzIChkYiwgYXBpKSB7XHJcbiAgICBjb25zdCB7IExpbmsgfSA9IGFwaVxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWxpbmstYnV0dG9uJylcclxuICAgIGNvbnN0IHVwZGF0ZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlLWxpbmtpbmcnKVxyXG4gICAgY29uc3QgbGlua051bWJlclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1pZCcpXHJcbiAgICBjb25zdCBsaW5rTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmsnKVxyXG4gICAgY29uc3QgbGlua0xpbmtUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluay10ZXh0JylcclxuICAgIGNvbnN0IGxpbmtpbmdTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstc2VjdGlvbicpXHJcbiAgICBjb25zdCB1bmxpbmtTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VubGluay1zZWN0aW9uJylcclxuICAgIGNvbnN0IHVubGlua0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bmxpbmstYnV0dG9uJylcclxuICAgIGNvbnN0IGxpbmtCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1idXR0b24nKVxyXG4gICAgY29uc3QgbGlua0lucHV0MSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0xJylcclxuICAgIGNvbnN0IGxpbmtJbnB1dDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMicpXHJcbiAgICBjb25zdCBsaW5rSW5wdXQzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTMnKVxyXG5cclxuICAgIGxpbmtJbnB1dDEuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbnVtYmVyID0gbGlua0lucHV0MS52YWx1ZS5yZXBsYWNlQWxsKC9bXlxcZF0qL2csICcnKS5zbGljZSgwLCAxNSlcclxuICAgICAgICBsaW5rSW5wdXQxLnZhbHVlID0gbnVtYmVyLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgaWYgKG51bWJlci5sZW5ndGggPiA1KSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSBudW1iZXIuc2xpY2UoNSwgMTApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChudW1iZXIubGVuZ3RoID4gMTApIHtcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IG51bWJlci5zbGljZSgxMClcclxuICAgICAgICAgICAgbGlua0lucHV0My5mb2N1cygpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuc2V0U2VsZWN0aW9uUmFuZ2UobnVtYmVyLmxlbmd0aCAtIDEwLCBudW1iZXIubGVuZ3RoIC0gMTApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG51bWJlci5sZW5ndGggPj0gNSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLmZvY3VzKClcclxuICAgICAgICAgICAgbGlua0lucHV0Mi5zZXRTZWxlY3Rpb25SYW5nZShudW1iZXIubGVuZ3RoIC0gNSwgbnVtYmVyLmxlbmd0aCAtIDUpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGxpbmtJbnB1dDIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbnVtYmVyID0gbGlua0lucHV0Mi52YWx1ZS5yZXBsYWNlQWxsKC9bXlxcZF0qL2csICcnKS5zbGljZSgwLCAxMClcclxuICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gbnVtYmVyLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgaWYgKG51bWJlci5sZW5ndGggPj0gNSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gbnVtYmVyLnNsaWNlKDUsIDEwKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLmZvY3VzKClcclxuICAgICAgICAgICAgbGlua0lucHV0My5zZXRTZWxlY3Rpb25SYW5nZShudW1iZXIubGVuZ3RoIC0gNSwgbnVtYmVyLmxlbmd0aCAtIDUpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGxpbmtJbnB1dDMuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbnVtYmVyID0gbGlua0lucHV0My52YWx1ZS5yZXBsYWNlQWxsKC9bXlxcZF0qL2csICcnKS5zbGljZSgwLCA1KVxyXG4gICAgICAgIGlmIChsaW5rSW5wdXQzLnZhbHVlICE9PSBudW1iZXIuc2xpY2UoMCwgNSkpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IG51bWJlci5zbGljZSgwLCA1KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgZnVuY3Rpb24gd3JpdGVTdGF0ZVRvRG9tIChsaW5rKSB7XHJcbiAgICAgICAgbGlua2luZ1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9IGxpbmsgPyAnbm9uZScgOiAnJ1xyXG4gICAgICAgIHVubGlua1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9IGxpbmsgPyAnJyA6ICdub25lJ1xyXG4gICAgICAgIGlmIChsaW5rTGlua1RleHQpIHtcclxuICAgICAgICAgICAgbGlua0xpbmtUZXh0LnN0eWxlLmRpc3BsYXkgPSBsaW5rID8gJycgOiAnbm9uZSdcclxuICAgICAgICAgICAgbGlua0xpbmsuc3R5bGUuZGlzcGxheSA9IGxpbmsgPyAnJyA6ICdub25lJ1xyXG4gICAgICAgICAgICBsaW5rTGluay5pbm5lclRleHQgPSBsaW5rID8gYGh0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20/bGluaz0ke2xpbmsua2V5fWAgOiAnJ1xyXG4gICAgICAgICAgICBsaW5rTGluay5ocmVmID0gbGluayA/IGBodHRwczovL21hbmdhLmZvY2hsYWMuY29tP2xpbms9JHtsaW5rLmtleX1gIDogJydcclxuICAgICAgICB9XHJcbiAgICAgICAgbGlua051bWJlclRleHQuaW5uZXJUZXh0ID0gbGluayA/IGZvcm1hdEtleShsaW5rLmtleSkgOiAnVW5saW5rZWQnXHJcbiAgICAgICAgbGlua051bWJlclRleHQuc3R5bGUuY29sb3IgPSBsaW5rID8gJyMwMDBjMjEnIDogJyNjM2NiZDInXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICB3cml0ZVN0YXRlVG9Eb20obGluaylcclxuXHJcbiAgICBpZiAodXBkYXRlTGluaykge1xyXG4gICAgICAgIHVwZGF0ZUxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGdldExpbmtRdWVyeSgpXHJcblxyXG4gICAgICAgICAgICBsaW5rSW5wdXQxLnZhbHVlID0ga2V5LnNsaWNlKDAsIDUpXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSBrZXkuc2xpY2UoNSwgMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBrZXkuc2xpY2UoMTAsIDE1KVxyXG4gICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldChudWxsKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXdhcm5pbmcnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbSgpXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbm5lY3RUb0xpbmsoa2V5LCBhcGksIGRiKVxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20ocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmtMaW5rV2FybiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWVycm9yJylcclxuXHJcbiAgICAgICAgaWYgKGxpbmtMaW5rV2Fybikge1xyXG4gICAgICAgICAgICBsaW5rTGlua1dhcm4uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgY29uc3QgbGlua0RhdGEgPSBhd2FpdCBkYi5saW5rLmxvY2FsKClcclxuICAgICAgICAgICAgY29uc3QgbmV3TGlua1Jlc3VsdCA9IGF3YWl0IExpbmsuaW5zZXJ0KGxpbmtEYXRhKVxyXG4gICAgICAgICAgICBpZiAobmV3TGlua1Jlc3VsdD8udmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBuZXdMaW5rUmVzdWx0LnBheWxvYWRcclxuICAgICAgICAgICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0KGxpbmspXHJcbiAgICAgICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20obGluaylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICB1bmxpbmtCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcbiAgICAgICAgaWYgKGxpbmspIHtcclxuICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXQobnVsbClcclxuICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKHVuZGVmaW5lZClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGlua0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgICAgICBpZiAoIWxpbmspIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7bGlua0lucHV0MS52YWx1ZX0ke2xpbmtJbnB1dDIudmFsdWV9JHtsaW5rSW5wdXQzLnZhbHVlfWBcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29ubmVjdFRvTGluayhrZXksIGFwaSwgZGIpXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbShyZXN1bHQpXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQxLnZhbHVlID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBzb3VyY2VSZW5kZXJlciAoZGIpIHtcclxuICAgIGNvbnN0IHNvdXJjZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291cmNlcycpXHJcblxyXG4gICAgc291cmNlcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsb3Nlc3QgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnJvdyAuYWN0aW9uLmRlbGV0ZScpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3QgJiYgY2xvc2VzdC5kYXRhc2V0WydpZCddICYmIHNvdXJjZXMuY29udGFpbnMoY2xvc2VzdCkpIHtcclxuICAgICAgICAgICAgZGIuc291cmNlcy5kZWxldGUoY2xvc2VzdC5kYXRhc2V0WydpZCddKVxyXG4gICAgICAgICAgICBjbG9zZXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGlvbicpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiByZW5kZXJTb3VyY2VzICgpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZGIuc291cmNlcy5yZWFkKClcclxuXHJcbiAgICAgICAgc291cmNlcy5pbm5lckhUTUwgPSBkYXRhXHJcbiAgICAgICAgICAgIC5zb3J0KChzb3VyY2UxLCBzb3VyY2UyKSA9PiBTdHJpbmcoc291cmNlMS50aXRsZSkubG9jYWxlQ29tcGFyZShzb3VyY2UyPy50aXRsZSkpXHJcbiAgICAgICAgICAgIC5tYXAoKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IFN0cmluZyhzb3VyY2UudXJsKS5yZXBsYWNlKC9odHRwcz86XFwvXFwvLywgJycpLnNwbGl0KCcvJylbMF1cclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgYDxsaSBjbGFzcz1cInJvdyBzb3VyY2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGFcIiB0aXRsZT1cIiR7YCR7c291cmNlLnRpdGxlfSAoJHt1cmx9KWB9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+JHtzb3VyY2UudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYW5nYS1pZFwiPigke3VybH0pPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWxldGUgYWN0aW9uXCIgZGF0YS1pZD1cIiR7c291cmNlLmlkfVwiPkRlbGV0ZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPmBcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmpvaW4oJ1xcbicpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXI6ICgpID0+IHJlbmRlclNvdXJjZXMoKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IHBhZCB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXJsUmVuZGVyZXIgKGRiKSB7XHJcbiAgICBjb25zdCB1cmxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybHMnKVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGhpZGUgKGlkKSB7XHJcbiAgICAgICAgY29uc3QgeyBuZXdVcmxzLCBvbGRVcmxzIH0gPSBhd2FpdCBkYi51cmxzLnJlYWQoKVxyXG4gICAgICAgIGlmIChuZXdVcmxzLmxlbmd0aCA8PSAxICYmICghbmV3VXJsc1swXSB8fCBuZXdVcmxzWzBdLmlkID09PSBpZCkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGF0ZXN0Q2hhcHRlckRhdGUgPSBvbGRVcmxzLmNvbmNhdChuZXdVcmxzKVxyXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgobGNkLCB1cmwpID0+IHVybC5jcmVhdGVkID4gbGNkID8gdXJsLmNyZWF0ZWQgOiBsY2QsIDApXHJcblxyXG4gICAgICAgICAgICBkYi51cmxzLmhpZGVBbGwobGF0ZXN0Q2hhcHRlckRhdGUgKyAxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGIudXJscy5oaWRlKGlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cmxzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2xvc2VzdEhpZGUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnJvdyAuaGlkZScpXHJcblxyXG4gICAgICAgIGlmIChjbG9zZXN0SGlkZSAmJiBjbG9zZXN0SGlkZS5kYXRhc2V0WydpZCddICYmIHVybHMuY29udGFpbnMoY2xvc2VzdEhpZGUpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGhpZGUoY2xvc2VzdEhpZGUuZGF0YXNldFsnaWQnXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2xvc2VzdExpbmsgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnJvdy5uZXcgLmxpbmsnKVxyXG4gICAgICAgIGlmIChjbG9zZXN0TGluayAmJiBjbG9zZXN0TGluay5kYXRhc2V0WydpZCddICYmIHVybHMuY29udGFpbnMoY2xvc2VzdExpbmspKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgYXdhaXQgaGlkZShjbG9zZXN0TGluay5kYXRhc2V0WydpZCddKVxyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihjbG9zZXN0TGluay5ocmVmLCAnX2JsYW5rJylcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2xvc2VzdE1vcmUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmFjdGlvbi5sb2FkLW1vcmUnKVxyXG4gICAgICAgIGlmIChjbG9zZXN0TW9yZSAmJiB1cmxzLmNvbnRhaW5zKGNsb3Nlc3RNb3JlKSkge1xyXG4gICAgICAgICAgICBjb25zdCBtYXhPbGQgPSBhd2FpdCBkYi51cmxzLmdldE1heE9sZCgpXHJcbiAgICAgICAgICAgIGF3YWl0IGRiLnVybHMuc2V0TWF4T2xkKG1heE9sZCArIDEwMClcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaGlkZUFsbCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuaGlkZS1hbGwnKVxyXG4gICAgICAgIGlmIChoaWRlQWxsICYmIHVybHMuY29udGFpbnMoaGlkZUFsbCkpIHtcclxuICAgICAgICAgICAgYXdhaXQgZGIudXJscy5oaWRlQWxsKERhdGUubm93KCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRvcCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudG9wJylcclxuICAgICAgICBpZiAodG9wICYmIHVybHMuY29udGFpbnModG9wKSkge1xyXG4gICAgICAgICAgICB1cmxzLnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogJ3Ntb290aCcgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGxldCBtYXhTY3JvbGwgPSAwXHJcbiAgICB1cmxzLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSB1cmxzLm9mZnNldEhlaWdodCArIHVybHMuc2Nyb2xsVG9wXHJcbiAgICAgICAgaWYgKHVybHMuc2Nyb2xsSGVpZ2h0IC0gc2Nyb2xsSGVpZ2h0IDw9IDUwICYmIG1heFNjcm9sbCAhPT0gdXJscy5zY3JvbGxIZWlnaHQpIHtcclxuICAgICAgICAgICAgbWF4U2Nyb2xsID0gdXJscy5zY3JvbGxIZWlnaHRcclxuICAgICAgICAgICAgY29uc3QgbWF4T2xkID0gYXdhaXQgZGIudXJscy5nZXRNYXhPbGQoKVxyXG4gICAgICAgICAgICBkYi51cmxzLnNldE1heE9sZChtYXhPbGQgKyAxMDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoZWNrVG9wQnV0dG9uKClcclxuICAgIH0pXHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tUb3BCdXR0b24gKCkge1xyXG4gICAgICAgIGlmICh1cmxzLnNjcm9sbFRvcCA+IDAgJiYgdXJscy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPT09IHVybHMucXVlcnlTZWxlY3RvcignLm9sZC1jaGFwdGVycycpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCkge1xyXG4gICAgICAgICAgICB1cmxzLnF1ZXJ5U2VsZWN0b3IoJy5vbGQtY2hhcHRlcnMgLnRvcCcpLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdXJscy5xdWVyeVNlbGVjdG9yKCcub2xkLWNoYXB0ZXJzIC50b3AnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVybFJlbmRlcmVyIChpc09sZCkge1xyXG4gICAgICAgIHJldHVybiAoY2hhcHRlcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoY2hhcHRlci5jcmVhdGVkKVxyXG4gICAgICAgICAgICBjb25zdCB0aW1lU3RyaW5nID0gYCR7cGFkKGRhdGUuZ2V0SG91cnMoKSl9OiR7cGFkKGRhdGUuZ2V0TWludXRlcygpKX1gXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBgJHtwYWQoZGF0ZS5nZXREYXRlKCkpfS4ke3BhZChkYXRlLmdldE1vbnRoKCkgKyAxKX0uJHtTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKS5zbGljZSgtMil9YFxyXG4gICAgICAgICAgICBjb25zdCBmdWxsRGF0ZSA9IGRhdGUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdID09PSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSA/IHRpbWVTdHJpbmcgOiBkYXRlU3RyaW5nXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicm93JHtpc09sZCA/ICcgb2xkJyA6ICcgbmV3J31cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxpbmtcIiBocmVmPVwiJHtjaGFwdGVyLnVybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lclwiIGRhdGEtaWQ9XCIke2NoYXB0ZXIuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7Y2hhcHRlci50aXRsZX0gLSBDaGFwdGVyICR7Y2hhcHRlci5jaGFwdGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGUtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGVcIiB0aXRsZT1cIiR7YCR7ZGF0ZVN0cmluZ30gJHt0aW1lU3RyaW5nfWB9XCI+JHtmdWxsRGF0ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGlkZVwiIGRhdGEtaWQ9XCIke2NoYXB0ZXIuaWR9XCI+SGlkZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2xpPmBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyVXJscyAoKSB7XHJcbiAgICAgICAgY29uc3QgbWF4T2xkID0gYXdhaXQgZGIudXJscy5nZXRNYXhPbGQoKVxyXG4gICAgICAgIGNvbnN0IHsgbmV3VXJscywgb2xkVXJscyB9ID0gYXdhaXQgZGIudXJscy5yZWFkKClcclxuICAgICAgICBjb25zdCBuZXdSb3dzID0gbmV3VXJscy5tYXAoY3JlYXRlVXJsUmVuZGVyZXIoZmFsc2UpKVxyXG4gICAgICAgIGNvbnN0IG9sZFJvd3MgPSBvbGRVcmxzLm1hcChjcmVhdGVVcmxSZW5kZXJlcih0cnVlKSlcclxuXHJcbiAgICAgICAgaWYgKG5ld1Jvd3MubGVuZ3RoIHx8IG9sZFJvd3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHVybHMuaW5uZXJIVE1MID0gW11cclxuICAgICAgICAgICAgICAgIC5jb25jYXQobmV3Um93cy5sZW5ndGggPyAnPGxpIGNsYXNzPVwibmV3LWNoYXB0ZXJzXCI+TmV3IENoYXB0ZXJzIDxzcGFuIGNsYXNzPVwiYWN0aW9uIGhpZGUtYWxsXCI+SGlkZSBhbGw8L3NwYW4+PC9saT4nIDogW10pXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG5ld1Jvd3MpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KCc8bGkgY2xhc3M9XCJvbGQtY2hhcHRlcnNcIj5PbGQgQ2hhcHRlcnMgPHNwYW4gY2xhc3M9XCJhY3Rpb24gdG9wXCI+VG9wICYjODU5Mzs8L3NwYW4+PC9saT4nKVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdChvbGRSb3dzLnNsaWNlKDAsIG1heE9sZCkpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG9sZFJvd3MubGVuZ3RoID49IG1heE9sZCA/IFsnPGxpIGNsYXNzPVwiYWN0aW9uIGxvYWQtbW9yZVwiPkxvYWQgdXAgdG8gMTAwIG1vcmUgb2xkIGNoYXB0ZXJzLi4uPC9saT4nXSA6IFtdKVxyXG4gICAgICAgICAgICAgICAgLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gbmV3Um93cy5sZW5ndGggPyBgKCR7bmV3Um93cy5sZW5ndGh9KSBNYW5nYSBQb2xsYCA6ICdNYW5nYSBQb2xsJ1xyXG4gICAgICAgICAgICBjaGVja1RvcEJ1dHRvbigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1cmxzLmlubmVySFRNTCA9ICc8bGkgY2xhc3M9XCJyb3dcIj5ObyBDaGFwdGVycyBhdmFpbGFibGUuPC9saT4nXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gJ01hbmdhIFBvbGwnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVuZGVyOiAoKSA9PiByZW5kZXJVcmxzKClcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gcGFyc2UgKHN0cmluZywgZmFsbGJhY2spIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nKVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gZmFsbGJhY2tcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhZCAobm8pIHtcclxuICAgIHJldHVybiAoJzAwJyArIG5vKS5zbGljZSgtMilcclxufVxyXG4iLCJpbXBvcnQgeyBBUEkgfSBmcm9tICcuLi9jb21tb24vYXBpJ1xyXG5pbXBvcnQgeyBBUElfQUREUkVTUyB9IGZyb20gJy4vY29uc3RhbnRzJ1xyXG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vc3RvcmFnZSdcclxuXHJcbmxldCBjdXJyZW50U291cmNlID0gbnVsbFxyXG5cclxuY29uc3QgYm9va21hcmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9va21hcmsnKVxyXG5jb25zdCBib29rbWFya1RyYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvb2ttYXJrLXRyYWNrJylcclxuY29uc3QgYm9va21hcmtUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib29rbWFyay10aXRsZScpXHJcblxyXG5jb25zdCB7IFNvdXJjZSB9ID0gQVBJKEFQSV9BRERSRVNTKVxyXG5cclxuYm9va21hcmtUcmFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGJvb2ttYXJrLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIGJvb2ttYXJrVGl0bGUuaW5uZXJUZXh0ID0gJydcclxuICAgIFNvdXJjZS5pbnNlcnQoY3VycmVudFNvdXJjZSlcclxuICAgICAgICAudGhlbigoc291cmNlKSA9PiBzb3VyY2UgJiYgZGIuc291cmNlcy5hZGQoc291cmNlKSlcclxuICAgIGN1cnJlbnRTb3VyY2UgPSBudWxsXHJcbn0pXHJcblxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoYXN5bmMgKHJlcXVlc3QpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKHJlcXVlc3QpXHJcbiAgICBpZiAocmVxdWVzdC5pZCAmJiByZXF1ZXN0LnRpdGxlICYmIHJlcXVlc3QudXJsKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IGRiLnNvdXJjZXMucmVhZCgpXHJcblxyXG4gICAgICAgIGlmICghc291cmNlcy5zb21lKChzb3VyY2UpID0+IHNvdXJjZS51cmwgPT09IHJlcXVlc3QudXJsICYmIFN0cmluZyhzb3VyY2UubWFuZ2FJZCkgPT09IFN0cmluZyhyZXF1ZXN0LmlkKSkpIHtcclxuICAgICAgICAgICAgYm9va21hcmsuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgICAgICAgICBib29rbWFya1RpdGxlLmlubmVyVGV4dCA9IGBEbyB5b3Ugd2FudCB0byBzdGFydCB0cmFja2luZyBcIiR7cmVxdWVzdC50aXRsZX1cIj9gXHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiByZXF1ZXN0LnR5cGUsXHJcbiAgICAgICAgICAgICAgICBtYW5nYUlkOiByZXF1ZXN0LmlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHJlcXVlc3QudGl0bGUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IHJlcXVlc3QudXJsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJvb2ttYXJrLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIGJvb2ttYXJrVGl0bGUuaW5uZXJUZXh0ID0gJydcclxuICAgIGN1cnJlbnRTb3VyY2UgPSBudWxsXHJcbn0pXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdEJvb2ttYXJrICgpIHtcclxuICAgIGNocm9tZS50YWJzLnF1ZXJ5KFxyXG4gICAgICAgIHsgYWN0aXZlOiB0cnVlLCB3aW5kb3dJZDogY2hyb21lLndpbmRvd3MuV0lORE9XX0lEX0NVUlJFTlQgfSxcclxuICAgICAgICAodGFicykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRhYnNbMF0udXJsLmluY2x1ZGVzKCdjaHJvbWU6Ly8nKSkge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHsgdGFyZ2V0OiB7IHRhYklkOiB0YWJzWzBdLmlkIH0sIGZ1bmN0aW9uOiB0ZXN0IH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRlc3QgKCkge1xyXG4gICAgZnVuY3Rpb24gZGVjb2RlSFRNTEVudGl0aWVzIChzdHIpIHtcclxuICAgICAgICBpZiAoc3RyICYmIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvPHNjcmlwdFtePl0qPihbXFxTXFxzXSo/KTxcXC9zY3JpcHQ+L2dtaSwgJycpXHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC88XFwvP1xcdyg/OlteXCInPl18XCJbXlwiXSpcInwnW14nXSonKSo+L2dtaSwgJycpXHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gc3RyXHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnRleHRDb250ZW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHJcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0RmFuRm94ICgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUubWF0Y2goL15cXC9tYW5nYVxcL1teL10qXFwvLyk/LlswXVxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVhZGVyLWhlYWRlci10aXRsZS0xIGE6Zmlyc3QtY2hpbGQnKT8uaW5uZXJUZXh0IHx8XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWwtaW5mby1yaWdodC10aXRsZS1mb250Jyk/LmlubmVyVGV4dFxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnZmFuZm94JyxcclxuICAgICAgICAgICAgaWQ6IHVybCA/IHVybC5zcGxpdCgnLycpWzJdIDogbnVsbCxcclxuICAgICAgICAgICAgdGl0bGU6IG5hbWUsXHJcbiAgICAgICAgICAgIHVybDogdXJsID8gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0ke3VybH1gIDogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0TWFuZ2FkZXggKCkge1xyXG4gICAgICAgIGlmICgvdGl0bGVcXC9bXFxkLVxcd10qXFwvW1xcZC1cXHddKi8udGVzdCh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk/LlsyXVxyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hbmdhLWNvbnRhaW5lciAudGl0bGUgcCcpPy5pbm5lclRleHRcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnbWFuZ2FkZXgnLFxyXG4gICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIHVybDogaWQgPyBgaHR0cHM6Ly9hcGkubWFuZ2FkZXgub3JnL21hbmdhLyR7aWR9YCA6IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgvY2hhcHRlclxcL1tcXGQtXFx3XSpcXC9cXGQqLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EudGV4dC1wcmltYXJ5W2hyZWYqPVwiL3RpdGxlL1wiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBsaW5rPy5pbm5lclRleHRcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBsaW5rPy5ocmVmLnNwbGl0KCcvJyk/Lls0XVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdtYW5nYWRleCcsXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBpZCA/IGBodHRwczovL2FwaS5tYW5nYWRleC5vcmcvbWFuZ2EvJHtpZH1gIDogbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RNYWRhcm8gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlIChzdHJpbmcsIGZhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHJpbmcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxsYmFja1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpZHMgPSBbXHJcbiAgICAgICAgICAgIHdpbmRvdz8ubWFuZ2E/Lm1hbmdhX2lkLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0aW5nLXBvc3QtaWQnKT8udmFsdWUsXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cC1tYW5nYS1hY3Rpb24tYnV0dG9uJyk/LmRhdGFzZXQ/LlsncG9zdCddLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhcHRlci1zZWxlY3Rpb24nKT8uZGF0YXNldD8uWydtYW5nYSddLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuZ2EtY2hhcHRlcnMtaG9sZGVyJyk/LmRhdGFzZXQ/LlsnaWQnXSxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hbmdhLXJlYWRpbmctbmF2LWhlYWQnKT8uZGF0YXNldD8uWydpZCddLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuZ2EtcmVhZGluZy1uYXYtZm9vdCcpPy5kYXRhc2V0Py5bJ2lkJ11cclxuICAgICAgICBdXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKHRpdGxlKSA9PiB0aXRsZSlcclxuICAgICAgICAgICAgLnJlZHVjZSgobWFwLCBpZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWFwW2lkXSA9IHR5cGVvZiBtYXBbaWRdID09PSAnbnVtYmVyJyA/IG1hcFtpZF0gKyAxIDogMVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcFxyXG4gICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICBjb25zdCBpZCA9IE9iamVjdC5rZXlzKGlkcykuc29ydCgoaWQxLCBpZDIpID0+IGlkc1tpZDFdIC0gaWRzW2lkMl0pWzBdXHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LXRpdGxlIGgxJylcclxuICAgICAgICBjb25zdCB0aXRsZXMgPSBbXHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCJdJykpXHJcbiAgICAgICAgICAgICAgICAubWFwKChzY3JpcHQpID0+IHBhcnNlKHNjcmlwdC5pbm5lclRleHQpPy5oZWFkbGluZSkuZmluZCgoaCkgPT4gaCksXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFwdGVyLWhlYWRpbmcnKT8uaW5uZXJUZXh0Py5zcGxpdCgnIC0gJylbMF0sXHJcbiAgICAgICAgICAgIGhlYWRlciAmJiBBcnJheS5mcm9tKGhlYWRlci5jaGlsZE5vZGVzKS5yZWR1Y2UoKHRpdGxlLCBub2RlKSA9PiB0aXRsZSArIChub2RlLm5vZGVUeXBlID09PSAzID8gbm9kZS50ZXh0Q29udGVudCA6ICcnKSwgJycpLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0ZS10aXRsZScpPy50aXRsZVxyXG4gICAgICAgIF1cclxuICAgICAgICAgICAgLmZpbHRlcigodGl0bGUpID0+IHRpdGxlKVxyXG4gICAgICAgICAgICAucmVkdWNlKChtYXAsIHRpdGxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhbiA9IGRlY29kZUhUTUxFbnRpdGllcyh0aXRsZSkudHJpbSgpXHJcbiAgICAgICAgICAgICAgICBtYXBbY2xlYW5dID0gdHlwZW9mIG1hcFtjbGVhbl0gPT09ICdudW1iZXInID8gbWFwW2NsZWFuXSArIDEgOiAxXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwXHJcbiAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gT2JqZWN0LmtleXModGl0bGVzKS5zb3J0KCh0aXRsZTEsIHRpdGxlMikgPT4gdGl0bGVzW3RpdGxlMV0gLSB0aXRsZXNbdGl0bGUyXSlbMF1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ21hZGFybycsXHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgdXJsOiBkb2N1bWVudD8ubG9jYXRpb24/Lm9yaWdpbiA/IGAke2RvY3VtZW50LmxvY2F0aW9uLm9yaWdpbn0vd3AtYWRtaW4vYWRtaW4tYWpheC5waHBgIDogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzdWx0XHJcblxyXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09PSAnZmFuZm94Lm5ldCcpIHtcclxuICAgICAgICByZXN1bHQgPSB0ZXN0RmFuRm94KClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09PSAnbWFuZ2FkZXgub3JnJykge1xyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RNYW5nYWRleCgpXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXN1bHQgPSB0ZXN0TWFkYXJvKClcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocmVzdWx0KVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJleHBvcnQgY29uc3QgQVBJX0FERFJFU1MgPSAnaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbScgLy8gJ2h0dHA6Ly9sb2NhbGhvc3Q6NDMyMTQnXHJcbiIsImltcG9ydCB7IGNyZWF0ZURCIH0gZnJvbSAnLi4vY29tbW9uL2RiJ1xyXG5cclxuZnVuY3Rpb24gcmVhZCAobmFtZXNwYWNlLCBrZXlzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IGNocm9tZS5zdG9yYWdlW25hbWVzcGFjZV0uZ2V0KGtleXMsIHJlc29sdmUpKVxyXG59XHJcblxyXG5mdW5jdGlvbiB3cml0ZSAobmFtZXNwYWNlLCBrZXlQYWlycykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBjaHJvbWUuc3RvcmFnZVtuYW1lc3BhY2VdLnNldChrZXlQYWlycywgcmVzb2x2ZSkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZExpc3RlbmVyIChjYWxsYmFjaykge1xyXG4gICAgcmV0dXJuIGNocm9tZS5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihjYWxsYmFjaylcclxufVxyXG5cclxuY29uc3Qgc3RvcmFnZSA9IHtcclxuICAgIHJlYWQsIHdyaXRlLCBhZGRMaXN0ZW5lclxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGIgPSBjcmVhdGVEQihzdG9yYWdlKVxyXG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyogRmlsZVNhdmVyLmpzXHJcbiAqIEEgc2F2ZUFzKCkgRmlsZVNhdmVyIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXHJcbiAqIEVTNmlmaWVkIGJ5IENvbGUgQ2hhbWJlcmxhaW4sIGh0dHBzOi8vZ2l0aHViLmNvbS9jY2hhbWJlcmxhaW5cclxuICpcclxuICogTGljZW5zZTogTUlUXHJcbiAqICAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXHJcbiAqL1xuXG4vKmdsb2JhbCBzZWxmICovXG4vKmpzbGludCBiaXR3aXNlOiB0cnVlLCBpbmRlbnQ6IDQsIGxheGJyZWFrOiB0cnVlLCBsYXhjb21tYTogdHJ1ZSwgc21hcnR0YWJzOiB0cnVlLCBwbHVzcGx1czogdHJ1ZSAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvRmlsZVNhdmVyLmpzL2Jsb2IvbWFzdGVyL0ZpbGVTYXZlci5qcyAqL1xuXG52YXIgc2F2ZUFzID0gZXhwb3J0cy5zYXZlQXMgPSB3aW5kb3cuc2F2ZUFzIHx8IGZ1bmN0aW9uICh2aWV3KSB7XG4gIC8vIElFIDwxMCBpcyBleHBsaWNpdGx5IHVuc3VwcG9ydGVkXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvTVNJRSBbMS05XVxcLi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkgcmV0dXJuO1xuICB2YXIgZG9jID0gdmlldy5kb2N1bWVudDtcbiAgLy8gb25seSBnZXQgVVJMIHdoZW4gbmVjZXNzYXJ5IGluIGNhc2UgQmxvYi5qcyBoYXNuJ3Qgb3ZlcnJpZGRlbiBpdCB5ZXRcbiAgdmFyIGdldF9VUkwgPSBmdW5jdGlvbiBnZXRfVVJMKCkge1xuICAgIHJldHVybiB2aWV3LlVSTCB8fCB2aWV3LndlYmtpdFVSTCB8fCB2aWV3O1xuICB9O1xuICB2YXIgc2F2ZV9saW5rID0gZG9jLmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsICdhJyk7XG4gIHZhciBjYW5fdXNlX3NhdmVfbGluayA9ICdkb3dubG9hZCcgaW4gc2F2ZV9saW5rO1xuICB2YXIgY2xpY2sgPSBmdW5jdGlvbiBjbGljayhub2RlKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ2NsaWNrJyk7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfTtcbiAgdmFyIGlzX3NhZmFyaSA9IC9WZXJzaW9uXFwvW1xcZFxcLl0rLipTYWZhcmkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIHZhciB3ZWJraXRfcmVxX2ZzID0gdmlldy53ZWJraXRSZXF1ZXN0RmlsZVN5c3RlbTtcbiAgdmFyIHJlcV9mcyA9IHZpZXcucmVxdWVzdEZpbGVTeXN0ZW0gfHwgd2Via2l0X3JlcV9mcyB8fCB2aWV3Lm1velJlcXVlc3RGaWxlU3lzdGVtO1xuICB2YXIgdGhyb3dfb3V0c2lkZSA9IGZ1bmN0aW9uIHRocm93X291dHNpZGUoZXgpIHtcbiAgICAodmlldy5zZXRJbW1lZGlhdGUgfHwgdmlldy5zZXRUaW1lb3V0KShmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBleDtcbiAgICB9LCAwKTtcbiAgfTtcbiAgdmFyIGZvcmNlX3NhdmVhYmxlX3R5cGUgPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcbiAgdmFyIGZzX21pbl9zaXplID0gMDtcbiAgLy8gdGhlIEJsb2IgQVBJIGlzIGZ1bmRhbWVudGFsbHkgYnJva2VuIGFzIHRoZXJlIGlzIG5vIFwiZG93bmxvYWRmaW5pc2hlZFwiIGV2ZW50IHRvIHN1YnNjcmliZSB0b1xuICB2YXIgYXJiaXRyYXJ5X3Jldm9rZV90aW1lb3V0ID0gMTAwMCAqIDQwOyAvLyBpbiBtc1xuICB2YXIgcmV2b2tlID0gZnVuY3Rpb24gcmV2b2tlKGZpbGUpIHtcbiAgICB2YXIgcmV2b2tlciA9IGZ1bmN0aW9uIHJldm9rZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnKSAvLyBmaWxlIGlzIGFuIG9iamVjdCBVUkxcbiAgICAgICAgZ2V0X1VSTCgpLnJldm9rZU9iamVjdFVSTChmaWxlKTtlbHNlIC8vIGZpbGUgaXMgYSBGaWxlXG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfTtcbiAgICAvKiAvLyBUYWtlIG5vdGUgVzNDOlxyXG4gICAgdmFyXHJcbiAgICAgIHVyaSA9IHR5cGVvZiBmaWxlID09PSBcInN0cmluZ1wiID8gZmlsZSA6IGZpbGUudG9VUkwoKVxyXG4gICAgLCByZXZva2VyID0gZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICAgIC8vIGlkZWFseSBEb3dubG9hZEZpbmlzaGVkRXZlbnQuZGF0YSB3b3VsZCBiZSB0aGUgVVJMIHJlcXVlc3RlZFxyXG4gICAgICBpZiAoZXZ0LmRhdGEgPT09IHVyaSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmlsZSA9PT0gXCJzdHJpbmdcIikgeyAvLyBmaWxlIGlzIGFuIG9iamVjdCBVUkxcclxuICAgICAgICAgIGdldF9VUkwoKS5yZXZva2VPYmplY3RVUkwoZmlsZSk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gZmlsZSBpcyBhIEZpbGVcclxuICAgICAgICAgIGZpbGUucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICB2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJkb3dubG9hZGZpbmlzaGVkXCIsIHJldm9rZXIpO1xyXG4gICAgKi9cbiAgICBzZXRUaW1lb3V0KHJldm9rZXIsIGFyYml0cmFyeV9yZXZva2VfdGltZW91dCk7XG4gIH07XG4gIHZhciBkaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKGZpbGVzYXZlciwgZXZlbnRfdHlwZXMsIGV2ZW50KSB7XG4gICAgZXZlbnRfdHlwZXMgPSBbXS5jb25jYXQoZXZlbnRfdHlwZXMpO1xuICAgIHZhciBpID0gZXZlbnRfdHlwZXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGZpbGVzYXZlclsnb24nICsgZXZlbnRfdHlwZXNbaV1dO1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxpc3RlbmVyLmNhbGwoZmlsZXNhdmVyLCBldmVudCB8fCBmaWxlc2F2ZXIpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIHRocm93X291dHNpZGUoZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICB2YXIgYXV0b19ib20gPSBmdW5jdGlvbiBhdXRvX2JvbShibG9iKSB7XG4gICAgLy8gcHJlcGVuZCBCT00gZm9yIFVURi04IFhNTCBhbmQgdGV4dC8qIHR5cGVzIChpbmNsdWRpbmcgSFRNTClcbiAgICBpZiAoL15cXHMqKD86dGV4dFxcL1xcUyp8YXBwbGljYXRpb25cXC94bWx8XFxTKlxcL1xcUypcXCt4bWwpXFxzKjsuKmNoYXJzZXRcXHMqPVxccyp1dGYtOC9pLnRlc3QoYmxvYi50eXBlKSkgcmV0dXJuIG5ldyBCbG9iKFsn77u/JywgYmxvYl0sIHsgdHlwZTogYmxvYi50eXBlIH0pO1xuICAgIHJldHVybiBibG9iO1xuICB9O1xuXG4gIHZhciBGaWxlU2F2ZXIgPSBmdW5jdGlvbiBGaWxlU2F2ZXIoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmlsZVNhdmVyKTtcblxuICAgIGlmICghbm9fYXV0b19ib20pIGJsb2IgPSBhdXRvX2JvbShibG9iKTtcbiAgICAvLyBGaXJzdCB0cnkgYS5kb3dubG9hZCwgdGhlbiB3ZWIgZmlsZXN5c3RlbSwgdGhlbiBvYmplY3QgVVJMc1xuICAgIHZhciBmaWxlc2F2ZXIgPSB0aGlzLFxuICAgICAgICB0eXBlID0gYmxvYi50eXBlLFxuICAgICAgICBibG9iX2NoYW5nZWQgPSBmYWxzZSxcbiAgICAgICAgb2JqZWN0X3VybCxcbiAgICAgICAgdGFyZ2V0X3ZpZXcsXG4gICAgICAgIGRpc3BhdGNoX2FsbCA9IGZ1bmN0aW9uIGRpc3BhdGNoX2FsbCgpIHtcbiAgICAgIGRpc3BhdGNoKGZpbGVzYXZlciwgJ3dyaXRlc3RhcnQgcHJvZ3Jlc3Mgd3JpdGUgd3JpdGVlbmQnLnNwbGl0KCcgJykpO1xuICAgIH1cbiAgICAvLyBvbiBhbnkgZmlsZXN5cyBlcnJvcnMgcmV2ZXJ0IHRvIHNhdmluZyB3aXRoIG9iamVjdCBVUkxzXG4gICAgLFxuICAgICAgICBmc19lcnJvciA9IGZ1bmN0aW9uIGZzX2Vycm9yKCkge1xuICAgICAgaWYgKHRhcmdldF92aWV3ICYmIGlzX3NhZmFyaSAmJiB0eXBlb2YgRmlsZVJlYWRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gU2FmYXJpIGRvZXNuJ3QgYWxsb3cgZG93bmxvYWRpbmcgb2YgYmxvYiB1cmxzXG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBiYXNlNjREYXRhID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgICAgICB0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gJ2RhdGE6YXR0YWNobWVudC9maWxlJyArIGJhc2U2NERhdGEuc2xpY2UoYmFzZTY0RGF0YS5zZWFyY2goL1ssO10vKSk7XG4gICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgICAgICBkaXNwYXRjaF9hbGwoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG4gICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGRvbid0IGNyZWF0ZSBtb3JlIG9iamVjdCBVUkxzIHRoYW4gbmVlZGVkXG4gICAgICBpZiAoYmxvYl9jaGFuZ2VkIHx8ICFvYmplY3RfdXJsKSB7XG4gICAgICAgIG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldF92aWV3KSB7XG4gICAgICAgIHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSBvYmplY3RfdXJsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG5ld190YWIgPSB2aWV3Lm9wZW4ob2JqZWN0X3VybCwgJ19ibGFuaycpO1xuICAgICAgICBpZiAobmV3X3RhYiA9PT0gdW5kZWZpbmVkICYmIGlzX3NhZmFyaSkge1xuICAgICAgICAgIC8vQXBwbGUgZG8gbm90IGFsbG93IHdpbmRvdy5vcGVuLCBzZWUgaHR0cDovL2JpdC5seS8xa1pmZlJJXG4gICAgICAgICAgdmlldy5sb2NhdGlvbi5ocmVmID0gb2JqZWN0X3VybDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICAgIGRpc3BhdGNoX2FsbCgpO1xuICAgICAgcmV2b2tlKG9iamVjdF91cmwpO1xuICAgIH0sXG4gICAgICAgIGFib3J0YWJsZSA9IGZ1bmN0aW9uIGFib3J0YWJsZShmdW5jKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZmlsZXNhdmVyLnJlYWR5U3RhdGUgIT09IGZpbGVzYXZlci5ET05FKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuICAgICAgICBjcmVhdGVfaWZfbm90X2ZvdW5kID0geyBjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2UgfSxcbiAgICAgICAgc2xpY2U7XG5cbiAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5JTklUO1xuICAgIGlmICghbmFtZSkge1xuICAgICAgbmFtZSA9ICdkb3dubG9hZCc7XG4gICAgfVxuICAgIGlmIChjYW5fdXNlX3NhdmVfbGluaykge1xuICAgICAgb2JqZWN0X3VybCA9IGdldF9VUkwoKS5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2F2ZV9saW5rLmhyZWYgPSBvYmplY3RfdXJsO1xuICAgICAgICBzYXZlX2xpbmsuZG93bmxvYWQgPSBuYW1lO1xuICAgICAgICBjbGljayhzYXZlX2xpbmspO1xuICAgICAgICBkaXNwYXRjaF9hbGwoKTtcbiAgICAgICAgcmV2b2tlKG9iamVjdF91cmwpO1xuICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIE9iamVjdCBhbmQgd2ViIGZpbGVzeXN0ZW0gVVJMcyBoYXZlIGEgcHJvYmxlbSBzYXZpbmcgaW4gR29vZ2xlIENocm9tZSB3aGVuXG4gICAgLy8gdmlld2VkIGluIGEgdGFiLCBzbyBJIGZvcmNlIHNhdmUgd2l0aCBhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cbiAgICAvLyBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD05MTE1OFxuICAgIC8vIFVwZGF0ZTogR29vZ2xlIGVycmFudGx5IGNsb3NlZCA5MTE1OCwgSSBzdWJtaXR0ZWQgaXQgYWdhaW46XG4gICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM4OTY0MlxuICAgIGlmICh2aWV3LmNocm9tZSAmJiB0eXBlICYmIHR5cGUgIT09IGZvcmNlX3NhdmVhYmxlX3R5cGUpIHtcbiAgICAgIHNsaWNlID0gYmxvYi5zbGljZSB8fCBibG9iLndlYmtpdFNsaWNlO1xuICAgICAgYmxvYiA9IHNsaWNlLmNhbGwoYmxvYiwgMCwgYmxvYi5zaXplLCBmb3JjZV9zYXZlYWJsZV90eXBlKTtcbiAgICAgIGJsb2JfY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIC8vIFNpbmNlIEkgY2FuJ3QgYmUgc3VyZSB0aGF0IHRoZSBndWVzc2VkIG1lZGlhIHR5cGUgd2lsbCB0cmlnZ2VyIGEgZG93bmxvYWRcbiAgICAvLyBpbiBXZWJLaXQsIEkgYXBwZW5kIC5kb3dubG9hZCB0byB0aGUgZmlsZW5hbWUuXG4gICAgLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTY1NDQwXG4gICAgaWYgKHdlYmtpdF9yZXFfZnMgJiYgbmFtZSAhPT0gJ2Rvd25sb2FkJykge1xuICAgICAgbmFtZSArPSAnLmRvd25sb2FkJztcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IGZvcmNlX3NhdmVhYmxlX3R5cGUgfHwgd2Via2l0X3JlcV9mcykge1xuICAgICAgdGFyZ2V0X3ZpZXcgPSB2aWV3O1xuICAgIH1cbiAgICBpZiAoIXJlcV9mcykge1xuICAgICAgZnNfZXJyb3IoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZnNfbWluX3NpemUgKz0gYmxvYi5zaXplO1xuICAgIHJlcV9mcyh2aWV3LlRFTVBPUkFSWSwgZnNfbWluX3NpemUsIGFib3J0YWJsZShmdW5jdGlvbiAoZnMpIHtcbiAgICAgIGZzLnJvb3QuZ2V0RGlyZWN0b3J5KCdzYXZlZCcsIGNyZWF0ZV9pZl9ub3RfZm91bmQsIGFib3J0YWJsZShmdW5jdGlvbiAoZGlyKSB7XG4gICAgICAgIHZhciBzYXZlID0gZnVuY3Rpb24gc2F2ZSgpIHtcbiAgICAgICAgICBkaXIuZ2V0RmlsZShuYW1lLCBjcmVhdGVfaWZfbm90X2ZvdW5kLCBhYm9ydGFibGUoZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgICAgIGZpbGUuY3JlYXRlV3JpdGVyKGFib3J0YWJsZShmdW5jdGlvbiAod3JpdGVyKSB7XG4gICAgICAgICAgICAgIHdyaXRlci5vbndyaXRlZW5kID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IGZpbGUudG9VUkwoKTtcbiAgICAgICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGZpbGVzYXZlciwgJ3dyaXRlZW5kJywgZXZlbnQpO1xuICAgICAgICAgICAgICAgIHJldm9rZShmaWxlKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgd3JpdGVyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gd3JpdGVyLmVycm9yO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlICE9PSBlcnJvci5BQk9SVF9FUlIpIHtcbiAgICAgICAgICAgICAgICAgIGZzX2Vycm9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAnd3JpdGVzdGFydCBwcm9ncmVzcyB3cml0ZSBhYm9ydCcuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHdyaXRlclsnb24nICsgZXZlbnRdID0gZmlsZXNhdmVyWydvbicgKyBldmVudF07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB3cml0ZXIud3JpdGUoYmxvYik7XG4gICAgICAgICAgICAgIGZpbGVzYXZlci5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3cml0ZXIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5XUklUSU5HO1xuICAgICAgICAgICAgfSksIGZzX2Vycm9yKTtcbiAgICAgICAgICB9KSwgZnNfZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBkaXIuZ2V0RmlsZShuYW1lLCB7IGNyZWF0ZTogZmFsc2UgfSwgYWJvcnRhYmxlKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgICAgLy8gZGVsZXRlIGZpbGUgaWYgaXQgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgICAgIHNhdmUoKTtcbiAgICAgICAgfSksIGFib3J0YWJsZShmdW5jdGlvbiAoZXgpIHtcbiAgICAgICAgICBpZiAoZXguY29kZSA9PT0gZXguTk9UX0ZPVU5EX0VSUikge1xuICAgICAgICAgICAgc2F2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmc19lcnJvcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSksIGZzX2Vycm9yKTtcbiAgICB9KSwgZnNfZXJyb3IpO1xuICB9O1xuXG4gIHZhciBGU19wcm90byA9IEZpbGVTYXZlci5wcm90b3R5cGU7XG4gIHZhciBzYXZlQXMgPSBmdW5jdGlvbiBzYXZlQXMoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcbiAgICByZXR1cm4gbmV3IEZpbGVTYXZlcihibG9iLCBuYW1lLCBub19hdXRvX2JvbSk7XG4gIH07XG5cbiAgLy8gSUUgMTArIChuYXRpdmUgc2F2ZUFzKVxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG4gICAgICBpZiAoIW5vX2F1dG9fYm9tKSBibG9iID0gYXV0b19ib20oYmxvYik7XG4gICAgICByZXR1cm4gbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoYmxvYiwgbmFtZSB8fCAnZG93bmxvYWQnKTtcbiAgICB9O1xuICB9XG5cbiAgRlNfcHJvdG8uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpbGVzYXZlciA9IHRoaXM7XG4gICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuRE9ORTtcbiAgICBkaXNwYXRjaChmaWxlc2F2ZXIsICdhYm9ydCcpO1xuICB9O1xuICBGU19wcm90by5yZWFkeVN0YXRlID0gRlNfcHJvdG8uSU5JVCA9IDA7XG4gIEZTX3Byb3RvLldSSVRJTkcgPSAxO1xuICBGU19wcm90by5ET05FID0gMjtcblxuICBGU19wcm90by5lcnJvciA9IEZTX3Byb3RvLm9ud3JpdGVzdGFydCA9IEZTX3Byb3RvLm9ucHJvZ3Jlc3MgPSBGU19wcm90by5vbndyaXRlID0gRlNfcHJvdG8ub25hYm9ydCA9IEZTX3Byb3RvLm9uZXJyb3IgPSBGU19wcm90by5vbndyaXRlZW5kID0gbnVsbDtcblxuICByZXR1cm4gc2F2ZUFzO1xufSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiB8fCB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgfHwgdW5kZWZpbmVkLmNvbnRlbnQpO1xuLy8gYHNlbGZgIGlzIHVuZGVmaW5lZCBpbiBGaXJlZm94IGZvciBBbmRyb2lkIGNvbnRlbnQgc2NyaXB0IGNvbnRleHRcbi8vIHdoaWxlIGB0aGlzYCBpcyBuc0lDb250ZW50RnJhbWVNZXNzYWdlTWFuYWdlclxuLy8gd2l0aCBhbiBhdHRyaWJ1dGUgYGNvbnRlbnRgIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHdpbmRvd1xuXG5leHBvcnRzLmRlZmF1bHQgPSBzYXZlQXM7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAncmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzJ1xuaW1wb3J0IHsgdGVzdEJvb2ttYXJrIH0gZnJvbSAnLi9ib29rbWFyaydcbmltcG9ydCB7IGFkZEltcG9ydEhhbmRsZXJzIH0gZnJvbSAnLi4vY29tbW9uL2ltcG9ydCdcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9zdG9yYWdlJ1xuaW1wb3J0IHsgdXJsUmVuZGVyZXIgfSBmcm9tICcuLi9jb21tb24vdXJscydcbmltcG9ydCB7IHNvdXJjZVJlbmRlcmVyIH0gZnJvbSAnLi4vY29tbW9uL3NvdXJjZXMnXG5pbXBvcnQgeyBtYXJrUmVmcmVzaGVkLCByZXNpc3RlclByb2dyZXNzSGFuZGxlciwgdXBkYXRlUHJvZ3Jlc3MgfSBmcm9tICcuLi9jb21tb24vcHJvZ3Jlc3MtYmFyJ1xuaW1wb3J0IHsgY3JlYXRlU2NoZWR1bGUgfSBmcm9tICcuLi9jb21tb24vc2NoZWR1bGUnXG5pbXBvcnQgeyByZWdpc3Rlck1lbnVMaXN0ZW5lcnMgfSBmcm9tICcuLi9jb21tb24vbWVudSdcbmltcG9ydCB7IGFkZFNldHRpbmdzSGFuZGxlcnMsIGdldExpbmtIZWxwZXJzIH0gZnJvbSAnLi4vY29tbW9uL3NldHRpbmdzJ1xuaW1wb3J0IHsgQVBJIH0gZnJvbSAnLi4vY29tbW9uL2FwaSdcbmltcG9ydCB7IEFQSV9BRERSRVNTIH0gZnJvbSAnLi9jb25zdGFudHMnXG5cbmNvbnN0IGFwaSA9IEFQSShBUElfQUREUkVTUylcblxuZGIudXJscy5zZXRNYXhPbGQoMTAwKVxuXG5jb25zdCBMaW5rcyA9IGdldExpbmtIZWxwZXJzKGRiLCBhcGkpXG5jb25zdCBVcmxzID0gdXJsUmVuZGVyZXIoZGIpXG5jb25zdCBTb3VyY2VzID0gc291cmNlUmVuZGVyZXIoZGIpXG5cbmRiLm9uQ2hhbmdlKChjaGFuZ2VzKSA9PiB7XG4gICAgaWYgKFsnaGlkZScsICdoaWRkZW5DaGFwdGVycycsICd1cmxzJ10uc29tZShjaGFuZ2VzLmhhc093blByb3BlcnR5LmJpbmQoY2hhbmdlcykpKSB7XG4gICAgICAgIFVybHMucmVuZGVyKClcbiAgICB9XG4gICAgaWYgKE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUoKGNoYW5nZSkgPT4gY2hhbmdlLmluY2x1ZGVzKCdzb3VyY2VzJykpIHx8IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjaGFuZ2VzLCAnbWF4T2xkJykpIHtcbiAgICAgICAgU291cmNlcy5yZW5kZXIoKVxuICAgIH1cbiAgICBMaW5rcy5wdXNoTGlua1VwZGF0ZShjaGFuZ2VzKVxufSlcblxubmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuY29udHJvbGxlci5wb3N0TWVzc2FnZSgnRkVUQ0hfQ0hBUFRFUlMnKVxubWFya1JlZnJlc2hlZCgpXG5cbmNvbnN0IGludGVydmFsID0gY3JlYXRlU2NoZWR1bGUoe1xuICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIucG9zdE1lc3NhZ2UoJ0ZFVENIX0NIQVBURVJTJylcbiAgICAgICAgbWFya1JlZnJlc2hlZCgpXG4gICAgfSxcbiAgICBpbnRlcnZhbDogNjAgKiAxMDAwLFxuICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgIHVwZGF0ZXI6IHVwZGF0ZVByb2dyZXNzXG59KVxuXG5yZXNpc3RlclByb2dyZXNzSGFuZGxlcigoKSA9PiBpbnRlcnZhbC50cmlnZ2VySW5zdGFudGx5KCkpXG5hZGRJbXBvcnRIYW5kbGVycyhkYilcbmFkZFNldHRpbmdzSGFuZGxlcnMoZGIsIGFwaSlcbnJlZ2lzdGVyTWVudUxpc3RlbmVycyhkYiwgYXBpKVxuXG5VcmxzLnJlbmRlcigpXG5Tb3VyY2VzLnJlbmRlcigpXG4gICAgLnRoZW4odGVzdEJvb2ttYXJrKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==