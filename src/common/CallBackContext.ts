import { FixtureFactory } from '../FixtureFactory';
import FakerStatic = Faker.FakerStatic;

export interface CallBackContext {
    factory: FixtureFactory;
    faker: FakerStatic;
}
