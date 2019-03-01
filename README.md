# Entity Factory

Entity Factory is a library used for quickly creating fixture data from plain
objects or classes using faker. Inspired by laravel's factories for generating
test data. Currently the library supports plain JS objects and Typeorm entities.

<<<<<<< HEAD
[Additional Samples](https://github.com/jcloutz/entity-factory/tree/master/samples)
=======

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Example](#example)
    -   [Inline Declaration](#inline-declaration)
    -   [Profile Declaration](#profile-declaration)

## Features

-   Generate plain javascript objects on demand
-   Generate objects with nested relations
-   Typeorm Support - Generate Entities - Persist Entities and nested relations
    > > > > > > > feature/lerna

## Installation

```
<<<<<<< HEAD
npm install --save entity-factory
```

## Example

Entity blueprints can also be defined within classes to enable better code separation.

```typescript
import { EntityFactory, ObjectBlueprint } from 'entity-factory';
=======
npm install --save @entity-factory/core
```

## Example

Entity Profiles can also be defined within classes to enable better code separation.

> > > > > > > feature/lerna

```javascript
import { EntityFactory, ObjectBlueprint } from '@entity-factory/core';

<<<<<<< HEAD
class UserBlueprint extends ObjectBlueprint<User> {
=======
class UserBlueprint extends ObjectBlueprint {
>>>>>>> feature/lerna
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
<<<<<<< HEAD
    // blueprints can be an array of glob patterns, blueprint classes and/or blueprint instances
    profiles: [UserBlueprint],
=======
    blueprints: [UserBlueprint],
>>>>>>> feature/lerna
});

// Generate entities
entityFactory
    .for('user') // get builder instance for 'user'
    .state('active')
    .create(3) // generate 3 users with incrementing id's
    .then(users => console.log(users));

// output:
// [
//     { id: 1, username: 'john', email: 'Sarai71@gmail.com', active: true },
//     { id: 2, username: 'john', email: 'Cierra.Olson50@yahoo.com', active: true },
//     { id: 3, username: 'john', email: 'Tyrique_Homenick@hotmail.com', active: true }
// ]
```

### Alternate Inline Blueprint Declaration

```typescript
<<<<<<< HEAD
import { EntityFactory, ObjectBlueprint } from 'entity-factory';
=======
import { EntityFactory, ObjectProfile } from 'entity-factory';
>>>>>>> feature/lerna

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

<<<<<<< HEAD

## TODO

[ ] imporove docs
[ ] resolve nested objects
[ ] resolve nested array
[ ] add method to generate random objects on the fly
=======

## Entity Profile

_TODO_

## Profile Builder

_TODO_

> > > > > > > feature/lerna
