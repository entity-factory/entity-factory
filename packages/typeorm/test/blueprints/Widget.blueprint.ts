import { TypeormBlueprint } from '../../TypeormBlueprint';
import { Widget } from '../entities/Widget.entity';

export class WidgetBlueprint extends TypeormBlueprint<Widget> {
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
