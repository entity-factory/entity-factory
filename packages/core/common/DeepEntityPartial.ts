/**
 * @module Common
 */

/**
 * Defines a partial object
 *
 * Taken from Typeorm's DeepPartial __type
 */
export type DeepEntityPartial<T> = { [P in keyof T]?: DeepEntityPartial<T[P]> };
