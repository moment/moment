import {test} from '../qunit';
import {localeModule} from '../qunit-locale';
import moment from '../../moment';
localeModule('ur');

var months = [
    'جنوری',
    'فروری',
    'مارچ',
    'اپریل',
    'مئی',
    'جون',
    'جولائی',
    'اگست',
    'ستمبر',
    'اکتوبر',
    'نومبر',
    'دسمبر'
];
var days = [
    'اتوار',
    'پیر',
    'منگل',
    'بدھ',
    'جمعرات',
    'جمعہ',
    'ہفتہ'
];

test('parse', function (assert) {
    function equalTest(input, mmm, i) {
        assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
    }
    for (var i = 0; i < 12; i++) {
        equalTest(months[i], 'MMM', i);
        equalTest(months[i], 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'اتوار، فروری 14 2010، 3:25:50 شام'],
            ['ddd, hA',                            'اتوار، 3شام'],
            ['M Mo MM MMMM MMM',                   '2 2 02 فروری فروری'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14 14'],
            ['d do dddd ddd dd',                   '0 0 اتوار اتوار اتوار'],
            ['DDD DDDo DDDD',                      '45 45 045'],
            ['w wo ww',                            '6 6 06'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'شام شام'],
            ['[سال کا] DDDo[واں دن]',       'سال کا 45واں دن'],
            ['LTS',                                '15:25:50'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 فروری 2010'],
            ['LLL',                                '14 فروری 2010 15:25'],
            ['LLLL',                               'اتوار، 14 فروری 2010 15:25'],
            ['l',                                  '14/2/2010'],
            ['ll',                                 '14 فروری 2010'],
            ['lll',                                '14 فروری 2010 15:25'],
            ['llll',                               'اتوار، 14 فروری 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1', '1');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31');
});

test('format month', function (assert) {
    for (var i = 0; i < months.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), months[i] + ' ' + months[i], months[i] + ' ' + months[i]);
    }
});

test('format week', function (assert) {
    for (var i = 0; i < days.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), days[i] + ' ' + days[i] + ' ' + days[i], days[i] + ' ' + days[i] + ' ' + days[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'چند سیکنڈ', '44 seconds = چند سیکنڈ');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'ایک منٹ',      '45 seconds = ایک منٹ');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'ایک منٹ',      '89 seconds = ایک منٹ');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 منٹ',     '90 seconds = 2 منٹ');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 منٹ',    '44 minutes = 44 منٹ');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ایک گھنٹہ',       '45 minutes = ایک گھنٹہ');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ایک گھنٹہ',       '89 minutes = ایک گھنٹہ');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 گھنٹے',       '90 minutes = 2 گھنٹے');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 گھنٹے',       '5 hours = 5 گھنٹے');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 گھنٹے',      '21 hours = 21 گھنٹے');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ایک دن',         '22 hours = ایک دن');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ایک دن',         '35 hours = ایک دن');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 دن',        '36 hours = 2 دن');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ایک دن',         '1 day = ایک دن');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 دن',        '5 days = 5 دن');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 دن',       '25 days = 25 دن');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'ایک ماہ',       '26 days = ایک ماہ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'ایک ماہ',       '30 days = ایک ماہ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'ایک ماہ',       '43 days = ایک ماہ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 ماہ',      '46 days = 2 ماہ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 ماہ',      '75 days = 2 ماہ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 ماہ',      '76 days = 3 ماہ');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'ایک ماہ',       '1 month = ایک ماہ');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 ماہ',      '5 months = 5 ماہ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'ایک سال',        '345 days = ایک سال');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 سال',       '548 days = 2 سال');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'ایک سال',        '1 year = ایک سال');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 سال',       '5 years = 5 سال');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'چند سیکنڈ بعد',  'prefix');
    assert.equal(moment(0).from(30000), 'چند سیکنڈ قبل', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'چند سیکنڈ قبل',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'چند سیکنڈ بعد', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(), '5 دن بعد', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'آج بوقت 12:00',      'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'آج بوقت 12:25',      'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'آج بوقت 13:00',      'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'کل بوقت 12:00',   'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'آج بوقت 11:00',      'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'گذشتہ روز بوقت 12:00',  'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd [بوقت] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [بوقت] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [بوقت] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('[گذشتہ] dddd [بوقت] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[گذشتہ] dddd [بوقت] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[گذشتہ] dddd [بوقت] LT'),  'Today - ' + i + ' days end of day');
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
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2', 'Jan 15 2012 should be week 2');
});
