import { EntityFactory, ObjectProfile } from '../../src';
import { IUser } from '../00-entities/interfaces';

export const entityFactory = new EntityFactory();
entityFactory.register((profile: ObjectProfile<IUser>) => {
    profile.type('user');

    profile.define(async faker => {
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
