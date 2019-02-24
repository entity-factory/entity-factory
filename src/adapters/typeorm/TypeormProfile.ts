import {
    BaseProfile,
    TypeormAdapter,
    TypeormBlueprint,
    TypeormContext,
} from '../..';

export abstract class TypeormProfile<Entity> extends BaseProfile<
    Entity,
    TypeormAdapter,
    TypeormContext
> {
    public abstract register(blueprint: TypeormBlueprint<Entity>): void;
}
