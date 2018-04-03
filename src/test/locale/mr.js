import {test} from '../qunit';
import {localeModule} from '../qunit-locale';
import moment from '../../moment';
localeModule('mr');

test('parse', function (assert) {
    var tests = 'जानेवारी जाने._फेब्रुवारी फेब्रु._मार्च मार्च._एप्रिल एप्रि._मे मे._जून जून._जुलै जुलै._ऑगस्ट ऑग._सप्टेंबर सप्टें._ऑक्टोबर ऑक्टो._नोव्हेंबर नोव्हें._डिसेंबर डिसें.'.split('_'), i;
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
            ['dddd, Do MMMM YYYY, a h:mm:ss वाजता', 'रविवार, १४ फेब्रुवारी २०१०, दुपारी ३:२५:५० वाजता'],
            ['ddd, a h वाजता',                       'रवि, दुपारी ३ वाजता'],
            ['M Mo MM MMMM MMM',                   '२ २ ०२ फेब्रुवारी फेब्रु.'],
            ['YYYY YY',                            '२०१० १०'],
            ['D Do DD',                            '१४ १४ १४'],
            ['d do dddd ddd dd',                   '० ० रविवार रवि र'],
            ['DDD DDDo DDDD',                      '४५ ४५ ०४५'],
            ['w wo ww',                            '८ ८ ०८'],
            ['h hh',                               '३ ०३'],
            ['H HH',                               '१५ १५'],
            ['m mm',                               '२५ २५'],
            ['s ss',                               '५० ५०'],
            ['a A',                                'दुपारी दुपारी'],
            ['LTS',                                'दुपारी ३:२५:५० वाजता'],
            ['L',                                  '१४/०२/२०१०'],
            ['LL',                                 '१४ फेब्रुवारी २०१०'],
            ['LLL',                                '१४ फेब्रुवारी २०१०, दुपारी ३:२५ वाजता'],
            ['LLLL',                               'रविवार, १४ फेब्रुवारी २०१०, दुपारी ३:२५ वाजता'],
            ['l',                                  '१४/२/२०१०'],
            ['ll',                                 '१४ फेब्रु. २०१०'],
            ['lll',                                '१४ फेब्रु. २०१०, दुपारी ३:२५ वाजता'],
            ['llll',                               'रवि, १४ फेब्रु. २०१०, दुपारी ३:२५ वाजता']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '१', '१');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '२', '२');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '३', '३');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '४', '४');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '५', '५');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '६', '६');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '७', '७');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '८', '८');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '९', '९');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '१०', '१०');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '११', '११');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '१२', '१२');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '१३', '१३');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '१४', '१४');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '१५', '१५');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '१६', '१६');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '१७', '१७');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '१८', '१८');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '१९', '१९');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '२०', '२०');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '२१', '२१');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '२२', '२२');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '२३', '२३');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '२४', '२४');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '२५', '२५');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '२६', '२६');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '२७', '२७');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '२८', '२८');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '२९', '२९');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '३०', '३०');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '३१', '३१');
});

test('format month', function (assert) {
    var expected = 'जानेवारी जाने._फेब्रुवारी फेब्रु._मार्च मार्च._एप्रिल एप्रि._मे मे._जून जून._जुलै जुलै._ऑगस्ट ऑग._सप्टेंबर सप्टें._ऑक्टोबर ऑक्टो._नोव्हेंबर नोव्हें._डिसेंबर डिसें.'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'रविवार रवि र_सोमवार सोम सो_मंगळवार मंगळ मं_बुधवार बुध बु_गुरूवार गुरू गु_शुक्रवार शुक्र शु_शनिवार शनि श'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'काही सेकंद', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'एक मिनिट',      '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'एक मिनिट',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '२ मिनिटे',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true), '४४ मिनिटे', '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'एक तास',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'एक तास',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '२ तास',       '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '५ तास',       '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '२१ तास',      '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'एक दिवस',         '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'एक दिवस',         '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '२ दिवस',        '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'एक दिवस',         '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '५ दिवस',        '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '२५ दिवस',       '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true), 'एक महिना', '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true), 'एक महिना', '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true), 'एक महिना', '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true), '२ महिने', '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true), '२ महिने', '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true), '३ महिने', '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true), 'एक महिना', '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true), '५ महिने', '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'एक वर्ष',        '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '२ वर्षे',       '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'एक वर्ष',        '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true), '५ वर्षे', '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'काही सेकंदांमध्ये', 'prefix');
    assert.equal(moment(0).from(30000), 'काही सेकंदांपूर्वी', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'काही सेकंदांपूर्वी',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'काही सेकंदांमध्ये', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(), '५ दिवसांमध्ये', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'आज दुपारी १२:०० वाजता',    'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'आज दुपारी १२:२५ वाजता',    'Now plus 25 min');
    assert.equal(moment(a).add({h: 3}).calendar(),       'आज दुपारी ३:०० वाजता',     'Now plus 3 hours');
    assert.equal(moment(a).add({d: 1}).calendar(),       'उद्या दुपारी १२:०० वाजता', 'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'आज दुपारी ११:०० वाजता',    'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'काल दुपारी १२:०० वाजता',   'yesterday at the same time');
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
        assert.equal(m.calendar(), m.format('[मागील] dddd[,] LT'), 'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(), m.format('[मागील] dddd[,] LT'), 'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(), m.format('[मागील] dddd[,] LT'), 'Today - ' + i + ' days end of day');
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
    assert.equal(moment([2011, 2, 23,  2, 30]).format('a'), 'रात्री', 'before dawn');
    assert.equal(moment([2011, 2, 23,  9, 30]).format('a'), 'सकाळी', 'morning');
    assert.equal(moment([2011, 2, 23, 14, 30]).format('a'), 'दुपारी', 'during day');
    assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), 'सायंकाळी', 'evening');
    assert.equal(moment([2011, 2, 23, 19, 30]).format('a'), 'सायंकाळी', 'late evening');
    assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'रात्री', 'night');

    assert.equal(moment([2011, 2, 23,  2, 30]).format('A'), 'रात्री', 'before dawn');
    assert.equal(moment([2011, 2, 23,  9, 30]).format('A'), 'सकाळी', 'morning');
    assert.equal(moment([2011, 2, 23, 14, 30]).format('A'), 'दुपारी', ' during day');
    assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), 'सायंकाळी', 'evening');
    assert.equal(moment([2011, 2, 23, 19, 30]).format('A'), 'सायंकाळी', 'late evening');
    assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'रात्री', 'night');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '१ ०१ १', 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012, 0,  7]).format('w ww wo'), '१ ०१ १', 'Jan  7 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'), '२ ०२ २', 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012, 0, 14]).format('w ww wo'), '२ ०२ २', 'Jan 14 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '३ ०३ ३', 'Jan 15 2012 should be week 3');
});


