import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('ku-kmr');

test('parse', function (assert) {
    var i,
        tests = [
            'Rêbendan Rêb',
            'Sibat Sib',
            'Adar Ada',
            'Nîsan Nîs',
            'Gulan Gul',
            'Hezîran Hez',
            'Tîrmeh Tîr',
            'Tebax Teb',
            'Îlon Îlo',
            'Cotmeh Cot',
            'Mijdar Mij',
            'Berfanbar Ber',
        ];

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
                'dddd, Do MMMM YYYY, h:mm:ss a',
                'Yekşem, 14ê Sibat 2010, 3:25:50 pn',
            ],
            ['ddd, hA', 'Yek, 3PN'],
            ['M Mo MM MMMM MMM', '2 2. 02 Sibat Sib'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14ê 14'],
            ['d do dddd ddd dd', '0 0ê Yekşem Yek Ye'],
            ['DDD DDDo DDDD', '45 45ê 045'],
            ['w wo ww', '6 6. 06'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'pn PN'],
            ['DDDo [Adarê]', '45ê Adarê'],
            ['LTS', '15:25:50'],
            ['L', '14.02.2010'],
            ['LL', '14ê Sibata 2010an'],
            ['LLL', '14ê Sibata 2010an 15:25'],
            ['LLLL', 'Yekşem, 14ê Sibata 2010an 15:25'],
            ['l', '14.2.2010'],
            ['ll', '14ê Sib. 2010an'],
            ['lll', '14ê Sib. 2010an 15:25'],
            ['llll', 'Yek., 14ê Sib. 2010an 15:25'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;

    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('parse era', function (assert) {
    assert.equal(moment('2010 AD', 'y N', true).isValid(), true, '2010 AD');
    assert.equal(moment('2010 AD', 'y N', true).year(), 2010, '2010 AD');

    assert.equal(
        moment('2010 Anno Domini', 'y N', true).isValid(),
        false,
        '2010 Anno Domini'
    );
    assert.equal(
        moment('2010 Anno Domini', 'y N', false).isValid(),
        true,
        '2010 Anno Domini'
    );
    assert.equal(
        moment('2010 Anno Domini', 'y NNNN', true).isValid(),
        true,
        '2010 Anno Domini'
    );
    assert.equal(
        moment('2010 Anno Domini', 'y NNNN', true).year(),
        2010,
        '2010 Anno Domini'
    );
    assert.equal(
        moment('2010 Anno Domini', 'y N', false).year(),
        2010,
        '2010 Anno Domini'
    );

    assert.equal(moment('469 BC', 'y N', true).isValid(), true, '469 BC');
    assert.equal(moment('469 BC', 'y N', true).year(), -468, '469 BC');

    assert.equal(
        moment('469 Before Christ', 'y NNNN', true).isValid(),
        true,
        '469 Before Christ'
    );
    assert.equal(
        moment('469 Before Christ', 'y NNNN', true).year(),
        -468,
        '469 Before Christ'
    );
});

test('format era', function (assert) {
    var a = [
            ['+000001-01-01', 'N, NN, NNN', 'AD, AD, AD'],
            ['+000001-01-01', 'NNNN', 'Anno Domini'],
            ['+000001-01-01', 'NNNNN', 'AD'],
            ['+000001-01-01', 'y', '1'],

            ['+000000-12-31', 'N, NN, NNN', 'BC, BC, BC'],
            ['+000000-12-31', 'NNNN', 'Before Christ'],
            ['+000000-12-31', 'NNNNN', 'BC'],
            ['+000000-12-31', 'y', '1'],

            ['-000001-12-31', 'N, NN, NNN', 'BC, BC, BC'],
            ['-000001-12-31', 'NNNN', 'Before Christ'],
            ['-000001-12-31', 'NNNNN', 'BC'],
            ['-000001-12-31', 'y', '2'],
        ],
        i,
        l;

    for (i = 0, l = a.length; i < l; ++i) {
        assert.equal(
            moment(a[i][0]).format(a[i][1]),
            a[i][2],
            a[i][0] + '; ' + a[i][1] + ' ---> ' + a[i][2]
        );
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1ê', '1st');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2yê', '2nd');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3yê', '3rd');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4ê', '4th');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5ê', '5th');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6ê', '6th');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7ê', '7th');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8ê', '8th');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9ê', '9th');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10ê', '10th');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11ê', '11th');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12ê', '12th');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13ê', '13th');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14ê', '14th');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15ê', '15th');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16ê', '16th');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17ê', '17th');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18ê', '18th');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19ê', '19th');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20ê', '20th');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21ê', '21st');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22yê', '22nd');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23yê', '23rd');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24ê', '24th');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25ê', '25th');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26ê', '26th');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27ê', '27th');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28ê', '28th');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29ê', '29th');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30ê', '30th');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31ê', '31st');
});

test('format month', function (assert) {
    var i,
        expected = [
            'Rêbendan Rêb',
            'Sibat Sib',
            'Adar Ada',
            'Nîsan Nîs',
            'Gulan Gul',
            'Hezîran Hez',
            'Tîrmeh Tîr',
            'Tebax Teb',
            'Îlon Îlo',
            'Cotmeh Cot',
            'Mijdar Mij',
            'Berfanbar Ber',
        ];

    for (i = 0; i < expected.length; i++) {
        assert.equal(
            moment([2011, i, 1]).format('MMMM MMM'),
            expected[i],
            expected[i]
        );
    }
});

test('format week', function (assert) {
    var i,
        expected = [
            'Yekşem Yek Ye',
            'Duşem Du Du',
            'Sêşem Sê Sê',
            'Çarşem Çar Ça',
            'Pêncşem Pên Pê',
            'În În În',
            'Şemî Şem Şe',
        ];

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
        'çend sanîye',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'deqîqeyek',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'deqîqeyek',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 deqîqe',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 deqîqe',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'saetek',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'saetek',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 saet',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 saet',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 saet',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'rojek',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'rojek',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 roj',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'rojek',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 roj',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 roj',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'mehek',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'mehek',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'mehek',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 meh',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 meh',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 meh',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'mehek',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 meh',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'salek',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 sal',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'salek',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 sal',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'di çend sanîyeyan de', 'prefix');
    assert.equal(moment(0).from(30000), 'berî çend sanîyeyan', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'berî çend sanîyeyan',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'di çend sanîyeyan de',
        'in a few seconds'
    );
    assert.equal(
        moment().add({ d: 5 }).fromNow(),
        'di 5 rojan de',
        'in 5 days'
    );
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'Îro di saet 12:00 de',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'Îro di saet 12:25 de',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'Îro di saet 13:00 de',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'Sibê di saet 12:00 de',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'Îro di saet 11:00 de',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'Duh di saet 12:00 de',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd [di saet] LT [de]'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [di saet] LT [de]'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [di saet] LT [de]'),
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
            m.format('dddd[a borî di saet] LT [de]'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd[a borî di saet] LT [de]'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd[a borî di saet] LT [de]'),
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

test('weekdays strict parsing', function (assert) {
    var m = moment('2015-01-01T12', moment.ISO_8601, true),
        locale = moment.localeData('ku-kmr'),
        i;

    for (i = 0; i < 7; ++i) {
        assert.equal(
            moment(locale.weekdays(m.day(i), ''), 'dddd', true).isValid(),
            true,
            'parse weekday ' + i
        );
        assert.equal(
            moment(locale.weekdaysShort(m.day(i), ''), 'ddd', true).isValid(),
            true,
            'parse short weekday ' + i
        );
        assert.equal(
            moment(locale.weekdaysMin(m.day(i), ''), 'dd', true).isValid(),
            true,
            'parse min weekday ' + i
        );
    }
});
