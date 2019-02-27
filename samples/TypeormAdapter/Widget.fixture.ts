import { TypeormBlueprint } from '../../src';
import { Widget } from '../00-entities/Widget.entity';

export class WidgetFixture extends TypeormBlueprint<Widget> {
    constructor() {
        super();

        this.type(Widget);

        this.define(async (faker) => {
            return {
                name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                active: true,
            };
        });
    }
}
