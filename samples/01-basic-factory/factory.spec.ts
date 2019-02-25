import { IUser } from '../00-entities/interfaces';
import { factory } from './factory';

describe('01-basic-factory', async () => {
    it('it should make 3 users', async () => {
        const users = await factory.for<IUser>('user').make(3);

        expect(users.length).toEqual(3);
        for (const user of users) {
            expect(user.id).toBeUndefined();
        }
    });

    it('it should create 3 users with ids', async () => {
        const users = await factory.for<IUser>('user').create(3);

        expect(users.length).toEqual(3);
        for (const user of users) {
            expect(user.id).toBeDefined();
        }
    });
});
