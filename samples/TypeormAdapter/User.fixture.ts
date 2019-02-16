import { BlueprintBuilder, FixtureProfile } from '../../src';
import { Post } from './Post.entity';
import { User } from './User.entity';

export class UserFixture extends FixtureProfile<User> {
    register(builder: BlueprintBuilder): void {
        builder.define(User, faker => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: true,
        }));

        builder.state(User, 'inactive', faker => ({
            active: false,
        }));

        builder.afterMaking(User, async (user, { factory, faker }) => {
            const posts = await factory
                .for(Post)
                .with({
                    title: 'foobar',
                })
                .make(3, {
                    body: 'nope',
                });

            user.posts = posts;
        });

        builder.afterCreating(User, async (user, { factory, faker }) => {
            const posts = await factory
                .for(Post)
                .with({
                    title: faker.company.bsBuzz(),
                })
                .make(3);

            user.posts = posts;
        });
    }
}
