import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/gd';

describe('locale:gd', () => {
    setupLocaleTests('gd');

    var months = [
        'Am Faoilleach,Faoi',
        'An Gearran,Gear',
        'Am Màrt,Màrt',
        'An Giblean,Gibl',
        'An Cèitean,Cèit',
        'An t-Ògmhios,Ògmh',
        'An t-Iuchar,Iuch',
        'An Lùnastal,Lùn',
        'An t-Sultain,Sult',
        'An Dàmhair,Dàmh',
        'An t-Samhain,Samh',
        'An Dùbhlachd,Dùbh',
    ];

    test('parse', () => {
        function equalTest(monthName, monthFormat, monthNum) {
            expect(
                moment(monthName, monthFormat).month(),
                monthName + ' should be month ' + (monthNum + 1)
            ).toBe(monthNum);
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

        var i, testMonth;
        for (i = 0; i < 12; i++) {
            testMonth = months[i].split(',');

            equalTest(testMonth[0], 'MMM', i);
            equalTest(testMonth[1], 'MMM', i);
            equalTest(testMonth[0], 'MMMM', i);
            equalTest(testMonth[1], 'MMMM', i);
            equalTest(testMonth[0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(testMonth[1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(testMonth[0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(testMonth[1].toLocaleUpperCase(), 'MMMM', i);

            equalTestStrict(testMonth[1], 'MMM', i);
            equalTestStrict(testMonth[0], 'MMMM', i);
            equalTestStrict(testMonth[1].toLocaleLowerCase(), 'MMM', i);
            equalTestStrict(testMonth[1].toLocaleUpperCase(), 'MMM', i);
            equalTestStrict(testMonth[0].toLocaleLowerCase(), 'MMMM', i);
            equalTestStrict(testMonth[0].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'Didòmhnaich, An Gearran 14mh 2010, 3:25:50 pm',
                ],
                ['ddd, hA', 'Did, 3PM'],
                ['M Mo MM MMMM MMM', '2 2na 02 An Gearran Gear'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14mh 14'],
                ['d do dddd ddd dd', '0 0mh Didòmhnaich Did Dò'],
                ['DDD DDDo DDDD', '45 45mh 045'],
                ['w wo ww', '6 6mh 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                [
                    '[an] DDDo [latha den bhliadhna]',
                    'an 45mh latha den bhliadhna',
                ],
                ['LTS', '15:25:50'],
                ['L', '14/02/2010'],
                ['LL', '14 An Gearran 2010'],
                ['LLL', '14 An Gearran 2010 15:25'],
                ['LLLL', 'Didòmhnaich, 14 An Gearran 2010 15:25'],
                ['l', '14/2/2010'],
                ['ll', '14 Gear 2010'],
                ['lll', '14 Gear 2010 15:25'],
                ['llll', 'Did, 14 Gear 2010 15:25'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1d').toBe('1d');
        expect(moment([2011, 0, 2]).format('DDDo'), '2na').toBe('2na');
        expect(moment([2011, 0, 3]).format('DDDo'), '3mh').toBe('3mh');
        expect(moment([2011, 0, 4]).format('DDDo'), '4mh').toBe('4mh');
        expect(moment([2011, 0, 5]).format('DDDo'), '5mh').toBe('5mh');
        expect(moment([2011, 0, 6]).format('DDDo'), '6mh').toBe('6mh');
        expect(moment([2011, 0, 7]).format('DDDo'), '7mh').toBe('7mh');
        expect(moment([2011, 0, 8]).format('DDDo'), '8mh').toBe('8mh');
        expect(moment([2011, 0, 9]).format('DDDo'), '9mh').toBe('9mh');
        expect(moment([2011, 0, 10]).format('DDDo'), '10mh').toBe('10mh');
        expect(moment([2011, 0, 11]).format('DDDo'), '11mh').toBe('11mh');
        expect(moment([2011, 0, 12]).format('DDDo'), '12na').toBe('12na');
        expect(moment([2011, 0, 13]).format('DDDo'), '13mh').toBe('13mh');
        expect(moment([2011, 0, 14]).format('DDDo'), '14mh').toBe('14mh');
        expect(moment([2011, 0, 15]).format('DDDo'), '15mh').toBe('15mh');
        expect(moment([2011, 0, 16]).format('DDDo'), '16mh').toBe('16mh');
        expect(moment([2011, 0, 17]).format('DDDo'), '17mh').toBe('17mh');
        expect(moment([2011, 0, 18]).format('DDDo'), '18mh').toBe('18mh');
        expect(moment([2011, 0, 19]).format('DDDo'), '19mh').toBe('19mh');
        expect(moment([2011, 0, 20]).format('DDDo'), '20mh').toBe('20mh');
        expect(moment([2011, 0, 21]).format('DDDo'), '21mh').toBe('21mh');
        expect(moment([2011, 0, 22]).format('DDDo'), '22na').toBe('22na');
        expect(moment([2011, 0, 23]).format('DDDo'), '23mh').toBe('23mh');
        expect(moment([2011, 0, 24]).format('DDDo'), '24mh').toBe('24mh');
        expect(moment([2011, 0, 25]).format('DDDo'), '25mh').toBe('25mh');
        expect(moment([2011, 0, 26]).format('DDDo'), '26mh').toBe('26mh');
        expect(moment([2011, 0, 27]).format('DDDo'), '27mh').toBe('27mh');
        expect(moment([2011, 0, 28]).format('DDDo'), '28mh').toBe('28mh');
        expect(moment([2011, 0, 29]).format('DDDo'), '29mh').toBe('29mh');
        expect(moment([2011, 0, 30]).format('DDDo'), '30mh').toBe('30mh');
        expect(moment([2011, 0, 31]).format('DDDo'), '31mh').toBe('31mh');
    });

    test('format month', () => {
        var expected = months,
            i;
        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM,MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format week', () => {
        var expected = [
                'Didòmhnaich Did Dò',
                'Diluain Dil Lu',
                'Dimàirt Dim Mà',
                'Diciadain Dic Ci',
                'Diardaoin Dia Ar',
                'Dihaoine Dih Ha',
                'Disathairne Dis Sa',
            ],
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
        ).toBe('beagan diogan');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('mionaid');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('mionaid');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 mionaidean');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 mionaidean');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('uair');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('uair');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 uairean');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 uairean');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 uairean');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('latha');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('latha');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 latha');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('latha');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 latha');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 latha');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('mìos');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('mìos');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('mìos');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 mìosan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 mìosan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 mìosan');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('mìos');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 mìosan');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('bliadhna');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 bliadhna');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('bliadhna');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 bliadhna');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('ann an beagan diogan');
        expect(moment(0).from(30000), 'suffix').toBe(
            'bho chionn beagan diogan'
        );
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('bho chionn beagan diogan');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'ann an beagan diogan'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'ann an 5 latha'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'An-diugh aig 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'An-diugh aig 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'An-diugh aig 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('A-màireach aig 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('An-diugh aig 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('An-dè aig 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [aig] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [aig] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [aig] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('dddd [seo chaidh] [aig] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [seo chaidh] [aig] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('dddd [seo chaidh] [aig] LT')
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
            'Faoi  1 2012 should be week 52'
        ).toBe('52 52 52na');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Faoi  2 2012 should be week 1'
        ).toBe('1 01 1d');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Faoi  8 2012 should be week 1'
        ).toBe('1 01 1d');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Faoi  9 2012 should be week 2'
        ).toBe('2 02 2na');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Faoi 15 2012 should be week 2'
        ).toBe('2 02 2na');
    });
});
