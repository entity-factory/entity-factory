import { ObjectBlueprint, ObjectProfile } from '../../src';
import { IWidget } from './interfaces';

export class WidgetFixture extends ObjectProfile<IWidget> {
    public register(blueprint: ObjectBlueprint<IWidget>): void {
        blueprint.context({
            type: 'widget',
            idAttribute: 'widgetId',
        });

        blueprint.define(async faker => {
            return {
                name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                active: true,
            };
        });
    }
}
