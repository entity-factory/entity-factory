import { IUser } from '../samples/DefaultAdapter/interfaces';
import { User } from '../samples/TypeormAdapter/User.entity';
import { UserFixture } from '../samples/TypeormAdapter/User.fixture';
import { FixtureFactory } from '../src';
import { FixtureBlueprint } from '../src/blueprint/FixtureBlueprint';
import { Builder } from '../src/Builder';

describe('FixtureFactory', () => {
    it('should load profiles', () => {
        const factory = new FixtureFactory({
            fixtures: [UserFixture],
        });

        expect(factory.hasBlueprint(User)).toBe(true);
    });

    it('should allow "for" to be called with a string and return a builder instance', async () => {
        const blueprint = new FixtureBlueprint<IUser>();
        blueprint.define('user', jest.fn());

        const factory = new FixtureFactory();
        factory.register(blueprint);

        const builder = factory.for('user');

        expect(builder).toBeInstanceOf(Builder);
    });

    it('should allow "for" to be called with a function and return a builder instance', async () => {
        const blueprint = new FixtureBlueprint<User>();
        blueprint.define(User, jest.fn());

        const factory = new FixtureFactory();
        factory.register(blueprint);

        const builder = factory.for(User);

        expect(builder).toBeInstanceOf(Builder);
    });

    it('show throw error if getFactoryMethod is called for non-existent factory method', async () => {
        const factory = new FixtureFactory();

        expect(() => factory.for('user')).toThrowError(
            'No blueprint exists for entity user',
        );
    });
});
