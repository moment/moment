import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/id';

describe('locale:id', () => {
    setupLocaleTests('id');

    test('parse', () => {
        var tests =
                'Januari Jan_Februari Feb_Maret Mar_April Apr_Mei Mei_Juni Jun_Juli Jul_Agustus Agt_September Sep_Oktober Okt_November Nov_Desember Des'.split(
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
                    'Minggu, Februari 14 2010, 3:25:50 sore',
                ],
                ['ddd, hA', 'Min, 3sore'],
                ['M Mo MM MMMM MMM', '2 2 02 Februari Feb'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 14'],
                ['d do dddd ddd dd', '0 0 Minggu Min Mg'],
                ['DDD DDDo DDDD', '45 45 045'],
                ['w wo ww', '8 8 08'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'sore sore'],
                ['[the] DDDo [day of the year]', 'the 45 day of the year'],
                ['LTS', '15.25.50'],
                ['L', '14/02/2010'],
                ['LL', '14 Februari 2010'],
                ['LLL', '14 Februari 2010 pukul 15.25'],
                ['LLLL', 'Minggu, 14 Februari 2010 pukul 15.25'],
                ['l', '14/2/2010'],
                ['ll', '14 Feb 2010'],
                ['lll', '14 Feb 2010 pukul 15.25'],
                ['llll', 'Min, 14 Feb 2010 pukul 15.25'],
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('format month', () => {
        var expected =
                'Januari Jan_Februari Feb_Maret Mar_April Apr_Mei Mei_Juni Jun_Juli Jul_Agustus Agt_September Sep_Oktober Okt_November Nov_Desember Des'.split(
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
                'Minggu Min Mg_Senin Sen Sn_Selasa Sel Sl_Rabu Rab Rb_Kamis Kam Km_Jumat Jum Jm_Sabtu Sab Sb'.split(
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
        ).toBe('beberapa detik');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('semenit');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('semenit');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 menit');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 menit');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('sejam');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('sejam');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 jam');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 jam');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 jam');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('sehari');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('sehari');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 hari');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('sehari');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 hari');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 hari');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('sebulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('sebulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('sebulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 bulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 bulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 bulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('sebulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 bulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('setahun');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 tahun');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('setahun');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 tahun');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('dalam beberapa detik');
        expect(moment(0).from(30000), 'suffix').toBe(
            'beberapa detik yang lalu'
        );
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('beberapa detik yang lalu');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'dalam beberapa detik'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'dalam 5 hari'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Hari ini pukul 12.00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Hari ini pukul 12.25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Hari ini pukul 13.00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Besok pukul 12.00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Hari ini pukul 11.00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Kemarin pukul 12.00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [pukul] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [pukul] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [pukul] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('dddd [lalu pukul] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [lalu pukul] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('dddd [lalu pukul] LT')
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
            'Jan 1 2012 should be week 1'
        ).toBe('1 01 1');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 1');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('1 01 1');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('2 02 2');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan  14 2012 should be week 2'
        ).toBe('2 02 2');
    });
});
