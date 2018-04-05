import {test} from '../qunit';
import {localeModule} from '../qunit-locale';
import moment from '../../moment';
localeModule('uk');

test('parse', function (assert) {
    var tests = 'січень січ_лютий лют_березень бер_квітень квіт_травень трав_червень черв_липень лип_серпень серп_вересень вер_жовтень жовт_листопад лист_грудень груд'.split('_'), i;
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
            ['dddd, Do MMMM YYYY, HH:mm:ss',       'неділя, 14-го лютого 2010, 15:25:50'],
            ['ddd, h A',                           'нд, 3 дня'],
            ['M Mo MM MMMM MMM',                   '2 2-й 02 лютий лют'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14-го 14'],
            ['d do dddd ddd dd',                   '0 0-й неділя нд нд'],
            ['DDD DDDo DDDD',                      '45 45-й 045'],
            ['w wo ww',                            '7 7-й 07'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'дня дня'],
            ['DDDo [день року]',                  '45-й день року'],
            ['LTS',                                '15:25:50'],
            ['L',                                  '14.02.2010'],
            ['LL',                                 '14 лютого 2010 р.'],
            ['LLL',                                '14 лютого 2010 р., 15:25'],
            ['LLLL',                               'неділя, 14 лютого 2010 р., 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format meridiem', function (assert) {
    assert.equal(moment([2012, 11, 28, 0, 0]).format('A'), 'ночі', 'night');
    assert.equal(moment([2012, 11, 28, 3, 59]).format('A'), 'ночі', 'night');
    assert.equal(moment([2012, 11, 28, 4, 0]).format('A'), 'ранку', 'morning');
    assert.equal(moment([2012, 11, 28, 11, 59]).format('A'), 'ранку', 'morning');
    assert.equal(moment([2012, 11, 28, 12, 0]).format('A'), 'дня', 'afternoon');
    assert.equal(moment([2012, 11, 28, 16, 59]).format('A'), 'дня', 'afternoon');
    assert.equal(moment([2012, 11, 28, 17, 0]).format('A'), 'вечора', 'evening');
    assert.equal(moment([2012, 11, 28, 23, 59]).format('A'), 'вечора', 'evening');
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-й', '1-й');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-й', '2-й');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-й', '3-й');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-й', '4-й');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-й', '5-й');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-й', '6-й');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-й', '7-й');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-й', '8-й');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-й', '9-й');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-й', '10-й');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-й', '11-й');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-й', '12-й');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-й', '13-й');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-й', '14-й');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-й', '15-й');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-й', '16-й');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-й', '17-й');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-й', '18-й');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-й', '19-й');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-й', '20-й');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-й', '21-й');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-й', '22-й');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-й', '23-й');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-й', '24-й');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-й', '25-й');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-й', '26-й');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-й', '27-й');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-й', '28-й');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-й', '29-й');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-й', '30-й');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-й', '31-й');
});

test('format month', function (assert) {
    var expected = 'січень січ_лютий лют_березень бер_квітень квіт_травень трав_червень черв_липень лип_серпень серп_вересень вер_жовтень жовт_листопад лист_грудень груд'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format month case', function (assert) {
    var months = {
        'nominative': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_'),
        'accusative': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_')
    }, i;
    for (i = 0; i < 12; i++) {
        assert.equal(moment([2011, i, 1]).format('D MMMM'), '1 ' + months.accusative[i], '1 ' + months.accusative[i]);
        assert.equal(moment([2011, i, 1]).format('MMMM'), months.nominative[i], '1 ' + months.nominative[i]);
    }
});

test('format week', function (assert) {
    var expected = 'неділя нд нд_понеділок пн пн_вівторок вт вт_середа ср ср_четвер чт чт_п’ятниця пт пт_субота сб сб'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'декілька секунд',    '44 seconds = seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'хвилина',   '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'хвилина',   '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 хвилини',  '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 хвилини', '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'годину',    '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'годину',    '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 години',    '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 годин',    '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 година',   '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'день',      '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'день',      '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 дні',     '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'день',      '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 днів',     '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 11}), true),  '11 днів',     '11 days = 11 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 21}), true),  '21 день',     '21 days = 21 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 днів',    '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'місяць',    '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'місяць',    '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'місяць',    '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 місяці',   '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 місяці',   '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 місяці',   '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'місяць',    '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 місяців',   '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'рік',     '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 роки',    '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'рік',     '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 років',    '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'за декілька секунд', 'prefix');
    assert.equal(moment(0).from(30000), 'декілька секунд тому', 'suffix');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'за декілька секунд', 'in seconds');
    assert.equal(moment().add({d: 5}).fromNow(), 'за 5 днів', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'Сьогодні о 12:00',   'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Сьогодні о 12:25',   'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Сьогодні о 13:00',   'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Завтра о 12:00',     'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 2}).calendar(),  'Сьогодні о 10:00',   'Now minus 2 hours');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Вчора о 12:00',      'yesterday at the same time');
    // A special case for Ukrainian since 11 hours have different preposition
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Сьогодні об 11:00',  'same day at 11 o\'clock');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('[У] dddd [о' + (m.hours() === 11 ? 'б' : '') + '] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[У] dddd [о] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[У] dddd [о] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;

    function makeFormat(d) {
        switch (d.day()) {
            case 0:
            case 3:
            case 5:
            case 6:
                return '[Минулої] dddd [о' + (d.hours() === 11 ? 'б' : '') + '] LT';
            case 1:
            case 2:
            case 4:
                return '[Минулого] dddd [о' + (d.hours() === 11 ? 'б' : '') + '] LT';
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
    assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-й', 'Dec 26 2011 should be week 1');
    assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-й', 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2-й', 'Jan  2 2012 should be week 2');
    assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2-й', 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-й', 'Jan  9 2012 should be week 3');
});

