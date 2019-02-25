import { BaseProfile } from '../../profile/BaseProfile';
import { TypeormAdapter } from './TypeormAdapter';
import { TypeormContext } from './TypeormContext';

export class TypeormProfile<Entity> extends BaseProfile<
    Entity,
    TypeormAdapter,
    TypeormContext
> {}
