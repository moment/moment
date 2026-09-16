import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('ota');

var months =
    'اوجاق_شباط_مارت_نیسان_مایس_حزیران_تموز_آغستوس_ایلول_أكيم_قاسم_آرالق'.split(
        '_'
    );

test('parse', function (assert) {
    var tests = months,
        i;
    function equalTest(input, mmm, i) {
        assert.equal(
            moment(input, mmm).month(),
            i,
            input + ' should be month ' + (i + 1)
        );
    }

    for (i = 0; i < 12; i++) {
        equalTest(tests[i], 'MMMM', i);
        equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            [
                'dddd, MMMM Do YYYY, h:mm:ss a',
                'پازار، شباط ١٤ ٢٠١٠، ٣:٢٥:٥٠ أوص',
            ],
            ['ddd, hA', 'پاز، ٣أوص'],
            ['M Mo MM MMMM MMM', "٢ ٢'نجی ٠٢ شباط شب"],
            ['YYYY YY', '٢٠١٠ ١٠'],
            ['D Do DD', '١٤ ١٤ ١٤'],
            ['d do dddd ddd dd', '٠ ٠ پازار پاز پز'],
            ['DDD DDDo DDDD', "٤٥ ٤٥'نجی ٠٤٥"],
            ['w wo ww', "٧ ٧'نجی ٠٧"],
            ['h hh', '٣ ٠٣'],
            ['H HH', '١٥ ١٥'],
            ['m mm', '٢٥ ٢٥'],
            ['s ss', '٥٠ ٥٠'],
            ['a A', 'أوص أوص'],
            ['LTS', '١٥:٢٥:٥٠'],
            ['L', '١٤.٠٢.٢٠١٠'],
            ['LL', '١٤ شباط ٢٠١٠'],
            ['LLL', '١٤ شباط ٢٠١٠ ١٥:٢٥'],
            ['LLLL', 'پازار، ١٤ شباط ٢٠١٠ ١٥:٢٥'],
            ['l', '١٤.٢.٢٠١٠'],
            ['ll', '١٤ شب ٢٠١٠'],
            ['lll', '١٤ شب ٢٠١٠ ١٥:٢٥'],
            ['llll', 'پاز، ١٤ شب ٢٠١٠ ١٥:٢٥'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), "١'نجی", '1');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), "٢'نجی", '2');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), "٣'نجی", '3');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), "٤'نجی", '4');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), "٥'نجی", '5');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), "١٠'نجی", '10');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), "٢٠'نجی", '20');
    assert.equal(moment([2011, 0, 31]).format('DDDo'), "٣١'نجی", '31');
});

test('format month', function (assert) {
    var expected = months,
        i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(
            moment([2011, i, 1]).format('MMMM'),
            expected[i],
            expected[i]
        );
    }
});

test('format week', function (assert) {
    var expected =
            'پازار پاز پز_پازارایرتسی پازت پت_صالی صال صا_چهارشنبە چهار چه_پرشنبە پرش پر_جمعە جم جم_جمعەایرتسی جمت جت'.split(
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
        'بر قاچ ثانیە',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'بر دقیقە',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'بر ساعت',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'بر گون',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'بر آی',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'بر ییل',
        '345 days = a year'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'بر قاچ ثانیە صوڭرە', 'prefix');
    assert.equal(moment(0).from(30000), 'بر قاچ ثانیە أوڭجە', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'بر قاچ ثانیە أوڭجە',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'بر قاچ ثانیە صوڭرە',
        'in a few seconds'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), '٥ گون صوڭرە', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'بوگون ساعت ١٢:٠٠',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'بوگون ساعت ١٢:٢٥',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'بوگون ساعت ١٣:٠٠',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'یارین ساعت ١٢:٠٠',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'بوگون ساعت ١١:٠٠',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'دون ١٢:٠٠',
        'yesterday at the same time'
    );
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        "١ ٠١ ١'نجی",
        'Jan 1 2012 should be week 1'
    );
});
