# Object Adapter

The ObjectAdapter is used for creating mock data as plain javascript objects.
It will generate sequential id's for objects to simulate data coming from a
database.

### ObjectAdapter([opts])

```javascript
const objectAdapter = new ObjectAdapter()

// or

const objectAdapter = new ObjectAdaper({
    generateId: true;
    defaultIdAttribute: 'id';
});

const factory = new EntityFactory({
    adapter: objectAdapter,
})
```

-   **opts**: optional
    -   **generateId**: default **true**, used to enable or disable id generation
        by default. This can be overriden at the blueprint level.
    -   **defaultIdAttribute**: default **id**, sets the default name of the id
        attribute that entity factory will generate if generateId is true.

### Object Blueprint

**Available Options**

-   **generateId**: overrides the default adapter setting for a particular entity.
-   **idAttribute**: overrides the adapter setting to change the genrated id
    attribute name.

```javascript
export class WidgetBlueprint extends ObjectBlueprint {
    constructor() {
        super();

        this.type(Widget);

        this.options({
            generateId: true
            idAttribute: '_id';
        })
    }
}
```
