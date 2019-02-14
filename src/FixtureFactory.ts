import { Connection, createConnection, getConnection } from 'typeorm';
import { BlueprintBuilder } from './blueprint/BlueprintBuilder';
import { Builder } from './Builder';
import { DeepFactoryPartial } from './common/DeepFactoryPartial';
import { FixtureObjectType } from './common/FixtureObjectType';

import { FixtureFactoryOptions } from './FixtureFactoryOptions';
import { FixtureProfileLoader } from './profile/FixtureProfileLoader';

import {
    // FactoryBuilderMethod,
    FactoryProfileCallbackMethod,
    FactoryProfileMethod,
} from './common/FactoryProfileMethod';
import { DEFAULT_KEY, getKey, getName, isFunction } from './utils';

export class FixtureFactory implements BlueprintBuilder {
    private readonly factoryMethods = new Map<
        string,
        FactoryProfileMethod<any>
    >();

    private readonly makingCallbackMethods = new Map<
        string,
        FactoryProfileCallbackMethod<any>
    >();

    private readonly creatingCallbackMethods = new Map<
        string,
        FactoryProfileCallbackMethod<any>
    >();

    private connection: Connection;

    /**
     * Create a new FixtureFactory
     *
     * @param options
     */
    constructor(private readonly options: FixtureFactoryOptions = {}) {
        if (options.fixtures) {
            const loader = new FixtureProfileLoader(options.fixtures);
            const profiles = loader.getProfiles();

            profiles.forEach(profile => {
                profile.register(this);
            });
        }
    }

    /**
     * Get connection to the database.
     */
    public async getConnection(): Promise<Connection> {
        if (!this.connection) {
            const conn = await this.getExistingConnection();

            if (conn) {
                this.connection = conn;
            } else {
                this.connection = await this.createNewConnection();
            }
        }

        return this.connection;
    }

    /**
     * Get a builder instance for an entity
     *
     * @param entity
     */
    public for<EntityType>(
        entity: FixtureObjectType<EntityType>,
    ): Builder<EntityType> {
        const builder = new Builder(entity, this);

        return builder;
    }

    /**
     * Defines the entity and base factory for an entity
     *
     * @param entity
     * @param factory
     */
    public define<Entity>(
        entity: FixtureObjectType<Entity>,
        factory: FactoryProfileMethod<Entity>,
    ): BlueprintBuilder {
        const key = getKey(entity);

        this.factoryMethods.set(key, factory);

        return this;
    }

    /**
     * Creates a state modification for an entity which will be applied to the default.
     *
     * @param entity
     * @param state
     * @param factory
     */
    public state<Entity>(
        entity: FixtureObjectType<Entity>,
        state: string,
        factory: FactoryProfileMethod<Entity> | DeepFactoryPartial<Entity>,
    ): BlueprintBuilder {
        const key = getKey(entity, state);

        let factoryMethod: FactoryProfileMethod<Entity>;
        if (!isFunction(factory)) {
            factoryMethod = () => factory as DeepFactoryPartial<Entity>;
        } else {
            factoryMethod = factory as FactoryProfileMethod<Entity>;
        }

        this.factoryMethods.set(key, factoryMethod);

        return this;
    }

    /**
     * Define an after making callback for an entity
     *
     * @param entity
     * @param callback
     */
    public afterMaking<Entity>(
        entity: FixtureObjectType<Entity>,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): BlueprintBuilder {
        return this.afterMakingState(entity, DEFAULT_KEY, callback);
    }

    /**
     * Define an after making callback for an entity with a given state.
     *
     * @param entity
     * @param state
     * @param callback
     */
    public afterMakingState<Entity>(
        entity: FixtureObjectType<Entity>,
        state: string,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): BlueprintBuilder {
        this.makingCallbackMethods.set(getKey(entity, state), callback);

        return this;
    }

    /**
     * Define an after creating callback for an entity
     *
     * @param entity
     * @param callback
     */
    public afterCreating<Entity>(
        entity: FixtureObjectType<Entity>,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): BlueprintBuilder {
        return this.afterCreatingState(entity, DEFAULT_KEY, callback);
    }

    /**
     * Define an after making callback for an entity with a given state
     *
     * @param entity
     * @param state
     * @param callback
     */
    public afterCreatingState<Entity>(
        entity: FixtureObjectType<Entity>,
        state: string,
        callback: FactoryProfileCallbackMethod<Entity>,
    ): BlueprintBuilder {
        this.creatingCallbackMethods.set(getKey(entity, state), callback);

        return this;
    }

    /**
     * Check if a fectory method exists for an entity and state
     *
     * @param entity
     * @param state
     */
    public hasFactoryMethod<Entity>(
        entity: FixtureObjectType<Entity>,
        state?: string,
    ): boolean {
        return this.factoryMethods.has(getKey(entity, state));
    }

    /**
     * Get a factory method for an entity and state
     *
     * @param entity
     * @param state
     */
    public getFactoryMethod<Entity>(
        entity: FixtureObjectType<Entity>,
        state?: string,
    ): FactoryProfileMethod<Entity> {
        if (!this.hasFactoryMethod(entity, state)) {
            throw new Error(
                `Factory method not defined for entity ${getName(entity)} ${
                    state ? 'with state ' + state : ''
                }`,
            );
        }
        return this.factoryMethods.get(getKey(entity, state));
    }

    /**
     * Check if a making callback exists for an entity and state
     *
     * @param entity
     * @param state
     */
    public hasMakingCallbackMethod<Entity>(
        entity: FixtureObjectType<Entity>,
        state: string,
    ): boolean {
        return this.makingCallbackMethods.has(getKey(entity, state));
    }

    /**
     * Get a making callback for an entity and state
     *
     * @param entity
     * @param state
     */
    public getMakingCallbackMethod<Entity>(
        entity: FixtureObjectType<Entity>,
        state?: string,
    ): FactoryProfileCallbackMethod<Entity> {
        return this.makingCallbackMethods.get(getKey(entity, state));
    }

    /**
     * CHeck if a creating callback exists for an entity and state
     *
     * @param entity
     * @param state
     */
    public hasCreatingCallbackMethod<Entity>(
        entity: FixtureObjectType<Entity>,
        state?: string,
    ): boolean {
        return this.creatingCallbackMethods.has(getKey(entity, state));
    }

    /**
     * Get a creating callback for an entity
     *
     * @param entity
     * @param state
     */
    public getCreatingCallbackMethod<Entity>(
        entity: FixtureObjectType<Entity>,
        state?: string,
    ): FactoryProfileCallbackMethod<Entity> {
        return this.creatingCallbackMethods.get(getKey(entity, state));
    }

    /**
     * Create a new connection
     */
    private async createNewConnection(): Promise<Connection> {
        let connection: Connection;
        if (!this.options.connection) {
            connection = await createConnection();
        } else {
            connection = await createConnection(this.options.connection as any);
        }

        return connection;
    }

    /**
     * Attempt to retrieve a connection from the connection manager.
     */
    private async getExistingConnection(): Promise<Connection | undefined> {
        const connName =
            typeof this.options.connection === 'string'
                ? this.options.connection
                : this.options.connection.name;

        let connection: Connection;
        try {
            if (!connName) {
                connection = getConnection();
            } else {
                connection = getConnection(connName);
            }
        } catch (ex) {
            // do nothing
        }

        return connection;
    }
}
