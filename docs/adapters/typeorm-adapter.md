# TypeORM Adapter

The TypeormAdapter is used for creating mock data and automatically inserting
persisting it to a database.

### Installation

```
npm install --save @entity-factory/core @entity-factory/typeorm
```

### TypeormAdapter([opts])

```javascript
// use default connection from ormconfig.json
const typeormAdapter = new TypeormAdapter();

// or use any valid typeorm connection options
const objectAdapter = new ObjectAdaper({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    entities: [Widget],
});

const factory = new EntityFactory({
    adapter: typeormAdapter,
});
```

-   **opts**: optional, any valid
    [Typeorm Connection Options](https://typeorm.io/#/connection-options). If `opts`
    is omitted then the adapter will attempt to use the connection configured in
    `ormconfig.json`

### Typeorm Blueprint

**Available Options**

-   **generateId**: overrides the default adapter setting for a particular entity.
-   **idAttribute**: overrides the adapter setting to change the genrated id
    attribute name.

```javascript
export class WidgetBlueprint extends TypeormBlueprint<Widget> {
    constructor() {
        super();

        this.type(Widget);

        this.define(async faker => {
            /* ... */
        });
    }
}
```
