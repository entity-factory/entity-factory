import { TypeormBlueprint } from '../../TypeormBlueprint';
import { Post } from '../entities/Post.entity';
import { User } from '../entities/User.entity';

export class UserBlueprint extends TypeormBlueprint<User> {
    constructor() {
        super();

        this.type(User);

        this.define(async ({ faker, factory }) => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: true,
        }));

        this.state('inactive', async ({ faker, factory }) => ({
            active: false,
        }));

        this.state('with-posts', async ({ faker, factory }) => ({
            posts: await factory.for(Post).make(3),
        }));
    }
}
