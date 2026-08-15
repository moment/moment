import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('leap year', () => {
    test('leap year', () => {
        expect(moment([2010, 0, 1]).isLeapYear(), '2010').toBe(false);
        expect(moment([2100, 0, 1]).isLeapYear(), '2100').toBe(false);
        expect(moment([2008, 0, 1]).isLeapYear(), '2008').toBe(true);
        expect(moment([2000, 0, 1]).isLeapYear(), '2000').toBe(true);
    });
});
