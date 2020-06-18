import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('kk');

test('parse', function (assert) {
    var tests = 'қаңтар қаң_ақпан ақп_наурыз нау_сәуір сәу_мамыр мам_маусым мау_шілде шіл_тамыз там_қыркүйек қыр_қазан қаз_қараша қар_желтоқсан жел'.split(
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
                'dddd, Do MMMM YYYY, HH:mm:ss',
                'жексенбі, 14-ші ақпан 2010, 15:25:50',
            ],
            ['ddd, hA', 'жек, 3PM'],
            ['M Mo MM MMMM MMM', '2 2-ші 02 ақпан ақп'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14-ші 14'],
            ['d do dddd ddd dd', '0 0-ші жексенбі жек жк'],
            ['DDD DDDo DDDD', '45 45-ші 045'],
            ['w wo ww', '7 7-ші 07'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'pm PM'],
            ['[жылдың] DDDo [күні]', 'жылдың 45-ші күні'],
            ['LTS', '15:25:50'],
            ['L', '14.02.2010'],
            ['LL', '14 ақпан 2010'],
            ['LLL', '14 ақпан 2010 15:25'],
            ['LLLL', 'жексенбі, 14 ақпан 2010 15:25'],
            ['l', '14.2.2010'],
            ['ll', '14 ақп 2010'],
            ['lll', '14 ақп 2010 15:25'],
            ['llll', 'жек, 14 ақп 2010 15:25'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-ші', '1st');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-ші', '2nd');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-ші', '3rd');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-ші', '4th');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-ші', '5th');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-шы', '6th');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-ші', '7th');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-ші', '8th');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-шы', '9th');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-шы', '10th');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-ші', '11th');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-ші', '12th');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-ші', '13th');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-ші', '14th');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-ші', '15th');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-шы', '16th');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-ші', '17th');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-ші', '18th');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-шы', '19th');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-шы', '20th');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-ші', '21st');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-ші', '22nd');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-ші', '23rd');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-ші', '24th');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-ші', '25th');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-шы', '26th');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-ші', '27th');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-ші', '28th');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-шы', '29th');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-шы', '30th');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-ші', '31st');
});

test('format month', function (assert) {
    var expected = 'қаңтар қаң_ақпан ақп_наурыз нау_сәуір сәу_мамыр мам_маусым мау_шілде шіл_тамыз там_қыркүйек қыр_қазан қаз_қараша қар_желтоқсан жел'.split(
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
    var expected = 'жексенбі жек жк_дүйсенбі дүй дй_сейсенбі сей сй_сәрсенбі сәр ср_бейсенбі бей бй_жұма жұм жм_сенбі сен сн'.split(
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
        'бірнеше секунд',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'бір минут',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'бір минут',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 минут',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 минут',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'бір сағат',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'бір сағат',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 сағат',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 сағат',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 сағат',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'бір күн',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'бір күн',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 күн',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'бір күн',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 күн',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 күн',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'бір ай',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'бір ай',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'бір ай',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 ай',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 ай',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 ай',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'бір ай',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 ай',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'бір жыл',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 жыл',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'бір жыл',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 жыл',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'бірнеше секунд ішінде', 'prefix');
    assert.equal(moment(0).from(30000), 'бірнеше секунд бұрын', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'бірнеше секунд бұрын',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'бірнеше секунд ішінде',
        'in a few seconds'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), '5 күн ішінде', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'Бүгін сағат 12:00',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'Бүгін сағат 12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'Бүгін сағат 13:00',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'Ертең сағат 12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'Бүгін сағат 11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'Кеше сағат 12:00',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd [сағат] LT'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [сағат] LT'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [сағат] LT'),
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
            m.format('[Өткен аптаның] dddd [сағат] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('[Өткен аптаның] dddd [сағат] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('[Өткен аптаның] dddd [сағат] LT'),
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
        '1 01 1-ші',
        'Jan  1 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 2]).format('w ww wo'),
        '2 02 2-ші',
        'Jan  2 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '2 02 2-ші',
        'Jan  8 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 9]).format('w ww wo'),
        '3 03 3-ші',
        'Jan  9 2012 should be week 3'
    );
    assert.equal(
        moment([2012, 0, 15]).format('w ww wo'),
        '3 03 3-ші',
        'Jan 15 2012 should be week 3'
    );
});
