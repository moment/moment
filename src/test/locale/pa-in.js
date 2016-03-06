import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('pa-in');

test('parse', function (assert) {
    var tests = 'ਜਨਵਰੀ ਜਨਵਰੀ_ਫ਼ਰਵਰੀ ਫ਼ਰਵਰੀ_ਮਾਰਚ ਮਾਰਚ_ਅਪ੍ਰੈਲ ਅਪ੍ਰੈਲ_ਮਈ ਮਈ_ਜੂਨ ਜੂਨ_ਜੁਲਾਈ ਜੁਲਾਈ_ਅਗਸਤ ਅਗਸਤ_ਸਤੰਬਰ ਸਤੰਬਰ_ਅਕਤੂਬਰ ਅਕਤੂਬਰ_ਨਵੰਬਰ ਨਵੰਬਰ_ਦਸੰਬਰ ਦਸੰਬਰ'.split('_'), i;
    function equalTest(input, mmm, i) {
        assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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

test('format', function (assert) {
    var a = [
            ['dddd, Do MMMM YYYY, a h:mm:ss ਵਜੇ',  'ਐਤਵਾਰ, ੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫:੫੦ ਵਜੇ'],
            ['ddd, a h ਵਜੇ',                       'ਐਤ, ਦੁਪਹਿਰ ੩ ਵਜੇ'],
            ['M Mo MM MMMM MMM',                   '੨ ੨ ੦੨ ਫ਼ਰਵਰੀ ਫ਼ਰਵਰੀ'],
            ['YYYY YY',                            '੨੦੧੦ ੧੦'],
            ['D Do DD',                            '੧੪ ੧੪ ੧੪'],
            ['d do dddd ddd dd',                   '੦ ੦ ਐਤਵਾਰ ਐਤ ਐਤ'],
            ['DDD DDDo DDDD',                      '੪੫ ੪੫ ੦੪੫'],
            ['w wo ww',                            '੮ ੮ ੦੮'],
            ['h hh',                               '੩ ੦੩'],
            ['H HH',                               '੧੫ ੧੫'],
            ['m mm',                               '੨੫ ੨੫'],
            ['s ss',                               '੫੦ ੫੦'],
            ['a A',                                'ਦੁਪਹਿਰ ਦੁਪਹਿਰ'],
            ['LTS',                                'ਦੁਪਹਿਰ ੩:੨੫:੫੦ ਵਜੇ'],
            ['L',                                  '੧੪/੦੨/੨੦੧੦'],
            ['LL',                                 '੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦'],
            ['LLL',                                '੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫ ਵਜੇ'],
            ['LLLL',                               'ਐਤਵਾਰ, ੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫ ਵਜੇ'],
            ['l',                                  '੧੪/੨/੨੦੧੦'],
            ['ll',                                 '੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦'],
            ['lll',                                '੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫ ਵਜੇ'],
            ['llll',                               'ਐਤ, ੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫ ਵਜੇ']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '੧', '੧');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '੨', '੨');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '੩', '੩');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '੪', '੪');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '੫', '੫');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '੬', '੬');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '੭', '੭');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '੮', '੮');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '੯', '੯');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '੧੦', '੧੦');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '੧੧', '੧੧');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '੧੨', '੧੨');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '੧੩', '੧੩');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '੧੪', '੧੪');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '੧੫', '੧੫');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '੧੬', '੧੬');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '੧੭', '੧੭');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '੧੮', '੧੮');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '੧੯', '੧੯');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '੨੦', '੨੦');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '੨੧', '੨੧');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '੨੨', '੨੨');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '੨੩', '੨੩');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '੨੪', '੨੪');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '੨੫', '੨੫');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '੨੬', '੨੬');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '੨੭', '੨੭');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '੨੮', '੨੮');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '੨੯', '੨੯');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '੩੦', '੩੦');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '੩੧', '੩੧');
});

test('format month', function (assert) {
    var expected = 'ਜਨਵਰੀ ਜਨਵਰੀ_ਫ਼ਰਵਰੀ ਫ਼ਰਵਰੀ_ਮਾਰਚ ਮਾਰਚ_ਅਪ੍ਰੈਲ ਅਪ੍ਰੈਲ_ਮਈ ਮਈ_ਜੂਨ ਜੂਨ_ਜੁਲਾਈ ਜੁਲਾਈ_ਅਗਸਤ ਅਗਸਤ_ਸਤੰਬਰ ਸਤੰਬਰ_ਅਕਤੂਬਰ ਅਕਤੂਬਰ_ਨਵੰਬਰ ਨਵੰਬਰ_ਦਸੰਬਰ ਦਸੰਬਰ'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'ਐਤਵਾਰ ਐਤ ਐਤ_ਸੋਮਵਾਰ ਸੋਮ ਸੋਮ_ਮੰਗਲਵਾਰ ਮੰਗਲ ਮੰਗਲ_ਬੁਧਵਾਰ ਬੁਧ ਬੁਧ_ਵੀਰਵਾਰ ਵੀਰ ਵੀਰ_ਸ਼ੁੱਕਰਵਾਰ ਸ਼ੁਕਰ ਸ਼ੁਕਰ_ਸ਼ਨੀਚਰਵਾਰ ਸ਼ਨੀ ਸ਼ਨੀ'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'ਕੁਝ ਸਕਿੰਟ', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'ਇਕ ਮਿੰਟ',      '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'ਇਕ ਮਿੰਟ',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '੨ ਮਿੰਟ',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '੪੪ ਮਿੰਟ',    '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ਇੱਕ ਘੰਟਾ',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ਇੱਕ ਘੰਟਾ',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '੨ ਘੰਟੇ',       '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '੫ ਘੰਟੇ',       '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '੨੧ ਘੰਟੇ',      '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ਇੱਕ ਦਿਨ',         '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ਇੱਕ ਦਿਨ',         '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '੨ ਦਿਨ',        '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ਇੱਕ ਦਿਨ',         '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '੫ ਦਿਨ',        '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '੨੫ ਦਿਨ',       '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'ਇੱਕ ਮਹੀਨਾ',       '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'ਇੱਕ ਮਹੀਨਾ',       '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'ਇੱਕ ਮਹੀਨਾ',       '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '੨ ਮਹੀਨੇ',      '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '੨ ਮਹੀਨੇ',      '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '੩ ਮਹੀਨੇ',      '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'ਇੱਕ ਮਹੀਨਾ',       '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '੫ ਮਹੀਨੇ',      '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'ਇੱਕ ਸਾਲ',        '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '੨ ਸਾਲ',       '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'ਇੱਕ ਸਾਲ',        '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '੫ ਸਾਲ',       '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'ਕੁਝ ਸਕਿੰਟ ਵਿੱਚ',  'prefix');
    assert.equal(moment(0).from(30000), 'ਕੁਝ ਸਕਿੰਟ ਪਿਛਲੇ', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'ਕੁਝ ਸਕਿੰਟ ਪਿਛਲੇ',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'ਕੁਝ ਸਕਿੰਟ ਵਿੱਚ', 'ਕੁਝ ਸਕਿੰਟ ਵਿੱਚ');
    assert.equal(moment().add({d: 5}).fromNow(), '੫ ਦਿਨ ਵਿੱਚ', '੫ ਦਿਨ ਵਿੱਚ');
});

test('calendar day', function (assert) {
    var a = moment().hours(2).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                     'ਅਜ ਰਾਤ ੨:੦੦ ਵਜੇ',     'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'ਅਜ ਰਾਤ ੨:੨੫ ਵਜੇ',     'Now plus 25 min');
    assert.equal(moment(a).add({h: 3}).calendar(),       'ਅਜ ਸਵੇਰ ੫:੦੦ ਵਜੇ',     'Now plus 3 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'ਕਲ ਰਾਤ ੨:੦੦ ਵਜੇ',  'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'ਅਜ ਰਾਤ ੧:੦੦ ਵਜੇ',     'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'ਕਲ ਰਾਤ ੨:੦੦ ਵਜੇ', 'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd[,] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd[,] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd[,] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('[ਪਿਛਲੇ] dddd[,] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[ਪਿਛਲੇ] dddd[,] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[ਪਿਛਲੇ] dddd[,] LT'),  'Today - ' + i + ' days end of day');
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

test('meridiem invariant', function (assert) {
    assert.equal(moment([2011, 2, 23,  2, 30]).format('a'), 'ਰਾਤ', 'before dawn');
    assert.equal(moment([2011, 2, 23,  9, 30]).format('a'), 'ਸਵੇਰ', 'morning');
    assert.equal(moment([2011, 2, 23, 14, 30]).format('a'), 'ਦੁਪਹਿਰ', 'during day');
    assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), 'ਸ਼ਾਮ', 'evening');
    assert.equal(moment([2011, 2, 23, 19, 30]).format('a'), 'ਸ਼ਾਮ', 'late evening');
    assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'ਰਾਤ', 'night');

    assert.equal(moment([2011, 2, 23,  2, 30]).format('A'), 'ਰਾਤ', 'before dawn');
    assert.equal(moment([2011, 2, 23,  9, 30]).format('A'), 'ਸਵੇਰ', 'morning');
    assert.equal(moment([2011, 2, 23, 14, 30]).format('A'), 'ਦੁਪਹਿਰ', ' during day');
    assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), 'ਸ਼ਾਮ', 'evening');
    assert.equal(moment([2011, 2, 23, 19, 30]).format('A'), 'ਸ਼ਾਮ', 'late evening');
    assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'ਰਾਤ', 'night');
});

test('weeks year starting sunday', function (assert) {
    assert.equal(moment([2012, 0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012, 0,  7]).week(), 1, 'Jan  7 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012, 0, 14]).week(), 2, 'Jan 14 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).week(), 3, 'Jan 15 2012 should be week 3');
});

test('weeks year starting monday', function (assert) {
    assert.equal(moment([2006, 11, 31]).week(), 1, 'Dec 31 2006 should be week 1');
    assert.equal(moment([2007,  0,  1]).week(), 1, 'Jan  1 2007 should be week 1');
    assert.equal(moment([2007,  0,  6]).week(), 1, 'Jan  6 2007 should be week 1');
    assert.equal(moment([2007,  0,  7]).week(), 2, 'Jan  7 2007 should be week 2');
    assert.equal(moment([2007,  0, 13]).week(), 2, 'Jan 13 2007 should be week 2');
    assert.equal(moment([2007,  0, 14]).week(), 3, 'Jan 14 2007 should be week 3');
});

test('weeks year starting tuesday', function (assert) {
    assert.equal(moment([2007, 11, 29]).week(), 52, 'Dec 29 2007 should be week 52');
    assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
    assert.equal(moment([2008,  0,  5]).week(), 1, 'Jan  5 2008 should be week 1');
    assert.equal(moment([2008,  0,  6]).week(), 2, 'Jan  6 2008 should be week 2');
    assert.equal(moment([2008,  0, 12]).week(), 2, 'Jan 12 2008 should be week 2');
    assert.equal(moment([2008,  0, 13]).week(), 3, 'Jan 13 2008 should be week 3');
});

test('weeks year starting wednesday', function (assert) {
    assert.equal(moment([2002, 11, 29]).week(), 1, 'Dec 29 2002 should be week 1');
    assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
    assert.equal(moment([2003,  0,  4]).week(), 1, 'Jan  4 2003 should be week 1');
    assert.equal(moment([2003,  0,  5]).week(), 2, 'Jan  5 2003 should be week 2');
    assert.equal(moment([2003,  0, 11]).week(), 2, 'Jan 11 2003 should be week 2');
    assert.equal(moment([2003,  0, 12]).week(), 3, 'Jan 12 2003 should be week 3');
});

test('weeks year starting thursday', function (assert) {
    assert.equal(moment([2008, 11, 28]).week(), 1, 'Dec 28 2008 should be week 1');
    assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
    assert.equal(moment([2009,  0,  3]).week(), 1, 'Jan  3 2009 should be week 1');
    assert.equal(moment([2009,  0,  4]).week(), 2, 'Jan  4 2009 should be week 2');
    assert.equal(moment([2009,  0, 10]).week(), 2, 'Jan 10 2009 should be week 2');
    assert.equal(moment([2009,  0, 11]).week(), 3, 'Jan 11 2009 should be week 3');
});

test('weeks year starting friday', function (assert) {
    assert.equal(moment([2009, 11, 27]).week(), 1, 'Dec 27 2009 should be week 1');
    assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
    assert.equal(moment([2010,  0,  2]).week(), 1, 'Jan  2 2010 should be week 1');
    assert.equal(moment([2010,  0,  3]).week(), 2, 'Jan  3 2010 should be week 2');
    assert.equal(moment([2010,  0,  9]).week(), 2, 'Jan  9 2010 should be week 2');
    assert.equal(moment([2010,  0, 10]).week(), 3, 'Jan 10 2010 should be week 3');
});

test('weeks year starting saturday', function (assert) {
    assert.equal(moment([2010, 11, 26]).week(), 1, 'Dec 26 2010 should be week 1');
    assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
    assert.equal(moment([2011,  0,  2]).week(), 2, 'Jan  2 2011 should be week 2');
    assert.equal(moment([2011,  0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
    assert.equal(moment([2011,  0,  9]).week(), 3, 'Jan  9 2011 should be week 3');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '੧ ੦੧ ੧', 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012, 0,  7]).format('w ww wo'), '੧ ੦੧ ੧', 'Jan  7 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'), '੨ ੦੨ ੨', 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012, 0, 14]).format('w ww wo'), '੨ ੦੨ ੨', 'Jan 14 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '੩ ੦੩ ੩', 'Jan 15 2012 should be week 3');
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

test('meridiem', function (assert) {
    var h, m, t1, t2;
    for (h = 0; h < 24; ++h) {
        for (m = 0; m < 60; m += 15) {
            t1 = moment.utc([2000, 0, 1, h, m]);
            t2 = moment(t1.format('A h:mm'), 'A h:mm');
            assert.equal(t2.format('HH:mm'), t1.format('HH:mm'),
                    'meridiem at ' + t1.format('HH:mm'));
        }
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
