# Entity Factory

Entity Factory is a library used for quickly creating fixture data from plain
objects or classes using faker. Inspired by laravel's factories for generating
test data. Currently the library supports plain JS objects and Typeorm entities.

## Features

-   Generate plain javascript objects on demand
-   Generate objects with nested relations
-   Typeorm Support - Generate and Persist Entities and nested relations

## Installation

```
npm install --save @entity-factory/core
```

## Example

See it run on [repl.it](https://repl.it/@jcloutz/entity-factory-js-example)

```javascript
// index.js
const { EntityFactory } = require('@entity-factory/core');
const { UserBlueprint } = require('./UserBlueprint');
const { PostBlueprint } = require('./PostBlueprint');

const entityFactory = new EntityFactory({
    // blueprints can be an array of glob patterns, blueprint classes and/or blueprint instances
    blueprints: [UserBlueprint, PostBlueprint],
});

// Generate entities
entityFactory
    .for('user') // get builder instance for 'user'
    .state('with-posts') // generate users with posts
    .create(3); // generate 3 users with incrementing id's
```

```javascript
// UserBlueprint.js
const { ObjectBlueprint } = require('@entity-factory/core');

export class UserBlueprint extends ObjectBlueprint {
    constructor() {
        super();

        this.type('user');

        this.define(async ({ faker, factory }) => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: false,
        }));

        this.state('with-posts', async ({ faker, factory }) => ({
            posts: await factory.for('post').create(2),
        }));
    }
}
```

```javascript
// PostBlueprint.js
const { ObjectBlueprint } = require('@entity-factory/core');

class PostBlueprint extends ObjectBlueprint {
    constructor() {
        super();

        this.type('post');

        this.define(async ({ faker, factory }) => ({
            title: faker.company.bsBuzz(),
            body: faker.lorem.sentences(2),
        }));
    }
}
```
