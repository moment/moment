import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('ru');

test('parse', function (assert) {
    var tests =
            'январь янв._февраль февр._март март_апрель апр._май май_июнь июнь_июль июль_август авг._сентябрь сент._октябрь окт._ноябрь нояб._декабрь дек.'.split(
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

test('parse exceptional case', function (assert) {
    assert.equal(
        moment('11 Мая 1989', ['DD MMMM YYYY']).format('DD-MM-YYYY'),
        '11-05-1989'
    );
});

test('format', function (assert) {
    var a = [
            [
                'dddd, Do MMMM YYYY, HH:mm:ss',
                'воскресенье, 14-го февраля 2010, 15:25:50',
            ],
            ['ddd, h A', 'вс, 3 дня'],
            ['M Mo MM MMMM MMM', '2 2-й 02 февраль февр.'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14-го 14'],
            ['d do dddd ddd dd', '0 0-й воскресенье вс вс'],
            ['DDD DDDo DDDD', '45 45-й 045'],
            ['w wo ww', '6 6-я 06'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'дня дня'],
            ['DDDo [день года]', '45-й день года'],
            ['LT', '15:25'],
            ['LTS', '15:25:50'],
            ['L', '14.02.2010'],
            ['LL', '14 февраля 2010 г.'],
            ['LLL', '14 февраля 2010 г., 15:25'],
            ['LLLL', 'воскресенье, 14 февраля 2010 г., 15:25'],
            ['l', '14.2.2010'],
            ['ll', '14 февр. 2010 г.'],
            ['lll', '14 февр. 2010 г., 15:25'],
            ['llll', 'вс, 14 февр. 2010 г., 15:25'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format meridiem', function (assert) {
    assert.equal(moment([2012, 11, 28, 0, 0]).format('A'), 'ночи', 'night');
    assert.equal(moment([2012, 11, 28, 3, 59]).format('A'), 'ночи', 'night');
    assert.equal(moment([2012, 11, 28, 4, 0]).format('A'), 'утра', 'morning');
    assert.equal(moment([2012, 11, 28, 11, 59]).format('A'), 'утра', 'morning');
    assert.equal(moment([2012, 11, 28, 12, 0]).format('A'), 'дня', 'afternoon');
    assert.equal(
        moment([2012, 11, 28, 16, 59]).format('A'),
        'дня',
        'afternoon'
    );
    assert.equal(
        moment([2012, 11, 28, 17, 0]).format('A'),
        'вечера',
        'evening'
    );
    assert.equal(
        moment([2012, 11, 28, 23, 59]).format('A'),
        'вечера',
        'evening'
    );
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-й', '1-й');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-й', '2-й');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-й', '3-й');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-й', '4-й');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-й', '5-й');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-й', '6-й');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-й', '7-й');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-й', '8-й');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-й', '9-й');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-й', '10-й');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-й', '11-й');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-й', '12-й');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-й', '13-й');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-й', '14-й');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-й', '15-й');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-й', '16-й');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-й', '17-й');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-й', '18-й');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-й', '19-й');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-й', '20-й');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-й', '21-й');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-й', '22-й');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-й', '23-й');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-й', '24-й');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-й', '25-й');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-й', '26-й');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-й', '27-й');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-й', '28-й');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-й', '29-й');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-й', '30-й');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-й', '31-й');
});

test('format month', function (assert) {
    var expected =
            'январь янв._февраль февр._март март_апрель апр._май май_июнь июнь_июль июль_август авг._сентябрь сент._октябрь окт._ноябрь нояб._декабрь дек.'.split(
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
                'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split(
                    '_'
                ),
            accusative:
                'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split(
                    '_'
                ),
        },
        i;
    for (i = 0; i < 12; i++) {
        assert.equal(
            moment([2011, i, 1]).format('D MMMM'),
            '1 ' + months.accusative[i],
            '1 ' + months.accusative[i]
        );
        assert.equal(
            moment([2011, i, 1]).format('MMMM'),
            months.nominative[i],
            '1 ' + months.nominative[i]
        );
    }
});

test('format month short case', function (assert) {
    var monthsShort = {
            nominative:
                'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split(
                    '_'
                ),
            accusative:
                'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split(
                    '_'
                ),
        },
        i;
    for (i = 0; i < 12; i++) {
        assert.equal(
            moment([2011, i, 1]).format('D MMM'),
            '1 ' + monthsShort.accusative[i],
            '1 ' + monthsShort.accusative[i]
        );
        assert.equal(
            moment([2011, i, 1]).format('MMM'),
            monthsShort.nominative[i],
            '1 ' + monthsShort.nominative[i]
        );
    }
});

test('format month case with escaped symbols', function (assert) {
    var months = {
            nominative:
                'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split(
                    '_'
                ),
            accusative:
                'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split(
                    '_'
                ),
        },
        i;
    for (i = 0; i < 12; i++) {
        assert.equal(
            moment([2013, i, 1]).format('D[] MMMM'),
            '1 ' + months.accusative[i],
            '1 ' + months.accusative[i]
        );
        assert.equal(
            moment([2013, i, 1]).format('[<i>]D[</i>] [<b>]MMMM[</b>]'),
            '<i>1</i> <b>' + months.accusative[i] + '</b>',
            '1 <b>' + months.accusative[i] + '</b>'
        );
        assert.equal(
            moment([2013, i, 1]).format('D[-й день] MMMM'),
            '1-й день ' + months.accusative[i],
            '1-й день ' + months.accusative[i]
        );
        assert.equal(
            moment([2013, i, 1]).format('D, MMMM'),
            '1, ' + months.nominative[i],
            '1, ' + months.nominative[i]
        );
    }
});

test('format month short case with escaped symbols', function (assert) {
    var monthsShort = {
            nominative:
                'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split(
                    '_'
                ),
            accusative:
                'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split(
                    '_'
                ),
        },
        i;
    for (i = 0; i < 12; i++) {
        assert.equal(
            moment([2013, i, 1]).format('D[] MMM'),
            '1 ' + monthsShort.accusative[i],
            '1 ' + monthsShort.accusative[i]
        );
        assert.equal(
            moment([2013, i, 1]).format('[<i>]D[</i>] [<b>]MMM[</b>]'),
            '<i>1</i> <b>' + monthsShort.accusative[i] + '</b>',
            '1 <b>' + monthsShort.accusative[i] + '</b>'
        );
        assert.equal(
            moment([2013, i, 1]).format('D[-й день] MMM'),
            '1-й день ' + monthsShort.accusative[i],
            '1-й день ' + monthsShort.accusative[i]
        );
        assert.equal(
            moment([2013, i, 1]).format('D, MMM'),
            '1, ' + monthsShort.nominative[i],
            '1, ' + monthsShort.nominative[i]
        );
    }
});

test('format week', function (assert) {
    var expected =
            'воскресенье вс вс_понедельник пн пн_вторник вт вт_среда ср ср_четверг чт чт_пятница пт пт_суббота сб сб'.split(
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
        'несколько секунд',
        '44 seconds = seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'минута',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'минута',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 минуты',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 31 }), true),
        '31 минута',
        '31 minutes = 31 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 минуты',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'час',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'час',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 часа',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 часов',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 час',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'день',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'день',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 дня',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'день',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 дней',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 11 }), true),
        '11 дней',
        '11 days = 11 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 21 }), true),
        '21 день',
        '21 days = 21 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 дней',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'месяц',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'месяц',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'месяц',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 месяца',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 месяца',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 месяца',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'месяц',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 месяцев',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'год',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 года',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'год',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 лет',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'через несколько секунд', 'prefix');
    assert.equal(moment(0).from(30000), 'несколько секунд назад', 'suffix');
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'через несколько секунд',
        'in seconds'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), 'через 5 дней', 'in 5 days');
    assert.equal(
        moment().add({ m: 31 }).fromNow(),
        'через 31 минуту',
        'in 31 minutes = in 31 minutes'
    );
    assert.equal(
        moment().subtract({ m: 31 }).fromNow(),
        '31 минуту назад',
        '31 minutes ago = 31 minutes ago'
    );
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'Сегодня, в 12:00',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'Сегодня, в 12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'Сегодня, в 13:00',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'Завтра, в 12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'Сегодня, в 11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ h: 4 }).calendar(),
        'Сегодня, в 8:00',
        'Now minus 4 hours'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'Вчера, в 12:00',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m, now;

    function makeFormatNext(d) {
        switch (d.day()) {
            case 0:
                return '[В следующее] dddd, [в] LT';
            case 1:
            case 2:
            case 4:
                return '[В следующий] dddd, [в] LT';
            case 3:
            case 5:
            case 6:
                return '[В следующую] dddd, [в] LT';
        }
    }

    function makeFormatThis(d) {
        if (d.day() === 2) {
            return '[Во] dddd, [в] LT';
        } else {
            return '[В] dddd, [в] LT';
        }
    }

    now = moment().startOf('week');
    for (i = 2; i < 7; i++) {
        m = moment(now).add({ d: i });
        assert.equal(
            m.calendar(now),
            m.format(makeFormatThis(m)),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(now),
            m.format(makeFormatThis(m)),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(now),
            m.format(makeFormatThis(m)),
            'Today + ' + i + ' days end of day'
        );
    }

    now = moment().endOf('week');
    for (i = 2; i < 7; i++) {
        m = moment(now).add({ d: i });
        assert.equal(
            m.calendar(now),
            m.format(makeFormatNext(m)),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(now),
            m.format(makeFormatNext(m)),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(now),
            m.format(makeFormatNext(m)),
            'Today + ' + i + ' days end of day'
        );
    }
});

test('calendar last week', function (assert) {
    var i, m, now;

    function makeFormatLast(d) {
        switch (d.day()) {
            case 0:
                return '[В прошлое] dddd, [в] LT';
            case 1:
            case 2:
            case 4:
                return '[В прошлый] dddd, [в] LT';
            case 3:
            case 5:
            case 6:
                return '[В прошлую] dddd, [в] LT';
        }
    }

    function makeFormatThis(d) {
        if (d.day() === 2) {
            return '[Во] dddd, [в] LT';
        } else {
            return '[В] dddd, [в] LT';
        }
    }

    now = moment().startOf('week');
    for (i = 2; i < 7; i++) {
        m = moment(now).subtract({ d: i });
        assert.equal(
            m.calendar(now),
            m.format(makeFormatLast(m)),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(now),
            m.format(makeFormatLast(m)),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(now),
            m.format(makeFormatLast(m)),
            'Today - ' + i + ' days end of day'
        );
    }

    now = moment().endOf('week');
    for (i = 2; i < 7; i++) {
        m = moment(now).subtract({ d: i });
        assert.equal(
            m.calendar(now),
            m.format(makeFormatThis(m)),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(now),
            m.format(makeFormatThis(m)),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(now),
            m.format(makeFormatThis(m)),
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

test('weeks year starting monday formatted', function (assert) {
    assert.equal(
        moment([2011, 11, 26]).format('w ww wo'),
        '52 52 52-я',
        'Dec 26 2011 should be week 52'
    );
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '52 52 52-я',
        'Jan  1 2012 should be week 52'
    );
    assert.equal(
        moment([2012, 0, 2]).format('w ww wo'),
        '1 01 1-я',
        'Jan  2 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '1 01 1-я',
        'Jan  8 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 9]).format('w ww wo'),
        '2 02 2-я',
        'Jan  9 2012 should be week 2'
    );
});
