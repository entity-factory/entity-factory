import { ConnectionOptions } from 'typeorm';
import { FixtureFactory } from '../src';
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

export const defineUserFactory = (factory: FixtureFactory) => {
    factory.define(User, async faker => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        active: true,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    }));
};

export const definePostFactory = (factory: FixtureFactory) => {
    factory.define(Post, async faker => ({
        title: faker.company.catchPhrase(),
        body: faker.lorem.paragraphs(2, '\n\n'),
    }));
};
