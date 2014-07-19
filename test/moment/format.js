var moment = require("../../moment");

exports.format = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };
        done();
    },

    "format YY" : function (test) {
        test.expect(1);

        var b = moment(new Date(2009, 1, 14, 15, 25, 50, 125));
        test.equal(b.format('YY'), '09', 'YY ---> 09');
        test.done();
    },

    "format escape brackets" : function (test) {
        test.expect(10);

        moment.locale('en');

        var b = moment(new Date(2009, 1, 14, 15, 25, 50, 125));
        test.equal(b.format('[day]'), 'day', 'Single bracket');
        test.equal(b.format('[day] YY [YY]'), 'day 09 YY', 'Double bracket');
        test.equal(b.format('[YY'), '[09', 'Un-ended bracket');
        test.equal(b.format('[[YY]]'), '[YY]', 'Double nested brackets');
        test.equal(b.format('[[]'), '[', 'Escape open bracket');
        test.equal(b.format('[Last]'), 'Last', 'localized tokens');
        test.equal(b.format('[L] L'), 'L 02/14/2009', 'localized tokens with escaped localized tokens');
        test.equal(b.format('[L LL LLL LLLL aLa]'), 'L LL LLL LLLL aLa', 'localized tokens with escaped localized tokens');
        test.equal(b.format('[LLL] LLL'), 'LLL February 14, 2009 3:25 PM', 'localized tokens with escaped localized tokens (recursion)');
        test.equal(b.format('YYYY[\n]DD[\n]'), '2009\n14\n', 'Newlines');
        test.done();
    },

    "handle negative years" : function (test) {
        test.expect(10);

        moment.locale('en');
        test.equal(moment.utc().year(-1).format('YY'), '-01', 'YY with negative year');
        test.equal(moment.utc().year(-1).format('YYYY'), '-0001', 'YYYY with negative year');
        test.equal(moment.utc().year(-12).format('YY'), '-12', 'YY with negative year');
        test.equal(moment.utc().year(-12).format('YYYY'), '-0012', 'YYYY with negative year');
        test.equal(moment.utc().year(-123).format('YY'), '-23', 'YY with negative year');
        test.equal(moment.utc().year(-123).format('YYYY'), '-0123', 'YYYY with negative year');
        test.equal(moment.utc().year(-1234).format('YY'), '-34', 'YY with negative year');
        test.equal(moment.utc().year(-1234).format('YYYY'), '-1234', 'YYYY with negative year');
        test.equal(moment.utc().year(-12345).format('YY'), '-45', 'YY with negative year');
        test.equal(moment.utc().year(-12345).format('YYYY'), '-12345', 'YYYY with negative year');

        test.done();
    },

    "format milliseconds" : function (test) {
        test.expect(6);
        var b = moment(new Date(2009, 1, 14, 15, 25, 50, 123));
        test.equal(b.format('S'), '1', 'Deciseconds');
        test.equal(b.format('SS'), '12', 'Centiseconds');
        test.equal(b.format('SSS'), '123', 'Milliseconds');
        b.milliseconds(789);
        test.equal(b.format('S'), '7', 'Deciseconds');
        test.equal(b.format('SS'), '78', 'Centiseconds');
        test.equal(b.format('SSS'), '789', 'Milliseconds');
        test.done();
    },

    "format timezone" : function (test) {
        test.expect(2);

        var b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            explanation = 'moment().format("z") = ' + b.format('z') + ' It should be something like "PST"';
        if (moment().zone() === -60) {
            explanation += "For UTC+1 this is a known issue, see https://github.com/timrwood/moment/issues/162";
        }
        test.ok(b.format('Z').match(/^[\+\-]\d\d:\d\d$/), b.format('Z') + ' should be something like "+07:30"');
        test.ok(b.format('ZZ').match(/^[\+\-]\d{4}$/), b.format('ZZ') + ' should be something like "+0700"');
        test.done();
    },

    "format multiple with zone" : function (test) {
        test.expect(1);

        var b = moment('2012-10-08 -1200', ['YYYY-MM-DD HH:mm ZZ', 'YYYY-MM-DD ZZ', 'YYYY-MM-DD']);
        test.equals(b.format('YYYY-MM'), '2012-10', 'Parsing multiple formats should not crash with different sized formats');
        test.done();
    },

    "isDST" : function (test) {
        test.expect(2);

        var janOffset = new Date(2011, 0, 1).getTimezoneOffset(),
            julOffset = new Date(2011, 6, 1).getTimezoneOffset(),
            janIsDst = janOffset < julOffset,
            julIsDst = julOffset < janOffset,
            jan1 = moment([2011]),
            jul1 = moment([2011, 6]);

        if (janIsDst && julIsDst) {
            test.ok(0, 'January and July cannot both be in DST');
            test.ok(0, 'January and July cannot both be in DST');
        } else if (janIsDst) {
            test.ok(jan1.isDST(), 'January 1 is DST');
            test.ok(!jul1.isDST(), 'July 1 is not DST');
        } else if (julIsDst) {
            test.ok(!jan1.isDST(), 'January 1 is not DST');
            test.ok(jul1.isDST(), 'July 1 is DST');
        } else {
            test.ok(!jan1.isDST(), 'January 1 is not DST');
            test.ok(!jul1.isDST(), 'July 1 is not DST');
        }
        test.done();
    },

    "unix timestamp" : function (test) {
        test.expect(5);

        var m = moment('1234567890.123', 'X');
        test.equals(m.format('X'), '1234567890', 'unix timestamp without milliseconds');
        test.equals(m.format('X.S'), '1234567890.1', 'unix timestamp with deciseconds');
        test.equals(m.format('X.SS'), '1234567890.12', 'unix timestamp with centiseconds');
        test.equals(m.format('X.SSS'), '1234567890.123', 'unix timestamp with milliseconds');

        m = moment(1234567890.123, 'X');
        test.equals(m.format('X'), '1234567890', 'unix timestamp as integer');

        test.done();
    },

    "zone" : function (test) {
        test.expect(3);

        if (moment().zone() > 0) {
            test.ok(moment().format('ZZ').indexOf('-') > -1, 'When the zone() offset is greater than 0, the ISO offset should be less than zero');
        }
        if (moment().zone() < 0) {
            test.ok(moment().format('ZZ').indexOf('+') > -1, 'When the zone() offset is less than 0, the ISO offset should be greater than zero');
        }
        if (moment().zone() === 0) {
            test.ok(moment().format('ZZ').indexOf('+') > -1, 'When the zone() offset is equal to 0, the ISO offset should be positive zero');
        }
        if (moment().zone() === 0) {
            test.equal(moment().zone(), 0, 'moment.fn.zone should be a multiple of 15 (was ' + moment().zone() + ')');
        } else {
            test.equal(moment().zone() % 15, 0, 'moment.fn.zone should be a multiple of 15 (was ' + moment().zone() + ')');
        }
        test.equal(moment().zone(), new Date().getTimezoneOffset(), 'zone should equal getTimezoneOffset');
        test.done();
    },

    "default format" : function (test) {
        test.expect(1);
        var isoRegex = /\d{4}.\d\d.\d\dT\d\d.\d\d.\d\d[\+\-]\d\d:\d\d/;
        test.ok(isoRegex.exec(moment().format()), "default format (" + moment().format() + ") should match ISO");
        test.done();
    },

    "escaping quotes" : function (test) {
        test.expect(4);
        moment.locale('en');
        var date = moment([2012, 0]);
        test.equal(date.format('MMM \'YY'), "Jan '12", "Should be able to format with single parenthesis");
        test.equal(date.format('MMM "YY'),  'Jan "12', "Should be able to format with double parenthesis");
        test.equal(date.format("MMM 'YY"),  "Jan '12", "Should be able to format with single parenthesis");
        test.equal(date.format("MMM \"YY"), 'Jan "12', "Should be able to format with double parenthesis");
        test.done();
    },

    "toJSON" : function (test) {
        var supportsJson = typeof JSON !== "undefined" && JSON.stringify && JSON.stringify.call,
            date = moment("2012-10-09T21:30:40.678+0100");

        test.expect(supportsJson ? 2 : 1);

        test.equal(date.toJSON(), "2012-10-09T20:30:40.678Z", "should output ISO8601 on moment.fn.toJSON");

        if (supportsJson) {
            test.equal(JSON.stringify({
                date : date
            }), '{"date":"2012-10-09T20:30:40.678Z"}', "should output ISO8601 on JSON.stringify");
        }

        test.done();
    },

    "toISOString" : function (test) {
        test.expect(4);
        var date = moment.utc("2012-10-09T20:30:40.678");

        test.equal(date.toISOString(), "2012-10-09T20:30:40.678Z", "should output ISO8601 on moment.fn.toISOString");

        // big years
        date = moment.utc("+020123-10-09T20:30:40.678");
        test.equal(date.toISOString(), "+020123-10-09T20:30:40.678Z", "ISO8601 format on big positive year");
        // negative years
        date = moment.utc("-000001-10-09T20:30:40.678");
        test.equal(date.toISOString(), "-000001-10-09T20:30:40.678Z", "ISO8601 format on negative year");
        // big negative years
        date = moment.utc("-020123-10-09T20:30:40.678");
        test.equal(date.toISOString(), "-020123-10-09T20:30:40.678Z", "ISO8601 format on big negative year");

        test.done();
    },

    "long years" : function (test) {
        test.expect(6);
        test.equal(moment.utc().year(2).format('YYYYYY'), '+000002', 'small year with YYYYYY');
        test.equal(moment.utc().year(2012).format('YYYYYY'), '+002012', 'regular year with YYYYYY');
        test.equal(moment.utc().year(20123).format('YYYYYY'), '+020123', 'big year with YYYYYY');

        test.equal(moment.utc().year(-1).format('YYYYYY'), '-000001', 'small negative year with YYYYYY');
        test.equal(moment.utc().year(-2012).format('YYYYYY'), '-002012', 'negative year with YYYYYY');
        test.equal(moment.utc().year(-20123).format('YYYYYY'), '-020123', 'big negative year with YYYYYY');

        test.done();
    },

    "iso week formats" : function (test) {
        // http://en.wikipedia.org/wiki/ISO_week_date
        var cases = {
            "2005-01-02": "2004-53",
            "2005-12-31": "2005-52",
            "2007-01-01": "2007-01",
            "2007-12-30": "2007-52",
            "2007-12-31": "2008-01",
            "2008-01-01": "2008-01",
            "2008-12-28": "2008-52",
            "2008-12-29": "2009-01",
            "2008-12-30": "2009-01",
            "2008-12-31": "2009-01",
            "2009-01-01": "2009-01",
            "2009-12-31": "2009-53",
            "2010-01-01": "2009-53",
            "2010-01-02": "2009-53",
            "2010-01-03": "2009-53",
            "404-12-31": "0404-53",
            "405-12-31": "0405-52"
        }, i, isoWeek, formatted2, formatted1;

        for (i in cases) {
            isoWeek = cases[i].split('-').pop();
            formatted2 = moment(i, 'YYYY-MM-DD').format('WW');
            test.equal(isoWeek, formatted2, i + ": WW should be " + isoWeek + ", but " + formatted2);
            isoWeek = isoWeek.replace(/^0+/, '');
            formatted1 = moment(i, 'YYYY-MM-DD').format('W');
            test.equal(isoWeek, formatted1, i + ": W should be " + isoWeek + ", but " + formatted1);
        }

        test.done();
    },

    "iso week year formats" : function (test) {
        // http://en.wikipedia.org/wiki/ISO_week_date
        var cases = {
            "2005-01-02": "2004-53",
            "2005-12-31": "2005-52",
            "2007-01-01": "2007-01",
            "2007-12-30": "2007-52",
            "2007-12-31": "2008-01",
            "2008-01-01": "2008-01",
            "2008-12-28": "2008-52",
            "2008-12-29": "2009-01",
            "2008-12-30": "2009-01",
            "2008-12-31": "2009-01",
            "2009-01-01": "2009-01",
            "2009-12-31": "2009-53",
            "2010-01-01": "2009-53",
            "2010-01-02": "2009-53",
            "2010-01-03": "2009-53",
            "404-12-31": "0404-53",
            "405-12-31": "0405-52"
        }, i, isoWeekYear, formatted5, formatted4, formatted2;

        for (i in cases) {
            isoWeekYear = cases[i].split('-')[0];
            formatted5 = moment(i, 'YYYY-MM-DD').format('GGGGG');
            test.equal('0' + isoWeekYear, formatted5, i + ": GGGGG should be " + isoWeekYear + ", but " + formatted5);
            formatted4 = moment(i, 'YYYY-MM-DD').format('GGGG');
            test.equal(isoWeekYear, formatted4, i + ": GGGG should be " + isoWeekYear + ", but " + formatted4);
            formatted2 = moment(i, 'YYYY-MM-DD').format('GG');
            test.equal(isoWeekYear.slice(2, 4), formatted2, i + ": GG should be " + isoWeekYear + ", but " + formatted2);
        }

        test.done();
    },

    "week year formats" : function (test) {
        // http://en.wikipedia.org/wiki/ISO_week_date
        var cases = {
            "2005-01-02": "2004-53",
            "2005-12-31": "2005-52",
            "2007-01-01": "2007-01",
            "2007-12-30": "2007-52",
            "2007-12-31": "2008-01",
            "2008-01-01": "2008-01",
            "2008-12-28": "2008-52",
            "2008-12-29": "2009-01",
            "2008-12-30": "2009-01",
            "2008-12-31": "2009-01",
            "2009-01-01": "2009-01",
            "2009-12-31": "2009-53",
            "2010-01-01": "2009-53",
            "2010-01-02": "2009-53",
            "2010-01-03": "2009-53",
            "404-12-31": "0404-53",
            "405-12-31": "0405-52"
        }, i, isoWeekYear, formatted5, formatted4, formatted2;

        moment.locale('en-gb'); // 1, 4
        for (i in cases) {
            isoWeekYear = cases[i].split('-')[0];
            formatted5 = moment(i, 'YYYY-MM-DD').format('ggggg');
            test.equal('0' + isoWeekYear, formatted5, i + ": ggggg should be " + isoWeekYear + ", but " + formatted5);
            formatted4 = moment(i, 'YYYY-MM-DD').format('gggg');
            test.equal(isoWeekYear, formatted4, i + ": gggg should be " + isoWeekYear + ", but " + formatted4);
            formatted2 = moment(i, 'YYYY-MM-DD').format('gg');
            test.equal(isoWeekYear.slice(2, 4), formatted2, i + ": gg should be " + isoWeekYear + ", but " + formatted2);
        }

        test.done();
    },

    "iso weekday formats" : function (test) {
        test.expect(7);

        test.equal(moment([1985, 1,  4]).format('E'), '1', "Feb  4 1985 is Monday    -- 1st day");
        test.equal(moment([2029, 8, 18]).format('E'), '2', "Sep 18 2029 is Tuesday   -- 2nd day");
        test.equal(moment([2013, 3, 24]).format('E'), '3', "Apr 24 2013 is Wednesday -- 3rd day");
        test.equal(moment([2015, 2,  5]).format('E'), '4', "Mar  5 2015 is Thursday  -- 4th day");
        test.equal(moment([1970, 0,  2]).format('E'), '5', "Jan  2 1970 is Friday    -- 5th day");
        test.equal(moment([2001, 4, 12]).format('E'), '6', "May 12 2001 is Saturday  -- 6th day");
        test.equal(moment([2000, 0,  2]).format('E'), '7', "Jan  2 2000 is Sunday    -- 7th day");

        test.done();
    },

    "weekday formats" : function (test) {
        test.expect(7);

        moment.locale('dow: 3,doy: 5', {week: {dow: 3, doy: 5}});
        test.equal(moment([1985, 1,  6]).format('e'), '0', "Feb  6 1985 is Wednesday -- 0th day");
        test.equal(moment([2029, 8, 20]).format('e'), '1', "Sep 20 2029 is Thursday  -- 1st day");
        test.equal(moment([2013, 3, 26]).format('e'), '2', "Apr 26 2013 is Friday    -- 2nd day");
        test.equal(moment([2015, 2,  7]).format('e'), '3', "Mar  7 2015 is Saturday  -- 3nd day");
        test.equal(moment([1970, 0,  4]).format('e'), '4', "Jan  4 1970 is Sunday    -- 4th day");
        test.equal(moment([2001, 4, 14]).format('e'), '5', "May 14 2001 is Monday    -- 5th day");
        test.equal(moment([2000, 0,  4]).format('e'), '6', "Jan  4 2000 is Tuesday   -- 6th day");

        test.done();
    },

    "toString is just human readable format" : function (test) {
        test.expect(1);

        var b = moment(new Date(2009, 1, 5, 15, 25, 50, 125));
        test.equal(b.toString(), b.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'));
        test.done();
    },

    "toJSON skips postformat" : function (test) {
        test.expect(1);

        moment.locale('postformat', {
            postformat: function (s) {
                s.replace(/./g, 'X');
            }
        });
        test.equal(moment.utc([2000, 0, 1]).toJSON(), "2000-01-01T00:00:00.000Z", "toJSON doesn't postformat");
        moment.locale('postformat', null);
        test.done();
    },

    "calendar day timezone" : function (test) {
        test.expect(11);

        moment.locale('en');
        var zones = [60, -60, 90, -90, 360, -360, 720, -720],
            b = moment().utc().startOf('day').subtract({m : 1}),
            c = moment().local().startOf('day').subtract({m : 1}),
            d = moment().local().startOf('day').subtract({d : 2}),
            i, z, a;

        for (i = 0; i < zones.length; ++i) {
            z = zones[i];
            a = moment().zone(z).startOf('day').subtract({m: 1});
            test.equal(moment(a).zone(z).calendar(), "Yesterday at 11:59 PM", "Yesterday at 11:59 PM, not Today, or the wrong time");
        }

        test.equal(moment(b).utc().calendar(), "Yesterday at 11:59 PM", "Yesterday at 11:59 PM, not Today, or the wrong time");
        test.equal(moment(c).local().calendar(), "Yesterday at 11:59 PM", "Yesterday at 11:59 PM, not Today, or the wrong time");
        test.equal(moment(c).local().calendar(d), "Tomorrow at 11:59 PM", "Tomorrow at 11:59 PM, not Yesterday, or the wrong time");

        test.done();
    },

    "invalid" : function (test) {
        moment.locale('en');

        test.equal(moment.invalid().format(), "Invalid date");
        test.equal(moment.invalid().format('YYYY-MM-DD'), "Invalid date");

        test.done();
    },

    "quarter formats" : function (test) {
        test.expect(7);

        test.equal(moment([1985, 1,  4]).format('Q'), '1', "Feb  4 1985 is Q1");
        test.equal(moment([2029, 8, 18]).format('Q'), '3', "Sep 18 2029 is Q3");
        test.equal(moment([2013, 3, 24]).format('Q'), '2', "Apr 24 2013 is Q2");
        test.equal(moment([2015, 2,  5]).format('Q'), '1', "Mar  5 2015 is Q1");
        test.equal(moment([1970, 0,  2]).format('Q'), '1', "Jan  2 1970 is Q1");
        test.equal(moment([2001, 11, 12]).format('Q'), '4', "Dec 12 2001 is Q4");
        test.equal(moment([2000, 0,  2]).format('[Q]Q-YYYY'), 'Q1-2000', "Jan  2 2000 is Q1");

        test.done();
    }
};
