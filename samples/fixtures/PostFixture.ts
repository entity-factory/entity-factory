import { FixtureProfile, BlueprintBuilder } from '../../src';
import { Post } from '../entities/Post';

export class PostFixture extends FixtureProfile<Post> {
    register(builder: BlueprintBuilder): void {
        builder.define(Post, faker => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));
    }
}
