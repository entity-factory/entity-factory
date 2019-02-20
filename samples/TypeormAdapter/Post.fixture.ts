import { FixtureProfile } from '../../src';
import { Blueprint } from '../../src/blueprint/Blueprint';
import { Post } from './Post.entity';

export class PostFixture extends FixtureProfile<Post> {
    register(blueprint: Blueprint<Post>): void {
        blueprint.define(Post, async faker => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));
    }
}
