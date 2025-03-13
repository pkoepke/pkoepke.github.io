// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@ffmpeg/ffmpeg/dist/umd/ffmpeg.js":[function(require,module,exports) {
var define;
var _excluded = ["classWorkerURL"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.FFmpegWASM = t() : e.FFmpegWASM = t();
}(self, function () {
  return function () {
    "use strict";

    var e = {
      m: {},
      d: function d(t, s) {
        for (var r in s) e.o(s, r) && !e.o(t, r) && Object.defineProperty(t, r, {
          enumerable: !0,
          get: s[r]
        });
      },
      u: function u(e) {
        return e + ".ffmpeg.js";
      }
    };
    e.g = function () {
      if ("object" == (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis))) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == (typeof window === "undefined" ? "undefined" : _typeof(window))) return window;
      }
    }(), e.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, e.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, function () {
      var t;
      e.g.importScripts && (t = e.g.location + "");
      var s = e.g.document;
      if (!t && s && (s.currentScript && (t = s.currentScript.src), !t)) {
        var r = s.getElementsByTagName("script");
        if (r.length) for (var a = r.length - 1; a > -1 && !t;) t = r[a--].src;
      }
      if (!t) throw new Error("Automatic publicPath is not supported in this browser");
      t = t.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), e.p = t;
    }(), e.b = document.baseURI || self.location.href;
    var t,
      s = {};
    e.r(s), e.d(s, {
      FFFSType: function FFFSType() {
        return n;
      },
      FFmpeg: function FFmpeg() {
        return i;
      }
    }), function (e) {
      e.LOAD = "LOAD", e.EXEC = "EXEC", e.FFPROBE = "FFPROBE", e.WRITE_FILE = "WRITE_FILE", e.READ_FILE = "READ_FILE", e.DELETE_FILE = "DELETE_FILE", e.RENAME = "RENAME", e.CREATE_DIR = "CREATE_DIR", e.LIST_DIR = "LIST_DIR", e.DELETE_DIR = "DELETE_DIR", e.ERROR = "ERROR", e.DOWNLOAD = "DOWNLOAD", e.PROGRESS = "PROGRESS", e.LOG = "LOG", e.MOUNT = "MOUNT", e.UNMOUNT = "UNMOUNT";
    }(t || (t = {}));
    var r = function () {
        var e = 0;
        return function () {
          return e++;
        };
      }(),
      a = (new Error("unknown message type"), new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first")),
      o = new Error("called FFmpeg.terminate()");
    new Error("failed to import ffmpeg-core.js");
    var _e = /*#__PURE__*/new WeakMap();
    var _t = /*#__PURE__*/new WeakMap();
    var _s = /*#__PURE__*/new WeakMap();
    var _r = /*#__PURE__*/new WeakMap();
    var _a = /*#__PURE__*/new WeakMap();
    var _o = /*#__PURE__*/new WeakMap();
    var _i = /*#__PURE__*/new WeakMap();
    var i = /*#__PURE__*/function () {
      function i() {
        var _this = this;
        _classCallCheck(this, i);
        _classPrivateFieldInitSpec(this, _e, null);
        _classPrivateFieldInitSpec(this, _t, {});
        _classPrivateFieldInitSpec(this, _s, {});
        _classPrivateFieldInitSpec(this, _r, []);
        _classPrivateFieldInitSpec(this, _a, []);
        _defineProperty(this, "loaded", !1);
        _classPrivateFieldInitSpec(this, _o, function () {
          _classPrivateFieldGet(_e, _this) && (_classPrivateFieldGet(_e, _this).onmessage = function (_ref) {
            var _ref$data = _ref.data,
              e = _ref$data.id,
              s = _ref$data.type,
              r = _ref$data.data;
            switch (s) {
              case t.LOAD:
                _this.loaded = !0, _classPrivateFieldGet(_t, _this)[e](r);
                break;
              case t.MOUNT:
              case t.UNMOUNT:
              case t.EXEC:
              case t.FFPROBE:
              case t.WRITE_FILE:
              case t.READ_FILE:
              case t.DELETE_FILE:
              case t.RENAME:
              case t.CREATE_DIR:
              case t.LIST_DIR:
              case t.DELETE_DIR:
                _classPrivateFieldGet(_t, _this)[e](r);
                break;
              case t.LOG:
                _classPrivateFieldGet(_r, _this).forEach(function (e) {
                  return e(r);
                });
                break;
              case t.PROGRESS:
                _classPrivateFieldGet(_a, _this).forEach(function (e) {
                  return e(r);
                });
                break;
              case t.ERROR:
                _classPrivateFieldGet(_s, _this)[e](r);
            }
            delete _classPrivateFieldGet(_t, _this)[e], delete _classPrivateFieldGet(_s, _this)[e];
          });
        });
        _classPrivateFieldInitSpec(this, _i, function (_ref2) {
          var e = _ref2.type,
            t = _ref2.data;
          var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var o = arguments.length > 2 ? arguments[2] : undefined;
          return _classPrivateFieldGet(_e, _this) ? new Promise(function (a, _i3) {
            var n = r();
            _classPrivateFieldGet(_e, _this) && _classPrivateFieldGet(_e, _this).postMessage({
              id: n,
              type: e,
              data: t
            }, s), _classPrivateFieldGet(_t, _this)[n] = a, _classPrivateFieldGet(_s, _this)[n] = _i3, o === null || o === void 0 ? void 0 : o.addEventListener("abort", function () {
              _i3(new DOMException("Message # ".concat(n, " was aborted"), "AbortError"));
            }, {
              once: !0
            });
          }) : Promise.reject(a);
        });
        _defineProperty(this, "load", function () {
          var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            s = _ref3.classWorkerURL,
            r = _objectWithoutProperties(_ref3, _excluded);
          var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            a = _ref4.signal;
          return _classPrivateFieldGet(_e, _this) || (_classPrivateFieldSet(_e, _this, s ? new Worker(new URL(s, "file:///Users/focus/Projects/ffmpeg.wasm/packages/ffmpeg/dist/esm/classes.js"), {
            type: "module"
          }) : new Worker(new URL(e.p + e.u(814), e.b), {
            type: void 0
          })), _classPrivateFieldGet(_o, _this).call(_this)), _classPrivateFieldGet(_i, _this).call(_this, {
            type: t.LOAD,
            data: r
          }, void 0, a);
        });
        _defineProperty(this, "exec", function (e) {
          var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
          var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            r = _ref5.signal;
          return _classPrivateFieldGet(_i, _this).call(_this, {
            type: t.EXEC,
            data: {
              args: e,
              timeout: s
            }
          }, void 0, r);
        });
        _defineProperty(this, "ffprobe", function (e) {
          var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
          var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            r = _ref6.signal;
          return _classPrivateFieldGet(_i, _this).call(_this, {
            type: t.FFPROBE,
            data: {
              args: e,
              timeout: s
            }
          }, void 0, r);
        });
        _defineProperty(this, "terminate", function () {
          var e = Object.keys(_classPrivateFieldGet(_s, _this));
          for (var _i4 = 0, _e2 = e; _i4 < _e2.length; _i4++) {
            var _t2 = _e2[_i4];
            _classPrivateFieldGet(_s, _this)[_t2](o), delete _classPrivateFieldGet(_s, _this)[_t2], delete _classPrivateFieldGet(_t, _this)[_t2];
          }
          _classPrivateFieldGet(_e, _this) && (_classPrivateFieldGet(_e, _this).terminate(), _classPrivateFieldSet(_e, _this, null), _this.loaded = !1);
        });
        _defineProperty(this, "writeFile", function (e, s) {
          var _ref7 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            r = _ref7.signal;
          var a = [];
          return s instanceof Uint8Array && a.push(s.buffer), _classPrivateFieldGet(_i, _this).call(_this, {
            type: t.WRITE_FILE,
            data: {
              path: e,
              data: s
            }
          }, a, r);
        });
        _defineProperty(this, "mount", function (e, s, r) {
          return _classPrivateFieldGet(_i, _this).call(_this, {
            type: t.MOUNT,
            data: {
              fsType: e,
              options: s,
              mountPoint: r
            }
          }, []);
        });
        _defineProperty(this, "unmount", function (e) {
          return _classPrivateFieldGet(_i, _this).call(_this, {
            type: t.UNMOUNT,
            data: {
              mountPoint: e
            }
          }, []);
        });
        _defineProperty(this, "readFile", function (e) {
          var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "binary";
          var _ref8 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            r = _ref8.signal;
          return _classPrivateFieldGet(_i, _this).call(_this, {
            type: t.READ_FILE,
            data: {
              path: e,
              encoding: s
            }
          }, void 0, r);
        });
        _defineProperty(this, "deleteFile", function (e) {
          var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            s = _ref9.signal;
          return _classPrivateFieldGet(_i, _this).call(_this, {
            type: t.DELETE_FILE,
            data: {
              path: e
            }
          }, void 0, s);
        });
        _defineProperty(this, "rename", function (e, s) {
          var _ref10 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            r = _ref10.signal;
          return _classPrivateFieldGet(_i, _this).call(_this, {
            type: t.RENAME,
            data: {
              oldPath: e,
              newPath: s
            }
          }, void 0, r);
        });
        _defineProperty(this, "createDir", function (e) {
          var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            s = _ref11.signal;
          return _classPrivateFieldGet(_i, _this).call(_this, {
            type: t.CREATE_DIR,
            data: {
              path: e
            }
          }, void 0, s);
        });
        _defineProperty(this, "listDir", function (e) {
          var _ref12 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            s = _ref12.signal;
          return _classPrivateFieldGet(_i, _this).call(_this, {
            type: t.LIST_DIR,
            data: {
              path: e
            }
          }, void 0, s);
        });
        _defineProperty(this, "deleteDir", function (e) {
          var _ref13 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            s = _ref13.signal;
          return _classPrivateFieldGet(_i, _this).call(_this, {
            type: t.DELETE_DIR,
            data: {
              path: e
            }
          }, void 0, s);
        });
      }
      return _createClass(i, [{
        key: "on",
        value: function on(e, t) {
          "log" === e ? _classPrivateFieldGet(_r, this).push(t) : "progress" === e && _classPrivateFieldGet(_a, this).push(t);
        }
      }, {
        key: "off",
        value: function off(e, t) {
          "log" === e ? _classPrivateFieldSet(_r, this, _classPrivateFieldGet(_r, this).filter(function (e) {
            return e !== t;
          })) : "progress" === e && _classPrivateFieldSet(_a, this, _classPrivateFieldGet(_a, this).filter(function (e) {
            return e !== t;
          }));
        }
      }]);
    }();
    var n;
    return function (e) {
      e.MEMFS = "MEMFS", e.NODEFS = "NODEFS", e.NODERAWFS = "NODERAWFS", e.IDBFS = "IDBFS", e.WORKERFS = "WORKERFS", e.PROXYFS = "PROXYFS";
    }(n || (n = {})), s;
  }();
});
},{}],"node_modules/@ffmpeg/util/dist/cjs/errors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_INCOMPLETED_DOWNLOAD = exports.ERROR_RESPONSE_BODY_READER = void 0;
exports.ERROR_RESPONSE_BODY_READER = new Error("failed to get response body reader");
exports.ERROR_INCOMPLETED_DOWNLOAD = new Error("failed to complete download");
},{}],"node_modules/@ffmpeg/util/dist/cjs/const.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderContentLength = void 0;
exports.HeaderContentLength = "Content-Length";
},{}],"node_modules/@ffmpeg/util/dist/cjs/index.js":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBlobURL = exports.downloadWithProgress = exports.importScript = exports.fetchFile = void 0;
var errors_js_1 = require("./errors.js");
var const_js_1 = require("./const.js");
var readFromBlobOrFile = function readFromBlobOrFile(blob) {
  return new Promise(function (resolve, reject) {
    var fileReader = new FileReader();
    fileReader.onload = function () {
      var result = fileReader.result;
      if (result instanceof ArrayBuffer) {
        resolve(new Uint8Array(result));
      } else {
        resolve(new Uint8Array());
      }
    };
    fileReader.onerror = function (event) {
      var _a, _b;
      reject(Error("File could not be read! Code=".concat(((_b = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.code) || -1)));
    };
    fileReader.readAsArrayBuffer(blob);
  });
};
/**
 * An util function to fetch data from url string, base64, URL, File or Blob format.
 *
 * Examples:
 * ```ts
 * // URL
 * await fetchFile("http://localhost:3000/video.mp4");
 * // base64
 * await fetchFile("data:<type>;base64,wL2dvYWwgbW9yZ...");
 * // URL
 * await fetchFile(new URL("video.mp4", import.meta.url));
 * // File
 * fileInput.addEventListener('change', (e) => {
 *   await fetchFile(e.target.files[0]);
 * });
 * // Blob
 * const blob = new Blob(...);
 * await fetchFile(blob);
 * ```
 */
var fetchFile = function fetchFile(file) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(typeof file === "string")) {
            _context.next = 12;
            break;
          }
          if (!/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(file)) {
            _context.next = 5;
            break;
          }
          data = atob(file.split(",")[1]).split("").map(function (c) {
            return c.charCodeAt(0);
          });
          /* From remote server/URL */
          _context.next = 10;
          break;
        case 5:
          _context.next = 7;
          return fetch(file);
        case 7:
          _context.next = 9;
          return _context.sent.arrayBuffer();
        case 9:
          data = _context.sent;
        case 10:
          _context.next = 27;
          break;
        case 12:
          if (!(file instanceof URL)) {
            _context.next = 20;
            break;
          }
          _context.next = 15;
          return fetch(file);
        case 15:
          _context.next = 17;
          return _context.sent.arrayBuffer();
        case 17:
          data = _context.sent;
          _context.next = 27;
          break;
        case 20:
          if (!(file instanceof File || file instanceof Blob)) {
            _context.next = 26;
            break;
          }
          _context.next = 23;
          return readFromBlobOrFile(file);
        case 23:
          data = _context.sent;
          _context.next = 27;
          break;
        case 26:
          return _context.abrupt("return", new Uint8Array());
        case 27:
          return _context.abrupt("return", new Uint8Array(data));
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
};
exports.fetchFile = fetchFile;
/**
 * importScript dynamically import a script, useful when you
 * want to use different versions of ffmpeg.wasm based on environment.
 *
 * Example:
 *
 * ```ts
 * await importScript("http://localhost:3000/ffmpeg.js");
 * ```
 */
var importScript = function importScript(url) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve) {
            var script = document.createElement("script");
            var _eventHandler = function eventHandler() {
              script.removeEventListener("load", _eventHandler);
              resolve();
            };
            script.src = url;
            script.type = "text/javascript";
            script.addEventListener("load", _eventHandler);
            document.getElementsByTagName("head")[0].appendChild(script);
          }));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
};
exports.importScript = importScript;
/**
 * Download content of a URL with progress.
 *
 * Progress only works when Content-Length is provided by the server.
 *
 */
var downloadWithProgress = function downloadWithProgress(url, cb) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var _a, resp, buf, total, reader, chunks, received, _yield$reader$read, done, value, delta, data, position, _i, _chunks, chunk;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return fetch(url);
        case 2:
          resp = _context3.sent;
          _context3.prev = 3;
          // Set total to -1 to indicate that there is not Content-Type Header.
          total = parseInt(resp.headers.get(const_js_1.HeaderContentLength) || "-1");
          reader = (_a = resp.body) === null || _a === void 0 ? void 0 : _a.getReader();
          if (reader) {
            _context3.next = 8;
            break;
          }
          throw errors_js_1.ERROR_RESPONSE_BODY_READER;
        case 8:
          chunks = [];
          received = 0;
        case 10:
          _context3.next = 12;
          return reader.read();
        case 12:
          _yield$reader$read = _context3.sent;
          done = _yield$reader$read.done;
          value = _yield$reader$read.value;
          delta = value ? value.length : 0;
          if (!done) {
            _context3.next = 21;
            break;
          }
          if (!(total != -1 && total !== received)) {
            _context3.next = 19;
            break;
          }
          throw errors_js_1.ERROR_INCOMPLETED_DOWNLOAD;
        case 19:
          cb && cb({
            url: url,
            total: total,
            received: received,
            delta: delta,
            done: done
          });
          return _context3.abrupt("break", 26);
        case 21:
          chunks.push(value);
          received += delta;
          cb && cb({
            url: url,
            total: total,
            received: received,
            delta: delta,
            done: done
          });
        case 24:
          _context3.next = 10;
          break;
        case 26:
          data = new Uint8Array(received);
          position = 0;
          for (_i = 0, _chunks = chunks; _i < _chunks.length; _i++) {
            chunk = _chunks[_i];
            data.set(chunk, position);
            position += chunk.length;
          }
          buf = data.buffer;
          _context3.next = 39;
          break;
        case 32:
          _context3.prev = 32;
          _context3.t0 = _context3["catch"](3);
          console.log("failed to send download progress event: ", _context3.t0);
          // Fetch arrayBuffer directly when it is not possible to get progress.
          _context3.next = 37;
          return resp.arrayBuffer();
        case 37:
          buf = _context3.sent;
          cb && cb({
            url: url,
            total: buf.byteLength,
            received: buf.byteLength,
            delta: 0,
            done: true
          });
        case 39:
          return _context3.abrupt("return", buf);
        case 40:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 32]]);
  }));
};
exports.downloadWithProgress = downloadWithProgress;
/**
 * toBlobURL fetches data from an URL and return a blob URL.
 *
 * Example:
 *
 * ```ts
 * await toBlobURL("http://localhost:3000/ffmpeg.js", "text/javascript");
 * ```
 */
var toBlobURL = function toBlobURL(url, mimeType) {
  var progress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var cb = arguments.length > 3 ? arguments[3] : undefined;
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var buf, blob;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!progress) {
            _context4.next = 6;
            break;
          }
          _context4.next = 3;
          return (0, exports.downloadWithProgress)(url, cb);
        case 3:
          _context4.t0 = _context4.sent;
          _context4.next = 11;
          break;
        case 6:
          _context4.next = 8;
          return fetch(url);
        case 8:
          _context4.next = 10;
          return _context4.sent.arrayBuffer();
        case 10:
          _context4.t0 = _context4.sent;
        case 11:
          buf = _context4.t0;
          blob = new Blob([buf], {
            type: mimeType
          });
          return _context4.abrupt("return", URL.createObjectURL(blob));
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
};
exports.toBlobURL = toBlobURL;
},{"./errors.js":"node_modules/@ffmpeg/util/dist/cjs/errors.js","./const.js":"node_modules/@ffmpeg/util/dist/cjs/const.js"}],"script.js":[function(require,module,exports) {
"use strict";

var _ffmpeg = require("@ffmpeg/ffmpeg");
var _util = require("@ffmpeg/util");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // From the actual documentation
ffmpeg = new _ffmpeg.FFmpeg();
//ffmpeg.on("log", ({ message }) => { console.log(message); }); // If ffmpeg calls its log method, log that to the console.
ffmpeg.on("progress", function (_ref) {
  var progress = _ref.progress,
    time = _ref.time;
  document.getElementById('progress').textContent = "".concat((progress * 100).toFixed(2), " %, time: ").concat((time / 1000000).toFixed(2), " s");
}); // Show progress on the page.

var transcode = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var baseURL, file, name, outputFileType, data, imgTag, sourceTag, videoTag;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          /*  const baseURL = './';
            await ffmpeg.load({
              coreURL: await toBlobURL(`${baseURL}ffmpeg-core.js`, 'text/javascript'),
              wasmURL: await toBlobURL(`${baseURL}ffmpeg-core.wasm`, 'application/wasm')
            });*/
          baseURL = 'https://unpkg.com/@ffmpeg/core/dist/umd'; //const baseURL = "."
          _context.t0 = ffmpeg;
          _context.next = 4;
          return (0, _util.toBlobURL)("".concat(baseURL, "/ffmpeg-core.js"), 'text/javascript');
        case 4:
          _context.t1 = _context.sent;
          _context.next = 7;
          return (0, _util.toBlobURL)("".concat(baseURL, "/ffmpeg-core.wasm"), 'application/wasm');
        case 7:
          _context.t2 = _context.sent;
          _context.t3 = {
            coreURL: _context.t1,
            wasmURL: _context.t2
          };
          _context.next = 11;
          return _context.t0.load.call(_context.t0, _context.t3);
        case 11:
          _context.next = 13;
          return document.getElementById("fileInput").files[0];
        case 13:
          file = _context.sent;
          if (file) {
            _context.next = 16;
            break;
          }
          return _context.abrupt("return");
        case 16:
          name = file.name;
          outputFileType = document.getElementById('outputType').value;
          document.getElementById('output').firstChild.replaceWith(document.createElement('span'));
          _context.t4 = ffmpeg;
          _context.t5 = name;
          _context.next = 23;
          return (0, _util.fetchFile)(file);
        case 23:
          _context.t6 = _context.sent;
          _context.next = 26;
          return _context.t4.writeFile.call(_context.t4, _context.t5, _context.t6);
        case 26:
          document.getElementById('progress').textContent = 'Transcoding started';
          console.log("".concat(new Date().toLocaleTimeString(), " Transcoding started"));
          _context.next = 30;
          return ffmpeg.exec(['-i', name, "output.".concat(outputFileType)]);
        case 30:
          document.getElementById('progress').textContent = 'Transcoding ended';
          console.log("".concat(new Date().toLocaleTimeString(), " Transcoding ended"));
          _context.next = 34;
          return ffmpeg.readFile("output.".concat(outputFileType));
        case 34:
          data = _context.sent;
          if (outputFileType == 'gif') {
            imgTag = document.createElement('img');
            imgTag.src = URL.createObjectURL(new Blob([data.buffer], {
              type: 'image/gif'
            }));
            imgTag.classList.add('outputImg');
            document.getElementById('output').firstChild.replaceWith(imgTag);
          } else {
            sourceTag = document.createElement('source');
            sourceTag.src = URL.createObjectURL(new Blob([data.buffer], {
              type: "video/".concat(outputFileType)
            }));
            videoTag = document.createElement('video');
            videoTag.setAttribute('controls', '');
            videoTag.appendChild(sourceTag);
            videoTag.classList.add('outputVideo');
            document.getElementById('output').firstChild.replaceWith(videoTag);
          }
        case 36:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function transcode() {
    return _ref2.apply(this, arguments);
  };
}();
function createFileFromUrl(_x, _x2, _x3) {
  return _createFileFromUrl.apply(this, arguments);
} // For testing only - useful if I want to have a default video so I don't have to select one every time.
function _createFileFromUrl() {
  _createFileFromUrl = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(url, filename, mimeType) {
    var response, blob;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return fetch(url);
        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return response.blob();
        case 6:
          blob = _context3.sent;
          return _context3.abrupt("return", new File([blob], filename, {
            type: mimeType
          }));
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error("Error fetching or creating file:", _context3.t0);
          return _context3.abrupt("return", null);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return _createFileFromUrl.apply(this, arguments);
}
function processFetchedFile() {
  return _processFetchedFile.apply(this, arguments);
}
function _processFetchedFile() {
  _processFetchedFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var fileUrl, fileName, fileMimeType, myFile;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          fileUrl = "./thanks-i-hate-it.mp4";
          fileName = "thanks-i-hate-it.mp4";
          fileMimeType = "video/mp4";
          _context4.next = 5;
          return createFileFromUrl(fileUrl, fileName, fileMimeType);
        case 5:
          myFile = _context4.sent;
          return _context4.abrupt("return", myFile);
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _processFetchedFile.apply(this, arguments);
}
var handleInput = function handleInput() {
  var file = document.getElementById('fileInput').files[0];
  document.getElementById('output').firstChild.replaceWith(document.createElement('span'));
  if (file.type == 'image/gif') {
    var imgTag = document.createElement('img');
    imgTag.src = URL.createObjectURL(file);
    imgTag.classList.add('inputImg');
    document.getElementById('originalFile').firstChild.replaceWith(imgTag);
  } else {
    var sourceTag = document.createElement('source');
    sourceTag.src = URL.createObjectURL(file);
    var videoTag = document.createElement('video');
    videoTag.setAttribute('controls', '');
    videoTag.appendChild(sourceTag);
    videoTag.classList.add('inputVideo');
    document.getElementById('originalFile').firstChild.replaceWith(videoTag);
  }
};
document.addEventListener('DOMContentLoaded', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        document.getElementById('startTranscode').addEventListener('click', transcode);
        document.getElementById('chooseFile').addEventListener('click', function () {
          document.getElementById('fileInput').click();
        });
        document.getElementById('fileInput').addEventListener('change', handleInput);
      case 3:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
},{"@ffmpeg/ffmpeg":"node_modules/@ffmpeg/ffmpeg/dist/umd/ffmpeg.js","@ffmpeg/util":"node_modules/@ffmpeg/util/dist/cjs/index.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52815" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=script.75da7f30.js.map