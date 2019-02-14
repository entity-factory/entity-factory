import { DeepFactoryPartial } from '../common/DeepFactoryPartial';
import {
    FactoryProfileCallbackMethod,
    FactoryProfileMethod,
} from '../common/FactoryProfileMethod';
import { FixtureObjectType } from '../common/FixtureObjectType';

export interface BlueprintBuilder {
    define<Entity>(
        entity: FixtureObjectType<Entity>,
        factory: FactoryProfileMethod<Entity>,
    ): BlueprintBuilder;

    state<Entity>(
        entity: FixtureObjectType<Entity>,
        state: string,
        factory: FactoryProfileMethod<Entity> | DeepFactoryPartial<Entity>,
    ): BlueprintBuilder;

    afterMaking<Entity>(
        entity: FixtureObjectType<Entity>,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): BlueprintBuilder;

    afterMakingState<Entity>(
        entity: FixtureObjectType<Entity>,
        state: string,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): BlueprintBuilder;

    afterCreating<Entity>(
        entity: FixtureObjectType<Entity>,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): BlueprintBuilder;

    afterCreatingState<Entity>(
        entity: FixtureObjectType<Entity>,
        state: string,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): BlueprintBuilder;
}
