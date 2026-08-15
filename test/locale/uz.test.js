import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/uz';

describe('locale:uz', () => {
    setupLocaleTests('uz');

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
                    'dddd, Do-MMMM YYYY, h:mm:ss',
                    'Якшанба, 14-феврал 2010, 3:25:50',
                ],
                ['ddd, h:mm', 'Якш, 3:25'],
                ['M Mo MM MMMM MMM', '2 2 02 феврал фев'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 14'],
                ['d do dddd ddd dd', '0 0 Якшанба Якш Як'],
                ['DDD DDDo DDDD', '45 45 045'],
                ['w wo ww', '7 7 07'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[йилнинг] DDDo-[куни]', 'йилнинг 45-куни'],
                ['LTS', '15:25:50'],
                ['L', '14/02/2010'],
                ['LL', '14 феврал 2010'],
                ['LLL', '14 феврал 2010 15:25'],
                ['LLLL', '14 феврал 2010, Якшанба 15:25'],
                ['l', '14/2/2010'],
                ['ll', '14 фев 2010'],
                ['lll', '14 фев 2010 15:25'],
                ['llll', '14 фев 2010, Якш 15:25'],
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
                'Якшанба Якш Як_Душанба Душ Ду_Сешанба Сеш Се_Чоршанба Чор Чо_Пайшанба Пай Па_Жума Жум Жу_Шанба Шан Ша'.split(
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
            '44 секунд = фурсат'
        ).toBe('фурсат');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 секунд = бир дакика'
        ).toBe('бир дакика');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 секунд = бир дакика'
        ).toBe('бир дакика');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 секунд = 2 дакика'
        ).toBe('2 дакика');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 дакика = 44 дакика'
        ).toBe('44 дакика');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 минут = бир соат'
        ).toBe('бир соат');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('бир соат');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 минут = 2 соат'
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
            '22 соат = бир кун'
        ).toBe('бир кун');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 соат = бир кун'
        ).toBe('бир кун');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 соат = 2 кун'
        ).toBe('2 кун');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 кун = 1 кун'
        ).toBe('бир кун');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 кун = 5 кун'
        ).toBe('5 кун');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 кун = 25 кун'
        ).toBe('25 кун');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 кун = бир ой'
        ).toBe('бир ой');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 кун = бир ой'
        ).toBe('бир ой');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '45 кун = бир ой'
        ).toBe('бир ой');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 кун = 2 ой'
        ).toBe('2 ой');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 кун = 2 ой'
        ).toBe('2 ой');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 кун = 3 ой'
        ).toBe('3 ой');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            'бир ой = бир ой'
        ).toBe('бир ой');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 ой = 5 ой'
        ).toBe('5 ой');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 кун = бир йил'
        ).toBe('бир йил');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 кун = 2 йил'
        ).toBe('2 йил');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 йил = бир йил'
        ).toBe('бир йил');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 йил = 5 йил'
        ).toBe('5 йил');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('Якин фурсат ичида');
        expect(moment(0).from(30000), 'suffix').toBe('Бир неча фурсат олдин');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('Бир неча фурсат олдин');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'Якин фурсат ичида'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'Якин 5 кун ичида'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Бугун соат 12:00 да'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Бугун соат 12:25 да'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Бугун соат 13:00 да'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Эртага 12:00 да');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Бугун соат 11:00 да');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Кеча соат 12:00 да');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [куни соат] LT [да]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [куни соат] LT [да]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [куни соат] LT [да]')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[Утган] dddd [куни соат] LT [да]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[Утган] dddd [куни соат] LT [да]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[Утган] dddd [куни соат] LT [да]')
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
