import { getName, isFunction, loadDep } from '.';
import { User } from '../../samples/00-entities/User.entity';

describe('utils', async () => {
    describe('getName', async () => {
        it('should return a the string provided', async () => {
            expect(getName('user')).toEqual('user');
        });

        it('should return a the string name of an object', async () => {
            expect(getName(User)).toEqual('User');
        });
    });

    describe('isFunction', async () => {
        it('should return true if a function is passed', () => {
            expect(isFunction(() => false)).toEqual(true);
        });

        it('should return true if a class is passed', () => {
            // @ts-ignore
            expect(isFunction(User)).toEqual(true);
        });

        it('should return false if an object is passed', () => {
            expect(isFunction({})).toEqual(false);
        });
    });

    describe('loadDep', () => {
        it('should return an instance of glob', () => {
            expect(loadDep('glob')).toBeDefined();
        });

        it('should return an instance of path', () => {
            expect(loadDep('path')).toBeDefined();
        });

        it('should return undefined for unknown deps', () => {
            expect(loadDep('typeorm')).toBeUndefined();
        });
    });
});
