import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('en');

test('parse', function (assert) {
    var i,
        tests = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split('_');

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
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sunday, February 14th 2010, 3:25:50 pm'],
            ['ddd, hA',                            'Sun, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2nd 02 February Feb'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14th 14'],
            ['d do dddd ddd dd',                   '0 0th Sunday Sun Su'],
            ['DDD DDDo DDDD',                      '45 45th 045'],
            ['w wo ww',                            '8 8th 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['[the] DDDo [day of the year]',       'the 45th day of the year'],
            ['LTS',                                '3:25:50 PM'],
            ['L',                                  '02/14/2010'],
            ['LL',                                 'February 14, 2010'],
            ['LLL',                                'February 14, 2010 3:25 PM'],
            ['LLLL',                               'Sunday, February 14, 2010 3:25 PM'],
            ['l',                                  '2/14/2010'],
            ['ll',                                 'Feb 14, 2010'],
            ['lll',                                'Feb 14, 2010 3:25 PM'],
            ['llll',                               'Sun, Feb 14, 2010 3:25 PM']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;

    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1st', '1st');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2nd', '2nd');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3rd', '3rd');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4th', '4th');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5th', '5th');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6th', '6th');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7th', '7th');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8th', '8th');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9th', '9th');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10th', '10th');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11th', '11th');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12th', '12th');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13th', '13th');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14th', '14th');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15th', '15th');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16th', '16th');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17th', '17th');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18th', '18th');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19th', '19th');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20th', '20th');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21st', '21st');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22nd', '22nd');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23rd', '23rd');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24th', '24th');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25th', '25th');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26th', '26th');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27th', '27th');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28th', '28th');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29th', '29th');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30th', '30th');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31st', '31st');
});

test('format month', function (assert) {
    var i,
        expected = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split('_');

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var i,
        expected = 'Sunday Sun Su_Monday Mon Mo_Tuesday Tue Tu_Wednesday Wed We_Thursday Thu Th_Friday Fri Fr_Saturday Sat Sa'.split('_');

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);

    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'a few seconds', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'a minute',      '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'a minute',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutes',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutes',    '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'an hour',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'an hour',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 hours',       '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 hours',       '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 hours',      '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'a day',         '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'a day',         '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 days',        '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'a day',         '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 days',        '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 days',       '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'a month',       '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'a month',       '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'a month',       '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 months',      '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 months',      '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 months',      '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'a month',       '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 months',      '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'a year',        '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 years',       '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'a year',        '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 years',       '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'in a few seconds',  'prefix');
    assert.equal(moment(0).from(30000), 'a few seconds ago', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'a few seconds ago',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'in a few seconds', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(), 'in 5 days', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(2).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                     'Today at 2:00 AM',     'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Today at 2:25 AM',     'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Today at 3:00 AM',     'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Tomorrow at 2:00 AM',  'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Today at 1:00 AM',     'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Yesterday at 2:00 AM', 'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days end of day');
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

test('weeks year starting sunday format', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1st', 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012, 0,  7]).format('w ww wo'), '1 01 1st', 'Jan  7 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'), '2 02 2nd', 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012, 0, 14]).format('w ww wo'), '2 02 2nd', 'Jan 14 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '3 03 3rd', 'Jan 15 2012 should be week 3');
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
