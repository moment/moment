import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('ps');

test('parse', function (assert) {
    var tests =
            'جنوری_فبروری_مارچ_اپریل_می_جون_جولای_اګست_سپتمبر_اکتوبر_نوامبر_ډیسامبر'.split(
                '_'
            ),
        i;
    function equalTest(input, mmm, i) {
        assert.equal(
            moment(input, mmm).month(),
            i,
            input +
                ' should be month ' +
                (i + 1) +
                ' instead is month ' +
                moment(input, mmm).month()
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
        equalTest(tests[i], 'MMM', i);
        equalTest(tests[i], 'MMMM', i);
        equalTest(tests[i].toLocaleLowerCase(), 'MMM', i);
        equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i].toLocaleUpperCase(), 'MMM', i);
        equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);

        equalTestStrict(tests[i], 'MMM', i);
        equalTestStrict(tests[i], 'MMMM', i);
        equalTestStrict(tests[i].toLocaleLowerCase(), 'MMM', i);
        equalTestStrict(tests[i].toLocaleUpperCase(), 'MMM', i);
        equalTestStrict(tests[i].toLocaleLowerCase(), 'MMMM', i);
        equalTestStrict(tests[i].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            [
                'dddd, MMMM Do YYYY, h:mm:ss a',
                'یک\u200cشنبه، فبروری ۱۴م ۲۰۱۰، ۳:۲۵:۵۰ وروسته له غرمي',
            ],
            ['ddd, hA', 'یک\u200cشنبه، ۳ورسته له غرمي'],
            ['M Mo MM MMMM MMM', '۲ ۲م ۰۲ فبروری فبروی'],
            ['YYYY YY', '۲۰۱۰ ۱۰'],
            ['D Do DD', '۱۴ ۱۴م ۱۴'],
            ['d do dddd ddd dd', '۰ ۰م یک\u200cشنبه یک\u200cشنبه ی'],
            ['DDD DDDo DDDD', '۴۵ ۴۵م ۰۴۵'],
            ['w wo ww', '۸ ۸م ۰۸'],
            ['h hh', '۳ ۰۳'],
            ['H HH', '۱۵ ۱۵'],
            ['m mm', '۲۵ ۲۵'],
            ['s ss', '۵۰ ۵۰'],
            ['a A', 'وروسته له غرمي وروسته له غرمي'],
            ['DDDo [ورځ د کال]', '۴۵م ورځ د کال'],
            ['LTS', '۱۵:۲۵:۵۰'],
            ['L', '۱۴/۰۲/۲۰۱۰'],
            ['LL', '۱۴ فبروری ۲۰۱۰'],
            ['LLL', '۱۴ فبروری ۲۰۱۰ ۱۵:۲۵'],
            ['LLLL', 'یک\u200cشنبه، ۱۴ فبروری ۲۰۱۰ ۱۵:۲۵'],
            ['l', '۱۴/۲/۲۰۱۰'],
            ['ll', '۱۴ فبروری ۲۰۱۰'],
            ['lll', '۱۴ فبروری ۲۰۱۰ ۱۵:۲۵'],
            ['llll', 'یک\u200cشنبه، ۱۴ فبروری ۲۰۱۰ ۱۵:۲۵'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '۱م', '1');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '۲م', '2');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '۳م', '3');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '۴م', '4');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '۵م', '5');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '۶م', '6');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '۷م', '7');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '۸م', '8');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '۹م', '9');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '۱۰م', '10');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '۱۱م', '11');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '۱۲م', '12');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '۱۳م', '13');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '۱۴م', '14');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '۱۵م', '15');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '۱۶م', '16');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '۱۷م', '17');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '۱۸م', '18');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '۱۹م', '19');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '۲۰م', '20');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '۲۱م', '21');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '۲۲م', '22');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '۲۳م', '23');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '۲۴م', '24');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '۲۵م', '25');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '۲۶م', '26');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '۲۷م', '27');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '۲۸م', '28');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '۲۹م', '29');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '۳۰م', '30');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '۳۱م', '31');
});

test('format month', function (assert) {
    var expected =
            'جنوری جنوری_فبروری فبروری_مارچ مارچ_اپریل اپریل_می می_جون جون_جولای جولای_اګست اګست_سپتمبر سپتمبر_اکتوبر اکتوبر_نوامبر نوامبر_ډیسامبر ډیسامبر'.split(
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
            'یک\u200cشنبه یک\u200cشنبه ی_دوشنبه دوشنبه د_سه\u200cشنبه سه\u200cشنبه س_چهارشنبه چهارشنبه چ_پنج\u200cشنبه پنج\u200cشنبه پ_جمعه جمعه ج_شنبه شنبه ش'.split(
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
    var start = moment([2007, 1, 28]),
        s,
        ss;
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
        'څو ثانیي ',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'یوه دقیقه',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'یوه دقیقه',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '۲ دقیقي',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '۴۴ دقیقي',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'یو ساعت',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'یو ساعت',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '۲ ساعته',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '۵ ساعته',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '۲۱ ساعته',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'یوه ورځ',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'یوه ورځ',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '۲ ورځي',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'یوه ورځ',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '۵ ورځي',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '۲۵ ورځي',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'یوه میاشت',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'یوه میاشت',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'یوه میاشت',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '۲ میاشتي',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '۲ میاشتي',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '۳ میاشتي',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'یوه میاشت',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '۵ میاشتي',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'یو کال',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '۲ کاله',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'یو کال',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '۵ کاله',
        '5 years = 5 years'
    );

    s = moment.relativeTimeThreshold('s');
    ss = moment.relativeTimeThreshold('ss');

    moment.relativeTimeThreshold('s', 60);
    moment.relativeTimeThreshold('ss', 0);
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
        '۴۴ ثانیي',
        '44 seconds = 44 seconds'
    );
    moment.relativeTimeThreshold('s', s);
    moment.relativeTimeThreshold('ss', ss);
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'په څو ثانیو کي', 'prefix');
    assert.equal(moment(0).from(30000), 'څو ثانیي مخکي', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'څو ثانيي مخکي',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'په څو ثانیو کي',
        'in a few seconds'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), 'په ۵ ورځو کي', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'نن بجي ۱۲:۰۰',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'نن بجي ۱۲:۲۵',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'نن بجي ۱۳:۰۰',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'سبا بجي ۱۲:۰۰',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'نن بجي ۱۱:۰۰',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'پرون بجي ۱۲:۰۰',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd [بجي] LT'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [بجي] LT'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [بجي] LT'),
            'Today + ' + i + ' days end of day'
        );
    }
});

test('calendar last week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd [مخکي بجي] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [مخکی بجي] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [مخکي بجي] LT'),
            'Today - ' + i + ' days end of day'
        );
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

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(
        moment([2011, 11, 31]).format('w ww wo'),
        '۱ ۰۱ ۱م',
        'Dec 31 2011 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 6]).format('w ww wo'),
        '۱ ۰۱ ۱م',
        'Jan  6 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 7]).format('w ww wo'),
        '۲ ۰۲ ۲م',
        'Jan  7 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 13]).format('w ww wo'),
        '۲ ۰۲ ۲م',
        'Jan 13 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 14]).format('w ww wo'),
        '۳ ۰۳ ۳م',
        'Jan 14 2012 should be week 3'
    );
});
