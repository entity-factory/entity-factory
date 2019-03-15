/**
 * @module Common
 */

/**
 * Defines a partial object with support for nesting
 */
export type DeepEntityPartial<T> = { [P in keyof T]?: DeepEntityPartial<T[P]> };
