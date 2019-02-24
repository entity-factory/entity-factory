import { EntityFactory, ObjectBlueprint } from '../../src';

interface User {
    id: number;
    username: string;
    email: string;
}

const factory = new EntityFactory();
factory.register((blueprint: ObjectBlueprint<User>) => {
    blueprint.setType('user');

    blueprint.define(async faker => {
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
        };
    });
});

factory
    .for<User>('user')
    .make(3)
    .then(users => {
        console.log('Entities have been made: ', users);
    });

factory
    .for<User>('user')
    .create(3)
    .then(users => {
        console.log('Entities have been created with ids: ', users);
    });
