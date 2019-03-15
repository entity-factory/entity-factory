/**
 * @module Blueprint
 */

import { BlueprintDeepPartial } from './BlueprintDeepPartial';
import { BlueprintFactoryMethodContext } from './BlueprintFactoryMethodContext';

/**
 * Method used when defining a base factory and state factory
 */
export type BlueprintDefinitionMethod<EntityType> = (
    context: BlueprintFactoryMethodContext,
) => Promise<BlueprintDeepPartial<EntityType>>;
