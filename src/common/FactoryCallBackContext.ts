import { FixtureFactory } from '../FixtureFactory';
import FakerStatic = Faker.FakerStatic;

/**
 * Context passed to FactoryProfileCallbackMethod
 */
export interface FactoryCallBackContext {
    factory: FixtureFactory;
    faker: FakerStatic;
}
