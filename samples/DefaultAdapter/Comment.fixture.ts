import { FixtureProfile } from '../../src';
import { Blueprint } from '../../src';
import { IComment } from './interfaces';

export class CommentFixture extends FixtureProfile<IComment> {
    public register(blueprint: Blueprint<IComment>): void {
        blueprint.define('comment', async faker => ({
            body: faker.lorem.sentences(2),
        }));
    }
}
