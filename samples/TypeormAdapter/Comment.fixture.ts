import { TypeormBlueprint } from '../../src';
import { Comment } from '../00-entities/Comment.entity';
import { Post } from '../00-entities/Post.entity';
import { User } from '../00-entities/User.entity';

export class CommentFixture extends TypeormBlueprint<Comment> {
    constructor() {
        super();

        this.type(Comment);

        this.define(async (faker) => ({
            body: faker.lorem.sentences(2),
        }));

        this.state('with-user', async (faker) => ({
            user: async (factory) => factory.for(User).create(),
        }));

        this.state('with-post', async (faker) => ({
            user: async (factory) => factory.for(Post).create(),
        }));
    }
}
