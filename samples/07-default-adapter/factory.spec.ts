import { factory, ICustomObject, Widget } from './factory';

describe('07-default-adapter', async () => {
    it('it should make 3 inactive users', async () => {
        const customObject = await factory
            .for<ICustomObject>('customObject')
            .create();

        expect(customObject._id).toEqual(1);
    });

    it('it should create 3 active users', async () => {
        const widget = await factory.for<Widget>('widget').create();

        expect(widget.widgetId).toEqual(1);
    });
});
