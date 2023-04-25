import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('gu');

test('parse', function (assert) {
    var tests =
            'જાન્યુઆરી જાન્યુ._ફેબ્રુઆરી ફેબ્રુ._માર્ચ માર્ચ_એપ્રિલ એપ્રિ._મે મે_જૂન જૂન_જુલાઈ જુલા._ઑગસ્ટ ઑગ._સપ્ટેમ્બર સપ્ટે._ઑક્ટ્બર ઑક્ટ્._નવેમ્બર નવે._ડિસેમ્બર ડિસે..'.split(
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

        // Fails only for month 12 (index 11)
        // equalTestStrict(tests[i][1], 'MMM', i);
        equalTestStrict(tests[i][0], 'MMMM', i);
        // Fails only for month 12 (index 11)
        // equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
        // Fails only for month 12 (index 11)
        // equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
        equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            [
                'dddd, Do MMMM YYYY, a h:mm:ss વાગ્યે',
                'રવિવાર, ૧૪ ફેબ્રુઆરી ૨૦૧૦, બપોર ૩:૨૫:૫૦ વાગ્યે',
            ],
            ['ddd, a h વાગ્યે', 'રવિ, બપોર ૩ વાગ્યે'],
            ['M Mo MM MMMM MMM', '૨ ૨ ૦૨ ફેબ્રુઆરી ફેબ્રુ.'],
            ['YYYY YY', '૨૦૧૦ ૧૦'],
            ['D Do DD', '૧૪ ૧૪ ૧૪'],
            ['d do dddd ddd dd', '૦ ૦ રવિવાર રવિ ર'],
            ['DDD DDDo DDDD', '૪૫ ૪૫ ૦૪૫'],
            ['w wo ww', '૮ ૮ ૦૮'],
            ['h hh', '૩ ૦૩'],
            ['H HH', '૧૫ ૧૫'],
            ['m mm', '૨૫ ૨૫'],
            ['s ss', '૫૦ ૫૦'],
            ['a A', 'બપોર બપોર'],
            ['LTS', 'બપોર ૩:૨૫:૫૦ વાગ્યે'],
            ['L', '૧૪/૦૨/૨૦૧૦'],
            ['LL', '૧૪ ફેબ્રુઆરી ૨૦૧૦'],
            ['LLL', '૧૪ ફેબ્રુઆરી ૨૦૧૦, બપોર ૩:૨૫ વાગ્યે'],
            ['LLLL', 'રવિવાર, ૧૪ ફેબ્રુઆરી ૨૦૧૦, બપોર ૩:૨૫ વાગ્યે'],
            ['l', '૧૪/૨/૨૦૧૦'],
            ['ll', '૧૪ ફેબ્રુ. ૨૦૧૦'],
            ['lll', '૧૪ ફેબ્રુ. ૨૦૧૦, બપોર ૩:૨૫ વાગ્યે'],
            ['llll', 'રવિ, ૧૪ ફેબ્રુ. ૨૦૧૦, બપોર ૩:૨૫ વાગ્યે'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '૧', '૧');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '૨', '૨');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '૩', '૩');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '૪', '૪');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '૫', '૫');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '૬', '૬');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '૭', '૭');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '૮', '૮');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '૯', '૯');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '૧૦', '૧૦');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '૧૧', '૧૧');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '૧૨', '૧૨');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '૧૩', '૧૩');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '૧૪', '૧૪');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '૧૫', '૧૫');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '૧૬', '૧૬');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '૧૭', '૧૭');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '૧૮', '૧૮');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '૧૯', '૧૯');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '૨૦', '૨૦');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '૨૧', '૨૧');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '૨૨', '૨૨');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '૨૩', '૨૩');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '૨૪', '૨૪');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '૨૫', '૨૫');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '૨૬', '૨૬');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '૨૭', '૨૭');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '૨૮', '૨૮');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '૨૯', '૨૯');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '૩૦', '૩૦');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '૩૧', '૩૧');
});

test('format month', function (assert) {
    var expected =
            'જાન્યુઆરી જાન્યુ._ફેબ્રુઆરી ફેબ્રુ._માર્ચ માર્ચ_એપ્રિલ એપ્રિ._મે મે_જૂન જૂન_જુલાઈ જુલા._ઑગસ્ટ ઑગ._સપ્ટેમ્બર સપ્ટે._ઑક્ટ્બર ઑક્ટ્._નવેમ્બર નવે._ડિસેમ્બર ડિસે.'.split(
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
            'રવિવાર રવિ ર_સોમવાર સોમ સો_મંગળવાર મંગળ મં_બુધ્વાર બુધ્ બુ_ગુરુવાર ગુરુ ગુ_શુક્રવાર શુક્ર શુ_શનિવાર શનિ શ'.split(
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
        'અમુક પળો',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'એક મિનિટ',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'એક મિનિટ',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '૨ મિનિટ',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '૪૪ મિનિટ',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'એક કલાક',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'એક કલાક',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '૨ કલાક',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '૫ કલાક',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '૨૧ કલાક',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'એક દિવસ',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'એક દિવસ',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '૨ દિવસ',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'એક દિવસ',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '૫ દિવસ',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '૨૫ દિવસ',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'એક મહિનો',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'એક મહિનો',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'એક મહિનો',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '૨ મહિનો',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '૨ મહિનો',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '૩ મહિનો',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'એક મહિનો',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '૫ મહિનો',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'એક વર્ષ',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '૨ વર્ષ',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'એક વર્ષ',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '૫ વર્ષ',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'અમુક પળો મા', 'prefix');
    assert.equal(moment(0).from(30000), 'અમુક પળો પહેલા', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'અમુક પળો પહેલા',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'અમુક પળો મા',
        'અમુક પળો મા'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), '૫ દિવસ મા', '૫ દિવસ મા');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'આજ બપોર ૧૨:૦૦ વાગ્યે',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'આજ બપોર ૧૨:૨૫ વાગ્યે',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 3 }).calendar(),
        'આજ બપોર ૩:૦૦ વાગ્યે',
        'Now plus 3 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'કાલે બપોર ૧૨:૦૦ વાગ્યે',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'આજ બપોર ૧૧:૦૦ વાગ્યે',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'ગઇકાલે બપોર ૧૨:૦૦ વાગ્યે',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd[,] LT'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd[,] LT'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd[,] LT'),
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
            m.format('[પાછલા] dddd[,] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('[પાછલા] dddd[,] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('[પાછલા] dddd[,] LT'),
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

test('meridiem', function (assert) {
    assert.equal(
        moment([2011, 2, 23, 2, 30]).format('a'),
        'રાત',
        'before dawn'
    );
    assert.equal(moment([2011, 2, 23, 9, 30]).format('a'), 'સવાર', 'morning');
    assert.equal(
        moment([2011, 2, 23, 14, 30]).format('a'),
        'બપોર',
        'during day'
    );
    assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), 'સાંજ', 'evening');
    assert.equal(
        moment([2011, 2, 23, 19, 30]).format('a'),
        'સાંજ',
        'late evening'
    );
    assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'રાત', 'night');

    assert.equal(
        moment([2011, 2, 23, 2, 30]).format('A'),
        'રાત',
        'before dawn'
    );
    assert.equal(moment([2011, 2, 23, 9, 30]).format('A'), 'સવાર', 'morning');
    assert.equal(
        moment([2011, 2, 23, 14, 30]).format('A'),
        'બપોર',
        ' during day'
    );
    assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), 'સાંજ', 'evening');
    assert.equal(
        moment([2011, 2, 23, 19, 30]).format('A'),
        'સાંજ',
        'late evening'
    );
    assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'રાત', 'night');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '૧ ૦૧ ૧',
        'Jan  1 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 7]).format('w ww wo'),
        '૧ ૦૧ ૧',
        'Jan  7 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '૨ ૦૨ ૨',
        'Jan  8 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 14]).format('w ww wo'),
        '૨ ૦૨ ૨',
        'Jan 14 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 15]).format('w ww wo'),
        '૩ ૦૩ ૩',
        'Jan 15 2012 should be week 3'
    );
});
