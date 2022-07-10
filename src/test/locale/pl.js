import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('pl');

test('months', function (assert) {
    assert.deepEqual(moment.months(), [
        'styczeń',
        'luty',
        'marzec',
        'kwiecień',
        'maj',
        'czerwiec',
        'lipiec',
        'sierpień',
        'wrzesień',
        'październik',
        'listopad',
        'grudzień',
    ]);
});

test('parse', function (assert) {
    var tests =
            'styczeń stycznia sty_luty lutego lut_marzec marca mar_kwiecień kwietnia kwi_maj maja maj_czerwiec czerwca cze_lipiec lipca lip_sierpień sierpnia sie_wrzesień września wrz_październik października paź_listopad listopada lis_grudzień grudnia gru'.split(
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
        equalTest(tests[i][2], 'MMM', i);
        equalTest(tests[i][0], 'MMMM', i);
        equalTest(tests[i][1], 'MMMM', i);
        equalTest(tests[i][2], 'MMMM', i);
        equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][2].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        equalTest(tests[i][2].toLocaleUpperCase(), 'MMMM', i);

        // Fails for all months
        // equalTestStrict(tests[i][0], 'MMM', i);
        equalTestStrict(tests[i][0], 'MMMM', i);
        equalTestStrict(tests[i][1], 'MMMM', i);
        // Fails for all months
        // equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMM', i);
        // Fails for all months
        // equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMM', i);
        equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
        equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('parse strict', function (assert) {
    var tests =
            'styczeń stycznia sty_luty lutego lut_marzec marca mar_kwiecień kwietnia kwi_maj maja maj_czerwiec czerwca cze_lipiec lipca lip_sierpień sierpnia sie_wrzesień września wrz_październik października paź_listopad listopada lis_grudzień grudnia gru'.split(
                '_'
            ),
        i;
    function equalTest(input, mmm, i) {
        assert.equal(
            moment(input, mmm, true).month(),
            i,
            input + ' should be month ' + (i + 1)
        );
    }
    for (i = 0; i < 12; i++) {
        tests[i] = tests[i].split(' ');
        equalTest(tests[i][0], 'MMMM', i);
        equalTest(tests[i][1], 'MMMM', i);
        equalTest(tests[i][2], 'MMM', i);
        equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][2].toLocaleLowerCase(), 'MMM', i);
        equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        equalTest(tests[i][2].toLocaleUpperCase(), 'MMM', i);
    }
});

test('format', function (assert) {
    var a = [
            [
                'dddd, MMMM Do YYYY, h:mm:ss a',
                'niedziela, luty 14. 2010, 3:25:50 pm',
            ],
            ['ddd, hA', 'ndz, 3PM'],
            ['M Mo MM MMMM MMM', '2 2. 02 luty lut'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14. 14'],
            ['d do dddd ddd dd', '0 0. niedziela ndz Nd'],
            ['DDD DDDo DDDD', '45 45. 045'],
            ['w wo ww', '6 6. 06'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'pm PM'],
            ['[the] DDDo [day of the year]', 'the 45. day of the year'],
            ['LTS', '15:25:50'],
            ['L', '14.02.2010'],
            ['LL', '14 lutego 2010'],
            ['LLL', '14 lutego 2010 15:25'],
            ['LLLL', 'niedziela, 14 lutego 2010 15:25'],
            ['l', '14.2.2010'],
            ['ll', '14 lut 2010'],
            ['lll', '14 lut 2010 15:25'],
            ['llll', 'ndz, 14 lut 2010 15:25'],
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
    var expected =
            'styczeń sty_luty lut_marzec mar_kwiecień kwi_maj maj_czerwiec cze_lipiec lip_sierpień sie_wrzesień wrz_październik paź_listopad lis_grudzień gru'.split(
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
    var expected =
            'niedziela ndz Nd_poniedziałek pon Pn_wtorek wt Wt_środa śr Śr_czwartek czw Cz_piątek pt Pt_sobota sob So'.split(
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
        'kilka sekund',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'minuta',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'minuta',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 minuty',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 minuty',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'godzina',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'godzina',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 godziny',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 godzin',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 godzin',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        '1 dzień',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        '1 dzień',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 dni',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        '1 dzień',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 dni',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 dni',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'miesiąc',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'miesiąc',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'miesiąc',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 miesiące',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 miesiące',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 miesiące',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'miesiąc',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 miesięcy',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'rok',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 lata',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'rok',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 lat',
        '5 years = 5 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 112 }), true),
        '112 lat',
        '112 years = 112 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 122 }), true),
        '122 lata',
        '122 years = 122 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 213 }), true),
        '213 lat',
        '213 years = 213 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 223 }), true),
        '223 lata',
        '223 years = 223 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'za kilka sekund', 'prefix');
    assert.equal(moment(0).from(30000), 'kilka sekund temu', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'kilka sekund temu',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'za kilka sekund',
        'in a few seconds'
    );
    assert.equal(moment().add({ h: 1 }).fromNow(), 'za godzinę', 'in an hour');
    assert.equal(moment().add({ d: 5 }).fromNow(), 'za 5 dni', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'Dziś o 12:00',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'Dziś o 12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'Dziś o 13:00',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'Jutro o 12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'Dziś o 11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'Wczoraj o 12:00',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;

    function makeFormat(d) {
        switch (d.day()) {
            case 0:
                return '[W niedzielę o] LT';

            case 2:
                return '[We wtorek o] LT';

            case 3:
                return '[W środę o] LT';

            case 6:
                return '[W sobotę o] LT';

            default:
                return '[W] dddd [o] LT';
        }
    }

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format(makeFormat(m)),
            'Today + ' + i + ' days current time'
        );

        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format(makeFormat(m)),
            'Today + ' + i + ' days beginning of day'
        );

        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format(makeFormat(m)),
            'Today + ' + i + ' days end of day'
        );
    }
});

test('calendar last week', function (assert) {
    var i, m;

    function makeFormat(d) {
        switch (d.day()) {
            case 0:
                return '[W zeszłą niedzielę o] LT';
            case 3:
                return '[W zeszłą środę o] LT';
            case 6:
                return '[W zeszłą sobotę o] LT';
            default:
                return '[W zeszły] dddd [o] LT';
        }
    }

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        assert.equal(
            m.calendar(),
            m.format(makeFormat(m)),
            'Today - ' + i + ' days current time'
        );

        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format(makeFormat(m)),
            'Today - ' + i + ' days beginning of day'
        );

        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format(makeFormat(m)),
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
