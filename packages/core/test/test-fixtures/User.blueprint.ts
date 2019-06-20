import { ObjectBlueprint } from '../../adapters/object/ObjectBlueprint';
import { Post } from './Post';
import { IUser } from './User';

export class UserBlueprint extends ObjectBlueprint<IUser> {
    constructor() {
        super();

        this.type('user');

        this.define(async ({ faker, factory }) => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: true,
        }));

        this.state('inactive', async ({ faker, factory }) => ({
            active: false,
        }));

        this.state('with-posts', async ({ faker, factory }) => ({
            posts: await factory.for<Post>('post').make(3),
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
