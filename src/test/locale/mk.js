import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('mk');

test('parse', function (assert) {
    var tests = 'јануари јан_февруари фев_март мар_април апр_мај мај_јуни јун_јули јул_август авг_септември сеп_октомври окт_ноември ное_декември дек'.split('_'), i;
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
            ['dddd, MMMM Do YYYY, H:mm:ss',        'недела, февруари 14-ти 2010, 15:25:50'],
            ['ddd, hA',                            'нед, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2-ри 02 февруари фев'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14-ти 14'],
            ['d do dddd ddd dd',                   '0 0-ев недела нед нe'],
            ['DDD DDDo DDDD',                      '45 45-ти 045'],
            ['w wo ww',                            '7 7-ми 07'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['[the] DDDo [day of the year]',       'the 45-ти day of the year'],
            ['LTS',                                '15:25:50'],
            ['L',                                  '14.02.2010'],
            ['LL',                                 '14 февруари 2010'],
            ['LLL',                                '14 февруари 2010 15:25'],
            ['LLLL',                               'недела, 14 февруари 2010 15:25'],
            ['l',                                  '14.2.2010'],
            ['ll',                                 '14 фев 2010'],
            ['lll',                                '14 фев 2010 15:25'],
            ['llll',                               'нед, 14 фев 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-ви', '1-ви');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-ри', '2-ри');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-ти', '3-ти');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-ти', '4-ти');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-ти', '5-ти');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-ти', '6-ти');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-ми', '7-ми');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-ми', '8-ми');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-ти', '9-ти');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-ти', '10-ти');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-ти', '11-ти');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-ти', '12-ти');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-ти', '13-ти');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-ти', '14-ти');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-ти', '15-ти');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-ти', '16-ти');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-ти', '17-ти');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-ти', '18-ти');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-ти', '19-ти');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-ти', '20-ти');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-ви', '21-ви');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-ри', '22-ри');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-ти', '23-ти');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-ти', '24-ти');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-ти', '25-ти');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-ти', '26-ти');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-ми', '27-ми');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-ми', '28-ми');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-ти', '29-ти');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-ти', '30-ти');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-ви', '31-ви');
});

test('format month', function (assert) {
    var expected = 'јануари јан_февруари фев_март мар_април апр_мај мај_јуни јун_јули јул_август авг_септември сеп_октомври окт_ноември ное_декември дек'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'недела нед нe_понеделник пон пo_вторник вто вт_среда сре ср_четврток чет че_петок пет пе_сабота саб сa'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'неколку секунди', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'минута',          '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'минута',          '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 минути',        '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 минути',       '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'час',             '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'час',             '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 часа',          '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 часа',          '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 часа',         '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ден',             '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ден',             '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 дена',          '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ден',             '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 дена',          '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 дена',         '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'месец',           '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'месец',           '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'месец',           '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 месеци',        '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 месеци',        '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 месеци',        '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'месец',           '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 месеци',        '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'година',          '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 години',        '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'година',          '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 години',        '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'после неколку секунди', 'prefix');
    assert.equal(moment(0).from(30000), 'пред неколку секунди',  'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'пред неколку секунди',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'после неколку секунди', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(),  'после 5 дена', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(2).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'Денес во 2:00',  'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Денес во 2:25',  'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Денес во 3:00',  'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Утре во 2:00',  'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Денес во 1:00',  'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Вчера во 2:00', 'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('[Во] dddd [во] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[Во] dddd [во] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[Во] dddd [во] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;

    function makeFormat(d) {
        switch (d.day()) {
        case 0:
        case 3:
        case 6:
            return '[Изминатата] dddd [во] LT';
        case 1:
        case 2:
        case 4:
        case 5:
            return '[Изминатиот] dddd [во] LT';
        }
    }

    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days end of day');
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

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-ви', 'Dec 26 2011 should be week 1');
    assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-ви', 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2-ри', 'Jan  2 2012 should be week 2');
    assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2-ри', 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-ти', 'Jan  9 2012 should be week 3');
});

