import { Blueprint, FixtureFactory } from '../../src';

interface User {
    id: number;
    username: string;
    email: string;
    active: boolean;
}

const factory = new FixtureFactory();
factory.register((blueprint: Blueprint<User>) => {
    blueprint.setType('user');

    blueprint.define(async faker => {
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: false,
        };
    });

    blueprint.state('active', async faker => {
        return {
            active: true,
        };
    });
});

factory
    .for<User>('user')
    .state('active')
    .create(3)
    .then(users => {
        console.log('Entities have been created with ids: ', users);
    });
