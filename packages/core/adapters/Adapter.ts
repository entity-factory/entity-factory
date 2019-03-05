/**
 * @module Adapters
 */

import { BlueprintOptions } from '../blueprint/BlueprintOptions';
import { DeepEntityPartial } from '../common/DeepEntityPartial';
import { AdapterBlueprintOptions } from './AdapterBlueprintOptions';

export interface Adapter<Options extends AdapterBlueprintOptions = AdapterBlueprintOptions> {
    /**
     * Called during the make operation. Perform any task necessary to convert
     * from a plain object into a valid entity object.
     *
     * @param objects
     * @param context
     */
    make<Entity>(objects: Array<DeepEntityPartial<Entity>>, context: BlueprintOptions<Options>): Promise<Entity[]>;

    /**
     * Called during the create operation. Perform any necessary tasks to persist
     * the provided entities.
     *
     * @param objects
     * @param context
     */
    create<Entity>(objects: Entity[], context: BlueprintOptions<Options>): Promise<Entity[]>;
}
