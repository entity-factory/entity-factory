import { EntityFactory, ObjectBlueprint } from '@entity-factory/core';
import { IUser } from '../entities/interfaces';

export const factory = new EntityFactory();
factory.register((profile: ObjectBlueprint<IUser>) => {
    profile.type('user');

    profile.define(async (faker) => {
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: false,
        };
    });

    profile.state('active', async (faker) => {
        return {
            active: true,
        };
    });
});
