import { IUser } from '../00-entities/interfaces';
import { entityFactory } from './factory';

entityFactory
    .for<IUser>('user')
    .make(3)
    .then(users => {
        console.log('Active have been made: ', users);
    });

entityFactory
    .for<IUser>('user')
    .state('with-email')
    .make(3)
    .then(users => {
        console.log('Active users have been made with email: ', users);
    });
