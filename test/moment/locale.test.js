import { beforeEach, describe, expect, test } from 'vitest';
import { expectDeprecations } from '../helpers/deprecation-handler';
import moment from '../../src/moment';
import each from '../helpers/each';
import indexOf from '../../src/lib/utils/index-of';

describe('locale', () => {
    beforeEach(() => {
        // TODO: Remove once locales are switched to ES6
        each(
            [
                {
                    name: 'en-gb',
                    data: {},
                },
                {
                    name: 'en-ca',
                    data: {},
                },
                {
                    name: 'es',
                    data: {
                        relativeTime: {
                            past: 'hace %s',
                            s: 'unos segundos',
                            d: 'un día',
                        },
                        months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
                            '_'
                        ),
                    },
                },
                {
                    name: 'fr',
                    data: {},
                },
                {
                    name: 'fr-ca',
                    data: {},
                },
                {
                    name: 'it',
                    data: {},
                },
                {
                    name: 'zh-cn',
                    data: {
                        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split(
                            '_'
                        ),
                    },
                },
            ],
            function (locale) {
                if (moment.locale(locale.name) !== locale.name) {
                    moment.defineLocale(locale.name, locale.data);
                }
            }
        );
        moment.locale('en');
    });

    test('library getters and setters', () => {
        var r = moment.locale('en');

        expect(r, 'locale should return en by default').toBe('en');
        expect(moment.locale(), 'locale should return en by default').toBe(
            'en'
        );

        moment.locale('fr');
        expect(moment.locale(), 'locale should return the changed locale').toBe(
            'fr'
        );

        moment.locale('en-gb');
        expect(moment.locale(), 'locale should return the changed locale').toBe(
            'en-gb'
        );

        moment.locale('en');
        expect(moment.locale(), 'locale should reset').toBe('en');

        moment.locale('does-not-exist');
        expect(moment.locale(), 'locale should reset').toBe('en');

        moment.locale('EN');
        expect(moment.locale(), 'Normalize locale key case').toBe('en');

        moment.locale('EN_gb');
        expect(moment.locale(), 'Normalize locale key underscore').toBe(
            'en-gb'
        );
        expect(
            indexOf.call(moment.locales(), 'EN_gb'),
            'Do not cache the unnormalized locale key'
        ).toBe(-1);
        expect(
            indexOf.call(moment.locales(), 'en_gb'),
            'Do not cache a partially normalized locale key'
        ).toBe(-1);
    });

    test('preserve exact custom locale names', () => {
        moment.defineLocale('Mixed_Custom', { months: ['Movember'] });

        expect(
            moment.localeData('Mixed_Custom')._abbr,
            'finds a custom locale before normalizing its name'
        ).toBe('Mixed_Custom');
        expect(
            moment.locale(),
            'sets a custom locale using its exact name'
        ).toBe('Mixed_Custom');

        moment.defineLocale('Mixed_Custom', null);
    });

    test('do not load invalid built-in locale names', () => {
        var invalidNames = ['.', '..', 'locale name', 'en@gb'];

        each(invalidNames, function (name) {
            moment.localeData(name);
            expect(
                indexOf.call(moment.locales(), name),
                'does not cache invalid locale name "' + name + '"'
            ).toBe(-1);
        });
    });

    test('library setter array of locales', () => {
        expect(
            moment.locale(['non-existent', 'fr', 'also-non-existent']),
            'passing an array uses the first valid locale'
        ).toBe('fr');
        expect(
            moment.locale(['es', 'fr', 'also-non-existent']),
            'passing an array uses the first valid locale'
        ).toBe('es');
    });

    test('library setter locale substrings', () => {
        expect(moment.locale('fr-crap'), 'use substrings').toBe('fr');
        expect(moment.locale('fr-does-not-exist'), 'uses deep substrings').toBe(
            'fr'
        );
        expect(
            moment.locale('fr-CA-does-not-exist'),
            'uses deepest substring'
        ).toBe('fr-ca');
    });

    test('library getter locale array and substrings', () => {
        expect(
            moment.locale(['en-CH', 'fr']),
            'prefer root locale to shallower ones'
        ).toBe('en');
        expect(
            moment.locale(['en-gb-leeds', 'en-CA']),
            'prefer root locale to shallower ones'
        ).toBe('en-gb');
        expect(
            moment.locale(['en-fake', 'en-CA']),
            'prefer alternatives with shared roots'
        ).toBe('en-ca');
        expect(
            moment.locale(['en-fake', 'en-fake2', 'en-ca']),
            'prefer alternatives with shared roots'
        ).toBe('en-ca');
        expect(
            moment.locale(['fake-CA', 'fake-MX', 'fr']),
            'always find something if possible'
        ).toBe('fr');
        expect(
            moment.locale(['fake-CA', 'fake-MX', 'fr']),
            'always find something if possible'
        ).toBe('fr');
        expect(
            moment.locale(['fake-CA', 'fake-MX', 'fr-fake-fake-fake']),
            'always find something if possible'
        ).toBe('fr');
        expect(
            moment.locale(['en', 'en-CA']),
            'prefer earlier if it works'
        ).toBe('en');
    });

    test('library ensure inheritance', () => {
        moment.locale('made-up', {
            // I put them out of order
            months: 'February_March_April_May_June_July_August_September_October_November_December_January'.split(
                '_'
            ),
            // the rest of the properties should be inherited.
        });

        expect(
            moment([2012, 5, 6]).format('MMMM'),
            'Override some of the configs'
        ).toBe('July');
        expect(moment([2012, 5, 6]).format('MMM'), 'But not all of them').toBe(
            'Jun'
        );
    });

    test('library ensure inheritance LT L LL LLL LLLL', () => {
        var locale = 'test-inherit-lt';

        moment.defineLocale(locale, {
            longDateFormat: {
                LT: '-[LT]-',
                L: '-[L]-',
                LL: '-[LL]-',
                LLL: '-[LLL]-',
                LLLL: '-[LLLL]-',
            },
            calendar: {
                sameDay: '[sameDay] LT',
                nextDay: '[nextDay] L',
                nextWeek: '[nextWeek] LL',
                lastDay: '[lastDay] LLL',
                lastWeek: '[lastWeek] LLLL',
                sameElse: 'L',
            },
        });

        moment.locale('es');

        expect(
            moment().locale(locale).calendar(),
            'Should use instance locale in LT formatting'
        ).toBe('sameDay -LT-');
        expect(
            moment().add(1, 'days').locale(locale).calendar(),
            'Should use instance locale in L formatting'
        ).toBe('nextDay -L-');
        expect(
            moment().add(-1, 'days').locale(locale).calendar(),
            'Should use instance locale in LL formatting'
        ).toBe('lastDay -LLL-');
        expect(
            moment().add(4, 'days').locale(locale).calendar(),
            'Should use instance locale in LLL formatting'
        ).toBe('nextWeek -LL-');
        expect(
            moment().add(-4, 'days').locale(locale).calendar(),
            'Should use instance locale in LLLL formatting'
        ).toBe('lastWeek -LLLL-');
    });

    test('library localeData', () => {
        moment.locale('en');

        var jan = moment([2000, 0]);

        expect(
            moment.localeData().months(jan),
            'no arguments returns global'
        ).toBe('January');
        expect(
            moment.localeData('zh-cn').months(jan),
            'a string returns the locale based on key'
        ).toBe('一月');
        expect(
            moment.localeData(moment().locale('es')).months(jan),
            "if you pass in a moment it uses the moment's locale"
        ).toBe('enero');
    });

    test('library deprecations', () => {
        expectDeprecations('moment.lang');
        moment.lang('dude', { months: ['Movember'] });
        expect(moment.locale(), 'setting the lang sets the locale').toBe(
            'dude'
        );
        expect(moment.lang()).toBe(moment.locale());
        expect(moment.langData(), 'langData is localeData').toBe(
            moment.localeData()
        );
        moment.defineLocale('dude', null);
    });

    test('defineLocale', () => {
        moment.locale('en');
        moment.defineLocale('dude', { months: ['Movember'] });
        expect(moment().locale(), 'defineLocale also sets it').toBe('dude');
        expect(
            moment().locale('dude').locale(),
            'defineLocale defines a locale'
        ).toBe('dude');
        moment.defineLocale('dude', null);
    });

    test('locales', () => {
        moment.defineLocale('dude', { months: ['Movember'] });
        expect(true, 'locales returns an array of defined locales').toBe(
            !!~indexOf.call(moment.locales(), 'dude')
        );
        expect(true, 'locales should always include english').toBe(
            !!~indexOf.call(moment.locales(), 'en')
        );
        moment.defineLocale('dude', null);
    });

    test('library convenience', () => {
        moment.locale('something', { week: { dow: 3 } });
        moment.locale('something');
        expect(
            moment.locale(),
            'locale can be used to create the locale too'
        ).toBe('something');
        moment.defineLocale('something', null);
    });

    test('firstDayOfWeek firstDayOfYear locale getters', () => {
        moment.locale('something', { week: { dow: 3, doy: 4 } });
        moment.locale('something');
        expect(moment.localeData().firstDayOfWeek(), 'firstDayOfWeek').toBe(3);
        expect(moment.localeData().firstDayOfYear(), 'firstDayOfYear').toBe(4);
        moment.defineLocale('something', null);
    });

    test('instance locale method', () => {
        moment.locale('en');

        expect(
            moment([2012, 5, 6]).format('MMMM'),
            'Normally default to global'
        ).toBe('June');
        expect(
            moment([2012, 5, 6]).locale('es').format('MMMM'),
            'Use the instance specific locale'
        ).toBe('junio');
        expect(
            moment([2012, 5, 6]).format('MMMM'),
            'Using an instance specific locale does not affect other moments'
        ).toBe('June');
    });

    test('instance locale method with array', () => {
        var m = moment().locale(['non-existent', 'fr', 'also-non-existent']);
        expect(m.locale(), 'passing an array uses the first valid locale').toBe(
            'fr'
        );
        m = moment().locale(['es', 'fr', 'also-non-existent']);
        expect(m.locale(), 'passing an array uses the first valid locale').toBe(
            'es'
        );
    });

    test('instance getter locale substrings', () => {
        var m = moment();

        m.locale('fr-crap');
        expect(m.locale(), 'use substrings').toBe('fr');

        m.locale('fr-does-not-exist');
        expect(m.locale(), 'uses deep substrings').toBe('fr');
    });

    test('instance locale persists with manipulation', () => {
        moment.locale('en');

        expect(
            moment([2012, 5, 6]).locale('es').add({ days: 1 }).format('MMMM'),
            'With addition'
        ).toBe('junio');
        expect(
            moment([2012, 5, 6]).locale('es').day(0).format('MMMM'),
            'With day getter'
        ).toBe('junio');
        expect(
            moment([2012, 5, 6]).locale('es').endOf('day').format('MMMM'),
            'With endOf'
        ).toBe('junio');
    });

    test('instance locale persists with cloning', () => {
        moment.locale('en');

        var a = moment([2012, 5, 6]).locale('es'),
            b = a.clone();

        expect(b.format('MMMM'), 'using moment.fn.clone()').toBe('junio');
        expect(b.format('MMMM'), 'using moment()').toBe('junio');
    });

    test('duration locale method', () => {
        moment.locale('en');

        expect(
            moment.duration({ seconds: 44 }).humanize(),
            'Normally default to global'
        ).toBe('a few seconds');
        expect(
            moment.duration({ seconds: 44 }).locale('es').humanize(),
            'Use the instance specific locale'
        ).toBe('unos segundos');
        expect(
            moment.duration({ seconds: 44 }).humanize(),
            'Using an instance specific locale does not affect other durations'
        ).toBe('a few seconds');
    });

    test('duration locale persists with cloning', () => {
        moment.locale('en');

        var a = moment.duration({ seconds: 44 }).locale('es'),
            b = moment.duration(a);

        expect(b.humanize(), 'using moment.duration()').toBe('unos segundos');
    });

    test("changing the global locale doesn't affect existing duration instances", () => {
        var mom = moment.duration();
        moment.locale('fr');
        expect('en').toBe(mom.locale());
    });

    test('duration deprecations', () => {
        expectDeprecations('moment().lang()');
        expect(
            moment.duration().lang(),
            'duration.lang is the same as duration.localeData'
        ).toBe(moment.duration().localeData());
    });

    test('from and fromNow with invalid date', () => {
        expect(moment(NaN).from(), 'moment.from with invalid moment').toBe(
            'Invalid date'
        );
        expect(
            moment(NaN).fromNow(),
            'moment.fromNow with invalid moment'
        ).toBe('Invalid date');
    });

    test('from relative time future', () => {
        var start = moment([2007, 1, 28]);

        expect(
            start.from(moment([2007, 1, 28]).subtract({ s: 44 })),
            '44 seconds = a few seconds'
        ).toBe('in a few seconds');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ s: 45 })),
            '45 seconds = a minute'
        ).toBe('in a minute');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ s: 89 })),
            '89 seconds = a minute'
        ).toBe('in a minute');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ s: 90 })),
            '90 seconds = 2 minutes'
        ).toBe('in 2 minutes');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ m: 44 })),
            '44 minutes = 44 minutes'
        ).toBe('in 44 minutes');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ m: 45 })),
            '45 minutes = an hour'
        ).toBe('in an hour');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ m: 89 })),
            '89 minutes = an hour'
        ).toBe('in an hour');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ m: 90 })),
            '90 minutes = 2 hours'
        ).toBe('in 2 hours');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ h: 5 })),
            '5 hours = 5 hours'
        ).toBe('in 5 hours');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ h: 21 })),
            '21 hours = 21 hours'
        ).toBe('in 21 hours');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ h: 22 })),
            '22 hours = a day'
        ).toBe('in a day');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ h: 35 })),
            '35 hours = a day'
        ).toBe('in a day');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ h: 36 })),
            '36 hours = 2 days'
        ).toBe('in 2 days');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 1 })),
            '1 day = a day'
        ).toBe('in a day');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 5 })),
            '5 days = 5 days'
        ).toBe('in 5 days');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 25 })),
            '25 days = 25 days'
        ).toBe('in 25 days');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 26 })),
            '26 days = a month'
        ).toBe('in a month');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 30 })),
            '30 days = a month'
        ).toBe('in a month');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 45 })),
            '45 days = a month'
        ).toBe('in a month');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 47 })),
            '47 days = 2 months'
        ).toBe('in 2 months');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 74 })),
            '74 days = 2 months'
        ).toBe('in 2 months');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 78 })),
            '78 days = 3 months'
        ).toBe('in 3 months');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ M: 1 })),
            '1 month = a month'
        ).toBe('in a month');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ M: 5 })),
            '5 months = 5 months'
        ).toBe('in 5 months');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 315 })),
            '315 days = 10 months'
        ).toBe('in 10 months');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 344 })),
            '344 days = a year'
        ).toBe('in a year');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 345 })),
            '345 days = a year'
        ).toBe('in a year');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ d: 548 })),
            '548 days = in 2 years'
        ).toBe('in 2 years');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ y: 1 })),
            '1 year = a year'
        ).toBe('in a year');
        expect(
            start.from(moment([2007, 1, 28]).subtract({ y: 5 })),
            '5 years = 5 years'
        ).toBe('in 5 years');
    });

    test('from relative time past', () => {
        var start = moment([2007, 1, 28]);

        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 })),
            '44 seconds = a few seconds'
        ).toBe('a few seconds ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 })),
            '45 seconds = a minute'
        ).toBe('a minute ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 })),
            '89 seconds = a minute'
        ).toBe('a minute ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 })),
            '90 seconds = 2 minutes'
        ).toBe('2 minutes ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 })),
            '44 minutes = 44 minutes'
        ).toBe('44 minutes ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 })),
            '45 minutes = an hour'
        ).toBe('an hour ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 })),
            '89 minutes = an hour'
        ).toBe('an hour ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 })),
            '90 minutes = 2 hours'
        ).toBe('2 hours ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 })),
            '5 hours = 5 hours'
        ).toBe('5 hours ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 })),
            '21 hours = 21 hours'
        ).toBe('21 hours ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 })),
            '22 hours = a day'
        ).toBe('a day ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 })),
            '35 hours = a day'
        ).toBe('a day ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 })),
            '36 hours = 2 days'
        ).toBe('2 days ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 })),
            '1 day = a day'
        ).toBe('a day ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 })),
            '5 days = 5 days'
        ).toBe('5 days ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 })),
            '25 days = 25 days'
        ).toBe('25 days ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 })),
            '26 days = a month'
        ).toBe('a month ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 })),
            '30 days = a month'
        ).toBe('a month ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 })),
            '43 days = a month'
        ).toBe('a month ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 })),
            '46 days = 2 months'
        ).toBe('2 months ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 })),
            '75 days = 2 months'
        ).toBe('2 months ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 })),
            '76 days = 3 months'
        ).toBe('3 months ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 })),
            '1 month = a month'
        ).toBe('a month ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 })),
            '5 months = 5 months'
        ).toBe('5 months ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 315 })),
            '315 days = 10 months'
        ).toBe('10 months ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 344 })),
            '344 days = a year'
        ).toBe('a year ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 })),
            '345 days = a year'
        ).toBe('a year ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 })),
            '548 days = 2 years'
        ).toBe('2 years ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 })),
            '1 year = a year'
        ).toBe('a year ago');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 })),
            '5 years = 5 years'
        ).toBe('5 years ago');
    });

    test('instance locale used with from', () => {
        moment.locale('en');

        var a = moment([2012, 5, 6]).locale('es'),
            b = moment([2012, 5, 7]);

        expect(a.from(b), 'preserve locale of first moment').toBe(
            'hace un día'
        );
        expect(b.from(a), 'do not preserve locale of second moment').toBe(
            'in a day'
        );
    });

    test('instance localeData', () => {
        moment.defineLocale('dude', { week: { dow: 3 } });
        expect(moment().locale('dude').localeData()._week.dow).toBe(3);
        moment.defineLocale('dude', null);
    });

    test('month name callback function', () => {
        function fakeReplace(m, format) {
            if (/test/.test(format)) {
                return 'test';
            }
            if (m.date() === 1) {
                return 'date';
            }
            return 'default';
        }

        moment.locale('made-up-2', {
            months: fakeReplace,
            monthsShort: fakeReplace,
            weekdays: fakeReplace,
            weekdaysShort: fakeReplace,
            weekdaysMin: fakeReplace,
        });

        expect(
            moment().format('[test] dd ddd dddd MMM MMMM'),
            'format month name function should be able to access the format string'
        ).toBe('test test test test test test');
        expect(
            moment([2011, 0, 1]).format('dd ddd dddd MMM MMMM'),
            'format month name function should be able to access the moment object'
        ).toBe('date date date date date');
        expect(
            moment([2011, 0, 2]).format('dd ddd dddd MMM MMMM'),
            'format month name function should be able to access the moment object'
        ).toBe('default default default default default');
    });

    test('changing parts of a locale config', () => {
        expectDeprecations('defineLocaleOverride');

        moment.locale('partial-lang', {
            months: 'a b c d e f g h i j k l'.split(' '),
        });

        expect(
            moment([2011, 0, 1]).format('MMMM'),
            'should be able to set locale values when creating the localeuage'
        ).toBe('a');

        moment.locale('partial-lang', {
            monthsShort: 'A B C D E F G H I J K L'.split(' '),
        });

        expect(
            moment([2011, 0, 1]).format('MMMM MMM'),
            'should be able to set locale values after creating the localeuage'
        ).toBe('a A');

        moment.defineLocale('partial-lang', null);
    });

    test('start/endOf week feature for first-day-is-monday locales', () => {
        moment.locale('monday-lang', {
            week: {
                dow: 1, // Monday is the first day of the week
            },
        });

        moment.locale('monday-lang');
        expect(
            moment([2013, 0, 1]).startOf('week').day(),
            'for locale monday-lang first day of the week should be monday'
        ).toBe(1);
        expect(
            moment([2013, 0, 1]).endOf('week').day(),
            'for locale monday-lang last day of the week should be sunday'
        ).toBe(0);
        moment.defineLocale('monday-lang', null);
    });

    test('meridiem parsing', () => {
        moment.locale('meridiem-parsing', {
            meridiemParse: /[bd]/i,
            isPM: function (input) {
                return input === 'b';
            },
        });

        moment.locale('meridiem-parsing');
        expect(
            moment('2012-01-01 3b', 'YYYY-MM-DD ha').hour(),
            'Custom parsing of meridiem should work'
        ).toBe(15);
        expect(
            moment('2012-01-01 3d', 'YYYY-MM-DD ha').hour(),
            'Custom parsing of meridiem should work'
        ).toBe(3);
        moment.defineLocale('meridiem-parsing', null);
    });

    test('invalid date formatting', () => {
        moment.locale('has-invalid', {
            invalidDate: 'KHAAAAAAAAAAAN!',
        });

        expect(moment.invalid().format()).toBe('KHAAAAAAAAAAAN!');
        expect(moment.invalid().format('YYYY-MM-DD')).toBe('KHAAAAAAAAAAAN!');
        moment.defineLocale('has-invalid', null);
    });

    test('return locale name', () => {
        var registered = moment.locale('return-this', {});

        expect(registered, 'returns the locale configured').toBe('return-this');
        moment.defineLocale('return-this', null);
    });

    test("changing the global locale doesn't affect existing instances", () => {
        var mom = moment();
        moment.locale('fr');
        expect('en').toBe(mom.locale());
    });

    test('setting a language on instance returns the original moment for chaining', () => {
        expectDeprecations('moment().lang()');
        var mom = moment();

        expect(
            mom.lang('fr'),
            'setting the language (lang) returns the original moment for chaining'
        ).toBe(mom);
        expect(
            mom.locale('it'),
            'setting the language (locale) returns the original moment for chaining'
        ).toBe(mom);
    });

    test('lang(key) changes the language of the instance', () => {
        expectDeprecations('moment().lang()');
        var m = moment().month(0);
        m.lang('fr');
        expect(m.locale(), 'm.lang(key) changes instance locale').toBe('fr');
    });

    test('moment#locale(false) resets to global locale', () => {
        var m = moment();

        moment.locale('fr');
        m.locale('it');

        expect(moment.locale(), 'global locale is it').toBe('fr');
        expect(m.locale(), 'instance locale is it').toBe('it');
        m.locale(false);
        expect(m.locale(), 'instance locale reset to global locale').toBe('fr');
    });

    test("moment().locale with missing key doesn't change locale", () => {
        expect(
            moment().locale('boo').localeData(),
            'preserve global locale in case of bad locale id'
        ).toBe(moment.localeData());
    });

    test("moment().lang with missing key doesn't change locale", () => {
        expectDeprecations('moment().lang()');
        expect(
            moment().lang('boo').localeData(),
            'preserve global locale in case of bad locale id'
        ).toBe(moment.localeData());
    });

    test('when in strict mode with inexact parsing, treat periods in short weekdays literally, not as the regex-period', () => {
        moment.defineLocale('periods-in-short-weekdays', {
            weekdays:
                'Monday_Tuesday_Wednesday_Thursday_Friday_Saturday_Sunday'.split(
                    '_'
                ),
            weekdaysShort: 'mon_t...s_wed_thurs_fri_sat_sun'.split('_'),
            weekdaysParseExact: false,
        });

        moment().locale('periods-in-short-weekdays');
        expect(moment('thurs', 'ddd', true).format('dddd')).toBe('Thursday');
    });

    test('when in strict mode with inexact parsing, treat periods in full weekdays literally, not as the regex-period', () => {
        moment.defineLocale('periods-in-full-weekdays', {
            weekdays:
                'Monday_T....day_Wednesday_Thursday_Friday_Saturday_Sunday'.split(
                    '_'
                ),
            weekdaysShort: 'mon_tues_wed_thurs_fri_sat_sun'.split('_'),
            weekdaysParseExact: false,
        });

        moment().locale('periods-in-full-weekdays');
        expect(moment('Thursday', 'dddd', true).format('ddd')).toBe('thurs');
    });

    test('when in strict mode with inexact parsing, treat periods in min-weekdays literally, not as the regex-period', () => {
        moment.defineLocale('periods-in-min-weekdays', {
            weekdays:
                'Monday_Tuesday_Wednesday_Thursday_Friday_Saturday_Sunday'.split(
                    '_'
                ),
            weekdaysMin: 'mon_t...s_wed_thurs_fri_sat_sun'.split('_'),
            weekdaysParseExact: false,
        });

        moment().locale('periods-in-min-weekdays');
        expect(moment('thurs', 'dd', true).format('dddd')).toBe('Thursday');
    });

    // TODO: Enable this after fixing pl months parse hack hack
    // test('monthsParseExact', function () {
    //     var locale = 'test-months-parse-exact';

    //     moment.defineLocale(locale, {
    //         monthsParseExact: true,
    //         months: 'A_AA_AAA_B_B B_BB  B_C_C-C_C,C2C_D_D+D_D`D*D'.split('_'),
    //         monthsShort: 'E_EE_EEE_F_FF_FFF_G_GG_GGG_H_HH_HHH'.split('_')
    //     });

    // });
});
