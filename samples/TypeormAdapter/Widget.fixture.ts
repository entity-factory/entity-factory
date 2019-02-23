import { FixtureProfile, TypeormAdapterContext } from '../../src';
import { Blueprint } from '../../src';
import { Widget } from './Widget.entity';

export class WidgetFixture extends FixtureProfile<
    Widget,
    TypeormAdapterContext
> {
    public register(blueprint: Blueprint<Widget, TypeormAdapterContext>): void {
        blueprint.setType(Widget);

        blueprint.define(async faker => {
            return {
                name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                active: true,
            };
        });
    }
}
