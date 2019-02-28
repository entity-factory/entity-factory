import FakerStatic = Faker.FakerStatic;
import { BlueprintDeepPartial } from './BlueprintDeepPartial';

/**
 * Method used when defining a base factory and state factory
 */
export type BlueprintDefinitionMethod<EntityType> = (
    fakerInstance: FakerStatic,
) => Promise<BlueprintDeepPartial<EntityType>>;
