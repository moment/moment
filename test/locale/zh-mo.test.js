import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/zh-mo';

describe('locale:zh-mo', () => {
    setupLocaleTests('zh-mo');

    test('parse', () => {
        var tests =
                '一月 1月_二月 2月_三月 3月_四月 4月_五月 5月_六月 6月_七月 7月_八月 8月_九月 9月_十月 10月_十一月 11月_十二月 12月'.split(
                    '_'
                ),
            i;
        function equalTest(input, mmm, i) {
            expect(
                moment(input, mmm).month(),
                input + ' should be month ' + (i + 1)
            ).toBe(i);
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
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, a h:mm:ss',
                    '星期日, 二月 14日 2010, 下午 3:25:50',
                ],
                ['ddd, Ah', '週日, 下午3'],
                ['M Mo MM MMMM MMM', '2 2月 02 二月 2月'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14日 14'],
                ['d do dddd ddd dd', '0 0日 星期日 週日 日'],
                ['DDD DDDo DDDD', '45 45日 045'],
                ['w wo ww', '8 8週 08'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', '下午 下午'],
                ['[這年的第] DDDo', '這年的第 45日'],
                ['LTS', '15:25:50'],
                ['L', '14/02/2010'],
                ['LL', '2010年2月14日'],
                ['LLL', '2010年2月14日 15:25'],
                ['LLLL', '2010年2月14日星期日 15:25'],
                ['l', '14/2/2010'],
                ['ll', '2010年2月14日'],
                ['lll', '2010年2月14日 15:25'],
                ['llll', '2010年2月14日星期日 15:25'],
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
                '一月 1月_二月 2月_三月 3月_四月 4月_五月 5月_六月 6月_七月 7月_八月 8月_九月 9月_十月 10月_十一月 11月_十二月 12月'.split(
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
                '星期日 週日 日_星期一 週一 一_星期二 週二 二_星期三 週三 三_星期四 週四 四_星期五 週五 五_星期六 週六 六'.split(
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
        ).toBe('幾秒');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('1 分鐘');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('1 分鐘');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 分鐘');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 分鐘');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('1 小時');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('1 小時');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 小時');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 小時');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 小時');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('1 天');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('1 天');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 天');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('1 天');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 天');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 天');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('1 個月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('1 個月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('1 個月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 個月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 個月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 個月');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('1 個月');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 個月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('1 年');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 年');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('1 年');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 年');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('幾秒內');
        expect(moment(0).from(30000), 'suffix').toBe('幾秒前');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('幾秒前');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            '幾秒內'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe('5 天內');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            '今天 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            '今天 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            '今天 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('明天 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('今天 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('昨天 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('[下]dddd LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('[下]dddd LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('[下]dddd LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[上]dddd LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[上]dddd LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[上]dddd LT')
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

    test('meridiem', () => {
        expect(moment([2011, 2, 23, 0, 0]).format('a'), 'before dawn').toBe(
            '凌晨'
        );
        expect(moment([2011, 2, 23, 6, 0]).format('a'), 'morning').toBe('早上');
        expect(moment([2011, 2, 23, 9, 0]).format('a'), 'before noon').toBe(
            '上午'
        );
        expect(moment([2011, 2, 23, 12, 0]).format('a'), 'noon').toBe('中午');
        expect(moment([2011, 2, 23, 13, 0]).format('a'), 'after noon').toBe(
            '下午'
        );
        expect(moment([2011, 2, 23, 18, 0]).format('a'), 'night').toBe('晚上');

        expect(moment([2011, 2, 23, 0, 0]).format('A'), 'before dawn').toBe(
            '凌晨'
        );
        expect(moment([2011, 2, 23, 6, 0]).format('A'), 'morning').toBe('早上');
        expect(moment([2011, 2, 23, 9, 0]).format('A'), 'before noon').toBe(
            '上午'
        );
        expect(moment([2011, 2, 23, 12, 0]).format('A'), 'noon').toBe('中午');
        expect(moment([2011, 2, 23, 13, 0]).format('A'), 'afternoon').toBe(
            '下午'
        );
        expect(moment([2011, 2, 23, 18, 0]).format('A'), 'night').toBe('晚上');
    });

    test('weeks year starting sunday format', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 應該是第 1週'
        ).toBe('1 01 1週');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 應該是第 1週'
        ).toBe('1 01 1週');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 應該是第 2週'
        ).toBe('2 02 2週');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 應該是第 2週'
        ).toBe('2 02 2週');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 應該是第 3週'
        ).toBe('3 03 3週');
    });
});
