import { ObjectAdapter } from './adapters/object/ObjectAdapter';
import {
    BaseAdapter,
    FactoryExecutor,
    FixtureFactoryOptions,
    FixtureFactoryRegisterCallback,
    FixtureObjectType,
} from './interfaces';
import { BaseProfile } from './profile/BaseProfile';
import { ProfileBlueprint } from './profile/ProfileBlueprint';
import { ProfileBuilder } from './profile/ProfileBuilder';
import { ProfileLoader } from './profile/ProfileLoader';
import { getName, isFunction } from './utils';

export class EntityFactory implements FactoryExecutor {
    private readonly blueprints = new Map<
        string | FixtureObjectType<any>,
        ProfileBlueprint
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
        const blueprint = this.blueprints.get(entity);
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
        return this.blueprints.has(entity);
    }

    /**
     * Get a registered blueprint
     *
     * @param entity
     */
    public getBlueprint(entity: string): ProfileBlueprint<Record<string, any>>;
    public getBlueprint<Entity>(
        entity: string | FixtureObjectType<Entity>,
    ): ProfileBlueprint<Entity>;
    public getBlueprint<Entity = Record<string, any>>(
        entity: FixtureObjectType<Entity> | string,
    ): any {
        return this.blueprints.get(entity);
    }

    public register(
        fixture:
            | ProfileBlueprint<any, any, any>
            | BaseProfile<any, any>
            | FixtureFactoryRegisterCallback,
    ): EntityFactory {
        let blueprint: ProfileBlueprint<any, any>; // = new FixtureBlueprint();

        if (fixture instanceof ProfileBlueprint) {
            blueprint = fixture;

            this.blueprints.set(blueprint.getType(), blueprint);
        } else if (fixture instanceof BaseProfile) {
            blueprint = new ProfileBlueprint<any, any>();
            fixture.register(blueprint);

            this.blueprints.set(blueprint.getType(), blueprint);
        } else if (isFunction(fixture)) {
            blueprint = new ProfileBlueprint<any, any>();
            fixture(blueprint);

            this.blueprints.set(blueprint.getType(), blueprint);
        }

        return this;
    }
}
