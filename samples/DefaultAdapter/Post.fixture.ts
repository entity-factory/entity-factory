import { BlueprintBuilder, FixtureProfile } from '../../src';
import { IPost } from './interfaces';

export class PostFixture extends FixtureProfile<IPost> {
    register(builder: BlueprintBuilder): void {
        builder.define<IPost>('post', faker => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));
    }
}
