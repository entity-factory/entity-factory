import { Widget } from '../../samples/TypeormAdapter/Widget.entity';
import { DeepEntityPartial, DefaultAdapter } from '../../src';

const widgetPartial: DeepEntityPartial<Widget> = {
    name: 'widgetA',
    active: true,
};

const widgetPartial2: DeepEntityPartial<Widget> = {
    name: 'widgetB',
    active: true,
};

describe('DefaultAdapter', async () => {
    it('should return and entity based on a partial', async () => {
        const adapter = new DefaultAdapter();
        let result = await adapter.make([widgetPartial, widgetPartial2], {
            type: Widget,
        });

        expect(result[0].id).toBeUndefined();
        expect(result[1].id).toBeUndefined();
    });

    it('should create sequential ids when calling create by default', async () => {
        const adapter = new DefaultAdapter();
        const context = { type: Widget };

        let result = await adapter.make(
            [widgetPartial, widgetPartial2],
            context,
        );
        result = await adapter.create(result, context);

        expect(result[0].id).toEqual(1);
        expect(result[1].id).toEqual(2);
    });

    it('should allow custom mappings for id attributes as functions', async () => {
        class CustomObject {
            _id: number;
            name: string;
        }
        const customPartial: DeepEntityPartial<CustomObject> = {
            name: 'custom',
        };

        const adapter = new DefaultAdapter({
            idAttributeMap: new Map([[CustomObject, '_id']]),
        });

        const context = { type: CustomObject };

        let foos = await adapter.make([{ name: 'widget' }], context);
        let widgets = await adapter.make([customPartial], context);
        widgets = await adapter.create(widgets, context);

        expect(widgets[0]._id).toEqual(1);
    });

    it('should allow custom mappings for id attributes as strings', async () => {
        interface CustomObject {
            _id: number;
            name: string;
        }
        const customPartial: DeepEntityPartial<CustomObject> = {
            name: 'custom',
        };

        const adapter = new DefaultAdapter({
            idAttributeMap: new Map([['customObject', '_id']]),
        });

        const context = { type: 'customObject' };

        let results = await adapter.make([customPartial], context);
        results = await adapter.create(results, context);

        expect(results[0]._id).toEqual(1);
    });

    it('should allow string types to be used', async () => {
        const adapter = new DefaultAdapter();

        const context = { type: 'widget' };

        let foos = await adapter.make([widgetPartial], context);
        let results = await adapter.make([widgetPartial], context);

        expect(results[0].name).toEqual('widgetA');
        expect(results[0].active).toEqual(widgetPartial.active);

        results = await adapter.create(results, context);

        expect(results[0].id).toEqual(1);
    });

    it('should allow for id generation to be disabled', async () => {
        const adapter = new DefaultAdapter({
            generateId: false,
        });
        const context = { type: Widget };

        let results = await adapter.make([widgetPartial], context);
        results = await adapter.create(results, context);

        expect(results[0].id).toBeUndefined();
    });

    it('should allow the default id attribute to be changed', async () => {
        interface CustomObject {
            _id: number;
            name: string;
        }
        const context = { type: 'customObject' };

        const customPartial: DeepEntityPartial<CustomObject> = {
            name: 'custom',
        };

        const adapter = new DefaultAdapter({
            defaultIdAttribute: '_id',
        });

        let results = await adapter.make([customPartial], context);
        results = await adapter.create(results, context);

        expect(results[0]._id).toEqual(1);
    });
});
