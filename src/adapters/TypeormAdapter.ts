import {
    Connection,
    ConnectionOptions,
    createConnection,
    DeepPartial,
    getConnection,
} from 'typeorm';
import { DeepEntityPartial } from '..';
import { FixtureFactoryAdapter } from './FixtureFactoryAdapter';
import { TypeormAdapterContext } from './TypeormAdapterContext';

export class TypeormAdapter
    implements FixtureFactoryAdapter<TypeormAdapterContext> {
    private connection: Connection;

    constructor(private readonly options?: string | ConnectionOptions) {}

    /**
     * Prepare entities by converting object literals to
     * instantiated entities
     *
     * @param objects
     * @param context
     */
    async make<Entity>(
        objects: DeepEntityPartial<Entity>[],
        context: TypeormAdapterContext,
    ): Promise<Entity[]> {
        const type = context.type;
        const conn = await this.getConnection();

        return conn.manager.create(type, <DeepPartial<Entity>[]>objects);
    }

    /**
     * Persist instantiated entities to the database
     *
     * @param objects
     * @param context
     */
    async create<Entity>(
        objects: Entity[],
        context: TypeormAdapterContext,
    ): Promise<Entity[]> {
        const type = context.type;
        const conn = await this.getConnection();

        return await conn.manager.save(objects);
    }

    /**
     * Get connection to the database.
     */
    private async getConnection(): Promise<Connection> {
        if (!this.connection) {
            const conn = await this.getExistingConnection();

            if (conn) {
                this.connection = conn;
            } else {
                this.connection = await this.createNewConnection();
            }
        }

        return this.connection;
    }

    /**
     * Create a new connection
     */
    private async createNewConnection(): Promise<Connection> {
        let connection: Connection;
        if (!this.options) {
            connection = await createConnection();
        } else {
            connection = await createConnection(this.options as any);
        }

        return connection;
    }

    /**
     * Attempt to retrieve a connection from the connection manager.
     */
    private async getExistingConnection(): Promise<Connection | undefined> {
        const connName =
            typeof this.options === 'string' ? this.options : this.options.name;

        let connection: Connection;
        try {
            if (!connName) {
                connection = getConnection();
            } else {
                connection = getConnection(connName);
            }
        } catch (ex) {
            // do nothing
        }

        return connection;
    }
}
