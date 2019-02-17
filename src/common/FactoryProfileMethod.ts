import FakerStatic = Faker.FakerStatic;
import { CallBackContext } from './CallBackContext';
import { DeepFactoryPartial } from './DeepFactoryPartial';

// method for creating partials of an object using faker
export type FactoryProfileMethod<EntityType> = (
    fakerInstance: FakerStatic,
) => Promise<DeepFactoryPartial<EntityType>>;

// Method for altering a partial after has been created, used for state manipulations
export type FactoryProfileCallbackMethod<EntityType> = (
    entity: EntityType,
    context: CallBackContext,
) => Promise<void>;
