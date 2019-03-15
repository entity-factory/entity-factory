# TypeORM Adapter

The TypeormAdapter is used for creating mock data and automatically inserting
persisting it to a database.

### Installation

```
npm install --save @entity-factory/core @entity-factory/typeorm
```

### TypeormAdapter([opts])

```typescript
// use default connection from ormconfig.json
const typeormAdapter = new TypeormAdapter();

// or use any valid typeorm connection options
const typeormAdapter = new TypeormAdapter({
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
None

```typescript
export class WidgetBlueprint extends TypeormBlueprint<Widget> {
    constructor() {
        super();

        this.type(Widget);

        this.define(async ({ faker, factory }) => {
            /* ... */
        });
    }
}
```
