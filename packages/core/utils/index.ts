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
export const isFunction = (functionToCheck: any): boolean => {
    return (
        functionToCheck &&
        ({}.toString.call(functionToCheck) === '[object Function]' ||
            {}.toString.call(functionToCheck) === '[object AsyncFunction]')
    );
};

export const loadDep = (type: string): any => {
    switch (type) {
        case 'glob':
            return require('glob');
        case 'path':
            return require('path');
        default:
            return;
    }
};
