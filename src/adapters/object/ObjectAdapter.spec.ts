import { Widget } from '../../../samples/00-entities/Widget.entity';
import { DeepEntityPartial } from '../../interfaces';
import { ObjectAdapter } from './ObjectAdapter';
import { ObjectContext } from './ObjectContext';

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
    public active: boolean;

    public getName() {
        return this.name;
    }
}

interface CustomObjectInterface {
    customId: number;
    name: string;
    active: boolean;
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
            idAttribute: 'customId',
        };

        let results = await adapter.make([customPartial], context);
        results = await adapter.create(results, context);

        expect(results[0].customId).toEqual(1);
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
        const context = { type: CustomObject };

        const customPartial: DeepEntityPartial<CustomObjectInterface> = {
            name: 'custom',
        };

        const adapter = new ObjectAdapter({
            defaultIdAttribute: 'customId',
        });

        let results = await adapter.make([customPartial], context);
        results = await adapter.create(results, context);

        expect(results[0].customId).toEqual(1);
    });

    it('should make an object with a false value', async () => {
        const adapter = new ObjectAdapter();
        const partial: DeepEntityPartial<CustomObjectInterface> = {
            active: false,
        };

        const results = await adapter.make<CustomObject>([partial], {
            type: CustomObject,
        });

        expect(results[0]).toBeInstanceOf(CustomObject);
        expect(results[0].getName()).toEqual(results[0].name);
        expect(results[0]).toBeInstanceOf(CustomObject);
        expect(results[0]).toHaveProperty('active');
        expect(results[0].active).toEqual(false);
    });
});
