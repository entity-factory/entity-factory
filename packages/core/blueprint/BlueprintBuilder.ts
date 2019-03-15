/**
 * @module Blueprint
 */

import * as faker from 'faker';
import { Adapter } from '../adapters/Adapter';
import { DeepEntityPartial } from '../common/DeepEntityPartial';
import { EntityFactory } from '../EntityFactory';
import { isFunction } from '../utils';
import { Blueprint } from './Blueprint';
import { BlueprintDeepPartialMethod } from './BlueprintDeepPartialMethod';
import { BlueprintDefinitionAfterMethod } from './BlueprintDefinitionAfterMethod';
import { BlueprintDefinitionAfterMethodContext } from './BlueprintDefinitionAfterMethodContext';
import { BlueprintDefinitionMethod } from './BlueprintDefinitionMethod';

interface StateBuilderObject<Entity> {
    stateFactory: BlueprintDefinitionMethod<Entity>;
    afterMaking?: BlueprintDefinitionAfterMethod<Entity, Adapter>;
    afterCreating?: BlueprintDefinitionAfterMethod<Entity, Adapter>;
}

export class BlueprintBuilder<Entity = Record<string, any>> {
    private stateFactories: Array<StateBuilderObject<Entity>> = [];

    private partial: DeepEntityPartial<Entity> = {};

    constructor(
        private readonly profile: Blueprint<Entity, any, any>,
        private readonly factory: EntityFactory,
        private readonly adapter: Adapter,
    ) {
        this.stateFactories.push(this.getStateBuilder());
    }

    /**
     * Set states to be built
     *
     * @param state
     */
    public state(...state: string[]): BlueprintBuilder<Entity> {
        state.forEach((s) => {
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
    public with(partial: DeepEntityPartial<Entity>): BlueprintBuilder<Entity> {
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
    public async make(count: 1, partial?: DeepEntityPartial<Entity>): Promise<Entity>;

    /**
     * Instantiate multiple entities and return them in an array
     * @param count
     * @param partial
     */
    public async make(count: number, partial?: DeepEntityPartial<Entity>): Promise<Entity[]>;

    /**
     * Instantiate one or more entities and return them
     *
     * @param count
     * @param partial
     */
    public async make(count: number = 1, partial?: DeepEntityPartial<Entity>): Promise<any> {
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

        const preparedEntities = await this.adapter.make(objects, this.profile.getOptions());

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
    public async create(count: 1, partial?: DeepEntityPartial<Entity>): Promise<Entity>;

    /**
     * Create and persist an array of entities
     * @param count
     * @param partial
     */
    public async create(count: number, partial?: DeepEntityPartial<Entity>): Promise<Entity[]>;

    /**
     * Create and persist entities
     *
     * @param count
     * @param partial
     */
    public async create(count: number = 1, partial?: DeepEntityPartial<Entity>): Promise<any> {
        let entities = await this.make(count, partial);
        if (!Array.isArray(entities)) {
            entities = [entities];
        }

        entities = await this.adapter.create(entities, this.profile.getOptions());

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
    private async resolveStateFactory(stateFactory: BlueprintDefinitionMethod<Entity>) {
        const derived = await stateFactory({ faker, factory: this.factory });

        return {
            ...(derived as any),
            ...(this.partial as any),
        };
    }

    /**
     * Get options for callback methods.
     */
    private getCallbackContext(): BlueprintDefinitionAfterMethodContext<Adapter> {
        return {
            factory: this.factory,
            faker,
            adapter: this.adapter,
        };
    }

    /**
     * Get the state builder object from the blueprint
     *
     * @param state
     */
    private getStateBuilder(state?: string): StateBuilderObject<Entity> {
        return {
            stateFactory: this.profile.getFactoryMethod(state),
            afterMaking: this.profile.getMakingCallbackMethod(state),
            afterCreating: this.profile.getCreatingCallbackMethod(state),
        };
    }
}
