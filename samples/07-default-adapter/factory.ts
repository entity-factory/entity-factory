import { EntityFactory, ObjectAdapter, ObjectProfile } from '../../src';

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

factory.register((profile: ObjectProfile<ICustomObject>) => {
    profile.context({
        type: 'customObject',
    });

    profile.define(async faker => {
        return {
            name: faker.company.bsBuzz(),
        };
    });
});

factory.register((profile: ObjectProfile<Widget>) => {
    profile.context({
        type: 'widget',
        idAttribute: 'widgetId',
    });

    profile.define(async faker => {
        return {
            name: faker.company.bsBuzz(),
        };
    });
});
