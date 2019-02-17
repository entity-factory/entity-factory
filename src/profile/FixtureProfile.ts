import { FactoryBuilder } from '..';

export abstract class FixtureProfile<EntityType = any> {
    public abstract register(builder: FactoryBuilder): void;
}
