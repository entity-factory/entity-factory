// Taken from TypeOrm ObjectType<T> type of the same firstName
export type FixtureObjectType<T> =
    | {
          new (): T;
      }
    | Function;
