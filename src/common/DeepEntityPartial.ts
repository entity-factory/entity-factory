/**
 * Defines a partial object
 *
 * Taken from Typeorm's DeepPartial type
 */
export type DeepEntityPartial<T> = { [P in keyof T]?: DeepEntityPartial<T[P]> };
