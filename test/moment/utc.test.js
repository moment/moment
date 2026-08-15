import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('utc', () => {
    test('utc and local', () => {
        var m = moment(Date.UTC(2011, 1, 2, 3, 4, 5, 6)),
            offset,
            expected;
        m.utc();
        // utc
        expect(m.date(), 'the day should be correct for utc').toBe(2);
        expect(m.day(), 'the date should be correct for utc').toBe(3);
        expect(m.hours(), 'the hours should be correct for utc').toBe(3);

        // local
        m.local();
        if (m.utcOffset() < -180) {
            expect(m.date(), 'the date should be correct for local').toBe(1);
            expect(m.day(), 'the day should be correct for local').toBe(2);
        } else {
            expect(m.date(), 'the date should be correct for local').toBe(2);
            expect(m.day(), 'the day should be correct for local').toBe(3);
        }
        offset = Math.floor(m.utcOffset() / 60);
        expected = (24 + 3 + offset) % 24;
        expect(
            m.hours(),
            'the hours (' + m.hours() + ') should be correct for local'
        ).toBe(expected);
        expect(
            moment().utc().utcOffset(),
            'timezone in utc should always be zero'
        ).toBe(0);
    });

    test('creating with utc and no arguments', () => {
        var startOfTest = new Date().valueOf(),
            momentDefaultUtcTime = moment.utc().valueOf(),
            afterMomentCreationTime = new Date().valueOf();

        expect(
            startOfTest <= momentDefaultUtcTime,
            'moment UTC default time should be now, not in the past'
        ).toBeTruthy();
        expect(
            momentDefaultUtcTime <= afterMomentCreationTime,
            'moment UTC default time should be now, not in the future'
        ).toBeTruthy();
    });

    test('creating with utc and a date parameter array', () => {
        var m = moment.utc([2011, 1, 2, 3, 4, 5, 6]);
        expect(m.date(), 'the day should be correct for utc array').toBe(2);
        expect(m.hours(), 'the hours should be correct for utc array').toBe(3);

        m = moment.utc('2011-02-02 3:04:05', 'YYYY-MM-DD HH:mm:ss');
        expect(
            m.date(),
            'the day should be correct for utc parsing format'
        ).toBe(2);
        expect(
            m.hours(),
            'the hours should be correct for utc parsing format'
        ).toBe(3);

        m = moment.utc('2011-02-02T03:04:05+00:00');
        expect(m.date(), 'the day should be correct for utc parsing iso').toBe(
            2
        );
        expect(
            m.hours(),
            'the hours should be correct for utc parsing iso'
        ).toBe(3);
    });

    test('creating with utc without timezone', () => {
        var m = moment.utc('2012-01-02T08:20:00');
        expect(
            m.date(),
            'the day should be correct for utc parse without timezone'
        ).toBe(2);
        expect(
            m.hours(),
            'the hours should be correct for utc parse without timezone'
        ).toBe(8);

        m = moment.utc('2012-01-02T08:20:00+09:00');
        expect(
            m.date(),
            'the day should be correct for utc parse with timezone'
        ).toBe(1);
        expect(
            m.hours(),
            'the hours should be correct for utc parse with timezone'
        ).toBe(23);
    });

    test('cloning with utc offset', () => {
        var m = moment.utc('2012-01-02T08:20:00');
        expect(
            moment.utc(m)._isUTC,
            'the local offset should be converted to UTC'
        ).toBe(true);
        expect(
            moment.utc(m.clone().utc())._isUTC,
            'the local offset should stay in UTC'
        ).toBe(true);

        m.utcOffset(120);
        expect(
            moment.utc(m)._isUTC,
            'the explicit utc offset should stay in UTC'
        ).toBe(true);
        expect(
            moment.utc(m).utcOffset(),
            'the explicit utc offset should have an offset of 0'
        ).toBe(0);
    });

    test('weekday with utc', () => {
        expect(
            moment('2013-09-15T00:00:00Z').utc().weekday(),
            "a UTC-moment's .weekday() should not be affected by the local timezone"
        ).toBe(moment('2013-09-15T23:59:00Z').utc().weekday());
    });
});
