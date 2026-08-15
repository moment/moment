import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/yo';

describe('locale:yo', () => {
    setupLocaleTests('yo');

    test('parse', () => {
        var tests =
                'Sẹ́rẹ́ Sẹ́r_Èrèlè Èrl_Ẹrẹ̀nà Ẹrn_Ìgbé Ìgb_Èbibi Èbi_Òkùdu Òkù_Agẹmo Agẹ_Ògún Ògú_Owewe Owe_Ọ̀wàrà Ọ̀wà_Bélú Bél_Ọ̀pẹ̀̀ Ọ̀pẹ̀̀'.split(
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
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'Àìkú, Èrèlè ọjọ́ 14 2010, 3:25:50 pm',
                ],
                ['ddd, hA', 'Àìk, 3PM'],
                ['M Mo MM MMMM MMM', '2 ọjọ́ 2 02 Èrèlè Èrl'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 ọjọ́ 14 14'],
                ['d do dddd ddd dd', '0 ọjọ́ 0 Àìkú Àìk Àì'],
                ['DDD DDDo DDDD', '45 ọjọ́ 45 045'],
                ['w wo ww', '6 ọjọ́ 6 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[the] DDDo [day of the year]', 'the ọjọ́ 45 day of the year'],
                ['LTS', '3:25:50 PM'],
                ['L', '14/02/2010'],
                ['LL', '14 Èrèlè 2010'],
                ['LLL', '14 Èrèlè 2010 3:25 PM'],
                ['LLLL', 'Àìkú, 14 Èrèlè 2010 3:25 PM'],
                ['l', '14/2/2010'],
                ['ll', '14 Èrl 2010'],
                ['lll', '14 Èrl 2010 3:25 PM'],
                ['llll', 'Àìk, 14 Èrl 2010 3:25 PM'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), 'ọjọ́ 1').toBe('ọjọ́ 1');
        expect(moment([2011, 0, 2]).format('DDDo'), 'ọjọ́ 2').toBe('ọjọ́ 2');
        expect(moment([2011, 0, 3]).format('DDDo'), 'ọjọ́ 3').toBe('ọjọ́ 3');
        expect(moment([2011, 0, 4]).format('DDDo'), 'ọjọ́ 4').toBe('ọjọ́ 4');
        expect(moment([2011, 0, 5]).format('DDDo'), 'ọjọ́ 5').toBe('ọjọ́ 5');
        expect(moment([2011, 0, 6]).format('DDDo'), 'ọjọ́ 6').toBe('ọjọ́ 6');
        expect(moment([2011, 0, 7]).format('DDDo'), 'ọjọ́ 7').toBe('ọjọ́ 7');
        expect(moment([2011, 0, 8]).format('DDDo'), 'ọjọ́ 8').toBe('ọjọ́ 8');
        expect(moment([2011, 0, 9]).format('DDDo'), 'ọjọ́ 9').toBe('ọjọ́ 9');
        expect(moment([2011, 0, 10]).format('DDDo'), 'ọjọ́ 10').toBe('ọjọ́ 10');

        expect(moment([2011, 0, 11]).format('DDDo'), 'ọjọ́ 11').toBe('ọjọ́ 11');
        expect(moment([2011, 0, 12]).format('DDDo'), 'ọjọ́ 12').toBe('ọjọ́ 12');
        expect(moment([2011, 0, 13]).format('DDDo'), 'ọjọ́ 13').toBe('ọjọ́ 13');
        expect(moment([2011, 0, 14]).format('DDDo'), 'ọjọ́ 14').toBe('ọjọ́ 14');
        expect(moment([2011, 0, 15]).format('DDDo'), 'ọjọ́ 15').toBe('ọjọ́ 15');
        expect(moment([2011, 0, 16]).format('DDDo'), 'ọjọ́ 16').toBe('ọjọ́ 16');
        expect(moment([2011, 0, 17]).format('DDDo'), 'ọjọ́ 17').toBe('ọjọ́ 17');
        expect(moment([2011, 0, 18]).format('DDDo'), 'ọjọ́ 18').toBe('ọjọ́ 18');
        expect(moment([2011, 0, 19]).format('DDDo'), 'ọjọ́ 19').toBe('ọjọ́ 19');
        expect(moment([2011, 0, 20]).format('DDDo'), 'ọjọ́ 20').toBe('ọjọ́ 20');

        expect(moment([2011, 0, 21]).format('DDDo'), 'ọjọ́ 21').toBe('ọjọ́ 21');
        expect(moment([2011, 0, 22]).format('DDDo'), 'ọjọ́ 22').toBe('ọjọ́ 22');
        expect(moment([2011, 0, 23]).format('DDDo'), 'ọjọ́ 23').toBe('ọjọ́ 23');
        expect(moment([2011, 0, 24]).format('DDDo'), 'ọjọ́ 24').toBe('ọjọ́ 24');
        expect(moment([2011, 0, 25]).format('DDDo'), 'ọjọ́ 25').toBe('ọjọ́ 25');
        expect(moment([2011, 0, 26]).format('DDDo'), 'ọjọ́ 26').toBe('ọjọ́ 26');
        expect(moment([2011, 0, 27]).format('DDDo'), 'ọjọ́ 27').toBe('ọjọ́ 27');
        expect(moment([2011, 0, 28]).format('DDDo'), 'ọjọ́ 28').toBe('ọjọ́ 28');
        expect(moment([2011, 0, 29]).format('DDDo'), 'ọjọ́ 29').toBe('ọjọ́ 29');
        expect(moment([2011, 0, 30]).format('DDDo'), 'ọjọ́ 30').toBe('ọjọ́ 30');

        expect(moment([2011, 0, 31]).format('DDDo'), 'ọjọ́ 31').toBe('ọjọ́ 31');
    });

    test('format month', () => {
        var expected =
                'Sẹ́rẹ́ Sẹ́r_Èrèlè Èrl_Ẹrẹ̀nà Ẹrn_Ìgbé Ìgb_Èbibi Èbi_Òkùdu Òkù_Agẹmo Agẹ_Ògún Ògú_Owewe Owe_Ọ̀wàrà Ọ̀wà_Bélú Bél_Ọ̀pẹ̀̀ Ọ̀pẹ̀̀'.split(
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
                'Àìkú Àìk Àì_Ajé Ajé Aj_Ìsẹ́gun Ìsẹ́ Ìs_Ọjọ́rú Ọjr Ọr_Ọjọ́bọ Ọjb Ọb_Ẹtì Ẹtì Ẹt_Àbámẹ́ta Àbá Àb'.split(
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
            '44 seconds = ìsẹjú aayá die'
        ).toBe('ìsẹjú aayá die');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = ìsẹjú kan'
        ).toBe('ìsẹjú kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('ìsẹjú kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = ìsẹjú 2'
        ).toBe('ìsẹjú 2');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            'ìsẹjú 44 = ìsẹjú 44'
        ).toBe('ìsẹjú 44');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            'ìsẹjú 45 = wákati kan'
        ).toBe('wákati kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            'ìsẹjú 89 = wákati kan'
        ).toBe('wákati kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            'ìsẹjú 90 = wákati 2'
        ).toBe('wákati 2');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            'wákati 5 = wákati 5'
        ).toBe('wákati 5');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            'wákati 21 = wákati 21'
        ).toBe('wákati 21');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 wákati = ọjọ́ kan'
        ).toBe('ọjọ́ kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 wákati = ọjọ́ kan'
        ).toBe('ọjọ́ kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            'wákati 36 = ọjọ́ 2'
        ).toBe('ọjọ́ 2');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1  = ọjọ́ kan'
        ).toBe('ọjọ́ kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            'ọjọ́ 5 = ọjọ́  5'
        ).toBe('ọjọ́ 5');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            'ọjọ́ 25 = ọjọ́ 25'
        ).toBe('ọjọ́ 25');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            'ọjọ́ 26 = osù kan'
        ).toBe('osù kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            'ọjọ́ 30 = osù kan'
        ).toBe('osù kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            'ọjọ́ 43 = osù kan'
        ).toBe('osù kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            'ọjọ́ 46 = osù 2'
        ).toBe('osù 2');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            'ọjọ́ 75 = osù 2'
        ).toBe('osù 2');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            'ọjọ́ 76 = osù 3'
        ).toBe('osù 3');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            'osù 1 = osù kan'
        ).toBe('osù kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            'osù 5 = osù 5'
        ).toBe('osù 5');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            'ọjọ 345 = ọdún kan'
        ).toBe('ọdún kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            'ọjọ 548 = ọdún 2'
        ).toBe('ọdún 2');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            'ọdún 1 = ọdún kan'
        ).toBe('ọdún kan');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            'ọdún 5 = ọdún 5'
        ).toBe('ọdún 5');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('ní ìsẹjú aayá die');
        expect(moment(0).from(30000), 'suffix').toBe('ìsẹjú aayá die kọjá');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('ìsẹjú aayá die kọjá');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'ní ìsẹjú aayá die').toBe(
            'ní ìsẹjú aayá die'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'ní ọjọ́ 5').toBe('ní ọjọ́ 5');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Ònì ni 12:00 PM'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Ònì ni 12:25 PM'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Ònì ni 1:00 PM'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Ọ̀la ni 12:00 PM');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Ònì ni 11:00 AM');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Àna ni 12:00 PM');
    });

    test('calendar next week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format("dddd [Ọsẹ̀ tón'bọ] [ni] LT")
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format("dddd [Ọsẹ̀ tón'bọ] [ni] LT"));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format("dddd [Ọsẹ̀ tón'bọ] [ni] LT")
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('dddd [Ọsẹ̀ tólọ́] [ni] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [Ọsẹ̀ tólọ́] [ni] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('dddd [Ọsẹ̀ tólọ́] [ni] LT')
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

    test('weeks year starting sunday format', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 52'
        ).toBe('52 52 ọjọ́ 52');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 ọjọ́ 1');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('1 01 ọjọ́ 1');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('2 02 ọjọ́ 2');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('2 02 ọjọ́ 2');
    });
});
