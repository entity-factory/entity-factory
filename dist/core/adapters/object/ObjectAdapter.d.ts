import { BlueprintOptions } from '../../blueprint/BlueprintTypeOption';
import { Adapter } from '../Adapter';
import { ObjectAdapterOptions } from './ObjectAdapterOptions';
import { ObjectBlueprintOptions } from './ObjectBlueprintOptions';
export declare class ObjectAdapter implements Adapter<ObjectBlueprintOptions> {
    private readonly options;
    private idCounter;
    constructor(options?: ObjectAdapterOptions);
    make<Entity = any>(objects: Array<Record<string, any>>, context: BlueprintOptions<ObjectBlueprintOptions>): Promise<Entity[]>;
    create<Entity = any>(objects: Entity[], context: BlueprintOptions<ObjectBlueprintOptions>): Promise<Entity[]>;
    private getNextId;
}
