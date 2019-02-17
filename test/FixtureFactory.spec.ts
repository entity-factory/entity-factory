import * as faker from 'faker';

import { IUser } from '../samples/DefaultAdapter/interfaces';
import { User } from '../samples/TypeormAdapter/User.entity';
import { UserFixture } from '../samples/TypeormAdapter/User.fixture';
import { FixtureFactory } from '../src';
import { Builder } from '../src/Builder';

describe('FixtureFactory', () => {
    it('should load profiles', () => {
        const factory = new FixtureFactory({
            fixtures: [UserFixture],
        });

        expect(factory.hasFactoryMethod(User)).toBe(true);
        expect(factory.hasFactoryMethod(User, 'inactive')).toBe(true);
    });

    it('should allow factories to be defined with string keys', async () => {
        const factory = new FixtureFactory();

        const callback = async faker => ({
            username: 'chuck',
            email: 'cnorris@roundhouse.io',
        });
        factory.define<IUser>('user', callback);
        factory.define(User, callback);

        expect(factory.hasFactoryMethod('user')).toBe(true);
        expect(factory.hasFactoryMethod(User)).toBe(true);

        const callbackResult = await callback(faker);
        expect(await factory.getFactoryMethod('user')(faker)).toEqual(
            callbackResult,
        );
        expect(await factory.getFactoryMethod(User)(faker)).toEqual(
            callbackResult,
        );
    });

    it('should allow factory states to be defined with string and function keys', async () => {
        const factory = new FixtureFactory();

        const callback = async faker => ({
            email: 'feelnLucky@punk.com',
        });
        factory.state<IUser>('user', 'with-email', callback);
        factory.state(User, 'with-email', callback);

        expect(factory.hasFactoryMethod('user', 'with-email')).toBe(true);
        expect(factory.hasFactoryMethod(User, 'with-email')).toBe(true);

        const callbackResult = await callback(faker);
        expect(
            await factory.getFactoryMethod('user', 'with-email')(faker),
        ).toEqual(callbackResult);
        expect(
            await factory.getFactoryMethod(User, 'with-email')(faker),
        ).toEqual(callbackResult);
    });

    it('should allow factory states to be defined as deep partials', async () => {
        const factory = new FixtureFactory();

        const partial = {
            email: 'feelnLucky@punk.com',
        };

        factory.state<IUser>('user', 'with-email', partial);

        expect(factory.hasFactoryMethod('user', 'with-email')).toBe(true);

        expect(
            await factory.getFactoryMethod('user', 'with-email')(faker),
        ).toEqual(partial);
    });

    it('should allow factory afterMaking callbacks to be defined with string and function keys', async () => {
        const factory = new FixtureFactory();

        const callback = async (user, context) => {
            user.active = false;
        };
        factory.afterMaking<IUser>('user', callback);
        factory.afterMaking(User, callback);

        expect(factory.hasMakingCallbackMethod('user')).toBe(true);
        expect(factory.hasMakingCallbackMethod(User)).toBe(true);

        const controlUser = { active: true };
        const user1 = { active: true };
        const user2 = new User();

        await callback(controlUser, { factory, faker });
        await factory.getMakingCallbackMethod('user')(user1, {
            factory,
            faker,
        });

        await factory.getMakingCallbackMethod(User)(user2, {
            factory,
            faker,
        });

        expect(user1.active).toEqual(controlUser.active);
        expect(user2.active).toEqual(controlUser.active);
    });

    it('should allow factory afterMakingState callbacks to be defined with string and function keys', async () => {
        const factory = new FixtureFactory();

        const callback = async (user, context) => {
            user.active = false;
        };
        factory.afterMakingState<IUser>('user', 'inactive', callback);
        factory.afterMakingState(User, 'inactive', callback);

        expect(factory.hasMakingCallbackMethod('user', 'inactive')).toBe(true);
        expect(factory.hasMakingCallbackMethod(User, 'inactive')).toBe(true);

        const controlUser = { active: true };
        const user1 = { active: true };
        const user2 = new User();

        await callback(controlUser, { factory, faker });
        await factory.getMakingCallbackMethod('user', 'inactive')(user1, {
            factory,
            faker,
        });
        await factory.getMakingCallbackMethod(User, 'inactive')(user2, {
            factory,
            faker,
        });

        expect(user1.active).toEqual(controlUser.active);
        expect(user2.active).toEqual(controlUser.active);
    });

    it('should allow afterCreating callbacks to be defined with string and function keys', async () => {
        const factory = new FixtureFactory();

        const callback = async (user, context) => {
            user.active = false;
        };

        factory.afterCreating<IUser>('user', callback);
        factory.afterCreating(User, callback);

        expect(factory.hasCreatingCallbackMethod('user')).toBe(true);
        expect(factory.hasCreatingCallbackMethod(User)).toBe(true);

        const controlUser = { active: true };
        const user1 = { active: true };
        const user2 = new User();

        await callback(controlUser, { factory, faker });
        await factory.getCreatingCallbackMethod('user')(user1, {
            factory,
            faker,
        });
        await factory.getCreatingCallbackMethod(User)(user2, {
            factory,
            faker,
        });

        expect(user1.active).toEqual(controlUser.active);
        expect(user2.active).toEqual(controlUser.active);
    });

    it('should allow afterCreatingState callbacks to be defined with string and function keys', async () => {
        const factory = new FixtureFactory();

        const callback = async (user, context) => {
            user.active = false;
        };
        factory.afterCreatingState<IUser>('user', 'inactive', callback);
        factory.afterCreatingState(User, 'inactive', callback);

        expect(factory.hasCreatingCallbackMethod('user', 'inactive')).toBe(
            true,
        );
        expect(factory.hasCreatingCallbackMethod(User, 'inactive')).toBe(true);

        const controlUser = { active: true };
        const user1 = { active: true };
        const user2 = new User();

        await callback(controlUser, { factory, faker });
        await factory.getCreatingCallbackMethod('user', 'inactive')(user1, {
            factory,
            faker,
        });
        await factory.getCreatingCallbackMethod(User, 'inactive')(user2, {
            factory,
            faker,
        });

        expect(user1.active).toEqual(controlUser.active);
        expect(user2.active).toEqual(controlUser.active);
    });

    it('should allow "for" to be called with a string or function and return a builder instance', async () => {
        const factory = new FixtureFactory();
        const callback = async faker => ({
            username: 'chuck',
            email: 'cnorris@roundhouse.io',
        });
        factory.define<IUser>('user', callback);
        factory.define(User, callback);

        const builder1 = factory.for('user');
        const builder2 = factory.for(User);

        expect(builder1).toBeInstanceOf(Builder);
        expect(builder2).toBeInstanceOf(Builder);
    });

    it('show throw error if getFactoryMethod is called for non-existent factory method', async () => {
        const factory = new FixtureFactory();

        expect(() => factory.getFactoryMethod('user')).toThrowError(
            'Factory method not defined for entity user',
        );
    });
});
