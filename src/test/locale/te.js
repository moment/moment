import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('te');

test('parse', function (assert) {
    var tests = 'జనవరి జన._ఫిబ్రవరి ఫిబ్ర._మార్చి మార్చి_ఏప్రిల్ ఏప్రి._మే మే_జూన్ జూన్_జూలై జూలై_ఆగస్టు ఆగ._సెప్టెంబర్ సెప్._అక్టోబర్ అక్టో._నవంబర్ నవ._డిసెంబర్ డిసె.'.split('_'), i;
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
            ['dddd, Do తేదీ MMMM YYYY, a h:mm:ss',  'ఆదివారం, 14వ తేదీ ఫిబ్రవరి 2010, మధ్యాహ్నం 3:25:50'],
            ['ddd, a h గంటలు',                 'ఆది, మధ్యాహ్నం 3 గంటలు'],
            ['M Mo నెల MM MMMM MMM',                   '2 2వ నెల 02 ఫిబ్రవరి ఫిబ్ర.'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14వ 14'],
            ['d do dddd ddd dd',                   '0 0వ ఆదివారం ఆది ఆ'],
            ['DDD DDDo DDDD',                      '45 45వ 045'],
            ['w wo ww',                            '8 8వ 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'మధ్యాహ్నం మధ్యాహ్నం'],
            ['LTS',                                'మధ్యాహ్నం 3:25:50'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 ఫిబ్రవరి 2010'],
            ['LLL',                                '14 ఫిబ్రవరి 2010, మధ్యాహ్నం 3:25'],
            ['LLLL',                               'ఆదివారం, 14 ఫిబ్రవరి 2010, మధ్యాహ్నం 3:25'],
            ['l',                                  '14/2/2010'],
            ['ll',                                 '14 ఫిబ్ర. 2010'],
            ['lll',                                '14 ఫిబ్ర. 2010, మధ్యాహ్నం 3:25'],
            ['llll',                               'ఆది, 14 ఫిబ్ర. 2010, మధ్యాహ్నం 3:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1వ', '1వ');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2వ', '2వ');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3వ', '3వ');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4వ', '4వ');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5వ', '5వ');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6వ', '6వ');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7వ', '7వ');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8వ', '8వ');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9వ', '9వ');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10వ', '10వ');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11వ', '11వ');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12వ', '12వ');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13వ', '13వ');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14వ', '14వ');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15వ', '15వ');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16వ', '16వ');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17వ', '17వ');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18వ', '18వ');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19వ', '19వ');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20వ', '20వ');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21వ', '21వ');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22వ', '22వ');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23వ', '23వ');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24వ', '24వ');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25వ', '25వ');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26వ', '26వ');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27వ', '27వ');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28వ', '28వ');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29వ', '29వ');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30వ', '30వ');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31వ', '31వ');
});

test('format month', function (assert) {
    var expected = 'జనవరి జన._ఫిబ్రవరి ఫిబ్ర._మార్చి మార్చి_ఏప్రిల్ ఏప్రి._మే మే_జూన్ జూన్_జూలై జూలై_ఆగస్టు ఆగ._సెప్టెంబర్ సెప్._అక్టోబర్ అక్టో._నవంబర్ నవ._డిసెంబర్ డిసె.'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'ఆదివారం ఆది ఆ_సోమవారం సోమ సో_మంగళవారం మంగళ మం_బుధవారం బుధ బు_గురువారం గురు గు_శుక్రవారం శుక్ర శు_శనివారం శని శ'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'కొన్ని క్షణాలు', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'ఒక నిమిషం',      '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'ఒక నిమిషం',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 నిమిషాలు',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 నిమిషాలు',    '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ఒక గంట',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ఒక గంట',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 గంటలు',       '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 గంటలు',       '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 గంటలు',      '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ఒక రోజు',         '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ఒక రోజు',         '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 రోజులు',        '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ఒక రోజు',         '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 రోజులు',        '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 రోజులు',       '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'ఒక నెల',       '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'ఒక నెల',       '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'ఒక నెల',       '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 నెలలు',      '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 నెలలు',      '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 నెలలు',      '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'ఒక నెల',       '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 నెలలు',      '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'ఒక సంవత్సరం',        '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 సంవత్సరాలు',       '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'ఒక సంవత్సరం',        '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 సంవత్సరాలు',       '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'కొన్ని క్షణాలు లో',  'prefix');
    assert.equal(moment(0).from(30000), 'కొన్ని క్షణాలు క్రితం', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'కొన్ని క్షణాలు క్రితం',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'కొన్ని క్షణాలు లో', 'కొన్ని క్షణాలు లో');
    assert.equal(moment().add({d: 5}).fromNow(), '5 రోజులు లో', '5 రోజులు లో');
});

test('calendar day', function (assert) {
    var a = moment().hours(2).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                     'నేడు రాత్రి 2:00',     'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'నేడు రాత్రి 2:25',     'Now plus 25 min');
    assert.equal(moment(a).add({h: 3}).calendar(),       'నేడు ఉదయం 5:00',     'Now plus 3 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'రేపు రాత్రి 2:00',  'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'నేడు రాత్రి 1:00',     'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'నిన్న రాత్రి 2:00', 'yesterday at the same time');
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
        assert.equal(m.calendar(),       m.format('[గత] dddd[,] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[గత] dddd[,] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[గత] dddd[,] LT'),  'Today - ' + i + ' days end of day');
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
    assert.equal(moment([2011, 2, 23,  2, 30]).format('a'), 'రాత్రి', 'before dawn');
    assert.equal(moment([2011, 2, 23,  9, 30]).format('a'), 'ఉదయం', 'morning');
    assert.equal(moment([2011, 2, 23, 14, 30]).format('a'), 'మధ్యాహ్నం', 'during day');
    assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), 'సాయంత్రం', 'evening');
    assert.equal(moment([2011, 2, 23, 19, 30]).format('a'), 'సాయంత్రం', 'late evening');
    assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'రాత్రి', 'night');

    assert.equal(moment([2011, 2, 23,  2, 30]).format('A'), 'రాత్రి', 'before dawn');
    assert.equal(moment([2011, 2, 23,  9, 30]).format('A'), 'ఉదయం', 'morning');
    assert.equal(moment([2011, 2, 23, 14, 30]).format('A'), 'మధ్యాహ్నం', ' during day');
    assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), 'సాయంత్రం', 'evening');
    assert.equal(moment([2011, 2, 23, 19, 30]).format('A'), 'సాయంత్రం', 'late evening');
    assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'రాత్రి', 'night');
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
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1వ', 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012, 0,  7]).format('w ww wo'), '1 01 1వ', 'Jan  7 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'), '2 02 2వ', 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012, 0, 14]).format('w ww wo'), '2 02 2వ', 'Jan 14 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '3 03 3వ', 'Jan 15 2012 should be week 3');
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
