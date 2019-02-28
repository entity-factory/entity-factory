import { ObjectBlueprint } from '../../adapters/object/ObjectBlueprint';
import { IUser } from './User';

export class UserBlueprint extends ObjectBlueprint<IUser> {
    constructor() {
        super();

        this.type('user');

        this.define(async (faker) => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: true,
        }));

        this.state('inactive', async (faker) => ({
            active: false,
        }));

        this.state('with-posts', async (faker) => ({
            posts: async (factory) => await factory.for('post').make(3),
        }));

        // this.afterMaking(async (user, { factory, faker }) => {
        //     user.posts = await factory
        //         .for<IPost>('post')
        //         .with({
        //             title: 'foobar',
        //         })
        //         .make(3, {
        //             body: 'nope',
        //         });
        // });
    }
}
