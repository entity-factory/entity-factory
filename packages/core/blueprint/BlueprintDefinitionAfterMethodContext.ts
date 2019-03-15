/**
 * @module Blueprint
 */

import { EntityFactoryExecutor } from '../EntityFactoryExecutor';
import FakerStatic = Faker.FakerStatic;

/**
 * Options passed to BlueprintDefinitionAfterMethod
 */
export interface BlueprintDefinitionAfterMethodContext<Adapter> {
    factory: EntityFactoryExecutor;
    faker: FakerStatic;
    adapter: Adapter;
}
