import { BlueprintDefinitionAfterMethodContext } from './BlueprintDefinitionAfterMethodContext';

/**
 * Method passed as callback to to afterCreating and afterMaking used
 * for manipulating an entity
 */
export type BlueprintDefinitionAfterMethod<EntityType, Adapter> = (
    entity: EntityType,
    context: BlueprintDefinitionAfterMethodContext<Adapter>,
) => Promise<void>;
