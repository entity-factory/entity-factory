# Entity Factory

Entity Factory is a library used for quickly creating fixture data from plain 
objects or classes using faker. There are currently adapters for plain JS and
typeorm. 

## Installation
1. Install
`npm install --save fixture-factory`

2. Optionally install typeorm and any required database drivers.

## Quick Guide

Install fixture factory.
```
npm install --save fixture-factory
```

Create a Fixture Factory instance

```typescript
import { FixtureFactory, Blueprint } from 'fixture-factory'

interface User {
    id: number;
    username: string;
    email: string;
}

const factory = new FixtureFactory();
factory.register((blueprint: Blueprint<User>) => {
    blueprint.setType('user');
    
    blueprint.define(async faker => {
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
        }
    })
})

await factory.for<User>('user').make(3);
```