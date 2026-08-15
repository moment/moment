import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/et';

describe('locale:et', () => {
    setupLocaleTests('et');

    test('parse', () => {
        var tests =
                'jaanuar jaan_veebruar veebr_märts märts_aprill apr_mai mai_juuni juuni_juuli juuli_august aug_september sept_oktoober okt_november nov_detsember dets'.split(
                    '_'
                ),
            i;
        function equalTest(input, mmm, i) {
            expect(
                moment(input, mmm).month(),
                input + ' peaks olema kuu ' + (i + 1)
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
                    'dddd, Do MMMM YYYY, H:mm:ss',
                    'pühapäev, 14. veebruar 2010, 15:25:50',
                ],
                ['ddd, h', 'P, 3'],
                ['M Mo MM MMMM MMM', '2 2. 02 veebruar veebr'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14. 14'],
                ['d do dddd ddd dd', '0 0. pühapäev P P'],
                ['DDD DDDo DDDD', '45 45. 045'],
                ['w wo ww', '6 6. 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[aasta] DDDo [päev]', 'aasta 45. päev'],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010'],
                ['LL', '14. veebruar 2010'],
                ['LLL', '14. veebruar 2010 15:25'],
                ['LLLL', 'pühapäev, 14. veebruar 2010 15:25'],
                ['l', '14.2.2010'],
                ['ll', '14. veebr 2010'],
                ['lll', '14. veebr 2010 15:25'],
                ['llll', 'P, 14. veebr 2010 15:25'],
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
                'jaanuar jaan_veebruar veebr_märts märts_aprill apr_mai mai_juuni juuni_juuli juuli_august aug_september sept_oktoober okt_november nov_detsember dets'.split(
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
                'pühapäev P P_esmaspäev E E_teisipäev T T_kolmapäev K K_neljapäev N N_reede R R_laupäev L L'.split(
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
            '44 seconds = paar sekundit'
        ).toBe('paar sekundit');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = üks minut'
        ).toBe('üks minut');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = üks minut'
        ).toBe('üks minut');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutit'
        ).toBe('2 minutit');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutit'
        ).toBe('44 minutit');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = tund aega'
        ).toBe('üks tund');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = üks tund'
        ).toBe('üks tund');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 tundi'
        ).toBe('2 tundi');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 tundi'
        ).toBe('5 tundi');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 tundi'
        ).toBe('21 tundi');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = üks päev'
        ).toBe('üks päev');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = üks päev'
        ).toBe('üks päev');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 päeva'
        ).toBe('2 päeva');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = üks päev'
        ).toBe('üks päev');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 päeva'
        ).toBe('5 päeva');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 päeva'
        ).toBe('25 päeva');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = üks kuu'
        ).toBe('üks kuu');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = üks kuu'
        ).toBe('üks kuu');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = üks kuu'
        ).toBe('üks kuu');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 kuud'
        ).toBe('2 kuud');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 kuud'
        ).toBe('2 kuud');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 kuud'
        ).toBe('3 kuud');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = üks kuu'
        ).toBe('üks kuu');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 kuud'
        ).toBe('5 kuud');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = üks aasta'
        ).toBe('üks aasta');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 aastat'
        ).toBe('2 aastat');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = üks aasta'
        ).toBe('üks aasta');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 aastat'
        ).toBe('5 aastat');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('mõne sekundi pärast');
        expect(moment(0).from(30000), 'suffix').toBe('mõni sekund tagasi');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('mõni sekund tagasi');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'mõne sekundi pärast'
        );
        expect(
            moment().subtract({ s: 30 }).fromNow(),
            'a few seconds ago'
        ).toBe('mõni sekund tagasi');

        expect(moment().add({ m: 1 }).fromNow(), 'in a minute').toBe(
            'ühe minuti pärast'
        );
        expect(moment().subtract({ m: 1 }).fromNow(), 'a minute ago').toBe(
            'üks minut tagasi'
        );

        expect(moment().add({ m: 5 }).fromNow(), 'in 5 minutes').toBe(
            '5 minuti pärast'
        );
        expect(moment().subtract({ m: 5 }).fromNow(), '5 minutes ago').toBe(
            '5 minutit tagasi'
        );

        expect(moment().add({ d: 1 }).fromNow(), 'in one day').toBe(
            'ühe päeva pärast'
        );
        expect(moment().subtract({ d: 1 }).fromNow(), 'one day ago').toBe(
            'üks päev tagasi'
        );

        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            '5 päeva pärast'
        );
        expect(moment().subtract({ d: 5 }).fromNow(), '5 days ago').toBe(
            '5 päeva tagasi'
        );

        expect(moment().add({ M: 1 }).fromNow(), 'in a month').toBe(
            'kuu aja pärast'
        );
        expect(moment().subtract({ M: 1 }).fromNow(), 'a month ago').toBe(
            'kuu aega tagasi'
        );

        expect(moment().add({ M: 5 }).fromNow(), 'in 5 months').toBe(
            '5 kuu pärast'
        );
        expect(moment().subtract({ M: 5 }).fromNow(), '5 months ago').toBe(
            '5 kuud tagasi'
        );

        expect(moment().add({ y: 1 }).fromNow(), 'in a year').toBe(
            'ühe aasta pärast'
        );
        expect(moment().subtract({ y: 1 }).fromNow(), 'a year ago').toBe(
            'aasta tagasi'
        );

        expect(moment().add({ y: 5 }).fromNow(), 'in 5 years').toBe(
            '5 aasta pärast'
        );
        expect(moment().subtract({ y: 5 }).fromNow(), '5 years ago').toBe(
            '5 aastat tagasi'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Täna, 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Täna, 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Täna, 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Homme, 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Täna, 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Eile, 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('[Järgmine] dddd LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('[Järgmine] dddd LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('[Järgmine] dddd LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[Eelmine] dddd LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[Eelmine] dddd LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[Eelmine] dddd LT')
            );
        }
    });

    test('calendar all else', () => {
        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        expect(weeksAgo.calendar(), '1 nädal tagasi').toBe(
            weeksAgo.format('L')
        );
        expect(weeksFromNow.calendar(), '1 nädala pärast').toBe(
            weeksFromNow.format('L')
        );

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        expect(weeksAgo.calendar(), '2 nädalat tagasi').toBe(
            weeksAgo.format('L')
        );
        expect(weeksFromNow.calendar(), '2 nädala pärast').toBe(
            weeksFromNow.format('L')
        );
    });

    test('weeks year starting sunday formatted', () => {
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
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('2 02 2.');
    });
});
