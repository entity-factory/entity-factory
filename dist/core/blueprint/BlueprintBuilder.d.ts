import { Adapter } from '../adapters/Adapter';
import { DeepEntityPartial } from '../common/DeepEntityPartial';
import { EntityFactory } from '../EntityFactory';
import { Blueprint } from './Blueprint';
export declare class BlueprintBuilder<Entity = Record<string, any>> {
    private readonly profile;
    private readonly factory;
    private readonly adapter;
    private stateFactories;
    private partial;
    constructor(profile: Blueprint<Entity, any, any>, factory: EntityFactory, adapter: Adapter);
    state(...state: string[]): BlueprintBuilder<Entity>;
    with(partial: DeepEntityPartial<Entity>): BlueprintBuilder<Entity>;
    make(): Promise<Entity>;
    make(count: 1, partial?: DeepEntityPartial<Entity>): Promise<Entity>;
    make(count: number, partial?: DeepEntityPartial<Entity>): Promise<Entity[]>;
    create(): Promise<Entity>;
    create(count: 1, partial?: DeepEntityPartial<Entity>): Promise<Entity>;
    create(count: number, partial?: DeepEntityPartial<Entity>): Promise<Entity[]>;
    private resolveStates;
    private resolveStateFactory;
    private getCallbackContext;
    private getStateBuilder;
}
