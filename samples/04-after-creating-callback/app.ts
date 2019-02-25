import { EntityFactory, ObjectBlueprint } from '../../src';

interface User {
    id: number;
    username: string;
    email: string;
    active: boolean;
}

const fixtureFactory = new EntityFactory();
fixtureFactory.register((blueprint: ObjectBlueprint<User>) => {
    blueprint.setType('user');

    blueprint.define(async faker => {
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: false,
        };
    });

    blueprint.afterCreating(async (user, { faker, factory, adapter }) => {
        user.active = true;
    });
});

fixtureFactory
    .for<User>('user')
    .create(3)
    .then(users => {
        console.log('Users have been made: ', users);
    });
// output:
// Users have been made:  [
//     { id: 1, username: 'Johathan.Schimmel66', email: 'Lauriane.Stracke@yahoo.com', active: true },
//     { id: 2, username: 'Clara.Murphy45', email: 'Mikayla52@yahoo.com', active: true },
//     { id: 3, username: 'Cathryn.Kris', email: 'Liliane_Pagac11@yahoo.com', active: true }
// ]
