import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';

localeModule('ps');

test('parse months', function (assert) {
    var standalone =
            'جنوري_فېبروري_مارچ_اپریل_مۍ_جون_جولای_اګست_سپتمبر_اکتوبر_نومبر_دسمبر'.split(
                '_'
            ),
        format =
            'جنوري_فبروري_مارچ_اپریل_مۍ_جون_جولای_اګست_سېپتمبر_اکتوبر_نومبر_دسمبر'.split(
                '_'
            ),
        i;

    for (i = 0; i < 12; i++) {
        assert.equal(
            moment(standalone[i], 'MMMM', true).month(),
            i,
            standalone[i] + ' should parse as a standalone month'
        );
        assert.equal(
            moment(format[i], 'MMMM', true).month(),
            i,
            format[i] + ' should parse as a format month'
        );
        assert.equal(
            moment(standalone[i], 'MMM', true).month(),
            i,
            standalone[i] + ' should parse as a short standalone month'
        );
        assert.equal(
            moment(format[i], 'MMM', true).month(),
            i,
            format[i] + ' should parse as a short format month'
        );
    }
});

test('format', function (assert) {
    var a = [
            ['MMMM', 'فېبروري'],
            ['MMM', 'فبروري'],
            ['D MMMM', '۱۴ فبروري'],
            ['D MMM', '۱۴ فبروري'],
            ['dddd ddd dd', 'یکشنبه یکشنبه ی'],
            ['YYYY YY', '۲۰۱۰ ۱۰'],
            ['M MM D DD', '۲ ۰۲ ۱۴ ۱۴'],
            ['H HH h hh', '۱۵ ۱۵ ۳ ۰۳'],
            ['m mm s ss', '۲۵ ۲۵ ۵۰ ۵۰'],
            ['a A', 'غ.و. غ.و.'],
            ['LTS', '۱۵:۲۵:۵۰'],
            ['L', '۲۰۱۰/۲/۱۴'],
            ['LL', '۱۴ فبروري ۲۰۱۰'],
            ['LLL', '۱۴ فبروري ۲۰۱۰ ۱۵:۲۵'],
            ['LLLL', 'یکشنبه ۱۴، فبروري، ۲۰۱۰ په ۱۵:۲۵'],
            ['Do', '۱۴'],
        ],
        date = moment(new Date(2010, 1, 14, 15, 25, 50)),
        i;

    for (i = 0; i < a.length; i++) {
        assert.equal(
            date.format(a[i][0]),
            a[i][1],
            a[i][0] + ' should format as ' + a[i][1]
        );
    }
});

test('format month context', function (assert) {
    assert.equal(
        moment([2011, 1, 1]).format('MMMM'),
        'فېبروري',
        'standalone February'
    );
    assert.equal(
        moment([2011, 1, 1]).format('D MMMM'),
        '۱ فبروري',
        'format February'
    );
    assert.equal(
        moment([2011, 8, 1]).format('MMMM'),
        'سپتمبر',
        'standalone September'
    );
    assert.equal(
        moment([2011, 8, 1]).format('D MMMM'),
        '۱ سېپتمبر',
        'format September'
    );
    assert.equal(
        moment([2011, 8, 1]).format('MMM'),
        'سپتمبر',
        'short standalone September'
    );
    assert.equal(
        moment([2011, 8, 1]).format('D MMM'),
        '۱ سېپتمبر',
        'short format September'
    );
});

test('format months', function (assert) {
    var expected =
            'جنوري جنوري_فېبروري فبروري_مارچ مارچ_اپریل اپریل_مۍ مۍ_جون جون_جولای جولای_اګست اګست_سپتمبر سپتمبر_اکتوبر اکتوبر_نومبر نومبر_دسمبر دسمبر'.split(
                '_'
            ),
        i;

    for (i = 0; i < 12; i++) {
        assert.equal(
            moment([2011, i, 1]).format('MMMM MMM'),
            expected[i],
            expected[i]
        );
    }
});

test('format weekdays', function (assert) {
    var expected =
            'یکشنبه یکشنبه ی_دوشنبه دوشنبه د_سه شنبه سه شنبه س_چهارشنبه چهارشنبه چ_پنج شنبه پنج شنبه پ_جمعه جمعه ج_شنبه شنبه ش'.split(
                '_'
            ),
        i;

    for (i = 0; i < 7; i++) {
        assert.equal(
            moment([2011, 0, 2 + i]).format('dddd ddd dd'),
            expected[i],
            expected[i]
        );
    }
});

test('preparse and postformat', function (assert) {
    var parsed = moment('۲۰۱۰/۲/۱۴', 'YYYY/M/D', true);

    assert.ok(parsed.isValid(), 'Pashto digits should parse');
    assert.equal(parsed.year(), 2010, 'year');
    assert.equal(parsed.month(), 1, 'month');
    assert.equal(parsed.date(), 14, 'day');
    assert.equal(
        parsed.format('YYYY/M/D'),
        '۲۰۱۰/۲/۱۴',
        'Pashto digits should format'
    );
    assert.equal(
        moment([2010, 1, 14]).format('[a,b]'),
        'a،b',
        'comma should format'
    );
});

test('relative time without suffix', function (assert) {
    var start = moment([2007, 1, 28]);

    assert.equal(
        start.from(moment(start).add(44, 'seconds'), true),
        'څو ثانيې',
        '44 seconds'
    );
    assert.equal(
        start.from(moment(start).add(90, 'seconds'), true),
        '۲ دقيقې',
        '90 seconds'
    );
    assert.equal(
        start.from(moment(start).add(90, 'minutes'), true),
        '۲ ساعتونه',
        '90 minutes'
    );
    assert.equal(
        start.from(moment(start).add(36, 'hours'), true),
        '۲ ورځې',
        '36 hours'
    );
    assert.equal(
        start.from(moment(start).add(46, 'days'), true),
        '۲ مياشتې',
        '46 days'
    );
    assert.equal(
        start.from(moment(start).add(548, 'days'), true),
        '۲ کاله',
        '548 days'
    );
});

test('relative time future context', function (assert) {
    var start = moment([2007, 1, 28]),
        secondsThreshold = moment.relativeTimeThreshold('s'),
        secondsWithSuffixThreshold = moment.relativeTimeThreshold('ss');

    assert.equal(
        moment(start).add(30, 'seconds').from(start),
        'په څو ثانيو کې',
        'in a few seconds'
    );
    moment.relativeTimeThreshold('s', 60);
    moment.relativeTimeThreshold('ss', 0);
    assert.equal(
        moment(start).add(2, 'seconds').from(start),
        'په ۲ ثانيو کې',
        'in 2 seconds'
    );
    moment.relativeTimeThreshold('s', secondsThreshold);
    moment.relativeTimeThreshold('ss', secondsWithSuffixThreshold);
    assert.equal(
        moment(start).add(1, 'minute').from(start),
        'په يوه دقيقه کې',
        'in a minute'
    );
    assert.equal(
        moment(start).add(2, 'minutes').from(start),
        'په ۲ دقيقو کې',
        'in 2 minutes'
    );
    assert.equal(
        moment(start).add(1, 'hour').from(start),
        'په يو ساعت کې',
        'in an hour'
    );
    assert.equal(
        moment(start).add(2, 'hours').from(start),
        'په ۲ ساعتو کې',
        'in 2 hours'
    );
    assert.equal(
        moment(start).add(1, 'day').from(start),
        'په يوه ورځ کې',
        'in a day'
    );
    assert.equal(
        moment(start).add(2, 'days').from(start),
        'په ۲ ورځو کې',
        'in 2 days'
    );
    assert.equal(
        moment(start).add(1, 'month').from(start),
        'په يوه مياشت کې',
        'in a month'
    );
    assert.equal(
        moment(start).add(2, 'months').from(start),
        'په ۲ مياشتو کې',
        'in 2 months'
    );
    assert.equal(
        moment(start).add(1, 'year').from(start),
        'په يو کال کې',
        'in a year'
    );
    assert.equal(
        moment(start).add(2, 'years').from(start),
        'په ۲ کالونو کې',
        'in 2 years'
    );
});

test('relative time past context', function (assert) {
    var start = moment([2007, 1, 28]),
        secondsThreshold = moment.relativeTimeThreshold('s'),
        secondsWithSuffixThreshold = moment.relativeTimeThreshold('ss');

    assert.equal(
        moment(start).subtract(30, 'seconds').from(start),
        'څو ثانيې مخکې',
        'a few seconds ago'
    );
    moment.relativeTimeThreshold('s', 60);
    moment.relativeTimeThreshold('ss', 0);
    assert.equal(
        moment(start).subtract(2, 'seconds').from(start),
        '۲ ثانيې مخکې',
        '2 seconds ago'
    );
    moment.relativeTimeThreshold('s', secondsThreshold);
    moment.relativeTimeThreshold('ss', secondsWithSuffixThreshold);
    assert.equal(
        moment(start).subtract(1, 'minute').from(start),
        'يوه دقيقه مخکې',
        'a minute ago'
    );
    assert.equal(
        moment(start).subtract(2, 'minutes').from(start),
        '۲ دقيقې مخکې',
        '2 minutes ago'
    );
    assert.equal(
        moment(start).subtract(1, 'hour').from(start),
        'يو ساعت مخکې',
        'an hour ago'
    );
    assert.equal(
        moment(start).subtract(2, 'hours').from(start),
        '۲ ساعتونه مخکې',
        '2 hours ago'
    );
    assert.equal(
        moment(start).subtract(1, 'day').from(start),
        'يوه ورځ مخکې',
        'a day ago'
    );
    assert.equal(
        moment(start).subtract(2, 'days').from(start),
        '۲ ورځې مخکې',
        '2 days ago'
    );
    assert.equal(
        moment(start).subtract(1, 'month').from(start),
        'يوه مياشت مخکې',
        'a month ago'
    );
    assert.equal(
        moment(start).subtract(2, 'months').from(start),
        '۲ مياشتې مخکې',
        '2 months ago'
    );
    assert.equal(
        moment(start).subtract(1, 'year').from(start),
        'يو کال مخکې',
        'a year ago'
    );
    assert.equal(
        moment(start).subtract(2, 'years').from(start),
        '۲ کاله مخکې',
        '2 years ago'
    );
});

test('calendar', function (assert) {
    var reference = moment([2025, 4, 15, 12, 0, 0]),
        nextWeek = moment(reference).add(3, 'days'),
        lastWeek = moment(reference).subtract(3, 'days');

    assert.equal(moment(reference).calendar(reference), 'نن په ۱۲:۰۰', 'today');
    assert.equal(
        moment(reference).add(1, 'day').calendar(reference),
        'سبا په ۱۲:۰۰',
        'tomorrow'
    );
    assert.equal(
        moment(reference).subtract(1, 'day').calendar(reference),
        'پرون په ۱۲:۰۰',
        'yesterday'
    );
    assert.equal(
        nextWeek.calendar(reference),
        nextWeek.format('dddd [په] LT'),
        'next week'
    );
    assert.equal(
        lastWeek.calendar(reference),
        lastWeek.format('dddd [په] LT'),
        'last week'
    );
});

test('week year starts on Saturday', function (assert) {
    assert.equal(
        moment([2011, 11, 31]).format('w ww'),
        '۱ ۰۱',
        'Dec 31 2011 is week 1'
    );
    assert.equal(
        moment([2012, 0, 6]).format('w ww'),
        '۱ ۰۱',
        'Jan 6 2012 is week 1'
    );
    assert.equal(
        moment([2012, 0, 7]).format('w ww'),
        '۲ ۰۲',
        'Jan 7 2012 is week 2'
    );
    assert.equal(
        moment([2012, 0, 13]).format('w ww'),
        '۲ ۰۲',
        'Jan 13 2012 is week 2'
    );
    assert.equal(
        moment([2012, 0, 14]).format('w ww'),
        '۳ ۰۳',
        'Jan 14 2012 is week 3'
    );
});
