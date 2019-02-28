import { ObjectBlueprint } from '@entity-factory/core';
import { IWidget } from './Widget';

export class WidgetFixture extends ObjectBlueprint<IWidget> {
    constructor() {
        super();

        this.type('widget');

        this.options({
            idAttribute: 'widgetId',
        });

        this.define(async (faker) => {
            return {
                name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                active: true,
            };
        });
    }
}
