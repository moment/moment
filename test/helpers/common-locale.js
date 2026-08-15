import { expect, test } from 'vitest';
import eachOwnProp from './each-own-prop';
import moment from '../../src/moment';

export function defineCommonLocaleTests(locale, options) {
    test('lenient day of month ordinal parsing', () => {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            expect(
                testMoment.year(),
                'lenient day of month ordinal parsing ' + i + ' year check'
            ).toBe(2014);
            expect(
                testMoment.month(),
                'lenient day of month ordinal parsing ' + i + ' month check'
            ).toBe(0);
            expect(
                testMoment.date(),
                'lenient day of month ordinal parsing ' + i + ' date check'
            ).toBe(i);
        }
    });

    test('lenient day of month ordinal parsing of number', () => {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            expect(
                testMoment.year(),
                'lenient day of month ordinal parsing of number ' +
                    i +
                    ' year check'
            ).toBe(2014);
            expect(
                testMoment.month(),
                'lenient day of month ordinal parsing of number ' +
                    i +
                    ' month check'
            ).toBe(0);
            expect(
                testMoment.date(),
                'lenient day of month ordinal parsing of number ' +
                    i +
                    ' date check'
            ).toBe(i);
        }
    });

    test('strict day of month ordinal parsing', () => {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            expect(
                testMoment.isValid(),
                'strict day of month ordinal parsing ' + i
            ).toBeTruthy();
        }
    });

    test('meridiem invariant', () => {
        var h, m, t1, t2;
        for (h = 0; h < 24; ++h) {
            for (m = 0; m < 60; m += 15) {
                t1 = moment.utc([2000, 0, 1, h, m]);
                t2 = moment.utc(t1.format('A h:mm'), 'A h:mm');
                expect(
                    t2.format('HH:mm'),
                    'meridiem at ' + t1.format('HH:mm')
                ).toBe(t1.format('HH:mm'));
            }
        }
    });

    test('date format correctness', () => {
        var data = moment.localeData()._longDateFormat;
        eachOwnProp(data, function (srchToken) {
            // Check each format string to make sure it does not contain any
            // tokens that need to be expanded.
            eachOwnProp(data, function (baseToken) {
                // strip escaped sequences
                var format = data[baseToken].replace(/(\[[^\]]*\])/g, '');
                expect(
                    false,
                    'contains ' + srchToken + ' in ' + baseToken
                ).toBe(!!~format.indexOf(srchToken));
            });
        });
    });

    test('month parsing correctness', () => {
        var i, m;

        if (locale === 'tr') {
            // I can't fix it :(

            return;
        }
        function tester(format) {
            var r;
            r = moment(m.format(format), format);
            expect(r.month(), 'month ' + i + ' fmt ' + format).toBe(m.month());
            if (locale !== 'ka') {
                r = moment(m.format(format).toLocaleUpperCase(), format);
                expect(
                    r.month(),
                    'month ' + i + ' fmt ' + format + ' upper'
                ).toBe(m.month());
            }
            r = moment(m.format(format).toLocaleLowerCase(), format);
            expect(r.month(), 'month ' + i + ' fmt ' + format + ' lower').toBe(
                m.month()
            );

            r = moment(m.format(format), format, true);
            expect(r.month(), 'month ' + i + ' fmt ' + format + ' strict').toBe(
                m.month()
            );
            if (locale !== 'ka') {
                r = moment(m.format(format).toLocaleUpperCase(), format, true);
                expect(
                    r.month(),
                    'month ' + i + ' fmt ' + format + ' upper strict'
                ).toBe(m.month());
            }
            r = moment(m.format(format).toLocaleLowerCase(), format, true);
            expect(
                r.month(),
                'month ' + i + ' fmt ' + format + ' lower strict'
            ).toBe(m.month());
        }

        for (i = 0; i < 12; ++i) {
            m = moment([2015, i, 15, 18]);
            tester('MMM');
            tester('MMM.');
            tester('MMMM');
            tester('MMMM.');
        }
    });

    test('weekday parsing correctness', () => {
        var i, m;

        if (
            locale === 'tr' ||
            locale === 'az' ||
            locale === 'ro' ||
            locale === 'mt' ||
            locale === 'ga'
        ) {
            // tr, az: There is a lower-case letter (ı), that converted to
            // upper then lower changes to i
            // ro: there is the letter ț which behaves weird under IE8
            // mt: letter Ħ
            // ga: month with spaces

            return;
        }
        function tester(format) {
            var r,
                baseMsg =
                    'weekday ' +
                    m.weekday() +
                    ' fmt ' +
                    format +
                    ' ' +
                    m.toISOString();
            r = moment(m.format(format), format);
            expect(r.weekday(), baseMsg).toBe(m.weekday());
            if (locale !== 'ka') {
                r = moment(m.format(format).toLocaleUpperCase(), format);
                expect(r.weekday(), baseMsg + ' upper').toBe(m.weekday());
            }
            r = moment(m.format(format).toLocaleLowerCase(), format);
            expect(r.weekday(), baseMsg + ' lower').toBe(m.weekday());
            r = moment(m.format(format), format, true);
            expect(r.weekday(), baseMsg + ' strict').toBe(m.weekday());
            if (locale !== 'ka') {
                r = moment(m.format(format).toLocaleUpperCase(), format, true);
                expect(r.weekday(), baseMsg + ' upper strict').toBe(
                    m.weekday()
                );
            }
            r = moment(m.format(format).toLocaleLowerCase(), format, true);
            expect(r.weekday(), baseMsg + ' lower strict').toBe(m.weekday());
        }

        for (i = 0; i < 7; ++i) {
            m = moment.utc([2015, 0, i + 1, 18]);
            tester('dd');
            tester('ddd');
            tester('dddd');
        }
    });

    test('valid localeData', () => {
        expect(
            moment().localeData().months().length,
            'months should return 12 months'
        ).toBe(12);
        expect(
            moment().localeData().monthsShort().length,
            'monthsShort should return 12 months'
        ).toBe(12);
        expect(
            moment().localeData().weekdays().length,
            'weekdays should return 7 days'
        ).toBe(7);
        expect(
            moment().localeData().weekdaysShort().length,
            'weekdaysShort should return 7 days'
        ).toBe(7);
        expect(
            moment().localeData().weekdaysMin().length,
            'monthsShort should return 7 days'
        ).toBe(7);
    });

    test('localeData weekdays can localeSort', () => {
        var weekdays = moment().localeData().weekdays(),
            weekdaysShort = moment().localeData().weekdaysShort(),
            weekdaysMin = moment().localeData().weekdaysMin(),
            shift = moment().localeData()._week.dow;
        expect(
            moment().localeData().weekdays(true),
            'weekdays should localeSort'
        ).toEqual(weekdays.slice(shift, 7).concat(weekdays.slice(0, shift)));
        expect(
            moment().localeData().weekdaysShort(true),
            'weekdaysShort should localeSort'
        ).toEqual(
            weekdaysShort.slice(shift, 7).concat(weekdaysShort.slice(0, shift))
        );
        expect(
            moment().localeData().weekdaysMin(true),
            'weekdaysMin should localeSort'
        ).toEqual(
            weekdaysMin.slice(shift, 7).concat(weekdaysMin.slice(0, shift))
        );
    });
}
