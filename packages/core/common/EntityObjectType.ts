/**
 * Defines a creatable object
 *
 * Taken from TypeOrm ObjectType<T> __type of the same name
 */
export type EntityObjectType<T> =
    | {
          new (): T;
      }
    | Function;
