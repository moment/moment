import { test } from '../qunit';
import { localeModule } from '../qunit-locale';
import moment from '../../moment';
localeModule('cv');

test('parse', function (assert) {
    var tests = 'кӑрлач кӑр_нарӑс нар_пуш пуш_ака ака_май май_ҫӗртме ҫӗр_утӑ утӑ_ҫурла ҫур_авӑн авн_юпа юпа_чӳк чӳк_раштав раш'.split(
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
                'dddd, MMMM Do YYYY, h:mm:ss a',
                'вырсарникун, нарӑс 14-мӗш 2010, 3:25:50 pm',
            ],
            ['ddd, hA', 'выр, 3PM'],
            ['M Mo MM MMMM MMM', '2 2-мӗш 02 нарӑс нар'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14-мӗш 14'],
            ['d do dddd ddd dd', '0 0-мӗш вырсарникун выр вр'],
            ['DDD DDDo DDDD', '45 45-мӗш 045'],
            ['w wo ww', '7 7-мӗш 07'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'pm PM'],
            ['Ҫулӑн DDDo кунӗ', 'Ҫулӑн 45-мӗш кунӗ'],
            ['LTS', '15:25:50'],
            ['L', '14-02-2010'],
            ['LL', '2010 ҫулхи нарӑс уйӑхӗн 14-мӗшӗ'],
            ['LLL', '2010 ҫулхи нарӑс уйӑхӗн 14-мӗшӗ, 15:25'],
            ['LLLL', 'вырсарникун, 2010 ҫулхи нарӑс уйӑхӗн 14-мӗшӗ, 15:25'],
            ['l', '14-2-2010'],
            ['ll', '2010 ҫулхи нар уйӑхӗн 14-мӗшӗ'],
            ['lll', '2010 ҫулхи нар уйӑхӗн 14-мӗшӗ, 15:25'],
            ['llll', 'выр, 2010 ҫулхи нар уйӑхӗн 14-мӗшӗ, 15:25'],
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-мӗш', '1-мӗш');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-мӗш', '2-мӗш');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-мӗш', '3-мӗш');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-мӗш', '4-мӗш');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-мӗш', '5-мӗш');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-мӗш', '6-мӗш');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-мӗш', '7-мӗш');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-мӗш', '8-мӗш');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-мӗш', '9-мӗш');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-мӗш', '10-мӗш');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-мӗш', '11-мӗш');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-мӗш', '12-мӗш');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-мӗш', '13-мӗш');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-мӗш', '14-мӗш');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-мӗш', '15-мӗш');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-мӗш', '16-мӗш');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-мӗш', '17-мӗш');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-мӗш', '18-мӗш');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-мӗш', '19-мӗш');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-мӗш', '20-мӗш');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-мӗш', '21-мӗш');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-мӗш', '22-мӗш');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-мӗш', '23-мӗш');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-мӗш', '24-мӗш');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-мӗш', '25-мӗш');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-мӗш', '26-мӗш');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-мӗш', '27-мӗш');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-мӗш', '28-мӗш');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-мӗш', '29-мӗш');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-мӗш', '30-мӗш');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-мӗш', '31-мӗш');
});

test('format month', function (assert) {
    var expected = 'кӑрлач кӑр_нарӑс нар_пуш пуш_ака ака_май май_ҫӗртме ҫӗр_утӑ утӑ_ҫурла ҫур_авӑн авн_юпа юпа_чӳк чӳк_раштав раш'.split(
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
    var expected = 'вырсарникун выр вр_тунтикун тун тн_ытларикун ытл ыт_юнкун юн юн_кӗҫнерникун кӗҫ кҫ_эрнекун эрн эр_шӑматкун шӑм шм'.split(
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
        'пӗр-ик ҫеккунт',
        '44 sekunder = a few seconds'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
        'пӗр минут',
        '45 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
        'пӗр минут',
        '89 seconds = a minute'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
        '2 минут',
        '90 seconds = 2 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
        '44 минут',
        '44 minutes = 44 minutes'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
        'пӗр сехет',
        '45 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
        'пӗр сехет',
        '89 minutes = an hour'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
        '2 сехет',
        '90 minutes = 2 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
        '5 сехет',
        '5 hours = 5 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
        '21 сехет',
        '21 hours = 21 hours'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
        'пӗр кун',
        '22 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
        'пӗр кун',
        '35 hours = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
        '2 кун',
        '36 hours = 2 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
        'пӗр кун',
        '1 day = a day'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
        '5 кун',
        '5 days = 5 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
        '25 кун',
        '25 days = 25 days'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
        'пӗр уйӑх',
        '26 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
        'пӗр уйӑх',
        '30 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
        'пӗр уйӑх',
        '43 days = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
        '2 уйӑх',
        '46 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
        '2 уйӑх',
        '75 days = 2 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
        '3 уйӑх',
        '76 days = 3 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
        'пӗр уйӑх',
        '1 month = a month'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
        '5 уйӑх',
        '5 months = 5 months'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
        'пӗр ҫул',
        '345 days = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
        '2 ҫул',
        '548 days = 2 years'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
        'пӗр ҫул',
        '1 year = a year'
    );
    assert.equal(
        start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
        '5 ҫул',
        '5 years = 5 years'
    );
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'пӗр-ик ҫеккунтран', 'prefix');
    assert.equal(moment(0).from(30000), 'пӗр-ик ҫеккунт каялла', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(
        moment().fromNow(),
        'пӗр-ик ҫеккунт каялла',
        'now from now should display as in the past'
    );
});

test('fromNow', function (assert) {
    assert.equal(
        moment().add({ s: 30 }).fromNow(),
        'пӗр-ик ҫеккунтран',
        'in a few seconds'
    );
    assert.equal(moment().add({ d: 5 }).fromNow(), '5 кунран', 'in 5 days');
    assert.equal(
        moment().add({ h: 2 }).fromNow(),
        '2 сехетрен',
        'in 2 hours, the right suffix!'
    );
    assert.equal(
        moment().add({ y: 3 }).fromNow(),
        '3 ҫултан',
        'in 3 years, the right suffix!'
    );
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);
    assert.equal(
        moment(a).calendar(),
        'Паян 12:00 сехетре',
        'today at the same time'
    );
    assert.equal(
        moment(a).add({ m: 25 }).calendar(),
        'Паян 12:25 сехетре',
        'Now plus 25 min'
    );
    assert.equal(
        moment(a).add({ h: 1 }).calendar(),
        'Паян 13:00 сехетре',
        'Now plus 1 hour'
    );
    assert.equal(
        moment(a).add({ d: 1 }).calendar(),
        'Ыран 12:00 сехетре',
        'tomorrow at the same time'
    );
    assert.equal(
        moment(a).subtract({ h: 1 }).calendar(),
        'Паян 11:00 сехетре',
        'Now minus 1 hour'
    );
    assert.equal(
        moment(a).subtract({ d: 1 }).calendar(),
        'Ӗнер 12:00 сехетре',
        'yesterday at the same time'
    );
});

test('calendar next week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        assert.equal(
            m.calendar(),
            m.format('[Ҫитес] dddd LT [сехетре]'),
            'Today + ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('[Ҫитес] dddd LT [сехетре]'),
            'Today + ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('[Ҫитес] dddd LT [сехетре]'),
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
            m.format('[Иртнӗ] dddd LT [сехетре]'),
            'Today - ' + i + ' days current time'
        );
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(
            m.calendar(),
            m.format('[Иртнӗ] dddd LT [сехетре]'),
            'Today - ' + i + ' days beginning of day'
        );
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(
            m.calendar(),
            m.format('[Иртнӗ] dddd LT [сехетре]'),
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

// Monday is the first day of the week.
// The week that contains Jan 1st is the first week of the year.

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(
        moment([2011, 11, 26]).format('w ww wo'),
        '1 01 1-мӗш',
        'Dec 26 2011 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 1]).format('w ww wo'),
        '1 01 1-мӗш',
        'Jan  1 2012 should be week 1'
    );
    assert.equal(
        moment([2012, 0, 2]).format('w ww wo'),
        '2 02 2-мӗш',
        'Jan  2 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 8]).format('w ww wo'),
        '2 02 2-мӗш',
        'Jan  8 2012 should be week 2'
    );
    assert.equal(
        moment([2012, 0, 9]).format('w ww wo'),
        '3 03 3-мӗш',
        'Jan  9 2012 should be week 3'
    );
});
