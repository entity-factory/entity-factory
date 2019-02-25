import { Widget } from '../../../samples/TypeormAdapter/Widget.entity';
import { DeepEntityPartial, ObjectAdapter, ObjectContext } from '../..';

const widgetPartial: DeepEntityPartial<Widget> = {
    name: 'widgetA',
    active: true,
};

const widgetPartial2: DeepEntityPartial<Widget> = {
    name: 'widgetB',
    active: true,
};

class CustomObject {
    public customid: number;
    public name: string;
}

interface CustomObjectInterface {
    _id: number;
    name: string;
}

describe('ObjectAdapter', async () => {
    it('should return and entity based on a partial', async () => {
        const adapter = new ObjectAdapter();
        const result = await adapter.make([widgetPartial, widgetPartial2], {
            type: Widget,
        });

        expect(result[0].id).toBeUndefined();
        expect(result[1].id).toBeUndefined();
    });

    it('should create sequential ids when calling create by default', async () => {
        const adapter = new ObjectAdapter();
        const context = { type: Widget };

        let result = await adapter.make(
            [widgetPartial, widgetPartial2],
            context,
        );
        result = await adapter.create(result, context);

        expect(result[0].id).toEqual(1);
        expect(result[1].id).toEqual(2);
    });

    it('should allow custom mappings for id attributes in context', async () => {
        const customPartial: DeepEntityPartial<CustomObjectInterface> = {
            name: 'custom',
        };

        const adapter = new ObjectAdapter();

        const context: ObjectContext = {
            type: 'customObject',
            idAttribute: '_id',
        };

        let results = await adapter.make([customPartial], context);
        results = await adapter.create(results, context);

        expect(results[0]._id).toEqual(1);
    });

    it('should allow string types to be used', async () => {
        const adapter = new ObjectAdapter();

        const context = { type: 'widget' };

        let results = await adapter.make([widgetPartial], context);

        expect(results[0].name).toEqual('widgetA');
        expect(results[0].active).toEqual(widgetPartial.active);

        results = await adapter.create(results, context);

        expect(results[0].id).toEqual(1);
    });

    it('should allow for id generation to be disabled', async () => {
        const adapter = new ObjectAdapter({
            generateId: false,
        });
        const context = { type: Widget };

        let results = await adapter.make([widgetPartial], context);
        results = await adapter.create(results, context);

        expect(results[0].id).toBeUndefined();
    });

    it('should allow the default id attribute to be changed', async () => {
        const context = { type: 'customObject' };

        const customPartial: DeepEntityPartial<CustomObjectInterface> = {
            name: 'custom',
        };

        const adapter = new ObjectAdapter({
            defaultIdAttribute: '_id',
        });

        let results = await adapter.make([customPartial], context);
        results = await adapter.create(results, context);

        expect(results[0]._id).toEqual(1);
    });
});
