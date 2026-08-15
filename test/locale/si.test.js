import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/si';

describe('locale:si', () => {
    setupLocaleTests('si');

    test('parse', () => {
        var tests =
                'ජනවාරි ජන_පෙබරවාරි පෙබ_මාර්තු මාර්_අප්‍රේල් අප්_මැයි මැයි_ජූනි ජූනි_ජූලි ජූලි_අගෝස්තු අගෝ_සැප්තැම්බර් සැප්_ඔක්තෝබර් ඔක්_නොවැම්බර් නොවැ_දෙසැම්බර් දෙසැ'.split(
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
                    'YYYY MMMM Do dddd, a h:mm:ss',
                    '2010 පෙබරවාරි 14 වැනි ඉරිදා, ප.ව. 3:25:50',
                ],
                [
                    'YYYY MMMM Do dddd, a h:mm:ss',
                    '2010 පෙබරවාරි 14 වැනි ඉරිදා, ප.ව. 3:25:50',
                ],
                ['ddd, A h', 'ඉරි, පස් වරු 3'],
                ['M Mo MM MMMM MMM', '2 2 වැනි 02 පෙබරවාරි පෙබ'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 වැනි 14'],
                ['d do dddd ddd dd', '0 0 වැනි ඉරිදා ඉරි ඉ'],
                ['DDD DDDo DDDD', '45 45 වැනි 045'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'ප.ව. පස් වරු'],
                ['[වසරේ] DDDo [දිනය]', 'වසරේ 45 වැනි දිනය'],
                ['LTS', 'ප.ව. 3:25:50'],
                ['LT', 'ප.ව. 3:25'],
                ['L', '2010/02/14'],
                ['LL', '2010 පෙබරවාරි 14'],
                ['LLL', '2010 පෙබරවාරි 14, ප.ව. 3:25'],
                ['LLLL', '2010 පෙබරවාරි 14 වැනි ඉරිදා, ප.ව. 3:25:50'],
                ['l', '2010/2/14'],
                ['ll', '2010 පෙබ 14'],
                ['lll', '2010 පෙබ 14, ප.ව. 3:25'],
                ['llll', '2010 පෙබ 14 වැනි ඉරි, ප.ව. 3:25:50'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1 වැනි').toBe('1 වැනි');
        expect(moment([2011, 0, 2]).format('DDDo'), '2 වැනි').toBe('2 වැනි');
        expect(moment([2011, 0, 3]).format('DDDo'), '3 වැනි').toBe('3 වැනි');
        expect(moment([2011, 0, 4]).format('DDDo'), '4 වැනි').toBe('4 වැනි');
        expect(moment([2011, 0, 5]).format('DDDo'), '5 වැනි').toBe('5 වැනි');
        expect(moment([2011, 0, 6]).format('DDDo'), '6 වැනි').toBe('6 වැනි');
        expect(moment([2011, 0, 7]).format('DDDo'), '7 වැනි').toBe('7 වැනි');
        expect(moment([2011, 0, 8]).format('DDDo'), '8 වැනි').toBe('8 වැනි');
        expect(moment([2011, 0, 9]).format('DDDo'), '9 වැනි').toBe('9 වැනි');
        expect(moment([2011, 0, 10]).format('DDDo'), '10 වැනි').toBe('10 වැනි');

        expect(moment([2011, 0, 11]).format('DDDo'), '11 වැනි').toBe('11 වැනි');
        expect(moment([2011, 0, 12]).format('DDDo'), '12 වැනි').toBe('12 වැනි');
        expect(moment([2011, 0, 13]).format('DDDo'), '13 වැනි').toBe('13 වැනි');
        expect(moment([2011, 0, 14]).format('DDDo'), '14 වැනි').toBe('14 වැනි');
        expect(moment([2011, 0, 15]).format('DDDo'), '15 වැනි').toBe('15 වැනි');
        expect(moment([2011, 0, 16]).format('DDDo'), '16 වැනි').toBe('16 වැනි');
        expect(moment([2011, 0, 17]).format('DDDo'), '17 වැනි').toBe('17 වැනි');
        expect(moment([2011, 0, 18]).format('DDDo'), '18 වැනි').toBe('18 වැනි');
        expect(moment([2011, 0, 19]).format('DDDo'), '19 වැනි').toBe('19 වැනි');
        expect(moment([2011, 0, 20]).format('DDDo'), '20 වැනි').toBe('20 වැනි');

        expect(moment([2011, 0, 21]).format('DDDo'), '21 වැනි').toBe('21 වැනි');
        expect(moment([2011, 0, 22]).format('DDDo'), '22 වැනි').toBe('22 වැනි');
        expect(moment([2011, 0, 23]).format('DDDo'), '23 වැනි').toBe('23 වැනි');
        expect(moment([2011, 0, 24]).format('DDDo'), '24 වැනි').toBe('24 වැනි');
        expect(moment([2011, 0, 25]).format('DDDo'), '25 වැනි').toBe('25 වැනි');
        expect(moment([2011, 0, 26]).format('DDDo'), '26 වැනි').toBe('26 වැනි');
        expect(moment([2011, 0, 27]).format('DDDo'), '27 වැනි').toBe('27 වැනි');
        expect(moment([2011, 0, 28]).format('DDDo'), '28 වැනි').toBe('28 වැනි');
        expect(moment([2011, 0, 29]).format('DDDo'), '29 වැනි').toBe('29 වැනි');
        expect(moment([2011, 0, 30]).format('DDDo'), '30 වැනි').toBe('30 වැනි');

        expect(moment([2011, 0, 31]).format('DDDo'), '31 වැනි').toBe('31 වැනි');
    });

    test('format month', () => {
        var expected =
                'ජනවාරි ජන_පෙබරවාරි පෙබ_මාර්තු මාර්_අප්‍රේල් අප්_මැයි මැයි_ජූනි ජූනි_ජූලි ජූලි_අගෝස්තු අගෝ_සැප්තැම්බර් සැප්_ඔක්තෝබර් ඔක්_නොවැම්බර් නොවැ_දෙසැම්බර් දෙසැ'.split(
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
                'ඉරිදා ඉරි ඉ_සඳුදා සඳු ස_අඟහරුවාදා අඟ අ_බදාදා බදා බ_බ්‍රහස්පතින්දා බ්‍රහ බ්‍ර_සිකුරාදා සිකු සි_සෙනසුරාදා සෙන සෙ'.split(
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
        ).toBe('තත්පර කිහිපය');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('මිනිත්තුව');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('මිනිත්තුව');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('මිනිත්තු 2');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('මිනිත්තු 44');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('පැය');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('පැය');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('පැය 2');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('පැය 5');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('පැය 21');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('දිනය');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('දිනය');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('දින 2');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('දිනය');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('දින 5');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('දින 25');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('මාසය');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('මාසය');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('මාසය');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('මාස 2');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('මාස 2');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('මාස 3');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('මාසය');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('මාස 5');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('වසර');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('වසර 2');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('වසර');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('වසර 5');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('තත්පර කිහිපයකින්');
        expect(moment(0).from(30000), 'suffix').toBe('තත්පර කිහිපයකට පෙර');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('තත්පර කිහිපයකට පෙර');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'තත්පර කිහිපයකින්'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe('දින 5කින්');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'අද ප.ව. 12:00ට'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'අද ප.ව. 12:25ට'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'අද ප.ව. 1:00ට'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('හෙට ප.ව. 12:00ට');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('අද පෙ.ව. 11:00ට');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('ඊයේ ප.ව. 12:00ට');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd LT[ට]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd LT[ට]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd LT[ට]')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[පසුගිය] dddd LT[ට]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[පසුගිය] dddd LT[ට]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[පසුගිය] dddd LT[ට]')
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
});
