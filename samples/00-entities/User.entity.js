'use strict';
var __decorate =
    (this && this.__decorate) ||
    function(decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d;
        if (
            typeof Reflect === 'object' &&
            typeof Reflect.decorate === 'function'
        )
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r =
                        (c < 3
                            ? d(r)
                            : c > 3
                            ? d(target, key, r)
                            : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __metadata =
    (this && this.__metadata) ||
    function(k, v) {
        if (
            typeof Reflect === 'object' &&
            typeof Reflect.metadata === 'function'
        )
            return Reflect.metadata(k, v);
    };
Object.defineProperty(exports, '__esModule', { value: true });
var typeorm_1 = require('typeorm');
var Comment_entity_1 = require('./Comment.entity');
var Post_entity_1 = require('./Post.entity');
var User = (function() {
    function User() {}
    __decorate(
        [typeorm_1.PrimaryGeneratedColumn(), __metadata('design:type', Number)],
        User.prototype,
        'id',
        void 0,
    );
    __decorate(
        [typeorm_1.Column(), __metadata('design:type', String)],
        User.prototype,
        'username',
        void 0,
    );
    __decorate(
        [typeorm_1.Column(), __metadata('design:type', String)],
        User.prototype,
        'email',
        void 0,
    );
    __decorate(
        [typeorm_1.Column(), __metadata('design:type', Boolean)],
        User.prototype,
        'active',
        void 0,
    );
    __decorate(
        [
            typeorm_1.OneToMany(
                function(type) {
                    return Post_entity_1.Post;
                },
                function(post) {
                    return post.author;
                },
            ),
            __metadata('design:type', Array),
        ],
        User.prototype,
        'posts',
        void 0,
    );
    __decorate(
        [
            typeorm_1.OneToMany(
                function(type) {
                    return Comment_entity_1.Comment;
                },
                function(comment) {
                    return comment.user;
                },
            ),
            __metadata('design:type', Array),
        ],
        User.prototype,
        'comments',
        void 0,
    );
    User = __decorate([typeorm_1.Entity()], User);
    return User;
})();
exports.User = User;
//# sourceMappingURL=User.entity.js.map
