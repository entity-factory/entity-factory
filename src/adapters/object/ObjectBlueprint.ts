import { Blueprint, ObjectAdapter, ObjectContext } from '../..';

export interface ObjectBlueprint<Entity>
    extends Blueprint<Entity, ObjectAdapter, ObjectContext> {}
