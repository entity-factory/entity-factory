import { Builder } from '../Builder';
import { FixtureObjectType } from './FixtureObjectType';

/**
 * Used by DeepFactoryPartialMethod when passing factory to callback
 */
export interface FactoryExecutor {
    for<EntityType>(
        entity: FixtureObjectType<EntityType> | string,
    ): Builder<EntityType>;
}
