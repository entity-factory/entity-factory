const { EntityFactory, ObjectBlueprint } = require('@entity-factory/core');

const factory = new EntityFactory();

factory.register(profile => {
    profile.type('user');

    profile.define(async faker => {
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: faker.random.boolean(),
        };
    });
});

factory
    .for('user')
    .make(3)
    .then(users => {
        console.log('Entities have been made: ', users);
    });

factory
    .for('user')
    .create(3)
    .then(users => {
        console.log('Entities have been created with ids: ', users);
    });
