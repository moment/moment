import { describe, expect, test } from 'vitest';
import eachOwnProp from '../helpers/each-own-prop';
import moment from '../../src/moment';

describe('format', () => {
    test('format using constants', () => {
        var m = moment('2016-01-02T23:40:40.678');
        expect(
            m.format(moment.HTML5_FMT.DATETIME_LOCAL),
            'datetime local format constant'
        ).toBe('2016-01-02T23:40');
        expect(
            m.format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
            'datetime local format constant'
        ).toBe('2016-01-02T23:40:40');
        expect(
            m.format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
            'datetime local format constant with seconds and millis'
        ).toBe('2016-01-02T23:40:40.678');
        expect(m.format(moment.HTML5_FMT.DATE), 'date format constant').toBe(
            '2016-01-02'
        );
        expect(m.format(moment.HTML5_FMT.TIME), 'time format constant').toBe(
            '23:40'
        );
        expect(
            m.format(moment.HTML5_FMT.TIME_SECONDS),
            'time format constant with seconds'
        ).toBe('23:40:40');
        expect(
            m.format(moment.HTML5_FMT.TIME_MS),
            'time format constant with seconds and millis'
        ).toBe('23:40:40.678');
        expect(m.format(moment.HTML5_FMT.WEEK), 'week format constant').toBe(
            '2015-W53'
        );
        expect(m.format(moment.HTML5_FMT.MONTH), 'month format constant').toBe(
            '2016-01'
        );
    });

    test('format YY', () => {
        var b = moment(new Date(2009, 1, 14, 15, 25, 50, 125));
        expect(b.format('YY'), 'YY ---> 09').toBe('09');
    });

    test('format escape brackets', () => {
        moment.locale('en');

        var b = moment(new Date(2009, 1, 14, 15, 25, 50, 125));
        expect(b.format('[day]'), 'Single bracket').toBe('day');
        expect(b.format('[day] YY [YY]'), 'Double bracket').toBe('day 09 YY');
        expect(b.format('[YY'), 'Un-ended bracket').toBe('[09');
        expect(b.format('[[YY]]'), 'Double nested brackets').toBe('[YY]');
        expect(b.format('[[]'), 'Escape open bracket').toBe('[');
        expect(b.format('[Last]'), 'localized tokens').toBe('Last');
        expect(
            b.format('[L] L'),
            'localized tokens with escaped localized tokens'
        ).toBe('L 02/14/2009');
        expect(
            b.format('[L LL LLL LLLL aLa]'),
            'localized tokens with escaped localized tokens'
        ).toBe('L LL LLL LLLL aLa');
        expect(
            b.format('[LLL] LLL'),
            'localized tokens with escaped localized tokens (recursion)'
        ).toBe('LLL February 14, 2009 3:25 PM');
        expect(b.format('YYYY[\n]DD[\n]'), 'Newlines').toBe('2009\n14\n');
    });

    test('handle negative years', () => {
        moment.locale('en');
        expect(
            moment.utc().year(-1).format('YY'),
            'YY with negative year'
        ).toBe('-01');
        expect(
            moment.utc().year(-1).format('YYYY'),
            'YYYY with negative year'
        ).toBe('-0001');
        expect(
            moment.utc().year(-12).format('YY'),
            'YY with negative year'
        ).toBe('-12');
        expect(
            moment.utc().year(-12).format('YYYY'),
            'YYYY with negative year'
        ).toBe('-0012');
        expect(
            moment.utc().year(-123).format('YY'),
            'YY with negative year'
        ).toBe('-23');
        expect(
            moment.utc().year(-123).format('YYYY'),
            'YYYY with negative year'
        ).toBe('-0123');
        expect(
            moment.utc().year(-1234).format('YY'),
            'YY with negative year'
        ).toBe('-34');
        expect(
            moment.utc().year(-1234).format('YYYY'),
            'YYYY with negative year'
        ).toBe('-1234');
        expect(
            moment.utc().year(-12345).format('YY'),
            'YY with negative year'
        ).toBe('-45');
        expect(
            moment.utc().year(-12345).format('YYYY'),
            'YYYY with negative year'
        ).toBe('-12345');
    });

    test('format milliseconds', () => {
        var b = moment(new Date(2009, 1, 14, 15, 25, 50, 123));
        expect(b.format('S'), 'Deciseconds').toBe('1');
        expect(b.format('SS'), 'Centiseconds').toBe('12');
        expect(b.format('SSS'), 'Milliseconds').toBe('123');
        b.milliseconds(789);
        expect(b.format('S'), 'Deciseconds').toBe('7');
        expect(b.format('SS'), 'Centiseconds').toBe('78');
        expect(b.format('SSS'), 'Milliseconds').toBe('789');
    });

    test('format timezone', () => {
        var b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
        expect(
            b.format('Z').match(/^[\+\-]\d\d:\d\d$/),
            b.format('Z') + " should be something like '+07:30'"
        ).toBeTruthy();
        expect(
            b.format('ZZ').match(/^[\+\-]\d{4}$/),
            b.format('ZZ') + " should be something like '+0700'"
        ).toBeTruthy();
    });

    test('format multiple with utc offset', () => {
        var b = moment('2012-10-08 -1200', [
            'YYYY-MM-DD HH:mm ZZ',
            'YYYY-MM-DD ZZ',
            'YYYY-MM-DD',
        ]);
        expect(
            b.format('YYYY-MM'),
            'Parsing multiple formats should not crash with different sized formats'
        ).toBe('2012-10');
    });

    test('isDST', () => {
        var janOffset = new Date(2011, 0, 1).getTimezoneOffset(),
            julOffset = new Date(2011, 6, 1).getTimezoneOffset(),
            janIsDst = janOffset < julOffset,
            julIsDst = julOffset < janOffset,
            jan1 = moment([2011]),
            jul1 = moment([2011, 6]);

        if (janIsDst && julIsDst) {
            expect(0, 'January and July cannot both be in DST').toBeTruthy();
            expect(0, 'January and July cannot both be in DST').toBeTruthy();
        } else if (janIsDst) {
            expect(jan1.isDST(), 'January 1 is DST').toBeTruthy();
            expect(!jul1.isDST(), 'July 1 is not DST').toBeTruthy();
        } else if (julIsDst) {
            expect(!jan1.isDST(), 'January 1 is not DST').toBeTruthy();
            expect(jul1.isDST(), 'July 1 is DST').toBeTruthy();
        } else {
            expect(!jan1.isDST(), 'January 1 is not DST').toBeTruthy();
            expect(!jul1.isDST(), 'July 1 is not DST').toBeTruthy();
        }
    });

    test('unix timestamp', () => {
        var m = moment('1234567890.123', 'X');
        expect(m.format('X'), 'unix timestamp without milliseconds').toBe(
            '1234567890'
        );
        expect(m.format('X.S'), 'unix timestamp with deciseconds').toBe(
            '1234567890.1'
        );
        expect(m.format('X.SS'), 'unix timestamp with centiseconds').toBe(
            '1234567890.12'
        );
        expect(m.format('X.SSS'), 'unix timestamp with milliseconds').toBe(
            '1234567890.123'
        );

        m = moment(1234567890.123, 'X');
        expect(m.format('X'), 'unix timestamp as integer').toBe('1234567890');
    });

    test('unix offset milliseconds', () => {
        var m = moment('1234567890123', 'x');
        expect(m.format('x'), 'unix offset in milliseconds').toBe(
            '1234567890123'
        );

        m = moment(1234567890123, 'x');
        expect(m.format('x'), 'unix offset in milliseconds as integer').toBe(
            '1234567890123'
        );
    });

    test('utcOffset sanity checks', () => {
        expect(
            moment().utcOffset() % 15,
            'utc offset should be a multiple of 15 (was ' +
                moment().utcOffset() +
                ')'
        ).toBeCloseTo(0);

        expect(
            moment().utcOffset(),
            'utcOffset should return the opposite of getTimezoneOffset'
        ).toBe(-new Date().getTimezoneOffset());
    });

    test('default format', () => {
        var isoRegex = /\d{4}.\d\d.\d\dT\d\d.\d\d.\d\d[\+\-]\d\d:\d\d/;
        expect(
            isoRegex.exec(moment().format()),
            'default format (' + moment().format() + ') should match ISO'
        ).toBeTruthy();
    });

    test('default UTC format', () => {
        var isoRegex = /\d{4}.\d\d.\d\dT\d\d.\d\d.\d\dZ/;
        expect(
            isoRegex.exec(moment.utc().format()),
            'default UTC format (' +
                moment.utc().format() +
                ') should match ISO'
        ).toBeTruthy();
    });

    test('toJSON', () => {
        var supportsJson =
                typeof JSON !== 'undefined' &&
                JSON.stringify &&
                JSON.stringify.call,
            date = moment('2012-10-09T21:30:40.678+0100');

        expect(date.toJSON(), 'should output ISO8601 on moment.fn.toJSON').toBe(
            '2012-10-09T20:30:40.678Z'
        );

        if (supportsJson) {
            expect(
                JSON.stringify({
                    date: date,
                }),
                'should output ISO8601 on JSON.stringify'
            ).toBe('{"date":"2012-10-09T20:30:40.678Z"}');
        }
    });

    test('toISOString', () => {
        var date = moment.utc('2012-10-09T20:30:40.678');

        expect(
            date.toISOString(),
            'should output ISO8601 on moment.fn.toISOString'
        ).toBe('2012-10-09T20:30:40.678Z');

        // big years
        date = moment.utc('+020123-10-09T20:30:40.678');
        expect(date.toISOString(), 'ISO8601 format on big positive year').toBe(
            '+020123-10-09T20:30:40.678Z'
        );
        // negative years
        date = moment.utc('-000001-10-09T20:30:40.678');
        expect(date.toISOString(), 'ISO8601 format on negative year').toBe(
            '-000001-10-09T20:30:40.678Z'
        );
        // big negative years
        date = moment.utc('-020123-10-09T20:30:40.678');
        expect(date.toISOString(), 'ISO8601 format on big negative year').toBe(
            '-020123-10-09T20:30:40.678Z'
        );

        //invalid dates
        date = moment.utc('2017-12-32');
        expect(
            date.toISOString(),
            'An invalid date to iso string is null'
        ).toBe(null);
    });

    test('toISOString without UTC conversion', () => {
        var date = moment.utc('2016-12-31T19:53:45.678').utcOffset('+05:30');

        expect(
            date.toISOString(true),
            'should output ISO8601 on moment.fn.toISOString'
        ).toBe('2017-01-01T01:23:45.678+05:30');

        // big years
        date = moment.utc('+020122-12-31T19:53:45.678').utcOffset('+05:30');
        expect(
            date.toISOString(true),
            'ISO8601 format on big positive year'
        ).toBe('+020123-01-01T01:23:45.678+05:30');
        // negative years
        date = moment.utc('-000002-12-31T19:53:45.678').utcOffset('+05:30');
        expect(date.toISOString(true), 'ISO8601 format on negative year').toBe(
            '-000001-01-01T01:23:45.678+05:30'
        );
        // big negative years
        date = moment.utc('-020124-12-31T19:53:45.678').utcOffset('+05:30');
        expect(
            date.toISOString(true),
            'ISO8601 format on big negative year'
        ).toBe('-020123-01-01T01:23:45.678+05:30');

        //invalid dates
        date = moment.utc('2017-12-32').utcOffset('+05:30');
        expect(
            date.toISOString(true),
            'An invalid date to iso string is null'
        ).toBe(null);
    });

    // See https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
    test('inspect', () => {
        function roundtrip(m) {
            return new Function('moment', 'return ' + m.inspect())(moment);
        }
        function testInspect(date, string) {
            var inspected = date.inspect();
            expect(inspected).toBe(string);
            expect(
                date.isSame(roundtrip(date)),
                'Tried to parse ' + inspected
            ).toBeTruthy();
        }

        testInspect(
            moment('2012-10-09T20:30:40.678'),
            'moment("2012-10-09T20:30:40.678")'
        );
        testInspect(
            moment('+020123-10-09T20:30:40.678'),
            'moment("+020123-10-09T20:30:40.678")'
        );
        testInspect(
            moment.utc('2012-10-09T20:30:40.678'),
            'moment.utc("2012-10-09T20:30:40.678+00:00")'
        );
        testInspect(
            moment.utc('+020123-10-09T20:30:40.678'),
            'moment.utc("+020123-10-09T20:30:40.678+00:00")'
        );
        testInspect(
            moment.utc('+020123-10-09T20:30:40.678+01:00'),
            'moment.utc("+020123-10-09T19:30:40.678+00:00")'
        );
        testInspect(
            moment.parseZone('2016-06-11T17:30:40.678+0430'),
            'moment.parseZone("2016-06-11T17:30:40.678+04:30")'
        );
        testInspect(
            moment.parseZone('+112016-06-11T17:30:40.678+0430'),
            'moment.parseZone("+112016-06-11T17:30:40.678+04:30")'
        );

        expect(moment(new Date('nope')).inspect()).toBe(
            'moment.invalid(/* Invalid Date */)'
        );
        expect(moment('blah', 'YYYY').inspect()).toBe(
            'moment.invalid(/* blah */)'
        );
    });

    test('long years', () => {
        expect(
            moment.utc().year(2).format('YYYYYY'),
            'small year with YYYYYY'
        ).toBe('+000002');
        expect(
            moment.utc().year(2012).format('YYYYYY'),
            'regular year with YYYYYY'
        ).toBe('+002012');
        expect(
            moment.utc().year(20123).format('YYYYYY'),
            'big year with YYYYYY'
        ).toBe('+020123');

        expect(
            moment.utc().year(-1).format('YYYYYY'),
            'small negative year with YYYYYY'
        ).toBe('-000001');
        expect(
            moment.utc().year(-2012).format('YYYYYY'),
            'negative year with YYYYYY'
        ).toBe('-002012');
        expect(
            moment.utc().year(-20123).format('YYYYYY'),
            'big negative year with YYYYYY'
        ).toBe('-020123');
    });

    test('toISOString() when 0 year', () => {
        // https://github.com/moment/moment/issues/3765
        var date = moment('0000-01-01T21:00:00.000Z');
        expect(date.toISOString()).toBe('0000-01-01T21:00:00.000Z');
        expect(date.toDate().toISOString()).toBe('0000-01-01T21:00:00.000Z');
    });

    test('iso week formats', () => {
        // https://en.wikipedia.org/wiki/ISO_week_date
        var cases = {
            '2005-01-02': '2004-53',
            '2005-12-31': '2005-52',
            '2007-01-01': '2007-01',
            '2007-12-30': '2007-52',
            '2007-12-31': '2008-01',
            '2008-01-01': '2008-01',
            '2008-12-28': '2008-52',
            '2008-12-29': '2009-01',
            '2008-12-30': '2009-01',
            '2008-12-31': '2009-01',
            '2009-01-01': '2009-01',
            '2009-12-31': '2009-53',
            '2010-01-01': '2009-53',
            '2010-01-02': '2009-53',
            '2010-01-03': '2009-53',
            '404-12-31': '0404-53',
            '405-12-31': '0405-52',
        };

        eachOwnProp(cases, function (i) {
            var isoWeek, formatted2, formatted1;
            isoWeek = cases[i].split('-').pop();
            formatted2 = moment(i, 'YYYY-MM-DD').format('WW');
            expect(
                isoWeek,
                i + ': WW should be ' + isoWeek + ', but ' + formatted2
            ).toBe(formatted2);
            isoWeek = isoWeek.replace(/^0+/, '');
            formatted1 = moment(i, 'YYYY-MM-DD').format('W');
            expect(
                isoWeek,
                i + ': W should be ' + isoWeek + ', but ' + formatted1
            ).toBe(formatted1);
        });
    });

    test('iso week year formats', () => {
        // https://en.wikipedia.org/wiki/ISO_week_date
        var cases = {
            '2005-01-02': '2004-53',
            '2005-12-31': '2005-52',
            '2007-01-01': '2007-01',
            '2007-12-30': '2007-52',
            '2007-12-31': '2008-01',
            '2008-01-01': '2008-01',
            '2008-12-28': '2008-52',
            '2008-12-29': '2009-01',
            '2008-12-30': '2009-01',
            '2008-12-31': '2009-01',
            '2009-01-01': '2009-01',
            '2009-12-31': '2009-53',
            '2010-01-01': '2009-53',
            '2010-01-02': '2009-53',
            '2010-01-03': '2009-53',
            '404-12-31': '0404-53',
            '405-12-31': '0405-52',
        };

        eachOwnProp(cases, function (i) {
            var isoWeekYear, formatted5, formatted4, formatted2;
            isoWeekYear = cases[i].split('-')[0];
            formatted5 = moment(i, 'YYYY-MM-DD').format('GGGGG');
            expect(
                '0' + isoWeekYear,
                i + ': GGGGG should be ' + isoWeekYear + ', but ' + formatted5
            ).toBe(formatted5);
            formatted4 = moment(i, 'YYYY-MM-DD').format('GGGG');
            expect(
                isoWeekYear,
                i + ': GGGG should be ' + isoWeekYear + ', but ' + formatted4
            ).toBe(formatted4);
            formatted2 = moment(i, 'YYYY-MM-DD').format('GG');
            expect(
                isoWeekYear.slice(2, 4),
                i + ': GG should be ' + isoWeekYear + ', but ' + formatted2
            ).toBe(formatted2);
        });
    });

    test('week year formats', () => {
        // https://en.wikipedia.org/wiki/ISO_week_date
        var cases = {
            '2005-01-02': '2004-53',
            '2005-12-31': '2005-52',
            '2007-01-01': '2007-01',
            '2007-12-30': '2007-52',
            '2007-12-31': '2008-01',
            '2008-01-01': '2008-01',
            '2008-12-28': '2008-52',
            '2008-12-29': '2009-01',
            '2008-12-30': '2009-01',
            '2008-12-31': '2009-01',
            '2009-01-01': '2009-01',
            '2009-12-31': '2009-53',
            '2010-01-01': '2009-53',
            '2010-01-02': '2009-53',
            '2010-01-03': '2009-53',
            '404-12-31': '0404-53',
            '405-12-31': '0405-52',
        };

        moment.defineLocale('dow:1,doy:4', { week: { dow: 1, doy: 4 } });

        eachOwnProp(cases, function (i) {
            var isoWeekYear, formatted5, formatted4, formatted2;
            isoWeekYear = cases[i].split('-')[0];
            formatted5 = moment(i, 'YYYY-MM-DD').format('ggggg');
            expect(
                '0' + isoWeekYear,
                i + ': ggggg should be ' + isoWeekYear + ', but ' + formatted5
            ).toBe(formatted5);
            formatted4 = moment(i, 'YYYY-MM-DD').format('gggg');
            expect(
                isoWeekYear,
                i + ': gggg should be ' + isoWeekYear + ', but ' + formatted4
            ).toBe(formatted4);
            formatted2 = moment(i, 'YYYY-MM-DD').format('gg');
            expect(
                isoWeekYear.slice(2, 4),
                i + ': gg should be ' + isoWeekYear + ', but ' + formatted2
            ).toBe(formatted2);
        });
        moment.defineLocale('dow:1,doy:4', null);
    });

    test('iso weekday formats', () => {
        expect(
            moment([1985, 1, 4]).format('E'),
            'Feb  4 1985 is Monday    -- 1st day'
        ).toBe('1');
        expect(
            moment([2029, 8, 18]).format('E'),
            'Sep 18 2029 is Tuesday   -- 2nd day'
        ).toBe('2');
        expect(
            moment([2013, 3, 24]).format('E'),
            'Apr 24 2013 is Wednesday -- 3rd day'
        ).toBe('3');
        expect(
            moment([2015, 2, 5]).format('E'),
            'Mar  5 2015 is Thursday  -- 4th day'
        ).toBe('4');
        expect(
            moment([1970, 0, 2]).format('E'),
            'Jan  2 1970 is Friday    -- 5th day'
        ).toBe('5');
        expect(
            moment([2001, 4, 12]).format('E'),
            'May 12 2001 is Saturday  -- 6th day'
        ).toBe('6');
        expect(
            moment([2000, 0, 2]).format('E'),
            'Jan  2 2000 is Sunday    -- 7th day'
        ).toBe('7');
    });

    test('weekday formats', () => {
        moment.defineLocale('dow: 3,doy: 5', { week: { dow: 3, doy: 5 } });
        expect(
            moment([1985, 1, 6]).format('e'),
            'Feb  6 1985 is Wednesday -- 0th day'
        ).toBe('0');
        expect(
            moment([2029, 8, 20]).format('e'),
            'Sep 20 2029 is Thursday  -- 1st day'
        ).toBe('1');
        expect(
            moment([2013, 3, 26]).format('e'),
            'Apr 26 2013 is Friday    -- 2nd day'
        ).toBe('2');
        expect(
            moment([2015, 2, 7]).format('e'),
            'Mar  7 2015 is Saturday  -- 3nd day'
        ).toBe('3');
        expect(
            moment([1970, 0, 4]).format('e'),
            'Jan  4 1970 is Sunday    -- 4th day'
        ).toBe('4');
        expect(
            moment([2001, 4, 14]).format('e'),
            'May 14 2001 is Monday    -- 5th day'
        ).toBe('5');
        expect(
            moment([2000, 0, 4]).format('e'),
            'Jan  4 2000 is Tuesday   -- 6th day'
        ).toBe('6');
        moment.defineLocale('dow: 3,doy: 5', null);
    });

    test('toString is just human readable format', () => {
        var b = moment(new Date(2009, 1, 5, 15, 25, 50, 125));
        expect(b.toString()).toBe(b.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'));
    });

    test('toJSON skips postformat', () => {
        moment.defineLocale('postformat', {
            postformat: function (s) {
                s.replace(/./g, 'X');
            },
        });
        expect(
            moment.utc([2000, 0, 1]).toJSON(),
            "toJSON doesn't postformat"
        ).toBe('2000-01-01T00:00:00.000Z');
        moment.defineLocale('postformat', null);
    });

    test('calendar day timezone', () => {
        moment.locale('en');
        var zones = [60, -60, 90, -90, 360, -360, 720, -720],
            b = moment().utc().startOf('day').subtract({ m: 1 }),
            c = moment().local().startOf('day').subtract({ m: 1 }),
            d = moment().local().startOf('day').subtract({ d: 2 }),
            i,
            z,
            a;

        for (i = 0; i < zones.length; ++i) {
            z = zones[i];
            a = moment().utcOffset(z).startOf('day').subtract({ m: 1 });
            expect(
                moment(a).utcOffset(z).calendar(),
                'Yesterday at 11:59 PM, not Today, or the wrong time, tz = ' + z
            ).toBe('Yesterday at 11:59 PM');
        }

        expect(
            moment(b).utc().calendar(),
            'Yesterday at 11:59 PM, not Today, or the wrong time'
        ).toBe('Yesterday at 11:59 PM');
        expect(
            moment(c).local().calendar(),
            'Yesterday at 11:59 PM, not Today, or the wrong time'
        ).toBe('Yesterday at 11:59 PM');
        expect(
            moment(c).local().calendar(d),
            'Tomorrow at 11:59 PM, not Yesterday, or the wrong time'
        ).toBe('Tomorrow at 11:59 PM');
    });

    test('calendar with custom formats', () => {
        expect(moment().calendar(null, { sameDay: '[Today]' }), 'Today').toBe(
            'Today'
        );
        expect(
            moment().add(1, 'days').calendar(null, { nextDay: '[Tomorrow]' }),
            'Tomorrow'
        ).toBe('Tomorrow');
        expect(
            moment([1985, 1, 4]).calendar(null, { sameElse: 'YYYY-MM-DD' }),
            'Else'
        ).toBe('1985-02-04');
    });

    test('invalid', () => {
        expect(moment.invalid().format()).toBe('Invalid date');
        expect(moment.invalid().format('YYYY-MM-DD')).toBe('Invalid date');
    });

    test('quarter formats', () => {
        expect(moment([1985, 1, 4]).format('Q'), 'Feb  4 1985 is Q1').toBe('1');
        expect(moment([2029, 8, 18]).format('Q'), 'Sep 18 2029 is Q3').toBe(
            '3'
        );
        expect(moment([2013, 3, 24]).format('Q'), 'Apr 24 2013 is Q2').toBe(
            '2'
        );
        expect(moment([2015, 2, 5]).format('Q'), 'Mar  5 2015 is Q1').toBe('1');
        expect(moment([1970, 0, 2]).format('Q'), 'Jan  2 1970 is Q1').toBe('1');
        expect(moment([2001, 11, 12]).format('Q'), 'Dec 12 2001 is Q4').toBe(
            '4'
        );
        expect(
            moment([2000, 0, 2]).format('[Q]Q-YYYY'),
            'Jan  2 2000 is Q1'
        ).toBe('Q1-2000');
    });

    test('quarter ordinal formats', () => {
        expect(
            moment([1985, 1, 4]).format('Qo'),
            'Feb 4 1985 is 1st quarter'
        ).toBe('1st');
        expect(
            moment([2029, 8, 18]).format('Qo'),
            'Sep 18 2029 is 3rd quarter'
        ).toBe('3rd');
        expect(
            moment([2013, 3, 24]).format('Qo'),
            'Apr 24 2013 is 2nd quarter'
        ).toBe('2nd');
        expect(
            moment([2015, 2, 5]).format('Qo'),
            'Mar  5 2015 is 1st quarter'
        ).toBe('1st');
        expect(
            moment([1970, 0, 2]).format('Qo'),
            'Jan  2 1970 is 1st quarter'
        ).toBe('1st');
        expect(
            moment([2001, 11, 12]).format('Qo'),
            'Dec 12 2001 is 4th quarter'
        ).toBe('4th');
        expect(
            moment([2000, 0, 2]).format('Qo [quarter] YYYY'),
            'Jan  2 2000 is 1st quarter'
        ).toBe('1st quarter 2000');
    });

    // test('full expanded format is returned from abbreviated formats', function () {

    //     var locales =
    //         'ar-sa ar-tn ar az be bg bn bo br bs ca cs cv cy da de-at de dv el ' +
    //         'en-au en-ca en-gb en-ie en-nz eo es et eu fa fi fo fr-ca fr-ch fr fy ' +
    //         'gd gl he hi hr hu hy-am id is it ja jv ka kk km ko lb lo lt lv me mk ml ' +
    //         'mr ms-my ms my nb ne nl nn pl pt-br pt ro ru se si sk sl sq sr-cyrl ' +
    //         'sr sv sw ta te th tl-ph tlh tr tzl tzm-latn tzm uk uz vi zh-cn zh-tw';

    //     each(locales.split(' '), function (locale) {
    //         var data = moment().locale(locale).localeData()._longDateFormat;
    //         eachOwnProp(data, function (token) {
    //             // Check each format string to make sure it does not contain any
    //             // tokens that need to be expanded.
    //             each(tokens, function (i) {
    //                 // strip escaped sequences
    //                 var format = data[i].replace(/(\[[^\]]*\])/g, '');
    //             });
    //         });
    //     });
    // });

    test('milliseconds', () => {
        var m = moment('123', 'SSS');

        expect(m.format('S')).toBe('1');
        expect(m.format('SS')).toBe('12');
        expect(m.format('SSS')).toBe('123');
        expect(m.format('SSSS')).toBe('1230');
        expect(m.format('SSSSS')).toBe('12300');
        expect(m.format('SSSSSS')).toBe('123000');
        expect(m.format('SSSSSSS')).toBe('1230000');
        expect(m.format('SSSSSSSS')).toBe('12300000');
        expect(m.format('SSSSSSSSS')).toBe('123000000');
    });

    test('hmm and hmmss', () => {
        expect(moment('12:34:56', 'HH:mm:ss').format('hmm')).toBe('1234');
        expect(moment('01:34:56', 'HH:mm:ss').format('hmm')).toBe('134');
        expect(moment('13:34:56', 'HH:mm:ss').format('hmm')).toBe('134');

        expect(moment('12:34:56', 'HH:mm:ss').format('hmmss')).toBe('123456');
        expect(moment('01:34:56', 'HH:mm:ss').format('hmmss')).toBe('13456');
        expect(moment('13:34:56', 'HH:mm:ss').format('hmmss')).toBe('13456');
    });

    test('Hmm and Hmmss', () => {
        expect(moment('12:34:56', 'HH:mm:ss').format('Hmm')).toBe('1234');
        expect(moment('01:34:56', 'HH:mm:ss').format('Hmm')).toBe('134');
        expect(moment('13:34:56', 'HH:mm:ss').format('Hmm')).toBe('1334');

        expect(moment('12:34:56', 'HH:mm:ss').format('Hmmss')).toBe('123456');
        expect(moment('01:34:56', 'HH:mm:ss').format('Hmmss')).toBe('13456');
        expect(moment('08:34:56', 'HH:mm:ss').format('Hmmss')).toBe('83456');
        expect(moment('18:34:56', 'HH:mm:ss').format('Hmmss')).toBe('183456');
    });

    test('k and kk', () => {
        expect(moment('01:23:45', 'HH:mm:ss').format('k')).toBe('1');
        expect(moment('12:34:56', 'HH:mm:ss').format('k')).toBe('12');
        expect(moment('01:23:45', 'HH:mm:ss').format('kk')).toBe('01');
        expect(moment('12:34:56', 'HH:mm:ss').format('kk')).toBe('12');
        expect(moment('00:34:56', 'HH:mm:ss').format('kk')).toBe('24');
        expect(moment('00:00:00', 'HH:mm:ss').format('kk')).toBe('24');
    });

    test('Y token', () => {
        expect(
            moment('2010-01-01', 'YYYY-MM-DD', true).format('Y'),
            'format 2010 with Y'
        ).toBe('2010');
        expect(
            moment('-123-01-01', 'Y-MM-DD', true).format('Y'),
            'format -123 with Y'
        ).toBe('-0123');
        expect(
            moment('12345-01-01', 'Y-MM-DD', true).format('Y'),
            'format 12345 with Y'
        ).toBe('+12345');
        expect(
            moment('0-01-01', 'Y-MM-DD', true).format('Y'),
            'format 0 with Y'
        ).toBe('0000');
        expect(
            moment('1-01-01', 'Y-MM-DD', true).format('Y'),
            'format 1 with Y'
        ).toBe('0001');
        expect(
            moment('9999-01-01', 'Y-MM-DD', true).format('Y'),
            'format 9999 with Y'
        ).toBe('9999');
        expect(
            moment('10000-01-01', 'Y-MM-DD', true).format('Y'),
            'format 10000 with Y'
        ).toBe('+10000');
    });

    test('HTML5_FMT.WEEK', () => {
        expect(
            moment('2004-W01', moment.HTML5_FMT.WEEK).format(
                moment.HTML5_FMT.WEEK
            ),
            'issue #4698 regression'
        ).toBe('2004-W01');
        expect(
            moment('2019-W01').format(moment.HTML5_FMT.WEEK),
            'issue #4833 regression'
        ).toBe('2019-W01');
    });

    test('does not modify original moment instance', () => {
        let m = moment(0),
            original = moment(0);
        m.format('yyyy-MM-DD');
        expect(m.toISOString(), 'issue #5571 regression').toBe(
            original.toISOString()
        );

        expect(
            moment(new Date('2020-08-11 23:59:59'))
                .format('yyyy-MM-DD HH:mm:ss')
                .split(' '),
            'issue #5681 regression'
        ).toEqual(
            moment(new Date('2020-08-11 23:59:59'))
                .format('HH:mm:ss yyyy-MM-DD')
                .split(' ')
                .reverse()
        );
    });

    test('format strings matching Object prototype keys', () => {
        var m = moment([2025, 2, 16, 12, 34, 56, 789]);

        expect(
            m.format('constructor'),
            'constructor is treated as a format string'
        ).toBe('con56tructor');
        expect(
            m.format('toString'),
            'toString is treated as a format string'
        ).toBe('to7tring');
        expect(
            m.format('__proto__'),
            '__proto__ is treated as a format string'
        ).toBe('__proto__');
    });
});
