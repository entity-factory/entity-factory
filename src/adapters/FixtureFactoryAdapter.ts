import { DeepEntityPartial } from '..';
import { AdapterContext } from './AdapterContext';

export interface FixtureFactoryAdapter<
    Context extends AdapterContext = AdapterContext
> {
    /**
     * Called during the make operation. Perform any task necessary to convert
     * from a plain object into a valid entity object.
     *
     * @param objects
     * @param context
     */
    make<Entity>(
        objects: DeepEntityPartial<Entity>[], //Record<string, any>,
        context: Context,
    ): Promise<Entity[]>;

    /**
     * Called during the create operation. Perform any necessary tasks to persist
     * the provided entities.
     *
     * @param objects
     * @param context
     */
    create<Entity>(objects: Entity[], context: Context): Promise<Entity[]>;
}
