import { TypeormBlueprint, TypeormProfile } from '../../src';
import { Post } from './Post.entity';
import { User } from './User.entity';

export class UserFixture extends TypeormProfile<User> {
    public register(blueprint: TypeormBlueprint<User>): void {
        blueprint.setType(User);

        blueprint.define(async faker => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: true,
        }));

        blueprint.state('inactive', async faker => ({
            active: false,
        }));

        blueprint.state('with-posts', async faker => ({
            posts: async factory => await factory.for(Post).make(3),
        }));
    }
}
