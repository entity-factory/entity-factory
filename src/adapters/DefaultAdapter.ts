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
    private readonly options: DefaultAdapterOptions;

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
        const defaults = this.getDefaults();
        this.options = {
            generateId:
                options.generateId !== undefined
                    ? options.generateId
                    : defaults.generateId,
            defaultIdAttribute:
                options.defaultIdAttribute || defaults.defaultIdAttribute,
        };

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
     * Get default options
     */
    private getDefaults(): DefaultAdapterOptions {
        return {
            generateId: true,
            defaultIdAttribute: 'id',
            idAttributeMap: [],
        };
    }

    /**
     * Create instances of entities
     *
     * @param objects
     * @param context
     */
    public async make<Entity = any>(
        objects: Record<string, any>[],
        context: AdapterContext,
    ): Promise<Entity[]> {
        const type = context.type;
        return objects.map((object: Record<string, any>) => {
            let created: any;
            if (isFunction(type)) {
                created = new (<any>type)();
            } else {
                created = {};
            }

            for (let key in object) {
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
        context: AdapterContext,
    ): Promise<Entity[]> {
        const type = context.type;

        if (this.options.generateId) {
            const idKey =
                this.idAttributeMap.get(type) ||
                this.options.defaultIdAttribute;
            objects.forEach(entity => {
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

        const nextId = this.idCounter.get(entity) + 1;
        this.idCounter.set(entity, nextId);

        return nextId;
    }
}
