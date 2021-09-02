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

function formatKey(key) {
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
                        writeStateToDom(key);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2FwaS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL2RiLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vaW1wb3J0LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vbWVudS5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3Byb2dyZXNzLWJhci5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3NjaGVkdWxlLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2NvbW1vbi9zb3VyY2VzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9jb21tb24vdXJscy5qcyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvY29tbW9uL3V0aWxzLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL3NyYy9leHRlbnNpb24vYm9va21hcmsuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vc3JjL2V4dGVuc2lvbi9zdG9yYWdlLmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyLy4vbm9kZV9tb2R1bGVzL3NhdmUtYXMvbGliL2luZGV4LmpzIiwid2VicGFjazovL21hbmdhY2hlY2tlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbWFuZ2FjaGVja2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tYW5nYWNoZWNrZXIvLi9zcmMvZXh0ZW5zaW9uL3BvcHVwLmpzIl0sIm5hbWVzIjpbIkFQSSIsImJhc2VVcmwiLCJwb3N0U291cmNlIiwic291cmNlIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJBY2NlcHQiLCJ0aGVuIiwicmVzIiwianNvbiIsImNhdGNoIiwiZXJyb3IiLCJ2YWxpZCIsImRhdGEiLCJwYXlsb2FkIiwiYWRkU291cmNlRnJvbVVybCIsInVybCIsInJlYWRVcmxzIiwic291cmNlcyIsImxpbWl0IiwiZGF0ZSIsImFkZFN1YnNjcmlwdGlvbnMiLCJ0b3BpY3MiLCJrZXkiLCJkZWxldGVTdWJzY3JpcHRpb25zIiwicmVhZExpbmsiLCJjaGFuZ2VkU2luY2UiLCJzdGF0dXMiLCJ1cGRhdGVMaW5rIiwidXBkYXRlU2V0IiwiY3JlYXRlTGluayIsImluaXRTZXQiLCJVcmxzIiwicmVhZCIsIlNvdXJjZSIsImluc2VydCIsImZyb21VcmwiLCJTdWJzY3JpcHRpb24iLCJzdWJzY3JpYmUiLCJ1bnN1YnNjcmliZSIsIkxpbmsiLCJ1cGRhdGUiLCJOQU1FU1BBQ0VTIiwiU1lOQyIsIkxPQ0FMIiwiY3JlYXRlREIiLCJzdG9yYWdlIiwid3JpdGUiLCJyZWFkU291cmNlcyIsInJlZ2lzdHJ5IiwicGFyc2UiLCJyZWR1Y2UiLCJQcm9taXNlIiwiYWxsIiwiY29uY2F0IiwicmVzb2x2ZSIsIndyaXRlU291cmNlcyIsInVwZGF0ZXMiLCJ4IiwiTWF0aCIsIm1heCIsImNlaWwiLCJsZW5ndGgiLCJwdXNoIiwic2xpY2UiLCJhZGRTb3VyY2UiLCJzb21lIiwibWFuZ2FJZCIsImRlbGV0ZVNvdXJjZSIsInNvdXJjZUlkIiwibmV3U291cmNlcyIsImZpbHRlciIsImlkIiwiaXNEaXJ0eSIsInVybHMiLCJnZXRGaWx0ZXJlZFNvcnRlZFVybHMiLCJoaWRkZW5DaGFwdGVycyIsImhpZGUiLCJoaWRkZW5DaGFwdGVyc1N0cmluZyIsInVybExpc3QiLCJjaGVja09sZCIsImNoYXB0ZXIiLCJjcmVhdGVkIiwiT2JqZWN0IiwidmFsdWVzIiwic29ydCIsInVybDEiLCJ1cmwyIiwiZGlmZiIsImFicyIsIlN0cmluZyIsImxvY2FsZUNvbXBhcmUiLCJvbGRVcmxzIiwibmV3VXJscyIsImhpZGVVcmwiLCJyZXN1bHQiLCJoaWRlQWxsVXJscyIsInRpbWVzdGFtcCIsIndyaXRlVXJscyIsImluaXQiLCJ0b2RheSIsIkRhdGUiLCJzZXRIb3VycyIsImdldFRpbWUiLCJzZXRNYXhPbGQiLCJtYXhPbGQiLCJnZXRNYXhPbGQiLCJzZXRMaW5rIiwibGluayIsImdldExpbmsiLCJnZXRIaWRlIiwid3JpdGVMb2NhbFNldHRpbmdzIiwic2V0dGluZ3MiLCJsb2NhbFNldHRpbmdzIiwiZ2V0TG9jYWxTZXR0aW5ncyIsImdldExpbmtEYXRhIiwibWFwIiwiTnVtYmVyIiwic2V0TGlua0RhdGEiLCJpbXBvcnQiLCJhZGQiLCJkZWxldGUiLCJsb2NhbCIsInNldCIsImhpZGVBbGwiLCJvbkNoYW5nZSIsImFkZExpc3RlbmVyIiwic2V0TG9jYWwiLCJhZGRJbXBvcnRIYW5kbGVycyIsImRiIiwiaW1wb3J0RWxlbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJleHBvcnRFbGVtIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJmaWxlIiwidGFyZ2V0IiwiZmlsZXMiLCJmciIsIkZpbGVSZWFkZXIiLCJjbGVhbiIsInRpdGxlIiwicmVhZEFzVGV4dCIsImJsb2IiLCJCbG9iIiwidHlwZSIsInNhdmVBcyIsInJlZ2lzdGVyTWVudUxpc3RlbmVycyIsIkFwaSIsImltcG9ydFNlY3Rpb24iLCJxdWVyeVNlbGVjdG9yIiwicG9wdXBUaXRsZSIsImJvb2ttYXJrcyIsImNoYXB0ZXJzIiwiYWRkU2VjdGlvbiIsInNldHRpbmdzU2VjdGlvbiIsInByb2dyZXNzIiwib3BlbkNoYXB0ZXJzIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5uZXJUZXh0Iiwib3BlblNldHRpbmdzIiwiZ2V0TGlua1F1ZXJ5IiwibGlua0lmVW5saW5rZWQiLCJsb2NrZWQiLCJyZXNpc3RlclByb2dyZXNzSGFuZGxlciIsInVwZGF0ZU5vdyIsIm1hcmtSZWZyZXNoZWQiLCJpbm5lckhUTUwiLCJzZXRUaW1lb3V0IiwidXBkYXRlUHJvZ3Jlc3MiLCJfbGFzdFBpbmciLCJuZXh0UGluZyIsInJlbWFpbmluZyIsIm5vdyIsInNlY29uZHMiLCJyb3VuZCIsImNyZWF0ZVNjaGVkdWxlIiwiaXNBY3RpdmUiLCJpbnRlcnZhbCIsImNhbGxiYWNrIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJ1cGRhdGVyIiwibGFzdFBpbmciLCJjYWxsQ2FsbGJhY2siLCJ0aW1lciIsInNldEludGVydmFsIiwibmV3SW50ZXJ2YWwiLCJFcnJvciIsInNldENhbGxiYWNrIiwiY2IiLCJzdGFydCIsInRyaWdnZXJJbnN0YW50bHkiLCJzdG9wIiwiY2xlYXJJbnRlcnZhbCIsImxpbmtGaWVsZHMiLCJmb3JtYXRLZXkiLCJnZXRMaW5rSGVscGVycyIsInB1c2hMaW5rVXBkYXRlIiwiY2hhbmdlcyIsImNoYW5nZXNldCIsImtleXMiLCJjaGFuZ2UiLCJpbmNsdWRlcyIsImZldGNoTGlua1VwZGF0ZSIsImxhc3RNb2RpZmllZCIsImlzVmFsaWRMaW5rS2V5IiwiY2xlYW5LZXkiLCJyZXBsYWNlQWxsIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJnZXQiLCJhcGkiLCJjdXJyZW50TGluayIsImxpbmtJbnB1dDEiLCJsaW5rSW5wdXQyIiwibGlua0lucHV0MyIsInZhbHVlIiwiY29ubmVjdFRvTGluayIsImxpbmtOdW1iZXJUZXh0IiwibGlua0xpbmsiLCJsaW5rTGlua1RleHQiLCJocmVmIiwiY29sb3IiLCJsaW5rTGlua1dhcm4iLCJ3YXJuTGlua0N1cnJlbnQiLCJ3YXJuTGlua05ldyIsImxpbmtFcnJvciIsImxpbmtQcm9ncmVzcyIsImxpbmtCdXR0b24iLCJkaXNhYmxlZCIsImxpbmtSZXN1bHQiLCJhZGRTZXR0aW5nc0hhbmRsZXJzIiwid3JpdGVTdGF0ZVRvRG9tIiwibGlua2luZ1NlY3Rpb24iLCJ1bmxpbmtTZWN0aW9uIiwidW5saW5rQnV0dG9uIiwibnVtYmVyIiwiZm9jdXMiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImxpbmtEYXRhIiwibmV3TGlua1Jlc3VsdCIsInVuZGVmaW5lZCIsInNvdXJjZVJlbmRlcmVyIiwiZXZlbnQiLCJjbG9zZXN0IiwiZGF0YXNldCIsImNvbnRhaW5zIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicmVuZGVyU291cmNlcyIsInNvdXJjZTEiLCJzb3VyY2UyIiwicmVwbGFjZSIsInNwbGl0Iiwiam9pbiIsInJlbmRlciIsInVybFJlbmRlcmVyIiwibGF0ZXN0Q2hhcHRlckRhdGUiLCJsY2QiLCJjbG9zZXN0SGlkZSIsImNsb3Nlc3RMaW5rIiwicHJldmVudERlZmF1bHQiLCJvcGVuIiwiY2xvc2VzdE1vcmUiLCJ0b3AiLCJzY3JvbGxUbyIsImJlaGF2aW9yIiwibWF4U2Nyb2xsIiwic2Nyb2xsSGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic2Nyb2xsVG9wIiwiY2hlY2tUb3BCdXR0b24iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjcmVhdGVVcmxSZW5kZXJlciIsImlzT2xkIiwidGltZVN0cmluZyIsInBhZCIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImRhdGVTdHJpbmciLCJnZXREYXRlIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsImZ1bGxEYXRlIiwidG9JU09TdHJpbmciLCJyZW5kZXJVcmxzIiwibmV3Um93cyIsIm9sZFJvd3MiLCJzdHJpbmciLCJmYWxsYmFjayIsIm5vIiwiY3VycmVudFNvdXJjZSIsImJvb2ttYXJrIiwiYm9va21hcmtUcmFjayIsImJvb2ttYXJrVGl0bGUiLCJBUElfQUREUkVTUyIsImNocm9tZSIsInJ1bnRpbWUiLCJvbk1lc3NhZ2UiLCJyZXF1ZXN0IiwiY29uc29sZSIsImxvZyIsInRlc3RCb29rbWFyayIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsIndpbmRvd0lkIiwid2luZG93cyIsIldJTkRPV19JRF9DVVJSRU5UIiwic2NyaXB0aW5nIiwiZXhlY3V0ZVNjcmlwdCIsInRhYklkIiwiZnVuY3Rpb24iLCJ0ZXN0IiwiZGVjb2RlSFRNTEVudGl0aWVzIiwic3RyIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInRlc3RGYW5Gb3giLCJwYXRobmFtZSIsIm1hdGNoIiwibmFtZSIsIm9yaWdpbiIsInRlc3RNYW5nYWRleCIsInRlc3RNYWRhcm8iLCJpZHMiLCJtYW5nYSIsIm1hbmdhX2lkIiwiaWQxIiwiaWQyIiwiaGVhZGVyIiwidGl0bGVzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsInNjcmlwdCIsImhlYWRsaW5lIiwiZmluZCIsImgiLCJjaGlsZE5vZGVzIiwibm9kZSIsIm5vZGVUeXBlIiwidHJpbSIsInRpdGxlMSIsInRpdGxlMiIsImhvc3QiLCJzZW5kTWVzc2FnZSIsIm5hbWVzcGFjZSIsImtleVBhaXJzIiwib25DaGFuZ2VkIiwiTGlua3MiLCJTb3VyY2VzIiwiaGFzT3duUHJvcGVydHkiLCJiaW5kIiwiY2FsbCIsIm5hdmlnYXRvciIsInNlcnZpY2VXb3JrZXIiLCJjb250cm9sbGVyIiwicG9zdE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTUEsR0FBRyxHQUFHLFNBQU5BLEdBQU0sR0FBa0I7QUFBQSxNQUFqQkMsT0FBaUIsdUVBQVAsRUFBTzs7QUFD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QTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEFQSSA9IChiYXNlVXJsID0gJycpID0+IHtcclxuICAgIGZ1bmN0aW9uIHBvc3RTb3VyY2UgKHNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgJHtiYXNlVXJsfS9hcGkvc291cmNlc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNvdXJjZSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEucGF5bG9hZClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRTb3VyY2VGcm9tVXJsICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3NvdXJjZXMvYWRkRnJvbVVybGAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXJsIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZFVybHMgKHNvdXJjZXMgPSBbXSwgbGltaXQgPSAnJywgZGF0ZSA9ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFxyXG4gICAgICAgICAgICBgJHtiYXNlVXJsfS9hcGkvdXJscy9mZXRjaGAsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5wYXlsb2FkIHx8IFtdKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFN1YnNjcmlwdGlvbnMgKHRvcGljcyA9IFtdLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3N1YnNjcmlwdGlvbnNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB0b3BpY3MsXHJcbiAgICAgICAgICAgICAgICBrZXk6IGtleVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZVN1YnNjcmlwdGlvbnMgKHRvcGljcyA9IFtdLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YmFzZVVybH0vYXBpL3N1YnNjcmlwdGlvbnNgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHRvcGljcyxcclxuICAgICAgICAgICAgICAgIGtleToga2V5XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZExpbmsgKGtleSwgY2hhbmdlZFNpbmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rcy8ke2tleX0ke2NoYW5nZWRTaW5jZSA/IGA/Y2hhbmdlZFNpbmNlPSR7Y2hhbmdlZFNpbmNlfWAgOiAnJ31gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnN0YXR1cyA9PT0gMzA0ID8gKHsgdmFsaWQ6IHRydWUsIHBheWxvYWQ6IG51bGwgfSkgOiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiAoeyB2YWxpZDogZmFsc2UsIGVycm9yIH0pKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGtleSwgdXBkYXRlU2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rcy8ke2tleX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3B1dCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZVNldCksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gKHsgdmFsaWQ6IGZhbHNlLCBlcnJvciB9KSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVMaW5rIChpbml0U2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2Jhc2VVcmx9L2FwaS9saW5rc2AsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluaXRTZXQpLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+ICh7IHZhbGlkOiBmYWxzZSwgZXJyb3IgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBVcmxzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRVcmxzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTb3VyY2U6IHtcclxuICAgICAgICAgICAgaW5zZXJ0OiBwb3N0U291cmNlLFxyXG4gICAgICAgICAgICBmcm9tVXJsOiBhZGRTb3VyY2VGcm9tVXJsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTdWJzY3JpcHRpb246IHtcclxuICAgICAgICAgICAgc3Vic2NyaWJlOiBhZGRTdWJzY3JpcHRpb25zLFxyXG4gICAgICAgICAgICB1bnN1YnNjcmliZTogZGVsZXRlU3Vic2NyaXB0aW9uc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTGluazoge1xyXG4gICAgICAgICAgICBpbnNlcnQ6IGNyZWF0ZUxpbmssXHJcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlTGluayxcclxuICAgICAgICAgICAgcmVhZDogcmVhZExpbmtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcGFyc2UgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuY29uc3QgTkFNRVNQQUNFUyA9IHtcclxuICAgIFNZTkM6ICdzeW5jJyxcclxuICAgIExPQ0FMOiAnbG9jYWwnXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEQiAoc3RvcmFnZSkge1xyXG4gICAgY29uc3QgeyByZWFkLCB3cml0ZSB9ID0gc3RvcmFnZVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlYWRTb3VyY2VzICgpIHtcclxuICAgICAgICBjb25zdCB7IHJlZ2lzdHJ5IH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyByZWdpc3RyeTogJ1tcInNvdXJjZXMtMVwiXScgfSlcclxuICAgICAgICByZXR1cm4gcGFyc2UocmVnaXN0cnksIFsnc291cmNlcy0xJ10pXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHNvdXJjZXMsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtzb3VyY2VzLCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBba2V5XTogJ1tdJyB9KV0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKFtzb3VyY2VzLCBzb3VyY2VdKSA9PiBzb3VyY2VzLmNvbmNhdChwYXJzZShzb3VyY2Vba2V5XSwgW10pKSlcclxuICAgICAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKFtdKSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3cml0ZVNvdXJjZXMgKHNvdXJjZXMpIHtcclxuICAgICAgICBjb25zdCByZWdpc3RyeSA9IFtdXHJcbiAgICAgICAgY29uc3QgdXBkYXRlcyA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHNvdXJjZXMubGVuZ3RoIC8gMjApKTsgeCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGBzb3VyY2VzLSR7eH1gXHJcbiAgICAgICAgICAgIHJlZ2lzdHJ5LnB1c2goa2V5KVxyXG4gICAgICAgICAgICB1cGRhdGVzW2tleV0gPSBKU09OLnN0cmluZ2lmeShzb3VyY2VzLnNsaWNlKCh4IC0gMSkgKiAyMCwgeCAqIDIwKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdXBkYXRlcy5yZWdpc3RyeSA9IEpTT04uc3RyaW5naWZ5KHJlZ2lzdHJ5KVxyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHVwZGF0ZXMpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gYWRkU291cmNlIChzb3VyY2UpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgcmVhZFNvdXJjZXMoKVxyXG4gICAgICAgIGlmICghc291cmNlcy5zb21lKCh7dXJsLCBtYW5nYUlkfSkgPT4gc291cmNlLnVybCA9PT0gdXJsICYmIG1hbmdhSWQgPT09IHNvdXJjZS5tYW5nYUlkKSkge1xyXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goc291cmNlKVxyXG4gICAgICAgICAgICBhd2FpdCB3cml0ZVNvdXJjZXMoc291cmNlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZXNcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBkZWxldGVTb3VyY2UgKHNvdXJjZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IHJlYWRTb3VyY2VzKClcclxuICAgICAgICBjb25zdCBuZXdTb3VyY2VzID0gc291cmNlcy5maWx0ZXIoKHNvdXJjZSkgPT4gc291cmNlPy5pZCAhPT0gc291cmNlSWQpXHJcbiAgICAgICAgYXdhaXQgd3JpdGVTb3VyY2VzKG5ld1NvdXJjZXMpXHJcblxyXG4gICAgICAgIHJldHVybiBuZXdTb3VyY2VzXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaXNEaXJ0eSAoKSB7XHJcbiAgICAgICAgY29uc3QgeyB1cmxzLCBzb3VyY2VzIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIFsndXJscycsICdzb3VyY2VzJ10pXHJcblxyXG4gICAgICAgIHJldHVybiAhIXVybHMgfHwgISFzb3VyY2VzXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0RmlsdGVyZWRTb3J0ZWRVcmxzICgpIHtcclxuICAgICAgICBjb25zdCB7IGhpZGRlbkNoYXB0ZXJzOiBoaWRkZW5DaGFwdGVyc1N0cmluZywgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IDAgfSlcclxuICAgICAgICBjb25zdCB7IHVybHMgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5MT0NBTCwgeyB1cmxzOiAnW10nIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UoaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIHt9KVxyXG4gICAgICAgIGNvbnN0IHVybExpc3QgPSBwYXJzZSh1cmxzLCBbXSlcclxuXHJcbiAgICAgICAgY29uc3QgY2hlY2tPbGQgPSAoY2hhcHRlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGlkZSAmJiBjaGFwdGVyLmNyZWF0ZWQgPCBoaWRlIHx8IGhpZGRlbkNoYXB0ZXJzW2NoYXB0ZXIuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgW29sZFVybHMsIG5ld1VybHNdID0gT2JqZWN0LnZhbHVlcyh1cmxMaXN0KVxyXG4gICAgICAgICAgICAuc29ydCgodXJsMSwgdXJsMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IHVybDIuY3JlYXRlZCAtIHVybDEuY3JlYXRlZFxyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpZmYpIDwgNTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh1cmwxKS5sb2NhbGVDb21wYXJlKHVybDIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlmZlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAucmVkdWNlKChbb2xkVXJscywgbmV3VXJsc10sIHVybCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrT2xkKHVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbGRVcmxzLnB1c2godXJsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VXJscy5wdXNoKHVybClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBbb2xkVXJscywgbmV3VXJsc11cclxuICAgICAgICAgICAgfSwgW1tdLCBbXV0pXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG9sZFVybHMsXHJcbiAgICAgICAgICAgIG5ld1VybHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZVVybCAoaWQpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogJ3t9JyB9KVxyXG4gICAgICAgIGNvbnN0IGhpZGRlbkNoYXB0ZXJzID0gcGFyc2UocmVzdWx0LmhpZGRlbkNoYXB0ZXJzLCB7fSlcclxuICAgICAgICBoaWRkZW5DaGFwdGVyc1tpZF0gPSB0cnVlXHJcbiAgICAgICAgcmV0dXJuIHdyaXRlKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRkZW5DaGFwdGVyczogSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ2hhcHRlcnMpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZUFsbFVybHMgKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZGVuQ2hhcHRlcnM6ICd7fScsIGhpZGU6IHRpbWVzdGFtcCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyaXRlVXJscyAodXJscykge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLkxPQ0FMLCB7IHVybHM6IEpTT04uc3RyaW5naWZ5KHVybHMpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaW5pdCAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBoaWRlIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuU1lOQywgeyBoaWRlOiBmYWxzZSB9KVxyXG4gICAgICAgIGlmICghaGlkZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKClcclxuICAgICAgICAgICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMClcclxuICAgICAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGU6IHRvZGF5LmdldFRpbWUoKX0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldE1heE9sZCAobWF4T2xkKSB7XHJcbiAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5MT0NBTCwgeyBtYXhPbGQgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRNYXhPbGQgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbWF4T2xkIH0gPSBhd2FpdCByZWFkKE5BTUVTUEFDRVMuTE9DQUwsIHsgbWF4T2xkOiAyNSB9KVxyXG4gICAgICAgIHJldHVybiBtYXhPbGRcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBzZXRMaW5rIChsaW5rKSB7XHJcbiAgICAgICAgYXdhaXQgd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7IGxpbmsgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRMaW5rICgpIHtcclxuICAgICAgICBjb25zdCB7IGxpbmsgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCBbJ2xpbmsnXSlcclxuICAgICAgICByZXR1cm4gbGlua1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEhpZGUgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaGlkZSB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLlNZTkMsIHsgaGlkZTogMCB9KVxyXG4gICAgICAgIHJldHVybiBoaWRlXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gd3JpdGVMb2NhbFNldHRpbmdzIChzZXR0aW5ncykge1xyXG4gICAgICAgIHJldHVybiB3cml0ZShOQU1FU1BBQ0VTLkxPQ0FMLCB7IGxvY2FsU2V0dGluZ3M6IEpTT04uc3RyaW5naWZ5KHNldHRpbmdzKSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldExvY2FsU2V0dGluZ3MgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbG9jYWxTZXR0aW5ncyB9ID0gYXdhaXQgcmVhZChOQU1FU1BBQ0VTLkxPQ0FMLCB7IGxvY2FsU2V0dGluZ3M6ICd7fScgfSlcclxuICAgICAgICByZXR1cm4gcGFyc2UobG9jYWxTZXR0aW5ncywge30pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0TGlua0RhdGEgKCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCByZWFkU291cmNlcygpXHJcbiAgICAgICAgY29uc3QgeyBoaWRkZW5DaGFwdGVyczogaGlkZGVuQ2hhcHRlcnNTdHJpbmcsIGhpZGUgfSA9IGF3YWl0IHJlYWQoTkFNRVNQQUNFUy5TWU5DLCB7IGhpZGRlbkNoYXB0ZXJzOiAne30nLCBoaWRlOiAwIH0pXHJcbiAgICAgICAgY29uc3QgaGlkZGVuQ2hhcHRlcnMgPSBwYXJzZShoaWRkZW5DaGFwdGVyc1N0cmluZywge30pXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNvdXJjZXM6IHNvdXJjZXMubWFwKChzb3VyY2UpID0+IHNvdXJjZS5pZCksXHJcbiAgICAgICAgICAgIGhpZGRlbkNoYXB0ZXJzLFxyXG4gICAgICAgICAgICBoaWRlOiBOdW1iZXIoaGlkZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2V0TGlua0RhdGEgKHtzb3VyY2VzLCBoaWRkZW5DaGFwdGVycywgaGlkZX0pIHtcclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIHdyaXRlU291cmNlcyhzb3VyY2VzKSxcclxuICAgICAgICAgICAgd3JpdGUoTkFNRVNQQUNFUy5TWU5DLCB7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5DaGFwdGVyczogSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ2hhcHRlcnMpLFxyXG4gICAgICAgICAgICAgICAgaGlkZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF0pXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzb3VyY2VzOiB7XHJcbiAgICAgICAgICAgIHJlYWQ6IHJlYWRTb3VyY2VzLFxyXG4gICAgICAgICAgICBpbXBvcnQ6IHdyaXRlU291cmNlcyxcclxuICAgICAgICAgICAgYWRkOiBhZGRTb3VyY2UsXHJcbiAgICAgICAgICAgIGRlbGV0ZTogZGVsZXRlU291cmNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICBsb2NhbDoge1xyXG4gICAgICAgICAgICAgICAgcmVhZDogZ2V0TG9jYWxTZXR0aW5ncyxcclxuICAgICAgICAgICAgICAgIHNldDogd3JpdGVMb2NhbFNldHRpbmdzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzRGlydHksXHJcbiAgICAgICAgdXJsczoge1xyXG4gICAgICAgICAgICByZWFkOiBnZXRGaWx0ZXJlZFNvcnRlZFVybHMsXHJcbiAgICAgICAgICAgIGhpZGU6IGhpZGVVcmwsXHJcbiAgICAgICAgICAgIGhpZGVBbGw6IGhpZGVBbGxVcmxzLFxyXG4gICAgICAgICAgICBpbXBvcnQ6IHdyaXRlVXJscyxcclxuICAgICAgICAgICAgc2V0TWF4T2xkLFxyXG4gICAgICAgICAgICBnZXRNYXhPbGQsXHJcbiAgICAgICAgICAgIGdldEhpZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2hhbmdlOiBzdG9yYWdlLmFkZExpc3RlbmVyLFxyXG4gICAgICAgIGxpbms6IHtcclxuICAgICAgICAgICAgc2V0OiBzZXRMaW5rLFxyXG4gICAgICAgICAgICByZWFkOiBnZXRMaW5rLFxyXG4gICAgICAgICAgICBsb2NhbDogZ2V0TGlua0RhdGEsXHJcbiAgICAgICAgICAgIHNldExvY2FsOiBzZXRMaW5rRGF0YVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgc2F2ZUFzIGZyb20gJ3NhdmUtYXMnXHJcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRJbXBvcnRIYW5kbGVycyAoZGIpIHtcclxuICAgIGNvbnN0IGltcG9ydEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1wb3J0JylcclxuICAgIGNvbnN0IGV4cG9ydEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhwb3J0JylcclxuXHJcbiAgICBpbXBvcnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdXHJcbiAgICAgICAgY29uc3QgZnIgPSBuZXcgRmlsZVJlYWRlcigpXHJcbiAgICAgICAgZnIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlcyA9IHBhcnNlKGZyLnJlc3VsdCwgW10pXHJcbiAgICAgICAgICAgIGNvbnN0IGNsZWFuID0gc291cmNlcy5maWx0ZXIoKHNvdXJjZSkgPT4gc291cmNlPy50aXRsZSAmJiBzb3VyY2UudXJsICYmIHNvdXJjZS5tYW5nYUlkKVxyXG4gICAgICAgICAgICBpZiAoY2xlYW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBkYi5zb3VyY2VzLmltcG9ydChjbGVhbilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbXBvcnRFbGVtLmZpbGVzID0gbnVsbFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZnIucmVhZEFzVGV4dChmaWxlKVxyXG4gICAgfSlcclxuXHJcbiAgICBleHBvcnRFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGRiLnNvdXJjZXMucmVhZCgpXHJcbiAgICAgICAgICAgIC50aGVuKChzb3VyY2VzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KHNvdXJjZXMpXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vanNvbicgfSlcclxuICAgICAgICAgICAgICAgIHNhdmVBcyhibG9iLCAnbWFuZ2Fwb2xsLmpzb24nKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuIiwiaW1wb3J0IHsgZ2V0TGlua1F1ZXJ5LCBsaW5rSWZVbmxpbmtlZCB9IGZyb20gJy4vc2V0dGluZ3MnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJNZW51TGlzdGVuZXJzIChkYiwgQXBpKSB7XHJcbiAgICBjb25zdCBpbXBvcnRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmltcG9ydCcpXHJcbiAgICBjb25zdCBwb3B1cFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwVGl0bGUnKVxyXG4gICAgY29uc3QgYm9va21hcmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZCcpXHJcbiAgICBjb25zdCB1cmxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybHMnKVxyXG4gICAgY29uc3QgY2hhcHRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcHRlcnMnKVxyXG4gICAgY29uc3QgYWRkU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRTZWN0aW9uJylcclxuICAgIGNvbnN0IHNvdXJjZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291cmNlcycpXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXR0aW5ncycpXHJcbiAgICBjb25zdCBzZXR0aW5nc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MnKVxyXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZ3Jlc3MnKVxyXG5cclxuICAgIGNvbnN0IG9wZW5DaGFwdGVycyA9ICgpID0+IHtcclxuICAgICAgICBzb3VyY2VzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBpbXBvcnRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBhZGRTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHVybHMuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgcHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgY2hhcHRlcnMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgIGJvb2ttYXJrcy5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICBwb3B1cFRpdGxlLmlubmVyVGV4dCA9ICdDaGFwdGVycydcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcGVuU2V0dGluZ3MgPSAoKSA9PiB7XHJcbiAgICAgICAgc291cmNlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgICAgICB1cmxzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwb3B1cFRpdGxlLmlubmVyVGV4dCA9ICdTZXR0aW5ncydcclxuICAgICAgICBib29rbWFya3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgY2hhcHRlcnMuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgfVxyXG5cclxuICAgIGNoYXB0ZXJzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbkNoYXB0ZXJzKVxyXG5cclxuICAgIGJvb2ttYXJrcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBzb3VyY2VzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICAgICAgaW1wb3J0U2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgYWRkU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICBwcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgdXJscy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgcG9wdXBUaXRsZS5pbm5lclRleHQgPSAnQm9va21hcmtzJ1xyXG4gICAgICAgIGJvb2ttYXJrcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgY2hhcHRlcnMuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICB9KVxyXG5cclxuICAgIHNldHRpbmdzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblNldHRpbmdzKVxyXG5cclxuICAgIGlmIChnZXRMaW5rUXVlcnkoKSkge1xyXG4gICAgICAgIG9wZW5TZXR0aW5ncygpXHJcbiAgICAgICAgbGlua0lmVW5saW5rZWQoZGIsIEFwaSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG9wZW5DaGFwdGVycygpXHJcbiAgICB9XHJcbn1cclxuIiwiY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZ3Jlc3MnKVxyXG5cclxubGV0IGxvY2tlZCA9IGZhbHNlXHJcblxyXG5leHBvcnQgY29uc3QgcmVzaXN0ZXJQcm9ncmVzc0hhbmRsZXIgPSAodXBkYXRlTm93KSA9PiB7XHJcbiAgICBwcm9ncmVzcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB1cGRhdGVOb3coKVxyXG4gICAgICAgIG1hcmtSZWZyZXNoZWQoKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1hcmtSZWZyZXNoZWQgPSAoKSA9PiB7XHJcbiAgICBwcm9ncmVzcy5pbm5lckhUTUwgPSAnKHJlZnJlc2hlZCEpJ1xyXG4gICAgbG9ja2VkID0gdHJ1ZVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbG9ja2VkID0gZmFsc2VcclxuICAgIH0sIDE1MDApXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVQcm9ncmVzcyA9IChfbGFzdFBpbmcsIG5leHRQaW5nKSA9PiB7XHJcbiAgICBpZiAoIWxvY2tlZCkge1xyXG4gICAgICAgIGNvbnN0IHJlbWFpbmluZyA9IG5leHRQaW5nIC0gRGF0ZS5ub3coKVxyXG5cclxuICAgICAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5tYXgoTWF0aC5yb3VuZChyZW1haW5pbmcgLyAxMDAwKSwgMClcclxuXHJcbiAgICAgICAgcHJvZ3Jlc3MuaW5uZXJIVE1MID0gYChuZXh0IHJlZnJlc2g6ICR7c2Vjb25kc31zKWBcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU2NoZWR1bGUgPSAoeyBpc0FjdGl2ZSA9IGZhbHNlLCBpbnRlcnZhbCA9IDAsIGNhbGxiYWNrID0gRnVuY3Rpb24ucHJvdG90eXBlLCB1cGRhdGVyIH0gPSB7fSkgPT4ge1xyXG4gICAgbGV0IG5leHRQaW5nID0gMFxyXG4gICAgbGV0IGxhc3RQaW5nID0gMFxyXG4gICAgY29uc3QgY2FsbENhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChuZXh0UGluZyAmJiBuZXh0UGluZyA8PSBEYXRlLm5vdygpKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSBuZXh0UGluZ1xyXG4gICAgICAgICAgICBuZXh0UGluZyA9IG5leHRQaW5nICsgaW50ZXJ2YWwgPiBEYXRlLm5vdygpID8gbmV4dFBpbmcgKyBpbnRlcnZhbCA6IERhdGUubm93KCkgKyBpbnRlcnZhbFxyXG4gICAgICAgIH1cclxuICAgICAgICB0eXBlb2YgdXBkYXRlciA9PT0gJ2Z1bmN0aW9uJyAmJiB1cGRhdGVyKGxhc3RQaW5nLCBuZXh0UGluZylcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNBY3RpdmUgJiYgaW50ZXJ2YWwpIHtcclxuICAgICAgICBuZXh0UGluZyA9IERhdGUubm93KCkgLSAxXHJcbiAgICAgICAgY2FsbENhbGxiYWNrKClcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbChjYWxsQ2FsbGJhY2ssIDEwMClcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNldEludGVydmFsIChuZXdJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5ld0ludGVydmFsICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1c2UgYSBudW1iZXInKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gbmV4dFBpbmcgLSBpbnRlcnZhbCArIG5ld0ludGVydmFsXHJcbiAgICAgICAgICAgIGludGVydmFsID0gbmV3SW50ZXJ2YWxcclxuICAgICAgICAgICAgY2FsbENhbGxiYWNrKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldENhbGxiYWNrIChjYikge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgbGFzdFBpbmcgPSBEYXRlLm5vdygpXHJcbiAgICAgICAgICAgIG5leHRQaW5nID0gRGF0ZS5ub3coKSArIGludGVydmFsXHJcbiAgICAgICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoY2FsbENhbGxiYWNrLCAxMDApXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmlnZ2VySW5zdGFudGx5ICgpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICBsYXN0UGluZyA9IERhdGUubm93KClcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSBEYXRlLm5vdygpICsgaW50ZXJ2YWxcclxuICAgICAgICAgICAgdHlwZW9mIHVwZGF0ZXIgPT09ICdmdW5jdGlvbicgJiYgdXBkYXRlcihsYXN0UGluZywgbmV4dFBpbmcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wICgpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcclxuICAgICAgICAgICAgbmV4dFBpbmcgPSAwXHJcbiAgICAgICAgICAgIGxhc3RQaW5nID0gMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBsaW5rRmllbGRzID0gWydoaWRlJywgJ2hpZGRlbkNoYXB0ZXJzJywgJ3NvdXJjZXMnXVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0S2V5IChrZXkpIHtcclxuICAgIHJldHVybiBgJHtrZXkuc2xpY2UoMCwgNSl9LSR7a2V5LnNsaWNlKDUsIDEwKX0tJHtrZXkuc2xpY2UoMTAsIDE1KX1gXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW5rSGVscGVycyAoZGIsIEFwaSkge1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gcHVzaExpbmtVcGRhdGUgKGNoYW5nZXMpIHtcclxuICAgICAgICBjb25zdCBjaGFuZ2VzZXQgPSBsaW5rRmllbGRzLmZpbHRlcigoa2V5KSA9PiBPYmplY3Qua2V5cyhjaGFuZ2VzKS5zb21lKChjaGFuZ2UpID0+IGNoYW5nZS5pbmNsdWRlcyhrZXkpKSlcclxuXHJcbiAgICAgICAgaWYgKGNoYW5nZXNldC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpIHx8IHt9XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsID0gYXdhaXQgZGIubGluay5sb2NhbCgpIHx8IHt9XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZXMgPSB7fVxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlc2V0LmluY2x1ZGVzKCdoaWRlJykgJiYgU3RyaW5nKGxpbmsuaGlkZSkgIT09IFN0cmluZyhsb2NhbC5oaWRlKSkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlcy5oaWRlID0gbG9jYWwuaGlkZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGNoYW5nZXNldC5pbmNsdWRlcygnaGlkZGVuQ2hhcHRlcnMnKSAmJlxyXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkobGluay5oaWRkZW5DaGFwdGVycykgIT09IEpTT04uc3RyaW5naWZ5KGxvY2FsLmhpZGRlbkNoYXB0ZXJzKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZXMuaGlkZGVuQ2hhcHRlcnMgPSBsb2NhbC5oaWRkZW5DaGFwdGVyc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzZXQuaW5jbHVkZXMoJ3NvdXJjZXMnKSAmJiAoXHJcbiAgICAgICAgICAgICAgICBsaW5rLnNvdXJjZXM/Lmxlbmd0aCAhPT0gbG9jYWwuc291cmNlcy5sZW5ndGggfHxcclxuICAgICAgICAgICAgICAgIGxpbmsuc291cmNlcy5zb21lKChzb3VyY2UpID0+IHNvdXJjZSAmJiAhbG9jYWwuc291cmNlcy5pbmNsdWRlcyhzb3VyY2UuaWQpKVxyXG4gICAgICAgICAgICApKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLnNvdXJjZXMgPSBsb2NhbC5zb3VyY2VzXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhjaGFuZ2VzKS5sZW5ndGggJiYgbGluay5rZXkpIHtcclxuICAgICAgICAgICAgICAgIEFwaS5MaW5rLnVwZGF0ZShsaW5rLmtleSwgY2hhbmdlcylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMudmFsaWQgJiYgZGIubGluay5zZXQocmVzLnBheWxvYWQpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoTGlua1VwZGF0ZSAoKSB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcblxyXG4gICAgICAgIGlmIChsaW5rKSB7XHJcbiAgICAgICAgICAgIEFwaS5MaW5rLnJlYWQobGluay5rZXksIGxpbmsubGFzdE1vZGlmaWVkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMudmFsaWQgJiYgcmVzLnBheWxvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGIubGluay5zZXRMb2NhbChyZXMucGF5bG9hZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGIubGluay5zZXQocmVzLnBheWxvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHB1c2hMaW5rVXBkYXRlLFxyXG4gICAgICAgIGZldGNoTGlua1VwZGF0ZVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1ZhbGlkTGlua0tleSAoa2V5KSB7XHJcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbGVhbktleSA9IGtleS5yZXBsYWNlQWxsKC9bXlxcZF0qL2csICcnKVxyXG4gICAgaWYgKGNsZWFuS2V5Lmxlbmd0aCA9PT0gMTUpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlua1F1ZXJ5ICgpIHtcclxuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaClcclxuXHJcbiAgICBpZiAoaXNWYWxpZExpbmtLZXkodXJsUGFyYW1zLmdldCgnbGluaycpKSkge1xyXG4gICAgICAgIHJldHVybiB1cmxQYXJhbXMuZ2V0KCdsaW5rJykucmVwbGFjZUFsbCgvW15cXGRdKi9nLCAnJylcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxpbmtJZlVubGlua2VkIChkYiwgYXBpKSB7XHJcbiAgICBjb25zdCBrZXkgPSBnZXRMaW5rUXVlcnkoKVxyXG5cclxuICAgIGlmIChrZXkpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50TGluayA9IGF3YWl0IGRiLmxpbmsucmVhZCgpXHJcblxyXG4gICAgICAgIGlmICghY3VycmVudExpbmsgfHwgIWN1cnJlbnRMaW5rLmtleSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rSW5wdXQxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTEnKVxyXG4gICAgICAgICAgICBjb25zdCBsaW5rSW5wdXQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTInKVxyXG4gICAgICAgICAgICBjb25zdCBsaW5rSW5wdXQzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTMnKVxyXG5cclxuICAgICAgICAgICAgbGlua0lucHV0MS52YWx1ZSA9IGtleS5zbGljZSgwLCA1KVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnZhbHVlID0ga2V5LnNsaWNlKDUsIDEwKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0ga2V5LnNsaWNlKDEwLCAxNSlcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IGF3YWl0IGNvbm5lY3RUb0xpbmsoa2V5LCBhcGksIGRiKVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmsgJiYgbGluay5rZXkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtOdW1iZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstaWQnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlua0xpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtMaW5rVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmstdGV4dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bmxpbmstc2VjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0xpbmtUZXh0LnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0xpbmsuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rTGluay5pbm5lclRleHQgPSBgaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbT9saW5rPSR7bGluay5rZXl9YFxyXG4gICAgICAgICAgICAgICAgbGlua0xpbmsuaHJlZiA9IGBodHRwczovL21hbmdhLmZvY2hsYWMuY29tP2xpbms9JHtsaW5rLmtleX1gXHJcbiAgICAgICAgICAgICAgICBsaW5rTnVtYmVyVGV4dC5pbm5lclRleHQgPSBgJHtsaW5rLmtleS5zbGljZSgwLCA1KX0tJHtsaW5rLmtleS5zbGljZSg1LCAxMCl9LSR7bGluay5rZXkuc2xpY2UoMTApfWBcclxuICAgICAgICAgICAgICAgIGxpbmtOdW1iZXJUZXh0LnN0eWxlLmNvbG9yID0gJyMwMDBjMjEnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZm9ybWF0S2V5KGN1cnJlbnRMaW5rLmtleSkgIT09IGZvcm1hdEtleShrZXkpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtMaW5rV2FybiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmstd2FybmluZycpXHJcbiAgICAgICAgICAgIGNvbnN0IHdhcm5MaW5rQ3VycmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3YXJuLWN1cnJlbnQtbGluaycpXHJcbiAgICAgICAgICAgIGNvbnN0IHdhcm5MaW5rTmV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dhcm4tbmV3LWxpbmsnKVxyXG5cclxuICAgICAgICAgICAgbGlua0xpbmtXYXJuLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgICAgICAgICAgd2FybkxpbmtDdXJyZW50LmlubmVyVGV4dCA9IGZvcm1hdEtleShjdXJyZW50TGluay5rZXkpXHJcbiAgICAgICAgICAgIHdhcm5MaW5rTmV3LmlubmVyVGV4dCA9IGZvcm1hdEtleShrZXkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjb25uZWN0VG9MaW5rIChrZXksIGFwaSwgZGIpIHtcclxuICAgIGNvbnN0IHsgTGluayB9ID0gYXBpXHJcbiAgICBjb25zdCBsaW5rRXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1lcnJvcicpXHJcbiAgICBjb25zdCBsaW5rUHJvZ3Jlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1wcm9ncmVzcycpXHJcbiAgICBjb25zdCBjcmVhdGVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1saW5rLWJ1dHRvbicpXHJcbiAgICBjb25zdCBsaW5rQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstYnV0dG9uJylcclxuICAgIGxpbmtFcnJvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICBsaW5rUHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgIGNyZWF0ZUxpbmsuZGlzYWJsZWQgPSB0cnVlXHJcbiAgICBsaW5rQnV0dG9uLmRpc2FibGVkID0gdHJ1ZVxyXG5cclxuICAgIGNvbnN0IGxpbmtSZXN1bHQgPSBhd2FpdCBMaW5rLnJlYWQoa2V5KVxyXG4gICAgY3JlYXRlTGluay5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICBsaW5rQnV0dG9uLmRpc2FibGVkID0gZmFsc2VcclxuICAgIGxpbmtQcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICBpZiAobGlua1Jlc3VsdD8udmFsaWQpIHtcclxuICAgICAgICBjb25zdCBsaW5rID0gbGlua1Jlc3VsdC5wYXlsb2FkXHJcbiAgICAgICAgYXdhaXQgZGIubGluay5zZXQobGluaylcclxuICAgICAgICBhd2FpdCBkYi5saW5rLnNldExvY2FsKGxpbmspXHJcblxyXG4gICAgICAgIHJldHVybiBsaW5rXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBsaW5rRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGlua0xpbmtXYXJuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluay13YXJuaW5nJylcclxuXHJcbiAgICBpZiAobGlua0xpbmtXYXJuKSB7XHJcbiAgICAgICAgbGlua0xpbmtXYXJuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNldHRpbmdzSGFuZGxlcnMgKGRiLCBhcGkpIHtcclxuICAgIGNvbnN0IHsgTGluayB9ID0gYXBpXHJcblxyXG4gICAgY29uc3QgY3JlYXRlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctbGluay1idXR0b24nKVxyXG4gICAgY29uc3QgdXBkYXRlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGRhdGUtbGlua2luZycpXHJcbiAgICBjb25zdCBsaW5rTnVtYmVyVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWlkJylcclxuICAgIGNvbnN0IGxpbmtMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbGluaycpXHJcbiAgICBjb25zdCBsaW5rTGlua1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1saW5rLXRleHQnKVxyXG4gICAgY29uc3QgbGlua2luZ1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1zZWN0aW9uJylcclxuICAgIGNvbnN0IHVubGlua1NlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndW5saW5rLXNlY3Rpb24nKVxyXG4gICAgY29uc3QgdW5saW5rQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VubGluay1idXR0b24nKVxyXG4gICAgY29uc3QgbGlua0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWJ1dHRvbicpXHJcbiAgICBjb25zdCBsaW5rSW5wdXQxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstbnVtYmVyLTEnKVxyXG4gICAgY29uc3QgbGlua0lucHV0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLW51bWJlci0yJylcclxuICAgIGNvbnN0IGxpbmtJbnB1dDMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluay1udW1iZXItMycpXHJcblxyXG4gICAgbGlua0lucHV0MS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBudW1iZXIgPSBsaW5rSW5wdXQxLnZhbHVlLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpLnNsaWNlKDAsIDE1KVxyXG4gICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSBudW1iZXIuc2xpY2UoMCwgNSlcclxuICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA+IDUpIHtcclxuICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IG51bWJlci5zbGljZSg1LCAxMClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG51bWJlci5sZW5ndGggPiAxMCkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gbnVtYmVyLnNsaWNlKDEwKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLmZvY3VzKClcclxuICAgICAgICAgICAgbGlua0lucHV0My5zZXRTZWxlY3Rpb25SYW5nZShudW1iZXIubGVuZ3RoIC0gMTAsIG51bWJlci5sZW5ndGggLSAxMClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobnVtYmVyLmxlbmd0aCA+PSA1KSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDIuZm9jdXMoKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQyLnNldFNlbGVjdGlvblJhbmdlKG51bWJlci5sZW5ndGggLSA1LCBudW1iZXIubGVuZ3RoIC0gNSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGlua0lucHV0Mi5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBudW1iZXIgPSBsaW5rSW5wdXQyLnZhbHVlLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpLnNsaWNlKDAsIDEwKVxyXG4gICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSBudW1iZXIuc2xpY2UoMCwgNSlcclxuICAgICAgICBpZiAobnVtYmVyLmxlbmd0aCA+PSA1KSB7XHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMudmFsdWUgPSBudW1iZXIuc2xpY2UoNSwgMTApXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDMuZm9jdXMoKVxyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnNldFNlbGVjdGlvblJhbmdlKG51bWJlci5sZW5ndGggLSA1LCBudW1iZXIubGVuZ3RoIC0gNSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGlua0lucHV0My5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBudW1iZXIgPSBsaW5rSW5wdXQzLnZhbHVlLnJlcGxhY2VBbGwoL1teXFxkXSovZywgJycpLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgaWYgKGxpbmtJbnB1dDMudmFsdWUgIT09IG51bWJlci5zbGljZSgwLCA1KSkge1xyXG4gICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gbnVtYmVyLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBmdW5jdGlvbiB3cml0ZVN0YXRlVG9Eb20gKGxpbmspIHtcclxuICAgICAgICBsaW5raW5nU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICdub25lJyA6ICcnXHJcbiAgICAgICAgdW5saW5rU2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICcnIDogJ25vbmUnXHJcbiAgICAgICAgaWYgKGxpbmtMaW5rVGV4dCkge1xyXG4gICAgICAgICAgICBsaW5rTGlua1RleHQuc3R5bGUuZGlzcGxheSA9IGxpbmsgPyAnJyA6ICdub25lJ1xyXG4gICAgICAgICAgICBsaW5rTGluay5zdHlsZS5kaXNwbGF5ID0gbGluayA/ICcnIDogJ25vbmUnXHJcbiAgICAgICAgICAgIGxpbmtMaW5rLmlubmVyVGV4dCA9IGxpbmsgPyBgaHR0cHM6Ly9tYW5nYS5mb2NobGFjLmNvbT9saW5rPSR7bGluay5rZXl9YCA6ICcnXHJcbiAgICAgICAgICAgIGxpbmtMaW5rLmhyZWYgPSBsaW5rID8gYGh0dHBzOi8vbWFuZ2EuZm9jaGxhYy5jb20/bGluaz0ke2xpbmsua2V5fWAgOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaW5rTnVtYmVyVGV4dC5pbm5lclRleHQgPSBsaW5rID8gZm9ybWF0S2V5KGxpbmsua2V5KSA6ICdVbmxpbmtlZCdcclxuICAgICAgICBsaW5rTnVtYmVyVGV4dC5zdHlsZS5jb2xvciA9IGxpbmsgPyAnIzAwMGMyMScgOiAnI2MzY2JkMidcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgIHdyaXRlU3RhdGVUb0RvbShsaW5rKVxyXG5cclxuICAgIGlmICh1cGRhdGVMaW5rKSB7XHJcbiAgICAgICAgdXBkYXRlTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gZ2V0TGlua1F1ZXJ5KClcclxuXHJcbiAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSBrZXkuc2xpY2UoMCwgNSlcclxuICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9IGtleS5zbGljZSg1LCAxMClcclxuICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9IGtleS5zbGljZSgxMCwgMTUpXHJcbiAgICAgICAgICAgIGF3YWl0IGRiLmxpbmsuc2V0KG51bGwpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWxpbmstd2FybmluZycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKClcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29ubmVjdFRvTGluayhrZXksIGFwaSwgZGIpXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbShyZXN1bHQpXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQxLnZhbHVlID0gJydcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDIudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0My52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlua0xpbmtXYXJuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmstZXJyb3InKVxyXG5cclxuICAgICAgICBpZiAobGlua0xpbmtXYXJuKSB7XHJcbiAgICAgICAgICAgIGxpbmtMaW5rV2Fybi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rRGF0YSA9IGF3YWl0IGRiLmxpbmsubG9jYWwoKVxyXG4gICAgICAgICAgICBjb25zdCBuZXdMaW5rUmVzdWx0ID0gYXdhaXQgTGluay5pbnNlcnQobGlua0RhdGEpXHJcbiAgICAgICAgICAgIGlmIChuZXdMaW5rUmVzdWx0Py52YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluayA9IG5ld0xpbmtSZXN1bHQucGF5bG9hZFxyXG4gICAgICAgICAgICAgICAgYXdhaXQgZGIubGluay5zZXQobGluaylcclxuICAgICAgICAgICAgICAgIHdyaXRlU3RhdGVUb0RvbShsaW5rKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHVubGlua0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rID0gYXdhaXQgZGIubGluay5yZWFkKClcclxuICAgICAgICBpZiAobGluaykge1xyXG4gICAgICAgICAgICBhd2FpdCBkYi5saW5rLnNldChudWxsKVxyXG4gICAgICAgICAgICB3cml0ZVN0YXRlVG9Eb20odW5kZWZpbmVkKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBsaW5rQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBkYi5saW5rLnJlYWQoKVxyXG4gICAgICAgIGlmICghbGluaykge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsaW5rSW5wdXQxLnZhbHVlfSR7bGlua0lucHV0Mi52YWx1ZX0ke2xpbmtJbnB1dDMudmFsdWV9YFxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb25uZWN0VG9MaW5rKGtleSwgYXBpLCBkYilcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVTdGF0ZVRvRG9tKGtleSlcclxuICAgICAgICAgICAgICAgIGxpbmtJbnB1dDEudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgbGlua0lucHV0Mi52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgICBsaW5rSW5wdXQzLnZhbHVlID0gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNvdXJjZVJlbmRlcmVyIChkYikge1xyXG4gICAgY29uc3Qgc291cmNlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VyY2VzJylcclxuXHJcbiAgICBzb3VyY2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2xvc2VzdCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93IC5hY3Rpb24uZGVsZXRlJylcclxuICAgICAgICBpZiAoY2xvc2VzdCAmJiBjbG9zZXN0LmRhdGFzZXRbJ2lkJ10gJiYgc291cmNlcy5jb250YWlucyhjbG9zZXN0KSkge1xyXG4gICAgICAgICAgICBkYi5zb3VyY2VzLmRlbGV0ZShjbG9zZXN0LmRhdGFzZXRbJ2lkJ10pXHJcbiAgICAgICAgICAgIGNsb3Nlc3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aW9uJylcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlbmRlclNvdXJjZXMgKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkYi5zb3VyY2VzLnJlYWQoKVxyXG5cclxuICAgICAgICBzb3VyY2VzLmlubmVySFRNTCA9IGRhdGFcclxuICAgICAgICAgICAgLnNvcnQoKHNvdXJjZTEsIHNvdXJjZTIpID0+IFN0cmluZyhzb3VyY2UxLnRpdGxlKS5sb2NhbGVDb21wYXJlKHNvdXJjZTI/LnRpdGxlKSlcclxuICAgICAgICAgICAgLm1hcCgoc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gU3RyaW5nKHNvdXJjZS51cmwpLnJlcGxhY2UoL2h0dHBzPzpcXC9cXC8vLCAnJykuc3BsaXQoJy8nKVswXVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICBgPGxpIGNsYXNzPVwicm93IHNvdXJjZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YVwiIHRpdGxlPVwiJHtgJHtzb3VyY2UudGl0bGV9ICgke3VybH0pYH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGl0bGVcIj4ke3NvdXJjZS50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hbmdhLWlkXCI+KCR7dXJsfSk8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlbGV0ZSBhY3Rpb25cIiBkYXRhLWlkPVwiJHtzb3VyY2UuaWR9XCI+RGVsZXRlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+YFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuam9pbignXFxuJylcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbmRlcjogKCkgPT4gcmVuZGVyU291cmNlcygpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcGFkIH0gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cmxSZW5kZXJlciAoZGIpIHtcclxuICAgIGNvbnN0IHVybHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJscycpXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGlkZSAoaWQpIHtcclxuICAgICAgICBjb25zdCB7IG5ld1VybHMsIG9sZFVybHMgfSA9IGF3YWl0IGRiLnVybHMucmVhZCgpXHJcbiAgICAgICAgaWYgKG5ld1VybHMubGVuZ3RoIDw9IDEgJiYgKCFuZXdVcmxzWzBdIHx8IG5ld1VybHNbMF0uaWQgPT09IGlkKSkge1xyXG4gICAgICAgICAgICBjb25zdCBsYXRlc3RDaGFwdGVyRGF0ZSA9IG9sZFVybHMuY29uY2F0KG5ld1VybHMpXHJcbiAgICAgICAgICAgICAgICAucmVkdWNlKChsY2QsIHVybCkgPT4gdXJsLmNyZWF0ZWQgPiBsY2QgPyB1cmwuY3JlYXRlZCA6IGxjZCwgMClcclxuXHJcbiAgICAgICAgICAgIGRiLnVybHMuaGlkZUFsbChsYXRlc3RDaGFwdGVyRGF0ZSArIDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkYi51cmxzLmhpZGUoaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVybHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjbG9zZXN0SGlkZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93IC5oaWRlJylcclxuXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RIaWRlICYmIGNsb3Nlc3RIaWRlLmRhdGFzZXRbJ2lkJ10gJiYgdXJscy5jb250YWlucyhjbG9zZXN0SGlkZSkpIHtcclxuICAgICAgICAgICAgYXdhaXQgaGlkZShjbG9zZXN0SGlkZS5kYXRhc2V0WydpZCddKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbG9zZXN0TGluayA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm93Lm5ldyAubGluaycpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RMaW5rICYmIGNsb3Nlc3RMaW5rLmRhdGFzZXRbJ2lkJ10gJiYgdXJscy5jb250YWlucyhjbG9zZXN0TGluaykpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBhd2FpdCBoaWRlKGNsb3Nlc3RMaW5rLmRhdGFzZXRbJ2lkJ10pXHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKGNsb3Nlc3RMaW5rLmhyZWYsICdfYmxhbmsnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbG9zZXN0TW9yZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuYWN0aW9uLmxvYWQtbW9yZScpXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RNb3JlICYmIHVybHMuY29udGFpbnMoY2xvc2VzdE1vcmUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heE9sZCA9IGF3YWl0IGRiLnVybHMuZ2V0TWF4T2xkKClcclxuICAgICAgICAgICAgYXdhaXQgZGIudXJscy5zZXRNYXhPbGQobWF4T2xkICsgMTAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoaWRlQWxsID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5oaWRlLWFsbCcpXHJcbiAgICAgICAgaWYgKGhpZGVBbGwgJiYgdXJscy5jb250YWlucyhoaWRlQWxsKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBkYi51cmxzLmhpZGVBbGwoRGF0ZS5ub3coKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdG9wID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy50b3AnKVxyXG4gICAgICAgIGlmICh0b3AgJiYgdXJscy5jb250YWlucyh0b3ApKSB7XHJcbiAgICAgICAgICAgIHVybHMuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgbGV0IG1heFNjcm9sbCA9IDBcclxuICAgIHVybHMuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHVybHMub2Zmc2V0SGVpZ2h0ICsgdXJscy5zY3JvbGxUb3BcclxuICAgICAgICBpZiAodXJscy5zY3JvbGxIZWlnaHQgLSBzY3JvbGxIZWlnaHQgPD0gNTAgJiYgbWF4U2Nyb2xsICE9PSB1cmxzLnNjcm9sbEhlaWdodCkge1xyXG4gICAgICAgICAgICBtYXhTY3JvbGwgPSB1cmxzLnNjcm9sbEhlaWdodFxyXG4gICAgICAgICAgICBjb25zdCBtYXhPbGQgPSBhd2FpdCBkYi51cmxzLmdldE1heE9sZCgpXHJcbiAgICAgICAgICAgIGRiLnVybHMuc2V0TWF4T2xkKG1heE9sZCArIDEwMClcclxuICAgICAgICB9XHJcbiAgICAgICAgY2hlY2tUb3BCdXR0b24oKVxyXG4gICAgfSlcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1RvcEJ1dHRvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVybHMuc2Nyb2xsVG9wID4gMCAmJiB1cmxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA9PT0gdXJscy5xdWVyeVNlbGVjdG9yKCcub2xkLWNoYXB0ZXJzJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSB7XHJcbiAgICAgICAgICAgIHVybHMucXVlcnlTZWxlY3RvcignLm9sZC1jaGFwdGVycyAudG9wJykuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1cmxzLnF1ZXJ5U2VsZWN0b3IoJy5vbGQtY2hhcHRlcnMgLnRvcCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVXJsUmVuZGVyZXIgKGlzT2xkKSB7XHJcbiAgICAgICAgcmV0dXJuIChjaGFwdGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShjaGFwdGVyLmNyZWF0ZWQpXHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdHJpbmcgPSBgJHtwYWQoZGF0ZS5nZXRIb3VycygpKX06JHtwYWQoZGF0ZS5nZXRNaW51dGVzKCkpfWBcclxuICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGAke3BhZChkYXRlLmdldERhdGUoKSl9LiR7cGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpfS4ke1N0cmluZyhkYXRlLmdldEZ1bGxZZWFyKCkpLnNsaWNlKC0yKX1gXHJcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxEYXRlID0gZGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gPT09IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdID8gdGltZVN0cmluZyA6IGRhdGVTdHJpbmdcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJyb3cke2lzT2xkID8gJyBvbGQnIDogJyBuZXcnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGlua1wiIGhyZWY9XCIke2NoYXB0ZXIudXJsfVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCIgZGF0YS1pZD1cIiR7Y2hhcHRlci5pZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtjaGFwdGVyLnRpdGxlfSAtIENoYXB0ZXIgJHtjaGFwdGVyLmNoYXB0ZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0ZS13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0ZVwiIHRpdGxlPVwiJHtgJHtkYXRlU3RyaW5nfSAke3RpbWVTdHJpbmd9YH1cIj4ke2Z1bGxEYXRlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoaWRlXCIgZGF0YS1pZD1cIiR7Y2hhcHRlci5pZH1cIj5IaWRlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvbGk+YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiByZW5kZXJVcmxzICgpIHtcclxuICAgICAgICBjb25zdCBtYXhPbGQgPSBhd2FpdCBkYi51cmxzLmdldE1heE9sZCgpXHJcbiAgICAgICAgY29uc3QgeyBuZXdVcmxzLCBvbGRVcmxzIH0gPSBhd2FpdCBkYi51cmxzLnJlYWQoKVxyXG4gICAgICAgIGNvbnN0IG5ld1Jvd3MgPSBuZXdVcmxzLm1hcChjcmVhdGVVcmxSZW5kZXJlcihmYWxzZSkpXHJcbiAgICAgICAgY29uc3Qgb2xkUm93cyA9IG9sZFVybHMubWFwKGNyZWF0ZVVybFJlbmRlcmVyKHRydWUpKVxyXG5cclxuICAgICAgICBpZiAobmV3Um93cy5sZW5ndGggfHwgb2xkUm93cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdXJscy5pbm5lckhUTUwgPSBbXVxyXG4gICAgICAgICAgICAgICAgLmNvbmNhdChuZXdSb3dzLmxlbmd0aCA/ICc8bGkgY2xhc3M9XCJuZXctY2hhcHRlcnNcIj5OZXcgQ2hhcHRlcnMgPHNwYW4gY2xhc3M9XCJhY3Rpb24gaGlkZS1hbGxcIj5IaWRlIGFsbDwvc3Bhbj48L2xpPicgOiBbXSlcclxuICAgICAgICAgICAgICAgIC5jb25jYXQobmV3Um93cylcclxuICAgICAgICAgICAgICAgIC5jb25jYXQoJzxsaSBjbGFzcz1cIm9sZC1jaGFwdGVyc1wiPk9sZCBDaGFwdGVycyA8c3BhbiBjbGFzcz1cImFjdGlvbiB0b3BcIj5Ub3AgJiM4NTkzOzwvc3Bhbj48L2xpPicpXHJcbiAgICAgICAgICAgICAgICAuY29uY2F0KG9sZFJvd3Muc2xpY2UoMCwgbWF4T2xkKSlcclxuICAgICAgICAgICAgICAgIC5jb25jYXQob2xkUm93cy5sZW5ndGggPj0gbWF4T2xkID8gWyc8bGkgY2xhc3M9XCJhY3Rpb24gbG9hZC1tb3JlXCI+TG9hZCB1cCB0byAxMDAgbW9yZSBvbGQgY2hhcHRlcnMuLi48L2xpPiddIDogW10pXHJcbiAgICAgICAgICAgICAgICAuam9pbignXFxuJylcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBuZXdSb3dzLmxlbmd0aCA/IGAoJHtuZXdSb3dzLmxlbmd0aH0pIE1hbmdhIFBvbGxgIDogJ01hbmdhIFBvbGwnXHJcbiAgICAgICAgICAgIGNoZWNrVG9wQnV0dG9uKClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHVybHMuaW5uZXJIVE1MID0gJzxsaSBjbGFzcz1cInJvd1wiPk5vIENoYXB0ZXJzIGF2YWlsYWJsZS48L2xpPidcclxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnTWFuZ2EgUG9sbCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW5kZXI6ICgpID0+IHJlbmRlclVybHMoKVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBwYXJzZSAoc3RyaW5nLCBmYWxsYmFjaykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHJpbmcpXHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxsYmFja1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFkIChubykge1xyXG4gICAgcmV0dXJuICgnMDAnICsgbm8pLnNsaWNlKC0yKVxyXG59XHJcbiIsImltcG9ydCB7IEFQSSB9IGZyb20gJy4uL2NvbW1vbi9hcGknXHJcbmltcG9ydCB7IEFQSV9BRERSRVNTIH0gZnJvbSAnLi9jb25zdGFudHMnXHJcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi9zdG9yYWdlJ1xyXG5cclxubGV0IGN1cnJlbnRTb3VyY2UgPSBudWxsXHJcblxyXG5jb25zdCBib29rbWFyayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib29rbWFyaycpXHJcbmNvbnN0IGJvb2ttYXJrVHJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9va21hcmstdHJhY2snKVxyXG5jb25zdCBib29rbWFya1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvb2ttYXJrLXRpdGxlJylcclxuXHJcbmNvbnN0IHsgU291cmNlIH0gPSBBUEkoQVBJX0FERFJFU1MpXHJcblxyXG5ib29rbWFya1RyYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYm9va21hcmsuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgYm9va21hcmtUaXRsZS5pbm5lclRleHQgPSAnJ1xyXG4gICAgU291cmNlLmluc2VydChjdXJyZW50U291cmNlKVxyXG4gICAgICAgIC50aGVuKChzb3VyY2UpID0+IHNvdXJjZSAmJiBkYi5zb3VyY2VzLmFkZChzb3VyY2UpKVxyXG4gICAgY3VycmVudFNvdXJjZSA9IG51bGxcclxufSlcclxuXHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihhc3luYyAocmVxdWVzdCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2cocmVxdWVzdClcclxuICAgIGlmIChyZXF1ZXN0LmlkICYmIHJlcXVlc3QudGl0bGUgJiYgcmVxdWVzdC51cmwpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgZGIuc291cmNlcy5yZWFkKClcclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2VzLnNvbWUoKHNvdXJjZSkgPT4gc291cmNlLnVybCA9PT0gcmVxdWVzdC51cmwgJiYgU3RyaW5nKHNvdXJjZS5tYW5nYUlkKSA9PT0gU3RyaW5nKHJlcXVlc3QuaWQpKSkge1xyXG4gICAgICAgICAgICBib29rbWFyay5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICAgICAgICAgIGJvb2ttYXJrVGl0bGUuaW5uZXJUZXh0ID0gYERvIHlvdSB3YW50IHRvIHN0YXJ0IHRyYWNraW5nIFwiJHtyZXF1ZXN0LnRpdGxlfVwiP2BcclxuICAgICAgICAgICAgY3VycmVudFNvdXJjZSA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IHJlcXVlc3QudHlwZSxcclxuICAgICAgICAgICAgICAgIG1hbmdhSWQ6IHJlcXVlc3QuaWQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogcmVxdWVzdC50aXRsZSxcclxuICAgICAgICAgICAgICAgIHVybDogcmVxdWVzdC51cmxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYm9va21hcmsuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgYm9va21hcmtUaXRsZS5pbm5lclRleHQgPSAnJ1xyXG4gICAgY3VycmVudFNvdXJjZSA9IG51bGxcclxufSlcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0Qm9va21hcmsgKCkge1xyXG4gICAgY2hyb21lLnRhYnMucXVlcnkoXHJcbiAgICAgICAgeyBhY3RpdmU6IHRydWUsIHdpbmRvd0lkOiBjaHJvbWUud2luZG93cy5XSU5ET1dfSURfQ1VSUkVOVCB9LFxyXG4gICAgICAgICh0YWJzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGFic1swXS51cmwuaW5jbHVkZXMoJ2Nocm9tZTovLycpKSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoeyB0YXJnZXQ6IHsgdGFiSWQ6IHRhYnNbMF0uaWQgfSwgZnVuY3Rpb246IHRlc3QgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIClcclxufVxyXG5cclxuZnVuY3Rpb24gdGVzdCAoKSB7XHJcbiAgICBmdW5jdGlvbiBkZWNvZGVIVE1MRW50aXRpZXMgKHN0cikge1xyXG4gICAgICAgIGlmIChzdHIgJiYgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC88c2NyaXB0W14+XSo+KFtcXFNcXHNdKj8pPFxcL3NjcmlwdD4vZ21pLCAnJylcclxuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoLzxcXC8/XFx3KD86W15cIic+XXxcIlteXCJdKlwifCdbXiddKicpKj4vZ21pLCAnJylcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBzdHJcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudGV4dENvbnRlbnRcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0clxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RGYW5Gb3ggKCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaCgvXlxcL21hbmdhXFwvW14vXSpcXC8vKT8uWzBdXHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWFkZXItaGVhZGVyLXRpdGxlLTEgYTpmaXJzdC1jaGlsZCcpPy5pbm5lclRleHQgfHxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldGFpbC1pbmZvLXJpZ2h0LXRpdGxlLWZvbnQnKT8uaW5uZXJUZXh0XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdmYW5mb3gnLFxyXG4gICAgICAgICAgICBpZDogdXJsID8gdXJsLnNwbGl0KCcvJylbMl0gOiBudWxsLFxyXG4gICAgICAgICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgICAgICAgdXJsOiB1cmwgPyBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7dXJsfWAgOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RNYW5nYWRleCAoKSB7XHJcbiAgICAgICAgaWYgKC90aXRsZVxcL1tcXGQtXFx3XSpcXC9bXFxkLVxcd10qLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKT8uWzJdXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFuZ2EtY29udGFpbmVyIC50aXRsZSBwJyk/LmlubmVyVGV4dFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdtYW5nYWRleCcsXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBpZCA/IGBodHRwczovL2FwaS5tYW5nYWRleC5vcmcvbWFuZ2EvJHtpZH1gIDogbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKC9jaGFwdGVyXFwvW1xcZC1cXHddKlxcL1xcZCovLnRlc3Qod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYS50ZXh0LXByaW1hcnlbaHJlZio9XCIvdGl0bGUvXCJdJylcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGxpbms/LmlubmVyVGV4dFxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGxpbms/LmhyZWYuc3BsaXQoJy8nKT8uWzRdXHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ21hbmdhZGV4JyxcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGlkID8gYGh0dHBzOi8vYXBpLm1hbmdhZGV4Lm9yZy9tYW5nYS8ke2lkfWAgOiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdE1hZGFybyAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2UgKHN0cmluZywgZmFsbGJhY2spIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbGxiYWNrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlkcyA9IFtcclxuICAgICAgICAgICAgd2luZG93Py5tYW5nYT8ubWFuZ2FfaWQsXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRpbmctcG9zdC1pZCcpPy52YWx1ZSxcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwLW1hbmdhLWFjdGlvbi1idXR0b24nKT8uZGF0YXNldD8uWydwb3N0J10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGFwdGVyLXNlbGVjdGlvbicpPy5kYXRhc2V0Py5bJ21hbmdhJ10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYW5nYS1jaGFwdGVycy1ob2xkZXInKT8uZGF0YXNldD8uWydpZCddLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuZ2EtcmVhZGluZy1uYXYtaGVhZCcpPy5kYXRhc2V0Py5bJ2lkJ10sXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYW5nYS1yZWFkaW5nLW5hdi1mb290Jyk/LmRhdGFzZXQ/LlsnaWQnXVxyXG4gICAgICAgIF1cclxuICAgICAgICAgICAgLmZpbHRlcigodGl0bGUpID0+IHRpdGxlKVxyXG4gICAgICAgICAgICAucmVkdWNlKChtYXAsIGlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtYXBbaWRdID0gdHlwZW9mIG1hcFtpZF0gPT09ICdudW1iZXInID8gbWFwW2lkXSArIDEgOiAxXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwXHJcbiAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgIGNvbnN0IGlkID0gT2JqZWN0LmtleXMoaWRzKS5zb3J0KChpZDEsIGlkMikgPT4gaWRzW2lkMV0gLSBpZHNbaWQyXSlbMF1cclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtdGl0bGUgaDEnKVxyXG4gICAgICAgIGNvbnN0IHRpdGxlcyA9IFtcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cImFwcGxpY2F0aW9uL2xkK2pzb25cIl0nKSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKHNjcmlwdCkgPT4gcGFyc2Uoc2NyaXB0LmlubmVyVGV4dCk/LmhlYWRsaW5lKS5maW5kKChoKSA9PiBoKSxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXB0ZXItaGVhZGluZycpPy5pbm5lclRleHQ/LnNwbGl0KCcgLSAnKVswXSxcclxuICAgICAgICAgICAgaGVhZGVyICYmIEFycmF5LmZyb20oaGVhZGVyLmNoaWxkTm9kZXMpLnJlZHVjZSgodGl0bGUsIG5vZGUpID0+IHRpdGxlICsgKG5vZGUubm9kZVR5cGUgPT09IDMgPyBub2RlLnRleHRDb250ZW50IDogJycpLCAnJyksXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRlLXRpdGxlJyk/LnRpdGxlXHJcbiAgICAgICAgXVxyXG4gICAgICAgICAgICAuZmlsdGVyKCh0aXRsZSkgPT4gdGl0bGUpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKG1hcCwgdGl0bGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsZWFuID0gZGVjb2RlSFRNTEVudGl0aWVzKHRpdGxlKS50cmltKClcclxuICAgICAgICAgICAgICAgIG1hcFtjbGVhbl0gPSB0eXBlb2YgbWFwW2NsZWFuXSA9PT0gJ251bWJlcicgPyBtYXBbY2xlYW5dICsgMSA6IDFcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXBcclxuICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBPYmplY3Qua2V5cyh0aXRsZXMpLnNvcnQoKHRpdGxlMSwgdGl0bGUyKSA9PiB0aXRsZXNbdGl0bGUxXSAtIHRpdGxlc1t0aXRsZTJdKVswXVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnbWFkYXJvJyxcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICB1cmw6IGRvY3VtZW50Py5sb2NhdGlvbj8ub3JpZ2luID8gYCR7ZG9jdW1lbnQubG9jYXRpb24ub3JpZ2lufS93cC1hZG1pbi9hZG1pbi1hamF4LnBocGAgOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHRcclxuXHJcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QgPT09ICdmYW5mb3gubmV0Jykge1xyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RGYW5Gb3goKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QgPT09ICdtYW5nYWRleC5vcmcnKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gdGVzdE1hbmdhZGV4KClcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdCA9IHRlc3RNYWRhcm8oKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShyZXN1bHQpXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImV4cG9ydCBjb25zdCBBUElfQUREUkVTUyA9ICdodHRwczovL21hbmdhLmZvY2hsYWMuY29tJyAvLyAnaHR0cDovL2xvY2FsaG9zdDo0MzIxNCdcclxuIiwiaW1wb3J0IHsgY3JlYXRlREIgfSBmcm9tICcuLi9jb21tb24vZGInXHJcblxyXG5mdW5jdGlvbiByZWFkIChuYW1lc3BhY2UsIGtleXMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gY2hyb21lLnN0b3JhZ2VbbmFtZXNwYWNlXS5nZXQoa2V5cywgcmVzb2x2ZSkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyaXRlIChuYW1lc3BhY2UsIGtleVBhaXJzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IGNocm9tZS5zdG9yYWdlW25hbWVzcGFjZV0uc2V0KGtleVBhaXJzLCByZXNvbHZlKSlcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTGlzdGVuZXIgKGNhbGxiYWNrKSB7XHJcbiAgICByZXR1cm4gY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKGNhbGxiYWNrKVxyXG59XHJcblxyXG5jb25zdCBzdG9yYWdlID0ge1xyXG4gICAgcmVhZCwgd3JpdGUsIGFkZExpc3RlbmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkYiA9IGNyZWF0ZURCKHN0b3JhZ2UpXHJcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKiBGaWxlU2F2ZXIuanNcclxuICogQSBzYXZlQXMoKSBGaWxlU2F2ZXIgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cclxuICogRVM2aWZpZWQgYnkgQ29sZSBDaGFtYmVybGFpbiwgaHR0cHM6Ly9naXRodWIuY29tL2NjaGFtYmVybGFpblxyXG4gKlxyXG4gKiBMaWNlbnNlOiBNSVRcclxuICogICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvRmlsZVNhdmVyLmpzL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcclxuICovXG5cbi8qZ2xvYmFsIHNlbGYgKi9cbi8qanNsaW50IGJpdHdpc2U6IHRydWUsIGluZGVudDogNCwgbGF4YnJlYWs6IHRydWUsIGxheGNvbW1hOiB0cnVlLCBzbWFydHRhYnM6IHRydWUsIHBsdXNwbHVzOiB0cnVlICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9GaWxlU2F2ZXIuanMvYmxvYi9tYXN0ZXIvRmlsZVNhdmVyLmpzICovXG5cbnZhciBzYXZlQXMgPSBleHBvcnRzLnNhdmVBcyA9IHdpbmRvdy5zYXZlQXMgfHwgZnVuY3Rpb24gKHZpZXcpIHtcbiAgLy8gSUUgPDEwIGlzIGV4cGxpY2l0bHkgdW5zdXBwb3J0ZWRcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9NU0lFIFsxLTldXFwuLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSByZXR1cm47XG4gIHZhciBkb2MgPSB2aWV3LmRvY3VtZW50O1xuICAvLyBvbmx5IGdldCBVUkwgd2hlbiBuZWNlc3NhcnkgaW4gY2FzZSBCbG9iLmpzIGhhc24ndCBvdmVycmlkZGVuIGl0IHlldFxuICB2YXIgZ2V0X1VSTCA9IGZ1bmN0aW9uIGdldF9VUkwoKSB7XG4gICAgcmV0dXJuIHZpZXcuVVJMIHx8IHZpZXcud2Via2l0VVJMIHx8IHZpZXc7XG4gIH07XG4gIHZhciBzYXZlX2xpbmsgPSBkb2MuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJywgJ2EnKTtcbiAgdmFyIGNhbl91c2Vfc2F2ZV9saW5rID0gJ2Rvd25sb2FkJyBpbiBzYXZlX2xpbms7XG4gIHZhciBjbGljayA9IGZ1bmN0aW9uIGNsaWNrKG5vZGUpIHtcbiAgICB2YXIgZXZlbnQgPSBuZXcgTW91c2VFdmVudCgnY2xpY2snKTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9O1xuICB2YXIgaXNfc2FmYXJpID0gL1ZlcnNpb25cXC9bXFxkXFwuXSsuKlNhZmFyaS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgdmFyIHdlYmtpdF9yZXFfZnMgPSB2aWV3LndlYmtpdFJlcXVlc3RGaWxlU3lzdGVtO1xuICB2YXIgcmVxX2ZzID0gdmlldy5yZXF1ZXN0RmlsZVN5c3RlbSB8fCB3ZWJraXRfcmVxX2ZzIHx8IHZpZXcubW96UmVxdWVzdEZpbGVTeXN0ZW07XG4gIHZhciB0aHJvd19vdXRzaWRlID0gZnVuY3Rpb24gdGhyb3dfb3V0c2lkZShleCkge1xuICAgICh2aWV3LnNldEltbWVkaWF0ZSB8fCB2aWV3LnNldFRpbWVvdXQpKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IGV4O1xuICAgIH0sIDApO1xuICB9O1xuICB2YXIgZm9yY2Vfc2F2ZWFibGVfdHlwZSA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xuICB2YXIgZnNfbWluX3NpemUgPSAwO1xuICAvLyB0aGUgQmxvYiBBUEkgaXMgZnVuZGFtZW50YWxseSBicm9rZW4gYXMgdGhlcmUgaXMgbm8gXCJkb3dubG9hZGZpbmlzaGVkXCIgZXZlbnQgdG8gc3Vic2NyaWJlIHRvXG4gIHZhciBhcmJpdHJhcnlfcmV2b2tlX3RpbWVvdXQgPSAxMDAwICogNDA7IC8vIGluIG1zXG4gIHZhciByZXZva2UgPSBmdW5jdGlvbiByZXZva2UoZmlsZSkge1xuICAgIHZhciByZXZva2VyID0gZnVuY3Rpb24gcmV2b2tlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycpIC8vIGZpbGUgaXMgYW4gb2JqZWN0IFVSTFxuICAgICAgICBnZXRfVVJMKCkucmV2b2tlT2JqZWN0VVJMKGZpbGUpO2Vsc2UgLy8gZmlsZSBpcyBhIEZpbGVcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9O1xuICAgIC8qIC8vIFRha2Ugbm90ZSBXM0M6XHJcbiAgICB2YXJcclxuICAgICAgdXJpID0gdHlwZW9mIGZpbGUgPT09IFwic3RyaW5nXCIgPyBmaWxlIDogZmlsZS50b1VSTCgpXHJcbiAgICAsIHJldm9rZXIgPSBmdW5jdGlvbihldnQpIHtcclxuICAgICAgLy8gaWRlYWx5IERvd25sb2FkRmluaXNoZWRFdmVudC5kYXRhIHdvdWxkIGJlIHRoZSBVUkwgcmVxdWVzdGVkXHJcbiAgICAgIGlmIChldnQuZGF0YSA9PT0gdXJpKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmaWxlID09PSBcInN0cmluZ1wiKSB7IC8vIGZpbGUgaXMgYW4gb2JqZWN0IFVSTFxyXG4gICAgICAgICAgZ2V0X1VSTCgpLnJldm9rZU9iamVjdFVSTChmaWxlKTtcclxuICAgICAgICB9IGVsc2UgeyAvLyBmaWxlIGlzIGEgRmlsZVxyXG4gICAgICAgICAgZmlsZS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIDtcclxuICAgIHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcImRvd25sb2FkZmluaXNoZWRcIiwgcmV2b2tlcik7XHJcbiAgICAqL1xuICAgIHNldFRpbWVvdXQocmV2b2tlciwgYXJiaXRyYXJ5X3Jldm9rZV90aW1lb3V0KTtcbiAgfTtcbiAgdmFyIGRpc3BhdGNoID0gZnVuY3Rpb24gZGlzcGF0Y2goZmlsZXNhdmVyLCBldmVudF90eXBlcywgZXZlbnQpIHtcbiAgICBldmVudF90eXBlcyA9IFtdLmNvbmNhdChldmVudF90eXBlcyk7XG4gICAgdmFyIGkgPSBldmVudF90eXBlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdmFyIGxpc3RlbmVyID0gZmlsZXNhdmVyWydvbicgKyBldmVudF90eXBlc1tpXV07XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGlzdGVuZXIuY2FsbChmaWxlc2F2ZXIsIGV2ZW50IHx8IGZpbGVzYXZlcik7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgdGhyb3dfb3V0c2lkZShleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHZhciBhdXRvX2JvbSA9IGZ1bmN0aW9uIGF1dG9fYm9tKGJsb2IpIHtcbiAgICAvLyBwcmVwZW5kIEJPTSBmb3IgVVRGLTggWE1MIGFuZCB0ZXh0LyogdHlwZXMgKGluY2x1ZGluZyBIVE1MKVxuICAgIGlmICgvXlxccyooPzp0ZXh0XFwvXFxTKnxhcHBsaWNhdGlvblxcL3htbHxcXFMqXFwvXFxTKlxcK3htbClcXHMqOy4qY2hhcnNldFxccyo9XFxzKnV0Zi04L2kudGVzdChibG9iLnR5cGUpKSByZXR1cm4gbmV3IEJsb2IoWyfvu78nLCBibG9iXSwgeyB0eXBlOiBibG9iLnR5cGUgfSk7XG4gICAgcmV0dXJuIGJsb2I7XG4gIH07XG5cbiAgdmFyIEZpbGVTYXZlciA9IGZ1bmN0aW9uIEZpbGVTYXZlcihibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGaWxlU2F2ZXIpO1xuXG4gICAgaWYgKCFub19hdXRvX2JvbSkgYmxvYiA9IGF1dG9fYm9tKGJsb2IpO1xuICAgIC8vIEZpcnN0IHRyeSBhLmRvd25sb2FkLCB0aGVuIHdlYiBmaWxlc3lzdGVtLCB0aGVuIG9iamVjdCBVUkxzXG4gICAgdmFyIGZpbGVzYXZlciA9IHRoaXMsXG4gICAgICAgIHR5cGUgPSBibG9iLnR5cGUsXG4gICAgICAgIGJsb2JfY2hhbmdlZCA9IGZhbHNlLFxuICAgICAgICBvYmplY3RfdXJsLFxuICAgICAgICB0YXJnZXRfdmlldyxcbiAgICAgICAgZGlzcGF0Y2hfYWxsID0gZnVuY3Rpb24gZGlzcGF0Y2hfYWxsKCkge1xuICAgICAgZGlzcGF0Y2goZmlsZXNhdmVyLCAnd3JpdGVzdGFydCBwcm9ncmVzcyB3cml0ZSB3cml0ZWVuZCcuc3BsaXQoJyAnKSk7XG4gICAgfVxuICAgIC8vIG9uIGFueSBmaWxlc3lzIGVycm9ycyByZXZlcnQgdG8gc2F2aW5nIHdpdGggb2JqZWN0IFVSTHNcbiAgICAsXG4gICAgICAgIGZzX2Vycm9yID0gZnVuY3Rpb24gZnNfZXJyb3IoKSB7XG4gICAgICBpZiAodGFyZ2V0X3ZpZXcgJiYgaXNfc2FmYXJpICYmIHR5cGVvZiBGaWxlUmVhZGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBTYWZhcmkgZG9lc24ndCBhbGxvdyBkb3dubG9hZGluZyBvZiBibG9iIHVybHNcbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGJhc2U2NERhdGEgPSByZWFkZXIucmVzdWx0O1xuICAgICAgICAgIHRhcmdldF92aWV3LmxvY2F0aW9uLmhyZWYgPSAnZGF0YTphdHRhY2htZW50L2ZpbGUnICsgYmFzZTY0RGF0YS5zbGljZShiYXNlNjREYXRhLnNlYXJjaCgvWyw7XS8pKTtcbiAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgIGRpc3BhdGNoX2FsbCgpO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuSU5JVDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gZG9uJ3QgY3JlYXRlIG1vcmUgb2JqZWN0IFVSTHMgdGhhbiBuZWVkZWRcbiAgICAgIGlmIChibG9iX2NoYW5nZWQgfHwgIW9iamVjdF91cmwpIHtcbiAgICAgICAgb2JqZWN0X3VybCA9IGdldF9VUkwoKS5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0X3ZpZXcpIHtcbiAgICAgICAgdGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV3X3RhYiA9IHZpZXcub3BlbihvYmplY3RfdXJsLCAnX2JsYW5rJyk7XG4gICAgICAgIGlmIChuZXdfdGFiID09PSB1bmRlZmluZWQgJiYgaXNfc2FmYXJpKSB7XG4gICAgICAgICAgLy9BcHBsZSBkbyBub3QgYWxsb3cgd2luZG93Lm9wZW4sIHNlZSBodHRwOi8vYml0Lmx5LzFrWmZmUklcbiAgICAgICAgICB2aWV3LmxvY2F0aW9uLmhyZWYgPSBvYmplY3RfdXJsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICByZXZva2Uob2JqZWN0X3VybCk7XG4gICAgfSxcbiAgICAgICAgYWJvcnRhYmxlID0gZnVuY3Rpb24gYWJvcnRhYmxlKGZ1bmMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChmaWxlc2F2ZXIucmVhZHlTdGF0ZSAhPT0gZmlsZXNhdmVyLkRPTkUpIHtcbiAgICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG4gICAgICAgIGNyZWF0ZV9pZl9ub3RfZm91bmQgPSB7IGNyZWF0ZTogdHJ1ZSwgZXhjbHVzaXZlOiBmYWxzZSB9LFxuICAgICAgICBzbGljZTtcblxuICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLklOSVQ7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICBuYW1lID0gJ2Rvd25sb2FkJztcbiAgICB9XG4gICAgaWYgKGNhbl91c2Vfc2F2ZV9saW5rKSB7XG4gICAgICBvYmplY3RfdXJsID0gZ2V0X1VSTCgpLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzYXZlX2xpbmsuaHJlZiA9IG9iamVjdF91cmw7XG4gICAgICAgIHNhdmVfbGluay5kb3dubG9hZCA9IG5hbWU7XG4gICAgICAgIGNsaWNrKHNhdmVfbGluayk7XG4gICAgICAgIGRpc3BhdGNoX2FsbCgpO1xuICAgICAgICByZXZva2Uob2JqZWN0X3VybCk7XG4gICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gT2JqZWN0IGFuZCB3ZWIgZmlsZXN5c3RlbSBVUkxzIGhhdmUgYSBwcm9ibGVtIHNhdmluZyBpbiBHb29nbGUgQ2hyb21lIHdoZW5cbiAgICAvLyB2aWV3ZWQgaW4gYSB0YWIsIHNvIEkgZm9yY2Ugc2F2ZSB3aXRoIGFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVxuICAgIC8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTkxMTU4XG4gICAgLy8gVXBkYXRlOiBHb29nbGUgZXJyYW50bHkgY2xvc2VkIDkxMTU4LCBJIHN1Ym1pdHRlZCBpdCBhZ2FpbjpcbiAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9Mzg5NjQyXG4gICAgaWYgKHZpZXcuY2hyb21lICYmIHR5cGUgJiYgdHlwZSAhPT0gZm9yY2Vfc2F2ZWFibGVfdHlwZSkge1xuICAgICAgc2xpY2UgPSBibG9iLnNsaWNlIHx8IGJsb2Iud2Via2l0U2xpY2U7XG4gICAgICBibG9iID0gc2xpY2UuY2FsbChibG9iLCAwLCBibG9iLnNpemUsIGZvcmNlX3NhdmVhYmxlX3R5cGUpO1xuICAgICAgYmxvYl9jaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gU2luY2UgSSBjYW4ndCBiZSBzdXJlIHRoYXQgdGhlIGd1ZXNzZWQgbWVkaWEgdHlwZSB3aWxsIHRyaWdnZXIgYSBkb3dubG9hZFxuICAgIC8vIGluIFdlYktpdCwgSSBhcHBlbmQgLmRvd25sb2FkIHRvIHRoZSBmaWxlbmFtZS5cbiAgICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjU0NDBcbiAgICBpZiAod2Via2l0X3JlcV9mcyAmJiBuYW1lICE9PSAnZG93bmxvYWQnKSB7XG4gICAgICBuYW1lICs9ICcuZG93bmxvYWQnO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gZm9yY2Vfc2F2ZWFibGVfdHlwZSB8fCB3ZWJraXRfcmVxX2ZzKSB7XG4gICAgICB0YXJnZXRfdmlldyA9IHZpZXc7XG4gICAgfVxuICAgIGlmICghcmVxX2ZzKSB7XG4gICAgICBmc19lcnJvcigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmc19taW5fc2l6ZSArPSBibG9iLnNpemU7XG4gICAgcmVxX2ZzKHZpZXcuVEVNUE9SQVJZLCBmc19taW5fc2l6ZSwgYWJvcnRhYmxlKGZ1bmN0aW9uIChmcykge1xuICAgICAgZnMucm9vdC5nZXREaXJlY3RvcnkoJ3NhdmVkJywgY3JlYXRlX2lmX25vdF9mb3VuZCwgYWJvcnRhYmxlKGZ1bmN0aW9uIChkaXIpIHtcbiAgICAgICAgdmFyIHNhdmUgPSBmdW5jdGlvbiBzYXZlKCkge1xuICAgICAgICAgIGRpci5nZXRGaWxlKG5hbWUsIGNyZWF0ZV9pZl9ub3RfZm91bmQsIGFib3J0YWJsZShmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgICAgZmlsZS5jcmVhdGVXcml0ZXIoYWJvcnRhYmxlKGZ1bmN0aW9uICh3cml0ZXIpIHtcbiAgICAgICAgICAgICAgd3JpdGVyLm9ud3JpdGVlbmQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gZmlsZS50b1VSTCgpO1xuICAgICAgICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goZmlsZXNhdmVyLCAnd3JpdGVlbmQnLCBldmVudCk7XG4gICAgICAgICAgICAgICAgcmV2b2tlKGZpbGUpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB3cml0ZXIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB3cml0ZXIuZXJyb3I7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgIT09IGVycm9yLkFCT1JUX0VSUikge1xuICAgICAgICAgICAgICAgICAgZnNfZXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICd3cml0ZXN0YXJ0IHByb2dyZXNzIHdyaXRlIGFib3J0Jy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgd3JpdGVyWydvbicgKyBldmVudF0gPSBmaWxlc2F2ZXJbJ29uJyArIGV2ZW50XTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHdyaXRlci53cml0ZShibG9iKTtcbiAgICAgICAgICAgICAgZmlsZXNhdmVyLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHdyaXRlci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLldSSVRJTkc7XG4gICAgICAgICAgICB9KSwgZnNfZXJyb3IpO1xuICAgICAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGRpci5nZXRGaWxlKG5hbWUsIHsgY3JlYXRlOiBmYWxzZSB9LCBhYm9ydGFibGUoZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgICAvLyBkZWxldGUgZmlsZSBpZiBpdCBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgICAgICAgc2F2ZSgpO1xuICAgICAgICB9KSwgYWJvcnRhYmxlKGZ1bmN0aW9uIChleCkge1xuICAgICAgICAgIGlmIChleC5jb2RlID09PSBleC5OT1RfRk9VTkRfRVJSKSB7XG4gICAgICAgICAgICBzYXZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZzX2Vycm9yKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KSwgZnNfZXJyb3IpO1xuICAgIH0pLCBmc19lcnJvcik7XG4gIH07XG5cbiAgdmFyIEZTX3Byb3RvID0gRmlsZVNhdmVyLnByb3RvdHlwZTtcbiAgdmFyIHNhdmVBcyA9IGZ1bmN0aW9uIHNhdmVBcyhibG9iLCBuYW1lLCBub19hdXRvX2JvbSkge1xuICAgIHJldHVybiBuZXcgRmlsZVNhdmVyKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKTtcbiAgfTtcblxuICAvLyBJRSAxMCsgKG5hdGl2ZSBzYXZlQXMpXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcbiAgICAgIGlmICghbm9fYXV0b19ib20pIGJsb2IgPSBhdXRvX2JvbShibG9iKTtcbiAgICAgIHJldHVybiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihibG9iLCBuYW1lIHx8ICdkb3dubG9hZCcpO1xuICAgIH07XG4gIH1cblxuICBGU19wcm90by5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZmlsZXNhdmVyID0gdGhpcztcbiAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgIGRpc3BhdGNoKGZpbGVzYXZlciwgJ2Fib3J0Jyk7XG4gIH07XG4gIEZTX3Byb3RvLnJlYWR5U3RhdGUgPSBGU19wcm90by5JTklUID0gMDtcbiAgRlNfcHJvdG8uV1JJVElORyA9IDE7XG4gIEZTX3Byb3RvLkRPTkUgPSAyO1xuXG4gIEZTX3Byb3RvLmVycm9yID0gRlNfcHJvdG8ub253cml0ZXN0YXJ0ID0gRlNfcHJvdG8ub25wcm9ncmVzcyA9IEZTX3Byb3RvLm9ud3JpdGUgPSBGU19wcm90by5vbmFib3J0ID0gRlNfcHJvdG8ub25lcnJvciA9IEZTX3Byb3RvLm9ud3JpdGVlbmQgPSBudWxsO1xuXG4gIHJldHVybiBzYXZlQXM7XG59KHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmIHx8IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyB8fCB1bmRlZmluZWQuY29udGVudCk7XG4vLyBgc2VsZmAgaXMgdW5kZWZpbmVkIGluIEZpcmVmb3ggZm9yIEFuZHJvaWQgY29udGVudCBzY3JpcHQgY29udGV4dFxuLy8gd2hpbGUgYHRoaXNgIGlzIG5zSUNvbnRlbnRGcmFtZU1lc3NhZ2VNYW5hZ2VyXG4vLyB3aXRoIGFuIGF0dHJpYnV0ZSBgY29udGVudGAgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgd2luZG93XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHNhdmVBczsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICdyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMnXG5pbXBvcnQgeyB0ZXN0Qm9va21hcmsgfSBmcm9tICcuL2Jvb2ttYXJrJ1xuaW1wb3J0IHsgYWRkSW1wb3J0SGFuZGxlcnMgfSBmcm9tICcuLi9jb21tb24vaW1wb3J0J1xuaW1wb3J0IHsgZGIgfSBmcm9tICcuL3N0b3JhZ2UnXG5pbXBvcnQgeyB1cmxSZW5kZXJlciB9IGZyb20gJy4uL2NvbW1vbi91cmxzJ1xuaW1wb3J0IHsgc291cmNlUmVuZGVyZXIgfSBmcm9tICcuLi9jb21tb24vc291cmNlcydcbmltcG9ydCB7IG1hcmtSZWZyZXNoZWQsIHJlc2lzdGVyUHJvZ3Jlc3NIYW5kbGVyLCB1cGRhdGVQcm9ncmVzcyB9IGZyb20gJy4uL2NvbW1vbi9wcm9ncmVzcy1iYXInXG5pbXBvcnQgeyBjcmVhdGVTY2hlZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9zY2hlZHVsZSdcbmltcG9ydCB7IHJlZ2lzdGVyTWVudUxpc3RlbmVycyB9IGZyb20gJy4uL2NvbW1vbi9tZW51J1xuaW1wb3J0IHsgYWRkU2V0dGluZ3NIYW5kbGVycywgZ2V0TGlua0hlbHBlcnMgfSBmcm9tICcuLi9jb21tb24vc2V0dGluZ3MnXG5pbXBvcnQgeyBBUEkgfSBmcm9tICcuLi9jb21tb24vYXBpJ1xuaW1wb3J0IHsgQVBJX0FERFJFU1MgfSBmcm9tICcuL2NvbnN0YW50cydcblxuY29uc3QgYXBpID0gQVBJKEFQSV9BRERSRVNTKVxuXG5kYi51cmxzLnNldE1heE9sZCgxMDApXG5cbmNvbnN0IExpbmtzID0gZ2V0TGlua0hlbHBlcnMoZGIsIGFwaSlcbmNvbnN0IFVybHMgPSB1cmxSZW5kZXJlcihkYilcbmNvbnN0IFNvdXJjZXMgPSBzb3VyY2VSZW5kZXJlcihkYilcblxuZGIub25DaGFuZ2UoKGNoYW5nZXMpID0+IHtcbiAgICBpZiAoWydoaWRlJywgJ2hpZGRlbkNoYXB0ZXJzJywgJ3VybHMnXS5zb21lKGNoYW5nZXMuaGFzT3duUHJvcGVydHkuYmluZChjaGFuZ2VzKSkpIHtcbiAgICAgICAgVXJscy5yZW5kZXIoKVxuICAgIH1cbiAgICBpZiAoT2JqZWN0LmtleXMoY2hhbmdlcykuc29tZSgoY2hhbmdlKSA9PiBjaGFuZ2UuaW5jbHVkZXMoJ3NvdXJjZXMnKSkgfHwgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNoYW5nZXMsICdtYXhPbGQnKSkge1xuICAgICAgICBTb3VyY2VzLnJlbmRlcigpXG4gICAgfVxuICAgIExpbmtzLnB1c2hMaW5rVXBkYXRlKGNoYW5nZXMpXG59KVxuXG5uYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5jb250cm9sbGVyLnBvc3RNZXNzYWdlKCdGRVRDSF9DSEFQVEVSUycpXG5tYXJrUmVmcmVzaGVkKClcblxuY29uc3QgaW50ZXJ2YWwgPSBjcmVhdGVTY2hlZHVsZSh7XG4gICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuY29udHJvbGxlci5wb3N0TWVzc2FnZSgnRkVUQ0hfQ0hBUFRFUlMnKVxuICAgICAgICBtYXJrUmVmcmVzaGVkKClcbiAgICB9LFxuICAgIGludGVydmFsOiA2MCAqIDEwMDAsXG4gICAgaXNBY3RpdmU6IHRydWUsXG4gICAgdXBkYXRlcjogdXBkYXRlUHJvZ3Jlc3Ncbn0pXG5cbnJlc2lzdGVyUHJvZ3Jlc3NIYW5kbGVyKCgpID0+IGludGVydmFsLnRyaWdnZXJJbnN0YW50bHkoKSlcbmFkZEltcG9ydEhhbmRsZXJzKGRiKVxuYWRkU2V0dGluZ3NIYW5kbGVycyhkYiwgYXBpKVxucmVnaXN0ZXJNZW51TGlzdGVuZXJzKGRiLCBhcGkpXG5cblVybHMucmVuZGVyKClcblNvdXJjZXMucmVuZGVyKClcbiAgICAudGhlbih0ZXN0Qm9va21hcmspXG4iXSwic291cmNlUm9vdCI6IiJ9