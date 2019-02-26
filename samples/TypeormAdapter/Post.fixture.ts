import { TypeormProfile } from '../../src';
import { Comment } from '../00-entities/Comment.entity';
import { Post } from '../00-entities/Post.entity';
import { User } from '../00-entities/User.entity';

export class PostFixture extends TypeormProfile<Post> {
    constructor() {
        super();

        this.type(Post);

        this.define(async faker => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));

        this.state('with-author', async faker => ({
            author: async factory => factory.for(User).create(),
        }));

        this.state('with-comments', async faker => ({
            comments: async factory =>
                factory
                    .for(Comment)
                    .state('with-user')
                    .create(3),
        }));
    }
}
