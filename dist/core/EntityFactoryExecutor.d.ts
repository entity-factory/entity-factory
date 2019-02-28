import { BlueprintBuilder } from './blueprint/BlueprintBuilder';
import { EntityObjectType } from './common/EntityObjectType';
export interface EntityFactoryExecutor {
    for<EntityType>(entity: EntityObjectType<EntityType> | string): BlueprintBuilder<EntityType>;
}
