import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('mutable', () => {
    test('manipulation methods', () => {
        var m = moment();

        expect(m, 'year() should be mutable').toBe(m.year(2011));
        expect(m, 'month() should be mutable').toBe(m.month(1));
        expect(m, 'hours() should be mutable').toBe(m.hours(7));
        expect(m, 'minutes() should be mutable').toBe(m.minutes(33));
        expect(m, 'seconds() should be mutable').toBe(m.seconds(44));
        expect(m, 'milliseconds() should be mutable').toBe(m.milliseconds(55));
        expect(m, 'day() should be mutable').toBe(m.day(2));
        expect(m, 'startOf() should be mutable').toBe(m.startOf('week'));
        expect(m, 'add() should be mutable').toBe(m.add(1, 'days'));
        expect(m, 'subtract() should be mutable').toBe(m.subtract(2, 'years'));
        expect(m, 'local() should be mutable').toBe(m.local());
        expect(m, 'utc() should be mutable').toBe(m.utc());
    });

    test('non mutable methods', () => {
        var m = moment();
        expect(m, 'clone() should not be mutable').not.toBe(m.clone());
    });
});
