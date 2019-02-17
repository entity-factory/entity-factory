import { FactoryBuilder, FixtureProfile } from '../../src';
import { Comment } from './Comment.entity';

export class CommentFixture extends FixtureProfile<Comment> {
    register(builder: FactoryBuilder): void {
        builder.define(Comment, async faker => ({
            body: faker.lorem.sentences(2),
        }));
    }
}
