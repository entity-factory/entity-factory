import { TypeormBlueprint } from '../../src';
import { Post } from '../00-entities/Post.entity';
import { User } from '../00-entities/User.entity';

export class UserFixture extends TypeormBlueprint<User> {
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
            posts: async (factory) => await factory.for(Post).make(3),
        }));
    }
}
