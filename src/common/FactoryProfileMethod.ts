import FakerStatic = Faker.FakerStatic;
import { FactoryCallBackContext } from './FactoryCallBackContext';
import { DeepFactoryPartial } from './DeepFactoryPartial';

/**
 * Method used when defining a base factory and state factory
 */
export type FactoryProfileMethod<EntityType> = (
    fakerInstance: FakerStatic,
) => Promise<DeepFactoryPartial<EntityType>>;

/**
 * Method passed as callback to to afterCreating and afterMaking used
 * for manipulating an entity
 */
export type FactoryProfileCallbackMethod<EntityType> = (
    entity: EntityType,
    context: FactoryCallBackContext,
) => Promise<void>;
