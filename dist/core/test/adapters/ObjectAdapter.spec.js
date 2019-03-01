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
var ObjectAdapter_1 = require('../../adapters/object/ObjectAdapter');
var EntityFactory_1 = require('../../EntityFactory');
var Comment_blueprint_1 = require('../test-fixtures/Comment.blueprint');
var Post_1 = require('../test-fixtures/Post');
var Post_blueprint_1 = require('../test-fixtures/Post.blueprint');
var User_blueprint_1 = require('../test-fixtures/User.blueprint');
var Widget = (function() {
    function Widget() {}
    Widget.prototype.getName = function() {
        return this.name;
    };
    return Widget;
})();
var CustomIdClass = (function() {
    function CustomIdClass() {}
    return CustomIdClass;
})();
var widgetPartial = {
    name: 'widgetA',
    active: true,
};
var widgetPartial2 = {
    name: 'widgetB',
    active: true,
};
describe('ObjectAdapter', function() {
    return __awaiter(_this, void 0, void 0, function() {
        var _this = this;
        return __generator(this, function(_a) {
            it('should return and entity based on a partial', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var adapter, result;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                adapter = new ObjectAdapter_1.ObjectAdapter();
                                return [
                                    4,
                                    adapter.make(
                                        [widgetPartial, widgetPartial2],
                                        {
                                            __type: 'widget',
                                        },
                                    ),
                                ];
                            case 1:
                                result = _a.sent();
                                expect(result[0].id).toBeUndefined();
                                expect(result[1].id).toBeUndefined();
                                return [2];
                        }
                    });
                });
            });
            it('should create sequential ids when calling create by default', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var adapter, context, result;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                adapter = new ObjectAdapter_1.ObjectAdapter();
                                context = { __type: 'widget' };
                                return [
                                    4,
                                    adapter.make(
                                        [widgetPartial, widgetPartial2],
                                        context,
                                    ),
                                ];
                            case 1:
                                result = _a.sent();
                                return [4, adapter.create(result, context)];
                            case 2:
                                result = _a.sent();
                                expect(result[0].id).toEqual(1);
                                expect(result[1].id).toEqual(2);
                                return [2];
                        }
                    });
                });
            });
            it('should allow custom mappings for id attributes in options', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var customPartial, adapter, context, results;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                customPartial = {
                                    name: 'custom',
                                };
                                adapter = new ObjectAdapter_1.ObjectAdapter();
                                context = {
                                    __type: CustomIdClass,
                                    idAttribute: 'customId',
                                };
                                return [
                                    4,
                                    adapter.make([customPartial], context),
                                ];
                            case 1:
                                results = _a.sent();
                                return [4, adapter.create(results, context)];
                            case 2:
                                results = _a.sent();
                                expect(results[0].customId).toEqual(1);
                                return [2];
                        }
                    });
                });
            });
            it('should allow string types to be used', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var adapter, context, results;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                adapter = new ObjectAdapter_1.ObjectAdapter();
                                context = { __type: 'interfaceType' };
                                return [
                                    4,
                                    adapter.make([widgetPartial], context),
                                ];
                            case 1:
                                results = _a.sent();
                                expect(results[0].name).toEqual('widgetA');
                                expect(results[0].active).toEqual(
                                    widgetPartial.active,
                                );
                                return [4, adapter.create(results, context)];
                            case 2:
                                results = _a.sent();
                                expect(results[0].id).toEqual(1);
                                return [2];
                        }
                    });
                });
            });
            it('should allow for id generation to be disabled', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var adapter, context, results;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                adapter = new ObjectAdapter_1.ObjectAdapter({
                                    generateId: false,
                                });
                                context = { __type: Widget };
                                return [
                                    4,
                                    adapter.make([widgetPartial], context),
                                ];
                            case 1:
                                results = _a.sent();
                                return [4, adapter.create(results, context)];
                            case 2:
                                results = _a.sent();
                                expect(results[0].id).toBeUndefined();
                                return [2];
                        }
                    });
                });
            });
            it('should allow for id generation overridden by profile (enabled)', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var adapter, context, results;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                adapter = new ObjectAdapter_1.ObjectAdapter({
                                    generateId: false,
                                });
                                context = {
                                    __type: Widget,
                                    generateId: true,
                                };
                                return [
                                    4,
                                    adapter.make([widgetPartial], context),
                                ];
                            case 1:
                                results = _a.sent();
                                return [4, adapter.create(results, context)];
                            case 2:
                                results = _a.sent();
                                expect(results[0].id).toEqual(1);
                                return [2];
                        }
                    });
                });
            });
            it('should allow for id generation overridden by profile (disabled)', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var adapter, context, results;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                adapter = new ObjectAdapter_1.ObjectAdapter({
                                    generateId: true,
                                });
                                context = {
                                    __type: Widget,
                                    generateId: false,
                                };
                                return [
                                    4,
                                    adapter.make([widgetPartial], context),
                                ];
                            case 1:
                                results = _a.sent();
                                return [4, adapter.create(results, context)];
                            case 2:
                                results = _a.sent();
                                expect(results[0].id).toBeUndefined();
                                return [2];
                        }
                    });
                });
            });
            it('should allow the default id attribute to be changed', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var context, customPartial, adapter, results;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                context = { __type: CustomIdClass };
                                customPartial = {
                                    name: 'custom',
                                };
                                adapter = new ObjectAdapter_1.ObjectAdapter({
                                    defaultIdAttribute: 'customId',
                                });
                                return [
                                    4,
                                    adapter.make([customPartial], context),
                                ];
                            case 1:
                                results = _a.sent();
                                return [4, adapter.create(results, context)];
                            case 2:
                                results = _a.sent();
                                expect(results[0].customId).toEqual(1);
                                return [2];
                        }
                    });
                });
            });
            it('should handle properties that are falsy', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var adapter, partial, results;
                    return __generator(this, function(_a) {
                        switch (_a.label) {
                            case 0:
                                adapter = new ObjectAdapter_1.ObjectAdapter();
                                partial = {
                                    active: false,
                                };
                                return [
                                    4,
                                    adapter.make([partial], {
                                        __type: Widget,
                                    }),
                                ];
                            case 1:
                                results = _a.sent();
                                expect(results[0]).toBeInstanceOf(Widget);
                                expect(results[0].getName()).toEqual(
                                    results[0].name,
                                );
                                expect(results[0]).toBeInstanceOf(Widget);
                                expect(results[0]).toHaveProperty('active');
                                expect(results[0].active).toEqual(false);
                                return [2];
                        }
                    });
                });
            });
            describe('E2E', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var factory;
                    var _this = this;
                    return __generator(this, function(_a) {
                        beforeEach(function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var adapter;
                                return __generator(this, function(_a) {
                                    adapter = new ObjectAdapter_1.ObjectAdapter();
                                    factory = new EntityFactory_1.EntityFactory(
                                        {
                                            adapter: adapter,
                                            blueprints: [
                                                Comment_blueprint_1.CommentBlueprint,
                                                Post_blueprint_1.PostBlueprint,
                                                User_blueprint_1.UserBlueprint,
                                            ],
                                        },
                                    );
                                    return [2];
                                });
                            });
                        });
                        it('should make an entity and its nested relations', function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var post, _i, _a, comment;
                                return __generator(this, function(_b) {
                                    switch (_b.label) {
                                        case 0:
                                            return [
                                                4,
                                                factory
                                                    .for(Post_1.Post)
                                                    .state(
                                                        'with-comments',
                                                        'with-author',
                                                    )
                                                    .make(),
                                            ];
                                        case 1:
                                            post = _b.sent();
                                            expect(
                                                post.author.id,
                                            ).toBeDefined();
                                            expect(
                                                post.comments.length,
                                            ).toBeGreaterThan(1);
                                            for (
                                                _i = 0, _a = post.comments;
                                                _i < _a.length;
                                                _i++
                                            ) {
                                                comment = _a[_i];
                                                expect(
                                                    comment.id,
                                                ).toBeDefined();
                                            }
                                            return [2];
                                    }
                                });
                            });
                        });
                        it('should create an entity and its nested relations', function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var posts, _i, posts_1, post, _a, _b, comment;
                                return __generator(this, function(_c) {
                                    switch (_c.label) {
                                        case 0:
                                            return [
                                                4,
                                                factory
                                                    .for(Post_1.Post)
                                                    .state(
                                                        'with-comments',
                                                        'with-author',
                                                    )
                                                    .create(3),
                                            ];
                                        case 1:
                                            posts = _c.sent();
                                            for (
                                                _i = 0, posts_1 = posts;
                                                _i < posts_1.length;
                                                _i++
                                            ) {
                                                post = posts_1[_i];
                                                expect(post.id).toBeDefined();
                                                expect(
                                                    post.author.id,
                                                ).toBeDefined();
                                                expect(
                                                    post.comments.length,
                                                ).toBeGreaterThan(1);
                                                for (
                                                    _a = 0, _b = post.comments;
                                                    _a < _b.length;
                                                    _a++
                                                ) {
                                                    comment = _b[_a];
                                                    expect(
                                                        comment.id,
                                                    ).toBeDefined();
                                                    expect(
                                                        comment.user.id,
                                                    ).toBeDefined();
                                                }
                                            }
                                            return [2];
                                    }
                                });
                            });
                        });
                        return [2];
                    });
                });
            });
            return [2];
        });
    });
});
