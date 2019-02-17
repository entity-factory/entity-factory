import * as faker from 'faker';
import { FixtureFactoryAdapter } from './adapters/FixtureFactoryAdapter';
import { CallBackContext } from './common/CallBackContext';
import {
    DeepEntityPartial,
    DeepFactoryPartialMethod,
} from './common/DeepFactoryPartial';
import {
    FactoryProfileCallbackMethod,
    FactoryProfileMethod,
} from './common/FactoryProfileMethod';
import { FixtureObjectType } from './common/FixtureObjectType';
import { FixtureFactory } from './FixtureFactory';
import { isFunction } from './utils';

interface StateBuilderObject<Entity> {
    stateFactory: FactoryProfileMethod<Entity>;
    afterMaking?: FactoryProfileCallbackMethod<Entity>;
    afterCreating?: FactoryProfileCallbackMethod<Entity>;
}

export class Builder<Entity> {
    private stateFactories: StateBuilderObject<Entity>[] = [];

    private partial: DeepEntityPartial<Entity> = {};

    constructor(
        private readonly type: FixtureObjectType<Entity> | string,
        private readonly factory: FixtureFactory,
        private readonly adapter: FixtureFactoryAdapter,
    ) {
        this.stateFactories.push(this.getStateBuilder());
    }

    public state(...state: string[]): Builder<Entity> {
        state.forEach(state => {
            this.stateFactories.push(this.getStateBuilder(state));
        });

        return this;
    }

    private getStateBuilder(state?: string): StateBuilderObject<Entity> {
        return {
            stateFactory: this.factory.getFactoryMethod(this.type, state),
            afterMaking: this.factory.getMakingCallbackMethod(this.type, state),
            afterCreating: this.factory.getCreatingCallbackMethod(
                this.type,
                state,
            ),
        };
    }

    with(partial: DeepEntityPartial<Entity>): Builder<Entity> {
        this.partial = {
            ...this.partial,
            ...partial,
        };

        return this;
    }

    async make(): Promise<Entity>;
    async make(count: 1, partial?: DeepEntityPartial<Entity>): Promise<Entity>;
    async make(
        count: number,
        partial?: DeepEntityPartial<Entity>,
    ): Promise<Entity[]>;
    async make(
        count: number = 1,
        partial?: DeepEntityPartial<Entity>,
    ): Promise<any> {
        if (partial) {
            this.partial = {
                ...this.partial,
                ...partial,
            };
        }

        let objects: DeepEntityPartial<Entity>[] = [];

        for (let makeCount = 0; makeCount < count; makeCount++) {
            const builtObject = await this.resolveStates();
            objects.push(builtObject as DeepEntityPartial<Entity>);
        }

        // const conn = await this.factory.getConnection();
        // const preparedEntities = conn.manager.create(this.type, objects);
        const preparedEntities = await this.adapter.make(this.type, objects);

        // fire after making for each
        for (let i = 0; i < preparedEntities.length; i++) {
            const context = this.getCallbackContext();
            // loop through state afterMaking callbacks
            for (
                let stateIdx = 0;
                stateIdx < this.stateFactories.length;
                stateIdx++
            ) {
                const callback = this.stateFactories[stateIdx].afterMaking;

                if (callback) {
                    await callback(preparedEntities[i], context);
                }
            }
        }

        return count === 1 ? preparedEntities[0] : preparedEntities;
    }

    async create(): Promise<Entity>;
    async create(
        count: 1,
        partial?: DeepEntityPartial<Entity>,
    ): Promise<Entity>;
    async create(
        count: number,
        partial?: DeepEntityPartial<Entity>,
    ): Promise<Entity[]>;
    async create(
        count: number = 1,
        partial?: DeepEntityPartial<Entity>,
    ): Promise<any> {
        let entities = await this.make(count, partial);
        if (!Array.isArray(entities)) {
            entities = [entities];
        }

        // const connection = await this.factory.getConnection();
        // entities = await connection.manager.save(entities);

        entities = await this.adapter.create(this.type, entities);

        const context = this.getCallbackContext();

        for (let i = 0; i < entities.length; i++) {
            for (
                let stateIdx = 0;
                stateIdx < this.stateFactories.length;
                stateIdx++
            ) {
                const callback = this.stateFactories[stateIdx].afterCreating;

                if (callback) {
                    await callback(entities[i], context);
                }
            }
        }

        return count === 1 ? entities[0] : entities;
    }

    /**
     * Resolve states
     */
    private async resolveStates(): Promise<DeepEntityPartial<Entity>> {
        let builtObject = {};

        for (let i = 0; i < this.stateFactories.length; i++) {
            builtObject = {
                ...builtObject,
                ...(await this.resolveStateFactory(
                    this.stateFactories[i].stateFactory,
                )),
            };
        }

        return builtObject;
    }

    private async resolveStateFactory(
        stateFactory: FactoryProfileMethod<Entity>,
    ) {
        const derived = await stateFactory(faker);

        for (const key in derived) {
            if (key in derived) {
                const value = derived[key];

                if (isFunction(value)) {
                    const callback = derived[key] as DeepFactoryPartialMethod<
                        Entity
                    >;

                    derived[key] = await callback(this.factory);
                }
            }
        }

        return {
            ...derived,
            ...this.partial,
        };
    }

    /**
     * Get context for callback methods.
     */
    private getCallbackContext(): CallBackContext {
        return {
            factory: this.factory,
            faker,
        };
    }
}
