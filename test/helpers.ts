import { ConnectionOptions } from 'typeorm';
import { FixtureFactory } from '../src';
import { Blueprint } from '../src/blueprint/Blueprint';
import { FixtureBlueprint } from '../src/blueprint/FixtureBlueprint';
import { User, Post } from './entities';

export const ormConfig: ConnectionOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: ['samples/entities/*.ts'],
    synchronize: true,
};

export const getDefaultFactory = () => {
    return new FixtureFactory();
};

export const defineUserBlueprint = (
    factory: FixtureFactory,
): Blueprint<User> => {
    const blueprint = new FixtureBlueprint<User>();

    blueprint.define(User, async faker => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        active: true,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    }));

    factory.register(blueprint);

    return blueprint;
};

export const definePostBlueprint = (
    factory: FixtureFactory,
): FixtureBlueprint<Post> => {
    const blueprint = new FixtureBlueprint<Post>();
    blueprint.define(Post, async faker => ({
        title: faker.company.catchPhrase(),
        body: faker.lorem.paragraphs(2, '\n\n'),
    }));

    factory.register(blueprint);

    return blueprint;
};
