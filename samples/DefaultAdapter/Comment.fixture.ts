import { ObjectBlueprint, ObjectProfile } from '../../src';
import { IComment } from './interfaces';

export class CommentFixture extends ObjectProfile<IComment> {
    public register(blueprint: ObjectBlueprint<IComment>): void {
        blueprint.setType('comment');

        blueprint.define(async faker => ({
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
