import { BaseAdapter, BaseAdapterContext, Blueprint } from '..';

export abstract class BaseProfile<
    Entity = any,
    Adapter extends BaseAdapter = BaseAdapter,
    Context extends BaseAdapterContext = BaseAdapterContext
> {
    /**
     * Register a blueprint configuration
     *
     * @param blueprint
     */
    public abstract register(
        blueprint: Blueprint<Entity, Adapter, Context>,
    ): void;
}
