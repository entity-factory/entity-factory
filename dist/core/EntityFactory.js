'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var ObjectAdapter_1 = require('./adapters/object/ObjectAdapter');
var Blueprint_1 = require('./blueprint/Blueprint');
var BlueprintBuilder_1 = require('./blueprint/BlueprintBuilder');
var BlueprintLoader_1 = require('./blueprint/BlueprintLoader');
var utils_1 = require('./utils');
var EntityFactory = (function() {
    function EntityFactory(options) {
        if (options === void 0) {
            options = {};
        }
        var _this = this;
        this.options = options;
        this.profiles = new Map();
        this.adapter = options.adapter || new ObjectAdapter_1.ObjectAdapter();
        if (options.blueprints) {
            var loader = new BlueprintLoader_1.BlueprintLoader(
                options.blueprints,
            );
            var profiles = loader.getProfiles();
            profiles.forEach(function(profile) {
                _this.register(profile);
            });
        }
    }
    EntityFactory.prototype.for = function(entity) {
        var blueprint = this.profiles.get(entity);
        if (!blueprint) {
            throw new Error(
                'No blueprint exists for entity ' + utils_1.getName(entity),
            );
        }
        return new BlueprintBuilder_1.BlueprintBuilder(
            blueprint,
            this,
            this.adapter,
        );
    };
    EntityFactory.prototype.hasBlueprint = function(entity) {
        return this.profiles.has(entity);
    };
    EntityFactory.prototype.getProfile = function(entity) {
        return this.profiles.get(entity);
    };
    EntityFactory.prototype.register = function(fixture) {
        var profile;
        if (fixture instanceof Blueprint_1.Blueprint) {
            profile = fixture;
            this.profiles.set(profile.getType(), profile);
        } else if (utils_1.isFunction(fixture)) {
            profile = new Blueprint_1.Blueprint();
            fixture(profile);
            this.profiles.set(profile.getType(), profile);
        }
        return this;
    };
    return EntityFactory;
})();
exports.EntityFactory = EntityFactory;
