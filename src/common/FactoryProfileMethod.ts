import FakerStatic = Faker.FakerStatic;
import { EntityManager } from 'typeorm';
import { Builder } from '../Builder';
import { FixtureFactory } from '../FixtureFactory';
import { DeepFactoryPartial } from './DeepFactoryPartial';
import { FixtureObjectType } from './FixtureObjectType';

export type FactoryBuilderMethod = <FactoryEntity>(
    entity: FixtureObjectType<FactoryEntity>,
) => Builder<FactoryEntity>;

export type CallBackContext = {
    factory: FixtureFactory;
    faker: FakerStatic;
    manager: EntityManager;
};
// method for creating partials of an object using faker
export type FactoryProfileMethod<EntityType> = (
    fakerInstance: FakerStatic,
) => DeepFactoryPartial<EntityType>;

// Method for altering a partial after has been created, used for state manipulations
export type FactoryProfileCallbackMethod<EntityType> = (
    entity: EntityType,
    context: CallBackContext,
) => Promise<void>;
