import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('locale inheritance', () => {
    test('calendar', () => {
        moment.defineLocale('base-cal', {
            calendar: {
                sameDay: '[Today at] HH:mm',
                nextDay: '[Tomorrow at] HH:mm',
                nextWeek: '[Next week at] HH:mm',
                lastDay: '[Yesterday at] HH:mm',
                lastWeek: '[Last week at] HH:mm',
                sameElse: '[whatever]',
            },
        });
        moment.defineLocale('child-cal', {
            parentLocale: 'base-cal',
            calendar: {
                sameDay: '[Today] HH:mm',
                nextDay: '[Tomorrow] HH:mm',
                nextWeek: '[Next week] HH:mm',
            },
        });

        moment.locale('child-cal');
        var anchor = moment.utc('2015-05-05T12:00:00', moment.ISO_8601);
        expect(
            anchor.clone().add(3, 'hours').calendar(anchor),
            'today uses child version'
        ).toBe('Today 15:00');
        expect(
            anchor.clone().add(1, 'day').calendar(anchor),
            'tomorrow uses child version'
        ).toBe('Tomorrow 12:00');
        expect(
            anchor.clone().add(3, 'days').calendar(anchor),
            'next week uses child version'
        ).toBe('Next week 12:00');

        expect(
            anchor.clone().subtract(1, 'day').calendar(anchor),
            'yesterday uses parent version'
        ).toBe('Yesterday at 12:00');
        expect(
            anchor.clone().subtract(3, 'days').calendar(anchor),
            'last week uses parent version'
        ).toBe('Last week at 12:00');
        expect(
            anchor.clone().subtract(7, 'days').calendar(anchor),
            'sameElse uses parent version -'
        ).toBe('whatever');
        expect(
            anchor.clone().add(7, 'days').calendar(anchor),
            'sameElse uses parent version +'
        ).toBe('whatever');
    });

    test('missing', () => {
        moment.defineLocale('base-cal-2', {
            calendar: {
                sameDay: '[Today at] HH:mm',
                nextDay: '[Tomorrow at] HH:mm',
                nextWeek: '[Next week at] HH:mm',
                lastDay: '[Yesterday at] HH:mm',
                lastWeek: '[Last week at] HH:mm',
                sameElse: '[whatever]',
            },
        });
        moment.defineLocale('child-cal-2', {
            parentLocale: 'base-cal-2',
        });
        moment.locale('child-cal-2');
        var anchor = moment.utc('2015-05-05T12:00:00', moment.ISO_8601);
        expect(
            anchor.clone().add(3, 'hours').calendar(anchor),
            'today uses parent version'
        ).toBe('Today at 15:00');
        expect(
            anchor.clone().add(1, 'day').calendar(anchor),
            'tomorrow uses parent version'
        ).toBe('Tomorrow at 12:00');
        expect(
            anchor.clone().add(3, 'days').calendar(anchor),
            'next week uses parent version'
        ).toBe('Next week at 12:00');
        expect(
            anchor.clone().subtract(1, 'day').calendar(anchor),
            'yesterday uses parent version'
        ).toBe('Yesterday at 12:00');
        expect(
            anchor.clone().subtract(3, 'days').calendar(anchor),
            'last week uses parent version'
        ).toBe('Last week at 12:00');
        expect(
            anchor.clone().subtract(7, 'days').calendar(anchor),
            'sameElse uses parent version -'
        ).toBe('whatever');
        expect(
            anchor.clone().add(7, 'days').calendar(anchor),
            'sameElse uses parent version +'
        ).toBe('whatever');
    });

    // Test function vs obj both directions

    test('long date format', () => {
        moment.defineLocale('base-ldf', {
            longDateFormat: {
                LTS: 'h:mm:ss A',
                LT: 'h:mm A',
                L: 'MM/DD/YYYY',
                LL: 'MMMM D, YYYY',
                LLL: 'MMMM D, YYYY h:mm A',
                LLLL: 'dddd, MMMM D, YYYY h:mm A',
            },
        });
        moment.defineLocale('child-ldf', {
            parentLocale: 'base-ldf',
            longDateFormat: {
                LLL: '[SUMMER child] MMMM D, YYYY h:mm A',
                LLLL: '[SUMMER child] dddd, MMMM D, YYYY h:mm A',
            },
        });

        moment.locale('child-ldf');
        var anchor = moment.utc('2015-09-06T12:34:56', moment.ISO_8601);
        expect(anchor.format('LTS'), 'LTS uses base').toBe('12:34:56 PM');
        expect(anchor.format('LT'), 'LT uses base').toBe('12:34 PM');
        expect(anchor.format('L'), 'L uses base').toBe('09/06/2015');
        expect(anchor.format('l'), 'l uses base').toBe('9/6/2015');
        expect(anchor.format('LL'), 'LL uses base').toBe('September 6, 2015');
        expect(anchor.format('ll'), 'll uses base').toBe('Sep 6, 2015');
        expect(anchor.format('LLL'), 'LLL uses child').toBe(
            'SUMMER child September 6, 2015 12:34 PM'
        );
        expect(anchor.format('lll'), 'lll uses child').toBe(
            'SUMMER child Sep 6, 2015 12:34 PM'
        );
        expect(anchor.format('LLLL'), 'LLLL uses child').toBe(
            'SUMMER child Sunday, September 6, 2015 12:34 PM'
        );
        expect(anchor.format('llll'), 'llll uses child').toBe(
            'SUMMER child Sun, Sep 6, 2015 12:34 PM'
        );
    });

    test('ordinal', () => {
        moment.defineLocale('base-ordinal-1', {
            ordinal: '%dx',
        });
        moment.defineLocale('child-ordinal-1', {
            parentLocale: 'base-ordinal-1',
            ordinal: '%dy',
        });

        expect(
            moment.utc('2015-02-03', moment.ISO_8601).format('Do'),
            'ordinal uses child string'
        ).toBe('3y');

        moment.defineLocale('base-ordinal-2', {
            ordinal: '%dx',
        });
        moment.defineLocale('child-ordinal-2', {
            parentLocale: 'base-ordinal-2',
            ordinal: function (num) {
                return num + 'y';
            },
        });

        expect(
            moment.utc('2015-02-03', moment.ISO_8601).format('Do'),
            'ordinal uses child function'
        ).toBe('3y');

        moment.defineLocale('base-ordinal-3', {
            ordinal: function (num) {
                return num + 'x';
            },
        });
        moment.defineLocale('child-ordinal-3', {
            parentLocale: 'base-ordinal-3',
            ordinal: '%dy',
        });

        expect(
            moment.utc('2015-02-03', moment.ISO_8601).format('Do'),
            'ordinal uses child string (overwrite parent function)'
        ).toBe('3y');
    });

    test('ordinal parse', () => {
        moment.defineLocale('base-ordinal-parse-1', {
            dayOfMonthOrdinalParse: /\d{1,2}x/,
        });
        moment.defineLocale('child-ordinal-parse-1', {
            parentLocale: 'base-ordinal-parse-1',
            dayOfMonthOrdinalParse: /\d{1,2}y/,
        });

        expect(
            moment.utc('2015-01-1y', 'YYYY-MM-Do', true).isValid(),
            'ordinal parse uses child'
        ).toBeTruthy();

        moment.defineLocale('base-ordinal-parse-2', {
            dayOfMonthOrdinalParse: /\d{1,2}x/,
        });
        moment.defineLocale('child-ordinal-parse-2', {
            parentLocale: 'base-ordinal-parse-2',
            dayOfMonthOrdinalParse: /\d{1,2}/,
        });

        expect(
            moment.utc('2015-01-1', 'YYYY-MM-Do', true).isValid(),
            'ordinal parse uses child (default)'
        ).toBeTruthy();
    });

    test('months', () => {
        moment.defineLocale('base-months', {
            months: 'One_Two_Three_Four_Five_Six_Seven_Eight_Nine_Ten_Eleven_Twelve'.split(
                '_'
            ),
        });
        moment.defineLocale('child-months', {
            parentLocale: 'base-months',
            months: 'First_Second_Third_Fourth_Fifth_Sixth_Seventh_Eighth_Ninth_Tenth_Eleventh_Twelfth '.split(
                '_'
            ),
        });
        expect(
            moment.utc('2015-01-01', 'YYYY-MM-DD').format('MMMM'),
            'First'
        ).toBeTruthy();
    });

    test('define child locale before parent', () => {
        moment.defineLocale('months-x', null);
        moment.defineLocale('base-months-x', null);

        moment.defineLocale('months-x', {
            parentLocale: 'base-months-x',
            months: 'First_Second_Third_Fourth_Fifth_Sixth_Seventh_Eighth_Ninth_Tenth_Eleventh_Twelfth '.split(
                '_'
            ),
        });
        expect(
            moment.locale(),
            'failed to set a locale requiring missing parent'
        ).toBe('en');

        expect(
            moment(
                '00:00:00 01/January/2017',
                'HH:mm:ss DD/MMM/YYYY',
                'months-x'
            ).locale(),
            'creating moment using child with undefined parent defaults to global'
        ).toBe('en');

        moment.defineLocale('base-months-x', {
            months: 'One_Two_Three_Four_Five_Six_Seven_Eight_Nine_Ten_Eleven_Twelve'.split(
                '_'
            ),
        });
        expect(
            moment.locale(),
            'defineLocale should also set the locale (regardless of child locales)'
        ).toBe('base-months-x');

        expect(
            moment().locale('months-x').month(0).format('MMMM'),
            'loading child before parent locale works'
        ).toBe('First');
    });

    test('lazy load parentLocale', () => {
        moment.defineLocale('de_test', {
            parentLocale: 'DE',
            monthsShort: [
                'M1',
                'M2',
                'M3',
                'M4',
                'M5',
                'M6',
                'M7',
                'M8',
                'M9',
                'M10',
                'M11',
                'M12',
            ],
        });
        expect(
            moment.locale(),
            'lazy loads a parentLocale with a normalized name'
        ).toBe('de_test');
    });
});
