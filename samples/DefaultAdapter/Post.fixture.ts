import { DefaultAdapterContext, FixtureProfile } from '../../src';
import { Blueprint } from '../../src';
import { IPost } from './interfaces';

export class PostFixture extends FixtureProfile<IPost, DefaultAdapterContext> {
    public register(blueprint: Blueprint<IPost, DefaultAdapterContext>): void {
        blueprint.setType('post');

        blueprint.define(async faker => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));

        blueprint.state('with-author', async faker => ({
            author: async factory => factory.for('user').create(),
        }));

        blueprint.state('with-comments', async faker => ({
            comments: async factory =>
                factory
                    .for('comment')
                    .state('with-user')
                    .create(3),
        }));
    }
}
