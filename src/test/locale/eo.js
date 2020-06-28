import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('eo');

test('parse', function (assert) {
    var tests = 'januaro jan_februaro feb_marto mart_aprilo apr_majo maj_junio jun_julio jul_aŭgusto aŭg_septembro sept_oktobro okt_novembro nov_decembro dec'.split(
            '_'
        ),
        i;
    function equalTest(input, mmm, i) {
        assert.equal(
            moment(input, mmm).month(),
            i,
            input + ' should be month ' + (i + 1)
        );
    }

    function equalTestStrict(input, mmm, monthIndex) {
        assert.equal(
            moment(input, mmm, true).month(),
            monthIndex,
            input + ' ' + mmm + ' should be strict month ' + (monthIndex + 1)
        );
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

        equalTestStrict(tests[i][1], 'MMM', i);
        equalTestStrict(tests[i][0], 'MMMM', i);
        equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
        equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
        equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            [
                'dddd, MMMM Do YYYY, h:mm:ss a',
                'dimanĉo, februaro 14a 2010, 3:25:50 p.t.m.',
            ],
            ['ddd, hA', 'dim, 3P.T.M.'],
            ['M Mo MM MMMM MMM', '2 2a 02 februaro feb'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14a 14'],
            ['d do dddd ddd dd', '0 0a dimanĉo dim di'],
            ['DDD DDDo DDDD', '45 45a 045'],
            ['w wo ww', '7 7a 07'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'p.t.m. P.T.M.'],
            ['[la] DDDo [tago] [de] [la] [jaro]', 'la 45a tago de la jaro'],
            ['LTS', '15:25:50'],
            ['L', '2010-02-14'],
            ['LL', 'la 14-an de februaro, 2010'],
            ['LLL', 'la 14-an de februaro, 2010 15:25'],
            ['LLLL', 'dimanĉon, la 14-an de februaro, 2010 15:25'],
            ['l', '2010-2-14'],
            ['ll', 'la 14-an de feb, 2010'],
            ['lll', 'la 14-an de feb, 2010 15:25'],
            ['llll', 'dim, la 14-an de feb, 2010 15:25'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1a', '1a');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2a', '2a');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3a', '3a');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4a', '4a');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5a', '5a');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6a', '6a');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7a', '7a');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8a', '8a');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9a', '9a');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10a', '10a');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11a', '11a');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12a', '12a');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13a', '13a');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14a', '14a');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15a', '15a');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16a', '16a');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17a', '17a');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18a', '18a');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19a', '19a');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20a', '20a');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21a', '21a');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22a', '22a');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23a', '23a');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24a', '24a');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25a', '25a');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26a', '26a');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27a', '27a');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28a', '28a');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29a', '29a');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30a', '30a');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31a', '31a');
});

test('format month', function (assert) {
    var expected = 'januaro jan_februaro feb_marto mart_aprilo apr_majo maj_junio jun_julio jul_aŭgusto aŭg_septembro sept_oktobro okt_novembro nov_decembro dec'.split(
            '_'
        ),
        i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(
            moment([2011, i, 1]).format('MMMM MMM'),
            expected[i],
            expected[i]
        );
    }
});

test('format week', function (assert) {
    var expected = 'dimanĉo dim di_lundo lun lu_mardo mard ma_merkredo merk me_ĵaŭdo ĵaŭ ĵa_vendredo ven ve_sabato sab sa'.split(
            '_'
        ),
        i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(
            moment([2011, 0, 2 + i]).format('dddd ddd dd'),
            expected[i],
            expected[i]
        );
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
        'kelkaj sekundoj',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'unu minuto',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'unu minuto',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 minutoj',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 minutoj',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'unu horo',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'unu horo',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 horoj',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 horoj',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 horoj',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'unu tago',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'unu tago',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 tagoj',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'unu tago',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 tagoj',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 tagoj',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'unu monato',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'unu monato',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'unu monato',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 monatoj',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 monatoj',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 monatoj',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'unu monato',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 monatoj',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'unu jaro',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 jaroj',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'unu jaro',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 jaroj',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'post kelkaj sekundoj', 'post prefix');
    assert.equal(
        moment(0).from(30000),
        'antaŭ kelkaj sekundoj',
        'antaŭ prefix'
    );
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'antaŭ kelkaj sekundoj',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'post kelkaj sekundoj',
        'post kelkaj sekundoj'
    );
    assert.equal(
        moment().add({ d: 5 }).fromNow(),
        'post 5 tagoj',
        'post 5 tagoj'
    );
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'Hodiaŭ je 12:00',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'Hodiaŭ je 12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'Hodiaŭ je 13:00',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'Morgaŭ je 12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'Hodiaŭ je 11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'Hieraŭ je 12:00',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd[n] [je] LT'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd[n] [je] LT'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd[n] [je] LT'),
            'Today + ' + i + ' days end of day'
        );
    }
});

test('calendar last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        assert.equal(
            m.calendar(),
            m.format('[pasintan] dddd[n je] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('[pasintan] dddd[n je] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('[pasintan] dddd[n je] LT'),
            'Today - ' + i + ' days end of day'
        );
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({ w: 1 }),
        weeksFromNow = moment().add({ w: 1 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
    assert.equal(
        weeksFromNow.calendar(),
        weeksFromNow.format('L'),
        'in 1 week'
    );

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
    assert.equal(
        weeksFromNow.calendar(),
        weeksFromNow.format('L'),
        'in 2 weeks'
    );
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(
        moment([2011, 11, 26]).format('w ww wo'),
        '1 01 1a',
        'Dec 26 2011 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '1 01 1a',
        'Jan  1 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 2]).format('w ww wo'),
        '2 02 2a',
        'Jan  2 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '2 02 2a',
        'Jan  8 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 9]).format('w ww wo'),
        '3 03 3a',
        'Jan  9 2012 should be week 3'
    );
});
