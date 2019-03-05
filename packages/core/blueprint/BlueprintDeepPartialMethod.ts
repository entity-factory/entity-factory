/**
 * @module Blueprint
 */

import { EntityFactoryExecutor } from '../EntityFactoryExecutor';

/**
 * Method to resolve property within BlueprintDeepPartial by calling a factory method
 */
export type BlueprintDeepPartialMethod<Type> = (factory: EntityFactoryExecutor) => Type | Promise<Type>;
