import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/ja';

describe('locale:ja', () => {
    setupLocaleTests('ja');

    test('parse', () => {
        var tests =
                '1月 1月_2月 2月_3月 3月_4月 4月_5月 5月_6月 6月_7月 7月_8月 8月_9月 9月_10月 10月_11月 11月_12月 12月'.split(
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
                    '日曜日, 2月 14日 2010, 午後 3:25:50',
                ],
                ['ddd, Ah', '日, 午後3'],
                ['M Mo MM MMMM MMM', '2 2 02 2月 2月'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14日 14'],
                ['d do dddd ddd dd', '0 0日 日曜日 日 日'],
                ['DDD DDDo DDDD', '45 45日 045'],
                ['w wo ww', '8 8 08'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', '午後 午後'],
                ['[the] DDDo [day of the year]', 'the 45日 day of the year'],
                ['LTS', '15:25:50'],
                ['L', '2010/02/14'],
                ['LL', '2010年2月14日'],
                ['LLL', '2010年2月14日 15:25'],
                ['LLLL', '2010年2月14日 日曜日 15:25'],
                ['l', '2010/02/14'],
                ['ll', '2010年2月14日'],
                ['lll', '2010年2月14日 15:25'],
                ['llll', '2010年2月14日(日) 15:25'],
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('parse era', () => {
        // strict
        expect(moment('令和2年', 'NNNNy年', true).isValid(), '令和2年').toBe(
            true
        );
        expect(moment('令和2年', 'NNNNy年', true).year(), '令和2年').toBe(2020);
        expect(moment('令和2年', 'NNNNyo', true).isValid(), '令和2年').toBe(
            true
        );
        expect(moment('令和2年', 'NNNNyo', true).year(), '令和2年').toBe(2020);

        expect(moment('令和2年', 'Ny年', true).isValid(), '令和2年').toBe(
            false
        );
        expect(moment('令和2年', 'Ny年', false).isValid(), '令和2年').toBe(
            true
        );
        expect(moment('㋿2年', 'Ny年', true).isValid(), '㋿2年').toBe(false);
        expect(moment('㋿2年', 'Ny年', false).isValid(), '㋿2年').toBe(true);
        expect(moment('R2', 'Ny', false).isValid(), 'R2').toBe(true);

        // abbrv
        expect(moment('R2', 'Ny', true).isValid(), 'R2').toBe(true);
        expect(moment('R2', 'Ny', true).year(), 'R2').toBe(2020);
        expect(moment('R2', 'NNNNy', true).isValid(), 'R2').toBe(false);
        expect(moment('R2', 'NNNNNy', true).isValid(), 'R2').toBe(false);

        // narrow
        expect(moment('㋿2年', 'Ny年', true).isValid(), '㋿2年').toBe(false);
        expect(moment('㋿2年', 'NNNNy年', true).isValid(), '㋿2年').toBe(false);
        expect(moment('㋿2年', 'NNNNNy年', true).isValid(), '㋿2年').toBe(true);
        expect(moment('㋿2年', 'NNNNNy年', true).year(), '㋿2年').toBe(2020);

        // ordinal year
        expect(moment('令和2年', 'NNNNyo', true).year(), '平成30年').toBe(2020);
        expect(moment('令和元年', 'NNNNyo', true).year(), '平成元年').toBe(
            2019
        );

        // old eras
        expect(moment('平成30年', 'NNNNyo', true).year(), '平成30年').toBe(
            2018
        );
        expect(moment('平成元年', 'NNNNyo', true).year(), '平成元年').toBe(
            1989
        );
        expect(moment('昭和64年', 'NNNNyo', true).year(), '昭和64年').toBe(
            1989
        );
        expect(moment('昭和元年', 'NNNNyo', true).year(), '昭和元年').toBe(
            1926
        );
        expect(moment('大正元年', 'NNNNyo', true).year(), '大正元年').toBe(
            1912
        );
        expect(moment('明治6年', 'NNNNyo', true).year(), '明治6年').toBe(1873);
    });

    test('format era', () => {
        var a = [
                /* First day of Reiwa Era */
                ['+002019-05-01', 'N, NN, NNN', 'R, R, R'],
                ['+002019-05-01', 'NNNN', '令和'],
                ['+002019-05-01', 'NNNNN', '㋿'],
                ['+002019-05-01', 'y yy yyy yyyy', '1 01 001 0001'],
                ['+002019-05-01', 'yo', '元年'],

                /* Last day of Heisei Era */
                ['+002019-04-30', 'N, NN, NNN', 'H, H, H'],
                ['+002019-04-30', 'NNNN', '平成'],
                ['+002019-04-30', 'NNNNN', '㍻'],
                ['+002019-04-30', 'y yy yyy yyyy', '31 31 031 0031'],
                ['+002019-04-30', 'yo', '31年'],

                /* First day of Heisei Era */
                ['+001989-01-08', 'N, NN, NNN', 'H, H, H'],
                ['+001989-01-08', 'NNNN', '平成'],
                ['+001989-01-08', 'NNNNN', '㍻'],
                ['+001989-01-08', 'y yy yyy yyyy', '1 01 001 0001'],
                ['+001989-01-08', 'yo', '元年'],

                /* Last day of Showa Era */
                ['+001989-01-07', 'N, NN, NNN', 'S, S, S'],
                ['+001989-01-07', 'NNNN', '昭和'],
                ['+001989-01-07', 'NNNNN', '㍼'],
                ['+001989-01-07', 'y yy yyy yyyy', '64 64 064 0064'],
                ['+001989-01-07', 'yo', '64年'],

                /* Last day of Showa Era */
                ['+001926-12-25', 'N, NN, NNN', 'S, S, S'],
                ['+001926-12-25', 'NNNN', '昭和'],
                ['+001926-12-25', 'NNNNN', '㍼'],
                ['+001926-12-25', 'y yy yyy yyyy', '1 01 001 0001'],
                ['+001926-12-25', 'yo', '元年'],

                /* Last day of Taisho Era */
                ['+001926-12-24', 'N, NN, NNN', 'T, T, T'],
                ['+001926-12-24', 'NNNN', '大正'],
                ['+001926-12-24', 'NNNNN', '㍽'],
                ['+001926-12-24', 'y yy yyy yyyy', '15 15 015 0015'],
                ['+001926-12-24', 'yo', '15年'],

                /* First day of Taisho Era */
                ['+001912-07-30', 'N, NN, NNN', 'T, T, T'],
                ['+001912-07-30', 'NNNN', '大正'],
                ['+001912-07-30', 'NNNNN', '㍽'],
                ['+001912-07-30', 'y yy yyy yyyy', '1 01 001 0001'],
                ['+001912-07-30', 'yo', '元年'],

                /* Last day of Meiji Era */
                ['+001912-07-29', 'N, NN, NNN', 'M, M, M'],
                ['+001912-07-29', 'NNNN', '明治'],
                ['+001912-07-29', 'NNNNN', '㍾'],
                ['+001912-07-29', 'y yy yyy yyyy', '45 45 045 0045'],
                ['+001912-07-29', 'yo', '45年'],

                /* The day the Japanese government had began using the Gregorian calendar */
                ['+001873-01-01', 'N, NN, NNN', 'M, M, M'],
                ['+001873-01-01', 'NNNN', '明治'],
                ['+001873-01-01', 'NNNNN', '㍾'],
                ['+001873-01-01', 'y yy yyy yyyy', '6 06 006 0006'],
                ['+001873-01-01', 'yo', '6年'],

                /* Christinan Era */
                ['+001872-12-31', 'N, NN, NNN', 'AD, AD, AD'],
                ['+001872-12-31', 'NNNN', '西暦'],
                ['+001872-12-31', 'NNNNN', 'AD'],
                ['+001872-12-31', 'y yy yyy yyyy', '1872 1872 1872 1872'],
                ['+001872-12-31', 'yo', '1872年'],

                ['+000001-01-01', 'N, NN, NNN', 'AD, AD, AD'],
                ['+000001-01-01', 'NNNN', '西暦'],
                ['+000001-01-01', 'NNNNN', 'AD'],
                ['+000001-01-01', 'y', '1'],

                ['+000000-12-31', 'N, NN, NNN', 'BC, BC, BC'],
                ['+000000-12-31', 'NNNN', '紀元前'],
                ['+000000-12-31', 'NNNNN', 'BC'],
                ['+000000-12-31', 'y', '1'],

                ['-000001-12-31', 'N, NN, NNN', 'BC, BC, BC'],
                ['-000001-12-31', 'NNNN', '紀元前'],
                ['-000001-12-31', 'NNNNN', 'BC'],
                ['-000001-12-31', 'y', '2'],
            ],
            i,
            l;

        for (i = 0, l = a.length; i < l; ++i) {
            expect(
                moment(a[i][0]).format(a[i][1]),
                a[i][0] + '; ' + a[i][1] + ' ---> ' + a[i][2]
            ).toBe(a[i][2]);
        }
    });

    test('format month', () => {
        var expected =
                '1月 1月_2月 2月_3月 3月_4月 4月_5月 5月_6月 6月_7月 7月_8月 8月_9月 9月_10月 10月_11月 11月_12月 12月'.split(
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
                '日曜日 日 日_月曜日 月 月_火曜日 火 火_水曜日 水 水_木曜日 木 木_金曜日 金 金_土曜日 土 土'.split(
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
        ).toBe('数秒');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('1分');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('1分');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2分');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44分');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('1時間');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('1時間');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2時間');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5時間');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21時間');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('1日');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('1日');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2日');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('1日');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5日');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25日');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('1ヶ月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('1ヶ月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('1ヶ月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2ヶ月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2ヶ月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3ヶ月');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('1ヶ月');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5ヶ月');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('1年');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2年');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('1年');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5年');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('数秒後');
        expect(moment(0).from(30000), 'suffix').toBe('数秒前');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('数秒前');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            '数秒後'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe('5日後');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            '今日 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            '今日 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            '今日 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('明日 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('今日 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('昨日 12:00');
    });

    test('calendar next week', () => {
        var i,
            m,
            dow = moment().day();
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            if (dow + i < 7) {
                expect(
                    m.calendar(),
                    'Today + ' + i + ' days current time'
                ).toBe(m.format('dddd LT'));
                m.hours(0).minutes(0).seconds(0).milliseconds(0);
                expect(
                    m.calendar(),
                    'Today + ' + i + ' days beginning of day'
                ).toBe(m.format('dddd LT'));
                m.hours(23).minutes(59).seconds(59).milliseconds(999);
                expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                    m.format('dddd LT')
                );
            } else {
                expect(
                    m.calendar(),
                    'Today + ' + i + ' days current time'
                ).toBe(m.format('[来週]dddd LT'));
                m.hours(0).minutes(0).seconds(0).milliseconds(0);
                expect(
                    m.calendar(),
                    'Today + ' + i + ' days beginning of day'
                ).toBe(m.format('[来週]dddd LT'));
                m.hours(23).minutes(59).seconds(59).milliseconds(999);
                expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                    m.format('[来週]dddd LT')
                );
            }
        }
    });

    test('calendar last week', () => {
        var i,
            m,
            dow = moment().day();
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            if (dow < i) {
                expect(
                    m.calendar(),
                    'Today - ' + i + ' days current time'
                ).toBe(m.format('[先週]dddd LT'));
                m.hours(0).minutes(0).seconds(0).milliseconds(0);
                expect(
                    m.calendar(),
                    'Today - ' + i + ' days beginning of day'
                ).toBe(m.format('[先週]dddd LT'));
                m.hours(23).minutes(59).seconds(59).milliseconds(999);
                expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                    m.format('[先週]dddd LT')
                );
            } else {
                expect(
                    m.calendar(),
                    'Today - ' + i + ' days current time'
                ).toBe(m.format('dddd LT'));
                m.hours(0).minutes(0).seconds(0).milliseconds(0);
                expect(
                    m.calendar(),
                    'Today - ' + i + ' days beginning of day'
                ).toBe(m.format('dddd LT'));
                m.hours(23).minutes(59).seconds(59).milliseconds(999);
                expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                    m.format('dddd LT')
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

    test('parse with japanese parentheses', () => {
        expect(
            moment('2016年5月18日（水）', 'YYYY年M月D日（dd）', true).isValid(),
            'parse with japanese parentheses'
        ).toBeTruthy();
    });
});
