import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/uz-latn';

describe('locale:uz-latn', () => {
    setupLocaleTests('uz-latn');

    test('parse', () => {
        var tests =
                'Yanvar Yan_Fevral Fev_Mart Mar_Aprel Apr_May May_Iyun Iyun_Iyul Iyul_Avgust Avg_Sentabr Sen_Oktabr Okt_Noyabr Noy_Dekabr Dek'.split(
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
                    'dddd, Do-MMMM YYYY, h:mm:ss',
                    'Yakshanba, 14-Fevral 2010, 3:25:50',
                ],
                ['ddd, h:mm', 'Yak, 3:25'],
                ['M Mo MM MMMM MMM', '2 2 02 Fevral Fev'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 14'],
                ['d do dddd ddd dd', '0 0 Yakshanba Yak Ya'],
                ['DDD DDDo DDDD', '45 45 045'],
                ['w wo ww', '7 7 07'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[yilning] DDDo-[kuni]', 'yilning 45-kuni'],
                ['LTS', '15:25:50'],
                ['L', '14/02/2010'],
                ['LL', '14 Fevral 2010'],
                ['LLL', '14 Fevral 2010 15:25'],
                ['LLLL', '14 Fevral 2010, Yakshanba 15:25'],
                ['l', '14/2/2010'],
                ['ll', '14 Fev 2010'],
                ['lll', '14 Fev 2010 15:25'],
                ['llll', '14 Fev 2010, Yak 15:25'],
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
        expect(moment([2016, 0, 1]).format('DDDo'), '1').toBe('1');
        expect(moment([2016, 0, 2]).format('DDDo'), '2').toBe('2');
        expect(moment([2016, 0, 3]).format('DDDo'), '3').toBe('3');
        expect(moment([2016, 0, 4]).format('DDDo'), '4').toBe('4');
        expect(moment([2016, 0, 5]).format('DDDo'), '5').toBe('5');
        expect(moment([2016, 0, 6]).format('DDDo'), '6').toBe('6');
        expect(moment([2016, 0, 7]).format('DDDo'), '7').toBe('7');
        expect(moment([2016, 0, 8]).format('DDDo'), '8').toBe('8');
        expect(moment([2016, 0, 9]).format('DDDo'), '9').toBe('9');
        expect(moment([2016, 0, 10]).format('DDDo'), '10').toBe('10');

        expect(moment([2016, 0, 11]).format('DDDo'), '11').toBe('11');
        expect(moment([2016, 0, 12]).format('DDDo'), '12').toBe('12');
        expect(moment([2016, 0, 13]).format('DDDo'), '13').toBe('13');
        expect(moment([2016, 0, 14]).format('DDDo'), '14').toBe('14');
        expect(moment([2016, 0, 15]).format('DDDo'), '15').toBe('15');
        expect(moment([2016, 0, 16]).format('DDDo'), '16').toBe('16');
        expect(moment([2016, 0, 17]).format('DDDo'), '17').toBe('17');
        expect(moment([2016, 0, 18]).format('DDDo'), '18').toBe('18');
        expect(moment([2016, 0, 19]).format('DDDo'), '19').toBe('19');
        expect(moment([2016, 0, 20]).format('DDDo'), '20').toBe('20');

        expect(moment([2016, 0, 21]).format('DDDo'), '21').toBe('21');
        expect(moment([2016, 0, 22]).format('DDDo'), '22').toBe('22');
        expect(moment([2016, 0, 23]).format('DDDo'), '23').toBe('23');
        expect(moment([2016, 0, 24]).format('DDDo'), '24').toBe('24');
        expect(moment([2016, 0, 25]).format('DDDo'), '25').toBe('25');
        expect(moment([2016, 0, 26]).format('DDDo'), '26').toBe('26');
        expect(moment([2016, 0, 27]).format('DDDo'), '27').toBe('27');
        expect(moment([2016, 0, 28]).format('DDDo'), '28').toBe('28');
        expect(moment([2016, 0, 29]).format('DDDo'), '29').toBe('29');
        expect(moment([2016, 0, 30]).format('DDDo'), '30').toBe('30');

        expect(moment([2016, 0, 31]).format('DDDo'), '31').toBe('31');
    });

    test('format month', () => {
        var expected =
                'Yanvar Yan_Fevral Fev_Mart Mar_Aprel Apr_May May_Iyun Iyun_Iyul Iyul_Avgust Avg_Sentabr Sen_Oktabr Okt_Noyabr Noy_Dekabr Dek'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(moment([2016, i, 1]).format('MMMM MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format week', () => {
        var expected =
                'Yakshanba Yak Ya_Dushanba Dush Du_Seshanba Sesh Se_Chorshanba Chor Cho_Payshanba Pay Pa_Juma Jum Ju_Shanba Shan Sha'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(
                moment([2016, 0, 3 + i]).format('dddd ddd dd'),
                expected[i]
            ).toBe(expected[i]);
        }
    });

    test('from', () => {
        var start = moment([2017, 1, 28]);
        expect(
            start.from(moment([2017, 1, 28]).add({ s: 44 }), true),
            '44 soniya = soniya'
        ).toBe('soniya');
        expect(
            start.from(moment([2017, 1, 28]).add({ s: 45 }), true),
            '45 soniya = bir daqiqa'
        ).toBe('bir daqiqa');
        expect(
            start.from(moment([2017, 1, 28]).add({ s: 89 }), true),
            '89 soniya = bir daqiqa'
        ).toBe('bir daqiqa');
        expect(
            start.from(moment([2017, 1, 28]).add({ s: 90 }), true),
            '90 soniya = 2 daqiqa'
        ).toBe('2 daqiqa');
        expect(
            start.from(moment([2017, 1, 28]).add({ m: 44 }), true),
            '44 daqiqa = 44 daqiqa'
        ).toBe('44 daqiqa');
        expect(
            start.from(moment([2017, 1, 28]).add({ m: 45 }), true),
            '45 minut = bir soat'
        ).toBe('bir soat');
        expect(
            start.from(moment([2017, 1, 28]).add({ m: 89 }), true),
            '89 minut = bir soat'
        ).toBe('bir soat');
        expect(
            start.from(moment([2017, 1, 28]).add({ m: 90 }), true),
            '90 minut = 2 soat'
        ).toBe('2 soat');
        expect(
            start.from(moment([2017, 1, 28]).add({ h: 5 }), true),
            '5 soat = 5 soat'
        ).toBe('5 soat');
        expect(
            start.from(moment([2017, 1, 28]).add({ h: 21 }), true),
            '21 soat = 21 soat'
        ).toBe('21 soat');
        expect(
            start.from(moment([2017, 1, 28]).add({ h: 22 }), true),
            '22 soat = bir kun'
        ).toBe('bir kun');
        expect(
            start.from(moment([2017, 1, 28]).add({ h: 35 }), true),
            '35 soat = bir kun'
        ).toBe('bir kun');
        expect(
            start.from(moment([2017, 1, 28]).add({ h: 36 }), true),
            '36 soat = 2 kun'
        ).toBe('2 kun');
        expect(
            start.from(moment([2017, 1, 28]).add({ d: 1 }), true),
            '1 kun = 1 kun'
        ).toBe('bir kun');
        expect(
            start.from(moment([2017, 1, 28]).add({ d: 5 }), true),
            '5 kun = 5 kun'
        ).toBe('5 kun');
        expect(
            start.from(moment([2017, 1, 28]).add({ d: 25 }), true),
            '25 kun = 25 kun'
        ).toBe('25 kun');
        expect(
            start.from(moment([2017, 1, 28]).add({ d: 26 }), true),
            '26 kun = bir oy'
        ).toBe('bir oy');
        expect(
            start.from(moment([2017, 1, 28]).add({ d: 30 }), true),
            '30 kun = bir oy'
        ).toBe('bir oy');
        expect(
            start.from(moment([2017, 1, 28]).add({ d: 43 }), true),
            '45 kun = bir oy'
        ).toBe('bir oy');
        expect(
            start.from(moment([2017, 1, 28]).add({ d: 46 }), true),
            '46 kun = 2 oy'
        ).toBe('2 oy');
        expect(
            start.from(moment([2017, 1, 28]).add({ d: 74 }), true),
            '75 kun = 2 oy'
        ).toBe('2 oy');
        expect(
            start.from(moment([2017, 1, 28]).add({ d: 76 }), true),
            '76 kun = 3 oy'
        ).toBe('3 oy');
        expect(
            start.from(moment([2017, 1, 28]).add({ M: 1 }), true),
            'bir oy = bir oy'
        ).toBe('bir oy');
        expect(
            start.from(moment([2017, 1, 28]).add({ M: 5 }), true),
            '5 oy = 5 oy'
        ).toBe('5 oy');
        expect(
            start.from(moment([2017, 1, 28]).add({ d: 345 }), true),
            '345 kun = bir yil'
        ).toBe('bir yil');
        expect(
            start.from(moment([2017, 1, 28]).add({ d: 548 }), true),
            '548 kun = 2 yil'
        ).toBe('2 yil');
        expect(
            start.from(moment([2017, 1, 28]).add({ y: 1 }), true),
            '1 yil = bir yil'
        ).toBe('bir yil');
        expect(
            start.from(moment([2017, 1, 28]).add({ y: 5 }), true),
            '5 yil = 5 yil'
        ).toBe('5 yil');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('Yaqin soniya ichida');
        expect(moment(0).from(30000), 'suffix').toBe('Bir necha soniya oldin');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('Bir necha soniya oldin');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'Yaqin soniya ichida'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'Yaqin 5 kun ichida'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Bugun soat 12:00 da'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Bugun soat 12:25 da'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Bugun soat 13:00 da'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Ertaga 12:00 da');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Bugun soat 11:00 da');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Kecha soat 12:00 da');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [kuni soat] LT [da]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [kuni soat] LT [da]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [kuni soat] LT [da]')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format("[O'tgan] dddd [kuni soat] LT [da]")
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format("[O'tgan] dddd [kuni soat] LT [da]"));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format("[O'tgan] dddd [kuni soat] LT [da]")
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
        ).toBe('1 01 1');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('2 02 2');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('2 02 2');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('3 03 3');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('3 03 3');
    });
});
