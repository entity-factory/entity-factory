import { IUser } from '../entities/interfaces';
import { factory } from './factory';

factory
    .for<IUser>('user')
    .state('active')
    .create(3)
    .then((users) => {
        console.log('Active users have been created: ', users);
    });
