import { IUser } from '../entities/interfaces';
import { factory } from './factory';

describe('02-state-transform', () => {
    it('it should make 3 active user', async () => {
        const users = await factory
            .for<IUser>('user')
            .state('active')
            .create(3);

        expect(users.length).toEqual(3);
        for (const user of users) {
            expect(user.active).toEqual(true);
        }
    });
});
