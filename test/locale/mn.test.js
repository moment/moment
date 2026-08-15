import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/mn';

describe('locale:mn', () => {
    setupLocaleTests('mn');

    test('parse', () => {
        var i,
            tests =
                'Нэгдүгээр сар-1 сар_Хоёрдугаар сар-2 сар_Гуравдугаар сар-3 сар_Дөрөвдүгээр сар-4 сар_Тавдугаар сар-5 сар_Зургадугаар сар-6 сар_Долдугаар сар-7 сар_Наймдугаар сар-8 сар_Есдүгээр сар-9 сар_Аравдугаар сар-10 сар_Арван нэгдүгээр сар-11 сар_Арван хоёрдугаар сар-12 сар'.split(
                    '_'
                );

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
            tests[i] = tests[i].split('-');
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

        expect(
            moment('5 сар 11 1989', ['MMM DD YYYY']).format('YYYY-MM-DD')
        ).toBe('1989-05-11');
        expect(
            moment('1989 он, Арван хоёрдугаар сар 11', [
                'YYYY [он], MMMM DD',
            ]).format('YYYY-MM-DD')
        ).toBe('1989-12-11');
        expect(
            moment('1989 оны 11 сарын 2', ['YYYY [оны] MMMM[ын] DD']).format(
                'YYYY-MM-D'
            )
        ).toBe('1989-11-2');
        expect(
            moment('1989 оны 5 сарын 11 өдөр', [
                'YYYY [оны] MMMM[ын] Do',
            ]).format('YYYY-MM-DD')
        ).toBe('1989-05-11');
        expect(
            moment('1989 оны 5 сарын 11 өдөр 11:25 ҮӨ', [
                'YYYY [оны] MMM[ын] Do h:mm a',
            ]).format('YYYY-MM-DD h:mm a')
        ).toBe('1989-05-11 11:25 ҮӨ');
        expect(
            moment('2003 оны Дөрөвдүгээр сарын 11 өдөр 17:25 ҮХ', [
                'YYYY [оны] MMMM[ын] Do HH:mm a',
            ]).format('YYYY-MM-DD HH:mm a')
        ).toBe('2003-04-11 17:25 ҮХ');
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM[ын] Do YYYY, h:mm:ss a',
                    'Ням, Хоёрдугаар сарын 14 өдөр 2010, 3:25:50 ҮХ',
                ],
                ['ddd, hA', 'Ням, 3ҮХ'],
                ['M Mo MM MMMM MMM', '2 2 02 Хоёрдугаар сар 2 сар'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 өдөр 14'],
                ['d do dddd ddd dd', '0 0 өдөр Ням Ням Ня'],
                ['DDD DDDo DDDD', '45 45 өдөр 045'],
                ['w wo ww', '8 8 08'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'ҮХ ҮХ'],
                ['[the] DDDo [day of the year]', 'the 45 өдөр day of the year'],
                ['LTS', '15:25:50'],
                ['L', '2010-02-14'],
                ['LL', '2010 оны Хоёрдугаар сарын 14'],
                ['LLL', '2010 оны Хоёрдугаар сарын 14 15:25'],
                ['LLLL', 'Ням, 2010 оны Хоёрдугаар сарын 14 15:25'],
                ['l', '2010-2-14'],
                ['ll', '2010 оны 2 сарын 14'],
                ['lll', '2010 оны 2 сарын 14 15:25'],
                ['llll', 'Ням, 2010 оны 2 сарын 14 15:25'],
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
        expect(moment([2012, 11, 28, 0, 0]).format('A'), 'AM').toBe('ҮӨ');
        expect(moment([2012, 11, 28, 11, 59]).format('A'), 'AM').toBe('ҮӨ');
        expect(moment([2012, 11, 28, 12, 0]).format('A'), 'PM').toBe('ҮХ');
        expect(moment([2012, 11, 28, 23, 59]).format('A'), 'PM').toBe('ҮХ');
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '1st').toBe('1 өдөр');
    });

    test('format month', () => {
        var i,
            expected =
                'Нэгдүгээр сар 1 сар_Хоёрдугаар сар 2 сар_Гуравдугаар сар 3 сар_Дөрөвдүгээр сар 4 сар_Тавдугаар сар 5 сар_Зургадугаар сар 6 сар_Долдугаар сар 7 сар_Наймдугаар сар 8 сар_Есдүгээр сар 9 сар_Аравдугаар сар 10 сар_Арван нэгдүгээр сар 11 сар_Арван хоёрдугаар сар 12 сар'.split(
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
                'Ням Ням Ня_Даваа Дав Да_Мягмар Мяг Мя_Лхагва Лха Лх_Пүрэв Пүр Пү_Баасан Баа Ба_Бямба Бям Бя'.split(
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
            '44 seconds = a few seconds'
        ).toBe('хэдхэн секунд');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('1 минут');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('1 минут');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 минут');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 минут');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('1 цаг');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('1 цаг');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 цаг');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 цаг');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 цаг');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('1 өдөр');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('1 өдөр');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 өдөр');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('1 өдөр');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 өдөр');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 өдөр');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('1 сар');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('1 сар');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('1 сар');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 сар');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 сар');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 сар');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('1 сар');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 сар');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('1 жил');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 жил');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('1 жил');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 жил');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('хэдхэн секундын дараа');
        expect(moment(0).from(30000), 'suffix').toBe('хэдхэн секундын өмнө');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('хэдхэн секундын өмнө');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'хэдхэн секундын дараа'
        );
        expect(moment().add({ s: 50 }).fromNow(), 'in a minute').toBe(
            '1 минутын дараа'
        );
        expect(moment().add({ m: 5 }).fromNow(), 'in 5 minutes').toBe(
            '5 минутын дараа'
        );
        expect(moment().add({ h: 2 }).fromNow(), 'in 2 hours').toBe(
            '2 цагийн дараа'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            '5 өдрийн дараа'
        );
        expect(moment().add({ M: 2 }).fromNow(), 'in 2 months').toBe(
            '2 сарын дараа'
        );
        expect(moment().add({ M: 15 }).fromNow(), 'in a year').toBe(
            '1 жилийн дараа'
        );
        expect(moment().add({ M: 16 }).fromNow(), 'in a year').toBe(
            '1 жилийн дараа'
        );
        expect(moment().add({ M: 23 }).fromNow(), 'in 2 years').toBe(
            '2 жилийн дараа'
        );
        expect(moment().add({ y: 7 }).fromNow(), 'in 7 years').toBe(
            '7 жилийн дараа'
        );

        expect(
            moment().subtract({ s: 30 }).fromNow(),
            'a few seconds ago'
        ).toBe('хэдхэн секундын өмнө');
        expect(moment().subtract({ s: 50 }).fromNow(), 'a minute ago').toBe(
            '1 минутын өмнө'
        );
        expect(moment().subtract({ m: 5 }).fromNow(), '5 minutes ago').toBe(
            '5 минутын өмнө'
        );
        expect(moment().subtract({ h: 2 }).fromNow(), '2 hours ago').toBe(
            '2 цагийн өмнө'
        );
        expect(moment().subtract({ d: 5 }).fromNow(), '5 days ago').toBe(
            '5 өдрийн өмнө'
        );
        expect(moment().subtract({ M: 2 }).fromNow(), '2 months ago').toBe(
            '2 сарын өмнө'
        );
        expect(moment().subtract({ M: 15 }).fromNow(), 'a year ago').toBe(
            '1 жилийн өмнө'
        );
        expect(moment().subtract({ M: 16 }).fromNow(), 'a year ago').toBe(
            '1 жилийн өмнө'
        );
        expect(moment().subtract({ M: 23 }).fromNow(), '2 years ago').toBe(
            '2 жилийн өмнө'
        );
        expect(moment().subtract({ y: 7 }).fromNow(), '7 years ago').toBe(
            '7 жилийн өмнө'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Өнөөдөр 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Өнөөдөр 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Өнөөдөр 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Маргааш 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Өнөөдөр 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Өчигдөр 12:00');
    });

    test('calendar next week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('[Ирэх] dddd LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('[Ирэх] dddd LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('[Ирэх] dddd LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[Өнгөрсөн] dddd LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[Өнгөрсөн] dddd LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[Өнгөрсөн] dddd LT')
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
            'Jan 14 2012 should be week 2'
        ).toBe('2 02 2');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('3 03 3');
    });
});
