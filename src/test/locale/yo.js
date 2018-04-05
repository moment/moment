import {test} from '../qunit';
import {localeModule} from '../qunit-locale';
import moment from '../../moment';
localeModule('yo');

test('parse', function (assert) {
    var tests = 'Sẹ́rẹ́ Sẹ́r_Èrèlè Èrl_Ẹrẹ̀nà Ẹrn_Ìgbé Ìgb_Èbibi Èbi_Òkùdu Òkù_Agẹmo Agẹ_Ògún Ògú_Owewe Owe_Ọ̀wàrà Ọ̀wà_Bélú Bél_Ọ̀pẹ̀̀ Ọ̀pẹ̀̀'.split('_'), i;
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
            ['dddd, MMMM Do YYYY, h:mm:ss a', 'Àìkú, Èrèlè ọjọ́ 14 2010, 3:25:50 pm'],
            ['ddd, hA', 'Àìk, 3PM'],
            ['M Mo MM MMMM MMM', '2 ọjọ́ 2 02 Èrèlè Èrl'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 ọjọ́ 14 14'],
            ['d do dddd ddd dd', '0 ọjọ́ 0 Àìkú Àìk Àì'],
            ['DDD DDDo DDDD', '45 ọjọ́ 45 045'],
            ['w wo ww', '6 ọjọ́ 6 06'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'pm PM'],
            ['[the] DDDo [day of the year]', 'the ọjọ́ 45 day of the year'],
            ['LTS', '3:25:50 PM'],
            ['L', '14/02/2010'],
            ['LL', '14 Èrèlè 2010'],
            ['LLL', '14 Èrèlè 2010 3:25 PM'],
            ['LLLL', 'Àìkú, 14 Èrèlè 2010 3:25 PM'],
            ['l', '14/2/2010'],
            ['ll', '14 Èrl 2010'],
            ['lll', '14 Èrl 2010 3:25 PM'],
            ['llll', 'Àìk, 14 Èrl 2010 3:25 PM']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), 'ọjọ́ 1', 'ọjọ́ 1');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), 'ọjọ́ 2', 'ọjọ́ 2');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), 'ọjọ́ 3', 'ọjọ́ 3');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), 'ọjọ́ 4', 'ọjọ́ 4');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), 'ọjọ́ 5', 'ọjọ́ 5');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), 'ọjọ́ 6', 'ọjọ́ 6');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), 'ọjọ́ 7', 'ọjọ́ 7');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), 'ọjọ́ 8', 'ọjọ́ 8');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), 'ọjọ́ 9', 'ọjọ́ 9');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), 'ọjọ́ 10', 'ọjọ́ 10');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), 'ọjọ́ 11', 'ọjọ́ 11');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), 'ọjọ́ 12', 'ọjọ́ 12');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), 'ọjọ́ 13', 'ọjọ́ 13');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), 'ọjọ́ 14', 'ọjọ́ 14');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), 'ọjọ́ 15', 'ọjọ́ 15');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), 'ọjọ́ 16', 'ọjọ́ 16');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), 'ọjọ́ 17', 'ọjọ́ 17');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), 'ọjọ́ 18', 'ọjọ́ 18');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), 'ọjọ́ 19', 'ọjọ́ 19');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), 'ọjọ́ 20', 'ọjọ́ 20');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), 'ọjọ́ 21', 'ọjọ́ 21');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), 'ọjọ́ 22', 'ọjọ́ 22');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), 'ọjọ́ 23', 'ọjọ́ 23');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), 'ọjọ́ 24', 'ọjọ́ 24');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), 'ọjọ́ 25', 'ọjọ́ 25');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), 'ọjọ́ 26', 'ọjọ́ 26');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), 'ọjọ́ 27', 'ọjọ́ 27');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), 'ọjọ́ 28', 'ọjọ́ 28');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), 'ọjọ́ 29', 'ọjọ́ 29');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), 'ọjọ́ 30', 'ọjọ́ 30');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), 'ọjọ́ 31', 'ọjọ́ 31');
});

test('format month', function (assert) {
    var expected = 'Sẹ́rẹ́ Sẹ́r_Èrèlè Èrl_Ẹrẹ̀nà Ẹrn_Ìgbé Ìgb_Èbibi Èbi_Òkùdu Òkù_Agẹmo Agẹ_Ògún Ògú_Owewe Owe_Ọ̀wàrà Ọ̀wà_Bélú Bél_Ọ̀pẹ̀̀ Ọ̀pẹ̀̀'.split('_'),
        i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'Àìkú Àìk Àì_Ajé Ajé Aj_Ìsẹ́gun Ìsẹ́ Ìs_Ọjọ́rú Ọjr Ọr_Ọjọ́bọ Ọjb Ọb_Ẹtì Ẹtì Ẹt_Àbámẹ́ta Àbá Àb'.split('_'),
        i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'ìsẹjú aayá die', '44 seconds = ìsẹjú aayá die');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'ìsẹjú kan',      '45 seconds = ìsẹjú kan');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'ìsẹjú kan',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  'ìsẹjú 2',        '90 seconds = ìsẹjú 2');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  'ìsẹjú 44',       'ìsẹjú 44 = ìsẹjú 44');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'wákati kan',     'ìsẹjú 45 = wákati kan');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'wákati kan',     'ìsẹjú 89 = wákati kan');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  'wákati 2',       'ìsẹjú 90 = wákati 2');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   'wákati 5',       'wákati 5 = wákati 5');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  'wákati 21',      'wákati 21 = wákati 21');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ọjọ́ kan',        '22 wákati = ọjọ́ kan');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ọjọ́ kan',        '35 wákati = ọjọ́ kan');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  'ọjọ́ 2',          'wákati 36 = ọjọ́ 2');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ọjọ́ kan',        '1  = ọjọ́ kan');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   'ọjọ́ 5',          'ọjọ́ 5 = ọjọ́  5');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  'ọjọ́ 25',         'ọjọ́ 25 = ọjọ́ 25');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'osù kan',        'ọjọ́ 26 = osù kan');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'osù kan',        'ọjọ́ 30 = osù kan');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'osù kan',        'ọjọ́ 43 = osù kan');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  'osù 2',          'ọjọ́ 46 = osù 2');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  'osù 2',          'ọjọ́ 75 = osù 2');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  'osù 3',          'ọjọ́ 76 = osù 3');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'osù kan',        'osù 1 = osù kan');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   'osù 5',          'osù 5 = osù 5');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'ọdún kan',       'ọjọ 345 = ọdún kan');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), 'ọdún 2',         'ọjọ 548 = ọdún 2');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'ọdún kan',       'ọdún 1 = ọdún kan');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   'ọdún 5',         'ọdún 5 = ọdún 5');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'ní ìsẹjú aayá die', 'prefix');
    assert.equal(moment(0).from(30000), 'ìsẹjú aayá die kọjá', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'ìsẹjú aayá die kọjá', 'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'ní ìsẹjú aayá die', 'ní ìsẹjú aayá die');
    assert.equal(moment().add({d: 5}).fromNow(), 'ní ọjọ́ 5', 'ní ọjọ́ 5');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                     'Ònì ni 12:00 PM',   'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Ònì ni 12:25 PM',   'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Ònì ni 1:00 PM',    'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Ọ̀la ni 12:00 PM',   'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Ònì ni 11:00 AM',   'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Àna ni 12:00 PM',   'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(), m.format('dddd [Ọsẹ̀ tón\'bọ] [ni] LT'), 'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(), m.format('dddd [Ọsẹ̀ tón\'bọ] [ni] LT'), 'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(), m.format('dddd [Ọsẹ̀ tón\'bọ] [ni] LT'), 'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(), m.format('dddd [Ọsẹ̀ tólọ́] [ni] LT'), 'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(), m.format('dddd [Ọsẹ̀ tólọ́] [ni] LT'), 'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(), m.format('dddd [Ọsẹ̀ tólọ́] [ni] LT'), 'Today - ' + i + ' days end of day');
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({w: 1}),
        weeksFromNow = moment().add({w: 1});

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

    weeksAgo = moment().subtract({w: 2});
    weeksFromNow = moment().add({w: 2});

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
});

test('weeks year starting sunday format', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 ọjọ́ 52', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 ọjọ́ 1', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 ọjọ́ 1', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 ọjọ́ 2', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 ọjọ́ 2', 'Jan 15 2012 should be week 2');
});
