import { Blueprint } from './Blueprint';
export declare class BlueprintLoader {
    private readonly fixtureProfiles;
    constructor(fixtureProfiles: Array<Function | string | Blueprint<any, any, any>>);
    getProfiles(): Array<Blueprint<any, any, any>>;
    private resolveFilePaths;
    private resolveClasses;
    private getImportsFromPath;
    private getClasses;
    private createFactoryProfileInstance;
}
