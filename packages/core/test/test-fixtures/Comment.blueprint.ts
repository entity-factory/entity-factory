import { ObjectBlueprint } from '../../adapters/object/ObjectBlueprint';
import { IComment } from './Comment';

export class CommentBlueprint extends ObjectBlueprint<IComment> {
    constructor() {
        super();

        this.type('comment');

        this.define(async (faker) => ({
            body: faker.lorem.sentences(2),
        }));

        this.state('with-user', async (faker) => ({
            user: async (factory) => factory.for('user').create(),
        }));

        this.state('with-post', async (faker) => ({
            user: async (factory) => factory.for('post').create(),
        }));
    }
}
