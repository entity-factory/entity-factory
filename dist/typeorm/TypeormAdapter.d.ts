import { Adapter } from '../core/adapters/Adapter';
import { BlueprintOptions } from '../core/blueprint/BlueprintTypeOption';
import { DeepEntityPartial } from '../core/common/DeepEntityPartial';
import { TypeormBlueprintOptions } from './TypeormBlueprintOptions';
export declare class TypeormAdapter implements Adapter<TypeormBlueprintOptions> {
    private readonly options?;
    private connection;
    constructor(options?: string | import("typeorm/driver/mysql/MysqlConnectionOptions").MysqlConnectionOptions | import("typeorm/driver/postgres/PostgresConnectionOptions").PostgresConnectionOptions | import("typeorm/driver/sqlite/SqliteConnectionOptions").SqliteConnectionOptions | import("typeorm/driver/sqlserver/SqlServerConnectionOptions").SqlServerConnectionOptions | import("typeorm/driver/oracle/OracleConnectionOptions").OracleConnectionOptions | import("typeorm/driver/mongodb/MongoConnectionOptions").MongoConnectionOptions | import("typeorm/driver/cordova/CordovaConnectionOptions").CordovaConnectionOptions | import("typeorm/driver/sqljs/SqljsConnectionOptions").SqljsConnectionOptions | import("typeorm/driver/react-native/ReactNativeConnectionOptions").ReactNativeConnectionOptions | import("typeorm/driver/nativescript/NativescriptConnectionOptions").NativescriptConnectionOptions | import("typeorm/driver/expo/ExpoConnectionOptions").ExpoConnectionOptions | undefined);
    make<Entity>(objects: Array<DeepEntityPartial<Entity>>, context: BlueprintOptions<TypeormBlueprintOptions>): Promise<Entity[]>;
    create<Entity>(objects: Entity[], context: BlueprintOptions<TypeormBlueprintOptions>): Promise<Entity[]>;
    getManager(): import("typeorm").EntityManager;
    dispose(): Promise<void>;
    private getConnection;
    private createNewConnection;
    private getExistingConnection;
}
