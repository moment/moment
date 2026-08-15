import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/pa-in';

describe('locale:pa-in', () => {
    setupLocaleTests('pa-in');

    test('parse', () => {
        var tests =
                'ਜਨਵਰੀ ਜਨਵਰੀ_ਫ਼ਰਵਰੀ ਫ਼ਰਵਰੀ_ਮਾਰਚ ਮਾਰਚ_ਅਪ੍ਰੈਲ ਅਪ੍ਰੈਲ_ਮਈ ਮਈ_ਜੂਨ ਜੂਨ_ਜੁਲਾਈ ਜੁਲਾਈ_ਅਗਸਤ ਅਗਸਤ_ਸਤੰਬਰ ਸਤੰਬਰ_ਅਕਤੂਬਰ ਅਕਤੂਬਰ_ਨਵੰਬਰ ਨਵੰਬਰ_ਦਸੰਬਰ ਦਸੰਬਰ'.split(
                    '_'
                ),
            i;
        function equalTest(input, mmm, i) {
            expect(
                moment(input, mmm).month(),
                input + ' should be month ' + (i + 1)
            ).toBe(i);
        }

        function equalTestStrict(input, mmm, monthIndex) {
            expect(
                moment(input, mmm, true).month(),
                input +
                    ' ' +
                    mmm +
                    ' should be strict month ' +
                    (monthIndex + 1)
            ).toBe(monthIndex);
        }

        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);

            equalTestStrict(tests[i][1], 'MMM', i);
            equalTestStrict(tests[i][0], 'MMMM', i);
            equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
            equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
            equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, Do MMMM YYYY, a h:mm:ss ਵਜੇ',
                    'ਐਤਵਾਰ, ੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫:੫੦ ਵਜੇ',
                ],
                ['ddd, a h ਵਜੇ', 'ਐਤ, ਦੁਪਹਿਰ ੩ ਵਜੇ'],
                ['M Mo MM MMMM MMM', '੨ ੨ ੦੨ ਫ਼ਰਵਰੀ ਫ਼ਰਵਰੀ'],
                ['YYYY YY', '੨੦੧੦ ੧੦'],
                ['D Do DD', '੧੪ ੧੪ ੧੪'],
                ['d do dddd ddd dd', '੦ ੦ ਐਤਵਾਰ ਐਤ ਐਤ'],
                ['DDD DDDo DDDD', '੪੫ ੪੫ ੦੪੫'],
                ['w wo ww', '੮ ੮ ੦੮'],
                ['h hh', '੩ ੦੩'],
                ['H HH', '੧੫ ੧੫'],
                ['m mm', '੨੫ ੨੫'],
                ['s ss', '੫੦ ੫੦'],
                ['a A', 'ਦੁਪਹਿਰ ਦੁਪਹਿਰ'],
                ['LTS', 'ਦੁਪਹਿਰ ੩:੨੫:੫੦ ਵਜੇ'],
                ['L', '੧੪/੦੨/੨੦੧੦'],
                ['LL', '੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦'],
                ['LLL', '੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫ ਵਜੇ'],
                ['LLLL', 'ਐਤਵਾਰ, ੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫ ਵਜੇ'],
                ['l', '੧੪/੨/੨੦੧੦'],
                ['ll', '੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦'],
                ['lll', '੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫ ਵਜੇ'],
                ['llll', 'ਐਤ, ੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫ ਵਜੇ'],
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '੧').toBe('੧');
        expect(moment([2011, 0, 2]).format('DDDo'), '੨').toBe('੨');
        expect(moment([2011, 0, 3]).format('DDDo'), '੩').toBe('੩');
        expect(moment([2011, 0, 4]).format('DDDo'), '੪').toBe('੪');
        expect(moment([2011, 0, 5]).format('DDDo'), '੫').toBe('੫');
        expect(moment([2011, 0, 6]).format('DDDo'), '੬').toBe('੬');
        expect(moment([2011, 0, 7]).format('DDDo'), '੭').toBe('੭');
        expect(moment([2011, 0, 8]).format('DDDo'), '੮').toBe('੮');
        expect(moment([2011, 0, 9]).format('DDDo'), '੯').toBe('੯');
        expect(moment([2011, 0, 10]).format('DDDo'), '੧੦').toBe('੧੦');

        expect(moment([2011, 0, 11]).format('DDDo'), '੧੧').toBe('੧੧');
        expect(moment([2011, 0, 12]).format('DDDo'), '੧੨').toBe('੧੨');
        expect(moment([2011, 0, 13]).format('DDDo'), '੧੩').toBe('੧੩');
        expect(moment([2011, 0, 14]).format('DDDo'), '੧੪').toBe('੧੪');
        expect(moment([2011, 0, 15]).format('DDDo'), '੧੫').toBe('੧੫');
        expect(moment([2011, 0, 16]).format('DDDo'), '੧੬').toBe('੧੬');
        expect(moment([2011, 0, 17]).format('DDDo'), '੧੭').toBe('੧੭');
        expect(moment([2011, 0, 18]).format('DDDo'), '੧੮').toBe('੧੮');
        expect(moment([2011, 0, 19]).format('DDDo'), '੧੯').toBe('੧੯');
        expect(moment([2011, 0, 20]).format('DDDo'), '੨੦').toBe('੨੦');

        expect(moment([2011, 0, 21]).format('DDDo'), '੨੧').toBe('੨੧');
        expect(moment([2011, 0, 22]).format('DDDo'), '੨੨').toBe('੨੨');
        expect(moment([2011, 0, 23]).format('DDDo'), '੨੩').toBe('੨੩');
        expect(moment([2011, 0, 24]).format('DDDo'), '੨੪').toBe('੨੪');
        expect(moment([2011, 0, 25]).format('DDDo'), '੨੫').toBe('੨੫');
        expect(moment([2011, 0, 26]).format('DDDo'), '੨੬').toBe('੨੬');
        expect(moment([2011, 0, 27]).format('DDDo'), '੨੭').toBe('੨੭');
        expect(moment([2011, 0, 28]).format('DDDo'), '੨੮').toBe('੨੮');
        expect(moment([2011, 0, 29]).format('DDDo'), '੨੯').toBe('੨੯');
        expect(moment([2011, 0, 30]).format('DDDo'), '੩੦').toBe('੩੦');

        expect(moment([2011, 0, 31]).format('DDDo'), '੩੧').toBe('੩੧');
    });

    test('format month', () => {
        var expected =
                'ਜਨਵਰੀ ਜਨਵਰੀ_ਫ਼ਰਵਰੀ ਫ਼ਰਵਰੀ_ਮਾਰਚ ਮਾਰਚ_ਅਪ੍ਰੈਲ ਅਪ੍ਰੈਲ_ਮਈ ਮਈ_ਜੂਨ ਜੂਨ_ਜੁਲਾਈ ਜੁਲਾਈ_ਅਗਸਤ ਅਗਸਤ_ਸਤੰਬਰ ਸਤੰਬਰ_ਅਕਤੂਬਰ ਅਕਤੂਬਰ_ਨਵੰਬਰ ਨਵੰਬਰ_ਦਸੰਬਰ ਦਸੰਬਰ'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format week', () => {
        var expected =
                'ਐਤਵਾਰ ਐਤ ਐਤ_ਸੋਮਵਾਰ ਸੋਮ ਸੋਮ_ਮੰਗਲਵਾਰ ਮੰਗਲ ਮੰਗਲ_ਬੁਧਵਾਰ ਬੁਧ ਬੁਧ_ਵੀਰਵਾਰ ਵੀਰ ਵੀਰ_ਸ਼ੁੱਕਰਵਾਰ ਸ਼ੁਕਰ ਸ਼ੁਕਰ_ਸ਼ਨੀਚਰਵਾਰ ਸ਼ਨੀ ਸ਼ਨੀ'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(
                moment([2011, 0, 2 + i]).format('dddd ddd dd'),
                expected[i]
            ).toBe(expected[i]);
        }
    });

    test('from', () => {
        var start = moment([2007, 1, 28]);
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
            '44 seconds = a few seconds'
        ).toBe('ਕੁਝ ਸਕਿੰਟ');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('ਇਕ ਮਿੰਟ');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('ਇਕ ਮਿੰਟ');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('੨ ਮਿੰਟ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('੪੪ ਮਿੰਟ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('ਇੱਕ ਘੰਟਾ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('ਇੱਕ ਘੰਟਾ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('੨ ਘੰਟੇ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('੫ ਘੰਟੇ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('੨੧ ਘੰਟੇ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('ਇੱਕ ਦਿਨ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('ਇੱਕ ਦਿਨ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('੨ ਦਿਨ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('ਇੱਕ ਦਿਨ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('੫ ਦਿਨ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('੨੫ ਦਿਨ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('ਇੱਕ ਮਹੀਨਾ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('ਇੱਕ ਮਹੀਨਾ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('ਇੱਕ ਮਹੀਨਾ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('੨ ਮਹੀਨੇ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('੨ ਮਹੀਨੇ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('੩ ਮਹੀਨੇ');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('ਇੱਕ ਮਹੀਨਾ');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('੫ ਮਹੀਨੇ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('ਇੱਕ ਸਾਲ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('੨ ਸਾਲ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('ਇੱਕ ਸਾਲ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('੫ ਸਾਲ');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('ਕੁਝ ਸਕਿੰਟ ਵਿੱਚ');
        expect(moment(0).from(30000), 'suffix').toBe('ਕੁਝ ਸਕਿੰਟ ਪਿਛਲੇ');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('ਕੁਝ ਸਕਿੰਟ ਪਿਛਲੇ');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'ਕੁਝ ਸਕਿੰਟ ਵਿੱਚ').toBe(
            'ਕੁਝ ਸਕਿੰਟ ਵਿੱਚ'
        );
        expect(moment().add({ d: 5 }).fromNow(), '੫ ਦਿਨ ਵਿੱਚ').toBe(
            '੫ ਦਿਨ ਵਿੱਚ'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'ਅਜ ਦੁਪਹਿਰ ੧੨:੦੦ ਵਜੇ'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'ਅਜ ਦੁਪਹਿਰ ੧੨:੨੫ ਵਜੇ'
        );
        expect(moment(a).add({ h: 3 }).calendar(), 'Now plus 3 hours').toBe(
            'ਅਜ ਦੁਪਹਿਰ ੩:੦੦ ਵਜੇ'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('ਕਲ ਦੁਪਹਿਰ ੧੨:੦੦ ਵਜੇ');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('ਅਜ ਦੁਪਹਿਰ ੧੧:੦੦ ਵਜੇ');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('ਕਲ ਦੁਪਹਿਰ ੧੨:੦੦ ਵਜੇ');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('[ਅਗਲਾ] dddd[,] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('[ਅਗਲਾ] dddd[,] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('[ਅਗਲਾ] dddd[,] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[ਪਿਛਲੇ] dddd[,] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[ਪਿਛਲੇ] dddd[,] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[ਪਿਛਲੇ] dddd[,] LT')
            );
        }
    });

    test('calendar all else', () => {
        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        expect(weeksAgo.calendar(), '1 week ago').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), 'in 1 week').toBe(
            weeksFromNow.format('L')
        );

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        expect(weeksAgo.calendar(), '2 weeks ago').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), 'in 2 weeks').toBe(
            weeksFromNow.format('L')
        );
    });

    test('meridiem invariant', () => {
        expect(moment([2011, 2, 23, 2, 30]).format('a'), 'before dawn').toBe(
            'ਰਾਤ'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('a'), 'morning').toBe(
            'ਸਵੇਰ'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('a'), 'during day').toBe(
            'ਦੁਪਹਿਰ'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('a'), 'evening').toBe(
            'ਸ਼ਾਮ'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('a'), 'late evening').toBe(
            'ਸ਼ਾਮ'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('a'), 'night').toBe('ਰਾਤ');

        expect(moment([2011, 2, 23, 2, 30]).format('A'), 'before dawn').toBe(
            'ਰਾਤ'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('A'), 'morning').toBe(
            'ਸਵੇਰ'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('A'), ' during day').toBe(
            'ਦੁਪਹਿਰ'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('A'), 'evening').toBe(
            'ਸ਼ਾਮ'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('A'), 'late evening').toBe(
            'ਸ਼ਾਮ'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('A'), 'night').toBe('ਰਾਤ');
    });

    test('weeks year starting sunday', () => {
        expect(
            moment([2012, 0, 1]).week(),
            'Jan  1 2012 should be week 1'
        ).toBe(1);
        expect(
            moment([2012, 0, 7]).week(),
            'Jan  7 2012 should be week 1'
        ).toBe(1);
        expect(
            moment([2012, 0, 8]).week(),
            'Jan  8 2012 should be week 2'
        ).toBe(2);
        expect(
            moment([2012, 0, 14]).week(),
            'Jan 14 2012 should be week 2'
        ).toBe(2);
        expect(
            moment([2012, 0, 15]).week(),
            'Jan 15 2012 should be week 3'
        ).toBe(3);
    });

    test('weeks year starting monday', () => {
        expect(
            moment([2006, 11, 31]).week(),
            'Dec 31 2006 should be week 1'
        ).toBe(1);
        expect(
            moment([2007, 0, 1]).week(),
            'Jan  1 2007 should be week 1'
        ).toBe(1);
        expect(
            moment([2007, 0, 6]).week(),
            'Jan  6 2007 should be week 1'
        ).toBe(1);
        expect(
            moment([2007, 0, 7]).week(),
            'Jan  7 2007 should be week 2'
        ).toBe(2);
        expect(
            moment([2007, 0, 13]).week(),
            'Jan 13 2007 should be week 2'
        ).toBe(2);
        expect(
            moment([2007, 0, 14]).week(),
            'Jan 14 2007 should be week 3'
        ).toBe(3);
    });

    test('weeks year starting tuesday', () => {
        expect(
            moment([2007, 11, 29]).week(),
            'Dec 29 2007 should be week 52'
        ).toBe(52);
        expect(
            moment([2008, 0, 1]).week(),
            'Jan  1 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 5]).week(),
            'Jan  5 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 6]).week(),
            'Jan  6 2008 should be week 2'
        ).toBe(2);
        expect(
            moment([2008, 0, 12]).week(),
            'Jan 12 2008 should be week 2'
        ).toBe(2);
        expect(
            moment([2008, 0, 13]).week(),
            'Jan 13 2008 should be week 3'
        ).toBe(3);
    });

    test('weeks year starting wednesday', () => {
        expect(
            moment([2002, 11, 29]).week(),
            'Dec 29 2002 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 1]).week(),
            'Jan  1 2003 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 4]).week(),
            'Jan  4 2003 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 5]).week(),
            'Jan  5 2003 should be week 2'
        ).toBe(2);
        expect(
            moment([2003, 0, 11]).week(),
            'Jan 11 2003 should be week 2'
        ).toBe(2);
        expect(
            moment([2003, 0, 12]).week(),
            'Jan 12 2003 should be week 3'
        ).toBe(3);
    });

    test('weeks year starting thursday', () => {
        expect(
            moment([2008, 11, 28]).week(),
            'Dec 28 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 1]).week(),
            'Jan  1 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 3]).week(),
            'Jan  3 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 4]).week(),
            'Jan  4 2009 should be week 2'
        ).toBe(2);
        expect(
            moment([2009, 0, 10]).week(),
            'Jan 10 2009 should be week 2'
        ).toBe(2);
        expect(
            moment([2009, 0, 11]).week(),
            'Jan 11 2009 should be week 3'
        ).toBe(3);
    });

    test('weeks year starting friday', () => {
        expect(
            moment([2009, 11, 27]).week(),
            'Dec 27 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 1]).week(),
            'Jan  1 2010 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 2]).week(),
            'Jan  2 2010 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 3]).week(),
            'Jan  3 2010 should be week 2'
        ).toBe(2);
        expect(
            moment([2010, 0, 9]).week(),
            'Jan  9 2010 should be week 2'
        ).toBe(2);
        expect(
            moment([2010, 0, 10]).week(),
            'Jan 10 2010 should be week 3'
        ).toBe(3);
    });

    test('weeks year starting saturday', () => {
        expect(
            moment([2010, 11, 26]).week(),
            'Dec 26 2010 should be week 1'
        ).toBe(1);
        expect(
            moment([2011, 0, 1]).week(),
            'Jan  1 2011 should be week 1'
        ).toBe(1);
        expect(
            moment([2011, 0, 2]).week(),
            'Jan  2 2011 should be week 2'
        ).toBe(2);
        expect(
            moment([2011, 0, 8]).week(),
            'Jan  8 2011 should be week 2'
        ).toBe(2);
        expect(
            moment([2011, 0, 9]).week(),
            'Jan  9 2011 should be week 3'
        ).toBe(3);
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('੧ ੦੧ ੧');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('੧ ੦੧ ੧');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('੨ ੦੨ ੨');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 2'
        ).toBe('੨ ੦੨ ੨');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('੩ ੦੩ ੩');
    });

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
});
