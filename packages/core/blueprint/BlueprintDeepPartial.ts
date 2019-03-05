/**
 * @module Blueprint
 */

import { BlueprintDeepPartialMethod } from './BlueprintDeepPartialMethod';

/**
 * Deep partial passed to factory and state definition methods allowing property
 * values to be resolved via T or () => T
 */
export declare type BlueprintDeepPartial<T> = {
    [P in keyof T]?: BlueprintDeepPartial<T[P]> | BlueprintDeepPartialMethod<BlueprintDeepPartial<T[P]>>
};
