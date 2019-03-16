# Creating Factory

```javascript
const entityFactory = new EntityFactory({
    adapter: new OjectAdapter(),
    blueprints: [
        new UserBlueprint(), // blueprint instance
        PostBlueprint, // blueprint reference
    ],
});
```

Create a new entity factory instance. Opts is optional and can contain the
following attributes.

-   **opts.adapter (optional)**: default `new ObjectAdapter()`. The adapter is
    used when making and creating objects. Available adapters
    -   **[ObjectAdapter](adapters/object-adapter.md)**: Creates standard javascript objects with incrementing
        id values.
    -   **[TypeormAdapter](adapters/typeorm-adapter.md)**: Makes and persists TypeORM entities.
-   **opts.profiles (optional)**: default `[]`. The profiles array accepts an
    array of Profile instances or Profile classes.
    -   **Class Reference**: Ex `UserProfile`. If a class reference is passed Entity factory will create a new instance and register it.
    -   **Profile Instance**: Ex `new UserProfile()`. If a profile instance is
        provided EntityFactory will register it.

## factory.register(profile | callback(profile))

```javascript
class UserBlueprint extends ObjectBlueprint {}

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

## factory.for(key)

```javascript
const users = await factory.for('user').create(3);
const users = await factory.for(User).create(3);
```

-   **Arguments**
    -   **key (string|object reference)**: The is defined in the profile calling
        `type(key)` in a blueprint and used to retrieve the profile from the factory
        and supply it to the `ProfileBuilder`.
-   **Returns**: [BlueprintBuilder](builder.md)

## factory.gen(count, callback)

Generates arbitrary objects on an as needed basis.

```javascript
// create a single object
const user = await factory.gen(async ({ faker, factory }) => {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
    };
});

const user = await factory.gen(async ({ faker, factory }) => {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        posts: await factory.gen(2, async ({ faker, factory }) => {
            return {
                title: faker.company.bsBuzz(),
                body: faker.lorem.paragraphs(2),
            };
        }),
    };
});

// create 3 users with nested posts from the factory
const users = await factory.gen(3, async ({ faker, factory }) => {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        posts: await factory.for('post').create(2),
    };
});
```
