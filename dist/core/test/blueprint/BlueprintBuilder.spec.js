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
var ObjectBlueprint_1 = require('../../adapters/object/ObjectBlueprint');
var EntityFactory_1 = require('../../EntityFactory');
var User = (function() {
    function User() {}
    return User;
})();
exports.User = User;
exports.definePostProfile = function(factory) {
    var profile = new ObjectBlueprint_1.ObjectBlueprint();
    profile.type('post');
    profile.define(function(faker) {
        return __awaiter(_this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                return [
                    2,
                    {
                        title: faker.company.catchPhrase(),
                        body: faker.lorem.paragraphs(2, '\n\n'),
                    },
                ];
            });
        });
    });
    factory.register(profile);
    return profile;
};
exports.defineUserProfile = function(factory) {
    var profile = new ObjectBlueprint_1.ObjectBlueprint();
    profile.type(User);
    profile.define(function(faker) {
        return __awaiter(_this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                return [
                    2,
                    {
                        name:
                            faker.name.firstName() +
                            ' ' +
                            faker.name.lastName(),
                        username: faker.internet.userName(),
                        email: faker.internet.email(),
                        active: true,
                    },
                ];
            });
        });
    });
    factory.register(profile);
    return profile;
};
describe('BlueprintBuilder', function() {
    var factory;
    beforeEach(function() {
        factory = new EntityFactory_1.EntityFactory();
    });
    describe('Make', function() {
        return __awaiter(_this, void 0, void 0, function() {
            var _this = this;
            return __generator(this, function(_a) {
                it('should make a single entity', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var user;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    exports.defineUserProfile(factory);
                                    return [4, factory.for(User).make()];
                                case 1:
                                    user = _a.sent();
                                    expect(user).toHaveProperty('username');
                                    expect(user).toHaveProperty('email');
                                    expect(user).toHaveProperty('active');
                                    expect(user).toHaveProperty('name');
                                    expect(user.posts).toBeUndefined();
                                    return [2];
                            }
                        });
                    });
                });
                it('should override an attribute when passing a partial', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var expected, user;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    expected = 'typeorm';
                                    exports.defineUserProfile(factory);
                                    return [
                                        4,
                                        factory
                                            .for(User)
                                            .with({
                                                username: expected,
                                            })
                                            .make(),
                                    ];
                                case 1:
                                    user = _a.sent();
                                    expect(user.username).toEqual(expected);
                                    return [2];
                            }
                        });
                    });
                });
                it('should create multiple entities', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var users;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    exports.defineUserProfile(factory);
                                    return [4, factory.for(User).make(2)];
                                case 1:
                                    users = _a.sent();
                                    expect(users.length).toEqual(2);
                                    return [2];
                            }
                        });
                    });
                });
                it('should allow overriding attributes for multiple entities when passing a partial', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var expected, users, idx;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    expected = 'typeorm';
                                    exports.defineUserProfile(factory);
                                    return [
                                        4,
                                        factory
                                            .for(User)
                                            .with({
                                                username: expected,
                                            })
                                            .make(2),
                                    ];
                                case 1:
                                    users = _a.sent();
                                    for (idx in users) {
                                        if (users[idx]) {
                                            expect(users[idx].username).toEqual(
                                                expected,
                                            );
                                        }
                                    }
                                    return [2];
                            }
                        });
                    });
                });
                it('should call after making callback', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var callback, blueprint;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    callback = jest.fn();
                                    blueprint = exports.defineUserProfile(
                                        factory,
                                    );
                                    blueprint.afterMaking(callback);
                                    return [4, factory.for(User).make()];
                                case 1:
                                    _a.sent();
                                    expect(callback).toHaveBeenCalledTimes(1);
                                    return [2];
                            }
                        });
                    });
                });
                it('should call after making callback for each entity made', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var callback, blueprint;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    callback = jest.fn();
                                    blueprint = exports.defineUserProfile(
                                        factory,
                                    );
                                    blueprint.afterMaking(callback);
                                    return [4, factory.for(User).make(4)];
                                case 1:
                                    _a.sent();
                                    expect(callback).toHaveBeenCalledTimes(4);
                                    return [2];
                            }
                        });
                    });
                });
                it('should resolve state factory calls', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var blueprint, user;
                        var _this = this;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    blueprint = exports.defineUserProfile(
                                        factory,
                                    );
                                    exports.definePostProfile(factory);
                                    blueprint.state('with-posts', function(
                                        faker,
                                    ) {
                                        return __awaiter(
                                            _this,
                                            void 0,
                                            void 0,
                                            function() {
                                                var _this = this;
                                                return __generator(
                                                    this,
                                                    function(_a) {
                                                        return [
                                                            2,
                                                            {
                                                                posts: function(
                                                                    fac,
                                                                ) {
                                                                    return __awaiter(
                                                                        _this,
                                                                        void 0,
                                                                        void 0,
                                                                        function() {
                                                                            return __generator(
                                                                                this,
                                                                                function(
                                                                                    _a,
                                                                                ) {
                                                                                    switch (
                                                                                        _a.label
                                                                                    ) {
                                                                                        case 0:
                                                                                            return [
                                                                                                4,
                                                                                                fac
                                                                                                    .for(
                                                                                                        'post',
                                                                                                    )
                                                                                                    .make(
                                                                                                        2,
                                                                                                    ),
                                                                                            ];
                                                                                        case 1:
                                                                                            return [
                                                                                                2,
                                                                                                _a.sent(),
                                                                                            ];
                                                                                    }
                                                                                },
                                                                            );
                                                                        },
                                                                    );
                                                                },
                                                            },
                                                        ];
                                                    },
                                                );
                                            },
                                        );
                                    });
                                    return [
                                        4,
                                        factory
                                            .for(User)
                                            .state('with-posts')
                                            .make(),
                                    ];
                                case 1:
                                    user = _a.sent();
                                    expect(user.posts.length).toEqual(2);
                                    return [2];
                            }
                        });
                    });
                });
                it('should call afterMakingState callbacks', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var callback, blueprint;
                        var _this = this;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    callback = jest.fn();
                                    blueprint = exports.defineUserProfile(
                                        factory,
                                    );
                                    blueprint.state('inactive', function(
                                        faker,
                                    ) {
                                        return __awaiter(
                                            _this,
                                            void 0,
                                            void 0,
                                            function() {
                                                return __generator(
                                                    this,
                                                    function(_a) {
                                                        return [
                                                            2,
                                                            {
                                                                active: false,
                                                            },
                                                        ];
                                                    },
                                                );
                                            },
                                        );
                                    });
                                    blueprint.afterMakingState(
                                        'inactive',
                                        callback,
                                    );
                                    return [
                                        4,
                                        factory
                                            .for(User)
                                            .state('inactive')
                                            .make(),
                                    ];
                                case 1:
                                    _a.sent();
                                    expect(callback).toHaveBeenCalledTimes(1);
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
                it('should create a single entity', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var createdUser;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    exports.defineUserProfile(factory);
                                    return [4, factory.for(User).create()];
                                case 1:
                                    createdUser = _a.sent();
                                    expect(Array.isArray(createdUser)).toEqual(
                                        false,
                                    );
                                    expect(createdUser).toHaveProperty(
                                        'username',
                                    );
                                    expect(createdUser).toHaveProperty('email');
                                    expect(createdUser).toHaveProperty(
                                        'active',
                                    );
                                    expect(createdUser.posts).toBeUndefined();
                                    return [2];
                            }
                        });
                    });
                });
                it('should call afterCreate', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var blueprint, callback;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    blueprint = exports.defineUserProfile(
                                        factory,
                                    );
                                    callback = jest.fn();
                                    blueprint.afterCreating(callback);
                                    return [4, factory.for(User).create()];
                                case 1:
                                    _a.sent();
                                    expect(callback).toHaveBeenCalledTimes(1);
                                    return [2];
                            }
                        });
                    });
                });
                it('should call afterMake and afterCreate', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var blueprint, afterMake, afterCreate;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    blueprint = exports.defineUserProfile(
                                        factory,
                                    );
                                    afterMake = jest.fn();
                                    afterCreate = jest.fn();
                                    blueprint.afterMaking(afterMake);
                                    blueprint.afterCreating(afterCreate);
                                    return [4, factory.for(User).create()];
                                case 1:
                                    _a.sent();
                                    expect(afterMake).toHaveBeenCalledTimes(1);
                                    expect(afterCreate).toHaveBeenCalledTimes(
                                        1,
                                    );
                                    return [2];
                            }
                        });
                    });
                });
                it('should call afterMake and afterCreate with states', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var blueprint,
                            factoryActive,
                            afterMake,
                            afterMakeActive,
                            afterCreate,
                            afterCreateActive;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    blueprint = exports.defineUserProfile(
                                        factory,
                                    );
                                    factoryActive = jest.fn();
                                    afterMake = jest.fn();
                                    afterMakeActive = jest.fn();
                                    afterCreate = jest.fn();
                                    afterCreateActive = jest.fn();
                                    blueprint.state('active', factoryActive);
                                    blueprint.afterMaking(afterMake);
                                    blueprint.afterMakingState(
                                        'active',
                                        afterMakeActive,
                                    );
                                    blueprint.afterCreating(afterCreate);
                                    blueprint.afterCreatingState(
                                        'active',
                                        afterCreateActive,
                                    );
                                    return [
                                        4,
                                        factory
                                            .for(User)
                                            .state('active')
                                            .create(),
                                    ];
                                case 1:
                                    _a.sent();
                                    expect(factoryActive).toHaveBeenCalledTimes(
                                        1,
                                    );
                                    expect(afterMake).toHaveBeenCalledTimes(1);
                                    expect(
                                        afterMakeActive,
                                    ).toHaveBeenCalledTimes(1);
                                    expect(afterCreate).toHaveBeenCalledTimes(
                                        1,
                                    );
                                    expect(
                                        afterCreateActive,
                                    ).toHaveBeenCalledTimes(1);
                                    return [2];
                            }
                        });
                    });
                });
                it('should allow overriding of properties during create', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var users, idx;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    exports.defineUserProfile(factory);
                                    return [
                                        4,
                                        factory
                                            .for(User)
                                            .with({
                                                username: 'Chuck',
                                                email: 'email@example.com',
                                            })
                                            .create(2, {
                                                username: 'overridden-username',
                                            }),
                                    ];
                                case 1:
                                    users = _a.sent();
                                    for (idx in users) {
                                        if (users[idx]) {
                                            expect(users[idx].username).toEqual(
                                                'overridden-username',
                                            );
                                            expect(users[idx].email).toEqual(
                                                'email@example.com',
                                            );
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
    describe('Common', function() {
        return __awaiter(_this, void 0, void 0, function() {
            var _this = this;
            return __generator(this, function(_a) {
                it('should allow overriding properties by passing object to "with"', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var user;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    exports.defineUserProfile(factory);
                                    return [
                                        4,
                                        factory
                                            .for(User)
                                            .with({
                                                email: 'email@example.com',
                                                username: 'with-username',
                                            })
                                            .create(),
                                    ];
                                case 1:
                                    user = _a.sent();
                                    expect(user.email).toEqual(
                                        'email@example.com',
                                    );
                                    expect(user.username).toEqual(
                                        'with-username',
                                    );
                                    return [2];
                            }
                        });
                    });
                });
                it('should resolve factory calls in callbacks', function() {
                    return __awaiter(_this, void 0, void 0, function() {
                        var blueprint, user, postId;
                        var _this = this;
                        return __generator(this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    blueprint = exports.defineUserProfile(
                                        factory,
                                    );
                                    exports.definePostProfile(factory);
                                    blueprint.afterCreating(function(
                                        usr,
                                        context,
                                    ) {
                                        return __awaiter(
                                            _this,
                                            void 0,
                                            void 0,
                                            function() {
                                                var _a;
                                                return __generator(
                                                    this,
                                                    function(_b) {
                                                        switch (_b.label) {
                                                            case 0:
                                                                _a = usr;
                                                                return [
                                                                    4,
                                                                    context.factory
                                                                        .for(
                                                                            'post',
                                                                        )
                                                                        .create(
                                                                            3,
                                                                            {
                                                                                author: usr,
                                                                            },
                                                                        ),
                                                                ];
                                                            case 1:
                                                                _a.posts = _b.sent();
                                                                return [2];
                                                        }
                                                    },
                                                );
                                            },
                                        );
                                    });
                                    return [4, factory.for(User).create()];
                                case 1:
                                    user = _a.sent();
                                    expect(user.posts).toHaveLength(3);
                                    for (postId in user.posts) {
                                        if (user.posts[postId]) {
                                            expect(
                                                user.posts[postId],
                                            ).toHaveProperty('title');
                                            expect(
                                                user.posts[postId],
                                            ).toHaveProperty('body');
                                            expect(
                                                user.posts[postId].author
                                                    .username,
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
});
