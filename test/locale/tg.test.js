import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/tg';

describe('locale:tg', () => {
    setupLocaleTests('tg');

    test('parse', () => {
        var tests =
                'январ янв_феврал фев_март мар_апрел апр_май май_июн июн_июл июл_август авг_сентябр сен_октябр окт_ноябр ноя_декабр дек'.split(
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
                    'dddd, Do MMMM YYYY, h:mm:ss',
                    'якшанбе, 14-ум феврали 2010, 3:25:50',
                ],
                ['ddd, h A', 'яшб, 3 рӯз'],
                ['M Mo MM MMMM MMM', '2 2-юм 02 феврал фев'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14-ум 14'],
                ['d do dddd ddd dd', '0 0-ум якшанбе яшб яш'],
                ['DDD DDDo DDDD', '45 45-ум 045'],
                ['w wo ww', '7 7-ум 07'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'рӯз рӯз'],
                ['DDDo [рӯзи сол]', '45-ум рӯзи сол'],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010'],
                ['LL', '14 феврали 2010'],
                ['LLL', '14 феврали 2010 15:25'],
                ['LLLL', 'якшанбе, 14 феврали 2010 15:25'],
                ['l', '14.2.2010'],
                ['ll', '14 фев 2010'],
                ['lll', '14 фев 2010 15:25'],
                ['llll', 'яшб, 14 фев 2010 15:25'],
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('format meridiem', () => {
        expect(moment([2012, 11, 28, 0, 0]).format('A'), 'night').toBe('шаб');
        expect(moment([2012, 11, 28, 3, 59]).format('A'), 'night').toBe('шаб');
        expect(moment([2012, 11, 28, 4, 0]).format('A'), 'morning').toBe(
            'субҳ'
        );
        expect(moment([2012, 11, 28, 10, 59]).format('A'), 'morning').toBe(
            'субҳ'
        );
        expect(moment([2012, 11, 28, 12, 0]).format('A'), 'afternoon').toBe(
            'рӯз'
        );
        expect(moment([2012, 11, 28, 15, 59]).format('A'), 'afternoon').toBe(
            'рӯз'
        );
        expect(moment([2012, 11, 28, 17, 0]).format('A'), 'evening').toBe(
            'бегоҳ'
        );
        expect(moment([2012, 11, 28, 23, 59]).format('A'), 'evening').toBe(
            'шаб'
        );
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '1st').toBe('1-ум');
        expect(moment([2011, 0, 2]).format('DDDo'), '2nd').toBe('2-юм');
        expect(moment([2011, 0, 3]).format('DDDo'), '3rd').toBe('3-юм');
        expect(moment([2011, 0, 4]).format('DDDo'), '4th').toBe('4-ум');
        expect(moment([2011, 0, 5]).format('DDDo'), '5th').toBe('5-ум');
        expect(moment([2011, 0, 6]).format('DDDo'), '6th').toBe('6-ум');
        expect(moment([2011, 0, 7]).format('DDDo'), '7th').toBe('7-ум');
        expect(moment([2011, 0, 8]).format('DDDo'), '8th').toBe('8-ум');
        expect(moment([2011, 0, 9]).format('DDDo'), '9th').toBe('9-ум');
        expect(moment([2011, 0, 10]).format('DDDo'), '10th').toBe('10-ум');

        expect(moment([2011, 0, 11]).format('DDDo'), '11th').toBe('11-ум');
        expect(moment([2011, 0, 12]).format('DDDo'), '12th').toBe('12-ум');
        expect(moment([2011, 0, 13]).format('DDDo'), '13th').toBe('13-ум');
        expect(moment([2011, 0, 14]).format('DDDo'), '14th').toBe('14-ум');
        expect(moment([2011, 0, 15]).format('DDDo'), '15th').toBe('15-ум');
        expect(moment([2011, 0, 16]).format('DDDo'), '16th').toBe('16-ум');
        expect(moment([2011, 0, 17]).format('DDDo'), '17th').toBe('17-ум');
        expect(moment([2011, 0, 18]).format('DDDo'), '18th').toBe('18-ум');
        expect(moment([2011, 0, 19]).format('DDDo'), '19th').toBe('19-ум');
        expect(moment([2011, 0, 20]).format('DDDo'), '20th').toBe('20-ум');

        expect(moment([2011, 0, 21]).format('DDDo'), '21st').toBe('21-ум');
        expect(moment([2011, 0, 22]).format('DDDo'), '22nd').toBe('22-юм');
        expect(moment([2011, 0, 23]).format('DDDo'), '23rd').toBe('23-юм');
        expect(moment([2011, 0, 24]).format('DDDo'), '24th').toBe('24-ум');
        expect(moment([2011, 0, 25]).format('DDDo'), '25th').toBe('25-ум');
        expect(moment([2011, 0, 26]).format('DDDo'), '26th').toBe('26-ум');
        expect(moment([2011, 0, 27]).format('DDDo'), '27th').toBe('27-ум');
        expect(moment([2011, 0, 28]).format('DDDo'), '28th').toBe('28-ум');
        expect(moment([2011, 0, 29]).format('DDDo'), '29th').toBe('29-ум');
        expect(moment([2011, 0, 30]).format('DDDo'), '30th').toBe('30-юм');

        expect(moment([2011, 0, 31]).format('DDDo'), '31st').toBe('31-ум');
    });

    test('format month', () => {
        var expected =
                'январ янв_феврал фев_март мар_апрел апр_май май_июн июн_июл июл_август авг_сентябр сен_октябр окт_ноябр ноя_декабр дек'.split(
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
                'якшанбе яшб яш_душанбе дшб дш_сешанбе сшб сш_чоршанбе чшб чш_панҷшанбе пшб пш_ҷумъа ҷум ҷм_шанбе шнб шб'.split(
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
            '44 сония = a few seconds'
        ).toBe('якчанд сония');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 сония = як дақиқа'
        ).toBe('як дақиқа');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 сония = як дақиқа'
        ).toBe('як дақиқа');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 сония = 2 дақиқа'
        ).toBe('2 дақиқа');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 дақиқа = 44 дақиқа'
        ).toBe('44 дақиқа');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 дақиқа = як соат'
        ).toBe('як соат');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 дақиқа = як соат'
        ).toBe('як соат');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 дақиқа = 2 соат'
        ).toBe('2 соат');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 соат = 5 соат'
        ).toBe('5 соат');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 соат = 21 соат'
        ).toBe('21 соат');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 соат = як рӯз'
        ).toBe('як рӯз');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 соат = як рӯз'
        ).toBe('як рӯз');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 соат = 2 рӯз'
        ).toBe('2 рӯз');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 рӯз = як рӯз'
        ).toBe('як рӯз');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 рӯз = 5 рӯз'
        ).toBe('5 рӯз');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 рӯз = 25 рӯз'
        ).toBe('25 рӯз');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 рӯз = як моҳ'
        ).toBe('як моҳ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 рӯз = як моҳ'
        ).toBe('як моҳ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 рӯз = як моҳ'
        ).toBe('як моҳ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 рӯз = 2 моҳ'
        ).toBe('2 моҳ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '74 рӯз = 2 моҳ'
        ).toBe('2 моҳ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 рӯз = 3 моҳ'
        ).toBe('3 моҳ');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            'як моҳ = як моҳ'
        ).toBe('як моҳ');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 моҳ = 5 моҳ'
        ).toBe('5 моҳ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 рӯз = як сол'
        ).toBe('як сол');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 рӯз = 2 сол'
        ).toBe('2 сол');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 сол = як сол'
        ).toBe('як сол');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 сол = 5 сол'
        ).toBe('5 сол');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('баъди якчанд сония');
        expect(moment(0).from(30000), 'suffix').toBe('якчанд сония пеш');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('якчанд сония пеш');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'баъди якчанд сония'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'баъди 5 рӯз'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Имрӯз соати 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Имрӯз соати 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Имрӯз соати 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Фардо соати 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Имрӯз соати 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Дирӯз соати 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd[и] [ҳафтаи оянда соати] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd[и] [ҳафтаи оянда соати] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd[и] [ҳафтаи оянда соати] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('dddd[и] [ҳафтаи гузашта соати] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('dddd[и] [ҳафтаи гузашта соати] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('dddd[и] [ҳафтаи гузашта соати] LT')
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
            'Jan  1 2012 should be week 1'
        ).toBe('1 01 1-ум');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 2'
        ).toBe('2 02 2-юм');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('2 02 2-юм');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 3'
        ).toBe('3 03 3-юм');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('3 03 3-юм');
    });
});
