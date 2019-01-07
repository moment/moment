import {test} from '../qunit';
import {localeModule} from '../qunit-locale';
import moment from '../../moment';
localeModule('gom-latn');

test('parse', function (assert) {
    var i,
        tests = 'Janer Jan._Febrer Feb._Mars Mars_Abril Abr._Mai Mai_Jun Jun_Julai Jul._Agost Ago._Setembr Set._Otubr Otu._Novembr Nov._Dezembr Dez.'.split('_');

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
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Aitar, Febrer 14er 2010, 3:25:50 donparam'],
            ['ddd, hA',                            'Ait., 3donparam'],
            ['M Mo MM MMMM MMM',                   '2 2 02 Febrer Feb.'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14er 14'],
            ['d do dddd ddd dd',                   '0 0 Aitar Ait. Ai'],
            ['DDD DDDo DDDD',                      '45 45 045'],
            ['w wo ww',                            '6 6 06'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'donparam donparam'],
            ['[the] DDDo [day of the year]',       'the 45 day of the year'],
            ['LTS',                                'donparam 3:25:50 vazta'],
            ['L',                                  '14-02-2010'],
            ['LL',                                 '14 Febrer 2010'],
            ['LLL',                                '14 Febrer 2010 donparam 3:25 vazta'],
            ['LLLL',                               'Aitar, Febrerachea 14er, 2010, donparam 3:25 vazta'],
            ['l',                                  '14-2-2010'],
            ['ll',                                 '14 Feb. 2010'],
            ['lll',                                '14 Feb. 2010 donparam 3:25 vazta'],
            ['llll',                               'Ait., 14 Feb. 2010, donparam 3:25 vazta']
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
    var i,
        expected = 'Janer Jan._Febrer Feb._Mars Mars_Abril Abr._Mai Mai_Jun Jun_Julai Jul._Agost Ago._Setembr Set._Otubr Otu._Novembr Nov._Dezembr Dez.'.split('_');

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var i,
        expected = 'Aitar Ait. Ai_Somar Som. Sm_Mongllar Mon. Mo_Budvar Bud. Bu_Brestar Bre. Br_Sukrar Suk. Su_Son\'var Son. Sn'.split('_');

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);

    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'thodde secondanim', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'eka mintan',      '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'eka mintan',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 mintanim',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 mintanim',    '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'eka voran',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'eka voran',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 voranim',       '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 voranim',       '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 voranim',      '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'eka disan',         '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'eka disan',         '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 disanim',        '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'eka disan',         '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 disanim',        '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 disanim',       '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'eka mhoinean',       '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'eka mhoinean',       '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'eka mhoinean',       '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 mhoineanim',      '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 mhoineanim',      '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 mhoineanim',      '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'eka mhoinean',       '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 mhoineanim',      '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'eka vorsan',        '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 vorsanim',       '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'eka vorsan',        '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 vorsanim',       '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'thodde second',  'prefix');
    assert.equal(moment(0).from(30000), 'thodde second adim', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'thodde second adim',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'thodde second', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(), '5 dis', 'in 5 days');
});

test('ago', function (assert) {
    assert.equal(moment().subtract({h: 3}).fromNow(), '3 voram adim', '3 hours ago');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'Aiz donparam 12:00 vazta',     'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Aiz donparam 12:25 vazta',     'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Aiz donparam 1:00 vazta',      'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Faleam donparam 12:00 vazta',  'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Aiz sokalli 11:00 vazta',     'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Kal donparam 12:00 vazta', 'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('[Ieta to] dddd[,] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[Ieta to] dddd[,] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[Ieta to] dddd[,] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('[Fatlo] dddd[,] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[Fatlo] dddd[,] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[Fatlo] dddd[,] LT'),  'Today - ' + i + ' days end of day');
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
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0,  2]).format('w ww wo'), '1 01 1', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'), '1 01 1', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0, 14]).format('w ww wo'), '2 02 2', 'Jan 14 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '2 02 2', 'Jan 15 2012 should be week 2');
});
