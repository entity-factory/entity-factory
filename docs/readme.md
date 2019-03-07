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

{% codetabs name="index.js", type="js" -%}
const { EntityFactory } = require('@entity-factory/core');
const { UserBlueprint } = require('./UserBlueprint')
const { PostBlueprint } = require('./PostBlueprint')

const entityFactory = new EntityFactory({
// blueprints can be an array of glob patterns, blueprint classes and/or blueprint instances
blueprints: [UserBlueprint, PostBlueprint],
});

// Generate entities
entityFactory
.for('user') // get builder instance for 'user'
.state('with-posts') // generate users with posts
.create(3) // generate 3 users with incrementing id's
{%- language name="UserBlueprint.js", type="js" -%}
const { ObjectBlueprint } = require('@entity-factory/core');

export class UserBlueprint extends ObjectBlueprint {
constructor() {
super();

        this.type('user');

        this.define(async faker => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            active: false,
        }));

        this.state('with-posts', async faker => ({
            posts: async factory => factory.for('post').create(2)
        }));
    }

}

{%- language name="PostBlueprint.js", type="js" -%}
const { ObjectBlueprint } = require('@entity-factory/core');

class PostBlueprint extends ObjectBlueprint {
constructor() {
super();

        this.type('post');

        this.define(async faker => ({
            title: faker.company.bsBuzz(),
            body: faker.lorem.sentences(2),
        }));
    }

}
{%- endcodetabs %}

See it run:

<iframe height="800px" width="100%" src="https://repl.it/@jcloutz/entity-factory-js-example?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
