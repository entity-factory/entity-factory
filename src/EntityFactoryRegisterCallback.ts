import { Blueprint } from './blueprint/Blueprint';

/**
 * Callback passed to EntityFactory.register() to register a profile without
 * creating a profile.
 */
export type EntityFactoryRegisterCallback = (blueprint: Blueprint<any, any, any>) => void;
