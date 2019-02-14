import { BlueprintBuilder } from '../blueprint/BlueprintBuilder';

export abstract class FixtureProfile<EntityType = any> {
    public abstract register(builder: BlueprintBuilder): void;
}
