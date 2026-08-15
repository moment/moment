import { describe, expect, test } from 'vitest';
import { expectDeprecations } from '../helpers/deprecation-handler';
import moment from '../../src/moment';

describe('getters and setters', () => {
    test('getters', () => {
        var a = moment([2011, 9, 12, 6, 7, 8, 9]);
        expect(a.year(), 'year').toBe(2011);
        expect(a.month(), 'month').toBe(9);
        expect(a.date(), 'date').toBe(12);
        expect(a.day(), 'day').toBe(3);
        expect(a.hours(), 'hour').toBe(6);
        expect(a.minutes(), 'minute').toBe(7);
        expect(a.seconds(), 'second').toBe(8);
        expect(a.milliseconds(), 'milliseconds').toBe(9);
    });

    test('getters programmatic', () => {
        var a = moment([2011, 9, 12, 6, 7, 8, 9]);
        expect(a.get('year'), 'year').toBe(2011);
        expect(a.get('month'), 'month').toBe(9);
        expect(a.get('date'), 'date').toBe(12);
        expect(a.get('day'), 'day').toBe(3);
        expect(a.get('hour'), 'hour').toBe(6);
        expect(a.get('minute'), 'minute').toBe(7);
        expect(a.get('second'), 'second').toBe(8);
        expect(a.get('milliseconds'), 'milliseconds').toBe(9);

        //actual getters tested elsewhere
        expect(a.get('weekday'), 'weekday').toBe(a.weekday());
        expect(a.get('isoWeekday'), 'isoWeekday').toBe(a.isoWeekday());
        expect(a.get('week'), 'week').toBe(a.week());
        expect(a.get('isoWeek'), 'isoWeek').toBe(a.isoWeek());
        expect(a.get('dayOfYear'), 'dayOfYear').toBe(a.dayOfYear());

        //getter no longer sets values when passed an object
        expect(
            moment([2016, 0, 1]).get({ year: 2015 }).year(),
            'getter no longer sets values when passed an object'
        ).toBe(2016);
    });

    test('setters plural', () => {
        var a = moment();
        expectDeprecations(
            'years accessor',
            'months accessor',
            'dates accessor'
        );

        a.years(2011);
        a.months(9);
        a.dates(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(9);
        expect(a.years(), 'years').toBe(2011);
        expect(a.months(), 'months').toBe(9);
        expect(a.dates(), 'dates').toBe(12);
        expect(a.days(), 'days').toBe(3);
        expect(a.hours(), 'hours').toBe(6);
        expect(a.minutes(), 'minutes').toBe(7);
        expect(a.seconds(), 'seconds').toBe(8);
        expect(a.milliseconds(), 'milliseconds').toBe(9);
    });

    test('setters singular', () => {
        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hour(6);
        a.minute(7);
        a.second(8);
        a.millisecond(9);
        expect(a.year(), 'year').toBe(2011);
        expect(a.month(), 'month').toBe(9);
        expect(a.date(), 'date').toBe(12);
        expect(a.day(), 'day').toBe(3);
        expect(a.hour(), 'hour').toBe(6);
        expect(a.minute(), 'minute').toBe(7);
        expect(a.second(), 'second').toBe(8);
        expect(a.millisecond(), 'milliseconds').toBe(9);
    });

    test('setters', () => {
        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(9);
        expect(a.year(), 'year').toBe(2011);
        expect(a.month(), 'month').toBe(9);
        expect(a.date(), 'date').toBe(12);
        expect(a.day(), 'day').toBe(3);
        expect(a.hours(), 'hour').toBe(6);
        expect(a.minutes(), 'minute').toBe(7);
        expect(a.seconds(), 'second').toBe(8);
        expect(a.milliseconds(), 'milliseconds').toBe(9);

        // Test month() behavior. See https://github.com/timrwood/moment/pull/822
        a = moment('20130531', 'YYYYMMDD');
        a.month(3);
        expect(a.month(), 'month edge case').toBe(3);
    });

    test('setters should handle garbage input', () => {
        var a = moment();
        a.set('year', 2011);
        a.set('month', 9);
        a.set('date', 12);
        a.set('hours', 6);
        a.set('minutes', 7);
        a.set('seconds', 8);
        a.set('milliseconds', 9);

        a.year(undefined);
        a.month('foo');
        a.date(null);
        a.day({ a: 2, b: 3 });
        a.hours('[1]');
        a.minutes(undefined);
        a.seconds(null);
        a.milliseconds(NaN);

        expect(a.year(), 'year - provided undefined').toBe(2011);
        expect(a.month(), 'month - provided null').toBe(9);
        expect(a.date(), 'date - provided [1]').toBe(12);
        expect(a.day(), 'day - provided Infinity').toBe(3);
        expect(a.hours(), 'hour - provided new Date').toBe(6);
        expect(a.minutes(), 'minute - provided {a:1,b:2}').toBe(7);
        expect(a.seconds(), 'second - provided foo').toBe(8);
        expect(a.milliseconds(), 'milliseconds - provided Infinity').toBe(9);
    });

    test('setter programmatic', () => {
        var a = moment();
        a.set('year', 2011);
        a.set('month', 9);
        a.set('date', 12);
        a.set('hours', 6);
        a.set('minutes', 7);
        a.set('seconds', 8);
        a.set('milliseconds', 9);
        expect(a.year(), 'year').toBe(2011);
        expect(a.month(), 'month').toBe(9);
        expect(a.date(), 'date').toBe(12);
        expect(a.day(), 'day').toBe(3);
        expect(a.hours(), 'hour').toBe(6);
        expect(a.minutes(), 'minute').toBe(7);
        expect(a.seconds(), 'second').toBe(8);
        expect(a.milliseconds(), 'milliseconds').toBe(9);

        // Test month() behavior. See https://github.com/timrwood/moment/pull/822
        a = moment('20130531', 'YYYYMMDD');
        a.month(3);
        expect(a.month(), 'month edge case').toBe(3);
    });

    test('setters programatic with weeks', () => {
        var a = moment();
        a.set('weekYear', 2001);
        a.set('week', 49);
        a.set('day', 4);

        expect(a.weekYear(), 'weekYear').toBe(2001);
        expect(a.week(), 'week').toBe(49);
        expect(a.day(), 'day').toBe(4);

        a.set('weekday', 1);
        expect(a.weekday(), 'weekday').toBe(1);
    });

    test('setters programatic with weeks ISO', () => {
        var a = moment();
        a.set('isoWeekYear', 2001);
        a.set('isoWeek', 49);
        a.set('isoWeekday', 4);

        expect(a.isoWeekYear(), 'isoWeekYear').toBe(2001);
        expect(a.isoWeek(), 'isoWeek').toBe(49);
        expect(a.isoWeekday(), 'isoWeekday').toBe(4);
    });

    test('setters strings', () => {
        var a = moment([2012]).locale('en');
        expect(a.clone().day(0).day('Wednesday').day(), 'day full name').toBe(
            3
        );
        expect(a.clone().day(0).day('Wed').day(), 'day short name').toBe(3);
        expect(a.clone().day(0).day('We').day(), 'day minimal name').toBe(3);
        expect(a.clone().day(0).day('invalid').day(), 'invalid day name').toBe(
            0
        );
        expect(
            a.clone().month(0).month('April').month(),
            'month full name'
        ).toBe(3);
        expect(
            a.clone().month(0).month('Apr').month(),
            'month short name'
        ).toBe(3);
        expect(
            a.clone().month(0).month('invalid').month(),
            'invalid month name'
        ).toBe(0);
    });

    test('setters - falsey values', () => {
        var a = moment();
        // ensure minutes wasn't coincidentally 0 already
        a.minutes(1);
        a.minutes(0);
        expect(a.minutes(), 'falsey value').toBe(0);
    });

    test('chaining setters', () => {
        var a = moment();
        a.year(2011).month(9).date(12).hours(6).minutes(7).seconds(8);
        expect(a.year(), 'year').toBe(2011);
        expect(a.month(), 'month').toBe(9);
        expect(a.date(), 'date').toBe(12);
        expect(a.day(), 'day').toBe(3);
        expect(a.hours(), 'hour').toBe(6);
        expect(a.minutes(), 'minute').toBe(7);
        expect(a.seconds(), 'second').toBe(8);
    });

    test('setter with multiple unit values', () => {
        var a = moment(),
            c;
        a.set({
            year: 2011,
            month: 9,
            date: 12,
            hours: 6,
            minutes: 7,
            seconds: 8,
            milliseconds: 9,
        });
        expect(a.year(), 'year').toBe(2011);
        expect(a.month(), 'month').toBe(9);
        expect(a.date(), 'date').toBe(12);
        expect(a.day(), 'day').toBe(3);
        expect(a.hours(), 'hour').toBe(6);
        expect(a.minutes(), 'minute').toBe(7);
        expect(a.seconds(), 'second').toBe(8);
        expect(a.milliseconds(), 'milliseconds').toBe(9);

        c = moment([2016, 0, 1]);
        expect(
            c.set({ weekYear: 2016 }).weekYear(),
            'week year correctly sets with object syntax'
        ).toBe(2016);
        expect(
            c.set({ quarter: 3 }).quarter(),
            'quarter sets correctly with object syntax'
        ).toBe(3);
    });

    test('day setter', () => {
        var a = moment([2011, 0, 15]);
        expect(moment(a).day(0).date(), 'set from saturday to sunday').toBe(9);
        expect(moment(a).day(6).date(), 'set from saturday to saturday').toBe(
            15
        );
        expect(moment(a).day(3).date(), 'set from saturday to wednesday').toBe(
            12
        );

        a = moment([2011, 0, 9]);
        expect(moment(a).day(0).date(), 'set from sunday to sunday').toBe(9);
        expect(moment(a).day(6).date(), 'set from sunday to saturday').toBe(15);
        expect(moment(a).day(3).date(), 'set from sunday to wednesday').toBe(
            12
        );

        a = moment([2011, 0, 12]);
        expect(moment(a).day(0).date(), 'set from wednesday to sunday').toBe(9);
        expect(moment(a).day(6).date(), 'set from wednesday to saturday').toBe(
            15
        );
        expect(moment(a).day(3).date(), 'set from wednesday to wednesday').toBe(
            12
        );

        expect(
            moment(a).day(-7).date(),
            'set from wednesday to last sunday'
        ).toBe(2);
        expect(
            moment(a).day(-1).date(),
            'set from wednesday to last saturday'
        ).toBe(8);
        expect(
            moment(a).day(-4).date(),
            'set from wednesday to last wednesday'
        ).toBe(5);

        expect(
            moment(a).day(7).date(),
            'set from wednesday to next sunday'
        ).toBe(16);
        expect(
            moment(a).day(13).date(),
            'set from wednesday to next saturday'
        ).toBe(22);
        expect(
            moment(a).day(10).date(),
            'set from wednesday to next wednesday'
        ).toBe(19);

        expect(
            moment(a).day(14).date(),
            'set from wednesday to second next sunday'
        ).toBe(23);
        expect(
            moment(a).day(20).date(),
            'set from wednesday to second next saturday'
        ).toBe(29);
        expect(
            moment(a).day(17).date(),
            'set from wednesday to second next wednesday'
        ).toBe(26);
    });

    test('year setter', () => {
        var a = moment([2015, 3, 15]),
            b,
            c,
            d,
            e;
        expect(
            moment(a).year(2016).format('YYYY-MM-DD'),
            'set from 2015 to 2016'
        ).toBe('2016-04-15');
        expect(
            moment(a).year(2011).format('YYYY-MM-DD'),
            'set from 2015 to 2011'
        ).toBe('2011-04-15');

        b = moment([2012, 1, 29]);
        expect(
            moment(b).year(2017).format('YYYY-MM-DD'),
            'set from last day of february on a leap year to a non leap year'
        ).toBe('2017-02-28');
        expect(
            moment(b).year(2004).format('YYYY-MM-DD'),
            'set from last day of february on a leap year to a leap year'
        ).toBe('2004-02-29');

        c = moment([2012, 9, 4]);
        expect(
            moment(c).year(2017).format('YYYY-MM-DD'),
            'set from a random day on a leap year to a non leap year'
        ).toBe('2017-10-04');
        expect(
            moment(c).year(2004).format('YYYY-MM-DD'),
            'set from a random day on a leap year to a leap year'
        ).toBe('2004-10-04');

        d = moment([2020, 1, 29]);
        expect(
            moment(d).year('2020').format('YYYY-MM-DD'),
            'set from last day of february in 2020 to the same year, provided as string'
        ).toBe('2020-02-29');

        e = moment([2012, 1, 29]);
        expect(
            moment(e).year('2020').format('YYYY-MM-DD'),
            'set from last day of february on a leap year to 2020, provided as string'
        ).toBe('2020-02-29');
    });

    test('object set ordering', () => {
        var a = moment([2016, 3, 30]),
            b,
            c;
        expect(
            a.set({ date: 31, month: 4 }).date(),
            'setter order automatically arranged by size'
        ).toBe(31);
        b = moment([2015, 1, 28]);
        expect(
            b.set({ date: 29, year: 2016 }).format('YYYY-MM-DD'),
            'year is prioritized over date'
        ).toBe('2016-02-29');
        //check a nonexistent time in US isn't set
        c = moment([2016, 2, 13]);
        c.set({
            hour: 2,
            minutes: 30,
            date: 14,
        });
        expect(
            c.format('YYYY-MM-DDTHH:mm'),
            'setting hours, minutes date puts date first allowing time set to work'
        ).toBe('2016-03-14T02:30');
    });

    test('string setters', () => {
        var a = moment();
        a.year('2011');
        a.month('9');
        a.date('12');
        a.hours('6');
        a.minutes('7');
        a.seconds('8');
        a.milliseconds('9');
        expect(a.year(), 'year').toBe(2011);
        expect(a.month(), 'month').toBe(9);
        expect(a.date(), 'date').toBe(12);
        expect(a.day(), 'day').toBe(3);
        expect(a.hours(), 'hour').toBe(6);
        expect(a.minutes(), 'minute').toBe(7);
        expect(a.seconds(), 'second').toBe(8);
        expect(a.milliseconds(), 'milliseconds').toBe(9);
    });

    test('setters across DST +1', () => {
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
        m.year(2013);
        expect(m.format(), 'year across +1').toBe('2013-03-15T00:00:00-08:00');

        m = moment('2014-03-15T00:00:00-07:00').parseZone();
        m.month(0);
        expect(m.format(), 'month across +1').toBe('2014-01-15T00:00:00-08:00');

        m = moment('2014-03-15T00:00:00-07:00').parseZone();
        m.date(1);
        expect(m.format(), 'date across +1').toBe('2014-03-01T00:00:00-08:00');

        m = moment('2014-03-09T03:05:00-07:00').parseZone();
        m.hour(0);
        expect(m.format(), 'hour across +1').toBe('2014-03-09T00:05:00-08:00');

        moment.updateOffset = oldUpdateOffset;
    });

    test('setters across DST -1', () => {
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
        m.year(2013);
        expect(m.format(), 'year across -1').toBe('2013-11-15T00:00:00-07:00');

        m = moment('2014-11-15T00:00:00-08:00').parseZone();
        m.month(0);
        expect(m.format(), 'month across -1').toBe('2014-01-15T00:00:00-07:00');

        m = moment('2014-11-15T00:00:00-08:00').parseZone();
        m.date(1);
        expect(m.format(), 'date across -1').toBe('2014-11-01T00:00:00-07:00');

        m = moment('2014-11-02T03:30:00-08:00').parseZone();
        m.hour(0);
        expect(m.format(), 'hour across -1').toBe('2014-11-02T00:30:00-07:00');

        moment.updateOffset = oldUpdateOffset;
    });
});
