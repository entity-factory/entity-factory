/**
 * @module EntityFactory
 */

import { Adapter } from './adapters/Adapter';
import { Blueprint } from './blueprint/Blueprint';

/**
 * Options used by EntityFactory
 */
export interface EntityFactoryOptions {
    adapter?: Adapter;
    blueprints?: Array<Function | Blueprint<any, any, any>>;
}
