import { BlueprintOptions } from '../blueprint/BlueprintTypeOption';
import { DeepEntityPartial } from '../common/DeepEntityPartial';
import { AdapterBlueprintOptions } from './AdapterBlueprintOptions';
export interface Adapter<Options extends AdapterBlueprintOptions = AdapterBlueprintOptions> {
    make<Entity>(objects: Array<DeepEntityPartial<Entity>>, context: BlueprintOptions<Options>): Promise<Entity[]>;
    create<Entity>(objects: Entity[], context: BlueprintOptions<Options>): Promise<Entity[]>;
}
