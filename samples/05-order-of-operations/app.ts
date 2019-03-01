import { EntityFactory, ObjectBlueprint } from '@entity-factory/core';
import { IUser } from '../00-entities/interfaces';

const factory = new EntityFactory();
factory.register((profile: ObjectBlueprint<IUser>) => {
    profile.type('user');

    profile.define(async (faker) => {
        console.log(`Building entity`);
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: false,
        };
    });

    profile.state('active', async (faker) => {
        console.log(`Applying state 'active'`);
        return {
            active: true,
        };
    });

    profile.state('with-posts', async (faker) => {
        console.log(`Applying state 'with-posts'`);
        return {};
    });

    profile.afterMaking(async (user, context) => {
        console.log(`After making`);
    });

    profile.afterMakingState('active', async (user, context) => {
        console.log(`After making state 'active'`);
    });

    profile.afterMakingState('with-posts', async (user, context) => {
        console.log(`After making state 'with-posts'`);
    });

    profile.afterCreating(async (user, context) => {
        console.log(`After creating`);
    });

    profile.afterCreatingState('active', async (user, context) => {
        console.log(`After creating state 'active'`);
    });

    profile.afterCreatingState('with-posts', async (user, context) => {
        console.log(`After creating state 'with-posts'`);
    });
});

factory
    .for<IUser>('user')
    .state('active', 'with-posts')
    .create()
    .then((users) => {
        console.log('Entities have been created with ids: ', users);
    });
// output:
// Building entity
// Applying state 'active'
// Applying state 'with-posts'
// After making
// After making state 'active'
// After making state 'with-posts'
// After creating
// After creating state 'active'
// After creating state 'with-posts'
