import { IUser } from '../00-entities/interfaces';
import { entityFactory } from './factory';

entityFactory
    .for<IUser>('user')
    .make(3)
    .then(users => {
        console.log('Inactive users have been made: ', users);
    });

entityFactory
    .for<IUser>('user')
    .create(3)
    .then(users => {
        console.log('Active users have been created: ', users);
    });
