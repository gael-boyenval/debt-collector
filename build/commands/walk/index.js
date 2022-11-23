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
})({"../lib/config/getConfigPath.ts":[function(require,module,exports) {
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
},{}],"../lib/utils/truncateString.ts":[function(require,module,exports) {
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
},{"./truncateString":"../lib/utils/truncateString.ts","./mergeAndDedupArrays":"../lib/utils/mergeAndDedupArrays.ts","./useArrayForStringKeys":"../lib/utils/useArrayForStringKeys.ts","./filterIgnoredFiles":"../lib/utils/filterIgnoredFiles.ts","./cleanTagFilterParam":"../lib/utils/cleanTagFilterParam.ts","./getConfigRuleById":"../lib/utils/getConfigRuleById.ts"}],"../lib/config/sanitizeConfig.ts":[function(require,module,exports) {
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
},{"./useValidatedConfig":"../lib/config/useValidatedConfig.ts"}],"../lib/reporters/chartTemplate.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return "\n<!DOCTYPE html>\n<html>\n<head>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.14.0/babel.min.js\"></script>\n    <script type=\"text/babel\" data-presets=\"es2017, stage-3\" data-plugins=\"syntax-async-functions,transform-class-properties\"></script>\n    <script src=\"https://unpkg.com/react/umd/react.production.min.js\"></script>\n    <script src=\"https://unpkg.com/react-dom/umd/react-dom.production.min.js\"></script>\n    <script src=\"https://unpkg.com/prop-types/prop-types.min.js\"></script>\n    <script src=\"https://unpkg.com/recharts/umd/Recharts.js\"></script>\n     <style type=\"text/css\">\n      body {\n        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n      }\n    </style>\n</head>\n<body>\n<div id=\"app\"></div>\n<script type=\"text/babel\">\n\nconst result = ".concat(data, "\nconst reportsLinks = result.reportsLinks\n\nconst { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts\n\nconst ReportDebtPaymentProjection = ({period, title}) => (\n  <div  style={{ padding: 20, flex: 1 }}>\n    <div>At an avarage rythme of <b>{Math.round(period.tendencyMonth*100)/100} points/month</b>,<br/> it would require <b>{period.daysToReachZero} days</b> to reach zero debt.<br/> Debt would be payed in full on <b>{\n      new Date(\n        period.estimatedendDate\n      ).toDateString()}</b>\n    </div>\n  </div>\n)\n\nconst parseDataBy = (key) => result.results.map((commit) => {\n\n  const rulesScores = commit.brokenRules.map(rule => ({\n    [rule.ruleId]: rule[key]\n  })).reduce((acc, res) => ({...acc, ...res}), {})\n\n  return {\n    commit,\n    ...rulesScores\n  }\n})\n\nfunction getRandomColor() {\n  var letters = '0123456789ABCDEF';\n  var color = '#';\n  for (var i = 0; i < 6; i++) {\n    color += letters[Math.floor(Math.random() * 16)];\n  }\n  return color;\n}\n\nfunction shadeColor(color, percent) {\n  const channel = (chan) => {\n    let colChan = parseInt(chan, 16);\n    colChan = parseInt(colChan * (100 + percent) / 100);\n    colChan = colChan < 255 ? colChan : 255;\n    colChan = colChan.toString(16).length === 1\n      ? \"0\" + colChan.toString(16)\n      : colChan.toString(16);\n    return colChan\n  }\n\n  const RR = channel(color.substring(1,3));\n  const GG = channel(color.substring(3,5));\n  const BB = channel(color.substring(5,7));\n\n  return \"#\"+RR+GG+BB;\n}\n\nconst colors = Array(100).fill('').map(() =>  shadeColor(getRandomColor(), -20))\nconst newData = parseDataBy('ruleTotalSore')\n\nconst baseButtonStyles = {\n  padding: 4,\n  textAlign: 'left',\n  marginBottom: 6,\n  marginRight: 6,\n  border: 'none',\n  outline: 'none',\n  fontWeight: 'bold',\n}\n\nconst rules = Object.keys(newData[0]).filter(key => key !== 'commit')\nconst rulesActives = rules.reduce((acc, rule) => {\n  acc[rule] = true\n  return acc\n}, {})\n\n const App = () => {\n   const [data, setData] = React.useState(newData)\n   const [valueType, setValueType] = React.useState('ruleTotalSore')\n   const [activeRules, setActiveRules] = React.useState(rulesActives)\n   const [tagFilter, setTagFilter] = React.useState(null)\n   const [chartType, setChartType] = React.useState('area')\n   const [estimationsBasedOn, setEstimationsBasedOn] = React.useState('avairage')\n\n   const toggleRule = (id) => {\n    setTagFilter(null)\n    setActiveRules(prev => ({\n      ...prev,\n      [id]: !prev[id]\n    }))\n   }\n\n   const switchDataBy = (key) => {\n      setValueType(key)\n      setData(parseDataBy(key))\n   }\n\n   const toggleAll = () => {\n     setTagFilter(null)\n     setActiveRules(prev => {\n       const rulesKeys = Object.keys(prev)\n       const firstIsActive = !!prev[rulesKeys[0]]\n       return rulesKeys.reduce((rules, rule) => {\n         rules[rule] = !firstIsActive\n         return rules\n       }, {})\n     })\n   }\n\n   const toggleTag = (tag) => {\n     if (tagFilter === null || tagFilter !== tag) {\n       setTagFilter(tag)\n     } else {\n       setTagFilter(null)\n     }\n   }\n\n   const renderTooltip = ({payload}) => {\n    if (!payload || !payload.length) { return null }\n     return <div style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>\n      <h4 style={{ margin: 0, marginBottom: 5}}>{payload[0].payload.commit.date}</h4>\n      <h4 style={{ margin: 0, marginBottom: 15}}>\n        Total : {payload.reduce((totalScore, {value}) => totalScore + value, 0)}\n      </h4>\n      <p style={{ margin: 0, marginBottom: 5}}>{payload[0].payload.commit.name}</p>\n      <br/>\n        {payload.reverse().map(item => (\n          <div key={item.dataKey} style={{ display: 'flex', justifyContent:'center', fontSize: 12, marginBottom: 4}}>\n            <span style={{ backgroundColor: item.color, display: 'inline-block', width: 15, height: 15, borderRadius: 3, marginRight: 7}}></span>\n            <div style={{ flex: 1, marginRight: 25}}>\n              <span>{item.name.replace(/_/g, ' ')}</span>\n            </div>\n            <span style={{ fontWeight: 'bold'}}>{item.value}</span>\n          </div>\n        ))}\n      </div>\n   }\n\n  React.useEffect(() => {\n    if (tagFilter) {\n      setActiveRules(rules => Object.keys(rules).reduce((acc, rule) => {\n        if (result.tags[tagFilter].includes(rule)) {\n          acc[rule] = true\n        } else {\n          acc[rule] = false\n        }\n        return acc\n      }, {}))\n    }\n  }, [tagFilter])\n\n   return (\n     <React.Fragment>\n     {reportsLinks.length > 0 && (\n      <ul style={{ listStyle: 'none', display: 'flex' }}>\n        {reportsLinks.map(({ name, link }) => (\n          <li style={{ listStyle: 'none', marginRight: 10 }} key={link}>\n            <a\n              style={{\n                padding: '5px 10px',\n                textDecoration: 'none',\n                backgroundColor: '#F5F5F5',\n                fontWeight: 'bold',\n                color: '#000',\n                fontSize: 12,\n                textTransform: 'uppercase'\n              }}\n              href={link}\n            >\n              {name}\n            </a>\n          </li>\n        ))}\n      </ul>\n    )}\n      <div style={{display: 'flex', overflow: 'hidden', width: '100vw', height:'80vh'}}>\n        <div style={{width: '80vw', height:'80vh'}}>\n          <div style={{height:40, paddingLeft: 40}}>\n            <button\n                onClick={() => setChartType('area')}\n                style={{\n                  ...baseButtonStyles,\n                  backgroundColor: chartType === 'area' ? 'green' : '#F5F5F5',\n                  color: chartType === 'area' ? 'white' : 'grey'\n                }}\n              >\n                AREA CHART\n              </button>\n              <button\n                onClick={() => setChartType('line')}\n                style={{\n                  ...baseButtonStyles,\n                  backgroundColor: chartType === 'line' ? 'green' : '#F5F5F5',\n                  color: chartType === 'line' ? 'white' : 'grey'\n                }}\n              >\n                LINE CHART\n              </button>\n          </div>\n          {chartType === 'area' &&\n          <ResponsiveContainer width=\"100%\" height=\"90%\">\n            <AreaChart\n              width={500}\n              height={400}\n              data={data}\n              margin={{\n                top: 10,\n                right: 30,\n                left: 0,\n                bottom: 0,\n              }}\n            >\n              <CartesianGrid strokeDasharray=\"3 3\" />\n              <XAxis dataKey=\"commit\" />\n              <YAxis />\n              <Tooltip\n                content={renderTooltip}\n                itemStyle={{fontSize: 10, fontWeight: 'bold', fontFamily: 'sans-serif', height: 10, padding: 3}}\n                labelStyle={{fontSize: 16, fontWeight: 'bold', fontFamily: 'sans-serif'}}\n              />\n              {Object.keys(activeRules).map((rule, index) => activeRules[rule] &&\n                <Area\n                  type=\"monotone\"\n                  dataKey={rule}\n                  stackId=\"1\"\n                  stroke={colors[Object.keys(activeRules).indexOf(rule)]}\n                  fill={colors[Object.keys(activeRules).indexOf(rule)]} />\n              )}\n            </AreaChart>\n          </ResponsiveContainer>\n          }\n          {chartType === 'line' &&\n          <ResponsiveContainer width=\"100%\" height=\"90%\">\n            <LineChart\n              width={500}\n              height={400}\n              data={data}\n              margin={{\n                top: 10,\n                right: 30,\n                left: 0,\n                bottom: 0,\n              }}\n            >\n              <CartesianGrid strokeDasharray=\"3 3\" />\n              <XAxis dataKey=\"commit\" />\n              <YAxis />\n              <Tooltip\n                content={renderTooltip}\n                itemStyle={{fontSize: 10, fontWeight: 'bold', fontFamily: 'sans-serif', height: 10, padding: 3}}\n                labelStyle={{fontSize: 16, fontWeight: 'bold', fontFamily: 'sans-serif'}}\n              />\n              {Object.keys(activeRules).map((rule, index) => activeRules[rule] &&\n                <Line\n                  type=\"monotone\"\n                  dataKey={rule}\n                  stackId=\"1\"\n                  stroke={colors[Object.keys(activeRules).indexOf(rule)]}\n                  fill={colors[Object.keys(activeRules).indexOf(rule)]} />\n              )}\n            </LineChart>\n          </ResponsiveContainer>\n          }\n          </div>\n\n\n          <div style={{width: '20vw', minWidth: 400, height:'80vh', overflowY: 'auto', padding: 20}}>\n            <h3>Rules</h3>\n            {Object.keys(activeRules).map(rule =>\n              <button\n                key={rule}\n                onClick={() => toggleRule(rule)}\n                style={{\n                  ...baseButtonStyles,\n                  backgroundColor: activeRules[rule] ? 'green' : '#F5F5F5',\n                  color: activeRules[rule] ? 'white' : 'grey'\n                }}\n              >\n                {rule}\n              </button>\n            )}\n            <div style={{ marginTop: 15 }}>\n              <button onClick={() => toggleAll()}>TOGGLE ALL RULES</button>\n            </div>\n            <hr />\n            <h3>Tags</h3>\n            {Object.keys(result.tags).map(tag =>\n              <button\n                key={tag}\n                onClick={() => toggleTag(tag)}\n                style={{\n                  ...baseButtonStyles,\n                  display: 'inline-block',\n                  backgroundColor: tagFilter === tag ? 'green' : '#F5F5F5',\n                  color: tagFilter === tag ? 'white' : 'grey'\n                }}\n              >\n                {tag}\n              </button>\n            )}\n            <hr />\n            <h3>Display values</h3>\n            <button\n              onClick={() => switchDataBy('ruleTotalSore')}\n              style={{\n                ...baseButtonStyles,\n                display: 'inline-block',\n                backgroundColor: valueType === 'ruleTotalSore' ? 'green' : '#F5F5F5',\n                color: valueType === 'ruleTotalSore' ? 'white' : 'grey'\n              }}>\n                BY SCORE\n            </button>\n            <button\n              onClick={() => switchDataBy('occurences')}\n              style={{\n                ...baseButtonStyles,\n                display: 'inline-block',\n                backgroundColor: valueType === 'occurences' ? 'green' : '#F5F5F5',\n                color: valueType === 'occurences' ? 'white' : 'grey'\n              }}>\n                BY OCCURENCES\n            </button>\n            <hr />\n          </div>\n        </div>\n        <div style={{textAlign: 'center', maxWidth: 1600, margin: '0 auto'}}>\n          <hr />\n            <button\n              onClick={() => setEstimationsBasedOn('avairage')}\n              style={{\n                ...baseButtonStyles,\n                display: 'inline-block',\n                backgroundColor: estimationsBasedOn === 'avairage' ? 'green' : '#F5F5F5',\n                color: estimationsBasedOn === 'avairage' ? 'white' : 'grey'\n              }}>\n                AVERAGE ALL PERIODS\n            </button>\n            <button\n              onClick={() => setEstimationsBasedOn('lastPeriod')}\n              style={{\n                ...baseButtonStyles,\n                display: 'inline-block',\n                backgroundColor: estimationsBasedOn === 'lastPeriod' ? 'green' : '#F5F5F5',\n                color: estimationsBasedOn === 'lastPeriod' ? 'white' : 'grey'\n              }}>\n                LAST PERDIOD\n            </button>\n\n          <h2 style={{margin: 0, marginTop: 30}}>Current score : {result.enDateEstimlations.global.currentScore}</h2>\n          <h3 style={{margin: 0}}>Estimated date for full reimbursment:</h3>\n          <div style={{display: 'flex'}}>\n            <ReportDebtPaymentProjection period={result.enDateEstimlations.global[estimationsBasedOn]}/>\n          </div>\n          <div style={{textAlign: 'right', marginBottom: 200}}>\n            <table width=\"100%\" style={{textAlign: 'right', marginBottom: 200}}>\n              <thead>\n                <tr>\n                  <th style={{textAlign: 'left'}}>Rule ID</th>\n                  <th>Current score</th>\n                  <th>Debt points/month</th>\n                  <th>Days remaining to zero</th>\n                  <th>Estimated date to zero</th>\n                </tr>\n              </thead>\n              <tbody>\n                {Object.keys(result.enDateEstimlations.rules).map(ruleId => {\n                  const {\n                    tendencyMonth,\n                    daysToReachZero,\n                    estimatedendDate\n                  } = result.enDateEstimlations.rules[ruleId][estimationsBasedOn]\n                  const {currentScore} = result.enDateEstimlations.rules[ruleId]\n                  return (\n                    <tr key={ruleId} style={{color: tendencyMonth >= 0 ? 'red' : '#222'}}>\n                      <td style={{textAlign: 'left'}}>{ruleId}</td>\n                      <td>{currentScore} points</td>\n                      <td>{Math.round(tendencyMonth*100)/100} points/month</td>\n                      <td>{daysToReachZero ? daysToReachZero + ' days' : 'never'} </td>\n                      <td>{estimatedendDate === 'never' ? estimatedendDate : new Date(estimatedendDate).toDateString()}</td>\n                    </tr>\n                  )\n                })}\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </React.Fragment>\n    );\n}\n\nReactDOM.render(<App/>, document.getElementById('app'));\n</script>\n</body>\n</html>\n");
};
},{}],"../lib/reporters/buildWalkReport.ts":[function(require,module,exports) {
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

var chartTemplate_1 = __importDefault(require("./chartTemplate"));

var cachePath = "".concat(process.cwd(), "/node_modules/.cache/debt-collector");

var buildWalkReport = function (userConfig, tags, results, enDateEstimlations, reportName, reportsLinks) {
  setTimeout(function () {
    // waiting for file system to correctly switch all files after checkout
    var resultPath = "".concat(cachePath, "/report-").concat(reportName, ".html");
    var jsonResults = JSON.stringify({
      initialConfig: userConfig,
      reportsLinks: reportsLinks,
      tags: tags,
      results: results,
      enDateEstimlations: enDateEstimlations
    }, null, 2);
    var data = (0, chartTemplate_1.default)(jsonResults);
    fs_1.default.mkdir(cachePath, {
      recursive: true
    }, function (err) {
      if (err) throw err;
      fs_1.default.writeFileSync(resultPath, data);
    });
  }, 330);
};

exports.default = buildWalkReport;
},{"./chartTemplate":"../lib/reporters/chartTemplate.ts"}],"../lib/reporters/packagesEntriesTemplate.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return "\n<!DOCTYPE html>\n<html>\n<head>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.14.0/babel.min.js\"></script>\n    <script type=\"text/babel\" data-presets=\"es2017, stage-3\" data-plugins=\"syntax-async-functions,transform-class-properties\"></script>\n    <script src=\"https://unpkg.com/react/umd/react.production.min.js\"></script>\n    <script src=\"https://unpkg.com/react-dom/umd/react-dom.production.min.js\"></script>\n    <script src=\"https://unpkg.com/prop-types/prop-types.min.js\"></script>\n     <style type=\"text/css\">\n      body {\n        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n      }\n    </style>\n</head>\n<body>\n<div id=\"app\"></div>\n<script type=\"text/babel\">\n\nconst entries = ".concat(data, "\nconst App = () => (\n    <ul style={{ listStyle: 'none', display: 'flex' }}>\n      {entries.map(({ name, link }) => (\n        <li style={{ listStyle: 'none', marginRight: 10 }} key={link}>\n          <a\n            style={{\n              padding: '5px 10px',\n              textDecoration: 'none',\n              backgroundColor: '#F5F5F5',\n              fontWeight: 'bold',\n              color: '#000',\n              fontSize: 12,\n              textTransform: 'uppercase'\n            }}\n            href={link}\n          >\n            {name}\n          </a>\n        </li>\n      ))}\n    </ul>\n  )\n\nReactDOM.render(<App/>, document.getElementById('app'));\n</script>\n</body>\n</html>\n");
};
},{}],"../lib/reporters/buildWalkEntries.ts":[function(require,module,exports) {
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

var packagesEntriesTemplate_1 = __importDefault(require("./packagesEntriesTemplate"));

var cachePath = "".concat(process.cwd(), "/node_modules/.cache/debt-collector");

var buildWalkEntriesReport = function (reportsLinks, openReport) {
  setTimeout(function () {
    // waiting for file system to correctly switch all files after checkout
    var resultPath = "".concat(cachePath, "/index.html");
    var jsonResults = JSON.stringify(reportsLinks, null, 2);
    var data = (0, packagesEntriesTemplate_1.default)(jsonResults);
    fs_1.default.mkdir(cachePath, {
      recursive: true
    }, function (err) {
      if (err) throw err;
      fs_1.default.writeFileSync(resultPath, data);

      if (openReport) {
        try {
          (0, child_process_1.spawn)('open', [resultPath]);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('tried to open file but could not... it may be because we are in a virtual env');
        }
      }
    });
  }, 330);
};

exports.default = buildWalkEntriesReport;
},{"./packagesEntriesTemplate":"../lib/reporters/packagesEntriesTemplate.ts"}],"../lib/config/getTagListFromConfig.ts":[function(require,module,exports) {
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
  var allRules = (config === null || config === void 0 ? void 0 : config.eslintRules) ? __spreadArray(__spreadArray([], __read(config.fileRules), false), __read(config.eslintRules), false) : config.fileRules;
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
},{}],"../lib/git/gitUtils.ts":[function(require,module,exports) {
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

var getChangedFilesSinceRev = function (rev, commonAncestor) {
  if (commonAncestor === void 0) {
    commonAncestor = true;
  }

  return __awaiter(void 0, void 0, Promise, function () {
    var results, commit, rootGitDir, currentGitDir, changedFilesSinceRev;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!commonAncestor) return [3
          /*break*/
          , 3];
          return [4
          /*yield*/
          , git.raw(['merge-base', rev, 'HEAD'])];

        case 1:
          commit = _a.sent();
          return [4
          /*yield*/
          , git.diff([commit.replace('\n', ''), '--name-status', '--no-renames'])];

        case 2:
          results = _a.sent();
          return [3
          /*break*/
          , 5];

        case 3:
          return [4
          /*yield*/
          , git.diff([rev, '--name-status', '--no-renames'])];

        case 4:
          results = _a.sent();
          _a.label = 5;

        case 5:
          return [4
          /*yield*/
          , git.revparse(['--show-toplevel'])];

        case 6:
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

var getFileList = function (config, compare, globOption, commonAncestor) {
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
                  , (0, git_1.getChangedFilesSinceRev)(compare, commonAncestor) // const ignoreDeletedfiles = changedFiles.filter(({ status }) => status === 'A' || status === 'M')
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

        if (fileList.length === 0) {
          resolve(results);
        }

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
},{"./getFileResult":"../lib/results/getFileResult.ts","../filters/filterRules":"../lib/filters/filterRules.ts"}],"walk/getCommitResult.ts":[function(require,module,exports) {
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
exports.getCommitResult = exports.formatWalkResults = void 0;

var fs_1 = __importDefault(require("fs"));

var path_1 = __importDefault(require("path"));

var minimatch_1 = __importDefault(require("minimatch"));

var getFilesList_1 = __importDefault(require("../../lib/filters/getFilesList"));

var checkFileList_1 = __importDefault(require("../../lib/results/checkFileList"));

var formatWalkResults = function (config, results, globFilter, hasPackagesConfig) {
  var _a = config.fileRules,
      fileRules = _a === void 0 ? [] : _a,
      _b = config.eslintRules,
      eslintRules = _b === void 0 ? [] : _b;

  var allRulesIdInConfig = __spreadArray(__spreadArray([], __read(fileRules.map(function (rule) {
    return rule;
  })), false), __read(eslintRules.map(function (rule) {
    return rule;
  })), false);

  var revisionResultsArr = results.map(function (_a) {
    var rev = _a.rev,
        filesResults = _a.results;
    var filteredResults = filesResults;

    if (hasPackagesConfig) {
      filteredResults = Object.keys(filesResults).filter(function (filePath) {
        return (0, minimatch_1.default)(filePath, globFilter.replace(/^\.\//, ''));
      }).reduce(function (acc, filePath) {
        acc[filePath] = filesResults[filePath];
        return acc;
      }, {});
    }

    var totalScore = 0;
    var rulesScores = allRulesIdInConfig.reduce(function (acc, rule) {
      acc[rule.id] = {
        ruleId: rule.id,
        ruleTitle: rule.title,
        debtScore: rule.debtScore,
        ruleTotalSore: 0,
        occurences: 0
      };
      return acc;
    }, {});
    Object.keys(filteredResults).forEach(function (filePath) {
      var fileResults = filesResults[filePath];
      fileResults.brokenRules.forEach(function (brokenRule) {
        var ruleId = brokenRule.ruleId,
            occurences = brokenRule.occurences,
            ruleTotalSore = brokenRule.ruleTotalSore;
        rulesScores[ruleId].occurences += occurences;
        rulesScores[ruleId].ruleTotalSore += ruleTotalSore;
        totalScore += ruleTotalSore;
      });
    });
    var brokenRules = Object.values(rulesScores);
    return __assign(__assign({}, rev), {
      totalScore: totalScore,
      brokenRules: brokenRules
    });
  });
  return revisionResultsArr;
};

exports.formatWalkResults = formatWalkResults;

var getCommitResult = function (previousResult, previousHash, sanitizedConfig, include) {
  return __awaiter(void 0, void 0, Promise, function () {
    var fileList, fileResults, mergedResults;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , (0, getFilesList_1.default)(sanitizedConfig, previousHash, include) // test changed files
          ];

        case 1:
          fileList = _a.sent();
          return [4
          /*yield*/
          , (0, checkFileList_1.default)(fileList, sanitizedConfig, null, null, function () {
            return null;
          }) // create an object of file results
          ];

        case 2:
          fileResults = _a.sent();
          mergedResults = fileResults.reduce(function (acc, res) {
            acc[res.filePath] = res;
            return acc;
          }, {});

          if (previousResult) {
            // merging previous results with the new ones
            mergedResults = __assign(__assign({}, previousResult), mergedResults); // testing for deleted, moved or rennamed files, and removing them from the results

            mergedResults = Object.keys(mergedResults).reduce(function (acc, filePath) {
              var fileStillExist = fs_1.default.existsSync(path_1.default.resolve(process.cwd(), "./".concat(filePath)));

              if (fileStillExist) {
                acc[filePath] = mergedResults[filePath];
              }

              return acc;
            }, {});
          }

          return [2
          /*return*/
          , mergedResults];
      }
    });
  });
};

exports.getCommitResult = getCommitResult;
},{"../../lib/filters/getFilesList":"../lib/filters/getFilesList.ts","../../lib/results/checkFileList":"../lib/results/checkFileList.ts"}],"walk/getEndDatesEstimations.ts":[function(require,module,exports) {
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

var getDateRulesDatas = function (_a) {
  var _b, _c;

  var initialConfig = _a.initialConfig,
      results = _a.results;

  var allRules = __spreadArray(__spreadArray([], __read((_b = initialConfig.fileRules) !== null && _b !== void 0 ? _b : []), false), __read((_c = initialConfig.eslintRules) !== null && _c !== void 0 ? _c : []), false).map(function (rule) {
    return rule.id;
  });

  var rulesDateScoreObj = allRules.reduce(function (acc, ruleId) {
    acc[ruleId] = results.map(function (_a) {
      var date = _a.date,
          brokenRules = _a.brokenRules;
      var rule = brokenRules.find(function (_a) {
        var id = _a.ruleId;
        return id === ruleId;
      });
      var score = rule ? rule.ruleTotalSore : 0;
      return {
        date: date,
        score: score
      };
    });
    return acc;
  }, {});
  var global = results.map(function (_a) {
    var date = _a.date,
        totalScore = _a.totalScore;
    return {
      date: date,
      score: totalScore
    };
  });
  return {
    rules: rulesDateScoreObj,
    global: global
  };
};

var getSpeedEstimation = function (arr) {
  var trendCalculation = arr.reduce(function (acc, _a) {
    var date = _a.date,
        score = _a.score;

    if (!acc.prevDate && !acc.prevScore) {
      acc.prevDate = date;
      acc.prevScore = score;
      acc.trendArr = [];
      return acc;
    }

    var diff = score - acc.prevScore;
    var diffDays = (new Date(date) - new Date(acc.prevDate)) / (1000 * 60 * 60 * 24);
    var diffScoreByDay = diff / diffDays;
    acc.prevDate = date;
    acc.prevScore = score;
    acc.trendArr.push(diffScoreByDay);
    return acc;
  }, {});

  var addDays = function (theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  };

  var avairageTendencyDay = trendCalculation.trendArr.reduce(function (acc, monthTrend) {
    return acc + monthTrend;
  }, 0) / trendCalculation.trendArr.length;
  var avairageTendencyMonth = avairageTendencyDay * 30.5;
  var avairageDaysToReachZero = avairageTendencyMonth <= 0 ? Math.round(Math.abs(trendCalculation.prevScore / avairageTendencyDay)) : Infinity;
  var lastCommitDate = new Date(trendCalculation.prevDate);
  var avairageEndDebtDate = avairageTendencyDay >= 0 ? 'never' : addDays(new Date(lastCommitDate), avairageDaysToReachZero);
  var lastPeriodTendencyDay = trendCalculation.trendArr[trendCalculation.trendArr.length - 1];
  var lastPeriodDaysToReachZero = lastPeriodTendencyDay <= 0 ? Math.round(Math.abs(trendCalculation.prevScore / lastPeriodTendencyDay)) : Infinity;
  var lastPeriodEndDebtDate = lastPeriodTendencyDay >= 0 ? 'never' : addDays(new Date(lastCommitDate), lastPeriodDaysToReachZero);
  return {
    currentScore: trendCalculation.prevScore,
    avairage: {
      tendencyDay: avairageTendencyDay,
      tendencyMonth: avairageTendencyMonth,
      daysToReachZero: avairageDaysToReachZero,
      estimatedendDate: avairageEndDebtDate
    },
    lastPeriod: {
      tendencyDay: lastPeriodTendencyDay,
      tendencyMonth: lastPeriodTendencyDay * 30.5,
      daysToReachZero: lastPeriodDaysToReachZero,
      estimatedendDate: lastPeriodEndDebtDate
    }
  };
};

var getEndDatesEstimations = function (results) {
  var resultRuleDatas = getDateRulesDatas(results);
  var endDateEstimation = {};
  endDateEstimation.rules = Object.keys(resultRuleDatas.rules).reduce(function (acc, key) {
    acc[key] = getSpeedEstimation(resultRuleDatas.rules[key]);
    return acc;
  }, {});
  endDateEstimation.global = getSpeedEstimation(resultRuleDatas.global);
  return endDateEstimation;
};

exports.default = getEndDatesEstimations;
},{}],"walk/index.tsx":[function(require,module,exports) {
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

var ink_task_list_1 = require("ink-task-list");

var ink_1 = require("ink");

var config_1 = require("../../lib/config");

var buildWalkReport_1 = __importDefault(require("../../lib/reporters/buildWalkReport"));

var buildWalkEntries_1 = __importDefault(require("../../lib/reporters/buildWalkEntries"));

var getTagListFromConfig_1 = __importDefault(require("../../lib/config/getTagListFromConfig"));

var git_1 = require("../../lib/git");

var getCommitResult_1 = require("./getCommitResult");

var getEndDatesEstimations_1 = __importDefault(require("./getEndDatesEstimations"));

var useTaskList = function (_a) {
  var isConfigValid = _a.isConfigValid,
      isReady = _a.isReady,
      isHistoryDirty = _a.isHistoryDirty,
      isFinished = _a.isFinished,
      revlength = _a.revlength,
      currentCommit = _a.currentCommit,
      isGitReady = _a.isGitReady;

  var checkGitHistoryState = function () {
    if (!isGitReady) return 'loading';
    if (isGitReady && !isHistoryDirty) return 'success';
    if (isGitReady && isHistoryDirty) return 'error';
    return 'pending';
  }();

  var checkGitHistory = {
    state: checkGitHistoryState,
    label: 'check git history',
    status: checkGitHistoryState === 'loading' ? 'checking git history' : checkGitHistoryState
  };

  var configTaskState = function () {
    if (isConfigValid === null) return 'loading';
    if (isConfigValid && !isHistoryDirty) return 'success';
    if (!isConfigValid || isHistoryDirty) return 'error';
    return 'pending';
  }();

  var configTask = {
    state: configTaskState,
    label: 'load and validate configuration',
    status: configTaskState === 'loading' ? 'validating configuration' : configTaskState
  };

  var walkTaskState = function () {
    if (!isReady && configTaskState === 'success') return 'loading';
    if (isReady && !isHistoryDirty) return 'success';
    if (isHistoryDirty) return 'error';
    return 'pending';
  }();

  var walkTask = {
    state: walkTaskState,
    label: "checking the last ".concat(revlength, " commits"),
    status: walkTaskState === 'loading' ? "checking commit ".concat(currentCommit.index, "/").concat(revlength, " : ").concat(currentCommit.commit) : walkTaskState
  };

  var reportTaskState = function () {
    if (walkTaskState !== 'success' && walkTaskState !== 'error') return 'pending';
    if (walkTaskState === 'success' && !isFinished) return 'loading';
    if (walkTaskState === 'success' && isFinished) return 'success';
    return 'error';
  }();

  var reportTask = {
    state: reportTaskState,
    label: "build a report",
    status: reportTaskState === 'loading' ? "building html report" : walkTaskState
  };
  return [checkGitHistory, configTask, walkTask, reportTask];
};

function Walk(_a) {
  var _this = this;

  var _b;

  var config = _a.config,
      _c = _a.include,
      include = _c === void 0 ? null : _c,
      _d = _a.openReport,
      openReport = _d === void 0 ? false : _d;

  var _e = __read((0, react_1.useState)({}), 2),
      results = _e[0],
      setResults = _e[1];

  var _f = __read((0, react_1.useState)({
    commit: '',
    index: 0
  }), 2),
      currentCommit = _f[0],
      setCurrentCommit = _f[1];

  var _g = __read((0, react_1.useState)(false), 2),
      isReady = _g[0],
      setIsReady = _g[1];

  var _h = __read((0, react_1.useState)({}), 2),
      tags = _h[0],
      setTags = _h[1];

  var _j = __read((0, react_1.useState)(false), 2),
      isFinished = _j[0],
      setIsFinished = _j[1];

  var _k = (0, config_1.useValidatedConfig)(config),
      isConfigValid = _k.isConfigValid,
      sanitizedConfig = _k.sanitizedConfig,
      userConfig = _k.userConfig;

  var _l = (0, git_1.useGitUtils)(sanitizedConfig),
      isGitReady = _l.isGitReady,
      walkCommits = _l.walkCommits,
      checkoutTo = _l.checkoutTo,
      currentBranch = _l.currentBranch,
      revList = _l.revList,
      isHistoryDirty = _l.isHistoryDirty;

  var revlength = isConfigValid && ((_b = sanitizedConfig === null || sanitizedConfig === void 0 ? void 0 : sanitizedConfig.walkConfig) === null || _b === void 0 ? void 0 : _b.limit) ? sanitizedConfig.walkConfig.limit : '?';
  var tasks = useTaskList({
    isConfigValid: isConfigValid,
    isReady: isReady,
    isHistoryDirty: isHistoryDirty,
    isFinished: isFinished,
    revlength: revlength,
    currentCommit: currentCommit,
    isGitReady: isGitReady
  });
  (0, react_1.useEffect)(function () {
    (function () {
      return __awaiter(_this, void 0, void 0, function () {
        var walkResults;

        var _this = this;

        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(isConfigValid && isGitReady && !isHistoryDirty)) return [3
              /*break*/
              , 2];
              setTags((0, getTagListFromConfig_1.default)(sanitizedConfig));
              return [4
              /*yield*/
              , walkCommits(revList.reverse(), {
                onCommitChange: function (_a) {
                  var rev = _a.rev,
                      index = _a.index,
                      previousResult = _a.previousResult;
                  return __awaiter(_this, void 0, void 0, function () {
                    var result;

                    var _b;

                    return __generator(this, function (_c) {
                      switch (_c.label) {
                        case 0:
                          setCurrentCommit({
                            commit: rev.name,
                            index: index + 1
                          });
                          return [4
                          /*yield*/
                          , (0, getCommitResult_1.getCommitResult)(previousResult === null || previousResult === void 0 ? void 0 : previousResult.results, (_b = previousResult === null || previousResult === void 0 ? void 0 : previousResult.rev) === null || _b === void 0 ? void 0 : _b.hash, sanitizedConfig, include)];

                        case 1:
                          result = _c.sent();
                          return [2
                          /*return*/
                          , result];
                      }
                    });
                  });
                },
                onError: function (error) {
                  console.log(error);
                },
                onEnd: function (results) {
                  return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                      switch (_a.label) {
                        case 0:
                          return [4
                          /*yield*/
                          , checkoutTo(currentBranch)];

                        case 1:
                          _a.sent();

                          return [2
                          /*return*/
                          , results];
                      }
                    });
                  });
                }
              })];

            case 1:
              walkResults = _a.sent();
              setResults(walkResults);
              setIsReady(true);
              _a.label = 2;

            case 2:
              return [2
              /*return*/
              ];
          }
        });
      });
    })();
  }, [isConfigValid, isGitReady, isHistoryDirty]);
  (0, react_1.useEffect)(function () {
    (function () {
      return __awaiter(_this, void 0, void 0, function () {
        var hasPackagesConfig_1, reports_1, reportsLinks_1;

        var _a, _b;

        return __generator(this, function (_c) {
          if (isReady) {
            hasPackagesConfig_1 = isConfigValid && !!((_b = (_a = sanitizedConfig === null || sanitizedConfig === void 0 ? void 0 : sanitizedConfig.walkConfig) === null || _a === void 0 ? void 0 : _a.report) === null || _b === void 0 ? void 0 : _b.packages);
            reports_1 = hasPackagesConfig_1 ? sanitizedConfig.walkConfig.report.packages : {
              global: sanitizedConfig.include
            };
            reportsLinks_1 = Object.keys(reports_1).map(function (report) {
              return {
                name: report,
                link: "./report-".concat(report, ".html")
              };
            });
            Object.keys(reports_1).forEach(function (reportName) {
              var formatedResult = (0, getCommitResult_1.formatWalkResults)(sanitizedConfig, results, reports_1[reportName], hasPackagesConfig_1);
              var endDateEstimations = (0, getEndDatesEstimations_1.default)({
                initialConfig: userConfig,
                results: formatedResult
              });
              (0, buildWalkReport_1.default)(userConfig, tags, formatedResult, endDateEstimations, reportName, reportsLinks_1);
            });
            (0, buildWalkEntries_1.default)(reportsLinks_1, openReport);
            setIsFinished(true);
          }

          return [2
          /*return*/
          ];
        });
      });
    })();
  }, [isReady]);
  return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(ink_task_list_1.TaskList, null, tasks.map(function (task) {
    return react_1.default.createElement(ink_task_list_1.Task, {
      key: task.label,
      state: task.state,
      label: task.label,
      status: task.status
    });
  })), isHistoryDirty && react_1.default.createElement(ink_1.Text, {
    color: "red"
  }, "Your have uncommited changes, please commit or stash them"));
}

Walk.propTypes = {
  config: prop_types_1.default.string,
  include: prop_types_1.default.string,
  openReport: prop_types_1.default.bool
};
Walk.shortFlags = {
  config: 'c',
  include: 'f'
};
exports.default = Walk;
},{"../../lib/config":"../lib/config/index.ts","../../lib/reporters/buildWalkReport":"../lib/reporters/buildWalkReport.ts","../../lib/reporters/buildWalkEntries":"../lib/reporters/buildWalkEntries.ts","../../lib/config/getTagListFromConfig":"../lib/config/getTagListFromConfig.ts","../../lib/git":"../lib/git/index.ts","./getCommitResult":"walk/getCommitResult.ts","./getEndDatesEstimations":"walk/getEndDatesEstimations.ts"}]},{},["walk/index.tsx"], null)
//# sourceMappingURL=/walk/index.js.map