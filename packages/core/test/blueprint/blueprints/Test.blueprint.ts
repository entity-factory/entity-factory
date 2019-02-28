import { ObjectBlueprint } from '../../../adapters/object/ObjectBlueprint';
import { TestEntity } from './Test.entity';

export class TestBlueprint extends ObjectBlueprint<TestEntity> {
    constructor() {
        super();

        this.type('test');
    }
}
