import { EntityFactory, ObjectAdapter, ObjectBlueprint } from '../../packages/src';

export interface ICustomObject {
    _id: number;
    name: string;
}

export interface Widget {
    widgetId: number;
    name: string;
}

// Set teh default id attribute to '_id'. WHen generating id's the ObjectAdapter will use this key.
const objectAdapter = new ObjectAdapter({
    defaultIdAttribute: '_id',
    generateId: true,
});

export const factory = new EntityFactory({
    adapter: objectAdapter,
});

factory.register((profile: ObjectBlueprint<ICustomObject>) => {
    profile.type('customObject');

    profile.define(async (faker) => {
        return {
            name: faker.company.bsBuzz(),
        };
    });
});

factory.register((profile: ObjectBlueprint<Widget>) => {
    profile.type('widget');

    profile.options({
        idAttribute: 'widgetId',
    });

    profile.define(async (faker) => {
        return {
            name: faker.company.bsBuzz(),
        };
    });
});
