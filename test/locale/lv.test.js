import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/lv';

describe('locale:lv', () => {
    setupLocaleTests('lv');

    test('parse', () => {
        var tests =
                'janvāris jan_februāris feb_marts mar_aprīlis apr_maijs mai_jūnijs jūn_jūlijs jūl_augusts aug_septembris sep_oktobris okt_novembris nov_decembris dec'.split(
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
                    'svētdiena, 14. februāris 2010, 3:25:50 pm',
                ],
                ['ddd, hA', 'Sv, 3PM'],
                ['M Mo MM MMMM MMM', '2 2. 02 februāris feb'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14. 14'],
                ['d do dddd ddd dd', '0 0. svētdiena Sv Sv'],
                ['DDD DDDo DDDD', '45 45. 045'],
                ['w wo ww', '6 6. 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[the] DDDo [day of the year]', 'the 45. day of the year'],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010.'],
                ['LL', '2010. gada 14. februāris'],
                ['LLL', '2010. gada 14. februāris, 15:25'],
                ['LLLL', '2010. gada 14. februāris, svētdiena, 15:25'],
                ['l', '14.2.2010.'],
                ['ll', '2010. gada 14. feb'],
                ['lll', '2010. gada 14. feb, 15:25'],
                ['llll', '2010. gada 14. feb, Sv, 15:25'],
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
                'janvāris jan_februāris feb_marts mar_aprīlis apr_maijs mai_jūnijs jūn_jūlijs jūl_augusts aug_septembris sep_oktobris okt_novembris nov_decembris dec'.split(
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
                'svētdiena Sv Sv_pirmdiena P P_otrdiena O O_trešdiena T T_ceturtdiena C C_piektdiena Pk Pk_sestdiena S S'.split(
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

    // Includes testing the cases of withoutSuffix = true and false.
    test('from', () => {
        var start = moment([2007, 1, 28]);
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
            '44 seconds = seconds'
        ).toBe('dažas sekundes');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 }), false),
            '44 seconds with suffix = seconds ago'
        ).toBe('pirms dažām sekundēm');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('minūte');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), false),
            '45 seconds with suffix = a minute ago'
        ).toBe('pirms minūtes');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('minūte');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: -89 }), false),
            '89 seconds with suffix/prefix = in a minute'
        ).toBe('pēc minūtes');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 minūtes');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), false),
            '90 seconds with suffix = 2 minutes ago'
        ).toBe('pirms 2 minūtēm');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 minūtes');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), false),
            '44 minutes with suffix = 44 minutes ago'
        ).toBe('pirms 44 minūtēm');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('stunda');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), false),
            '45 minutes with suffix = an hour ago'
        ).toBe('pirms stundas');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('stunda');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 stundas');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: -90 }), false),
            '90 minutes with suffix = in 2 hours'
        ).toBe('pēc 2 stundām');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 stundas');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), false),
            '5 hours with suffix = 5 hours ago'
        ).toBe('pirms 5 stundām');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 stunda');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), false),
            '21 hours with suffix = 21 hours ago'
        ).toBe('pirms 21 stundas');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('diena');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), false),
            '22 hours with suffix = a day ago'
        ).toBe('pirms dienas');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('diena');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 dienas');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), false),
            '36 hours with suffix = 2 days ago'
        ).toBe('pirms 2 dienām');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('diena');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 dienas');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), false),
            '5 days with suffix = 5 days ago'
        ).toBe('pirms 5 dienām');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 dienas');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), false),
            '25 days with suffix = 25 days ago'
        ).toBe('pirms 25 dienām');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('mēnesis');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), false),
            '26 days with suffix = a month ago'
        ).toBe('pirms mēneša');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('mēnesis');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('mēnesis');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 mēneši');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), false),
            '46 days with suffix = 2 months ago'
        ).toBe('pirms 2 mēnešiem');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 mēneši');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 mēneši');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), false),
            '76 days with suffix = 3 months ago'
        ).toBe('pirms 3 mēnešiem');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('mēnesis');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 mēneši');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), false),
            '5 months with suffix = 5 months ago'
        ).toBe('pirms 5 mēnešiem');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('gads');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), false),
            '345 days with suffix = a year ago'
        ).toBe('pirms gada');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 gadi');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), false),
            '548 days with suffix = 2 years ago'
        ).toBe('pirms 2 gadiem');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('gads');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 gadi');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), false),
            '5 years with suffix = 5 years ago'
        ).toBe('pirms 5 gadiem');

        // test that numbers ending with 1 are singular except for when they end with 11 in which case they are plural
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 11 }), true),
            '11 years = 11 years'
        ).toBe('11 gadi');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 21 }), true),
            '21 year = 21 year'
        ).toBe('21 gads');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 211 }), true),
            '211 years = 211 years'
        ).toBe('211 gadi');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 221 }), false),
            '221 year with suffix = 221 years ago'
        ).toBe('pirms 221 gada');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('pēc dažām sekundēm');
        expect(moment(0).from(30000), 'suffix').toBe('pirms dažām sekundēm');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('pirms dažām sekundēm');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in seconds').toBe(
            'pēc dažām sekundēm'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'pēc 5 dienām'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Šodien pulksten 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Šodien pulksten 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Šodien pulksten 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Rīt pulksten 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Šodien pulksten 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Vakar pulksten 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [pulksten] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [pulksten] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [pulksten] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[Pagājušā] dddd [pulksten] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[Pagājušā] dddd [pulksten] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[Pagājušā] dddd [pulksten] LT')
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
