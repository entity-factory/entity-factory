import { FixtureProfile } from '../../src';
import { Blueprint } from '../../src';
import { TypeormAdapterContext } from '../../src';
import { Comment } from './Comment.entity';

export class CommentFixture extends FixtureProfile<
    Comment,
    TypeormAdapterContext
> {
    register(blueprint: Blueprint<Comment>): void {
        blueprint.define(Comment, async faker => ({
            body: faker.lorem.sentences(2),
        }));
    }
}
