import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('ca');

test('parse', function (assert) {
    var tests = 'gener gen._febrer febr._març mar._abril abr._maig mai._juny jun._juliol jul._agost ag._setembre set._octubre oct._novembre nov._desembre des.'.split('_'), i;
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
            ['dddd, Do MMMM YYYY, h:mm:ss a',      'diumenge, 14è febrer 2010, 3:25:50 pm'],
            ['ddd, hA',                            'dg., 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2n 02 febrer febr.'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14è 14'],
            ['d do dddd ddd dd',                   '0 0è diumenge dg. Dg'],
            ['DDD DDDo DDDD',                      '45 45è 045'],
            ['w wo ww',                            '6 6a 06'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['[the] DDDo [day of the year]',       'the 45è day of the year'],
            ['LTS',                                '15:25:50'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 febrer 2010'],
            ['LLL',                                '14 febrer 2010 15:25'],
            ['LLLL',                               'diumenge 14 febrer 2010 15:25'],
            ['l',                                  '14/2/2010'],
            ['ll',                                 '14 febr. 2010'],
            ['lll',                                '14 febr. 2010 15:25'],
            ['llll',                               'dg. 14 febr. 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1r', '1r');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2n', '2n');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3r', '3r');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4t', '4t');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5è', '5è');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6è', '6è');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7è', '7è');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8è', '8è');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9è', '9è');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10è', '10è');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11è', '11è');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12è', '12è');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13è', '13è');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14è', '14è');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15è', '15è');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16è', '16è');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17è', '17è');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18è', '18è');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19è', '19è');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20è', '20è');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21è', '21è');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22è', '22è');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23è', '23è');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24è', '24è');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25è', '25è');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26è', '26è');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27è', '27è');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28è', '28è');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29è', '29è');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30è', '30è');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31è', '31è');
});

test('format month', function (assert) {
    var expected = 'gener gen._febrer febr._març mar._abril abr._maig mai._juny jun._juliol jul._agost ag._setembre set._octubre oct._novembre nov._desembre des.'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'diumenge dg. Dg_dilluns dl. Dl_dimarts dt. Dt_dimecres dc. Dc_dijous dj. Dj_divendres dv. Dv_dissabte ds. Ds'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'uns segons', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'un minut',      '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'un minut',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minuts',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minuts',    '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'una hora',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'una hora',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 hores',       '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 hores',       '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 hores',      '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'un dia',         '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'un dia',         '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dies',        '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'un dia',         '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dies',        '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dies',       '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'un mes',       '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'un mes',       '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'un mes',       '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 mesos',      '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 mesos',      '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 mesos',      '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'un mes',       '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 mesos',      '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'un any',        '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 anys',       '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'un any',        '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 anys',       '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'en uns segons',  'prefix');
    assert.equal(moment(0).from(30000), 'fa uns segons', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'fa uns segons',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'en uns segons', 'en uns segons');
    assert.equal(moment().add({d: 5}).fromNow(), 'en 5 dies', 'en 5 dies');
});

test('calendar day', function (assert) {
    var a = moment().hours(2).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                         'avui a les 2:00',     'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),          'avui a les 2:25',     'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),           'avui a les 3:00',     'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),           'demà a les 2:00',  'tomorrow at the same time');
    assert.equal(moment(a).add({d: 1, h : -1}).calendar(),   'demà a la 1:00',   'tomorrow minus 1 hour');
    assert.equal(moment(a).subtract({h: 1}).calendar(),      'avui a la 1:00',      'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),      'ahir a les 2:00',    'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd [a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('[el] dddd [passat a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[el] dddd [passat a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[el] dddd [passat a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  'Today - ' + i + ' days end of day');
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
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52a', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1a', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1a', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2a', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2a', 'Jan 15 2012 should be week 2');
});

