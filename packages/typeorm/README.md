# Entity Factory

Entity Factory is a library used for quickly creating fixture data from plain
objects or classes using faker. Inspired by laravel's factories for generating
test data. Currently the library supports plain JS objects and Typeorm entities.

## Features

-   Generate plain javascript objects on demand
-   Generate objects with nested relations
-   Typeorm Support - Generate Entities and Persist Entities and nested relations

## Installation

```
npm install --save @entity-factory/core
```

## Example

Entity blueprints can also be defined within classes to enable better code separation.

```javascript
import { EntityFactory, ObjectBlueprint } from '@entity-factory/core';

class UserBlueprint extends ObjectBlueprint {
    constructor() {
        super();

        // Set the key used for identifying an object in the factory.
        // The key can be a string or a class.
        this.type('user');

        this.define(async faker => {
            return {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                active: false,
            };
        });

        this.state('active', async faker => {
            return {
                active: true,
            };
        });

        // called after make()
        this.afterMaking(async (user, { faker, factory, adapter }) => {
            // perform operation on entity
        });

        // called after make() on entity with a specific state transform
        this.afterMakingState(
            'active',
            async (user, { faker, factory, adapter }) => {
                // perform operation on entity
            },
        );

        // called after create()
        this.afterCreating(async (user, { faker, factory, adapter }) => {
            // perform operation on entity
        });

        // called after create() on entity with a specific state transform
        this.afterCreatingState(
            'active',
            async (user, { faker, factory, adapter }) => {
                // perform operation on entity
            },
        );
    }
}

export const entityFactory = new EntityFactory({
    // blueprints can be an array of glob patterns, blueprint classes and/or blueprint instances
    blueprints: [UserBlueprint],
});

// Generate entities
entityFactory
    .for('user') // get builder instance for 'user'
    .state('active')
    .create(3) // generate 3 users with incrementing id's
    .then(users => console.log(users));

// output:
// [
//    { id: 1, username: 'Shawna_Muller77', email: 'Nelda55@hotmail.com', active: true },
//    { id: 2, username: 'Abraham_Emard', email: 'Skye_Champlin@hotmail.com', active: true },
//    { id: 3, username: 'Ena14', email: 'Suzanne.Hansen@yahoo.com', active: false }
// ]
```

### Alternate Inline Blueprint Declaration

```typescript
import { EntityFactory, ObjectBlueprint } from 'entity-factory';

interface User {
    id: number;
    username: string;
    email: string;
    active: boolean;
}

export const entityFactory = new EntityFactory();

entityFactory.register((profile: ObjectBlueprint<User>) => {
    // Set the key used for identifying an object in the factory.
    // The key can be a string or a class.
    profile.type('user');

    profile.define(async faker => {
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: faker.random.boolean(),
        };
    });
});

// Generate entities
entityFactory
    .for<User>('user') // get builder instance for 'user'
    .create(3) // generate 3 users with incrementing id's
    .then(users => console.log(users));

// output:
// [
//     { id: 1, username: 'Mathias.Fay', email: 'Lisandro_Walker@yahoo.com', active: true },
//     { id: 2, username: 'Ashlynn77', email: 'Edd_Jenkins@hotmail.com', active: false },
//     { id: 3, username: 'Josefina99', email: 'Yesenia23@hotmail.com', active: true }
// ]
```

[Additional Samples](https://github.com/jcloutz/entity-factory/tree/master/samples)

## TODO

-   [ ] imporove docs
-   [ ] resolve nested objects
-   [ ] resolve nested array
-   [ ] allow guid id's for object adapter
-   [ ] add method to generate random objects on the fly without a blueprint definition
