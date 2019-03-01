import { EntityFactory } from '@entity-factory/core';
import { createConnection } from 'typeorm';
import { TypeormAdapter } from '../TypeormAdapter';
import { CommentBlueprint } from './blueprints/Comment.blueprint';
import { PostBlueprint } from './blueprints/Post.blueprint';
import { UserBlueprint } from './blueprints/User.blueprint';
import { Comment } from './entities/Comment.entity';
import { Post } from './entities/Post.entity';
import { User } from './entities/User.entity';
import { Widget } from './entities/Widget.entity';

describe('TypeORM Adapter', async () => {
    describe('Connection Management', async () => {
        it('should use existing connection', async () => {
            const connection = await createConnection({
                type: 'sqlite',
                database: ':memory:',
                entities: [Widget],
                synchronize: true,
            });

            const adapter = new TypeormAdapter();
            const widget = new Widget();
            widget.name = 'widget';
            widget.active = true;

            await adapter.create([widget], { __type: Widget });

            expect(widget.widgetId).toEqual(1);

            await connection.close();
        });

        it('should use existing named connection', async () => {
            const connection = await createConnection({
                name: 'widgetConnection',
                type: 'sqlite',
                database: ':memory:',
                entities: [Widget],
                synchronize: true,
            });

            const adapter = new TypeormAdapter('widgetConnection');
            const widget = new Widget();
            widget.name = 'widget';
            widget.active = true;

            await adapter.create([widget], { __type: Widget });

            expect(widget.widgetId).toEqual(1);

            const result = await connection.manager.query(`select * from widget where widgetId = 1`);

            expect(result[0].widgetId).toEqual(1);

            await connection.close();
        });

        it('should create a new connection', async () => {
            const adapter = new TypeormAdapter({
                type: 'sqlite',
                database: ':memory:',
                entities: [Widget],
                synchronize: true,
            });
            const widget = new Widget();
            widget.name = 'widget';
            widget.active = true;

            await adapter.create([widget], { __type: Widget });

            await adapter.dispose();
        });

        it('should create a new named connection', async () => {
            const adapter = new TypeormAdapter({
                name: 'testConn1',
                type: 'sqlite',
                database: ':memory:',
                entities: [Widget],
                synchronize: true,
            });
            const widget = new Widget();
            widget.name = 'widget';
            widget.active = true;

            await adapter.create([widget], { __type: Widget });

            await adapter.dispose();
        });

        it('should create default connection', async () => {
            const adapter = new TypeormAdapter({
                type: 'sqlite',
                database: ':memory:',
                entities: [Widget],
                synchronize: true,
            });
            const widget = new Widget();
            widget.name = 'widget';
            widget.active = true;

            await adapter.create([widget], { __type: Widget });

            await adapter.dispose();
        });
    });

    describe('Make', async () => {
        it('should convert a partial to an entity instance', async () => {
            const adapter = new TypeormAdapter({
                type: 'sqlite',
                database: ':memory:',
                entities: [Widget],
                synchronize: true,
            });

            const partial = {
                name: 'widget',
                active: true,
            };

            const result = await adapter.make([partial], { __type: Widget });

            expect(result[0]).toBeInstanceOf(Widget);
            expect(result[0].name).toEqual(partial.name);
            expect(result[0].active).toEqual(partial.active);

            await adapter.dispose();
        });
    });

    describe('Create', async () => {
        it('should persist data to the database with prepared entities', async () => {
            const adapter = new TypeormAdapter({
                type: 'sqlite',
                database: ':memory:',
                entities: [Widget],
                synchronize: true,
            });

            const partial = {
                name: 'widget',
                active: true,
            };

            const partial2 = {
                name: 'widget 2',
                active: false,
            };

            const prepared = await adapter.make<Widget>([partial, partial2], {
                __type: Widget,
            });
            const result = await adapter.create<Widget>(prepared, {
                __type: Widget,
            });

            expect(result[0]).toBeInstanceOf(Widget);
            expect(result[0].widgetId).toEqual(1);
            expect(result[0].name).toEqual(partial.name);
            expect(result[0].active).toEqual(partial.active);

            expect(result[1]).toBeInstanceOf(Widget);
            expect(result[1].widgetId).toEqual(2);
            expect(result[1].name).toEqual(partial2.name);
            expect(result[1].active).toEqual(partial2.active);

            await adapter.dispose();
        });
    });

    describe('E2E', async () => {
        let factory: EntityFactory;
        let adapter: TypeormAdapter;

        beforeEach(async () => {
            adapter = new TypeormAdapter({
                name: 'e2e-tests',
                type: 'sqlite',
                database: ':memory:',
                synchronize: true,
                entities: [Post, Comment, User],
            });
            factory = new EntityFactory({
                adapter,
                blueprints: [CommentBlueprint, PostBlueprint, UserBlueprint],
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
