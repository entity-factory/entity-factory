/**
 * @module EntityFactory
 */

import * as faker from 'faker';
import { Adapter } from './adapters/Adapter';
import { ObjectAdapter } from './adapters/object/ObjectAdapter';
import { Blueprint } from './blueprint/Blueprint';
import { BlueprintBuilder } from './blueprint/BlueprintBuilder';
import { BlueprintDefinitionMethod } from './blueprint/BlueprintDefinitionMethod';
import { BlueprintLoader } from './blueprint/BlueprintLoader';
import { EntityObjectType } from './common/EntityObjectType';
import { EntityFactoryExecutor } from './EntityFactoryExecutor';
import { EntityFactoryGeneratorMethod } from './EntityFactoryGeneratorMethod';
import { EntityFactoryOptions } from './EntityFactoryOptions';
import { EntityFactoryRegisterCallback } from './EntityFactoryRegisterCallback';
import { getName, isFunction } from './utils';

export class EntityFactory implements EntityFactoryExecutor {
    private readonly profiles = new Map<string | EntityObjectType<any>, Blueprint<any, any, any>>();

    private readonly adapter: Adapter;

    /**
     * Create a new EntityFactory
     *
     * @param options
     */
    constructor(private readonly options: EntityFactoryOptions = {}) {
        this.adapter = options.adapter || new ObjectAdapter();
        if (options.blueprints) {
            const loader = new BlueprintLoader(options.blueprints);
            const profiles = loader.getProfiles();

            profiles.forEach((profile) => {
                this.register(profile);
            });
        }
    }

    /**
     * Get a builder instance for an entity
     *
     * @param entity
     */
    public for(entity: string): BlueprintBuilder<Record<string, any>>;
    public for<EntityType = any>(entity: string | EntityObjectType<EntityType>): BlueprintBuilder<EntityType>;
    public for<EntityType = any>(entity: EntityObjectType<EntityType> | string): any {
        const blueprint = this.profiles.get(entity);
        if (!blueprint) {
            throw new Error(`No blueprint exists for entity ${getName(entity)}`);
        }

        return new BlueprintBuilder<EntityType>(blueprint, this, this.adapter);
    }

    public async gen<Entity = any>(count: EntityFactoryGeneratorMethod<Entity>): Promise<Entity>;

    public async gen<Entity = any>(count: 1, factoryMethod: EntityFactoryGeneratorMethod<Entity>): Promise<Entity>;

    public async gen<Entity = any>(
        count: number,
        factoryMethod: EntityFactoryGeneratorMethod<Entity>,
    ): Promise<Entity[]>;

    public async gen<Entity = any>(
        count: number | EntityFactoryGeneratorMethod<Entity>,
        factoryMethod?: EntityFactoryGeneratorMethod<Entity>,
    ): Promise<any> {
        if (isFunction(count)) {
            factoryMethod = count as EntityFactoryGeneratorMethod<Entity>;
            count = 1;
        }

        if (factoryMethod) {
            const objects: Entity[] = [];

            for (let i = 0; i < count; i++) {
                const result = await factoryMethod({ faker, factory: this });
                objects.push(result);
            }

            return count === 1 ? objects[0] : objects;
        }
    }
    /**
     * Check if a blueprint has been registered
     *
     * @param entity
     */
    public hasBlueprint(entity: EntityObjectType<any> | string): boolean {
        return this.profiles.has(entity);
    }

    /**
     * Get a registered blueprint
     *
     * @param entity
     */
    public getProfile(entity: string): Blueprint<Record<string, any>, any, any>;
    public getProfile<Entity>(entity: string | EntityObjectType<Entity>): Blueprint<Entity, any, any>;
    public getProfile<Entity = Record<string, any>>(entity: EntityObjectType<Entity> | string): any {
        return this.profiles.get(entity);
    }

    public register(fixture: Blueprint<any, any, any> | EntityFactoryRegisterCallback): EntityFactory {
        let profile: Blueprint<any, any, any>; // = new FixtureBlueprint();

        if (fixture instanceof Blueprint) {
            profile = fixture;

            this.profiles.set(profile.getType(), profile);
        } else if (isFunction(fixture)) {
            profile = new Blueprint<any, any, any>();

            fixture(profile);

            this.profiles.set(profile.getType(), profile);
        }

        return this;
    }
}
