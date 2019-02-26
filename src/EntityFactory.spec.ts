import { CommentFixture as DefaultCommentFixture } from '../samples/DefaultAdapter/Comment.fixture';
import { IPost, IUser, IWidget } from '../samples/00-entities/interfaces';
import { PostFixture as DefaultPostFixture } from '../samples/DefaultAdapter/Post.fixture';
import { UserFixture as DefaultUserFixture } from '../samples/DefaultAdapter/User.fixture';
import { Comment } from '../samples/00-entities/Comment.entity';
import { CommentFixture as TypeormCommentFixture } from '../samples/TypeormAdapter/Comment.fixture';
import { Post } from '../samples/00-entities/Post.entity';
import { PostFixture as TypeormPostFixture } from '../samples/TypeormAdapter/Post.fixture';
import { User } from '../samples/00-entities/User.entity';
import { UserFixture as TypeormUserFixture } from '../samples/TypeormAdapter/User.fixture';
import { Widget } from '../samples/00-entities/Widget.entity';
import { ObjectAdapter } from './adapters/object/ObjectAdapter';
import { TypeormAdapter } from './adapters/typeorm/TypeormAdapter';
import { EntityFactory } from './EntityFactory';
import { BaseProfile } from './profile/BaseProfile';
import { ProfileBuilder } from './profile/ProfileBuilder';

describe('EntityFactory', () => {
    describe('Basic Functions', async () => {
        it('should load profiles', () => {
            const factory = new EntityFactory({
                profiles: [TypeormUserFixture],
            });

            expect(factory.hasBlueprint(User)).toBe(true);
        });

        it('should allow "for" to be called with a string and return a builder instance', async () => {
            const blueprint = new BaseProfile<IUser>();
            blueprint.type('user');
            blueprint.define(jest.fn());

            const factory = new EntityFactory();
            factory.register(blueprint);

            const builder = factory.for('user');

            expect(builder).toBeInstanceOf(ProfileBuilder);
        });

        it('should allow "for" to be called with a function and return a builder instance', async () => {
            const blueprint = new BaseProfile<User>();
            blueprint.type(User);
            blueprint.define(jest.fn());

            const factory = new EntityFactory();
            factory.register(blueprint);

            const builder = factory.for(User);

            expect(builder).toBeInstanceOf(ProfileBuilder);
        });

        it('show throw error if getFactoryMethod is called for non-existent factory method', async () => {
            const factory = new EntityFactory();

            expect(() => factory.for('user')).toThrowError(
                'No blueprint exists for entity user',
            );
        });

        it('should return a registered factory', async () => {
            const factory = new EntityFactory();
            factory.register(blueprint => {
                blueprint.type(Widget);
            });

            expect(factory.getProfile(Widget)).toBeDefined();
        });

        it('should allow a factory to be registered via callback', async () => {
            const factory = new EntityFactory();
            factory.register((profile: BaseProfile<IWidget>) => {
                profile.type('widget');
                profile.define(async faker => ({
                    name: faker.lorem.word(),
                    active: true,
                }));
            });

            expect(factory.getProfile('widget')).toBeDefined();

            const result = await factory.for('widget').make();

            expect(result.name).toBeDefined();
            expect(result.active).toEqual(true);
        });
    });

    describe('ObjectAdapter', async () => {
        let factory: EntityFactory;

        beforeEach(async () => {
            const adapter = new ObjectAdapter();
            factory = new EntityFactory({
                adapter,
                profiles: [
                    DefaultCommentFixture,
                    DefaultPostFixture,
                    DefaultUserFixture,
                ],
            });
        });

        it('should make an entity and its nested relations', async () => {
            const post = await factory
                .for<IPost>('post')
                .state('with-comments', 'with-author')
                .make();

            expect(post.author.id).toBeDefined();
            expect(post.comments.length).toBeGreaterThan(1);
            for (const comment of post.comments) {
                expect(comment.id).toBeDefined();
            }
        });

        it('should create an entity and its nested relations', async () => {
            const posts = await factory
                .for<IPost>('post')
                .state('with-comments', 'with-author')
                .create(3);

            for (const post of posts) {
                expect(post.id).toBeDefined();
                expect(post.author.id).toBeDefined();
                expect(post.comments.length).toBeGreaterThan(1);
                for (const comment of post.comments) {
                    expect(comment.id).toBeDefined();
                    expect(comment.user.id).toBeDefined();
                }
            }
        });
    });

    describe('TypeormAdapter', async () => {
        let factory: EntityFactory;
        let adapter: TypeormAdapter;

        beforeEach(async () => {
            adapter = new TypeormAdapter({
                type: 'sqlite',
                database: ':memory:',
                synchronize: true,
                entities: [User, Post, Comment],
            });
            factory = new EntityFactory({
                adapter,
                profiles: [
                    TypeormCommentFixture,
                    TypeormPostFixture,
                    TypeormUserFixture,
                ],
            });
        });

        afterEach(async () => {
            await adapter.dispose();
        });

        it('should make an entity', async () => {
            const user = await factory.for(User).make();

            expect(user).toBeInstanceOf(User);
        });

        it('should make an entity with relations', async () => {
            const post = await factory
                .for(Post)
                .state('with-author', 'with-comments')
                .make();

            expect(post.author.id).toBeDefined();
            expect(post.comments.length).toBeGreaterThan(1);
        });

        it('should persist an entity with relations to the database', async () => {
            const post = await factory
                .for(Post)
                .state('with-author', 'with-comments')
                .create();

            expect(post.author.id).toBeDefined();
            expect(post.comments.length).toBeGreaterThan(1);

            const result = await adapter
                .getManager()
                .getRepository(Post)
                .findOne(1, {
                    relations: ['author', 'comments', 'comments.user'],
                });

            if (result) {
                expect(result.id).toBeDefined();
                expect(result.author.id).toBeDefined();
                expect(result.comments.length).toBeGreaterThan(1);
                for (const comment of result.comments) {
                    expect(comment.id).toBeDefined();
                    expect(comment.user.id).toBeDefined();
                }
            } else {
                fail('post not defined');
            }
        });
    });
});
