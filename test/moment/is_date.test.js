import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('is date', () => {
    test('isDate recognizes Date objects', () => {
        expect(moment.isDate(new Date()), 'no args (now)').toBeTruthy();
        expect(
            moment.isDate(new Date([2014, 2, 15])),
            'array args'
        ).toBeTruthy();
        expect(
            moment.isDate(new Date('2014-03-15')),
            'string args'
        ).toBeTruthy();
        expect(
            moment.isDate(new Date('does NOT look like a date')),
            'invalid date'
        ).toBeTruthy();
    });

    test('isDate rejects non-Date objects', () => {
        expect(!moment.isDate(), 'nothing').toBeTruthy();
        expect(!moment.isDate(undefined), 'undefined').toBeTruthy();
        expect(!moment.isDate(null), 'string args').toBeTruthy();
        expect(!moment.isDate(42), 'number').toBeTruthy();
        expect(!moment.isDate('2014-03-15'), 'string').toBeTruthy();
        expect(!moment.isDate([2014, 2, 15]), 'array').toBeTruthy();
        expect(
            !moment.isDate({ year: 2014, month: 2, day: 15 }),
            'object'
        ).toBeTruthy();
        expect(
            !moment.isDate({
                toString: function () {
                    return '[object Date]';
                },
            }),
            'lying object'
        ).toBeTruthy();
    });
});
