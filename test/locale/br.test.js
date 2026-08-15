import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/br';

describe('locale:br', () => {
    setupLocaleTests('br');

    test('parse', () => {
        var tests =
                'Genver Gen_Cʼhwevrer Cʼhwe_Meurzh Meu_Ebrel Ebr_Mae Mae_Mezheven Eve_Gouere Gou_Eost Eos_Gwengolo Gwe_Here Her_Du Du_Kerzu Ker'.split(
                    '_'
                ),
            i,
            monthsWithRegularQuoteMark = ["C'hwevrer", "C'hwe"];

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

        // check with regular quote mark
        equalTest(monthsWithRegularQuoteMark[0], 'MMM', 1);
        equalTest(monthsWithRegularQuoteMark[1], 'MMM', 1);
        equalTest(monthsWithRegularQuoteMark[0], 'MMMM', 1);
        equalTest(monthsWithRegularQuoteMark[1], 'MMMM', 1);
        equalTest(monthsWithRegularQuoteMark[0].toLocaleLowerCase(), 'MMM', 1);
        equalTest(monthsWithRegularQuoteMark[1].toLocaleLowerCase(), 'MMM', 1);
        equalTest(monthsWithRegularQuoteMark[0].toLocaleUpperCase(), 'MMMM', 1);
        equalTest(monthsWithRegularQuoteMark[1].toLocaleUpperCase(), 'MMMM', 1);

        expect(
            moment(monthsWithRegularQuoteMark[0], 'MMM', true).month()
        ).not.toBe(1);
        equalTestStrict(monthsWithRegularQuoteMark[1], 'MMM', 1);
        equalTest(monthsWithRegularQuoteMark[0], 'MMMM', 1);
        expect(
            moment(monthsWithRegularQuoteMark[1], 'MMMM', true).month()
        ).not.toBe(1);
        equalTest(monthsWithRegularQuoteMark[1].toLocaleLowerCase(), 'MMM', 1);
        equalTest(monthsWithRegularQuoteMark[0].toLocaleUpperCase(), 'MMMM', 1);

        // check weekday with regular quote mark
        expect(
            moment("merc'her", 'dddd', true).day(),
            "merc'her (regular quote)"
        ).toBe(3);
        expect(
            moment('mercʼher', 'dddd', true).day(),
            'mercʼher (special quote)'
        ).toBe(3);
    });

    test('format', () => {
        moment.locale('br');
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'Sul, Cʼhwevrer 14vet 2010, 3:25:50 g.m.',
                ],
                ['ddd, h A', 'Sul, 3 g.m.'],
                ['M Mo MM MMMM MMM', '2 2vet 02 Cʼhwevrer Cʼhwe'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14vet 14'],
                ['d do dddd ddd dd', '0 0vet Sul Sul Su'],
                ['DDD DDDo DDDD', '45 45vet 045'],
                ['w wo ww', '6 6vet 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['DDDo [devezh] [ar] [vloaz]', '45vet devezh ar vloaz'],
                ['L', '14/02/2010'],
                ['LL', '14 a viz Cʼhwevrer 2010'],
                ['LLL', '14 a viz Cʼhwevrer 2010 15:25'],
                ['LLLL', 'Sul, 14 a viz Cʼhwevrer 2010 15:25'],
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
        moment.locale('br');
        expect(moment([2011, 0, 1]).format('DDDo'), '1añ').toBe('1añ');
        expect(moment([2011, 0, 2]).format('DDDo'), '2vet').toBe('2vet');
        expect(moment([2011, 0, 3]).format('DDDo'), '3vet').toBe('3vet');
        expect(moment([2011, 0, 4]).format('DDDo'), '4vet').toBe('4vet');
        expect(moment([2011, 0, 5]).format('DDDo'), '5vet').toBe('5vet');
        expect(moment([2011, 0, 6]).format('DDDo'), '6vet').toBe('6vet');
        expect(moment([2011, 0, 7]).format('DDDo'), '7vet').toBe('7vet');
        expect(moment([2011, 0, 8]).format('DDDo'), '8vet').toBe('8vet');
        expect(moment([2011, 0, 9]).format('DDDo'), '9vet').toBe('9vet');
        expect(moment([2011, 0, 10]).format('DDDo'), '10vet').toBe('10vet');

        expect(moment([2011, 0, 11]).format('DDDo'), '11vet').toBe('11vet');
        expect(moment([2011, 0, 12]).format('DDDo'), '12vet').toBe('12vet');
        expect(moment([2011, 0, 13]).format('DDDo'), '13vet').toBe('13vet');
        expect(moment([2011, 0, 14]).format('DDDo'), '14vet').toBe('14vet');
        expect(moment([2011, 0, 15]).format('DDDo'), '15vet').toBe('15vet');
        expect(moment([2011, 0, 16]).format('DDDo'), '16vet').toBe('16vet');
        expect(moment([2011, 0, 17]).format('DDDo'), '17vet').toBe('17vet');
        expect(moment([2011, 0, 18]).format('DDDo'), '18vet').toBe('18vet');
        expect(moment([2011, 0, 19]).format('DDDo'), '19vet').toBe('19vet');
        expect(moment([2011, 0, 20]).format('DDDo'), '20vet').toBe('20vet');

        expect(moment([2011, 0, 21]).format('DDDo'), '21vet').toBe('21vet');
        expect(moment([2011, 0, 22]).format('DDDo'), '22vet').toBe('22vet');
        expect(moment([2011, 0, 23]).format('DDDo'), '23vet').toBe('23vet');
        expect(moment([2011, 0, 24]).format('DDDo'), '24vet').toBe('24vet');
        expect(moment([2011, 0, 25]).format('DDDo'), '25vet').toBe('25vet');
        expect(moment([2011, 0, 26]).format('DDDo'), '26vet').toBe('26vet');
        expect(moment([2011, 0, 27]).format('DDDo'), '27vet').toBe('27vet');
        expect(moment([2011, 0, 28]).format('DDDo'), '28vet').toBe('28vet');
        expect(moment([2011, 0, 29]).format('DDDo'), '29vet').toBe('29vet');
        expect(moment([2011, 0, 30]).format('DDDo'), '30vet').toBe('30vet');

        expect(moment([2011, 0, 31]).format('DDDo'), '31vet').toBe('31vet');
    });

    test('format month', () => {
        moment.locale('br');
        var expected =
                'Genver Gen_Cʼhwevrer Cʼhwe_Meurzh Meu_Ebrel Ebr_Mae Mae_Mezheven Eve_Gouere Gou_Eost Eos_Gwengolo Gwe_Here Her_Du Du_Kerzu Ker'.split(
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
        moment.locale('br');
        var expected =
                'Sul Sul Su_Lun Lun Lu_Meurzh Meu Me_Mercʼher Mer Mer_Yaou Yao Ya_Gwener Gwe Gw_Sadorn Sad Sa'.split(
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
        moment.locale('br');
        var start = moment([2007, 1, 28]);
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
            '44 seconds = a few seconds'
        ).toBe('un nebeud segondennoù');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('ur vunutenn');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('ur vunutenn');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 vunutenn');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 munutenn');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('un eur');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('un eur');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 eur');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 eur');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 eur');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('un devezh');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('un devezh');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 zevezh');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('un devezh');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 devezh');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 devezh');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('ur miz');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('ur miz');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('ur miz');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 viz');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 viz');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 miz');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('ur miz');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 miz');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('ur bloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 vloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('ur bloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 bloaz');
    });

    test('suffix', () => {
        moment.locale('br');
        expect(moment(30000).from(0), 'prefix').toBe(
            'a-benn un nebeud segondennoù'
        );
        expect(moment(0).from(30000), 'suffix').toBe(
            'un nebeud segondennoù ʼzo'
        );
    });

    test('now from now', () => {
        moment.locale('br');
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('un nebeud segondennoù ʼzo');
    });

    test('fromNow', () => {
        moment.locale('br');
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'a-benn un nebeud segondennoù'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'a-benn 5 devezh'
        );
    });

    test('calendar day', () => {
        moment.locale('br');

        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Hiziv da 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Hiziv da 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Hiziv da 13:00'
        );
        expect(moment(a).add({ h: 3 }).calendar(), 'Now plus 3 hour').toBe(
            'Hiziv da 15:00'
        );
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Hiziv da 11:00');
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Warcʼhoazh da 12:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Decʼh da 12:00');
    });

    test('calendar next week', () => {
        moment.locale('br');

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [da] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [da] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [da] LT')
            );
        }
    });

    test('calendar last week', () => {
        moment.locale('br');

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('dddd [paset da] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [paset da] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('dddd [paset da] LT')
            );
        }
    });

    test('calendar all else', () => {
        moment.locale('br');
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

    test('special mutations for years', () => {
        moment.locale('br');
        var start = moment([2007, 1, 28]);
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            'mutation 1 year'
        ).toBe('ur bloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 2 }), true),
            'mutation 2 years'
        ).toBe('2 vloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 3 }), true),
            'mutation 3 years'
        ).toBe('3 bloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 4 }), true),
            'mutation 4 years'
        ).toBe('4 bloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            'mutation 5 years'
        ).toBe('5 bloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 9 }), true),
            'mutation 9 years'
        ).toBe('9 bloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 10 }), true),
            'mutation 10 years'
        ).toBe('10 vloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 21 }), true),
            'mutation 21 years'
        ).toBe('21 bloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 22 }), true),
            'mutation 22 years'
        ).toBe('22 vloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 133 }), true),
            'mutation 133 years'
        ).toBe('133 bloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 148 }), true),
            'mutation 148 years'
        ).toBe('148 vloaz');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 261 }), true),
            'mutation 261 years'
        ).toBe('261 bloaz');
    });
});
