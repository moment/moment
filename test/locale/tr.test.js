import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/tr';

describe('locale:tr', () => {
    setupLocaleTests('tr');

    test('parse', () => {
        var tests =
                'Ocak Oca_Şubat Şub_Mart Mar_Nisan Nis_Mayıs May_Haziran Haz_Temmuz Tem_Ağustos Ağu_Eylül Eyl_Ekim Eki_Kasım Kas_Aralık Ara'.split(
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
            // Fails for months 5 (index 4), 11 (index 10) and 12 (index 11)
            //equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'Pazar, Şubat 14 2010, 3:25:50 ös',
                ],
                ['ddd, hA', 'Paz, 3ÖS'],
                ['M Mo MM MMMM MMM', "2 2'nci 02 Şubat Şub"],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 14'],
                ['d do dddd ddd dd', '0 0 Pazar Paz Pz'],
                ['DDD DDDo DDDD', "45 45'inci 045"],
                ['w wo ww', "7 7'nci 07"],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'ös ÖS'],
                ['[yılın] DDDo [günü]', "yılın 45'inci günü"],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010'],
                ['LL', '14 Şubat 2010'],
                ['LLL', '14 Şubat 2010 15:25'],
                ['LLLL', 'Pazar, 14 Şubat 2010 15:25'],
                ['l', '14.2.2010'],
                ['ll', '14 Şub 2010'],
                ['lll', '14 Şub 2010 15:25'],
                ['llll', 'Paz, 14 Şub 2010 15:25'],
            ],
            DDDo = [
                [359, "360'ıncı"],
                [199, "200'üncü"],
                [149, "150'nci"],
            ],
            dt = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            DDDoDt,
            i;

        for (i = 0; i < a.length; i++) {
            expect(dt.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
        for (i = 0; i < DDDo.length; i++) {
            DDDoDt = moment([2010]);
            expect(
                DDDoDt.add(DDDo[i][0], 'days').format('DDDo'),
                DDDo[i][0] + ' ---> ' + DDDo[i][1]
            ).toBe(DDDo[i][1]);
        }
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '1st').toBe("1'inci");
        expect(moment([2011, 0, 2]).format('DDDo'), '2nd').toBe("2'nci");
        expect(moment([2011, 0, 3]).format('DDDo'), '3rd').toBe("3'üncü");
        expect(moment([2011, 0, 4]).format('DDDo'), '4th').toBe("4'üncü");
        expect(moment([2011, 0, 5]).format('DDDo'), '5th').toBe("5'inci");
        expect(moment([2011, 0, 6]).format('DDDo'), '6th').toBe("6'ncı");
        expect(moment([2011, 0, 7]).format('DDDo'), '7th').toBe("7'nci");
        expect(moment([2011, 0, 8]).format('DDDo'), '8th').toBe("8'inci");
        expect(moment([2011, 0, 9]).format('DDDo'), '9th').toBe("9'uncu");
        expect(moment([2011, 0, 10]).format('DDDo'), '10th').toBe("10'uncu");

        expect(moment([2011, 0, 11]).format('DDDo'), '11th').toBe("11'inci");
        expect(moment([2011, 0, 12]).format('DDDo'), '12th').toBe("12'nci");
        expect(moment([2011, 0, 13]).format('DDDo'), '13th').toBe("13'üncü");
        expect(moment([2011, 0, 14]).format('DDDo'), '14th').toBe("14'üncü");
        expect(moment([2011, 0, 15]).format('DDDo'), '15th').toBe("15'inci");
        expect(moment([2011, 0, 16]).format('DDDo'), '16th').toBe("16'ncı");
        expect(moment([2011, 0, 17]).format('DDDo'), '17th').toBe("17'nci");
        expect(moment([2011, 0, 18]).format('DDDo'), '18th').toBe("18'inci");
        expect(moment([2011, 0, 19]).format('DDDo'), '19th').toBe("19'uncu");
        expect(moment([2011, 0, 20]).format('DDDo'), '20th').toBe("20'nci");

        expect(moment([2011, 0, 21]).format('DDDo'), '21th').toBe("21'inci");
        expect(moment([2011, 0, 22]).format('DDDo'), '22th').toBe("22'nci");
        expect(moment([2011, 0, 23]).format('DDDo'), '23th').toBe("23'üncü");
        expect(moment([2011, 0, 24]).format('DDDo'), '24th').toBe("24'üncü");
        expect(moment([2011, 0, 25]).format('DDDo'), '25th').toBe("25'inci");
        expect(moment([2011, 0, 26]).format('DDDo'), '26th').toBe("26'ncı");
        expect(moment([2011, 0, 27]).format('DDDo'), '27th').toBe("27'nci");
        expect(moment([2011, 0, 28]).format('DDDo'), '28th').toBe("28'inci");
        expect(moment([2011, 0, 29]).format('DDDo'), '29th').toBe("29'uncu");
        expect(moment([2011, 0, 30]).format('DDDo'), '30th').toBe("30'uncu");

        expect(moment([2011, 0, 31]).format('DDDo'), '31st').toBe("31'inci");
    });

    test('format month', () => {
        var expected =
                'Ocak Oca_Şubat Şub_Mart Mar_Nisan Nis_Mayıs May_Haziran Haz_Temmuz Tem_Ağustos Ağu_Eylül Eyl_Ekim Eki_Kasım Kas_Aralık Ara'.split(
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
                'Pazar Paz Pz_Pazartesi Pzt Pt_Salı Sal Sa_Çarşamba Çar Ça_Perşembe Per Pe_Cuma Cum Cu_Cumartesi Cmt Ct'.split(
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
        ).toBe('birkaç saniye');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('bir dakika');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('bir dakika');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 dakika');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 dakika');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('bir saat');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('bir saat');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 saat');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 saat');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 saat');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('bir gün');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('bir gün');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 gün');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('bir gün');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 gün');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 gün');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('bir ay');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('bir ay');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('bir ay');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 ay');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 ay');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 ay');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('bir ay');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 ay');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('bir yıl');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 yıl');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('bir yıl');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 yıl');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('birkaç saniye sonra');
        expect(moment(0).from(30000), 'suffix').toBe('birkaç saniye önce');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('birkaç saniye önce');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'birkaç saniye sonra'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            '5 gün sonra'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'bugün saat 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'bugün saat 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'bugün saat 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('yarın saat 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('bugün saat 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('dün 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('[gelecek] dddd [saat] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('[gelecek] dddd [saat] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('[gelecek] dddd [saat] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[geçen] dddd [saat] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[geçen] dddd [saat] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[geçen] dddd [saat] LT')
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
            moment([2011, 11, 26]).format('w ww wo'),
            'Dec 26 2011 should be week 1'
        ).toBe("1 01 1'inci");
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe("1 01 1'inci");
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 2'
        ).toBe("2 02 2'nci");
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe("2 02 2'nci");
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 3'
        ).toBe("3 03 3'üncü");
    });
});
