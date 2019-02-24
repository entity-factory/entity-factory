import * as faker from 'faker';
import { FixtureFactoryAdapter } from './adapters/FixtureFactoryAdapter';
import { FixtureBlueprint } from './blueprint/FixtureBlueprint';
import { DeepEntityPartial } from './common/DeepEntityPartial';
import { DeepFactoryPartialMethod } from './common/DeepFactoryPartial';
import { FactoryCallBackContext } from './common/FactoryCallBackContext';
import {
    FactoryProfileCallbackMethod,
    FactoryProfileMethod,
} from './common/FactoryProfileMethod';
import { FixtureFactory } from './FixtureFactory';
import { isFunction } from './utils';

interface StateBuilderObject<Entity> {
    stateFactory: FactoryProfileMethod<Entity>;
    afterMaking?: FactoryProfileCallbackMethod<Entity>;
    afterCreating?: FactoryProfileCallbackMethod<Entity>;
}

export class Builder<Entity = Record<string, any>> {
    private stateFactories: Array<StateBuilderObject<Entity>> = [];

    private partial: DeepEntityPartial<Entity> = {};

    constructor(
        private readonly blueprint: FixtureBlueprint<Entity>,
        private readonly factory: FixtureFactory,
        private readonly adapter: FixtureFactoryAdapter,
    ) {
        this.stateFactories.push(this.getStateBuilder());
    }

    /**
     * Set states to be built
     *
     * @param state
     */
    public state(...state: string[]): Builder<Entity> {
        state.forEach(s => {
            this.stateFactories.push(this.getStateBuilder(s));
        });

        return this;
    }

    /**
     * Override created entity properties. Will be applied after
     * state transforms and callbacks.
     *
     * @param partial
     */
    public with(partial: DeepEntityPartial<Entity>): Builder<Entity> {
        this.partial = {
            ...(this.partial as any),
            ...(partial as any),
        };

        return this;
    }

    /**
     * Instantiate a single entity
     */
    public async make(): Promise<Entity>;

    /**
     * Instantiate a single entity with an optional override for values
     *
     * @param count
     * @param partial
     */
    public async make(
        count: 1,
        partial?: DeepEntityPartial<Entity>,
    ): Promise<Entity>;

    /**
     * Instantiate multiple entities and return them in an array
     * @param count
     * @param partial
     */
    public async make(
        count: number,
        partial?: DeepEntityPartial<Entity>,
    ): Promise<Entity[]>;

    /**
     * Instantiate one or more entities and return them
     *
     * @param count
     * @param partial
     */
    public async make(
        count: number = 1,
        partial?: DeepEntityPartial<Entity>,
    ): Promise<any> {
        if (partial) {
            this.partial = {
                ...(this.partial as any),
                ...(partial as any),
            };
        }

        const objects: Array<DeepEntityPartial<Entity>> = [];

        for (let makeCount = 0; makeCount < count; makeCount++) {
            const builtObject = await this.resolveStates();
            objects.push(builtObject as DeepEntityPartial<Entity>);
        }

        const preparedEntities = await this.adapter.make(
            objects,
            this.blueprint.getContext(),
        );

        // fire after making for each
        for (const prepared of preparedEntities) {
            const context = this.getCallbackContext();
            // loop through state afterMaking callbacks
            for (const factory of this.stateFactories) {
                const callback = factory.afterMaking;

                if (callback) {
                    await callback(prepared, context);
                }
            }
        }

        return count === 1 ? preparedEntities[0] : preparedEntities;
    }

    /**
     * Create and persist a single entity
     */
    public async create(): Promise<Entity>;

    /**
     * Create and persist a single entity with optional override
     *
     * @param count
     * @param partial
     */
    public async create(
        count: 1,
        partial?: DeepEntityPartial<Entity>,
    ): Promise<Entity>;

    /**
     * Create and persist an array of entities
     * @param count
     * @param partial
     */
    public async create(
        count: number,
        partial?: DeepEntityPartial<Entity>,
    ): Promise<Entity[]>;

    /**
     * Create and persist entities
     *
     * @param count
     * @param partial
     */
    public async create(
        count: number = 1,
        partial?: DeepEntityPartial<Entity>,
    ): Promise<any> {
        let entities = await this.make(count, partial);
        if (!Array.isArray(entities)) {
            entities = [entities];
        }

        entities = await this.adapter.create(
            entities,
            this.blueprint.getContext(),
        );

        const context = this.getCallbackContext();

        for (const entity of entities) {
            for (const state of this.stateFactories) {
                const callback = state.afterCreating;

                if (callback) {
                    await callback(entity, context);
                }
            }
        }

        return count === 1 ? entities[0] : entities;
    }

    /**
     * Resolve all state factories
     */
    private async resolveStates(): Promise<DeepEntityPartial<Entity>> {
        let builtObject = {};

        for (const factory of this.stateFactories) {
            builtObject = {
                ...builtObject,
                ...(await this.resolveStateFactory(factory.stateFactory)),
            };
        }

        return builtObject;
    }

    /**
     * Resolve a single state factory method to create the entity
     *
     * @param stateFactory
     */
    private async resolveStateFactory(
        stateFactory: FactoryProfileMethod<Entity>,
    ) {
        const derived = await stateFactory(faker);
        // @ts-ignore
        // console.log('new derived', await derived(faker));
        for (const key in derived) {
            const value = derived[key];

            if (isFunction(value)) {
                const callback = derived[key] as DeepFactoryPartialMethod<
                    Entity
                >;

                derived[key] = await callback(this.factory);
            }
        }

        return {
            ...(derived as any),
            ...(this.partial as any),
        };
    }

    /**
     * Get context for callback methods.
     */
    private getCallbackContext(): FactoryCallBackContext {
        return {
            factory: this.factory,
            faker,
        };
    }

    /**
     * Get the state builder object from the blueprint
     *
     * @param state
     */
    private getStateBuilder(state?: string): StateBuilderObject<Entity> {
        return {
            stateFactory: this.blueprint.getFactoryMethod(state),
            afterMaking: this.blueprint.getMakingCallbackMethod(state),
            afterCreating: this.blueprint.getCreatingCallbackMethod(state),
        };
    }
}
