import { FixtureProfile } from './';
import { FixtureFactoryAdapter } from './adapters/FixtureFactoryAdapter';

export interface FixtureFactoryOptions {
    adapter?: FixtureFactoryAdapter;
    fixtures?: Array<Function | string | FixtureProfile<any>>;
}
