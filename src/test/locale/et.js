import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('et');

test('parse', function (assert) {
    var tests = 'jaanuar jaan_veebruar veebr_märts märts_aprill apr_mai mai_juuni juuni_juuli juuli_august aug_september sept_oktoober okt_november nov_detsember dets'.split(
            '_'
        ),
        i;
    function equalTest(input, mmm, i) {
        assert.equal(
            moment(input, mmm).month(),
            i,
            input + ' peaks olema kuu ' + (i + 1)
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
                'dddd, Do MMMM YYYY, H:mm:ss',
                'pühapäev, 14. veebruar 2010, 15:25:50',
            ],
            ['ddd, h', 'P, 3'],
            ['M Mo MM MMMM MMM', '2 2. 02 veebruar veebr'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14. 14'],
            ['d do dddd ddd dd', '0 0. pühapäev P P'],
            ['DDD DDDo DDDD', '45 45. 045'],
            ['w wo ww', '6 6. 06'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'pm PM'],
            ['[aasta] DDDo [päev]', 'aasta 45. päev'],
            ['LTS', '15:25:50'],
            ['L', '14.02.2010'],
            ['LL', '14. veebruar 2010'],
            ['LLL', '14. veebruar 2010 15:25'],
            ['LLLL', 'pühapäev, 14. veebruar 2010 15:25'],
            ['l', '14.2.2010'],
            ['ll', '14. veebr 2010'],
            ['lll', '14. veebr 2010 15:25'],
            ['llll', 'P, 14. veebr 2010 15:25'],
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
    var expected = 'jaanuar jaan_veebruar veebr_märts märts_aprill apr_mai mai_juuni juuni_juuli juuli_august aug_september sept_oktoober okt_november nov_detsember dets'.split(
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
    var expected = 'pühapäev P P_esmaspäev E E_teisipäev T T_kolmapäev K K_neljapäev N N_reede R R_laupäev L L'.split(
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
        'paar sekundit',
        '44 seconds = paar sekundit'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'üks minut',
        '45 seconds = üks minut'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'üks minut',
        '89 seconds = üks minut'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 minutit',
        '90 seconds = 2 minutit'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 minutit',
        '44 minutes = 44 minutit'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'üks tund',
        '45 minutes = tund aega'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'üks tund',
        '89 minutes = üks tund'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 tundi',
        '90 minutes = 2 tundi'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 tundi',
        '5 hours = 5 tundi'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 tundi',
        '21 hours = 21 tundi'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'üks päev',
        '22 hours = üks päev'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'üks päev',
        '35 hours = üks päev'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 päeva',
        '36 hours = 2 päeva'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'üks päev',
        '1 day = üks päev'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 päeva',
        '5 days = 5 päeva'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 päeva',
        '25 days = 25 päeva'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'üks kuu',
        '26 days = üks kuu'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'üks kuu',
        '30 days = üks kuu'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'üks kuu',
        '43 days = üks kuu'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 kuud',
        '46 days = 2 kuud'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 kuud',
        '75 days = 2 kuud'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 kuud',
        '76 days = 3 kuud'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'üks kuu',
        '1 month = üks kuu'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 kuud',
        '5 months = 5 kuud'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'üks aasta',
        '345 days = üks aasta'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 aastat',
        '548 days = 2 aastat'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'üks aasta',
        '1 year = üks aasta'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 aastat',
        '5 years = 5 aastat'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'mõne sekundi pärast', 'prefix');
    assert.equal(moment(0).from(30000), 'mõni sekund tagasi', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'mõni sekund tagasi',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'mõne sekundi pärast',
        'in a few seconds'
    );
    assert.equal(
        moment().subtract({ s: 30 }).fromNow(),
        'mõni sekund tagasi',
        'a few seconds ago'
    );

    assert.equal(
        moment().add({ m: 1 }).fromNow(),
        'ühe minuti pärast',
        'in a minute'
    );
    assert.equal(
        moment().subtract({ m: 1 }).fromNow(),
        'üks minut tagasi',
        'a minute ago'
    );

    assert.equal(
        moment().add({ m: 5 }).fromNow(),
        '5 minuti pärast',
        'in 5 minutes'
    );
    assert.equal(
        moment().subtract({ m: 5 }).fromNow(),
        '5 minutit tagasi',
        '5 minutes ago'
    );

    assert.equal(
        moment().add({ d: 1 }).fromNow(),
        'ühe päeva pärast',
        'in one day'
    );
    assert.equal(
        moment().subtract({ d: 1 }).fromNow(),
        'üks päev tagasi',
        'one day ago'
    );

    assert.equal(
        moment().add({ d: 5 }).fromNow(),
        '5 päeva pärast',
        'in 5 days'
    );
    assert.equal(
        moment().subtract({ d: 5 }).fromNow(),
        '5 päeva tagasi',
        '5 days ago'
    );

    assert.equal(
        moment().add({ M: 1 }).fromNow(),
        'kuu aja pärast',
        'in a month'
    );
    assert.equal(
        moment().subtract({ M: 1 }).fromNow(),
        'kuu aega tagasi',
        'a month ago'
    );

    assert.equal(
        moment().add({ M: 5 }).fromNow(),
        '5 kuu pärast',
        'in 5 months'
    );
    assert.equal(
        moment().subtract({ M: 5 }).fromNow(),
        '5 kuud tagasi',
        '5 months ago'
    );

    assert.equal(
        moment().add({ y: 1 }).fromNow(),
        'ühe aasta pärast',
        'in a year'
    );
    assert.equal(
        moment().subtract({ y: 1 }).fromNow(),
        'aasta tagasi',
        'a year ago'
    );

    assert.equal(
        moment().add({ y: 5 }).fromNow(),
        '5 aasta pärast',
        'in 5 years'
    );
    assert.equal(
        moment().subtract({ y: 5 }).fromNow(),
        '5 aastat tagasi',
        '5 years ago'
    );
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(), 'Täna, 12:00', 'today at the same time');
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'Täna, 12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'Täna, 13:00',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'Homme, 12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'Täna, 11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'Eile, 12:00',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('[Järgmine] dddd LT'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('[Järgmine] dddd LT'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('[Järgmine] dddd LT'),
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
            m.format('[Eelmine] dddd LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('[Eelmine] dddd LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('[Eelmine] dddd LT'),
            'Today - ' + i + ' days end of day'
        );
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({ w: 1 }),
        weeksFromNow = moment().add({ w: 1 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 nädal tagasi');
    assert.equal(
        weeksFromNow.calendar(),
        weeksFromNow.format('L'),
        '1 nädala pärast'
    );

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 nädalat tagasi');
    assert.equal(
        weeksFromNow.calendar(),
        weeksFromNow.format('L'),
        '2 nädala pärast'
    );
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '52 52 52.',
        'Jan  1 2012 should be week 52'
    );
    assert.equal(
        moment([2012, 0, 2]).format('w ww wo'),
        '1 01 1.',
        'Jan  2 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '1 01 1.',
        'Jan  8 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 9]).format('w ww wo'),
        '2 02 2.',
        'Jan  9 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 15]).format('w ww wo'),
        '2 02 2.',
        'Jan 15 2012 should be week 2'
    );
});
