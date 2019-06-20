# Entity Factory

Entity Factory is a library used for quickly creating fixture data from plain
objects or classes using faker. Inspired by laravel's factories for generating
test data. Currently the library supports plain JS objects and Typeorm entities.

[Documentation](https://entity-factory.gitbook.io/entity-factory/)

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Quick Guide](#quick-guide)

## Features

-   Generate plain javascript objects on demand
-   Generate objects with nested relations
-   [Typeorm Support](https://github.com/entity-factory/entity-factory/tree/master/packages/typeorm) - Generate and Persist Entities and nested relations

## Installation

```
npm install --save @entity-factory/core
```

## Quick Guide

Try it on [Runkit](https://runkit.com/jcloutz/entity-factory-quick-example)

```javascript
const { EntityFactory, ObjectBlueprint } = require('@entity-factory/core');

class UserBlueprint extends ObjectBlueprint {
    constructor() {
        super();

        this.type('user');

        this.define(async ({ faker, factory }) => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: faker.random.boolean(),
        }));

        // define a state transform to return a user with embedded posts
        this.state('with-posts', async ({ faker, factory }) => ({
            posts: await factory.for('post').create(2),
        }));
    }
}

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

export const entityFactory = new EntityFactory({
    blueprints: [UserBlueprint, PostBlueprint],
});

// Generate entities
entityFactory
    .for('user') // get builder instance for 'user'
    .state('with-posts') // get users with posts
    .create(3) // generate 3 users with incrementing id's
    .then(users => console.log(users));
```

It is also possible to generate random data using the `gen` method available on
EntityFactory

```javascript
await entityFactory.gen(3, async ({ faker, factory }) => {
    return {
        name: faker.company.bsBuzz(),
        active: faker.random.boolean(),
    };
});
```

[Additional Samples](https://github.com/jcloutz/entity-factory/tree/master/samples)

## TODO

-   [ ] Add Mongoose adapter
-   [ ] Add Sequelize adapter
-   [x] improve docs
-   [x] resolve nested objects
-   [x] resolve nested array
-   [x] allow guid id's for object adapter
-   [x] add method to generate random objects on the fly without a blueprint
        definition
