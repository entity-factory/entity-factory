/**
 * @module Blueprint
 */

import FakerStatic = Faker.FakerStatic;
import { EntityFactoryExecutor } from '../EntityFactoryExecutor';

export interface BlueprintFactoryMethodContext {
    faker: FakerStatic;
    factory: EntityFactoryExecutor;
}
