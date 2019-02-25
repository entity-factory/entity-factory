import { ObjectProfile } from '../../src';
import { IWidget } from '../00-entities/interfaces';

export class WidgetFixture extends ObjectProfile<IWidget> {
    constructor() {
        super();

        this.context({
            type: 'widget',
            idAttribute: 'widgetId',
        });

        this.define(async faker => {
            return {
                name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                active: true,
            };
        });
    }
}
