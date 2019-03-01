'use strict';
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
var _this = this;
Object.defineProperty(exports, '__esModule', { value: true });
var faker = require('faker');
var Blueprint_1 = require('../../blueprint/Blueprint');
var Widget = (function() {
    function Widget() {}
    return Widget;
})();
describe('Blueprint', function() {
    return __awaiter(_this, void 0, void 0, function() {
        var _this = this;
        return __generator(this, function(_a) {
            it('should allow factories to be defined with string keys', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint, callback, callbackResult, _a;
                    var _this = this;
                    return __generator(this, function(_b) {
                        switch (_b.label) {
                            case 0:
                                blueprint = new Blueprint_1.Blueprint();
                                callback = function(fake) {
                                    return __awaiter(
                                        _this,
                                        void 0,
                                        void 0,
                                        function() {
                                            return __generator(this, function(
                                                _a,
                                            ) {
                                                return [
                                                    2,
                                                    {
                                                        name: 'widgetizer',
                                                    },
                                                ];
                                            });
                                        },
                                    );
                                };
                                blueprint.type('widget');
                                blueprint.define(callback);
                                expect(blueprint.hasFactoryMethod()).toBe(true);
                                return [4, callback(faker)];
                            case 1:
                                callbackResult = _b.sent();
                                _a = expect;
                                return [4, blueprint.getFactoryMethod()(faker)];
                            case 2:
                                _a.apply(void 0, [_b.sent()]).toEqual(
                                    callbackResult,
                                );
                                return [2];
                        }
                    });
                });
            });
            it('should allow factories to be defined with function keys', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint, callback, callbackResult, _a;
                    var _this = this;
                    return __generator(this, function(_b) {
                        switch (_b.label) {
                            case 0:
                                blueprint = new Blueprint_1.Blueprint();
                                callback = function(fake) {
                                    return __awaiter(
                                        _this,
                                        void 0,
                                        void 0,
                                        function() {
                                            return __generator(this, function(
                                                _a,
                                            ) {
                                                return [
                                                    2,
                                                    {
                                                        name: 'widgetizer',
                                                    },
                                                ];
                                            });
                                        },
                                    );
                                };
                                blueprint.type(Widget);
                                blueprint.define(callback);
                                expect(blueprint.hasFactoryMethod()).toBe(true);
                                return [4, callback(faker)];
                            case 1:
                                callbackResult = _b.sent();
                                _a = expect;
                                return [4, blueprint.getFactoryMethod()(faker)];
                            case 2:
                                _a.apply(void 0, [_b.sent()]).toEqual(
                                    callbackResult,
                                );
                                return [2];
                        }
                    });
                });
            });
            it('should allow factory states to be defined with string keys', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint, state, callback, callbackResult, _a;
                    var _this = this;
                    return __generator(this, function(_b) {
                        switch (_b.label) {
                            case 0:
                                blueprint = new Blueprint_1.Blueprint();
                                blueprint.type('widget');
                                state = 'active';
                                callback = function(fake) {
                                    return __awaiter(
                                        _this,
                                        void 0,
                                        void 0,
                                        function() {
                                            return __generator(this, function(
                                                _a,
                                            ) {
                                                return [
                                                    2,
                                                    {
                                                        active: true,
                                                    },
                                                ];
                                            });
                                        },
                                    );
                                };
                                blueprint.state(state, callback);
                                expect(blueprint.hasFactoryMethod(state)).toBe(
                                    true,
                                );
                                return [4, callback(faker)];
                            case 1:
                                callbackResult = _b.sent();
                                _a = expect;
                                return [
                                    4,
                                    blueprint.getFactoryMethod(state)(faker),
                                ];
                            case 2:
                                _a.apply(void 0, [_b.sent()]).toEqual(
                                    callbackResult,
                                );
                                return [2];
                        }
                    });
                });
            });
            it('should allow factory states to be defined with function keys', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint, state, callback, callbackResult, _a;
                    var _this = this;
                    return __generator(this, function(_b) {
                        switch (_b.label) {
                            case 0:
                                blueprint = new Blueprint_1.Blueprint();
                                blueprint.type('widget');
                                state = 'active';
                                callback = function(fake) {
                                    return __awaiter(
                                        _this,
                                        void 0,
                                        void 0,
                                        function() {
                                            return __generator(this, function(
                                                _a,
                                            ) {
                                                return [
                                                    2,
                                                    {
                                                        active: true,
                                                    },
                                                ];
                                            });
                                        },
                                    );
                                };
                                blueprint.state(state, callback);
                                expect(blueprint.hasFactoryMethod(state)).toBe(
                                    true,
                                );
                                return [4, callback(faker)];
                            case 1:
                                callbackResult = _b.sent();
                                _a = expect;
                                return [
                                    4,
                                    blueprint.getFactoryMethod(state)(faker),
                                ];
                            case 2:
                                _a.apply(void 0, [_b.sent()]).toEqual(
                                    callbackResult,
                                );
                                return [2];
                        }
                    });
                });
            });
            it('should allow factory states to be defined as deep partials', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint, state, partial, _a;
                    return __generator(this, function(_b) {
                        switch (_b.label) {
                            case 0:
                                blueprint = new Blueprint_1.Blueprint();
                                blueprint.type('widget');
                                state = 'active';
                                partial = {
                                    active: true,
                                };
                                blueprint.state(state, partial);
                                expect(blueprint.hasFactoryMethod(state)).toBe(
                                    true,
                                );
                                _a = expect;
                                return [
                                    4,
                                    blueprint.getFactoryMethod(state)(faker),
                                ];
                            case 1:
                                _a.apply(void 0, [_b.sent()]).toEqual(partial);
                                return [2];
                        }
                    });
                });
            });
            it('should allow factory afterMaking callbacks to be defined with string keys', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint;
                    return __generator(this, function(_a) {
                        blueprint = new Blueprint_1.Blueprint();
                        blueprint.afterMaking(jest.fn());
                        expect(blueprint.hasMakingCallbackMethod()).toBe(true);
                        expect(
                            blueprint.getMakingCallbackMethod(),
                        ).toBeDefined();
                        return [2];
                    });
                });
            });
            it('should allow factory afterMaking callbacks to be defined with function keys', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint;
                    return __generator(this, function(_a) {
                        blueprint = new Blueprint_1.Blueprint();
                        blueprint.afterMaking(jest.fn());
                        expect(blueprint.hasMakingCallbackMethod()).toBe(true);
                        expect(
                            blueprint.getMakingCallbackMethod(),
                        ).toBeDefined();
                        return [2];
                    });
                });
            });
            it('should allow factory afterMakingState callbacks to be defined with string keys', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint;
                    return __generator(this, function(_a) {
                        blueprint = new Blueprint_1.Blueprint();
                        blueprint.afterMakingState('inactive', jest.fn());
                        expect(
                            blueprint.hasMakingCallbackMethod('inactive'),
                        ).toBe(true);
                        expect(
                            blueprint.getMakingCallbackMethod('inactive'),
                        ).toBeDefined();
                        return [2];
                    });
                });
            });
            it('should allow factory afterMakingState callbacks to be defined with function keys', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint;
                    return __generator(this, function(_a) {
                        blueprint = new Blueprint_1.Blueprint();
                        blueprint.afterMakingState('inactive', jest.fn());
                        expect(
                            blueprint.hasMakingCallbackMethod('inactive'),
                        ).toBe(true);
                        expect(
                            blueprint.getMakingCallbackMethod('inactive'),
                        ).toBeDefined();
                        return [2];
                    });
                });
            });
            it('should allow afterCreating callbacks to be defined with string keys', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint;
                    return __generator(this, function(_a) {
                        blueprint = new Blueprint_1.Blueprint();
                        blueprint.afterCreating(jest.fn());
                        expect(blueprint.hasCreatingCallbackMethod()).toBe(
                            true,
                        );
                        expect(
                            blueprint.getCreatingCallbackMethod(),
                        ).toBeDefined();
                        return [2];
                    });
                });
            });
            it('should allow afterCreating callbacks to be defined with function keys', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint;
                    return __generator(this, function(_a) {
                        blueprint = new Blueprint_1.Blueprint();
                        blueprint.afterCreating(jest.fn());
                        expect(
                            blueprint.hasCreatingCallbackMethod(),
                        ).toBeDefined();
                        expect(
                            blueprint.getCreatingCallbackMethod(),
                        ).toBeDefined();
                        return [2];
                    });
                });
            });
            it('should allow afterCreatingState callbacks to be defined with string keys', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint;
                    return __generator(this, function(_a) {
                        blueprint = new Blueprint_1.Blueprint();
                        blueprint.afterCreatingState('inactive', jest.fn());
                        expect(
                            blueprint.hasCreatingCallbackMethod('inactive'),
                        ).toBe(true);
                        expect(
                            blueprint.getCreatingCallbackMethod('inactive'),
                        ).toBeDefined();
                        return [2];
                    });
                });
            });
            it('should allow afterCreatingState callbacks to be defined with function keys', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var factory;
                    return __generator(this, function(_a) {
                        factory = new Blueprint_1.Blueprint();
                        factory.afterCreatingState('inactive', jest.fn());
                        expect(
                            factory.hasCreatingCallbackMethod('inactive'),
                        ).toBe(true);
                        expect(
                            factory.getCreatingCallbackMethod('inactive'),
                        ).toBeDefined();
                        return [2];
                    });
                });
            });
            it('should throw error if __type not defined for blueprint', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint;
                    return __generator(this, function(_a) {
                        blueprint = new Blueprint_1.Blueprint();
                        expect(function() {
                            return blueprint.getFactoryMethod('widget');
                        }).toThrow();
                        return [2];
                    });
                });
            });
            it('should throw error if getFactoryMethod is called for non-existent factory method', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint;
                    return __generator(this, function(_a) {
                        blueprint = new Blueprint_1.Blueprint();
                        blueprint.type('widget');
                        expect(function() {
                            return blueprint.getFactoryMethod('widget');
                        }).toThrowError(
                            'Factory method not defined for entity widget',
                        );
                        return [2];
                    });
                });
            });
            it('should return the type along with the options', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint;
                    return __generator(this, function(_a) {
                        blueprint = new Blueprint_1.Blueprint();
                        blueprint.type('widget');
                        expect(blueprint.getOptions().__type).toEqual('widget');
                        return [2];
                    });
                });
            });
            it('should allow the setting of options', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var blueprint;
                    return __generator(this, function(_a) {
                        blueprint = new Blueprint_1.Blueprint();
                        blueprint.options({
                            testOpt: 'value',
                        });
                        expect(blueprint.getOptions().testOpt).toEqual('value');
                        return [2];
                    });
                });
            });
            return [2];
        });
    });
});
