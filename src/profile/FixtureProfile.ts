import { FactoryBuilder } from '..';

export abstract class FixtureProfile {
    public abstract register(builder: FactoryBuilder): void;
}
