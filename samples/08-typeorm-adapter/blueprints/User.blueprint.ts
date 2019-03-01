import { TypeormBlueprint } from '@entity-factory/typeorm';
import { Post } from '../entities/Post.entity';
import { User } from '../entities/User.entity';

export class UserBlueprint extends TypeormBlueprint<User> {
    constructor() {
        super();

        this.type(User);

        this.define(async (faker) => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: true,
        }));

        this.state('inactive', async (faker) => ({
            active: false,
        }));

        this.state('with-posts', async (faker) => ({
            posts: async (factory) =>
                await factory
                    .for(Post)
                    .state('with-comments')
                    .create(3),
        }));
    }
}
