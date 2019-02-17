import { FactoryBuilder, FixtureProfile } from '../../src';
import { IComment } from './interfaces';

export class CommentFixture extends FixtureProfile<IComment> {
    register(builder: FactoryBuilder): void {
        builder.define<IComment>('comment', async faker => ({
            body: faker.lorem.sentences(2),
        }));
    }
}
