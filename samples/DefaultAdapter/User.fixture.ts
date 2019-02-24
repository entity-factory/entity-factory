import { ObjectBlueprint, ObjectProfile } from '../../src';
import { IUser } from './interfaces';

export class UserFixture extends ObjectProfile<IUser> {
    public register(blueprint: ObjectBlueprint<IUser>): void {
        blueprint.setType('user');

        blueprint.define(async faker => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: true,
        }));

        blueprint.state('inactive', async faker => ({
            active: false,
        }));

        blueprint.state('with-posts', async faker => ({
            posts: async factory => await factory.for('post').make(3),
        }));

        // blueprint.afterMaking(async (user, { factory, faker }) => {
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
