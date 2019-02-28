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
var core_1 = require('@entity-factory/core');
var typeorm_1 = require('typeorm');
var TypeormAdapter_1 = require('../TypeormAdapter');
var Comment_blueprint_1 = require('./blueprints/Comment.blueprint');
var Post_blueprint_1 = require('./blueprints/Post.blueprint');
var User_blueprint_1 = require('./blueprints/User.blueprint');
var Comment_entity_1 = require('./entities/Comment.entity');
var Post_entity_1 = require('./entities/Post.entity');
var User_entity_1 = require('./entities/User.entity');
var Widget_entity_1 = require('./entities/Widget.entity');
describe('TypeORM Adapter', function() {
    return __awaiter(_this, void 0, void 0, function() {
        var _this = this;
        return __generator(this, function(_a) {
            describe('Connection Management', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var _this = this;
                    return __generator(this, function(_a) {
                        it('should use existing connection', function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var connection, adapter, widget;
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            return [
                                                4,
                                                typeorm_1.createConnection({
                                                    type: 'sqlite',
                                                    database: ':memory:',
                                                    entities: [
                                                        Widget_entity_1.Widget,
                                                    ],
                                                    synchronize: true,
                                                }),
                                            ];
                                        case 1:
                                            connection = _a.sent();
                                            adapter = new TypeormAdapter_1.TypeormAdapter();
                                            widget = new Widget_entity_1.Widget();
                                            widget.name = 'widget';
                                            widget.active = true;
                                            return [
                                                4,
                                                adapter.create([widget], {
                                                    __type:
                                                        Widget_entity_1.Widget,
                                                }),
                                            ];
                                        case 2:
                                            _a.sent();
                                            expect(widget.widgetId).toEqual(1);
                                            return [4, connection.close()];
                                        case 3:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            });
                        });
                        it('should use existing named connection', function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var connection, adapter, widget, result;
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            return [
                                                4,
                                                typeorm_1.createConnection({
                                                    name: 'widgetConnection',
                                                    type: 'sqlite',
                                                    database: ':memory:',
                                                    entities: [
                                                        Widget_entity_1.Widget,
                                                    ],
                                                    synchronize: true,
                                                }),
                                            ];
                                        case 1:
                                            connection = _a.sent();
                                            adapter = new TypeormAdapter_1.TypeormAdapter(
                                                'widgetConnection',
                                            );
                                            widget = new Widget_entity_1.Widget();
                                            widget.name = 'widget';
                                            widget.active = true;
                                            return [
                                                4,
                                                adapter.create([widget], {
                                                    __type:
                                                        Widget_entity_1.Widget,
                                                }),
                                            ];
                                        case 2:
                                            _a.sent();
                                            expect(widget.widgetId).toEqual(1);
                                            return [
                                                4,
                                                connection.manager.query(
                                                    'select * from widget where widgetId = 1',
                                                ),
                                            ];
                                        case 3:
                                            result = _a.sent();
                                            expect(result[0].widgetId).toEqual(
                                                1,
                                            );
                                            return [4, connection.close()];
                                        case 4:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            });
                        });
                        it('should create a new connection', function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var adapter, widget;
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            adapter = new TypeormAdapter_1.TypeormAdapter(
                                                {
                                                    type: 'sqlite',
                                                    database: ':memory:',
                                                    entities: [
                                                        Widget_entity_1.Widget,
                                                    ],
                                                    synchronize: true,
                                                },
                                            );
                                            widget = new Widget_entity_1.Widget();
                                            widget.name = 'widget';
                                            widget.active = true;
                                            return [
                                                4,
                                                adapter.create([widget], {
                                                    __type:
                                                        Widget_entity_1.Widget,
                                                }),
                                            ];
                                        case 1:
                                            _a.sent();
                                            return [4, adapter.dispose()];
                                        case 2:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            });
                        });
                        it('should create a new named connection', function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var adapter, widget;
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            adapter = new TypeormAdapter_1.TypeormAdapter(
                                                {
                                                    name: 'testConn1',
                                                    type: 'sqlite',
                                                    database: ':memory:',
                                                    entities: [
                                                        Widget_entity_1.Widget,
                                                    ],
                                                    synchronize: true,
                                                },
                                            );
                                            widget = new Widget_entity_1.Widget();
                                            widget.name = 'widget';
                                            widget.active = true;
                                            return [
                                                4,
                                                adapter.create([widget], {
                                                    __type:
                                                        Widget_entity_1.Widget,
                                                }),
                                            ];
                                        case 1:
                                            _a.sent();
                                            return [4, adapter.dispose()];
                                        case 2:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            });
                        });
                        it('should create default connection', function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var adapter, widget;
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            adapter = new TypeormAdapter_1.TypeormAdapter(
                                                {
                                                    type: 'sqlite',
                                                    database: ':memory:',
                                                    entities: [
                                                        Widget_entity_1.Widget,
                                                    ],
                                                    synchronize: true,
                                                },
                                            );
                                            widget = new Widget_entity_1.Widget();
                                            widget.name = 'widget';
                                            widget.active = true;
                                            return [
                                                4,
                                                adapter.create([widget], {
                                                    __type:
                                                        Widget_entity_1.Widget,
                                                }),
                                            ];
                                        case 1:
                                            _a.sent();
                                            return [4, adapter.dispose()];
                                        case 2:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            });
                        });
                        return [2];
                    });
                });
            });
            describe('Make', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var _this = this;
                    return __generator(this, function(_a) {
                        it('should convert a partial to an entity instance', function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var adapter, partial, result;
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            adapter = new TypeormAdapter_1.TypeormAdapter(
                                                {
                                                    type: 'sqlite',
                                                    database: ':memory:',
                                                    entities: [
                                                        Widget_entity_1.Widget,
                                                    ],
                                                    synchronize: true,
                                                },
                                            );
                                            partial = {
                                                name: 'widget',
                                                active: true,
                                            };
                                            return [
                                                4,
                                                adapter.make([partial], {
                                                    __type:
                                                        Widget_entity_1.Widget,
                                                }),
                                            ];
                                        case 1:
                                            result = _a.sent();
                                            expect(result[0]).toBeInstanceOf(
                                                Widget_entity_1.Widget,
                                            );
                                            expect(result[0].name).toEqual(
                                                partial.name,
                                            );
                                            expect(result[0].active).toEqual(
                                                partial.active,
                                            );
                                            return [4, adapter.dispose()];
                                        case 2:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            });
                        });
                        return [2];
                    });
                });
            });
            describe('Create', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var _this = this;
                    return __generator(this, function(_a) {
                        it('should persist data to the database with prepared entities', function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var adapter,
                                    partial,
                                    partial2,
                                    prepared,
                                    result;
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            adapter = new TypeormAdapter_1.TypeormAdapter(
                                                {
                                                    type: 'sqlite',
                                                    database: ':memory:',
                                                    entities: [
                                                        Widget_entity_1.Widget,
                                                    ],
                                                    synchronize: true,
                                                },
                                            );
                                            partial = {
                                                name: 'widget',
                                                active: true,
                                            };
                                            partial2 = {
                                                name: 'widget 2',
                                                active: false,
                                            };
                                            return [
                                                4,
                                                adapter.make(
                                                    [partial, partial2],
                                                    {
                                                        __type:
                                                            Widget_entity_1.Widget,
                                                    },
                                                ),
                                            ];
                                        case 1:
                                            prepared = _a.sent();
                                            return [
                                                4,
                                                adapter.create(prepared, {
                                                    __type:
                                                        Widget_entity_1.Widget,
                                                }),
                                            ];
                                        case 2:
                                            result = _a.sent();
                                            expect(result[0]).toBeInstanceOf(
                                                Widget_entity_1.Widget,
                                            );
                                            expect(result[0].widgetId).toEqual(
                                                1,
                                            );
                                            expect(result[0].name).toEqual(
                                                partial.name,
                                            );
                                            expect(result[0].active).toEqual(
                                                partial.active,
                                            );
                                            expect(result[1]).toBeInstanceOf(
                                                Widget_entity_1.Widget,
                                            );
                                            expect(result[1].widgetId).toEqual(
                                                2,
                                            );
                                            expect(result[1].name).toEqual(
                                                partial2.name,
                                            );
                                            expect(result[1].active).toEqual(
                                                partial2.active,
                                            );
                                            return [4, adapter.dispose()];
                                        case 3:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            });
                        });
                        return [2];
                    });
                });
            });
            describe('E2E', function() {
                return __awaiter(_this, void 0, void 0, function() {
                    var factory, adapter;
                    var _this = this;
                    return __generator(this, function(_a) {
                        beforeEach(function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                return __generator(this, function(_a) {
                                    adapter = new TypeormAdapter_1.TypeormAdapter(
                                        {
                                            name: 'e2e-tests',
                                            type: 'sqlite',
                                            database: ':memory:',
                                            synchronize: true,
                                            entities: [
                                                Post_entity_1.Post,
                                                Comment_entity_1.Comment,
                                                User_entity_1.User,
                                            ],
                                        },
                                    );
                                    factory = new core_1.EntityFactory({
                                        adapter: adapter,
                                        blueprints: [
                                            Comment_blueprint_1.CommentBlueprint,
                                            Post_blueprint_1.PostBlueprint,
                                            User_blueprint_1.UserBlueprint,
                                        ],
                                    });
                                    return [2];
                                });
                            });
                        });
                        afterEach(function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            return [4, adapter.dispose()];
                                        case 1:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            });
                        });
                        it('should make an entity', function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var user;
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            return [
                                                4,
                                                factory
                                                    .for(User_entity_1.User)
                                                    .make(),
                                            ];
                                        case 1:
                                            user = _a.sent();
                                            expect(user).toBeInstanceOf(
                                                User_entity_1.User,
                                            );
                                            return [2];
                                    }
                                });
                            });
                        });
                        it('should make an entity with relations', function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var post;
                                return __generator(this, function(_a) {
                                    switch (_a.label) {
                                        case 0:
                                            return [
                                                4,
                                                factory
                                                    .for(Post_entity_1.Post)
                                                    .state(
                                                        'with-author',
                                                        'with-comments',
                                                    )
                                                    .make(),
                                            ];
                                        case 1:
                                            post = _a.sent();
                                            expect(
                                                post.author.id,
                                            ).toBeDefined();
                                            expect(
                                                post.comments.length,
                                            ).toBeGreaterThan(1);
                                            return [2];
                                    }
                                });
                            });
                        });
                        it('should persist an entity with relations to the database', function() {
                            return __awaiter(_this, void 0, void 0, function() {
                                var post, result, _i, _a, comment;
                                return __generator(this, function(_b) {
                                    switch (_b.label) {
                                        case 0:
                                            return [
                                                4,
                                                factory
                                                    .for(Post_entity_1.Post)
                                                    .state(
                                                        'with-author',
                                                        'with-comments',
                                                    )
                                                    .create(),
                                            ];
                                        case 1:
                                            post = _b.sent();
                                            expect(
                                                post.author.id,
                                            ).toBeDefined();
                                            expect(
                                                post.comments.length,
                                            ).toBeGreaterThan(1);
                                            return [
                                                4,
                                                adapter
                                                    .getManager()
                                                    .getRepository(
                                                        Post_entity_1.Post,
                                                    )
                                                    .findOne(1, {
                                                        relations: [
                                                            'author',
                                                            'comments',
                                                            'comments.user',
                                                        ],
                                                    }),
                                            ];
                                        case 2:
                                            result = _b.sent();
                                            if (result) {
                                                expect(result.id).toBeDefined();
                                                expect(
                                                    result.author.id,
                                                ).toBeDefined();
                                                expect(
                                                    result.comments.length,
                                                ).toBeGreaterThan(1);
                                                for (
                                                    _i = 0,
                                                        _a = result.comments;
                                                    _i < _a.length;
                                                    _i++
                                                ) {
                                                    comment = _a[_i];
                                                    expect(
                                                        comment.id,
                                                    ).toBeDefined();
                                                    expect(
                                                        comment.user.id,
                                                    ).toBeDefined();
                                                }
                                            } else {
                                                fail('post not defined');
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
