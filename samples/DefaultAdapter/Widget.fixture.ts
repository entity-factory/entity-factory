import { FixtureProfile } from '../../src';
import { Blueprint } from '../../src';
import { IWidget } from './interfaces';

export class WidgetFixture extends FixtureProfile<IWidget> {
    public register(blueprint: Blueprint<IWidget>): void {
        blueprint.define('widget', async faker => {
            return {
                name: faker.fake('{{name.firstName}} {{name.lastName}}'),
                active: true,
            };
        });
    }
}
