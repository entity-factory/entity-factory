import { EntityFactory, ObjectBlueprint } from '../../src';
import { IUser } from '../00-entities/interfaces';

export const entityFactory = new EntityFactory();

entityFactory.register((profile: ObjectBlueprint<IUser>) => {
    profile.type('user');

    profile.define(async (faker) => {
        return {
            username: faker.internet.userName(),
            active: false,
        };
    });

    profile.state('with-email', async (faker) => {
        return {
            email: faker.internet.userName(),
        };
    });

    profile.afterMaking(async (user, { faker, factory, adapter }) => {
        user.active = true;
    });

    profile.afterMakingState('with-email', async (user, { faker, factory, adapter }) => {
        user.username = user.email;
    });
});
