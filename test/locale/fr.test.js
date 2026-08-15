import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/fr';

describe('locale:fr', () => {
    setupLocaleTests('fr');

    test('parse', () => {
        var i,
            tests =
                'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split(
                    '_'
                ),
            testsNoDot =
                'janvier janv_février févr_mars mars_avril avr_mai mai_juin juin_juillet juil_août août_septembre sept_octobre oct_novembre nov_décembre déc'.split(
                    '_'
                );

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

        for (i = 0; i < 12; i++) {
            testsNoDot[i] = testsNoDot[i].split(' ');
            equalTest(testsNoDot[i][0], 'MMM', i);
            equalTest(testsNoDot[i][1], 'MMM', i);
            equalTest(testsNoDot[i][0], 'MMMM', i);
            equalTest(testsNoDot[i][1], 'MMMM', i);
            equalTest(testsNoDot[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(testsNoDot[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(testsNoDot[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(testsNoDot[i][1].toLocaleUpperCase(), 'MMMM', i);

            equalTestStrict(testsNoDot[i][1], 'MMM', i);
            equalTestStrict(testsNoDot[i][0], 'MMMM', i);
            equalTestStrict(testsNoDot[i][1].toLocaleLowerCase(), 'MMM', i);
            equalTestStrict(testsNoDot[i][1].toLocaleUpperCase(), 'MMM', i);
            equalTestStrict(testsNoDot[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTestStrict(testsNoDot[i][0].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'dimanche, février 14 2010, 3:25:50 pm',
                ],
                ['ddd, hA', 'dim., 3PM'],
                ['M Mo MM MMMM MMM', '2 2e 02 février févr.'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 14'],
                ['d do dddd ddd dd', '0 0e dimanche dim. di'],
                ['DDD DDDo DDDD', '45 45e 045'],
                ['w wo ww', '6 6e 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[le] Do [jour du mois]', 'le 14 jour du mois'],
                ['[le] DDDo [jour de l’année]', 'le 45e jour de l’année'],
                ['LTS', '15:25:50'],
                ['L', '14/02/2010'],
                ['LL', '14 février 2010'],
                ['LLL', '14 février 2010 15:25'],
                ['LLLL', 'dimanche 14 février 2010 15:25'],
                ['l', '14/2/2010'],
                ['ll', '14 févr. 2010'],
                ['lll', '14 févr. 2010 15:25'],
                ['llll', 'dim. 14 févr. 2010 15:25'],
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
        expect(moment([2017, 0, 1]).format('Mo'), '1er').toBe('1er');
        expect(moment([2017, 1, 1]).format('Mo'), '2e').toBe('2e');

        expect(moment([2017, 0, 1]).format('Qo'), '1er').toBe('1er');
        expect(moment([2017, 3, 1]).format('Qo'), '2e').toBe('2e');

        expect(moment([2017, 0, 1]).format('Do'), '1er').toBe('1er');
        expect(moment([2017, 0, 2]).format('Do'), '2').toBe('2');

        expect(moment([2011, 0, 1]).format('DDDo'), '1er').toBe('1er');
        expect(moment([2011, 0, 2]).format('DDDo'), '2e').toBe('2e');
        expect(moment([2011, 0, 3]).format('DDDo'), '3e').toBe('3e');
        expect(moment([2011, 0, 4]).format('DDDo'), '4e').toBe('4e');
        expect(moment([2011, 0, 5]).format('DDDo'), '5e').toBe('5e');
        expect(moment([2011, 0, 6]).format('DDDo'), '6e').toBe('6e');
        expect(moment([2011, 0, 7]).format('DDDo'), '7e').toBe('7e');
        expect(moment([2011, 0, 8]).format('DDDo'), '8e').toBe('8e');
        expect(moment([2011, 0, 9]).format('DDDo'), '9e').toBe('9e');
        expect(moment([2011, 0, 10]).format('DDDo'), '10e').toBe('10e');

        expect(moment([2011, 0, 11]).format('DDDo'), '11e').toBe('11e');
        expect(moment([2011, 0, 12]).format('DDDo'), '12e').toBe('12e');
        expect(moment([2011, 0, 13]).format('DDDo'), '13e').toBe('13e');
        expect(moment([2011, 0, 14]).format('DDDo'), '14e').toBe('14e');
        expect(moment([2011, 0, 15]).format('DDDo'), '15e').toBe('15e');
        expect(moment([2011, 0, 16]).format('DDDo'), '16e').toBe('16e');
        expect(moment([2011, 0, 17]).format('DDDo'), '17e').toBe('17e');
        expect(moment([2011, 0, 18]).format('DDDo'), '18e').toBe('18e');
        expect(moment([2011, 0, 19]).format('DDDo'), '19e').toBe('19e');
        expect(moment([2011, 0, 20]).format('DDDo'), '20e').toBe('20e');

        expect(moment([2011, 0, 21]).format('DDDo'), '21e').toBe('21e');
        expect(moment([2011, 0, 22]).format('DDDo'), '22e').toBe('22e');
        expect(moment([2011, 0, 23]).format('DDDo'), '23e').toBe('23e');
        expect(moment([2011, 0, 24]).format('DDDo'), '24e').toBe('24e');
        expect(moment([2011, 0, 25]).format('DDDo'), '25e').toBe('25e');
        expect(moment([2011, 0, 26]).format('DDDo'), '26e').toBe('26e');
        expect(moment([2011, 0, 27]).format('DDDo'), '27e').toBe('27e');
        expect(moment([2011, 0, 28]).format('DDDo'), '28e').toBe('28e');
        expect(moment([2011, 0, 29]).format('DDDo'), '29e').toBe('29e');
        expect(moment([2011, 0, 30]).format('DDDo'), '30e').toBe('30e');

        expect(moment([2011, 0, 31]).format('DDDo'), '31e').toBe('31e');

        expect(moment([2017, 0, 1]).format('do'), '0e').toBe('0e');
        expect(moment([2017, 0, 2]).format('do'), '1er').toBe('1er');

        expect(moment([2017, 0, 4]).format('wo Wo'), '1re 1re').toBe('1re 1re');
        expect(moment([2017, 0, 11]).format('wo Wo'), '2e 2e').toBe('2e 2e');
    });

    test('format month', () => {
        var i,
            expected =
                'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split(
                    '_'
                );

        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format week', () => {
        var i,
            expected =
                'dimanche dim. di_lundi lun. lu_mardi mar. ma_mercredi mer. me_jeudi jeu. je_vendredi ven. ve_samedi sam. sa'.split(
                    '_'
                );

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
        ).toBe('quelques secondes');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('une minute');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('une minute');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 minutes');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 minutes');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('une heure');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('une heure');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 heures');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 heures');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 heures');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('un jour');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('un jour');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 jours');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('un jour');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 jours');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 jours');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('un mois');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('un mois');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('un mois');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 mois');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 mois');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 mois');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('un mois');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 mois');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('un an');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 ans');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('un an');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 ans');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('dans quelques secondes');
        expect(moment(0).from(30000), 'suffix').toBe(
            'il y a quelques secondes'
        );
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'dans quelques secondes'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'dans 5 jours'
        );
    });

    test('same day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'Today at the same time').toBe(
            'Aujourd’hui à 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Aujourd’hui à 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Aujourd’hui à 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'Tomorrow at the same time'
        ).toBe('Demain à 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Aujourd’hui à 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'Yesterday at the same time'
        ).toBe('Hier à 12:00');
    });

    test('same next week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [à] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [à] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [à] LT')
            );
        }
    });

    test('same last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('dddd [dernier à] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [dernier à] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('dddd [dernier à] LT')
            );
        }
    });

    test('same all else', () => {
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

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 52'
        ).toBe('52 52 52e');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 1re');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('1 01 1re');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('2 02 2e');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('2 02 2e');
    });
});
