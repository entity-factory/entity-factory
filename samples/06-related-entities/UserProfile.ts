import { ObjectBlueprint } from '../../src';
import { IUser } from '../00-entities/interfaces';

class UserProfile extends ObjectBlueprint<IUser> {
    constructor() {
        super();

        this.type('user');

        this.define(async (faker) => {
            return {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                active: faker.random.boolean(),
            };
        });

        this.state('with-posts', async (faker) => {
            return {
                posts: async (factory) => factory.for('post').create(2),
            };
        });

        this.afterCreatingState('with-post', async (user, { factory, faker }) => {
            user.posts = user.posts.map((p) => {
                p.author = user;

                return p;
            });
        });
    }
}
