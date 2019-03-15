/**
 * @module Common
 */

/**
 * Defines a creatable object
 */
export type EntityObjectType<T> =
    | {
          new (): T;
      }
    | Function;
