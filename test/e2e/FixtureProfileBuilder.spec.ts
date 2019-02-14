import { Post } from '../../samples/entities/Post';
import { User } from '../../samples/entities/User';
import { FixtureFactory } from '../../src';
import {
    definePostFactory,
    defineUserFactory,
    getFactory,
    getManager,
} from '../helpers';

describe('Blueprint (e2e)', () => {
    let factory: FixtureFactory;
    beforeEach(() => {
        factory = getFactory();
    });

    describe('Make', async () => {
        it('should make a single entity', async () => {
            defineUserFactory(factory);
            const user = await factory.for(User).make();

            expect(user.id).toBeUndefined();
            expect(user.email).toBeDefined();
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
        it('should write a single entity to the database', async () => {
            defineUserFactory(factory);
            const createdUser = await factory.for(User).create();

            const manager = await getManager(factory);
            const user = await manager.findOne(User, createdUser.id);

            expect(user.id).toBeDefined();
        });

        it('should call afterCreate', async () => {
            defineUserFactory(factory);
            definePostFactory(factory);

            factory.afterCreating(User, async (user, context) => {
                user.posts = await context.factory.for(Post).create(3, {
                    author: user,
                });
            });

            const createdUser = await factory.for(User).create();

            const manager = await getManager(factory);
            const user = await manager.findOne(User, createdUser.id, {
                relations: ['posts', 'posts.author'],
            });

            expect(user.posts).toHaveLength(3);

            for (let postId in user.posts) {
                expect(user.posts[postId].id).toBeDefined();
                expect(user.posts[postId].author.id).toEqual(user.id);
            }
        });
    });
});
