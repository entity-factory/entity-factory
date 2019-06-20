import { ObjectBlueprint } from '../../adapters/object/ObjectBlueprint';
import { Uuid } from './Uuid';

export class UuidBlueprint extends ObjectBlueprint<Uuid> {
    constructor() {
        super();

        this.type(Uuid);

        this.options({
            uuidPrimary: true,
        });

        this.define(async ({ faker, factory }) => {
            return {
                name: faker.company.bsAdjective(),
            };
        });
    }
}
