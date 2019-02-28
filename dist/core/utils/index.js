'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getName = function(entity) {
    return typeof entity === 'string' ? entity : entity.name;
};
exports.isFunction = function(functionToCheck) {
    return (
        functionToCheck &&
        ({}.toString.call(functionToCheck) === '[object Function]' ||
            {}.toString.call(functionToCheck) === '[object AsyncFunction]')
    );
};
exports.loadDep = function(type) {
    switch (type) {
        case 'glob':
            return require('glob');
        case 'path':
            return require('path');
        default:
            return;
    }
};
