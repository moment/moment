import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/lo';

describe('locale:lo', () => {
    setupLocaleTests('lo');

    test('parse', () => {
        var tests =
                'ມັງກອນ ມັງກອນ_ກຸມພາ ກຸມພາ_ມີນາ ມີນາ_ເມສາ ເມສາ_ພຶດສະພາ ພຶດສະພາ_ມິຖຸນາ ມິຖຸນາ_ກໍລະກົດ ກໍລະກົດ_ສິງຫາ ສິງຫາ_ກັນຍາ ກັນຍາ_ຕຸລາ ຕຸລາ_ພະຈິກ ພະຈິກ_ທັນວາ ທັນວາ'.split(
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
                    'ອາທິດ, ກຸມພາ ທີ່14 2010, 3:25:50 ຕອນແລງ',
                ],
                ['ddd, hA', 'ທິດ, 3ຕອນແລງ'],
                ['M Mo MM MMMM MMM', '2 ທີ່2 02 ກຸມພາ ກຸມພາ'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 ທີ່14 14'],
                ['d do dddd ddd dd', '0 ທີ່0 ອາທິດ ທິດ ທ'],
                ['DDD DDDo DDDD', '45 ທີ່45 045'],
                ['w wo ww', '8 ທີ່8 08'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'ຕອນແລງ ຕອນແລງ'],
                ['[ວັນ]DDDo [ຂອງປີ]', 'ວັນທີ່45 ຂອງປີ'],
                ['LTS', '15:25:50'],
                ['L', '14/02/2010'],
                ['LL', '14 ກຸມພາ 2010'],
                ['LLL', '14 ກຸມພາ 2010 15:25'],
                ['LLLL', 'ວັນອາທິດ 14 ກຸມພາ 2010 15:25'],
                ['l', '14/2/2010'],
                ['ll', '14 ກຸມພາ 2010'],
                ['lll', '14 ກຸມພາ 2010 15:25'],
                ['llll', 'ວັນທິດ 14 ກຸມພາ 2010 15:25'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), 'ທີ່1').toBe('ທີ່1');
        expect(moment([2011, 0, 2]).format('DDDo'), 'ທີ່2').toBe('ທີ່2');
        expect(moment([2011, 0, 3]).format('DDDo'), 'ທີ່3').toBe('ທີ່3');
        expect(moment([2011, 0, 4]).format('DDDo'), 'ທີ່4').toBe('ທີ່4');
        expect(moment([2011, 0, 5]).format('DDDo'), 'ທີ່5').toBe('ທີ່5');
        expect(moment([2011, 0, 6]).format('DDDo'), 'ທີ່6').toBe('ທີ່6');
        expect(moment([2011, 0, 7]).format('DDDo'), 'ທີ່7').toBe('ທີ່7');
        expect(moment([2011, 0, 8]).format('DDDo'), 'ທີ່8').toBe('ທີ່8');
        expect(moment([2011, 0, 9]).format('DDDo'), 'ທີ່9').toBe('ທີ່9');
        expect(moment([2011, 0, 10]).format('DDDo'), 'ທີ່10').toBe('ທີ່10');

        expect(moment([2011, 0, 11]).format('DDDo'), 'ທີ່11').toBe('ທີ່11');
        expect(moment([2011, 0, 12]).format('DDDo'), 'ທີ່12').toBe('ທີ່12');
        expect(moment([2011, 0, 13]).format('DDDo'), 'ທີ່13').toBe('ທີ່13');
        expect(moment([2011, 0, 14]).format('DDDo'), 'ທີ່14').toBe('ທີ່14');
        expect(moment([2011, 0, 15]).format('DDDo'), 'ທີ່15').toBe('ທີ່15');
        expect(moment([2011, 0, 16]).format('DDDo'), 'ທີ່16').toBe('ທີ່16');
        expect(moment([2011, 0, 17]).format('DDDo'), 'ທີ່17').toBe('ທີ່17');
        expect(moment([2011, 0, 18]).format('DDDo'), 'ທີ່18').toBe('ທີ່18');
        expect(moment([2011, 0, 19]).format('DDDo'), 'ທີ່19').toBe('ທີ່19');
        expect(moment([2011, 0, 20]).format('DDDo'), 'ທີ່20').toBe('ທີ່20');

        expect(moment([2011, 0, 21]).format('DDDo'), 'ທີ່21').toBe('ທີ່21');
        expect(moment([2011, 0, 22]).format('DDDo'), 'ທີ່22').toBe('ທີ່22');
        expect(moment([2011, 0, 23]).format('DDDo'), 'ທີ່23').toBe('ທີ່23');
        expect(moment([2011, 0, 24]).format('DDDo'), 'ທີ່24').toBe('ທີ່24');
        expect(moment([2011, 0, 25]).format('DDDo'), 'ທີ່25').toBe('ທີ່25');
        expect(moment([2011, 0, 26]).format('DDDo'), 'ທີ່26').toBe('ທີ່26');
        expect(moment([2011, 0, 27]).format('DDDo'), 'ທີ່27').toBe('ທີ່27');
        expect(moment([2011, 0, 28]).format('DDDo'), 'ທີ່28').toBe('ທີ່28');
        expect(moment([2011, 0, 29]).format('DDDo'), 'ທີ່29').toBe('ທີ່29');
        expect(moment([2011, 0, 30]).format('DDDo'), 'ທີ່30').toBe('ທີ່30');

        expect(moment([2011, 0, 31]).format('DDDo'), 'ທີ່31').toBe('ທີ່31');
    });

    test('format month', () => {
        var expected =
                'ມັງກອນ ມັງກອນ_ກຸມພາ ກຸມພາ_ມີນາ ມີນາ_ເມສາ ເມສາ_ພຶດສະພາ ພຶດສະພາ_ມິຖຸນາ ມິຖຸນາ_ກໍລະກົດ ກໍລະກົດ_ສິງຫາ ສິງຫາ_ກັນຍາ ກັນຍາ_ຕຸລາ ຕຸລາ_ພະຈິກ ພະຈິກ_ທັນວາ ທັນວາ'.split(
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
                'ອາທິດ ທິດ ທ_ຈັນ ຈັນ ຈ_ອັງຄານ ອັງຄານ ອຄ_ພຸດ ພຸດ ພ_ພະຫັດ ພະຫັດ ພຫ_ສຸກ ສຸກ ສກ_ເສົາ ເສົາ ສ'.split(
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
        ).toBe('ບໍ່ເທົ່າໃດວິນາທີ');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('1 ນາທີ');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('1 ນາທີ');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 ນາທີ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 ນາທີ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('1 ຊົ່ວໂມງ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('1 ຊົ່ວໂມງ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 ຊົ່ວໂມງ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 ຊົ່ວໂມງ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 ຊົ່ວໂມງ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('1 ມື້');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('1 ມື້');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 ມື້');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('1 ມື້');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 ມື້');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 ມື້');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('1 ເດືອນ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('1 ເດືອນ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('1 ເດືອນ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 ເດືອນ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 ເດືອນ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 ເດືອນ');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('1 ເດືອນ');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 ເດືອນ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('1 ປີ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 ປີ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('1 ປີ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 ປີ');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('ອີກ ບໍ່ເທົ່າໃດວິນາທີ');
        expect(moment(0).from(30000), 'suffix').toBe('ບໍ່ເທົ່າໃດວິນາທີຜ່ານມາ');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('ບໍ່ເທົ່າໃດວິນາທີຜ່ານມາ');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'ອີກ ບໍ່ເທົ່າໃດວິນາທີ'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe('ອີກ 5 ມື້');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'ມື້ນີ້ເວລາ 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'ມື້ນີ້ເວລາ 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'ມື້ນີ້ເວລາ 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('ມື້ອື່ນເວລາ 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('ມື້ນີ້ເວລາ 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('ມື້ວານນີ້ເວລາ 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('[ວັນ]dddd[ໜ້າເວລາ] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('[ວັນ]dddd[ໜ້າເວລາ] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('[ວັນ]dddd[ໜ້າເວລາ] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT')
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
            'Jan  1 2012 should be week 1'
        ).toBe('1 01 ທີ່1');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('1 01 ທີ່1');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('2 02 ທີ່2');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 2'
        ).toBe('2 02 ທີ່2');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('3 03 ທີ່3');
    });
});
