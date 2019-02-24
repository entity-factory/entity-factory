import { Blueprint } from '../../interfaces';
import { TypeormAdapter } from './TypeormAdapter';
import { TypeormContext } from './TypeormContext';

export interface TypeormBlueprint<Entity>
    extends Blueprint<Entity, TypeormAdapter, TypeormContext> {}
