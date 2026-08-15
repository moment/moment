import { describe, expect, test } from 'vitest';
import { expectDeprecations } from '../helpers/deprecation-handler';
import moment from '../../src/moment';

describe('invalid', () => {
    test('invalid', () => {
        var m = moment.invalid();
        expect(m.isValid()).toBe(false);
        expect(m.parsingFlags().userInvalidated).toBe(true);
        expect(isNaN(m.valueOf())).toBeTruthy();
    });

    test('invalid with existing flag', () => {
        var m = moment.invalid({ invalidMonth: 'whatchamacallit' });
        expect(m.isValid()).toBe(false);
        expect(m.parsingFlags().userInvalidated).toBe(false);
        expect(m.parsingFlags().invalidMonth).toBe('whatchamacallit');
        expect(isNaN(m.valueOf())).toBeTruthy();
    });

    test('invalid with custom flag', () => {
        var m = moment.invalid({ tooBusyWith: 'reiculating splines' });
        expect(m.isValid()).toBe(false);
        expect(m.parsingFlags().userInvalidated).toBe(false);
        expect(m.parsingFlags().tooBusyWith).toBe('reiculating splines');
        expect(isNaN(m.valueOf())).toBeTruthy();
    });

    test('invalid operations', () => {
        var invalids = [
                moment.invalid(),
                moment('xyz', 'l'),
                moment('2015-01-35', 'YYYY-MM-DD'),
                moment('2015-01-25 a', 'YYYY-MM-DD', true),
            ],
            i,
            invalid,
            valid = moment();

        expectDeprecations('moment().min', 'moment().max', 'isDSTShifted');

        for (i = 0; i < invalids.length; ++i) {
            invalid = invalids[i];

            expect(
                !invalid.clone().add(5, 'hours').isValid(),
                'invalid.add is invalid'
            ).toBeTruthy();
            expect(
                invalid.calendar(),
                "invalid.calendar is 'Invalid date'"
            ).toBe('Invalid date');
            expect(
                !invalid.clone().isValid(),
                'invalid.clone is invalid'
            ).toBeTruthy();
            expect(
                isNaN(invalid.diff(valid)),
                'invalid.diff(valid) is NaN'
            ).toBeTruthy();
            expect(
                isNaN(valid.diff(invalid)),
                'valid.diff(invalid) is NaN'
            ).toBeTruthy();
            expect(
                isNaN(invalid.diff(invalid)),
                'invalid.diff(invalid) is NaN'
            ).toBeTruthy();
            expect(
                !invalid.clone().endOf('month').isValid(),
                'invalid.endOf is invalid'
            ).toBeTruthy();
            expect(invalid.format(), "invalid.format is 'Invalid date'").toBe(
                'Invalid date'
            );
            expect(invalid.from()).toBe('Invalid date');
            expect(invalid.from(valid)).toBe('Invalid date');
            expect(valid.from(invalid)).toBe('Invalid date');
            expect(invalid.fromNow()).toBe('Invalid date');
            expect(invalid.to()).toBe('Invalid date');
            expect(invalid.to(valid)).toBe('Invalid date');
            expect(valid.to(invalid)).toBe('Invalid date');
            expect(invalid.toNow()).toBe('Invalid date');
            expect(
                isNaN(invalid.get('year')),
                'invalid.get is NaN'
            ).toBeTruthy();
            // TODO invalidAt
            expect(!invalid.isAfter(valid)).toBeTruthy();
            expect(!valid.isAfter(invalid)).toBeTruthy();
            expect(!invalid.isAfter(invalid)).toBeTruthy();
            expect(!invalid.isBefore(valid)).toBeTruthy();
            expect(!valid.isBefore(invalid)).toBeTruthy();
            expect(!invalid.isBefore(invalid)).toBeTruthy();
            expect(!invalid.isBetween(valid, valid)).toBeTruthy();
            expect(!valid.isBetween(invalid, valid)).toBeTruthy();
            expect(!valid.isBetween(valid, invalid)).toBeTruthy();
            expect(!invalid.isSame(invalid)).toBeTruthy();
            expect(!invalid.isSame(valid)).toBeTruthy();
            expect(!valid.isSame(invalid)).toBeTruthy();
            expect(!invalid.isValid()).toBeTruthy();
            expect(invalid.locale()).toBe('en');
            expect(invalid.localeData()._abbr).toBe('en');
            expect(!invalid.clone().max(valid).isValid()).toBeTruthy();
            expect(!valid.clone().max(invalid).isValid()).toBeTruthy();
            expect(!invalid.clone().max(invalid).isValid()).toBeTruthy();
            expect(!invalid.clone().min(valid).isValid()).toBeTruthy();
            expect(!valid.clone().min(invalid).isValid()).toBeTruthy();
            expect(!invalid.clone().min(invalid).isValid()).toBeTruthy();
            expect(!moment.min(invalid, valid).isValid()).toBeTruthy();
            expect(!moment.min(valid, invalid).isValid()).toBeTruthy();
            expect(!moment.max(invalid, valid).isValid()).toBeTruthy();
            expect(!moment.max(valid, invalid).isValid()).toBeTruthy();
            expect(!invalid.clone().set('year', 2005).isValid()).toBeTruthy();
            expect(!invalid.clone().startOf('month').isValid()).toBeTruthy();

            expect(!invalid.clone().subtract(5, 'days').isValid()).toBeTruthy();
            expect(invalid.toArray()).toEqual([
                NaN,
                NaN,
                NaN,
                NaN,
                NaN,
                NaN,
                NaN,
            ]);
            expect(invalid.toObject()).toEqual({
                years: NaN,
                months: NaN,
                date: NaN,
                hours: NaN,
                minutes: NaN,
                seconds: NaN,
                milliseconds: NaN,
            });
            expect(moment.isDate(invalid.toDate())).toBeTruthy();
            expect(isNaN(invalid.toDate().valueOf())).toBeTruthy();
            expect(invalid.toJSON()).toBe(null);
            expect(invalid.toString()).toBe('Invalid date');
            expect(isNaN(invalid.unix())).toBeTruthy();
            expect(isNaN(invalid.valueOf())).toBeTruthy();

            expect(isNaN(invalid.year())).toBeTruthy();
            expect(isNaN(invalid.weekYear())).toBeTruthy();
            expect(isNaN(invalid.isoWeekYear())).toBeTruthy();
            expect(isNaN(invalid.quarter())).toBeTruthy();
            expect(isNaN(invalid.quarters())).toBeTruthy();
            expect(isNaN(invalid.month())).toBeTruthy();
            expect(isNaN(invalid.daysInMonth())).toBeTruthy();
            expect(isNaN(invalid.week())).toBeTruthy();
            expect(isNaN(invalid.weeks())).toBeTruthy();
            expect(isNaN(invalid.isoWeek())).toBeTruthy();
            expect(isNaN(invalid.isoWeeks())).toBeTruthy();
            expect(isNaN(invalid.weeksInYear())).toBeTruthy();
            expect(isNaN(invalid.isoWeeksInYear())).toBeTruthy();
            expect(isNaN(invalid.date())).toBeTruthy();
            expect(isNaN(invalid.day())).toBeTruthy();
            expect(isNaN(invalid.days())).toBeTruthy();
            expect(isNaN(invalid.weekday())).toBeTruthy();
            expect(isNaN(invalid.isoWeekday())).toBeTruthy();
            expect(isNaN(invalid.dayOfYear())).toBeTruthy();
            expect(isNaN(invalid.hour())).toBeTruthy();
            expect(isNaN(invalid.hours())).toBeTruthy();
            expect(isNaN(invalid.minute())).toBeTruthy();
            expect(isNaN(invalid.minutes())).toBeTruthy();
            expect(isNaN(invalid.second())).toBeTruthy();
            expect(isNaN(invalid.seconds())).toBeTruthy();
            expect(isNaN(invalid.millisecond())).toBeTruthy();
            expect(isNaN(invalid.milliseconds())).toBeTruthy();
            expect(isNaN(invalid.utcOffset())).toBeTruthy();

            expect(!invalid.clone().year(2001).isValid()).toBeTruthy();
            expect(!invalid.clone().weekYear(2001).isValid()).toBeTruthy();
            expect(!invalid.clone().isoWeekYear(2001).isValid()).toBeTruthy();
            expect(!invalid.clone().quarter(1).isValid()).toBeTruthy();
            expect(!invalid.clone().quarters(1).isValid()).toBeTruthy();
            expect(!invalid.clone().month(1).isValid()).toBeTruthy();
            expect(!invalid.clone().week(1).isValid()).toBeTruthy();
            expect(!invalid.clone().weeks(1).isValid()).toBeTruthy();
            expect(!invalid.clone().isoWeek(1).isValid()).toBeTruthy();
            expect(!invalid.clone().isoWeeks(1).isValid()).toBeTruthy();
            expect(!invalid.clone().date(1).isValid()).toBeTruthy();
            expect(!invalid.clone().day(1).isValid()).toBeTruthy();
            expect(!invalid.clone().days(1).isValid()).toBeTruthy();
            expect(!invalid.clone().weekday(1).isValid()).toBeTruthy();
            expect(!invalid.clone().isoWeekday(1).isValid()).toBeTruthy();
            expect(!invalid.clone().dayOfYear(1).isValid()).toBeTruthy();
            expect(!invalid.clone().hour(1).isValid()).toBeTruthy();
            expect(!invalid.clone().hours(1).isValid()).toBeTruthy();
            expect(!invalid.clone().minute(1).isValid()).toBeTruthy();
            expect(!invalid.clone().minutes(1).isValid()).toBeTruthy();
            expect(!invalid.clone().second(1).isValid()).toBeTruthy();
            expect(!invalid.clone().seconds(1).isValid()).toBeTruthy();
            expect(!invalid.clone().millisecond(1).isValid()).toBeTruthy();
            expect(!invalid.clone().milliseconds(1).isValid()).toBeTruthy();
            expect(!invalid.clone().utcOffset(1).isValid()).toBeTruthy();

            expect(!invalid.clone().utc().isValid()).toBeTruthy();
            expect(!invalid.clone().local().isValid()).toBeTruthy();
            expect(!invalid.clone().parseZone('05:30').isValid()).toBeTruthy();
            expect(!invalid.hasAlignedHourOffset()).toBeTruthy();
            expect(!invalid.isDST()).toBeTruthy();
            expect(!invalid.isDSTShifted()).toBeTruthy();
            expect(!invalid.isLocal()).toBeTruthy();
            expect(!invalid.isUtcOffset()).toBeTruthy();
            expect(!invalid.isUtc()).toBeTruthy();
            expect(!invalid.isUTC()).toBeTruthy();

            expect(!invalid.isLeapYear()).toBeTruthy();

            expect(
                moment.duration({ from: invalid, to: valid }).asMilliseconds()
            ).toBe(0);
            expect(
                moment.duration({ from: valid, to: invalid }).asMilliseconds()
            ).toBe(0);
            expect(
                moment.duration({ from: invalid, to: invalid }).asMilliseconds()
            ).toBe(0);
        }
    });
});
