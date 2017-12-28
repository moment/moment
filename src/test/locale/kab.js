import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('kab');

test('parse', function (assert) {
    var i,
        tests = 'yennayer yen._furar fur._meɣres meɣ._yebrir yeb._mayyu may._yunyu yun._yulyu yul._ɣuct ɣuc._ctember cte._tuber tub._wamber wam._dujember duj.'.split('_');

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
            ['dddd, MMMM Do YYYY, h:mm:ss a', 'acer, furar 14 2010, 3:25:50 md'],
            ['ddd, hA',                       'ace., 3MD'],
            ['M Mo MM MMMM MMM',              '2 wis2 02 furar fur.'],
            ['YYYY YY',                       '2010 10'],
            ['D Do DD',                       '14 14 14'],
            ['d do dddd ddd dd',              '0 wis0 acer ace. cr'],
            ['DDD DDDo DDDD',                 '45 wis45 045'],
            ['w wo ww',                       '6 wis6 06'],
            ['h hh',                          '3 03'],
            ['H HH',                          '15 15'],
            ['m mm',                          '25 25'],
            ['s ss',                          '50 50'],
            ['a A',                           'md MD'],
            ['[le] Do [jour du mois]',        'ass wis 14 deg aggur'],
            ['[le] DDDo [jour de l’année]',   'ass wis 45 deg useggas'],
            ['LTS',                           '15:25:50'],
            ['L',                             '14/02/2010'],
            ['LL',                            '14 furar 2010'],
            ['LLL',                           '14 furar 2010 15:25'],
            ['LLLL',                          'acer 14 furar 2010 15:25'],
            ['l',                             '14/2/2010'],
            ['ll',                            '14 fur. 2010'],
            ['lll',                           '14 fur. 2010 15:25'],
            ['llll',                          'ace. 14 fur. 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;

    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'),   'wis 1',     'wis 1');
    assert.equal(moment([2011, 0, 2]).format('DDDo'),   'wis 2',      'wis 2');
    assert.equal(moment([2011, 0, 3]).format('DDDo'),   'wis 3',      'wis 3');
    assert.equal(moment([2011, 0, 4]).format('DDDo'),   'wis 4',      'wis 4');
    assert.equal(moment([2011, 0, 5]).format('DDDo'),   'wis 5',      'wis 5');
    assert.equal(moment([2011, 0, 6]).format('DDDo'),   'wis 6',      'wis 6');
    assert.equal(moment([2011, 0, 7]).format('DDDo'),   'wis 7',      'wis 7');
    assert.equal(moment([2011, 0, 8]).format('DDDo'),   'wis 8',      'wis 8');
    assert.equal(moment([2011, 0, 9]).format('DDDo'),   'wis 9',      'wis 9');
    assert.equal(moment([2011, 0, 10]).format('DDDo'),  'wis 10',     'wis 10');

    assert.equal(moment([2011, 0, 11]).format('DDDo'),  'wis 11',     'wis 11');
    assert.equal(moment([2011, 0, 12]).format('DDDo'),  'wis 12',     'wis 12');
    assert.equal(moment([2011, 0, 13]).format('DDDo'),  'wis 13',     'wis 13');
    assert.equal(moment([2011, 0, 14]).format('DDDo'),  'wis 14',     'wis 14');
    assert.equal(moment([2011, 0, 15]).format('DDDo'),  'wis 15',     'wis 15');
    assert.equal(moment([2011, 0, 16]).format('DDDo'),  'wis 16',     'wis 16');
    assert.equal(moment([2011, 0, 17]).format('DDDo'),  'wis 17',     'wis 17');
    assert.equal(moment([2011, 0, 18]).format('DDDo'),  'wis 18',     'wis 18');
    assert.equal(moment([2011, 0, 19]).format('DDDo'),  'wis 19',     'wis 19');
    assert.equal(moment([2011, 0, 20]).format('DDDo'),  'wis 20',     'wis 20');

    assert.equal(moment([2011, 0, 21]).format('DDDo'),  'wis 21',     'wis 21');
    assert.equal(moment([2011, 0, 22]).format('DDDo'),  'wis 22',     'wis 22');
    assert.equal(moment([2011, 0, 23]).format('DDDo'),  'wis 23',     'wis 23');
    assert.equal(moment([2011, 0, 24]).format('DDDo'),  'wis 24',     'wis 24');
    assert.equal(moment([2011, 0, 25]).format('DDDo'),  'wis 25',     'wis 25');
    assert.equal(moment([2011, 0, 26]).format('DDDo'),  'wis 26',     'wis 26');
    assert.equal(moment([2011, 0, 27]).format('DDDo'),  'wis 27',     'wis 27');
    assert.equal(moment([2011, 0, 28]).format('DDDo'),  'wis 28',     'wis 28');
    assert.equal(moment([2011, 0, 29]).format('DDDo'),  'wis 29',     'wis 29');
    assert.equal(moment([2011, 0, 30]).format('DDDo'),  'wis 30',     'wis 30');

    assert.equal(moment([2011, 0, 31]).format('DDDo'),  'wis 31',     'wis 31');
});

test('format month', function (assert) {
    var i,
        expected = 'yennayer yen._furar fur._meɣres meɣ._yebrir yeb._mayyu may._yunyu yun._yulyu yul._ɣuct ɣuc._ctember cte._tuber tub._wamber wam._dujember duj.'.split('_');
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var i,
        expected = 'acer ace. cr_arim ari. ri_aram ara. ra_ahad aha. ah_amhad amh. am_sem sem. sm_sed sed. sd'.split('_');

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);

    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'kra n tasinin', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'tasdat',        '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'tasdat',        '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 n tisdatin',         '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 n tisdatin',        '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'asrag',         '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'asrag',         '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 n yisragen',          '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 n yisragen',          '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 n yiragen',         '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ass',           '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ass',           '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 n wussan',           '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ass',           '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 n wussan',           '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 n wussan',          '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'aggur',           '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'aggur',           '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'aggur',           '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 n wagguren',            '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 n wagguren',            '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 n wagguren',            '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'aggur',           '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 n wagguren',            '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'aseggas',             '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 n yiseggasen',             '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'aseggas',             '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 n yiseggasen',             '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'di kra n tasinin',   'prefix');
    assert.equal(moment(0).from(30000), 'kra n tasinin aya', 'suffix');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'di kra n tasinin', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(),  'di 5 n wussan',           'in 5 days');
});

test('same day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                  'Ass-a af 12:00', 'Today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),     'Si tura rnu-yas 25 ', 'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),      'Si tura rnu-yas asrag', 'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),      'Azekka deg akud-a',      'Tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(), 'Si tura senɣes-as asrag', 'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(), 'Iḍelli deg akud-a',        'Yesterday at the same time');
});

test('same next week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(), m.format('dddd [af] LT'), 'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(), m.format('dddd [af] LT'), 'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(), m.format('dddd [af] LT'), 'Today + ' + i + ' days end of day');
    }
});

test('same last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(), m.format('dddd [yezrin af] LT'), 'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(), m.format('dddd [yezrin af] LT'), 'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(), m.format('dddd [yezrin af] LT'), 'Today - ' + i + ' days end of day');
    }
});

test('same all else', function (assert) {
    var weeksAgo = moment().subtract({w: 1}),
        weeksFromNow = moment().add({w: 1});

    assert.equal(weeksAgo.calendar(),     weeksAgo.format('L'),     '1 week ago');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

    weeksAgo = moment().subtract({w: 2});
    weeksFromNow = moment().add({w: 2});

    assert.equal(weeksAgo.calendar(),     weeksAgo.format('L'),     '2 weeks ago');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 wis52', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0,  2]).format('w ww wo'), '1 01 wis1',  'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'), '1 01 wis1',  'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0,  9]).format('w ww wo'), '2 02 wis2',   'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '2 02 wis2',   'Jan 15 2012 should be week 2');
});
