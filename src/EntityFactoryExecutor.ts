import { BlueprintBuilder } from './blueprint/BlueprintBuilder';
import { EntityObjectType } from './common/EntityObjectType';

/**
 * Used by BlueprintDeepPartialMethod when passing factory to callback
 */
export interface EntityFactoryExecutor {
    for<EntityType>(entity: EntityObjectType<EntityType> | string): BlueprintBuilder<EntityType>;
}
