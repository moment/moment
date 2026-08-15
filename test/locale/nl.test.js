import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/nl';

describe('locale:nl', () => {
    setupLocaleTests('nl');

    test('parse', () => {
        var tests =
                'januari jan._februari feb._maart mrt._april apr._mei mei._juni jun._juli jul._augustus aug._september sep._oktober okt._november nov._december dec.'.split(
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

            // Fails only for month 5 (index 4)
            // equalTestStrict(tests[i][1], 'MMM', i);
            equalTestStrict(tests[i][0], 'MMMM', i);
            // Fails only for month 5 (index 4)
            // equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
            // Fails only for month 5 (index 4)
            // equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
            equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, HH:mm:ss',
                    'zondag, februari 14de 2010, 15:25:50',
                ],
                ['ddd, HH', 'zo., 15'],
                ['M Mo MM MMMM MMM', '2 2de 02 februari feb.'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14de 14'],
                ['d do dddd ddd dd', '0 0de zondag zo. zo'],
                ['DDD DDDo DDDD', '45 45ste 045'],
                ['w wo ww', '6 6de 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[the] DDDo [day of the year]', 'the 45ste day of the year'],
                ['LTS', '15:25:50'],
                ['L', '14-02-2010'],
                ['LL', '14 februari 2010'],
                ['LLL', '14 februari 2010 15:25'],
                ['LLLL', 'zondag 14 februari 2010 15:25'],
                ['l', '14-2-2010'],
                ['ll', '14 feb. 2010'],
                ['lll', '14 feb. 2010 15:25'],
                ['llll', 'zo. 14 feb. 2010 15:25'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1ste').toBe('1ste');
        expect(moment([2011, 0, 2]).format('DDDo'), '2de').toBe('2de');
        expect(moment([2011, 0, 3]).format('DDDo'), '3de').toBe('3de');
        expect(moment([2011, 0, 4]).format('DDDo'), '4de').toBe('4de');
        expect(moment([2011, 0, 5]).format('DDDo'), '5de').toBe('5de');
        expect(moment([2011, 0, 6]).format('DDDo'), '6de').toBe('6de');
        expect(moment([2011, 0, 7]).format('DDDo'), '7de').toBe('7de');
        expect(moment([2011, 0, 8]).format('DDDo'), '8ste').toBe('8ste');
        expect(moment([2011, 0, 9]).format('DDDo'), '9de').toBe('9de');
        expect(moment([2011, 0, 10]).format('DDDo'), '10de').toBe('10de');

        expect(moment([2011, 0, 11]).format('DDDo'), '11de').toBe('11de');
        expect(moment([2011, 0, 12]).format('DDDo'), '12de').toBe('12de');
        expect(moment([2011, 0, 13]).format('DDDo'), '13de').toBe('13de');
        expect(moment([2011, 0, 14]).format('DDDo'), '14de').toBe('14de');
        expect(moment([2011, 0, 15]).format('DDDo'), '15de').toBe('15de');
        expect(moment([2011, 0, 16]).format('DDDo'), '16de').toBe('16de');
        expect(moment([2011, 0, 17]).format('DDDo'), '17de').toBe('17de');
        expect(moment([2011, 0, 18]).format('DDDo'), '18de').toBe('18de');
        expect(moment([2011, 0, 19]).format('DDDo'), '19de').toBe('19de');
        expect(moment([2011, 0, 20]).format('DDDo'), '20ste').toBe('20ste');

        expect(moment([2011, 0, 21]).format('DDDo'), '21ste').toBe('21ste');
        expect(moment([2011, 0, 22]).format('DDDo'), '22ste').toBe('22ste');
        expect(moment([2011, 0, 23]).format('DDDo'), '23ste').toBe('23ste');
        expect(moment([2011, 0, 24]).format('DDDo'), '24ste').toBe('24ste');
        expect(moment([2011, 0, 25]).format('DDDo'), '25ste').toBe('25ste');
        expect(moment([2011, 0, 26]).format('DDDo'), '26ste').toBe('26ste');
        expect(moment([2011, 0, 27]).format('DDDo'), '27ste').toBe('27ste');
        expect(moment([2011, 0, 28]).format('DDDo'), '28ste').toBe('28ste');
        expect(moment([2011, 0, 29]).format('DDDo'), '29ste').toBe('29ste');
        expect(moment([2011, 0, 30]).format('DDDo'), '30ste').toBe('30ste');

        expect(moment([2011, 0, 31]).format('DDDo'), '31ste').toBe('31ste');
    });

    test('format month', () => {
        var expected =
                'januari jan._februari feb._maart mrt._april apr._mei mei_juni jun._juli jul._augustus aug._september sep._oktober okt._november nov._december dec.'.split(
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
                'zondag zo. zo_maandag ma. ma_dinsdag di. di_woensdag wo. wo_donderdag do. do_vrijdag vr. vr_zaterdag za. za'.split(
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
        ).toBe('een paar seconden');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('één minuut');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('één minuut');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 minuten');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 minuten');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('één uur');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('één uur');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 uur');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 uur');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 uur');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('één dag');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('één dag');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 dagen');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('één dag');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 dagen');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 dagen');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('één maand');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('één maand');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('één maand');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 maanden');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 maanden');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 maanden');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('één maand');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 maanden');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('één jaar');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 jaar');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('één jaar');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 jaar');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('over een paar seconden');
        expect(moment(0).from(30000), 'suffix').toBe(
            'een paar seconden geleden'
        );
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('een paar seconden geleden');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'over een paar seconden'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'over 5 dagen'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'vandaag om 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'vandaag om 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'vandaag om 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('morgen om 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('vandaag om 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('gisteren om 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [om] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [om] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [om] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[afgelopen] dddd [om] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[afgelopen] dddd [om] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[afgelopen] dddd [om] LT')
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

    test('month abbreviation', () => {
        expect(
            moment([2012, 5, 23]).format('D-MMM-YYYY'),
            'format month abbreviation surrounded by dashes should not include a dot'
        ).toBe('23-jun-2012');
        expect(
            moment([2012, 5, 23]).unix(),
            'parse month abbreviation surrounded by dashes without dot'
        ).toBe(moment('23-jun-2012', 'D-MMM-YYYY').unix());
        expect(
            moment([2012, 5, 23]).format('D MMM YYYY'),
            'format month abbreviation not surrounded by dashes should include a dot'
        ).toBe('23 jun. 2012');
        expect(
            moment([2012, 5, 23]).unix(),
            'parse month abbreviation not surrounded by dashes with dot'
        ).toBe(moment('23 jun. 2012', 'D MMM YYYY').unix());
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 52'
        ).toBe('52 52 52ste');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 1ste');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('1 01 1ste');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('2 02 2de');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('2 02 2de');
    });
});
