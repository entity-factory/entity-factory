import * as glob from 'glob';
import * as path from 'path';
import { FixtureProfile } from './FixtureProfile';

import { isFunction } from '../utils';

export class FixtureProfileLoader {
    constructor(
        private readonly fixtureProfiles: Array<
            // tslint:disable-next-line
            Function | string | FixtureProfile
        >,
    ) {}

    public getProfiles(): FixtureProfile[] {
        const files = this.getImportsFromPath(this.fixtureProfiles);

        return [
            ...this.resolveFilePaths(files, []),
            ...this.resolveClasses(this.fixtureProfiles),
        ];
    }

    /**
     * Resolve file paths into FactoryProfile instances
     *
     * @param value
     * @param profiles
     */
    private resolveFilePaths(value: any, profiles: FixtureProfile[]) {
        if (isFunction(value) || value instanceof FixtureProfile) {
            const instance = this.createFactoryProfileInstance(value);

            if (instance) {
                profiles.push(instance);
            }
        } else if (Array.isArray(value)) {
            value.forEach(v => this.resolveFilePaths(v, profiles));
        } else if (typeof value === 'object' && value !== null) {
            Object.keys(value).forEach(key =>
                this.resolveFilePaths(value[key], profiles),
            );
        }

        return profiles;
    }

    /**
     * Resolve classes into FactoryProfile instances
     *
     * @param cls
     */
    private resolveClasses(cls: any[]) {
        const profiles = [];
        this.getClasses(cls).forEach(c => {
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
        const patterns = values.filter(
            (v): v is string => typeof v === 'string',
        );

        return patterns
            .reduce((paths, pattern) => {
                return [...paths, ...glob.sync(pattern)];
            }, [])
            .map(filePath => {
                return require(path.resolve(process.cwd(), filePath));
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
        cls: Function | FixtureProfile,
    ): FixtureProfile | undefined {
        if (cls instanceof FixtureProfile) {
            return cls;
        }

        if (cls instanceof Function) {
            const created = new (cls as new () => FixtureProfile)();
            if (created instanceof FixtureProfile) {
                return created;
            }
        }

        return undefined;
    }
}
