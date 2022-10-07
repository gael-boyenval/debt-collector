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
})({"../lib/git/gitUtils.ts":[function(require,module,exports) {
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
exports.getMostModifiedFiles = exports.getChangedFilesSinceRev = exports.walkCommits = exports.getRevList = exports.execWalkCommand = exports.getCurrentBranch = exports.checkoutTo = exports.getIsHistoryDirty = void 0;
/* eslint-disable no-await-in-loop, no-restricted-syntax */

var path_1 = __importDefault(require("path"));

var simple_git_1 = __importDefault(require("simple-git"));

var minimatch_1 = __importDefault(require("minimatch"));

var queue_promise_1 = __importDefault(require("queue-promise"));

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

var daysFromNow = function (date) {
  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  return datediff(new Date(date), Date.now());
};

var getFileChanges = function (file, sinceDays) {
  if (sinceDays === void 0) {
    sinceDays = 365;
  }

  return __awaiter(void 0, void 0, void 0, function () {
    var fileResult, err_1, changes, lastModified, firstCommitDate, changesSince, sinceBaseRatio, changeFrequency, bugs, bugFrequency;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2,, 3]);

          return [4
          /*yield*/
          , git.raw(['log', '--pretty=format:%s|%ad', // `--since="${sinceDays} days ago"`,
          '--follow', '-M', file])];

        case 1:
          fileResult = _a.sent();
          return [3
          /*break*/
          , 3];

        case 2:
          err_1 = _a.sent();
          console.log(err_1);
          return [2
          /*return*/
          , null];

        case 3:
          changes = fileResult.split('\n').filter(function (commit) {
            return commit !== '';
          });
          lastModified = changes[0].split('|')[1];
          firstCommitDate = changes.reverse()[0].split('|')[1];
          changesSince = changes.filter(function (commit) {
            var date = commit.split('|')[1];
            return daysFromNow(date) <= sinceDays;
          });
          sinceBaseRatio = daysFromNow(firstCommitDate) >= sinceDays ? 1 : daysFromNow(firstCommitDate) / sinceDays;
          changeFrequency = changesSince.length / sinceBaseRatio;
          bugs = changesSince.filter(function (change) {
            return change.includes(':bug:');
          });
          bugFrequency = bugs.length / sinceBaseRatio;
          return [2
          /*return*/
          , {
            file: file,
            changes: changesSince.length,
            bugs: bugs.length,
            changeFrequency: changeFrequency,
            bugFrequency: bugFrequency,
            creationDate: daysFromNow(firstCommitDate),
            lastModified: daysFromNow(lastModified)
          }];
      }
    });
  });
};

var getMostModifiedFiles = function () {
  return __awaiter(void 0, void 0, Promise, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , new Promise(function (resolve, reject) {
        console.log('new algo');
        git.raw(['ls-tree', 'next', '-r', '--name-only']).then(function (allTrackedFiles) {
          var formated = allTrackedFiles.split('\n').filter(function (file) {
            return file !== '';
          }).filter(function (file) {
            return (0, minimatch_1.default)(file, 'packages/app-one-catalog/src/redux/**/*');
          });
          var queue = new queue_promise_1.default({
            concurrent: 100,
            interval: 0
          });
          var results = [];
          var count = 0;
          var formatedlength = formated.length;

          if (formated.length === 0) {
            resolve([]);
          }

          queue.enqueue(formated.map(function (file) {
            return function () {
              return getFileChanges(file);
            };
          }));
          queue.on('resolve', function (data) {
            count += 1;
            console.log("".concat(count, " / ").concat(formatedlength));
            if (data) results.push(data);
            if (!data) console.log('a file failed');
          });
          queue.on('end', function () {
            var formatResults = results.sort(function (file1, file2) {
              if (file1.changes > file2.changes) return -1;
              if (file1.changes < file2.changes) return 1;
              return 0;
            }).slice(0, 300).reduce(function (acc, item) {
              acc[item.file] = {
                changes: item.changes,
                bugs: item.bugs,
                changeFrequency: item.changeFrequency,
                bugFrequency: item.bugFrequency,
                creationDate: item.creationDate,
                lastModified: item.lastModified
              };
              return acc;
            }, {});
            console.log(formatResults);
            resolve(formatResults);
          });
        }).catch(function (err) {
          console.log(err);
        }); // const formated = files
        //   .split('\n')
        //   .filter((file) => file !== '')
        //   .reduce((acc, file) => {
        //     if (!acc[file]) {
        //       acc[file] = 1
        //     } else {
        //       acc[file] += 1
        //     }
        //     return acc
        //   }, {})
        // const sorted = Object.keys(formated).sort((file1, file2) => {
        //   if (formated[file1] > formated[file2]) return -1
        //   if (formated[file1] < formated[file2]) return 1
        //   return 0
        // })
        // const sortedWithScore = sorted
        //   .filter((file) => minimatch(file, 'packages/*/src/**/*'))
        //   .filter((file) => fs.existsSync(file))
        //   .slice(0, 350)
        //   .reduce((acc, file) => {
        //     const lib = file.split('/')[1]
        //     const relativefileName = file.replace(`packages/${lib}`, '')
        //     if (!acc[lib]) {
        //       acc[lib] = {}
        //     }
        //     acc[lib][relativefileName] = formated[file]
        //     return acc
        //   }, {})
        // console.log(formated)
        // return formated
      })];
    });
  });
};

exports.getMostModifiedFiles = getMostModifiedFiles;
},{}],"oftenChanged/index.tsx":[function(require,module,exports) {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var react_1 = __importStar(require("react")); // import PropTypes from 'prop-types';


var ink_1 = require("ink");

var gitUtils_1 = require("../../lib/git/gitUtils");

function OftenChanged() {
  var _this = this;

  var _a = __read((0, react_1.useState)(null), 2),
      mostModifiedFiles = _a[0],
      setMostModifiedFiles = _a[1];

  (0, react_1.useEffect)(function () {
    var setMost = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var files;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , (0, gitUtils_1.getMostModifiedFiles)()];

            case 1:
              files = _a.sent();
              setMostModifiedFiles(files);
              return [2
              /*return*/
              ];
          }
        });
      });
    };

    setMost();
  }, []);
  return react_1.default.createElement(ink_1.Text, null, "Hello");
}

exports.default = OftenChanged;
},{"../../lib/git/gitUtils":"../lib/git/gitUtils.ts"}]},{},["oftenChanged/index.tsx"], null)
//# sourceMappingURL=/oftenChanged/index.js.map