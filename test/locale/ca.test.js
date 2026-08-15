import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/ca';

describe('locale:ca', () => {
    setupLocaleTests('ca');

    test('parse', () => {
        var tests =
                'gener gen._febrer febr._març març_abril abr._maig maig_juny juny_juliol jul._agost ag._setembre set._octubre oct._novembre nov._desembre des.'.split(
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
                    'diumenge, 14è de febrer 2010, 3:25:50 pm',
                ],
                ['ddd, hA', 'dg., 3PM'],
                ['M Mo MM MMMM MMM', '2 2n 02 febrer febr.'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14è 14'],
                ['d do dddd ddd dd', '0 0è diumenge dg. dg'],
                ['DDD DDDo DDDD', '45 45è 045'],
                ['w wo ww', '6 6a 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[the] DDDo [day of the year]', 'the 45è day of the year'],
                ['LTS', '15:25:50'],
                ['L', '14/02/2010'],
                ['LL', '14 de febrer de 2010'],
                ['LLL', '14 de febrer de 2010 a les 15:25'],
                ['LLLL', 'diumenge 14 de febrer de 2010 a les 15:25'],
                ['l', '14/2/2010'],
                ['ll', '14 febr. 2010'],
                ['lll', '14 febr. 2010, 15:25'],
                ['llll', 'dg. 14 febr. 2010, 15:25'],
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('format apostrophed prepositions', () => {
        const examples = [
            {
                date: [2025, 3, 4],
                format: 'LL',
                want: '4 d’abril de 2025',
            },
            {
                date: [2025, 7, 8],
                format: 'LL',
                want: '8 d’agost de 2025',
            },
            {
                date: [2025, 9, 10],
                format: 'LL',
                want: '10 d’octubre de 2025',
            },
        ];

        examples.forEach(({ date, format, want }) => {
            const got = moment(date).format(format);
            expect(got, `${date}, ${format}: got ${got}, want ${want}`).toBe(
                want
            );
        });
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '1r').toBe('1r');
        expect(moment([2011, 0, 2]).format('DDDo'), '2n').toBe('2n');
        expect(moment([2011, 0, 3]).format('DDDo'), '3r').toBe('3r');
        expect(moment([2011, 0, 4]).format('DDDo'), '4t').toBe('4t');
        expect(moment([2011, 0, 5]).format('DDDo'), '5è').toBe('5è');
        expect(moment([2011, 0, 6]).format('DDDo'), '6è').toBe('6è');
        expect(moment([2011, 0, 7]).format('DDDo'), '7è').toBe('7è');
        expect(moment([2011, 0, 8]).format('DDDo'), '8è').toBe('8è');
        expect(moment([2011, 0, 9]).format('DDDo'), '9è').toBe('9è');
        expect(moment([2011, 0, 10]).format('DDDo'), '10è').toBe('10è');

        expect(moment([2011, 0, 11]).format('DDDo'), '11è').toBe('11è');
        expect(moment([2011, 0, 12]).format('DDDo'), '12è').toBe('12è');
        expect(moment([2011, 0, 13]).format('DDDo'), '13è').toBe('13è');
        expect(moment([2011, 0, 14]).format('DDDo'), '14è').toBe('14è');
        expect(moment([2011, 0, 15]).format('DDDo'), '15è').toBe('15è');
        expect(moment([2011, 0, 16]).format('DDDo'), '16è').toBe('16è');
        expect(moment([2011, 0, 17]).format('DDDo'), '17è').toBe('17è');
        expect(moment([2011, 0, 18]).format('DDDo'), '18è').toBe('18è');
        expect(moment([2011, 0, 19]).format('DDDo'), '19è').toBe('19è');
        expect(moment([2011, 0, 20]).format('DDDo'), '20è').toBe('20è');

        expect(moment([2011, 0, 21]).format('DDDo'), '21è').toBe('21è');
        expect(moment([2011, 0, 22]).format('DDDo'), '22è').toBe('22è');
        expect(moment([2011, 0, 23]).format('DDDo'), '23è').toBe('23è');
        expect(moment([2011, 0, 24]).format('DDDo'), '24è').toBe('24è');
        expect(moment([2011, 0, 25]).format('DDDo'), '25è').toBe('25è');
        expect(moment([2011, 0, 26]).format('DDDo'), '26è').toBe('26è');
        expect(moment([2011, 0, 27]).format('DDDo'), '27è').toBe('27è');
        expect(moment([2011, 0, 28]).format('DDDo'), '28è').toBe('28è');
        expect(moment([2011, 0, 29]).format('DDDo'), '29è').toBe('29è');
        expect(moment([2011, 0, 30]).format('DDDo'), '30è').toBe('30è');

        expect(moment([2011, 0, 31]).format('DDDo'), '31è').toBe('31è');
    });

    test('format month', () => {
        var expected =
                'gener gen._febrer febr._març març_abril abr._maig maig_juny juny_juliol jul._agost ag._setembre set._octubre oct._novembre nov._desembre des.'.split(
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
                'diumenge dg. dg_dilluns dl. dl_dimarts dt. dt_dimecres dc. dc_dijous dj. dj_divendres dv. dv_dissabte ds. ds'.split(
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
        ).toBe('uns segons');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('un minut');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('un minut');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 minuts');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 minuts');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('una hora');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('una hora');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 hores');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 hores');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 hores');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('un dia');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('un dia');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 dies');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('un dia');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 dies');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 dies');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('un mes');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('un mes');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('un mes');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 mesos');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 mesos');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 mesos');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('un mes');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 mesos');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('un any');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 anys');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('un any');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 anys');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe("d'aquí uns segons");
        expect(moment(0).from(30000), 'suffix').toBe('fa uns segons');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('fa uns segons');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), "d'aquí uns segons").toBe(
            "d'aquí uns segons"
        );
        expect(moment().add({ d: 5 }).fromNow(), "d'aquí 5 dies").toBe(
            "d'aquí 5 dies"
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'avui a les 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'avui a les 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'avui a les 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('demà a les 12:00');
        expect(
            moment(a).add({ d: 1, h: -1 }).calendar(),
            'tomorrow minus 1 hour'
        ).toBe('demà a les 11:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('avui a les 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('ahir a les 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [a ' + (m.hours() !== 1 ? 'les' : 'la') + '] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(
                m.format('dddd [a ' + (m.hours() !== 1 ? 'les' : 'la') + '] LT')
            );
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [a ' + (m.hours() !== 1 ? 'les' : 'la') + '] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format(
                    '[el] dddd [passat a ' +
                        (m.hours() !== 1 ? 'les' : 'la') +
                        '] LT'
                )
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(
                m.format(
                    '[el] dddd [passat a ' +
                        (m.hours() !== 1 ? 'les' : 'la') +
                        '] LT'
                )
            );
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format(
                    '[el] dddd [passat a ' +
                        (m.hours() !== 1 ? 'les' : 'la') +
                        '] LT'
                )
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
        ).toBe('52 52 52a');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 1a');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('1 01 1a');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('2 02 2a');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('2 02 2a');
    });

    test('day and month', () => {
        expect(moment([2012, 1, 15]).format('D MMMM')).toBe('15 de febrer');
        expect(moment([2012, 9, 15]).format('D MMMM')).toBe('15 d’octubre');
        expect(moment([2012, 9, 15]).format('MMMM, D')).toBe('octubre, 15');
    });
});
