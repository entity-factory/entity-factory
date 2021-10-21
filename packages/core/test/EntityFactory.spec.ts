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
    describe('Basic Functions', () => {
        it('should load blueprints', () => {
            const factory = new EntityFactory({
                blueprints: [BarBlueprint],
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
            const entityFactory = new EntityFactory();
            entityFactory.register((profile: Blueprint<FooInterface>) => {
                profile.type('foo');
                profile.define(async ({ faker, factory }) => ({
                    name: faker.lorem.word(),
                    active: true,
                }));
            });

            expect(entityFactory.getProfile('foo')).toBeDefined();

            const result = await entityFactory.for('foo').make();

            expect(result.name).toBeDefined();
            expect(result.active).toEqual(true);
        });

        it('should generate a single arbitrary object', async () => {
            const entityFactory = new EntityFactory();

            const result = await entityFactory.gen(async ({ faker, factory }) => {
                return {
                    username: faker.internet.userName(),
                };
            });

            expect(result.username).toBeDefined();
        });

        it('should generate a single arbitrary object with 1 is passed', async () => {
            const entityFactory = new EntityFactory();

            const result = await entityFactory.gen(1, async ({ faker, factory }) => {
                return {
                    username: faker.internet.userName(),
                };
            });

            expect(result.username).toBeDefined();
        });

        it('should generate multiple arbitrary objects', async () => {
            const entityFactory = new EntityFactory();

            const results = await entityFactory.gen(3, async ({ faker, factory }) => {
                return {
                    username: faker.internet.userName(),
                };
            });

            expect(results.length).toEqual(3);
            for (const result of results) {
                expect(result.username).toBeDefined();
            }
        });

        it('should resolve factory calls when generating arbitrary objects', async () => {
            const entityFactory = new EntityFactory();
            entityFactory.register((bp) => {
                bp.type('post');

                bp.define(async ({ faker }) => ({
                    title: faker.company.bsBuzz(),
                }));
            });

            const result = await entityFactory.gen(1, async ({ faker, factory }) => {
                return {
                    username: faker.internet.userName(),
                };
            });

            expect(result.username).toBeDefined();
        });
    });
});
