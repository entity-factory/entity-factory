import { BlueprintBuilder, FixtureProfile } from '../../src';
import { IUser } from './interfaces';

export class UserFixture extends FixtureProfile<IUser> {
    register(builder: BlueprintBuilder): void {
        builder.define<IUser>('user', faker => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: true,
        }));

        builder.state<IUser>('user', 'inactive', faker => ({
            active: false,
        }));

        builder.afterMaking<IUser>('user', async (user, { factory, faker }) => {
            const posts = await factory
                .for('post')
                .with({
                    title: 'foobar',
                })
                .make(3, {
                    body: 'nope',
                });

            user.posts = posts;
        });

        builder.afterCreating<IUser>(
            'user',
            async (user, { factory, faker }) => {
                const posts = await factory
                    .for('post')
                    .with({
                        title: faker.company.bsBuzz(),
                    })
                    .make(3);

                user.posts = posts;
            },
        );
    }
}
