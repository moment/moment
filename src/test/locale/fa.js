import {localeModule, test} from '../qunit';
import {moment} from '../../moment';
localeModule('fa');

test('parse', function (assert) {
    var tests = 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'), i;
    function equalTest(input, mmm, i) {
        assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1) + ' instead is month ' + moment(input, mmm).month());
    }
    for (i = 0; i < 12; i++) {
        equalTest(tests[i], 'MMM', i);
        equalTest(tests[i], 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'یک\u200cشنبه، فوریه ۱۴م ۲۰۱۰، ۳:۲۵:۵۰ بعد از ظهر'],
            ['ddd, hA',                            'یک\u200cشنبه، ۳بعد از ظهر'],
            ['M Mo MM MMMM MMM',                   '۲ ۲م ۰۲ فوریه فوریه'],
            ['YYYY YY',                            '۲۰۱۰ ۱۰'],
            ['D Do DD',                            '۱۴ ۱۴م ۱۴'],
            ['d do dddd ddd dd',                   '۰ ۰م یک\u200cشنبه یک\u200cشنبه ی'],
            ['DDD DDDo DDDD',                      '۴۵ ۴۵م ۰۴۵'],
            ['w wo ww',                            '۸ ۸م ۰۸'],
            ['h hh',                               '۳ ۰۳'],
            ['H HH',                               '۱۵ ۱۵'],
            ['m mm',                               '۲۵ ۲۵'],
            ['s ss',                               '۵۰ ۵۰'],
            ['a A',                                'بعد از ظهر بعد از ظهر'],
            ['DDDo [روز سال]',             '۴۵م روز سال'],
            ['LTS',                                '۱۵:۲۵:۵۰'],
            ['L',                                  '۱۴/۰۲/۲۰۱۰'],
            ['LL',                                 '۱۴ فوریه ۲۰۱۰'],
            ['LLL',                                '۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
            ['LLLL',                               'یک\u200cشنبه، ۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
            ['l',                                  '۱۴/۲/۲۰۱۰'],
            ['ll',                                 '۱۴ فوریه ۲۰۱۰'],
            ['lll',                                '۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
            ['llll',                               'یک\u200cشنبه، ۱۴ فوریه ۲۰۱۰ ۱۵:۲۵']
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
    var expected = 'ژانویه ژانویه_فوریه فوریه_مارس مارس_آوریل آوریل_مه مه_ژوئن ژوئن_ژوئیه ژوئیه_اوت اوت_سپتامبر سپتامبر_اکتبر اکتبر_نوامبر نوامبر_دسامبر دسامبر'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'یک\u200cشنبه یک\u200cشنبه ی_دوشنبه دوشنبه د_سه\u200cشنبه سه\u200cشنبه س_چهارشنبه چهارشنبه چ_پنج\u200cشنبه پنج\u200cشنبه پ_جمعه جمعه ج_شنبه شنبه ش'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'چندین ثانیه', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'یک دقیقه',       '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'یک دقیقه',       '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '۲ دقیقه',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '۴۴ دقیقه',    '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'یک ساعت',     '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'یک ساعت',     '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '۲ ساعت',      '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '۵ ساعت',      '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '۲۱ ساعت',     '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'یک روز',      '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'یک روز',      '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '۲ روز',       '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'یک روز',      '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '۵ روز',       '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '۲۵ روز',      '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'یک ماه',      '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'یک ماه',      '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'یک ماه',      '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '۲ ماه',       '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '۲ ماه',       '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '۳ ماه',       '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'یک ماه',      '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '۵ ماه',       '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'یک سال',      '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '۲ سال',       '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'یک سال',      '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '۵ سال',       '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'در چندین ثانیه', 'prefix');
    assert.equal(moment(0).from(30000), 'چندین ثانیه پیش', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'چندین ثانیه پیش',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'در چندین ثانیه', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(), 'در ۵ روز', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(2).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                     'امروز ساعت ۰۲:۰۰', 'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'امروز ساعت ۰۲:۲۵', 'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'امروز ساعت ۰۳:۰۰', 'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'فردا ساعت ۰۲:۰۰', 'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'امروز ساعت ۰۱:۰۰', 'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'دیروز ساعت ۰۲:۰۰', 'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd [ساعت] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [ساعت] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [ساعت] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('dddd [پیش ساعت] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [پیش ساعت] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [پیش ساعت] LT'),  'Today - ' + i + ' days end of day');
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({w: 1}),
        weeksFromNow = moment().add({w: 1});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

    weeksAgo = moment().subtract({w: 2});
    weeksFromNow = moment().add({w: 2});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
});

test('weeks year starting sunday', function (assert) {
    assert.equal(moment([2011, 11, 31]).week(), 1, 'Dec 31 2011 should be week 1');
    assert.equal(moment([2012,  0,  6]).week(), 1, 'Jan  6 2012 should be week 1');
    assert.equal(moment([2012,  0,  7]).week(), 2, 'Jan  7 2012 should be week 2');
    assert.equal(moment([2012,  0, 13]).week(), 2, 'Jan 13 2012 should be week 2');
    assert.equal(moment([2012,  0, 14]).week(), 3, 'Jan 14 2012 should be week 3');
});

test('weeks year starting monday', function (assert) {
    assert.equal(moment([2006, 11, 30]).week(), 1, 'Dec 30 2006 should be week 1');
    assert.equal(moment([2007,  0,  5]).week(), 1, 'Jan  5 2007 should be week 1');
    assert.equal(moment([2007,  0,  6]).week(), 2, 'Jan  6 2007 should be week 2');
    assert.equal(moment([2007,  0, 12]).week(), 2, 'Jan 12 2007 should be week 2');
    assert.equal(moment([2007,  0, 13]).week(), 3, 'Jan 13 2007 should be week 3');
});

test('weeks year starting tuesday', function (assert) {
    assert.equal(moment([2007, 11, 29]).week(), 1, 'Dec 29 2007 should be week 1');
    assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
    assert.equal(moment([2008,  0,  4]).week(), 1, 'Jan  4 2008 should be week 1');
    assert.equal(moment([2008,  0,  5]).week(), 2, 'Jan  5 2008 should be week 2');
    assert.equal(moment([2008,  0, 11]).week(), 2, 'Jan 11 2008 should be week 2');
    assert.equal(moment([2008,  0, 12]).week(), 3, 'Jan 12 2008 should be week 3');
});

test('weeks year starting wednesday', function (assert) {
    assert.equal(moment([2002, 11, 28]).week(), 1, 'Dec 28 2002 should be week 1');
    assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
    assert.equal(moment([2003,  0,  3]).week(), 1, 'Jan  3 2003 should be week 1');
    assert.equal(moment([2003,  0,  4]).week(), 2, 'Jan  4 2003 should be week 2');
    assert.equal(moment([2003,  0, 10]).week(), 2, 'Jan 10 2003 should be week 2');
    assert.equal(moment([2003,  0, 11]).week(), 3, 'Jan 11 2003 should be week 3');
});

test('weeks year starting thursday', function (assert) {
    assert.equal(moment([2008, 11, 27]).week(), 1, 'Dec 27 2008 should be week 1');
    assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
    assert.equal(moment([2009,  0,  2]).week(), 1, 'Jan  2 2009 should be week 1');
    assert.equal(moment([2009,  0,  3]).week(), 2, 'Jan  3 2009 should be week 2');
    assert.equal(moment([2009,  0,  9]).week(), 2, 'Jan  9 2009 should be week 2');
    assert.equal(moment([2009,  0, 10]).week(), 3, 'Jan 10 2009 should be week 3');
});

test('weeks year starting friday', function (assert) {
    assert.equal(moment([2009, 11, 26]).week(), 1, 'Dec 26 2009 should be week 1');
    assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
    assert.equal(moment([2010,  0,  2]).week(), 2, 'Jan  2 2010 should be week 2');
    assert.equal(moment([2010,  0,  8]).week(), 2, 'Jan  8 2010 should be week 2');
    assert.equal(moment([2010,  0,  9]).week(), 3, 'Jan  9 2010 should be week 3');
});

test('weeks year starting saturday', function (assert) {
    assert.equal(moment([2011, 0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
    assert.equal(moment([2011, 0,  7]).week(), 1, 'Jan  7 2011 should be week 1');
    assert.equal(moment([2011, 0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
    assert.equal(moment([2011, 0, 14]).week(), 2, 'Jan 14 2011 should be week 2');
    assert.equal(moment([2011, 0, 15]).week(), 3, 'Jan 15 2011 should be week 3');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2011, 11, 31]).format('w ww wo'), '۱ ۰۱ ۱م', 'Dec 31 2011 should be week 1');
    assert.equal(moment([2012,  0,  6]).format('w ww wo'), '۱ ۰۱ ۱م', 'Jan  6 2012 should be week 1');
    assert.equal(moment([2012,  0,  7]).format('w ww wo'), '۲ ۰۲ ۲م', 'Jan  7 2012 should be week 2');
    assert.equal(moment([2012,  0, 13]).format('w ww wo'), '۲ ۰۲ ۲م', 'Jan 13 2012 should be week 2');
    assert.equal(moment([2012,  0, 14]).format('w ww wo'), '۳ ۰۳ ۳م', 'Jan 14 2012 should be week 3');
});

test('lenient ordinal parsing', function (assert) {
    var i, ordinalStr, testMoment;
    for (i = 1; i <= 31; ++i) {
        ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
        testMoment = moment(ordinalStr, 'YYYY MM Do');
        assert.equal(testMoment.year(), 2014,
                'lenient ordinal parsing ' + i + ' year check');
        assert.equal(testMoment.month(), 0,
                'lenient ordinal parsing ' + i + ' month check');
        assert.equal(testMoment.date(), i,
                'lenient ordinal parsing ' + i + ' date check');
    }
});

test('lenient ordinal parsing of number', function (assert) {
    var i, testMoment;
    for (i = 1; i <= 31; ++i) {
        testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
        assert.equal(testMoment.year(), 2014,
                'lenient ordinal parsing of number ' + i + ' year check');
        assert.equal(testMoment.month(), 0,
                'lenient ordinal parsing of number ' + i + ' month check');
        assert.equal(testMoment.date(), i,
                'lenient ordinal parsing of number ' + i + ' date check');
    }
});

test('strict ordinal parsing', function (assert) {
    var i, ordinalStr, testMoment;
    for (i = 1; i <= 31; ++i) {
        ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
        testMoment = moment(ordinalStr, 'YYYY MM Do', true);
        assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
    }
});
