import { BaseAdapterContext } from '..';
import { DeepFactoryPartial } from '..';
import {
    FactoryProfileCallbackMethod,
    FactoryProfileMethod,
} from '../common/FactoryProfileMethod';
import { FixtureObjectType } from '../common/FixtureObjectType';

export interface Blueprint<
    Entity = Record<string, any>,
    Context extends BaseAdapterContext = BaseAdapterContext
> {
    /**
     * Set the type entity being defined
     *
     * @param entity
     */
    setType(
        entity: FixtureObjectType<Entity> | string,
    ): Blueprint<Entity, Context>;

    /**
     * Set the blueprint context
     *
     * @param context
     */
    context(context: Context): Blueprint<Entity, Context>;

    /**
     * Define a new entity factory
     *
     * @param entity
     * @param factory
     */
    define(
        entity: FixtureObjectType<Entity> | string,
        factory: FactoryProfileMethod<Entity>,
    ): Blueprint<Entity, Context>;

    /**
     * Define a factory state transformation
     *
     * @param state
     * @param factory
     */
    state(
        state: string,
        factory: FactoryProfileMethod<Entity> | DeepFactoryPartial<Entity>,
    ): Blueprint<Entity, Context>;

    /**
     * Define an after making callback
     *
     * @param callback
     */
    afterMaking(
        callback: FactoryProfileCallbackMethod<Entity>,
    ): Blueprint<Entity, Context>;

    /**
     * Define an after making callback for a state transformation
     *
     * @param state
     * @param callback
     */
    afterMakingState(
        state: string,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): Blueprint<Entity, Context>;

    /**
     * Define an after creating method
     *
     * @param callback
     */
    afterCreating(
        callback: FactoryProfileCallbackMethod<Entity>,
    ): Blueprint<Entity, Context>;

    /**
     * Define an after creating method for a state transformation
     *
     * @param state
     * @param callback
     */
    afterCreatingState(
        state: string,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): Blueprint<Entity, Context>;
}
