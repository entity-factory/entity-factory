import { FixtureObjectType } from '../common/FixtureObjectType';
import { isFunction } from '../utils';
import { DefaultAdapterContext } from './DefaultAdapterContext';
import { FixtureFactoryAdapter } from './FixtureFactoryAdapter';

interface DefaultAdapterOptions {
    generateId?: boolean;
    defaultIdAttribute?: string;
}

export class DefaultAdapter
    implements FixtureFactoryAdapter<DefaultAdapterContext> {
    private readonly options = {
        generateId: true,
        defaultIdAttribute: 'id',
    };

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
    }

    /**
     * Create instances of entities
     *
     * @param objects
     * @param context
     */
    public async make<Entity = any>(
        objects: Array<Record<string, any>>,
        context: DefaultAdapterContext,
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
        context: DefaultAdapterContext,
    ): Promise<Entity[]> {
        const { type, idAttribute } = context;

        if (this.options.generateId) {
            const idKey = idAttribute || this.options.defaultIdAttribute;
            objects = objects.map((entity: any) => {
                return {
                    [idKey]: this.getNextId(type),
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