import { BaseAdapterContext, Blueprint } from '..';

export abstract class FixtureProfile<
    Entity = any,
    Context extends BaseAdapterContext = BaseAdapterContext
> {
    /**
     * Register a blueprint configuration
     *
     * @param blueprint
     */
    public abstract register(blueprint: Blueprint<Entity, Context>): void;
}
