import { DeepFactoryPartial } from './DeepFactoryPartial';
import {
    FactoryProfileCallbackMethod,
    FactoryProfileMethod,
} from './FactoryProfileMethod';
import { FixtureObjectType } from './FixtureObjectType';

export interface FactoryBuilder {
    define<Entity>(
        entity: FixtureObjectType<Entity> | string,
        factory: FactoryProfileMethod<Entity>,
    ): FactoryBuilder;

    state<Entity>(
        entity: FixtureObjectType<Entity> | string,
        state: string,
        factory: FactoryProfileMethod<Entity> | DeepFactoryPartial<Entity>,
    ): FactoryBuilder;

    afterMaking<Entity>(
        entity: FixtureObjectType<Entity> | string,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): FactoryBuilder;

    afterMakingState<Entity>(
        entity: FixtureObjectType<Entity>,
        state: string,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): FactoryBuilder;

    afterCreating<Entity>(
        entity: FixtureObjectType<Entity> | string,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): FactoryBuilder;

    afterCreatingState<Entity>(
        entity: FixtureObjectType<Entity>,
        state: string,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): FactoryBuilder;
}
