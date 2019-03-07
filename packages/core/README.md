# Entity Factory

Entity Factory is a library used for quickly creating fixture data from plain
objects or classes using faker. Inspired by laravel's factories for generating
test data. Currently the library supports plain JS objects and Typeorm entities.

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Quick Guide](#quick-guide)
-   [Creating an Entity Factory](#creating-an-entity-factory)
-   [Defining a Blueprint](#defining-a-blueprint)
-   [Using the Builder](#using-the-builder)
-   [Using Adapters](#using-adapters)

## Features

-   Generate plain javascript objects on demand
-   Generate objects with nested relations
-   Typeorm Support - Generate and Persist Entities and nested relations

## Installation

```
npm install --save @entity-factory/core
```

## Quick Guide

Try it on [Runkit](https://runkit.com/jcloutz/entity-factory-quick-example)

```javascript
const { EntityFactory, ObjectBlueprint } = require('@entity-factory/core');

export const entityFactory = new EntityFactory();

entityFactory.register(bp => {
    // Set the key used for identifying an object in the factory.
    bp.type('user');

    bp.define(async faker => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        active: faker.random.boolean(),
    }));

    // define a state transform to return a user with embedded posts
    bp.state('with-posts', async faker => ({
        posts: async factory => factory.for('post').create(2),
    }));
});

entityFactory.register(bp => {
    bp.type('post');

    bp.define(async faker => ({
        title: faker.company.bsBuzz(),
        body: faker.lorem.sentences(2),
    }));
});

// Generate entities
entityFactory
    .for('user') // get builder instance for 'user'
    .state('with-posts') // get users with posts
    .create(3) // generate 3 users with incrementing id's
    .then(users => console.log(users));
```

If you wish to retain more control over the structure of your code blueprints
can be defined in classes.

[Additional Samples](https://github.com/jcloutz/entity-factory/tree/master/samples)

## Creating an Entity Factory

### factory = new EntityFactory([opts])

```javascript
const entityFactory = new EntityFactory({
    adapter: new OjectAdapter()
    blueprints: [
        '**/*.blueprint.js', // glob pattern
        new UserBlueprint(), // blueprint instance
        PostBlueprint, // blueprint reference
    ],
})
```

Create a new entity factory instance. Opts is optional and can contain the
following attributes.

-   **opts.adapter (optional)**: default `new ObjectAdapter()`. The adapter is
    used when making and creating objects. Available adapters
    -   **ObjectAdapter**: Creates standard javascript objects with incrementing
        id values.
    -   **TypeormAdapter**: Makes and persists TyprORM entities.
-   **opts.profiles (optional)**: default `[]`. The profiles array accepts an
    array of glob patterns, Profile instances or Profile classes.
    -   **glob patterns**: ex: `’src/\*\*/_.profile.js'`. If a glob pattern is passed EntityFactory will attempt to load all profiles found in the path and register them.
    -   **Class Reference**: ex`UserProfile`. If a class reference is passed Entity factory will create a new instance and register it.
    -   **Profile Instance**: Ex`new UserProfile()`. If a profile instance is
        provided EntityFactory will register it.

### factory.register(profile | callback(profile))

```javascript
class UserProfile extends ObjectBlueprint {}

// Accepts a reference or an instance to a blueprint
factory.register(UserBlueprint);
factory.register(new PostBlueprint());

// or a callback

factory.register(bp => {
    bp.type('user');

    bp.define(/*...*/);
});
```

Registers a profile with the factory

-   **Arguments**
    -   **profile**: Must be a profile instance, or a callback method accepting a
        profile instance.
-   **Returns**: void

### factory.for(key)

```javascript
const users = await factory.for('user').create(3);
const users = await factory.for(User).create(3);
```

-   **Arguments**
    -   **key (string|object reference)**: The is defined in the profile calling
        `type(key)` in a blueprint and used to retrieve the profile from the factory
        and supply it to the `ProfileBuilder`.
-   **Returns**: [BlueprintBuilder]($blueprint-builder)

## Defining a Blueprint

Definging blueprint can be done either via callback to `EntityFactory.register()`
or as a separate Blueprint class.

### Class based definition

Class based blueprint must extend a blueprint class. Each adapter has it's own
blueprint class which provides different available options specific to the
adapter. By default the Object adapter can be used with Entity Factory. For more
information on the options available please refer to the docs for each adapter
blueprint.

-   [ObjectBlueprint](#objectblueprint)
-   [TypeormBlueprint](#typeormblueprint)

```javascript
// class based Blueprint definition
export class UserBlueprint extends ObjectBlueprint {
    constructor() {
        super();

        this.type('user');

        this.define(async faker => {
            return {
                // user attributes
            };
        });
    }
}

// class based blueprints are passed to entity factory via the constructor
const factory = new EntityFactory({
    blueprints: [UserBlueprint],
});
```

### Callback based definition

Registering a blueprint via a callback is an alternative to using a blueprint
class. It does however have it's drawbacks. Using this method will always
return a basic Blueprint class that is not specific to the adapter being used.
As a result any additional functionality provided by the adapters blueprint
will not be available with this method.

```javascript
const factory = new EntityFactory();

factory.register(bp => {
    bp.type('user');

    bp.define(async faker => {
        return {
            // user attributes
        };
    });
});
```

### Blueprint Methods

#### type(string | class) \*Required

Type is used as an identifier within entity factory and can be either a string
or a class reference that is passed. An important thing to note is that the
value passed to `type()` will effect the value returned. Types passed as string
will be created as plain javascript objects. If however a class reference is
provided then Entity factory will attempt to return an instantiated instance of
that class.

**This method must be called**

```typescript
class User {}

blueprint.type(User);
// or
blueprint.type('user');
```

#### options(opts)

Each adapter blueprint can specify different available options. The options are
passed to the adapter at runtime. For adapter blueprint specific options please
refer to their documentation:

-   [ObjectBlueprint](#objectblueprint)
-   [TypeormBlueprint](#typeormblueprint)

```javascript
blueprint.options({
    idAttribute: '_id',
});
```

#### define(callback(faker)) \*Required

Used to create the primary factory method for an entity. The callback method receives a single argument which is a faker instance.

Property values can also an async callback to the factory which will allow data
to be resolved from related factories.

**This method must be called**

```javascript
blueprint.define(faker => {
    return {
        // faker usage
        username: faker.internet.userName(),

        // fixed values
        active: true,

        // async facory callback
        posts: async factory => await factory.for('post').create(2),
    };
});
```

#### state(string, callback(faker))

Used to override portions of the primary factory method and/or to add additional
properties.

Property values can also an async callback to the factory which will allow data
to be resolved from related factories.

```javascript
blueprint.state('inactive', faker => {
    return {
        active: false,
    };
});

blueprint.state('with-posts', faker => {
    return {
        // factory callbacks can contain nested factory calls to resolve other
        // blueprint instances  from the factory.
        posts: async factory => factory.for('posts').make(2),
    };
});
```

#### After callbacks

-   afterMaking(callback(currentEntity, context))
-   afterMakingState(string, callback(currentEntity, context))

Fired after a call to `make()` on the builder instance. The entity received will
have been resolved to it's base type but not persisted. The callback will
receive the current entity as well as a context object.

**callback**

-   **currentEntity**: resolved entity, plain object or class
-   **context**:
    -   **faker**: faker instance
    -   **factory**: factory instance
    -   **adapter**: adapter instance (default ObjectAdapter)

```javascript
// called after calling builder.make()
blueprint.afterMaking(async (user, { faker, factory, adapter }) => {
    // manipulate entity
});

// fired after calling builder.make() with an 'active' state transform
blueprint.afterMakingState(
    'active',
    async (user, { faker, factory, adapter }) => {
        // manipulate entity
    },
);
```

#### After callbacks

-   afterCreating(callback(currentEntity, context))
-   afterCreatingState(string, callback(currentEntity, context))

Fired after a call to `create()` on the builder instance. The entity received
will have been resolved and persisted. The callback will receive the current
entity as well as a context object.

**callback**

-   **currentEntity**: resolved entity, plain object or class
-   **context**:
    -   **faker**: faker instance
    -   **factory**: factory instance
    -   **adapter**: adapter instance (default ObjectAdapter)

```javascript
// called after calling builder.create()
blueprint.afterCreating(async (user, { faker, factory, adapter }) => {
    // manipulate entity
});

// fired after calling builder.create() with an 'active' state transform
blueprint.afterCreatingState(
    'active',
    async (user, { faker, factory, adapter }) => {
        // manipulate entity
    },
);
```

## Using the Builder

The builder is accessed via an entity factory instance by calling the `for()`
method.

```javascript
factory
    .for('user')
    .state('active')
    .with({
        email: 'test@test.com',
    })
    .create();
```

### Builder Methods

### state(...string)

Used to apply defined state transforms to a factory. The states are applied the order they are provided to the function.

```javascript
factory.for(User).state('active', 'with-posts');
```

### with(partial)

Used for overriding properties on a created entity. This is particularly useful
when testing for a specific value.

```javascript
factory.for(User).with({
    name: 'john',
});
```

### make([int, [partial]])

Resolves the partials generated by the factory methods and converts them into
plain objects or class instances. Unlike `create()` the entity will not be
persisted

```javascript
factory.for(User).make(); // return a single User

factory.for(User).make(1); // return a single User

factory.for(User).make(2); // return an array of User
```

### create([int, [partial]])

Resolves and persists the partials generated by the factory methods and converts
them into plain objects and class instances. Depending on the adapter this can
mean that they simple have an id generated for them or they are saved to teh
database.

```javascript
factory.for(User).create(); // return a single User

factory.for(User).create(1); // return a single user

factory.for(User).create(2); // return an array of User
```

## Using Adapters

Entity Factory has the ability to use adapters to persist data in various
formats. The ObjectAdapter is included in Entity Factory by default.

**Available Adapters**

-   [ObjectAdapter](#object-adapter-usage)
-   [TypeormAdapter](https://github.com/entity-factory/entity-factory/tree/master/packages/typeorm)

### Object Adapter Usage

The ObjectAdapter is used for creating mock data as plain javascript objects.
It will generate sequential id's for objects to simulate data coming from a
database.

### ObjectAdapter([opts])

```javascript
const objectAdapter = new new ObjectAdapter()

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

## TODO

-   [ ] imporove docs
-   [ ] resolve nested objects
-   [ ] resolve nested array
-   [ ] allow guid id's for object adapter
-   [ ] add method to generate random objects on the fly without a blueprint
        definition
