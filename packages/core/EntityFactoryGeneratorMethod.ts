/**
 * @module EntityFactory
 */

import { BlueprintFactoryMethodContext } from './blueprint/BlueprintFactoryMethodContext';

/**
 * Method used when defining a base factory and state factory
 */
export type EntityFactoryGeneratorMethod<EntityType> = (context: BlueprintFactoryMethodContext) => Promise<EntityType>;
