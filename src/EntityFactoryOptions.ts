import { Adapter } from './adapters/Adapter';
import { Blueprint } from './blueprint/Blueprint';

/**
 * Options used by EntityFactory
 */
export interface EntityFactoryOptions {
    adapter?: Adapter;
    profiles?: Array<Function | string | Blueprint<any, any, any>>;
}
