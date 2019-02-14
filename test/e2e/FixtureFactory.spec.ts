import { User } from '../../samples/entities/User';
import { UserFixture } from '../../samples/fixtures/UserFixture';
import { FixtureFactory } from '../../src';

describe('FixtureFactory (e2e)', () => {
    it('should load profiles', () => {
        const factory = new FixtureFactory({
            fixtures: [UserFixture],
        });

        expect(factory.hasFactoryMethod(User)).toBe(true);
        expect(factory.hasFactoryMethod(User, 'inactive')).toBe(true);
    });
});
