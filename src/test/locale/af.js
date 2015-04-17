import {localeModule, test} from '../qunit';
import {moment} from '../../moment';
localeModule('af');

test('parse', function (assert) {
    var tests = 'Januarie Jan_Februarie Feb_Maart Mar_April Apr_Mei Mei_Junie Jun_Julie Jul_Augustus Aug_September Sep_Oktober Okt_November Nov_Desember Des'.split('_'), i;
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
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sondag, Februarie 14de 2010, 3:25:50 nm'],
            ['ddd, hA',                            'Son, 3NM'],
            ['M Mo MM MMMM MMM',                   '2 2de 02 Februarie Feb'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14de 14'],
            ['d do dddd ddd dd',                   '0 0de Sondag Son So'],
            ['DDD DDDo DDDD',                      '45 45ste 045'],
            ['w wo ww',                            '6 6de 06'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'nm NM'],
            ['[the] DDDo [day of the year]',       'the 45ste day of the year'],
            ['LT',                                 '15:25'],
            ['LTS',                                '15:25:50'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 Februarie 2010'],
            ['LLL',                                '14 Februarie 2010 15:25'],
            ['LLLL',                               'Sondag, 14 Februarie 2010 15:25'],
            ['l',                                  '14/2/2010'],
            ['ll',                                 '14 Feb 2010'],
            ['lll',                                '14 Feb 2010 15:25'],
            ['llll',                               'Son, 14 Feb 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1ste', '1ste');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2de', '2de');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3de', '3de');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4de', '4de');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5de', '5de');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6de', '6de');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7de', '7de');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8ste', '8ste');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9de', '9de');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10de', '10de');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11de', '11de');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12de', '12de');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13de', '13de');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14de', '14de');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15de', '15de');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16de', '16de');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17de', '17de');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18de', '18de');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19de', '19de');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20ste', '20ste');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21ste', '21ste');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22ste', '22ste');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23ste', '23ste');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24ste', '24ste');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25ste', '25ste');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26ste', '26ste');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27ste', '27ste');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28ste', '28ste');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29ste', '29ste');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30ste', '30ste');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31ste', '31ste');
});

test('format month', function (assert) {
    var expected = 'Januarie Jan_Februarie Feb_Maart Mar_April Apr_Mei Mei_Junie Jun_Julie Jul_Augustus Aug_September Sep_Oktober Okt_November Nov_Desember Des'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'Sondag Son So_Maandag Maa Ma_Dinsdag Din Di_Woensdag Woe Wo_Donderdag Don Do_Vrydag Vry Vr_Saterdag Sat Sa'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '\'n paar sekondes', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '\'n minuut',      '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '\'n minuut',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minute',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minute',    '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '\'n uur',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '\'n uur',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ure',       '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ure',       '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ure',      '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '\'n dag',         '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '\'n dag',         '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dae',        '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '\'n dag',         '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dae',        '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dae',       '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '\'n maand',       '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '\'n maand',       '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '\'n maand',       '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 maande',      '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 maande',      '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 maande',      '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '\'n maand',       '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 maande',      '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '\'n jaar',        '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 jaar',       '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '\'n jaar',        '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 jaar',       '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'oor \'n paar sekondes',  'prefix');
    assert.equal(moment(0).from(30000), '\'n paar sekondes gelede', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), '\'n paar sekondes gelede',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'oor \'n paar sekondes', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(), 'oor 5 dae', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(2).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'Vandag om 02:00',     'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Vandag om 02:25',     'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Vandag om 03:00',     'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Môre om 02:00',    'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Vandag om 01:00',     'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Gister om 02:00',   'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('[Laas] dddd [om] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[Laas] dddd [om] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[Laas] dddd [om] LT'),  'Today - ' + i + ' days end of day');
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
    assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
});

test('weeks year starting monday', function (assert) {
    assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
    assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
    assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
    assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
    assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
});

test('weeks year starting tuesday', function (assert) {
    assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
    assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
    assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
    assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
    assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
    assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
});

test('weeks year starting wednesday', function (assert) {
    assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
    assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
    assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
    assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
    assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
    assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
});

test('weeks year starting thursday', function (assert) {
    assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
    assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
    assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
    assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
    assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
    assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
});

test('weeks year starting friday', function (assert) {
    assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
    assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
    assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
    assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
    assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
    assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
});

test('weeks year starting saturday', function (assert) {
    assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
    assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
    assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
    assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
    assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
    assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52ste', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1ste', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1ste', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0,  9]).format('w ww wo'),    '2 02 2de', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'),    '2 02 2de', 'Jan 15 2012 should be week 2');
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
