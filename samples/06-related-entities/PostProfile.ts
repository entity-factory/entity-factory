import { ObjectProfile } from '../../src';
import { IPost } from '../00-entities/interfaces';

export class PostProfile extends ObjectProfile<IPost> {
    constructor() {
        super();

        this.type('post');

        this.define(async faker => {
            return {
                title: faker.company.bsBuzz(),
                body: faker.lorem.paragraphs(2),
            };
        });
    }
}
