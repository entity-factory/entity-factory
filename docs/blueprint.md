# Defining a Blueprint

Defining blueprint can be done either via callback to [EntityFactory.register()](/factory.md#factoryregisterprofile--callbackprofile)
or as a separate Blueprint class.

```javascript
class UserBlueprint extends ObjectBlueprint {
    constructor() {
        super();

        // set type used to identify the blueprint
        this.type('user');

        // set the options for the blueprint
        this.options({
            generateId: true,
        });

        // define the default factory method for this blueprint
        this.define(async faker => {
            return {
                /* user properties */
            };
        });

        // create a state transform for this blueprint to override or supplement
        // properties created in define()
        this.state('active', async faker => {
            return {
                /* user properties */
            };
        });

        // Called after making an entity
        this.afterMakinge(async (user, { factory, adapter, faker }) => {
            /* manipulate user */
        });

        // called after making an entity with a given state
        this.afterMakingState(
            'active',
            async (user, { factory, adapter, faker }) => {
                /* manipulate user */
            },
        );

        // called after creating and entity
        this.afterCreating(async (user, { factory, adapter, faker }) => {
            /* manipulate user */
        });

        // called after creating an entity with a given state
        this.afterCreatingState(
            'active',
            async (user, { factory, adapter, faker }) => {
                /* manipulte user */
            },
        );
    }
}
```

## Class based definition

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

## Callback based definition

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

## Blueprint Methods

### type(string | class) \*Required

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

### options(opts)

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

### define(callback(faker)) \*Required

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

### state(string, callback(faker))

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

### After callbacks

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

### After callbacks

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
