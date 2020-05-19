import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('ga');

var months = [
    'Eanáir,Ean',
    'Feabhra,Feabh',
    'Márta,Márt',
    'Aibreán,Aib',
    'Bealtaine,Beal',
    'Meitheamh,Meith',
    'Iúil,Iúil',
    'Lúnasa,Lún',
    'Meán Fómhair,M.F.',
    'Deireadh Fómhair,D.F.',
    'Samhain,Samh',
    'Nollaig,Noll',
];

test('parse', function (assert) {
    function equalTest(monthName, monthFormat, monthNum) {
        assert.equal(
            moment(monthName, monthFormat).month(),
            monthNum,
            monthName + ' should be month ' + (monthNum + 1)
        );
    }

    var i, testMonth;
    for (i = 0; i < 12; i++) {
        testMonth = months[i].split(',');

        equalTest(testMonth[0], 'MMM', i);
        equalTest(testMonth[1], 'MMM', i);
        equalTest(testMonth[0], 'MMMM', i);
        equalTest(testMonth[1], 'MMMM', i);
        equalTest(testMonth[0].toLocaleLowerCase(), 'MMMM', i);
        equalTest(testMonth[1].toLocaleLowerCase(), 'MMMM', i);
        equalTest(testMonth[0].toLocaleUpperCase(), 'MMMM', i);
        equalTest(testMonth[1].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            [
                'dddd, MMMM Do YYYY, h:mm:ss a',
                'Dé Domhnaigh, Feabhra 14mh 2010, 3:25:50 pm',
            ],
            ['ddd, hA', 'Domh, 3PM'],
            ['M Mo MM MMMM MMM', '2 2na 02 Feabhra Feabh'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14mh 14'],
            ['d do dddd ddd dd', '0 0mh Dé Domhnaigh Domh Do'],
            ['DDD DDDo DDDD', '45 45mh 045'],
            ['w wo ww', '6 6mh 06'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'pm PM'],
            ['[an] DDDo [latha den bhliadhna]', 'an 45mh latha den bhliadhna'],
            ['LTS', '15:25:50'],
            ['L', '14/02/2010'],
            ['LL', '14 Feabhra 2010'],
            ['LLL', '14 Feabhra 2010 15:25'],
            ['LLLL', 'Dé Domhnaigh, 14 Feabhra 2010 15:25'],
            ['l', '14/2/2010'],
            ['ll', '14 Feabh 2010'],
            ['lll', '14 Feabh 2010 15:25'],
            ['llll', 'Domh, 14 Feabh 2010 15:25'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1d', '1d');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2na', '2na');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3mh', '3mh');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4mh', '4mh');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5mh', '5mh');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6mh', '6mh');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7mh', '7mh');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8mh', '8mh');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9mh', '9mh');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10mh', '10mh');
    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11mh', '11mh');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12na', '12na');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13mh', '13mh');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14mh', '14mh');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15mh', '15mh');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16mh', '16mh');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17mh', '17mh');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18mh', '18mh');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19mh', '19mh');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20mh', '20mh');
    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21mh', '21mh');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22na', '22na');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23mh', '23mh');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24mh', '24mh');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25mh', '25mh');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26mh', '26mh');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27mh', '27mh');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28mh', '28mh');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29mh', '29mh');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30mh', '30mh');
    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31mh', '31mh');
});

test('format month', function (assert) {
    var expected = months,
        i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(
            moment([2011, i, 1]).format('MMMM,MMM'),
            expected[i],
            expected[i]
        );
    }
});

test('format week', function (assert) {
    var expected = [
            'Dé Domhnaigh Domh Do',
            'Dé Luain Luan Lu',
            'Dé Máirt Máirt Má',
            'Dé Céadaoin Céad Cé',
            'Déardaoin Déar Dé',
            'Dé hAoine Aoine A',
            'Dé Sathairn Sath Sa',
        ],
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
        'cúpla soicind',
        '44 seconds = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'nóiméad',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'nóiméad',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 nóiméad',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 nóiméad',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'uair an chloig',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'uair an chloig',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 uair an chloig',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 uair an chloig',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 uair an chloig',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'lá',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'lá',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 lá',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'lá',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 lá',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 lá',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'mí',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'mí',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'mí',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 míonna',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 míonna',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 míonna',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'mí',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 míonna',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'bliain',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 bliain',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'bliain',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 bliain',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'i cúpla soicind', 'prefix');
    assert.equal(moment(0).from(30000), 'cúpla soicind ó shin', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'cúpla soicind ó shin',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'i cúpla soicind',
        'in a few seconds'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), 'i 5 lá', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(
        moment(a).calendar(),
        'Inniu ag 12:00',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'Inniu ag 12:25',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'Inniu ag 13:00',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'Amárach ag 12:00',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'Inniu ag 11:00',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'Inné ag 12:00',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('dddd [ag] LT'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [ag] LT'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [ag] LT'),
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
            m.format('dddd [seo caite] [ag] LT'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('dddd [seo caite] [ag] LT'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('dddd [seo caite] [ag] LT'),
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
        moment([2012, 0, 1]).format('w ww wo'),
        '52 52 52na',
        'Ean  1 2012 should be week 52'
    );
    assert.equal(
        moment([2012, 0, 2]).format('w ww wo'),
        '1 01 1d',
        'Ean  2 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '1 01 1d',
        'Ean  8 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 9]).format('w ww wo'),
        '2 02 2na',
        'Ean  9 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 15]).format('w ww wo'),
        '2 02 2na',
        'Ean 15 2012 should be week 2'
    );
});
