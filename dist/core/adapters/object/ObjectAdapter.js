'use strict';
var __assign =
    (this && this.__assign) ||
    function() {
        __assign =
            Object.assign ||
            function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                        if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : new P(function(resolve) {
                          resolve(result.value);
                      }).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
var __generator =
    (this && this.__generator) ||
    function(thisArg, body) {
        var _ = {
                label: 0,
                sent: function() {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function() {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function(v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.');
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y['return']
                                    : op[0]
                                    ? y['throw'] ||
                                      ((t = y['return']) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
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
                            if (
                                !((t = _.trys),
                                (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
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
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
Object.defineProperty(exports, '__esModule', { value: true });
var utils_1 = require('../../utils');
var ObjectAdapter = (function() {
    function ObjectAdapter(options) {
        if (options === void 0) {
            options = {};
        }
        this.options = {
            generateId: true,
            defaultIdAttribute: 'id',
        };
        this.idCounter = new Map();
        if (options.generateId !== undefined) {
            this.options.generateId = options.generateId;
        }
        if (options.defaultIdAttribute !== undefined) {
            this.options.defaultIdAttribute = options.defaultIdAttribute;
        }
    }
    ObjectAdapter.prototype.make = function(objects, context) {
        return __awaiter(this, void 0, void 0, function() {
            var type;
            return __generator(this, function(_a) {
                type = context.__type;
                return [
                    2,
                    objects.map(function(object) {
                        var created;
                        if (utils_1.isFunction(type)) {
                            created = new type();
                        } else {
                            created = {};
                        }
                        for (var key in object) {
                            created[key] = object[key];
                        }
                        return created;
                    }),
                ];
            });
        });
    };
    ObjectAdapter.prototype.create = function(objects, context) {
        return __awaiter(this, void 0, void 0, function() {
            var __type, idAttribute, generateId, idKey_1;
            var _this = this;
            return __generator(this, function(_a) {
                (__type = context.__type), (idAttribute = context.idAttribute);
                generateId =
                    context.generateId !== undefined
                        ? context.generateId
                        : this.options.generateId;
                if (generateId) {
                    idKey_1 = idAttribute || this.options.defaultIdAttribute;
                    objects = objects.map(function(entity) {
                        var _a;
                        return __assign(
                            ((_a = {}),
                            (_a[idKey_1] = _this.getNextId(__type)),
                            _a),
                            entity,
                        );
                    });
                }
                return [2, objects];
            });
        });
    };
    ObjectAdapter.prototype.getNextId = function(entity) {
        if (!this.idCounter.has(entity)) {
            this.idCounter.set(entity, 0);
        }
        var currentId = this.idCounter.get(entity) || 0;
        var nextId = currentId + 1;
        this.idCounter.set(entity, nextId);
        return nextId;
    };
    return ObjectAdapter;
})();
exports.ObjectAdapter = ObjectAdapter;
