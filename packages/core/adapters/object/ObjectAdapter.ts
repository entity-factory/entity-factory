import { BlueprintOptions } from '../../blueprint/BlueprintOptions';
import { EntityObjectType } from '../../common/EntityObjectType';
import { isFunction } from '../../utils';
import { Adapter } from '../Adapter';
import { ObjectAdapterOptions } from './ObjectAdapterOptions';
import { ObjectBlueprintOptions } from './ObjectBlueprintOptions';

export class ObjectAdapter implements Adapter<ObjectBlueprintOptions> {
    private readonly options = {
        generateId: true,
        defaultIdAttribute: 'id',
    };

    /**
     * Keep a running counter for entity id's
     */
    private idCounter = new Map<EntityObjectType<any> | string, number>();

    /**
     * Default AdapterType
     *
     * @param options
     */
    constructor(options: ObjectAdapterOptions = {}) {
        if (options.generateId !== undefined) {
            this.options.generateId = options.generateId;
        }

        if (options.defaultIdAttribute !== undefined) {
            this.options.defaultIdAttribute = options.defaultIdAttribute;
        }
    }

    /**
     * Create instances of entities
     *
     * @param objects
     * @param context
     */
    public async make<Entity = any>(
        objects: Array<Record<string, any>>,
        context: BlueprintOptions<ObjectBlueprintOptions>,
    ): Promise<Entity[]> {
        const type = context.__type;
        return objects.map((object: Record<string, any>) => {
            let created: any;
            if (isFunction(type)) {
                created = new (type as any)();
            } else {
                created = {};
            }

            for (const key in object) {
                created[key] = object[key];
            }

            return created;
        });
    }

    /**
     * Persist entities
     *
     * @param objects
     * @param context
     */
    public async create<Entity = any>(
        objects: Entity[],
        context: BlueprintOptions<ObjectBlueprintOptions>,
    ): Promise<Entity[]> {
        const { __type, idAttribute } = context;

        const generateId = context.generateId !== undefined ? context.generateId : this.options.generateId;

        if (generateId) {
            const idKey = idAttribute || this.options.defaultIdAttribute;
            objects = objects.map((entity: any) => {
                return {
                    [idKey]: this.getNextId(__type),
                    ...entity,
                };
            });
        }

        return objects;
    }

    /**
     * Get the next generated id for an entity
     *
     * @param entity
     */
    private getNextId(entity: EntityObjectType<any> | string): number {
        if (!this.idCounter.has(entity)) {
            this.idCounter.set(entity, 0);
        }

        const currentId = this.idCounter.get(entity) || 0;
        const nextId = currentId + 1;
        this.idCounter.set(entity, nextId);

        return nextId;
    }
}
