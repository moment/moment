import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('or');

test('parse', function (assert) {
    var tests =
            'ଜାନୁଆରୀ ଜାନ_ଫେବ୍ରୁୟାରୀ ଫେବ୍ରୁ_ମାର୍ଚ୍ଚ ମାର୍_ଅପ୍ରେଲ ଅପ୍ରଲ_ମେ ମେ_ଜୁନ ଜୁନ_ଜୁଲାଇ ଜୁଲ_ଅଗଷ୍ଟ ଅଗଷ୍ଟ_ସେପ୍ଟେମ୍ବର ସେପ୍_ଅକ୍ଟୋବର ଅକ୍ଟୋବ_ନଭେମ୍ବର ନଭେମ_ଡିସେମ୍ବର ଡିସେ'.split(
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
                'dddd, Do ତାରିଖ MMMM YYYY, a h:mm:ss',
                'ରବିବାର, 14ର୍ଥ ତାରିଖ ଫେବ୍ରୁୟାରୀ 2010, ଅପରାହ୍ନ 3:25:50',
            ],
            ['ddd, a h ଘଣ୍ଟା', 'ରବି, ଅପରାହ୍ନ 3 ଘଣ୍ଟା'],
            ['M Mo ମାସ MM MMMM MMM', '2 2ର୍ଥ ମାସ 02 ଫେବ୍ରୁୟାରୀ ଫେବ୍ରୁ'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14ର୍ଥ 14'],
            ['d do dddd ddd dd', '0 0ର୍ଥ ରବିବାର ରବି ର'],
            ['DDD DDDo DDDD', '45 45ର୍ଥ 045'],
            ['w wo ww', '8 8ର୍ଥ 08'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'ଅପରାହ୍ନ ଅପରାହ୍ନ'],
            ['LTS', 'ଅପରାହ୍ନ 3:25:50'],
            ['L', '14/02/2010'],
            ['LL', '14 ଫେବ୍ରୁୟାରୀ 2010'],
            ['LLL', '14 ଫେବ୍ରୁୟାରୀ 2010, ଅପରାହ୍ନ 3:25'],
            ['LLLL', 'ରବିବାର, 14 ଫେବ୍ରୁୟାରୀ 2010, ଅପରାହ୍ନ 3:25'],
            ['l', '14/2/2010'],
            ['ll', '14 ଫେବ୍ରୁ 2010'],
            ['lll', '14 ଫେବ୍ରୁ 2010, ଅପରାହ୍ନ 3:25'],
            ['llll', 'ରବି, 14 ଫେବ୍ରୁ 2010, ଅପରାହ୍ନ 3:25'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1ର୍ଥ', '1ର୍ଥ');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2ର୍ଥ', '2ର୍ଥ');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3ର୍ଥ', '3ର୍ଥ');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4ର୍ଥ', '4ର୍ଥ');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5ର୍ଥ', '5ର୍ଥ');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6ର୍ଥ', '6ର୍ଥ');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7ର୍ଥ', '7ର୍ଥ');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8ର୍ଥ', '8ର୍ଥ');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9ର୍ଥ', '9ର୍ଥ');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10ର୍ଥ', '10ର୍ଥ');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11ର୍ଥ', '11ର୍ଥ');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12ର୍ଥ', '12ର୍ଥ');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13ର୍ଥ', '13ର୍ଥ');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14ର୍ଥ', '14ର୍ଥ');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15ର୍ଥ', '15ର୍ଥ');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16ର୍ଥ', '16ର୍ଥ');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17ର୍ଥ', '17ର୍ଥ');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18ର୍ଥ', '18ର୍ଥ');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19ର୍ଥ', '19ର୍ଥ');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20ର୍ଥ', '20ର୍ଥ');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21ର୍ଥ', '21ର୍ଥ');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22ର୍ଥ', '22ର୍ଥ');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23ର୍ଥ', '23ର୍ଥ');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24ର୍ଥ', '24ର୍ଥ');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25ର୍ଥ', '25ର୍ଥ');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26ର୍ଥ', '26ର୍ଥ');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27ର୍ଥ', '27ର୍ଥ');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28ର୍ଥ', '28ର୍ଥ');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29ର୍ଥ', '29ର୍ଥ');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30ର୍ଥ', '30ର୍ଥ');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31ର୍ଥ', '31ର୍ଥ');
});

test('format month', function (assert) {
    var expected =
            'ଜାନୁଆରୀ ଜାନ_ଫେବ୍ରୁୟାରୀ ଫେବ୍ରୁ_ମାର୍ଚ୍ଚ ମାର୍_ଅପ୍ରେଲ ଅପ୍ରଲ_ମେ ମେ_ଜୁନ ଜୁନ_ଜୁଲାଇ ଜୁଲ_ଅଗଷ୍ଟ ଅଗଷ୍ଟ_ସେପ୍ଟେମ୍ବର ସେପ୍_ଅକ୍ଟୋବର ଅକ୍ଟୋବ_ନଭେମ୍ବର ନଭେମ_ଡିସେମ୍ବର ଡିସେ'.split(
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
            'ରବିବାର ରବି ର_ସୋମବାର ସୋମ ସୋ_ମଙ୍ଗଳବାର ମଙ୍ଗଳ ମ_ବୁଧବାର ବୁଧ ବୁ_ଗୁରୁବାର ଗୁରୁବ ଗୁ_ଶୁକ୍ରବାର ଶୁକ୍ରବ ଶୁ_ଶନିବାର ଶନି ଶ'.split(
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
        'କିଛି ସେକେଣ୍ଡ୍ |',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'ଏକ ମିନିଟ୍ |',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'ଏକ ମିନିଟ୍ |',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 ମିନିଟ୍ |',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 ମିନିଟ୍ |',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'ଏକ ଘଣ୍ଟା',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'ଏକ ଘଣ୍ଟା',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 ଘଣ୍ଟା',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 ଘଣ୍ଟା',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 ଘଣ୍ଟା',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'ଗୋଟେ ଦିନ',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'ଗୋଟେ ଦିନ',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 ଦିନ',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'ଗୋଟେ ଦିନ',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 ଦିନ',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 ଦିନ',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'ଏକ ମାସ',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'ଏକ ମାସ',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'ଏକ ମାସ',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 ମାସଗୁଡିକ',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 ମାସଗୁଡିକ',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 ମାସଗୁଡିକ',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'ଏକ ମାସ',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 ମାସଗୁଡିକ',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'ଗୋଟିଏ ବର୍ଷ',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 ବର୍ଷ',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'ଗୋଟିଏ ବର୍ଷ',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 ବର୍ଷ',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'କିଛି ସେକେଣ୍ଡ୍ | ରେ', 'prefix');
    assert.equal(moment(0).from(30000), 'କିଛି ସେକେଣ୍ଡ୍ | ପୂର୍ବରୁ', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'କିଛି ସେକେଣ୍ଡ୍ | ପୂର୍ବରୁ',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'କିଛି ସେକେଣ୍ଡ୍ | ରେ',
        'କିଛି ସେକେଣ୍ଡ୍ | ରେ'
    );
    assert.equal(
        moment().add({ d: 5 }).fromNow(),
        '5 ଦିନ ରେ',
        '5 ଦିନ ରେ'
    );
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'ଆଜି | ଅପରାହ୍ନ 12:00',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'ଆଜି | ଅପରାହ୍ନ 12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 3 }).calendar(),
        'ଆଜି | ଅପରାହ୍ନ 3:00',
        'Now plus 3 hours'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'ଆସନ୍ତାକାଲି | ଅପରାହ୍ନ 12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'ଆଜି | ଅପରାହ୍ନ 11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'ଗତକାଲି ଅପରାହ୍ନ 12:00',
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
            m.format('[ଶେଷ] dddd[,] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('[ଶେଷ] dddd[,] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('[ଶେଷ] dddd[,] LT'),
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
        'ରାତି',
        'before dawn'
    );
    assert.equal(moment([2011, 2, 23, 9, 30]).format('a'), 'ସକାଳ', 'morning');
    assert.equal(
        moment([2011, 2, 23, 14, 30]).format('a'),
        'ଅପରାହ୍ନ',
        'during day'
    );
    assert.equal(
        moment([2011, 2, 23, 17, 30]).format('a'),
        'ସନ୍ଧ୍ୟା',
        'evening'
    );
    assert.equal(
        moment([2011, 2, 23, 19, 30]).format('a'),
        'ସନ୍ଧ୍ୟା',
        'late evening'
    );
    assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'ରାତି', 'night');

    assert.equal(
        moment([2011, 2, 23, 2, 30]).format('A'),
        'ରାତି',
        'before dawn'
    );
    assert.equal(moment([2011, 2, 23, 9, 30]).format('A'), 'ସକାଳ', 'morning');
    assert.equal(
        moment([2011, 2, 23, 14, 30]).format('A'),
        'ଅପରାହ୍ନ',
        ' during day'
    );
    assert.equal(
        moment([2011, 2, 23, 17, 30]).format('A'),
        'ସନ୍ଧ୍ୟା',
        'evening'
    );
    assert.equal(
        moment([2011, 2, 23, 19, 30]).format('A'),
        'ସନ୍ଧ୍ୟା',
        'late evening'
    );
    assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'ରାତି', 'night');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '1 01 1ର୍ଥ',
        'Jan  1 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 7]).format('w ww wo'),
        '1 01 1ର୍ଥ',
        'Jan  7 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '2 02 2ର୍ଥ',
        'Jan  8 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 14]).format('w ww wo'),
        '2 02 2ର୍ଥ',
        'Jan 14 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 15]).format('w ww wo'),
        '3 03 3ର୍ଥ',
        'Jan 15 2012 should be week 3'
    );
});
