// Taken from TypeOrm ObjectType<T> type of the same name
export type FixtureObjectType<T> =
    | {
          new (): T;
      }
    | Function;
