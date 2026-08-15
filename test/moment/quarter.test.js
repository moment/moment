import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('quarter', () => {
    test('library quarter getter', () => {
        expect(moment([1985, 1, 4]).quarter(), 'Feb  4 1985 is Q1').toBe(1);
        expect(moment([2029, 8, 18]).quarter(), 'Sep 18 2029 is Q3').toBe(3);
        expect(moment([2013, 3, 24]).quarter(), 'Apr 24 2013 is Q2').toBe(2);
        expect(moment([2015, 2, 5]).quarter(), 'Mar  5 2015 is Q1').toBe(1);
        expect(moment([1970, 0, 2]).quarter(), 'Jan  2 1970 is Q1').toBe(1);
        expect(moment([2001, 11, 12]).quarter(), 'Dec 12 2001 is Q4').toBe(4);
        expect(moment([2000, 0, 2]).quarter(), 'Jan  2 2000 is Q1').toBe(1);
    });

    test('quarter setter singular', () => {
        var m = moment([2014, 4, 11]);
        expect(m.quarter(2).month(), 'set same quarter').toBe(4);
        expect(m.quarter(3).month(), 'set 3rd quarter').toBe(7);
        expect(m.quarter(1).month(), 'set 1st quarter').toBe(1);
        expect(m.quarter(4).month(), 'set 4th quarter').toBe(10);
    });

    test('quarter setter plural', () => {
        var m = moment([2014, 4, 11]);
        expect(m.quarters(2).month(), 'set same quarter').toBe(4);
        expect(m.quarters(3).month(), 'set 3rd quarter').toBe(7);
        expect(m.quarters(1).month(), 'set 1st quarter').toBe(1);
        expect(m.quarters(4).month(), 'set 4th quarter').toBe(10);
    });

    test('quarter setter programmatic', () => {
        var m = moment([2014, 4, 11]);
        expect(m.set('quarter', 2).month(), 'set same quarter').toBe(4);
        expect(m.set('quarter', 3).month(), 'set 3rd quarter').toBe(7);
        expect(m.set('quarter', 1).month(), 'set 1st quarter').toBe(1);
        expect(m.set('quarter', 4).month(), 'set 4th quarter').toBe(10);
    });

    test('quarter setter programmatic plural', () => {
        var m = moment([2014, 4, 11]);
        expect(m.set('quarters', 2).month(), 'set same quarter').toBe(4);
        expect(m.set('quarters', 3).month(), 'set 3rd quarter').toBe(7);
        expect(m.set('quarters', 1).month(), 'set 1st quarter').toBe(1);
        expect(m.set('quarters', 4).month(), 'set 4th quarter').toBe(10);
    });

    test('quarter setter programmatic abbr', () => {
        var m = moment([2014, 4, 11]);
        expect(m.set('Q', 2).month(), 'set same quarter').toBe(4);
        expect(m.set('Q', 3).month(), 'set 3rd quarter').toBe(7);
        expect(m.set('Q', 1).month(), 'set 1st quarter').toBe(1);
        expect(m.set('Q', 4).month(), 'set 4th quarter').toBe(10);
    });

    test('quarter setter only month changes', () => {
        var m = moment([2014, 4, 11, 1, 2, 3, 4]).quarter(4);
        expect(m.year(), 'keep year').toBe(2014);
        expect(m.month(), 'set month').toBe(10);
        expect(m.date(), 'keep date').toBe(11);
        expect(m.hour(), 'keep hour').toBe(1);
        expect(m.minute(), 'keep minutes').toBe(2);
        expect(m.second(), 'keep seconds').toBe(3);
        expect(m.millisecond(), 'keep milliseconds').toBe(4);
    });

    test('quarter setter bubble to next year', () => {
        var m = moment([2014, 4, 11, 1, 2, 3, 4]).quarter(7);
        expect(m.year(), 'year bubbled').toBe(2015);
        expect(m.month(), 'set month').toBe(7);
        expect(m.date(), 'keep date').toBe(11);
        expect(m.hour(), 'keep hour').toBe(1);
        expect(m.minute(), 'keep minutes').toBe(2);
        expect(m.second(), 'keep seconds').toBe(3);
        expect(m.millisecond(), 'keep milliseconds').toBe(4);
    });

    test('quarter diff', () => {
        expect(
            moment('2014-01-01').diff(moment('2014-04-01'), 'quarter'),
            'diff -1 quarter'
        ).toBe(-1);
        expect(
            moment('2014-04-01').diff(moment('2014-01-01'), 'quarter'),
            'diff 1 quarter'
        ).toBe(1);
        expect(
            moment('2014-05-01').diff(moment('2014-01-01'), 'quarter'),
            'diff 1 quarter'
        ).toBe(1);
        expect(
            Math.abs(
                4 / 3 -
                    moment('2014-05-01').diff(
                        moment('2014-01-01'),
                        'quarter',
                        true
                    )
            ) < 0.00001,
            'diff 1 1/3 quarter'
        ).toBeTruthy();
        expect(
            moment('2015-01-01').diff(moment('2014-01-01'), 'quarter'),
            'diff 4 quarters'
        ).toBe(4);
    });

    test('quarter setter bubble to previous year', () => {
        var m = moment([2014, 4, 11, 1, 2, 3, 4]).quarter(-3);
        expect(m.year(), 'year bubbled').toBe(2013);
        expect(m.month(), 'set month').toBe(1);
        expect(m.date(), 'keep date').toBe(11);
        expect(m.hour(), 'keep hour').toBe(1);
        expect(m.minute(), 'keep minutes').toBe(2);
        expect(m.second(), 'keep seconds').toBe(3);
        expect(m.millisecond(), 'keep milliseconds').toBe(4);
    });
});
