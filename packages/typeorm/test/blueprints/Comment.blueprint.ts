import { TypeormBlueprint } from '../../TypeormBlueprint';
import { Comment } from '../entities/Comment.entity';
import { Post } from '../entities/Post.entity';
import { User } from '../entities/User.entity';

export class CommentBlueprint extends TypeormBlueprint<Comment> {
    constructor() {
        super();

        this.type(Comment);

        this.define(async ({ faker, factory }) => ({
            body: faker.lorem.sentences(2),
        }));

        this.state('with-user', async ({ faker, factory }) => ({
            user: await factory.for(User).create(),
        }));

        this.state('with-post', async ({ faker, factory }) => ({
            user: await factory.for(Post).create(),
        }));
    }
}
