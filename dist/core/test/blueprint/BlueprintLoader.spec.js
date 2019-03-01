'use strict';
var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics = function(d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                        d.__proto__ = b;
                    }) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();
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
var ObjectBlueprint_1 = require('../../adapters/object/ObjectBlueprint');
var Blueprint_1 = require('../../blueprint/Blueprint');
var BlueprintLoader_1 = require('../../blueprint/BlueprintLoader');
var FooEntity = (function() {
    function FooEntity() {}
    return FooEntity;
})();
var FooBlueprint = (function(_super) {
    __extends(FooBlueprint, _super);
    function FooBlueprint() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    return FooBlueprint;
})(ObjectBlueprint_1.ObjectBlueprint);
var BarBlueprint = (function(_super) {
    __extends(BarBlueprint, _super);
    function BarBlueprint() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    return BarBlueprint;
})(ObjectBlueprint_1.ObjectBlueprint);
describe('BlueprintLoader', function() {
    it('should load function entities', function() {
        return __awaiter(_this, void 0, void 0, function() {
            var loader, profiles, _i, profiles_1, profile;
            return __generator(this, function(_a) {
                loader = new BlueprintLoader_1.BlueprintLoader([
                    FooBlueprint,
                    new BarBlueprint(),
                ]);
                profiles = loader.getProfiles();
                expect(profiles.length).toEqual(2);
                for (
                    _i = 0, profiles_1 = profiles;
                    _i < profiles_1.length;
                    _i++
                ) {
                    profile = profiles_1[_i];
                    expect(profile).toBeInstanceOf(Blueprint_1.Blueprint);
                }
                expect(profiles[1]).toBeInstanceOf(Blueprint_1.Blueprint);
                return [2];
            });
        });
    });
    it('should load entities via glob pattern', function() {
        return __awaiter(_this, void 0, void 0, function() {
            var loader, profiles;
            return __generator(this, function(_a) {
                loader = new BlueprintLoader_1.BlueprintLoader([
                    'packages/core/test/blueprint/blueprints/*.blueprint.ts',
                ]);
                profiles = loader.getProfiles();
                if (profiles) {
                    expect(profiles.length).toEqual(1);
                }
                return [2];
            });
        });
    });
    it('should let a mix of entities, functions and instances', function() {
        return __awaiter(_this, void 0, void 0, function() {
            var loader, profiles, _i, profiles_2, profile;
            return __generator(this, function(_a) {
                loader = new BlueprintLoader_1.BlueprintLoader([
                    'packages/core/test/blueprint/blueprints/*.blueprint.ts',
                    FooBlueprint,
                    new BarBlueprint(),
                ]);
                profiles = loader.getProfiles();
                expect(profiles.length).toEqual(3);
                for (
                    _i = 0, profiles_2 = profiles;
                    _i < profiles_2.length;
                    _i++
                ) {
                    profile = profiles_2[_i];
                    expect(profile).toBeInstanceOf(Blueprint_1.Blueprint);
                }
                return [2];
            });
        });
    });
    it('should only load blueprints', function() {
        return __awaiter(_this, void 0, void 0, function() {
            var loader, profiles, _i, profiles_3, profile;
            return __generator(this, function(_a) {
                loader = new BlueprintLoader_1.BlueprintLoader([
                    'samples/TypeormAdapter/*.entity.ts',
                    FooEntity,
                    new FooBlueprint(),
                ]);
                profiles = loader.getProfiles();
                expect(profiles.length).toEqual(1);
                for (
                    _i = 0, profiles_3 = profiles;
                    _i < profiles_3.length;
                    _i++
                ) {
                    profile = profiles_3[_i];
                    expect(profile).toBeInstanceOf(Blueprint_1.Blueprint);
                }
                return [2];
            });
        });
    });
});
