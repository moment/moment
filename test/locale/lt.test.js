import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/lt';

describe('locale:lt', () => {
    setupLocaleTests('lt');

    test('parse', () => {
        var tests =
                'sausis sau_vasaris vas_kovas kov_balandis bal_gegužė geg_birželis bir_liepa lie_rugpjūtis rgp_rugsėjis rgs_spalis spa_lapkritis lap_gruodis grd'.split(
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
                    'dddd, Do MMMM YYYY, h:mm:ss a',
                    'sekmadienis, 14-oji vasario 2010, 3:25:50 pm',
                ],
                ['ddd, hA', 'Sek, 3PM'],
                ['M Mo MM MMMM MMM', '2 2-oji 02 vasaris vas'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14-oji 14'],
                ['d do dddd ddd dd', '0 0-oji sekmadienis Sek S'],
                ['DDD DDDo DDDD', '45 45-oji 045'],
                ['w wo ww', '6 6-oji 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['DDDo [metų diena]', '45-oji metų diena'],
                ['LTS', '15:25:50'],
                ['L', '2010-02-14'],
                ['LL', '2010 m. vasario 14 d.'],
                ['LLL', '2010 m. vasario 14 d., 15:25 val.'],
                ['LLLL', '2010 m. vasario 14 d., sekmadienis, 15:25 val.'],
                ['l', '2010-02-14'],
                ['ll', '2010 m. vasario 14 d.'],
                ['lll', '2010 m. vasario 14 d., 15:25 val.'],
                ['llll', '2010 m. vasario 14 d., Sek, 15:25 val.'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1-oji').toBe('1-oji');
        expect(moment([2011, 0, 2]).format('DDDo'), '2-oji').toBe('2-oji');
        expect(moment([2011, 0, 3]).format('DDDo'), '3-oji').toBe('3-oji');
        expect(moment([2011, 0, 4]).format('DDDo'), '4-oji').toBe('4-oji');
        expect(moment([2011, 0, 5]).format('DDDo'), '5-oji').toBe('5-oji');
        expect(moment([2011, 0, 6]).format('DDDo'), '6-oji').toBe('6-oji');
        expect(moment([2011, 0, 7]).format('DDDo'), '7-oji').toBe('7-oji');
        expect(moment([2011, 0, 8]).format('DDDo'), '8-oji').toBe('8-oji');
        expect(moment([2011, 0, 9]).format('DDDo'), '9-oji').toBe('9-oji');
        expect(moment([2011, 0, 10]).format('DDDo'), '10-oji').toBe('10-oji');

        expect(moment([2011, 0, 11]).format('DDDo'), '11-oji').toBe('11-oji');
        expect(moment([2011, 0, 12]).format('DDDo'), '12-oji').toBe('12-oji');
        expect(moment([2011, 0, 13]).format('DDDo'), '13-oji').toBe('13-oji');
        expect(moment([2011, 0, 14]).format('DDDo'), '14-oji').toBe('14-oji');
        expect(moment([2011, 0, 15]).format('DDDo'), '15-oji').toBe('15-oji');
        expect(moment([2011, 0, 16]).format('DDDo'), '16-oji').toBe('16-oji');
        expect(moment([2011, 0, 17]).format('DDDo'), '17-oji').toBe('17-oji');
        expect(moment([2011, 0, 18]).format('DDDo'), '18-oji').toBe('18-oji');
        expect(moment([2011, 0, 19]).format('DDDo'), '19-oji').toBe('19-oji');
        expect(moment([2011, 0, 20]).format('DDDo'), '20-oji').toBe('20-oji');

        expect(moment([2011, 0, 21]).format('DDDo'), '21-oji').toBe('21-oji');
        expect(moment([2011, 0, 22]).format('DDDo'), '22-oji').toBe('22-oji');
        expect(moment([2011, 0, 23]).format('DDDo'), '23-oji').toBe('23-oji');
        expect(moment([2011, 0, 24]).format('DDDo'), '24-oji').toBe('24-oji');
        expect(moment([2011, 0, 25]).format('DDDo'), '25-oji').toBe('25-oji');
        expect(moment([2011, 0, 26]).format('DDDo'), '26-oji').toBe('26-oji');
        expect(moment([2011, 0, 27]).format('DDDo'), '27-oji').toBe('27-oji');
        expect(moment([2011, 0, 28]).format('DDDo'), '28-oji').toBe('28-oji');
        expect(moment([2011, 0, 29]).format('DDDo'), '29-oji').toBe('29-oji');
        expect(moment([2011, 0, 30]).format('DDDo'), '30-oji').toBe('30-oji');

        expect(moment([2011, 0, 31]).format('DDDo'), '31-oji').toBe('31-oji');
    });

    test('format month', () => {
        var expected =
                'sausis sau_vasaris vas_kovas kov_balandis bal_gegužė geg_birželis bir_liepa lie_rugpjūtis rgp_rugsėjis rgs_spalis spa_lapkritis lap_gruodis grd'.split(
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
                'sekmadienis Sek S_pirmadienis Pir P_antradienis Ant A_trečiadienis Tre T_ketvirtadienis Ket K_penktadienis Pen Pn_šeštadienis Šeš Š'.split(
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

    test('format week on US calendar', () => {
        // Tests, whether the weekday names are correct, even if the week does not start on Monday
        moment.updateLocale('lt', { week: { dow: 0, doy: 6 } });
        var expected =
                'sekmadienis Sek S_pirmadienis Pir P_antradienis Ant A_trečiadienis Tre T_ketvirtadienis Ket K_penktadienis Pen Pn_šeštadienis Šeš Š'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(
                moment([2011, 0, 2 + i]).format('dddd ddd dd'),
                expected[i]
            ).toBe(expected[i]);
        }
        moment.updateLocale('lt', null);
    });

    test('from', () => {
        var start = moment([2007, 1, 28]);
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
            '44 seconds = seconds'
        ).toBe('kelios sekundės');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('minutė');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('minutė');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 minutės');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 10 }), true),
            '10 minutes = 10 minutes'
        ).toBe('10 minučių');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 11 }), true),
            '11 minutes = 11 minutes'
        ).toBe('11 minučių');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 19 }), true),
            '19 minutes = 19 minutes'
        ).toBe('19 minučių');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 20 }), true),
            '20 minutes = 20 minutes'
        ).toBe('20 minučių');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 minutės');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('valanda');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('valanda');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 valandos');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 valandos');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 10 }), true),
            '10 hours = 10 hours'
        ).toBe('10 valandų');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 valandos');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('diena');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('diena');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 dienos');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('diena');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 dienos');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 10 }), true),
            '10 days = 10 days'
        ).toBe('10 dienų');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 dienos');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('mėnuo');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('mėnuo');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('mėnuo');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 mėnesiai');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 mėnesiai');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 mėnesiai');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('mėnuo');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 mėnesiai');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 10 }), true),
            '10 months = 10 months'
        ).toBe('10 mėnesių');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('metai');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 metai');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('metai');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 metai');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('po kelių sekundžių');
        expect(moment(0).from(30000), 'suffix').toBe('prieš kelias sekundes');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('prieš kelias sekundes');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in seconds').toBe(
            'po kelių sekundžių'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'po 5 dienų'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Šiandien 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Šiandien 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Šiandien 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Rytoj 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Šiandien 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Vakar 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[Praėjusį] dddd LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[Praėjusį] dddd LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[Praėjusį] dddd LT')
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

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 52'
        ).toBe('52 52 52-oji');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 1-oji');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('1 01 1-oji');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('2 02 2-oji');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('2 02 2-oji');
    });

    test('month cases', () => {
        expect(
            moment([2015, 4, 1]).format('LL'),
            'uses format instead of standalone form'
        ).toBe('2015 m. gegužės 1 d.');
    });
});
