import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';
import each from '../helpers/each';
import { daysInMonth } from '../../src/lib/units/month';

describe('days in month', () => {
    test('days in month of all but february', () => {
        var days = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            year,
            month;
        for (year = 1899; year < 2100; year++) {
            for (month = 0; month < 12; month++) {
                if (month != 1) {
                    expect(moment([year, month]).daysInMonth()).toBe(
                        days[month]
                    );
                    expect(daysInMonth(year, month)).toBe(days[month]);
                }
            }
        }
    });

    test('days in month', () => {
        each(
            [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            function (days, i) {
                var firstDay = moment([2012, i]),
                    lastDay = moment([2012, i, days]);
                expect(
                    firstDay.daysInMonth(),
                    firstDay.format('L') + ' should have ' + days + ' days.'
                ).toBe(days);
                expect(
                    lastDay.daysInMonth(),
                    lastDay.format('L') + ' should have ' + days + ' days.'
                ).toBe(days);
            }
        );
    });

    test('days in month leap years', () => {
        expect(
            moment([2010, 1]).daysInMonth(),
            'Feb 2010 should have 28 days'
        ).toBe(28);
        expect(
            moment([2100, 1]).daysInMonth(),
            'Feb 2100 should have 28 days'
        ).toBe(28);
        expect(
            moment([2008, 1]).daysInMonth(),
            'Feb 2008 should have 29 days'
        ).toBe(29);
        expect(
            moment([2000, 1]).daysInMonth(),
            'Feb 2000 should have 29 days'
        ).toBe(29);
    });

    test('days in month with NaN inputs', () => {
        expect(
            isNaN(daysInMonth(NaN, NaN)),
            'year and month NaN inputs should return NaN'
        ).toBeTruthy();
        expect(
            isNaN(daysInMonth(2, NaN)),
            'month NaN inputs should return NaN'
        ).toBeTruthy();
        expect(
            isNaN(daysInMonth(NaN, 0)),
            'year NaN inputs should return NaN'
        ).toBeTruthy();
        expect(
            !moment([2010, null, null]).isValid(),
            'Invalid date because month is NaN'
        ).toBeTruthy();
    });

    test('days in month with overflow', () => {
        expect(daysInMonth(14, 22), 'positive overflow by 1').toBe(
            daysInMonth(15, 10)
        );
        expect(daysInMonth(14, 122), 'positive overflow by 10').toBe(
            daysInMonth(24, 2)
        );
        expect(daysInMonth(8, -2), 'negative overflow by 1').toBe(
            daysInMonth(7, 10)
        );
        expect(daysInMonth(-2380, -25), 'negative overflow by 3').toBe(
            daysInMonth(-2383, 11)
        );
    });

    test('days in month consistent with Date()', () => {
        var oldMethod = function (year, month) {
            return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
        };
        expect(daysInMonth(14, 22), 'positive overflow by 1').toBe(
            oldMethod(14, 22)
        );
        expect(daysInMonth(14, 122), 'positive overflow by 10').toBe(
            oldMethod(14, 122)
        );
        expect(daysInMonth(8, -2), 'negative overflow by 1').toBe(
            oldMethod(8, -2)
        );
        expect(daysInMonth(-2380, -25), 'negative overflow by 3').toBe(
            oldMethod(-2380, -25)
        );
    });
});
