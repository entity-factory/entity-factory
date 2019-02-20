import { Blueprint } from '..';

/**
 * Callback passed to FixtureFactory.register() to register a blueprint without
 * creating a profile.
 */
export interface FixtureFactoryRegisterCallback {
    (blueprint: Blueprint<any>): void;
}
