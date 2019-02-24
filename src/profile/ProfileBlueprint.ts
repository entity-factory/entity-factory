import {
    BaseAdapter,
    BaseAdapterContext,
    Blueprint,
    DeepFactoryPartial,
    FactoryProfileCallbackMethod,
    FactoryProfileMethod,
    FixtureObjectType,
} from '..';
import { getName, isFunction } from '../utils';

export class ProfileBlueprint<
    Entity = any,
    Adapter extends BaseAdapter = BaseAdapter,
    Context extends BaseAdapterContext = BaseAdapterContext
> implements Blueprint<Entity, Adapter, Context> {
    /**
     * key used as default state when saving to defining
     * factories and states
     */
    private DEFAULT_KEY = '__default';

    private readonly factoryMethods = new Map<
        string,
        FactoryProfileMethod<Entity>
    >();

    private readonly callbackMethods = new Map<
        string,
        FactoryProfileCallbackMethod<Entity, Adapter>
    >();

    private fixtureContext: Record<string, any>;

    constructor() {
        this.fixtureContext = {
            type: '',
        };
    }

    /**
     * Set the type of entity being defined
     *
     * @param type
     */
    public setType(
        type: string | FixtureObjectType<Entity>,
    ): Blueprint<Entity, Adapter, Context> {
        this.fixtureContext.type = type;

        return this;
    }

    /**
     * Get the type of entity for the blueprint
     */
    public getType(): string | FixtureObjectType<Entity> {
        return this.fixtureContext.type;
    }

    /**
     * Set context values for the blueprint
     *
     * @param context
     */
    public context(context: Context): Blueprint<Entity, Adapter, Context> {
        this.fixtureContext = {
            ...this.fixtureContext,
            ...(context as Record<string, any>),
        };

        return this;
    }

    /**
     * Get blueprint context
     */
    public getContext(): Context {
        return this.fixtureContext as Context;
    }

    /**
     * Defines the entity and base factory for an entity
     *
     * @param entity
     * @param factory
     */
    public define(
        factory: FactoryProfileMethod<Entity>,
    ): Blueprint<Entity, Adapter, Context> {
        return this.state(this.DEFAULT_KEY, factory);
    }

    /**
     * Creates a state modification for an entity which will be applied to the default.
     *
     * @param state
     * @param factory
     */
    public state(
        state: string,
        factory: FactoryProfileMethod<Entity> | DeepFactoryPartial<Entity>,
    ): Blueprint<Entity, Adapter, Context> {
        const key = this.getKey(state);

        let factoryMethod: FactoryProfileMethod<Entity>;
        if (!isFunction(factory)) {
            factoryMethod = async () => factory as DeepFactoryPartial<Entity>;
        } else {
            factoryMethod = factory as FactoryProfileMethod<Entity>;
        }

        this.factoryMethods.set(key, factoryMethod);

        return this;
    }

    /**
     * Define an after making callback for an entity
     *
     * @param callback
     */
    public afterMaking(
        callback: FactoryProfileCallbackMethod<Entity, Adapter>,
    ): Blueprint<Entity, Adapter, Context> {
        return this.afterMakingState(this.DEFAULT_KEY, callback);
    }

    /**
     * Define an after making callback for an entity with a given state.
     *
     * @param state
     * @param callback
     */
    public afterMakingState(
        state: string,
        callback: FactoryProfileCallbackMethod<Entity, Adapter>,
    ): Blueprint<Entity, Adapter, Context> {
        this.callbackMethods.set(this.getKey(state, 'afterMake'), callback);

        return this;
    }

    /**
     * Define an after creating callback for an entity
     *
     * @param callback
     */
    public afterCreating(
        callback: FactoryProfileCallbackMethod<Entity, Adapter>,
    ): Blueprint<Entity, Adapter, Context> {
        return this.afterCreatingState(this.DEFAULT_KEY, callback);
    }

    /**
     * Define an after making callback for an entity with a given state
     *
     * @param state
     * @param callback
     */
    public afterCreatingState(
        state: string,
        callback: FactoryProfileCallbackMethod<Entity, Adapter>,
    ): Blueprint<Entity, Adapter, Context> {
        this.callbackMethods.set(this.getKey(state, 'afterCreate'), callback);

        return this;
    }

    /**
     * Check if a fectory method exists for an entity and state
     *
     * @param state
     */
    public hasFactoryMethod(state?: string): boolean {
        return this.factoryMethods.has(this.getKey(state));
    }

    /**
     * Get a factory method for an entity and state
     *
     * @param state
     */
    public getFactoryMethod(state?: string): FactoryProfileMethod<Entity> {
        if (!this.getContext().type) {
            throw new Error(`Type not defined for blueprint ${this.constructor
                .name as any}: blueprint.define() or blueprint.setType() must be called.
            `);
        }
        const method = this.factoryMethods.get(this.getKey(state));
        if (!method) {
            throw new Error(
                `Factory method not defined for entity ${getName(
                    this.getContext().type,
                )} ${state ? 'with state ' + state : ''}`,
            );
        }

        return method;
    }

    /**
     * Check if a making callback exists for an entity and state
     *
     * @param state
     */
    public hasMakingCallbackMethod(state?: string): boolean {
        return this.callbackMethods.has(this.getKey(state, 'afterMake'));
    }

    /**
     * Get a making callback for an entity and state
     *
     * @param state
     */
    public getMakingCallbackMethod(
        state?: string,
    ): FactoryProfileCallbackMethod<Entity, Adapter> | undefined {
        return this.callbackMethods.get(this.getKey(state, 'afterMake'));
    }

    /**
     * CHeck if a creating callback exists for an entity and state
     *
     * @param state
     */
    public hasCreatingCallbackMethod(state?: string): boolean {
        return this.callbackMethods.has(this.getKey(state, 'afterCreate'));
    }

    /**
     * Get a creating callback for an entity
     *
     * @param state
     */
    public getCreatingCallbackMethod(
        state?: string,
    ): FactoryProfileCallbackMethod<Entity, Adapter> | undefined {
        return this.callbackMethods.get(this.getKey(state, 'afterCreate'));
    }

    /**
     * Get the key identifying a particular factory state
     *
     * @param state
     * @param callbackType
     */
    private getKey(
        state?: string,
        callbackType?: 'afterMake' | 'afterCreate',
    ): string {
        let stateKey = this.DEFAULT_KEY;
        if (state) {
            stateKey = state;
        }

        if (callbackType) {
            return `${stateKey}.${callbackType}`;
        }

        return stateKey;
    }
}
