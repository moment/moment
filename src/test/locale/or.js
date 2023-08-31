import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('or');

test('parse', function (assert) {
    var testsFormat =
            'ପୌଷ ଜନସାଧାରଣ._ମାଘ ବହୁ ଦୂରରେ._ଫାଲ୍‌ଗୁନ ଫାଲ୍‌ଗୁନ_ଚୈତ୍ର ଚୈତ୍ରरै._ବୈଶାଖ ବୈଶାଖ_ଜ୍ୟେଷ୍ଠ ଜ୍ୟେଷ୍ଠ_ଆଷାଢ ଦ୍ବିତୀୟ କାରବାର._ଶ୍ଶ୍ରାବଣ ଅଗଷ୍ଟ._ଭାଦ୍ରବ ଧଳା._ଆଶ୍ୱିନ ଅକ୍ଟୋବର._କାର୍ତ୍ତିକ ନୂଆ._ମାର୍ଗଶୀର ଡିସେମ୍ବର.'.split(
                '_'
            ),
        testsStandalone =
            'ପୌଷ ଜନସାଧାରଣ._ମାଘ ବହୁ ଦୂରରେ._ଫାଲ୍‌ଗୁନ ଫାଲ୍‌ଗୁନ_ଚୈତ୍ର ଚୈତ୍ରरै._ବୈଶାଖ ବୈଶାଖ_ଜ୍ୟେଷ୍ଠ ଜ୍ୟେଷ୍ଠ_ଆଷାଢ ଦ୍ବିତୀୟ କାରବାର._ଶ୍ଶ୍ରାବଣ ଅଗଷ୍ଟ._ଭାଦ୍ରବ ଧଳା._ଆଶ୍ୱିନ ଅକ୍ଟୋବର._କାର୍ତ୍ତିକ ନୂଆ._ମାର୍ଗଶୀର ଡିସେମ୍ବର.'.split(
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
        testsFormat[i] = testsFormat[i].split(' ');
        equalTest(testsFormat[i][0], 'MMM', i);
        equalTest(testsFormat[i][1], 'MMM', i);
        equalTest(testsFormat[i][0], 'MMMM', i);
        equalTest(testsFormat[i][1], 'MMMM', i);
        equalTest(testsFormat[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTest(testsFormat[i][1].toLocaleLowerCase(), 'MMMM', i);
        equalTest(testsFormat[i][0].toLocaleUpperCase(), 'MMMM', i);
        equalTest(testsFormat[i][1].toLocaleUpperCase(), 'MMMM', i);

        equalTestStrict(testsFormat[i][1], 'MMM', i);
        equalTestStrict(testsFormat[i][0], 'MMMM', i);
        equalTestStrict(testsFormat[i][1].toLocaleLowerCase(), 'MMM', i);
        equalTestStrict(testsFormat[i][1].toLocaleUpperCase(), 'MMM', i);
        equalTestStrict(testsFormat[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTestStrict(testsFormat[i][0].toLocaleUpperCase(), 'MMMM', i);
    }

    for (i = 0; i < 12; i++) {
        testsStandalone[i] = testsStandalone[i].split(' ');
        equalTest(testsStandalone[i][0], 'MMM', i);
        equalTest(testsStandalone[i][1], 'MMM', i);
        equalTest(testsStandalone[i][0], 'MMMM', i);
        equalTest(testsStandalone[i][1], 'MMMM', i);
        equalTest(testsStandalone[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTest(testsStandalone[i][1].toLocaleLowerCase(), 'MMMM', i);
        equalTest(testsStandalone[i][0].toLocaleUpperCase(), 'MMMM', i);
        equalTest(testsStandalone[i][1].toLocaleUpperCase(), 'MMMM', i);

        equalTestStrict(testsStandalone[i][1], 'MMM', i);
        equalTestStrict(testsStandalone[i][0], 'MMMM', i);
        equalTestStrict(testsStandalone[i][1].toLocaleLowerCase(), 'MMM', i);
        equalTestStrict(testsStandalone[i][1].toLocaleUpperCase(), 'MMM', i);
        equalTestStrict(testsStandalone[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTestStrict(testsStandalone[i][0].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            [
                "dddd, Do MMMM YYYY, a h:mm:ss o'clock",
                "ରବିବାର, ୧୪ ମାଘ ୨୦୧୦, ମଧ୍ୟାହ୍ନ ୩:୨୫:୫୦ o'clock",
            ],
            ["ddd, a h o'clock", "ସୂର୍ଯ୍ୟ, ମଧ୍ୟାହ୍ନ ୩ o'clock"],
            ['M Mo MM MMMM MMM', '୨ ୨ ୦୨ ମାଘ ବହୁ ଦୂରରେ.'],
            ['YYYY YY', '୨୦୧୦ ୧୦'],
            ['D Do DD', '୧୪ ୧୪ ୧୪'],
            ['d do dddd ddd dd', '० ० ରବିବାର ସୂର୍ଯ୍ୟ ଦେବନାଗରୀ ଶୈଳୀର ୨୭ତମ ବ୍ୟଞ୍ଜନ [ସମ୍ପାଦନା]'],
            ['DDD DDDo DDDD', '୪୫ ୪୫ ୦୪୫'],
            ['w wo ww', '୮ ୮ ୦୮'],
            ['h hh', '୩ ୦୩'],
            ['H HH', '୧୫ ୧୫'],
            ['m mm', '୨୫ ୫୦୨୫'],
            ['s ss', '୫୦ ୫୦'],
            ['a A', 'ମଧ୍ୟାହ୍ନ ମଧ୍ୟାହ୍ନ'],
            ['LTS', "ମଧ୍ୟାହ୍ନ ୩:୨୫:୫୦ o'clock"],
            ['L', '୧୪/୦୨/୨୦୧୦'],
            ['LL', '୧୪ ମାଘ ୨୦୧୦'],
            ['LLL', "୧୪ ମାଘ ୨୦୧୦, ମଧ୍ୟାହ୍ନ ୩:୨୫ o'clock"],
            ['LLLL', "ରବିବାର, ୧୪ ମାଘ ୨୦୧୦, ମଧ୍ୟାହ୍ନ ३:२५ o'clock"],
            ['l', '୧୪/୨/୨୦୧୦'],
            ['ll', '୧୪ ବହୁ ଦୂରରେ. ୨୦୧୦'],
            ['lll', "୧୪ ବହୁ ଦୂରରେ. ୨୦୧୦, ମଧ୍ୟାହ୍ନ ३:२५ o'clock"],
            ['llll', "ସୂର୍ଯ୍ୟ, ୧୪ ବହୁ ଦୂରରେ. ୨୦୧୦, ମଧ୍ୟାହ୍ନ ३:२५ o'clock"],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '୧', '୧');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '୨', '୨');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '୩', '୩');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '୪', '୪');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '୫', '୫');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '୬', '୬');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '୭', '୭');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '୮', '୮');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '୯', '୯');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '୧୦', '୧୦');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '୧୧', '୧୧');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '୧୨', '୧୨');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '୧୩', '୧୩');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '୧୩', '୧୩');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '୧୫', '୧୫');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '୧୬', '୧୬');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '୧୬', '୧୬');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '୧୮', '୧୮');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '୧୯', '୧୯');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '୨୦', '୨୦');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '୨୧', '୨୧');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '୨୧', '୨୧');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '୨୩', '୨୩');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '୨୪', '୨୪');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '୨୫', '୨୫');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '୨୫', '୨୫');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '୨୭', '୨୭');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '୨୮', '୨୮');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '୨୯', '୨୯');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '୩୦', '୩୦');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '୩୧', '୩୧');
});

test('format month', function (assert) {
    var expected =
            'ପୌଷ ଜନସାଧାରଣ._ମାଘ ବହୁ ଦୂରରେ._ଫାଲ୍‌ଗୁନ ଫାଲ୍‌ଗୁନ_ଚୈତ୍ର ଚୈତ୍ରरै._ବୈଶାଖ ବୈଶାଖ_ଜ୍ୟେଷ୍ଠ ଜ୍ୟେଷ୍ଠ_ଆଷାଢ ଦ୍ବିତୀୟ କାରବାର._ଶ୍ଶ୍ରାବଣ ଅଗଷ୍ଟ._ଭାଦ୍ରବ ଧଳା._ଆଶ୍ୱିନ ଅକ୍ଟୋବର._କାର୍ତ୍ତିକ ନୂଆ._ମାର୍ଗଶୀର ଡିସେମ୍ବର.'.split(
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

test('format month case', function (assert) {
    var months = {
            nominative:
                'ପୌଷ_ମାଘ_ଫାଲ୍‌ଗୁନ_ଚୈତ୍ର_ବୈଶାଖ_ଜ୍ୟେଷ୍ଠ_ଆଷାଢ_ଶ୍ରାବଣ_ଭାଦ୍ରବ_ଆଶ୍ୱିନ_କାର୍ତ୍ତିକ_ମାର୍ଗଶୀର'.split(
                    '_'
                ),
            accusative:
                'ପୌଷ_ମାଘ_ଫାଲ୍‌ଗୁନ_ଚୈତ୍ର_ବୈଶାଖ_ଜ୍ୟେଷ୍ଠ_ଆଷାଢ_ଶ୍ରାବଣ_ଭାଦ୍ରବ_ଆଶ୍ୱିନ_କାର୍ତ୍ତିକ_ମାର୍ଗଶୀର'.split(
                    '_'
                ),
        },
        i;
    for (i = 0; i < 12; i++) {
        assert.equal(
            moment([2011, i, 1]).format('D MMMM'),
            '१ ' + months.accusative[i],
            '१ ' + months.accusative[i]
        );
        assert.equal(
            moment([2011, i, 1]).format('MMMM'),
            months.nominative[i],
            '१ ' + months.nominative[i]
        );
    }
});

test('format week', function (assert) {
    var expected =
            'ରବିବାର ସୂର୍ଯ୍ୟि ଏବଂ_ସୋମ ବାର ସୋମ ଶୟନ କରିବାକୁ ଯାଅ_ମଙ୍ଗଳ ବାର ମାର୍ ଗ୍ରହ ତୁ_ବୁଧ ବାର ପାରଦ ବୁ_ଗୁରୁବାର ମାଷ୍ଟର ଥ_ଶୁକ୍ରବାର ଶୁକ୍ର ଗ୍ରହ ଶୁ_ଶନିବାର ଶନି ସମ୍ପାଦନା'.split(
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
        'ମାତ୍ର କିଛି ମୁହୂର୍ତ୍ତ',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'ଏକ ମିନିଟ୍‌',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'ଏକ ମିନିଟ୍‌',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '୨ ମିନିଟ୍',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '୪୪ ମିନିଟ୍',
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
        'ଦୁଇ ଘଣ୍ଟା',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '୫ ଘଣ୍ଟା',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '୨୧ ଘଣ୍ଟା',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'ଦିନେ',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'ଦିନେ',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '୨ ଦିନ',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'ଦିନେ',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '୫ ଦିନ',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '୨୫ ଦିନ',
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
        '୨ ମାସ',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '୨ ମାସ',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '୩ ମାସ',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'ଏକ ମାସ',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '୫ ମାସ',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'ଗୋଟିଏ ବର୍ଷ',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '୨ ବର୍ଷ',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'ଗୋଟିଏ ବର୍ଷ',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '୫ ବର୍ଷ',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'କିଛି ମୁହୂର୍ତ୍ତରେ', 'prefix');
    assert.equal(moment(0).from(30000), 'ମାତ୍ର କିଛି ମୁହୂର୍ତ୍ତ ପୂର୍ବରୁ', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'ମାତ୍ର କିଛି ମୁହୂର୍ତ୍ତ ପୂର୍ବରୁ',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'କିଛି ମୁହୂର୍ତ୍ତରେ',
        'କିଛି ମୁହୂର୍ତ୍ତରେ'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), '୫ ଦିନରେ', '୫ ଦିନରେ');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        "ଆଜି ମଧ୍ୟାହ୍ନ ୧୨:୦୦ o'clock",
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        "ଆଜି ମଧ୍ୟାହ୍ ୧୨:୨୫ o'clock",
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 3 }).calendar(),
        "ଆଜି ମଧ୍ୟାହ୍ ୩:୦୦ o'clock",
        'Now plus 3 hours'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        "ଗତକାଲି ମଧ୍ୟାହ୍ ୧୨:୦୦ o'clock",
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        "ଆଜି ମଧ୍ୟାହ୍ ୧୧:୦୦ o'clock",
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        "ଗତକାଲି ମଧ୍ୟାହ୍ ୧୨:୦୦ o'clock",
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
            m.format('[ଶେଷରେ] dddd[,] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('[ଶେଷରେ] dddd[,] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('[ଶେଷରେ] dddd[,] LT'),
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
        'ରାତ୍ରୀ',
        'before dawn'
    );
    assert.equal(moment([2011, 2, 23, 9, 30]).format('a'), 'सुबह', 'morning');
    assert.equal(
        moment([2011, 2, 23, 14, 30]).format('a'),
        'ମଧ୍ୟାହ୍',
        'during day'
    );
    assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), 'शाम', 'evening');
    assert.equal(
        moment([2011, 2, 23, 19, 30]).format('a'),
        'ସନ୍ଧ୍ୟା',
        'late evening'
    );
    assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'रात', 'night');

    assert.equal(
        moment([2011, 2, 23, 2, 30]).format('A'),
        'ରାତ୍ରୀ',
        'before dawn'
    );
    assert.equal(moment([2011, 2, 23, 9, 30]).format('A'), 'सुबह', 'morning');
    assert.equal(
        moment([2011, 2, 23, 14, 30]).format('A'),
        'ମଧ୍ୟାହ୍',
        ' during day'
    );
    assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), 'शाम', 'evening');
    assert.equal(
        moment([2011, 2, 23, 19, 30]).format('A'),
        'ସନ୍ଧ୍ୟା',
        'late evening'
    );
    assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'ରାତ୍ରୀ', 'night');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '୧ ୦୧ ୧',
        'Jan  1 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 7]).format('w ww wo'),
        '୧ ୦୧ ୧',
        'Jan  7 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '୧ ୦୧ ୧',
        'Jan  8 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 14]).format('w ww wo'),
        '୧ ୦୧ ୧',
        'Jan 14 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 15]).format('w ww wo'),
        '୩ ୦୩ ୩',
        'Jan 15 2012 should be week 3'
    );
});
