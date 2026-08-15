import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/ms';

describe('locale:ms', () => {
    setupLocaleTests('ms');

    test('parse', () => {
        var i,
            tests =
                'Januari Jan_Februari Feb_Mac Mac_April Apr_Mei Mei_Jun Jun_Julai Jul_Ogos Ogs_September Sep_Oktober Okt_November Nov_Disember Dis'.split(
                    '_'
                );

        function equalTest(input, mmm, i) {
            expect(
                moment(input, mmm).month(),
                input + ' sepatutnya bulan ' + (i + 1)
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
                    'Ahad, Februari 14 2010, 3:25:50 petang',
                ],
                ['ddd, hA', 'Ahd, 3petang'],
                ['M Mo MM MMMM MMM', '2 2 02 Februari Feb'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 14'],
                ['d do dddd ddd dd', '0 0 Ahad Ahd Ah'],
                ['DDD DDDo DDDD', '45 45 045'],
                ['w wo ww', '7 7 07'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'petang petang'],
                ['[hari] [ke] DDDo [tahun] ini', 'hari ke 45 tahun ini'],
                ['LTS', '15.25.50'],
                ['L', '14/02/2010'],
                ['LL', '14 Februari 2010'],
                ['LLL', '14 Februari 2010 pukul 15.25'],
                ['LLLL', 'Ahad, 14 Februari 2010 pukul 15.25'],
                ['l', '14/2/2010'],
                ['ll', '14 Feb 2010'],
                ['lll', '14 Feb 2010 pukul 15.25'],
                ['llll', 'Ahd, 14 Feb 2010 pukul 15.25'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1').toBe('1');
        expect(moment([2011, 0, 2]).format('DDDo'), '2').toBe('2');
        expect(moment([2011, 0, 3]).format('DDDo'), '3').toBe('3');
        expect(moment([2011, 0, 4]).format('DDDo'), '4').toBe('4');
        expect(moment([2011, 0, 5]).format('DDDo'), '5').toBe('5');
        expect(moment([2011, 0, 6]).format('DDDo'), '6').toBe('6');
        expect(moment([2011, 0, 7]).format('DDDo'), '7').toBe('7');
        expect(moment([2011, 0, 8]).format('DDDo'), '8').toBe('8');
        expect(moment([2011, 0, 9]).format('DDDo'), '9').toBe('9');
        expect(moment([2011, 0, 10]).format('DDDo'), '10').toBe('10');

        expect(moment([2011, 0, 11]).format('DDDo'), '11').toBe('11');
        expect(moment([2011, 0, 12]).format('DDDo'), '12').toBe('12');
        expect(moment([2011, 0, 13]).format('DDDo'), '13').toBe('13');
        expect(moment([2011, 0, 14]).format('DDDo'), '14').toBe('14');
        expect(moment([2011, 0, 15]).format('DDDo'), '15').toBe('15');
        expect(moment([2011, 0, 16]).format('DDDo'), '16').toBe('16');
        expect(moment([2011, 0, 17]).format('DDDo'), '17').toBe('17');
        expect(moment([2011, 0, 18]).format('DDDo'), '18').toBe('18');
        expect(moment([2011, 0, 19]).format('DDDo'), '19').toBe('19');
        expect(moment([2011, 0, 20]).format('DDDo'), '20').toBe('20');

        expect(moment([2011, 0, 21]).format('DDDo'), '21').toBe('21');
        expect(moment([2011, 0, 22]).format('DDDo'), '22').toBe('22');
        expect(moment([2011, 0, 23]).format('DDDo'), '23').toBe('23');
        expect(moment([2011, 0, 24]).format('DDDo'), '24').toBe('24');
        expect(moment([2011, 0, 25]).format('DDDo'), '25').toBe('25');
        expect(moment([2011, 0, 26]).format('DDDo'), '26').toBe('26');
        expect(moment([2011, 0, 27]).format('DDDo'), '27').toBe('27');
        expect(moment([2011, 0, 28]).format('DDDo'), '28').toBe('28');
        expect(moment([2011, 0, 29]).format('DDDo'), '29').toBe('29');
        expect(moment([2011, 0, 30]).format('DDDo'), '30').toBe('30');

        expect(moment([2011, 0, 31]).format('DDDo'), '31').toBe('31');
    });

    test('format month', () => {
        var i,
            expected =
                'Januari Jan_Februari Feb_Mac Mac_April Apr_Mei Mei_Jun Jun_Julai Jul_Ogos Ogs_September Sep_Oktober Okt_November Nov_Disember Dis'.split(
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
                'Ahad Ahd Ah_Isnin Isn Is_Selasa Sel Sl_Rabu Rab Rb_Khamis Kha Km_Jumaat Jum Jm_Sabtu Sab Sb'.split(
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
            '44 saat = beberapa saat'
        ).toBe('beberapa saat');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 saat = seminit'
        ).toBe('seminit');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 saat = seminit'
        ).toBe('seminit');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 saat = 2 minit'
        ).toBe('2 minit');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minit = 44 minit'
        ).toBe('44 minit');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minit = sejam'
        ).toBe('sejam');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minit = sejam'
        ).toBe('sejam');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minit = 2 jam'
        ).toBe('2 jam');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 jam = 5 jam'
        ).toBe('5 jam');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 jam = 21 jam'
        ).toBe('21 jam');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 jam = sehari'
        ).toBe('sehari');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 jam = sehari'
        ).toBe('sehari');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 jam = 2 hari'
        ).toBe('2 hari');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 hari = sehari'
        ).toBe('sehari');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 hari = 5 hari'
        ).toBe('5 hari');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 hari = 25 hari'
        ).toBe('25 hari');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 hari = sebulan'
        ).toBe('sebulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 hari = sebulan'
        ).toBe('sebulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '45 hari = sebulan'
        ).toBe('sebulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 hari = 2 bulan'
        ).toBe('2 bulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 hari = 2 bulan'
        ).toBe('2 bulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 hari = 3 bulan'
        ).toBe('3 bulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 bulan = sebulan'
        ).toBe('sebulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 bulan = 5 bulan'
        ).toBe('5 bulan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 hari = setahun'
        ).toBe('setahun');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 hari = 2 tahun'
        ).toBe('2 tahun');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 tahun = setahun'
        ).toBe('setahun');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 tahun = 5 tahun'
        ).toBe('5 tahun');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('dalam beberapa saat');
        expect(moment(0).from(30000), 'suffix').toBe(
            'beberapa saat yang lepas'
        );
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'waktu sekarang dari sekarang sepatutnya menunjukkan sebagai telah lepas'
        ).toBe('beberapa saat yang lepas');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'dalam beberapa saat').toBe(
            'dalam beberapa saat'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'dalam 5 hari').toBe(
            'dalam 5 hari'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'hari ini pada waktu yang sama').toBe(
            'Hari ini pukul 12.00'
        );
        expect(
            moment(a).add({ m: 25 }).calendar(),
            'Sekarang tambah 25 minit'
        ).toBe('Hari ini pukul 12.25');
        expect(
            moment(a).add({ h: 1 }).calendar(),
            'Sekarang tambah 1 jam'
        ).toBe('Hari ini pukul 13.00');
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'esok pada waktu yang sama'
        ).toBe('Esok pukul 12.00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Sekarang tolak 1 jam'
        ).toBe('Hari ini pukul 11.00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'kelmarin pada waktu yang sama'
        ).toBe('Kelmarin pukul 12.00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(
                m.calendar(),
                'Hari ini + ' + i + ' hari waktu sekarang'
            ).toBe(m.format('dddd [pukul] LT'));
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Hari ini + ' + i + ' hari permulaan hari'
            ).toBe(m.format('dddd [pukul] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Hari ini + ' + i + ' hari tamat hari').toBe(
                m.format('dddd [pukul] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(
                m.calendar(),
                'Hari ini - ' + i + ' hari waktu sekarang'
            ).toBe(m.format('dddd [lepas] [pukul] LT'));
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Hari ini - ' + i + ' hari permulaan hari'
            ).toBe(m.format('dddd [lepas] [pukul] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Hari ini - ' + i + ' hari tamat hari').toBe(
                m.format('dddd [lepas] [pukul] LT')
            );
        }
    });

    test('calendar all else', () => {
        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        expect(weeksAgo.calendar(), '1 minggu lepas').toBe(
            weeksAgo.format('L')
        );
        expect(weeksFromNow.calendar(), 'dalam 1 minggu').toBe(
            weeksFromNow.format('L')
        );

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        expect(weeksAgo.calendar(), '2 minggu lepas').toBe(
            weeksAgo.format('L')
        );
        expect(weeksFromNow.calendar(), 'dalam 2 minggu').toBe(
            weeksFromNow.format('L')
        );
    });

    test('weeks year starting sunday format', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 sepatutnya minggu 1'
        ).toBe('1 01 1');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 sepatutnya minggu 2'
        ).toBe('2 02 2');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 sepatutnya minggu 2'
        ).toBe('2 02 2');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 sepatutnya minggu 3'
        ).toBe('3 03 3');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 sepatutnya minggu 3'
        ).toBe('3 03 3');
    });
});
