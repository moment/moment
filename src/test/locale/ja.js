import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('ja');

test('parse', function (assert) {
    var tests =
            '1月 1月_2月 2月_3月 3月_4月 4月_5月 5月_6月 6月_7月 7月_8月 8月_9月 9月_10月 10月_11月 11月_12月 12月'.split(
                '_'
            ),
        i;
    function equalTest(input, mmm, i) {
        assert.equal(
            moment(input, mmm).month(),
            i,
            input + ' should be month ' + (i + 1)
        );
    }
    function equalTestStrict(input, mmm, monthIndex) {
        assert.equal(
            moment(input, mmm, true).month(),
            monthIndex,
            input + ' ' + mmm + ' should be strict month ' + (monthIndex + 1)
        );
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

test('format', function (assert) {
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
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('parse era', function (assert) {
    // strict
    assert.equal(moment('令和2年', 'NNNNy年', true).isValid(), true, '令和2年');
    assert.equal(moment('令和2年', 'NNNNy年', true).year(), 2020, '令和2年');
    assert.equal(moment('令和2年', 'NNNNyo', true).isValid(), true, '令和2年');
    assert.equal(moment('令和2年', 'NNNNyo', true).year(), 2020, '令和2年');

    assert.equal(moment('令和2年', 'Ny年', true).isValid(), false, '令和2年');
    assert.equal(moment('令和2年', 'Ny年', false).isValid(), true, '令和2年');
    assert.equal(moment('㋿2年', 'Ny年', true).isValid(), false, '㋿2年');
    assert.equal(moment('㋿2年', 'Ny年', false).isValid(), true, '㋿2年');
    assert.equal(moment('R2', 'Ny', false).isValid(), true, 'R2');

    // abbrv
    assert.equal(moment('R2', 'Ny', true).isValid(), true, 'R2');
    assert.equal(moment('R2', 'Ny', true).year(), 2020, 'R2');
    assert.equal(moment('R2', 'NNNNy', true).isValid(), false, 'R2');
    assert.equal(moment('R2', 'NNNNNy', true).isValid(), false, 'R2');

    // narrow
    assert.equal(moment('㋿2年', 'Ny年', true).isValid(), false, '㋿2年');
    assert.equal(moment('㋿2年', 'NNNNy年', true).isValid(), false, '㋿2年');
    assert.equal(moment('㋿2年', 'NNNNNy年', true).isValid(), true, '㋿2年');
    assert.equal(moment('㋿2年', 'NNNNNy年', true).year(), 2020, '㋿2年');

    // ordinal year
    assert.equal(moment('令和2年', 'NNNNyo', true).year(), 2020, '平成30年');
    assert.equal(moment('令和元年', 'NNNNyo', true).year(), 2019, '平成元年');

    // old eras
    assert.equal(moment('平成30年', 'NNNNyo', true).year(), 2018, '平成30年');
    assert.equal(moment('平成元年', 'NNNNyo', true).year(), 1989, '平成元年');
    assert.equal(moment('昭和64年', 'NNNNyo', true).year(), 1989, '昭和64年');
    assert.equal(moment('昭和元年', 'NNNNyo', true).year(), 1926, '昭和元年');
    assert.equal(moment('大正元年', 'NNNNyo', true).year(), 1912, '大正元年');
    assert.equal(moment('明治6年', 'NNNNyo', true).year(), 1873, '明治6年');
});

test('format era', function (assert) {
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
        assert.equal(
            moment(a[i][0]).format(a[i][1]),
            a[i][2],
            a[i][0] + '; ' + a[i][1] + ' ---> ' + a[i][2]
        );
    }
});

test('format month', function (assert) {
    var expected =
            '1月 1月_2月 2月_3月 3月_4月 4月_5月 5月_6月 6月_7月 7月_8月 8月_9月 9月_10月 10月_11月 11月_12月 12月'.split(
                '_'
            ),
        i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(
            moment([2011, i, 1]).format('MMMM MMM'),
            expected[i],
            expected[i]
        );
    }
});

test('format week', function (assert) {
    var expected =
            '日曜日 日 日_月曜日 月 月_火曜日 火 火_水曜日 水 水_木曜日 木 木_金曜日 金 金_土曜日 土 土'.split(
                '_'
            ),
        i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(
            moment([2011, 0, 2 + i]).format('dddd ddd dd'),
            expected[i],
            expected[i]
        );
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
        '数秒',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        '1分',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        '1分',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2分',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44分',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        '1時間',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        '1時間',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2時間',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5時間',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21時間',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        '1日',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        '1日',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2日',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        '1日',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5日',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25日',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        '1ヶ月',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        '1ヶ月',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        '1ヶ月',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2ヶ月',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2ヶ月',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3ヶ月',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        '1ヶ月',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5ヶ月',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        '1年',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2年',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        '1年',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5年',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), '数秒後', 'prefix');
    assert.equal(moment(0).from(30000), '数秒前', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        '数秒前',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        '数秒後',
        'in a few seconds'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), '5日後', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(), '今日 12:00', 'today at the same time');
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        '今日 12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        '今日 13:00',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        '明日 12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        '今日 11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        '昨日 12:00',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i,
        m,
        dow = moment().day();
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        if (dow + i < 7) {
            assert.equal(
                m.calendar(),
                m.format('dddd LT'),
                'Today + ' + i + ' days current time'
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(
                m.calendar(),
                m.format('dddd LT'),
                'Today + ' + i + ' days beginning of day'
            );
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(
                m.calendar(),
                m.format('dddd LT'),
                'Today + ' + i + ' days end of day'
            );
        } else {
            assert.equal(
                m.calendar(),
                m.format('[来週]dddd LT'),
                'Today + ' + i + ' days current time'
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(
                m.calendar(),
                m.format('[来週]dddd LT'),
                'Today + ' + i + ' days beginning of day'
            );
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(
                m.calendar(),
                m.format('[来週]dddd LT'),
                'Today + ' + i + ' days end of day'
            );
        }
    }
});

test('calendar last week', function (assert) {
    var i,
        m,
        dow = moment().day();
    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        if (dow < i) {
            assert.equal(
                m.calendar(),
                m.format('[先週]dddd LT'),
                'Today - ' + i + ' days current time'
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(
                m.calendar(),
                m.format('[先週]dddd LT'),
                'Today - ' + i + ' days beginning of day'
            );
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(
                m.calendar(),
                m.format('[先週]dddd LT'),
                'Today - ' + i + ' days end of day'
            );
        } else {
            assert.equal(
                m.calendar(),
                m.format('dddd LT'),
                'Today - ' + i + ' days current time'
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(
                m.calendar(),
                m.format('dddd LT'),
                'Today - ' + i + ' days beginning of day'
            );
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(
                m.calendar(),
                m.format('dddd LT'),
                'Today - ' + i + ' days end of day'
            );
        }
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({ w: 1 }),
        weeksFromNow = moment().add({ w: 1 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
    assert.equal(
        weeksFromNow.calendar(),
        weeksFromNow.format('L'),
        'in 1 week'
    );

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
    assert.equal(
        weeksFromNow.calendar(),
        weeksFromNow.format('L'),
        'in 2 weeks'
    );
});

test('weeks year starting sunday format', function (assert) {
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '1 01 1',
        'Jan  1 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 7]).format('w ww wo'),
        '1 01 1',
        'Jan  7 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '2 02 2',
        'Jan  8 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 14]).format('w ww wo'),
        '2 02 2',
        'Jan 14 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 15]).format('w ww wo'),
        '3 03 3',
        'Jan 15 2012 should be week 3'
    );
});

test('parse with japanese parentheses', function (assert) {
    assert.ok(
        moment('2016年5月18日（水）', 'YYYY年M月D日（dd）', true).isValid(),
        'parse with japanese parentheses'
    );
});
