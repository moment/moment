import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/zh-cn';

describe('locale:zh-cn', () => {
    setupLocaleTests('zh-cn');

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
                    'dddd, MMMM Do YYYY, a h:mm:ss',
                    '星期日, 二月 14日 2010, 下午 3:25:50',
                ],
                ['ddd, Ah', '周日, 下午3'],
                ['M Mo MM MMMM MMM', '2 2月 02 二月 2月'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14日 14'],
                ['d do dddd ddd dd', '0 0日 星期日 周日 日'],
                ['DDD DDDo DDDD', '45 45日 045'],
                ['w wo ww', '6 6周 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', '下午 下午'],
                ['[这年的第] DDDo', '这年的第 45日'],
                ['LTS', '15:25:50'],
                ['L', '2010/02/14'],
                ['LL', '2010年2月14日'],
                ['LLL', '2010年2月14日下午3点25分'],
                ['LLLL', '2010年2月14日星期日下午3点25分'],
                ['l', '2010/2/14'],
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
                '星期日 周日 日_星期一 周一 一_星期二 周二 二_星期三 周三 三_星期四 周四 四_星期五 周五 五_星期六 周六 六'.split(
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
        ).toBe('几秒');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('1 分钟');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('1 分钟');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 分钟');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 分钟');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('1 小时');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('1 小时');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 小时');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 小时');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 小时');
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
        ).toBe('1 个月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('1 个月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('1 个月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 个月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 个月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 个月');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('1 个月');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 个月');
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
        expect(moment(30000).from(0), 'prefix').toBe('几秒后');
        expect(moment(0).from(30000), 'suffix').toBe('几秒前');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('几秒前');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            '几秒后'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe('5 天后');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            '今天12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            '今天12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            '今天13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('明天12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('今天11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('昨天12:00');
    });

    test('calendar next week', () => {
        var i,
            m,
            week = moment().week();
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            if (week === m.week()) {
                expect(
                    m.calendar(),
                    'Today + ' + i + ' days current time'
                ).toBe(m.format('[本]dddLT'));
                m.hours(0).minutes(0).seconds(0).milliseconds(0);
                expect(
                    m.calendar(),
                    'Today + ' + i + ' days beginning of day'
                ).toBe(m.format('[本]dddLT'));
                m.hours(23).minutes(59).seconds(59).milliseconds(999);
                expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                    m.format('[本]dddLT')
                );
            } else {
                expect(
                    m.calendar(),
                    'Today + ' + i + ' days current time'
                ).toBe(m.format('[下]dddLT'));
                m.hours(0).minutes(0).seconds(0).milliseconds(0);
                expect(
                    m.calendar(),
                    'Today + ' + i + ' days beginning of day'
                ).toBe(m.format('[下]dddLT'));
                m.hours(23).minutes(59).seconds(59).milliseconds(999);
                expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                    m.format('[下]dddLT')
                );
            }
        }
    });

    test('calendar last week', () => {
        var i,
            m,
            week = moment().week();
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            if (week !== m.week()) {
                expect(
                    m.calendar(),
                    'Today - ' + i + ' days current time'
                ).toBe(m.format('[上]dddLT'));
                m.hours(0).minutes(0).seconds(0).milliseconds(0);
                expect(
                    m.calendar(),
                    'Today - ' + i + ' days beginning of day'
                ).toBe(m.format('[上]dddLT'));
                m.hours(23).minutes(59).seconds(59).milliseconds(999);
                expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                    m.format('[上]dddLT')
                );
            } else {
                expect(
                    m.calendar(),
                    'Today - ' + i + ' days current time'
                ).toBe(m.format('[本]dddLT'));
                m.hours(0).minutes(0).seconds(0).milliseconds(0);
                expect(
                    m.calendar(),
                    'Today - ' + i + ' days beginning of day'
                ).toBe(m.format('[本]dddLT'));
                m.hours(23).minutes(59).seconds(59).milliseconds(999);
                expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                    m.format('[本]dddLT')
                );
            }
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
            'Jan  1 2012 应该是第52周'
        ).toBe('52 52 52周');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 应该是第 1周'
        ).toBe('1 01 1周');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 应该是第 2周'
        ).toBe('2 02 2周');
    });
});
