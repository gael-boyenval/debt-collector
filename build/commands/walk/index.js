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

var fs = require('fs');

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
          fileResults = updateResults(config, fileRulesResults, fileResults, 'fileRules');
          return [4
          /*yield*/
          , (0, getEslintRulesErrors_1.default)(config, file, data, eslint)];

        case 1:
          eslintResults = _a.sent();
          fileResults = updateResults(config, eslintResults, fileResults, 'eslintRules');
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
},{"../lib/getFileResult":"../lib/getFileResult.ts","../lib/filterRules":"../lib/filterRules.ts"}],"../lib/utils.ts":[function(require,module,exports) {
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
  matchGlob: '**/*',
  matchRule: function () {
    return 1;
  }
};
var defaultEslintRuleConfig = {
  matchGlob: '**/*'
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
                configErrors: ['Impossible to load the eslint config file']
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
},{"./utils":"../lib/utils.ts","./validateConfig":"../lib/validateConfig.ts"}],"../lib/template.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return "\n\n<!DOCTYPE html>\n<html>\n<head>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.14.0/babel.min.js\"></script>\n    <script type=\"text/babel\" data-presets=\"es2017, stage-3\" data-plugins=\"syntax-async-functions,transform-class-properties\"></script>\n    <script src=\"https://unpkg.com/react/umd/react.production.min.js\"></script>\n    <script src=\"https://unpkg.com/react-dom/umd/react-dom.production.min.js\"></script>\n    <script src=\"https://unpkg.com/prop-types/prop-types.min.js\"></script>\n    <script src=\"https://unpkg.com/recharts/umd/Recharts.js\"></script>\n     <style type=\"text/css\">\n      body {\n        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n      }\n    </style>\n</head>\n<body>\n<div id=\"app\"></div>\n<script type=\"text/babel\">\n\nconst result = ".concat(data, "\nconst { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts\n\nconst parseDataBy = (key) => Object.keys(result.results).map((commit) => {\n  const rulesScores = Object.keys(result.results[commit]).map(rule => ({\n    [rule]: result.results[commit][rule][key]\n  })).reduce((acc, res) => ({...acc, ...res}), {})\n  \n  return {\n    commit,\n    ...rulesScores\n  }\n})\n\nfunction getRandomColor() {\n  var letters = '0123456789ABCDEF';\n  var color = '#';\n  for (var i = 0; i < 6; i++) {\n    color += letters[Math.floor(Math.random() * 16)];\n  }\n  return color;\n}\n\nfunction shadeColor(color, percent) {\n  const channel = (chan) => {\n    let colChan = parseInt(chan, 16);\n    colChan = parseInt(colChan * (100 + percent) / 100);\n    colChan = colChan < 255 ? colChan : 255;\n    colChan = colChan.toString(16).length === 1 \n      ? \"0\" + colChan.toString(16)\n      : colChan.toString(16);\n    return colChan\n  }\n\n  const RR = channel(color.substring(1,3));\n  const GG = channel(color.substring(3,5));\n  const BB = channel(color.substring(5,7));\n\n  return \"#\"+RR+GG+BB;\n}\n\nconst colors = Array(100).fill('').map(() =>  shadeColor(getRandomColor(), -20))\nconst newData = parseDataBy('score')\n\nconst baseButtonStyles = {\n  padding: 4,\n  textAlign: 'left',\n  marginBottom: 6,\n  marginRight: 6,\n  border: 'none',\n  outline: 'none', \n  fontWeight: 'bold',\n}\n\nconst rules = Object.keys(newData[0]).filter(key => key !== 'commit')\nconst rulesActives = rules.reduce((acc, rule) => {\n  acc[rule] = true\n  return acc\n}, {})\n\n const App = () => {\n   const [data, setData] = React.useState(newData)\n   const [valueType, setValueType] = React.useState('score')\n   const [activeRules, setActiveRules] = React.useState(rulesActives)\n   const [tagFilter, setTagFilter] = React.useState(null)\n   \n   const toggleRule = (id) => {\n    setTagFilter(null)\n    setActiveRules(prev => ({\n      ...prev,\n      [id]: !prev[id]\n    }))\n   }\n\n   const switchDataBy = (key) => {\n      setValueType(key)\n      setData(parseDataBy(key))\n   }\n\n   const toggleAll = () => {\n     setTagFilter(null)\n     setActiveRules(prev => {\n       const rulesKeys = Object.keys(prev)\n       const firstIsActive = !!prev[rulesKeys[0]]\n       return rulesKeys.reduce((rules, rule) => {\n         rules[rule] = !firstIsActive\n         return rules\n       }, {})\n     })\n   }\n\n   const toggleTag = (tag) => {\n     if (tagFilter === null || tagFilter !== tag) {\n       setTagFilter(tag)\n     } else {\n       setTagFilter(null)\n     }\n   }\n\n   const renderTooltip = ({label, payload}) => {\n    if (!payload.length) { return null}\n   \n     return <div style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>\n        <h2 style={{ margin: 0, marginBottom: 5}}>{label}</h2>\n        <h3 style={{ margin: 0, marginBottom: 15}}>Total {valueType} : { \n        payload.reduce((acc, cur) => {\n          acc += Number(cur.value)\n          return acc\n        }, 0)\n        } </h3>\n        {payload.reverse().map(item => (\n          <div key={item.dataKey} style={{ display: 'flex', justifyContent:'center', fontSize: 12, marginBottom: 4}}>\n            <span style={{ backgroundColor: item.color, display: 'inline-block', width: 15, height: 15, borderRadius: 3, marginRight: 7}}></span>\n            <div style={{ flex: 1, marginRight: 25}}>\n              <span>{item.name.replace(/_/g, ' ')}</span>\n            </div>\n            <span style={{ fontWeight: 'bold'}}>{item.value}</span>\n          </div>\n        ))}\n      </div>\n   }\n\n  React.useEffect(() => {\n    if (tagFilter) {\n      setActiveRules(rules => Object.keys(rules).reduce((acc, rule) => {\n        if (result.tags[tagFilter].includes(rule)) {\n          acc[rule] = true\n        } else {\n          acc[rule] = false\n        }\n        return acc\n      }, {}))\n    }\n  }, [tagFilter])\n   \n   return (\n     <div style={{display: 'flex', overflow: 'hidden', width: '100vw', height:'100vh', position:'fixed'}}>\n      <div style={{width: '80vw', height:'100vh'}}>\n        <ResponsiveContainer width=\"100%\" height=\"90%\">\n          <AreaChart\n            width={500}\n            height={400}\n            data={data}\n            margin={{\n              top: 10,\n              right: 30,\n              left: 0,\n              bottom: 0,\n            }}\n          >\n            <CartesianGrid strokeDasharray=\"3 3\" />\n            <XAxis dataKey=\"commit\" />\n            <YAxis />\n            <Tooltip\n              content={renderTooltip} \n              itemStyle={{fontSize: 10, fontWeight: 'bold', fontFamily: 'sans-serif', height: 10, padding: 3}}\n              labelStyle={{fontSize: 16, fontWeight: 'bold', fontFamily: 'sans-serif'}}\n            />\n            {Object.keys(activeRules).map((rule, index) => activeRules[rule] && \n              <Area\n                type=\"monotone\"\n                dataKey={rule}\n                stackId=\"1\"\n                stroke={colors[Object.keys(activeRules).indexOf(rule)]}\n                fill={colors[Object.keys(activeRules).indexOf(rule)]} />\n            )}\n          </AreaChart>\n        </ResponsiveContainer>\n        </div>\n        <div style={{width: '20vw', minWidth: 400, height:'100vh', overflowY: 'auto', padding: 20}}>\n          <h3>Rules</h3>\n          {Object.keys(activeRules).map(rule => \n            <button \n              key={rule}\n              onClick={() => toggleRule(rule)}\n              style={{\n                ...baseButtonStyles,\n                backgroundColor: activeRules[rule] ? 'green' : '#F5F5F5',\n                color: activeRules[rule] ? 'white' : 'grey'\n              }}\n            >\n              {rule}\n            </button>\n          )}\n          <div style={{ marginTop: 15 }}>\n            <button onClick={() => toggleAll()}>TOGGLE ALL RULES</button>\n          </div>\n          <hr />\n          <h3>Tags</h3>\n          {Object.keys(result.tags).map(tag => \n            <button \n              key={tag}\n              onClick={() => toggleTag(tag)}\n              style={{\n                ...baseButtonStyles,\n                display: 'inline-block',\n                backgroundColor: tagFilter === tag ? 'green' : '#F5F5F5',\n                color: tagFilter === tag ? 'white' : 'grey'\n              }}\n            >\n              {tag}\n            </button>\n          )}\n          <hr />\n          <h3>Display values</h3>\n          <button \n            onClick={() => switchDataBy('score')}\n            style={{\n              ...baseButtonStyles,\n              display: 'inline-block',\n              backgroundColor: valueType === 'score' ? 'green' : '#F5F5F5',\n              color: valueType === 'score' ? 'white' : 'grey'\n            }}>\n              BY SCORE\n          </button>\n          <button \n            onClick={() => switchDataBy('occurences')}\n            style={{\n              ...baseButtonStyles,\n              display: 'inline-block',\n              backgroundColor: valueType === 'occurences' ? 'green' : '#F5F5F5',\n              color: valueType === 'occurences' ? 'white' : 'grey'\n            }}>\n              BY OCCURENCES\n          </button>\n          <hr />\n        </div>\n      </div>\n    );\n}\n\nReactDOM.render(<App/>, document.getElementById('app'));\n</script>\n</body>\n</html>\n");
};
},{}],"../lib/buildWalkReport.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fs_1 = __importDefault(require("fs"));

var child_process_1 = require("child_process");

var template_1 = __importDefault(require("./template"));

var cachePath = "".concat(process.cwd(), "/node_modules/.cache/debt-collector");
var resultPath = "".concat(cachePath, "/report.html");

var buildWalkReport = function (defaultConfig, tags, results) {
  setTimeout(function () {
    // waiting for file system to correctly switch all files after checkout
    var jsonResults = JSON.stringify({
      initialConfig: defaultConfig,
      tags: tags,
      results: results
    }, null, 2);
    var data = (0, template_1.default)(jsonResults);
    fs_1.default.mkdir(cachePath, {
      recursive: true
    }, function (err) {
      if (err) throw err;
      fs_1.default.writeFileSync(resultPath, data);
      (0, child_process_1.spawn)('open', [resultPath]);
    });
  }, 330);
};

exports.default = buildWalkReport;
},{"./template":"../lib/template.ts"}],"../lib/getTagListFromConfig.ts":[function(require,module,exports) {
"use strict";

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

var getTagListFromConfig = function (config) {
  var allRules = __spreadArray(__spreadArray([], __read(config.fileRules), false), __read(config.eslintRules), false);

  var tagList = allRules.reduce(function (acc, rule) {
    rule.tags.forEach(function (tag) {
      if (!acc[tag]) {
        acc[tag] = [rule.id];
      }

      if (acc[tag] && !acc[tag].includes(rule.id)) {
        acc[tag].push(rule.id);
      }
    });
    return acc;
  }, {});
  return tagList;
};

exports.default = getTagListFromConfig;
},{}],"walk/index.tsx":[function(require,module,exports) {
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

var __values = this && this.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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

var ink_task_list_1 = require("ink-task-list");

var simple_git_1 = __importDefault(require("simple-git"));

var fs_1 = __importDefault(require("fs"));

var path_1 = __importDefault(require("path"));

var getFilesList_1 = __importDefault(require("../../lib/getFilesList"));

var checkFileList_1 = __importDefault(require("../../lib/checkFileList"));

var useValidatedConfig_1 = __importDefault(require("../../lib/useValidatedConfig"));

var buildWalkReport_1 = __importDefault(require("../../lib/buildWalkReport"));

var getTagListFromConfig_1 = __importDefault(require("../../lib/getTagListFromConfig"));

var gitOptions = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6
};
var git = (0, simple_git_1.default)(gitOptions);
var currentBranch;

var getCommitList = function (nth) {
  return __awaiter(void 0, void 0, Promise, function () {
    var list, listArray;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , git.revparse(['--abbrev-ref', 'HEAD'])];

        case 1:
          currentBranch = _a.sent();
          return [4
          /*yield*/
          , git.tag(['-l', 'v*.0.0', '--sort', 'v:refname', '--format', '%(refname:strip=2)'])];

        case 2:
          list = _a.sent();
          listArray = list.split(/\r?\n/).reverse().filter(function (tag) {
            return tag !== '';
          }).slice(0, nth).reverse();
          return [2
          /*return*/
          , listArray];
      }
    });
  });
};

var formatCommitTotal = function (config, results) {
  var configRules = __spreadArray(__spreadArray([], __read(config.fileRules.map(function (rule) {
    return rule.id;
  })), false), __read(config.eslintRules.map(function (rule) {
    return rule.id;
  })), false).reduce(function (acc, id) {
    var _a;

    return __assign(__assign({}, acc), (_a = {}, _a[id] = {
      score: 0,
      occurences: 0
    }, _a));
  }, {});

  Object.keys(results).forEach(function (file) {
    var currentFile = results[file];

    if (currentFile.rules.length > 0) {
      currentFile.rules.forEach(function (_a) {
        var id = _a.id,
            debtScore = _a.debtScore,
            occurences = _a.occurences;
        configRules[id].score = configRules[id].score + debtScore * occurences;
        configRules[id].occurences = configRules[id].occurences + occurences;
      });
    }
  });
  return configRules;
};

function Compare(_a) {
  var _this = this;

  var _b = _a.revlength,
      revlength = _b === void 0 ? 10 : _b,
      config = _a.config,
      _c = _a.collectFrom,
      collectFrom = _c === void 0 ? null : _c;

  var _d = __read((0, react_1.useState)({}), 2),
      results = _d[0],
      setResults = _d[1];

  var _e = __read((0, react_1.useState)({
    commit: '',
    index: 0
  }), 2),
      currentCommit = _e[0],
      setCurrentCommit = _e[1];

  var _f = __read((0, react_1.useState)(false), 2),
      isReady = _f[0],
      setIsReady = _f[1];

  var _g = __read((0, react_1.useState)({}), 2),
      tags = _g[0],
      setTags = _g[1];

  var _h = (0, useValidatedConfig_1.default)(config),
      isConfigValidated = _h.isConfigValidated,
      updatedConfig = _h.updatedConfig,
      configErrors = _h.configErrors,
      defaultConfig = _h.defaultConfig;

  (0, react_1.useEffect)(function () {
    (function () {
      return __awaiter(_this, void 0, void 0, function () {
        var commitsList, previousResults, _loop_1, _a, _b, _c, index, commit, e_1_1;

        var e_1, _d;

        return __generator(this, function (_e) {
          switch (_e.label) {
            case 0:
              if (!isConfigValidated) return [3
              /*break*/
              , 11];
              setTags((0, getTagListFromConfig_1.default)(defaultConfig));
              return [4
              /*yield*/
              , getCommitList(revlength)];

            case 1:
              commitsList = _e.sent();
              previousResults = void 0;

              _loop_1 = function (index, commit) {
                var since, fileList, results_1, mergedResults, resultsByRules;
                return __generator(this, function (_f) {
                  switch (_f.label) {
                    case 0:
                      setCurrentCommit({
                        commit: commit,
                        index: index + 1
                      });
                      return [4
                      /*yield*/
                      , git.checkout([commit])];

                    case 1:
                      _f.sent();

                      since = index === 0 ? null : commitsList[index - 1];
                      return [4
                      /*yield*/
                      , (0, getFilesList_1.default)(updatedConfig, since, collectFrom)];

                    case 2:
                      fileList = _f.sent();
                      return [4
                      /*yield*/
                      , (0, checkFileList_1.default)(fileList, updatedConfig, null, null, function () {
                        return null;
                      })];

                    case 3:
                      results_1 = _f.sent();
                      mergedResults = results_1.reduce(function (acc, res) {
                        acc[res.file] = res;
                        return acc;
                      }, {});

                      if (previousResults) {
                        mergedResults = __assign(__assign({}, previousResults), mergedResults);
                        mergedResults = Object.keys(mergedResults).reduce(function (acc, file) {
                          var fileStillExist = fs_1.default.existsSync(path_1.default.resolve(process.cwd(), "./".concat(file)));

                          if (fileStillExist) {
                            acc[file] = mergedResults[file];
                          }

                          return acc;
                        }, {});
                      }

                      previousResults = mergedResults;
                      resultsByRules = formatCommitTotal(defaultConfig, mergedResults);
                      setResults(function (prevRes) {
                        var _a;

                        return __assign(__assign({}, prevRes), (_a = {}, _a[commit] = resultsByRules, _a));
                      });
                      return [2
                      /*return*/
                      ];
                  }
                });
              };

              _e.label = 2;

            case 2:
              _e.trys.push([2, 7, 8, 9]);

              _a = __values(commitsList.entries()), _b = _a.next();
              _e.label = 3;

            case 3:
              if (!!_b.done) return [3
              /*break*/
              , 6];
              _c = __read(_b.value, 2), index = _c[0], commit = _c[1];
              return [5
              /*yield**/
              , _loop_1(index, commit)];

            case 4:
              _e.sent();

              _e.label = 5;

            case 5:
              _b = _a.next();
              return [3
              /*break*/
              , 3];

            case 6:
              return [3
              /*break*/
              , 9];

            case 7:
              e_1_1 = _e.sent();
              e_1 = {
                error: e_1_1
              };
              return [3
              /*break*/
              , 9];

            case 8:
              try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
              } finally {
                if (e_1) throw e_1.error;
              }

              return [7
              /*endfinally*/
              ];

            case 9:
              return [4
              /*yield*/
              , git.checkout([currentBranch])];

            case 10:
              _e.sent();

              setIsReady(true);
              _e.label = 11;

            case 11:
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
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          if (isReady) {
            (0, buildWalkReport_1.default)(defaultConfig, tags, results);
          }

          return [2
          /*return*/
          ];
        });
      });
    })();
  }, [isReady]);
  return react_1.default.createElement(ink_task_list_1.TaskList, null, react_1.default.createElement(ink_task_list_1.Task, {
    state: !isReady ? 'loading' : 'success',
    label: "checking the last ".concat(revlength, " commits"),
    status: "checking commit ".concat(currentCommit.index, "/").concat(revlength, " : ").concat(currentCommit.commit)
  }), react_1.default.createElement(ink_task_list_1.Task, {
    state: !isReady ? 'pending' : 'loading',
    label: "Building a report"
  }));
}

Compare.propTypes = {
  revlength: prop_types_1.default.number,
  config: prop_types_1.default.string,
  collectFrom: prop_types_1.default.string
};
Compare.shortFlags = {
  revlength: 'n',
  config: 'c',
  collectFrom: 'f'
};
exports.default = Compare;
},{"../../lib/getFilesList":"../lib/getFilesList.ts","../../lib/checkFileList":"../lib/checkFileList.ts","../../lib/useValidatedConfig":"../lib/useValidatedConfig.ts","../../lib/buildWalkReport":"../lib/buildWalkReport.ts","../../lib/getTagListFromConfig":"../lib/getTagListFromConfig.ts"}]},{},["walk/index.tsx"], null)
//# sourceMappingURL=/walk/index.js.map