import { TypeormBlueprint } from '../../TypeormBlueprint';
import { Comment } from '../entities/Comment.entity';
import { Post } from '../entities/Post.entity';
import { User } from '../entities/User.entity';

export class PostBlueprint extends TypeormBlueprint<Post> {
    constructor() {
        super();

        this.type(Post);

        this.define(async ({ faker, factory }) => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));

        this.state('with-author', async ({ faker, factory }) => ({
            author: await factory.for(User).create(),
        }));

        this.state('with-comments', async ({ faker, factory }) => ({
            comments: await factory
                .for(Comment)
                .state('with-user')
                .create(3),
        }));
    }
}
