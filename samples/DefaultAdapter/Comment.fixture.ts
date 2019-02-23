import { DefaultAdapterContext, FixtureProfile } from '../../src';
import { Blueprint } from '../../src';
import { IComment } from './interfaces';

export class CommentFixture extends FixtureProfile<
    IComment,
    DefaultAdapterContext
> {
    public register(
        blueprint: Blueprint<IComment, DefaultAdapterContext>,
    ): void {
        blueprint.context({
            type: 'comment',
        });

        blueprint.define('comment', async faker => ({
            body: faker.lorem.sentences(2),
        }));

        blueprint.state('with-user', async faker => ({
            user: async factory => factory.for('user').create(),
        }));

        blueprint.state('with-post', async faker => ({
            user: async factory => factory.for('post').create(),
        }));
    }
}
