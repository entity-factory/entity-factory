import { ObjectProfile } from '../../src';
import { IComment } from '../00-entities/interfaces';

export class CommentFixture extends ObjectProfile<IComment> {
    constructor() {
        super();

        this.setType('comment');

        this.define(async faker => ({
            body: faker.lorem.sentences(2),
        }));

        this.state('with-user', async faker => ({
            user: async factory => factory.for('user').create(),
        }));

        this.state('with-post', async faker => ({
            user: async factory => factory.for('post').create(),
        }));
    }
}
