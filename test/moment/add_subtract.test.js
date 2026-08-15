import { describe, expect, test } from 'vitest';
import { expectDeprecations } from '../helpers/deprecation-handler';
import moment from '../../src/moment';

describe('add and subtract', () => {
    test('add short reverse args', () => {
        var a = moment(),
            b,
            c,
            d;
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        expect(a.add({ ms: 50 }).milliseconds(), 'Add milliseconds').toBe(550);
        expect(a.add({ s: 1 }).seconds(), 'Add seconds').toBe(9);
        expect(a.add({ m: 1 }).minutes(), 'Add minutes').toBe(8);
        expect(a.add({ h: 1 }).hours(), 'Add hours').toBe(7);
        expect(a.add({ d: 1 }).date(), 'Add date').toBe(13);
        expect(a.add({ w: 1 }).date(), 'Add week').toBe(20);
        expect(a.add({ M: 1 }).month(), 'Add month').toBe(10);
        expect(a.add({ y: 1 }).year(), 'Add year').toBe(2012);
        expect(a.add({ Q: 1 }).month(), 'Add quarter').toBe(1);

        b = moment([2010, 0, 31]).add({ M: 1 });
        c = moment([2010, 1, 28]).subtract({ M: 1 });
        d = moment([2010, 1, 28]).subtract({ Q: 1 });

        expect(b.month(), 'add month, jan 31st to feb 28th').toBe(1);
        expect(b.date(), 'add month, jan 31st to feb 28th').toBe(28);
        expect(c.month(), 'subtract month, feb 28th to jan 28th').toBe(0);
        expect(c.date(), 'subtract month, feb 28th to jan 28th').toBe(28);
        expect(
            d.month(),
            'subtract quarter, feb 28th 2010 to nov 28th 2009'
        ).toBe(10);
        expect(
            d.date(),
            'subtract quarter, feb 28th 2010 to nov 28th 2009'
        ).toBe(28);
        expect(
            d.year(),
            'subtract quarter, feb 28th 2010 to nov 28th 2009'
        ).toBe(2009);
    });

    test('add long reverse args', () => {
        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        expect(
            a.add({ milliseconds: 50 }).milliseconds(),
            'Add milliseconds'
        ).toBe(550);
        expect(a.add({ seconds: 1 }).seconds(), 'Add seconds').toBe(9);
        expect(a.add({ minutes: 1 }).minutes(), 'Add minutes').toBe(8);
        expect(a.add({ hours: 1 }).hours(), 'Add hours').toBe(7);
        expect(a.add({ days: 1 }).date(), 'Add date').toBe(13);
        expect(a.add({ weeks: 1 }).date(), 'Add week').toBe(20);
        expect(a.add({ months: 1 }).month(), 'Add month').toBe(10);
        expect(a.add({ years: 1 }).year(), 'Add year').toBe(2012);
        expect(a.add({ quarters: 1 }).month(), 'Add quarter').toBe(1);
    });

    test('add long singular reverse args', () => {
        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        expect(
            a.add({ millisecond: 50 }).milliseconds(),
            'Add milliseconds'
        ).toBe(550);
        expect(a.add({ second: 1 }).seconds(), 'Add seconds').toBe(9);
        expect(a.add({ minute: 1 }).minutes(), 'Add minutes').toBe(8);
        expect(a.add({ hour: 1 }).hours(), 'Add hours').toBe(7);
        expect(a.add({ day: 1 }).date(), 'Add date').toBe(13);
        expect(a.add({ week: 1 }).date(), 'Add week').toBe(20);
        expect(a.add({ month: 1 }).month(), 'Add month').toBe(10);
        expect(a.add({ year: 1 }).year(), 'Add year').toBe(2012);
        expect(a.add({ quarter: 1 }).month(), 'Add quarter').toBe(1);
    });

    test('add string long reverse args', () => {
        var a = moment(),
            b;

        expectDeprecations('moment().add(period, number)');

        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        b = a.clone();

        expect(
            a.add('millisecond', 50).milliseconds(),
            'Add milliseconds'
        ).toBe(550);
        expect(a.add('second', 1).seconds(), 'Add seconds').toBe(9);
        expect(a.add('minute', 1).minutes(), 'Add minutes').toBe(8);
        expect(a.add('hour', 1).hours(), 'Add hours').toBe(7);
        expect(a.add('day', 1).date(), 'Add date').toBe(13);
        expect(a.add('week', 1).date(), 'Add week').toBe(20);
        expect(a.add('month', 1).month(), 'Add month').toBe(10);
        expect(a.add('year', 1).year(), 'Add year').toBe(2012);
        expect(b.add('day', '01').date(), 'Add date').toBe(13);
        expect(a.add('quarter', 1).month(), 'Add quarter').toBe(1);
    });

    test('add string long singular reverse args', () => {
        var a = moment(),
            b;

        expectDeprecations('moment().add(period, number)');

        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        b = a.clone();

        expect(
            a.add('milliseconds', 50).milliseconds(),
            'Add milliseconds'
        ).toBe(550);
        expect(a.add('seconds', 1).seconds(), 'Add seconds').toBe(9);
        expect(a.add('minutes', 1).minutes(), 'Add minutes').toBe(8);
        expect(a.add('hours', 1).hours(), 'Add hours').toBe(7);
        expect(a.add('days', 1).date(), 'Add date').toBe(13);
        expect(a.add('weeks', 1).date(), 'Add week').toBe(20);
        expect(a.add('months', 1).month(), 'Add month').toBe(10);
        expect(a.add('years', 1).year(), 'Add year').toBe(2012);
        expect(b.add('days', '01').date(), 'Add date').toBe(13);
        expect(a.add('quarters', 1).month(), 'Add quarter').toBe(1);
    });

    test('add string short reverse args', () => {
        var a = moment();
        expectDeprecations('moment().add(period, number)');

        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        expect(a.add('ms', 50).milliseconds(), 'Add milliseconds').toBe(550);
        expect(a.add('s', 1).seconds(), 'Add seconds').toBe(9);
        expect(a.add('m', 1).minutes(), 'Add minutes').toBe(8);
        expect(a.add('h', 1).hours(), 'Add hours').toBe(7);
        expect(a.add('d', 1).date(), 'Add date').toBe(13);
        expect(a.add('w', 1).date(), 'Add week').toBe(20);
        expect(a.add('M', 1).month(), 'Add month').toBe(10);
        expect(a.add('y', 1).year(), 'Add year').toBe(2012);
        expect(a.add('Q', 1).month(), 'Add quarter').toBe(1);
    });

    test('add string long', () => {
        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        expect(
            a.add(50, 'millisecond').milliseconds(),
            'Add milliseconds'
        ).toBe(550);
        expect(a.add(1, 'second').seconds(), 'Add seconds').toBe(9);
        expect(a.add(1, 'minute').minutes(), 'Add minutes').toBe(8);
        expect(a.add(1, 'hour').hours(), 'Add hours').toBe(7);
        expect(a.add(1, 'day').date(), 'Add date').toBe(13);
        expect(a.add(1, 'week').date(), 'Add week').toBe(20);
        expect(a.add(1, 'month').month(), 'Add month').toBe(10);
        expect(a.add(1, 'year').year(), 'Add year').toBe(2012);
        expect(a.add(1, 'quarter').month(), 'Add quarter').toBe(1);
    });

    test('add string long singular', () => {
        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        expect(
            a.add(50, 'milliseconds').milliseconds(),
            'Add milliseconds'
        ).toBe(550);
        expect(a.add(1, 'seconds').seconds(), 'Add seconds').toBe(9);
        expect(a.add(1, 'minutes').minutes(), 'Add minutes').toBe(8);
        expect(a.add(1, 'hours').hours(), 'Add hours').toBe(7);
        expect(a.add(1, 'days').date(), 'Add date').toBe(13);
        expect(a.add(1, 'weeks').date(), 'Add week').toBe(20);
        expect(a.add(1, 'months').month(), 'Add month').toBe(10);
        expect(a.add(1, 'years').year(), 'Add year').toBe(2012);
        expect(a.add(1, 'quarters').month(), 'Add quarter').toBe(1);
    });

    test('add string short', () => {
        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        expect(a.add(50, 'ms').milliseconds(), 'Add milliseconds').toBe(550);
        expect(a.add(1, 's').seconds(), 'Add seconds').toBe(9);
        expect(a.add(1, 'm').minutes(), 'Add minutes').toBe(8);
        expect(a.add(1, 'h').hours(), 'Add hours').toBe(7);
        expect(a.add(1, 'd').date(), 'Add date').toBe(13);
        expect(a.add(1, 'w').date(), 'Add week').toBe(20);
        expect(a.add(1, 'M').month(), 'Add month').toBe(10);
        expect(a.add(1, 'y').year(), 'Add year').toBe(2012);
        expect(a.add(1, 'Q').month(), 'Add quarter').toBe(1);
    });

    test('add strings string short reversed', () => {
        var a = moment();
        expectDeprecations('moment().add(period, number)');

        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        expect(a.add('ms', '50').milliseconds(), 'Add milliseconds').toBe(550);
        expect(a.add('s', '1').seconds(), 'Add seconds').toBe(9);
        expect(a.add('m', '1').minutes(), 'Add minutes').toBe(8);
        expect(a.add('h', '1').hours(), 'Add hours').toBe(7);
        expect(a.add('d', '1').date(), 'Add date').toBe(13);
        expect(a.add('w', '1').date(), 'Add week').toBe(20);
        expect(a.add('M', '1').month(), 'Add month').toBe(10);
        expect(a.add('y', '1').year(), 'Add year').toBe(2012);
        expect(a.add('Q', '1').month(), 'Add quarter').toBe(1);
    });

    test('subtract strings string short reversed', () => {
        var a = moment();
        expectDeprecations('moment().subtract(period, number)');

        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        expect(
            a.subtract('ms', '50').milliseconds(),
            'Subtract milliseconds'
        ).toBe(450);
        expect(a.subtract('s', '1').seconds(), 'Subtract seconds').toBe(7);
        expect(a.subtract('m', '1').minutes(), 'Subtract minutes').toBe(6);
        expect(a.subtract('h', '1').hours(), 'Subtract hours').toBe(5);
        expect(a.subtract('d', '1').date(), 'Subtract date').toBe(11);
        expect(a.subtract('w', '1').date(), 'Subtract week').toBe(4);
        expect(a.subtract('M', '1').month(), 'Subtract month').toBe(8);
        expect(a.subtract('y', '1').year(), 'Subtract year').toBe(2010);
        expect(a.subtract('Q', '1').month(), 'Subtract quarter').toBe(5);
    });

    test('add strings string short', () => {
        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        expect(a.add('50', 'ms').milliseconds(), 'Add milliseconds').toBe(550);
        expect(a.add('1', 's').seconds(), 'Add seconds').toBe(9);
        expect(a.add('1', 'm').minutes(), 'Add minutes').toBe(8);
        expect(a.add('1', 'h').hours(), 'Add hours').toBe(7);
        expect(a.add('1', 'd').date(), 'Add date').toBe(13);
        expect(a.add('1', 'w').date(), 'Add week').toBe(20);
        expect(a.add('1', 'M').month(), 'Add month').toBe(10);
        expect(a.add('1', 'y').year(), 'Add year').toBe(2012);
        expect(a.add('1', 'Q').month(), 'Add quarter').toBe(1);
    });

    test('add no string with milliseconds default', () => {
        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        expect(a.add(50).milliseconds(), 'Add milliseconds').toBe(550);
    });

    test('subtract strings string short', () => {
        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        expect(
            a.subtract('50', 'ms').milliseconds(),
            'Subtract milliseconds'
        ).toBe(450);
        expect(a.subtract('1', 's').seconds(), 'Subtract seconds').toBe(7);
        expect(a.subtract('1', 'm').minutes(), 'Subtract minutes').toBe(6);
        expect(a.subtract('1', 'h').hours(), 'Subtract hours').toBe(5);
        expect(a.subtract('1', 'd').date(), 'Subtract date').toBe(11);
        expect(a.subtract('1', 'w').date(), 'Subtract week').toBe(4);
        expect(a.subtract('1', 'M').month(), 'Subtract month').toBe(8);
        expect(a.subtract('1', 'y').year(), 'Subtract year').toBe(2010);
        expect(a.subtract('1', 'Q').month(), 'Subtract quarter').toBe(5);
    });

    test('add across DST', () => {
        // Detect Safari bug and bail. Hours on 13th March 2011 are shifted
        // with 1 ahead.
        if (new Date(2011, 2, 13, 5, 0, 0).getHours() !== 5) {
            return;
        }

        var a = moment(new Date(2011, 2, 12, 5, 0, 0)),
            b = moment(new Date(2011, 2, 12, 5, 0, 0)),
            c = moment(new Date(2011, 2, 12, 5, 0, 0)),
            d = moment(new Date(2011, 2, 12, 5, 0, 0)),
            e = moment(new Date(2011, 2, 12, 5, 0, 0));
        a.add(1, 'days');
        b.add(24, 'hours');
        c.add(1, 'months');
        e.add(1, 'quarter');

        expect(
            a.hours(),
            'adding days over DST difference should result in the same hour'
        ).toBe(5);
        if (b.isDST() && !d.isDST()) {
            expect(
                b.hours(),
                'adding hours over DST difference should result in a different hour'
            ).toBe(6);
        } else if (!b.isDST() && d.isDST()) {
            expect(
                b.hours(),
                'adding hours over DST difference should result in a different hour'
            ).toBe(4);
        } else {
            expect(
                b.hours(),
                'adding hours over DST difference should result in a same hour if the timezone does not have daylight savings time'
            ).toBe(5);
        }
        expect(
            c.hours(),
            'adding months over DST difference should result in the same hour'
        ).toBe(5);
        expect(
            e.hours(),
            'adding quarters over DST difference should result in the same hour'
        ).toBe(5);
    });

    test('add decimal values of days and months', () => {
        expect(
            moment([2016, 3, 3]).add(1.5, 'days').date(),
            'adding 1.5 days is rounded to adding 2 day'
        ).toBe(5);
        expect(
            moment([2016, 3, 3]).add(-1.5, 'days').date(),
            'adding -1.5 days is rounded to adding -2 day'
        ).toBe(1);
        expect(
            moment([2016, 3, 1]).add(-1.5, 'days').date(),
            'adding -1.5 days on first of month wraps around'
        ).toBe(30);
        expect(
            moment([2016, 3, 3]).add(1.5, 'months').month(),
            'adding 1.5 months adds 2 months'
        ).toBe(5);
        expect(
            moment([2016, 3, 3]).add(-1.5, 'months').month(),
            'adding -1.5 months adds -2 months'
        ).toBe(1);
        expect(
            moment([2016, 0, 3]).add(-1.5, 'months').month(),
            'adding -1.5 months at start of year wraps back'
        ).toBe(10);
        expect(
            moment([2016, 3, 3]).subtract(1.5, 'days').date(),
            'subtract 1.5 days is rounded to subtract 2 day'
        ).toBe(1);
        expect(
            moment([2016, 3, 2]).subtract(1.5, 'days').date(),
            'subtract 1.5 days subtracts 2 days'
        ).toBe(31);
        expect(
            moment([2016, 1, 1]).subtract(1.1, 'days').date(),
            'subtract 1.1 days wraps to previous month'
        ).toBe(31);
        expect(
            moment([2016, 3, 3]).subtract(-1.5, 'days').date(),
            'subtract -1.5 days is rounded to subtract -2 day'
        ).toBe(5);
        expect(
            moment([2016, 3, 30]).subtract(-1.5, 'days').date(),
            'subtract -1.5 days on last of month wraps around'
        ).toBe(2);
        expect(
            moment([2016, 3, 3]).subtract(1.5, 'months').month(),
            'subtract 1.5 months subtract 2 months'
        ).toBe(1);
        expect(
            moment([2016, 3, 3]).subtract(-1.5, 'months').month(),
            'subtract -1.5 months subtract -2 month'
        ).toBe(5);
        expect(
            moment([2016, 11, 31]).subtract(-1.5, 'months').month(),
            'subtract -1.5 months at end of year wraps back'
        ).toBe(1);
        expect(
            moment([2016, 0, 1]).add(1.5, 'years').format('YYYY-MM-DD'),
            'add 1.5 years adds 1 year six months'
        ).toBe('2017-07-01');
        expect(
            moment([2016, 0, 1]).add(1.6, 'years').format('YYYY-MM-DD'),
            'add 1.6 years becomes 1.6*12 = 19.2, round, 19 months'
        ).toBe('2017-08-01');
        expect(
            moment([2016, 0, 1]).add(1.1, 'quarters').format('YYYY-MM-DD'),
            'add 1.1 quarters 1.1*3=3.3, round, 3 months'
        ).toBe('2016-04-01');
    });

    test('add/subtract ISO week', () => {
        expect(
            moment([2016, 3, 15]).subtract(1, 'W').date(),
            'subtract 1 iso week short'
        ).toBe(8);
        expect(
            moment([2016, 3, 15]).subtract(1, 'isoweek').date(),
            'subtract 1 iso week long singular'
        ).toBe(8);
        expect(
            moment([2016, 3, 15]).subtract(1, 'isoweeks').date(),
            'subtract 1 iso weeks long'
        ).toBe(8);

        expect(
            moment([2016, 3, 15]).add(1, 'W').date(),
            'add 1 iso week short'
        ).toBe(22);
        expect(
            moment([2016, 3, 15]).add(1, 'isoweek').date(),
            'add 1 week long singular'
        ).toBe(22);
        expect(
            moment([2016, 3, 15]).add(1, 'isoweeks').date(),
            'add 1 weeks long'
        ).toBe(22);
    });
});
