# Entity Factory Typeorm Adapter

Entity Factory is a library used for quickly creating fixture data from plain
objects or classes using faker. Inspired by laravel's factories for generating
test data.

The TypeormAdapter is used for creating mock data and automatically inserting
persisting it to a database.

[Documentation](https://entity-factory.gitbook.io/entity-factory/)

## Features

-   Generate plain javascript objects on demand
-   Generate objects with nested relations
-   Typeorm Support - Generate Entities and Persist Entities and nested relations

# TypeORM Adapter

### Installation

```
npm install --save @entity-factory/core @entity-factory/typeorm
```

### TypeormAdapter

```typescript
import { EntityFactory } from '@entity-factory/core';
import { TypeormAdapter } from '@entity-factory/typeorm';
import { Widget } from './entities/widget';

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
import { TypeormBlueprint } from '@entity-factory/typeorm';
import { Widget } from './entities/widget';

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
