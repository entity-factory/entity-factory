import { FixtureProfile } from '../../src';
import { Blueprint } from '../../src/blueprint/Blueprint';
import { Post } from './Post.entity';
import { User } from './User.entity';

export class UserFixture extends FixtureProfile<User> {
    register(blueprint: Blueprint<User>): void {
        blueprint.define(User, async faker => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: true,
        }));

        blueprint.state('inactive', async faker => ({
            active: false,
        }));

        blueprint.afterMaking(async (user, { factory, faker }) => {
            user.posts = await factory
                .for(Post)
                .with({
                    title: 'foobar',
                })
                .make(3, {
                    body: 'nope',
                });
        });

        blueprint.afterCreating(async (user, { factory, faker }) => {
            user.posts = await factory
                .for(Post)
                .with({
                    title: faker.company.bsBuzz(),
                })
                .make(3);
        });
    }
}
