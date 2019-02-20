import { Blueprint } from '..';
import { AdapterContext } from '..';

export abstract class FixtureProfile<
    Entity = any,
    Context extends AdapterContext = AdapterContext
> {
    /**
     * Register a blueprint configuration
     *
     * @param blueprint
     */
    public abstract register(blueprint: Blueprint<Entity, Context>): void;
}
