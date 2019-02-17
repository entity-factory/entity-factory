import { FactoryBuilder, FixtureProfile } from '../../src';
import { Post } from './Post.entity';

export class PostFixture extends FixtureProfile {
    register(builder: FactoryBuilder): void {
        builder.define(Post, async faker => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));
    }
}
