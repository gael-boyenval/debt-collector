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
})({"../lib/utils/truncateString.ts":[function(require,module,exports) {
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

var truncateString = function (str, max) {
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

exports.default = truncateString;
},{}],"../lib/utils/mergeAndDedupArrays.ts":[function(require,module,exports) {
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

var mergeAndDedupArrays = function () {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var fusioned = args.reduce(function (acc, array) {
    return acc.concat(array);
  }, []);
  return __spreadArray([], __read(new Set(fusioned)), false);
};

exports.default = mergeAndDedupArrays;
},{}],"../lib/utils/useArrayForStringKeys.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var useArrayForStringKeys = function (keys, obj) {
  var returnObj = obj;
  keys.forEach(function (key) {
    if (returnObj[key] && typeof returnObj[key] === 'string') {
      returnObj[key] = [returnObj[key]];
    }

    if (!returnObj[key]) {
      returnObj[key] = [];
    }
  });
  return returnObj;
};

exports.default = useArrayForStringKeys;
},{}],"../lib/utils/filterIgnoredFiles.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var minimatch_1 = __importDefault(require("minimatch"));

var filterIgnoredFiles = function (files, ignoredFiles, includedFiles) {
  return files.filter(function (file) {
    var matchGlob = function (glob) {
      return (0, minimatch_1.default)(file, glob.replace(/^\.\//, ''));
    };

    var isFileIgnored = ignoredFiles.some(matchGlob);
    var isFileIncluded = includedFiles.some(matchGlob);
    return !isFileIgnored && isFileIncluded;
  });
};

exports.default = filterIgnoredFiles;
},{}],"../lib/utils/cleanTagFilterParam.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cleanTagFilterParam = function (tagsParam) {
  return tagsParam ? tagsParam === null || tagsParam === void 0 ? void 0 : tagsParam.filter(function (tag) {
    return tag !== undefined;
  }) : [];
};

exports.default = cleanTagFilterParam;
},{}],"../lib/utils/getConfigRuleById.ts":[function(require,module,exports) {
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

var getConfigRuleById = function (config, id) {
  var fileRules = config.fileRules || [];
  var eslintRules = config.eslintRules || [];

  var rules = __spreadArray(__spreadArray([], __read(fileRules), false), __read(eslintRules), false);

  return rules.find(function (rule) {
    return rule.id === id;
  });
};

exports.default = getConfigRuleById;
},{}],"../lib/utils/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigRuleById = exports.cleanTagFilterParam = exports.filterIgnoredFiles = exports.useArrayForStringKeys = exports.mergeAndDedupArrays = exports.truncateString = void 0;

var truncateString_1 = require("./truncateString");

Object.defineProperty(exports, "truncateString", {
  enumerable: true,
  get: function () {
    return __importDefault(truncateString_1).default;
  }
});

var mergeAndDedupArrays_1 = require("./mergeAndDedupArrays");

Object.defineProperty(exports, "mergeAndDedupArrays", {
  enumerable: true,
  get: function () {
    return __importDefault(mergeAndDedupArrays_1).default;
  }
});

var useArrayForStringKeys_1 = require("./useArrayForStringKeys");

Object.defineProperty(exports, "useArrayForStringKeys", {
  enumerable: true,
  get: function () {
    return __importDefault(useArrayForStringKeys_1).default;
  }
});

var filterIgnoredFiles_1 = require("./filterIgnoredFiles");

Object.defineProperty(exports, "filterIgnoredFiles", {
  enumerable: true,
  get: function () {
    return __importDefault(filterIgnoredFiles_1).default;
  }
});

var cleanTagFilterParam_1 = require("./cleanTagFilterParam");

Object.defineProperty(exports, "cleanTagFilterParam", {
  enumerable: true,
  get: function () {
    return __importDefault(cleanTagFilterParam_1).default;
  }
});

var getConfigRuleById_1 = require("./getConfigRuleById");

Object.defineProperty(exports, "getConfigRuleById", {
  enumerable: true,
  get: function () {
    return __importDefault(getConfigRuleById_1).default;
  }
});
},{"./truncateString":"../lib/utils/truncateString.ts","./mergeAndDedupArrays":"../lib/utils/mergeAndDedupArrays.ts","./useArrayForStringKeys":"../lib/utils/useArrayForStringKeys.ts","./filterIgnoredFiles":"../lib/utils/filterIgnoredFiles.ts","./cleanTagFilterParam":"../lib/utils/cleanTagFilterParam.ts","./getConfigRuleById":"../lib/utils/getConfigRuleById.ts"}],"../lib/git/gitUtils.ts":[function(require,module,exports) {
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
exports.getChangedFilesSinceRev = exports.walkCommits = exports.getRevList = exports.execWalkCommand = exports.getCurrentBranch = exports.checkoutTo = exports.getIsHistoryDirty = void 0;
/* eslint-disable no-await-in-loop, no-restricted-syntax */

var path_1 = __importDefault(require("path"));

var simple_git_1 = __importDefault(require("simple-git"));

var gitOptions = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6
};
var git = (0, simple_git_1.default)(gitOptions);

var getIsHistoryDirty = function () {
  return __awaiter(void 0, void 0, Promise, function () {
    var status;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , git.status()];

        case 1:
          status = _a.sent();
          return [2
          /*return*/
          , status.files.length > 0];
      }
    });
  });
};

exports.getIsHistoryDirty = getIsHistoryDirty;

function timeout(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

var checkoutTo = function (revision) {
  return __awaiter(void 0, void 0, Promise, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , git.checkout([revision]) // we need to make sure that file system is ready to be used, and finished the checkout
          ];

        case 1:
          _a.sent(); // we need to make sure that file system is ready to be used, and finished the checkout


          return [4
          /*yield*/
          , timeout(1000)];

        case 2:
          // we need to make sure that file system is ready to be used, and finished the checkout
          _a.sent();

          return [2
          /*return*/
          ];
      }
    });
  });
};

exports.checkoutTo = checkoutTo;

var getCurrentBranch = function () {
  return __awaiter(void 0, void 0, Promise, function () {
    var currentBranch;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , git.revparse(['--abbrev-ref', 'HEAD'])];

        case 1:
          currentBranch = _a.sent();
          return [2
          /*return*/
          , currentBranch];
      }
    });
  });
};

exports.getCurrentBranch = getCurrentBranch;

var execWalkCommand = function (command) {
  return __awaiter(void 0, void 0, Promise, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , git.raw(command.replace('git ', '').split(' '))];
    });
  });
};

exports.execWalkCommand = execWalkCommand;

var getRevList = function (command, parser, limit) {
  if (limit === void 0) {
    limit = 10;
  }

  return __awaiter(void 0, void 0, Promise, function () {
    var commandResult, result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , git.raw(command.replace('git ', '').split(' '))];

        case 1:
          commandResult = _a.sent();
          result = parser(commandResult);
          return [2
          /*return*/
          , result.slice(0, limit)];
      }
    });
  });
};

exports.getRevList = getRevList;

var walkCommits = function (revList, _a) {
  var onCommitChange = _a.onCommitChange,
      onError = _a.onError,
      onEnd = _a.onEnd;
  return __awaiter(void 0, void 0, Promise, function () {
    var isHistoryDirty, currentBranch, walkIteratorResults, _b, _c, _d, index, rev, previousResult, results_1, e_1_1, e_2, results;

    var e_1, _e;

    var _f;

    return __generator(this, function (_g) {
      switch (_g.label) {
        case 0:
          return [4
          /*yield*/
          , (0, exports.getIsHistoryDirty)()];

        case 1:
          isHistoryDirty = _g.sent();
          return [4
          /*yield*/
          , (0, exports.getCurrentBranch)()];

        case 2:
          currentBranch = _g.sent();
          walkIteratorResults = null;

          if (isHistoryDirty) {
            onError('You have uncommited changes, please commit or stash them');
            return [2
            /*return*/
            , null];
          }

          _g.label = 3;

        case 3:
          _g.trys.push([3, 13,, 15]);

          _g.label = 4;

        case 4:
          _g.trys.push([4, 10, 11, 12]);

          _b = __values(revList.entries()), _c = _b.next();
          _g.label = 5;

        case 5:
          if (!!_c.done) return [3
          /*break*/
          , 9];
          _d = __read(_c.value, 2), index = _d[0], rev = _d[1];
          return [4
          /*yield*/
          , git.checkout([rev.hash])];

        case 6:
          _g.sent();

          previousResult = (_f = walkIteratorResults === null || walkIteratorResults === void 0 ? void 0 : walkIteratorResults[index - 1]) !== null && _f !== void 0 ? _f : null;
          return [4
          /*yield*/
          , onCommitChange({
            rev: rev,
            index: index,
            previousResult: previousResult
          })];

        case 7:
          results_1 = _g.sent();

          if (!walkIteratorResults) {
            walkIteratorResults = [];
          }

          walkIteratorResults.push({
            rev: rev,
            results: results_1
          });
          _g.label = 8;

        case 8:
          _c = _b.next();
          return [3
          /*break*/
          , 5];

        case 9:
          return [3
          /*break*/
          , 12];

        case 10:
          e_1_1 = _g.sent();
          e_1 = {
            error: e_1_1
          };
          return [3
          /*break*/
          , 12];

        case 11:
          try {
            if (_c && !_c.done && (_e = _b.return)) _e.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }

          return [7
          /*endfinally*/
          ];

        case 12:
          return [3
          /*break*/
          , 15];

        case 13:
          e_2 = _g.sent();
          onError(e_2.message);
          return [4
          /*yield*/
          , (0, exports.checkoutTo)(currentBranch)];

        case 14:
          _g.sent();

          console.log(e_2);
          return [2
          /*return*/
          , null];

        case 15:
          return [4
          /*yield*/
          , (0, exports.checkoutTo)(currentBranch)];

        case 16:
          _g.sent();

          return [4
          /*yield*/
          , onEnd(walkIteratorResults)];

        case 17:
          results = _g.sent();
          return [2
          /*return*/
          , results];
      }
    });
  });
};

exports.walkCommits = walkCommits;

var getChangedFilesSinceRev = function (rev) {
  return __awaiter(void 0, void 0, Promise, function () {
    var results, rootGitDir, currentGitDir, changedFilesSinceRev;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , git.diff([rev, '--name-status', '--no-renames'])];

        case 1:
          results = _a.sent();
          return [4
          /*yield*/
          , git.revparse(['--show-toplevel'])];

        case 2:
          rootGitDir = _a.sent();
          currentGitDir = path_1.default.relative(rootGitDir, process.cwd());
          changedFilesSinceRev = results.replace(/\t/g, '|').split('\n').filter(function (item) {
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
          return [2
          /*return*/
          , changedFilesSinceRev];
      }
    });
  });
};

exports.getChangedFilesSinceRev = getChangedFilesSinceRev;
},{}],"../lib/git/useGitUtils.ts":[function(require,module,exports) {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var react_1 = require("react");

var gitUtils_1 = require("./gitUtils");

var useGitUtils = function (config) {
  var _a = __read((0, react_1.useState)(false), 2),
      isGitReady = _a[0],
      setIsGitReady = _a[1];

  var _b = __read((0, react_1.useState)(null), 2),
      currentBranch = _b[0],
      setCurrentBranch = _b[1];

  var _c = __read((0, react_1.useState)(null), 2),
      isHistoryDirty = _c[0],
      setIsHistoryDirty = _c[1];

  var _d = __read((0, react_1.useState)(null), 2),
      revList = _d[0],
      setRevList = _d[1];

  var _e = __read((0, react_1.useState)([]), 2),
      gitErrors = _e[0],
      setGitErrors = _e[1];

  (0, react_1.useEffect)(function () {
    if (config) {
      ;

      (function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var currentBranchRes, isHistoryDirtyRes, _a, gitCommand, parser, limit, revListRes, e_1;

          var _b, _c;

          return __generator(this, function (_d) {
            switch (_d.label) {
              case 0:
                _d.trys.push([0, 5,, 6]);

                return [4
                /*yield*/
                , (0, gitUtils_1.getCurrentBranch)()];

              case 1:
                currentBranchRes = _d.sent();
                return [4
                /*yield*/
                , (0, gitUtils_1.getIsHistoryDirty)()];

              case 2:
                isHistoryDirtyRes = _d.sent();
                setCurrentBranch(currentBranchRes);
                setIsHistoryDirty(isHistoryDirtyRes);
                if (!(((_b = config.walkConfig) === null || _b === void 0 ? void 0 : _b.gitCommand) && ((_c = config.walkConfig) === null || _c === void 0 ? void 0 : _c.parser))) return [3
                /*break*/
                , 4];
                _a = config.walkConfig, gitCommand = _a.gitCommand, parser = _a.parser, limit = _a.limit;
                return [4
                /*yield*/
                , (0, gitUtils_1.getRevList)(gitCommand, parser, limit)];

              case 3:
                revListRes = _d.sent();
                setRevList(revListRes);
                _d.label = 4;

              case 4:
                setIsGitReady(true);
                return [3
                /*break*/
                , 6];

              case 5:
                e_1 = _d.sent();
                setGitErrors(gitErrors.push([{
                  errorType: 'GIT_ERROR',
                  message: e_1.message
                }]));
                setIsGitReady(true);
                return [3
                /*break*/
                , 6];

              case 6:
                return [2
                /*return*/
                ];
            }
          });
        });
      })();
    }
  }, [config]);
  return {
    isGitReady: isGitReady,
    currentBranch: currentBranch,
    isHistoryDirty: isHistoryDirty,
    checkoutTo: gitUtils_1.checkoutTo,
    revList: revList,
    gitErrors: gitErrors,
    walkCommits: gitUtils_1.walkCommits
  };
};

exports.default = useGitUtils;
},{"./gitUtils":"../lib/git/gitUtils.ts"}],"../lib/git/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGitUtils = void 0;

__exportStar(require("./gitUtils"), exports);

var useGitUtils_1 = require("./useGitUtils");

Object.defineProperty(exports, "useGitUtils", {
  enumerable: true,
  get: function () {
    return __importDefault(useGitUtils_1).default;
  }
});
},{"./gitUtils":"../lib/git/gitUtils.ts","./useGitUtils":"../lib/git/useGitUtils.ts"}],"../lib/filters/getFilesList.ts":[function(require,module,exports) {
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

var glob_1 = __importDefault(require("glob"));

var utils_1 = require("../utils");

var git_1 = require("../git");

var removeDotSlash = function (str) {
  return str.replace(/^\.\//, '');
};

var getFileList = function (config, compare, globOption) {
  return __awaiter(void 0, void 0, Promise, function () {
    var includedGlob;
    return __generator(this, function (_a) {
      includedGlob = !!globOption ? [globOption] : config.include;

      if (!!compare) {
        return [2
        /*return*/
        , new Promise(function (resolve, reject) {
          return __awaiter(void 0, void 0, void 0, function () {
            var changedFiles, allChanges, files, error_1;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 2,, 3]);

                  return [4
                  /*yield*/
                  , (0, git_1.getChangedFilesSinceRev)(compare) // const ignoreDeletedfiles = changedFiles.filter(({ status }) => status === 'A' || status === 'M')
                  ];

                case 1:
                  changedFiles = _a.sent();
                  allChanges = changedFiles.map(function (item) {
                    return item.filePath;
                  });
                  files = (0, utils_1.filterIgnoredFiles)(allChanges, config.exclude, includedGlob);
                  resolve(files);
                  return [3
                  /*break*/
                  , 3];

                case 2:
                  error_1 = _a.sent();
                  reject(error_1);
                  return [3
                  /*break*/
                  , 3];

                case 3:
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
        try {
          var globOptions_1 = {
            ignore: config.exclude,
            nodir: true
          };
          var filesFromSource = includedGlob.map(function (globFilter) {
            return glob_1.default.sync(globFilter, globOptions_1);
          });
          var files = utils_1.mergeAndDedupArrays.apply(void 0, __spreadArray([], __read(filesFromSource), false)).map(removeDotSlash);
          resolve(files);
        } catch (error) {
          reject(error);
        }
      })];
    });
  });
};

exports.default = getFileList;
},{"../utils":"../lib/utils/index.ts","../git":"../lib/git/index.ts"}],"../lib/filters/filterRules.ts":[function(require,module,exports) {
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
  var _b = _a.include,
      include = _b === void 0 ? ['**/*'] : _b;
  return include.filter(function (glob) {
    return (0, minimatch_1.default)(file.replace('./', ''), glob.replace('./', ''));
  }).length > 0;
};

var getRulesForFile = function (options, filePath) {
  var rulesForFile = {};

  if (options.fileRules) {
    rulesForFile.fileRules = options.fileRules.filter(function (rule) {
      return doesMatchPath(rule, filePath);
    });
  }

  if (options.eslintRules) {
    rulesForFile.eslintRules = options.eslintRules.filter(function (rule) {
      return doesMatchPath(rule, filePath);
    });
  }

  return rulesForFile;
};

exports.getRulesForFile = getRulesForFile;

var filterRulesByTagAndId = function (rules, ruleId, tags) {
  return rules.filter(function (rule) {
    return ruleId ? ruleId === rule.id : true;
  }).filter(function (rule) {
    return tags && tags.length > 0 ? tags.some(function (tag) {
      return rule.tags.includes(tag);
    }) : true;
  });
};

var filtersRulesFromOptions = function (options, ruleId, tags) {
  var _a, _b;

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
    fileRules = filterRulesByTagAndId((_a = options.fileRules) !== null && _a !== void 0 ? _a : [], ruleId, cleanTag);
    eslintRules = filterRulesByTagAndId((_b = options.eslintRules) !== null && _b !== void 0 ? _b : [], ruleId, cleanTag);
  }

  return {
    fileRules: fileRules,
    eslintRules: eslintRules
  };
};

exports.filtersRulesFromOptions = filtersRulesFromOptions;
},{}],"../lib/results/getFileRulesErrors.ts":[function(require,module,exports) {
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

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var escape_string_regexp_node_1 = __importDefault(require("escape-string-regexp-node"));

var findJsImportFrom = function (data) {
  return function (importee, from) {
    var regexp = new RegExp("import [A-z0-9,\\s{]*".concat((0, escape_string_regexp_node_1.default)(importee), "[A-z0-9,\\s}]* from '[A-z0-9./]*").concat((0, escape_string_regexp_node_1.default)(from), "[A-z0-9./]*'"), 'gm');
    var res = data.matchAll(regexp);
    var resArr = Array.from(res, function (m) {
      return m[0];
    });
    return resArr.length > 0 ? 1 : 0;
  };
};

var countAll = function (data) {
  return function (str) {
    var regexp;

    if (str instanceof RegExp) {
      regexp = str;
    } else {
      regexp = new RegExp((0, escape_string_regexp_node_1.default)(str), 'g');
    }

    var res = data.matchAll(regexp);
    var resArr = Array.from(res, function (m) {
      return m[0];
    });
    return resArr.length;
  };
};

var findOne = function (data) {
  return function (str) {
    var count = countAll(data)(str);
    return count > 0 ? 1 : 0;
  };
};

var findOneOf = function (data) {
  return function (matches) {
    var count = 0;
    var index = 0;

    while (count === 0 && index <= matches.length - 1) {
      count = countAll(data)(matches[index]);
      index += 1;
    }

    return count === 0 ? 0 : 1;
  };
}; // does not work => fix


var countAllOf = function (data) {
  return function (matches) {
    var count = 0;
    var index = 0;

    while (index <= matches.length - 1) {
      count += countAll(data)(matches[index]);
      index += 1;
    }

    return count;
  };
};

var getFileRulesErrors = function (config, file, data) {
  var utils = {
    content: data,
    file: file,
    countAll: countAll(data),
    findOne: findOne(data),
    findOneOf: findOneOf(data),
    countAllOf: countAllOf(data),
    findJsImportFrom: findJsImportFrom(data)
  };
  return config.fileRules.reduce(function (acc, rule) {
    var nbErrors = rule.matchRule(__assign({}, utils));

    if (nbErrors > 0) {
      acc.push({
        ruleTitle: rule.title,
        ruleId: rule.id,
        occurences: nbErrors
      });
    }

    return acc;
  }, []);
};

exports.default = getFileRulesErrors;
},{}],"../lib/results/getEslintRulesErrors.ts":[function(require,module,exports) {
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
            content: errors,
            file: file
          };
          return [2
          /*return*/
          , config.eslintRules.reduce(function (acc, rule) {
            var nbErrors = rule.matchESLintRule(__assign({}, utils));

            if (nbErrors > 0) {
              acc.push({
                ruleId: rule.id,
                occurences: nbErrors
              });
            }

            return acc;
          }, [])];
      }
    });
  });
};

exports.default = getEslintRulesErrors;
},{}],"../lib/results/getFileResult.ts":[function(require,module,exports) {
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

var fs_1 = __importDefault(require("fs"));

var filterRules_1 = require("../filters/filterRules");

var getFileRulesErrors_1 = __importDefault(require("./getFileRulesErrors"));

var getEslintRulesErrors_1 = __importDefault(require("./getEslintRulesErrors"));

var utils_1 = require("../utils");

var updateResults = function (config, brokenRules, fileResults, ruleName) {
  var updatedFileResults = __assign({}, fileResults);

  if (brokenRules.length > 0) {
    brokenRules.forEach(function (_a) {
      var ruleId = _a.ruleId,
          occurences = _a.occurences;
      var rule = (0, utils_1.getConfigRuleById)(config, ruleId);
      var ruleTotalSore = rule.debtScore * occurences;
      updatedFileResults.brokenRules.push({
        ruleTitle: rule.title,
        ruleId: ruleId,
        occurences: occurences,
        ruleTotalSore: ruleTotalSore
      });
      updatedFileResults.totalScore += ruleTotalSore;
    });
  }

  return updatedFileResults;
};

var runFileChecks = function (config, filePath, eslint) {
  return __awaiter(void 0, void 0, Promise, function () {
    var fileResults, data, fileRulesResults, eslintResults;

    var _a, _b, _c, _d;

    return __generator(this, function (_e) {
      switch (_e.label) {
        case 0:
          fileResults = {
            filePath: filePath,
            fileShortPath: (0, utils_1.truncateString)(filePath, 80),
            brokenRules: [],
            totalScore: 0
          };

          if (((_a = config.eslintRules) === null || _a === void 0 ? void 0 : _a.length) === 0 && ((_b = config.fileRules) === null || _b === void 0 ? void 0 : _b.length) === 0) {
            return [2
            /*return*/
            , fileResults];
          }

          data = '';

          try {
            data = fs_1.default.readFileSync(filePath).toString();
          } catch (error) {
            // console.error(`error while reading file ${filePath} \n ${error.message}`)
            data = '';
          }

          if (((_c = config.fileRules) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            if (data) {
              fileRulesResults = (0, getFileRulesErrors_1.default)(config, filePath, data);
              fileResults = updateResults(config, fileRulesResults, fileResults, 'fileRules');
            } else {
              fileResults = updateResults(config, [], fileResults, 'fileRules');
            }
          }

          if (!(((_d = config.eslintRules) === null || _d === void 0 ? void 0 : _d.length) > 0 && eslint)) return [3
          /*break*/
          , 3];
          if (!data) return [3
          /*break*/
          , 2];
          return [4
          /*yield*/
          , (0, getEslintRulesErrors_1.default)(config, filePath, data, eslint)];

        case 1:
          eslintResults = _e.sent();
          fileResults = updateResults(config, eslintResults, fileResults, 'eslintRules');
          return [3
          /*break*/
          , 3];

        case 2:
          fileResults = updateResults(config, [], fileResults, 'eslintRules');
          _e.label = 3;

        case 3:
          return [2
          /*return*/
          , fileResults];
      }
    });
  });
};

var getFileResult = function (config, file, incrementCounter, eslint) {
  return __awaiter(void 0, void 0, Promise, function () {
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
},{"../filters/filterRules":"../lib/filters/filterRules.ts","./getFileRulesErrors":"../lib/results/getFileRulesErrors.ts","./getEslintRulesErrors":"../lib/results/getEslintRulesErrors.ts","../utils":"../lib/utils/index.ts"}],"../lib/results/checkFileList.ts":[function(require,module,exports) {
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

var queue_promise_1 = __importDefault(require("queue-promise"));

var eslint_1 = require("eslint");

var getFileResult_1 = __importDefault(require("./getFileResult"));

var filterRules_1 = require("../filters/filterRules");

var checkFileList = function (fileList, config, rule, tags, increment) {
  return __awaiter(void 0, void 0, Promise, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , new Promise(function (resolve) {
        var _a;

        var queue = new queue_promise_1.default({
          concurrent: 20,
          interval: 0
        });
        var filteredRules = (0, filterRules_1.filtersRulesFromOptions)(config, rule, tags);

        var fileListConfig = __assign(__assign({}, config), filteredRules);

        var eslint = null;

        if (((_a = config.eslintRules) === null || _a === void 0 ? void 0 : _a.length) > 0) {
          eslint = new eslint_1.ESLint({
            useEslintrc: false,
            baseConfig: config.eslintConfig
          });
        }

        var results = [];
        queue.enqueue(fileList.map(function (file) {
          return function () {
            return (0, getFileResult_1.default)(fileListConfig, file, increment, eslint);
          };
        }));
        queue.on('resolve', function (data) {
          results.push(data);
        });
        queue.on('end', function () {
          return resolve(results);
        });
      })];
    });
  });
};

exports.default = checkFileList;
},{"./getFileResult":"../lib/results/getFileResult.ts","../filters/filterRules":"../lib/filters/filterRules.ts"}],"../lib/reporters/compareMarkdownReport.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createTable = function (data) {
  return "\n|File|Prev|Current|Trend|\n|--|--|--|--|\n".concat(data.map(function (file) {
    return "|".concat(file.file, "|").concat(file.rev, "|").concat(file.current, "|").concat(file.trend, "|");
  }).join('\n'), "\n");
};

var createFileTable = function (fileResult) {
  return "\n<br/>\n<br/>\n<b>".concat(fileResult.fileShortPath, "</b><br/>\n<br/>\n\n|Broken rule|score|\n|--|--|\n").concat(fileResult.brokenRules.map(function (rule) {
    return "|\uD83D\uDEAB ".concat(rule.ruleTitle, "|").concat(rule.ruleTotalSore, "|");
  }).join('\n'), "\n");
};

var getFileScoreComparaison = function (data) {
  var result = '';

  if (data.noChangesFiles.length > 0) {
    result += "\n### \uD83D\uDCA4 Files with same debt :\n\n".concat(createTable(data.noChangesFiles), "\n\n");
  }

  if (data.lessDeptFiles.length > 0) {
    result += "\n### \u2705 Files with less debt :\n\n".concat(createTable(data.lessDeptFiles), "\n\n");
  }

  if (data.moreDeptFiles.length > 0) {
    result += "\n### \u274C Files with more debt :\n\n".concat(createTable(data.moreDeptFiles), "\n\n");
  }

  return result;
};

var getConclusions = function (data) {
  if (data.totalScores.solde > 0) {
    return "### \u274C Debt score for modified files increased by ".concat(data.totalScores.solde, " [^1]");
  }

  if (data.totalScores.solde < 0) {
    return "### \u2705 Debt score for modified files decreased by ".concat(data.totalScores.solde, " [^1]");
  }

  return '### 💤 Debt score for modified files did not change [^1]';
};

var getMotivationSpeatch = function (data) {
  if (data.totalScores.solde > 0) {
    return "Maybe try something else \uD83D\uDE2D";
  }

  if (data.totalScores.solde < 0) {
    return "You did great ! \uD83C\uDF89";
  }

  return 'Neither good or bad, I guess 🤷🏽';
};

var compareMarkDownReport = function (data) {
  return data.totalScores.rev === 0 && data.totalScores.cur === 0 ? "\n## Debt collector report\n\nAll changed files have a debt score of 0.\n\nNothing to do here, we\u2019re all good ! \uD83C\uDF89\n" : "\n## Debt collector report\n\n".concat(getConclusions(data), "\n").concat(getMotivationSpeatch(data), "\n\n|Previous debt|Current debt|trend|\n|--|--|--|\n|").concat(data.totalScores.rev.toString(), "|").concat(data.totalScores.cur.toString(), "|").concat(data.totalScores.solde.toString(), "|\n\n<details>\n<summary>\n  <h3>Modified files \u2022 see scores before and after</h3>\n</summary>\n<div>\n\n").concat(getFileScoreComparaison(data), "\n\n<br/>\n<br/>\n</div>\n</details>\n\n\n<details>\n<summary>\n  <h3>Help us improve code quality! Here are some ideas for you</h3>\n</summary>\n<div>\n\n").concat(data.currentResults.filter(function (res) {
    return res.totalScore !== 0;
  }).map(createFileTable).join('\n'), "\n\n<br/>\n<br/>\n</div>\n</details>\n\n[^1]: Scores based on modified files only <br/>The report may not be accurate if your branch is not up to date with the base branch.\n");
};

exports.default = compareMarkDownReport;
},{}],"../components/ResultReporter.tsx":[function(require,module,exports) {
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
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
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

var fs_1 = __importDefault(require("fs"));

var compareMarkdownReport_1 = __importDefault(require("../lib/reporters/compareMarkdownReport"));

var utils_1 = require("../lib/utils");

var cachePath = "".concat(process.cwd(), "/node_modules/.cache/debt-collector");
var resultPath = "".concat(cachePath, "/report.html");

var formatResults = function (results, limitTop) {
  var formatedResult = results.filter(function (result) {
    return result.totalScore > 0;
  });
  var impactedFilesNumber = formatedResult.length;
  var totalDeptScore = formatedResult.reduce(function (acc, res) {
    return acc + res.totalScore;
  }, 0);

  if (limitTop) {
    formatedResult = formatedResult.sort(function (a, b) {
      return b.totalScore - a.totalScore;
    }).filter(function (_item, index) {
      return index < limitTop;
    });
  }

  return {
    formatedResult: formatedResult,
    totalDeptScore: totalDeptScore,
    impactedFilesNumber: impactedFilesNumber
  };
};

var Results = function (_a) {
  var results = _a.results,
      limitTop = _a.limitTop;

  var _b = formatResults(results.results, limitTop),
      formatedResult = _b.formatedResult,
      totalDeptScore = _b.totalDeptScore,
      impactedFilesNumber = _b.impactedFilesNumber;

  return react_1.default.createElement(react_1.default.Fragment, null, formatedResult.length > 0 && formatedResult.map(function (result) {
    return react_1.default.createElement(ink_1.Box, {
      key: result.fileShortPath,
      flexDirection: "column",
      marginTop: 1
    }, react_1.default.createElement(ink_1.Text, {
      bold: true,
      color: "red",
      underline: true
    }, result.fileShortPath), react_1.default.createElement(ink_table_1.default, {
      data: result.brokenRules.map(function (_a) {
        var ruleTitle = _a.ruleTitle,
            occurences = _a.occurences,
            ruleTotalSore = _a.ruleTotalSore;
        return {
          title: ruleTitle,
          nb: occurences,
          score: ruleTotalSore
        };
      })
    }), react_1.default.createElement(ink_1.Text, {
      bold: true,
      color: "red"
    }, "Total Debt Score:", ' ', result.totalScore));
  }), react_1.default.createElement(ink_1.Box, {
    marginTop: 1
  }, react_1.default.createElement(ink_1.Text, {
    bold: true,
    backgroundColor: "#880000",
    color: "white"
  }, ' ', "Debt Score:", ' ', totalDeptScore, ' ', "/ Impacted files:", ' ', impactedFilesNumber)));
};

exports.Results = Results;

function ResultsFileOnly(_a) {
  var results = _a.results,
      limitTop = _a.limitTop;

  var _b = formatResults(results.results, limitTop),
      formatedResult = _b.formatedResult,
      totalDeptScore = _b.totalDeptScore,
      impactedFilesNumber = _b.impactedFilesNumber;

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
      var fileShortPath = _a.fileShortPath,
          totalScore = _a.totalScore;
      return {
        file: fileShortPath,
        score: totalScore
      };
    })
  }), react_1.default.createElement(ink_1.Box, {
    marginTop: 1
  }, react_1.default.createElement(ink_1.Text, {
    bold: true,
    backgroundColor: "#880000",
    color: "white"
  }, ' ', "Debt Score:", ' ', totalDeptScore, ' ', "/ Impacted files:", ' ', impactedFilesNumber)));
}

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

function ResultsNoMatchRule(_a) {
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
  }, "Nb of rules with no match :", ' ', notMatchRules.length, ' ', "/", rulesCount)));
}

exports.ResultsNoMatchRule = ResultsNoMatchRule;

function ResultsCompare(_a) {
  var results = _a.results,
      currentResults = _a.currentResults,
      outputHtml = _a.outputHtml;
  var tableResults = Object.keys(results).map(function (fileName) {
    var result = results[fileName];
    return {
      file: (0, utils_1.truncateString)(fileName, 60),
      rev: result.rev,
      current: result.current,
      trend: result.tendency
    };
  }).filter(function (file) {
    return !(file.rev === 0 && file.current === 0);
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
        var html = (0, compareMarkdownReport_1.default)({
          currentResults: currentResults,
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
  }, "DIFF :", ' ', totalScores.solde.toString()))));
}

exports.ResultsCompare = ResultsCompare;
},{"../lib/reporters/compareMarkdownReport":"../lib/reporters/compareMarkdownReport.ts","../lib/utils":"../lib/utils/index.ts"}],"../lib/config/getConfigPath.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var path_1 = __importDefault(require("path"));

var getConfigPath = function (config) {
  return config ? path_1.default.relative(process.cwd(), config) : path_1.default.relative(process.cwd(), './debt-collector.config.js');
};

exports.default = getConfigPath;
},{}],"../lib/config/sanitizeConfig.ts":[function(require,module,exports) {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../utils");

var initialiseRules = function (validatedConfig) {
  var _a, _b;

  var returnValues = validatedConfig;
  var config = returnValues.sanitizedConfig;
  returnValues.sanitizedConfig = (0, utils_1.useArrayForStringKeys)(['include', 'exclude'], config);
  var defaultFileRuleConfig = {
    include: '**/*',
    matchRule: function () {
      return 1;
    }
  };
  var defaultEslintRuleConfig = {
    include: '**/*'
  };
  var fileRules = null;

  if (((_a = config.fileRules) === null || _a === void 0 ? void 0 : _a.length) > 0) {
    fileRules = config.fileRules.map(function (rule) {
      var sanitizedRule = __assign(__assign({}, defaultFileRuleConfig), rule);

      sanitizedRule = (0, utils_1.useArrayForStringKeys)(['include', 'exclude', 'tags'], sanitizedRule);
      return sanitizedRule;
    });
  }

  var eslintRules = null;

  if (((_b = config.eslintRules) === null || _b === void 0 ? void 0 : _b.length) > 0) {
    eslintRules = config.eslintRules.map(function (rule) {
      var sanitizedRule = __assign(__assign({}, defaultEslintRuleConfig), rule);

      sanitizedRule = (0, utils_1.useArrayForStringKeys)(['include', 'exclude', 'tags'], sanitizedRule);
      return sanitizedRule;
    });
  }

  if (fileRules) {
    returnValues.sanitizedConfig.fileRules = fileRules;
  }

  if (eslintRules) {
    returnValues.sanitizedConfig.eslintRules = eslintRules;
  }

  return returnValues;
};

exports.default = initialiseRules;
},{"../utils":"../lib/utils/index.ts"}],"../lib/config/validateConfig.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
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

var sanitizeConfig_1 = __importDefault(require("./sanitizeConfig"));

var validateConfig = function (configPath) {
  return __awaiter(void 0, void 0, Promise, function () {
    var config, returnValues, importedConfig, e_1, hasIncludeKey, hasFileRules, hasEslintRules, hasEslintConfigPath, hasSomeRules;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          returnValues = {
            isConfigValid: true,
            sanitizedConfig: null,
            userConfig: null,
            configErrors: []
          };
          _a.label = 1;

        case 1:
          _a.trys.push([1, 3,, 4]);

          return [4
          /*yield*/
          , Promise.resolve().then(function () {
            return __importStar(require("".concat(process.cwd(), "/").concat(configPath)));
          })];

        case 2:
          importedConfig = _a.sent();
          config = importedConfig.default;
          returnValues.sanitizedConfig = config;
          returnValues.userConfig = config;
          return [3
          /*break*/
          , 4];

        case 3:
          e_1 = _a.sent();
          returnValues.isConfigValid = false;
          returnValues.configErrors.push("Impossible to load a valid config file at ".concat(configPath, ", create a config file or provide a path to a valid config using the \"--config\" flag"));
          return [2
          /*return*/
          , returnValues];

        case 4:
          hasIncludeKey = !!config.include;
          hasFileRules = !!config.fileRules;
          hasEslintRules = !!config.eslintRules;
          hasEslintConfigPath = !!config.eslintConfigPath;
          hasSomeRules = hasFileRules || hasEslintRules;

          if (!hasIncludeKey) {
            returnValues.isConfigValid = false;
            returnValues.configErrors.push('Provide a "include" key with a glob pattern in your configuration ex: "./**/*"');
          }

          if (!hasSomeRules) {
            returnValues.isConfigValid = false;
            returnValues.configErrors.push('Your config does not have any rules, please create "fileRules" or/and "eslintRules"');
          }

          if (hasEslintRules && !hasEslintConfigPath) {
            returnValues.isConfigValid = false;
            returnValues.configErrors.push('You provided "eslintRules" but no path to an eslint config file');
          }

          if (!hasEslintRules && hasEslintConfigPath) {
            returnValues.isConfigValid = false;
            returnValues.configErrors.push('You provided a a path to an eslint config but no "eslintRules"');
          } // TODO : validate individual rules
          // - unique ID
          // - include either an include key or a matchRule


          if (hasEslintConfigPath && hasEslintRules) {
            try {
              // eslint-disable-next-line global-require, import/no-dynamic-require
              returnValues.sanitizedConfig.eslintConfig = require(path_1.default.resolve(process.cwd(), config.eslintConfigPath));
            } catch (e) {
              returnValues.isConfigValid = false;
              returnValues.configErrors.push('Impossible to load the eslint config file');
            }
          }

          return [2
          /*return*/
          , (0, sanitizeConfig_1.default)(returnValues)];
      }
    });
  });
};

exports.default = validateConfig;
},{"./sanitizeConfig":"../lib/config/sanitizeConfig.ts"}],"../lib/config/useValidatedConfig.ts":[function(require,module,exports) {
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

var getConfigPath_1 = __importDefault(require("./getConfigPath"));

var validateConfig_1 = __importDefault(require("./validateConfig"));

var useValidatedConfig = function (config) {
  var _a = __read((0, react_1.useState)(null), 2),
      isConfigValid = _a[0],
      setIsConfigValid = _a[1];

  var _b = __read((0, react_1.useState)(null), 2),
      sanitizedConfig = _b[0],
      setSanitizedConfig = _b[1];

  var _c = __read((0, react_1.useState)(null), 2),
      configErrors = _c[0],
      setConfigErrors = _c[1];

  var _d = __read((0, react_1.useState)(null), 2),
      userConfig = _d[0],
      setUserConfig = _d[1];

  (0, react_1.useEffect)(function () {
    ;

    (function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var configPath, _a, isValid, cleanConfig, errors, baseConfig, e_1;

        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              configPath = (0, getConfigPath_1.default)(config);
              _b.label = 1;

            case 1:
              _b.trys.push([1, 3,, 4]);

              return [4
              /*yield*/
              , (0, validateConfig_1.default)(configPath)];

            case 2:
              _a = _b.sent(), isValid = _a.isConfigValid, cleanConfig = _a.sanitizedConfig, errors = _a.configErrors, baseConfig = _a.userConfig;
              setUserConfig(baseConfig);
              setSanitizedConfig(cleanConfig);
              setIsConfigValid(isValid);
              setConfigErrors(errors);
              return [3
              /*break*/
              , 4];

            case 3:
              e_1 = _b.sent();
              setIsConfigValid(false);
              setConfigErrors([e_1.message]);
              return [3
              /*break*/
              , 4];

            case 4:
              return [2
              /*return*/
              ];
          }
        });
      });
    })();
  }, []);
  return {
    isConfigValid: isConfigValid,
    sanitizedConfig: sanitizedConfig,
    configErrors: configErrors,
    userConfig: userConfig
  };
};

exports.default = useValidatedConfig;
},{"./getConfigPath":"../lib/config/getConfigPath.ts","./validateConfig":"../lib/config/validateConfig.ts"}],"../lib/config/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useValidatedConfig = void 0;

var useValidatedConfig_1 = require("./useValidatedConfig");

Object.defineProperty(exports, "useValidatedConfig", {
  enumerable: true,
  get: function () {
    return __importDefault(useValidatedConfig_1).default;
  }
});
},{"./useValidatedConfig":"../lib/config/useValidatedConfig.ts"}],"check/index.tsx":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
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
/* eslint-disable react/require-default-props */

var react_1 = __importStar(require("react"));

var prop_types_1 = __importDefault(require("prop-types"));

var ink_1 = require("ink");

var ink_task_list_1 = require("ink-task-list");

var getFilesList_1 = __importDefault(require("../../lib/filters/getFilesList"));

var checkFileList_1 = __importDefault(require("../../lib/results/checkFileList"));

var ResultReporter_1 = require("../../components/ResultReporter");

var config_1 = require("../../lib/config");

var utils_1 = require("../../lib/utils");

function Check(_a) {
  var _this = this;

  var _b = _a.rule,
      rule = _b === void 0 ? null : _b,
      _c = _a.tags,
      tags = _c === void 0 ? null : _c,
      _d = _a.config,
      config = _d === void 0 ? null : _d,
      _e = _a.include,
      include = _e === void 0 ? null : _e,
      _f = _a.reportFormat,
      reportFormat = _f === void 0 ? 'standard' : _f,
      _g = _a.changedSince,
      changedSince = _g === void 0 ? null : _g,
      _h = _a.limitTop,
      limitTop = _h === void 0 ? null : _h; // TODO fix include param => fail

  var _j = __read((0, react_1.useState)(null), 2),
      results = _j[0],
      setResults = _j[1];

  var _k = __read((0, react_1.useState)(null), 2),
      fileList = _k[0],
      setFileList = _k[1];

  var _l = __read((0, react_1.useState)(0), 2),
      checkedFileCount = _l[0],
      setCheckedFileCount = _l[1];

  var _m = (0, config_1.useValidatedConfig)(config),
      isConfigValid = _m.isConfigValid,
      sanitizedConfig = _m.sanitizedConfig,
      configErrors = _m.configErrors;

  var cleanTags = (0, utils_1.cleanTagFilterParam)(tags);
  (0, react_1.useEffect)(function () {
    (function () {
      return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!isConfigValid) return [3
              /*break*/
              , 2];
              return [4
              /*yield*/
              , (0, getFilesList_1.default)(sanitizedConfig, changedSince, include)];

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
  }, [isConfigValid]);
  (0, react_1.useEffect)(function () {
    (function () {
      return __awaiter(_this, void 0, void 0, function () {
        var incrementFn, results_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(fileList !== null)) return [3
              /*break*/
              , 2];

              incrementFn = function () {
                return setCheckedFileCount(function (prevCount) {
                  return prevCount + 1;
                });
              };

              return [4
              /*yield*/
              , (0, checkFileList_1.default)(fileList, sanitizedConfig, rule, tags, incrementFn)];

            case 1:
              results_1 = _a.sent();
              setResults({
                results: results_1,
                config: sanitizedConfig
              });
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
  var collectingFrom = "Collecting debt from ".concat(changedSince ? "files changed since ".concat(changedSince) : include || 'all files');
  var hasFilters = cleanTags.length || rule;
  var tagFilters = cleanTags.length > 0 && " [tags : ".concat(cleanTags, "]");
  var and = cleanTags.length > 0 && rule ? ' &' : '';
  var ruleFilter = rule ? " [rule id : ".concat(rule, "]") : '';
  var withFilters = "With rules filters on ".concat(tagFilters).concat(and).concat(ruleFilter);
  return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(ink_task_list_1.TaskList, null, react_1.default.createElement(ink_task_list_1.Task, {
    state: isConfigValid === null ? 'loading' : isConfigValid ? 'success' : 'error',
    label: "validating configuration",
    status: isConfigValid === null ? 'checking configuration' : isConfigValid ? 'success' : 'error'
  }), react_1.default.createElement(ink_task_list_1.Task, {
    state: fileList === null ? 'loading' : 'success',
    label: "defining files to check",
    status: fileList === null ? null : "".concat(fileList.length, " files")
  }), react_1.default.createElement(ink_task_list_1.Task, {
    state: results === null ? 'loading' : 'success',
    label: "checking files",
    status: "".concat(checkedFileCount, "/").concat(fileList === null ? '?' : fileList.length, " files")
  })), isConfigValid === false && (configErrors === null || configErrors === void 0 ? void 0 : configErrors.length) > 0 && configErrors.map(function (error, i) {
    return react_1.default.createElement(ink_1.Text, {
      key: i,
      color: "red"
    }, error);
  }), results !== null && reportFormat === 'standard' && react_1.default.createElement(ResultReporter_1.Results, {
    results: results,
    limitTop: limitTop
  }), results !== null && reportFormat === 'filesOnly' && react_1.default.createElement(ResultReporter_1.ResultsFileOnly, {
    results: results,
    limitTop: limitTop
  }), results !== null && reportFormat === 'noMatchRules' && react_1.default.createElement(ResultReporter_1.ResultsNoMatchRule, {
    results: results,
    initialConfig: sanitizedConfig
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
  }, "Reporting :", reportFormat, ' ', limitTop && "\u2022 top ".concat(limitTop, " biggest score"))));
}

Check.propTypes = {
  limitTop: prop_types_1.default.number,
  include: prop_types_1.default.string,
  rule: prop_types_1.default.string,
  // eslint-disable-next-line react/forbid-prop-types
  tags: prop_types_1.default.array,
  config: prop_types_1.default.string,
  changedSince: prop_types_1.default.string,
  reportFormat: prop_types_1.default.oneOf(['filesOnly', 'noMatchRules', 'standard'])
};
Check.shortFlags = {
  rule: 'r',
  tags: 't',
  include: 'g',
  config: 'c',
  reportFormat: 'f',
  changedSince: 's'
};
exports.default = Check;
},{"../../lib/filters/getFilesList":"../lib/filters/getFilesList.ts","../../lib/results/checkFileList":"../lib/results/checkFileList.ts","../../components/ResultReporter":"../components/ResultReporter.tsx","../../lib/config":"../lib/config/index.ts","../../lib/utils":"../lib/utils/index.ts"}]},{},["check/index.tsx"], null)
//# sourceMappingURL=/check/index.js.map