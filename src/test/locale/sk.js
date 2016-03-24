import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('sk');

test('parse', function (assert) {
    var tests = 'január jan._február feb._marec mar._apríl apr._máj máj_jún jún._júl júl._august aug._september sep._október okt._november nov._december dec.'.split('_'), i;
    function equalTest(input, mmm, monthIndex) {
        assert.equal(moment(input, mmm).month(), monthIndex, input + ' should be month ' + (monthIndex + 1));
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
            ['dddd, MMMM Do YYYY, h:mm:ss',  'nedeľa, február 14. 2010, 3:25:50'],
            ['ddd, h',                       'ne, 3'],
            ['M Mo MM MMMM MMM',             '2 2. 02 február feb'],
            ['YYYY YY',                      '2010 10'],
            ['D Do DD',                      '14 14. 14'],
            ['d do dddd ddd dd',             '0 0. nedeľa ne ne'],
            ['DDD DDDo DDDD',                '45 45. 045'],
            ['w wo ww',                      '6 6. 06'],
            ['h hh',                         '3 03'],
            ['H HH',                         '15 15'],
            ['m mm',                         '25 25'],
            ['s ss',                         '50 50'],
            ['a A',                          'pm PM'],
            ['DDDo [deň v roku]',            '45. deň v roku'],
            ['LTS',                          '15:25:50'],
            ['L',                            '14.02.2010'],
            ['LL',                           '14. február 2010'],
            ['LLL',                          '14. február 2010 15:25'],
            ['LLLL',                         'nedeľa 14. február 2010 15:25'],
            ['l',                            '14.2.2010'],
            ['ll',                           '14. feb 2010'],
            ['lll',                          '14. feb 2010 15:25'],
            ['llll',                         'ne 14. feb 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
});

test('format month', function (assert) {
    var expected = 'január jan_február feb_marec mar_apríl apr_máj máj_jún jún_júl júl_august aug_september sep_október okt_november nov_december dec'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'nedeľa ne ne_pondelok po po_utorok ut ut_streda st st_štvrtok št št_piatok pi pi_sobota so so'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'pár sekúnd',  '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'minúta',        '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'minúta',        '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minúty',      '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minút',     '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'hodina',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'hodina',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 hodiny',     '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 hodín',      '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 hodín',     '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'deň',       '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'deň',       '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dni',         '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'deň',       '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dní',         '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dní',        '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'mesiac',       '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'mesiac',       '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'mesiac',       '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 mesiace',    '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 mesiace',    '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 mesiace',    '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'mesiac',       '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 mesiacov',    '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'rok',           '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 roky',        '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'rok',           '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 rokov',         '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'za pár sekúnd',  'prefix');
    assert.equal(moment(0).from(30000), 'pred pár sekundami', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'pred pár sekundami',  'now from now should display as in the past');
});

test('fromNow (future)', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'za pár sekúnd', 'in a few seconds');
    assert.equal(moment().add({m: 1}).fromNow(), 'za minútu', 'in a minute');
    assert.equal(moment().add({m: 3}).fromNow(), 'za 3 minúty', 'in 3 minutes');
    assert.equal(moment().add({m: 10}).fromNow(), 'za 10 minút', 'in 10 minutes');
    assert.equal(moment().add({h: 1}).fromNow(), 'za hodinu', 'in an hour');
    assert.equal(moment().add({h: 3}).fromNow(), 'za 3 hodiny', 'in 3 hours');
    assert.equal(moment().add({h: 10}).fromNow(), 'za 10 hodín', 'in 10 hours');
    assert.equal(moment().add({d: 1}).fromNow(), 'za deň', 'in a day');
    assert.equal(moment().add({d: 3}).fromNow(), 'za 3 dni', 'in 3 days');
    assert.equal(moment().add({d: 10}).fromNow(), 'za 10 dní', 'in 10 days');
    assert.equal(moment().add({M: 1}).fromNow(), 'za mesiac', 'in a month');
    assert.equal(moment().add({M: 3}).fromNow(), 'za 3 mesiace', 'in 3 months');
    assert.equal(moment().add({M: 10}).fromNow(), 'za 10 mesiacov', 'in 10 months');
    assert.equal(moment().add({y: 1}).fromNow(), 'za rok', 'in a year');
    assert.equal(moment().add({y: 3}).fromNow(), 'za 3 roky', 'in 3 years');
    assert.equal(moment().add({y: 10}).fromNow(), 'za 10 rokov', 'in 10 years');
});

test('fromNow (past)', function (assert) {
    assert.equal(moment().subtract({s: 30}).fromNow(), 'pred pár sekundami', 'a few seconds ago');
    assert.equal(moment().subtract({m: 1}).fromNow(), 'pred minútou', 'a minute ago');
    assert.equal(moment().subtract({m: 3}).fromNow(), 'pred 3 minútami', '3 minutes ago');
    assert.equal(moment().subtract({m: 10}).fromNow(), 'pred 10 minútami', '10 minutes ago');
    assert.equal(moment().subtract({h: 1}).fromNow(), 'pred hodinou', 'an hour ago');
    assert.equal(moment().subtract({h: 3}).fromNow(), 'pred 3 hodinami', '3 hours ago');
    assert.equal(moment().subtract({h: 10}).fromNow(), 'pred 10 hodinami', '10 hours ago');
    assert.equal(moment().subtract({d: 1}).fromNow(), 'pred dňom', 'a day ago');
    assert.equal(moment().subtract({d: 3}).fromNow(), 'pred 3 dňami', '3 days ago');
    assert.equal(moment().subtract({d: 10}).fromNow(), 'pred 10 dňami', '10 days ago');
    assert.equal(moment().subtract({M: 1}).fromNow(), 'pred mesiacom', 'a month ago');
    assert.equal(moment().subtract({M: 3}).fromNow(), 'pred 3 mesiacmi', '3 months ago');
    assert.equal(moment().subtract({M: 10}).fromNow(), 'pred 10 mesiacmi', '10 months ago');
    assert.equal(moment().subtract({y: 1}).fromNow(), 'pred rokom', 'a year ago');
    assert.equal(moment().subtract({y: 3}).fromNow(), 'pred 3 rokmi', '3 years ago');
    assert.equal(moment().subtract({y: 10}).fromNow(), 'pred 10 rokmi', '10 years ago');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'dnes o 12:00',     'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'dnes o 12:25',     'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'dnes o 13:00',     'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'zajtra o 12:00',   'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'dnes o 11:00',     'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'včera o 12:00',    'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m, nextDay;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        nextDay = '';
        switch (m.day()) {
        case 0:
            nextDay = 'v nedeľu';
            break;
        case 1:
            nextDay = 'v pondelok';
            break;
        case 2:
            nextDay = 'v utorok';
            break;
        case 3:
            nextDay = 'v stredu';
            break;
        case 4:
            nextDay = 'vo štvrtok';
            break;
        case 5:
            nextDay = 'v piatok';
            break;
        case 6:
            nextDay = 'v sobotu';
            break;
        }
        assert.equal(m.calendar(),       m.format('[' + nextDay + '] [o] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[' + nextDay + '] [o] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[' + nextDay + '] [o] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m, lastDay;
    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        lastDay = '';
        switch (m.day()) {
        case 0:
            lastDay = 'minulú nedeľu';
            break;
        case 1:
            lastDay = 'minulý pondelok';
            break;
        case 2:
            lastDay = 'minulý utorok';
            break;
        case 3:
            lastDay = 'minulú stredu';
            break;
        case 4:
            lastDay = 'minulý štvrtok';
            break;
        case 5:
            lastDay = 'minulý piatok';
            break;
        case 6:
            lastDay = 'minulú sobotu';
            break;
        }
        assert.equal(m.calendar(),       m.format('[' + lastDay + '] [o] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[' + lastDay + '] [o] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[' + lastDay + '] [o] LT'),  'Today - ' + i + ' days end of day');
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

test('humanize duration', function (assert) {
    assert.equal(moment.duration(1, 'minutes').humanize(), 'minúta', 'a minute (future)');
    assert.equal(moment.duration(1, 'minutes').humanize(true), 'za minútu', 'in a minute');
    assert.equal(moment.duration(-1, 'minutes').humanize(), 'minúta', 'a minute (past)');
    assert.equal(moment.duration(-1, 'minutes').humanize(true), 'pred minútou', 'a minute ago');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1.', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1.', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2.', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2.', 'Jan 15 2012 should be week 2');
});

