import { ObjectBlueprint } from '../../adapters/object/ObjectBlueprint';
import { Post } from './Post';

export class PostBlueprint extends ObjectBlueprint<Post> {
    constructor() {
        super();

        this.type(Post);

        this.define(async (faker) => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));

        this.state('with-author', async (faker) => ({
            author: async (factory) => await factory.for('user').create(),
        }));

        this.state('with-comments', async (faker) => ({
            comments: async (factory) =>
                await factory
                    .for('comment')
                    .state('with-user')
                    .create(3),
        }));
    }
}
