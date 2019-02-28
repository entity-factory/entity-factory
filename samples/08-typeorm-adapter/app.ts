import { EntityFactory } from '@entity-factory/core';
import { TypeormAdapter } from '@entity-factory/typeorm';
import { CommentBlueprint } from './blueprints/Comment.blueprint';
import { PostBlueprint } from './blueprints/Post.blueprint';
import { UserBlueprint } from './blueprints/User.blueprint';
import { Comment } from './entities/Comment.entity';
import { Post } from './entities/Post.entity';
import { User } from './entities/User.entity';

const adapter = new TypeormAdapter({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    entities: [Post, Comment, User],
});
const factory = new EntityFactory({
    adapter,
    blueprints: [CommentBlueprint, PostBlueprint, UserBlueprint],
});

// factory
//     .for(Post)
//     .state('with-author', 'with-comments')
//     .create(2)
//     .then(users => console.log(users));
factory
    .for(User)
    .state('with-posts')
    .create(1)
    .then((users) => console.log(users));
