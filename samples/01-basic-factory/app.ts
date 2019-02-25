import { IUser } from '../00-entities/interfaces';
import { factory } from './factory';
factory
    .for<IUser>('user')
    .make(3)
    .then(users => {
        console.log('Entities have been made: ', users);
    });

factory
    .for<IUser>('user')
    .create(3)
    .then(users => {
        console.log('Entities have been created with ids: ', users);
    });
