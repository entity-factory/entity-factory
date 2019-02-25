import { TypeormProfile } from '../../src';
import { Widget } from '../00-entities/Widget.entity';

export class WidgetFixture extends TypeormProfile<Widget> {
    constructor() {
        super();

        this.setType(Widget);

        this.define(async faker => {
            return {
                name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                active: true,
            };
        });
    }
}
