import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/hu';

describe('locale:hu', () => {
    setupLocaleTests('hu');

    test('parse', () => {
        var tests =
                'január jan._február feb._március márc._április ápr._május máj._június jún._július júl._augusztus aug._szeptember szept._október okt._november nov._december dec.'.split(
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
                    'dddd, MMMM Do YYYY, HH:mm:ss',
                    'vasárnap, február 14. 2010, 15:25:50',
                ],
                ['ddd, HH', 'vas, 15'],
                ['M Mo MM MMMM MMM', '2 2. 02 február feb.'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14. 14'],
                ['d do dddd ddd dd', '0 0. vasárnap vas v'],
                ['DDD DDDo DDDD', '45 45. 045'],
                ['w wo ww', '6 6. 06'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['[az év] DDDo [napja]', 'az év 45. napja'],
                ['LTS', '15:25:50'],
                ['L', '2010.02.14.'],
                ['LL', '2010. február 14.'],
                ['LLL', '2010. február 14. 15:25'],
                ['LLLL', '2010. február 14., vasárnap 15:25'],
                ['l', '2010.2.14.'],
                ['ll', '2010. feb. 14.'],
                ['lll', '2010. feb. 14. 15:25'],
                ['llll', '2010. feb. 14., vas 15:25'],
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('meridiem', () => {
        expect(moment([2011, 2, 23, 0, 0]).format('a'), 'am').toBe('de');
        expect(moment([2011, 2, 23, 11, 59]).format('a'), 'am').toBe('de');
        expect(moment([2011, 2, 23, 12, 0]).format('a'), 'pm').toBe('du');
        expect(moment([2011, 2, 23, 23, 59]).format('a'), 'pm').toBe('du');

        expect(moment([2011, 2, 23, 0, 0]).format('A'), 'AM').toBe('DE');
        expect(moment([2011, 2, 23, 11, 59]).format('A'), 'AM').toBe('DE');
        expect(moment([2011, 2, 23, 12, 0]).format('A'), 'PM').toBe('DU');
        expect(moment([2011, 2, 23, 23, 59]).format('A'), 'PM').toBe('DU');
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '1.').toBe('1.');
        expect(moment([2011, 0, 2]).format('DDDo'), '2.').toBe('2.');
        expect(moment([2011, 0, 3]).format('DDDo'), '3.').toBe('3.');
        expect(moment([2011, 0, 4]).format('DDDo'), '4.').toBe('4.');
        expect(moment([2011, 0, 5]).format('DDDo'), '5.').toBe('5.');
        expect(moment([2011, 0, 6]).format('DDDo'), '6.').toBe('6.');
        expect(moment([2011, 0, 7]).format('DDDo'), '7.').toBe('7.');
        expect(moment([2011, 0, 8]).format('DDDo'), '8.').toBe('8.');
        expect(moment([2011, 0, 9]).format('DDDo'), '9.').toBe('9.');
        expect(moment([2011, 0, 10]).format('DDDo'), '10.').toBe('10.');

        expect(moment([2011, 0, 11]).format('DDDo'), '11.').toBe('11.');
        expect(moment([2011, 0, 12]).format('DDDo'), '12.').toBe('12.');
        expect(moment([2011, 0, 13]).format('DDDo'), '13.').toBe('13.');
        expect(moment([2011, 0, 14]).format('DDDo'), '14.').toBe('14.');
        expect(moment([2011, 0, 15]).format('DDDo'), '15.').toBe('15.');
        expect(moment([2011, 0, 16]).format('DDDo'), '16.').toBe('16.');
        expect(moment([2011, 0, 17]).format('DDDo'), '17.').toBe('17.');
        expect(moment([2011, 0, 18]).format('DDDo'), '18.').toBe('18.');
        expect(moment([2011, 0, 19]).format('DDDo'), '19.').toBe('19.');
        expect(moment([2011, 0, 20]).format('DDDo'), '20.').toBe('20.');

        expect(moment([2011, 0, 21]).format('DDDo'), '21.').toBe('21.');
        expect(moment([2011, 0, 22]).format('DDDo'), '22.').toBe('22.');
        expect(moment([2011, 0, 23]).format('DDDo'), '23.').toBe('23.');
        expect(moment([2011, 0, 24]).format('DDDo'), '24.').toBe('24.');
        expect(moment([2011, 0, 25]).format('DDDo'), '25.').toBe('25.');
        expect(moment([2011, 0, 26]).format('DDDo'), '26.').toBe('26.');
        expect(moment([2011, 0, 27]).format('DDDo'), '27.').toBe('27.');
        expect(moment([2011, 0, 28]).format('DDDo'), '28.').toBe('28.');
        expect(moment([2011, 0, 29]).format('DDDo'), '29.').toBe('29.');
        expect(moment([2011, 0, 30]).format('DDDo'), '30.').toBe('30.');

        expect(moment([2011, 0, 31]).format('DDDo'), '31.').toBe('31.');
    });

    test('format month', () => {
        var expected =
                'január jan._február feb._március márc._április ápr._május máj._június jún._július júl._augusztus aug._szeptember szept._október okt._november nov._december dec.'.split(
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
                'vasárnap vas_hétfő hét_kedd kedd_szerda sze_csütörtök csüt_péntek pén_szombat szo'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(
                moment([2011, 0, 2 + i]).format('dddd ddd'),
                expected[i]
            ).toBe(expected[i]);
        }
    });

    test('from', () => {
        var start = moment([2007, 1, 28]);
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
            '44 másodperc = néhány másodperc'
        ).toBe('néhány másodperc');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 másodperc = egy perc'
        ).toBe('egy perc');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 másodperc = egy perc'
        ).toBe('egy perc');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 másodperc = 2 perc'
        ).toBe('2 perc');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 perc = 44 perc'
        ).toBe('44 perc');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 perc = egy óra'
        ).toBe('egy óra');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 perc = egy óra'
        ).toBe('egy óra');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 perc = 2 óra'
        ).toBe('2 óra');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 óra = 5 óra'
        ).toBe('5 óra');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 óra = 21 óra'
        ).toBe('21 óra');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 óra = egy nap'
        ).toBe('egy nap');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 óra = egy nap'
        ).toBe('egy nap');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 óra = 2 nap'
        ).toBe('2 nap');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 nap = egy nap'
        ).toBe('egy nap');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 nap = 5 nap'
        ).toBe('5 nap');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 nap = 25 nap'
        ).toBe('25 nap');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 nap = egy hónap'
        ).toBe('egy hónap');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 nap = egy hónap'
        ).toBe('egy hónap');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '45 nap = egy hónap'
        ).toBe('egy hónap');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 nap = 2 hónap'
        ).toBe('2 hónap');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 nap = 2 hónap'
        ).toBe('2 hónap');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 nap = 3 hónap'
        ).toBe('3 hónap');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 hónap = egy hónap'
        ).toBe('egy hónap');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 hónap = 5 hónap'
        ).toBe('5 hónap');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 nap = egy év'
        ).toBe('egy év');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 nap = 2 év'
        ).toBe('2 év');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 év = egy év'
        ).toBe('egy év');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 év = 5 év'
        ).toBe('5 év');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('néhány másodperc múlva');
        expect(moment(0).from(30000), 'suffix').toBe('néhány másodperce');
    });

    test('from ss threshold set', () => {
        var start = moment([2007, 1, 28]),
            s = moment.relativeTimeThreshold('s'),
            ss = moment.relativeTimeThreshold('ss');
        moment.relativeTimeThreshold('s', 45);
        moment.relativeTimeThreshold('ss', 10);

        expect(
            start.from(moment([2007, 1, 28]).add({ s: 11 }), true),
            '11 seconds = 11 seconds'
        ).toBe('11 másodperc');
        expect(moment(0).from(11000), '11 seconds ago with suffix').toBe(
            '11 másodperce'
        );
        expect(moment(11000).from(0), '11 seconds future with suffix').toBe(
            '11 másodperc múlva'
        );

        moment.relativeTimeThreshold('s', s);
        moment.relativeTimeThreshold('ss', ss);
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('néhány másodperce');
    });

    test('fromNow', () => {
        expect(
            moment().add({ s: 30 }).fromNow(),
            'néhány másodperc múlva'
        ).toBe('néhány másodperc múlva');
        expect(moment().add({ d: 5 }).fromNow(), '5 nap múlva').toBe(
            '5 nap múlva'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'ma 12:00-kor'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'ma 12:25-kor'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'ma 13:00-kor'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('holnap 12:00-kor');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('ma 11:00-kor');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('tegnap 12:00-kor');
    });

    test('calendar next week', () => {
        var i,
            m,
            days =
                'vasárnap_hétfőn_kedden_szerdán_csütörtökön_pénteken_szombaton'.split(
                    '_'
                );
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'today + ' + i + ' days current time').toBe(
                m.format('[' + days[m.day()] + '] LT[-kor]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'today + ' + i + ' days beginning of day'
            ).toBe(m.format('[' + days[m.day()] + '] LT[-kor]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'today + ' + i + ' days end of day').toBe(
                m.format('[' + days[m.day()] + '] LT[-kor]')
            );
        }
    });

    test('calendar last week', () => {
        var i,
            m,
            days =
                'vasárnap_hétfőn_kedden_szerdán_csütörtökön_pénteken_szombaton'.split(
                    '_'
                );

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'today - ' + i + ' days current time').toBe(
                m.format('[múlt ' + days[m.day()] + '] LT[-kor]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'today - ' + i + ' days beginning of day'
            ).toBe(m.format('[múlt ' + days[m.day()] + '] LT[-kor]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'today - ' + i + ' days end of day').toBe(
                m.format('[múlt ' + days[m.day()] + '] LT[-kor]')
            );
        }
    });

    test('calendar all else', () => {
        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        expect(weeksAgo.calendar(), 'egy héte').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), 'egy hét múlva').toBe(
            weeksFromNow.format('L')
        );

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        expect(weeksAgo.calendar(), '2 hete').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), '2 hét múlva').toBe(
            weeksFromNow.format('L')
        );
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2011, 11, 26]).format('w ww wo'),
            'Dec 26 2011 should be week 52'
        ).toBe('52 52 52.');
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 52'
        ).toBe('52 52 52.');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 1.');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('1 01 1.');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('2 02 2.');
    });
});
