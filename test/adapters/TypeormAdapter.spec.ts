import { createConnection } from 'typeorm';
import { Widget } from '../../samples/TypeormAdapter/Widget.entity';
import { TypeormAdapter } from '../../src';

describe('Typeorm Adapter', async () => {
    describe('Connection Management', async () => {
        it('should create a new connection using ormconfig.json', async () => {
            const adapter = new TypeormAdapter();
            const widget = new Widget();
            widget.name = 'widget';
            widget.active = true;

            await adapter.create([widget], { type: Widget });

            await adapter.dispose();
        });

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

            await adapter.create([widget], { type: Widget });

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

            await adapter.create([widget], { type: Widget });

            expect(widget.widgetId).toEqual(1);

            const result = await connection.manager.query(
                `select * from widget where widgetId = 1`,
            );

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

            await adapter.create([widget], { type: Widget });

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

            await adapter.create([widget], { type: Widget });

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

            await adapter.create([widget], { type: Widget });

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

            const result = await adapter.make([partial], { type: Widget });

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
                type: Widget,
            });
            const result = await adapter.create<Widget>(prepared, {
                type: Widget,
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
});
