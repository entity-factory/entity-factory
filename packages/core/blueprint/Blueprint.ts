/**
 * @module Blueprint
 */

import { DeepEntityPartial } from '..';
import { Adapter } from '../adapters/Adapter';
import { AdapterBlueprintOptions } from '../adapters/AdapterBlueprintOptions';
import { EntityObjectType } from '../common/EntityObjectType';
import { getName, isFunction } from '../utils';
import { BlueprintDefinitionAfterMethod } from './BlueprintDefinitionAfterMethod';
import { BlueprintDefinitionMethod } from './BlueprintDefinitionMethod';
import { BlueprintOptions } from './BlueprintOptions';

export class Blueprint<
    Entity = Record<string, any>,
    AdapterType extends Adapter = Adapter,
    Options extends AdapterBlueprintOptions = {}
> {
    /**
     * key used as default state when saving to defining
     * factories and states
     */
    private DEFAULT_KEY = '__default';

    private entityType: EntityObjectType<any> | string = '';

    private blueprintOptions: Record<string, any> = {};

    private readonly factoryMethods = new Map<string, BlueprintDefinitionMethod<Entity>>();

    private readonly callbackMethods = new Map<string, BlueprintDefinitionAfterMethod<Entity, AdapterType>>();

    /**
     * Set the __type of entity being defined
     *
     * @param type
     */
    public type(type: string | EntityObjectType<Entity>): void {
        this.entityType = type;
    }

    /**
     * Get the __type of entity for the blueprint
     */
    public getType(): string | EntityObjectType<Entity> {
        return this.entityType;
    }

    /**
     * Set options values for the blueprint
     *
     * @param context
     */
    public options(context: Options) {
        this.blueprintOptions = {
            ...this.blueprintOptions,
            ...(context as Record<string, any>),
        };
    }

    /**
     * Get blueprint options
     */
    public getOptions(): BlueprintOptions<Options> {
        const options = {
            ...this.blueprintOptions,
            __type: this.entityType,
        };

        return options as any;
    }

    /**
     * Defines the entity and base factory for an entity
     *
     * @param factory
     */
    public define(factory: BlueprintDefinitionMethod<Entity>): void {
        return this.state(this.DEFAULT_KEY, factory);
    }

    /**
     * Creates a state modification for an entity which will be applied to the default.
     *
     * @param state
     * @param factory
     */
    public state(state: string, factory: BlueprintDefinitionMethod<Entity> | DeepEntityPartial<Entity>): void {
        const key = this.getKey(state);

        let factoryMethod: BlueprintDefinitionMethod<Entity>;
        if (!isFunction(factory)) {
            factoryMethod = async () => factory as DeepEntityPartial<Entity>;
        } else {
            factoryMethod = factory as BlueprintDefinitionMethod<Entity>;
        }

        this.factoryMethods.set(key, factoryMethod);
    }

    /**
     * Define an after making callback for an entity
     *
     * @param callback
     */
    public afterMaking(callback: BlueprintDefinitionAfterMethod<Entity, AdapterType>): void {
        return this.afterMakingState(this.DEFAULT_KEY, callback);
    }

    /**
     * Define an after making callback for an entity with a given state.
     *
     * @param state
     * @param callback
     */
    public afterMakingState(state: string, callback: BlueprintDefinitionAfterMethod<Entity, AdapterType>): void {
        this.callbackMethods.set(this.getKey(state, 'afterMake'), callback);
    }

    /**
     * Define an after creating callback for an entity
     *
     * @param callback
     */
    public afterCreating(callback: BlueprintDefinitionAfterMethod<Entity, AdapterType>): void {
        return this.afterCreatingState(this.DEFAULT_KEY, callback);
    }

    /**
     * Define an after making callback for an entity with a given state
     *
     * @param state
     * @param callback
     */
    public afterCreatingState(state: string, callback: BlueprintDefinitionAfterMethod<Entity, AdapterType>): void {
        this.callbackMethods.set(this.getKey(state, 'afterCreate'), callback);
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
    public getFactoryMethod(state?: string): BlueprintDefinitionMethod<Entity> {
        if (!this.getOptions().__type) {
            throw new Error(`Type not defined for blueprint ${this.constructor
                .name as any}: blueprint.define() or blueprint.setType() must be called.
            `);
        }
        const method = this.factoryMethods.get(this.getKey(state));
        if (!method) {
            throw new Error(
                `Factory method not defined for entity ${getName(this.getOptions().__type)} ${
                    state ? 'with state ' + state : ''
                }`,
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
    public getMakingCallbackMethod(state?: string): BlueprintDefinitionAfterMethod<Entity, AdapterType> | undefined {
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
    public getCreatingCallbackMethod(state?: string): BlueprintDefinitionAfterMethod<Entity, AdapterType> | undefined {
        return this.callbackMethods.get(this.getKey(state, 'afterCreate'));
    }

    /**
     * Get the key identifying a particular factory state
     *
     * @param state
     * @param callbackType
     */
    private getKey(state?: string, callbackType?: 'afterMake' | 'afterCreate'): string {
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
