/**
 * @module Adapters/object
 */

import { Blueprint } from '../../blueprint/Blueprint';
import { ObjectAdapter } from './ObjectAdapter';
import { ObjectBlueprintOptions } from './ObjectBlueprintOptions';

export class ObjectBlueprint<Entity> extends Blueprint<Entity, ObjectAdapter, ObjectBlueprintOptions> {}
