import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('zh-cn');

test('parse', function (assert) {
    var tests = '一月 1月_二月 2月_三月 3月_四月 4月_五月 5月_六月 6月_七月 7月_八月 8月_九月 9月_十月 10月_十一月 11月_十二月 12月'.split(
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
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format month', function (assert) {
    var expected = '一月 1月_二月 2月_三月 3月_四月 4月_五月 5月_六月 6月_七月 7月_八月 8月_九月 9月_十月 10月_十一月 11月_十二月 12月'.split(
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
    var expected = '星期日 周日 日_星期一 周一 一_星期二 周二 二_星期三 周三 三_星期四 周四 四_星期五 周五 五_星期六 周六 六'.split(
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
        '几秒',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        '1 分钟',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        '1 分钟',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 分钟',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 分钟',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        '1 小时',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        '1 小时',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 小时',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 小时',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 小时',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        '1 天',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        '1 天',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 天',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        '1 天',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 天',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 天',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        '1 个月',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        '1 个月',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        '1 个月',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 个月',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 个月',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 个月',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        '1 个月',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 个月',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        '1 年',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 年',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        '1 年',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 年',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), '几秒后', 'prefix');
    assert.equal(moment(0).from(30000), '几秒前', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        '几秒前',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        '几秒后',
        'in a few seconds'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), '5 天后', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(), '今天12:00', 'today at the same time');
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        '今天12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        '今天13:00',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        '明天12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        '今天11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        '昨天12:00',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i,
        m,
        week = moment().week();
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        if (week === m.week()) {
            assert.equal(
                m.calendar(),
                m.format('[本]dddLT'),
                'Today + ' + i + ' days current time'
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(
                m.calendar(),
                m.format('[本]dddLT'),
                'Today + ' + i + ' days beginning of day'
            );
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(
                m.calendar(),
                m.format('[本]dddLT'),
                'Today + ' + i + ' days end of day'
            );
        } else {
            assert.equal(
                m.calendar(),
                m.format('[下]dddLT'),
                'Today + ' + i + ' days current time'
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(
                m.calendar(),
                m.format('[下]dddLT'),
                'Today + ' + i + ' days beginning of day'
            );
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(
                m.calendar(),
                m.format('[下]dddLT'),
                'Today + ' + i + ' days end of day'
            );
        }
    }
});

test('calendar last week', function (assert) {
    var i,
        m,
        week = moment().week();
    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        if (week !== m.week()) {
            assert.equal(
                m.calendar(),
                m.format('[上]dddLT'),
                'Today - ' + i + ' days current time'
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(
                m.calendar(),
                m.format('[上]dddLT'),
                'Today - ' + i + ' days beginning of day'
            );
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(
                m.calendar(),
                m.format('[上]dddLT'),
                'Today - ' + i + ' days end of day'
            );
        } else {
            assert.equal(
                m.calendar(),
                m.format('[本]dddLT'),
                'Today - ' + i + ' days current time'
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(
                m.calendar(),
                m.format('[本]dddLT'),
                'Today - ' + i + ' days beginning of day'
            );
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(
                m.calendar(),
                m.format('[本]dddLT'),
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

test('meridiem', function (assert) {
    assert.equal(
        moment([2011, 2, 23, 0, 0]).format('A'),
        '凌晨',
        'before dawn'
    );
    assert.equal(moment([2011, 2, 23, 6, 0]).format('A'), '早上', 'morning');
    assert.equal(
        moment([2011, 2, 23, 9, 0]).format('A'),
        '上午',
        'before noon'
    );
    assert.equal(moment([2011, 2, 23, 12, 0]).format('A'), '中午', 'noon');
    assert.equal(moment([2011, 2, 23, 13, 0]).format('A'), '下午', 'afternoon');
    assert.equal(moment([2011, 2, 23, 18, 0]).format('A'), '晚上', 'night');
});

test('weeks year starting sunday format', function (assert) {
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '52 52 52周',
        'Jan  1 2012 应该是第52周'
    );
    assert.equal(
        moment([2012, 0, 7]).format('w ww wo'),
        '1 01 1周',
        'Jan  7 2012 应该是第 1周'
    );
    assert.equal(
        moment([2012, 0, 14]).format('w ww wo'),
        '2 02 2周',
        'Jan 14 2012 应该是第 2周'
    );
});
