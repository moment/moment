import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('tzm');

test('parse', function (assert) {
    var tests = 'ⵉⵏⵏⴰⵢⵔ ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ ⴷⵓⵊⵏⴱⵉⵔ'.split(
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
                'ⴰⵙⴰⵎⴰⵙ, ⴱⵕⴰⵢⵕ 14 2010, 3:25:50 pm',
            ],
            ['ddd, hA', 'ⴰⵙⴰⵎⴰⵙ, 3PM'],
            ['M Mo MM MMMM MMM', '2 2 02 ⴱⵕⴰⵢⵕ ⴱⵕⴰⵢⵕ'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14 14'],
            ['d do dddd ddd dd', '0 0 ⴰⵙⴰⵎⴰⵙ ⴰⵙⴰⵎⴰⵙ ⴰⵙⴰⵎⴰⵙ'],
            ['DDD DDDo DDDD', '45 45 045'],
            ['w wo ww', '8 8 08'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'pm PM'],
            ['[the] DDDo [day of the year]', 'the 45 day of the year'],
            ['LTS', '15:25:50'],
            ['L', '14/02/2010'],
            ['LL', '14 ⴱⵕⴰⵢⵕ 2010'],
            ['LLL', '14 ⴱⵕⴰⵢⵕ 2010 15:25'],
            ['LLLL', 'ⴰⵙⴰⵎⴰⵙ 14 ⴱⵕⴰⵢⵕ 2010 15:25'],
            ['l', '14/2/2010'],
            ['ll', '14 ⴱⵕⴰⵢⵕ 2010'],
            ['lll', '14 ⴱⵕⴰⵢⵕ 2010 15:25'],
            ['llll', 'ⴰⵙⴰⵎⴰⵙ 14 ⴱⵕⴰⵢⵕ 2010 15:25'],
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
    var expected = 'ⵉⵏⵏⴰⵢⵔ ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ ⴷⵓⵊⵏⴱⵉⵔ'.split(
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
    var expected = 'ⴰⵙⴰⵎⴰⵙ ⴰⵙⴰⵎⴰⵙ ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ ⴰⵢⵏⴰⵙ ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ ⴰⵙⵉⵏⴰⵙ ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ ⴰⴽⵔⴰⵙ ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ ⴰⴽⵡⴰⵙ ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ ⴰⵙⵉⵎⵡⴰⵙ ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ ⴰⵙⵉⴹⵢⴰⵙ ⴰⵙⵉⴹⵢⴰⵙ'.split(
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
        'ⵉⵎⵉⴽ',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'ⵎⵉⵏⵓⴺ',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'ⵎⵉⵏⵓⴺ',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 ⵎⵉⵏⵓⴺ',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 ⵎⵉⵏⵓⴺ',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'ⵙⴰⵄⴰ',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'ⵙⴰⵄⴰ',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 ⵜⴰⵙⵙⴰⵄⵉⵏ',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 ⵜⴰⵙⵙⴰⵄⵉⵏ',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 ⵜⴰⵙⵙⴰⵄⵉⵏ',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'ⴰⵙⵙ',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'ⴰⵙⵙ',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 oⵙⵙⴰⵏ',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'ⴰⵙⵙ',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 oⵙⵙⴰⵏ',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 oⵙⵙⴰⵏ',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'ⴰⵢoⵓⵔ',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'ⴰⵢoⵓⵔ',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'ⴰⵢoⵓⵔ',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 ⵉⵢⵢⵉⵔⵏ',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 ⵉⵢⵢⵉⵔⵏ',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 ⵉⵢⵢⵉⵔⵏ',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'ⴰⵢoⵓⵔ',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 ⵉⵢⵢⵉⵔⵏ',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'ⴰⵙⴳⴰⵙ',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 ⵉⵙⴳⴰⵙⵏ',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'ⴰⵙⴳⴰⵙ',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 ⵉⵙⴳⴰⵙⵏ',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ ⵉⵎⵉⴽ', 'prefix');
    assert.equal(moment(0).from(30000), 'ⵢⴰⵏ ⵉⵎⵉⴽ', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'ⵢⴰⵏ ⵉⵎⵉⴽ',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ ⵉⵎⵉⴽ',
        'in a few seconds'
    );
    assert.equal(
        moment().add({ d: 5 }).fromNow(),
        'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ 5 oⵙⵙⴰⵏ',
        'in 5 days'
    );
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'ⴰⵙⴷⵅ ⴴ 12:00',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'ⴰⵙⴷⵅ ⴴ 12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'ⴰⵙⴷⵅ ⴴ 13:00',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'ⴰⵙⴽⴰ ⴴ 12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'ⴰⵙⴷⵅ ⴴ 11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'ⴰⵚⴰⵏⵜ ⴴ 12:00',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd [ⴴ] LT'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [ⴴ] LT'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [ⴴ] LT'),
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
            m.format('dddd [ⴴ] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [ⴴ] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [ⴴ] LT'),
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
        moment([2011, 11, 31]).format('w ww wo'),
        '1 01 1',
        'Dec 31 2011 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 6]).format('w ww wo'),
        '1 01 1',
        'Jan  6 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 7]).format('w ww wo'),
        '2 02 2',
        'Jan  7 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 13]).format('w ww wo'),
        '2 02 2',
        'Jan 13 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 14]).format('w ww wo'),
        '3 03 3',
        'Jan 14 2012 should be week 3'
    );
});
