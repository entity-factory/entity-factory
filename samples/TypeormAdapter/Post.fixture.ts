import { BlueprintBuilder, FixtureProfile } from '../../src';
import { Post } from './Post.entity';

export class PostFixture extends FixtureProfile<Post> {
    register(builder: BlueprintBuilder): void {
        builder.define(Post, faker => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));
    }
}
