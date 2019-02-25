import { ObjectAdapter } from './adapters/object/ObjectAdapter';
import {
    BaseAdapter,
    FactoryExecutor,
    FixtureFactoryOptions,
    FixtureFactoryRegisterCallback,
    FixtureObjectType,
} from './interfaces';
import { BaseProfile } from './profile/BaseProfile';
import { ProfileBuilder } from './profile/ProfileBuilder';
import { ProfileLoader } from './profile/ProfileLoader';
import { getName, isFunction } from './utils';

export class EntityFactory implements FactoryExecutor {
    private readonly profiles = new Map<
        string | FixtureObjectType<any>,
        BaseProfile<any, any, any>
    >();

    private readonly adapter: BaseAdapter;

    /**
     * Create a new EntityFactory
     *
     * @param options
     */
    constructor(private readonly options: FixtureFactoryOptions = {}) {
        this.adapter = options.adapter || new ObjectAdapter();
        if (options.fixtures) {
            const loader = new ProfileLoader(options.fixtures);
            const profiles = loader.getProfiles();

            profiles.forEach(profile => {
                this.register(profile);
            });
        }
    }

    /**
     * Get a builder instance for an entity
     *
     * @param entity
     */
    public for(entity: string): ProfileBuilder<Record<string, any>>;
    public for<EntityType = any>(
        entity: string | FixtureObjectType<EntityType>,
    ): ProfileBuilder<EntityType>;
    public for<EntityType = any>(
        entity: FixtureObjectType<EntityType> | string,
    ): any {
        const blueprint = this.profiles.get(entity);
        if (!blueprint) {
            throw new Error(
                `No blueprint exists for entity ${getName(entity)}`,
            );
        }

        return new ProfileBuilder<EntityType>(blueprint, this, this.adapter);
    }

    /**
     * Check if a blueprint has been registered
     *
     * @param entity
     */
    public hasBlueprint(entity: FixtureObjectType<any> | string): boolean {
        return this.profiles.has(entity);
    }

    /**
     * Get a registered blueprint
     *
     * @param entity
     */
    public getProfile(
        entity: string,
    ): BaseProfile<Record<string, any>, any, any>;
    public getProfile<Entity>(
        entity: string | FixtureObjectType<Entity>,
    ): BaseProfile<Entity, any, any>;
    public getProfile<Entity = Record<string, any>>(
        entity: FixtureObjectType<Entity> | string,
    ): any {
        return this.profiles.get(entity);
    }

    public register(
        fixture: BaseProfile<any, any, any> | FixtureFactoryRegisterCallback,
    ): EntityFactory {
        let profile: BaseProfile<any, any, any>; // = new FixtureBlueprint();

        if (fixture instanceof BaseProfile) {
            profile = fixture;

            this.profiles.set(profile.getType(), profile);
        } else if (isFunction(fixture)) {
            profile = new BaseProfile<any, any, any>();

            fixture(profile);

            this.profiles.set(profile.getType(), profile);
        }

        return this;
    }
}
