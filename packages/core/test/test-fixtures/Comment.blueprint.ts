import { ObjectBlueprint } from '../../adapters/object/ObjectBlueprint';
import { IComment } from './Comment';
import { Post } from './Post';
import { IUser } from './User';

export class CommentBlueprint extends ObjectBlueprint<IComment> {
    constructor() {
        super();

        this.type('comment');

        this.define(async ({ faker, factory }) => ({
            body: faker.lorem.sentences(2),
        }));

        this.state('with-user', async ({ faker, factory }) => ({
            user: await factory.for<IUser>('user').create(),
        }));

        this.state('with-post', async ({ faker, factory }) => ({
            user: await factory.for<Post>('post').create(),
        }));
    }
}
