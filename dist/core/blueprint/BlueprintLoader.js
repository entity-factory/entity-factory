'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var utils_1 = require('../utils');
var Blueprint_1 = require('./Blueprint');
var BlueprintLoader = (function() {
    function BlueprintLoader(fixtureProfiles) {
        this.fixtureProfiles = fixtureProfiles;
    }
    BlueprintLoader.prototype.getProfiles = function() {
        var files = this.getImportsFromPath(this.fixtureProfiles);
        return this.resolveFilePaths(files, []).concat(
            this.resolveClasses(this.fixtureProfiles),
        );
    };
    BlueprintLoader.prototype.resolveFilePaths = function(value, profiles) {
        var _this = this;
        if (
            utils_1.isFunction(value) ||
            value instanceof Blueprint_1.Blueprint
        ) {
            var instance = this.createFactoryProfileInstance(value);
            if (instance) {
                profiles.push(instance);
            }
        } else if (Array.isArray(value)) {
            value.forEach(function(v) {
                return _this.resolveFilePaths(v, profiles);
            });
        } else if (typeof value === 'object' && value !== null) {
            Object.keys(value).forEach(function(key) {
                return _this.resolveFilePaths(value[key], profiles);
            });
        }
        return profiles;
    };
    BlueprintLoader.prototype.resolveClasses = function(cls) {
        var _this = this;
        var profiles = [];
        this.getClasses(cls).forEach(function(c) {
            var instance = _this.createFactoryProfileInstance(c);
            if (instance) {
                profiles.push(instance);
            }
        });
        return profiles;
    };
    BlueprintLoader.prototype.getImportsFromPath = function(values) {
        var patterns = values.filter(function(v) {
            return typeof v === 'string';
        });
        if (patterns.length === 0) {
            return [];
        }
        return patterns
            .reduce(function(paths, pattern) {
                return paths.concat(utils_1.loadDep('glob').sync(pattern));
            }, [])
            .map(function(filePath) {
                return require(utils_1
                    .loadDep('path')
                    .resolve(process.cwd(), filePath));
            });
    };
    BlueprintLoader.prototype.getClasses = function(values) {
        return values.filter(function(v) {
            return typeof v !== 'string';
        });
    };
    BlueprintLoader.prototype.createFactoryProfileInstance = function(cls) {
        if (cls instanceof Blueprint_1.Blueprint) {
            return cls;
        }
        if (cls instanceof Function) {
            var created = new cls();
            if (created instanceof Blueprint_1.Blueprint) {
                return created;
            }
        }
        return undefined;
    };
    return BlueprintLoader;
})();
exports.BlueprintLoader = BlueprintLoader;
