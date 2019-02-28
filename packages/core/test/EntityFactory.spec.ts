import { ObjectBlueprint } from '..';
import { Blueprint } from '../blueprint/Blueprint';
import { BlueprintBuilder } from '../blueprint/BlueprintBuilder';
import { EntityFactory } from '../EntityFactory';

interface FooInterface {
    name: string;
    active: boolean;
}

class FooBlueprint extends ObjectBlueprint<FooInterface> {
    constructor() {
        super();

        this.type('foo');
    }
}

// tslint:disable-next-line
class BarEntity {}
// tslint:disable-next-line
class BarBlueprint extends ObjectBlueprint<BarEntity> {
    constructor() {
        super();

        this.type(BarEntity);
    }
}

describe('EntityFactory', () => {
    describe('Basic Functions', async () => {
        it('should load profiles', () => {
            const factory = new EntityFactory({
                profiles: [BarBlueprint],
            });

            expect(factory.hasBlueprint(BarEntity)).toBe(true);
        });

        it('should allow "for" to be called with a string and return a builder instance', async () => {
            const blueprint = new Blueprint<FooInterface>();
            blueprint.type('foo');
            blueprint.define(jest.fn());

            const factory = new EntityFactory();
            factory.register(blueprint);

            const builder = factory.for('foo');

            expect(builder).toBeInstanceOf(BlueprintBuilder);
        });

        it('should allow "for" to be called with a function and return a builder instance', async () => {
            const blueprint = new Blueprint<BarEntity>();
            blueprint.type(BarEntity);
            blueprint.define(jest.fn());

            const factory = new EntityFactory();
            factory.register(blueprint);

            const builder = factory.for(BarEntity);

            expect(builder).toBeInstanceOf(BlueprintBuilder);
        });

        it('show throw error if getFactoryMethod is called for non-existent factory method', async () => {
            const factory = new EntityFactory();

            expect(() => factory.for('bin')).toThrowError('No blueprint exists for entity bin');
        });

        it('should return a registered factory', async () => {
            const factory = new EntityFactory();
            factory.register((blueprint) => {
                blueprint.type(BarEntity);
            });

            expect(factory.getProfile(BarEntity)).toBeDefined();
        });

        it('should allow a factory to be registered via callback', async () => {
            const factory = new EntityFactory();
            factory.register((profile: Blueprint<FooInterface>) => {
                profile.type('foo');
                profile.define(async (faker) => ({
                    name: faker.lorem.word(),
                    active: true,
                }));
            });

            expect(factory.getProfile('foo')).toBeDefined();

            const result = await factory.for('foo').make();

            expect(result.name).toBeDefined();
            expect(result.active).toEqual(true);
        });
    });
});
