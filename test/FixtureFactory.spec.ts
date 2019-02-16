import { IUser } from '../samples/DefaultAdapter/interfaces';
import { User } from '../samples/TypeormAdapter/User.entity';
import { UserFixture } from '../samples/TypeormAdapter/User.fixture';
import { FixtureFactory } from '../src';

describe('FixtureFactory', () => {
    it('should load profiles', () => {
        const factory = new FixtureFactory({
            fixtures: [UserFixture],
        });

        expect(factory.hasFactoryMethod(User)).toBe(true);
        expect(factory.hasFactoryMethod(User, 'inactive')).toBe(true);
    });

    it('should allow factories to be registered with string names', async () => {
        const factory = new FixtureFactory();

        factory.for<IUser>('user', faker => ({
            username: faker.internet.username(),
        }));

        expect(factory.hasFactoryMethod('user')).toBe(true);
    });
});
