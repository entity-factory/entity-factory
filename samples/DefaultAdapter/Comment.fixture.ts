import { BlueprintBuilder, FixtureProfile } from '../../src';
import { IComment } from './interfaces';

export class CommentFixture extends FixtureProfile<IComment> {
    register(builder: BlueprintBuilder): void {
        builder.define('comment', faker => ({
            body: faker.lorem.sentences(2),
        }));
    }
}
