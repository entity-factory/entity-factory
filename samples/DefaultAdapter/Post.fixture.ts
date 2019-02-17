import { FactoryBuilder, FixtureProfile } from '../../src';
import { IPost } from './interfaces';

export class PostFixture extends FixtureProfile<IPost> {
    register(builder: FactoryBuilder): void {
        builder.define<IPost>('post', async faker => ({
            title: faker.company.catchPhrase(),
            body: faker.lorem.paragraphs(2, '\n\n'),
        }));
    }
}
