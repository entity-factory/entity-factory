import { DefaultAdapterContext, FixtureProfile } from '../../src';
import { Blueprint } from '../../src';
import { IPost, IUser } from './interfaces';

export class UserFixture extends FixtureProfile<IUser, DefaultAdapterContext> {
    public register(blueprint: Blueprint<IUser, DefaultAdapterContext>): void {
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
