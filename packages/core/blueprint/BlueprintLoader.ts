/**
 * @module Blueprint
 */

import { isFunction, loadDep } from '../utils';
import { Blueprint } from './Blueprint';

export class BlueprintLoader {
    constructor(private readonly fixtureProfiles: Array<Function | string | Blueprint<any, any, any>>) {}

    public getProfiles(): Array<Blueprint<any, any, any>> {
        const files = this.getImportsFromPath(this.fixtureProfiles);

        return [...this.resolveFilePaths(files, []), ...this.resolveClasses(this.fixtureProfiles)];
    }

    /**
     * Resolve file paths into FactoryProfile instances
     *
     * @param value
     * @param profiles
     */
    private resolveFilePaths(value: any, profiles: Array<Blueprint<any, any, any>>) {
        if (isFunction(value) || value instanceof Blueprint) {
            const instance = this.createFactoryProfileInstance(value);

            if (instance) {
                profiles.push(instance);
            }
        } else if (Array.isArray(value)) {
            value.forEach((v) => this.resolveFilePaths(v, profiles));
        } else if (typeof value === 'object' && value !== null) {
            Object.keys(value).forEach((key) => this.resolveFilePaths(value[key], profiles));
        }

        return profiles;
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
     * Import files from provided glob patterns
     *
     * @param values
     */
    private getImportsFromPath<T>(values: Array<string | T>): string[] {
        const patterns = values.filter((v): v is string => typeof v === 'string');

        // prevent call to glob
        if (patterns.length === 0) {
            return [];
        }

        return patterns
            .reduce((paths: string[], pattern) => {
                return [...paths, ...loadDep('glob').sync(pattern)];
            }, [])
            .map((filePath) => {
                return require(loadDep('path').resolve(process.cwd(), filePath));
            });
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
