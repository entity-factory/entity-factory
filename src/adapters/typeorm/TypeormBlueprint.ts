import { Blueprint } from '../../blueprint/Blueprint';
import { TypeormAdapter } from './TypeormAdapter';
import { TypeormBlueprintOptions } from './TypeormBlueprintOptions';

export class TypeormBlueprint<Entity> extends Blueprint<Entity, TypeormAdapter, TypeormBlueprintOptions> {}
