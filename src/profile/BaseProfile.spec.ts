import * as faker from 'faker';
import FakerStatic = Faker.FakerStatic;

import { IWidget } from '../../samples/00-entities/interfaces';
import { Widget } from '../../samples/00-entities/Widget.entity';
import { BaseProfile } from './BaseProfile';

describe('Fixture Blueprint', async () => {
    it('should allow factories to be defined with string keys', async () => {
        const blueprint = new BaseProfile<IWidget>();

        const callback = async (fake: FakerStatic) => ({
            name: 'widgetizer',
        });

        blueprint.type('widget');
        blueprint.define(callback);

        expect(blueprint.hasFactoryMethod()).toBe(true);

        const callbackResult = await callback(faker);

        expect(await blueprint.getFactoryMethod()(faker)).toEqual(
            callbackResult,
        );
    });

    it('should allow factories to be defined with function keys', async () => {
        const blueprint = new BaseProfile<Widget>();

        const callback = async (fake: FakerStatic) => ({
            name: 'widgetizer',
        });

        blueprint.type(Widget);
        blueprint.define(callback);

        expect(blueprint.hasFactoryMethod()).toBe(true);

        const callbackResult = await callback(faker);
        expect(await blueprint.getFactoryMethod()(faker)).toEqual(
            callbackResult,
        );
    });

    it('should allow factory states to be defined with string keys', async () => {
        const blueprint = new BaseProfile<IWidget>();
        blueprint.type('widget');

        const state = 'active';

        const callback = async (fake: FakerStatic) => ({
            active: true,
        });

        blueprint.state(state, callback);

        expect(blueprint.hasFactoryMethod(state)).toBe(true);

        const callbackResult = await callback(faker);
        expect(await blueprint.getFactoryMethod(state)(faker)).toEqual(
            callbackResult,
        );
    });

    it('should allow factory states to be defined with function keys', async () => {
        const blueprint = new BaseProfile<Widget>();
        blueprint.type('widget');

        const state = 'active';

        const callback = async (fake: FakerStatic) => ({
            active: true,
        });

        blueprint.state(state, callback);

        expect(blueprint.hasFactoryMethod(state)).toBe(true);

        const callbackResult = await callback(faker);
        expect(await blueprint.getFactoryMethod(state)(faker)).toEqual(
            callbackResult,
        );
    });

    it('should allow factory states to be defined as deep partials', async () => {
        const blueprint = new BaseProfile<IWidget>();
        blueprint.type('widget');

        const state = 'active';

        const partial = {
            active: true,
        };

        blueprint.state(state, partial);

        expect(blueprint.hasFactoryMethod(state)).toBe(true);

        expect(await blueprint.getFactoryMethod(state)(faker)).toEqual(partial);
    });

    it('should allow factory afterMaking callbacks to be defined with string keys', async () => {
        const blueprint = new BaseProfile<IWidget>();

        blueprint.afterMaking(jest.fn());

        expect(blueprint.hasMakingCallbackMethod()).toBe(true);
        expect(blueprint.getMakingCallbackMethod()).toBeDefined();
    });

    it('should allow factory afterMaking callbacks to be defined with function keys', async () => {
        const blueprint = new BaseProfile<Widget>();

        blueprint.afterMaking(jest.fn());

        expect(blueprint.hasMakingCallbackMethod()).toBe(true);
        expect(blueprint.getMakingCallbackMethod()).toBeDefined();
    });

    it('should allow factory afterMakingState callbacks to be defined with string keys', async () => {
        const blueprint = new BaseProfile<IWidget>();

        blueprint.afterMakingState('inactive', jest.fn());

        expect(blueprint.hasMakingCallbackMethod('inactive')).toBe(true);
        expect(blueprint.getMakingCallbackMethod('inactive')).toBeDefined();
    });

    it('should allow factory afterMakingState callbacks to be defined with function keys', async () => {
        const blueprint = new BaseProfile<Widget>();

        blueprint.afterMakingState('inactive', jest.fn());

        expect(blueprint.hasMakingCallbackMethod('inactive')).toBe(true);
        expect(blueprint.getMakingCallbackMethod('inactive')).toBeDefined();
    });

    it('should allow afterCreating callbacks to be defined with string keys', async () => {
        const blueprint = new BaseProfile<IWidget>();

        blueprint.afterCreating(jest.fn());

        expect(blueprint.hasCreatingCallbackMethod()).toBe(true);
        expect(blueprint.getCreatingCallbackMethod()).toBeDefined();
    });

    it('should allow afterCreating callbacks to be defined with function keys', async () => {
        const blueprint = new BaseProfile<Widget>();

        blueprint.afterCreating(jest.fn());

        expect(blueprint.hasCreatingCallbackMethod()).toBeDefined();
        expect(blueprint.getCreatingCallbackMethod()).toBeDefined();
    });

    it('should allow afterCreatingState callbacks to be defined with string keys', async () => {
        const blueprint = new BaseProfile<IWidget>();

        blueprint.afterCreatingState('inactive', jest.fn());

        expect(blueprint.hasCreatingCallbackMethod('inactive')).toBe(true);
        expect(blueprint.getCreatingCallbackMethod('inactive')).toBeDefined();
    });

    it('should allow afterCreatingState callbacks to be defined with function keys', async () => {
        const factory = new BaseProfile<IWidget>();

        factory.afterCreatingState('inactive', jest.fn());

        expect(factory.hasCreatingCallbackMethod('inactive')).toBe(true);

        expect(factory.getCreatingCallbackMethod('inactive')).toBeDefined();
    });

    it('should throw error if type not defined for blueprint', async () => {
        const blueprint = new BaseProfile();

        expect(() => blueprint.getFactoryMethod('widget')).toThrow();
    });

    it('should throw error if getFactoryMethod is called for non-existent factory method', async () => {
        const blueprint = new BaseProfile();
        blueprint.type('widget');

        expect(() => blueprint.getFactoryMethod('widget')).toThrowError(
            'Factory method not defined for entity widget',
        );
    });

    it('should allow the setting of context', async () => {
        const blueprint = new BaseProfile<Widget>();
        blueprint.context({
            type: 'Widget',
        });

        expect(blueprint.getContext().type).toEqual('Widget');
    });
});
