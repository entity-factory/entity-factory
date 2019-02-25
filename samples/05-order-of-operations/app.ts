import { EntityFactory, ObjectBlueprint } from '../../src';

interface User {
    id: number;
    username: string;
    email: string;
    active: boolean;
}

const factory = new EntityFactory();
factory.register((blueprint: ObjectBlueprint<User>) => {
    blueprint.setType('user');

    blueprint.define(async faker => {
        console.log(`Building entity`);
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: false,
        };
    });

    blueprint.state('active', async faker => {
        console.log(`Applying state 'active'`);
        return {
            active: true,
        };
    });

    blueprint.afterMaking(async (user, context) => {
        console.log(`After making`);
    });

    blueprint.afterMakingState('active', async (user, context) => {
        console.log(`After making state 'active'`);
    });

    blueprint.afterCreating(async (user, context) => {
        console.log(`After creating`);
    });

    blueprint.afterCreatingState('active', async (user, context) => {
        console.log(`After creating state 'active'`);
    });
});

factory
    .for<User>('user')
    .state('active')
    .create()
    .then(users => {
        console.log('Entities have been created with ids: ', users);
    });
// output:
// Building entity
// Applying state 'active'
// After making
// After making state 'active'
// After creating
// After creating state 'active'
