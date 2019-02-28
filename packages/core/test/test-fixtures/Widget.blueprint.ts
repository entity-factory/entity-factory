import { ObjectBlueprint } from '../../adapters/object/ObjectBlueprint';
import { IWidget } from './Widget';

export class WidgetBlueprint extends ObjectBlueprint<IWidget> {
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
