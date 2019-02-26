import { factory, ICustomObject, Widget } from './factory';

factory
    .for<ICustomObject>('customObject')
    .create()
    .then(customObject => {
        console.log(
            `customObject created with default idAttribute`,
            customObject,
        );
    });

factory
    .for<Widget>('widget')
    .create()
    .then(widget => {
        console.log(
            `widget created with custom idAttribute='widgetId'`,
            widget,
        );
    });
