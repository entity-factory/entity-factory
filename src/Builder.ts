import * as faker from 'faker';
import { DeepPartial } from 'typeorm';
import {
    DeepFactoryPartial,
    DeepFactoryPartialMethod,
} from './common/DeepFactoryPartial';
import {
    CallBackContext,
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

    private partial: DeepPartial<Entity> = {};

    constructor(
        private readonly type: FixtureObjectType<Entity>,
        private readonly factory: FixtureFactory,
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

    with(partial: DeepPartial<Entity>): Builder<Entity> {
        this.partial = {
            ...this.partial,
            ...partial,
        };

        return this;
    }

    async make(): Promise<Entity>;
    async make(count: 1, partial?: DeepPartial<Entity>): Promise<Entity>;
    async make(count: number, partial?: DeepPartial<Entity>): Promise<Entity[]>;
    async make(count: number = 1, partial?: DeepPartial<Entity>): Promise<any> {
        if (partial) {
            this.partial = {
                ...this.partial,
                ...partial,
            };
        }

        let objects: DeepPartial<Entity>[] = [];

        for (let makeCount = 0; makeCount < count; makeCount++) {
            const builtObject = await this.resolveStates();
            objects.push(builtObject as DeepPartial<Entity>);
        }

        const conn = await this.factory.getConnection();
        const preparedEntities = conn.manager.create(this.type, objects);

        // fire after making for each
        for (let i = 0; i < preparedEntities.length; i++) {
            const context = await this.getCallbackContext();
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
    async create(count: 1, partial?: DeepPartial<Entity>): Promise<Entity>;
    async create(
        count: number,
        partial?: DeepPartial<Entity>,
    ): Promise<Entity[]>;
    async create(
        count: number = 1,
        partial?: DeepPartial<Entity>,
    ): Promise<any> {
        let entities = await this.make(count, partial);
        if (!Array.isArray(entities)) {
            entities = [entities];
        }

        const connection = await this.factory.getConnection();
        entities = await connection.manager.save(entities);

        const context = await this.getCallbackContext();

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
    private async resolveStates(): Promise<DeepPartial<Entity>> {
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
        const derived = stateFactory(faker);

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
    private async getCallbackContext(): Promise<CallBackContext> {
        const conn = await this.factory.getConnection();

        return {
            factory: this.factory,
            faker,
            manager: conn.manager,
        };
    }
}
