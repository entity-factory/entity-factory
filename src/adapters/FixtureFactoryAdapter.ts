import { DeepEntityPartial } from '../common/DeepFactoryPartial';
import { FixtureObjectType } from '../common/FixtureObjectType';

export interface FixtureFactoryAdapter {
    /**
     * Called during the make operation. Perform any task necessary to convert
     * from a plain object into a valid entity object.
     *
     * @param type
     * @param objects
     */
    make<Entity>(
        type: FixtureObjectType<Entity>,
        objects: DeepEntityPartial<Entity>[],
    ): Promise<Entity[]>;

    /**
     * Called during the create operation. Perform any necessary tasks to persist
     * the provided entities.
     *
     * @param type
     * @param objects
     */
    create<Entity>(
        type: FixtureObjectType<Entity>,
        objects: Entity[],
    ): Promise<Entity[]>;
}
