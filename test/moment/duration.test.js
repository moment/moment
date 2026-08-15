import { describe, expect, test } from 'vitest';
import { expectDeprecations } from '../helpers/deprecation-handler';
import moment from '../../src/moment';

describe('duration', () => {
    test('object instantiation', () => {
        var d = moment.duration({
            years: 2,
            months: 3,
            weeks: 2,
            days: 1,
            hours: 8,
            minutes: 9,
            seconds: 20,
            milliseconds: 12,
        });

        expect(d.years(), 'years').toBe(2);
        expect(d.months(), 'months').toBe(3);
        expect(d.weeks(), 'weeks').toBe(2);
        expect(d.days(), 'days').toBe(15); // two weeks + 1 day
        expect(d.hours(), 'hours').toBe(8);
        expect(d.minutes(), 'minutes').toBe(9);
        expect(d.seconds(), 'seconds').toBe(20);
        expect(d.milliseconds(), 'milliseconds').toBe(12);
    });

    test('object instantiation with strings', () => {
        var d = moment.duration({
            years: '2',
            months: '3',
            weeks: '2',
            days: '1',
            hours: '8',
            minutes: '9',
            seconds: '20',
            milliseconds: '12',
        });

        expect(d.years(), 'years').toBe(2);
        expect(d.months(), 'months').toBe(3);
        expect(d.weeks(), 'weeks').toBe(2);
        expect(d.days(), 'days').toBe(15); // two weeks + 1 day
        expect(d.hours(), 'hours').toBe(8);
        expect(d.minutes(), 'minutes').toBe(9);
        expect(d.seconds(), 'seconds').toBe(20);
        expect(d.milliseconds(), 'milliseconds').toBe(12);
    });

    test('milliseconds instantiation', () => {
        expect(moment.duration(72).milliseconds(), 'milliseconds').toBe(72);
        expect(moment.duration(72).humanize(), 'Duration should be valid').toBe(
            'a few seconds'
        );
    });

    test('milliseconds instantiation with string', () => {
        expect(moment.duration('72').milliseconds(), 'milliseconds').toBe(72);
        expect(
            moment.duration('72').humanize(),
            'Duration should be valid'
        ).toBe('a few seconds');
    });

    test('undefined instantiation', () => {
        expect(moment.duration(undefined).milliseconds(), 'milliseconds').toBe(
            0
        );
        expect(moment.duration(undefined).isValid(), '_isValid').toBe(true);
        expect(
            moment.duration(undefined).humanize(),
            'Duration should be valid'
        ).toBe('a few seconds');
    });

    test('null instantiation', () => {
        expect(moment.duration(null).milliseconds(), 'milliseconds').toBe(0);
        expect(moment.duration(null).isValid(), '_isValid').toBe(true);
        expect(
            moment.duration(null).humanize(),
            'Duration should be valid'
        ).toBe('a few seconds');
    });

    test('NaN instantiation', () => {
        expect(
            isNaN(moment.duration(NaN).milliseconds()),
            'milliseconds should be NaN'
        ).toBeTruthy();
        expect(moment.duration(NaN).isValid(), '_isValid').toBe(false);
        expect(
            moment.duration(NaN).humanize(),
            'Duration should be invalid'
        ).toBe('Invalid date');
    });

    test('instantiation by type', () => {
        expect(moment.duration(1, 'years').years(), 'years').toBe(1);
        expect(moment.duration(1, 'y').years(), 'y').toBe(1);
        expect(moment.duration(2, 'months').months(), 'months').toBe(2);
        expect(moment.duration(2, 'M').months(), 'M').toBe(2);
        expect(moment.duration(3, 'weeks').weeks(), 'weeks').toBe(3);
        expect(moment.duration(3, 'w').weeks(), 'weeks').toBe(3);
        expect(moment.duration(4, 'days').days(), 'days').toBe(4);
        expect(moment.duration(4, 'd').days(), 'd').toBe(4);
        expect(moment.duration(5, 'hours').hours(), 'hours').toBe(5);
        expect(moment.duration(5, 'h').hours(), 'h').toBe(5);
        expect(moment.duration(6, 'minutes').minutes(), 'minutes').toBe(6);
        expect(moment.duration(6, 'm').minutes(), 'm').toBe(6);
        expect(moment.duration(7, 'seconds').seconds(), 'seconds').toBe(7);
        expect(moment.duration(7, 's').seconds(), 's').toBe(7);
        expect(
            moment.duration(8, 'milliseconds').milliseconds(),
            'milliseconds'
        ).toBe(8);
        expect(moment.duration(8, 'ms').milliseconds(), 'ms').toBe(8);
    });

    test('instantiation by type with string', () => {
        expect(moment.duration('1', 'years').years(), 'years').toBe(1);
        expect(moment.duration('1', 'y').years(), 'y').toBe(1);
        expect(moment.duration('2', 'months').months(), 'months').toBe(2);
        expect(moment.duration('2', 'M').months(), 'M').toBe(2);
        expect(moment.duration('3', 'weeks').weeks(), 'weeks').toBe(3);
        expect(moment.duration('3', 'w').weeks(), 'weeks').toBe(3);
        expect(moment.duration('4', 'days').days(), 'days').toBe(4);
        expect(moment.duration('4', 'd').days(), 'd').toBe(4);
        expect(moment.duration('5', 'hours').hours(), 'hours').toBe(5);
        expect(moment.duration('5', 'h').hours(), 'h').toBe(5);
        expect(moment.duration('6', 'minutes').minutes(), 'minutes').toBe(6);
        expect(moment.duration('6', 'm').minutes(), 'm').toBe(6);
        expect(moment.duration('7', 'seconds').seconds(), 'seconds').toBe(7);
        expect(moment.duration('7', 's').seconds(), 's').toBe(7);
        expect(
            moment.duration('8', 'milliseconds').milliseconds(),
            'milliseconds'
        ).toBe(8);
        expect(moment.duration('8', 'ms').milliseconds(), 'ms').toBe(8);
    });

    test('shortcuts', () => {
        expect(moment.duration({ y: 1 }).years(), 'years = y').toBe(1);
        expect(moment.duration({ M: 2 }).months(), 'months = M').toBe(2);
        expect(moment.duration({ w: 3 }).weeks(), 'weeks = w').toBe(3);
        expect(moment.duration({ d: 4 }).days(), 'days = d').toBe(4);
        expect(moment.duration({ h: 5 }).hours(), 'hours = h').toBe(5);
        expect(moment.duration({ m: 6 }).minutes(), 'minutes = m').toBe(6);
        expect(moment.duration({ s: 7 }).seconds(), 'seconds = s').toBe(7);
        expect(
            moment.duration({ ms: 8 }).milliseconds(),
            'milliseconds = ms'
        ).toBe(8);
    });

    test('generic getter', () => {
        expect(moment.duration(1, 'years').get('years'), 'years').toBe(1);
        expect(moment.duration(1, 'years').get('year'), 'years = year').toBe(1);
        expect(moment.duration(1, 'years').get('y'), 'years = y').toBe(1);
        expect(moment.duration(2, 'months').get('months'), 'months').toBe(2);
        expect(
            moment.duration(2, 'months').get('month'),
            'months = month'
        ).toBe(2);
        expect(moment.duration(2, 'months').get('M'), 'months = M').toBe(2);
        expect(moment.duration(3, 'weeks').get('weeks'), 'weeks').toBe(3);
        expect(moment.duration(3, 'weeks').get('week'), 'weeks = week').toBe(3);
        expect(moment.duration(3, 'weeks').get('w'), 'weeks = w').toBe(3);
        expect(moment.duration(4, 'days').get('days'), 'days').toBe(4);
        expect(moment.duration(4, 'days').get('day'), 'days = day').toBe(4);
        expect(moment.duration(4, 'days').get('d'), 'days = d').toBe(4);
        expect(moment.duration(5, 'hours').get('hours'), 'hours').toBe(5);
        expect(moment.duration(5, 'hours').get('hour'), 'hours = hour').toBe(5);
        expect(moment.duration(5, 'hours').get('h'), 'hours = h').toBe(5);
        expect(moment.duration(6, 'minutes').get('minutes'), 'minutes').toBe(6);
        expect(
            moment.duration(6, 'minutes').get('minute'),
            'minutes = minute'
        ).toBe(6);
        expect(moment.duration(6, 'minutes').get('m'), 'minutes = m').toBe(6);
        expect(moment.duration(7, 'seconds').get('seconds'), 'seconds').toBe(7);
        expect(
            moment.duration(7, 'seconds').get('second'),
            'seconds = second'
        ).toBe(7);
        expect(moment.duration(7, 'seconds').get('s'), 'seconds = s').toBe(7);
        expect(
            moment.duration(8, 'milliseconds').get('milliseconds'),
            'milliseconds'
        ).toBe(8);
        expect(
            moment.duration(8, 'milliseconds').get('millisecond'),
            'milliseconds = millisecond'
        ).toBe(8);
        expect(
            moment.duration(8, 'milliseconds').get('ms'),
            'milliseconds = ms'
        ).toBe(8);
    });

    test('instantiation from another duration', () => {
        var simple = moment.duration(1234),
            lengthy = moment.duration(60 * 60 * 24 * 360 * 1e3),
            complicated = moment.duration({
                years: 2,
                months: 3,
                weeks: 4,
                days: 1,
                hours: 8,
                minutes: 9,
                seconds: 20,
                milliseconds: 12,
            }),
            modified = moment.duration(1, 'day').add(moment.duration(1, 'day'));

        expect(moment.duration(simple), 'simple clones are equal').toEqual(
            simple
        );
        expect(moment.duration(lengthy), 'lengthy clones are equal').toEqual(
            lengthy
        );
        expect(
            moment.duration(complicated),
            'complicated clones are equal'
        ).toEqual(complicated);
        expect(
            moment.duration(modified),
            'cloning modified duration works'
        ).toEqual(modified);
    });

    test('explicit cloning', () => {
        var durationA = moment.duration(5, 'milliseconds'),
            durationB = durationA.clone();
        durationA.add(5, 'milliseconds');
        expect(
            durationA.milliseconds(),
            'Calling duration.clone() on a duration will create a clone'
        ).not.toBe(durationB.milliseconds());
    });

    test('instantiation from 24-hour time zero', () => {
        expect(moment.duration('00:00').years(), '0 years').toBe(0);
        expect(moment.duration('00:00').days(), '0 days').toBe(0);
        expect(moment.duration('00:00').hours(), '0 hours').toBe(0);
        expect(moment.duration('00:00').minutes(), '0 minutes').toBe(0);
        expect(moment.duration('00:00').seconds(), '0 seconds').toBe(0);
        expect(moment.duration('00:00').milliseconds(), '0 milliseconds').toBe(
            0
        );
    });

    test('instantiation from 24-hour time <24 hours', () => {
        expect(moment.duration('06:45').years(), '0 years').toBe(0);
        expect(moment.duration('06:45').days(), '0 days').toBe(0);
        expect(moment.duration('06:45').hours(), '6 hours').toBe(6);
        expect(moment.duration('06:45').minutes(), '45 minutes').toBe(45);
        expect(moment.duration('06:45').seconds(), '0 seconds').toBe(0);
        expect(moment.duration('06:45').milliseconds(), '0 milliseconds').toBe(
            0
        );
    });

    test('instantiation from 24-hour time >24 hours', () => {
        expect(moment.duration('26:45').years(), '0 years').toBe(0);
        expect(moment.duration('26:45').days(), '0 days').toBe(1);
        expect(moment.duration('26:45').hours(), '2 hours').toBe(2);
        expect(moment.duration('26:45').minutes(), '45 minutes').toBe(45);
        expect(moment.duration('26:45').seconds(), '0 seconds').toBe(0);
        expect(moment.duration('26:45').milliseconds(), '0 milliseconds').toBe(
            0
        );
    });

    test('instantiation from serialized C# TimeSpan zero', () => {
        expect(moment.duration('00:00:00').years(), '0 years').toBe(0);
        expect(moment.duration('00:00:00').days(), '0 days').toBe(0);
        expect(moment.duration('00:00:00').hours(), '0 hours').toBe(0);
        expect(moment.duration('00:00:00').minutes(), '0 minutes').toBe(0);
        expect(moment.duration('00:00:00').seconds(), '0 seconds').toBe(0);
        expect(
            moment.duration('00:00:00').milliseconds(),
            '0 milliseconds'
        ).toBe(0);
    });

    test('instantiation from serialized C# TimeSpan with days', () => {
        expect(moment.duration('1.02:03:04.9999999').years(), '0 years').toBe(
            0
        );
        expect(moment.duration('1.02:03:04.9999999').days(), '1 day').toBe(1);
        expect(moment.duration('1.02:03:04.9999999').hours(), '2 hours').toBe(
            2
        );
        expect(
            moment.duration('1.02:03:04.9999999').minutes(),
            '3 minutes'
        ).toBe(3);
        expect(
            moment.duration('1.02:03:04.9999999').seconds(),
            '5 seconds'
        ).toBe(5);
        expect(
            moment.duration('1.02:03:04.9999999').milliseconds(),
            '0 milliseconds'
        ).toBe(0);

        expect(moment.duration('1 02:03:04.9999999').years(), '0 years').toBe(
            0
        );
        expect(moment.duration('1 02:03:04.9999999').days(), '1 day').toBe(1);
        expect(moment.duration('1 02:03:04.9999999').hours(), '2 hours').toBe(
            2
        );
        expect(
            moment.duration('1 02:03:04.9999999').minutes(),
            '3 minutes'
        ).toBe(3);
        expect(
            moment.duration('1 02:03:04.9999999').seconds(),
            '5 seconds'
        ).toBe(5);
        expect(
            moment.duration('1 02:03:04.9999999').milliseconds(),
            '0 milliseconds'
        ).toBe(0);
    });

    test('instantiation from serialized C# TimeSpan without days', () => {
        expect(moment.duration('01:02:03.9999999').years(), '0 years').toBe(0);
        expect(moment.duration('01:02:03.9999999').days(), '0 days').toBe(0);
        expect(moment.duration('01:02:03.9999999').hours(), '1 hour').toBe(1);
        expect(moment.duration('01:02:03.9999999').minutes(), '2 minutes').toBe(
            2
        );
        expect(moment.duration('01:02:03.9999999').seconds(), '4 seconds').toBe(
            4
        );
        expect(
            moment.duration('01:02:03.9999999').milliseconds(),
            '0 milliseconds'
        ).toBe(0);

        expect(moment.duration('23:59:59.9999999').days(), '1 days').toBe(1);
        expect(moment.duration('23:59:59.9999999').hours(), '0 hours').toBe(0);
        expect(moment.duration('23:59:59.9999999').minutes(), '0 minutes').toBe(
            0
        );
        expect(moment.duration('23:59:59.9999999').seconds(), '0 seconds').toBe(
            0
        );
        expect(
            moment.duration('23:59:59.9999999').milliseconds(),
            '0 milliseconds'
        ).toBe(0);

        expect(
            moment.duration('500:59:59.8888888').days(),
            '500 hours overflows to 20 days'
        ).toBe(20);
        expect(
            moment.duration('500:59:59.8888888').hours(),
            '500 hours overflows to 20 hours'
        ).toBe(20);
    });

    test('instantiation from serialized C# TimeSpan without days or milliseconds', () => {
        expect(moment.duration('01:02:03').years(), '0 years').toBe(0);
        expect(moment.duration('01:02:03').days(), '0 days').toBe(0);
        expect(moment.duration('01:02:03').hours(), '1 hour').toBe(1);
        expect(moment.duration('01:02:03').minutes(), '2 minutes').toBe(2);
        expect(moment.duration('01:02:03').seconds(), '3 seconds').toBe(3);
        expect(
            moment.duration('01:02:03').milliseconds(),
            '0 milliseconds'
        ).toBe(0);
    });

    test('instantiation from serialized C# TimeSpan without milliseconds', () => {
        expect(moment.duration('1.02:03:04').years(), '0 years').toBe(0);
        expect(moment.duration('1.02:03:04').days(), '1 day').toBe(1);
        expect(moment.duration('1.02:03:04').hours(), '2 hours').toBe(2);
        expect(moment.duration('1.02:03:04').minutes(), '3 minutes').toBe(3);
        expect(moment.duration('1.02:03:04').seconds(), '4 seconds').toBe(4);
        expect(
            moment.duration('1.02:03:04').milliseconds(),
            '0 milliseconds'
        ).toBe(0);
    });

    test('instantiation from serialized C# TimeSpan with low millisecond precision', () => {
        expect(moment.duration('00:00:15.72').years(), '0 years').toBe(0);
        expect(moment.duration('00:00:15.72').days(), '0 days').toBe(0);
        expect(moment.duration('00:00:15.72').hours(), '0 hours').toBe(0);
        expect(moment.duration('00:00:15.72').minutes(), '0 minutes').toBe(0);
        expect(moment.duration('00:00:15.72').seconds(), '15 seconds').toBe(15);
        expect(
            moment.duration('00:00:15.72').milliseconds(),
            '720 milliseconds'
        ).toBe(720);

        expect(
            moment.duration('00:00:15.7').milliseconds(),
            '700 milliseconds'
        ).toBe(700);

        expect(
            moment.duration('00:00:15.').milliseconds(),
            '0 milliseconds'
        ).toBe(0);
    });

    test('instantiation from serialized C# TimeSpan with high millisecond precision', () => {
        expect(
            moment.duration('00:00:15.7200000').seconds(),
            '15 seconds'
        ).toBe(15);
        expect(
            moment.duration('00:00:15.7200000').milliseconds(),
            '720 milliseconds'
        ).toBe(720);

        expect(
            moment.duration('00:00:15.7209999').seconds(),
            '15 seconds'
        ).toBe(15);
        expect(
            moment.duration('00:00:15.7209999').milliseconds(),
            '721 milliseconds'
        ).toBe(721);

        expect(
            moment.duration('00:00:15.7205000').seconds(),
            '15 seconds'
        ).toBe(15);
        expect(
            moment.duration('00:00:15.7205000').milliseconds(),
            '721 milliseconds'
        ).toBe(721);

        expect(
            moment.duration('-00:00:15.7205000').seconds(),
            '15 seconds'
        ).toBe(-15);
        expect(
            moment.duration('-00:00:15.7205000').milliseconds(),
            '721 milliseconds'
        ).toBe(-721);

        expect(
            moment.duration('+00:00:15.7205000').seconds(),
            '15 seconds'
        ).toBe(15);
        expect(
            moment.duration('+00:00:15.7205000').milliseconds(),
            '721 milliseconds'
        ).toBe(721);
    });

    test('instantiation from serialized C# TimeSpan maxValue', () => {
        var d = moment.duration('10675199.02:48:05.4775807');

        expect(d.years(), '29227 years').toBe(29227);
        expect(d.months(), '8 months').toBe(8);
        expect(d.days(), '12 day').toBe(12); // if you have to change this value -- just do it

        expect(d.hours(), '2 hours').toBe(2);
        expect(d.minutes(), '48 minutes').toBe(48);
        expect(d.seconds(), '5 seconds').toBe(5);
        expect(d.milliseconds(), '478 milliseconds').toBe(478);
    });

    test('instantiation from serialized C# TimeSpan minValue', () => {
        var d = moment.duration('-10675199.02:48:05.4775808');

        expect(d.years(), '29653 years').toBe(-29227);
        expect(d.months(), '8 day').toBe(-8);
        expect(d.days(), '12 day').toBe(-12); // if you have to change this value -- just do it

        expect(d.hours(), '2 hours').toBe(-2);
        expect(d.minutes(), '48 minutes').toBe(-48);
        expect(d.seconds(), '5 seconds').toBe(-5);
        expect(d.milliseconds(), '478 milliseconds').toBe(-478);
    });

    test('instantiation from serialized C# TimeSpan maxValue with + sign', () => {
        var d = moment.duration('+10675199.02:48:05.4775808');

        expect(d.years(), '29653 years').toBe(29227);
        expect(d.months(), '8 day').toBe(8);
        expect(d.days(), '12 day').toBe(12); // if you have to change this value -- just do it

        expect(d.hours(), '2 hours').toBe(2);
        expect(d.minutes(), '48 minutes').toBe(48);
        expect(d.seconds(), '5 seconds').toBe(5);
        expect(d.milliseconds(), '478 milliseconds').toBe(478);
    });

    test('instantiation from ISO 8601 duration', () => {
        expect(
            moment.duration('P1Y2M3DT4H5M6S').asSeconds(),
            'all fields'
        ).toBe(
            moment.duration({ y: 1, M: 2, d: 3, h: 4, m: 5, s: 6 }).asSeconds()
        );
        expect(
            moment.duration('P3W3D').asSeconds(),
            'week and day fields'
        ).toBe(moment.duration({ w: 3, d: 3 }).asSeconds());
        expect(moment.duration('P1M').asSeconds(), 'single month field').toBe(
            moment.duration({ M: 1 }).asSeconds()
        );
        expect(moment.duration('PT1M').asSeconds(), 'single minute field').toBe(
            moment.duration({ m: 1 }).asSeconds()
        );
        expect(
            moment.duration('P1MT2H').asSeconds(),
            'random fields missing'
        ).toBe(moment.duration({ M: 1, h: 2 }).asSeconds());
        expect(moment.duration('-P60D').asSeconds(), 'negative days').toBe(
            moment.duration({ d: -60 }).asSeconds()
        );
        expect(moment.duration('+P60D').asSeconds(), 'positive days').toBe(
            moment.duration({ d: 60 }).asSeconds()
        );
        expect(
            moment.duration('PT0.5S').asSeconds(),
            'fractional seconds'
        ).toBe(moment.duration({ s: 0.5 }).asSeconds());
        expect(
            moment.duration('PT0,5S').asSeconds(),
            'fractional seconds (comma)'
        ).toBe(moment.duration({ s: 0.5 }).asSeconds());
    });

    test('serialization to ISO 8601 duration strings', () => {
        expect(
            moment
                .duration({ y: 1, M: 2, d: 3, h: 4, m: 5, s: 6 })
                .toISOString(),
            'all fields'
        ).toBe('P1Y2M3DT4H5M6S');
        expect(moment.duration({ M: -1 }).toISOString(), 'one month ago').toBe(
            '-P1M'
        );
        expect(moment.duration({ m: -1 }).toISOString(), 'one minute ago').toBe(
            '-PT1M'
        );
        expect(
            moment.duration({ s: -0.5 }).toISOString(),
            'one half second ago'
        ).toBe('-PT0.5S');
        expect(
            moment.duration({ y: -1, M: 1 }).toISOString(),
            'a month after a year ago'
        ).toBe('-P11M');
        expect(
            moment.duration({ y: -1, h: 1 }).toISOString(),
            'an hour after a year ago'
        ).toBe('-P1YT-1H');
        expect(
            moment.duration({ y: -1, h: 1, m: -1 }).toISOString(),
            '59 minutes after a year ago'
        ).toBe('-P1YT-59M');
        expect(
            moment.duration({ y: -1, h: 1, s: -1 }).toISOString(),
            '59 minutes 59 seconds after a year ago'
        ).toBe('-P1YT-59M-59S');
        expect(
            moment.duration({ y: -1, h: -1, s: 1 }).toISOString(),
            '59 minutes 59 seconds after a year ago'
        ).toBe('-P1YT59M59S');
        expect(
            moment.duration({ y: -1, d: 2 }).toISOString(),
            '1 year less 2 days ago'
        ).toBe('-P1Y-2D');
        expect(moment.duration({ M: +1 }).toISOString(), 'one month ago').toBe(
            'P1M'
        );
        expect(moment.duration({ m: +1 }).toISOString(), 'one minute ago').toBe(
            'PT1M'
        );
        expect(
            moment.duration({ s: +0.5 }).toISOString(),
            'one half second ago'
        ).toBe('PT0.5S');
        expect(
            moment.duration({ y: +1, M: 1 }).toISOString(),
            'a month after a year in future'
        ).toBe('P1Y1M');
        expect(
            moment.duration({ y: -1, h: 1 }).toISOString(),
            'an hour after a year ago'
        ).toBe('-P1YT-1H');
        expect(moment.duration({}).toISOString(), 'zero duration').toBe('P0D');
        expect(
            moment.duration({ M: 16, d: 40, s: 86465 }).toISOString(),
            'all fields'
        ).toBe('P1Y4M40DT24H1M5S');
        expect(
            moment.duration({ ms: 123456789 }).toISOString(),
            'check floating-point errors'
        ).toBe('PT34H17M36.789S');
        expect(
            moment.duration({ ms: 31952 }).toISOString(),
            'check floating-point errors'
        ).toBe('PT31.952S');
    });

    test('toString acts as toISOString', () => {
        expect(
            moment.duration({ y: 1, M: 2, d: 3, h: 4, m: 5, s: 6 }).toString(),
            'all fields'
        ).toBe('P1Y2M3DT4H5M6S');
        expect(moment.duration({ M: -1 }).toString(), 'one month ago').toBe(
            '-P1M'
        );
        expect(moment.duration({ m: -1 }).toString(), 'one minute ago').toBe(
            '-PT1M'
        );
        expect(
            moment.duration({ s: -0.5 }).toString(),
            'one half second ago'
        ).toBe('-PT0.5S');
        expect(
            moment.duration({ y: -1, M: 1 }).toString(),
            'a month after a year ago'
        ).toBe('-P11M');
        expect(moment.duration({ M: +1 }).toString(), 'one month ago').toBe(
            'P1M'
        );
        expect(moment.duration({ m: +1 }).toString(), 'one minute ago').toBe(
            'PT1M'
        );
        expect(
            moment.duration({ s: +0.5 }).toString(),
            'one half second ago'
        ).toBe('PT0.5S');
        expect(
            moment.duration({ y: +1, M: 1 }).toString(),
            'a month after a year in future'
        ).toBe('P1Y1M');
        expect(moment.duration({}).toString(), 'zero duration').toBe('P0D');
        expect(
            moment.duration({ M: 16, d: 40, s: 86465 }).toString(),
            'all fields'
        ).toBe('P1Y4M40DT24H1M5S');
    });

    test('toIsoString deprecation', () => {
        expectDeprecations('toIsoString()');

        expect(
            moment.duration({}).toIsoString(),
            'toIsoString delegates to toISOString'
        ).toBe(moment.duration({}).toISOString());
    });

    test('`isodate` (python) test cases', () => {
        expect(
            moment.duration('P18Y9M4DT11H9M8S').asSeconds(),
            'python isodate 1'
        ).toBe(
            moment
                .duration({ y: 18, M: 9, d: 4, h: 11, m: 9, s: 8 })
                .asSeconds()
        );
        expect(moment.duration('P2W').asSeconds(), 'python isodate 2').toBe(
            moment.duration({ w: 2 }).asSeconds()
        );
        expect(
            moment.duration('P3Y6M4DT12H30M5S').asSeconds(),
            'python isodate 3'
        ).toBe(
            moment
                .duration({ y: 3, M: 6, d: 4, h: 12, m: 30, s: 5 })
                .asSeconds()
        );
        expect(
            moment.duration('P23DT23H').asSeconds(),
            'python isodate 4'
        ).toBe(moment.duration({ d: 23, h: 23 }).asSeconds());
        expect(moment.duration('P4Y').asSeconds(), 'python isodate 5').toBe(
            moment.duration({ y: 4 }).asSeconds()
        );
        expect(moment.duration('P1M').asSeconds(), 'python isodate 6').toBe(
            moment.duration({ M: 1 }).asSeconds()
        );
        expect(moment.duration('PT1M').asSeconds(), 'python isodate 7').toBe(
            moment.duration({ m: 1 }).asSeconds()
        );
        expect(moment.duration('P0.5Y').asSeconds(), 'python isodate 8').toBe(
            moment.duration({ y: 0.5 }).asSeconds()
        );
        expect(moment.duration('PT36H').asSeconds(), 'python isodate 9').toBe(
            moment.duration({ h: 36 }).asSeconds()
        );
        expect(
            moment.duration('P1DT12H').asSeconds(),
            'python isodate 10'
        ).toBe(moment.duration({ d: 1, h: 12 }).asSeconds());
        expect(moment.duration('-P2W').asSeconds(), 'python isodate 11').toBe(
            moment.duration({ w: -2 }).asSeconds()
        );
        expect(moment.duration('-P2.2W').asSeconds(), 'python isodate 12').toBe(
            moment.duration({ w: -2.2 }).asSeconds()
        );
        expect(moment.duration('+P2W').asSeconds(), 'python isodate 11').toBe(
            moment.duration({ w: 2 }).asSeconds()
        );
        expect(moment.duration('+P2.2W').asSeconds(), 'python isodate 12').toBe(
            moment.duration({ w: 2.2 }).asSeconds()
        );
        expect(
            moment.duration('P1DT2H3M4S').asSeconds(),
            'python isodate 13'
        ).toBe(moment.duration({ d: 1, h: 2, m: 3, s: 4 }).asSeconds());
        expect(
            moment.duration('P1DT2H3M').asSeconds(),
            'python isodate 14'
        ).toBe(moment.duration({ d: 1, h: 2, m: 3 }).asSeconds());
        expect(moment.duration('P1DT2H').asSeconds(), 'python isodate 15').toBe(
            moment.duration({ d: 1, h: 2 }).asSeconds()
        );
        expect(moment.duration('PT2H').asSeconds(), 'python isodate 16').toBe(
            moment.duration({ h: 2 }).asSeconds()
        );
        expect(moment.duration('PT2.3H').asSeconds(), 'python isodate 17').toBe(
            moment.duration({ h: 2.3 }).asSeconds()
        );
        expect(
            moment.duration('PT2H3M4S').asSeconds(),
            'python isodate 18'
        ).toBe(moment.duration({ h: 2, m: 3, s: 4 }).asSeconds());
        expect(moment.duration('PT3M4S').asSeconds(), 'python isodate 19').toBe(
            moment.duration({ m: 3, s: 4 }).asSeconds()
        );
        expect(moment.duration('PT22S').asSeconds(), 'python isodate 20').toBe(
            moment.duration({ s: 22 }).asSeconds()
        );
        expect(
            moment.duration('PT22.22S').asSeconds(),
            'python isodate 21'
        ).toBe(moment.duration({ s: 22.22 }).asSeconds());
        expect(moment.duration('-P2Y').asSeconds(), 'python isodate 22').toBe(
            moment.duration({ y: -2 }).asSeconds()
        );
        expect(
            moment.duration('-P3Y6M4DT12H30M5S').asSeconds(),
            'python isodate 23'
        ).toBe(
            moment
                .duration({ y: -3, M: -6, d: -4, h: -12, m: -30, s: -5 })
                .asSeconds()
        );
        expect(
            moment.duration('-P1DT2H3M4S').asSeconds(),
            'python isodate 24'
        ).toBe(moment.duration({ d: -1, h: -2, m: -3, s: -4 }).asSeconds());
        expect(
            moment.duration('PT-6H3M').asSeconds(),
            'python isodate 25'
        ).toBe(moment.duration({ h: -6, m: 3 }).asSeconds());
        expect(
            moment.duration('-PT-6H3M').asSeconds(),
            'python isodate 26'
        ).toBe(moment.duration({ h: 6, m: -3 }).asSeconds());
        expect(
            moment.duration('-P-3Y-6M-4DT-12H-30M-5S').asSeconds(),
            'python isodate 27'
        ).toBe(
            moment
                .duration({ y: 3, M: 6, d: 4, h: 12, m: 30, s: 5 })
                .asSeconds()
        );
        expect(
            moment.duration('P-3Y-6M-4DT-12H-30M-5S').asSeconds(),
            'python isodate 28'
        ).toBe(
            moment
                .duration({ y: -3, M: -6, d: -4, h: -12, m: -30, s: -5 })
                .asSeconds()
        );
        expect(moment.duration('-P-2W').asSeconds(), 'python isodate 29').toBe(
            moment.duration({ w: 2 }).asSeconds()
        );
        expect(moment.duration('P-2W').asSeconds(), 'python isodate 30').toBe(
            moment.duration({ w: -2 }).asSeconds()
        );
        expect(moment.duration('+P2Y').asSeconds(), 'python isodate 31').toBe(
            moment.duration({ y: 2 }).asSeconds()
        );
        expect(
            moment.duration('+P3Y6M4DT12H30M5S').asSeconds(),
            'python isodate 32'
        ).toBe(
            moment
                .duration({ y: 3, M: 6, d: 4, h: 12, m: 30, s: 5 })
                .asSeconds()
        );
        expect(
            moment.duration('+P1DT2H3M4S').asSeconds(),
            'python isodate 34'
        ).toBe(moment.duration({ d: 1, h: 2, m: 3, s: 4 }).asSeconds());
        expect(
            moment.duration('PT+6H3M').asSeconds(),
            'python isodate 35'
        ).toBe(moment.duration({ h: 6, m: 3 }).asSeconds());
        expect(
            moment.duration('+PT+6H3M').asSeconds(),
            'python isodate 36'
        ).toBe(moment.duration({ h: 6, m: 3 }).asSeconds());
        expect(
            moment.duration('+PT-6H3M').asSeconds(),
            'python isodate 37'
        ).toBe(moment.duration({ h: -6, m: 3 }).asSeconds());
        expect(
            moment.duration('+P+3Y+6M+4DT+12H+30M+5S').asSeconds(),
            'python isodate 38'
        ).toBe(
            moment
                .duration({ y: 3, M: 6, d: 4, h: 12, m: 30, s: 5 })
                .asSeconds()
        );
        expect(
            moment.duration('+P-3Y-6M-4DT-12H-30M-5S').asSeconds(),
            'python isodate 39'
        ).toBe(
            moment
                .duration({ y: -3, M: -6, d: -4, h: -12, m: -30, s: -5 })
                .asSeconds()
        );
        expect(
            moment.duration('P+3Y+6M+4DT+12H+30M+5S').asSeconds(),
            'python isodate 40'
        ).toBe(
            moment
                .duration({ y: 3, M: 6, d: 4, h: 12, m: 30, s: 5 })
                .asSeconds()
        );
        expect(moment.duration('+P+2W').asSeconds(), 'python isodate 41').toBe(
            moment.duration({ w: 2 }).asSeconds()
        );
        expect(moment.duration('+P-2W').asSeconds(), 'python isodate 41').toBe(
            moment.duration({ w: -2 }).asSeconds()
        );
        expect(moment.duration('P+2W').asSeconds(), 'python isodate 43').toBe(
            moment.duration({ w: 2 }).asSeconds()
        );
    });

    test('ISO 8601 misuse cases', () => {
        expect(moment.duration('P').asSeconds(), 'lonely P').toBe(0);
        expect(moment.duration('PT').asSeconds(), 'just P and T').toBe(0);
        expect(moment.duration('P1H').asSeconds(), 'missing T').toBe(0);
        expect(moment.duration('P1D1Y').asSeconds(), 'out of order').toBe(0);
        expect(
            moment.duration('PT.5S').asSeconds(),
            'accept no leading zero for decimal'
        ).toBe(0.5);
        expect(
            moment.duration('PT1,S').asSeconds(),
            'accept trailing decimal separator'
        ).toBe(1);
        expect(
            moment.duration('PT1M0,,5S').asSeconds(),
            'extra decimal separators are ignored as 0'
        ).toBe(60);
    });

    test('humanize', () => {
        moment.locale('en');
        expect(
            moment.duration({ seconds: 44 }).humanize(),
            '44 seconds = a few seconds'
        ).toBe('a few seconds');
        expect(
            moment.duration({ seconds: 45 }).humanize(),
            '45 seconds = a minute'
        ).toBe('a minute');
        expect(
            moment.duration({ seconds: 89 }).humanize(),
            '89 seconds = a minute'
        ).toBe('a minute');
        expect(
            moment.duration({ seconds: 90 }).humanize(),
            '90 seconds = 2 minutes'
        ).toBe('2 minutes');
        expect(
            moment.duration({ minutes: 44 }).humanize(),
            '44 minutes = 44 minutes'
        ).toBe('44 minutes');
        expect(
            moment.duration({ minutes: 45 }).humanize(),
            '45 minutes = an hour'
        ).toBe('an hour');
        expect(
            moment.duration({ minutes: 89 }).humanize(),
            '89 minutes = an hour'
        ).toBe('an hour');
        expect(
            moment.duration({ minutes: 90 }).humanize(),
            '90 minutes = 2 hours'
        ).toBe('2 hours');
        expect(
            moment.duration({ hours: 5 }).humanize(),
            '5 hours = 5 hours'
        ).toBe('5 hours');
        expect(
            moment.duration({ hours: 21 }).humanize(),
            '21 hours = 21 hours'
        ).toBe('21 hours');
        expect(
            moment.duration({ hours: 22 }).humanize(),
            '22 hours = a day'
        ).toBe('a day');
        expect(
            moment.duration({ hours: 35 }).humanize(),
            '35 hours = a day'
        ).toBe('a day');
        expect(
            moment.duration({ hours: 36 }).humanize(),
            '36 hours = 2 days'
        ).toBe('2 days');
        expect(moment.duration({ days: 1 }).humanize(), '1 day = a day').toBe(
            'a day'
        );
        expect(moment.duration({ days: 5 }).humanize(), '5 days = 5 days').toBe(
            '5 days'
        );
        expect(
            moment.duration({ weeks: 1 }).humanize(),
            '1 week = 7 days'
        ).toBe('7 days');
        expect(
            moment.duration({ days: 25 }).humanize(),
            '25 days = 25 days'
        ).toBe('25 days');
        expect(
            moment.duration({ days: 26 }).humanize(),
            '26 days = a month'
        ).toBe('a month');
        expect(
            moment.duration({ days: 30 }).humanize(),
            '30 days = a month'
        ).toBe('a month');
        expect(
            moment.duration({ days: 45 }).humanize(),
            '45 days = a month'
        ).toBe('a month');
        expect(
            moment.duration({ days: 46 }).humanize(),
            '46 days = 2 months'
        ).toBe('2 months');
        expect(
            moment.duration({ days: 74 }).humanize(),
            '74 days = 2 months'
        ).toBe('2 months');
        expect(
            moment.duration({ days: 77 }).humanize(),
            '77 days = 3 months'
        ).toBe('3 months');
        expect(
            moment.duration({ months: 1 }).humanize(),
            '1 month = a month'
        ).toBe('a month');
        expect(
            moment.duration({ months: 5 }).humanize(),
            '5 months = 5 months'
        ).toBe('5 months');
        expect(
            moment.duration({ days: 344 }).humanize(),
            '344 days = a year'
        ).toBe('a year');
        expect(
            moment.duration({ days: 345 }).humanize(),
            '345 days = a year'
        ).toBe('a year');
        expect(
            moment.duration({ days: 547 }).humanize(),
            '547 days = a year'
        ).toBe('a year');
        expect(
            moment.duration({ days: 548 }).humanize(),
            '548 days = 2 years'
        ).toBe('2 years');
        expect(
            moment.duration({ years: 1 }).humanize(),
            '1 year = a year'
        ).toBe('a year');
        expect(
            moment.duration({ years: 5 }).humanize(),
            '5 years = 5 years'
        ).toBe('5 years');
        expect(moment.duration(7200000).humanize(), '7200000 = 2 hours').toBe(
            '2 hours'
        );
    });

    test('humanize duration with suffix', () => {
        moment.locale('en');
        expect(
            moment.duration({ seconds: 44 }).humanize(true),
            '44 seconds = a few seconds'
        ).toBe('in a few seconds');
        expect(
            moment.duration({ seconds: -44 }).humanize(true),
            '44 seconds = a few seconds'
        ).toBe('a few seconds ago');
        expect(
            moment.duration({ seconds: +44 }).humanize(true),
            '44 seconds = a few seconds'
        ).toBe('in a few seconds');
    });

    test('humanize duration with thresholds', () => {
        var thresholds = { s: 9 };
        moment.locale('en');
        expect(
            moment.duration({ seconds: -10 }).humanize(thresholds),
            '10 seconds = a minute (with thresholds)'
        ).toBe('a minute');
        expect(
            moment.duration({ seconds: 10 }).humanize(true, thresholds),
            '10 seconds = a minute (with thresholds and suffix)'
        ).toBe('in a minute');
        expect(
            moment.duration({ weeks: 3 }).humanize(true, { d: 7, w: 4 }),
            'in 3 weeks = in 3 weeks (with thresholds and suffix)'
        ).toBe('in 3 weeks');
        expect(
            moment.duration({ weeks: 3 }).humanize(false, { d: 7, w: 4 }),
            '3 weeks = 3 weeks (with thresholds and suffix == false)'
        ).toBe('3 weeks');
    });

    test('bubble value up', () => {
        expect(
            moment.duration({ milliseconds: 61001 }).milliseconds(),
            '61001 milliseconds has 1 millisecond left over'
        ).toBe(1);
        expect(
            moment.duration({ milliseconds: 61001 }).seconds(),
            '61001 milliseconds has 1 second left over'
        ).toBe(1);
        expect(
            moment.duration({ milliseconds: 61001 }).minutes(),
            '61001 milliseconds has 1 minute left over'
        ).toBe(1);

        expect(
            moment.duration({ minutes: 350 }).minutes(),
            '350 minutes has 50 minutes left over'
        ).toBe(50);
        expect(
            moment.duration({ minutes: 350 }).hours(),
            '350 minutes has 5 hours left over'
        ).toBe(5);
    });

    test('clipping', () => {
        expect(
            moment.duration({ months: 11 }).months(),
            '11 months is 11 months'
        ).toBe(11);
        expect(
            moment.duration({ months: 11 }).years(),
            '11 months makes no year'
        ).toBe(0);
        expect(
            moment.duration({ months: 12 }).months(),
            '12 months is 0 months left over'
        ).toBe(0);
        expect(
            moment.duration({ months: 12 }).years(),
            '12 months makes 1 year'
        ).toBe(1);
        expect(
            moment.duration({ months: 13 }).months(),
            '13 months is 1 month left over'
        ).toBe(1);
        expect(
            moment.duration({ months: 13 }).years(),
            '13 months makes 1 year'
        ).toBe(1);

        expect(moment.duration({ days: 30 }).days(), '30 days is 30 days').toBe(
            30
        );
        expect(
            moment.duration({ days: 30 }).months(),
            '30 days makes no month'
        ).toBe(0);
        expect(
            moment.duration({ days: 31 }).days(),
            '31 days is 0 days left over'
        ).toBe(0);
        expect(
            moment.duration({ days: 31 }).months(),
            '31 days is a month'
        ).toBe(1);
        expect(
            moment.duration({ days: 32 }).days(),
            '32 days is 1 day left over'
        ).toBe(1);
        expect(
            moment.duration({ days: 32 }).months(),
            '32 days is a month'
        ).toBe(1);

        expect(
            moment.duration({ hours: 23 }).hours(),
            '23 hours is 23 hours'
        ).toBe(23);
        expect(
            moment.duration({ hours: 23 }).days(),
            '23 hours makes no day'
        ).toBe(0);
        expect(
            moment.duration({ hours: 24 }).hours(),
            '24 hours is 0 hours left over'
        ).toBe(0);
        expect(
            moment.duration({ hours: 24 }).days(),
            '24 hours makes 1 day'
        ).toBe(1);
        expect(
            moment.duration({ hours: 25 }).hours(),
            '25 hours is 1 hour left over'
        ).toBe(1);
        expect(
            moment.duration({ hours: 25 }).days(),
            '25 hours makes 1 day'
        ).toBe(1);
    });

    test('bubbling consistency', () => {
        var days = 0,
            months = 0,
            newDays,
            newMonths,
            totalDays,
            d;
        for (totalDays = 1; totalDays <= 500; ++totalDays) {
            d = moment.duration(totalDays, 'days');
            newDays = d.days();
            newMonths = d.months() + d.years() * 12;
            expect(
                (months === newMonths && days + 1 === newDays) ||
                    (months + 1 === newMonths && newDays === 0),
                'consistent total days ' +
                    totalDays +
                    ' was ' +
                    months +
                    ' ' +
                    days +
                    ' now ' +
                    newMonths +
                    ' ' +
                    newDays
            ).toBeTruthy();
            days = newDays;
            months = newMonths;
        }
    });

    test('effective equivalency', () => {
        expect(
            moment.duration({ seconds: 1 })._data,
            '1 second is the same as 1000 milliseconds'
        ).toEqual(moment.duration({ milliseconds: 1000 })._data);
        expect(
            moment.duration({ seconds: 60 })._data,
            '1 minute is the same as 60 seconds'
        ).toEqual(moment.duration({ minutes: 1 })._data);
        expect(
            moment.duration({ minutes: 60 })._data,
            '1 hour is the same as 60 minutes'
        ).toEqual(moment.duration({ hours: 1 })._data);
        expect(
            moment.duration({ hours: 24 })._data,
            '1 day is the same as 24 hours'
        ).toEqual(moment.duration({ days: 1 })._data);
        expect(
            moment.duration({ days: 7 })._data,
            '1 week is the same as 7 days'
        ).toEqual(moment.duration({ weeks: 1 })._data);
        expect(
            moment.duration({ days: 31 })._data,
            '1 month is the same as 30 days'
        ).toEqual(moment.duration({ months: 1 })._data);
        expect(
            moment.duration({ months: 12 })._data,
            '1 years is the same as 12 months'
        ).toEqual(moment.duration({ years: 1 })._data);
    });

    test('asGetters', () => {
        // 400 years have exactly 146097 days

        // years
        expect(moment.duration(1, 'year').asYears(), '1 year as years').toBe(1);
        expect(
            moment.duration(1, 'year').asQuarters(),
            '1 year as quarters'
        ).toBe(4);
        expect(moment.duration(1, 'year').asMonths(), '1 year as months').toBe(
            12
        );
        expect(
            moment.duration(400, 'year').asMonths(),
            '400 years as months'
        ).toBe(4800);
        expect(
            Number(moment.duration(1, 'year').asWeeks().toFixed(3)),
            '1 year as weeks'
        ).toBe(52.143);
        expect(moment.duration(1, 'year').asDays(), '1 year as days').toBe(365);
        expect(moment.duration(2, 'year').asDays(), '2 years as days').toBe(
            730
        );
        expect(moment.duration(3, 'year').asDays(), '3 years as days').toBe(
            1096
        );
        expect(moment.duration(4, 'year').asDays(), '4 years as days').toBe(
            1461
        );
        expect(moment.duration(400, 'year').asDays(), '400 years as days').toBe(
            146097
        );
        expect(moment.duration(1, 'year').asHours(), '1 year as hours').toBe(
            8760
        );
        expect(
            moment.duration(1, 'year').asMinutes(),
            '1 year as minutes'
        ).toBe(525600);
        expect(
            moment.duration(1, 'year').asSeconds(),
            '1 year as seconds'
        ).toBe(31536000);
        expect(
            moment.duration(1, 'year').asMilliseconds(),
            '1 year as milliseconds'
        ).toBe(31536000000);

        // quarters
        expect(
            moment.duration(1, 'quarter').asYears(),
            '1 quarter as years'
        ).toBe(0.25);
        expect(
            moment.duration(1, 'quarter').asQuarters(),
            '1 quarter as quarters'
        ).toBe(1);
        expect(
            moment.duration(1, 'quarter').asMonths(),
            '1 quarter as months'
        ).toBe(3);
        expect(
            Number(moment.duration(2, 'quarter').asWeeks().toFixed(3)),
            '2 month as quarters'
        ).toBe(26.143);
        expect(
            moment.duration(1, 'quarter').asDays(),
            '1 quarter as days'
        ).toBe(91);
        expect(
            moment.duration(2, 'quarter').asDays(),
            '2 quarter as days'
        ).toBe(183);
        expect(
            moment.duration(3, 'quarter').asDays(),
            '4 quarter as days'
        ).toBe(274);
        expect(
            moment.duration(4, 'quarter').asDays(),
            '4 quarter as days'
        ).toBe(365);
        expect(
            moment.duration(1, 'quarter').asHours(),
            '1 quarter as hours'
        ).toBe(2184);
        expect(
            moment.duration(3, 'quarter').asHours(),
            '3 quarter as hours'
        ).toBe(6576);
        expect(
            moment.duration(2, 'quarter').asMinutes(),
            '2 quarter as minutes'
        ).toBe(263520);
        expect(
            moment.duration(3, 'quarter').asSeconds(),
            '3 quarter as seconds'
        ).toBe(23673600);
        expect(
            moment.duration(1, 'quarter').asMilliseconds(),
            '1 quarter as milliseconds'
        ).toBe(7862400000);

        // months
        expect(
            Number(moment.duration(1, 'month').asYears().toFixed(4)),
            '1 month as years'
        ).toBe(0.0833);
        expect(
            moment.duration(6, 'month').asQuarters(),
            '6 month as quarters'
        ).toBe(2);
        expect(
            moment.duration(1, 'month').asMonths(),
            '1 month as months'
        ).toBe(1);
        expect(
            Number(moment.duration(1, 'month').asWeeks().toFixed(3)),
            '1 month as weeks'
        ).toBe(4.286);
        expect(moment.duration(1, 'month').asDays(), '1 month as days').toBe(
            30
        );
        expect(moment.duration(2, 'month').asDays(), '2 months as days').toBe(
            61
        );
        expect(moment.duration(3, 'month').asDays(), '3 months as days').toBe(
            91
        );
        expect(moment.duration(4, 'month').asDays(), '4 months as days').toBe(
            122
        );
        expect(moment.duration(5, 'month').asDays(), '5 months as days').toBe(
            152
        );
        expect(moment.duration(6, 'month').asDays(), '6 months as days').toBe(
            183
        );
        expect(moment.duration(7, 'month').asDays(), '7 months as days').toBe(
            213
        );
        expect(moment.duration(8, 'month').asDays(), '8 months as days').toBe(
            243
        );
        expect(moment.duration(9, 'month').asDays(), '9 months as days').toBe(
            274
        );
        expect(moment.duration(10, 'month').asDays(), '10 months as days').toBe(
            304
        );
        expect(moment.duration(11, 'month').asDays(), '11 months as days').toBe(
            335
        );
        expect(moment.duration(12, 'month').asDays(), '12 months as days').toBe(
            365
        );
        expect(moment.duration(24, 'month').asDays(), '24 months as days').toBe(
            730
        );
        expect(moment.duration(36, 'month').asDays(), '36 months as days').toBe(
            1096
        );
        expect(moment.duration(48, 'month').asDays(), '48 months as days').toBe(
            1461
        );
        expect(
            moment.duration(4800, 'month').asDays(),
            '4800 months as days'
        ).toBe(146097);
        expect(moment.duration(1, 'month').asHours(), '1 month as hours').toBe(
            720
        );
        expect(
            moment.duration(1, 'month').asMinutes(),
            '1 month as minutes'
        ).toBe(43200);
        expect(
            moment.duration(1, 'month').asSeconds(),
            '1 month as seconds'
        ).toBe(2592000);
        expect(
            moment.duration(1, 'month').asMilliseconds(),
            '1 month as milliseconds'
        ).toBe(2592000000);

        // weeks
        expect(
            Number(moment.duration(1, 'week').asYears().toFixed(4)),
            '1 week as years'
        ).toBe(0.0192);
        expect(
            Number(moment.duration(1, 'week').asQuarters().toFixed(4)),
            '1 week as quarters'
        ).toBe(0.0767);
        expect(
            Number(moment.duration(1, 'week').asMonths().toFixed(3)),
            '1 week as months'
        ).toBe(0.23);
        expect(moment.duration(1, 'week').asWeeks(), '1 week as weeks').toBe(1);
        expect(moment.duration(1, 'week').asDays(), '1 week as days').toBe(7);
        expect(moment.duration(1, 'week').asHours(), '1 week as hours').toBe(
            168
        );
        expect(
            moment.duration(1, 'week').asMinutes(),
            '1 week as minutes'
        ).toBe(10080);
        expect(
            moment.duration(1, 'week').asSeconds(),
            '1 week as seconds'
        ).toBe(604800);
        expect(
            moment.duration(1, 'week').asMilliseconds(),
            '1 week as milliseconds'
        ).toBe(604800000);

        // days
        expect(
            Number(moment.duration(1, 'day').asYears().toFixed(4)),
            '1 day as years'
        ).toBe(0.0027);
        expect(
            Number(moment.duration(1, 'day').asQuarters().toFixed(4)),
            '1 day as quarters'
        ).toBe(0.011);
        expect(
            Number(moment.duration(1, 'day').asMonths().toFixed(3)),
            '1 day as months'
        ).toBe(0.033);
        expect(
            Number(moment.duration(1, 'day').asWeeks().toFixed(3)),
            '1 day as weeks'
        ).toBe(0.143);
        expect(moment.duration(1, 'day').asDays(), '1 day as days').toBe(1);
        expect(moment.duration(1, 'day').asHours(), '1 day as hours').toBe(24);
        expect(moment.duration(1, 'day').asMinutes(), '1 day as minutes').toBe(
            1440
        );
        expect(moment.duration(1, 'day').asSeconds(), '1 day as seconds').toBe(
            86400
        );
        expect(
            moment.duration(1, 'day').asMilliseconds(),
            '1 day as milliseconds'
        ).toBe(86400000);

        // hours
        expect(
            Number(moment.duration(1, 'hour').asYears().toFixed(6)),
            '1 hour as years'
        ).toBe(0.000114);
        expect(
            Number(moment.duration(1, 'hour').asQuarters().toFixed(6)),
            '1 hour as quarters'
        ).toBe(0.000456);
        expect(
            Number(moment.duration(1, 'hour').asMonths().toFixed(5)),
            '1 hour as months'
        ).toBe(0.00137);
        expect(
            Number(moment.duration(1, 'hour').asWeeks().toFixed(5)),
            '1 hour as weeks'
        ).toBe(0.00595);
        expect(
            Number(moment.duration(1, 'hour').asDays().toFixed(4)),
            '1 hour as days'
        ).toBe(0.0417);
        expect(moment.duration(1, 'hour').asHours(), '1 hour as hours').toBe(1);
        expect(
            moment.duration(1, 'hour').asMinutes(),
            '1 hour as minutes'
        ).toBe(60);
        expect(
            moment.duration(1, 'hour').asSeconds(),
            '1 hour as seconds'
        ).toBe(3600);
        expect(
            moment.duration(1, 'hour').asMilliseconds(),
            '1 hour as milliseconds'
        ).toBe(3600000);

        // minutes
        expect(
            Number(moment.duration(1, 'minute').asYears().toFixed(8)),
            '1 minute as years'
        ).toBe(0.0000019);
        expect(
            Number(moment.duration(1, 'minute').asQuarters().toFixed(8)),
            '1 minute as quarters'
        ).toBe(0.00000761);
        expect(
            Number(moment.duration(1, 'minute').asMonths().toFixed(7)),
            '1 minute as months'
        ).toBe(0.0000228);
        expect(
            Number(moment.duration(1, 'minute').asWeeks().toFixed(7)),
            '1 minute as weeks'
        ).toBe(0.0000992);
        expect(
            Number(moment.duration(1, 'minute').asDays().toFixed(6)),
            '1 minute as days'
        ).toBe(0.000694);
        expect(
            Number(moment.duration(1, 'minute').asHours().toFixed(4)),
            '1 minute as hours'
        ).toBe(0.0167);
        expect(
            moment.duration(1, 'minute').asMinutes(),
            '1 minute as minutes'
        ).toBe(1);
        expect(
            moment.duration(1, 'minute').asSeconds(),
            '1 minute as seconds'
        ).toBe(60);
        expect(
            moment.duration(1, 'minute').asMilliseconds(),
            '1 minute as milliseconds'
        ).toBe(60000);

        // seconds
        expect(
            Number(moment.duration(1, 'second').asYears().toFixed(10)),
            '1 second as years'
        ).toBe(0.0000000317);
        expect(
            Number(moment.duration(1, 'second').asQuarters().toFixed(10)),
            '1 second as quarters'
        ).toBe(0.0000001268);
        expect(
            Number(moment.duration(1, 'second').asMonths().toFixed(9)),
            '1 second as months'
        ).toBe(0.00000038);
        expect(
            Number(moment.duration(1, 'second').asWeeks().toFixed(8)),
            '1 second as weeks'
        ).toBe(0.00000165);
        expect(
            Number(moment.duration(1, 'second').asDays().toFixed(7)),
            '1 second as days'
        ).toBe(0.0000116);
        expect(
            Number(moment.duration(1, 'second').asHours().toFixed(6)),
            '1 second as hours'
        ).toBe(0.000278);
        expect(
            Number(moment.duration(1, 'second').asMinutes().toFixed(4)),
            '1 second as minutes'
        ).toBe(0.0167);
        expect(
            moment.duration(1, 'second').asSeconds(),
            '1 second as seconds'
        ).toBe(1);
        expect(
            moment.duration(1, 'second').asMilliseconds(),
            '1 second as milliseconds'
        ).toBe(1000);

        // milliseconds
        expect(
            Number(moment.duration(1, 'millisecond').asYears().toFixed(13)),
            '1 millisecond as years'
        ).toBe(0.0000000000317);
        expect(
            Number(moment.duration(1, 'millisecond').asQuarters().toFixed(13)),
            '1 millisecond as quarters'
        ).toBe(0.0000000001268);
        expect(
            Number(moment.duration(1, 'millisecond').asMonths().toFixed(12)),
            '1 millisecond as months'
        ).toBe(0.00000000038);
        expect(
            Number(moment.duration(1, 'millisecond').asWeeks().toFixed(11)),
            '1 millisecond as weeks'
        ).toBe(0.00000000165);
        expect(
            Number(moment.duration(1, 'millisecond').asDays().toFixed(10)),
            '1 millisecond as days'
        ).toBe(0.0000000116);
        expect(
            Number(moment.duration(1, 'millisecond').asHours().toFixed(9)),
            '1 millisecond as hours'
        ).toBe(0.000000278);
        expect(
            Number(moment.duration(1, 'millisecond').asMinutes().toFixed(7)),
            '1 millisecond as minutes'
        ).toBe(0.0000167);
        expect(
            moment.duration(1, 'millisecond').asSeconds(),
            '1 millisecond as seconds'
        ).toBe(0.001);
        expect(
            moment.duration(1, 'millisecond').asMilliseconds(),
            '1 millisecond as milliseconds'
        ).toBe(1);
    });

    test('as getters for small units', () => {
        var dS = moment.duration(1, 'milliseconds'),
            ds = moment.duration(3, 'seconds'),
            dm = moment.duration(13, 'minutes');

        // Tests for issue #1867.
        // Floating point errors for small duration units were introduced in version 2.8.0.
        expect(dS.as('milliseconds'), 'as("milliseconds")').toBe(1);
        expect(dS.asMilliseconds(), 'asMilliseconds()').toBe(1);
        expect(ds.as('seconds'), 'as("seconds")').toBe(3);
        expect(ds.asSeconds(), 'asSeconds()').toBe(3);
        expect(dm.as('minutes'), 'as("minutes")').toBe(13);
        expect(dm.asMinutes(), 'asMinutes()').toBe(13);
    });

    test('minutes getter for floating point hours', () => {
        // Tests for issue #2978.
        // For certain floating point hours, .minutes() getter produced incorrect values due to the rounding errors
        expect(moment.duration(2.3, 'h').minutes(), 'minutes()').toBe(18);
        expect(moment.duration(4.1, 'h').minutes(), 'minutes()').toBe(6);
    });

    test('isDuration', () => {
        expect(
            moment.isDuration(moment.duration(12345678)),
            'correctly says true'
        ).toBeTruthy();
        expect(
            !moment.isDuration(moment()),
            'moment object is not a duration'
        ).toBeTruthy();
        expect(
            !moment.isDuration({ milliseconds: 1 }),
            'plain object is not a duration'
        ).toBeTruthy();
    });

    test('add', () => {
        var d = moment.duration({ months: 4, weeks: 3, days: 2 });
        // for some reason, d._data._months does not get updated; use d._months instead.
        expect(d.add(1, 'month')._months, 'Add months').toBe(5);
        expect(d.add(5, 'days')._days, 'Add days').toBe(28);
        expect(d.add(10000)._milliseconds, 'Add milliseconds').toBe(10000);
        expect(d.add({ h: 23, m: 59 })._milliseconds, 'Add hour:minute').toBe(
            23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 10000
        );
    });

    test('add to moment', () => {
        var d = moment.duration({ months: 1, seconds: -1 }),
            m = moment('2017-03-01').add(d);
        expect(m.month(), 'Adds months before time').toBe(2);
        expect(m.date(), 'Adds time after months').toBe(31);
    });

    test('add and bubble', () => {
        var d;

        expect(
            moment.duration(1, 'second').add(1000, 'milliseconds').seconds(),
            'Adding milliseconds should bubble up to seconds'
        ).toBe(2);
        expect(
            moment.duration(1, 'minute').add(60, 'second').minutes(),
            'Adding seconds should bubble up to minutes'
        ).toBe(2);
        expect(
            moment.duration(1, 'hour').add(60, 'minutes').hours(),
            'Adding minutes should bubble up to hours'
        ).toBe(2);
        expect(
            moment.duration(1, 'day').add(24, 'hours').days(),
            'Adding hours should bubble up to days'
        ).toBe(2);

        d = moment.duration(-1, 'day').add(1, 'hour');
        expect(d.hours(), '-1 day + 1 hour == -23 hour (component)').toBe(-23);
        expect(d.asHours(), '-1 day + 1 hour == -23 hours').toBe(-23);

        d = moment.duration(+1, 'day').add(1, 'hour');
        expect(d.hours(), '1 day + 1 hour == 1 hour (component)').toBe(1);
        expect(d.asHours(), '1 day + 1 hour == 25 hour').toBe(25);

        d = moment.duration(-1, 'year').add(1, 'day');
        expect(d.days(), '- 1 year + 1 day == -30 days (component)').toBe(-30);
        expect(d.months(), '- 1 year + 1 day == -11 months (component)').toBe(
            -11
        );
        expect(d.years(), '- 1 year + 1 day == 0 years (component)').toBe(0);
        expect(d.asDays(), '- 1 year + 1 day == -364 days').toBe(-364);

        d = moment.duration(+1, 'year').add(1, 'day');
        expect(d.days(), '+ 1 year + 1 day == 1 days (component)').toBe(1);
        expect(d.months(), '+ 1 year + 1 day == 0 month (component)').toBe(0);
        expect(d.years(), '+ 1 year + 1 day == 1 year (component)').toBe(1);
        expect(d.asDays(), '+ 1 year + 1 day == +366 day').toBe(366);

        d = moment.duration(-1, 'year').add(1, 'hour');
        expect(d.hours(), '- 1 year + 1 hour == -23 hours (component)').toBe(
            -23
        );
        expect(d.days(), '- 1 year + 1 hour == -30 days (component)').toBe(-30);
        expect(d.months(), '- 1 year + 1 hour == -11 months (component)').toBe(
            -11
        );
        expect(d.years(), '- 1 year + 1 hour == 0 years (component)').toBe(0);

        d = moment.duration(+1, 'year').add(1, 'hour');
        expect(d.hours(), '+ 1 year + 1 hour == 1 hour (component)').toBe(1);
        expect(d.days(), '+ 1 year + 1 hour == 1 day (component)').toBe(0);
        expect(d.months(), '+ 1 year + 1 hour == 1 month (component)').toBe(0);
        expect(d.years(), '+ 1 year + 1 hour == 1 year (component)').toBe(1);
    });

    test('subtract and bubble', () => {
        var d;

        expect(
            moment
                .duration(2, 'second')
                .subtract(1000, 'milliseconds')
                .seconds(),
            'Subtracting milliseconds should bubble up to seconds'
        ).toBe(1);
        expect(
            moment.duration(2, 'minute').subtract(60, 'second').minutes(),
            'Subtracting seconds should bubble up to minutes'
        ).toBe(1);
        expect(
            moment.duration(2, 'hour').subtract(60, 'minutes').hours(),
            'Subtracting minutes should bubble up to hours'
        ).toBe(1);
        expect(
            moment.duration(2, 'day').subtract(24, 'hours').days(),
            'Subtracting hours should bubble up to days'
        ).toBe(1);

        d = moment.duration(1, 'day').subtract(1, 'hour');
        expect(d.hours(), '1 day - 1 hour == 23 hour (component)').toBe(23);
        expect(d.asHours(), '1 day - 1 hour == 23 hours').toBe(23);

        d = moment.duration(1, 'year').subtract(1, 'day');
        expect(d.days(), '1 year - 1 day == 30 days (component)').toBe(30);
        expect(d.months(), '1 year - 1 day == 11 months (component)').toBe(11);
        expect(d.years(), '1 year - 1 day == 0 years (component)').toBe(0);
        expect(d.asDays(), '1 year - 1 day == 364 days').toBe(364);

        d = moment.duration(1, 'year').subtract(1, 'hour');
        expect(d.hours(), '1 year - 1 hour == 23 hours (component)').toBe(23);
        expect(d.days(), '1 year - 1 hour == 30 days (component)').toBe(30);
        expect(d.months(), '1 year - 1 hour == 11 months (component)').toBe(11);
        expect(d.years(), '1 year - 1 hour == 0 years (component)').toBe(0);
    });

    test('subtract', () => {
        var d = moment.duration({ months: 2, weeks: 2, days: 0, hours: 5 });
        // for some reason, d._data._months does not get updated; use d._months instead.
        expect(d.subtract(1, 'months')._months, 'Subtract months').toBe(1);
        expect(d.subtract(14, 'days')._days, 'Subtract days').toBe(0);
        expect(d.subtract(10000)._milliseconds, 'Subtract milliseconds').toBe(
            5 * 60 * 60 * 1000 - 10000
        );
        expect(
            d.subtract({ h: 1, m: 59 })._milliseconds,
            'Subtract hour:minute'
        ).toBe(3 * 60 * 60 * 1000 + 1 * 60 * 1000 - 10000);
    });

    test('JSON.stringify duration', () => {
        var d = moment.duration(1024, 'h');

        expect(
            JSON.stringify(d),
            'JSON.stringify on duration should return ISO string'
        ).toBe('"' + d.toISOString() + '"');
    });

    test('duration plugins', () => {
        var durationObject = moment.duration();
        moment.duration.fn.foo = function (arg) {
            expect(this).toBe(durationObject);
            expect(arg).toBe(5);
        };
        durationObject.foo(5);
    });

    test('valueOf and asMilliseconds have the same function', () => {
        var t1 = +moment.duration({ months: 2 }),
            t2 = moment.duration({ months: 2 }).asMilliseconds();
        expect(t1 === t2, 'the final value should be equal').toBeTruthy();
    });
});
