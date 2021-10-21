import { getName, isFunction } from '../../utils';

class TestClass {}

describe('utils', () => {
    describe('getName', () => {
        it('should return a the string provided', async () => {
            expect(getName('user')).toEqual('user');
        });

        it('should return a the string name of an object', async () => {
            expect(getName(TestClass)).toEqual('TestClass');
        });
    });

    describe('isFunction', () => {
        it('should return true if a function is passed', () => {
            expect(isFunction(() => false)).toEqual(true);
        });

        it('should return true if a class is passed', () => {
            // @ts-ignore
            expect(isFunction(TestClass)).toEqual(true);
        });

        it('should return false if an object is passed', () => {
            expect(isFunction({})).toEqual(false);
        });
    });
});
