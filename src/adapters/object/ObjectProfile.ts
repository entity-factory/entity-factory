import { BaseProfile } from '../..';
import { ObjectAdapter } from './ObjectAdapter';
import { ObjectBlueprint } from './ObjectBlueprint';
import { ObjectContext } from './ObjectContext';

export abstract class ObjectProfile<Entity> extends BaseProfile<
    Entity,
    ObjectAdapter,
    ObjectContext
> {
    public abstract register(blueprint: ObjectBlueprint<Entity>): void;
}
