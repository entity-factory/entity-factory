import { FixtureProfile } from '../../src';
import { Blueprint } from '../../src';
import { IPost, IUser } from './interfaces';

export class UserFixture extends FixtureProfile<IUser> {
    register(blueprint: Blueprint<IUser>): void {
        blueprint.define('user', async faker => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: true,
        }));

        blueprint.state('inactive', async faker => ({
            active: false,
        }));

        blueprint.afterMaking(async (user, { factory, faker }) => {
            user.posts = await factory
                .for<IPost>('post')
                .with({
                    title: 'foobar',
                })
                .make(3, {
                    body: 'nope',
                });
        });

        blueprint.afterCreating(async (user, { factory, faker }) => {
            user.posts = await factory
                .for<IPost>('post')
                .with({
                    title: faker.company.bsBuzz(),
                })
                .make(3);
        });
    }
}
