import { EntityFactory, ObjectBlueprint } from '../../src';
import { IUser } from '../00-entities/interfaces';

export const factory = new EntityFactory();

factory.register((profile: ObjectBlueprint<IUser>) => {
    profile.type('user');

    profile.define(async (faker) => {
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: faker.random.boolean(),
        };
    });
});
