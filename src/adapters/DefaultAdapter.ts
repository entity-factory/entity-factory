import { DeepEntityPartial } from '../common/DeepFactoryPartial';
import { FixtureObjectType } from '../common/FixtureObjectType';
import { isFunction } from '../utils';
import { FixtureFactoryAdapter } from './FixtureFactoryAdapter';

interface DefaultAdapterOptions {
    generateId?: boolean;
    defaultIdAttribute?: string;
    idAttributeMap?:
        | Map<FixtureObjectType<any>, string>
        | Array<[FixtureObjectType<any>, string]>;
}
export class DefaultAdapter implements FixtureFactoryAdapter {
    private readonly options: DefaultAdapterOptions;

    private idAttributeMap: Map<FixtureObjectType<any> | string, string>;

    private idCounter = new Map<FixtureObjectType<any> | string, number>();

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

    private getDefaults(): DefaultAdapterOptions {
        return {
            generateId: true,
            defaultIdAttribute: 'id',
            idAttributeMap: [],
        };
    }

    async make<Entity>(
        type: FixtureObjectType<Entity> | string,
        objects: DeepEntityPartial<Entity>[],
    ): Promise<Entity[]> {
        return objects.map(object => {
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

    async create<Entity = any>(
        type: FixtureObjectType<Entity> | string,
        objects: Entity[],
    ): Promise<Entity[]> {
        if (this.options.generateId) {
            const idKey =
                this.idAttributeMap.get(type) ||
                this.options.defaultIdAttribute;
            objects.forEach(entity => {
                entity[idKey] = this.getNextId(type);
            });
        }

        return <Entity[]>objects;
    }

    getNextId(entity: FixtureObjectType<any> | string): number {
        if (!this.idCounter.has(entity)) {
            this.idCounter.set(entity, 0);
        }

        const nextId = this.idCounter.get(entity) + 1;
        this.idCounter.set(entity, nextId);

        return nextId;
    }
}
