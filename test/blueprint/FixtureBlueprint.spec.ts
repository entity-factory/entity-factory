import * as faker from 'faker';

import { IWidget } from '../../samples/DefaultAdapter/interfaces';
import { Widget } from '../../samples/TypeormAdapter/Widget.entity';
import { DeepEntityPartial, FixtureFactory } from '../../src';
import { FixtureBlueprint } from '../../src';

const getMockContext = () => ({
    factory: new FixtureFactory(),
    faker,
});

const getMockWidgetObject = (
    partial: DeepEntityPartial<IWidget> = {},
): IWidget => {
    return {
        id: 0,
        name: '',
        active: false,
        ...partial,
    };
};

describe('Fixture Blueprint', async () => {
    it('should allow factories to be defined with string keys', async () => {
        const blueprint = new FixtureBlueprint<IWidget>();

        const callback = async faker => ({
            name: 'widgetizer',
        });

        blueprint.define('widget', callback);

        expect(blueprint.hasFactoryMethod()).toBe(true);

        const callbackResult = await callback(faker);

        expect(await blueprint.getFactoryMethod()(faker)).toEqual(
            callbackResult,
        );
    });

    it('should allow factories to be defined with function keys', async () => {
        const blueprint = new FixtureBlueprint<Widget>();

        const callback = async faker => ({
            name: 'widgetizer',
        });

        blueprint.define(Widget, callback);

        expect(blueprint.hasFactoryMethod()).toBe(true);

        const callbackResult = await callback(faker);
        expect(await blueprint.getFactoryMethod()(faker)).toEqual(
            callbackResult,
        );
    });

    it('should allow factory states to be defined with string keys', async () => {
        const blueprint = new FixtureBlueprint<IWidget>();
        blueprint.setType('widget');

        const state = 'active';

        const callback = async faker => ({
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
        const blueprint = new FixtureBlueprint<Widget>();
        blueprint.setType('widget');

        const state = 'active';

        const callback = async faker => ({
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
        const blueprint = new FixtureBlueprint<IWidget>();
        blueprint.setType('widget');

        const state = 'active';

        const partial = {
            active: true,
        };

        blueprint.state(state, partial);

        expect(blueprint.hasFactoryMethod(state)).toBe(true);

        expect(await blueprint.getFactoryMethod(state)(faker)).toEqual(partial);
    });

    it('should allow factory afterMaking callbacks to be defined with string keys', async () => {
        const blueprint = new FixtureBlueprint<IWidget>();

        const callback = async (widget, context) => {
            widget.active = false;
        };
        blueprint.afterMaking(callback);

        expect(blueprint.hasMakingCallbackMethod()).toBe(true);

        const controlWidget = { active: true };
        const widget = getMockWidgetObject({ active: true });

        await callback(controlWidget, { factory: blueprint, faker });
        await blueprint.getMakingCallbackMethod()(widget, getMockContext());

        expect(widget.active).toEqual(controlWidget.active);
    });

    it('should allow factory afterMaking callbacks to be defined with function keys', async () => {
        const blueprint = new FixtureBlueprint<Widget>();

        const callback = async (widget, context) => {
            widget.active = false;
        };
        blueprint.afterMaking(callback);

        expect(blueprint.hasMakingCallbackMethod()).toBe(true);
        expect(blueprint.hasMakingCallbackMethod()).toBe(true);

        const controlWidget = { active: true };
        const widget = new Widget();

        await callback(controlWidget, { factory: blueprint, faker });

        await blueprint.getMakingCallbackMethod()(widget, getMockContext());

        expect(widget.active).toEqual(controlWidget.active);
    });

    it('should allow factory afterMakingState callbacks to be defined with string keys', async () => {
        const blueprint = new FixtureBlueprint<IWidget>();

        const callback = async (widget, context) => {
            widget.active = false;
        };

        blueprint.afterMakingState('inactive', callback);

        expect(blueprint.hasMakingCallbackMethod('inactive')).toBe(true);

        const controlWidget = { active: true };
        const widget = getMockWidgetObject({ active: true });

        await callback(controlWidget, { factory: blueprint, faker });
        await blueprint.getMakingCallbackMethod('inactive')(
            widget,
            getMockContext(),
        );

        expect(widget.active).toEqual(controlWidget.active);
    });

    it('should allow factory afterMakingState callbacks to be defined with function keys', async () => {
        const blueprint = new FixtureBlueprint<Widget>();

        const callback = async (widget, context) => {
            widget.active = false;
        };
        blueprint.afterMakingState('inactive', callback);

        expect(blueprint.hasMakingCallbackMethod('inactive')).toBe(true);

        const controlWidget = { active: true };
        const widget = new Widget();

        await callback(controlWidget, { factory: blueprint, faker });
        await blueprint.getMakingCallbackMethod('inactive')(
            widget,
            getMockContext(),
        );

        expect(widget.active).toEqual(controlWidget.active);
    });

    it('should allow afterCreating callbacks to be defined with string keys', async () => {
        const blueprint = new FixtureBlueprint<IWidget>();

        const callback = async (widget, context) => {
            widget.active = false;
        };

        blueprint.afterCreating(callback);

        expect(blueprint.hasCreatingCallbackMethod()).toBe(true);

        const controlWidget = { active: true };
        const widget = getMockWidgetObject({ active: true });

        await callback(controlWidget, { factory: blueprint, faker });
        await blueprint.getCreatingCallbackMethod()(widget, getMockContext());

        expect(widget.active).toEqual(controlWidget.active);
    });

    it('should allow afterCreating callbacks to be defined with function keys', async () => {
        const blueprint = new FixtureBlueprint<Widget>();

        const callback = async (widget, context) => {
            widget.active = false;
        };

        blueprint.afterCreating(callback);

        expect(blueprint.hasCreatingCallbackMethod()).toBe(true);

        const controlWidget = { active: true };
        const widget = new Widget();

        await callback(controlWidget, { factory: blueprint, faker });
        await blueprint.getCreatingCallbackMethod()(widget, getMockContext());

        expect(widget.active).toEqual(controlWidget.active);
    });

    it('should allow afterCreatingState callbacks to be defined with string keys', async () => {
        const blueprint = new FixtureBlueprint<IWidget>();

        const callback = async (widget, context) => {
            widget.active = false;
        };
        blueprint.afterCreatingState('inactive', callback);

        expect(blueprint.hasCreatingCallbackMethod('inactive')).toBe(true);

        const controlWidget = { active: true };
        const widget = getMockWidgetObject({ active: true });

        await callback(controlWidget, { factory: blueprint, faker });
        await blueprint.getCreatingCallbackMethod('inactive')(
            widget,
            getMockContext(),
        );

        expect(widget.active).toEqual(controlWidget.active);
    });

    it('should allow afterCreatingState callbacks to be defined with function keys', async () => {
        const factory = new FixtureBlueprint<IWidget>();

        const callback = async (widget, context) => {
            widget.active = false;
        };
        factory.afterCreatingState('inactive', callback);

        expect(factory.hasCreatingCallbackMethod('inactive')).toBe(true);

        const controlWidget = { active: true };
        const widget = new Widget();

        await callback(controlWidget, { factory, faker });
        await factory.getCreatingCallbackMethod('inactive')(
            widget,
            getMockContext(),
        );

        expect(widget.active).toEqual(controlWidget.active);
    });

    it('show throw error if type not defined for blueprint', async () => {
        const blueprint = new FixtureBlueprint();

        expect(() => blueprint.getFactoryMethod('widget')).toThrow();
    });

    it('show throw error if getFactoryMethod is called for non-existent factory method', async () => {
        const blueprint = new FixtureBlueprint();
        blueprint.setType('widget');

        expect(() => blueprint.getFactoryMethod('widget')).toThrowError(
            'Factory method not defined for entity widget',
        );
    });
});
