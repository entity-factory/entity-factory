import { IUser } from '../entities/interfaces';
import { entityFactory } from './factory';

describe('04-after-creating-callback', async () => {
    it('it should make 3 inactive users', async () => {
        const users = await entityFactory.for<IUser>('user').make(3);

        expect(users.length).toEqual(3);
        for (const user of users) {
            expect(user.id).toBeUndefined();
            expect(user.active).toEqual(false);
            expect(user).toHaveProperty('active');
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
});
