import { describe, expect, test } from 'vitest';
import each from '../helpers/each';
import moment from '../../src/moment';

describe('is valid', () => {
    test('array bad month', () => {
        expect(moment([2010, -1]).isValid(), 'month -1 invalid').toBe(false);
        expect(moment([2100, 12]).isValid(), 'month 12 invalid').toBe(false);
    });

    test('array good month', () => {
        for (var i = 0; i < 12; i++) {
            expect(moment([2010, i]).isValid(), 'month ' + i).toBe(true);
            expect(moment.utc([2010, i]).isValid(), 'month ' + i).toBe(true);
        }
    });

    test('Feb 29 0000 is valid', () => {
        // https://github.com/moment/moment/issues/3358
        expect(
            moment({ year: 0, month: 1, date: 29 }).isValid(),
            'Feb 29 0000 must be valid'
        ).toBeTruthy();
        expect(
            moment({ year: 0, month: 1, date: 28 }).add(1, 'd').isValid(),
            'Feb 28 0000 + 1 day must be valid'
        ).toBeTruthy();
    });

    test('array bad date', () => {
        var tests = [
            moment([2010, 0, 0]),
            moment([2100, 0, 32]),
            moment.utc([2010, 0, 0]),
            moment.utc([2100, 0, 32]),
        ];

        each(tests, function (m) {
            expect(m.isValid()).toBe(false);
        });
    });

    test('h/hh with hour > 12', () => {
        expect(
            moment('06/20/2014 11:51 PM', 'MM/DD/YYYY hh:mm A', true).isValid(),
            '11 for hh'
        ).toBeTruthy();
        expect(
            moment('06/20/2014 11:51 AM', 'MM/DD/YYYY hh:mm A', true).isValid(),
            '11 for hh'
        ).toBeTruthy();
        expect(
            moment('06/20/2014 23:51 PM', 'MM/DD/YYYY hh:mm A').isValid(),
            'non-strict validity 23 for hh'
        ).toBeTruthy();
        expect(
            moment('06/20/2014 23:51 PM', 'MM/DD/YYYY hh:mm A').parsingFlags()
                .bigHour,
            'non-strict bigHour 23 for hh'
        ).toBeTruthy();
        expect(
            !moment(
                '06/20/2014 23:51 PM',
                'MM/DD/YYYY hh:mm A',
                true
            ).isValid(),
            'validity 23 for hh'
        ).toBeTruthy();
        expect(
            moment(
                '06/20/2014 23:51 PM',
                'MM/DD/YYYY hh:mm A',
                true
            ).parsingFlags().bigHour,
            'bigHour 23 for hh'
        ).toBeTruthy();
    });

    test('array bad date leap year', () => {
        expect(moment([2010, 1, 29]).isValid(), '2010 feb 29').toBe(false);
        expect(moment([2100, 1, 29]).isValid(), '2100 feb 29').toBe(false);
        expect(moment([2008, 1, 30]).isValid(), '2008 feb 30').toBe(false);
        expect(moment([2000, 1, 30]).isValid(), '2000 feb 30').toBe(false);

        expect(moment.utc([2010, 1, 29]).isValid(), 'utc 2010 feb 29').toBe(
            false
        );
        expect(moment.utc([2100, 1, 29]).isValid(), 'utc 2100 feb 29').toBe(
            false
        );
        expect(moment.utc([2008, 1, 30]).isValid(), 'utc 2008 feb 30').toBe(
            false
        );
        expect(moment.utc([2000, 1, 30]).isValid(), 'utc 2000 feb 30').toBe(
            false
        );
    });

    test('string + formats bad date', () => {
        expect(
            moment('2020-00-00', []).isValid(),
            'invalid on empty array'
        ).toBe(false);
        expect(
            moment('2020-00-00', ['YYYY-MM-DD', 'DD-MM-YYYY']).isValid(),
            'invalid on all in array'
        ).toBe(false);
        expect(
            moment('2020-00-00', ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid(),
            'invalid on all in array'
        ).toBe(false);
        expect(
            moment('2020-01-01', ['YYYY-MM-DD', 'DD-MM-YYYY']).isValid(),
            'valid on first'
        ).toBe(true);
        expect(
            moment('2020-01-01', ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid(),
            'valid on last'
        ).toBe(true);
        expect(
            moment('2020-01-01', ['YYYY-MM-DD', 'YYYY-DD-MM']).isValid(),
            'valid on both'
        ).toBe(true);
        expect(
            moment('2020-13-01', ['YYYY-MM-DD', 'YYYY-DD-MM']).isValid(),
            'valid on last'
        ).toBe(true);

        expect(
            moment('12-13-2012', ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid(),
            'month rollover'
        ).toBe(false);
        expect(
            moment('12-13-2012', ['DD-MM-YYYY', 'DD-MM-YYYY']).isValid(),
            'month rollover'
        ).toBe(false);
        expect(
            moment('38-12-2012', ['DD-MM-YYYY']).isValid(),
            'day rollover'
        ).toBe(false);
    });

    test('string nonsensical with format', () => {
        expect(
            moment('fail', 'MM-DD-YYYY').isValid(),
            "string 'fail' with format 'MM-DD-YYYY'"
        ).toBe(false);
        expect(
            moment('xx-xx-2001', 'DD-MM-YYY').isValid(),
            "string 'xx-xx-2001' with format 'MM-DD-YYYY'"
        ).toBe(true);
    });

    test('string with bad month name', () => {
        expect(
            moment('01-Nam-2012', 'DD-MMM-YYYY').isValid(),
            "'Nam' is an invalid month"
        ).toBe(false);
        expect(
            moment('01-Aug-2012', 'DD-MMM-YYYY').isValid(),
            "'Aug' is a valid month"
        ).toBe(true);
    });

    test('string with spaceless format', () => {
        expect(
            moment('10Sep2001', 'DDMMMYYYY').isValid(),
            'Parsing 10Sep2001 should result in a valid date'
        ).toBe(true);
    });

    test('invalid string iso 8601', () => {
        var tests = [
                '2010-00-00',
                '2010-01-00',
                '2010-01-40',
                '2010-01-01T24:01', // 24:00:00 is actually valid
                '2010-01-01T23:60',
                '2010-01-01T23:59:60',
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(
                moment(tests[i], moment.ISO_8601).isValid(),
                tests[i] + ' should be invalid'
            ).toBe(false);
            expect(
                moment.utc(tests[i], moment.ISO_8601).isValid(),
                tests[i] + ' should be invalid'
            ).toBe(false);
        }
    });

    test('invalid string iso 8601 + timezone', () => {
        var tests = [
                '2010-00-00T+00:00',
                '2010-01-00T+00:00',
                '2010-01-40T+00:00',
                '2010-01-40T24:01+00:00',
                '2010-01-40T23:60+00:00',
                '2010-01-40T23:59:60+00:00',
                '2010-01-40T23:59:59.9999+00:00',
                '2010-01-40T23:59:59,9999+00:00',
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(
                moment(tests[i], moment.ISO_8601).isValid(),
                tests[i] + ' should be invalid'
            ).toBe(false);
            expect(
                moment.utc(tests[i], moment.ISO_8601).isValid(),
                tests[i] + ' should be invalid'
            ).toBe(false);
        }
    });

    test('valid string iso 8601 - not strict', () => {
        var tests = [
                '2010-01-30 00:00:00,000Z',
                '20100101',
                '20100130',
                '20100130T23+00:00',
                '20100130T2359+0000',
                '20100130T235959+0000',
                '20100130T235959,999+0000',
                '20100130T235959,999-0700',
                '20100130T000000,000+0700',
                '20100130 000000,000Z',
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(
                moment(tests[i]).isValid(),
                tests[i] + ' should be valid in normal'
            ).toBe(true);
            expect(
                moment.utc(tests[i]).isValid(),
                tests[i] + ' should be valid in normal'
            ).toBe(true);
        }
    });

    test('valid string iso 8601 + timezone', () => {
        var tests = [
                '2010-01-01',
                '2010-01-30',
                '2010-01-30T23+00:00',
                '2010-01-30T23:59+00:00',
                '2010-01-30T23:59:59+00:00',
                '2010-01-30T23:59:59.999+00:00',
                '2010-01-30T23:59:59.999-07:00',
                '2010-01-30T00:00:00.000+07:00',
                '2010-01-30T23:59:59.999-07',
                '2010-01-30T00:00:00.000+07',
                '2010-01-30 00:00:00.000Z',
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(
                moment(tests[i]).isValid(),
                tests[i] + ' should be valid in normal'
            ).toBe(true);
            expect(
                moment.utc(tests[i]).isValid(),
                tests[i] + ' should be valid in normal'
            ).toBe(true);
            expect(
                moment(tests[i], moment.ISO_8601, true).isValid(),
                tests[i] + ' should be valid in strict'
            ).toBe(true);
            expect(
                moment.utc(tests[i], moment.ISO_8601, true).isValid(),
                tests[i] + ' should be valid in strict'
            ).toBe(true);
        }
    });

    test('invalidAt', () => {
        expect(
            moment([2000, 12]).invalidAt(),
            'month 12 is invalid: 0-11'
        ).toBe(1);
        expect(
            moment([2000, 1, 30]).invalidAt(),
            '30 is not a valid february day'
        ).toBe(2);
        expect(
            moment([2000, 1, 29, 25]).invalidAt(),
            '25 is invalid hour'
        ).toBe(3);
        expect(
            moment([2000, 1, 29, 24, 1]).invalidAt(),
            '24:01 is invalid hour'
        ).toBe(3);
        expect(
            moment([2000, 1, 29, 23, 60]).invalidAt(),
            '60 is invalid minute'
        ).toBe(4);
        expect(
            moment([2000, 1, 29, 23, 59, 60]).invalidAt(),
            '60 is invalid second'
        ).toBe(5);
        expect(
            moment([2000, 1, 29, 23, 59, 59, 1000]).invalidAt(),
            '1000 is invalid millisecond'
        ).toBe(6);
        expect(
            moment([2000, 1, 29, 23, 59, 59, 999]).invalidAt(),
            '-1 if everything is fine'
        ).toBe(-1);
    });

    test('valid Unix timestamp', () => {
        expect(moment(1371065286, 'X').isValid(), 'number integer').toBe(true);
        expect(moment(1379066897.0, 'X').isValid(), 'number whole 1dp').toBe(
            true
        );
        expect(moment(1379066897.7, 'X').isValid(), 'number 1dp').toBe(true);
        expect(moment(1379066897.0, 'X').isValid(), 'number whole 2dp').toBe(
            true
        );
        expect(moment(1379066897.07, 'X').isValid(), 'number 2dp').toBe(true);
        expect(moment(1379066897.17, 'X').isValid(), 'number 2dp').toBe(true);
        expect(moment(1379066897.0, 'X').isValid(), 'number whole 3dp').toBe(
            true
        );
        expect(moment(1379066897.007, 'X').isValid(), 'number 3dp').toBe(true);
        expect(moment(1379066897.017, 'X').isValid(), 'number 3dp').toBe(true);
        expect(moment(1379066897.157, 'X').isValid(), 'number 3dp').toBe(true);
        expect(moment('1371065286', 'X').isValid(), 'string integer').toBe(
            true
        );
        expect(moment('1379066897.', 'X').isValid(), 'string trailing .').toBe(
            true
        );
        expect(moment('1379066897.0', 'X').isValid(), 'string whole 1dp').toBe(
            true
        );
        expect(moment('1379066897.7', 'X').isValid(), 'string 1dp').toBe(true);
        expect(moment('1379066897.00', 'X').isValid(), 'string whole 2dp').toBe(
            true
        );
        expect(moment('1379066897.07', 'X').isValid(), 'string 2dp').toBe(true);
        expect(moment('1379066897.17', 'X').isValid(), 'string 2dp').toBe(true);
        expect(
            moment('1379066897.000', 'X').isValid(),
            'string whole 3dp'
        ).toBe(true);
        expect(moment('1379066897.007', 'X').isValid(), 'string 3dp').toBe(
            true
        );
        expect(moment('1379066897.017', 'X').isValid(), 'string 3dp').toBe(
            true
        );
        expect(moment('1379066897.157', 'X').isValid(), 'string 3dp').toBe(
            true
        );
    });

    test('invalid Unix timestamp', () => {
        expect(moment(undefined, 'X').isValid(), 'undefined').toBe(false);
        expect(moment('undefined', 'X').isValid(), 'string undefined').toBe(
            false
        );
        try {
            expect(moment(null, 'X').isValid(), 'null').toBe(false);
        } catch (e) {
            expect(true, 'null').toBeTruthy();
        }

        expect(moment('null', 'X').isValid(), 'string null').toBe(false);
        expect(moment([], 'X').isValid(), 'array').toBe(false);
        expect(moment('{}', 'X').isValid(), 'object').toBe(false);
        try {
            expect(moment('', 'X').isValid(), 'string empty').toBe(false);
        } catch (e) {
            expect(true, 'string empty').toBeTruthy();
        }

        expect(moment(' ', 'X').isValid(), 'string space').toBe(false);
    });

    test('valid Unix offset milliseconds', () => {
        expect(moment(1234567890123, 'x').isValid(), 'number integer').toBe(
            true
        );
        expect(moment('1234567890123', 'x').isValid(), 'string integer').toBe(
            true
        );
    });

    test('invalid Unix offset milliseconds', () => {
        expect(moment(undefined, 'x').isValid(), 'undefined').toBe(false);
        expect(moment('undefined', 'x').isValid(), 'string undefined').toBe(
            false
        );
        try {
            expect(moment(null, 'x').isValid(), 'null').toBe(false);
        } catch (e) {
            expect(true, 'null').toBeTruthy();
        }

        expect(moment('null', 'x').isValid(), 'string null').toBe(false);
        expect(moment([], 'x').isValid(), 'array').toBe(false);
        expect(moment('{}', 'x').isValid(), 'object').toBe(false);
        try {
            expect(moment('', 'x').isValid(), 'string empty').toBe(false);
        } catch (e) {
            expect(true, 'string empty').toBeTruthy();
        }

        expect(moment(' ', 'x').isValid(), 'string space').toBe(false);
    });

    test('empty', () => {
        expect(moment(null).isValid(), 'null').toBe(false);
        expect(moment('').isValid(), 'empty string').toBe(false);
        expect(moment(null, 'YYYY').isValid(), 'format + null').toBe(false);
        expect(moment('', 'YYYY').isValid(), 'format + empty string').toBe(
            false
        );
        expect(
            moment(' ', 'YYYY').isValid(),
            'format + empty when trimmed'
        ).toBe(false);
    });

    test('days of the year', () => {
        expect(
            moment('2010 300', 'YYYY DDDD').isValid(),
            'day 300 of year valid'
        ).toBe(true);
        expect(
            moment('2010 365', 'YYYY DDDD').isValid(),
            'day 365 of year valid'
        ).toBe(true);
        expect(
            moment('2010 366', 'YYYY DDDD').isValid(),
            'day 366 of year invalid'
        ).toBe(false);
        expect(
            moment('2012 365', 'YYYY DDDD').isValid(),
            'day 365 of leap year valid'
        ).toBe(true);
        expect(
            moment('2012 366', 'YYYY DDDD').isValid(),
            'day 366 of leap year valid'
        ).toBe(true);
        expect(
            moment('2012 367', 'YYYY DDDD').isValid(),
            'day 367 of leap year invalid'
        ).toBe(false);
    });

    test('24:00:00.000 is valid', () => {
        expect(
            moment('2014-01-01 24', 'YYYY-MM-DD HH').isValid(),
            '24 is valid'
        ).toBe(true);
        expect(
            moment('2014-01-01 24:00', 'YYYY-MM-DD HH:mm').isValid(),
            '24:00 is valid'
        ).toBe(true);
        expect(
            moment('2014-01-01 24:01', 'YYYY-MM-DD HH:mm').isValid(),
            '24:01 is not valid'
        ).toBe(false);
    });

    test('oddball permissiveness', () => {
        // https://github.com/moment/moment/issues/1128
        expect(
            moment('2010-10-3199', [
                'MM/DD/YYYY',
                'MM-DD-YYYY',
                'YYYY-MM-DD',
            ]).isValid()
        ).toBeTruthy();

        // https://github.com/moment/moment/issues/1122
        expect(
            moment('3:25', ['h:mma', 'hh:mma', 'H:mm', 'HH:mm']).isValid()
        ).toBeTruthy();
    });

    test('0 hour is invalid in strict', () => {
        expect(
            moment('00:01', 'hh:mm', true).isValid(),
            '00 hour is invalid in strict'
        ).toBe(false);
        expect(
            moment('00:01', 'hh:mm').isValid(),
            '00 hour is valid in normal'
        ).toBe(true);
        expect(
            moment('0:01', 'h:mm', true).isValid(),
            '0 hour is invalid in strict'
        ).toBe(false);
        expect(
            moment('0:01', 'h:mm').isValid(),
            '0 hour is valid in normal'
        ).toBe(true);
    });

    test('format locale', () => {
        var a = [
                ['uto 15.05.2018', 'dd DD.MM.YYYY', 'bs'],
                ['dt 15.05.2018', 'dd DD.MM.YYYY', 'ca'],
                ['Di 15.05.2018', 'dd DD.MM.YYYY', 'de-dt'],
                ['Di 15.05.2018', 'dd DD.MM.YYYY', 'de'],
                ['mar 15.05.2018', 'dd DD.MM.YYYY', 'es-do'],
                ['mar 15.05.2018', 'dd DD.MM.YYYY', 'es-us'],
                ['Di 15.05.2018', 'dd DD.MM.YYYY', 'es'],
                ['ar 15.05.2018', 'dd DD.MM.YYYY', 'eu'],
                ['mar 15.05.2018', 'dd DD.MM.YYYY', 'fr-ca'],
                ['mar 15.05.2018', 'dd DD.MM.YYYY', 'fr-ch'],
                ['mar 15.05.2018', 'dd DD.MM.YYYY', 'fr'],
                ['ti 15.05.2018', 'dd DD.MM.YYYY', 'fy'],
                ['mar 15.05.2018', 'dd DD.MM.YYYY', 'gl'],
                ['मंगळ 15.05.2018', 'dd DD.MM.YYYY', 'gom-deva'],
                ['Mon 15.05.2018', 'dd DD.MM.YYYY', 'gom-latn'],
                ['uto 15.05.2018', 'dd DD.MM.YYYY', 'hr'],
                ['Dë 15.05.2018', 'dd DD.MM.YYYY', 'lb'],
                ['uto 15.05.2018', 'dd DD.MM.YYYY', 'me'],
                ['ti 15.05.2018', 'dd DD.MM.YYYY', 'nb'],
                ['मङ्गल 15.05.2018', 'dd DD.MM.YYYY', 'ne'],
                ['di 15.05.2018', 'dd DD.MM.YYYY', 'nl-be'],
                ['di 15.05.2018', 'dd DD.MM.YYYY', 'nl'],
                ['ty 15.05.2018', 'dd DD.MM.YYYY', 'nn'],
                ['dm 15.05.2018', 'dd DD.MM.YYYY', 'oc-lnc'],
                ['tor 15.05.2018', 'dd DD.MM.YYYY', 'sl'],
                ['уто 15.05.2018', 'dd DD.MM.YYYY', 'sr-cyrl'],
                ['uto 15.05.2018', 'dd DD.MM.YYYY', 'sr'],
                ['uto 15.05.2018', 'dd DD.MM.YYYY', 'sr'],
            ],
            i;
        for (i = 0; i < a.length; i++) {
            expect(moment(a[i][0], a[i][1], a[i][2]).isValid()).toBeTruthy();
        }
    });

    test('destructive operation', () => {
        expect(
            moment('2018-05-15').add(100, 'years').isValid(),
            'add 100 years is valid'
        ).toBe(true);
        expect(
            moment('2018-05-15').add(1000000, 'years').isValid(),
            'add 1000000 years is invalid'
        ).toBe(false);
        expect(
            moment('2018-05-15').subtract(100, 'years').isValid(),
            'subtract 100 years is valid'
        ).toBe(true);
        expect(
            moment('2018-05-15').subtract(1000000, 'years').isValid(),
            'subtract 1000000 years is invalid'
        ).toBe(false);
    });
});
