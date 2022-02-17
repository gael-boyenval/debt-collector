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
})({"../lib/getFilesList.ts":[function(require,module,exports) {
"use strict";

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

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var glob_1 = __importDefault(require("glob"));

var simple_git_1 = __importDefault(require("simple-git"));

var path_1 = __importDefault(require("path"));

var minimatch_1 = __importDefault(require("minimatch"));

var gitOptions = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6
};

var getFileList = function (config, compare, globOption) {
  return __awaiter(void 0, void 0, void 0, function () {
    var globFilter;
    return __generator(this, function (_a) {
      globFilter = globOption ? globOption : config.collectFrom;

      if (compare) {
        return [2
        /*return*/
        , new Promise(function (resolve, reject) {
          return __awaiter(void 0, void 0, void 0, function () {
            var git, rootGitDir, results, currentGitDir, filesAndStatuses, files;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  git = (0, simple_git_1.default)(gitOptions);
                  return [4
                  /*yield*/
                  , git.revparse(['--show-toplevel'])];

                case 1:
                  rootGitDir = _a.sent();
                  return [4
                  /*yield*/
                  , git.diff([compare, '--name-status'])];

                case 2:
                  results = _a.sent();
                  currentGitDir = path_1.default.relative(rootGitDir, process.cwd());
                  filesAndStatuses = results.replace(/\t/g, '|').split('\n').filter(function (item) {
                    return item !== '';
                  }).map(function (item) {
                    var _a = __read(item.split('|'), 2),
                        status = _a[0],
                        filePath = _a[1];

                    return {
                      status: status,
                      filePath: path_1.default.relative(currentGitDir, filePath)
                    };
                  });
                  files = filesAndStatuses.filter(function (file) {
                    return (0, minimatch_1.default)(file.filePath, globFilter.replace('./', ''));
                  }).map(function (item) {
                    return item.filePath;
                  });
                  resolve(files);
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        })];
      }

      return [2
      /*return*/
      , new Promise(function (resolve, reject) {
        (0, glob_1.default)(globFilter, {}, function (err, files) {
          if (err) reject(err);
          var filteredFiles = files.map(function (file) {
            return file.replace('./', '');
          }).filter(function (file) {
            return file.includes('.');
          });
          resolve(filteredFiles);
        });
      })];
    });
  });
};

exports.default = getFileList;
},{}],"../lib/filterRules.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filtersRulesFromOptions = exports.getRulesForFile = void 0;

var minimatch_1 = __importDefault(require("minimatch"));

var doesMatchPath = function (_a, file) {
  var _b = _a.matchGlob,
      matchGlob = _b === void 0 ? '**/*' : _b;

  if (typeof matchGlob === 'string') {
    return (0, minimatch_1.default)(file.replace('./', ''), matchGlob.replace('./', ''));
  }

  if (Array.isArray(matchGlob)) {
    return matchGlob.filter(function (glob) {
      return (0, minimatch_1.default)(file.replace('./', ''), glob.replace('./', ''));
    }).length > 0;
  }
};

var getRulesForFile = function (options, filePath) {
  var fileRules = options.fileRules.filter(function (rule) {
    return doesMatchPath(rule, filePath);
  });
  var eslintRules = options.eslintRules.filter(function (rule) {
    return doesMatchPath(rule, filePath);
  });
  return {
    fileRules: fileRules,
    eslintRules: eslintRules
  };
};

exports.getRulesForFile = getRulesForFile;

var getRules = function (rules, ruleId, tags) {
  return rules.filter(function (rule) {
    return ruleId ? ruleId === rule.id : true;
  }).filter(function (rule) {
    return tags && tags.length > 0 ? tags.some(function (tag) {
      return rule.tags.includes(tag);
    }) : true;
  });
};

var filtersRulesFromOptions = function (options, ruleId, tags) {
  if (ruleId === void 0) {
    ruleId = null;
  }

  if (tags === void 0) {
    tags = null;
  }

  var fileRules = options.fileRules;
  var eslintRules = options.eslintRules;
  var cleanTag = tags && tags.filter(function (tag) {
    return !!tag;
  });

  if (ruleId || (cleanTag === null || cleanTag === void 0 ? void 0 : cleanTag.length)) {
    fileRules = getRules(options.fileRules, ruleId, cleanTag);
    eslintRules = getRules(options.eslintRules, ruleId, cleanTag);
  }

  return {
    fileRules: fileRules,
    eslintRules: eslintRules
  };
};

exports.filtersRulesFromOptions = filtersRulesFromOptions;
},{}],"../lib/getfileRulesErrors.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var escape_string_regexp_node_1 = __importDefault(require("escape-string-regexp-node"));

var getFileRulesErrors = function (config, file, data) {
  var directoryDepth = file.replace('./').split('/');
  directoryDepth.splice(-1);

  var isImportingFrom = function (str) {
    var regexp = new RegExp((0, escape_string_regexp_node_1.default)("from '".concat(str)), 'g');
    var res = data.matchAll(regexp);
    var resArr = Array.from(res, function (m) {
      return m[0];
    });
    return resArr.length;
  };

  var find = function (str) {
    var regexp = new RegExp((0, escape_string_regexp_node_1.default)(str), 'g');
    var res = data.matchAll(regexp);
    var resArr = Array.from(res, function (m) {
      return m[0];
    });
    return resArr.length;
  };

  var utils = {
    directoryDepth: directoryDepth.length,
    content: data,
    file: file,
    isImportingFrom: isImportingFrom,
    find: find
  };
  return config.fileRules.reduce(function (acc, rule) {
    var nbErrors = rule.matchRule(__assign({}, utils));

    if (nbErrors > 0) {
      return __spreadArray(__spreadArray([], __read(acc), false), [{
        resultId: rule.id,
        occurences: nbErrors
      }], false);
    } else {
      return acc;
    }
  }, []);
};

exports.default = getFileRulesErrors;
},{}],"../lib/getEslintRulesErrors.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

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

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var getEslintRulesErrors = function (config, file, data, eslint) {
  return __awaiter(void 0, void 0, void 0, function () {
    var results, err_1, errors, containRuleIdMessage, containMessageFromPlugin, utils;

    var _a;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2,, 3]);

          return [4
          /*yield*/
          , eslint.lintText(data, {
            warnIgnored: true
          })];

        case 1:
          results = _b.sent();
          return [3
          /*break*/
          , 3];

        case 2:
          err_1 = _b.sent();
          results = [];
          return [3
          /*break*/
          , 3];

        case 3:
          errors = (_a = results[0]) === null || _a === void 0 ? void 0 : _a.messages;

          containRuleIdMessage = function (ruleId) {
            var _a;

            return (_a = errors === null || errors === void 0 ? void 0 : errors.filter(function (err) {
              return err.ruleId === ruleId;
            }).length) !== null && _a !== void 0 ? _a : 0;
          };

          containMessageFromPlugin = function (ruleId) {
            if (errors.length > 0) {
              var nonNullError = errors.filter(function (err) {
                return err !== null && err.ruleId !== null;
              }).filter(function (err) {
                return err.ruleId.startsWith(ruleId);
              });
              return nonNullError.length;
            }

            return 0;
          };

          utils = {
            containRuleIdMessage: containRuleIdMessage,
            containMessageFromPlugin: containMessageFromPlugin,
            results: results[0],
            file: file
          };
          return [2
          /*return*/
          , config.eslintRules.reduce(function (acc, rule) {
            var nbErrors = rule.matchESLintRule(__assign({}, utils));
            return nbErrors > 0 ? __spreadArray(__spreadArray([], __read(acc), false), [{
              resultId: rule.id,
              occurences: nbErrors
            }], false) : acc;
          }, [])];
      }
    });
  });
};

exports.default = getEslintRulesErrors;
},{}],"../lib/getFileResult.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

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

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var filterRules_1 = require("./filterRules");

var getfileRulesErrors_1 = __importDefault(require("./getfileRulesErrors"));

var getEslintRulesErrors_1 = __importDefault(require("./getEslintRulesErrors"));

var fs = require("fs");

var updateResults = function (config, fileErrors, fileResults, ruleName) {
  var updatedFileResults = __assign({}, fileResults);

  if (fileErrors.length > 0) {
    fileErrors.forEach(function (_a) {
      var resultId = _a.resultId,
          occurences = _a.occurences;
      var rule = config[ruleName].find(function (_a) {
        var id = _a.id;
        return resultId === id;
      });
      updatedFileResults.rules.push(__assign(__assign({}, rule), {
        occurences: occurences
      }));
      updatedFileResults.totalScore += rule.debtScore * occurences;
    });
  }

  return updatedFileResults;
};

var runFileChecks = function (config, file, eslint) {
  return __awaiter(void 0, void 0, void 0, function () {
    var fileResults, data, fileRulesResults, eslintResults;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          fileResults = {
            file: file,
            rules: [],
            totalScore: 0
          };

          if (config.eslintRules.length === 0 && config.fileRules.length === 0) {
            return [2
            /*return*/
            , fileResults];
          }

          try {
            data = fs.readFileSync(file).toString();
          } catch (error) {
            data = '';
          }

          fileRulesResults = (0, getfileRulesErrors_1.default)(config, file, data);
          fileResults = updateResults(config, fileRulesResults, fileResults, "fileRules");
          return [4
          /*yield*/
          , (0, getEslintRulesErrors_1.default)(config, file, data, eslint)];

        case 1:
          eslintResults = _a.sent();
          fileResults = updateResults(config, eslintResults, fileResults, "eslintRules");
          return [2
          /*return*/
          , fileResults];
      }
    });
  });
};

var getFileResult = function (config, file, incrementCounter, eslint) {
  return __awaiter(void 0, void 0, void 0, function () {
    var rulesForFile, fileResult;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          rulesForFile = (0, filterRules_1.getRulesForFile)(config, file);
          return [4
          /*yield*/
          , runFileChecks(__assign(__assign({}, config), rulesForFile), file, eslint)];

        case 1:
          fileResult = _a.sent();
          incrementCounter();
          return [2
          /*return*/
          , fileResult];
      }
    });
  });
};

exports.default = getFileResult;
},{"./filterRules":"../lib/filterRules.ts","./getfileRulesErrors":"../lib/getfileRulesErrors.ts","./getEslintRulesErrors":"../lib/getEslintRulesErrors.ts"}],"../lib/checkFileList.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

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

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var eslint_1 = require("eslint");

var getFileResult_1 = __importDefault(require("../lib/getFileResult"));

var filterRules_1 = require("../lib/filterRules");

exports.default = function (fileList, config, rule, tags, increment) {
  return __awaiter(void 0, void 0, void 0, function () {
    var filteredRules, fileListConfig, eslint, getFilesResults, results;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          filteredRules = (0, filterRules_1.filtersRulesFromOptions)(config, rule, tags);
          fileListConfig = __assign(__assign({}, config), filteredRules);
          eslint = new eslint_1.ESLint({
            useEslintrc: false,
            baseConfig: config.eslintConfig
          });
          getFilesResults = fileList.map(function (file) {
            return (0, getFileResult_1.default)(fileListConfig, file, increment, eslint);
          });
          return [4
          /*yield*/
          , Promise.all(__spreadArray([], __read(getFilesResults), false))];

        case 1:
          results = _a.sent();
          return [2
          /*return*/
          , results];
      }
    });
  });
};
},{"../lib/getFileResult":"../lib/getFileResult.ts","../lib/filterRules":"../lib/filterRules.ts"}],"../lib/compareHtmlReport.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createTable = function (data) {
  return "\n|File|Prev|Current|trend|\n|--|--|--|--|\n".concat(data.map(function (file) {
    return "|".concat(file.file, "|").concat(file.rev, "|").concat(file.current, "|").concat(file.trend, "|");
  }).join('\n'), "\n");
};

var compareHtmlReport = function (data) {
  return "\n## Debt collector report:\n\n".concat(data.noChangesFiles.length > 0 ? "\n<h3 color=\"#999\">Files with same debt :</h3>\n\n".concat(createTable(data.noChangesFiles), "\n") : null, "\n\n").concat(data.lessDeptFiles.length > 0 ? "\n<h3 color=\"green\">Files with less debt </h3>\n\n".concat(createTable(data.lessDeptFiles), "\n") : null, "\n\n").concat(data.moreDeptFiles.length > 0 ? "\n<h3 color=\"red\">Files with more debt </h3>\n\n".concat(createTable(data.moreDeptFiles), "\n") : null, "\n</br>\n\n##### Previous debt : ").concat(data.totalScores.rev.toString(), "\n##### Current debt : ").concat(data.totalScores.cur.toString(), "\n\n<h2 color=\"").concat(data.resultColor(data.totalScores.solde), "\">\n  Debt ").concat(data.totalScores.solde > 0 ? 'increased' : 'decreased', " by ").concat(data.totalScores.solde.toString(), " Points\n</h2>\n\n<p>To get a file by file report, please run debt-collector check --changed-since=\"[REVISION]\"</p>\n");
};

exports.default = compareHtmlReport;
},{}],"../components/Reporter.tsx":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResultsCompare = exports.ResultsNoMatchRule = exports.ResultsFileOnly = exports.Results = void 0;

var react_1 = __importStar(require("react"));

var ink_table_1 = __importDefault(require("ink-table"));

var ink_1 = require("ink");

var compareHtmlReport_1 = __importDefault(require("../lib/compareHtmlReport"));

var fs_1 = __importDefault(require("fs"));

var cachePath = "".concat(process.cwd(), "/node_modules/.cache/debt-collector");
var resultPath = "".concat(cachePath, "/report.html");

var splitStringIfTooLong = function (str, max) {
  if (str.length < max) return str;
  var charArr = str.split('');

  var strStart = __spreadArray([], __read(charArr), false).filter(function (_char, i) {
    return i >= 0 && i < max / 2;
  });

  var strEnd = __spreadArray([], __read(charArr), false).filter(function (_char, i) {
    return i > str.length - max / 2 && i < str.length;
  });

  return __spreadArray(__spreadArray(__spreadArray([], __read(strStart), false), ['....'], false), __read(strEnd), false).join('');
};

var formatResults = function (results) {
  var filteredResults = results.filter(function (result) {
    return result.totalScore > 0;
  });
  var formatedResult = filteredResults.map(function (_a) {
    var file = _a.file,
        rules = _a.rules,
        totalScore = _a.totalScore;
    return {
      file: splitStringIfTooLong(file, 80),
      totalScore: totalScore,
      rules: rules.map(function (_a) {
        var title = _a.title,
            occurences = _a.occurences,
            debtScore = _a.debtScore;
        return {
          error: title,
          nb: occurences,
          score: debtScore * occurences
        };
      })
    };
  });
  var totalDeptScore = formatedResult.reduce(function (acc, res) {
    return acc + res.totalScore;
  }, 0);
  return {
    formatedResult: formatedResult,
    totalDeptScore: totalDeptScore
  };
};

var Results = function (_a) {
  var results = _a.results,
      limitTop = _a.limitTop;

  var _b = formatResults(results),
      formatedResult = _b.formatedResult,
      totalDeptScore = _b.totalDeptScore;

  var displayResults = formatedResult;

  if (limitTop) {
    displayResults = formatedResult.sort(function (a, b) {
      return b.totalScore - a.totalScore;
    }).filter(function (_item, index) {
      return index < limitTop;
    });
  }

  return react_1.default.createElement(react_1.default.Fragment, null, displayResults.length > 0 && displayResults.map(function (result) {
    return react_1.default.createElement(ink_1.Box, {
      key: result.file,
      flexDirection: "column",
      marginTop: 1
    }, react_1.default.createElement(ink_1.Text, {
      bold: true,
      color: "red",
      underline: true
    }, result.file), react_1.default.createElement(ink_table_1.default, {
      data: result.rules
    }), react_1.default.createElement(ink_1.Text, {
      bold: true,
      color: "red"
    }, "Total Debt Score : ", result.totalScore));
  }), react_1.default.createElement(ink_1.Box, {
    marginTop: 1
  }, react_1.default.createElement(ink_1.Text, {
    bold: true,
    backgroundColor: "#880000",
    color: "white"
  }, " Debt Score : ", totalDeptScore, " / Impacted files : ", formatedResult.length)));
};

exports.Results = Results;

var ResultsFileOnly = function (_a) {
  var results = _a.results,
      limitTop = _a.limitTop;

  var _b = formatResults(results),
      formatedResult = _b.formatedResult,
      totalDeptScore = _b.totalDeptScore;

  var displayResults = formatedResult;

  if (limitTop) {
    displayResults = formatedResult.sort(function (a, b) {
      return b.totalScore - a.totalScore;
    }).filter(function (_item, index) {
      return index < limitTop;
    });
  }

  return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(ink_1.Box, {
    marginTop: 1
  }), formatedResult.length > 0 && react_1.default.createElement(ink_table_1.default, {
    data: displayResults.map(function (_a) {
      var file = _a.file,
          totalScore = _a.totalScore;
      return {
        file: file,
        score: totalScore
      };
    })
  }), react_1.default.createElement(ink_1.Box, {
    marginTop: 1
  }, react_1.default.createElement(ink_1.Text, {
    bold: true,
    backgroundColor: "#880000",
    color: "white"
  }, " Debt Score : ", totalDeptScore, " / Impacted files : ", formatedResult.length, " ")));
};

exports.ResultsFileOnly = ResultsFileOnly;

var filterNoMatch = function (results, initialConfig) {
  var allRules = __spreadArray(__spreadArray([], __read(initialConfig.fileRules.map(function (_a) {
    var id = _a.id,
        title = _a.title;
    return {
      id: id,
      title: title
    };
  })), false), __read(initialConfig.eslintRules.map(function (_a) {
    var id = _a.id,
        title = _a.title;
    return {
      id: id,
      title: title
    };
  })), false);

  var allFilesRules = [].concat.apply([], results.map(function (file) {
    return file.rules.map(function (_a) {
      var id = _a.id;
      return id;
    });
  }));
  var existingRules = Array.from(new Set(__spreadArray([], __read(allFilesRules), false)));
  var filteredRules = allRules.filter(function (_a) {
    var id = _a.id;
    return !existingRules.includes(id);
  });
  return {
    notMatchRules: filteredRules,
    rulesCount: allRules.length,
    existingRulesCount: existingRules.length
  };
};

var ResultsNoMatchRule = function (_a) {
  var results = _a.results,
      initialConfig = _a.initialConfig;

  var _b = filterNoMatch(results, initialConfig),
      notMatchRules = _b.notMatchRules,
      rulesCount = _b.rulesCount;

  return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(ink_1.Box, {
    marginTop: 1
  }), notMatchRules.length > 0 && react_1.default.createElement(ink_table_1.default, {
    data: notMatchRules
  }), react_1.default.createElement(ink_1.Box, {
    marginTop: 1
  }, react_1.default.createElement(ink_1.Text, {
    bold: true,
    backgroundColor: "#880000",
    color: "white"
  }, "Nb of rules with no match : ", notMatchRules.length, " / ", rulesCount)));
};

exports.ResultsNoMatchRule = ResultsNoMatchRule;

var ResultsCompare = function (_a) {
  var results = _a.results,
      outputHtml = _a.outputHtml;
  var tableResults = Object.keys(results).map(function (fileName) {
    var result = results[fileName];
    return {
      file: splitStringIfTooLong(fileName, 60),
      rev: result.rev,
      current: result.current,
      trend: result.tendency
    };
  }).filter(function (file) {
    return file.rev !== 0 && file.current !== 0;
  });
  var totalScores = tableResults.reduce(function (acc, res) {
    var revScore = res.rev + acc.rev;
    var currentScore = res.current + acc.cur;
    return {
      rev: revScore,
      cur: currentScore,
      solde: currentScore - revScore
    };
  }, {
    rev: 0,
    cur: 0,
    solde: 0
  });
  var noChangesFiles = tableResults.filter(function (item) {
    return item.trend === 0;
  }).map(function (file) {
    return __assign(__assign({}, file), {
      trend: '='
    });
  });
  var moreDeptFiles = tableResults.filter(function (item) {
    return item.trend > 0;
  }).map(function (file) {
    return __assign(__assign({}, file), {
      trend: "\u25B2 ".concat(file.trend)
    });
  });
  var lessDeptFiles = tableResults.filter(function (item) {
    return item.trend < 0;
  }).map(function (file) {
    return __assign(__assign({}, file), {
      trend: "\u25BC ".concat(file.trend)
    });
  });

  var resultColor = function (nb) {
    if (nb > 0) return 'red';
    if (nb < 0) return 'green';
    return 'grey';
  };

  (0, react_1.useEffect)(function () {
    if (outputHtml) {
      setTimeout(function () {
        var html = (0, compareHtmlReport_1.default)({
          noChangesFiles: noChangesFiles,
          moreDeptFiles: moreDeptFiles,
          lessDeptFiles: lessDeptFiles,
          resultColor: resultColor,
          totalScores: totalScores
        });
        fs_1.default.mkdir(cachePath, {
          recursive: true
        }, function (err) {
          if (err) throw err;
          fs_1.default.writeFileSync(resultPath, html);
        });
      }, 1000);
    }
  }, []);
  return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(ink_1.Box, {
    marginTop: 1
  }), noChangesFiles.length > 0 && react_1.default.createElement(ink_1.Box, {
    marginTop: 1,
    flexDirection: "column"
  }, react_1.default.createElement(ink_1.Text, {
    underline: true,
    bold: true,
    color: "grey"
  }, "Files with no changes in debt score"), react_1.default.createElement(ink_table_1.default, {
    data: noChangesFiles
  })), lessDeptFiles.length > 0 && react_1.default.createElement(ink_1.Box, {
    marginTop: 1,
    flexDirection: "column"
  }, react_1.default.createElement(ink_1.Text, {
    underline: true,
    bold: true,
    color: "green"
  }, "Files with less debt"), react_1.default.createElement(ink_table_1.default, {
    data: lessDeptFiles
  })), moreDeptFiles.length > 0 && react_1.default.createElement(ink_1.Box, {
    marginTop: 1,
    flexDirection: "column"
  }, react_1.default.createElement(ink_1.Text, {
    underline: true,
    bold: true,
    color: "red"
  }, "Files with more debt"), react_1.default.createElement(ink_table_1.default, {
    data: moreDeptFiles
  })), react_1.default.createElement(ink_1.Box, {
    marginTop: 1
  }, react_1.default.createElement(ink_1.Box, {
    paddingLeft: 1,
    paddingRight: 1,
    borderStyle: "round",
    flexDirection: "column"
  }, react_1.default.createElement(ink_1.Text, null, "REVISION :", ' ', react_1.default.createElement(ink_1.Text, null, totalScores.rev.toString()))), react_1.default.createElement(ink_1.Box, {
    paddingLeft: 1,
    paddingRight: 1,
    borderStyle: "round",
    flexDirection: "column"
  }, react_1.default.createElement(ink_1.Text, null, "CURRENT :", ' ', react_1.default.createElement(ink_1.Text, null, totalScores.cur.toString()))), react_1.default.createElement(ink_1.Box, {
    paddingLeft: 1,
    paddingRight: 1,
    borderStyle: "round",
    flexDirection: "column"
  }, react_1.default.createElement(ink_1.Text, {
    bold: true,
    color: resultColor(totalScores.solde),
    dimmed: true
  }, "DIFF : ", totalScores.solde.toString()))));
};

exports.ResultsCompare = ResultsCompare;
},{"../lib/compareHtmlReport":"../lib/compareHtmlReport.ts"}],"../lib/utils.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigPath = void 0;

var path_1 = __importDefault(require("path"));

var getConfigPath = function (config) {
  return config ? path_1.default.relative(process.cwd(), config) : path_1.default.relative(process.cwd(), './debt-collector.config.js');
};

exports.getConfigPath = getConfigPath;
},{}],"../lib/validateConfig.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

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

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var path_1 = __importDefault(require("path"));

var defaultFileRuleConfig = {
  matchGlob: "**/*",
  matchRule: function () {
    return 1;
  }
};
var defaultEslintRuleConfig = {
  matchGlob: "**/*"
};

var validateConfig = function (configPath) {
  return __awaiter(void 0, void 0, void 0, function () {
    var config, e_1, returnValues, hasCollectFromKey, hasFileRules, hasEslintRules, hasEslintConfigPath, hasSomeRules, hasEslintRulesAndPathToConfig, fileRules, eslintRules;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2,, 3]);

          return [4
          /*yield*/
          , Promise.resolve().then(function () {
            return __importStar(require("".concat(process.cwd(), "/").concat(configPath)));
          })];

        case 1:
          config = _a.sent();
          return [3
          /*break*/
          , 3];

        case 2:
          e_1 = _a.sent();
          return [2
          /*return*/
          , {
            isConfigValid: false,
            verifiedConfig: {},
            eslintConfig: null,
            configErrors: ["Impossible to load a valid config file at ".concat(configPath, ", create a config file or provide a path to a valid config using the \"--config\" flag")]
          }];

        case 3:
          returnValues = {
            isConfigValid: true,
            verifiedConfig: config.default,
            defaultConfig: config.default,
            eslintConfig: null,
            configErrors: []
          };
          hasCollectFromKey = !!config.collectFrom;
          hasFileRules = !!config.fileRules;
          hasEslintRules = !!config.eslintRules;
          hasEslintConfigPath = !!config.eslintConfigPath;
          hasSomeRules = hasFileRules || hasEslintRules;
          hasEslintRulesAndPathToConfig = hasEslintRules && hasEslintConfigPath;

          if (!hasCollectFromKey || !hasSomeRules || !hasEslintRulesAndPathToConfig) {
            returnValues.isConfigValid = false;

            if (!hasCollectFromKey) {
              returnValues.configErrors.push('Provide a "collectFrom" key with a glob pattern in your configuration ex: "./**/*"');
            }

            if (!hasSomeRules) {
              returnValues.configErrors.push('Your config does not have any rules, please create "fileRules" or/and "eslintRules"');
            }

            if (!hasEslintRulesAndPathToConfig) {
              returnValues.configErrors.push('You provided "eslintRules" but no path to an eslint config file');
            }
          }

          fileRules = config.fileRules.map(function (rule) {
            return __assign(__assign({}, defaultFileRuleConfig), rule);
          });
          eslintRules = config.eslintRules.map(function (rule) {
            return __assign(__assign({}, defaultEslintRuleConfig), rule);
          }); // TODO : validate individual rules

          if (hasEslintConfigPath) {
            try {
              returnValues.verifiedConfig.eslintConfig = require(path_1.default.resolve(process.cwd(), config.default.eslintConfigPath));
            } catch (e) {
              return [2
              /*return*/
              , {
                isConfigValid: false,
                verifiedConfig: {},
                eslintConfig: null,
                configErrors: ["Impossible to load the eslint config file"]
              }];
            }
          }

          return [2
          /*return*/
          , __assign(__assign({}, returnValues), {
            verifiedConfig: __assign(__assign({}, returnValues.verifiedConfig), {
              eslintRules: eslintRules,
              fileRules: fileRules
            })
          })];
      }
    });
  });
};

exports.default = validateConfig;
},{}],"../lib/useValidatedConfig.ts":[function(require,module,exports) {
"use strict";

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

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var react_1 = require("react");

var utils_1 = require("./utils");

var validateConfig_1 = __importDefault(require("./validateConfig"));

var useValidatedConfig = function (config) {
  var _a = __read((0, react_1.useState)(null), 2),
      isConfigValidated = _a[0],
      setIsConfigValidated = _a[1];

  var _b = __read((0, react_1.useState)(null), 2),
      updatedConfig = _b[0],
      setUpdatedConfig = _b[1];

  var _c = __read((0, react_1.useState)(null), 2),
      configErrors = _c[0],
      setConfigErrors = _c[1];

  var _d = __read((0, react_1.useState)(null), 2),
      defaultConfig = _d[0],
      setDefaultConfig = _d[1];

  (0, react_1.useEffect)(function () {
    (function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var configPath, _a, isConfigValid, verifiedConfig, configErrors, defaultConfig;

        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              configPath = (0, utils_1.getConfigPath)(config);
              return [4
              /*yield*/
              , (0, validateConfig_1.default)(configPath)];

            case 1:
              _a = _b.sent(), isConfigValid = _a.isConfigValid, verifiedConfig = _a.verifiedConfig, configErrors = _a.configErrors, defaultConfig = _a.defaultConfig;
              setDefaultConfig(defaultConfig);
              setUpdatedConfig(verifiedConfig);
              setIsConfigValidated(isConfigValid);
              setConfigErrors(configErrors);
              return [2
              /*return*/
              ];
          }
        });
      });
    })();
  }, []);
  return {
    isConfigValidated: isConfigValidated,
    updatedConfig: updatedConfig,
    configErrors: configErrors,
    defaultConfig: defaultConfig
  };
};

exports.default = useValidatedConfig;
},{"./utils":"../lib/utils.ts","./validateConfig":"../lib/validateConfig.ts"}],"check/index.tsx":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

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

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var react_1 = __importStar(require("react"));

var prop_types_1 = __importDefault(require("prop-types"));

var ink_1 = require("ink");

var ink_task_list_1 = require("ink-task-list");

var getFilesList_1 = __importDefault(require("../../lib/getFilesList"));

var checkFileList_1 = __importDefault(require("../../lib/checkFileList"));

var Reporter_1 = require("../../components/Reporter");

var useValidatedConfig_1 = __importDefault(require("../../lib/useValidatedConfig"));

var All = function (_a) {
  var _b = _a.rule,
      rule = _b === void 0 ? null : _b,
      _c = _a.tags,
      tags = _c === void 0 ? null : _c,
      _d = _a.config,
      config = _d === void 0 ? null : _d,
      _e = _a.collectFrom,
      collectFrom = _e === void 0 ? null : _e,
      _f = _a.reportFormat,
      reportFormat = _f === void 0 ? 'standard' : _f,
      _g = _a.changedSince,
      changedSince = _g === void 0 ? null : _g,
      _h = _a.limitTop,
      limitTop = _h === void 0 ? null : _h;

  var _j = __read((0, react_1.useState)(null), 2),
      results = _j[0],
      setResults = _j[1];

  var _k = __read((0, react_1.useState)(null), 2),
      fileList = _k[0],
      setFileList = _k[1];

  var _l = __read((0, react_1.useState)(0), 2),
      checkedFileCount = _l[0],
      setCheckedFileCount = _l[1];

  var _m = (0, useValidatedConfig_1.default)(config),
      isConfigValidated = _m.isConfigValidated,
      updatedConfig = _m.updatedConfig,
      configErrors = _m.configErrors;

  var cleanTags = tags === null || tags === void 0 ? void 0 : tags.filter(function (tag) {
    return tag !== undefined;
  });
  (0, react_1.useEffect)(function () {
    (function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!isConfigValidated) return [3
              /*break*/
              , 2];
              return [4
              /*yield*/
              , (0, getFilesList_1.default)(updatedConfig, changedSince, collectFrom)];

            case 1:
              result = _a.sent();
              setFileList(result);
              _a.label = 2;

            case 2:
              return [2
              /*return*/
              ];
          }
        });
      });
    })();
  }, [isConfigValidated]);
  (0, react_1.useEffect)(function () {
    (function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var increment, results_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(fileList !== null)) return [3
              /*break*/
              , 2];

              increment = function () {
                return setCheckedFileCount(function (prevCount) {
                  return prevCount += 1;
                });
              };

              return [4
              /*yield*/
              , (0, checkFileList_1.default)(fileList, updatedConfig, rule, tags, increment)];

            case 1:
              results_1 = _a.sent();
              setResults(results_1);
              _a.label = 2;

            case 2:
              return [2
              /*return*/
              ];
          }
        });
      });
    })();
  }, [fileList]);
  var collectingFrom = "Collecting debt from ".concat(changedSince ? "files changed since ".concat(changedSince) : collectFrom ? collectFrom : 'all files');
  var hasFilters = cleanTags.length || rule;
  var tagFilters = cleanTags.length > 0 && " [tags : ".concat(cleanTags, "]");
  var and = cleanTags.length > 0 && rule ? ' &' : '';
  var ruleFilter = rule ? " [rule id : ".concat(rule, "]") : '';
  var withFilters = "With rules filters on ".concat(tagFilters).concat(and).concat(ruleFilter);
  return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(ink_task_list_1.TaskList, null, react_1.default.createElement(ink_task_list_1.Task, {
    state: isConfigValidated === null ? 'loading' : isConfigValidated ? 'success' : 'error',
    label: "validating configuration",
    status: isConfigValidated === null ? 'checking configuration' : isConfigValidated ? 'success' : 'error'
  }), react_1.default.createElement(ink_task_list_1.Task, {
    state: fileList === null ? 'loading' : 'success',
    label: "defining file to check",
    status: fileList === null ? null : "".concat(fileList.length, " files")
  }), react_1.default.createElement(ink_task_list_1.Task, {
    state: results === null ? 'loading' : 'success',
    label: "checking files",
    status: "".concat(checkedFileCount, "/").concat(fileList === null ? '?' : fileList.length, " files")
  })), isConfigValidated === false && (configErrors === null || configErrors === void 0 ? void 0 : configErrors.length) > 0 && configErrors.map(function (error, i) {
    return react_1.default.createElement(ink_1.Text, {
      key: i,
      color: "red"
    }, error);
  }), results !== null && reportFormat === 'standard' && react_1.default.createElement(Reporter_1.Results, {
    results: results,
    limitTop: limitTop
  }), results !== null && reportFormat === 'filesOnly' && react_1.default.createElement(Reporter_1.ResultsFileOnly, {
    results: results,
    limitTop: limitTop
  }), results !== null && reportFormat === 'noMatchRules' && react_1.default.createElement(Reporter_1.ResultsNoMatchRule, {
    results: results,
    initialConfig: updatedConfig
  }), react_1.default.createElement(ink_1.Box, {
    marginTop: 1,
    flexDirection: "column",
    border: true
  }, react_1.default.createElement(ink_1.Text, {
    color: "grey"
  }, collectingFrom), hasFilters && react_1.default.createElement(ink_1.Text, {
    color: "grey"
  }, withFilters), react_1.default.createElement(ink_1.Text, {
    color: "grey"
  }, "Reporting : ", reportFormat, " ", limitTop && "\u2022 top ".concat(limitTop, " biggest score"))));
};

All.propTypes = {
  limitTop: prop_types_1.default.number,
  collectFrom: prop_types_1.default.string,
  rule: prop_types_1.default.string,
  tags: prop_types_1.default.array,
  config: prop_types_1.default.string,
  changedSince: prop_types_1.default.string,
  reportFormat: prop_types_1.default.oneOf(['filesOnly', 'noMatchRules', 'standard'])
};
All.shortFlags = {
  rule: 'r',
  tags: 't',
  collectFrom: 'g',
  config: 'c',
  reportFormat: 'f',
  changedSince: 's'
};
exports.default = All;
},{"../../lib/getFilesList":"../lib/getFilesList.ts","../../lib/checkFileList":"../lib/checkFileList.ts","../../components/Reporter":"../components/Reporter.tsx","../../lib/useValidatedConfig":"../lib/useValidatedConfig.ts"}]},{},["check/index.tsx"], null)
//# sourceMappingURL=/check/index.js.map