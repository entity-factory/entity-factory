import { FixtureObjectType } from '../common/FixtureObjectType';

export const DEFAULT_KEY = '__default';

/**
 * Get the firstName of an object
 *
 * @param entity
 */
export const getName = (entity: any): string => {
    return typeof entity === 'string' ? entity : entity.name;
};

/**
 * Get the key representing an entity
 *
 * @param entity
 * @param state
 */
export const getKey = (
    entity: FixtureObjectType<any> | string,
    state?: string,
) => {
    return `${getName(entity)}.${state || DEFAULT_KEY}`;
};

/**
 * https://stackoverflow.com/a/7356528
 *
 * @param functionToCheck
 */
export const isFunction = (functionToCheck): boolean => {
    return (
        functionToCheck &&
        {}.toString.call(functionToCheck) === '[object Function]'
    );
};
