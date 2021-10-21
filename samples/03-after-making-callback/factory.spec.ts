import { IUser } from '../entities/interfaces';
import { entityFactory } from './factory';

describe('03-after-making-callback', () => {
    it('it should make 3 active users', async () => {
        const users = await entityFactory.for<IUser>('user').make(3);

        expect(users.length).toEqual(3);
        for (const user of users) {
            expect(user.id).toBeUndefined();
            expect(user.active).toEqual(true);
        }
    });

    it('it should create 3 active users', async () => {
        const users = await entityFactory.for<IUser>('user').create(3);

        expect(users.length).toEqual(3);
        for (const user of users) {
            expect(user.id).toBeDefined();
            expect(user.active).toEqual(true);
        }
    });

    it('it should make 3 active users with email user names', async () => {
        const users = await entityFactory
            .for<IUser>('user')
            .state('with-email')
            .create(3);

        expect(users.length).toEqual(3);
        for (const user of users) {
            expect(user.username).toEqual(user.email);
            expect(user.active).toEqual(true);
        }
    });
});
