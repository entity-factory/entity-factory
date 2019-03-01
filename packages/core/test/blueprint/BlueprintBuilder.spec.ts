import { ObjectBlueprint } from '../../adapters/object/ObjectBlueprint';
import { EntityFactory } from '../../EntityFactory';

export class User {
    public id: number;
    public username: string;
    public email: string;
    public active: boolean;
    public posts: Post[];
}

interface Post {
    id: number;
    author: User;
    title: string;
    body: string;
}

export const definePostProfile = (factory: EntityFactory): ObjectBlueprint<Post> => {
    const profile = new ObjectBlueprint<Post>();
    profile.type('post');
    profile.define(async (faker) => ({
        title: faker.company.catchPhrase(),
        body: faker.lorem.paragraphs(2, '\n\n'),
    }));

    factory.register(profile);

    return profile;
};

export const defineUserProfile = (factory: EntityFactory): ObjectBlueprint<User> => {
    const profile = new ObjectBlueprint<User>();

    profile.type(User);
    profile.define(async (faker) => ({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        active: true,
    }));

    factory.register(profile);

    return profile;
};

describe('BlueprintBuilder', () => {
    let factory: EntityFactory;
    beforeEach(() => {
        factory = new EntityFactory();
    });

    describe('Make', async () => {
        it('should make a single entity', async () => {
            defineUserProfile(factory);
            const user = await factory.for(User).make();

            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('active');
            expect(user).toHaveProperty('name');
            expect(user.posts).toBeUndefined();
        });

        it('should override an attribute when passing a partial', async () => {
            const expected = 'typeorm';
            defineUserProfile(factory);

            const user = await factory
                .for(User)
                .with({
                    username: expected,
                })
                .make();

            expect(user.username).toEqual(expected);
        });

        it('should create multiple entities', async () => {
            defineUserProfile(factory);

            const users = await factory.for(User).make(2);

            expect(users.length).toEqual(2);
        });

        it('should allow overriding attributes for multiple entities when passing a partial', async () => {
            const expected = 'typeorm';
            defineUserProfile(factory);

            const users = await factory
                .for(User)
                .with({
                    username: expected,
                })
                .make(2);

            for (const idx in users) {
                if (users[idx]) {
                    expect(users[idx].username).toEqual(expected);
                }
            }
        });

        it('should call after making callback', async () => {
            const callback = jest.fn();

            const blueprint = defineUserProfile(factory);
            blueprint.afterMaking(callback);

            await factory.for(User).make();

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should call after making callback for each entity made', async () => {
            const callback = jest.fn();

            const blueprint = defineUserProfile(factory);

            blueprint.afterMaking(callback);

            await factory.for(User).make(4);

            expect(callback).toHaveBeenCalledTimes(4);
        });

        it('should resolve state factory calls', async () => {
            const blueprint = defineUserProfile(factory);
            definePostProfile(factory);

            blueprint.state('with-posts', async (faker) => ({
                posts: async (fac) => await fac.for<Post>('post').make(2),
            }));

            const user = await factory
                .for(User)
                .state('with-posts')
                .make();

            expect(user.posts.length).toEqual(2);
        });

        it('should call afterMakingState callbacks', async () => {
            const callback = jest.fn();

            const blueprint = defineUserProfile(factory);

            blueprint.state('inactive', async (faker) => ({
                active: false,
            }));

            blueprint.afterMakingState('inactive', callback);

            await factory
                .for(User)
                .state('inactive')
                .make();

            expect(callback).toHaveBeenCalledTimes(1);
        });
    });

    describe('Create', async () => {
        it('should create a single entity', async () => {
            defineUserProfile(factory);
            const createdUser = await factory.for(User).create();

            expect(Array.isArray(createdUser)).toEqual(false);
            expect(createdUser).toHaveProperty('username');
            expect(createdUser).toHaveProperty('email');
            expect(createdUser).toHaveProperty('active');
            expect(createdUser.posts).toBeUndefined();
        });

        it('should call afterCreate', async () => {
            const blueprint = defineUserProfile(factory);

            const callback = jest.fn();
            blueprint.afterCreating(callback);

            await factory.for(User).create();

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should call afterMake and afterCreate', async () => {
            const blueprint = defineUserProfile(factory);

            const afterMake = jest.fn();
            const afterCreate = jest.fn();
            blueprint.afterMaking(afterMake);
            blueprint.afterCreating(afterCreate);

            await factory.for(User).create();

            expect(afterMake).toHaveBeenCalledTimes(1);
            expect(afterCreate).toHaveBeenCalledTimes(1);
        });

        it('should call afterMake and afterCreate with states', async () => {
            const blueprint = defineUserProfile(factory);

            const factoryActive = jest.fn();
            const afterMake = jest.fn();
            const afterMakeActive = jest.fn();
            const afterCreate = jest.fn();
            const afterCreateActive = jest.fn();

            blueprint.state('active', factoryActive);
            blueprint.afterMaking(afterMake);
            blueprint.afterMakingState('active', afterMakeActive);
            blueprint.afterCreating(afterCreate);
            blueprint.afterCreatingState('active', afterCreateActive);

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
            defineUserProfile(factory);

            const users = await factory
                .for(User)
                .with({
                    username: 'Chuck',
                    email: 'email@example.com',
                })
                .create(2, {
                    username: 'overridden-username',
                });

            for (const idx in users) {
                if (users[idx]) {
                    expect(users[idx].username).toEqual('overridden-username');
                    expect(users[idx].email).toEqual('email@example.com');
                }
            }
        });
    });

    describe('Common', async () => {
        it('should allow overriding properties by passing object to "with"', async () => {
            defineUserProfile(factory);

            const user = await factory
                .for(User)
                .with({
                    email: 'email@example.com',
                    username: 'with-username',
                })
                .create();

            expect(user.email).toEqual('email@example.com');
            expect(user.username).toEqual('with-username');
        });

        it('should resolve factory calls in callbacks', async () => {
            const blueprint = defineUserProfile(factory);
            definePostProfile(factory);

            blueprint.afterCreating(async (usr, context) => {
                usr.posts = await context.factory.for<Post>('post').create(3, {
                    author: usr,
                });
            });

            const user = await factory.for(User).create();

            expect(user.posts).toHaveLength(3);

            for (const postId in user.posts) {
                if (user.posts[postId]) {
                    expect(user.posts[postId]).toHaveProperty('title');
                    expect(user.posts[postId]).toHaveProperty('body');
                    expect(user.posts[postId].author.username).toBeDefined();
                }
            }
        });
    });
});
