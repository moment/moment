import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';

localeModule('am-et');

test('parse', function (assert) {
    var tests =
            'ጃንዩወሪ ጃን_ፌብሩወሪ ፌብ_ማርች ማር_ኤፕሪል ኤፕር_ሜይ ሜይ_ጁን ጁን_ጁላይ ጁላይ_ኦገስት ኦገ_ሴፕቴምበር ሴፕ_ኦክቶበር ኦክቶ_ኖቬምበር ኖቬ_ዲሴምበር ዲሴ'.split(
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

    for (i = 0; i < 12; i++) {
        tests[i] = tests[i].split(' ');
        equalTest(tests[i][0], 'MMM', i);
        equalTest(tests[i][1], 'MMM', i);
        equalTest(tests[i][0], 'MMMM', i);
        equalTest(tests[i][1], 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            [
                'dddd, MMMM Do YYYY, h:mm:ss a',
                'ሀሙስ, ጃንዩወሪ 14ኛ 2010, 3:25:50 ከሰዓት',
            ],
            ['ddd, hA', 'ሀሙ, 3ከሰዓት'],
            ['M Mo MM MMMM MMM', '1 1ኛ 01 ጃንዩወሪ ጃን'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14ኛ 14'],
            ['d do dddd ddd dd', '4 4ኛ ሀሙስ ሀሙ ሀ'],
            ['DDD DDDo DDDD', '14 14ኛ 014'],
            ['w wo ww', '3 3ኛ 03'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'ከሰዓት ከሰዓት'],
            ['[ዓመተ] DDDD', 'ዓመተ 014'],
            ['LTS', '3:25:50 ከሰዓት'],
            ['L', '14/01/2010'],
            ['LL', '14 ጃንዩወሪ 2010'],
            ['LLL', '14 ጃንዩወሪ 2010 3:25 ከሰዓት'],
            ['LLLL', 'ሀሙስ, 14 ጃንዩወሪ 2010 3:25 ከሰዓት'],
        ],
        b = moment(new Date(2010, 0, 14, 15, 25, 50, 125)),
        i;

    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('calendar', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'ዛሬ በ 12:00 ከሰዓት',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'ነገ በ 12:00 ከሰዓት',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'ትናንትና በ 12:00 ከሰዓት',
        'yesterday at the same time'
    );
});

test('relative time', function (assert) {
    assert.equal(moment(0).from(30000), 'ጥቂት ሰከንዶች በፊት', 'a few seconds ago');
    assert.equal(moment(30000).from(0), 'ጥቂት ሰከንዶች ውስጥ', 'in a few seconds');
    assert.equal(
        moment().add({ m: 1 }).fromNow(),
        'አንድ ደቂቃ ውስጥ',
        'in a minute'
    );
    assert.equal(
        moment().subtract({ m: 1 }).fromNow(),
        'አንድ ደቂቃ በፊት',
        'a minute ago'
    );
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '1 01 1ኛ',
        'Jan  1 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 7]).format('w ww wo'),
        '1 01 1ኛ',
        'Jan  7 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '2 02 2ኛ',
        'Jan  8 2012 should be week 2'
    );
});
