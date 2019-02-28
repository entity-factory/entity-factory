import { BlueprintDefinitionAfterMethodContext } from './BlueprintDefinitionAfterMethodContext';
export declare type BlueprintDefinitionAfterMethod<EntityType, Adapter> = (entity: EntityType, context: BlueprintDefinitionAfterMethodContext<Adapter>) => Promise<void>;
