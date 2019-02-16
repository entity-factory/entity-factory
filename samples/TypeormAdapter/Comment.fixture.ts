import { BlueprintBuilder, FixtureProfile } from '../../src';
import { Comment } from './Comment.entity';

export class CommentFixture extends FixtureProfile<Comment> {
    register(builder: BlueprintBuilder): void {
        builder.define(Comment, faker => ({
            body: faker.lorem.sentences(2),
        }));
    }
}
