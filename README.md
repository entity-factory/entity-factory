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
import { FixtureFactory } from 'fixture-factory'

interface User {
    id: number;
    username: string;
    email: string;
}

const factory = new FixtureFactory();
factory.define((blueprint: Blueprint<IUser>) => {
    
})
```