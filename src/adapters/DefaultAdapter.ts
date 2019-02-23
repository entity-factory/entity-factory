import { FixtureObjectType } from '../common/FixtureObjectType';
import { isFunction } from '../utils';
import { AdapterContext } from './AdapterContext';
import { FixtureFactoryAdapter } from './FixtureFactoryAdapter';

interface DefaultAdapterOptions {
    generateId?: boolean;
    defaultIdAttribute?: string;
    idAttributeMap?:
        | Map<FixtureObjectType<any> | string, string>
        | Array<[FixtureObjectType<any> | string, string]>;
}

export class DefaultAdapter implements FixtureFactoryAdapter<AdapterContext> {
    private readonly options = {
        generateId: true,
        defaultIdAttribute: 'id',
        idAttributeMap: [],
    };

    /**
     * Keeps track of any custom id attribute names
     */
    private idAttributeMap: Map<FixtureObjectType<any> | string, string>;

    /**
     * Keep a running counter for entity id's
     */
    private idCounter = new Map<FixtureObjectType<any> | string, number>();

    /**
     * Default Adapter
     *
     * @param options
     */
    constructor(options: DefaultAdapterOptions = {}) {
        if (options.generateId !== undefined) {
            this.options.generateId = options.generateId;
        }

        if (options.defaultIdAttribute !== undefined) {
            this.options.defaultIdAttribute = options.defaultIdAttribute;
        }

        if (Array.isArray(options.idAttributeMap)) {
            this.idAttributeMap = new Map(options.idAttributeMap);
        } else if (options.idAttributeMap instanceof Map) {
            this.idAttributeMap = options.idAttributeMap as Map<
                FixtureObjectType<any>,
                string
            >;
        } else {
            this.idAttributeMap = new Map<FixtureObjectType<any>, string>();
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
        context: AdapterContext,
    ): Promise<Entity[]> {
        const type = context.type;
        return objects.map((object: Record<string, any>) => {
            let created: any;
            if (isFunction(type)) {
                created = new (type as any)();
            } else {
                created = {};
            }

            for (const key in object) {
                if (object[key]) {
                    created[key] = object[key];
                }
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
        context: AdapterContext,
    ): Promise<Entity[]> {
        const type = context.type;

        if (this.options.generateId) {
            const idKey =
                this.idAttributeMap.get(type) ||
                this.options.defaultIdAttribute;
            objects.forEach((entity: any) => {
                entity[idKey] = this.getNextId(type);
            });
        }

        return objects;
    }

    /**
     * Get the next generated id for an entity
     *
     * @param entity
     */
    private getNextId(entity: FixtureObjectType<any> | string): number {
        if (!this.idCounter.has(entity)) {
            this.idCounter.set(entity, 0);
        }

        const currentId = this.idCounter.get(entity) || 0;
        const nextId = currentId + 1;
        this.idCounter.set(entity, nextId);

        return nextId;
    }
}
