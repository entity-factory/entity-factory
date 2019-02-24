import { TypeormBlueprint, TypeormProfile } from '../../src';
import { Widget } from './Widget.entity';

export class WidgetFixture extends TypeormProfile<Widget> {
    public register(blueprint: TypeormBlueprint<Widget>): void {
        blueprint.setType(Widget);

        blueprint.define(async faker => {
            return {
                name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                active: true,
            };
        });
    }
}
