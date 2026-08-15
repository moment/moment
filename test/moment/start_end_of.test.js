import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('start and end of units', () => {
    test('start of year', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('year'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('years'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('y');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'strip out the month').toBe(0);
        expect(m.date(), 'strip out the day').toBe(1);
        expect(m.hours(), 'strip out the hours').toBe(0);
        expect(m.minutes(), 'strip out the minutes').toBe(0);
        expect(m.seconds(), 'strip out the seconds').toBe(0);
        expect(m.milliseconds(), 'strip out the milliseconds').toBe(0);
    });

    test('end of year', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('year'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('years'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('y');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'set the month').toBe(11);
        expect(m.date(), 'set the day').toBe(31);
        expect(m.hours(), 'set the hours').toBe(23);
        expect(m.minutes(), 'set the minutes').toBe(59);
        expect(m.seconds(), 'set the seconds').toBe(59);
        expect(m.milliseconds(), 'set the seconds').toBe(999);
    });

    test('start of quarter', () => {
        var m = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).startOf('quarter'),
            ms = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).startOf('quarters'),
            ma = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).startOf('Q');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.quarter(), 'keep the quarter').toBe(2);
        expect(m.month(), 'strip out the month').toBe(3);
        expect(m.date(), 'strip out the day').toBe(1);
        expect(m.hours(), 'strip out the hours').toBe(0);
        expect(m.minutes(), 'strip out the minutes').toBe(0);
        expect(m.seconds(), 'strip out the seconds').toBe(0);
        expect(m.milliseconds(), 'strip out the milliseconds').toBe(0);
    });

    test('end of quarter', () => {
        var m = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).endOf('quarter'),
            ms = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).endOf('quarters'),
            ma = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).endOf('Q');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.quarter(), 'keep the quarter').toBe(2);
        expect(m.month(), 'set the month').toBe(5);
        expect(m.date(), 'set the day').toBe(30);
        expect(m.hours(), 'set the hours').toBe(23);
        expect(m.minutes(), 'set the minutes').toBe(59);
        expect(m.seconds(), 'set the seconds').toBe(59);
        expect(m.milliseconds(), 'set the seconds').toBe(999);
    });

    test('start of month', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('month'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('months'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('M');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.date(), 'strip out the day').toBe(1);
        expect(m.hours(), 'strip out the hours').toBe(0);
        expect(m.minutes(), 'strip out the minutes').toBe(0);
        expect(m.seconds(), 'strip out the seconds').toBe(0);
        expect(m.milliseconds(), 'strip out the milliseconds').toBe(0);
    });

    test('end of month', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('month'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('months'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('M');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.date(), 'set the day').toBe(28);
        expect(m.hours(), 'set the hours').toBe(23);
        expect(m.minutes(), 'set the minutes').toBe(59);
        expect(m.seconds(), 'set the seconds').toBe(59);
        expect(m.milliseconds(), 'set the seconds').toBe(999);
    });

    test('start of week', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('week'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('weeks'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('w');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'rolls back to January').toBe(0);
        expect(m.day(), 'set day of week').toBe(0);
        expect(m.date(), 'set correct date').toBe(30);
        expect(m.hours(), 'strip out the hours').toBe(0);
        expect(m.minutes(), 'strip out the minutes').toBe(0);
        expect(m.seconds(), 'strip out the seconds').toBe(0);
        expect(m.milliseconds(), 'strip out the milliseconds').toBe(0);
    });

    test('end of week', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('week'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('weeks'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('weeks');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.day(), 'set the day of the week').toBe(6);
        expect(m.date(), 'set the day').toBe(5);
        expect(m.hours(), 'set the hours').toBe(23);
        expect(m.minutes(), 'set the minutes').toBe(59);
        expect(m.seconds(), 'set the seconds').toBe(59);
        expect(m.milliseconds(), 'set the seconds').toBe(999);
    });

    test('start of iso-week', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('isoWeek'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('isoWeeks'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('W');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'rollback to January').toBe(0);
        expect(m.isoWeekday(), 'set day of iso-week').toBe(1);
        expect(m.date(), 'set correct date').toBe(31);
        expect(m.hours(), 'strip out the hours').toBe(0);
        expect(m.minutes(), 'strip out the minutes').toBe(0);
        expect(m.seconds(), 'strip out the seconds').toBe(0);
        expect(m.milliseconds(), 'strip out the milliseconds').toBe(0);
    });

    test('end of iso-week', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('isoWeek'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('isoWeeks'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('W');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.isoWeekday(), 'set the day of the week').toBe(7);
        expect(m.date(), 'set the day').toBe(6);
        expect(m.hours(), 'set the hours').toBe(23);
        expect(m.minutes(), 'set the minutes').toBe(59);
        expect(m.seconds(), 'set the seconds').toBe(59);
        expect(m.milliseconds(), 'set the seconds').toBe(999);
    });

    test('start of day', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('day'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('days'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('d');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.date(), 'keep the day').toBe(2);
        expect(m.hours(), 'strip out the hours').toBe(0);
        expect(m.minutes(), 'strip out the minutes').toBe(0);
        expect(m.seconds(), 'strip out the seconds').toBe(0);
        expect(m.milliseconds(), 'strip out the milliseconds').toBe(0);
    });

    test('end of day', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('day'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('days'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('d');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.date(), 'keep the day').toBe(2);
        expect(m.hours(), 'set the hours').toBe(23);
        expect(m.minutes(), 'set the minutes').toBe(59);
        expect(m.seconds(), 'set the seconds').toBe(59);
        expect(m.milliseconds(), 'set the seconds').toBe(999);
    });

    test('start of date', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('date'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('dates');

        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.date(), 'keep the day').toBe(2);
        expect(m.hours(), 'strip out the hours').toBe(0);
        expect(m.minutes(), 'strip out the minutes').toBe(0);
        expect(m.seconds(), 'strip out the seconds').toBe(0);
        expect(m.milliseconds(), 'strip out the milliseconds').toBe(0);
    });

    test('end of date', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('date'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('dates');

        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.date(), 'keep the day').toBe(2);
        expect(m.hours(), 'set the hours').toBe(23);
        expect(m.minutes(), 'set the minutes').toBe(59);
        expect(m.seconds(), 'set the seconds').toBe(59);
        expect(m.milliseconds(), 'set the seconds').toBe(999);
    });

    test('start of hour', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hour'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hours'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('h');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.date(), 'keep the day').toBe(2);
        expect(m.hours(), 'keep the hours').toBe(3);
        expect(m.minutes(), 'strip out the minutes').toBe(0);
        expect(m.seconds(), 'strip out the seconds').toBe(0);
        expect(m.milliseconds(), 'strip out the milliseconds').toBe(0);
    });

    test('end of hour', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hour'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hours'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('h');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.date(), 'keep the day').toBe(2);
        expect(m.hours(), 'keep the hours').toBe(3);
        expect(m.minutes(), 'set the minutes').toBe(59);
        expect(m.seconds(), 'set the seconds').toBe(59);
        expect(m.milliseconds(), 'set the seconds').toBe(999);
    });

    test('start of minute', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minute'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minutes'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('m');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.date(), 'keep the day').toBe(2);
        expect(m.hours(), 'keep the hours').toBe(3);
        expect(m.minutes(), 'keep the minutes').toBe(4);
        expect(m.seconds(), 'strip out the seconds').toBe(0);
        expect(m.milliseconds(), 'strip out the milliseconds').toBe(0);
    });

    test('end of minute', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minute'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minutes'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('m');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.date(), 'keep the day').toBe(2);
        expect(m.hours(), 'keep the hours').toBe(3);
        expect(m.minutes(), 'keep the minutes').toBe(4);
        expect(m.seconds(), 'set the seconds').toBe(59);
        expect(m.milliseconds(), 'set the seconds').toBe(999);
    });

    test('start of second', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('second'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('seconds'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('s');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.date(), 'keep the day').toBe(2);
        expect(m.hours(), 'keep the hours').toBe(3);
        expect(m.minutes(), 'keep the minutes').toBe(4);
        expect(m.seconds(), 'keep the seconds').toBe(5);
        expect(m.milliseconds(), 'strip out the milliseconds').toBe(0);
    });

    test('end of second', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('second'),
            ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('seconds'),
            ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('s');
        expect(+m, 'Plural or singular should work').toBe(+ms);
        expect(+m, 'Full or abbreviated should work').toBe(+ma);
        expect(m.year(), 'keep the year').toBe(2011);
        expect(m.month(), 'keep the month').toBe(1);
        expect(m.date(), 'keep the day').toBe(2);
        expect(m.hours(), 'keep the hours').toBe(3);
        expect(m.minutes(), 'keep the minutes').toBe(4);
        expect(m.seconds(), 'keep the seconds').toBe(5);
        expect(m.milliseconds(), 'set the seconds').toBe(999);
    });

    test('startOf across DST +1', () => {
        var oldUpdateOffset = moment.updateOffset,
            // Based on a real story somewhere in America/Los_Angeles
            dstAt = moment('2014-03-09T02:00:00-08:00').parseZone(),
            m;

        moment.updateOffset = function (mom, keepTime) {
            if (mom.isBefore(dstAt)) {
                mom.utcOffset(-8, keepTime);
            } else {
                mom.utcOffset(-7, keepTime);
            }
        };

        m = moment('2014-03-15T00:00:00-07:00').parseZone();
        m.startOf('y');
        expect(m.format(), "startOf('year') across +1").toBe(
            '2014-01-01T00:00:00-08:00'
        );

        m = moment('2014-03-15T00:00:00-07:00').parseZone();
        m.startOf('M');
        expect(m.format(), "startOf('month') across +1").toBe(
            '2014-03-01T00:00:00-08:00'
        );

        m = moment('2014-03-09T09:00:00-07:00').parseZone();
        m.startOf('d');
        expect(m.format(), "startOf('day') across +1").toBe(
            '2014-03-09T00:00:00-08:00'
        );

        m = moment('2014-03-09T03:05:00-07:00').parseZone();
        m.startOf('h');
        expect(m.format(), "startOf('hour') after +1").toBe(
            '2014-03-09T03:00:00-07:00'
        );

        m = moment('2014-03-09T01:35:00-08:00').parseZone();
        m.startOf('h');
        expect(m.format(), "startOf('hour') before +1").toBe(
            '2014-03-09T01:00:00-08:00'
        );

        // There is no such time as 2:30-7 to try startOf('hour') across that

        moment.updateOffset = oldUpdateOffset;
    });

    test('startOf across DST -1', () => {
        var oldUpdateOffset = moment.updateOffset,
            // Based on a real story somewhere in America/Los_Angeles
            dstAt = moment('2014-11-02T02:00:00-07:00').parseZone(),
            m;

        moment.updateOffset = function (mom, keepTime) {
            if (mom.isBefore(dstAt)) {
                mom.utcOffset(-7, keepTime);
            } else {
                mom.utcOffset(-8, keepTime);
            }
        };

        m = moment('2014-11-15T00:00:00-08:00').parseZone();
        m.startOf('y');
        expect(m.format(), "startOf('year') across -1").toBe(
            '2014-01-01T00:00:00-07:00'
        );

        m = moment('2014-11-15T00:00:00-08:00').parseZone();
        m.startOf('M');
        expect(m.format(), "startOf('month') across -1").toBe(
            '2014-11-01T00:00:00-07:00'
        );

        m = moment('2014-11-02T09:00:00-08:00').parseZone();
        m.startOf('d');
        expect(m.format(), "startOf('day') across -1").toBe(
            '2014-11-02T00:00:00-07:00'
        );

        // note that utc offset is -8
        m = moment('2014-11-02T01:30:00-08:00').parseZone();
        m.startOf('h');
        expect(m.format(), "startOf('hour') after +1").toBe(
            '2014-11-02T01:00:00-08:00'
        );

        // note that utc offset is -7
        m = moment('2014-11-02T01:30:00-07:00').parseZone();
        m.startOf('h');
        expect(m.format(), "startOf('hour') before +1").toBe(
            '2014-11-02T01:00:00-07:00'
        );

        moment.updateOffset = oldUpdateOffset;
    });

    test('endOf millisecond and no-arg', () => {
        var m = moment();
        expect(+m, 'endOf without argument should change time').toBe(
            +m.clone().endOf()
        );
        expect(+m, 'endOf with ms argument should change time').toBe(
            +m.clone().endOf('ms')
        );
        expect(+m, 'endOf with millisecond argument should change time').toBe(
            +m.clone().endOf('millisecond')
        );
        expect(+m, 'endOf with milliseconds argument should change time').toBe(
            +m.clone().endOf('milliseconds')
        );
    });

    test('startOf for year zero', () => {
        var m = moment('0000-02-29T12:34:56.789Z').parseZone();
        expect(
            m.clone().startOf('ms').toISOString(),
            'startOf millisecond should preserve year'
        ).toBe('0000-02-29T12:34:56.789Z');
        expect(
            m.clone().startOf('s').toISOString(),
            'startOf second should preserve year'
        ).toBe('0000-02-29T12:34:56.000Z');
        expect(
            m.clone().startOf('m').toISOString(),
            'startOf minute should preserve year'
        ).toBe('0000-02-29T12:34:00.000Z');
        expect(
            m.clone().startOf('h').toISOString(),
            'startOf hour should preserve year'
        ).toBe('0000-02-29T12:00:00.000Z');
        expect(
            m.clone().startOf('d').toISOString(),
            'startOf day should preserve year'
        ).toBe('0000-02-29T00:00:00.000Z');
        expect(
            m.clone().startOf('M').toISOString(),
            'startOf month should preserve year'
        ).toBe('0000-02-01T00:00:00.000Z');
        expect(
            m.clone().startOf('Q').toISOString(),
            'startOf quarter should preserve year'
        ).toBe('0000-01-01T00:00:00.000Z');
        expect(
            m.clone().startOf('y').toISOString(),
            'startOf year should preserve year'
        ).toBe('0000-01-01T00:00:00.000Z');
    });

    test('endOf for year zero', () => {
        var m = moment('0000-02-29T12:34:56.789Z').parseZone();
        expect(
            m.clone().endOf('ms').toISOString(),
            'endOf millisecond should preserve year'
        ).toBe('0000-02-29T12:34:56.789Z');
        expect(
            m.clone().endOf('s').toISOString(),
            'endOf second should preserve year'
        ).toBe('0000-02-29T12:34:56.999Z');
        expect(
            m.clone().endOf('m').toISOString(),
            'endOf minute should preserve year'
        ).toBe('0000-02-29T12:34:59.999Z');
        expect(
            m.clone().endOf('h').toISOString(),
            'endOf hour should preserve year'
        ).toBe('0000-02-29T12:59:59.999Z');
        expect(
            m.clone().endOf('d').toISOString(),
            'endOf day should preserve year'
        ).toBe('0000-02-29T23:59:59.999Z');
        expect(
            m.clone().endOf('M').toISOString(),
            'endOf month should preserve year'
        ).toBe('0000-02-29T23:59:59.999Z');
        expect(
            m.clone().endOf('Q').toISOString(),
            'endOf quarter should preserve year'
        ).toBe('0000-03-31T23:59:59.999Z');
        expect(
            m.clone().endOf('y').toISOString(),
            'endOf year should preserve year'
        ).toBe('0000-12-31T23:59:59.999Z');
    });
});
