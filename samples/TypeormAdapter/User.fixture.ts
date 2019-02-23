import { FixtureProfile, TypeormAdapterContext } from '../../src';
import { Blueprint } from '../../src';
import { Post } from './Post.entity';
import { User } from './User.entity';

export class UserFixture extends FixtureProfile<User, TypeormAdapterContext> {
    public register(blueprint: Blueprint<User, TypeormAdapterContext>): void {
        blueprint.setType(User);

        blueprint.define(async faker => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: true,
        }));

        blueprint.state('inactive', async faker => ({
            active: false,
        }));

        blueprint.state('with-posts', async faker => ({
            posts: async factory => await factory.for(Post).make(3),
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
