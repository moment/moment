import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('he');

test('parse', function (assert) {
    var tests = 'ינואר ינו׳_פברואר פבר׳_מרץ מרץ_אפריל אפר׳_מאי מאי_יוני יוני_יולי יולי_אוגוסט אוג׳_ספטמבר ספט׳_אוקטובר אוק׳_נובמבר נוב׳_דצמבר דצמ׳'.split(
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
                'ראשון, פברואר 14 2010, 3:25:50 אחה"צ',
            ],
            ['ddd, h A', 'א׳, 3 אחרי הצהריים'],
            ['M Mo MM MMMM MMM', '2 2 02 פברואר פבר׳'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14 14'],
            ['d do dddd ddd dd', '0 0 ראשון א׳ א'],
            ['DDD DDDo DDDD', '45 45 045'],
            ['w wo ww', '8 8 08'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'אחה"צ אחרי הצהריים'],
            ['[the] DDDo [day of the year]', 'the 45 day of the year'],
            ['LTS', '15:25:50'],
            ['L', '14/02/2010'],
            ['LL', '14 בפברואר 2010'],
            ['LLL', '14 בפברואר 2010 15:25'],
            ['LLLL', 'ראשון, 14 בפברואר 2010 15:25'],
            ['l', '14/2/2010'],
            ['ll', '14 פבר׳ 2010'],
            ['lll', '14 פבר׳ 2010 15:25'],
            ['llll', 'א׳, 14 פבר׳ 2010 15:25'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format month', function (assert) {
    var expected = 'ינואר ינו׳_פברואר פבר׳_מרץ מרץ_אפריל אפר׳_מאי מאי_יוני יוני_יולי יולי_אוגוסט אוג׳_ספטמבר ספט׳_אוקטובר אוק׳_נובמבר נוב׳_דצמבר דצמ׳'.split(
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
    var expected = 'ראשון א׳ א|שני ב׳ ב|שלישי ג׳ ג|רביעי ד׳ ד|חמישי ה׳ ה|שישי ו׳ ו|שבת ש׳ ש'.split(
            '|'
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
        'מספר שניות',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'דקה',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'דקה',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 דקות',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 דקות',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'שעה',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'שעה',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        'שעתיים',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 שעות',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 שעות',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'יום',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'יום',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        'יומיים',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'יום',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 ימים',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 ימים',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'חודש',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'חודש',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'חודש',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        'חודשיים',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        'חודשיים',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 חודשים',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'חודש',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 חודשים',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'שנה',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        'שנתיים',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 3699 }), true),
        '10 שנים',
        '345 days = 10 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 7340 }), true),
        '20 שנה',
        '548 days = 20 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'שנה',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 שנים',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'בעוד מספר שניות', 'prefix');
    assert.equal(moment(0).from(30000), 'לפני מספר שניות', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'לפני מספר שניות',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'בעוד מספר שניות',
        'in a few seconds'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), 'בעוד 5 ימים', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'היום ב־12:00',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'היום ב־12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'היום ב־13:00',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'מחר ב־12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'היום ב־11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'אתמול ב־12:00',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd [בשעה] LT'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [בשעה] LT'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [בשעה] LT'),
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
            m.format('[ביום] dddd [האחרון בשעה] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('[ביום] dddd [האחרון בשעה] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('[ביום] dddd [האחרון בשעה] LT'),
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

test('weeks year starting sunday format', function (assert) {
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '1 01 1',
        'Jan  1 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 7]).format('w ww wo'),
        '1 01 1',
        'Jan  7 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '2 02 2',
        'Jan  8 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 14]).format('w ww wo'),
        '2 02 2',
        'Jan 14 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 15]).format('w ww wo'),
        '3 03 3',
        'Jan 15 2012 should be week 3'
    );
});
