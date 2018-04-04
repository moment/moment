import {test} from '../qunit';
import {localeModule} from '../qunit-locale';
import moment from '../../moment';
localeModule('mn');

test('parse', function (assert) {
    var i,
        tests = 'Нэгдүгээр сар-1 сар_Хоёрдугаар сар-2 сар_Гуравдугаар сар-3 сар_Дөрөвдүгээр сар-4 сар_Тавдугаар сар-5 сар_Зургадугаар сар-6 сар_Долдугаар сар-7 сар_Наймдугаар сар-8 сар_Есдүгээр сар-9 сар_Аравдугаар сар-10 сар_Арван нэгдүгээр сар-11 сар_Арван хоёрдугаар сар-12 сар'.split('_');

    function equalTest(input, mmm, i) {
        assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
    }

    for (i = 0; i < 12; i++) {
        tests[i] = tests[i].split('-');
        equalTest(tests[i][0], 'MMM', i);
        equalTest(tests[i][1], 'MMM', i);
        equalTest(tests[i][0], 'MMMM', i);
        equalTest(tests[i][1], 'MMMM', i);
        equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
    }

    assert.equal(moment('5 сар 11 1989', ['MMM DD YYYY']).format('YYYY-MM-DD'), '1989-05-11');
    assert.equal(moment('1989 он, Арван хоёрдугаар сар 11', ['YYYY [он], MMMM DD']).format('YYYY-MM-DD'), '1989-12-11');
    assert.equal(moment('1989 оны 11 сарын 2', ['YYYY [оны] MMMM[ын] DD']).format('YYYY-MM-D'), '1989-11-2');
    assert.equal(moment('1989 оны 5 сарын 11 өдөр', ['YYYY [оны] MMMM[ын] Do']).format('YYYY-MM-DD'), '1989-05-11');
    assert.equal(moment('1989 оны 5 сарын 11 өдөр 11:25 ҮӨ', ['YYYY [оны] MMM[ын] Do h:mm a']).format('YYYY-MM-DD h:mm a'), '1989-05-11 11:25 ҮӨ');
    assert.equal(moment('2003 оны Дөрөвдүгээр сарын 11 өдөр 17:25 ҮХ', ['YYYY [оны] MMMM[ын] Do HH:mm a']).format('YYYY-MM-DD HH:mm a'), '2003-04-11 17:25 ҮХ');
});

test('format', function (assert) {
    var a = [
            ['dddd, MMMM[ын] Do YYYY, h:mm:ss a', 'Ням, Хоёрдугаар сарын 14 өдөр 2010, 3:25:50 ҮХ'],
            ['ddd, hA',                       'Ням, 3ҮХ'],
            ['M Mo MM MMMM MMM',              '2 2 02 Хоёрдугаар сар 2 сар'],
            ['YYYY YY',                       '2010 10'],
            ['D Do DD',                       '14 14 өдөр 14'],
            ['d do dddd ddd dd',              '0 0 өдөр Ням Ням Ня'],
            ['DDD DDDo DDDD',                 '45 45 өдөр 045'],
            ['w wo ww',                       '8 8 08'],
            ['h hh',                          '3 03'],
            ['H HH',                          '15 15'],
            ['m mm',                          '25 25'],
            ['s ss',                          '50 50'],
            ['a A',                           'ҮХ ҮХ'],
            ['[the] DDDo [day of the year]',  'the 45 өдөр day of the year'],
            ['LTS',                           '15:25:50'],
            ['L',                             '2010-02-14'],
            ['LL',                            '2010 оны Хоёрдугаар сарын 14'],
            ['LLL',                           '2010 оны Хоёрдугаар сарын 14 15:25'],
            ['LLLL',                          'Ням, 2010 оны Хоёрдугаар сарын 14 15:25'],
            ['l',                             '2010-2-14'],
            ['ll',                            '2010 оны 2 сарын 14'],
            ['lll',                           '2010 оны 2 сарын 14 15:25'],
            ['llll',                          'Ням, 2010 оны 2 сарын 14 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;

    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format meridiem', function (assert) {
    assert.equal(moment([2012, 11, 28, 0, 0]).format('A'), 'ҮӨ', 'AM');
    assert.equal(moment([2012, 11, 28, 11, 59]).format('A'), 'ҮӨ', 'AM');
    assert.equal(moment([2012, 11, 28, 12, 0]).format('A'), 'ҮХ', 'PM');
    assert.equal(moment([2012, 11, 28, 23, 59]).format('A'), 'ҮХ', 'PM');
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1 өдөр', '1st');
});

test('format month', function (assert) {
    var i,
        expected = 'Нэгдүгээр сар 1 сар_Хоёрдугаар сар 2 сар_Гуравдугаар сар 3 сар_Дөрөвдүгээр сар 4 сар_Тавдугаар сар 5 сар_Зургадугаар сар 6 сар_Долдугаар сар 7 сар_Наймдугаар сар 8 сар_Есдүгээр сар 9 сар_Аравдугаар сар 10 сар_Арван нэгдүгээр сар 11 сар_Арван хоёрдугаар сар 12 сар'.split('_');

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var i,
        expected = 'Ням Ням Ня_Даваа Дав Да_Мягмар Мяг Мя_Лхагва Лха Лх_Пүрэв Пүр Пү_Баасан Баа Ба_Бямба Бям Бя'.split('_');

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'хэдхэн секунд',   '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '1 минут',  '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '1 минут',  '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 минут',  '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 минут', '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '1 цаг',    '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '1 цаг',    '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 цаг',    '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 цаг',    '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 цаг',   '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '1 өдөр',   '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '1 өдөр',   '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 өдөр',   '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '1 өдөр',   '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 өдөр',   '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 өдөр',  '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '1 сар',    '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '1 сар',    '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '1 сар',    '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 сар',    '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 сар',    '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 сар',    '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '1 сар',    '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 сар',    '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '1 жил',    '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 жил',    '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '1 жил',    '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 жил',    '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'хэдхэн секундын дараа', 'prefix');
    assert.equal(moment(0).from(30000), 'хэдхэн секундын өмнө', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'хэдхэн секундын өмнө', 'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'хэдхэн секундын дараа', 'in a few seconds');
    assert.equal(moment().add({s: 50}).fromNow(), '1 минутын дараа', 'in a minute');
    assert.equal(moment().add({m: 5}).fromNow(), '5 минутын дараа', 'in 5 minutes');
    assert.equal(moment().add({h: 2}).fromNow(), '2 цагийн дараа', 'in 2 hours');
    assert.equal(moment().add({d: 5}).fromNow(), '5 өдрийн дараа', 'in 5 days');
    assert.equal(moment().add({M: 2}).fromNow(), '2 сарын дараа', 'in 2 months');
    assert.equal(moment().add({M: 15}).fromNow(), '1 жилийн дараа', 'in a year');
    assert.equal(moment().add({M: 16}).fromNow(), '1 жилийн дараа', 'in a year');
    assert.equal(moment().add({M: 23}).fromNow(), '2 жилийн дараа', 'in 2 years');
    assert.equal(moment().add({y: 7}).fromNow(), '7 жилийн дараа', 'in 7 years');

    assert.equal(moment().subtract({s: 30}).fromNow(), 'хэдхэн секундын өмнө', 'a few seconds ago');
    assert.equal(moment().subtract({s: 50}).fromNow(), '1 минутын өмнө', 'a minute ago');
    assert.equal(moment().subtract({m: 5}).fromNow(), '5 минутын өмнө', '5 minutes ago');
    assert.equal(moment().subtract({h: 2}).fromNow(), '2 цагийн өмнө', '2 hours ago');
    assert.equal(moment().subtract({d: 5}).fromNow(), '5 өдрийн өмнө', '5 days ago');
    assert.equal(moment().subtract({M: 2}).fromNow(), '2 сарын өмнө', '2 months ago');
    assert.equal(moment().subtract({M: 15}).fromNow(), '1 жилийн өмнө', 'a year ago');
    assert.equal(moment().subtract({M: 16}).fromNow(), '1 жилийн өмнө', 'a year ago');
    assert.equal(moment().subtract({M: 23}).fromNow(), '2 жилийн өмнө', '2 years ago');
    assert.equal(moment().subtract({y: 7}).fromNow(), '7 жилийн өмнө', '7 years ago');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'Өнөөдөр 12:00',   'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Өнөөдөр 12:25',   'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Өнөөдөр 13:00',   'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Маргааш 12:00',   'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Өнөөдөр 11:00',   'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Өчигдөр 12:00',   'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('[Ирэх] dddd LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[Ирэх] dddd LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[Ирэх] dddd LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('[Өнгөрсөн] dddd LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[Өнгөрсөн] dddd LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[Өнгөрсөн] dddd LT'),  'Today - ' + i + ' days end of day');
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

test('weeks year starting sunday format', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1', 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012, 0,  7]).format('w ww wo'), '1 01 1', 'Jan  7 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'), '2 02 2', 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012, 0, 14]).format('w ww wo'), '2 02 2', 'Jan 14 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '3 03 3', 'Jan 15 2012 should be week 3');
});

