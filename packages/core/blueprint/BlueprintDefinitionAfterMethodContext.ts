/**
 * @module Blueprint
 */

import { EntityFactory } from '../EntityFactory';
import FakerStatic = Faker.FakerStatic;

/**
 * Options passed to BlueprintDefinitionAfterMethod
 */
export interface BlueprintDefinitionAfterMethodContext<Adapter> {
    factory: EntityFactory;
    faker: FakerStatic;
    adapter: Adapter;
}
