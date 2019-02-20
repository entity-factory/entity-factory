import { FixtureObjectType } from '../common/FixtureObjectType';

/**
 * Defualt adapter context
 */
export interface AdapterContext {
    /**
     * The type of entity being defined
     */
    type: string | FixtureObjectType<any>;
}
