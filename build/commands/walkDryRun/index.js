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
},{"./useValidatedConfig":"../lib/config/useValidatedConfig.ts"}],"../lib/git/gitUtils.ts":[function(require,module,exports) {
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
          , git.diff([rev, '--name-status'])];

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
},{}],"walkDryRun/index.tsx":[function(require,module,exports) {
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

var prop_types_1 = __importDefault(require("prop-types"));

var react_1 = __importStar(require("react"));

var ink_1 = require("ink");

var config_1 = require("../../lib/config");

var gitUtils_1 = require("../../lib/git/gitUtils");

function Walk(_a) {
  var _this = this;

  var _b = _a.revlength,
      revlength = _b === void 0 ? 10 : _b,
      config = _a.config,
      _c = _a.include,
      include = _c === void 0 ? null : _c;

  var _d = __read((0, react_1.useState)(null), 2),
      results = _d[0],
      setResults = _d[1];

  var _e = __read((0, react_1.useState)(null), 2),
      parsedResult = _e[0],
      setParsedResult = _e[1];

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

  var _j = (0, config_1.useValidatedConfig)(config),
      isConfigValid = _j.isConfigValid,
      sanitizedConfig = _j.sanitizedConfig,
      configErrors = _j.configErrors,
      userConfig = _j.userConfig;

  (0, react_1.useEffect)(function () {
    var _a, _b, _c;

    if (isConfigValid && ((_a = sanitizedConfig === null || sanitizedConfig === void 0 ? void 0 : sanitizedConfig.walkConfig) === null || _a === void 0 ? void 0 : _a.gitCommand) && ((_b = sanitizedConfig === null || sanitizedConfig === void 0 ? void 0 : sanitizedConfig.walkConfig) === null || _b === void 0 ? void 0 : _b.parser) && ((_c = sanitizedConfig === null || sanitizedConfig === void 0 ? void 0 : sanitizedConfig.walkConfig) === null || _c === void 0 ? void 0 : _c.limit)) {
      (function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _a, gitCommand, parser, limit, revList, result, parsedResults, limitedParsedResults;

          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _a = sanitizedConfig.walkConfig, gitCommand = _a.gitCommand, parser = _a.parser, limit = _a.limit;
                return [4
                /*yield*/
                , (0, gitUtils_1.getRevList)(gitCommand, parser, limit)];

              case 1:
                revList = _b.sent();
                return [4
                /*yield*/
                , (0, gitUtils_1.execWalkCommand)(gitCommand)];

              case 2:
                result = _b.sent();
                parsedResults = parser(result);
                limitedParsedResults = parsedResults.slice(0, sanitizedConfig.walkConfig.limit);
                setResults("".concat(result.substring(0, 2000), "..."));
                setParsedResult(limitedParsedResults);
                return [2
                /*return*/
                ];
            }
          });
        });
      })();
    }
  }, [isConfigValid]);
  return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(ink_1.Text, null), react_1.default.createElement(ink_1.Text, {
    bold: true,
    backgroundColor: "red"
  }, "Truncated result of the command : "), react_1.default.createElement(ink_1.Text, null, results), react_1.default.createElement(ink_1.Text, null), react_1.default.createElement(ink_1.Text, {
    bold: true,
    backgroundColor: "red"
  }, "Result of the parser with limit : "), react_1.default.createElement(ink_1.Text, null, JSON.stringify(parsedResult, null, 2)));
}

Walk.propTypes = {
  revlength: prop_types_1.default.number,
  config: prop_types_1.default.string,
  include: prop_types_1.default.string
};
Walk.shortFlags = {
  revlength: 'n',
  config: 'c',
  include: 'f'
};
exports.default = Walk;
},{"../../lib/config":"../lib/config/index.ts","../../lib/git/gitUtils":"../lib/git/gitUtils.ts"}]},{},["walkDryRun/index.tsx"], null)
//# sourceMappingURL=/walkDryRun/index.js.map