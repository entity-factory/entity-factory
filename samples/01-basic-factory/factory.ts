import { EntityFactory, ObjectProfile } from '../../src';
import { IUser } from '../00-entities/interfaces';

export const factory = new EntityFactory();

factory.register((profile: ObjectProfile<IUser>) => {
    profile.setType('user');

    profile.define(async faker => {
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: true,
        };
    });
});
