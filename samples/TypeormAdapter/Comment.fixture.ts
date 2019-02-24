import { TypeormBlueprint, TypeormProfile } from '../../src';
import { Comment } from './Comment.entity';
import { Post } from './Post.entity';
import { User } from './User.entity';

export class CommentFixture extends TypeormProfile<Comment> {
    public register(blueprint: TypeormBlueprint<Comment>): void {
        blueprint.setType(Comment);

        blueprint.define(async faker => ({
            body: faker.lorem.sentences(2),
        }));

        blueprint.state('with-user', async faker => ({
            user: async factory => factory.for(User).create(),
        }));

        blueprint.state('with-post', async faker => ({
            user: async factory => factory.for(Post).create(),
        }));
    }
}
