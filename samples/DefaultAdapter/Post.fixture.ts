import { FixtureProfile } from '../../src';
import { Blueprint } from '../../src';
import { IPost } from './interfaces';

export class PostFixture extends FixtureProfile<IPost> {
    register(blueprint: Blueprint<IPost>): void {
        blueprint.define('post', async faker => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));
    }
}
