import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('bo');

test('parse', function (assert) {
    var tests = 'ཟླ་བ་དང་པོ ཟླ་༡_ཟླ་བ་གཉིས་པ ཟླ་༢_ཟླ་བ་གསུམ་པ ཟླ་༣_ཟླ་བ་བཞི་པ ཟླ་༤_ཟླ་བ་ལྔ་པ ཟླ་༥_ཟླ་བ་དྲུག་པ ཟླ་༦_ཟླ་བ་བདུན་པ ཟླ་༧_ཟླ་བ་བརྒྱད་པ ཟླ་༨_ཟླ་བ་དགུ་པ ཟླ་༩_ཟླ་བ་བཅུ་པ ཟླ་༡༠_ཟླ་བ་བཅུ་གཅིག་པ ཟླ་༡༡_ཟླ་བ་བཅུ་གཉིས་པ ཟླ་༡༢'.split(
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

        // Failing only for month 1 (index 0)
        // equalTestStrict(tests[i][1], 'MMM', i);
        equalTestStrict(tests[i][0], 'MMMM', i);
        // Failing only for month 1 (index 0)
        // equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
        // Failing only for month 1 (index 0)
        // equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
        equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            [
                'dddd, Do MMMM YYYY, a h:mm:ss ལ་',
                'གཟའ་ཉི་མ་, ༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥:༥༠ ལ་',
            ],
            ['ddd, a h ལ་', 'ཉི་མ་, ཉིན་གུང ༣ ལ་'],
            ['M Mo MM MMMM MMM', '༢ ༢ ༠༢ ཟླ་བ་གཉིས་པ ཟླ་༢'],
            ['YYYY YY', '༢༠༡༠ ༡༠'],
            ['D Do DD', '༡༤ ༡༤ ༡༤'],
            ['d do dddd ddd dd', '༠ ༠ གཟའ་ཉི་མ་ ཉི་མ་ ཉི'],
            ['DDD DDDo DDDD', '༤༥ ༤༥ ༠༤༥'],
            ['w wo ww', '༨ ༨ ༠༨'],
            ['h hh', '༣ ༠༣'],
            ['H HH', '༡༥ ༡༥'],
            ['m mm', '༢༥ ༢༥'],
            ['s ss', '༥༠ ༥༠'],
            ['a A', 'ཉིན་གུང ཉིན་གུང'],
            ['LT', 'ཉིན་གུང ༣:༢༥'],
            ['LTS', 'ཉིན་གུང ༣:༢༥:༥༠'],
            ['L', '༡༤/༠༢/༢༠༡༠'],
            ['LL', '༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠'],
            ['LLL', '༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
            ['LLLL', 'གཟའ་ཉི་མ་, ༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
            ['l', '༡༤/༢/༢༠༡༠'],
            ['ll', '༡༤ ཟླ་༢ ༢༠༡༠'],
            ['lll', '༡༤ ཟླ་༢ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
            ['llll', 'ཉི་མ་, ༡༤ ཟླ་༢ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '༡', '༡');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '༢', '༢');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '༣', '༣');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '༤', '༤');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '༥', '༥');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '༦', '༦');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '༧', '༧');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '༨', '༨');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '༩', '༩');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '༡༠', '༡༠');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '༡༡', '༡༡');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '༡༢', '༡༢');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '༡༣', '༡༣');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '༡༤', '༡༤');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '༡༥', '༡༥');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '༡༦', '༡༦');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '༡༧', '༡༧');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '༡༨', '༡༨');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '༡༩', '༡༩');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '༢༠', '༢༠');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '༢༡', '༢༡');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '༢༢', '༢༢');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '༢༣', '༢༣');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '༢༤', '༢༤');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '༢༥', '༢༥');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '༢༦', '༢༦');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '༢༧', '༢༧');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '༢༨', '༢༨');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '༢༩', '༢༩');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '༣༠', '༣༠');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '༣༡', '༣༡');
});

test('format month', function (assert) {
    var expected = 'ཟླ་བ་དང་པོ ཟླ་༡_ཟླ་བ་གཉིས་པ ཟླ་༢_ཟླ་བ་གསུམ་པ ཟླ་༣_ཟླ་བ་བཞི་པ ཟླ་༤_ཟླ་བ་ལྔ་པ ཟླ་༥_ཟླ་བ་དྲུག་པ ཟླ་༦_ཟླ་བ་བདུན་པ ཟླ་༧_ཟླ་བ་བརྒྱད་པ ཟླ་༨_ཟླ་བ་དགུ་པ ཟླ་༩_ཟླ་བ་བཅུ་པ ཟླ་༡༠_ཟླ་བ་བཅུ་གཅིག་པ ཟླ་༡༡_ཟླ་བ་བཅུ་གཉིས་པ ཟླ་༡༢'.split(
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
    var expected = 'གཟའ་ཉི་མ་ ཉི་མ་ ཉི_གཟའ་ཟླ་བ་ ཟླ་བ་ ཟླ_གཟའ་མིག་དམར་ མིག་དམར་ མིག_གཟའ་ལྷག་པ་ ལྷག་པ་ ལྷག_གཟའ་ཕུར་བུ ཕུར་བུ ཕུར_གཟའ་པ་སངས་ པ་སངས་ སངས_གཟའ་སྤེན་པ་ སྤེན་པ་ སྤེན'.split(
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
        'ལམ་སང',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'སྐར་མ་གཅིག',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'སྐར་མ་གཅིག',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '༢ སྐར་མ',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '༤༤ སྐར་མ',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'ཆུ་ཚོད་གཅིག',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'ཆུ་ཚོད་གཅིག',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '༢ ཆུ་ཚོད',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '༥ ཆུ་ཚོད',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '༢༡ ཆུ་ཚོད',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'ཉིན་གཅིག',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'ཉིན་གཅིག',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '༢ ཉིན་',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'ཉིན་གཅིག',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '༥ ཉིན་',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '༢༥ ཉིན་',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'ཟླ་བ་གཅིག',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'ཟླ་བ་གཅིག',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'ཟླ་བ་གཅིག',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '༢ ཟླ་བ',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '༢ ཟླ་བ',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '༣ ཟླ་བ',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'ཟླ་བ་གཅིག',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '༥ ཟླ་བ',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'ལོ་གཅིག',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '༢ ལོ',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'ལོ་གཅིག',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '༥ ལོ',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'ལམ་སང ལ་', 'prefix');
    assert.equal(moment(0).from(30000), 'ལམ་སང སྔན་ལ', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'ལམ་སང སྔན་ལ',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(moment().add({ s: 30 }).fromNow(), 'ལམ་སང ལ་', 'ལམ་སང ལ་');
    assert.equal(moment().add({ d: 5 }).fromNow(), '༥ ཉིན་ ལ་', '༥ ཉིན་ ལ་');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'དི་རིང ཉིན་གུང ༡༢:༠༠',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'དི་རིང ཉིན་གུང ༡༢:༢༥',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 3 }).calendar(),
        'དི་རིང ཉིན་གུང ༣:༠༠',
        'Now plus 3 hours'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'སང་ཉིན ཉིན་གུང ༡༢:༠༠',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'དི་རིང ཉིན་གུང ༡༡:༠༠',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'ཁ་སང ཉིན་གུང ༡༢:༠༠',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('[བདུན་ཕྲག་རྗེས་མ][,] LT'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('[བདུན་ཕྲག་རྗེས་མ][,] LT'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('[བདུན་ཕྲག་རྗེས་མ][,] LT'),
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
            m.format('[བདུན་ཕྲག་མཐའ་མ] dddd[,] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('[བདུན་ཕྲག་མཐའ་མ] dddd[,] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('[བདུན་ཕྲག་མཐའ་མ] dddd[,] LT'),
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
        'མཚན་མོ',
        'before dawn'
    );
    assert.equal(
        moment([2011, 2, 23, 9, 30]).format('a'),
        'ཞོགས་ཀས',
        'morning'
    );
    assert.equal(
        moment([2011, 2, 23, 14, 30]).format('a'),
        'ཉིན་གུང',
        'during day'
    );
    assert.equal(
        moment([2011, 2, 23, 17, 30]).format('a'),
        'དགོང་དག',
        'evening'
    );
    assert.equal(
        moment([2011, 2, 23, 19, 30]).format('a'),
        'དགོང་དག',
        'late evening'
    );
    assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'མཚན་མོ', 'night');

    assert.equal(
        moment([2011, 2, 23, 2, 30]).format('A'),
        'མཚན་མོ',
        'before dawn'
    );
    assert.equal(
        moment([2011, 2, 23, 9, 30]).format('A'),
        'ཞོགས་ཀས',
        'morning'
    );
    assert.equal(
        moment([2011, 2, 23, 14, 30]).format('A'),
        'ཉིན་གུང',
        ' during day'
    );
    assert.equal(
        moment([2011, 2, 23, 17, 30]).format('A'),
        'དགོང་དག',
        'evening'
    );
    assert.equal(
        moment([2011, 2, 23, 19, 30]).format('A'),
        'དགོང་དག',
        'late evening'
    );
    assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'མཚན་མོ', 'night');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '༡ ༠༡ ༡',
        'Jan  1 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 7]).format('w ww wo'),
        '༡ ༠༡ ༡',
        'Jan  7 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '༢ ༠༢ ༢',
        'Jan  8 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 14]).format('w ww wo'),
        '༢ ༠༢ ༢',
        'Jan 14 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 15]).format('w ww wo'),
        '༣ ༠༣ ༣',
        'Jan 15 2012 should be week 3'
    );
});
