import { FixtureProfile } from '../../src';
import { Blueprint } from '../../src/blueprint/Blueprint';
import { Widget } from './Widget.entity';

export class WidgetFixture extends FixtureProfile<Widget> {
    register(blueprint: Blueprint<Widget>): void {
        blueprint.define(Widget, async faker => {
            return {
                name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                active: true,
            };
        });
    }
}
