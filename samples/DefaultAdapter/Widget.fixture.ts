import { DefaultAdapterContext, FixtureProfile } from '../../src';
import { Blueprint } from '../../src';
import { IWidget } from './interfaces';

export class WidgetFixture extends FixtureProfile<
    IWidget,
    DefaultAdapterContext
> {
    public register(
        blueprint: Blueprint<IWidget, DefaultAdapterContext>,
    ): void {
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
