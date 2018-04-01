import {test} from '../qunit';
import {localeModule} from '../qunit-locale';
import moment from '../../moment';
localeModule('lb');

test('parse', function (assert) {
    var tests = 'Januar Jan._Februar Febr._Mäerz Mrz._Abrëll Abr._Mee Mee_Juni Jun._Juli Jul._August Aug._September Sept._Oktober Okt._November Nov._Dezember Dez.'.split('_'), i;

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
            ['dddd, Do MMMM YYYY, HH:mm:ss', 'Sonndeg, 14. Februar 2010, 15:25:50'],
            ['ddd, HH:mm', 'So., 15:25'],
            ['M Mo MM MMMM MMM', '2 2. 02 Februar Febr.'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14. 14'],
            ['d do dddd ddd dd', '0 0. Sonndeg So. So'],
            ['DDD DDDo DDDD', '45 45. 045'],
            ['w wo ww', '6 6. 06'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'pm PM'],
            ['[the] DDDo [day of the year]', 'the 45. day of the year'],
            ['LTS', '15:25:50 Auer'],
            ['L', '14.02.2010'],
            ['LL', '14. Februar 2010'],
            ['LLL', '14. Februar 2010 15:25 Auer'],
            ['LLLL', 'Sonndeg, 14. Februar 2010 15:25 Auer'],
            ['l', '14.2.2010'],
            ['ll', '14. Febr. 2010'],
            ['lll', '14. Febr. 2010 15:25 Auer'],
            ['llll', 'So., 14. Febr. 2010 15:25 Auer']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format month', function (assert) {
    var expected = 'Januar Jan._Februar Febr._Mäerz Mrz._Abrëll Abr._Mee Mee_Juni Jun._Juli Jul._August Aug._September Sept._Oktober Okt._November Nov._Dezember Dez.'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'Sonndeg So. So_Méindeg Mé. Mé_Dënschdeg Dë. Dë_Mëttwoch Më. Më_Donneschdeg Do. Do_Freideg Fr. Fr_Samschdeg Sa. Sa'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true), 'e puer Sekonnen', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true), 'eng Minutt', '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true), 'eng Minutt', '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true), '2 Minutten', '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true), '44 Minutten', '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true), 'eng Stonn', '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true), 'eng Stonn', '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true), '2 Stonnen', '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true), '5 Stonnen', '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true), '21 Stonnen', '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true), 'een Dag', '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true), 'een Dag', '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true), '2 Deeg', '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true), 'een Dag', '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true), '5 Deeg', '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true), '25 Deeg', '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true), 'ee Mount', '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true), 'ee Mount', '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true), 'ee Mount', '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true), '2 Méint', '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true), '2 Méint', '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true), '3 Méint', '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true), 'ee Mount', '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true), '5 Méint', '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'ee Joer', '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 Joer', '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true), 'ee Joer', '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true), '5 Joer', '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'an e puer Sekonnen', 'prefix');
    assert.equal(moment(0).from(30000), 'virun e puer Sekonnen', 'suffix');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'an e puer Sekonnen', 'in a few seconds');
    assert.equal(moment().add({d: 1}).fromNow(), 'an engem Dag', 'in one day');
    assert.equal(moment().add({d: 2}).fromNow(), 'an 2 Deeg', 'in 2 days');
    assert.equal(moment().add({d: 3}).fromNow(), 'an 3 Deeg', 'in 3 days');
    assert.equal(moment().add({d: 4}).fromNow(), 'a 4 Deeg', 'in 4 days');
    assert.equal(moment().add({d: 5}).fromNow(), 'a 5 Deeg', 'in 5 days');
    assert.equal(moment().add({d: 6}).fromNow(), 'a 6 Deeg', 'in 6 days');
    assert.equal(moment().add({d: 7}).fromNow(), 'a 7 Deeg', 'in 7 days');
    assert.equal(moment().add({d: 8}).fromNow(), 'an 8 Deeg', 'in 8 days');
    assert.equal(moment().add({d: 9}).fromNow(), 'an 9 Deeg', 'in 9 days');
    assert.equal(moment().add({d: 10}).fromNow(), 'an 10 Deeg', 'in 10 days');
    assert.equal(moment().add({y: 100}).fromNow(), 'an 100 Joer', 'in 100 years');
    assert.equal(moment().add({y: 400}).fromNow(), 'a 400 Joer', 'in 400 years');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'Haut um 12:00 Auer',     'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Haut um 12:25 Auer',     'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Haut um 13:00 Auer',     'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Muer um 12:00 Auer',     'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Haut um 11:00 Auer',     'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Gëschter um 12:00 Auer', 'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd [um] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [um] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [um] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m, weekday, datestring;
    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});

        // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday)
        weekday = parseInt(m.format('d'), 10);
        datestring = (weekday === 2 || weekday === 4 ? '[Leschten] dddd [um] LT' : '[Leschte] dddd [um] LT');

        assert.equal(m.calendar(), m.format(datestring), 'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(), m.format(datestring), 'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(), m.format(datestring), 'Today + ' + i + ' days end of day');
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
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0,  7]).format('w ww wo'), '1 01 1.',   'Jan  7 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'), '1 01 1.',   'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0, 14]).format('w ww wo'), '2 02 2.',   'Jan 14 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '2 02 2.',   'Jan 15 2012 should be week 2');
});
