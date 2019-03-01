import { TypeormBlueprint } from '@entity-factory/typeorm';
import { Comment } from '../entities/Comment.entity';
import { Post } from '../entities/Post.entity';
import { User } from '../entities/User.entity';

export class PostBlueprint extends TypeormBlueprint<Post> {
    constructor() {
        super();

        this.type(Post);

        this.define(async (faker) => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));

        this.state('with-author', async (faker) => ({
            author: async (factory) => await factory.for(User).create(),
        }));

        this.state('with-comments', async (faker) => ({
            comments: async (factory) =>
                factory
                    .for(Comment)
                    .state('with-user')
                    .create(3),
        }));
    }
}
