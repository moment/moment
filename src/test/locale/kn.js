import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('kn');

test('parse', function (assert) {
    var tests = 'ಜನವರಿ ಜನ_ಫೆಬ್ರವರಿ ಫೆಬ್ರ_ಮಾರ್ಚ್ ಮಾರ್ಚ್_ಏಪ್ರಿಲ್ ಏಪ್ರಿಲ್_ಮೇ ಮೇ_ಜೂನ್ ಜೂನ್_ಜುಲೈ ಜುಲೈ_ಆಗಸ್ಟ್ ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್ ಸೆಪ್ಟೆಂಬ_ಅಕ್ಟೋಬರ್ ಅಕ್ಟೋಬ_ನವೆಂಬರ್ ನವೆಂಬ_ಡಿಸೆಂಬರ್ ಡಿಸೆಂಬ'.split('_'), i;
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
            ['dddd, Do MMMM YYYY, a h:mm:ss',      'ಭಾನುವಾರ, ೧೪ನೇ ಫೆಬ್ರವರಿ ೨೦೧೦, ಮಧ್ಯಾಹ್ನ ೩:೨೫:೫೦'],
            ['ddd, a h ಗಂಟೆ',                      'ಭಾನು, ಮಧ್ಯಾಹ್ನ ೩ ಗಂಟೆ'],
            ['M Mo MM MMMM MMM',                   '೨ ೨ನೇ ೦೨ ಫೆಬ್ರವರಿ ಫೆಬ್ರ'],
            ['YYYY YY',                            '೨೦೧೦ ೧೦'],
            ['D Do DD',                            '೧೪ ೧೪ನೇ ೧೪'],
            ['d do dddd ddd dd',                   '೦ ೦ನೇ ಭಾನುವಾರ ಭಾನು ಭಾ'],
            ['DDD DDDo DDDD',                      '೪೫ ೪೫ನೇ ೦೪೫'],
            ['w wo ww',                            '೮ ೮ನೇ ೦೮'],
            ['h hh',                               '೩ ೦೩'],
            ['H HH',                               '೧೫ ೧೫'],
            ['m mm',                               '೨೫ ೨೫'],
            ['s ss',                               '೫೦ ೫೦'],
            ['a A',                                'ಮಧ್ಯಾಹ್ನ ಮಧ್ಯಾಹ್ನ'],
            ['LTS',                                'ಮಧ್ಯಾಹ್ನ ೩:೨೫:೫೦'],
            ['L',                                  '೧೪/೦೨/೨೦೧೦'],
            ['LL',                                 '೧೪ ಫೆಬ್ರವರಿ ೨೦೧೦'],
            ['LLL',                                '೧೪ ಫೆಬ್ರವರಿ ೨೦೧೦, ಮಧ್ಯಾಹ್ನ ೩:೨೫'],
            ['LLLL',                               'ಭಾನುವಾರ, ೧೪ ಫೆಬ್ರವರಿ ೨೦೧೦, ಮಧ್ಯಾಹ್ನ ೩:೨೫'],
            ['l',                                  '೧೪/೨/೨೦೧೦'],
            ['ll',                                 '೧೪ ಫೆಬ್ರ ೨೦೧೦'],
            ['lll',                                '೧೪ ಫೆಬ್ರ ೨೦೧೦, ಮಧ್ಯಾಹ್ನ ೩:೨೫'],
            ['llll',                               'ಭಾನು, ೧೪ ಫೆಬ್ರ ೨೦೧೦, ಮಧ್ಯಾಹ್ನ ೩:೨೫']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '೧ನೇ', '೧ನೇ');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '೨ನೇ', '೨ನೇ');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '೩ನೇ', '೩ನೇ');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '೪ನೇ', '೪ನೇ');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '೫ನೇ', '೫ನೇ');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '೬ನೇ', '೬ನೇ');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '೭ನೇ', '೭ನೇ');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '೮ನೇ', '೮ನೇ');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '೯ನೇ', '೯ನೇ');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '೧೦ನೇ', '೧೦ನೇ');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '೧೧ನೇ', '೧೧ನೇ');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '೧೨ನೇ', '೧೨ನೇ');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '೧೩ನೇ', '೧೩ನೇ');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '೧೪ನೇ', '೧೪ನೇ');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '೧೫ನೇ', '೧೫ನೇ');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '೧೬ನೇ', '೧೬ನೇ');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '೧೭ನೇ', '೧೭ನೇ');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '೧೮ನೇ', '೧೮ನೇ');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '೧೯ನೇ', '೧೯ನೇ');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '೨೦ನೇ', '೨೦ನೇ');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '೨೧ನೇ', '೨೧ನೇ');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '೨೨ನೇ', '೨೨ನೇ');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '೨೩ನೇ', '೨೩ನೇ');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '೨೪ನೇ', '೨೪ನೇ');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '೨೫ನೇ', '೨೫ನೇ');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '೨೬ನೇ', '೨೬ನೇ');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '೨೭ನೇ', '೨೭ನೇ');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '೨೮ನೇ', '೨೮ನೇ');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '೨೯ನೇ', '೨೯ನೇ');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '೩೦ನೇ', '೩೦ನೇ');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '೩೧ನೇ', '೩೧ನೇ');
});

test('format month', function (assert) {
    var expected = 'ಜನವರಿ ಜನ_ಫೆಬ್ರವರಿ ಫೆಬ್ರ_ಮಾರ್ಚ್ ಮಾರ್ಚ್_ಏಪ್ರಿಲ್ ಏಪ್ರಿಲ್_ಮೇ ಮೇ_ಜೂನ್ ಜೂನ್_ಜುಲೈ ಜುಲೈ_ಆಗಸ್ಟ್ ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್ ಸೆಪ್ಟೆಂಬ_ಅಕ್ಟೋಬರ್ ಅಕ್ಟೋಬ_ನವೆಂಬರ್ ನವೆಂಬ_ಡಿಸೆಂಬರ್ ಡಿಸೆಂಬ'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'ಭಾನುವಾರ ಭಾನು ಭಾ_ಸೋಮವಾರ ಸೋಮ ಸೋ_ಮಂಗಳವಾರ ಮಂಗಳ ಮಂ_ಬುಧವಾರ ಬುಧ ಬು_ಗುರುವಾರ ಗುರು ಗು_ಶುಕ್ರವಾರ ಶುಕ್ರ ಶು_ಶನಿವಾರ ಶನಿ ಶ'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'ಕೆಲವು ಕ್ಷಣಗಳು', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'ಒಂದು ನಿಮಿಷ',      '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'ಒಂದು ನಿಮಿಷ',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '೨ ನಿಮಿಷ',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '೪೪ ನಿಮಿಷ',    '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ಒಂದು ಗಂಟೆ',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ಒಂದು ಗಂಟೆ',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '೨ ಗಂಟೆ',       '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '೫ ಗಂಟೆ',       '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '೨೧ ಗಂಟೆ',      '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ಒಂದು ದಿನ',         '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ಒಂದು ದಿನ',         '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '೨ ದಿನ',        '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ಒಂದು ದಿನ',         '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '೫ ದಿನ',        '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '೨೫ ದಿನ',       '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'ಒಂದು ತಿಂಗಳು',       '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'ಒಂದು ತಿಂಗಳು',       '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'ಒಂದು ತಿಂಗಳು',       '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '೨ ತಿಂಗಳು',      '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '೨ ತಿಂಗಳು',      '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '೩ ತಿಂಗಳು',      '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'ಒಂದು ತಿಂಗಳು',       '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '೫ ತಿಂಗಳು',      '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'ಒಂದು ವರ್ಷ',        '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '೨ ವರ್ಷ',       '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'ಒಂದು ವರ್ಷ',        '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '೫ ವರ್ಷ',       '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'ಕೆಲವು ಕ್ಷಣಗಳು ನಂತರ',  'prefix');
    assert.equal(moment(0).from(30000), 'ಕೆಲವು ಕ್ಷಣಗಳು ಹಿಂದೆ', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'ಕೆಲವು ಕ್ಷಣಗಳು ಹಿಂದೆ',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'ಕೆಲವು ಕ್ಷಣಗಳು ನಂತರ', 'ಕೆಲವು ಕ್ಷಣಗಳು ನಂತರ');
    assert.equal(moment().add({d: 5}).fromNow(), '೫ ದಿನ ನಂತರ', '೫ ದಿನ ನಂತರ');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'ಇಂದು ಮಧ್ಯಾಹ್ನ ೧೨:೦೦',    'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'ಇಂದು ಮಧ್ಯಾಹ್ನ ೧೨:೨೫',    'Now plus 25 min');
    assert.equal(moment(a).add({h: 3}).calendar(),       'ಇಂದು ಮಧ್ಯಾಹ್ನ ೩:೦೦',     'Now plus 3 hours');
    assert.equal(moment(a).add({d: 1}).calendar(),       'ನಾಳೆ ಮಧ್ಯಾಹ್ನ ೧೨:೦೦',    'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'ಇಂದು ಮಧ್ಯಾಹ್ನ ೧೧:೦೦',    'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'ನಿನ್ನೆ ಮಧ್ಯಾಹ್ನ ೧೨:೦೦',    'yesterday at the same time');
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
        assert.equal(m.calendar(),       m.format('[ಕೊನೆಯ] dddd[,] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[ಕೊನೆಯ] dddd[,] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[ಕೊನೆಯ] dddd[,] LT'),  'Today - ' + i + ' days end of day');
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

test('meridiem', function (assert) {
    assert.equal(moment([2011, 2, 23,  2, 30]).format('a'), 'ರಾತ್ರಿ', 'before dawn');
    assert.equal(moment([2011, 2, 23,  9, 30]).format('a'), 'ಬೆಳಿಗ್ಗೆ', 'morning');
    assert.equal(moment([2011, 2, 23, 14, 30]).format('a'), 'ಮಧ್ಯಾಹ್ನ', 'during day');
    assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), 'ಸಂಜೆ', 'evening');
    assert.equal(moment([2011, 2, 23, 19, 30]).format('a'), 'ಸಂಜೆ', 'late evening');
    assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'ರಾತ್ರಿ', 'night');

    assert.equal(moment([2011, 2, 23,  2, 30]).format('A'), 'ರಾತ್ರಿ', 'before dawn');
    assert.equal(moment([2011, 2, 23,  9, 30]).format('A'), 'ಬೆಳಿಗ್ಗೆ', 'morning');
    assert.equal(moment([2011, 2, 23, 14, 30]).format('A'), 'ಮಧ್ಯಾಹ್ನ', ' during day');
    assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), 'ಸಂಜೆ', 'evening');
    assert.equal(moment([2011, 2, 23, 19, 30]).format('A'), 'ಸಂಜೆ', 'late evening');
    assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'ರಾತ್ರಿ', 'night');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '೧ ೦೧ ೧ನೇ', 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012, 0,  7]).format('w ww wo'), '೧ ೦೧ ೧ನೇ', 'Jan  7 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'), '೨ ೦೨ ೨ನೇ', 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012, 0, 14]).format('w ww wo'), '೨ ೦೨ ೨ನೇ', 'Jan 14 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '೩ ೦೩ ೩ನೇ', 'Jan 15 2012 should be week 3');
});

