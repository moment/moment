import { module, test } from "../qunit";
import moment from "../../moment";

module('format');

test('format YY', function (assert) {
    var b = moment(new Date(2009, 1, 14, 15, 25, 50, 125));
    assert.equal(b.format('YY'), '09', 'YY ---> 09');
});

test('format escape brackets', function (assert) {
    moment.locale('en');

    var b = moment(new Date(2009, 1, 14, 15, 25, 50, 125));
    assert.equal(b.format('[day]'), 'day', 'Single bracket');
    assert.equal(b.format('[day] YY [YY]'), 'day 09 YY', 'Double bracket');
    assert.equal(b.format('[YY'), '[09', 'Un-ended bracket');
    assert.equal(b.format('[[YY]]'), '[YY]', 'Double nested brackets');
    assert.equal(b.format('[[]'), '[', 'Escape open bracket');
    assert.equal(b.format('[Last]'), 'Last', 'localized tokens');
    assert.equal(b.format('[L] L'), 'L 02/14/2009', 'localized tokens with escaped localized tokens');
    assert.equal(b.format('[L LL LLL LLLL aLa]'), 'L LL LLL LLLL aLa', 'localized tokens with escaped localized tokens');
    assert.equal(b.format('[LLL] LLL'), 'LLL February 14, 2009 3:25 PM', 'localized tokens with escaped localized tokens (recursion)');
    assert.equal(b.format('YYYY[\n]DD[\n]'), '2009\n14\n', 'Newlines');
});

test('handle negative years', function (assert) {
    moment.locale('en');
    assert.equal(moment.utc().year(-1).format('YY'), '-01', 'YY with negative year');
    assert.equal(moment.utc().year(-1).format('YYYY'), '-0001', 'YYYY with negative year');
    assert.equal(moment.utc().year(-12).format('YY'), '-12', 'YY with negative year');
    assert.equal(moment.utc().year(-12).format('YYYY'), '-0012', 'YYYY with negative year');
    assert.equal(moment.utc().year(-123).format('YY'), '-23', 'YY with negative year');
    assert.equal(moment.utc().year(-123).format('YYYY'), '-0123', 'YYYY with negative year');
    assert.equal(moment.utc().year(-1234).format('YY'), '-34', 'YY with negative year');
    assert.equal(moment.utc().year(-1234).format('YYYY'), '-1234', 'YYYY with negative year');
    assert.equal(moment.utc().year(-12345).format('YY'), '-45', 'YY with negative year');
    assert.equal(moment.utc().year(-12345).format('YYYY'), '-12345', 'YYYY with negative year');
});

test('format milliseconds', function (assert) {
    var b = moment(new Date(2009, 1, 14, 15, 25, 50, 123));
    assert.equal(b.format('S'), '1', 'Deciseconds');
    assert.equal(b.format('SS'), '12', 'Centiseconds');
    assert.equal(b.format('SSS'), '123', 'Milliseconds');
    b.milliseconds(789);
    assert.equal(b.format('S'), '7', 'Deciseconds');
    assert.equal(b.format('SS'), '78', 'Centiseconds');
    assert.equal(b.format('SSS'), '789', 'Milliseconds');
});

test('format timezone', function (assert) {
    var b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
    assert.ok(b.format('Z').match(/^[\+\-]\d\d:\d\d$/), b.format('Z') + ' should be something like \'+07:30\'');
    assert.ok(b.format('ZZ').match(/^[\+\-]\d{4}$/), b.format('ZZ') + ' should be something like \'+0700\'');
});

test('format multiple with utc offset', function (assert) {
    var b = moment('2012-10-08 -1200', ['YYYY-MM-DD HH:mm ZZ', 'YYYY-MM-DD ZZ', 'YYYY-MM-DD']);
    assert.equal(b.format('YYYY-MM'), '2012-10', 'Parsing multiple formats should not crash with different sized formats');
});

test('isDST', function (assert) {
    var janOffset = new Date(2011, 0, 1).getTimezoneOffset(),
        julOffset = new Date(2011, 6, 1).getTimezoneOffset(),
        janIsDst = janOffset < julOffset,
        julIsDst = julOffset < janOffset,
        jan1 = moment([2011]),
        jul1 = moment([2011, 6]);

    if (janIsDst && julIsDst) {
        assert.ok(0, 'January and July cannot both be in DST');
        assert.ok(0, 'January and July cannot both be in DST');
    } else if (janIsDst) {
        assert.ok(jan1.isDST(), 'January 1 is DST');
        assert.ok(!jul1.isDST(), 'July 1 is not DST');
    } else if (julIsDst) {
        assert.ok(!jan1.isDST(), 'January 1 is not DST');
        assert.ok(jul1.isDST(), 'July 1 is DST');
    } else {
        assert.ok(!jan1.isDST(), 'January 1 is not DST');
        assert.ok(!jul1.isDST(), 'July 1 is not DST');
    }
});

test('unix timestamp', function (assert) {
    var m = moment('1234567890.123', 'X');
    assert.equal(m.format('X'), '1234567890', 'unix timestamp without milliseconds');
    assert.equal(m.format('X.S'), '1234567890.1', 'unix timestamp with deciseconds');
    assert.equal(m.format('X.SS'), '1234567890.12', 'unix timestamp with centiseconds');
    assert.equal(m.format('X.SSS'), '1234567890.123', 'unix timestamp with milliseconds');

    m = moment(1234567890.123, 'X');
    assert.equal(m.format('X'), '1234567890', 'unix timestamp as integer');
});

test('unix offset milliseconds', function (assert) {
    var m = moment('1234567890123', 'x');
    assert.equal(m.format('x'), '1234567890123', 'unix offset in milliseconds');

    m = moment(1234567890123, 'x');
    assert.equal(m.format('x'), '1234567890123', 'unix offset in milliseconds as integer');
});

test('utcOffset sanity checks', function (assert) {
    assert.equal(moment().utcOffset() % 15, 0,
            'utc offset should be a multiple of 15 (was ' + moment().utcOffset() + ')');

    assert.equal(moment().utcOffset(), -(new Date()).getTimezoneOffset(),
        'utcOffset should return the opposite of getTimezoneOffset');
});

test('default format', function (assert) {
    var isoRegex = /\d{4}.\d\d.\d\dT\d\d.\d\d.\d\d[\+\-]\d\d:\d\d/;
    assert.ok(isoRegex.exec(moment().format()), 'default format (' + moment().format() + ') should match ISO');
});

test('escaping quotes', function (assert) {
    moment.locale('en');
    var date = moment([2012, 0]);
    assert.equal(date.format('MMM \'YY'), 'Jan \'12', 'Should be able to format with single parenthesis');
    assert.equal(date.format("MMM 'YY"), 'Jan \'12', 'Should be able to format with double parenthesis');
    assert.equal(date.format('MMM \'YY'), 'Jan \'12', 'Should be able to format with single parenthesis');
    assert.equal(date.format("MMM 'YY"), 'Jan \'12', 'Should be able to format with double parenthesis');
});

test('toJSON', function (assert) {
    var supportsJson = typeof JSON !== 'undefined' && JSON.stringify && JSON.stringify.call,
        date = moment('2012-10-09T21:30:40.678+0100');

    assert.equal(date.toJSON(), '2012-10-09T20:30:40.678Z', 'should output ISO8601 on moment.fn.toJSON');

    if (supportsJson) {
        assert.equal(JSON.stringify({
            date : date
        }), '{"date":"2012-10-09T20:30:40.678Z"}', 'should output ISO8601 on JSON.stringify');
    }
});

test('toISOString', function (assert) {
    var date = moment.utc('2012-10-09T20:30:40.678');

    assert.equal(date.toISOString(), '2012-10-09T20:30:40.678Z', 'should output ISO8601 on moment.fn.toISOString');

    // big years
    date = moment.utc('+020123-10-09T20:30:40.678');
    assert.equal(date.toISOString(), '+020123-10-09T20:30:40.678Z', 'ISO8601 format on big positive year');
    // negative years
    date = moment.utc('-000001-10-09T20:30:40.678');
    assert.equal(date.toISOString(), '-000001-10-09T20:30:40.678Z', 'ISO8601 format on negative year');
    // big negative years
    date = moment.utc('-020123-10-09T20:30:40.678');
    assert.equal(date.toISOString(), '-020123-10-09T20:30:40.678Z', 'ISO8601 format on big negative year');
});

test('long years', function (assert) {
    assert.equal(moment.utc().year(2).format('YYYYYY'), '+000002', 'small year with YYYYYY');
    assert.equal(moment.utc().year(2012).format('YYYYYY'), '+002012', 'regular year with YYYYYY');
    assert.equal(moment.utc().year(20123).format('YYYYYY'), '+020123', 'big year with YYYYYY');

    assert.equal(moment.utc().year(-1).format('YYYYYY'), '-000001', 'small negative year with YYYYYY');
    assert.equal(moment.utc().year(-2012).format('YYYYYY'), '-002012', 'negative year with YYYYYY');
    assert.equal(moment.utc().year(-20123).format('YYYYYY'), '-020123', 'big negative year with YYYYYY');
});

test('iso week formats', function (assert) {
    // http://en.wikipedia.org/wiki/ISO_week_date
    var cases = {
        '2005-01-02': '2004-53',
        '2005-12-31': '2005-52',
        '2007-01-01': '2007-01',
        '2007-12-30': '2007-52',
        '2007-12-31': '2008-01',
        '2008-01-01': '2008-01',
        '2008-12-28': '2008-52',
        '2008-12-29': '2009-01',
        '2008-12-30': '2009-01',
        '2008-12-31': '2009-01',
        '2009-01-01': '2009-01',
        '2009-12-31': '2009-53',
        '2010-01-01': '2009-53',
        '2010-01-02': '2009-53',
        '2010-01-03': '2009-53',
        '404-12-31': '0404-53',
        '405-12-31': '0405-52'
    }, i, isoWeek, formatted2, formatted1;

    for (i in cases) {
        isoWeek = cases[i].split('-').pop();
        formatted2 = moment(i, 'YYYY-MM-DD').format('WW');
        assert.equal(isoWeek, formatted2, i + ': WW should be ' + isoWeek + ', but ' + formatted2);
        isoWeek = isoWeek.replace(/^0+/, '');
        formatted1 = moment(i, 'YYYY-MM-DD').format('W');
        assert.equal(isoWeek, formatted1, i + ': W should be ' + isoWeek + ', but ' + formatted1);
    }
});

test('iso week year formats', function (assert) {
    // http://en.wikipedia.org/wiki/ISO_week_date
    var cases = {
        '2005-01-02': '2004-53',
        '2005-12-31': '2005-52',
        '2007-01-01': '2007-01',
        '2007-12-30': '2007-52',
        '2007-12-31': '2008-01',
        '2008-01-01': '2008-01',
        '2008-12-28': '2008-52',
        '2008-12-29': '2009-01',
        '2008-12-30': '2009-01',
        '2008-12-31': '2009-01',
        '2009-01-01': '2009-01',
        '2009-12-31': '2009-53',
        '2010-01-01': '2009-53',
        '2010-01-02': '2009-53',
        '2010-01-03': '2009-53',
        '404-12-31': '0404-53',
        '405-12-31': '0405-52'
    }, i, isoWeekYear, formatted5, formatted4, formatted2;

    for (i in cases) {
        isoWeekYear = cases[i].split('-')[0];
        formatted5 = moment(i, 'YYYY-MM-DD').format('GGGGG');
        assert.equal('0' + isoWeekYear, formatted5, i + ': GGGGG should be ' + isoWeekYear + ', but ' + formatted5);
        formatted4 = moment(i, 'YYYY-MM-DD').format('GGGG');
        assert.equal(isoWeekYear, formatted4, i + ': GGGG should be ' + isoWeekYear + ', but ' + formatted4);
        formatted2 = moment(i, 'YYYY-MM-DD').format('GG');
        assert.equal(isoWeekYear.slice(2, 4), formatted2, i + ': GG should be ' + isoWeekYear + ', but ' + formatted2);
    }
});

test('week year formats', function (assert) {
    // http://en.wikipedia.org/wiki/ISO_week_date
    var cases = {
        '2005-01-02': '2004-53',
        '2005-12-31': '2005-52',
        '2007-01-01': '2007-01',
        '2007-12-30': '2007-52',
        '2007-12-31': '2008-01',
        '2008-01-01': '2008-01',
        '2008-12-28': '2008-52',
        '2008-12-29': '2009-01',
        '2008-12-30': '2009-01',
        '2008-12-31': '2009-01',
        '2009-01-01': '2009-01',
        '2009-12-31': '2009-53',
        '2010-01-01': '2009-53',
        '2010-01-02': '2009-53',
        '2010-01-03': '2009-53',
        '404-12-31': '0404-53',
        '405-12-31': '0405-52'
    }, i, isoWeekYear, formatted5, formatted4, formatted2;

    moment.locale('dow:1,doy:4', {week: {dow: 1, doy: 4}});

    for (i in cases) {
        isoWeekYear = cases[i].split('-')[0];
        formatted5 = moment(i, 'YYYY-MM-DD').format('ggggg');
        assert.equal('0' + isoWeekYear, formatted5, i + ': ggggg should be ' + isoWeekYear + ', but ' + formatted5);
        formatted4 = moment(i, 'YYYY-MM-DD').format('gggg');
        assert.equal(isoWeekYear, formatted4, i + ': gggg should be ' + isoWeekYear + ', but ' + formatted4);
        formatted2 = moment(i, 'YYYY-MM-DD').format('gg');
        assert.equal(isoWeekYear.slice(2, 4), formatted2, i + ': gg should be ' + isoWeekYear + ', but ' + formatted2);
    }
});

test('iso weekday formats', function (assert) {
    assert.equal(moment([1985, 1,  4]).format('E'), '1', 'Feb  4 1985 is Monday    -- 1st day');
    assert.equal(moment([2029, 8, 18]).format('E'), '2', 'Sep 18 2029 is Tuesday   -- 2nd day');
    assert.equal(moment([2013, 3, 24]).format('E'), '3', 'Apr 24 2013 is Wednesday -- 3rd day');
    assert.equal(moment([2015, 2,  5]).format('E'), '4', 'Mar  5 2015 is Thursday  -- 4th day');
    assert.equal(moment([1970, 0,  2]).format('E'), '5', 'Jan  2 1970 is Friday    -- 5th day');
    assert.equal(moment([2001, 4, 12]).format('E'), '6', 'May 12 2001 is Saturday  -- 6th day');
    assert.equal(moment([2000, 0,  2]).format('E'), '7', 'Jan  2 2000 is Sunday    -- 7th day');
});

test('weekday formats', function (assert) {
    moment.locale('dow: 3,doy: 5', {week: {dow: 3, doy: 5}});
    assert.equal(moment([1985, 1,  6]).format('e'), '0', 'Feb  6 1985 is Wednesday -- 0th day');
    assert.equal(moment([2029, 8, 20]).format('e'), '1', 'Sep 20 2029 is Thursday  -- 1st day');
    assert.equal(moment([2013, 3, 26]).format('e'), '2', 'Apr 26 2013 is Friday    -- 2nd day');
    assert.equal(moment([2015, 2,  7]).format('e'), '3', 'Mar  7 2015 is Saturday  -- 3nd day');
    assert.equal(moment([1970, 0,  4]).format('e'), '4', 'Jan  4 1970 is Sunday    -- 4th day');
    assert.equal(moment([2001, 4, 14]).format('e'), '5', 'May 14 2001 is Monday    -- 5th day');
    assert.equal(moment([2000, 0,  4]).format('e'), '6', 'Jan  4 2000 is Tuesday   -- 6th day');
});

test('toString is just human readable format', function (assert) {
    var b = moment(new Date(2009, 1, 5, 15, 25, 50, 125));
    assert.equal(b.toString(), b.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'));
});

test('toJSON skips postformat', function (assert) {
    moment.locale('postformat', {
        postformat: function (s) {
            s.replace(/./g, 'X');
        }
    });
    assert.equal(moment.utc([2000, 0, 1]).toJSON(), '2000-01-01T00:00:00.000Z', 'toJSON doesn\'t postformat');
    moment.locale('postformat', null);
});

test('calendar day timezone', function (assert) {
    moment.locale('en');
    var zones = [60, -60, 90, -90, 360, -360, 720, -720],
        b = moment().utc().startOf('day').subtract({m : 1}),
        c = moment().local().startOf('day').subtract({m : 1}),
        d = moment().local().startOf('day').subtract({d : 2}),
        i, z, a;

    for (i = 0; i < zones.length; ++i) {
        z = zones[i];
        a = moment().utcOffset(z).startOf('day').subtract({m: 1});
        assert.equal(moment(a).utcOffset(z).calendar(), 'Yesterday at 11:59 PM',
                     'Yesterday at 11:59 PM, not Today, or the wrong time, tz = ' + z);
    }

    assert.equal(moment(b).utc().calendar(), 'Yesterday at 11:59 PM', 'Yesterday at 11:59 PM, not Today, or the wrong time');
    assert.equal(moment(c).local().calendar(), 'Yesterday at 11:59 PM', 'Yesterday at 11:59 PM, not Today, or the wrong time');
    assert.equal(moment(c).local().calendar(d), 'Tomorrow at 11:59 PM', 'Tomorrow at 11:59 PM, not Yesterday, or the wrong time');
});

test('invalid', function (assert) {
    assert.equal(moment.invalid().format(), 'Invalid date');
    assert.equal(moment.invalid().format('YYYY-MM-DD'), 'Invalid date');
});

test('quarter formats', function (assert) {
    assert.equal(moment([1985, 1,  4]).format('Q'), '1', 'Feb  4 1985 is Q1');
    assert.equal(moment([2029, 8, 18]).format('Q'), '3', 'Sep 18 2029 is Q3');
    assert.equal(moment([2013, 3, 24]).format('Q'), '2', 'Apr 24 2013 is Q2');
    assert.equal(moment([2015, 2,  5]).format('Q'), '1', 'Mar  5 2015 is Q1');
    assert.equal(moment([1970, 0,  2]).format('Q'), '1', 'Jan  2 1970 is Q1');
    assert.equal(moment([2001, 11, 12]).format('Q'), '4', 'Dec 12 2001 is Q4');
    assert.equal(moment([2000, 0,  2]).format('[Q]Q-YYYY'), 'Q1-2000', 'Jan  2 2000 is Q1');
});
