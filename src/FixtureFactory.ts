import { DefaultAdapter } from './adapters/DefaultAdapter';
import { FixtureFactoryAdapter } from './adapters/FixtureFactoryAdapter';
import { FixtureBlueprint } from './blueprint/FixtureBlueprint';
import { Builder } from './Builder';
import { FactoryExecutor } from './common/FactoryExecutor';
import { FixtureFactoryOptions } from './common/FixtureFactoryOptions';
import { FixtureFactoryRegisterCallback } from './common/FixtureFactoryRegisterCallback';
import { FixtureObjectType } from './common/FixtureObjectType';
import { FixtureProfile } from './profile/FixtureProfile';
import { FixtureProfileLoader } from './profile/FixtureProfileLoader';
import { getName, isFunction } from './utils';

export class FixtureFactory implements FactoryExecutor {
    private readonly blueprints = new Map<
        string | FixtureObjectType<any>,
        FixtureBlueprint
    >();

    private readonly adapter: FixtureFactoryAdapter;

    /**
     * Create a new FixtureFactory
     *
     * @param options
     */
    constructor(private readonly options: FixtureFactoryOptions = {}) {
        this.adapter = options.adapter || new DefaultAdapter();
        if (options.fixtures) {
            const loader = new FixtureProfileLoader(options.fixtures);
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
    public for(entity: string): Builder<Record<string, any>>;
    public for<EntityType = any>(
        entity: string | FixtureObjectType<EntityType>,
    ): Builder<EntityType>;
    public for<EntityType = any>(
        entity: FixtureObjectType<EntityType> | string,
    ): any {
        const blueprint = this.blueprints.get(entity);
        if (!blueprint) {
            throw new Error(
                `No blueprint exists for entity ${getName(entity)}`,
            );
        }

        return new Builder<EntityType>(blueprint, this, this.adapter);
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
    public getBlueprint(entity: string): FixtureBlueprint<Record<string, any>>;
    public getBlueprint<Entity>(
        entity: string | FixtureObjectType<Entity>,
    ): FixtureBlueprint<Entity>;
    public getBlueprint<Entity = Record<string, any>>(
        entity: FixtureObjectType<Entity> | string,
    ): any {
        return this.blueprints.get(entity);
    }

    public register(
        fixture:
            | FixtureBlueprint<any, any>
            | FixtureProfile<any, any>
            | FixtureFactoryRegisterCallback,
    ): FixtureFactory {
        let blueprint: FixtureBlueprint<any, any>; // = new FixtureBlueprint();

        if (fixture instanceof FixtureBlueprint) {
            blueprint = fixture;

            this.blueprints.set(blueprint.getType(), blueprint);
        } else if (fixture instanceof FixtureProfile) {
            blueprint = new FixtureBlueprint<any, any>();
            fixture.register(blueprint);

            this.blueprints.set(blueprint.getType(), blueprint);
        } else if (isFunction(fixture)) {
            blueprint = new FixtureBlueprint<any, any>();
            fixture(blueprint);

            this.blueprints.set(blueprint.getType(), blueprint);
        }

        return this;
    }
}
