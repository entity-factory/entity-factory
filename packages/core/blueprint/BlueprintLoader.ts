/**
 * @module Blueprint
 */
import { Blueprint } from './Blueprint';

export class BlueprintLoader {
    constructor(private readonly fixtureProfiles: Array<Function | string | Blueprint<any, any, any>>) {}

    public getProfiles(): Array<Blueprint<any, any, any>> {
        // const files = this.getImportsFromPath(this.fixtureProfiles);

        return [
            // ...this.resolveFilePaths(files, []),
            ...this.resolveClasses(this.fixtureProfiles),
        ];
    }

    /**
     * Resolve classes into FactoryProfile instances
     *
     * @param cls
     */
    private resolveClasses(cls: any[]) {
        const profiles: Array<Blueprint<any, any, any>> = [];
        this.getClasses(cls).forEach((c) => {
            const instance = this.createFactoryProfileInstance(c);
            if (instance) {
                profiles.push(instance);
            }
        });

        return profiles;
    }

    /**
     * Get array items which should be evaluated as classes and instances
     *
     * @param values
     */
    private getClasses<T>(values: Array<string | T>): T[] {
        return values.filter((v): v is T => typeof v !== 'string');
    }

    /**
     * Create an instance of FactoryProfile or return undefined
     * @param cls
     */
    private createFactoryProfileInstance(
        cls: Function | Blueprint<any, any, any>,
    ): Blueprint<any, any, any> | undefined {
        if (cls instanceof Blueprint) {
            return cls;
        }

        if (cls instanceof Function) {
            const created = new (cls as new () => Blueprint<any, any, any>)();
            if (created instanceof Blueprint) {
                return created;
            }
        }

        return undefined;
    }
}
