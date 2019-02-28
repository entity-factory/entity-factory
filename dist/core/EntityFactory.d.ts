import { Blueprint } from './blueprint/Blueprint';
import { BlueprintBuilder } from './blueprint/BlueprintBuilder';
import { EntityObjectType } from './common/EntityObjectType';
import { EntityFactoryExecutor } from './EntityFactoryExecutor';
import { EntityFactoryOptions } from './EntityFactoryOptions';
import { EntityFactoryRegisterCallback } from './EntityFactoryRegisterCallback';
export declare class EntityFactory implements EntityFactoryExecutor {
    private readonly options;
    private readonly profiles;
    private readonly adapter;
    constructor(options?: EntityFactoryOptions);
    for(entity: string): BlueprintBuilder<Record<string, any>>;
    for<EntityType = any>(entity: string | EntityObjectType<EntityType>): BlueprintBuilder<EntityType>;
    hasBlueprint(entity: EntityObjectType<any> | string): boolean;
    getProfile(entity: string): Blueprint<Record<string, any>, any, any>;
    getProfile<Entity>(entity: string | EntityObjectType<Entity>): Blueprint<Entity, any, any>;
    register(fixture: Blueprint<any, any, any> | EntityFactoryRegisterCallback): EntityFactory;
}
