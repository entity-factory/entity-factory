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
    private connection!: Connection;

    constructor(private readonly options?: string | ConnectionOptions) {}

    /**
     * Prepare entities by converting object literals to
     * instantiated entities
     *
     * @param objects
     * @param context
     */
    public async make<Entity>(
        objects: Array<DeepEntityPartial<Entity>>,
        context: TypeormAdapterContext,
    ): Promise<Entity[]> {
        const type = context.type;
        const conn = await this.getConnection();

        return await conn.manager.create(type, (objects as any) as DeepPartial<
            Entity
        >);
    }

    /**
     * Persist instantiated entities to the database
     *
     * @param objects
     * @param context
     */
    public async create<Entity>(
        objects: Entity[],
        context: TypeormAdapterContext,
    ): Promise<Entity[]> {
        const conn = await this.getConnection();

        return await conn.manager.save(objects);
    }

    public async dispose() {
        await this.connection.close();
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

        if (!this.connection.isConnected) {
            await this.connection.connect();
        }

        return this.connection;
    }

    /**
     * Create a new connection
     */
    private async createNewConnection(): Promise<Connection> {
        if (this.options) {
            return await createConnection(this.options as any);
        }

        return await createConnection();
    }

    /**
     * Attempt to retrieve a connection from the connection manager.
     */
    private async getExistingConnection(): Promise<Connection | undefined> {
        let connName;
        if (typeof this.options === 'string') {
            connName = this.options;
        } else if (this.options && this.options.name) {
            connName = this.options.name;
        }

        try {
            if (connName) {
                return await getConnection(connName);
            }

            return await getConnection();
        } catch (ex) {
            // do nothing
        }

        return;
    }
}
