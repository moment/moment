import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('locale update', () => {
    test('calendar', () => {
        moment.defineLocale('cal', null);
        moment.defineLocale('cal', {
            calendar: {
                sameDay: '[Today at] HH:mm',
                nextDay: '[Tomorrow at] HH:mm',
                nextWeek: '[Next week at] HH:mm',
                lastDay: '[Yesterday at] HH:mm',
                lastWeek: '[Last week at] HH:mm',
                sameElse: '[whatever]',
            },
        });
        moment.updateLocale('cal', {
            calendar: {
                sameDay: '[Today] HH:mm',
                nextDay: '[Tomorrow] HH:mm',
                nextWeek: '[Next week] HH:mm',
            },
        });

        moment.locale('cal');
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
        moment.defineLocale('cal-2', null);
        moment.defineLocale('cal-2', {
            calendar: {
                sameDay: '[Today at] HH:mm',
                nextDay: '[Tomorrow at] HH:mm',
                nextWeek: '[Next week at] HH:mm',
                lastDay: '[Yesterday at] HH:mm',
                lastWeek: '[Last week at] HH:mm',
                sameElse: '[whatever]',
            },
        });
        moment.updateLocale('cal-2', {});
        moment.locale('cal-2');
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
        moment.defineLocale('ldf', null);
        moment.defineLocale('ldf', {
            longDateFormat: {
                LTS: 'h:mm:ss A',
                LT: 'h:mm A',
                L: 'MM/DD/YYYY',
                LL: 'MMMM D, YYYY',
                LLL: 'MMMM D, YYYY h:mm A',
                LLLL: 'dddd, MMMM D, YYYY h:mm A',
            },
        });
        moment.updateLocale('ldf', {
            longDateFormat: {
                LLL: '[child] MMMM D, YYYY h:mm A',
                LLLL: '[child] dddd, MMMM D, YYYY h:mm A',
            },
        });

        moment.locale('ldf');
        var anchor = moment.utc('2015-09-06T12:34:56', moment.ISO_8601);
        expect(anchor.format('LTS'), 'LTS uses base').toBe('12:34:56 PM');
        expect(anchor.format('LT'), 'LT uses base').toBe('12:34 PM');
        expect(anchor.format('L'), 'L uses base').toBe('09/06/2015');
        expect(anchor.format('l'), 'l uses base').toBe('9/6/2015');
        expect(anchor.format('LL'), 'LL uses base').toBe('September 6, 2015');
        expect(anchor.format('ll'), 'll uses base').toBe('Sep 6, 2015');
        expect(anchor.format('LLL'), 'LLL uses child').toBe(
            'child September 6, 2015 12:34 PM'
        );
        expect(anchor.format('lll'), 'lll uses child').toBe(
            'child Sep 6, 2015 12:34 PM'
        );
        expect(anchor.format('LLLL'), 'LLLL uses child').toBe(
            'child Sunday, September 6, 2015 12:34 PM'
        );
        expect(anchor.format('llll'), 'llll uses child').toBe(
            'child Sun, Sep 6, 2015 12:34 PM'
        );
    });

    test('ordinal', () => {
        moment.defineLocale('ordinal-1', null);
        moment.defineLocale('ordinal-1', {
            ordinal: '%dx',
        });
        moment.updateLocale('ordinal-1', {
            ordinal: '%dy',
        });

        expect(
            moment.utc('2015-02-03', moment.ISO_8601).format('Do'),
            'ordinal uses child string'
        ).toBe('3y');

        moment.defineLocale('ordinal-2', null);
        moment.defineLocale('ordinal-2', {
            ordinal: '%dx',
        });
        moment.updateLocale('ordinal-2', {
            ordinal: function (num) {
                return num + 'y';
            },
        });

        expect(
            moment.utc('2015-02-03', moment.ISO_8601).format('Do'),
            'ordinal uses child function'
        ).toBe('3y');

        moment.defineLocale('ordinal-3', null);
        moment.defineLocale('ordinal-3', {
            ordinal: function (num) {
                return num + 'x';
            },
        });
        moment.updateLocale('ordinal-3', {
            ordinal: '%dy',
        });

        expect(
            moment.utc('2015-02-03', moment.ISO_8601).format('Do'),
            'ordinal uses child string (overwrite parent function)'
        ).toBe('3y');
    });

    test('ordinal parse', () => {
        moment.defineLocale('ordinal-parse-1', null);
        moment.defineLocale('ordinal-parse-1', {
            dayOfMonthOrdinalParse: /\d{1,2}x/,
        });
        moment.updateLocale('ordinal-parse-1', {
            dayOfMonthOrdinalParse: /\d{1,2}y/,
        });

        expect(
            moment.utc('2015-01-1y', 'YYYY-MM-Do', true).isValid(),
            'ordinal parse uses child'
        ).toBeTruthy();

        moment.defineLocale('ordinal-parse-2', null);
        moment.defineLocale('ordinal-parse-2', {
            dayOfMonthOrdinalParse: /\d{1,2}x/,
        });
        moment.updateLocale('ordinal-parse-2', {
            dayOfMonthOrdinalParse: /\d{1,2}/,
        });

        expect(
            moment.utc('2015-01-1', 'YYYY-MM-Do', true).isValid(),
            'ordinal parse uses child (default)'
        ).toBeTruthy();
    });

    test('months', () => {
        moment.defineLocale('months', null);
        moment.defineLocale('months', {
            months: 'One_Two_Three_Four_Five_Six_Seven_Eight_Nine_Ten_Eleven_Twelve'.split(
                '_'
            ),
        });
        moment.updateLocale('months', {
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

    test('update existing locale', () => {
        moment.updateLocale('de', {
            monthsShort: [
                'JAN',
                'FEB',
                'MÄR',
                'APR',
                'MAI',
                'JUN',
                'JUL',
                'AUG',
                'SEP',
                'OKT',
                'NOV',
                'DEZ',
            ],
        });
        expect(moment('2017-02-01').format('YYYY MMM MMMM')).toBe(
            '2017 FEB Februar'
        );
        moment.updateLocale('de', null);
    });

    test('lazy load locale with normalized name before update', () => {
        var locale = moment.updateLocale('DE', { monthsShort: ['JAN'] }),
            january = locale.months(moment.utc([2017, 0]));

        expect(january, 'inherits the lazy-loaded locale configuration').toBe(
            'Januar'
        );
        expect(locale._abbr, 'returns the normalized locale').toBe('de');
        expect(moment.locale(), 'sets the normalized locale globally').toBe(
            'de'
        );
        expect(
            moment.locales().indexOf('DE'),
            'does not create an unnormalized locale entry'
        ).toBe(-1);

        moment.updateLocale('DE', null);
        expect(
            moment.localeData('de').monthsShort(moment.utc([2017, 0]), ''),
            'resets the normalized locale using the original name'
        ).not.toBe('JAN');
    });

    test('update non-existing locale', () => {
        moment.locale('en');
        moment.updateLocale('dude', { months: ['Movember'] });
        expect(moment.locale()).toBe('dude');
        expect(moment().locale('dude').locale()).toBe('dude');
        moment.defineLocale('dude', null);
    });

    test('reset locale', () => {
        moment.locale('de');
        var resultBeforeUpdate = moment('2017-02-01').format('YYYY MMM MMMM');
        moment.updateLocale('de', {
            monthsShort: [
                'JAN',
                'FEB',
                'MÄR',
                'APR',
                'MAI',
                'JUN',
                'JUL',
                'AUG',
                'SEP',
                'OKT',
                'NOV',
                'DEZ',
            ],
        });
        moment.updateLocale('de', null);
        expect(moment('2017-02-01').format('YYYY MMM MMMM')).toBe(
            resultBeforeUpdate
        );
    });
});
