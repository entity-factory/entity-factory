import { BaseProfile } from '../../profile/BaseProfile';
import { ObjectAdapter } from './ObjectAdapter';
import { ObjectContext } from './ObjectContext';

export class ObjectProfile<Entity> extends BaseProfile<
    Entity,
    ObjectAdapter,
    ObjectContext
> {}
