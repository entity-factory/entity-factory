import { FixtureObjectType } from '../common/FixtureObjectType';

/**
 * Defualt adapter context
 */
export interface BaseAdapterContext {
    /**
     * The type of entity being defined
     */
    type: string | FixtureObjectType<any>;
}
