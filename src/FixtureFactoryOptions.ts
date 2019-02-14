import { ConnectionOptions } from 'typeorm';
import { FixtureProfile } from './';

export interface FixtureFactoryOptions {
    connection?: string | ConnectionOptions;
    // tslint:disable-next-line
    fixtures?: Array<Function | string | FixtureProfile<any>>;
}
