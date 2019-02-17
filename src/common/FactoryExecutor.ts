import { Builder } from '../Builder';
import { FixtureObjectType } from './FixtureObjectType';

export interface FactoryExecutor {
    for<EntityType>(
        entity: FixtureObjectType<EntityType> | string,
    ): Builder<EntityType>;
}
