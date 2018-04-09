import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('uz-latn');

test('parse', function (assert) {
    var tests = 'Yanvar Yan_Fevral Fev_Mart Mar_Aprel Apr_May May_Iyun Iyun_Iyul Iyul_Avgust Avg_Sentabr Sen_Oktabr Okt_Noyabr Noy_Dekabr Dek'.split('_'), i;
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
            ['dddd, Do-MMMM YYYY, h:mm:ss',        'Yakshanba, 14-Fevral 2010, 3:25:50'],
            ['ddd, h:mm',                          'Yak, 3:25'],
            ['M Mo MM MMMM MMM',                   '2 2 02 Fevral Fev'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14 14'],
            ['d do dddd ddd dd',                   '0 0 Yakshanba Yak Ya'],
            ['DDD DDDo DDDD',                      '45 45 045'],
            ['w wo ww',                            '7 7 07'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['[yilning] DDDo-[kuni]',             'yilning 45-kuni'],
            ['LTS',                                '15:25:50'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 Fevral 2010'],
            ['LLL',                                '14 Fevral 2010 15:25'],
            ['LLLL',                               '14 Fevral 2010, Yakshanba 15:25'],
            ['l',                                  '14/2/2010'],
            ['ll',                                 '14 Fev 2010'],
            ['lll',                                '14 Fev 2010 15:25'],
            ['llll',                               '14 Fev 2010, Yak 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2016, 0, 1]).format('DDDo'), '1', '1');
    assert.equal(moment([2016, 0, 2]).format('DDDo'), '2', '2');
    assert.equal(moment([2016, 0, 3]).format('DDDo'), '3', '3');
    assert.equal(moment([2016, 0, 4]).format('DDDo'), '4', '4');
    assert.equal(moment([2016, 0, 5]).format('DDDo'), '5', '5');
    assert.equal(moment([2016, 0, 6]).format('DDDo'), '6', '6');
    assert.equal(moment([2016, 0, 7]).format('DDDo'), '7', '7');
    assert.equal(moment([2016, 0, 8]).format('DDDo'), '8', '8');
    assert.equal(moment([2016, 0, 9]).format('DDDo'), '9', '9');
    assert.equal(moment([2016, 0, 10]).format('DDDo'), '10', '10');

    assert.equal(moment([2016, 0, 11]).format('DDDo'), '11', '11');
    assert.equal(moment([2016, 0, 12]).format('DDDo'), '12', '12');
    assert.equal(moment([2016, 0, 13]).format('DDDo'), '13', '13');
    assert.equal(moment([2016, 0, 14]).format('DDDo'), '14', '14');
    assert.equal(moment([2016, 0, 15]).format('DDDo'), '15', '15');
    assert.equal(moment([2016, 0, 16]).format('DDDo'), '16', '16');
    assert.equal(moment([2016, 0, 17]).format('DDDo'), '17', '17');
    assert.equal(moment([2016, 0, 18]).format('DDDo'), '18', '18');
    assert.equal(moment([2016, 0, 19]).format('DDDo'), '19', '19');
    assert.equal(moment([2016, 0, 20]).format('DDDo'), '20', '20');

    assert.equal(moment([2016, 0, 21]).format('DDDo'), '21', '21');
    assert.equal(moment([2016, 0, 22]).format('DDDo'), '22', '22');
    assert.equal(moment([2016, 0, 23]).format('DDDo'), '23', '23');
    assert.equal(moment([2016, 0, 24]).format('DDDo'), '24', '24');
    assert.equal(moment([2016, 0, 25]).format('DDDo'), '25', '25');
    assert.equal(moment([2016, 0, 26]).format('DDDo'), '26', '26');
    assert.equal(moment([2016, 0, 27]).format('DDDo'), '27', '27');
    assert.equal(moment([2016, 0, 28]).format('DDDo'), '28', '28');
    assert.equal(moment([2016, 0, 29]).format('DDDo'), '29', '29');
    assert.equal(moment([2016, 0, 30]).format('DDDo'), '30', '30');

    assert.equal(moment([2016, 0, 31]).format('DDDo'), '31', '31');
});

test('format month', function (assert) {
    var expected = 'Yanvar Yan_Fevral Fev_Mart Mar_Aprel Apr_May May_Iyun Iyun_Iyul Iyul_Avgust Avg_Sentabr Sen_Oktabr Okt_Noyabr Noy_Dekabr Dek'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2016, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'Yakshanba Yak Ya_Dushanba Dush Du_Seshanba Sesh Se_Chorshanba Chor Cho_Payshanba Pay Pa_Juma Jum Ju_Shanba Shan Sha'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2016, 0, 3 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2017, 1, 28]);
    assert.equal(start.from(moment([2017, 1, 28]).add({s: 44}), true),  'soniya', '44 soniya = soniya');
    assert.equal(start.from(moment([2017, 1, 28]).add({s: 45}), true),  'bir daqiqa',      '45 soniya = bir daqiqa');
    assert.equal(start.from(moment([2017, 1, 28]).add({s: 89}), true),  'bir daqiqa',      '89 soniya = bir daqiqa');
    assert.equal(start.from(moment([2017, 1, 28]).add({s: 90}), true),  '2 daqiqa',     '90 soniya = 2 daqiqa');
    assert.equal(start.from(moment([2017, 1, 28]).add({m: 44}), true),  '44 daqiqa',    '44 daqiqa = 44 daqiqa');
    assert.equal(start.from(moment([2017, 1, 28]).add({m: 45}), true),  'bir soat',       '45 minut = bir soat');
    assert.equal(start.from(moment([2017, 1, 28]).add({m: 89}), true),  'bir soat',       '89 minut = bir soat');
    assert.equal(start.from(moment([2017, 1, 28]).add({m: 90}), true),  '2 soat',       '90 minut = 2 soat');
    assert.equal(start.from(moment([2017, 1, 28]).add({h: 5}), true),   '5 soat',       '5 soat = 5 soat');
    assert.equal(start.from(moment([2017, 1, 28]).add({h: 21}), true),  '21 soat',      '21 soat = 21 soat');
    assert.equal(start.from(moment([2017, 1, 28]).add({h: 22}), true),  'bir kun',         '22 soat = bir kun');
    assert.equal(start.from(moment([2017, 1, 28]).add({h: 35}), true),  'bir kun',         '35 soat = bir kun');
    assert.equal(start.from(moment([2017, 1, 28]).add({h: 36}), true),  '2 kun',        '36 soat = 2 kun');
    assert.equal(start.from(moment([2017, 1, 28]).add({d: 1}), true),   'bir kun',         '1 kun = 1 kun');
    assert.equal(start.from(moment([2017, 1, 28]).add({d: 5}), true),   '5 kun',        '5 kun = 5 kun');
    assert.equal(start.from(moment([2017, 1, 28]).add({d: 25}), true),  '25 kun',       '25 kun = 25 kun');
    assert.equal(start.from(moment([2017, 1, 28]).add({d: 26}), true),  'bir oy',       '26 kun = bir oy');
    assert.equal(start.from(moment([2017, 1, 28]).add({d: 30}), true),  'bir oy',       '30 kun = bir oy');
    assert.equal(start.from(moment([2017, 1, 28]).add({d: 43}), true),  'bir oy',       '45 kun = bir oy');
    assert.equal(start.from(moment([2017, 1, 28]).add({d: 46}), true),  '2 oy',      '46 kun = 2 oy');
    assert.equal(start.from(moment([2017, 1, 28]).add({d: 74}), true),  '2 oy',      '75 kun = 2 oy');
    assert.equal(start.from(moment([2017, 1, 28]).add({d: 76}), true),  '3 oy',      '76 kun = 3 oy');
    assert.equal(start.from(moment([2017, 1, 28]).add({M: 1}), true),   'bir oy',       'bir oy = bir oy');
    assert.equal(start.from(moment([2017, 1, 28]).add({M: 5}), true),   '5 oy',      '5 oy = 5 oy');
    assert.equal(start.from(moment([2017, 1, 28]).add({d: 345}), true), 'bir yil',        '345 kun = bir yil');
    assert.equal(start.from(moment([2017, 1, 28]).add({d: 548}), true), '2 yil',       '548 kun = 2 yil');
    assert.equal(start.from(moment([2017, 1, 28]).add({y: 1}), true),   'bir yil',        '1 yil = bir yil');
    assert.equal(start.from(moment([2017, 1, 28]).add({y: 5}), true),   '5 yil',       '5 yil = 5 yil');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'Yaqin soniya ichida',  'prefix');
    assert.equal(moment(0).from(30000), 'Bir necha soniya oldin', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'Bir necha soniya oldin',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'Yaqin soniya ichida', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(), 'Yaqin 5 kun ichida', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'Bugun soat 12:00 da',  'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Bugun soat 12:25 da',  'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Bugun soat 13:00 da',  'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Ertaga 12:00 da',      'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Bugun soat 11:00 da',  'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Kecha soat 12:00 da',   'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd [kuni soat] LT [da]'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [kuni soat] LT [da]'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [kuni soat] LT [da]'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('[O\'tgan] dddd [kuni soat] LT [da]'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[O\'tgan] dddd [kuni soat] LT [da]'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[O\'tgan] dddd [kuni soat] LT [da]'),  'Today - ' + i + ' days end of day');
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
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '2 02 2', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '2 02 2', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '3 03 3', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '3 03 3', 'Jan 15 2012 should be week 2');
});

