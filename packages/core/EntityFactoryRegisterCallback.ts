/**
 * @module EntityFactory
 */

import { Blueprint } from './blueprint/Blueprint';

/**
 * Callback passed to EntityFactory.register() to register a profile without
 * creating a profile.
 */
export type EntityFactoryRegisterCallback<Entity = Partial<{}>> = (bp: Blueprint<Entity, any, any>) => void;
