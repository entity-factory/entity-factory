import { ObjectBlueprint } from '@entity-factory/core';
import { IPost } from '../entities/interfaces';

export class PostProfile extends ObjectBlueprint<IPost> {
    constructor() {
        super();

        this.type('post');

        this.define(async (faker) => {
            return {
                title: faker.company.bsBuzz(),
                body: faker.lorem.paragraphs(2),
            };
        });
    }
}
