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
