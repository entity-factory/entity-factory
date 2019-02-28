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
var faker = require('faker');
var utils_1 = require('../utils');
var BlueprintBuilder = (function() {
    function BlueprintBuilder(profile, factory, adapter) {
        this.profile = profile;
        this.factory = factory;
        this.adapter = adapter;
        this.stateFactories = [];
        this.partial = {};
        this.stateFactories.push(this.getStateBuilder());
    }
    BlueprintBuilder.prototype.state = function() {
        var _this = this;
        var state = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            state[_i] = arguments[_i];
        }
        state.forEach(function(s) {
            _this.stateFactories.push(_this.getStateBuilder(s));
        });
        return this;
    };
    BlueprintBuilder.prototype.with = function(partial) {
        this.partial = __assign({}, this.partial, partial);
        return this;
    };
    BlueprintBuilder.prototype.make = function(count, partial) {
        if (count === void 0) {
            count = 1;
        }
        return __awaiter(this, void 0, void 0, function() {
            var objects,
                makeCount,
                builtObject,
                preparedEntities,
                _i,
                preparedEntities_1,
                prepared,
                context,
                _a,
                _b,
                factory,
                callback;
            return __generator(this, function(_c) {
                switch (_c.label) {
                    case 0:
                        if (partial) {
                            this.partial = __assign({}, this.partial, partial);
                        }
                        objects = [];
                        makeCount = 0;
                        _c.label = 1;
                    case 1:
                        if (!(makeCount < count)) return [3, 4];
                        return [4, this.resolveStates()];
                    case 2:
                        builtObject = _c.sent();
                        objects.push(builtObject);
                        _c.label = 3;
                    case 3:
                        makeCount++;
                        return [3, 1];
                    case 4:
                        return [
                            4,
                            this.adapter.make(
                                objects,
                                this.profile.getOptions(),
                            ),
                        ];
                    case 5:
                        preparedEntities = _c.sent();
                        (_i = 0), (preparedEntities_1 = preparedEntities);
                        _c.label = 6;
                    case 6:
                        if (!(_i < preparedEntities_1.length)) return [3, 11];
                        prepared = preparedEntities_1[_i];
                        context = this.getCallbackContext();
                        (_a = 0), (_b = this.stateFactories);
                        _c.label = 7;
                    case 7:
                        if (!(_a < _b.length)) return [3, 10];
                        factory = _b[_a];
                        callback = factory.afterMaking;
                        if (!callback) return [3, 9];
                        return [4, callback(prepared, context)];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9:
                        _a++;
                        return [3, 7];
                    case 10:
                        _i++;
                        return [3, 6];
                    case 11:
                        return [
                            2,
                            count === 1
                                ? preparedEntities[0]
                                : preparedEntities,
                        ];
                }
            });
        });
    };
    BlueprintBuilder.prototype.create = function(count, partial) {
        if (count === void 0) {
            count = 1;
        }
        return __awaiter(this, void 0, void 0, function() {
            var entities,
                context,
                _i,
                entities_1,
                entity,
                _a,
                _b,
                state,
                callback;
            return __generator(this, function(_c) {
                switch (_c.label) {
                    case 0:
                        return [4, this.make(count, partial)];
                    case 1:
                        entities = _c.sent();
                        if (!Array.isArray(entities)) {
                            entities = [entities];
                        }
                        return [
                            4,
                            this.adapter.create(
                                entities,
                                this.profile.getOptions(),
                            ),
                        ];
                    case 2:
                        entities = _c.sent();
                        context = this.getCallbackContext();
                        (_i = 0), (entities_1 = entities);
                        _c.label = 3;
                    case 3:
                        if (!(_i < entities_1.length)) return [3, 8];
                        entity = entities_1[_i];
                        (_a = 0), (_b = this.stateFactories);
                        _c.label = 4;
                    case 4:
                        if (!(_a < _b.length)) return [3, 7];
                        state = _b[_a];
                        callback = state.afterCreating;
                        if (!callback) return [3, 6];
                        return [4, callback(entity, context)];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6:
                        _a++;
                        return [3, 4];
                    case 7:
                        _i++;
                        return [3, 3];
                    case 8:
                        return [2, count === 1 ? entities[0] : entities];
                }
            });
        });
    };
    BlueprintBuilder.prototype.resolveStates = function() {
        return __awaiter(this, void 0, void 0, function() {
            var builtObject, _i, _a, factory, _b;
            return __generator(this, function(_c) {
                switch (_c.label) {
                    case 0:
                        builtObject = {};
                        (_i = 0), (_a = this.stateFactories);
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        factory = _a[_i];
                        _b = [{}, builtObject];
                        return [
                            4,
                            this.resolveStateFactory(factory.stateFactory),
                        ];
                    case 2:
                        builtObject = __assign.apply(
                            void 0,
                            _b.concat([_c.sent()]),
                        );
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        return [2, builtObject];
                }
            });
        });
    };
    BlueprintBuilder.prototype.resolveStateFactory = function(stateFactory) {
        return __awaiter(this, void 0, void 0, function() {
            var derived, _a, _b, _i, key, value, callback, _c, _d;
            return __generator(this, function(_e) {
                switch (_e.label) {
                    case 0:
                        return [4, stateFactory(faker)];
                    case 1:
                        derived = _e.sent();
                        _a = [];
                        for (_b in derived) _a.push(_b);
                        _i = 0;
                        _e.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3, 5];
                        key = _a[_i];
                        value = derived[key];
                        if (!utils_1.isFunction(value)) return [3, 4];
                        callback = derived[key];
                        _c = derived;
                        _d = key;
                        return [4, callback(this.factory)];
                    case 3:
                        _c[_d] = _e.sent();
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5:
                        return [2, __assign({}, derived, this.partial)];
                }
            });
        });
    };
    BlueprintBuilder.prototype.getCallbackContext = function() {
        return {
            factory: this.factory,
            faker: faker,
            adapter: this.adapter,
        };
    };
    BlueprintBuilder.prototype.getStateBuilder = function(state) {
        return {
            stateFactory: this.profile.getFactoryMethod(state),
            afterMaking: this.profile.getMakingCallbackMethod(state),
            afterCreating: this.profile.getCreatingCallbackMethod(state),
        };
    };
    return BlueprintBuilder;
})();
exports.BlueprintBuilder = BlueprintBuilder;
