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

    blueprint.afterMaking(async (user, { faker, factory, adapter }) => {
        user.active = true;
    });
});

fixtureFactory
    .for<User>('user')
    .make(3)
    .then(users => {
        console.log('Users have been made: ', users);
    });
// output:
// Users have been made:  [
//     { username: 'Adonis.Kreiger15', email: 'Misael19@yahoo.com', active: true },
//     { username: 'Eldon.Sauer', email: 'Jeromy16@yahoo.com', active: true },
//     { username: 'Sage9', email: 'Jedediah_Schmeler@gmail.com', active: true }
// ]
