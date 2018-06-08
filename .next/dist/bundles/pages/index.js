module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__knex__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__knex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__knex__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }



var PER_PAGE = 100;

var _default =
/*#__PURE__*/
function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "handleCategoryChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        window.location.href = e.target.value ? "/?category=".concat(e.target.value) : '/';
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "pageHrefBuilder", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(page) {
        var category = _this.props.category;
        var query = [category && "category=".concat(encodeURIComponent(category)), page && "page=".concat(page)].filter(function (p) {
          return p;
        }).join('&');
        return query ? "/?".concat(query) : '/';
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "pageNextHref", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.pageHrefBuilder(_this.props.page + 1);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "pagePrevHref", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.pageHrefBuilder(_this.props.page > 2 && _this.props.page - 1);
      }
    }), _temp));
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", null, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        className: "grid-x padding-1 align-justify align-middle"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", null, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h1", {
        className: "margin-0 h2"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        href: "/"
      }, "Podcasts")), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h2", {
        className: "h5"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("small", null, this.props.podcastsCnt.toLocaleString(), " in database"))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", null, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("select", {
        name: "category",
        onChange: this.handleCategoryChange,
        value: encodeURIComponent(this.props.category)
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("option", {
        value: ""
      }), this.props.categories.map(function (c) {
        return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("option", {
          key: c,
          value: encodeURIComponent(c)
        }, c);
      })))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("table", null, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("thead", null, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("tr", null, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("th", null, "Name"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("th", {
        className: "text-center"
      }, "Category"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("th", {
        className: "text-center"
      }, "Avg"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("th", {
        className: "text-center"
      }, "Num"))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("tbody", null, this.props.podcasts.map(function (podcast) {
        return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("tr", {
          key: podcast.id
        }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("td", null, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
          href: podcast.url
        }, podcast.title)), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("td", {
          className: "text-center"
        }, podcast.category), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("td", {
          className: "text-center"
        }, podcast.reviewsAvg && podcast.reviewsAvg.toFixed(2)), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("td", {
          className: "text-center"
        }, podcast.reviewsCnt && podcast.reviewsCnt.toLocaleString()));
      }))), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        className: "grid-x align-center"
      }, this.props.page > 1 && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        className: "padding-1",
        href: this.pagePrevHref()
      }, "Prev"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a", {
        className: "padding-1",
        href: this.pageNextHref()
      }, "Next")));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(_ref2) {
        var query, category, page, podcasts, podcastsCnt, categories;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = _ref2.query;
                category = query.category;
                page = parseInt(query.page || '1', 10);
                _context.next = 5;
                return __WEBPACK_IMPORTED_MODULE_2__knex___default()('podcasts').orderBy('reviewsCnt', 'desc').where(category ? {
                  category: category
                } : {}).limit(PER_PAGE).offset((page - 1) * PER_PAGE);

              case 5:
                podcasts = _context.sent;
                _context.next = 8;
                return __WEBPACK_IMPORTED_MODULE_2__knex___default()('podcasts').count('* as cnt');

              case 8:
                podcastsCnt = _context.sent[0].cnt;
                _context.next = 11;
                return __WEBPACK_IMPORTED_MODULE_2__knex___default()('podcasts').distinct('category');

              case 11:
                _context.t0 = function (c) {
                  return c.category;
                };

                categories = _context.sent.map(_context.t0);
                return _context.abrupt("return", {
                  category: category,
                  categories: categories,
                  page: page,
                  podcasts: podcasts,
                  podcastsCnt: podcastsCnt
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      };
    }()
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Knex = __webpack_require__(8);

var knexfile = __webpack_require__(9);

module.exports = new Knex(knexfile);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("knex");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

try {
  __webpack_require__(10).config();
} catch (e) {
  console.log('dotenv not found, .env file ignored.');
}

module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.RDS_HOSTNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    database: process.env.RDS_DB_NAME
  },
  debug: false
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })
/******/ ]);