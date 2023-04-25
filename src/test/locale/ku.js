import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('ku');

var months = [
    'کانونی دووەم',
    'شوبات',
    'ئازار',
    'نیسان',
    'ئایار',
    'حوزەیران',
    'تەمموز',
    'ئاب',
    'ئەیلوول',
    'تشرینی یەكەم',
    'تشرینی دووەم',
    'كانونی یەکەم',
];

test('parse', function (assert) {
    var tests = months,
        i;
    function equalTest(input, mmm, i) {
        assert.equal(
            moment(input, mmm).month(),
            i,
            input +
                ' should be month ' +
                (i + 1) +
                ' instead is month ' +
                moment(input, mmm).month()
        );
    }
    for (i = 0; i < 12; i++) {
        equalTest(tests[i], 'MMM', i);
        equalTest(tests[i], 'MMM', i);
        equalTest(tests[i], 'MMMM', i);
        equalTest(tests[i], 'MMMM', i);
        equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);
        equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            [
                'dddd, MMMM Do YYYY, h:mm:ss a',
                'یه‌كشه‌ممه‌، شوبات ١٤ ٢٠١٠، ٣:٢٥:٥٠ ئێواره‌',
            ],
            ['ddd, hA', 'یه‌كشه‌م، ٣ئێواره‌'],
            ['M Mo MM MMMM MMM', '٢ ٢ ٠٢ شوبات شوبات'],
            ['YYYY YY', '٢٠١٠ ١٠'],
            ['D Do DD', '١٤ ١٤ ١٤'],
            ['d do dddd ddd dd', '٠ ٠ یه‌كشه‌ممه‌ یه‌كشه‌م ی'],
            ['DDD DDDo DDDD', '٤٥ ٤٥ ٠٤٥'],
            ['w wo ww', '٨ ٨ ٠٨'],
            ['h hh', '٣ ٠٣'],
            ['H HH', '١٥ ١٥'],
            ['m mm', '٢٥ ٢٥'],
            ['s ss', '٥٠ ٥٠'],
            ['a A', 'ئێواره‌ ئێواره‌'],
            ['[the] DDDo [day of the year]', 'the ٤٥ day of the year'],
            ['LTS', '١٥:٢٥:٥٠'],
            ['L', '١٤/٠٢/٢٠١٠'],
            ['LL', '١٤ شوبات ٢٠١٠'],
            ['LLL', '١٤ شوبات ٢٠١٠ ١٥:٢٥'],
            ['LLLL', 'یه‌كشه‌ممه‌، ١٤ شوبات ٢٠١٠ ١٥:٢٥'],
            ['l', '١٤/٢/٢٠١٠'],
            ['ll', '١٤ شوبات ٢٠١٠'],
            ['lll', '١٤ شوبات ٢٠١٠ ١٥:٢٥'],
            ['llll', 'یه‌كشه‌م، ١٤ شوبات ٢٠١٠ ١٥:٢٥'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '١', '1');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '٢', '2');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '٣', '3');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '٤', '4');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '٥', '5');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '٦', '6');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '٧', '7');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '٨', '8');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '٩', '9');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '١٠', '10');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '١١', '11');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '١٢', '12');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '١٣', '13');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '١٤', '14');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '١٥', '15');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '١٦', '16');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '١٧', '17');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '١٨', '18');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '١٩', '19');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '٢٠', '20');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '٢١', '21');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '٢٢', '22');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '٢٣', '23');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '٢٤', '24');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '٢٥', '25');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '٢٦', '26');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '٢٧', '27');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '٢٨', '28');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '٢٩', '29');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '٣٠', '30');
    assert.equal(moment([2011, 0, 31]).format('DDDo'), '٣١', '31');
});
//ok
test('format month', function (assert) {
    var expected = months,
        i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(
            moment([2011, i, 1]).format('MMMM'),
            expected[i],
            expected[i]
        );
        assert.equal(
            moment([2011, i, 1]).format('MMM'),
            expected[i],
            expected[i]
        );
    }
});

test('format week', function (assert) {
    var expected =
            'یه‌كشه‌ممه‌ یه‌كشه‌م ی_دووشه‌ممه‌ دووشه‌م د_سێشه‌ممه‌ سێشه‌م س_چوارشه‌ممه‌ چوارشه‌م چ_پێنجشه‌ممه‌ پێنجشه‌م پ_هه‌ینی هه‌ینی ه_شه‌ممه‌ شه‌ممه‌ ش'.split(
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
        'چه‌ند چركه‌یه‌ك',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'یه‌ك خوله‌ك',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'یه‌ك خوله‌ك',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '٢ خوله‌ك',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '٤٤ خوله‌ك',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'یه‌ك كاتژمێر',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'یه‌ك كاتژمێر',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '٢ كاتژمێر',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '٥ كاتژمێر',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '٢١ كاتژمێر',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'یه‌ك ڕۆژ',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'یه‌ك ڕۆژ',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '٢ ڕۆژ',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'یه‌ك ڕۆژ',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '٥ ڕۆژ',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '٢٥ ڕۆژ',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'یه‌ك مانگ',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'یه‌ك مانگ',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'یه‌ك مانگ',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '٢ مانگ',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '٢ مانگ',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '٣ مانگ',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'یه‌ك مانگ',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '٥ مانگ',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'یه‌ك ساڵ',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '٢ ساڵ',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'یه‌ك ساڵ',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '٥ ساڵ',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'له‌ چه‌ند چركه‌یه‌ك', 'prefix');
    assert.equal(moment(0).from(30000), 'چه‌ند چركه‌یه‌ك', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'چه‌ند چركه‌یه‌ك',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'له‌ چه‌ند چركه‌یه‌ك',
        'in a few seconds'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), 'له‌ ٥ ڕۆژ', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'ئه‌مرۆ كاتژمێر ١٢:٠٠',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'ئه‌مرۆ كاتژمێر ١٢:٢٥',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'ئه‌مرۆ كاتژمێر ١٣:٠٠',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'به‌یانی كاتژمێر ١٢:٠٠',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'ئه‌مرۆ كاتژمێر ١١:٠٠',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'دوێنێ كاتژمێر ١٢:٠٠',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd [كاتژمێر] LT'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [كاتژمێر] LT'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [كاتژمێر] LT'),
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
            m.format('dddd [كاتژمێر] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [كاتژمێر] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [كاتژمێر] LT'),
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
        '١ ٠١ ١',
        'Dec 31 2011 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 6]).format('w ww wo'),
        '١ ٠١ ١',
        'Jan  6 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 7]).format('w ww wo'),
        '٢ ٠٢ ٢',
        'Jan  7 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 13]).format('w ww wo'),
        '٢ ٠٢ ٢',
        'Jan 13 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 14]).format('w ww wo'),
        '٣ ٠٣ ٣',
        'Jan 14 2012 should be week 3'
    );
});

// locale-specific
test('ku strict mode parsing works', function (assert) {
    var m, formattedDate;
    m = moment().locale('ku');
    formattedDate = m.format('l');
    assert.equal(
        moment.utc(formattedDate, 'l', 'ku', false).isValid(),
        true,
        'Non-strict parsing works'
    );
    assert.equal(
        moment.utc(formattedDate, 'l', 'ku', true).isValid(),
        true,
        'Strict parsing must work'
    );
});
