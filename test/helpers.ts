import { ConnectionOptions, EntityManager } from 'typeorm';
import { Post } from '../samples/entities/Post';
import { User } from '../samples/entities/User';
import { FixtureFactory } from '../src';

export const ormConfig: ConnectionOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: ['samples/entities/*.ts'],
    synchronize: true,
};

export const getFactory = () => {
    return new FixtureFactory({
        connection: ormConfig,
    });
};

export const getManager = async (
    factory: FixtureFactory,
): Promise<EntityManager> => {
    const conn = await factory.getConnection();

    return await conn.manager;
};

export const defineUserFactory = (factory: FixtureFactory) => {
    factory.define(User, faker => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        active: true,
    }));
};

export const definePostFactory = (factory: FixtureFactory) => {
    factory.define(Post, faker => ({
        title: faker.company.catchPhrase(),
        body: faker.lorem.paragraphs(2, '\n\n'),
    }));
};
