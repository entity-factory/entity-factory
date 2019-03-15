/**
 * @module Blueprint
 */

import { DeepEntityPartial } from '..';
import { BlueprintFactoryMethodContext } from './BlueprintFactoryMethodContext';

/**
 * Method used when defining a base factory and state factory
 */
export type BlueprintDefinitionMethod<EntityType> = (
    context: BlueprintFactoryMethodContext,
) => Promise<DeepEntityPartial<EntityType>>;
