import { EntityFactory, ObjectBlueprint } from '@entity-factory/core';
import { IUser } from '../entities/interfaces';

export const entityFactory = new EntityFactory();
entityFactory.register((profile: ObjectBlueprint<IUser>) => {
    profile.type('user');

    profile.define(async (faker) => {
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: false,
        };
    });

    profile.afterCreating(async (user, { faker, factory, adapter }) => {
        user.active = true;
    });
});
