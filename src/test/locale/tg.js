import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('tg');

test('parse', function (assert) {
    var tests =
            'январ янв_феврал фев_март мар_апрел апр_май май_июн июн_июл июл_август авг_сентябр сен_октябр окт_ноябр ноя_декабр дек'.split(
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
                'dddd, Do MMMM YYYY, h:mm:ss',
                'якшанбе, 14-ум феврали 2010, 3:25:50',
            ],
            ['ddd, h A', 'яшб, 3 рӯз'],
            ['M Mo MM MMMM MMM', '2 2-юм 02 феврал фев'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14-ум 14'],
            ['d do dddd ddd dd', '0 0-ум якшанбе яшб яш'],
            ['DDD DDDo DDDD', '45 45-ум 045'],
            ['w wo ww', '7 7-ум 07'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'рӯз рӯз'],
            ['DDDo [рӯзи сол]', '45-ум рӯзи сол'],
            ['LTS', '15:25:50'],
            ['L', '14.02.2010'],
            ['LL', '14 феврали 2010'],
            ['LLL', '14 феврали 2010 15:25'],
            ['LLLL', 'якшанбе, 14 феврали 2010 15:25'],
            ['l', '14.2.2010'],
            ['ll', '14 фев 2010'],
            ['lll', '14 фев 2010 15:25'],
            ['llll', 'яшб, 14 фев 2010 15:25'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format meridiem', function (assert) {
    assert.equal(moment([2012, 11, 28, 0, 0]).format('A'), 'шаб', 'night');
    assert.equal(moment([2012, 11, 28, 3, 59]).format('A'), 'шаб', 'night');
    assert.equal(moment([2012, 11, 28, 4, 0]).format('A'), 'субҳ', 'morning');
    assert.equal(moment([2012, 11, 28, 10, 59]).format('A'), 'субҳ', 'morning');
    assert.equal(moment([2012, 11, 28, 12, 0]).format('A'), 'рӯз', 'afternoon');
    assert.equal(
        moment([2012, 11, 28, 15, 59]).format('A'),
        'рӯз',
        'afternoon'
    );
    assert.equal(moment([2012, 11, 28, 17, 0]).format('A'), 'бегоҳ', 'evening');
    assert.equal(moment([2012, 11, 28, 23, 59]).format('A'), 'шаб', 'evening');
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-ум', '1st');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-юм', '2nd');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-юм', '3rd');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-ум', '4th');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-ум', '5th');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-ум', '6th');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-ум', '7th');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-ум', '8th');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-ум', '9th');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-ум', '10th');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-ум', '11th');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-ум', '12th');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-ум', '13th');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-ум', '14th');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-ум', '15th');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-ум', '16th');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-ум', '17th');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-ум', '18th');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-ум', '19th');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-ум', '20th');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-ум', '21st');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-юм', '22nd');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-юм', '23rd');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-ум', '24th');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-ум', '25th');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-ум', '26th');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-ум', '27th');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-ум', '28th');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-ум', '29th');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-юм', '30th');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-ум', '31st');
});

test('format month', function (assert) {
    var expected =
            'январ янв_феврал фев_март мар_апрел апр_май май_июн июн_июл июл_август авг_сентябр сен_октябр окт_ноябр ноя_декабр дек'.split(
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
            'якшанбе яшб яш_душанбе дшб дш_сешанбе сшб сш_чоршанбе чшб чш_панҷшанбе пшб пш_ҷумъа ҷум ҷм_шанбе шнб шб'.split(
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
        'якчанд сония',
        '44 сония = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'як дақиқа',
        '45 сония = як дақиқа'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'як дақиқа',
        '89 сония = як дақиқа'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 дақиқа',
        '90 сония = 2 дақиқа'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 дақиқа',
        '44 дақиқа = 44 дақиқа'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'як соат',
        '45 дақиқа = як соат'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'як соат',
        '89 дақиқа = як соат'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 соат',
        '90 дақиқа = 2 соат'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 соат',
        '5 соат = 5 соат'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 соат',
        '21 соат = 21 соат'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'як рӯз',
        '22 соат = як рӯз'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'як рӯз',
        '35 соат = як рӯз'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 рӯз',
        '36 соат = 2 рӯз'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'як рӯз',
        '1 рӯз = як рӯз'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 рӯз',
        '5 рӯз = 5 рӯз'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 рӯз',
        '25 рӯз = 25 рӯз'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'як моҳ',
        '26 рӯз = як моҳ'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'як моҳ',
        '30 рӯз = як моҳ'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'як моҳ',
        '43 рӯз = як моҳ'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 моҳ',
        '46 рӯз = 2 моҳ'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 моҳ',
        '74 рӯз = 2 моҳ'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 моҳ',
        '76 рӯз = 3 моҳ'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'як моҳ',
        'як моҳ = як моҳ'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 моҳ',
        '5 моҳ = 5 моҳ'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'як сол',
        '345 рӯз = як сол'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 сол',
        '548 рӯз = 2 сол'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'як сол',
        '1 сол = як сол'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 сол',
        '5 сол = 5 сол'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'баъди якчанд сония', 'prefix');
    assert.equal(moment(0).from(30000), 'якчанд сония пеш', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'якчанд сония пеш',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'баъди якчанд сония',
        'in a few seconds'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), 'баъди 5 рӯз', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'Имрӯз соати 12:00',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'Имрӯз соати 12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'Имрӯз соати 13:00',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'Фардо соати 12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'Имрӯз соати 11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'Дирӯз соати 12:00',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd[и] [ҳафтаи оянда соати] LT'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd[и] [ҳафтаи оянда соати] LT'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd[и] [ҳафтаи оянда соати] LT'),
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
            m.format('dddd[и] [ҳафтаи гузашта соати] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd[и] [ҳафтаи гузашта соати] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd[и] [ҳафтаи гузашта соати] LT'),
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
        '1 01 1-ум',
        'Jan  1 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 2]).format('w ww wo'),
        '2 02 2-юм',
        'Jan  2 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '2 02 2-юм',
        'Jan  8 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 9]).format('w ww wo'),
        '3 03 3-юм',
        'Jan  9 2012 should be week 3'
    );
    assert.equal(
        moment([2012, 0, 15]).format('w ww wo'),
        '3 03 3-юм',
        'Jan 15 2012 should be week 3'
    );
});
