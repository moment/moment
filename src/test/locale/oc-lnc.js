import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('oc-lnc');

test('parse', function (assert) {
    var tests = 'genièr gen._febrièr febr._març març_abril abr._mai mai_junh junh_julhet julh._agost ago._setembre set._octòbre oct._novembre nov._decembre dec.'.split(
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
            [
                'dddd, Do MMMM YYYY, h:mm:ss a',
                'dimenge, 14è de febrièr 2010, 3:25:50 pm',
            ],
            ['ddd, hA', 'dg., 3PM'],
            ['M Mo MM MMMM MMM', '2 2n 02 febrièr febr.'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14è 14'],
            ['d do dddd ddd dd', '0 0è dimenge dg. dg'],
            ['DDD DDDo DDDD', '45 45è 045'],
            ['w wo ww', '6 6a 06'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'pm PM'],
            ['[the] DDDo [day of the year]', 'the 45è day of the year'],
            ['LTS', '15:25:50'],
            ['L', '14/02/2010'],
            ['LL', '14 de febrièr de 2010'],
            ['LLL', '14 de febrièr de 2010 a 15:25'],
            ['LLLL', 'dimenge 14 de febrièr de 2010 a 15:25'],
            ['l', '14/2/2010'],
            ['ll', '14 febr. 2010'],
            ['lll', '14 febr. 2010, 15:25'],
            ['llll', 'dg. 14 febr. 2010, 15:25'],
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
    var expected = 'genièr gen._febrièr febr._març març_abril abr._mai mai_junh junh_julhet julh._agost ago._setembre set._octòbre oct._novembre nov._decembre dec.'.split(
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
    var expected = 'dimenge dg. dg_diluns dl. dl_dimars dm. dm_dimècres dc. dc_dijòus dj. dj_divendres dv. dv_dissabte ds. ds'.split(
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
        'unas segondas',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'una minuta',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'una minuta',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 minutas',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 minutas',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'una ora',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'una ora',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 oras',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 oras',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 oras',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'un jorn',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'un jorn',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 jorns',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'un jorn',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 jorns',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 jorns',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'un mes',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'un mes',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'un mes',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 meses',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 meses',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 meses',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'un mes',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 meses',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'un an',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 ans',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'un an',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 ans',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), "d'aquí unas segondas", 'prefix');
    assert.equal(moment(0).from(30000), 'fa unas segondas', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'fa unas segondas',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        "d'aquí unas segondas",
        "d'aquí unas segondas"
    );
    assert.equal(
        moment().add({ d: 5 }).fromNow(),
        "d'aquí 5 jorns",
        "d'aquí 5 jorns"
    );
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(), 'uèi a 12:00', 'today at the same time');
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'uèi a 12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'uèi a 13:00',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'deman a 12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).add({ d: 1, h: -1 }).calendar(),
        'deman a 11:00',
        'tomorrow minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'uèi a 11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'ièr a 12:00',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd [a] LT'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [a] LT'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [a] LT'),
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
            m.format('dddd [passat a] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [passat a] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [passat a] LT'),
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
        moment([2012, 0, 1]).format('w ww wo'),
        '52 52 52a',
        'Jan  1 2012 should be week 52'
    );
    assert.equal(
        moment([2012, 0, 2]).format('w ww wo'),
        '1 01 1a',
        'Jan  2 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '1 01 1a',
        'Jan  8 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 9]).format('w ww wo'),
        '2 02 2a',
        'Jan  9 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 15]).format('w ww wo'),
        '2 02 2a',
        'Jan 15 2012 should be week 2'
    );
});

test('day and month', function (assert) {
    assert.equal(moment([2012, 1, 15]).format('D MMMM'), '15 de febrièr');
    assert.equal(moment([2012, 9, 15]).format('D MMMM'), "15 d'octòbre");
    assert.equal(moment([2012, 9, 15]).format('MMMM, D'), 'octòbre, 15');
});
