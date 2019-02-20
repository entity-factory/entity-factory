import { FixtureProfile } from '..';
import { FixtureFactoryAdapter } from '../adapters/FixtureFactoryAdapter';

/**
 * Options used by FixtureFactory
 */
export interface FixtureFactoryOptions {
    adapter?: FixtureFactoryAdapter;
    fixtures?: Array<Function | string | FixtureProfile<any>>;
}
