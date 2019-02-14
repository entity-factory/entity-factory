import { FixtureProfile, BlueprintBuilder } from '../../src';
import { Comment } from '../entities/Comment';

export class CommentFixture extends FixtureProfile<Comment> {
    register(builder: BlueprintBuilder): void {
        builder.define(Comment, faker => ({
            body: faker.lorem.sentences(2),
        }));
    }
}
