import { describe, expect, test } from 'vitest';
import eachOwnProp from '../helpers/each-own-prop';
import hasOwnProp from '../helpers/has-own-prop';
import moment from '../../src/moment';

describe('create', () => {
    test('array', () => {
        expect(moment([2010]).toDate() instanceof Date, '[2010]').toBeTruthy();
        expect(
            moment([2010, 1]).toDate() instanceof Date,
            '[2010, 1]'
        ).toBeTruthy();
        expect(
            moment([2010, 1, 12]).toDate() instanceof Date,
            '[2010, 1, 12]'
        ).toBeTruthy();
        expect(
            moment([2010, 1, 12, 1]).toDate() instanceof Date,
            '[2010, 1, 12, 1]'
        ).toBeTruthy();
        expect(
            moment([2010, 1, 12, 1, 1]).toDate() instanceof Date,
            '[2010, 1, 12, 1, 1]'
        ).toBeTruthy();
        expect(
            moment([2010, 1, 12, 1, 1, 1]).toDate() instanceof Date,
            '[2010, 1, 12, 1, 1, 1]'
        ).toBeTruthy();
        expect(
            moment([2010, 1, 12, 1, 1, 1, 1]).toDate() instanceof Date,
            '[2010, 1, 12, 1, 1, 1, 1]'
        ).toBeTruthy();
        expect(
            +moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            'constructing with array === constructing with new Date()'
        ).toBe(+moment([2010, 1, 14, 15, 25, 50, 125]));
    });

    test('array with invalid arguments', () => {
        expect(
            !moment([2010, null, null]).isValid(),
            '[2010, null, null]'
        ).toBeTruthy();
        expect(
            !moment([1945, null, null]).isValid(),
            '[1945, null, null] (pre-1970)'
        ).toBeTruthy();
    });

    test('array copying', () => {
        var importantArray = [2009, 11];
        moment(importantArray);
        expect(
            importantArray,
            'initializer should not mutate the original array'
        ).toEqual([2009, 11]);
    });

    test('object', () => {
        var fmt = 'YYYY-MM-DD HH:mm:ss.SSS',
            tests = [
                [{ year: 2010 }, '2010-01-01 00:00:00.000'],
                [{ year: 2010, month: 1 }, '2010-02-01 00:00:00.000'],
                [{ year: 2010, month: 1, day: 12 }, '2010-02-12 00:00:00.000'],
                [{ year: 2010, month: 1, date: 12 }, '2010-02-12 00:00:00.000'],
                [
                    { year: 2010, month: 1, day: 12, hours: 1 },
                    '2010-02-12 01:00:00.000',
                ],
                [
                    { year: 2010, month: 1, date: 12, hours: 1 },
                    '2010-02-12 01:00:00.000',
                ],
                [
                    { year: 2010, month: 1, day: 12, hours: 1, minutes: 1 },
                    '2010-02-12 01:01:00.000',
                ],
                [
                    { year: 2010, month: 1, date: 12, hours: 1, minutes: 1 },
                    '2010-02-12 01:01:00.000',
                ],
                [
                    {
                        year: 2010,
                        month: 1,
                        day: 12,
                        hours: 1,
                        minutes: 1,
                        seconds: 1,
                    },
                    '2010-02-12 01:01:01.000',
                ],
                [
                    {
                        year: 2010,
                        month: 1,
                        day: 12,
                        hours: 1,
                        minutes: 1,
                        seconds: 1,
                        milliseconds: 1,
                    },
                    '2010-02-12 01:01:01.001',
                ],
                [
                    {
                        years: 2010,
                        months: 1,
                        days: 14,
                        hours: 15,
                        minutes: 25,
                        seconds: 50,
                        milliseconds: 125,
                    },
                    '2010-02-14 15:25:50.125',
                ],
                [
                    {
                        year: 2010,
                        month: 1,
                        day: 14,
                        hour: 15,
                        minute: 25,
                        second: 50,
                        millisecond: 125,
                    },
                    '2010-02-14 15:25:50.125',
                ],
                [
                    { y: 2010, M: 1, d: 14, h: 15, m: 25, s: 50, ms: 125 },
                    '2010-02-14 15:25:50.125',
                ],
            ],
            i;
        for (i = 0; i < tests.length; ++i) {
            expect(moment(tests[i][0]).format(fmt)).toBe(tests[i][1]);
        }
    });

    test('invalid date for object with zero value date or day keys', () => {
        expect(moment({ date: '0' }).format()).toBe('Invalid date');
        expect(moment({ date: 0 }).format()).toBe('Invalid date');
        expect(moment({ day: '0' }).format()).toBe('Invalid date');
        expect(moment({ day: 0 }).format()).toBe('Invalid date');
    });

    test('multi format array copying', () => {
        var importantArray = ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY'];
        moment('1999-02-13', importantArray);
        expect(
            importantArray,
            'initializer should not mutate the original array'
        ).toEqual(['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY']);
    });

    test('number', () => {
        expect(moment(1000).toDate() instanceof Date, '1000').toBeTruthy();
        expect(moment(1000).valueOf(), 'asserting valueOf').toBe(1000);
        expect(moment.utc(1000).valueOf(), 'asserting valueOf').toBe(1000);
    });

    test('unix', () => {
        expect(
            moment.unix(1).valueOf(),
            '1 unix timestamp == 1000 Date.valueOf'
        ).toBe(1000);
        expect(
            moment(1000).unix(),
            '1000 Date.valueOf == 1 unix timestamp'
        ).toBe(1);
        expect(
            moment.unix(1000).valueOf(),
            '1000 unix timestamp == 1000000 Date.valueOf'
        ).toBe(1000000);
        expect(
            moment(1500).unix(),
            '1500 Date.valueOf == 1 unix timestamp'
        ).toBe(1);
        expect(
            moment(1900).unix(),
            '1900 Date.valueOf == 1 unix timestamp'
        ).toBe(1);
        expect(
            moment(2100).unix(),
            '2100 Date.valueOf == 2 unix timestamp'
        ).toBe(2);
        expect(
            moment(1333129333524).unix(),
            '1333129333524 Date.valueOf == 1333129333 unix timestamp'
        ).toBe(1333129333);
        expect(
            moment(1333129333524000).unix(),
            '1333129333524000 Date.valueOf == 1333129333524 unix timestamp'
        ).toBe(1333129333524);
    });

    test('date', () => {
        expect(
            moment(new Date()).toDate() instanceof Date,
            'new Date()'
        ).toBeTruthy();
        expect(
            moment(new Date(2016, 0, 1), 'YYYY-MM-DD').format('YYYY-MM-DD'),
            'If date is provided, format string is ignored'
        ).toBe('2016-01-01');
    });

    test('date with a format as an array', () => {
        var tests = [
                new Date(2016, 9, 27),
                new Date(2016, 9, 28),
                new Date(2016, 9, 29),
                new Date(2016, 9, 30),
                new Date(2016, 9, 31),
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(
                moment(tests[i]).format(),
                'Passing date with a format array should still return the correct date'
            ).toBe(moment(tests[i], ['MM/DD/YYYY'], false).format());
        }
    });

    test('date mutation', () => {
        var a = new Date();
        expect(
            moment(a).toDate() !== a,
            'the date moment uses should not be the date passed in'
        ).toBeTruthy();
    });

    test('moment', () => {
        expect(
            moment(moment()).toDate() instanceof Date,
            'moment(moment())'
        ).toBeTruthy();
        expect(
            moment(moment(moment())).toDate() instanceof Date,
            'moment(moment(moment()))'
        ).toBeTruthy();
    });

    test('cloning moment should only copy own properties', () => {
        expect(
            !hasOwnProp(moment().clone(), 'month'),
            'Should not clone prototype methods'
        ).toBeTruthy();
    });

    test('cloning moment works with weird clones', () => {
        var extend = function (a, b) {
                var i;
                for (i in b) {
                    a[i] = b[i];
                }
                return a;
            },
            now = moment(),
            nowu = moment.utc();

        expect(+extend({}, now).clone(), 'cloning extend-ed now is now').toBe(
            +now
        );
        expect(
            +extend({}, nowu).clone(),
            'cloning extend-ed utc now is utc now'
        ).toBe(+nowu);
    });

    test('cloning respects moment.momentProperties', () => {
        var m = moment();

        expect(m.clone()._special, 'cloning ignores extra properties').toBe(
            undefined
        );
        m._special = 'bacon';
        moment.momentProperties.push('_special');
        expect(m.clone()._special, 'cloning respects momentProperties').toBe(
            'bacon'
        );
        moment.momentProperties.pop();
    });

    test('undefined', () => {
        expect(moment().toDate() instanceof Date, 'undefined').toBeTruthy();
    });

    test('iso with bad input', () => {
        expect(
            !moment('a', moment.ISO_8601).isValid(),
            'iso parsing with invalid string'
        ).toBeTruthy();
        expect(
            !moment('a', moment.ISO_8601, true).isValid(),
            'iso parsing with invalid string, strict'
        ).toBeTruthy();
    });

    test('iso format 24hrs', () => {
        expect(
            moment('2014-01-01T24:00:00.000').format(
                'YYYY-MM-DD[T]HH:mm:ss.SSS'
            ),
            'iso format with 24:00 localtime'
        ).toBe('2014-01-02T00:00:00.000');
        expect(
            moment
                .utc('2014-01-01T24:00:00.000')
                .format('YYYY-MM-DD[T]HH:mm:ss.SSS'),
            'iso format with 24:00 utc'
        ).toBe('2014-01-02T00:00:00.000');
    });

    test('string without format - json', () => {
        expect(
            moment('Date(1325132654000)').valueOf(),
            'Date(1325132654000)'
        ).toBe(1325132654000);
        expect(
            moment('Date(-1325132654000)').valueOf(),
            'Date(-1325132654000)'
        ).toBe(-1325132654000);
        expect(
            moment('/Date(1325132654000)/').valueOf(),
            '/Date(1325132654000)/'
        ).toBe(1325132654000);
        expect(
            moment('/Date(1325132654000+0700)/').valueOf(),
            '/Date(1325132654000+0700)/'
        ).toBe(1325132654000);
        expect(
            moment('/Date(1325132654000-0700)/').valueOf(),
            '/Date(1325132654000-0700)/'
        ).toBe(1325132654000);
    });

    test('string without format - strict parsing', () => {
        expect(
            moment('Date(1325132654000)', false).valueOf(),
            'Date(1325132654000)'
        ).toBe(1325132654000);
        expect(
            moment('Date(1325132654000)', true).valueOf(),
            'Date(1325132654000)'
        ).toBe(1325132654000);
        expect(
            moment('/Date(1325132654000)/', true).valueOf(),
            '/Date(1325132654000)/'
        ).toBe(1325132654000);
        expect(moment('1/1/2001', true).isValid(), '1/1/2001').toBe(false);
        expect(moment.utc('1/1/2001', true).isValid(), '1/1/2001 utc').toBe(
            false
        );
    });

    test('string with format dropped am/pm bug', () => {
        moment.locale('en');

        expect(
            moment('05/1/2012 12:25:00', 'MM/DD/YYYY h:m:s a').format(
                'MM/DD/YYYY'
            ),
            'should not break if am/pm is left off from the parsing tokens'
        ).toBe('05/01/2012');
        expect(
            moment('05/1/2012 12:25:00 am', 'MM/DD/YYYY h:m:s a').format(
                'MM/DD/YYYY'
            ),
            'should not break if am/pm is left off from the parsing tokens'
        ).toBe('05/01/2012');
        expect(
            moment('05/1/2012 12:25:00 pm', 'MM/DD/YYYY h:m:s a').format(
                'MM/DD/YYYY'
            ),
            'should not break if am/pm is left off from the parsing tokens'
        ).toBe('05/01/2012');

        expect(
            moment('05/1/2012 12:25:00', 'MM/DD/YYYY h:m:s a').isValid()
        ).toBeTruthy();
        expect(
            moment('05/1/2012 12:25:00 am', 'MM/DD/YYYY h:m:s a').isValid()
        ).toBeTruthy();
        expect(
            moment('05/1/2012 12:25:00 pm', 'MM/DD/YYYY h:m:s a').isValid()
        ).toBeTruthy();
    });

    test('empty string with formats', () => {
        expect(moment('', 'MM').format('YYYY-MM-DD HH:mm:ss')).toBe(
            'Invalid date'
        );
        expect(moment(' ', 'MM').format('YYYY-MM-DD HH:mm:ss')).toBe(
            'Invalid date'
        );
        expect(moment(' ', 'DD').format('YYYY-MM-DD HH:mm:ss')).toBe(
            'Invalid date'
        );
        expect(moment(' ', ['MM', 'DD']).format('YYYY-MM-DD HH:mm:ss')).toBe(
            'Invalid date'
        );

        expect(!moment('', 'MM').isValid()).toBeTruthy();
        expect(!moment(' ', 'MM').isValid()).toBeTruthy();
        expect(!moment(' ', 'DD').isValid()).toBeTruthy();
        expect(!moment(' ', ['MM', 'DD']).isValid()).toBeTruthy();
    });

    test('undefined argument with formats', () => {
        expect(moment(undefined, 'MM').format('YYYY-MM-DD HH:mm:ss')).toBe(
            'Invalid date'
        );
        expect(moment(undefined, 'DD').format('YYYY-MM-DD HH:mm:ss')).toBe(
            'Invalid date'
        );
        expect(
            moment(undefined, ['MM', 'DD']).format('YYYY-MM-DD HH:mm:ss')
        ).toBe('Invalid date');

        expect(!moment(undefined, 'MM').isValid()).toBeTruthy();
        expect(!moment(undefined, 'MM').isValid()).toBeTruthy();
        expect(!moment(undefined, 'DD').isValid()).toBeTruthy();
        expect(!moment(undefined, ['MM', 'DD']).isValid()).toBeTruthy();
    });

    test('defaulting to current date', () => {
        var now = moment();
        expect(
            moment('12:13:14', 'hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'),
            'given only time default to current date'
        ).toBe(
            now
                .clone()
                .hour(12)
                .minute(13)
                .second(14)
                .format('YYYY-MM-DD hh:mm:ss')
        );
        expect(
            moment('05', 'DD').format('YYYY-MM-DD'),
            'given day of month default to current month, year'
        ).toBe(now.clone().date(5).format('YYYY-MM-DD'));
        expect(
            moment('05', 'MM').format('YYYY-MM-DD'),
            'given month default to current year'
        ).toBe(now.clone().month(4).date(1).format('YYYY-MM-DD'));
        expect(
            moment('1996', 'YYYY').format('YYYY-MM-DD'),
            'given year do not default'
        ).toBe(now.clone().year(1996).month(0).date(1).format('YYYY-MM-DD'));
    });

    test('matching am/pm', () => {
        expect(
            moment('2012-09-03T03:00PM', 'YYYY-MM-DDThh:mmA').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly for PM'
        ).toBe('2012-09-03T03:00PM');
        expect(
            moment('2012-09-03T03:00P.M.', 'YYYY-MM-DDThh:mmA').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly for P.M.'
        ).toBe('2012-09-03T03:00PM');
        expect(
            moment('2012-09-03T03:00P', 'YYYY-MM-DDThh:mmA').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly for P'
        ).toBe('2012-09-03T03:00PM');
        expect(
            moment('2012-09-03T03:00pm', 'YYYY-MM-DDThh:mmA').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly for pm'
        ).toBe('2012-09-03T03:00PM');
        expect(
            moment('2012-09-03T03:00p.m.', 'YYYY-MM-DDThh:mmA').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly for p.m.'
        ).toBe('2012-09-03T03:00PM');
        expect(
            moment('2012-09-03T03:00p', 'YYYY-MM-DDThh:mmA').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly for p'
        ).toBe('2012-09-03T03:00PM');

        expect(
            moment('2012-09-03T03:00AM', 'YYYY-MM-DDThh:mmA').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly for AM'
        ).toBe('2012-09-03T03:00AM');
        expect(
            moment('2012-09-03T03:00A.M.', 'YYYY-MM-DDThh:mmA').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly for A.M.'
        ).toBe('2012-09-03T03:00AM');
        expect(
            moment('2012-09-03T03:00A', 'YYYY-MM-DDThh:mmA').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly for A'
        ).toBe('2012-09-03T03:00AM');
        expect(
            moment('2012-09-03T03:00am', 'YYYY-MM-DDThh:mmA').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly for am'
        ).toBe('2012-09-03T03:00AM');
        expect(
            moment('2012-09-03T03:00a.m.', 'YYYY-MM-DDThh:mmA').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly for a.m.'
        ).toBe('2012-09-03T03:00AM');
        expect(
            moment('2012-09-03T03:00a', 'YYYY-MM-DDThh:mmA').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly for a'
        ).toBe('2012-09-03T03:00AM');

        expect(
            moment('5:00p.m.March 4 2012', 'h:mmAMMMM D YYYY').format(
                'YYYY-MM-DDThh:mmA'
            ),
            'am/pm should parse correctly before month names'
        ).toBe('2012-03-04T05:00PM');
    });

    test('string with format', () => {
        moment.locale('en');
        var a = [
                ['YYYY-Q', '2014-4'],
                ['MM-DD-YYYY', '12-02-1999'],
                ['DD-MM-YYYY', '12-02-1999'],
                ['DD/MM/YYYY', '12/02/1999'],
                ['DD_MM_YYYY', '12_02_1999'],
                ['DD:MM:YYYY', '12:02:1999'],
                ['D-M-YY', '2-2-99'],
                ['YY', '99'],
                ['DDD-YYYY', '300-1999'],
                ['DD-MM-YYYY h:m:s', '12-02-1999 2:45:10'],
                ['DD-MM-YYYY h:m:s a', '12-02-1999 2:45:10 am'],
                ['DD-MM-YYYY h:m:s a', '12-02-1999 2:45:10 pm'],
                ['h:mm a', '12:00 pm'],
                ['h:mm a', '12:30 pm'],
                ['h:mm a', '12:00 am'],
                ['h:mm a', '12:30 am'],
                ['HH:mm', '12:00'],
                ['kk:mm', '12:00'],
                ['YYYY-MM-DDTHH:mm:ss', '2011-11-11T11:11:11'],
                ['MM-DD-YYYY [M]', '12-02-1999 M'],
                ['ddd MMM DD HH:mm:ss YYYY', 'Tue Apr 07 22:52:51 2009'],
                ['HH:mm:ss', '12:00:00'],
                ['HH:mm:ss', '12:30:00'],
                ['HH:mm:ss', '00:00:00'],
                ['HH:mm:ss S', '00:30:00 1'],
                ['HH:mm:ss SS', '00:30:00 12'],
                ['HH:mm:ss SSS', '00:30:00 123'],
                ['HH:mm:ss S', '00:30:00 7'],
                ['HH:mm:ss SS', '00:30:00 78'],
                ['HH:mm:ss SSS', '00:30:00 789'],
                ['kk:mm:ss', '12:00:00'],
                ['kk:mm:ss', '12:30:00'],
                ['kk:mm:ss', '24:00:00'],
                ['kk:mm:ss S', '24:30:00 1'],
                ['kk:mm:ss SS', '24:30:00 12'],
                ['kk:mm:ss SSS', '24:30:00 123'],
                ['kk:mm:ss S', '24:30:00 7'],
                ['kk:mm:ss SS', '24:30:00 78'],
                ['kk:mm:ss SSS', '24:30:00 789'],
                ['X', '1234567890'],
                ['x', '1234567890123'],
                ['LT', '12:30 AM'],
                ['LTS', '12:30:29 AM'],
                ['L', '09/02/1999'],
                ['l', '9/2/1999'],
                ['LL', 'September 2, 1999'],
                ['ll', 'Sep 2, 1999'],
                ['LLL', 'September 2, 1999 12:30 AM'],
                ['lll', 'Sep 2, 1999 12:30 AM'],
                ['LLLL', 'Thursday, September 2, 1999 12:30 AM'],
                ['llll', 'Thu, Sep 2, 1999 12:30 AM'],
            ],
            m,
            i;

        for (i = 0; i < a.length; i++) {
            m = moment(a[i][1], a[i][0]);
            expect(m.isValid()).toBeTruthy();
            expect(m.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('2 digit year with YYYY format', () => {
        expect(
            moment('9/2/99', 'D/M/YYYY').format('DD/MM/YYYY'),
            'D/M/YYYY ---> 9/2/99'
        ).toBe('09/02/1999');
        expect(
            moment('9/2/1999', 'D/M/YYYY').format('DD/MM/YYYY'),
            'D/M/YYYY ---> 9/2/1999'
        ).toBe('09/02/1999');
        expect(
            moment('9/2/68', 'D/M/YYYY').format('DD/MM/YYYY'),
            'D/M/YYYY ---> 9/2/68'
        ).toBe('09/02/2068');
        expect(
            moment('9/2/69', 'D/M/YYYY').format('DD/MM/YYYY'),
            'D/M/YYYY ---> 9/2/69'
        ).toBe('09/02/1969');
    });

    test('unix timestamp format', () => {
        var formats = ['X', 'X.S', 'X.SS', 'X.SSS'],
            i,
            format;

        for (i = 0; i < formats.length; i++) {
            format = formats[i];
            expect(
                moment('1234567890', format).valueOf(),
                format + ' matches timestamp without milliseconds'
            ).toBe(1234567890 * 1000);
            expect(
                moment('1234567890.1', format).valueOf(),
                format + ' matches timestamp with deciseconds'
            ).toBe(1234567890 * 1000 + 100);
            expect(
                moment('1234567890.12', format).valueOf(),
                format + ' matches timestamp with centiseconds'
            ).toBe(1234567890 * 1000 + 120);
            expect(
                moment('1234567890.123', format).valueOf(),
                format + ' matches timestamp with milliseconds'
            ).toBe(1234567890 * 1000 + 123);
        }
    });

    test('unix offset milliseconds', () => {
        expect(
            moment('1234567890123', 'x').valueOf(),
            'x matches unix offset in milliseconds'
        ).toBe(1234567890123);
    });

    test('milliseconds format', () => {
        expect(moment('1', 'S').get('ms'), 'deciseconds').toBe(100);
        expect(moment('12', 'SS').get('ms'), 'centiseconds').toBe(120);
        expect(moment('123', 'SSS').get('ms'), 'milliseconds').toBe(123);
        expect(moment('1234', 'SSSS').get('ms'), 'milliseconds with SSSS').toBe(
            123
        );
        expect(
            moment('123456789101112', 'SSSS').get('ms'),
            'milliseconds with SSSS'
        ).toBe(123);
    });

    test('string with format no separators', () => {
        moment.locale('en');
        var a = [
                ['MMDDYYYY', '12021999'],
                ['DDMMYYYY', '12021999'],
                ['YYYYMMDD', '19991202'],
                ['DDMMMYYYY', '10Sep2001'],
            ],
            i;

        for (i = 0; i < a.length; i++) {
            expect(
                moment(a[i][1], a[i][0]).format(a[i][0]),
                a[i][0] + ' ---> ' + a[i][1]
            ).toBe(a[i][1]);
        }
    });

    test('string with format (timezone)', () => {
        expect(
            moment('5 -0700', 'H ZZ').toDate().getUTCHours(),
            "parse hours '5 -0700' ---> 'H ZZ'"
        ).toBe(12);
        expect(
            moment('5 -07:00', 'H Z').toDate().getUTCHours(),
            "parse hours '5 -07:00' ---> 'H Z'"
        ).toBe(12);
        expect(
            moment('5 -0730', 'H ZZ').toDate().getUTCMinutes(),
            "parse hours '5 -0730' ---> 'H ZZ'"
        ).toBe(30);
        expect(
            moment('5 -07:30', 'H Z').toDate().getUTCMinutes(),
            "parse hours '5 -07:0' ---> 'H Z'"
        ).toBe(30);
        expect(
            moment('5 +0100', 'H ZZ').toDate().getUTCHours(),
            "parse hours '5 +0100' ---> 'H ZZ'"
        ).toBe(4);
        expect(
            moment('5 +01:00', 'H Z').toDate().getUTCHours(),
            "parse hours '5 +01:00' ---> 'H Z'"
        ).toBe(4);
        expect(
            moment('5 +0130', 'H ZZ').toDate().getUTCMinutes(),
            "parse hours '5 +0130' ---> 'H ZZ'"
        ).toBe(30);
        expect(
            moment('5 +01:30', 'H Z').toDate().getUTCMinutes(),
            "parse hours '5 +01:30' ---> 'H Z'"
        ).toBe(30);
    });

    test('string with format (timezone offset)', () => {
        var a, b, c, d, e, f;
        a = new Date(Date.UTC(2011, 0, 1, 1));
        b = moment('2011 1 1 0 -01:00', 'YYYY MM DD HH Z');
        expect(
            a.getHours(),
            'date created with utc == parsed string with timezone offset'
        ).toBe(b.hours());
        expect(
            +a,
            'date created with utc == parsed string with timezone offset'
        ).toBe(+b);
        c = moment('2011 2 1 10 -05:00', 'YYYY MM DD HH Z');
        d = moment('2011 2 1 8 -07:00', 'YYYY MM DD HH Z');
        expect(c.hours(), '10 am central time == 8 am pacific time').toBe(
            d.hours()
        );
        e = moment.utc('20 07 2012 17:15:00', 'DD MM YYYY HH:mm:ss');
        f = moment.utc('20 07 2012 10:15:00 -0700', 'DD MM YYYY HH:mm:ss ZZ');
        expect(e.hours(), 'parse timezone offset in utc').toBe(f.hours());
    });

    test('string with timezone around start of year', () => {
        expect(
            moment('2000-01-01T00:00:00.000+01:00').toISOString(),
            '+1:00 around 2000'
        ).toBe('1999-12-31T23:00:00.000Z');
        expect(
            moment('2000-01-01T00:00:00.000-01:00').toISOString(),
            '-1:00 around 2000'
        ).toBe('2000-01-01T01:00:00.000Z');
        expect(
            moment('1970-01-01T00:00:00.000+01:00').toISOString(),
            '+1:00 around 1970'
        ).toBe('1969-12-31T23:00:00.000Z');
        expect(
            moment('1970-01-01T00:00:00.000-01:00').toISOString(),
            '-1:00 around 1970'
        ).toBe('1970-01-01T01:00:00.000Z');
        expect(
            moment('1200-01-01T00:00:00.000+01:00').toISOString(),
            '+1:00 around 1200'
        ).toBe('1199-12-31T23:00:00.000Z');
        expect(
            moment('1200-01-01T00:00:00.000-01:00').toISOString(),
            '-1:00 around 1200'
        ).toBe('1200-01-01T01:00:00.000Z');
    });

    test('string with array of formats', () => {
        var thursdayForCurrentWeek = moment().day(4).format('YYYY MM DD');

        expect(
            moment('11-02-1999', ['MM-DD-YYYY', 'DD-MM-YYYY']).format(
                'MM DD YYYY'
            ),
            'switching month and day'
        ).toBe('11 02 1999');
        expect(
            moment('02-11-1999', [
                'MM/DD/YYYY',
                'YYYY MM DD',
                'MM-DD-YYYY',
            ]).format('MM DD YYYY'),
            'year last'
        ).toBe('02 11 1999');
        expect(
            moment('1999-02-11', [
                'MM/DD/YYYY',
                'YYYY MM DD',
                'MM-DD-YYYY',
            ]).format('MM DD YYYY'),
            'year first'
        ).toBe('02 11 1999');

        expect(
            moment('02-11-1999', ['MM/DD/YYYY', 'YYYY MM DD']).format(
                'MM DD YYYY'
            ),
            'year last'
        ).toBe('02 11 1999');
        expect(
            moment('1999-02-11', ['MM/DD/YYYY', 'YYYY MM DD']).format(
                'MM DD YYYY'
            ),
            'year first'
        ).toBe('02 11 1999');
        expect(
            moment('02-11-1999', ['YYYY MM DD', 'MM/DD/YYYY']).format(
                'MM DD YYYY'
            ),
            'year last'
        ).toBe('02 11 1999');
        expect(
            moment('1999-02-11', ['YYYY MM DD', 'MM/DD/YYYY']).format(
                'MM DD YYYY'
            ),
            'year first'
        ).toBe('02 11 1999');

        expect(
            moment('13-11-1999', ['MM/DD/YYYY', 'DD/MM/YYYY']).format(
                'MM DD YYYY'
            ),
            'second must be month'
        ).toBe('11 13 1999');
        expect(
            moment('11-13-1999', ['MM/DD/YYYY', 'DD/MM/YYYY']).format(
                'MM DD YYYY'
            ),
            'first must be month'
        ).toBe('11 13 1999');
        expect(
            moment('01-02-2000', ['MM/DD/YYYY', 'DD/MM/YYYY']).format(
                'MM DD YYYY'
            ),
            'either can be a month, month first format'
        ).toBe('01 02 2000');
        expect(
            moment('02-01-2000', ['DD/MM/YYYY', 'MM/DD/YYYY']).format(
                'MM DD YYYY'
            ),
            'either can be a month, day first format'
        ).toBe('01 02 2000');

        expect(
            moment('11-02-10', ['MM/DD/YY', 'YY MM DD', 'DD-MM-YY']).format(
                'MM DD YYYY'
            ),
            'all unparsed substrings have influence on format penalty'
        ).toBe('02 11 2010');
        expect(
            moment('11-02-10', ['MM-DD-YY HH:mm', 'YY MM DD']).format(
                'MM DD YYYY'
            ),
            'prefer formats without extra tokens'
        ).toBe('02 10 2011');
        expect(
            moment('11-02-10 junk', ['MM-DD-YY', 'YY.MM.DD [junk]']).format(
                'MM DD YYYY'
            ),
            'prefer formats that dont result in extra characters'
        ).toBe('02 10 2011');
        expect(
            moment('11-22-10', ['YY-MM-DD', 'YY-DD-MM']).format('MM DD YYYY'),
            'prefer valid results'
        ).toBe('10 22 2011');

        expect(
            moment('gibberish', ['YY-MM-DD', 'YY-DD-MM']).format('MM DD YYYY'),
            'doest throw for invalid strings'
        ).toBe('Invalid date');
        expect(
            moment('gibberish', []).format('MM DD YYYY'),
            'doest throw for an empty array'
        ).toBe('Invalid date');

        // https://github.com/moment/moment/issues/1143
        expect(
            moment(
                'System Administrator and Database Assistant (7/1/2011), System Administrator and Database Assistant (7/1/2011), Database Coordinator (7/1/2011), Vice President (7/1/2011), System Administrator and Database Assistant (5/31/2012), Database Coordinator (7/1/2012), System Administrator and Database Assistant (7/1/2013)',
                [
                    'MM/DD/YYYY',
                    'MM-DD-YYYY',
                    'YYYY-MM-DD',
                    'YYYY-MM-DDTHH:mm:ssZ',
                ]
            ).format('YYYY-MM-DD'),
            'Works for long strings'
        ).toBe('2011-07-01');

        expect(
            moment('11-02-10', ['MM.DD.YY', 'DD-MM-YY']).format('MM DD YYYY'),
            'escape RegExp special characters on comparing'
        ).toBe('02 11 2010');

        expect(
            moment('13-10-98', ['DD MM YY', 'DD MM YYYY'])._f,
            'use two digit year'
        ).toBe('DD MM YY');
        expect(
            moment('13-10-1998', ['DD MM YY', 'DD MM YYYY'])._f,
            'use four digit year'
        ).toBe('DD MM YYYY');

        expect(
            moment('01', ['MM', 'DD'])._f,
            'Should use first valid format'
        ).toBe('MM');

        expect(
            moment('Thursday 8:30pm', ['dddd h:mma']).format(
                'YYYY MM DD dddd h:mma'
            ),
            'Default to current week'
        ).toBe(thursdayForCurrentWeek + ' Thursday 8:30pm');
    });

    test('string with array of formats + ISO', () => {
        expect(
            moment('1994', [moment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).year(),
            'iso: assert parse YYYY'
        ).toBe(1994);
        expect(
            moment('17:15', [moment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).hour(),
            'iso: assert parse HH:mm (1)'
        ).toBe(17);
        expect(
            moment('24:15', [moment.ISO_8601, 'MM', 'kk:mm', 'YYYY']).hour(),
            'iso: assert parse kk:mm'
        ).toBe(0);
        expect(
            moment('17:15', [moment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).minutes(),
            'iso: assert parse HH:mm (2)'
        ).toBe(15);
        expect(
            moment('06', [moment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).month(),
            'iso: assert parse MM'
        ).toBe(6 - 1);
        expect(
            moment('2012-06-01', [
                moment.ISO_8601,
                'MM',
                'HH:mm',
                'YYYY',
            ]).parsingFlags().iso,
            'iso: assert parse iso'
        ).toBe(true);
        expect(
            moment('2014-05-05', [moment.ISO_8601, 'YYYY-MM-DD']).parsingFlags()
                .iso,
            'iso: edge case array precedence iso'
        ).toBe(true);
        expect(
            moment('2014-05-05', ['YYYY-MM-DD', moment.ISO_8601]).parsingFlags()
                .iso,
            'iso: edge case array precedence not iso'
        ).toBe(false);
    });

    test('strict parsing invalid date against array of formats', () => {
        var b = moment(
            '2/30/2019 7:00pm',
            [
                'M/DD/YYYY h:mma", "MM/DD/YYYY h:mma", "M-D-YYYY h:mma", "MM-D-YYYY h:mma',
            ],
            true
        );
        expect(
            b.parsingFlags().parsedDateParts,
            'strict parsing multiple formats should still select the best format even if the date is invalid'
        ).toEqual([2019, 1, 30, 7, 0]);
    });

    test('string with format - years', () => {
        expect(moment('67', 'YY').format('YYYY'), '67 > 2067').toBe('2067');
        expect(moment('68', 'YY').format('YYYY'), '68 > 2068').toBe('2068');
        expect(moment('69', 'YY').format('YYYY'), '69 > 1969').toBe('1969');
        expect(moment('70', 'YY').format('YYYY'), '70 > 1970').toBe('1970');
    });

    test('implicit cloning', () => {
        var momentA = moment([2011, 10, 10]),
            momentB = moment(momentA);
        momentA.month(5);
        expect(
            momentA.month(),
            'Calling moment() on a moment will create a clone'
        ).not.toBe(momentB.month());
    });

    test('explicit cloning', () => {
        var momentA = moment([2011, 10, 10]),
            momentB = momentA.clone();
        momentA.month(5);
        expect(
            momentA.month(),
            'Calling clone() on a moment will create a clone'
        ).not.toBe(momentB.month());
    });

    test('cloning carrying over utc mode', () => {
        expect(
            moment().local().clone()._isUTC,
            'An explicit cloned local moment should have _isUTC == false'
        ).toBe(false);
        expect(
            moment().utc().clone()._isUTC,
            'An cloned utc moment should have _isUTC == true'
        ).toBe(true);
        expect(
            moment().clone()._isUTC,
            'An explicit cloned local moment should have _isUTC == false'
        ).toBe(false);
        expect(
            moment.utc().clone()._isUTC,
            'An explicit cloned utc moment should have _isUTC == true'
        ).toBe(true);
        expect(
            moment(moment().local())._isUTC,
            'An implicit cloned local moment should have _isUTC == false'
        ).toBe(false);
        expect(
            moment(moment().utc())._isUTC,
            'An implicit cloned utc moment should have _isUTC == true'
        ).toBe(true);
        expect(
            moment(moment())._isUTC,
            'An implicit cloned local moment should have _isUTC == false'
        ).toBe(false);
        expect(
            moment(moment.utc())._isUTC,
            'An implicit cloned utc moment should have _isUTC == true'
        ).toBe(true);
    });

    test('parsing RFC 2822', () => {
        var testCases = {
            'Tue, 01 Nov 2016 01:23:45 UT': [2016, 10, 1, 1, 23, 45, 0],
            'Sun, 12 Apr 2015 05:06:07 GMT': [2015, 3, 12, 5, 6, 7, 0],
            'Tue, 01 Nov 2016 01:23:45 +0000': [2016, 10, 1, 1, 23, 45, 0],
            'Tue, 01 Nov 16 04:23:45 Z': [2016, 10, 1, 4, 23, 45, 0],
            '01 Nov 2016 05:23:45 z': [2016, 10, 1, 5, 23, 45, 0],
            '(Init Comment) Tue,\n 1 Nov              2016 (Split\n Comment)  07:23:45 +0000 (GMT)':
                [2016, 10, 1, 7, 23, 45, 0],
            'Mon, 02 Jan 2017 06:00:00 -0800': [2017, 0, 2, 6, 0, 0, -8 * 60],
            'Mon, 02 Jan 2017 06:00:00 +0800': [2017, 0, 2, 6, 0, 0, +8 * 60],
            'Mon, 02 Jan 2017 06:00:00 +0330': [
                2017,
                0,
                2,
                6,
                0,
                0,
                +(3 * 60 + 30),
            ],
            'Mon, 02 Jan 2017 06:00:00 -0330': [
                2017,
                0,
                2,
                6,
                0,
                0,
                -(3 * 60 + 30),
            ],
            'Mon, 02 Jan 2017 06:00:00 PST': [2017, 0, 2, 6, 0, 0, -8 * 60],
            'Mon, 02 Jan 2017 06:00:00 PDT': [2017, 0, 2, 6, 0, 0, -7 * 60],
            'Mon, 02 Jan 2017 06:00:00 MST': [2017, 0, 2, 6, 0, 0, -7 * 60],
            'Mon, 02 Jan 2017 06:00:00 MDT': [2017, 0, 2, 6, 0, 0, -6 * 60],
            'Mon, 02 Jan 2017 06:00:00 CST': [2017, 0, 2, 6, 0, 0, -6 * 60],
            'Mon, 02 Jan 2017 06:00:00 CDT': [2017, 0, 2, 6, 0, 0, -5 * 60],
            'Mon, 02 Jan 2017 06:00:00 EST': [2017, 0, 2, 6, 0, 0, -5 * 60],
            'Mon, 02 Jan 2017 06:00:00 EDT': [2017, 0, 2, 6, 0, 0, -4 * 60],
        };

        eachOwnProp(testCases, function (inp) {
            var tokens = testCases[inp],
                parseResult = moment(inp, moment.RFC_2822, true).parseZone(),
                expResult = moment
                    .utc(tokens.slice(0, 6))
                    .utcOffset(tokens[6], true);
            expect(parseResult.isValid(), inp).toBeTruthy();
            expect(
                parseResult.parsingFlags().rfc2822,
                inp + ' - rfc2822 parsingFlag'
            ).toBeTruthy();
            expect(parseResult.utcOffset(), inp + ' - zone').toBe(
                expResult.utcOffset()
            );
            expect(parseResult.valueOf(), inp + ' - correctness').toBe(
                expResult.valueOf()
            );
        });
    });

    test('non RFC 2822 strings', () => {
        var testCases = {
            'RFC2822 datetime with all options but invalid day delimiter':
                'Tue. 01 Nov 2016 01:23:45 GMT',
            'RFC2822 datetime with mismatching Day (weekday v date)':
                'Mon, 01 Nov 2016 01:23:45 GMT',
        };

        eachOwnProp(testCases, function (testCase) {
            var testResult = moment(testCases[testCase], moment.RFC_2822, true);
            expect(
                !testResult.isValid(),
                testCase + ': ' + testResult + ' - is invalid rfc2822'
            ).toBeTruthy();
            expect(
                !testResult.parsingFlags().rfc2822,
                testCase + ': ' + testResult + ' - rfc2822 parsingFlag'
            ).toBeTruthy();
        });
    });

    test('parsing RFC 2822 in a different locale', () => {
        var testCases = {
            'clean RFC2822 datetime with all options':
                'Tue, 01 Nov 2016 01:23:45 UT',
            'clean RFC2822 datetime without comma':
                'Tue 01 Nov 2016 02:23:45 GMT',
            'clean RFC2822 datetime without seconds':
                'Tue, 01 Nov 2016 03:23 +0000',
            'clean RFC2822 datetime without century':
                'Tue, 01 Nov 16 04:23:45 Z',
            'clean RFC2822 datetime without day': '01 Nov 2016 05:23:45 z',
            'clean RFC2822 datetime with single-digit day-of-month':
                'Tue, 1 Nov 2016 06:23:45 GMT',
            'RFC2822 datetime with CFWSs':
                '(Init Comment) Tue,\n 1 Nov              2016 (Split\n Comment)  07:23:45 +0000 (GMT)',
        };

        try {
            moment.locale('ru');
            eachOwnProp(testCases, function (testCase) {
                var testResult = moment(
                    testCases[testCase],
                    moment.RFC_2822,
                    true
                );
                expect(testResult.isValid(), testResult).toBeTruthy();
                expect(
                    testResult.parsingFlags().rfc2822,
                    testResult + ' - rfc2822 parsingFlag'
                ).toBeTruthy();
            });
        } finally {
            moment.locale('en');
        }
    });

    test('non RFC 2822 strings in a different locale', () => {
        var testCases = {
            'RFC2822 datetime with all options but invalid day delimiter':
                'Tue. 01 Nov 2016 01:23:45 GMT',
            'RFC2822 datetime with mismatching Day (week v date)':
                'Mon, 01 Nov 2016 01:23:45 GMT',
        };

        try {
            moment.locale('ru');
            eachOwnProp(testCases, function (testCase) {
                var testResult = moment(
                    testCases[testCase],
                    moment.RFC_2822,
                    true
                );
                expect(!testResult.isValid(), testResult).toBeTruthy();
                expect(
                    !testResult.parsingFlags().rfc2822,
                    testResult + ' - rfc2822 parsingFlag'
                ).toBeTruthy();
            });
        } finally {
            moment.locale('en');
        }
    });

    test('parsing iso', () => {
        var offset = moment([2011, 9, 8]).utcOffset(),
            pad = function (input) {
                if (input < 10) {
                    return '0' + input;
                }
                return '' + input;
            },
            offStr = function (offset) {
                var hourOffset =
                        offset > 0
                            ? Math.floor(offset / 60)
                            : Math.ceil(offset / 60),
                    minOffset = offset - hourOffset * 60;
                return offset >= 0
                    ? '+' + pad(hourOffset) + ':' + pad(minOffset)
                    : '-' + pad(-hourOffset) + ':' + pad(-minOffset);
            },
            tz = offStr(offset),
            tz0 = offStr(moment([2011, 0, 1]).utcOffset()),
            tz2 = tz.replace(':', ''),
            tz3 = tz2.slice(0, 3),
            //Tz3 removes minutes digit so will break the tests when parsed if they all use the same minutes digit
            hourOffset =
                offset > 0 ? Math.floor(offset / 60) : Math.ceil(offset / 60),
            minOffset = offset - hourOffset * 60,
            minutesForTz3 = pad((4 + minOffset) % 60),
            // minute = pad(4 + minOffset),

            formats = [
                ['2011', '2011-01-01T00:00:00.000' + tz0],
                ['2011-10', '2011-10-01T00:00:00.000' + tz],
                ['2011-10-08', '2011-10-08T00:00:00.000' + tz],
                ['2011-10-08T18', '2011-10-08T18:00:00.000' + tz],
                ['2011-10-08T18:04', '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08T18:04:20', '2011-10-08T18:04:20.000' + tz],
                ['2011-10-08T18:04' + tz, '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08T18:04:20' + tz, '2011-10-08T18:04:20.000' + tz],
                ['2011-10-08T18:04' + tz2, '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08T18:04:20' + tz2, '2011-10-08T18:04:20.000' + tz],
                [
                    '2011-10-08T18:04' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz,
                ],
                [
                    '2011-10-08T18:04:20' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz,
                ],
                ['2011-10-08T18:04:20.1' + tz2, '2011-10-08T18:04:20.100' + tz],
                [
                    '2011-10-08T18:04:20.11' + tz2,
                    '2011-10-08T18:04:20.110' + tz,
                ],
                [
                    '2011-10-08T18:04:20.111' + tz2,
                    '2011-10-08T18:04:20.111' + tz,
                ],
                ['2011-10-08 18', '2011-10-08T18:00:00.000' + tz],
                ['2011-10-08 18:04', '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08 18:04:20', '2011-10-08T18:04:20.000' + tz],
                ['2011-10-08 18:04' + tz, '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08 18:04:20' + tz, '2011-10-08T18:04:20.000' + tz],
                ['2011-10-08 18:04' + tz2, '2011-10-08T18:04:00.000' + tz],
                ['2011-10-08 18:04:20' + tz2, '2011-10-08T18:04:20.000' + tz],
                [
                    '2011-10-08 18:04' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz,
                ],
                [
                    '2011-10-08 18:04:20' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz,
                ],
                ['2011-10-08 18:04:20.1' + tz2, '2011-10-08T18:04:20.100' + tz],
                [
                    '2011-10-08 18:04:20.11' + tz2,
                    '2011-10-08T18:04:20.110' + tz,
                ],
                [
                    '2011-10-08 18:04:20.111' + tz2,
                    '2011-10-08T18:04:20.111' + tz,
                ],
                ['2011-W40', '2011-10-03T00:00:00.000' + tz],
                ['2011-W40-6', '2011-10-08T00:00:00.000' + tz],
                ['2011-W40-6T18', '2011-10-08T18:00:00.000' + tz],
                ['2011-W40-6T18:04', '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6T18:04:20', '2011-10-08T18:04:20.000' + tz],
                ['2011-W40-6T18:04' + tz, '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6T18:04:20' + tz, '2011-10-08T18:04:20.000' + tz],
                ['2011-W40-6T18:04' + tz2, '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6T18:04:20' + tz2, '2011-10-08T18:04:20.000' + tz],
                [
                    '2011-W40-6T18:04' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz,
                ],
                [
                    '2011-W40-6T18:04:20' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz,
                ],
                ['2011-W40-6T18:04:20.1' + tz2, '2011-10-08T18:04:20.100' + tz],
                [
                    '2011-W40-6T18:04:20.11' + tz2,
                    '2011-10-08T18:04:20.110' + tz,
                ],
                [
                    '2011-W40-6T18:04:20.111' + tz2,
                    '2011-10-08T18:04:20.111' + tz,
                ],
                ['2011-W40-6 18', '2011-10-08T18:00:00.000' + tz],
                ['2011-W40-6 18:04', '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6 18:04:20', '2011-10-08T18:04:20.000' + tz],
                ['2011-W40-6 18:04' + tz, '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6 18:04:20' + tz, '2011-10-08T18:04:20.000' + tz],
                ['2011-W40-6 18:04' + tz2, '2011-10-08T18:04:00.000' + tz],
                ['2011-W40-6 18:04:20' + tz2, '2011-10-08T18:04:20.000' + tz],
                [
                    '2011-W40-6 18:04' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz,
                ],
                [
                    '2011-W40-6 18:04:20' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz,
                ],
                ['2011-W40-6 18:04:20.1' + tz2, '2011-10-08T18:04:20.100' + tz],
                [
                    '2011-W40-6 18:04:20.11' + tz2,
                    '2011-10-08T18:04:20.110' + tz,
                ],
                [
                    '2011-W40-6 18:04:20.111' + tz2,
                    '2011-10-08T18:04:20.111' + tz,
                ],
                ['2011-281', '2011-10-08T00:00:00.000' + tz],
                ['2011-281T18', '2011-10-08T18:00:00.000' + tz],
                ['2011-281T18:04', '2011-10-08T18:04:00.000' + tz],
                ['2011-281T18:04:20', '2011-10-08T18:04:20.000' + tz],
                ['2011-281T18:04' + tz, '2011-10-08T18:04:00.000' + tz],
                ['2011-281T18:04:20' + tz, '2011-10-08T18:04:20.000' + tz],
                ['2011-281T18:04' + tz2, '2011-10-08T18:04:00.000' + tz],
                ['2011-281T18:04:20' + tz2, '2011-10-08T18:04:20.000' + tz],
                [
                    '2011-281T18:04' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz,
                ],
                [
                    '2011-281T18:04:20' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz,
                ],
                ['2011-281T18:04:20.1' + tz2, '2011-10-08T18:04:20.100' + tz],
                ['2011-281T18:04:20.11' + tz2, '2011-10-08T18:04:20.110' + tz],
                ['2011-281T18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
                ['2011-281 18', '2011-10-08T18:00:00.000' + tz],
                ['2011-281 18:04', '2011-10-08T18:04:00.000' + tz],
                ['2011-281 18:04:20', '2011-10-08T18:04:20.000' + tz],
                ['2011-281 18:04' + tz, '2011-10-08T18:04:00.000' + tz],
                ['2011-281 18:04:20' + tz, '2011-10-08T18:04:20.000' + tz],
                ['2011-281 18:04' + tz2, '2011-10-08T18:04:00.000' + tz],
                ['2011-281 18:04:20' + tz2, '2011-10-08T18:04:20.000' + tz],
                [
                    '2011-281 18:04' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz,
                ],
                [
                    '2011-281 18:04:20' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz,
                ],
                ['2011-281 18:04:20.1' + tz2, '2011-10-08T18:04:20.100' + tz],
                ['2011-281 18:04:20.11' + tz2, '2011-10-08T18:04:20.110' + tz],
                ['2011-281 18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
                ['20111008T18', '2011-10-08T18:00:00.000' + tz],
                ['20111008T1804', '2011-10-08T18:04:00.000' + tz],
                ['20111008T180420', '2011-10-08T18:04:20.000' + tz],
                ['20111008T1804' + tz, '2011-10-08T18:04:00.000' + tz],
                ['20111008T180420' + tz, '2011-10-08T18:04:20.000' + tz],
                ['20111008T1804' + tz2, '2011-10-08T18:04:00.000' + tz],
                ['20111008T180420' + tz2, '2011-10-08T18:04:20.000' + tz],
                [
                    '20111008T1804' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz,
                ],
                [
                    '20111008T180420' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz,
                ],
                ['20111008T180420,1' + tz2, '2011-10-08T18:04:20.100' + tz],
                ['20111008T180420,11' + tz2, '2011-10-08T18:04:20.110' + tz],
                ['20111008T180420,111' + tz2, '2011-10-08T18:04:20.111' + tz],
                ['20111008 18', '2011-10-08T18:00:00.000' + tz],
                ['20111008 1804', '2011-10-08T18:04:00.000' + tz],
                ['20111008 180420', '2011-10-08T18:04:20.000' + tz],
                ['20111008 1804' + tz, '2011-10-08T18:04:00.000' + tz],
                ['20111008 180420' + tz, '2011-10-08T18:04:20.000' + tz],
                ['20111008 1804' + tz2, '2011-10-08T18:04:00.000' + tz],
                ['20111008 180420' + tz2, '2011-10-08T18:04:20.000' + tz],
                [
                    '20111008 1804' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz,
                ],
                [
                    '20111008 180420' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz,
                ],
                ['20111008 180420,1' + tz2, '2011-10-08T18:04:20.100' + tz],
                ['20111008 180420,11' + tz2, '2011-10-08T18:04:20.110' + tz],
                ['20111008 180420,111' + tz2, '2011-10-08T18:04:20.111' + tz],
                ['2011W40', '2011-10-03T00:00:00.000' + tz],
                ['2011W406', '2011-10-08T00:00:00.000' + tz],
                ['2011W406T18', '2011-10-08T18:00:00.000' + tz],
                ['2011W406T1804', '2011-10-08T18:04:00.000' + tz],
                ['2011W406T180420', '2011-10-08T18:04:20.000' + tz],
                ['2011W406 1804' + tz2, '2011-10-08T18:04:00.000' + tz],
                ['2011W406T1804' + tz, '2011-10-08T18:04:00.000' + tz],
                ['2011W406T180420' + tz, '2011-10-08T18:04:20.000' + tz],
                ['2011W406T1804' + tz2, '2011-10-08T18:04:00.000' + tz],
                ['2011W406T180420' + tz2, '2011-10-08T18:04:20.000' + tz],
                [
                    '2011W406T1804' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz,
                ],
                [
                    '2011W406T180420' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz,
                ],
                ['2011W406T180420,1' + tz2, '2011-10-08T18:04:20.100' + tz],
                ['2011W406T180420,11' + tz2, '2011-10-08T18:04:20.110' + tz],
                ['2011W406T180420,111' + tz2, '2011-10-08T18:04:20.111' + tz],
                ['2011W406 18', '2011-10-08T18:00:00.000' + tz],
                ['2011W406 1804', '2011-10-08T18:04:00.000' + tz],
                ['2011W406 180420', '2011-10-08T18:04:20.000' + tz],
                ['2011W406 1804' + tz, '2011-10-08T18:04:00.000' + tz],
                ['2011W406 180420' + tz, '2011-10-08T18:04:20.000' + tz],
                ['2011W406 180420' + tz2, '2011-10-08T18:04:20.000' + tz],
                [
                    '2011W406 1804' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz,
                ],
                [
                    '2011W406 180420' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz,
                ],
                ['2011W406 180420,1' + tz2, '2011-10-08T18:04:20.100' + tz],
                ['2011W406 180420,11' + tz2, '2011-10-08T18:04:20.110' + tz],
                ['2011W406 180420,111' + tz2, '2011-10-08T18:04:20.111' + tz],
                ['2011281', '2011-10-08T00:00:00.000' + tz],
                ['2011281T18', '2011-10-08T18:00:00.000' + tz],
                ['2011281T1804', '2011-10-08T18:04:00.000' + tz],
                ['2011281T180420', '2011-10-08T18:04:20.000' + tz],
                ['2011281T1804' + tz, '2011-10-08T18:04:00.000' + tz],
                ['2011281T180420' + tz, '2011-10-08T18:04:20.000' + tz],
                ['2011281T1804' + tz2, '2011-10-08T18:04:00.000' + tz],
                ['2011281T180420' + tz2, '2011-10-08T18:04:20.000' + tz],
                [
                    '2011281T1804' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz,
                ],
                [
                    '2011281T180420' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz,
                ],
                ['2011281T180420,1' + tz2, '2011-10-08T18:04:20.100' + tz],
                ['2011281T180420,11' + tz2, '2011-10-08T18:04:20.110' + tz],
                ['2011281T180420,111' + tz2, '2011-10-08T18:04:20.111' + tz],
                ['2011281 18', '2011-10-08T18:00:00.000' + tz],
                ['2011281 1804', '2011-10-08T18:04:00.000' + tz],
                ['2011281 180420', '2011-10-08T18:04:20.000' + tz],
                ['2011281 1804' + tz, '2011-10-08T18:04:00.000' + tz],
                ['2011281 180420' + tz, '2011-10-08T18:04:20.000' + tz],
                ['2011281 1804' + tz2, '2011-10-08T18:04:00.000' + tz],
                ['2011281 180420' + tz2, '2011-10-08T18:04:20.000' + tz],
                [
                    '2011281 1804' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz,
                ],
                [
                    '2011281 180420' + tz3,
                    '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz,
                ],
                ['2011281 180420,1' + tz2, '2011-10-08T18:04:20.100' + tz],
                ['2011281 180420,11' + tz2, '2011-10-08T18:04:20.110' + tz],
                ['2011281 180420,111' + tz2, '2011-10-08T18:04:20.111' + tz],
            ],
            i;
        for (i = 0; i < formats.length; i++) {
            expect(
                moment(formats[i][0]).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                'moment should be able to parse ISO ' + formats[i][0]
            ).toBe(formats[i][1]);
            expect(
                moment(formats[i][0], moment.ISO_8601).format(
                    'YYYY-MM-DDTHH:mm:ss.SSSZ'
                ),
                'moment should be able to parse specified ISO ' + formats[i][0]
            ).toBe(formats[i][1]);
            expect(
                moment(formats[i][0], moment.ISO_8601, true).format(
                    'YYYY-MM-DDTHH:mm:ss.SSSZ'
                ),
                'moment should be able to parse specified strict ISO ' +
                    formats[i][0]
            ).toBe(formats[i][1]);
        }
    });

    test('non iso 8601 strings', () => {
        expect(
            !moment('2015-10T10:15', moment.ISO_8601, true).isValid(),
            'incomplete date with time'
        ).toBeTruthy();
        expect(
            !moment('2015-W10T10:15', moment.ISO_8601, true).isValid(),
            'incomplete week date with time'
        ).toBeTruthy();
        expect(
            !moment('2015W10T1015', moment.ISO_8601, true).isValid(),
            'incomplete week date with time (basic)'
        ).toBeTruthy();
        expect(
            !moment('2015-10-08T1015', moment.ISO_8601, true).isValid(),
            'mixing extended and basic format'
        ).toBeTruthy();
        expect(
            !moment('20151008T10:15', moment.ISO_8601, true).isValid(),
            'mixing basic and extended format'
        ).toBeTruthy();
        expect(
            !moment('2015-10-1', moment.ISO_8601, true).isValid(),
            'missing zero padding for day'
        ).toBeTruthy();
    });

    test('parsing iso week year/week/weekday', () => {
        expect(
            moment.utc('2007-W01').format(),
            '2008 week 1 (1st Jan Mon)'
        ).toBe('2007-01-01T00:00:00Z');
        expect(
            moment.utc('2008-W01').format(),
            '2008 week 1 (1st Jan Tue)'
        ).toBe('2007-12-31T00:00:00Z');
        expect(
            moment.utc('2003-W01').format(),
            '2008 week 1 (1st Jan Wed)'
        ).toBe('2002-12-30T00:00:00Z');
        expect(
            moment.utc('2009-W01').format(),
            '2009 week 1 (1st Jan Thu)'
        ).toBe('2008-12-29T00:00:00Z');
        expect(
            moment.utc('2010-W01').format(),
            '2010 week 1 (1st Jan Fri)'
        ).toBe('2010-01-04T00:00:00Z');
        expect(
            moment.utc('2011-W01').format(),
            '2011 week 1 (1st Jan Sat)'
        ).toBe('2011-01-03T00:00:00Z');
        expect(
            moment.utc('2012-W01').format(),
            '2012 week 1 (1st Jan Sun)'
        ).toBe('2012-01-02T00:00:00Z');
    });

    test('parsing weekdays verifies the day', () => {
        // string with format
        expect(
            !moment('Wed 08-10-2017', 'ddd MM-DD-YYYY').isValid(),
            'because day of week is incorrect for the date'
        ).toBeTruthy();
        expect(
            moment('Thu 08-10-2017', 'ddd MM-DD-YYYY').isValid(),
            'because day of week is correct for the date'
        ).toBeTruthy();
    });

    test('parsing weekday on utc dates verifies day according to utc time', () => {
        expect(
            moment.utc('Mon 03:59', 'ddd HH:mm').isValid(),
            'Monday 03:59'
        ).toBeTruthy();
    });

    test('parsing weekday on local dates verifies day according to local time', () => {
        // this doesn't do much useful if you're not in the US or at least close to it
        expect(
            moment('Mon 03:59', 'ddd HH:mm').isValid(),
            'Monday 03:59'
        ).toBeTruthy();
    });

    test('parsing weekday on utc dates with specified offsets verifies day according to that offset', () => {
        expect(
            moment.utc('Mon 03:59 +12:00', 'ddd HH:mm Z', true).isValid(),
            'Monday 03:59'
        ).toBeTruthy();
    });

    test('parsing weekday on local dates with specified offsets verifies day according to that offset', () => {
        // if you're in the US, these times will all be sometime Sunday, but they should parse as Monday
        expect(
            moment('Mon 03:59 +12:00', 'ddd HH:mm Z', true).isValid(),
            'Monday 03:59'
        ).toBeTruthy();
    });

    test('parsing week year/week/weekday (dow 1, doy 4)', () => {
        moment.locale('dow:1,doy:4', { week: { dow: 1, doy: 4 } });

        expect(
            moment.utc('2007-01', 'gggg-ww').format(),
            '2007 week 1 (1st Jan Mon)'
        ).toBe('2007-01-01T00:00:00Z');
        expect(
            moment.utc('2008-01', 'gggg-ww').format(),
            '2008 week 1 (1st Jan Tue)'
        ).toBe('2007-12-31T00:00:00Z');
        expect(
            moment.utc('2003-01', 'gggg-ww').format(),
            '2003 week 1 (1st Jan Wed)'
        ).toBe('2002-12-30T00:00:00Z');
        expect(
            moment.utc('2009-01', 'gggg-ww').format(),
            '2009 week 1 (1st Jan Thu)'
        ).toBe('2008-12-29T00:00:00Z');
        expect(
            moment.utc('2010-01', 'gggg-ww').format(),
            '2010 week 1 (1st Jan Fri)'
        ).toBe('2010-01-04T00:00:00Z');
        expect(
            moment.utc('2011-01', 'gggg-ww').format(),
            '2011 week 1 (1st Jan Sat)'
        ).toBe('2011-01-03T00:00:00Z');
        expect(
            moment.utc('2012-01', 'gggg-ww').format(),
            '2012 week 1 (1st Jan Sun)'
        ).toBe('2012-01-02T00:00:00Z');

        moment.defineLocale('dow:1,doy:4', null);
    });

    test('parsing week year/week/weekday (dow 1, doy 7)', () => {
        moment.locale('dow:1,doy:7', { week: { dow: 1, doy: 7 } });

        expect(
            moment.utc('2007-01', 'gggg-ww').format(),
            '2007 week 1 (1st Jan Mon)'
        ).toBe('2007-01-01T00:00:00Z');
        expect(
            moment.utc('2008-01', 'gggg-ww').format(),
            '2008 week 1 (1st Jan Tue)'
        ).toBe('2007-12-31T00:00:00Z');
        expect(
            moment.utc('2003-01', 'gggg-ww').format(),
            '2003 week 1 (1st Jan Wed)'
        ).toBe('2002-12-30T00:00:00Z');
        expect(
            moment.utc('2009-01', 'gggg-ww').format(),
            '2009 week 1 (1st Jan Thu)'
        ).toBe('2008-12-29T00:00:00Z');
        expect(
            moment.utc('2010-01', 'gggg-ww').format(),
            '2010 week 1 (1st Jan Fri)'
        ).toBe('2009-12-28T00:00:00Z');
        expect(
            moment.utc('2011-01', 'gggg-ww').format(),
            '2011 week 1 (1st Jan Sat)'
        ).toBe('2010-12-27T00:00:00Z');
        expect(
            moment.utc('2012-01', 'gggg-ww').format(),
            '2012 week 1 (1st Jan Sun)'
        ).toBe('2011-12-26T00:00:00Z');
        moment.defineLocale('dow:1,doy:7', null);
    });

    test('parsing week year/week/weekday (dow 0, doy 6)', () => {
        moment.locale('dow:0,doy:6', { week: { dow: 0, doy: 6 } });

        expect(
            moment.utc('2007-01', 'gggg-ww').format(),
            '2007 week 1 (1st Jan Mon)'
        ).toBe('2006-12-31T00:00:00Z');
        expect(
            moment.utc('2008-01', 'gggg-ww').format(),
            '2008 week 1 (1st Jan Tue)'
        ).toBe('2007-12-30T00:00:00Z');
        expect(
            moment.utc('2003-01', 'gggg-ww').format(),
            '2003 week 1 (1st Jan Wed)'
        ).toBe('2002-12-29T00:00:00Z');
        expect(
            moment.utc('2009-01', 'gggg-ww').format(),
            '2009 week 1 (1st Jan Thu)'
        ).toBe('2008-12-28T00:00:00Z');
        expect(
            moment.utc('2010-01', 'gggg-ww').format(),
            '2010 week 1 (1st Jan Fri)'
        ).toBe('2009-12-27T00:00:00Z');
        expect(
            moment.utc('2011-01', 'gggg-ww').format(),
            '2011 week 1 (1st Jan Sat)'
        ).toBe('2010-12-26T00:00:00Z');
        expect(
            moment.utc('2012-01', 'gggg-ww').format(),
            '2012 week 1 (1st Jan Sun)'
        ).toBe('2012-01-01T00:00:00Z');
        moment.defineLocale('dow:0,doy:6', null);
    });

    test('parsing week year/week/weekday (dow 6, doy 12)', () => {
        moment.locale('dow:6,doy:12', { week: { dow: 6, doy: 12 } });

        expect(
            moment.utc('2007-01', 'gggg-ww').format(),
            '2007 week 1 (1st Jan Mon)'
        ).toBe('2006-12-30T00:00:00Z');
        expect(
            moment.utc('2008-01', 'gggg-ww').format(),
            '2008 week 1 (1st Jan Tue)'
        ).toBe('2007-12-29T00:00:00Z');
        expect(
            moment.utc('2003-01', 'gggg-ww').format(),
            '2003 week 1 (1st Jan Wed)'
        ).toBe('2002-12-28T00:00:00Z');
        expect(
            moment.utc('2009-01', 'gggg-ww').format(),
            '2009 week 1 (1st Jan Thu)'
        ).toBe('2008-12-27T00:00:00Z');
        expect(
            moment.utc('2010-01', 'gggg-ww').format(),
            '2010 week 1 (1st Jan Fri)'
        ).toBe('2009-12-26T00:00:00Z');
        expect(
            moment.utc('2011-01', 'gggg-ww').format(),
            '2011 week 1 (1st Jan Sat)'
        ).toBe('2011-01-01T00:00:00Z');
        expect(
            moment.utc('2012-01', 'gggg-ww').format(),
            '2012 week 1 (1st Jan Sun)'
        ).toBe('2011-12-31T00:00:00Z');
        moment.defineLocale('dow:6,doy:12', null);
    });

    test('parsing ISO with Z', () => {
        var i,
            mom,
            formats = [
                ['2011-10-08T18:04', '2011-10-08T18:04:00.000'],
                ['2011-10-08T18:04:20', '2011-10-08T18:04:20.000'],
                ['2011-10-08T18:04:20.1', '2011-10-08T18:04:20.100'],
                ['2011-10-08T18:04:20.11', '2011-10-08T18:04:20.110'],
                ['2011-10-08T18:04:20.111', '2011-10-08T18:04:20.111'],
                ['2011-W40-6T18', '2011-10-08T18:00:00.000'],
                ['2011-W40-6T18:04', '2011-10-08T18:04:00.000'],
                ['2011-W40-6T18:04:20', '2011-10-08T18:04:20.000'],
                ['2011-W40-6T18:04:20.1', '2011-10-08T18:04:20.100'],
                ['2011-W40-6T18:04:20.11', '2011-10-08T18:04:20.110'],
                ['2011-W40-6T18:04:20.111', '2011-10-08T18:04:20.111'],
                ['2011-281T18', '2011-10-08T18:00:00.000'],
                ['2011-281T18:04', '2011-10-08T18:04:00.000'],
                ['2011-281T18:04:20', '2011-10-08T18:04:20.000'],
                ['2011-281T18:04:20', '2011-10-08T18:04:20.000'],
                ['2011-281T18:04:20.1', '2011-10-08T18:04:20.100'],
                ['2011-281T18:04:20.11', '2011-10-08T18:04:20.110'],
                ['2011-281T18:04:20.111', '2011-10-08T18:04:20.111'],
            ];

        for (i = 0; i < formats.length; i++) {
            mom = moment(formats[i][0] + 'Z').utc();
            expect(
                mom.format('YYYY-MM-DDTHH:mm:ss.SSS'),
                'moment should be able to parse ISO in UTC ' +
                    formats[i][0] +
                    'Z'
            ).toBe(formats[i][1]);

            mom = moment(formats[i][0] + ' Z').utc();
            expect(
                mom.format('YYYY-MM-DDTHH:mm:ss.SSS'),
                'moment should be able to parse ISO in UTC ' +
                    formats[i][0] +
                    ' Z'
            ).toBe(formats[i][1]);
        }
    });

    test('parsing iso with T', () => {
        expect(
            moment('2011-10-08T18')._f,
            "should include 'T' in the format"
        ).toBe('YYYY-MM-DDTHH');
        expect(
            moment('2011-10-08T18:20')._f,
            "should include 'T' in the format"
        ).toBe('YYYY-MM-DDTHH:mm');
        expect(
            moment('2011-10-08T18:20:13')._f,
            "should include 'T' in the format"
        ).toBe('YYYY-MM-DDTHH:mm:ss');
        expect(
            moment('2011-10-08T18:20:13.321')._f,
            "should include 'T' in the format"
        ).toBe('YYYY-MM-DDTHH:mm:ss.SSSS');

        expect(
            moment('2011-10-08 18')._f,
            "should not include 'T' in the format"
        ).toBe('YYYY-MM-DD HH');
        expect(
            moment('2011-10-08 18:20')._f,
            "should not include 'T' in the format"
        ).toBe('YYYY-MM-DD HH:mm');
        expect(
            moment('2011-10-08 18:20:13')._f,
            "should not include 'T' in the format"
        ).toBe('YYYY-MM-DD HH:mm:ss');
        expect(
            moment('2011-10-08 18:20:13.321')._f,
            "should not include 'T' in the format"
        ).toBe('YYYY-MM-DD HH:mm:ss.SSSS');
    });

    test('parsing iso Z timezone', () => {
        var i,
            formats = [
                ['2011-10-08T18:04Z', '2011-10-08T18:04:00.000+00:00'],
                ['2011-10-08T18:04:20Z', '2011-10-08T18:04:20.000+00:00'],
                ['2011-10-08T18:04:20.111Z', '2011-10-08T18:04:20.111+00:00'],
            ];
        for (i = 0; i < formats.length; i++) {
            expect(
                moment.utc(formats[i][0]).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                'moment should be able to parse ISO ' + formats[i][0]
            ).toBe(formats[i][1]);
        }
    });

    test('parsing iso Z timezone into local', () => {
        var m = moment('2011-10-08T18:04:20.111Z');

        expect(
            m.utc().format('YYYY-MM-DDTHH:mm:ss.SSS'),
            'moment should be able to parse ISO 2011-10-08T18:04:20.111Z'
        ).toBe('2011-10-08T18:04:20.111');
    });

    test('parsing iso with more subsecond precision digits', () => {
        expect(
            moment.utc('2013-07-31T22:00:00.0000000Z').format(),
            'more than 3 subsecond digits'
        ).toBe('2013-07-31T22:00:00Z');
    });

    test('null or empty', () => {
        expect(moment('').isValid(), "moment('') is not valid").toBe(false);
        expect(moment(null).isValid(), 'moment(null) is not valid').toBe(false);
        expect(
            moment(null, 'YYYY-MM-DD').isValid(),
            "moment('', 'format') is not valid"
        ).toBe(false);
        expect(
            moment('', 'YYYY-MM-DD').isValid(),
            "moment('', 'format') is not valid"
        ).toBe(false);
        expect(moment.utc('').isValid(), "moment.utc('') is not valid").toBe(
            false
        );
        expect(
            moment.utc(null).isValid(),
            'moment.utc(null) is not valid'
        ).toBe(false);
        expect(
            moment.utc(null, 'YYYY-MM-DD').isValid(),
            'moment.utc(null) is not valid'
        ).toBe(false);
        expect(
            moment.utc('', 'YYYY-MM-DD').isValid(),
            "moment.utc('', 'YYYY-MM-DD') is not valid"
        ).toBe(false);
    });

    test('first century', () => {
        expect(moment([0, 0, 1]).format('YYYY-MM-DD'), 'Year AD 0').toBe(
            '0000-01-01'
        );
        expect(moment([99, 0, 1]).format('YYYY-MM-DD'), 'Year AD 99').toBe(
            '0099-01-01'
        );
        expect(moment([999, 0, 1]).format('YYYY-MM-DD'), 'Year AD 999').toBe(
            '0999-01-01'
        );
        expect(
            moment('0 1 1', 'YYYY MM DD').format('YYYY-MM-DD'),
            'Year AD 0'
        ).toBe('0000-01-01');
        expect(
            moment('999 1 1', 'YYYY MM DD').format('YYYY-MM-DD'),
            'Year AD 999'
        ).toBe('0999-01-01');
        expect(
            moment('0 1 1', 'YYYYY MM DD').format('YYYYY-MM-DD'),
            'Year AD 0'
        ).toBe('00000-01-01');
        expect(
            moment('99 1 1', 'YYYYY MM DD').format('YYYYY-MM-DD'),
            'Year AD 99'
        ).toBe('00099-01-01');
        expect(
            moment('999 1 1', 'YYYYY MM DD').format('YYYYY-MM-DD'),
            'Year AD 999'
        ).toBe('00999-01-01');
    });

    test('six digit years', () => {
        expect(
            moment([-270000, 0, 1]).format('YYYYY-MM-DD'),
            'format BC 270,001'
        ).toBe('-270000-01-01');
        expect(
            moment([270000, 0, 1]).format('YYYYY-MM-DD'),
            'format AD 270,000'
        ).toBe('270000-01-01');
        expect(
            moment('-270000-01-01', 'YYYYY-MM-DD').toDate().getFullYear(),
            'parse BC 270,001'
        ).toBe(-270000);
        expect(
            moment('270000-01-01', 'YYYYY-MM-DD').toDate().getFullYear(),
            'parse AD 270,000'
        ).toBe(270000);
        expect(
            moment('+270000-01-01', 'YYYYY-MM-DD').toDate().getFullYear(),
            'parse AD +270,000'
        ).toBe(270000);
        expect(
            moment
                .utc('-270000-01-01', 'YYYYY-MM-DD')
                .toDate()
                .getUTCFullYear(),
            'parse utc BC 270,001'
        ).toBe(-270000);
        expect(
            moment.utc('270000-01-01', 'YYYYY-MM-DD').toDate().getUTCFullYear(),
            'parse utc AD 270,000'
        ).toBe(270000);
        expect(
            moment
                .utc('+270000-01-01', 'YYYYY-MM-DD')
                .toDate()
                .getUTCFullYear(),
            'parse utc AD +270,000'
        ).toBe(270000);
    });

    test('negative four digit years', () => {
        expect(
            moment('-1000-01-01', 'YYYYY-MM-DD').toDate().getFullYear(),
            'parse BC 1,001'
        ).toBe(-1000);
        expect(
            moment.utc('-1000-01-01', 'YYYYY-MM-DD').toDate().getUTCFullYear(),
            'parse utc BC 1,001'
        ).toBe(-1000);
    });

    test('strict parsing', () => {
        expect(
            moment('2014-', 'YYYY-Q', true).isValid(),
            'fail missing quarter'
        ).toBe(false);

        expect(
            moment('2012-05', 'YYYY-MM', true).format('YYYY-MM'),
            'parse correct string'
        ).toBe('2012-05');
        expect(
            moment(' 2012-05', 'YYYY-MM', true).isValid(),
            'fail on extra whitespace'
        ).toBe(false);
        expect(
            moment('foo 2012-05', '[foo] YYYY-MM', true).format('YYYY-MM'),
            'handle fixed text'
        ).toBe('2012-05');
        expect(
            moment('2012 05', 'YYYY-MM', true).isValid(),
            'fail on different separator'
        ).toBe(false);
        expect(
            moment('2012 05', 'YYYY MM DD', true).isValid(),
            'fail on too many tokens'
        ).toBe(false);

        expect(
            moment('05 30 2010', ['DD MM YYYY', 'MM DD YYYY'], true).format(
                'MM DD YYYY'
            ),
            'array with bad date'
        ).toBe('05 30 2010');
        expect(
            moment('05 30 2010', ['', 'MM DD YYYY'], true).format('MM DD YYYY'),
            'array with invalid format'
        ).toBe('05 30 2010');
        expect(
            moment('05 30 2010', [' DD MM YYYY', 'MM DD YYYY'], true).format(
                'MM DD YYYY'
            ),
            'array with non-matching format'
        ).toBe('05 30 2010');

        expect(
            moment('2010.*...', 'YYYY.*', true).isValid(),
            'invalid format with regex chars'
        ).toBe(false);
        expect(
            moment('2010.*', 'YYYY.*', true).year(),
            'valid format with regex chars'
        ).toBe(2010);
        expect(
            moment('.*2010.*', '.*YYYY.*', true).year(),
            'valid format with regex chars on both sides'
        ).toBe(2010);

        //strict tokens
        expect(
            moment('-5-05-25', 'YYYY-MM-DD', true).isValid(),
            'invalid negative year'
        ).toBe(false);
        expect(
            moment('2-05-25', 'YYYY-MM-DD', true).isValid(),
            'invalid one-digit year'
        ).toBe(false);
        expect(
            moment('20-05-25', 'YYYY-MM-DD', true).isValid(),
            'invalid two-digit year'
        ).toBe(false);
        expect(
            moment('201-05-25', 'YYYY-MM-DD', true).isValid(),
            'invalid three-digit year'
        ).toBe(false);
        expect(
            moment('2010-05-25', 'YYYY-MM-DD', true).isValid(),
            'valid four-digit year'
        ).toBe(true);
        expect(
            moment('22010-05-25', 'YYYY-MM-DD', true).isValid(),
            'invalid five-digit year'
        ).toBe(false);

        expect(
            moment('12-05-25', 'YY-MM-DD', true).isValid(),
            'valid two-digit year'
        ).toBe(true);
        expect(
            moment('2012-05-25', 'YY-MM-DD', true).isValid(),
            'invalid four-digit year'
        ).toBe(false);

        expect(
            moment('-5-05-25', 'Y-MM-DD', true).isValid(),
            'valid negative year'
        ).toBe(true);
        expect(
            moment('2-05-25', 'Y-MM-DD', true).isValid(),
            'valid one-digit year'
        ).toBe(true);
        expect(
            moment('20-05-25', 'Y-MM-DD', true).isValid(),
            'valid two-digit year'
        ).toBe(true);
        expect(
            moment('201-05-25', 'Y-MM-DD', true).isValid(),
            'valid three-digit year'
        ).toBe(true);

        expect(
            moment('2012-5-25', 'YYYY-M-DD', true).isValid(),
            'valid one-digit month'
        ).toBe(true);
        expect(
            moment('2012-5-25', 'YYYY-MM-DD', true).isValid(),
            'invalid one-digit month'
        ).toBe(false);
        expect(
            moment('2012-05-25', 'YYYY-M-DD', true).isValid(),
            'isValid one-digit month'
        ).toBe(false);
        expect(
            moment('2012-05-25', 'YYYY-MM-DD', true).isValid(),
            'valid one-digit month'
        ).toBe(true);

        expect(
            moment('2012-05-2', 'YYYY-MM-D', true).isValid(),
            'valid one-digit day'
        ).toBe(true);
        expect(
            moment('2012-05-2', 'YYYY-MM-DD', true).isValid(),
            'invalid one-digit day'
        ).toBe(false);
        expect(
            moment('2012-05-02', 'YYYY-MM-D', true).isValid(),
            'isValid two-digit day'
        ).toBe(false);
        expect(
            moment('2012-05-02', 'YYYY-MM-DD', true).isValid(),
            'valid two-digit day'
        ).toBe(true);

        expect(
            moment('+002012-05-25', 'YYYYY-MM-DD', true).isValid(),
            'valid six-digit year'
        ).toBe(true);
        expect(
            moment('+2012-05-25', 'YYYYY-MM-DD', true).isValid(),
            'invalid four-digit year'
        ).toBe(false);

        //thse are kinda pointless, but they should work as expected
        expect(
            moment('1', 'S', true).isValid(),
            'valid one-digit milisecond'
        ).toBe(true);
        expect(
            moment('12', 'S', true).isValid(),
            'invalid two-digit milisecond'
        ).toBe(false);
        expect(
            moment('123', 'S', true).isValid(),
            'invalid three-digit milisecond'
        ).toBe(false);

        expect(
            moment('2002-05-02 09:30:26', 'YYYY-MM-DD H:mm:ss', true).isValid(),
            'invalid two-digit hour'
        ).toBe(false);

        expect(
            moment('2002-05-02 11:30:26', 'YYYY-MM-DD H:mm:ss', true).isValid(),
            'valid two-digit hour'
        ).toBe(true);

        expect(
            moment('2002-05-02 09:30:26', 'YYYY-MM-DD h:mm:ss', true).isValid(),
            'invalid two-digit hour'
        ).toBe(false);

        expect(
            moment('2002-05-02 11:30:26', 'YYYY-MM-DD h:mm:ss', true).isValid(),
            'valid two-digit hour'
        ).toBe(true);

        expect(
            moment('2002-05-02 09:30:26', 'YYYY-MM-DD k:mm:ss', true).isValid(),
            'invalid two-digit hour'
        ).toBe(false);

        expect(
            moment('2002-05-02 11:30:26', 'YYYY-MM-DD k:mm:ss', true).isValid(),
            'valid two-digit hour'
        ).toBe(true);

        expect(
            moment('2002-05-02 11:09:26', 'YYYY-MM-DD hh:m:ss', true).isValid(),
            'invalid two-digit minute'
        ).toBe(false);

        expect(
            moment('2002-05-02 11:12:26', 'YYYY-MM-DD hh:m:ss', true).isValid(),
            'valid two-digit minute'
        ).toBe(true);

        expect(
            moment('2002-05-02 11:09:06', 'YYYY-MM-DD hh:mm:s', true).isValid(),
            'invalid two-digit second'
        ).toBe(false);

        expect(
            moment('2002-05-02 11:09:16', 'YYYY-MM-DD hh:mm:s', true).isValid(),
            'valid two-digit second'
        ).toBe(true);

        expect(
            moment('2012-W07', 'YYYY-[W]W', true).isValid(),
            'invalid two-digit week'
        ).toBe(false);

        expect(
            moment('2012-W17', 'YYYY-[W]W', true).isValid(),
            'valid two-digit week'
        ).toBe(true);

        expect(
            moment('2012-W07', 'YYYY-[W]w', true).isValid(),
            'invalid two-digit week'
        ).toBe(false);

        expect(
            moment('2012-W17', 'YYYY-[W]w', true).isValid(),
            'valid two-digit week'
        ).toBe(true);

        expect(
            moment('08 June 2012', ['D MMMM YYYY'], true).isValid(),
            'invalid two-digit day'
        ).toBe(false);

        expect(
            moment('18 June 2012', ['D MMMM YYYY'], true).isValid(),
            'valid two-digit day'
        ).toBe(true);

        expect(
            moment('2012-05-02', 'YYYY-M-DD', true).isValid(),
            'invalid two-digit month'
        ).toBe(false);

        expect(
            moment('2012-11-02', 'YYYY-M-DD', true).isValid(),
            'valid two-digit month'
        ).toBe(true);

        expect(
            moment('1', 'SS', true).isValid(),
            'invalid one-digit milisecond'
        ).toBe(false);
        expect(
            moment('12', 'SS', true).isValid(),
            'valid two-digit milisecond'
        ).toBe(true);
        expect(
            moment('123', 'SS', true).isValid(),
            'invalid three-digit milisecond'
        ).toBe(false);

        expect(
            moment('1', 'SSS', true).isValid(),
            'invalid one-digit milisecond'
        ).toBe(false);
        expect(
            moment('12', 'SSS', true).isValid(),
            'invalid two-digit milisecond'
        ).toBe(false);
        expect(
            moment('123', 'SSS', true).isValid(),
            'valid three-digit milisecond'
        ).toBe(true);

        // strict parsing respects month length
        expect(
            moment('1 January 2000', 'D MMMM YYYY', true).isValid(),
            'capital long-month + MMMM'
        ).toBeTruthy();
        expect(
            !moment('1 January 2000', 'D MMM YYYY', true).isValid(),
            'capital long-month + MMM'
        ).toBeTruthy();
        expect(
            !moment('1 Jan 2000', 'D MMMM YYYY', true).isValid(),
            'capital short-month + MMMM'
        ).toBeTruthy();
        expect(
            moment('1 Jan 2000', 'D MMM YYYY', true).isValid(),
            'capital short-month + MMM'
        ).toBeTruthy();
        expect(
            moment('1 january 2000', 'D MMMM YYYY', true).isValid(),
            'lower long-month + MMMM'
        ).toBeTruthy();
        expect(
            !moment('1 january 2000', 'D MMM YYYY', true).isValid(),
            'lower long-month + MMM'
        ).toBeTruthy();
        expect(
            !moment('1 jan 2000', 'D MMMM YYYY', true).isValid(),
            'lower short-month + MMMM'
        ).toBeTruthy();
        expect(
            moment('1 jan 2000', 'D MMM YYYY', true).isValid(),
            'lower short-month + MMM'
        ).toBeTruthy();
    });

    test('parsing into a locale', () => {
        moment.defineLocale('parselocale', {
            months: 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split(
                '_'
            ),
            monthsShort:
                'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split(
                    '_'
                ),
        });

        moment.locale('en');

        expect(
            moment('2012 seven', 'YYYY MMM', 'parselocale').month(),
            'should be able to parse in a specific locale'
        ).toBe(6);

        moment.locale('parselocale');

        expect(
            moment('2012 july', 'YYYY MMM', 'en').month(),
            'should be able to parse in a specific locale'
        ).toBe(6);

        moment.defineLocale('parselocale', null);
    });

    function getVerifier() {
        return function (input, format, expected, description, asymetrical) {
            var m = moment(input, format);
            expect(m.format('YYYY MM DD'), 'compare: ' + description).toBe(
                expected
            );

            //test round trip
            if (!asymetrical) {
                expect(m.format(format), 'round trip: ' + description).toBe(
                    input
                );
            }
        };
    }

    test('parsing week and weekday information', () => {
        var ver = getVerifier(),
            currentWeekOfYear = moment().weeks(),
            expectedDate2012 = moment([2012, 0, 1])
                .day(0)
                .add(currentWeekOfYear - 1, 'weeks')
                .format('YYYY MM DD'),
            expectedDate1999 = moment([1999, 0, 1])
                .day(0)
                .add(currentWeekOfYear - 1, 'weeks')
                .format('YYYY MM DD');

        // year
        ver('12', 'gg', expectedDate2012, 'week-year two digits');
        ver('2012', 'gggg', expectedDate2012, 'week-year four digits');
        ver('99', 'gg', expectedDate1999, 'week-year two digits previous year');
        ver(
            '1999',
            'gggg',
            expectedDate1999,
            'week-year four digits previous year'
        );

        ver('99', 'GG', '1999 01 04', 'iso week-year two digits');
        ver('1999', 'GGGG', '1999 01 04', 'iso week-year four digits');

        ver('13', 'GG', '2012 12 31', 'iso week-year two digits previous year');
        ver(
            '2013',
            'GGGG',
            '2012 12 31',
            'iso week-year four digits previous year'
        );

        // year + week
        ver('1999 37', 'gggg w', '1999 09 05', 'week');
        ver('1999 37', 'gggg ww', '1999 09 05', 'week double');
        ver('1999 37', 'GGGG W', '1999 09 13', 'iso week');
        ver('1999 37', 'GGGG WW', '1999 09 13', 'iso week double');

        ver('1999 37 4', 'GGGG WW E', '1999 09 16', 'iso day');
        ver('1999 37 04', 'GGGG WW E', '1999 09 16', 'iso day wide', true);

        ver('1999 37 4', 'gggg ww e', '1999 09 09', 'day');
        ver('1999 37 04', 'gggg ww e', '1999 09 09', 'day wide', true);

        // year + week + day
        ver('1999 37 4', 'gggg ww d', '1999 09 09', 'd');
        ver('1999 37 Th', 'gggg ww dd', '1999 09 09', 'dd');
        ver('1999 37 Thu', 'gggg ww ddd', '1999 09 09', 'ddd');
        ver('1999 37 Thursday', 'gggg ww dddd', '1999 09 09', 'dddd');

        // lower-order only
        expect(moment('22', 'ww').week(), 'week sets the week by itself').toBe(
            22
        );
        expect(moment('22', 'ww').weekYear(), 'week keeps this year').toBe(
            moment().weekYear()
        );
        expect(
            moment('2012 22', 'YYYY ww').weekYear(),
            'week keeps parsed year'
        ).toBe(2012);

        expect(
            moment('22', 'WW').isoWeek(),
            'iso week sets the week by itself'
        ).toBe(22);
        expect(
            moment('2012 22', 'YYYY WW').weekYear(),
            'iso week keeps parsed year'
        ).toBe(2012);
        expect(
            moment('22', 'WW').isoWeekYear(),
            'iso week keeps this year'
        ).toBe(moment().isoWeekYear());

        // order
        ver('6 2013 2', 'e gggg w', '2013 01 12', "order doesn't matter");
        ver('6 2013 2', 'E GGGG W', '2013 01 12', "iso order doesn't matter");

        //can parse other stuff too
        expect(
            moment('1999-W37-4 3:30', 'GGGG-[W]WW-E HH:mm').format(
                'YYYY MM DD HH:mm'
            ),
            'parsing weeks and hours'
        ).toBe('1999 09 16 03:30');

        // In safari, all years before 1300 are shifted back with one day.
        // http://stackoverflow.com/questions/20768975/safari-subtracts-1-day-from-dates-before-1300
        if (new Date('1300-01-01').getUTCFullYear() === 1300) {
            // Years less than 100
            ver('0098-06', 'GGGG-WW', '0098 02 03', 'small years work', true);
        }
    });

    test('parsing localized weekdays', () => {
        var ver = getVerifier();
        try {
            moment.locale('dow:1,doy:4', {
                weekdays:
                    'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split(
                        '_'
                    ),
                weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
                weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
                week: { dow: 1, doy: 4 },
            });
            ver('1999 37 4', 'GGGG WW E', '1999 09 16', 'iso ignores locale');
            ver('1999 37 7', 'GGGG WW E', '1999 09 19', 'iso ignores locale');

            ver(
                '1999 37 0',
                'gggg ww e',
                '1999 09 13',
                'localized e uses local doy and dow: 0 = monday'
            );
            ver(
                '1999 37 4',
                'gggg ww e',
                '1999 09 17',
                'localized e uses local doy and dow: 4 = friday'
            );

            ver(
                '1999 37 1',
                'gggg ww d',
                '1999 09 13',
                'localized d uses 0-indexed days: 1 = monday'
            );
            ver(
                '1999 37 Lu',
                'gggg ww dd',
                '1999 09 13',
                'localized d uses 0-indexed days: Mo'
            );
            ver(
                '1999 37 lun.',
                'gggg ww ddd',
                '1999 09 13',
                'localized d uses 0-indexed days: Mon'
            );
            ver(
                '1999 37 lundi',
                'gggg ww dddd',
                '1999 09 13',
                'localized d uses 0-indexed days: Monday'
            );
            ver(
                '1999 37 4',
                'gggg ww d',
                '1999 09 16',
                'localized d uses 0-indexed days: 4'
            );

            //sunday goes at the end of the week
            ver(
                '1999 37 0',
                'gggg ww d',
                '1999 09 19',
                'localized d uses 0-indexed days: 0 = sund'
            );
            ver(
                '1999 37 Di',
                'gggg ww dd',
                '1999 09 19',
                'localized d uses 0-indexed days: 0 = sund'
            );
        } finally {
            moment.defineLocale('dow:1,doy:4', null);
            moment.locale('en');
        }
    });

    test('parsing with customized two-digit year', () => {
        var original = moment.parseTwoDigitYear;
        try {
            expect(moment('68', 'YY').year()).toBe(2068);
            expect(moment('69', 'YY').year()).toBe(1969);
            moment.parseTwoDigitYear = function (input) {
                return +input + (+input > 30 ? 1900 : 2000);
            };
            expect(moment('68', 'YY').year()).toBe(1968);
            expect(moment('67', 'YY').year()).toBe(1967);
            expect(moment('31', 'YY').year()).toBe(1931);
            expect(moment('30', 'YY').year()).toBe(2030);
        } finally {
            moment.parseTwoDigitYear = original;
        }
    });

    test('array with strings', () => {
        expect(
            moment(['2014', '7', '31']).isValid(),
            'string array + isValid'
        ).toBe(true);
    });

    test('object with strings', () => {
        expect(
            moment({ year: '2014', month: '7', day: '31' }).isValid(),
            'string object + isValid'
        ).toBe(true);
    });

    test('utc with array of formats', () => {
        expect(
            moment.utc('2014-01-01', ['YYYY-MM-DD', 'YYYY-MM']).format(),
            'moment.utc works with array of formats'
        ).toBe('2014-01-01T00:00:00Z');
    });

    test('parsing invalid string weekdays', () => {
        expect(false, 'dd with invalid weekday, non-strict').toBe(
            moment('a', 'dd').isValid()
        );
        expect(false, 'dd with invalid weekday, strict').toBe(
            moment('a', 'dd', true).isValid()
        );
        expect(false, 'ddd with invalid weekday, non-strict').toBe(
            moment('a', 'ddd').isValid()
        );
        expect(false, 'ddd with invalid weekday, strict').toBe(
            moment('a', 'ddd', true).isValid()
        );
        expect(false, 'dddd with invalid weekday, non-strict').toBe(
            moment('a', 'dddd').isValid()
        );
        expect(false, 'dddd with invalid weekday, strict').toBe(
            moment('a', 'dddd', true).isValid()
        );
    });

    test('milliseconds', () => {
        expect(moment('1', 'S').millisecond()).toBe(100);
        expect(moment('12', 'SS').millisecond()).toBe(120);
        expect(moment('123', 'SSS').millisecond()).toBe(123);
        expect(moment('1234', 'SSSS').millisecond()).toBe(123);
        expect(moment('12345', 'SSSSS').millisecond()).toBe(123);
        expect(moment('123456', 'SSSSSS').millisecond()).toBe(123);
        expect(moment('1234567', 'SSSSSSS').millisecond()).toBe(123);
        expect(moment('12345678', 'SSSSSSSS').millisecond()).toBe(123);
        expect(moment('123456789', 'SSSSSSSSS').millisecond()).toBe(123);
    });

    test('hmm', () => {
        expect(
            moment('123', 'hmm', true).format('HH:mm:ss'),
            '123 with hmm'
        ).toBe('01:23:00');
        expect(
            moment('123a', 'hmmA', true).format('HH:mm:ss'),
            '123a with hmmA'
        ).toBe('01:23:00');
        expect(
            moment('123p', 'hmmA', true).format('HH:mm:ss'),
            '123p with hmmA'
        ).toBe('13:23:00');

        expect(
            moment('1234', 'hmm', true).format('HH:mm:ss'),
            '1234 with hmm'
        ).toBe('12:34:00');
        expect(
            moment('1234a', 'hmmA', true).format('HH:mm:ss'),
            '1234a with hmmA'
        ).toBe('00:34:00');
        expect(
            moment('1234p', 'hmmA', true).format('HH:mm:ss'),
            '1234p with hmmA'
        ).toBe('12:34:00');

        expect(
            moment('12345', 'hmmss', true).format('HH:mm:ss'),
            '12345 with hmmss'
        ).toBe('01:23:45');
        expect(
            moment('12345a', 'hmmssA', true).format('HH:mm:ss'),
            '12345a with hmmssA'
        ).toBe('01:23:45');
        expect(
            moment('12345p', 'hmmssA', true).format('HH:mm:ss'),
            '12345p with hmmssA'
        ).toBe('13:23:45');
        expect(
            moment('112345', 'hmmss', true).format('HH:mm:ss'),
            '112345 with hmmss'
        ).toBe('11:23:45');
        expect(
            moment('112345a', 'hmmssA', true).format('HH:mm:ss'),
            '112345a with hmmssA'
        ).toBe('11:23:45');
        expect(
            moment('112345p', 'hmmssA', true).format('HH:mm:ss'),
            '112345p with hmmssA'
        ).toBe('23:23:45');

        expect(
            moment('023', 'Hmm', true).format('HH:mm:ss'),
            '023 with Hmm'
        ).toBe('00:23:00');
        expect(
            moment('123', 'Hmm', true).format('HH:mm:ss'),
            '123 with Hmm'
        ).toBe('01:23:00');
        expect(
            moment('1234', 'Hmm', true).format('HH:mm:ss'),
            '1234 with Hmm'
        ).toBe('12:34:00');
        expect(
            moment('1534', 'Hmm', true).format('HH:mm:ss'),
            '1234 with Hmm'
        ).toBe('15:34:00');
        expect(
            moment('12345', 'Hmmss', true).format('HH:mm:ss'),
            '12345 with Hmmss'
        ).toBe('01:23:45');
        expect(
            moment('112345', 'Hmmss', true).format('HH:mm:ss'),
            '112345 with Hmmss'
        ).toBe('11:23:45');
        expect(
            moment('172345', 'Hmmss', true).format('HH:mm:ss'),
            '112345 with Hmmss'
        ).toBe('17:23:45');
    });

    test('Y token', () => {
        expect(moment('1-1-2010', 'M-D-Y', true).year(), 'parsing Y').toBe(
            2010
        );
    });

    test('parsing flags retain parsed date parts', () => {
        var a = moment('10 p', 'hh:mm a'),
            b;
        expect(
            a.parsingFlags().parsedDateParts[3],
            'parsed 10 as the hour'
        ).toBe(10);
        expect(a.parsingFlags().parsedDateParts[0], 'year was not parsed').toBe(
            undefined
        );
        expect(a.parsingFlags().meridiem, 'meridiem flag was added').toBe('p');
        b = moment('10:30', ['MMDDYY', 'HH:mm']);
        expect(
            b.parsingFlags().parsedDateParts[3],
            'multiple format parshing matched hour'
        ).toBe(10);
        expect(
            b.parsingFlags().parsedDateParts[0],
            'array is properly copied, no residual data from first token parse'
        ).toBe(undefined);
    });

    test('parsing only meridiem results in invalid date', () => {
        expect(
            !moment('alkj', 'hh:mm a').isValid(),
            'because an a token is used, a meridiem will be parsed but nothing else was so invalid'
        ).toBeTruthy();
        expect(
            moment('02:30 p more extra stuff', 'hh:mm a').isValid(),
            'because other tokens were parsed, date is valid'
        ).toBeTruthy();
        expect(
            moment('1/1/2016 extra data', ['a', 'M/D/YYYY']).isValid(),
            'took second format, does not pick up on meridiem parsed from first format (good copy)'
        ).toBeTruthy();
    });

    test('invalid dates return invalid for methods that access the _d prop', () => {
        var momentAsDate = moment(['2015', '12', '1']).toDate();
        expect(
            momentAsDate instanceof Date,
            'toDate returns a Date object'
        ).toBeTruthy();
        expect(
            isNaN(momentAsDate.getTime()),
            'toDate returns an invalid Date invalid'
        ).toBeTruthy();
    });

    test('k, kk', () => {
        var i, kVal, kkVal;
        for (i = -1; i <= 24; i++) {
            kVal = i + ':15:59';
            kkVal = (i < 10 ? '0' : '') + i + ':15:59';
            if (i !== 24) {
                expect(
                    moment(kVal, 'k:mm:ss').isSame(moment(kVal, 'H:mm:ss')),
                    kVal + ' k parsing'
                ).toBeTruthy();
                expect(
                    moment(kkVal, 'kk:mm:ss').isSame(moment(kkVal, 'HH:mm:ss')),
                    kkVal + ' kk parsing'
                ).toBeTruthy();
            } else {
                expect(
                    moment(kVal, 'k:mm:ss').format('k:mm:ss'),
                    kVal + ' k parsing'
                ).toBe(kVal);
                expect(
                    moment(kkVal, 'kk:mm:ss').format('kk:mm:ss'),
                    kkVal + ' skk parsing'
                ).toBe(kkVal);
            }
        }
    });
});
