import { ObjectBlueprint } from '../../adapters/object/ObjectBlueprint';
import { IComment } from './Comment';
import { Post } from './Post';
import { IUser } from './User';

export class PostBlueprint extends ObjectBlueprint<Post> {
    constructor() {
        super();

        this.type(Post);

        this.define(async ({ faker, factory }) => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));

        this.state('with-author', async ({ faker, factory }) => ({
            author: await factory.for<IUser>('user').create(),
        }));

        this.state('with-comments', async ({ faker, factory }) => ({
            comments: await factory
                .for<IComment>('comment')
                .state('with-user')
                .create(3),
        }));
    }
}
