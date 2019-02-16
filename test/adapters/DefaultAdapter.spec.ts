import { DefaultAdapter } from '../../src/adapters/DefaultAdapter';
import { DeepEntityPartial } from '../../src/common/DeepFactoryPartial';

class Person {
    id: number;
    firstName: string;
    age: number;
}

const personPartial: DeepEntityPartial<Person> = {
    firstName: 'chuck',
    age: 78,
};

const personPartial2: DeepEntityPartial<Person> = {
    firstName: 'clint',
    age: 88,
};

class Widget {
    widgetId: number;
    name: string;
}

const widgetPartial: DeepEntityPartial<Widget> = {
    name: 'the great widgetizer',
};

describe('DefaultAdapter', async () => {
    it('should return and entity based on a partial', async () => {
        const adapter = new DefaultAdapter();
        let result = await adapter.make(Person, [
            personPartial,
            personPartial2,
        ]);

        expect(result[0].id).toBeUndefined();
        expect(result[1].id).toBeUndefined();
    });

    it('should create sequential ids when calling create by default', async () => {
        const adapter = new DefaultAdapter();
        let result = await adapter.make(Person, [
            personPartial,
            personPartial2,
        ]);
        result = await adapter.create(Person, result);

        expect(result[0].id).toEqual(1);
        expect(result[1].id).toEqual(2);
    });

    it('should allow custom mappings for id attributes', async () => {
        const adapter = new DefaultAdapter({
            idAttributeMap: new Map([[Widget, 'widgetId']]),
        });

        let widgets = await adapter.make(Widget, [widgetPartial]);
        widgets = await adapter.create(Widget, widgets);

        expect(widgets[0].widgetId).toEqual(1);
    });

    it('should allow string types to be used', async () => {
        const adapter = new DefaultAdapter();

        let persons = await adapter.make<Person>('person', [personPartial]);

        expect(persons[0].firstName).toEqual('chuck');
        expect(persons[0].age).toEqual(personPartial.age);

        persons = await adapter.create<Person>('person', persons);

        expect(persons[0].id).toEqual(1);
    });

    it('should allow for id generation to be disabled', async () => {
        const adapter = new DefaultAdapter({
            generateId: false,
        });

        let persons = await adapter.make<Person>('person', [personPartial]);
        persons = await adapter.create<Person>('person', persons);

        expect(persons[0].id).toBeUndefined();
    });

    it('should allow the default id attribute to be changed', async () => {
        const adapter = new DefaultAdapter({
            defaultIdAttribute: 'widgetId',
        });

        let results = await adapter.make(Widget, [widgetPartial]);
        results = await adapter.create(Widget, results);

        expect(results[0].widgetId).toEqual(1);
    });
});
