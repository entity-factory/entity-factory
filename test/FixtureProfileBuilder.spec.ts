import { FixtureFactory } from '../src';
import { User, Post } from './entities';
import {
    definePostFactory,
    defineUserFactory,
    getDefaultFactory,
} from './helpers';

describe('Builder', () => {
    let factory: FixtureFactory;
    beforeEach(() => {
        factory = getDefaultFactory();
    });

    describe('Make', async () => {
        it('should make a single entity', async () => {
            defineUserFactory(factory);
            const user = await factory.for(User).make();

            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('active');
            expect(user).toHaveProperty('name');
            expect(user.posts).toBeUndefined();
        });

        it('should override an attribute when passing a partial', async () => {
            const expected = 'typeorm';
            defineUserFactory(factory);

            const user = await factory
                .for(User)
                .with({
                    username: expected,
                })
                .make();

            expect(user.username).toEqual(expected);
        });

        it('should create multiple entities', async () => {
            defineUserFactory(factory);

            const users = await factory.for(User).make(2);

            expect(users.length).toEqual(2);
        });

        it('should allow overriding attributes for multiple entities when passing a partial', async () => {
            const expected = 'typeorm';
            defineUserFactory(factory);

            const users = await factory
                .for(User)
                .with({
                    username: expected,
                })
                .make(2);

            for (let idx in users) {
                expect(users[idx].username).toEqual(expected);
            }
        });

        it('should call after making callback', async () => {
            const callback = jest.fn();

            defineUserFactory(factory);
            factory.afterMaking(User, callback);

            await factory.for(User).make();

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should call after making callback for each entity made', async () => {
            const callback = jest.fn();

            defineUserFactory(factory);
            factory.afterMaking(User, callback);

            await factory.for(User).make(4);

            expect(callback).toHaveBeenCalledTimes(4);
        });

        it('should resolve state factory calls', async () => {
            defineUserFactory(factory);
            definePostFactory(factory);

            factory.state(User, 'with-posts', faker => ({
                posts: async factory => await factory.for(Post).make(2),
            }));

            const user = await factory
                .for(User)
                .state('with-posts')
                .make();

            expect(user.posts.length).toEqual(2);
        });

        it('should call afterMakingState callbacks', async () => {
            const callback = jest.fn();

            defineUserFactory(factory);

            factory.state(User, 'inactive', faker => ({
                active: false,
            }));

            factory.afterMakingState(User, 'inactive', callback);

            await factory
                .for(User)
                .state('inactive')
                .make();

            expect(callback).toHaveBeenCalledTimes(1);
        });
    });

    describe('Create', async () => {
        it('should create a single entity', async () => {
            defineUserFactory(factory);
            const createdUser = await factory.for(User).create();

            expect(Array.isArray(createdUser)).toEqual(false);
            expect(createdUser).toHaveProperty('username');
            expect(createdUser).toHaveProperty('email');
            expect(createdUser).toHaveProperty('active');
            expect(createdUser.posts).toBeUndefined();
        });

        it('should call afterCreate', async () => {
            defineUserFactory(factory);

            const callback = jest.fn();
            factory.afterCreating(User, callback);

            await factory.for(User).create();

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should call afterMake and afterCreate', async () => {
            defineUserFactory(factory);

            const afterMake = jest.fn();
            const afterCreate = jest.fn();
            factory.afterMaking(User, afterMake);
            factory.afterCreating(User, afterCreate);

            await factory.for(User).create();

            expect(afterMake).toHaveBeenCalledTimes(1);
            expect(afterCreate).toHaveBeenCalledTimes(1);
        });

        it('should call afterMake and afterCreate with states', async () => {
            defineUserFactory(factory);

            const factoryActive = jest.fn();
            const afterMake = jest.fn();
            const afterMakeActive = jest.fn();
            const afterCreate = jest.fn();
            const afterCreateActive = jest.fn();

            factory.state(User, 'active', factoryActive);
            factory.afterMaking(User, afterMake);
            factory.afterMakingState(User, 'active', afterMakeActive);
            factory.afterCreating(User, afterCreate);
            factory.afterCreatingState(User, 'active', afterCreateActive);

            await factory
                .for(User)
                .state('active')
                .create();

            expect(factoryActive).toHaveBeenCalledTimes(1);
            expect(afterMake).toHaveBeenCalledTimes(1);
            expect(afterMakeActive).toHaveBeenCalledTimes(1);
            expect(afterCreate).toHaveBeenCalledTimes(1);
            expect(afterCreateActive).toHaveBeenCalledTimes(1);
        });

        it('should allow overriding of properties during create', async () => {
            defineUserFactory(factory);

            const users = await factory
                .for(User)
                .with({
                    name: 'Chuck',
                    username: 'with-username',
                })
                .create(2, {
                    username: 'overridden-username',
                });

            for (let idx in users) {
                expect(users[idx].username).toEqual('overridden-username');
                expect(users[idx].name).toEqual('Chuck');
            }
        });
    });

    describe('Common', async () => {
        it('should allow overriding properties by passing object to "with"', async () => {
            defineUserFactory(factory);

            const user = await factory
                .for(User)
                .with({
                    name: 'Chuck',
                    username: 'with-username',
                })
                .create();

            expect(user.name).toEqual('Chuck');
            expect(user.username).toEqual('with-username');
        });

        it('should resolve factory calls in callbacks', async () => {
            defineUserFactory(factory);
            definePostFactory(factory);

            factory.afterCreating(User, async (user, context) => {
                user.posts = await context.factory.for(Post).create(3, {
                    author: user,
                });
            });

            const user = await factory.for(User).create();

            expect(user.posts).toHaveLength(3);

            for (let postId in user.posts) {
                expect(user.posts[postId]).toHaveProperty('title');
                expect(user.posts[postId]).toHaveProperty('body');
                expect(user.posts[postId].author.username).toBeDefined();
            }
        });
    });
});
